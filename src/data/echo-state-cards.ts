import { ReviewCard } from '@/lib/spaced-repetition';

export const echoStateCards: ReviewCard[] = [
  // ── ESN Architecture ────────────────────────────────────────────────
  {
    id: 'esn-1',
    question:
      'What are the three layers of an Echo State Network, and which connections are trained?',
    answer:
      'An ESN has an input layer, a reservoir (hidden) layer, and an output (readout) layer. Only the output weights are trained; input and reservoir weights are fixed after random initialization.',
  },
  {
    id: 'esn-2',
    question:
      'Why are the reservoir weights in an ESN kept fixed rather than learned through backpropagation?',
    answer:
      'Fixing the reservoir weights avoids the vanishing/exploding gradient problem in recurrent networks and reduces training to a simple linear regression on the readout layer, making learning fast and stable.',
  },
  {
    id: 'esn-3',
    question:
      'What role does sparse connectivity play in the reservoir of an ESN?',
    answer:
      'Sparse connectivity (typically 1–20% density) creates diverse, loosely coupled dynamical sub-networks within the reservoir, increasing the variety of temporal features the reservoir can represent.',
  },
  {
    id: 'esn-4',
    question:
      'How does the reservoir transform input signals before the readout layer sees them?',
    answer:
      'The reservoir nonlinearly projects the input into a high-dimensional state space where temporal patterns are expanded into spatial patterns, making them linearly separable for the readout.',
  },
  {
    id: 'esn-5',
    question:
      'What is the typical activation function used by reservoir neurons, and why?',
    answer:
      'The hyperbolic tangent (tanh) is most common because it is bounded between −1 and +1, which helps keep reservoir dynamics stable, while still providing the nonlinearity needed for rich representations.',
  },

  // ── The Echo State Property ─────────────────────────────────────────
  {
    id: 'esn-6',
    question: 'State the Echo State Property (ESP) in plain language.',
    answer:
      'The ESP requires that the reservoir state be uniquely determined by the history of inputs, regardless of the initial state. In other words, the effect of any initial conditions must wash out over time.',
  },
  {
    id: 'esn-7',
    question:
      'Why is the Echo State Property essential for an ESN to function correctly?',
    answer:
      'Without the ESP, the reservoir\'s response would depend on arbitrary initial conditions rather than solely on the input history, making the network\'s output unreproducible and unlearnable.',
  },
  {
    id: 'esn-8',
    question:
      'What does "asymptotic state independence" mean in the context of the ESP?',
    answer:
      'It means that two reservoir trajectories started from different initial states but driven by the same input sequence will converge to the same trajectory as time progresses, so the initial state is eventually forgotten.',
  },
  {
    id: 'esn-9',
    question:
      'Is the Echo State Property a binary condition or a matter of degree? Explain.',
    answer:
      'Strictly, the ESP is a binary condition—it either holds or it does not. However, in practice the rate at which initial conditions are forgotten (the "fading memory") varies continuously and affects performance.',
  },
  {
    id: 'esn-10',
    question:
      'How does the ESP relate to the concept of fading memory in dynamical systems?',
    answer:
      'A system with fading memory gradually discounts older inputs, retaining a decaying trace of the past. The ESP guarantees fading memory: recent inputs dominate the reservoir state while distant inputs are progressively forgotten.',
  },

  // ── Spectral Radius ─────────────────────────────────────────────────
  {
    id: 'esn-11',
    question:
      'What is the spectral radius of a matrix, and how is it computed?',
    answer:
      'The spectral radius is the largest absolute value among all eigenvalues of the matrix. It is computed by finding the eigenvalues of the reservoir weight matrix and taking the maximum of their absolute values.',
  },
  {
    id: 'esn-12',
    question:
      'What is the standard rule of thumb for the spectral radius to ensure the Echo State Property?',
    answer:
      'A necessary condition for the ESP (for any input) is that the spectral radius of the reservoir weight matrix be less than 1. In practice, values slightly below 1 (e.g., 0.9–0.99) are common.',
  },
  {
    id: 'esn-13',
    question:
      'Why is spectral radius less than 1 only a necessary—not sufficient—condition for the ESP?',
    answer:
      'The spectral radius condition guarantees the ESP for zero input, but with nonzero input the effective dynamics change. Conversely, for certain input distributions, a spectral radius above 1 may still satisfy the ESP due to the contractive effect of the tanh nonlinearity under input drive.',
  },
  {
    id: 'esn-14',
    question:
      'How does increasing the spectral radius toward 1 affect the reservoir\'s memory capacity?',
    answer:
      'A spectral radius closer to 1 slows the decay of reservoir states, giving the network a longer memory of past inputs. However, pushing it too close to 1 risks instability and loss of the ESP.',
  },
  {
    id: 'esn-15',
    question:
      'Describe a practical strategy for tuning the spectral radius of an ESN.',
    answer:
      'Generate a random reservoir matrix, compute its spectral radius, then rescale the matrix by dividing by the current spectral radius and multiplying by the desired value. The optimal value is then selected via cross-validation on the target task.',
  },

  // ── Reservoir Design Principles ─────────────────────────────────────
  {
    id: 'esn-16',
    question:
      'How does reservoir sparsity affect computational cost and performance?',
    answer:
      'Higher sparsity reduces the number of non-zero weights, lowering the computational cost of state updates. It also promotes diverse dynamical regimes within the reservoir, often improving representation quality up to a point.',
  },
  {
    id: 'esn-17',
    question: 'What is input scaling in an ESN and why does it matter?',
    answer:
      'Input scaling multiplies the input weights by a scalar factor, controlling how strongly external inputs drive the reservoir. Large input scaling pushes neurons into the saturated region of tanh, creating more nonlinear but less memory-rich dynamics.',
  },
  {
    id: 'esn-18',
    question:
      'What is a leaky integrator neuron, and why is it used in ESN reservoirs?',
    answer:
      'A leaky integrator neuron blends its previous state with the new activation via a leak rate parameter α: x(t) = (1−α)x(t−1) + α·tanh(Win·u(t) + W·x(t−1)). This smooths the dynamics and allows the reservoir to operate on multiple timescales.',
  },
  {
    id: 'esn-19',
    question:
      'How does the leak rate α in a leaky-integrator ESN control the effective timescale of the reservoir?',
    answer:
      'A small α (close to 0) makes neurons change slowly, favoring long timescales and smooth dynamics. A large α (close to 1) makes the reservoir respond quickly to inputs, behaving like a standard ESN update with fast dynamics.',
  },

  // ── Training the Readout ────────────────────────────────────────────
  {
    id: 'esn-20',
    question:
      'Why is training the ESN readout typically formulated as a linear regression problem?',
    answer:
      'Because only the output weights are trained and the reservoir states are fixed, the mapping from reservoir states to outputs is linear. This means we can collect reservoir states into a matrix and solve for the output weights with standard linear regression.',
  },
  {
    id: 'esn-21',
    question:
      'What is the role of Tikhonov regularization (ridge regression) when training an ESN readout?',
    answer:
      'Tikhonov regularization adds a penalty term λ‖W_out‖² to the least-squares objective, preventing overfitting to noise in the training data and improving generalization, especially when the reservoir dimension is large relative to the training set.',
  },
  {
    id: 'esn-22',
    question:
      'How is the Moore–Penrose pseudoinverse used to compute ESN output weights?',
    answer:
      'The output weights are computed as W_out = Y · X⁺, where X⁺ is the pseudoinverse of the collected reservoir state matrix X and Y is the target matrix. This gives the least-squares optimal weights in one step without iterative optimization.',
  },

  // ── Applications and Limitations ────────────────────────────────────
  {
    id: 'esn-23',
    question:
      'Why are ESNs particularly well-suited for time-series prediction tasks?',
    answer:
      'The reservoir naturally maintains a fading memory of recent inputs, creating a rich temporal feature space without backpropagation through time. Combined with fast linear training, this makes ESNs efficient and effective for learning temporal patterns.',
  },
  {
    id: 'esn-24',
    question:
      'What are the main computational limitations of standard ESNs compared to deep learning approaches?',
    answer:
      'ESNs struggle with tasks requiring deep hierarchical feature extraction or very long-range dependencies. The random, untrained reservoir may also need to be very large to match the representational power of a trained deep network, increasing memory and compute costs.',
  },
  {
    id: 'esn-25',
    question:
      'What is a Deep Echo State Network, and what problem does it address?',
    answer:
      'A Deep ESN stacks multiple reservoir layers, where each layer receives the states of the layer below. This introduces hierarchical processing of temporal features at multiple timescales, addressing the shallow architecture limitation of standard ESNs.',
  },
];
