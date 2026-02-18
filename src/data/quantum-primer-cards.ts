import { ReviewCard } from '@/lib/spaced-repetition';

export const quantumPrimerCards: ReviewCard[] = [
  {
    id: 'qp2-1',
    question: 'What is superposition, and how does it differ from a classical bit?',
    answer:
      'A classical bit is either 0 or 1. A qubit can exist in a superposition |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex amplitudes satisfying |α|² + |β|² = 1. The qubit is not "both at once" — it is in a single quantum state that yields probabilistic outcomes when measured.',
  },
  {
    id: 'qp2-2',
    question: 'What do the symbols |0⟩ and |1⟩ represent in Dirac notation?',
    answer:
      '|0⟩ and |1⟩ are ket vectors forming the computational basis of a single qubit. |0⟩ = (1, 0)ᵀ and |1⟩ = (0, 1)ᵀ. A bra ⟨ψ| is the conjugate transpose of |ψ⟩, and ⟨φ|ψ⟩ is their inner product.',
  },
  {
    id: 'qp2-3',
    question: 'What does the Bloch sphere represent, and where do |0⟩ and |1⟩ sit on it?',
    answer:
      'The Bloch sphere is a geometric representation of a single-qubit pure state. |0⟩ is at the north pole and |1⟩ at the south pole. Any point on the surface corresponds to a pure state; the polar angle θ controls the amplitude ratio, and the azimuthal angle φ controls the relative phase.',
  },
  {
    id: 'qp2-4',
    question: 'What do the Pauli X, Y, and Z gates do to a qubit?',
    answer:
      'X is a bit flip (swaps |0⟩ and |1⟩, like a classical NOT). Z is a phase flip (leaves |0⟩ unchanged, maps |1⟩ to −|1⟩). Y = iXZ combines both. On the Bloch sphere, each is a 180° rotation about its respective axis.',
  },
  {
    id: 'qp2-5',
    question: 'What does the Hadamard gate do, and why is it important?',
    answer:
      'The Hadamard gate H maps |0⟩ → (|0⟩+|1⟩)/√2 and |1⟩ → (|0⟩−|1⟩)/√2, creating equal superpositions. It is a key building block for quantum algorithms because it converts computational-basis states into superposition states and vice versa.',
  },
  {
    id: 'qp2-6',
    question: 'State the Born rule for a qubit in state |ψ⟩ = α|0⟩ + β|1⟩.',
    answer:
      'The probability of measuring outcome 0 is |α|² and outcome 1 is |β|². After measurement, the qubit collapses to the corresponding basis state. This is the only way to extract classical information from a quantum state.',
  },
  {
    id: 'qp2-7',
    question: 'What is a density matrix, and when is it needed instead of a ket?',
    answer:
      'A density matrix ρ is a positive semi-definite, trace-one operator that describes both pure and mixed states. A pure state has ρ = |ψ⟩⟨ψ| with Tr(ρ²) = 1. A mixed state (statistical ensemble or subsystem of an entangled state) has Tr(ρ²) < 1. Density matrices are essential for open quantum systems and QRC.',
  },
  {
    id: 'qp2-8',
    question: 'How do you compute an expectation value from a density matrix?',
    answer:
      'The expectation value of observable Ô is ⟨Ô⟩ = Tr(Ôρ). This generalizes ⟨ψ|Ô|ψ⟩ to mixed states and is the formula QRC uses to extract classical features from quantum reservoir states.',
  },
  {
    id: 'qp2-9',
    question: 'What is a tensor product, and how does it relate to multi-qubit states?',
    answer:
      'The tensor product ⊗ combines individual qubit Hilbert spaces into a joint space. For n qubits, the state space is (C²)^⊗n with dimension 2ⁿ. Not all multi-qubit states can be written as a tensor product of single-qubit states — those that cannot are entangled.',
  },
  {
    id: 'qp2-10',
    question: 'What are Bell states, and what makes them special?',
    answer:
      'Bell states are maximally entangled two-qubit states, e.g., |Φ⁺⟩ = (|00⟩+|11⟩)/√2. Measuring one qubit instantly determines the other. They exhibit correlations that violate Bell inequalities, proving the non-classical nature of entanglement.',
  },
  {
    id: 'qp2-11',
    question: 'Write the time-dependent Schrödinger equation and explain each term.',
    answer:
      'iℏ d|ψ⟩/dt = Ĥ(t)|ψ⟩. Here ℏ is the reduced Planck constant, Ĥ(t) is the Hamiltonian (encodes system energy and interactions), and |ψ⟩ is the state vector. The equation describes deterministic unitary evolution of a closed quantum system.',
  },
  {
    id: 'qp2-12',
    question: 'What is unitary evolution, and what property does it preserve?',
    answer:
      'Unitary evolution means the state evolves as |ψ(t)⟩ = U(t)|ψ(0)⟩ where U†U = I. It preserves the inner product (and thus probabilities) and is reversible. In QRC, the reservoir Hamiltonian drives unitary dynamics between input injections.',
  },
  {
    id: 'qp2-13',
    question: 'What is the Lindblad master equation, and when does it apply?',
    answer:
      'dρ/dt = −(i/ℏ)[Ĥ, ρ] + Σₖ (LₖρLₖ† − ½{Lₖ†Lₖ, ρ}). It governs open quantum systems where the environment causes decoherence and dissipation. The Lₖ are Lindblad (jump) operators modeling specific noise channels. This is the standard dynamical equation for QRC with realistic hardware noise.',
  },
  {
    id: 'qp2-14',
    question: 'How do the quantum concepts in this primer map to QRC components?',
    answer:
      'The density matrix ρ is the reservoir state, the Hamiltonian Ĥ drives reservoir dynamics, Lindblad terms model hardware noise, and Tr(Ôρ) extracts classical features for the linear readout. Input encoding modulates Ĥ or prepares initial states. The exponentially large Hilbert space is what makes few qubits produce rich feature vectors.',
  },
];
