'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ReviewCard as ReviewCardData,
  Rating,
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
import { loadState, saveState } from '@/lib/storage';
import { ReviewCard } from './ReviewCard';
import { quantumPrimerCards } from '@/data/quantum-primer-cards';
import { qrcCards } from '@/data/qrc-cards';
import { echoStateCards } from '@/data/echo-state-cards';
import { physicalReservoirCards } from '@/data/physical-reservoir-cards';
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
    title: 'Quantum Mechanics Primer',
    slug: '/quantum-primer',
    cards: quantumPrimerCards,
  },
  {
    title: 'Quantum Reservoir Computing',
    slug: '/qrc',
    cards: qrcCards,
  },
  {
    title: 'Echo State Networks',
    slug: '/echo-state',
    cards: echoStateCards,
  },
  {
    title: 'Physical Reservoir Computing',
    slug: '/physical-reservoirs',
    cards: physicalReservoirCards,
  },
];

const allCards = [...quantumPrimerCards, ...qrcCards, ...echoStateCards, ...physicalReservoirCards];

const EMPTY_SESSION: SessionState = {
  active: false,
  paused: false,
  queue: [],
  initialCount: 0,
  answered: 0,
  streak: 0,
};

export function ReviewPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('due');
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    '/quantum-primer': true,
    '/qrc': true,
    '/echo-state': true,
    '/physical-reservoirs': true,
  });
  const [session, setSession] = useState<SessionState>(EMPTY_SESSION);
  const [cardStates, setCardStates] = useState<Record<string, ReturnType<typeof createInitialCardState>>>({});
  const [stats, setStats] = useState<PageStats>({
    total: 0,
    due: 0,
    mastered: 0,
    newSeen: 0,
    reviewSeen: 0,
    sessionsCompleted: 0,
    answers: 0,
  });
  const [queueMeta, setQueueMeta] = useState<QueueMeta>({
    total: 0,
    dueLearning: 0,
    dueReview: 0,
    queuedNew: 0,
    reviewRemaining: 0,
    newRemaining: 0,
  });

  const cardById = useMemo(() => {
    const map: Record<string, ReviewCardData> = {};
    for (const card of allCards) map[card.id] = card;
    return map;
  }, []);

  const refreshFromStorage = useCallback(() => {
    const state = loadState();
    let total = 0;
    let due = 0;
    let mastered = 0;

    for (const card of allCards) {
      const cs = state.cards[card.id] ?? createInitialCardState();
      if (!isCardUnlocked(cs)) continue;
      total += 1;
      if (isDue(cs)) due += 1;
      if (isMastered(cs)) mastered += 1;
    }

    setCardStates(state.cards);
    setStats({
      total,
      due,
      mastered,
      newSeen: state.dailyStats.newSeen,
      reviewSeen: state.dailyStats.reviewSeen,
      sessionsCompleted: state.dailyStats.sessionsCompleted,
      answers: state.dailyStats.answers,
    });
  }, []);

  const rebuildQueueMeta = useCallback(() => {
    const state = loadState();
    const unlockedCards = allCards.filter((card) =>
      isCardUnlocked(state.cards[card.id] ?? createInitialCardState())
    );
    const built = buildSessionQueue(
      unlockedCards,
      state.cards,
      state.config,
      {
        newSeen: state.dailyStats.newSeen,
        reviewSeen: state.dailyStats.reviewSeen,
      }
    );

    setQueueMeta({
      total: built.queue.length,
      dueLearning: built.dueLearning,
      dueReview: built.dueReview,
      queuedNew: built.queuedNew,
      reviewRemaining: built.reviewRemaining,
      newRemaining: built.newRemaining,
    });

    return built.queue;
  }, []);

  useEffect(() => {
    refreshFromStorage();
    rebuildQueueMeta();
  }, [refreshFromStorage, rebuildQueueMeta]);

  const toggleGroup = (slug: string) => {
    setOpenGroups((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const startSession = () => {
    const queue = rebuildQueueMeta();
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
    setSession((prev) => {
      if (prev.active && prev.answered > 0) {
        const state = loadState();
        state.dailyStats.sessionsCompleted += 1;
        saveState(state);
      }
      return EMPTY_SESSION;
    });

    refreshFromStorage();
    rebuildQueueMeta();
  };

  const rebuildSessionQueue = () => {
    const queue = rebuildQueueMeta();
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

      const result = scheduleAnswer(currentCardState, rating, {
        config: state.config,
        now,
      });

      const nextCardState = {
        ...result.state,
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

        if (result.reinsertAfter !== null) {
          const insertAt = Math.min(Math.max(0, result.reinsertAfter), queue.length);
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

      refreshFromStorage();
      rebuildQueueMeta();
    },
    [session, refreshFromStorage, rebuildQueueMeta]
  );

  const currentCardId = session.queue[0];
  const currentCard = currentCardId ? cardById[currentCardId] : null;

  const nextDueByRating = useMemo(() => {
    if (!currentCardId) return undefined;

    const state = cardStates[currentCardId] ?? createInitialCardState();
    return {
      again: previewNextDue(state, 'again'),
      hard: previewNextDue(state, 'hard'),
      good: previewNextDue(state, 'good'),
      easy: previewNextDue(state, 'easy'),
    };
  }, [currentCardId, cardStates]);

  const filterCards = (cards: ReviewCardData[]): ReviewCardData[] => {
    return cards.filter((card) => {
      const state = cardStates[card.id] ?? createInitialCardState();
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
        <h1 className={styles.pageTitle}>Review Reactor</h1>
        <p className={styles.pageSubtitle}>
          Anki-like scheduling with live queue dynamics. Hard cards return faster,
          stable cards expand their interval.
        </p>
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
                Start Session
              </button>
            ) : (
              <>
                <button className={styles.sessionBtn} onClick={pauseResumeSession}>
                  {session.paused ? 'Resume' : 'Pause'}
                </button>
                <button className={styles.sessionBtn} onClick={rebuildSessionQueue}>
                  Rebuild Queue
                </button>
                <button className={`${styles.sessionBtn} ${styles.dangerBtn}`} onClick={endSession}>
                  End Session
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
          <div className={styles.sessionMessage}>Session paused. Resume to continue reviewing.</div>
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
            No due unlocked cards left in this queue. Rebuild queue or end session.
          </div>
        )}

        {!session.active && (
          <div className={styles.sessionMessage}>
            {queueMeta.total > 0
              ? 'Start a session to review due unlocked cards with dynamic reinsertion.'
              : stats.total > 0
                ? 'Unlocked cards exist, but none are due right now. Use the All tab or come back at the next due interval.'
                : 'No unlocked cards yet. Answer in-text cards inside an essay to unlock them for this hub.'}
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
                  const state = cardStates[card.id] ?? createInitialCardState();
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
          <div className={styles.emptyIcon}>◈</div>
          <div className={styles.emptyTitle}>No unlocked cards yet</div>
          <div className={styles.emptyDesc}>
            Cards appear here only after you answer them once in the essay text.
          </div>
        </div>
      )}

      {stats.total > 0 && essayGroups.every((group) => filterCards(group.cards).length === 0) && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>◈</div>
          <div className={styles.emptyTitle}>No cards in this filter</div>
          <div className={styles.emptyDesc}>Try another tab or start a new review session.</div>
        </div>
      )}
    </div>
  );
}
