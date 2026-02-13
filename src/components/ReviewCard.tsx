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
  const [showFullAnswer, setShowFullAnswer] = useState(false);

  const shortAnswer = useMemo(() => {
    const normalized = answer.replace(/\s+/g, ' ').trim();
    if (normalized.length <= 180) return normalized;

    const firstSentence = normalized.match(/^(.+?[.!?])(\s|$)/)?.[1];
    if (firstSentence && firstSentence.length <= 220) {
      return firstSentence.trim();
    }

    return `${normalized.slice(0, 180).trim()}...`;
  }, [answer]);

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
            onClick={() => {
              setFlipped(true);
              setShowFullAnswer(false);
            }}
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
            <div className={styles.label}>Core Answer</div>
            <div className={styles.answerText}>{shortAnswer}</div>
            <button
              className={styles.moreBtn}
              onClick={() => setShowFullAnswer((value) => !value)}
              disabled={disabled}
            >
              {showFullAnswer ? 'Hide Full Explanation' : 'Show Full Explanation'}
            </button>
            {showFullAnswer && (
              <div className={styles.fullAnswer}>
                <div className={styles.label}>Full Explanation</div>
                <div className={styles.answerText}>{answer}</div>
              </div>
            )}
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
