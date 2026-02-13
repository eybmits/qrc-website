import { ReviewCard } from '@/lib/spaced-repetition';

export const qrcCards: ReviewCard[] = [
  {
    id: 'qrc2-1',
    question: 'What makes a recurrent model different from a feedforward model for time-series data?',
    answer:
      'A recurrent model reuses an internal state across time steps, so each output depends on both the current input and past context. A feedforward model has no built-in temporal memory unless you manually add lagged features.',
  },
  {
    id: 'qrc2-2',
    question: 'Why does backpropagation through time often fail on very long sequences?',
    answer:
      'Gradients are repeatedly multiplied by Jacobian factors across many steps. Those products can shrink to near zero (vanishing) or grow uncontrollably (exploding), which destabilizes learning.',
  },
  {
    id: 'qrc2-3',
    question: 'What is the key reservoir-computing shortcut compared with standard RNN training?',
    answer:
      'Reservoir computing keeps recurrent dynamics fixed and trains only the readout. This avoids full temporal gradient optimization and turns training into a linear regression problem.',
  },
  {
    id: 'qrc2-4',
    question: 'What does the state update equation in reservoir models capture conceptually?',
    answer:
      'It mixes new input with previous state through nonlinear dynamics. The result is a compressed memory trace that emphasizes recent information while retaining useful short-term history.',
  },
  {
    id: 'qrc2-5',
    question: 'Why is an ESN reservoir usually sparse and random?',
    answer:
      'Sparse random connectivity creates diverse dynamical responses at low computational cost. Diversity helps separation of input histories, which improves linear readout performance.',
  },
  {
    id: 'qrc2-6',
    question: 'What is the practical meaning of "washout" in ESN/QRC pipelines?',
    answer:
      'Washout is an initial run where states are discarded. It removes dependence on arbitrary initial conditions before you start collecting training features.',
  },
  {
    id: 'qrc2-7',
    question: 'What is the echo state property in one sentence?',
    answer:
      'For a fixed input history, reservoir trajectories from different initial states converge to the same state sequence. This ensures reproducible input-to-state mapping.',
  },
  {
    id: 'qrc2-8',
    question: 'How does spectral radius affect memory in classical reservoirs?',
    answer:
      'A spectral radius near one generally increases memory depth but risks instability. Smaller values stabilize dynamics but shorten effective memory.',
  },
  {
    id: 'qrc2-9',
    question: 'Why is ridge regression preferred for the readout layer?',
    answer:
      'Reservoir features are high-dimensional and correlated, so ordinary least squares can overfit. Ridge regularization improves conditioning and generalization by shrinking readout weights.',
  },
  {
    id: 'qrc2-10',
    question: 'Write the standard ridge readout solution and interpret it.',
    answer:
      'A common form is W_out = Y H^T (H H^T + lambda I)^(-1). It fits outputs from reservoir states while penalizing large coefficients through lambda.',
  },
  {
    id: 'qrc2-11',
    question: 'Why is linear readout training important for physical reservoirs?',
    answer:
      'Most physical substrates cannot be gradient-trained internally in a practical way. Linear readout lets you exploit rich hardware dynamics without differentiating through the hardware.',
  },
  {
    id: 'qrc2-12',
    question: 'What tradeoff does a reservoir designer tune most often?',
    answer:
      'The main tradeoff is memory versus nonlinearity. Stronger nonlinear transformation can reduce memory depth, while long memory can reduce separability for complex nonlinear targets.',
  },
  {
    id: 'qrc2-13',
    question: 'Why are quantum systems attractive as reservoirs?',
    answer:
      'An n-qubit system occupies a 2^n-dimensional Hilbert space, giving a very large feature potential from few physical units. Entanglement and interference enrich temporal dynamics further.',
  },
  {
    id: 'qrc2-14',
    question: 'Where does useful nonlinearity in QRC mostly come from?',
    answer:
      'Unitary dynamics are linear in state evolution, but measurement maps states to nonlinear probability statistics. Input encoding choices can add additional effective nonlinearity.',
  },
  {
    id: 'qrc2-15',
    question: 'What role can decoherence play in QRC?',
    answer:
      'Moderate decoherence can implement fading memory, which is useful for reservoir behavior. Too much decoherence destroys informative structure before it reaches readout.',
  },
  {
    id: 'qrc2-16',
    question: 'Why is the density matrix formalism often used in QRC analysis?',
    answer:
      'Real hardware is open and noisy, so states are mixed rather than pure. Density matrices and master equations naturally model dissipation and measurement statistics.',
  },
  {
    id: 'qrc2-17',
    question: 'What is the core computational object in a QRC loop?',
    answer:
      'It is a time-indexed feature vector of measured observables, z(t). The readout learns y(t) from z(t) with linear or lightly regularized regression.',
  },
  {
    id: 'qrc2-18',
    question: 'What is parameter encoding in QRC?',
    answer:
      'Classical input values directly modulate control parameters such as rotation angles or drive amplitudes. It is simple to implement and works well for sequential injection.',
  },
  {
    id: 'qrc2-19',
    question: 'What is the main benefit and drawback of amplitude encoding?',
    answer:
      'Benefit: compact representation with logarithmic qubit count in input dimension. Drawback: preparing arbitrary amplitude states can require deep, noise-sensitive circuits.',
  },
  {
    id: 'qrc2-20',
    question: 'What baseline is mandatory when claiming QRC improvements?',
    answer:
      'A tuned classical reservoir baseline with matched feature budget and fair data protocol. Without that, "quantum advantage" claims are not informative.',
  },
];
