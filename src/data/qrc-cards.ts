import { ReviewCard } from '@/lib/spaced-repetition';

export const qrcCards: ReviewCard[] = [
  // ============================================================
  // Part I: Classical Reservoir Computing Foundations (~18 cards)
  // ============================================================

  // --- Recurrent Neural Networks & the training problem ---
  {
    id: 'qrc-1',
    question:
      'What structural feature of recurrent neural networks distinguishes them from feedforward networks, and why does this matter for temporal data?',
    answer:
      'RNNs have cyclic connections that feed a hidden state back into the network at each time step, giving them a dynamic memory of past inputs. This makes them naturally suited for sequential and temporal data where context from earlier time steps matters.',
  },
  {
    id: 'qrc-2',
    question:
      'Why does backpropagation through time (BPTT) become problematic for long sequences? What are the two failure modes?',
    answer:
      'BPTT unrolls the recurrent network across all time steps and propagates gradients backward through each one. For long sequences, repeated multiplication of weight matrices causes gradients to either shrink exponentially (vanishing gradients) or grow exponentially (exploding gradients), making learning unstable or impossible.',
  },
  {
    id: 'qrc-3',
    question:
      'How does the vanishing gradient problem specifically harm an RNN\'s ability to learn long-range dependencies?',
    answer:
      'When gradients vanish, the error signal from a distant time step becomes negligibly small by the time it reaches earlier layers. The network cannot adjust weights to capture relationships between events separated by many time steps, effectively limiting its memory horizon.',
  },
  {
    id: 'qrc-4',
    question:
      'LSTMs and GRUs address the vanishing gradient problem with gating mechanisms. What conceptual insight does reservoir computing offer as an alternative solution?',
    answer:
      'Reservoir computing sidesteps the problem entirely by not training the recurrent connections at all. Instead of learning internal dynamics through gradient descent, it uses a fixed random recurrent network and only trains a simple linear readout, avoiding backpropagation through time altogether.',
  },

  // --- Echo State Networks basics ---
  {
    id: 'qrc-5',
    question:
      'In an Echo State Network, which weights are randomly initialized and held fixed, and which weights are trained?',
    answer:
      'The input weights (W_in) and the recurrent reservoir weights (W_res) are randomly generated and never updated. Only the output/readout weights (W_out) connecting the reservoir states to the output are trained, typically via linear regression.',
  },
  {
    id: 'qrc-6',
    question:
      'What is the "echo state property" and why is it essential for an Echo State Network to function correctly?',
    answer:
      'The echo state property requires that the effect of initial conditions on the reservoir state fades over time, so the reservoir\'s state eventually depends only on the input history. Without it, the reservoir would retain information about its initialization forever, making its outputs unreliable and input-independent.',
  },
  {
    id: 'qrc-7',
    question:
      'What role does the spectral radius of the reservoir weight matrix play in Echo State Networks?',
    answer:
      'The spectral radius (largest absolute eigenvalue of W_res) controls how quickly information decays in the reservoir. A spectral radius near 1 provides longer memory but risks instability, while a smaller value gives faster forgetting. Keeping it below 1 is a common (though not strictly necessary) condition for the echo state property.',
  },
  {
    id: 'qrc-8',
    question:
      'Why is it significant that Echo State Networks were discovered independently by Jaeger (2001) and Maass (2002) under different names?',
    answer:
      'Jaeger introduced Echo State Networks from a machine learning perspective, while Maass proposed Liquid State Machines from a computational neuroscience angle. Their independent discovery suggests the reservoir computing principle is fundamental rather than an artifact of a particular framework, reflecting a deep insight about how complex dynamical systems can perform computation.',
  },

  // --- The reservoir computing paradigm ---
  {
    id: 'qrc-9',
    question:
      'What does the "separation property" of a good reservoir mean, and why is it important for computation?',
    answer:
      'The separation property means the reservoir maps distinct input sequences to distinct internal states. This is important because if two different inputs produce the same reservoir state, no readout layer can distinguish them, limiting the system\'s computational power.',
  },
  {
    id: 'qrc-10',
    question:
      'Explain the "fading memory" property. How does it relate to the echo state property?',
    answer:
      'Fading memory means the reservoir\'s current state is more strongly influenced by recent inputs than by distant past inputs, with the influence of old inputs gradually decaying. It is essentially equivalent to the echo state property: both ensure the system "forgets" its initial conditions and responds primarily to its input history.',
  },
  {
    id: 'qrc-11',
    question:
      'Why is the combination of high-dimensional nonlinear dynamics and a simple linear readout such a powerful paradigm?',
    answer:
      'The reservoir performs a nonlinear, high-dimensional expansion of the input signal, projecting it into a rich feature space where complex patterns become linearly separable. A simple linear readout can then extract the desired computation, much like how kernel methods project data into high-dimensional spaces where linear classifiers work well.',
  },
  {
    id: 'qrc-12',
    question:
      'In what sense does a reservoir act as a "kernel" that maps inputs to a high-dimensional feature space?',
    answer:
      'Like a kernel function, the reservoir implicitly maps low-dimensional input sequences into a high-dimensional state space where temporal patterns become linearly separable. The readout layer then performs linear regression in this feature space, analogous to how SVMs find linear decision boundaries in kernel-induced spaces.',
  },
  {
    id: 'qrc-13',
    question:
      'What is the trade-off between memory capacity and nonlinear processing power in a reservoir?',
    answer:
      'Reservoirs with dynamics close to the edge of stability (spectral radius near 1) have longer memory but less nonlinear transformation, while more nonlinear reservoirs transform inputs more richly but forget them faster. Task performance depends on finding the right balance for the problem at hand.',
  },

  // --- Readout layer & linear regression ---
  {
    id: 'qrc-14',
    question:
      'Why is ridge regression (Tikhonov regularization) preferred over ordinary least squares for training the reservoir readout?',
    answer:
      'Reservoir states are high-dimensional and often correlated, making ordinary least squares prone to overfitting and numerical instability. Ridge regression adds a penalty term (lambda * ||W_out||^2) that shrinks the output weights, improving generalization and stabilizing the matrix inversion.',
  },
  {
    id: 'qrc-15',
    question:
      'Write the closed-form solution for the ridge regression readout weights. What does each term represent?',
    answer:
      'W_out = Y * X^T * (X * X^T + lambda * I)^(-1), where X is the matrix of reservoir states, Y is the target output matrix, lambda is the regularization strength, and I is the identity matrix. Alternatively, using the pseudoinverse form: W_out = (X^T X + lambda I)^(-1) X^T Y.',
  },
  {
    id: 'qrc-16',
    question:
      'What is the computational advantage of training only the readout layer compared to training the full recurrent network?',
    answer:
      'Training the readout is a convex optimization problem (linear regression) with a unique global minimum and a closed-form solution. There is no need for iterative gradient descent, no risk of local minima, no hyperparameter tuning of learning rates, and training takes a single matrix operation rather than many epochs.',
  },
  {
    id: 'qrc-17',
    question:
      'How does the pseudoinverse (Moore-Penrose inverse) relate to the readout training, and when might you prefer it over ridge regression?',
    answer:
      'The pseudoinverse gives the minimum-norm least-squares solution W_out = X^+ Y, equivalent to ridge regression with lambda=0. It is preferred when the reservoir states are well-conditioned and the dataset is large relative to the reservoir dimension, so overfitting is not a concern.',
  },
  {
    id: 'qrc-18',
    question:
      'Why is the fact that reservoir computing training is a linear problem so important for physical implementations?',
    answer:
      'Physical reservoirs (optical, mechanical, quantum) have dynamics that are difficult or impossible to modify through backpropagation. Because only the readout needs training, and this is a simple linear regression on measured outputs, any physical system with sufficiently rich dynamics can serve as a reservoir without needing to engineer gradient-based learning into the hardware.',
  },

  // ============================================================
  // Part II: Going Quantum (~18 cards)
  // ============================================================

  // --- Quantum systems as reservoirs ---
  {
    id: 'qrc-19',
    question:
      'Why does the exponential scaling of Hilbert space dimension with qubit count make quantum systems attractive as reservoirs?',
    answer:
      'An n-qubit system lives in a 2^n-dimensional Hilbert space, meaning even a modest number of qubits provides an exponentially large state space for the reservoir. This allows the quantum reservoir to represent and process information in a vastly higher-dimensional feature space than a classical reservoir of comparable physical size.',
  },
  {
    id: 'qrc-20',
    question:
      'What properties of quantum dynamics naturally satisfy the requirements of reservoir computing?',
    answer:
      'Quantum systems exhibit high-dimensional state spaces (exponential in qubit count), inherent nonlinearity through measurement, complex internal dynamics through entanglement and interference, and natural fading memory through decoherence. These align with the reservoir computing requirements of dimensionality expansion, nonlinear transformation, and the echo state property.',
  },
  {
    id: 'qrc-21',
    question:
      'How does quantum entanglement contribute to the computational power of a quantum reservoir?',
    answer:
      'Entanglement creates correlations between qubits that have no classical analog, allowing the reservoir to encode information in non-local, high-order correlations across the system. This enriches the effective feature space beyond what separable (unentangled) states could provide, potentially enabling the reservoir to capture more complex input relationships.',
  },
  {
    id: 'qrc-22',
    question:
      'In classical reservoir computing, nonlinearity comes from activation functions. Where does nonlinearity enter in quantum reservoir computing?',
    answer:
      'In QRC, the quantum dynamics (unitary evolution) are actually linear in the density matrix. The essential nonlinearity comes from the measurement process: Born\'s rule maps quantum states to probabilities via |<psi|phi>|^2, which is a nonlinear function of the state amplitudes. Additional nonlinearity can come from input encoding.',
  },
  {
    id: 'qrc-23',
    question:
      'What role does decoherence play in quantum reservoir computing, and why might it actually be beneficial?',
    answer:
      'Decoherence, normally considered harmful in quantum computing, can serve as a natural fading memory mechanism in QRC. It causes the reservoir to gradually forget old inputs, which is exactly the echo state property needed for a well-functioning reservoir. Moderate decoherence can thus improve QRC performance rather than degrade it.',
  },
  {
    id: 'qrc-24',
    question:
      'How does a quantum reservoir differ from a quantum neural network trained end-to-end with variational circuits?',
    answer:
      'In a variational quantum circuit, all gate parameters are optimized through gradient-based training on the quantum hardware, facing issues like barren plateaus. In QRC, the quantum system\'s dynamics are fixed (or minimally tuned), and only the classical readout is trained via linear regression, avoiding quantum gradient computation entirely.',
  },

  // --- Qubit dynamics & Hamiltonians ---
  {
    id: 'qrc-25',
    question:
      'How does the time-independent Schrodinger equation govern the evolution of a quantum reservoir between input injections?',
    answer:
      'The system evolves as |psi(t)> = e^(-iHt/hbar)|psi(0)>, where H is the system Hamiltonian. This unitary evolution rotates the quantum state through Hilbert space in a deterministic way dictated by the reservoir\'s internal interactions (coupling strengths, energy levels), serving as the reservoir\'s intrinsic dynamics.',
  },
  {
    id: 'qrc-26',
    question:
      'Why are interacting spin Hamiltonians (like the Ising or Heisenberg model) commonly used for quantum reservoir computing?',
    answer:
      'Interacting spin systems naturally generate entanglement and complex many-body dynamics from simple nearest-neighbor couplings. The Ising (ZZ) or Heisenberg (XX+YY+ZZ) interactions create rich correlations across the qubit network, providing the high-dimensional nonlinear dynamics needed for a powerful reservoir without requiring engineered long-range connectivity.',
  },
  {
    id: 'qrc-27',
    question:
      'What does it mean for quantum evolution to be "unitary," and what constraint does this place on the reservoir dynamics?',
    answer:
      'Unitary evolution preserves the norm of the quantum state (probabilities sum to 1) and is reversible. This means closed quantum reservoir dynamics cannot be dissipative on their own. Fading memory must come from either open-system effects (decoherence), the input injection process, or the measurement and re-initialization protocol.',
  },
  {
    id: 'qrc-28',
    question:
      'Why is the density matrix formalism (rho) preferred over the state vector (|psi>) for describing quantum reservoirs?',
    answer:
      'Real quantum systems interact with their environment, producing mixed states that cannot be described by a single state vector. The density matrix rho can represent both pure and mixed states, and its evolution under decoherence is described by a master equation (e.g., Lindblad), which is essential for modeling realistic quantum reservoir dynamics.',
  },

  // --- Input encoding strategies ---
  {
    id: 'qrc-29',
    question:
      'Describe parameter encoding for injecting classical data into a quantum reservoir. What are its advantages?',
    answer:
      'In parameter encoding, classical input values set the rotation angles of quantum gates applied to the reservoir qubits (e.g., R_x(theta) where theta encodes the input). It is straightforward to implement on gate-based quantum hardware, provides a natural nonlinear mapping from input to quantum state, and can be applied repeatedly at each time step.',
  },
  {
    id: 'qrc-30',
    question:
      'How does amplitude encoding represent classical data in a quantum reservoir, and what is its key advantage and disadvantage?',
    answer:
      'Amplitude encoding maps a normalized classical vector directly into the amplitudes of a quantum state: x = (x_1,...,x_N) becomes sum(x_i|i>). Its advantage is exponential compression (log_2(N) qubits encode N values), but its disadvantage is that preparing arbitrary amplitude states requires deep circuits with O(2^n) gates, which is costly and error-prone.',
  },
  {
    id: 'qrc-31',
    question:
      'What is time-multiplexing in the context of quantum reservoir computing, and how is it inspired by classical approaches?',
    answer:
      'Time-multiplexing feeds a single input sequentially to different virtual nodes within one physical quantum system by applying it at different time intervals, with the system evolving between injections. This mirrors the technique used in classical photonic reservoirs where a single nonlinear node with delayed feedback simulates a large reservoir through temporal division.',
  },
  {
    id: 'qrc-32',
    question:
      'Why must input encoding be carefully designed to avoid either saturating or underutilizing the quantum reservoir\'s state space?',
    answer:
      'If the encoding is too strong, it overwrites the reservoir\'s memory of previous inputs, destroying temporal context. If too weak, the input barely perturbs the reservoir state, providing insufficient separation between different input histories. The encoding strength must be balanced so inputs meaningfully modify the state while preserving fading memory of past inputs.',
  },

  // --- Measurement & feature extraction ---
  {
    id: 'qrc-33',
    question:
      'What are expectation values of Pauli operators, and why are they the standard features extracted from a quantum reservoir?',
    answer:
      'Expectation values like <sigma_x>, <sigma_y>, <sigma_z> for each qubit (and their multi-qubit correlators) are real numbers obtainable from repeated measurement. They provide a complete description of the quantum state for the readout layer and can be estimated efficiently for local observables, making them practical features for the linear regression step.',
  },
  {
    id: 'qrc-34',
    question:
      'Why does quantum measurement introduce a fundamental trade-off between information extraction and state disturbance in QRC?',
    answer:
      'Measurement collapses the quantum state, destroying the superposition that encodes the reservoir\'s memory. If you measure at every time step, you must re-initialize or post-select, losing temporal memory. QRC protocols must balance extracting enough information for the readout while preserving the quantum state\'s coherent evolution for temporal processing.',
  },
  {
    id: 'qrc-35',
    question:
      'How does quantum state tomography relate to feature extraction in QRC, and why is full tomography impractical?',
    answer:
      'Full tomography reconstructs the entire density matrix, which would give the maximum feature set. However, it requires measuring in 3^n Pauli bases for n qubits, with each requiring many shots for statistical accuracy. This exponential scaling makes full tomography impractical for large reservoirs, so QRC typically uses a polynomial subset of local observables instead.',
  },
  {
    id: 'qrc-36',
    question:
      'Explain how the "measure and re-inject" protocol allows a quantum reservoir to process time series data despite measurement collapse.',
    answer:
      'At each time step, the reservoir state is measured to extract features, then a new quantum state is initialized using both the new input and possibly information from the measurement outcome. While the measurement destroys the quantum state, partial state information persists through the classical measurement record fed back into the re-initialization, maintaining a form of temporal memory.',
  },

  // ============================================================
  // Part III: Applications & Frontiers (~14 cards)
  // ============================================================

  // --- Time series prediction ---
  {
    id: 'qrc-37',
    question:
      'What is the NARMA (Nonlinear Auto-Regressive Moving Average) task, and why is it a standard benchmark for reservoir computing?',
    answer:
      'NARMA-n requires predicting a time series defined by a nonlinear recurrence relation with dependencies on the last n steps. It is a standard benchmark because it simultaneously tests both the reservoir\'s memory capacity (must recall n steps back) and its nonlinear processing ability (the recurrence is nonlinear), with higher n being more challenging.',
  },
  {
    id: 'qrc-38',
    question:
      'What makes the Mackey-Glass system a useful benchmark for quantum reservoir computing, and what property of the system is especially relevant?',
    answer:
      'The Mackey-Glass delay differential equation produces chaotic dynamics for certain parameter settings, requiring both long memory and nonlinear processing to predict. Its chaotic nature means small errors grow exponentially, rigorously testing a reservoir\'s ability to capture complex temporal dependencies and its sensitivity to the quality of its internal representation.',
  },
  {
    id: 'qrc-39',
    question:
      'How is memory capacity formally measured in reservoir computing, and what is the theoretical maximum for a reservoir with N nodes?',
    answer:
      'Memory capacity is the sum over all delays k of the squared correlation between the reservoir\'s best linear reconstruction of the input delayed by k steps and the actual delayed input. The theoretical maximum is N (the reservoir dimension), meaning each independent degree of freedom can store at most one time step of input history.',
  },
  {
    id: 'qrc-40',
    question:
      'In what sense might a quantum reservoir exceed the classical memory capacity bound of N for N physical nodes?',
    answer:
      'An n-qubit quantum reservoir lives in a 2^n-dimensional Hilbert space, so its effective reservoir dimension is exponential in the number of physical qubits. If enough features can be extracted, the memory capacity could scale as 2^n rather than n, potentially providing an exponential advantage in memory capacity per physical resource.',
  },

  // --- Quantum advantage arguments ---
  {
    id: 'qrc-41',
    question:
      'What is the "kernel perspective" on quantum reservoir computing, and how does it connect to quantum advantage?',
    answer:
      'QRC can be viewed as a kernel method where the quantum reservoir implicitly computes a kernel function K(x, x\') = Tr[rho(x) rho(x\')] in an exponentially large Hilbert space. Quantum advantage arises if this kernel captures structure in the data that no efficient classical kernel can, making certain learning tasks exponentially easier for the quantum reservoir.',
  },
  {
    id: 'qrc-42',
    question:
      'Why is it difficult to prove unconditional quantum advantage for quantum reservoir computing on practical tasks?',
    answer:
      'Proving advantage requires showing no efficient classical algorithm can match the quantum reservoir\'s performance, which is a strong complexity-theoretic claim. Classical reservoirs can be made very large, classical kernel methods are powerful, and the advantage may disappear once you account for the overhead of quantum state preparation and measurement noise. Advantage claims are typically task-specific and empirical rather than proven.',
  },
  {
    id: 'qrc-43',
    question:
      'How does the exponential size of the quantum feature space relate to the "curse of dimensionality" and expressiveness?',
    answer:
      'While the 2^n-dimensional Hilbert space provides rich features, accessing all of them requires exponentially many measurements. Moreover, exponentially many features can lead to overfitting with limited training data. The advantage lies not in brute-force dimensionality but in whether quantum correlations provide an inductive bias that matches the structure of the target problem.',
  },
  {
    id: 'qrc-44',
    question:
      'What types of tasks are theoretically most likely to show quantum advantage in a reservoir computing setting?',
    answer:
      'Tasks involving inherently quantum data (e.g., predicting properties of quantum systems), data with structure that maps naturally to quantum correlations, or problems where the relevant kernel is efficiently computable by a quantum system but hard classically. Tasks where classical methods already perform near-optimally are unlikely to show advantage.',
  },

  // --- Physical implementations ---
  {
    id: 'qrc-45',
    question:
      'How have nuclear magnetic resonance (NMR) systems been used to implement quantum reservoir computing?',
    answer:
      'NMR QRC uses nuclear spins in molecules as qubits, with natural spin-spin couplings providing reservoir dynamics. Input is encoded through RF pulse sequences, and the reservoir state is read out via NMR spectroscopy measuring spin magnetization. NMR offers good coherence times and precise control, but scalability is limited by the number of distinguishable spins in a molecule.',
  },
  {
    id: 'qrc-46',
    question:
      'What properties of photonic systems make them appealing platforms for quantum reservoir computing?',
    answer:
      'Photons have long coherence times, travel at the speed of light enabling fast processing, and can be manipulated with mature optical components (beam splitters, phase shifters, detectors). Photonic systems naturally support continuous-variable quantum states and can operate at room temperature, though photon loss and the difficulty of creating photon-photon interactions are challenges.',
  },
  {
    id: 'qrc-47',
    question:
      'How do superconducting qubit platforms approach quantum reservoir computing, and what is their main advantage?',
    answer:
      'Superconducting QRC uses transmon or similar qubits with microwave-frequency control, leveraging existing quantum computing hardware. Their main advantage is programmability: coupling strengths and qubit frequencies can be tuned, allowing optimization of reservoir properties. IBM and Google hardware has been used for QRC demonstrations, though coherence times impose limits on circuit depth.',
  },
  {
    id: 'qrc-48',
    question:
      'Why might near-term noisy intermediate-scale quantum (NISQ) devices be particularly well-suited for reservoir computing compared to other quantum algorithms?',
    answer:
      'Reservoir computing is inherently noise-tolerant because it does not require precise gate sequences or error correction. Noise and decoherence can even help by providing fading memory. The algorithm needs only shallow circuits for input encoding plus measurement, avoiding the deep circuits that make other NISQ algorithms fragile. This makes QRC one of the most practical near-term quantum applications.',
  },

  // --- Current research directions ---
  {
    id: 'qrc-49',
    question:
      'What is the open question of "optimal reservoir design" in QRC, and how does it differ from the classical case?',
    answer:
      'In classical RC, reservoir design involves choosing connectivity, spectral radius, and nonlinearity. In QRC, the design space includes the Hamiltonian structure, coupling topology, input encoding strategy, and measurement protocol. It remains an open question how to systematically optimize these quantum-specific hyperparameters, and whether there exist universal design principles analogous to the classical spectral radius heuristic.',
  },
  {
    id: 'qrc-50',
    question:
      'How might hybrid classical-quantum reservoir architectures combine the strengths of both paradigms?',
    answer:
      'Hybrid approaches use a quantum reservoir alongside classical pre- or post-processing layers, or interleave classical and quantum reservoir stages. The quantum component provides exponentially rich feature spaces for certain data types, while classical components handle tasks where quantum resources offer no advantage. This pragmatic approach maximizes utility of limited quantum hardware while maintaining scalability.',
  },
];
