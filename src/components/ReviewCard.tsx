'use client';

import { useMemo, useState } from 'react';
import { Rating, RATING_LABELS } from '@/lib/spaced-repetition';
import styles from './ReviewCard.module.css';

interface ReviewCardProps {
  question: string;
  answer: string;
  onRate: (rating: Rating) => void;
  nextDueByRating?: Record<Rating, string>;
  disabled?: boolean;
}

const RATINGS: { rating: Rating; color: string }[] = [
  { rating: 'again', color: 'var(--accent-error)' },
  { rating: 'hard', color: 'var(--accent-warning)' },
  { rating: 'good', color: 'var(--accent-success)' },
  { rating: 'easy', color: 'var(--accent-primary)' },
];

export function ReviewCard({
  question,
  answer,
  onRate,
  nextDueByRating,
  disabled = false,
}: ReviewCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [rated, setRated] = useState(false);
  const [doneMessage, setDoneMessage] = useState('Response recorded');

  const ratingPrompt = useMemo(() => {
    return 'How did that feel?';
  }, []);

  const handleRate = (rating: Rating) => {
    if (disabled || rated) return;

    const due = nextDueByRating?.[rating];
    if (due) {
      setDoneMessage(`Recorded • next ${due}`);
    } else {
      setDoneMessage('Response recorded');
    }

    setRated(true);
    onRate(rating);
  };

  return (
    <div className={`${styles.card} ${flipped ? styles.flipped : ''} ${rated ? styles.rated : ''}`}>
      <div className={styles.inner}>
        <div className={styles.front}>
          <div className={styles.label}>Question</div>
          <div className={styles.questionText}>{question}</div>
          <button
            className={styles.revealBtn}
            onClick={() => setFlipped(true)}
            disabled={disabled}
          >
            Show Answer
          </button>
        </div>

        {flipped && (
          <div className={styles.back}>
            <div className={styles.label}>Question</div>
            <div className={styles.questionTextSmall}>{question}</div>
            <div className={styles.divider} />
            <div className={styles.label}>Answer</div>
            <div className={styles.answerText}>{answer}</div>
            {!rated && (
              <div className={styles.ratingButtons}>
                <div className={styles.ratingLabel}>{ratingPrompt}</div>
                <div className={styles.buttons}>
                  {RATINGS.map(({ rating, color }) => (
                    <div key={rating} className={styles.rateBtnWrap}>
                      <button
                        className={styles.rateBtn}
                        style={{ '--btn-color': color } as React.CSSProperties}
                        onClick={() => handleRate(rating)}
                        disabled={disabled}
                      >
                        {RATING_LABELS[rating]}
                      </button>
                      {nextDueByRating && (
                        <span className={styles.dueHint}>{nextDueByRating[rating]}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {rated && (
              <div className={styles.doneMessage}>
                {doneMessage}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
