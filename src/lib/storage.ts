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

  const dayKey = typeof raw.dayKey === 'string' && raw.dayKey.length > 0
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

function resetStateAndPersist(): StoredState {
  const reset = getDefaultState();
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
    }
  } catch {
    // localStorage might be full or unavailable
  }
  return reset;
}

export function loadState(): StoredState {
  if (typeof window === 'undefined') return getDefaultState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();

    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const version = typeof parsed.version === 'number' ? parsed.version : 0;

    // Curriculum reset policy: any pre-v4 state is discarded.
    if (version !== STORAGE_VERSION) {
      return resetStateAndPersist();
    }

    return normalizeV4(parsed);
  } catch {
    return getDefaultState();
  }
}

export function saveState(state: StoredState): void {
  if (typeof window === 'undefined') return;

  try {
    const normalized: StoredState = {
      ...state,
      config: normalizeSchedulerConfig(state.config),
      dailyStats: normalizeDailyStats(state.dailyStats),
      version: STORAGE_VERSION,
    };
    ensureCurrentDay(normalized);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    // localStorage might be full or unavailable
  }
}

export function getSchedulerConfig(): SchedulerConfig {
  return loadState().config;
}

export function updateSchedulerConfig(
  partial: Partial<SchedulerConfig>
): SchedulerConfig {
  const state = loadState();
  state.config = normalizeSchedulerConfig({
    ...state.config,
    ...partial,
  });
  saveState(state);
  return state.config;
}

export function getCardState(cardId: string): CardState {
  const state = loadState();
  return state.cards[cardId] || createInitialCardState();
}

export function updateCardState(cardId: string, cardState: CardState): void {
  const state = loadState();
  state.cards[cardId] = normalizeCardState(cardState);
  saveState(state);
}

export function getEssayProgress(cardIds: string[]): {
  total: number;
  reviewed: number;
  mastered: number;
} {
  const state = loadState();
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
