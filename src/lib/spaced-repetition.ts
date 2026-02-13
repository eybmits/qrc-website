export type CardStatus = 'new' | 'learning' | 'review' | 'relearning';

export interface CardState {
  status: CardStatus;
  dueAt: number;
  lastReviewedAt: number;
  unlockedAt: number;
  easeFactor: number;
  repetitions: number;
  lapses: number;
  learningStepIndex: number;
  scheduledDays: number;
  reviewCount: number;
  lastSeenDayKey: string;
}

export interface ReviewCard {
  id: string;
  question: string;
  answer: string;
}

export type Rating = 'again' | 'hard' | 'good' | 'easy';

export const RATING_LABELS: Record<Rating, string> = {
  again: 'Again',
  hard: 'Hard',
  good: 'Good',
  easy: 'Easy',
};

export interface SchedulerConfig {
  learningStepsMinutes: number[];
  relearningStepsMinutes: number[];
  graduatingIntervalDays: number;
  easyIntervalDays: number;
  hardIntervalMultiplier: number;
  easyBonus: number;
  intervalModifier: number;
  minimumEaseFactor: number;
  newPerDay: number;
  reviewPerDay: number;
}

export const DEFAULT_SCHEDULER_CONFIG: SchedulerConfig = {
  learningStepsMinutes: [1, 10],
  relearningStepsMinutes: [10],
  graduatingIntervalDays: 1,
  easyIntervalDays: 4,
  hardIntervalMultiplier: 1.2,
  easyBonus: 1.3,
  intervalModifier: 1,
  minimumEaseFactor: 1.3,
  newPerDay: 20,
  reviewPerDay: 200,
};

const MINUTE_MS = 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function normalizeSteps(steps: number[] | undefined, fallback: number[]): number[] {
  const source = Array.isArray(steps) ? steps : fallback;
  const normalized = source
    .map((step) => Math.max(1, Math.round(step)))
    .filter((step) => Number.isFinite(step));
  return normalized.length > 0 ? normalized : fallback;
}

export function normalizeSchedulerConfig(
  partial?: Partial<SchedulerConfig>
): SchedulerConfig {
  const merged = {
    ...DEFAULT_SCHEDULER_CONFIG,
    ...(partial || {}),
  };

  return {
    learningStepsMinutes: normalizeSteps(
      merged.learningStepsMinutes,
      DEFAULT_SCHEDULER_CONFIG.learningStepsMinutes
    ),
    relearningStepsMinutes: normalizeSteps(
      merged.relearningStepsMinutes,
      DEFAULT_SCHEDULER_CONFIG.relearningStepsMinutes
    ),
    graduatingIntervalDays: Math.max(1, Math.round(merged.graduatingIntervalDays)),
    easyIntervalDays: Math.max(2, Math.round(merged.easyIntervalDays)),
    hardIntervalMultiplier: clamp(merged.hardIntervalMultiplier, 1.0, 2.0),
    easyBonus: clamp(merged.easyBonus, 1.05, 2.2),
    intervalModifier: clamp(merged.intervalModifier, 0.6, 1.6),
    minimumEaseFactor: clamp(merged.minimumEaseFactor, 1.3, 2.5),
    newPerDay: Math.max(0, Math.round(merged.newPerDay)),
    reviewPerDay: Math.max(0, Math.round(merged.reviewPerDay)),
  };
}

export function createInitialCardState(): CardState {
  return {
    status: 'new',
    dueAt: 0,
    lastReviewedAt: 0,
    unlockedAt: 0,
    easeFactor: 2.5,
    repetitions: 0,
    lapses: 0,
    learningStepIndex: 0,
    scheduledDays: 0,
    reviewCount: 0,
    lastSeenDayKey: '',
  };
}

function withDueMinutes(now: number, minutes: number): number {
  return now + Math.max(1, Math.round(minutes)) * MINUTE_MS;
}

function withDueDays(now: number, days: number): number {
  return now + Math.max(1, Math.round(days)) * DAY_MS;
}

function graduateToReview(
  state: CardState,
  now: number,
  days: number
): CardState {
  const normalizedDays = Math.max(1, Math.round(days));
  return {
    ...state,
    status: 'review',
    learningStepIndex: 0,
    scheduledDays: normalizedDays,
    dueAt: withDueDays(now, normalizedDays),
  };
}

function calculateReviewDays(
  baseDays: number,
  easeFactor: number,
  config: SchedulerConfig,
  rating: Exclude<Rating, 'again'>
): number {
  const base = Math.max(1, Math.round(baseDays));

  if (rating === 'hard') {
    return Math.max(1, Math.round(base * config.hardIntervalMultiplier));
  }

  if (rating === 'good') {
    return Math.max(
      1,
      Math.round(base * easeFactor * config.intervalModifier)
    );
  }

  const hardDays = Math.max(1, Math.round(base * config.hardIntervalMultiplier));
  const easyDays = Math.max(
    1,
    Math.round(base * easeFactor * config.easyBonus * config.intervalModifier)
  );
  return Math.max(hardDays + 1, easyDays);
}

function adjustEaseFactor(
  current: number,
  rating: Rating,
  minimum: number
): number {
  let updated = current;

  if (rating === 'again') updated -= 0.2;
  if (rating === 'hard') updated -= 0.15;
  if (rating === 'good') updated += 0.02;
  if (rating === 'easy') updated += 0.15;

  return clamp(updated, minimum, 3.2);
}

export function getDueLabel(dueAt: number, now: number = Date.now()): string {
  if (dueAt <= now) return 'now';

  const diff = dueAt - now;
  const minutes = Math.round(diff / MINUTE_MS);

  if (minutes < 60) {
    return `in ${minutes}m`;
  }

  const hours = Math.round(diff / (60 * MINUTE_MS));
  if (hours < 24) {
    return `in ${hours}h`;
  }

  const days = Math.round(diff / DAY_MS);
  if (days === 1) {
    return 'tomorrow';
  }

  return `in ${days}d`;
}

export interface ScheduleResult {
  state: CardState;
  reinsertAfter: number | null;
  nextDueLabel: string;
}

export function scheduleAnswer(
  state: CardState,
  rating: Rating,
  options?: {
    now?: number;
    config?: Partial<SchedulerConfig>;
  }
): ScheduleResult {
  const config = normalizeSchedulerConfig(options?.config);
  const now = options?.now ?? Date.now();
  const next = {
    ...state,
    lastReviewedAt: now,
    easeFactor: adjustEaseFactor(state.easeFactor, rating, config.minimumEaseFactor),
    reviewCount: state.reviewCount + 1,
    repetitions: rating === 'again' ? 0 : state.repetitions + 1,
  };

  let reinsertAfter: number | null = null;

  if (state.status === 'new' || state.status === 'learning') {
    const steps = config.learningStepsMinutes;
    const currentStep = clamp(state.learningStepIndex, 0, steps.length - 1);

    if (rating === 'again') {
      next.status = 'learning';
      next.learningStepIndex = 0;
      next.scheduledDays = 0;
      next.dueAt = withDueMinutes(now, steps[0]);
      reinsertAfter = 1;
    } else if (rating === 'hard') {
      next.status = 'learning';
      next.learningStepIndex = currentStep;
      next.scheduledDays = 0;
      next.dueAt = withDueMinutes(now, steps[currentStep]);
      reinsertAfter = 3;
    } else if (rating === 'good') {
      const nextStep = currentStep + 1;
      if (nextStep < steps.length) {
        next.status = 'learning';
        next.learningStepIndex = nextStep;
        next.scheduledDays = 0;
        next.dueAt = withDueMinutes(now, steps[nextStep]);
      } else {
        Object.assign(
          next,
          graduateToReview(next, now, config.graduatingIntervalDays)
        );
      }
    } else {
      Object.assign(next, graduateToReview(next, now, config.easyIntervalDays));
    }
  } else if (state.status === 'review') {
    const baseDays = Math.max(1, state.scheduledDays || config.graduatingIntervalDays);

    if (rating === 'again') {
      const relearnSteps = config.relearningStepsMinutes;
      next.status = 'relearning';
      next.learningStepIndex = 0;
      next.lapses = state.lapses + 1;
      next.scheduledDays = 0;
      next.dueAt = withDueMinutes(now, relearnSteps[0]);
      reinsertAfter = 1;
    } else {
      const nextDays = calculateReviewDays(baseDays, next.easeFactor, config, rating);
      next.status = 'review';
      next.learningStepIndex = 0;
      next.scheduledDays = nextDays;
      next.dueAt = withDueDays(now, nextDays);

      if (rating === 'hard') {
        reinsertAfter = 4;
      }
    }
  } else {
    const relearnSteps = config.relearningStepsMinutes;
    const currentStep = clamp(state.learningStepIndex, 0, relearnSteps.length - 1);

    if (rating === 'again') {
      next.status = 'relearning';
      next.learningStepIndex = 0;
      next.scheduledDays = 0;
      next.dueAt = withDueMinutes(now, relearnSteps[0]);
      reinsertAfter = 1;
    } else if (rating === 'hard') {
      next.status = 'relearning';
      next.learningStepIndex = currentStep;
      next.scheduledDays = 0;
      next.dueAt = withDueMinutes(now, relearnSteps[currentStep]);
      reinsertAfter = 3;
    } else if (rating === 'good') {
      const nextStep = currentStep + 1;
      if (nextStep < relearnSteps.length) {
        next.status = 'relearning';
        next.learningStepIndex = nextStep;
        next.scheduledDays = 0;
        next.dueAt = withDueMinutes(now, relearnSteps[nextStep]);
      } else {
        Object.assign(
          next,
          graduateToReview(next, now, config.graduatingIntervalDays)
        );
      }
    } else {
      Object.assign(next, graduateToReview(next, now, config.easyIntervalDays));
    }
  }

  return {
    state: next,
    reinsertAfter,
    nextDueLabel: getDueLabel(next.dueAt, now),
  };
}

export function previewNextDue(
  state: CardState,
  rating: Rating,
  options?: {
    now?: number;
    config?: Partial<SchedulerConfig>;
  }
): string {
  return scheduleAnswer(state, rating, options).nextDueLabel;
}

export function isDue(state: CardState, now: number = Date.now()): boolean {
  return state.dueAt <= now;
}

export function isCardUnlocked(state: CardState): boolean {
  return state.unlockedAt > 0;
}

export function unlockCardState(state: CardState, now: number = Date.now()): CardState {
  if (isCardUnlocked(state)) return state;
  return {
    ...state,
    unlockedAt: Math.max(1, Math.round(now)),
  };
}

export function isMastered(state: CardState): boolean {
  return state.status === 'review' && state.scheduledDays >= 7 && state.repetitions >= 3;
}

export function countDue(
  states: Record<string, CardState>,
  now: number = Date.now()
): number {
  return Object.values(states).filter((state) => isCardUnlocked(state) && isDue(state, now)).length;
}

export interface SessionQueueBuild {
  queue: string[];
  dueLearning: number;
  dueReview: number;
  queuedNew: number;
  reviewRemaining: number;
  newRemaining: number;
}

export function buildSessionQueue(
  cards: ReviewCard[],
  states: Record<string, CardState>,
  configPartial?: Partial<SchedulerConfig>,
  dailyStats?: { newSeen: number; reviewSeen: number },
  now: number = Date.now()
): SessionQueueBuild {
  const config = normalizeSchedulerConfig(configPartial);
  const reviewRemaining = Math.max(0, config.reviewPerDay - (dailyStats?.reviewSeen ?? 0));
  const newRemaining = Math.max(0, config.newPerDay - (dailyStats?.newSeen ?? 0));

  const dueLearning: string[] = [];
  const dueReview: string[] = [];
  const dueNew: string[] = [];

  for (const card of cards) {
    const state = states[card.id] ?? createInitialCardState();
    if (!isCardUnlocked(state)) continue;

    if ((state.status === 'learning' || state.status === 'relearning') && isDue(state, now)) {
      dueLearning.push(card.id);
      continue;
    }

    if (state.status === 'review' && isDue(state, now)) {
      dueReview.push(card.id);
      continue;
    }

    if (state.status === 'new' && isDue(state, now)) {
      dueNew.push(card.id);
    }
  }

  const reviewSlice = dueReview.slice(0, reviewRemaining);
  const newSlice = dueNew.slice(0, newRemaining);

  return {
    queue: [...dueLearning, ...reviewSlice, ...newSlice],
    dueLearning: dueLearning.length,
    dueReview: dueReview.length,
    queuedNew: newSlice.length,
    reviewRemaining,
    newRemaining,
  };
}
