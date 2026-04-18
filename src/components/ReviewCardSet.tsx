'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ReviewCard as ReviewCardData,
  Rating,
  createInitialCardState,
  previewNextDue,
  scheduleAnswer,
  unlockCardState,
} from '@/lib/spaced-repetition';
import { getCardState, loadState, saveState } from '@/lib/storage';
import { ReviewCard } from './ReviewCard';
import styles from './ReviewCardSet.module.css';

interface ReviewCardSetProps {
  cards: ReviewCardData[];
}

export function ReviewCardSet({ cards }: ReviewCardSetProps) {
  const [reviewedCount, setReviewedCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const advanceTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current !== null) {
        window.clearTimeout(advanceTimeoutRef.current);
      }
    };
  }, []);

  const handleRate = useCallback((cardId: string, rating: Rating) => {
    if (isAdvancing) return;

    const state = loadState();
    const now = Date.now();
    const currentState = state.cards[cardId] ?? createInitialCardState();
    const unlockedState = unlockCardState(currentState, now);
    const previousStatus = unlockedState.status;

    const result = scheduleAnswer(unlockedState, rating, {
      config: state.config,
      now,
    });

    const nextState = {
      ...result.state,
      unlockedAt: unlockedState.unlockedAt,
    };

    if (nextState.lastSeenDayKey !== state.dailyStats.dayKey) {
      if (previousStatus === 'new') {
        state.dailyStats.newSeen += 1;
      } else {
        state.dailyStats.reviewSeen += 1;
      }
      nextState.lastSeenDayKey = state.dailyStats.dayKey;
    }

    state.dailyStats.answers += 1;
    state.cards[cardId] = nextState;
    saveState(state);

    setReviewedCount((count) => count + 1);
    setIsAdvancing(true);

    advanceTimeoutRef.current = window.setTimeout(() => {
      setActiveIndex((index) => Math.min(index + 1, cards.length));
      setIsAdvancing(false);
    }, 380);
  }, [cards.length, isAdvancing]);

  const progress = cards.length > 0 ? (reviewedCount / cards.length) * 100 : 0;
  const activeCard = cards[activeIndex];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.icon}>◈</span>
          <span className={styles.headerTitle}>Review: test your understanding</span>
        </div>
        <span className={styles.count}>
          {reviewedCount}/{cards.length} cards
        </span>
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={styles.stage}>
        {activeCard ? (
          <div
            key={activeCard.id}
            className={`${styles.cardFrame} ${isAdvancing ? styles.cardFrameLeaving : ''}`}
          >
            {(() => {
              const cardState = getCardState(activeCard.id);
              const nextDueByRating = {
                again: previewNextDue(cardState, 'again'),
                hard: previewNextDue(cardState, 'hard'),
                good: previewNextDue(cardState, 'good'),
                easy: previewNextDue(cardState, 'easy'),
              };

              return (
                <ReviewCard
                  key={activeCard.id}
                  className={styles.singleCard}
                  question={activeCard.question}
                  answer={activeCard.answer}
                  nextDueByRating={nextDueByRating}
                  onRate={(rating) => handleRate(activeCard.id, rating)}
                  disabled={isAdvancing}
                />
              );
            })()}
          </div>
        ) : (
          <div className={styles.completeState}>
            <div className={styles.completeEyebrow}>Review complete</div>
            <div className={styles.completeTitle}>All cards in this set are done.</div>
            <p className={styles.completeText}>
              The next card will only appear when it becomes due again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
