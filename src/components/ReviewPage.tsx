'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  ReviewCard as ReviewCardData,
  Rating,
  SessionQueueBuild,
  buildSessionQueue,
  createInitialCardState,
  getDueLabel,
  isCardUnlocked,
  isDue,
  isMastered,
  previewNextDue,
  scheduleAnswer,
  unlockCardState,
} from '@/lib/spaced-repetition';
import { StoredState, loadState, saveState, updateState } from '@/lib/storage';
import { useStoredReviewState } from '@/lib/useStoredReviewState';
import { ReviewCard } from './ReviewCard';
import { quantumPrimerCards } from '@/data/quantum-primer-cards';
import { qrcCards } from '@/data/qrc-cards';
import { echoStateCards } from '@/data/echo-state-cards';
import { physicalReservoirCards } from '@/data/physical-reservoir-cards';
import { measurementCards } from '@/data/measurement-cards';
import styles from './ReviewPage.module.css';

type FilterTab = 'all' | 'due' | 'mastered';

interface EssayGroup {
  title: string;
  slug: string;
  cards: ReviewCardData[];
}

interface PageStats {
  total: number;
  due: number;
  mastered: number;
  newSeen: number;
  reviewSeen: number;
  sessionsCompleted: number;
  answers: number;
}

interface QueueMeta {
  total: number;
  dueLearning: number;
  dueReview: number;
  queuedNew: number;
  reviewRemaining: number;
  newRemaining: number;
}

interface SessionState {
  active: boolean;
  paused: boolean;
  queue: string[];
  initialCount: number;
  answered: number;
  streak: number;
}

const essayGroups: EssayGroup[] = [
  {
    title: 'Quantum Mechanics Basics',
    slug: '/quantum-primer',
    cards: quantumPrimerCards,
  },
  {
    title: 'What is Quantum Reservoir Computing',
    slug: '/qrc',
    cards: qrcCards,
  },
  {
    title: 'Why Go Quantum? From Classical to Quantum Reservoirs',
    slug: '/echo-state',
    cards: echoStateCards,
  },
  {
    title: 'Physical Quantum Reservoirs',
    slug: '/physical-reservoirs',
    cards: physicalReservoirCards,
  },
  {
    title: 'Measurement and Readout',
    slug: '/measurement',
    cards: measurementCards,
  },
];

const allCards = [...quantumPrimerCards, ...qrcCards, ...echoStateCards, ...physicalReservoirCards, ...measurementCards];

const EMPTY_SESSION: SessionState = {
  active: false,
  paused: false,
  queue: [],
  initialCount: 0,
  answered: 0,
  streak: 0,
};

function buildQueueFromState(state: StoredState): SessionQueueBuild {
  const unlockedCards = allCards.filter((card) =>
    isCardUnlocked(state.cards[card.id] ?? createInitialCardState())
  );

  return buildSessionQueue(
    unlockedCards,
    state.cards,
    state.config,
    {
      newSeen: state.dailyStats.newSeen,
      reviewSeen: state.dailyStats.reviewSeen,
    }
  );
}

function buildPageStats(state: StoredState): PageStats {
  let total = 0;
  let due = 0;
  let mastered = 0;

  for (const card of allCards) {
    const cardState = state.cards[card.id] ?? createInitialCardState();
    if (!isCardUnlocked(cardState)) continue;

    total += 1;
    if (isDue(cardState)) due += 1;
    if (isMastered(cardState)) mastered += 1;
  }

  return {
    total,
    due,
    mastered,
    newSeen: state.dailyStats.newSeen,
    reviewSeen: state.dailyStats.reviewSeen,
    sessionsCompleted: state.dailyStats.sessionsCompleted,
    answers: state.dailyStats.answers,
  };
}

export function ReviewPage() {
  const storedState = useStoredReviewState();
  const [activeTab, setActiveTab] = useState<FilterTab>('due');
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    '/quantum-primer': true,
    '/qrc': true,
    '/echo-state': true,
    '/physical-reservoirs': true,
    '/measurement': true,
  });
  const [session, setSession] = useState<SessionState>(EMPTY_SESSION);

  const cardById = useMemo(() => {
    const map: Record<string, ReviewCardData> = {};
    for (const card of allCards) map[card.id] = card;
    return map;
  }, []);

  const stats = useMemo(() => buildPageStats(storedState), [storedState]);
  const queueBuild = useMemo(() => buildQueueFromState(storedState), [storedState]);
  const queueMeta: QueueMeta = useMemo(() => ({
    total: queueBuild.queue.length,
    dueLearning: queueBuild.dueLearning,
    dueReview: queueBuild.dueReview,
    queuedNew: queueBuild.queuedNew,
    reviewRemaining: queueBuild.reviewRemaining,
    newRemaining: queueBuild.newRemaining,
  }), [queueBuild]);

  const toggleGroup = (slug: string) => {
    setOpenGroups((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const startSession = () => {
    const queue = queueBuild.queue.slice();
    setSession({
      active: true,
      paused: false,
      queue,
      initialCount: queue.length,
      answered: 0,
      streak: 0,
    });
  };

  const pauseResumeSession = () => {
    setSession((prev) => ({
      ...prev,
      paused: !prev.paused,
    }));
  };

  const endSession = () => {
    if (session.active && session.answered > 0) {
      updateState((state) => {
        state.dailyStats.sessionsCompleted += 1;
      });
    }

    setSession(EMPTY_SESSION);
  };

  const rebuildSessionQueue = () => {
    const queue = queueBuild.queue.slice();
    setSession((prev) => {
      if (!prev.active) {
        return {
          active: true,
          paused: false,
          queue,
          initialCount: queue.length,
          answered: 0,
          streak: 0,
        };
      }

      return {
        ...prev,
        paused: false,
        queue,
      };
    });
  };

  const handleRate = useCallback(
    (rating: Rating) => {
      const currentCardId = session.queue[0];
      if (!currentCardId || !session.active || session.paused) return;

      const state = loadState();
      const now = Date.now();
      const currentCardState = unlockCardState(
        state.cards[currentCardId] ?? createInitialCardState(),
        now
      );
      const previousStatus = currentCardState.status;

      const scheduleResult = scheduleAnswer(currentCardState, rating, {
        config: state.config,
        now,
      });

      const nextCardState = {
        ...scheduleResult.state,
        unlockedAt: currentCardState.unlockedAt,
      };

      if (nextCardState.lastSeenDayKey !== state.dailyStats.dayKey) {
        if (previousStatus === 'new') {
          state.dailyStats.newSeen += 1;
        } else {
          state.dailyStats.reviewSeen += 1;
        }
        nextCardState.lastSeenDayKey = state.dailyStats.dayKey;
      }

      state.dailyStats.answers += 1;
      state.cards[currentCardId] = nextCardState;
      saveState(state);

      setSession((prev) => {
        if (!prev.active || prev.paused || prev.queue.length === 0) return prev;

        const remaining = prev.queue.slice(1);
        let queue = remaining;

        if (scheduleResult.reinsertAfter !== null) {
          const insertAt = Math.min(Math.max(0, scheduleResult.reinsertAfter), queue.length);
          queue = [
            ...queue.slice(0, insertAt),
            currentCardId,
            ...queue.slice(insertAt),
          ];
        }

        return {
          ...prev,
          queue,
          answered: prev.answered + 1,
          streak: rating === 'again' ? 0 : prev.streak + 1,
        };
      });
    },
    [session]
  );

  const currentCardId = session.queue[0];
  const currentCard = currentCardId ? cardById[currentCardId] : null;

  const nextDueByRating = useMemo(() => {
    if (!currentCardId) return undefined;

    const state = storedState.cards[currentCardId] ?? createInitialCardState();
    return {
      again: previewNextDue(state, 'again'),
      hard: previewNextDue(state, 'hard'),
      good: previewNextDue(state, 'good'),
      easy: previewNextDue(state, 'easy'),
    };
  }, [currentCardId, storedState.cards]);

  const filterCards = (cards: ReviewCardData[]): ReviewCardData[] => {
    return cards.filter((card) => {
      const state = storedState.cards[card.id] ?? createInitialCardState();
      if (!isCardUnlocked(state)) return false;
      if (activeTab === 'all') return true;
      if (activeTab === 'due') return isDue(state);
      return isMastered(state);
    });
  };

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'due', label: `Due (${stats.due})` },
    { key: 'mastered', label: `Mastered (${stats.mastered})` },
    { key: 'all', label: `All (${stats.total})` },
  ];

  const completion = session.initialCount > 0
    ? Math.round((session.answered / session.initialCount) * 100)
    : 0;

  return (
    <div className={styles.page}>
      <div className={styles.headerSection}>
        <h1 className={styles.pageTitle}>Review Cards</h1>
      </div>

      <section className={styles.sessionPanel}>
        <div className={styles.sessionTop}>
          <div className={styles.sessionSignals}>
            <span className={styles.signalPill}>Queue {queueMeta.total}</span>
            <span className={styles.signalPill}>Learning {queueMeta.dueLearning}</span>
            <span className={styles.signalPill}>Review {queueMeta.dueReview}</span>
            <span className={styles.signalPill}>New Today {queueMeta.queuedNew}</span>
          </div>
          <div className={styles.sessionControls}>
            {!session.active ? (
              <button className={`${styles.sessionBtn} ${styles.primaryBtn}`} onClick={startSession}>
                Start Review
              </button>
            ) : (
              <>
                <button className={styles.sessionBtn} onClick={pauseResumeSession}>
                  {session.paused ? 'Resume' : 'Pause'}
                </button>
                <button className={styles.sessionBtn} onClick={rebuildSessionQueue}>
                  Refresh Queue
                </button>
                <button className={`${styles.sessionBtn} ${styles.dangerBtn}`} onClick={endSession}>
                  End Review
                </button>
              </>
            )}
          </div>
        </div>

        <div className={styles.sessionStatsBar}>
          <span>Done {session.answered}</span>
          <span>Streak {session.streak}</span>
          <span>Completion {completion}%</span>
          <span>Limits left: {queueMeta.newRemaining} new / {queueMeta.reviewRemaining} review</span>
        </div>

        {session.active && session.paused && (
          <div className={styles.sessionMessage}>Review paused. Resume when you want the next card.</div>
        )}

        {session.active && !session.paused && currentCard && (
          <div className={styles.sessionCardWrap}>
            <ReviewCard
              key={currentCard.id}
              question={currentCard.question}
              answer={currentCard.answer}
              nextDueByRating={nextDueByRating}
              onRate={handleRate}
            />
          </div>
        )}

        {session.active && !session.paused && !currentCard && (
          <div className={styles.sessionMessage}>
            Nothing due remains in this queue. Refresh the queue or finish the review.
          </div>
        )}

        {!session.active && (
          <div className={styles.sessionMessage}>
            {queueMeta.total > 0
              ? 'Start a review to work through the cards that are due right now.'
              : stats.total > 0
                ? 'You have unlocked cards, but none are due at the moment. Use the All tab or return at the next interval.'
                : 'No cards are unlocked yet. Reveal and answer in-text cards inside an essay to bring them here.'}
          </div>
        )}

        {session.active && session.queue.length > 1 && (
          <div className={styles.upNext}>
            <div className={styles.upNextLabel}>Up next</div>
            <div className={styles.upNextList}>
              {session.queue.slice(1, 6).map((id) => (
                <div key={id} className={styles.upNextItem}>{cardById[id]?.question || id}</div>
              ))}
              {session.queue.length > 6 && (
                <div className={styles.upNextItem}>+{session.queue.length - 6} more</div>
              )}
            </div>
          </div>
        )}
      </section>

      <div className={styles.statsHeader}>
        <div className={styles.statCard}>
          <div className={`${styles.statValue} ${styles.statValueDue}`}>{stats.due}</div>
          <div className={styles.statLabel}>Due Now</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statValue} ${styles.statValueMastered}`}>{stats.mastered}</div>
          <div className={styles.statLabel}>Mastered</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statValue} ${styles.statValueTotal}`}>{stats.newSeen + stats.reviewSeen}</div>
          <div className={styles.statLabel}>Reviews Today</div>
        </div>
      </div>

      <div className={styles.metaRow}>
        <span>New seen today: {stats.newSeen}</span>
        <span>Review seen today: {stats.reviewSeen}</span>
        <span>Sessions today: {stats.sessionsCompleted}</span>
        <span>Total answers today: {stats.answers}</span>
      </div>

      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {essayGroups.map((group) => {
        const filtered = filterCards(group.cards);
        if (filtered.length === 0) return null;

        const isOpen = openGroups[group.slug];
        return (
          <div key={group.slug} className={styles.essayGroup}>
            <div
              className={styles.essayGroupHeader}
              onClick={() => toggleGroup(group.slug)}
            >
              <span className={styles.essayGroupTitle}>{group.title}</span>
              <div className={styles.essayGroupMeta}>
                <span className={styles.essayGroupCount}>
                  {filtered.length} card{filtered.length !== 1 ? 's' : ''}
                </span>
                <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>▾</span>
              </div>
            </div>

            {isOpen && (
              <div className={styles.libraryList}>
                {filtered.map((card) => {
                  const state = storedState.cards[card.id] ?? createInitialCardState();
                  return (
                    <div key={card.id} className={styles.libraryItem}>
                      <div className={styles.libraryQuestion}>{card.question}</div>
                      <div className={styles.libraryMeta}>
                        <span className={styles.statusTag}>{state.status}</span>
                        <span>Due {getDueLabel(state.dueAt)}</span>
                        <span>Interval {state.scheduledDays || 0}d</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {stats.total === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>◇</div>
          <div className={styles.emptyTitle}>No unlocked cards yet</div>
          <div className={styles.emptyDesc}>
            Cards appear here only after you answer them once in the essay text.
          </div>
        </div>
      )}

      {stats.total > 0 && essayGroups.every((group) => filterCards(group.cards).length === 0) && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>◇</div>
          <div className={styles.emptyTitle}>No cards in this filter</div>
          <div className={styles.emptyDesc}>Try another tab or start a new review session.</div>
        </div>
      )}
    </div>
  );
}
