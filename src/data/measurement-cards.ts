import { ReviewCard } from '@/lib/spaced-repetition';

export const measurementCards: ReviewCard[] = [
  {
    id: 'meas-1',
    question: 'Why is measurement a first-class design problem in quantum reservoir computing?',
    answer:
      'Because the readout never sees the full quantum state directly. Measurement decides which observables become classical features, how noisy those features are, and how much the reservoir is disturbed.',
  },
  {
    id: 'meas-2',
    question: 'What does choosing an observable actually change?',
    answer:
      'It changes which aspect of the quantum state is exposed to the readout. Different observables can emphasize population, phase-sensitive structure, correlations, or global collective behavior.',
  },
  {
    id: 'meas-3',
    question: 'How does shot count affect estimation quality?',
    answer:
      'Finite-shot estimation introduces sampling noise. The standard error of a sample mean typically shrinks like 1/sqrt(S), so more shots improve stability but increase measurement cost and latency.',
  },
  {
    id: 'meas-4',
    question: 'Why can repeated measurement reduce useful reservoir memory?',
    answer:
      'Because measurement backaction changes the state. If you measure too strongly or too often, you can destroy the internal dynamics that would otherwise carry temporal information forward.',
  },
  {
    id: 'meas-5',
    question: 'What is the difference between terminal and interleaved measurement?',
    answer:
      'Terminal measurement reads the state only after the evolution window, so it avoids disturbing earlier dynamics. Interleaved measurement probes the system during evolution, which can reveal richer time structure but also changes the trajectory.',
  },
  {
    id: 'meas-6',
    question: 'Why should QRC papers report observables and shot budgets explicitly?',
    answer:
      'Because performance can depend as much on the measurement layer as on the reservoir itself. Without observables, cadence, shots, and aggregation details, results are hard to reproduce or compare fairly.',
  },
  {
    id: 'meas-7',
    question: 'What makes a measurement feature set useful for a readout?',
    answer:
      'It should expose informative state structure, remain stable under realistic shot budgets, and avoid excessive disturbance. Good feature sets are informative, affordable, and operationally reproducible.',
  },
  {
    id: 'meas-8',
    question: 'What should a measurement-focused QRC benchmark report explicitly?',
    answer:
      'At minimum: the task, measured observables, measurement timing, shot budget, feature aggregation pipeline, runtime or latency implications, and the main remaining tradeoff or limitation.',
  },
];
