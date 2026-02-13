'use client';

import { useCallback, useState } from 'react';
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

  const handleRate = useCallback((cardId: string, rating: Rating) => {
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
  }, []);

  const progress = cards.length > 0 ? (reviewedCount / cards.length) * 100 : 0;

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

      <div className={styles.cards}>
        {cards.map((card) => {
          const cardState = getCardState(card.id);
          const nextDueByRating = {
            again: previewNextDue(cardState, 'again'),
            hard: previewNextDue(cardState, 'hard'),
            good: previewNextDue(cardState, 'good'),
            easy: previewNextDue(cardState, 'easy'),
          };

          return (
            <ReviewCard
              key={card.id}
              question={card.question}
              answer={card.answer}
              nextDueByRating={nextDueByRating}
              onRate={(rating) => handleRate(card.id, rating)}
            />
          );
        })}
      </div>
    </div>
  );
}
