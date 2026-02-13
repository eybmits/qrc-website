import { ReviewCard } from '@/lib/spaced-repetition';

export const echoStateCards: ReviewCard[] = [
  {
    id: 'esn2-1',
    question: 'What are the three ESN blocks and which one is trained?',
    answer:
      'An ESN has input mapping, recurrent reservoir, and readout. Only the readout weights are trained; reservoir and input weights remain fixed after initialization.',
  },
  {
    id: 'esn2-2',
    question: 'Why does fixed random recurrence still work in ESNs?',
    answer:
      'Random recurrence can generate rich nonlinear state trajectories when driven by input. The readout then selects useful combinations from that state space.',
  },
  {
    id: 'esn2-3',
    question: 'What does the leak rate alpha control?',
    answer:
      'It controls how quickly the state updates toward the new activation. Small alpha produces slower, longer-memory dynamics; large alpha yields faster responsiveness.',
  },
  {
    id: 'esn2-4',
    question: 'What is the practical meaning of reservoir state collection?',
    answer:
      'You record hidden states over time into a design matrix H. That matrix becomes the input for readout regression.',
  },
  {
    id: 'esn2-5',
    question: 'Why is washout done before training ESN readout?',
    answer:
      'Early states are biased by arbitrary initialization. Washout removes that transient so training sees input-driven dynamics only.',
  },
  {
    id: 'esn2-6',
    question: 'State the echo state property (ESP) concisely.',
    answer:
      'For the same input history, different initial states converge to the same reservoir trajectory. The state is determined by input history, not by initialization.',
  },
  {
    id: 'esn2-7',
    question: 'Why is ESP critical for dependable prediction?',
    answer:
      'Without ESP, output depends on hidden initial conditions rather than data alone. That breaks reproducibility and makes supervised fitting unreliable.',
  },
  {
    id: 'esn2-8',
    question: 'What is spectral radius and why does ESN design care about it?',
    answer:
      'It is the largest absolute eigenvalue of the reservoir matrix. It strongly controls contraction rate, stability margin, and memory depth.',
  },
  {
    id: 'esn2-9',
    question: 'What usually happens if spectral radius is too small?',
    answer:
      'States contract too quickly, so memory of past inputs disappears early. Tasks with longer temporal dependence then perform poorly.',
  },
  {
    id: 'esn2-10',
    question: 'What is the risk if spectral radius is too large?',
    answer:
      'Dynamics can become unstable or too sensitive to small perturbations. Training then becomes noisy and generalization degrades.',
  },
  {
    id: 'esn2-11',
    question: 'Why is ridge regression standard for ESN readout?',
    answer:
      'Reservoir features are often collinear and noisy. Ridge penalization stabilizes inversion and improves out-of-sample behavior.',
  },
  {
    id: 'esn2-12',
    question: 'What diagnostics indicate a badly tuned reservoir?',
    answer:
      'Rapid state collapse, unstable state norms, and highly erratic validation curves are common signs. Also, very high sensitivity to tiny hyperparameter changes is a warning.',
  },
  {
    id: 'esn2-13',
    question: 'Why can ESNs struggle compared with deep sequence models?',
    answer:
      'A fixed reservoir cannot adapt internal representation to every task. For very complex hierarchical temporal structure, trained deep models can learn better internal features.',
  },
  {
    id: 'esn2-14',
    question: 'How does ESN intuition transfer to QRC?',
    answer:
      'Both rely on fixed dynamic feature generation and trained readout. QRC replaces classical reservoir dynamics with quantum dynamics and measurement-derived features.',
  },
];
