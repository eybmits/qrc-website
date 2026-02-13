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
  version: 3;
}

type LegacyCardState = {
  easeFactor?: number;
  interval?: number;
  repetitions?: number;
  nextReview?: number;
  lastReview?: number;
};

type LegacyStoredState = {
  cards?: Record<string, LegacyCardState>;
  config?: unknown;
  dailyStats?: unknown;
  version?: number;
};

interface StoredStateV2 {
  cards: Record<string, CardState>;
  config: SchedulerConfig;
  dailyStats: DailyStats;
  version: 2;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toFiniteNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function toNonNegativeInt(value: unknown, fallback: number): number {
  const numeric = toFiniteNumber(value, fallback);
  return Math.max(0, Math.round(numeric));
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
    version: 3,
  };
}

function normalizeCardState(raw: unknown): CardState {
  const fallback = createInitialCardState();
  if (!isRecord(raw)) {
    return fallback;
  }

  const rawStatus = toStatus(raw.status);
  const legacyRepetitions = toNonNegativeInt(raw.repetitions, 0);
  const legacyInterval = toNonNegativeInt(raw.interval, 0);
  const legacyNextReview = toNonNegativeInt(raw.nextReview, 0);

  const derivedStatus: CardStatus =
    rawStatus ||
    (legacyRepetitions > 0
      ? 'review'
      : legacyNextReview > 0
        ? 'learning'
        : 'new');

  const dueAtCandidate = toNonNegativeInt(raw.dueAt, legacyNextReview);

  return {
    status: derivedStatus,
    dueAt: derivedStatus === 'new' ? dueAtCandidate : Math.max(1, dueAtCandidate),
    lastReviewedAt: toNonNegativeInt(raw.lastReviewedAt, toNonNegativeInt(raw.lastReview, 0)),
    unlockedAt: toNonNegativeInt(raw.unlockedAt, 0),
    easeFactor: Math.max(1.3, toFiniteNumber(raw.easeFactor, 2.5)),
    repetitions: toNonNegativeInt(raw.repetitions, 0),
    lapses: toNonNegativeInt(raw.lapses, 0),
    learningStepIndex: toNonNegativeInt(raw.learningStepIndex, 0),
    scheduledDays: toNonNegativeInt(raw.scheduledDays, legacyInterval),
    reviewCount: toNonNegativeInt(raw.reviewCount, legacyRepetitions),
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

function migrateV1ToV2(raw: unknown): StoredStateV2 {
  const migrated: StoredStateV2 = {
    cards: {},
    config: { ...DEFAULT_SCHEDULER_CONFIG },
    dailyStats: createDailyStats(),
    version: 2,
  };
  if (!isRecord(raw)) return migrated;

  if (isRecord(raw.cards)) {
    for (const [cardId, value] of Object.entries(raw.cards)) {
      migrated.cards[cardId] = normalizeCardState(value);
    }
  }

  if (isRecord(raw.config)) {
    migrated.config = normalizeSchedulerConfig(raw.config as Partial<SchedulerConfig>);
  }

  if (isRecord(raw.dailyStats)) {
    migrated.dailyStats = normalizeDailyStats(raw.dailyStats);
  }

  ensureCurrentDay(migrated);
  return migrated;
}

function normalizeV2(raw: unknown): StoredStateV2 {
  if (!isRecord(raw)) {
    return {
      cards: {},
      config: { ...DEFAULT_SCHEDULER_CONFIG },
      dailyStats: createDailyStats(),
      version: 2,
    };
  }

  const normalized: StoredStateV2 = {
    cards: {},
    config: normalizeSchedulerConfig(
      isRecord(raw.config) ? (raw.config as Partial<SchedulerConfig>) : undefined
    ),
    dailyStats: normalizeDailyStats(raw.dailyStats),
    version: 2,
  };

  if (isRecord(raw.cards)) {
    for (const [cardId, value] of Object.entries(raw.cards)) {
      normalized.cards[cardId] = normalizeCardState(value);
    }
  }

  ensureCurrentDay(normalized);
  return normalized;
}

function normalizeV3(raw: unknown): StoredState {
  if (!isRecord(raw)) return getDefaultState();

  const normalized: StoredState = {
    cards: {},
    config: normalizeSchedulerConfig(
      isRecord(raw.config) ? (raw.config as Partial<SchedulerConfig>) : undefined
    ),
    dailyStats: normalizeDailyStats(raw.dailyStats),
    version: 3,
  };

  if (isRecord(raw.cards)) {
    for (const [cardId, value] of Object.entries(raw.cards)) {
      normalized.cards[cardId] = normalizeCardState(value);
    }
  }

  ensureCurrentDay(normalized);
  return normalized;
}

function migrateLegacyToV3(raw: unknown): StoredState {
  const normalizedLegacy = isRecord(raw) && raw.version === 2 ? normalizeV2(raw) : migrateV1ToV2(raw);
  const migrated: StoredState = {
    cards: {},
    config: normalizedLegacy.config,
    dailyStats: normalizedLegacy.dailyStats,
    version: 3,
  };

  // User-chosen migration mode: cards are locked again until first in-text answer.
  for (const [cardId, cardState] of Object.entries(normalizedLegacy.cards)) {
    migrated.cards[cardId] = {
      ...normalizeCardState(cardState),
      unlockedAt: 0,
    };
  }

  ensureCurrentDay(migrated);
  return migrated;
}

export function loadState(): StoredState {
  if (typeof window === 'undefined') return getDefaultState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();

    const parsed = JSON.parse(raw) as LegacyStoredState & Record<string, unknown>;
    const version = typeof parsed.version === 'number' ? parsed.version : 1;
    const state = version === 3 ? normalizeV3(parsed) : migrateLegacyToV3(parsed);

    if (version !== 3) {
      saveState(state);
    }

    return state;
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
      version: 3,
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
