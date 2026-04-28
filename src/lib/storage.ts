import {
  CardState,
  CardStatus,
  SchedulerConfig,
  DEFAULT_SCHEDULER_CONFIG,
  createInitialCardState,
  isCardUnlocked,
  isMastered,
  normalizeSchedulerConfig,
} from './spaced-repetition';

const STORAGE_KEY = 'qrc-review-state';
const STORAGE_VERSION = 4;

type StateListener = () => void;

export interface DailyStats {
  dayKey: string;
  newSeen: number;
  reviewSeen: number;
  sessionsCompleted: number;
  answers: number;
}

export interface StoredState {
  cards: Record<string, CardState>;
  config: SchedulerConfig;
  dailyStats: DailyStats;
  version: 4;
}

const stateListeners = new Set<StateListener>();

let cachedState: StoredState | null = null;
let cachedPayload: string | null = null;
let storageEventsBound = false;
let memoryFallbackActive = false;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toFiniteNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function toNonNegativeInt(value: unknown, fallback: number): number {
  return Math.max(0, Math.round(toFiniteNumber(value, fallback)));
}

function toStatus(value: unknown): CardStatus | null {
  if (value === 'new' || value === 'learning' || value === 'review' || value === 'relearning') {
    return value;
  }
  return null;
}

export function getTodayKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function createDailyStats(dayKey: string = getTodayKey()): DailyStats {
  return {
    dayKey,
    newSeen: 0,
    reviewSeen: 0,
    sessionsCompleted: 0,
    answers: 0,
  };
}

function getDefaultState(): StoredState {
  return {
    cards: {},
    config: { ...DEFAULT_SCHEDULER_CONFIG },
    dailyStats: createDailyStats(),
    version: STORAGE_VERSION,
  };
}

const SERVER_STATE_SNAPSHOT = getDefaultState();

function cloneCardState(state: CardState): CardState {
  return { ...state };
}

function cloneStoredState(state: StoredState): StoredState {
  return {
    cards: Object.fromEntries(
      Object.entries(state.cards).map(([cardId, cardState]) => [cardId, cloneCardState(cardState)])
    ),
    config: { ...state.config },
    dailyStats: { ...state.dailyStats },
    version: STORAGE_VERSION,
  };
}

function serializeState(state: StoredState): string {
  return JSON.stringify(state);
}

function normalizeCardState(raw: unknown): CardState {
  const fallback = createInitialCardState();
  if (!isRecord(raw)) return fallback;

  const status = toStatus(raw.status) ?? 'new';
  const dueAtCandidate = toNonNegativeInt(raw.dueAt, 0);

  return {
    status,
    dueAt: status === 'new' ? dueAtCandidate : Math.max(1, dueAtCandidate),
    lastReviewedAt: toNonNegativeInt(raw.lastReviewedAt, 0),
    unlockedAt: toNonNegativeInt(raw.unlockedAt, 0),
    easeFactor: Math.max(1.3, toFiniteNumber(raw.easeFactor, 2.5)),
    repetitions: toNonNegativeInt(raw.repetitions, 0),
    lapses: toNonNegativeInt(raw.lapses, 0),
    learningStepIndex: toNonNegativeInt(raw.learningStepIndex, 0),
    scheduledDays: toNonNegativeInt(raw.scheduledDays, 0),
    reviewCount: toNonNegativeInt(raw.reviewCount, 0),
    lastSeenDayKey: typeof raw.lastSeenDayKey === 'string' ? raw.lastSeenDayKey : '',
  };
}

function normalizeDailyStats(raw: unknown): DailyStats {
  if (!isRecord(raw)) return createDailyStats();

  const dayKey =
    typeof raw.dayKey === 'string' && raw.dayKey.length > 0
      ? raw.dayKey
      : getTodayKey();

  return {
    dayKey,
    newSeen: toNonNegativeInt(raw.newSeen, 0),
    reviewSeen: toNonNegativeInt(raw.reviewSeen, 0),
    sessionsCompleted: toNonNegativeInt(raw.sessionsCompleted, 0),
    answers: toNonNegativeInt(raw.answers, 0),
  };
}

function ensureCurrentDay(state: { dailyStats: DailyStats }): void {
  const today = getTodayKey();
  if (state.dailyStats.dayKey !== today) {
    state.dailyStats = createDailyStats(today);
  }
}

function normalizeV4(raw: unknown): StoredState {
  if (!isRecord(raw)) return getDefaultState();

  const normalized: StoredState = {
    cards: {},
    config: normalizeSchedulerConfig(
      isRecord(raw.config) ? (raw.config as Partial<SchedulerConfig>) : undefined
    ),
    dailyStats: normalizeDailyStats(raw.dailyStats),
    version: STORAGE_VERSION,
  };

  if (isRecord(raw.cards)) {
    for (const [cardId, value] of Object.entries(raw.cards)) {
      normalized.cards[cardId] = normalizeCardState(value);
    }
  }

  ensureCurrentDay(normalized);
  return normalized;
}

function notifyStateListeners(): void {
  for (const listener of Array.from(stateListeners)) {
    listener();
  }
}

function persistPayload(payload: string): void {
  if (typeof window === 'undefined' || memoryFallbackActive) return;

  try {
    localStorage.setItem(STORAGE_KEY, payload);
  } catch {
    memoryFallbackActive = true;
  }
}

function hydrateState(raw: string | null): {
  state: StoredState;
  payload: string | null;
  persist: boolean;
} {
  if (!raw) {
    return {
      state: getDefaultState(),
      payload: null,
      persist: false,
    };
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const version = typeof parsed.version === 'number' ? parsed.version : 0;

    if (version !== STORAGE_VERSION) {
      const reset = getDefaultState();
      return {
        state: reset,
        payload: serializeState(reset),
        persist: true,
      };
    }

    return {
      state: normalizeV4(parsed),
      payload: raw,
      persist: false,
    };
  } catch {
    return {
      state: getDefaultState(),
      payload: raw,
      persist: false,
    };
  }
}

function setCurrentState(
  state: StoredState,
  options?: {
    notify?: boolean;
    persist?: boolean;
  }
): void {
  const normalized = normalizeV4(state);
  const payload = serializeState(normalized);

  cachedState = normalized;
  cachedPayload = payload;

  if (options?.persist !== false) {
    persistPayload(payload);
  }

  if (options?.notify !== false) {
    notifyStateListeners();
  }
}

function bindStorageEvents(): void {
  if (typeof window === 'undefined' || storageEventsBound) return;

  window.addEventListener('storage', (event) => {
    if (event.storageArea !== window.localStorage) return;
    if (event.key !== null && event.key !== STORAGE_KEY) return;

    memoryFallbackActive = false;

    let raw: string | null = null;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch {
      raw = cachedPayload;
    }

    const hydrated = hydrateState(raw);
    cachedState = hydrated.state;
    cachedPayload = hydrated.payload;

    if (hydrated.persist && hydrated.payload) {
      persistPayload(hydrated.payload);
      cachedPayload = hydrated.payload;
    }

    notifyStateListeners();
  });

  storageEventsBound = true;
}

function getCurrentState(): StoredState {
  if (typeof window === 'undefined') {
    return getDefaultState();
  }

  bindStorageEvents();

  if (memoryFallbackActive && cachedState) {
    return cachedState;
  }

  let raw: string | null = null;

  try {
    raw = localStorage.getItem(STORAGE_KEY);
    memoryFallbackActive = false;
  } catch {
    memoryFallbackActive = true;
    return cachedState ?? getDefaultState();
  }

  if (cachedState === null || raw !== cachedPayload) {
    const hydrated = hydrateState(raw);
    cachedState = hydrated.state;
    cachedPayload = hydrated.payload;

    if (hydrated.persist && hydrated.payload) {
      persistPayload(hydrated.payload);
      cachedPayload = hydrated.payload;
    }
  }

  if (cachedState) {
    const currentDay = getTodayKey();
    if (cachedState.dailyStats.dayKey !== currentDay) {
      setCurrentState(
        {
          ...cachedState,
          dailyStats: createDailyStats(currentDay),
        },
        { notify: false }
      );
    }
  }

  return cachedState ?? getDefaultState();
}

export function subscribeToStoredState(listener: StateListener): () => void {
  bindStorageEvents();
  stateListeners.add(listener);

  return () => {
    stateListeners.delete(listener);
  };
}

export function getStoredStateSnapshot(): StoredState {
  return getCurrentState();
}

export function getStoredStateServerSnapshot(): StoredState {
  return SERVER_STATE_SNAPSHOT;
}

export function loadState(): StoredState {
  return cloneStoredState(getCurrentState());
}

export function saveState(state: StoredState): void {
  setCurrentState(state);
}

export function updateState(mutator: (state: StoredState) => void): StoredState {
  const nextState = loadState();
  mutator(nextState);
  saveState(nextState);
  return cloneStoredState(getCurrentState());
}

export function getSchedulerConfig(): SchedulerConfig {
  return { ...getCurrentState().config };
}

export function updateSchedulerConfig(
  partial: Partial<SchedulerConfig>
): SchedulerConfig {
  const nextState = updateState((state) => {
    state.config = normalizeSchedulerConfig({
      ...state.config,
      ...partial,
    });
  });

  return { ...nextState.config };
}

export function getCardState(cardId: string): CardState {
  const state = getCurrentState();
  return state.cards[cardId] ? cloneCardState(state.cards[cardId]) : createInitialCardState();
}

export function updateCardState(cardId: string, cardState: CardState): void {
  updateState((state) => {
    state.cards[cardId] = normalizeCardState(cardState);
  });
}

export function getEssayProgress(cardIds: string[]): {
  total: number;
  reviewed: number;
  mastered: number;
} {
  const state = getCurrentState();
  let reviewed = 0;
  let mastered = 0;

  for (const id of cardIds) {
    const card = state.cards[id];
    if (card && isCardUnlocked(card)) {
      reviewed++;
      if (isMastered(card)) {
        mastered++;
      }
    }
  }

  return { total: cardIds.length, reviewed, mastered };
}
