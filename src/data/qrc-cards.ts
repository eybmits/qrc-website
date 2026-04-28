import { ReviewCard } from '@/lib/spaced-repetition';

export const qrcCards: ReviewCard[] = [
  {
    id: 'qrc2-1',
    question: 'What is the simplest way to describe a feature map?',
    answer:
      'A feature map transforms an input into a new representation. The new representation is often easier for a simple model, such as a linear readout, to use.',
  },
  {
    id: 'qrc2-2',
    question: 'Why can a simple linear readout work after a good feature map?',
    answer:
      'The feature map can make important structure more visible. Data that is hard to separate in the original input space may become easy to separate in the transformed feature space.',
  },
  {
    id: 'qrc2-3',
    question: 'What is a Quantum Extreme Learning Machine in one sentence?',
    answer:
      'A QELM uses a fixed quantum system as a static feature map and trains only a classical readout on the measured features.',
  },
  {
    id: 'qrc2-4',
    question: 'Which part of a QELM is trained?',
    answer:
      'Only the final classical readout is trained. The quantum feature map itself is fixed during readout training.',
  },
  {
    id: 'qrc2-5',
    question: 'What does "static" mean in the QELM setting?',
    answer:
      'Each input is transformed independently. The quantum system does not carry a state from one input to the next as part of the model.',
  },
  {
    id: 'qrc2-6',
    question: 'What are the features in a QELM usually made from?',
    answer:
      'They are made from measurement results, such as expectation values of selected observables after the input has been encoded and transformed by the fixed quantum system.',
  },
  {
    id: 'qrc2-7',
    question: 'What is the core QELM pipeline?',
    answer:
      'Input x goes into a fixed quantum feature map, measurements produce z(x), and a trained linear readout predicts y from z(x).',
  },
  {
    id: 'qrc2-8',
    question: 'What extra ingredient turns the static QELM idea toward reservoir computing?',
    answer:
      'Time and memory. A reservoir reuses an internal state, so current features can depend on both the current input and recent past inputs.',
  },
  {
    id: 'qrc2-9',
    question: 'What is the key state-update idea in QRC?',
    answer:
      'The current quantum state is updated from the previous state and the current input, often summarized as rho_t = F(rho_{t-1}, u_t).',
  },
  {
    id: 'qrc2-10',
    question: 'Why can QRC model time-series data more naturally than QELM?',
    answer:
      'QRC reuses a quantum state across time steps. That state carries a fading trace of recent inputs, so measured features can contain temporal context.',
  },
  {
    id: 'qrc2-11',
    question: 'What does the measured feature vector z_t represent in QRC?',
    answer:
      'It represents measured observables of the reservoir at time t. Because the reservoir state has memory, z_t can reflect recent input history.',
  },
  {
    id: 'qrc2-12',
    question: 'Which part is usually trained in QRC?',
    answer:
      'As in QELM, the trained part is usually the classical readout. The quantum dynamics are kept fixed or only lightly tuned.',
  },
  {
    id: 'qrc2-13',
    question: 'How can QRC make a next-step prediction?',
    answer:
      'After input u_t updates the reservoir, measurements produce z_t. A readout then predicts the next value, for example u_hat_{t+1} = w^T z_t + b.',
  },
  {
    id: 'qrc2-14',
    question: 'What does fading memory mean in this context?',
    answer:
      'Fading memory means recent inputs still influence the current state, while very old inputs gradually lose influence. This helps prediction stay stable.',
  },
  {
    id: 'qrc2-15',
    question: 'What is the shortest distinction between QELM and QRC?',
    answer:
      'QELM transforms inputs into quantum features. QRC transforms input histories into quantum features.',
  },
  {
    id: 'qrc2-16',
    question: 'What do QELM and QRC have in common?',
    answer:
      'Both use a fixed quantum system to create measured features and train a relatively simple classical readout on top of those features.',
  },
  {
    id: 'qrc2-17',
    question: 'Why is linear readout training attractive for quantum hardware?',
    answer:
      'It avoids differentiating through the quantum device. The hardware can act as a feature generator while training remains a stable classical regression problem.',
  },
  {
    id: 'qrc2-18',
    question: 'When would QELM be the more natural model?',
    answer:
      'QELM is natural when each example can be treated independently, such as static classification or regression with no required temporal memory.',
  },
  {
    id: 'qrc2-19',
    question: 'When would QRC be the more natural model?',
    answer:
      'QRC is natural when the task depends on sequences, history, or dynamics, such as forecasting, streaming classification, or temporal pattern recognition.',
  },
  {
    id: 'qrc2-20',
    question: 'Why should QRC be compared against QELM-style baselines?',
    answer:
      'Because some apparent gains may come from the quantum feature map alone. Comparing against a static QELM-style baseline helps isolate what the temporal reservoir adds.',
  },
];
