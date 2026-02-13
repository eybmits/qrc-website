'use client';

import { Essay, Section, SubSection } from '@/components/Essay';
import { MathBlock } from '@/components/MathBlock';
import { ReviewCardSet } from '@/components/ReviewCardSet';
import { qrcCards } from '@/data/qrc-cards';

export default function QRCPage() {
  // Split cards into sets for embedding throughout the essay
  const cardSets = {
    rnn: qrcCards.filter((c) => parseInt(c.id.split('-')[1]) <= 5),
    training: qrcCards.filter((c) => {
      const n = parseInt(c.id.split('-')[1]);
      return n >= 6 && n <= 10;
    }),
    esn: qrcCards.filter((c) => {
      const n = parseInt(c.id.split('-')[1]);
      return n >= 11 && n <= 18;
    }),
    quantum: qrcCards.filter((c) => {
      const n = parseInt(c.id.split('-')[1]);
      return n >= 19 && n <= 27;
    }),
    encoding: qrcCards.filter((c) => {
      const n = parseInt(c.id.split('-')[1]);
      return n >= 28 && n <= 36;
    }),
    applications: qrcCards.filter((c) => {
      const n = parseInt(c.id.split('-')[1]);
      return n >= 37;
    }),
  };

  return (
    <Essay
      title="Quantum Reservoir Computing for the Very Curious"
      subtitle="A deep introduction to quantum reservoir computing, building from classical foundations to quantum implementations. Embedded review cards help you truly remember what you learn."
    >
      <Section id="introduction" title="Introduction">
        <p>
          In the landscape of quantum machine learning, <strong>quantum reservoir computing (QRC)</strong> stands
          out as one of the most promising near-term approaches to achieving practical quantum advantage in
          computational tasks. Unlike variational quantum algorithms that require careful circuit optimization,
          QRC leverages the natural dynamics of quantum systems to process information — and only requires
          training a simple classical readout layer.
        </p>
        <p>
          This essay will build your understanding from the ground up. We&apos;ll start with the classical
          foundations — recurrent neural networks and their training difficulties — then show how reservoir
          computing elegantly sidesteps those problems. From there, we&apos;ll make the leap to quantum
          systems and explore why quantum reservoirs might offer computational advantages that classical
          systems cannot match.
        </p>
        <p>
          Throughout, you&apos;ll encounter <strong>review cards</strong> — interactive flashcards designed to
          test and reinforce your understanding using spaced repetition. Research shows that actively testing
          yourself dramatically improves long-term retention compared to passive reading.
        </p>
      </Section>

      {/* ============ PART I: Classical Foundations ============ */}

      <Section id="recurrent-neural-networks" title="Recurrent Neural Networks">
        <p>
          To understand reservoir computing, we first need to understand what it improves upon. <strong>Recurrent
          neural networks (RNNs)</strong> are neural networks with feedback connections, allowing them to maintain
          an internal state that evolves over time. This makes them naturally suited for sequential and
          temporal data.
        </p>
        <p>
          In a standard RNN, the hidden state <MathBlock math="\mathbf{h}(t)" /> at time step{' '}
          <MathBlock math="t" /> is computed as:
        </p>
        <MathBlock
          display
          math="\mathbf{h}(t) = f\left(\mathbf{W}_{\text{in}} \mathbf{x}(t) + \mathbf{W}_{\text{res}} \mathbf{h}(t-1) + \mathbf{b}\right)"
        />
        <p>
          where <MathBlock math="\mathbf{x}(t)" /> is the input, <MathBlock math="\mathbf{W}_{\text{in}}" /> is
          the input weight matrix, <MathBlock math="\mathbf{W}_{\text{res}}" /> is the recurrent weight matrix,{' '}
          <MathBlock math="\mathbf{b}" /> is a bias vector, and <MathBlock math="f" /> is a nonlinear activation
          function (typically <MathBlock math="\tanh" />).
        </p>
        <p>
          The output is then produced by a readout function applied to the hidden state:
        </p>
        <MathBlock
          display
          math="\mathbf{y}(t) = g\left(\mathbf{W}_{\text{out}} \mathbf{h}(t)\right)"
        />
        <p>
          RNNs are powerful in principle — they are Turing-complete and can approximate any computable
          function on sequences. However, <em>training</em> them is notoriously difficult.
        </p>
      </Section>

      <Section id="the-training-problem" title="The Training Problem">
        <p>
          The standard approach to training RNNs is <strong>backpropagation through time (BPTT)</strong>. The
          network is &quot;unrolled&quot; across time steps, and gradients are computed by propagating errors backward
          through the entire sequence. This involves computing products of the recurrent weight matrix
          across many time steps:
        </p>
        <MathBlock
          display
          math="\frac{\partial \mathbf{h}(t)}{\partial \mathbf{h}(k)} = \prod_{i=k+1}^{t} \mathbf{W}_{\text{res}}^\top \, \text{diag}\left(f'(\mathbf{h}(i))\right)"
        />
        <p>
          This product of matrices is the source of the infamous <strong>vanishing and exploding gradient
          problem</strong>. If the spectral radius (largest eigenvalue magnitude) of{' '}
          <MathBlock math="\mathbf{W}_{\text{res}}" /> is less than 1, the gradient products shrink exponentially
          — gradients <em>vanish</em>, and the network cannot learn long-range dependencies. If the spectral
          radius exceeds 1, gradients <em>explode</em>, making training unstable.
        </p>
        <p>
          Architectures like LSTMs and GRUs partially address this with gating mechanisms, but they add
          significant complexity and computational cost. Reservoir computing takes a radically different approach:
          <strong> don&apos;t train the recurrent connections at all</strong>.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.rnn} />

      <Section id="echo-state-networks" title="Echo State Networks">
        <p>
          In 2001, Herbert Jaeger introduced <strong>Echo State Networks (ESNs)</strong>, one of the founding
          architectures of reservoir computing. The key insight is deceptively simple: instead of training all
          weights in the network, fix the recurrent weights randomly and only train the output layer.
        </p>
        <p>
          An ESN consists of three components:
        </p>
        <ol>
          <li>
            <strong>Input layer:</strong> Maps inputs to the reservoir via a random (fixed) weight matrix{' '}
            <MathBlock math="\mathbf{W}_{\text{in}}" />.
          </li>
          <li>
            <strong>Reservoir:</strong> A large, sparsely connected recurrent network with fixed random weights{' '}
            <MathBlock math="\mathbf{W}_{\text{res}}" />. Typically hundreds to thousands of nodes.
          </li>
          <li>
            <strong>Readout layer:</strong> A simple linear mapping{' '}
            <MathBlock math="\mathbf{W}_{\text{out}}" /> that is the <em>only</em> trained component.
          </li>
        </ol>
        <p>
          The reservoir state update follows the same recurrence as a standard RNN:
        </p>
        <MathBlock
          display
          math="\mathbf{h}(t) = (1-\alpha)\mathbf{h}(t-1) + \alpha \tanh\left(\mathbf{W}_{\text{in}} \mathbf{x}(t) + \mathbf{W}_{\text{res}} \mathbf{h}(t-1)\right)"
        />
        <p>
          where <MathBlock math="\alpha \in (0, 1]" /> is a <strong>leaking rate</strong> that controls the
          speed of reservoir dynamics. The crucial difference is that{' '}
          <MathBlock math="\mathbf{W}_{\text{in}}" /> and <MathBlock math="\mathbf{W}_{\text{res}}" /> are
          never updated during training.
        </p>
      </Section>

      <Section id="reservoir-computing-paradigm" title="The Reservoir Computing Paradigm">
        <p>
          The reservoir computing paradigm rests on a powerful conceptual separation: the <strong>reservoir</strong>{' '}
          acts as a fixed, high-dimensional nonlinear dynamical system that projects inputs into a rich feature
          space, while the <strong>readout</strong> extracts task-relevant information through simple linear
          combination.
        </p>
        <p>
          For this to work, the reservoir must satisfy two key properties:
        </p>
        <ul>
          <li>
            <strong>Separation property:</strong> Different input sequences should drive the reservoir to
            distinguishably different states. The reservoir must be sensitive enough to separate distinct inputs.
          </li>
          <li>
            <strong>Fading memory (echo state property):</strong> The reservoir&apos;s state should gradually forget
            initial conditions. The influence of inputs from the distant past should decay, ensuring the
            current state primarily reflects recent inputs.
          </li>
        </ul>
        <p>
          These properties create a balance: the reservoir must remember enough recent history to be useful,
          but not so much that it becomes chaotic or retains irrelevant ancient history. The{' '}
          <strong>spectral radius</strong> <MathBlock math="\rho(\mathbf{W}_{\text{res}})" /> — the largest
          absolute eigenvalue of the reservoir weight matrix — is the key control parameter. A necessary
          (though not sufficient) condition for the echo state property is:
        </p>
        <MathBlock
          display
          math="\rho(\mathbf{W}_{\text{res}}) < 1"
        />
        <p>
          In practice, the spectral radius is typically set close to (but below) 1, often around 0.9–0.99,
          to operate near the &quot;edge of chaos&quot; where computational power is maximized.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.training} />

      <Section id="readout-layer" title="The Readout Layer">
        <p>
          The elegance of reservoir computing lies in how simple the training becomes. Given a sequence of
          inputs and corresponding target outputs, we collect the reservoir states into a matrix{' '}
          <MathBlock math="\mathbf{H}" /> where each row is a reservoir state at one time step. The readout
          weights are then found by solving a linear regression problem:
        </p>
        <MathBlock
          display
          math="\mathbf{W}_{\text{out}} = \mathbf{Y}_{\text{target}} \mathbf{H}^\top (\mathbf{H} \mathbf{H}^\top + \beta \mathbf{I})^{-1}"
        />
        <p>
          where <MathBlock math="\beta" /> is a regularization parameter (Tikhonov / ridge regression) that
          prevents overfitting. This is a <strong>closed-form solution</strong> — no iterative optimization, no
          gradient descent, no hyperparameter-sensitive training loops. A single matrix computation gives you
          the optimal readout weights.
        </p>
        <p>
          This simplicity is what makes reservoir computing so attractive: all the complex, nonlinear
          processing happens in the fixed reservoir, and we only need to solve a simple linear problem to
          extract the information we need. As we&apos;ll see, this property becomes even more powerful when the
          reservoir is a quantum system.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.esn} />

      {/* ============ PART II: Going Quantum ============ */}

      <Section id="going-quantum" title="Going Quantum">
        <p>
          Now we arrive at the central question: <em>what happens if we replace the classical reservoir with a
          quantum system?</em> The idea is natural and compelling. Quantum systems are inherently:
        </p>
        <ul>
          <li>
            <strong>High-dimensional:</strong> An <MathBlock math="n" />-qubit system lives in a{' '}
            <MathBlock math="2^n" />-dimensional Hilbert space, providing exponentially many degrees of freedom.
          </li>
          <li>
            <strong>Nonlinear (upon measurement):</strong> While quantum evolution is linear (unitary), the
            measurement process introduces effective nonlinearity in the observed features.
          </li>
          <li>
            <strong>Dynamical:</strong> Quantum systems naturally evolve over time under Hamiltonian dynamics,
            providing the temporal processing needed for reservoir computing.
          </li>
        </ul>
        <p>
          These properties map directly onto the requirements for a good reservoir. The exponential state space
          means even a small quantum system can generate an extraordinarily rich feature space — potentially
          far richer than a classical reservoir of comparable physical size.
        </p>
      </Section>

      <Section id="quantum-systems-as-reservoirs" title="Quantum Systems as Reservoirs">
        <p>
          In quantum reservoir computing, the reservoir is a quantum system — typically a collection of
          interacting qubits. The system evolves according to the Schrödinger equation:
        </p>
        <MathBlock
          display
          math="i\hbar \frac{d}{dt}|\psi(t)\rangle = \hat{H}(t)|\psi(t)\rangle"
        />
        <p>
          or equivalently, for the density matrix <MathBlock math="\rho" /> (which can describe mixed states
          and open quantum systems):
        </p>
        <MathBlock
          display
          math="\frac{d\rho}{dt} = -\frac{i}{\hbar}[\hat{H}(t), \rho(t)] + \mathcal{L}[\rho(t)]"
        />
        <p>
          where <MathBlock math="\hat{H}(t)" /> is the system Hamiltonian and{' '}
          <MathBlock math="\mathcal{L}" /> is a Lindbladian superoperator describing decoherence and
          dissipation. The Hamiltonian typically includes:
        </p>
        <ul>
          <li>
            <strong>Internal interactions:</strong> Qubit-qubit couplings like{' '}
            <MathBlock math="\sum_{i,j} J_{ij} \hat{\sigma}_i^z \hat{\sigma}_j^z" /> (Ising-type) or
            Heisenberg interactions.
          </li>
          <li>
            <strong>Input-dependent terms:</strong> External fields modulated by the input signal, such as{' '}
            <MathBlock math="\sum_i x(t) B_i \hat{\sigma}_i^x" />.
          </li>
          <li>
            <strong>Disorder:</strong> Random local fields{' '}
            <MathBlock math="\sum_i h_i \hat{\sigma}_i^z" /> that help diversify reservoir dynamics.
          </li>
        </ul>
        <p>
          The interplay between these terms — particularly the balance between interaction strength,
          input driving, and dissipation — determines the computational capabilities of the quantum reservoir.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.quantum} />

      <Section id="input-encoding" title="Input Encoding Strategies">
        <p>
          How we feed classical data into a quantum reservoir is a critical design choice. Several encoding
          strategies have been developed:
        </p>
        <SubSection id="input-encoding-parameter" title="Parameter Encoding">
          <p>
            The simplest approach modulates parameters of the Hamiltonian with the input signal. For example,
            the input <MathBlock math="x(t)" /> can control the strength of an external magnetic field:
          </p>
          <MathBlock
            display
            math="\hat{H}(t) = \hat{H}_0 + x(t) \sum_i B_i \hat{\sigma}_i^x"
          />
          <p>
            The system then evolves for a fixed time <MathBlock math="\tau" /> before the next input is
            applied. This is analogous to how inputs drive a classical ESN, with the quantum dynamics playing
            the role of the nonlinear activation function.
          </p>
        </SubSection>

        <SubSection id="input-encoding-amplitude" title="Amplitude Encoding">
          <p>
            In amplitude encoding, the input data is encoded directly into the amplitudes of a quantum state.
            For an input vector <MathBlock math="\mathbf{x} = (x_1, \ldots, x_N)" />, we prepare:
          </p>
          <MathBlock
            display
            math="|\psi_{\text{in}}\rangle = \frac{1}{\|\mathbf{x}\|} \sum_{i=1}^{N} x_i |i\rangle"
          />
          <p>
            This is exponentially efficient in terms of the number of qubits needed (only{' '}
            <MathBlock math="\lceil \log_2 N \rceil" /> qubits for <MathBlock math="N" /> data points), but
            preparing such states can be costly in terms of circuit depth.
          </p>
        </SubSection>

        <SubSection id="input-encoding-temporal" title="Time-Multiplexing">
          <p>
            Inspired by classical delay-line reservoirs, time-multiplexing feeds inputs sequentially to a
            single quantum node (or small subsystem), using the temporal dynamics as the effective reservoir
            dimension. Inputs are applied at intervals shorter than the system&apos;s relaxation time, creating
            a virtual network of nodes within the transient dynamics.
          </p>
        </SubSection>
      </Section>

      <Section id="measurement-and-features" title="Measurement & Feature Extraction">
        <p>
          The final step in the QRC pipeline is extracting classical features from the quantum reservoir state.
          This is done through quantum measurements. The most common approach computes{' '}
          <strong>expectation values</strong> of observables:
        </p>
        <MathBlock
          display
          math="\langle \hat{O}_k \rangle = \text{Tr}(\hat{O}_k \, \rho(t))"
        />
        <p>
          Typical observables include single-qubit Pauli operators{' '}
          <MathBlock math="\hat{\sigma}_i^x, \hat{\sigma}_i^y, \hat{\sigma}_i^z" /> and multi-qubit
          correlations like <MathBlock math="\hat{\sigma}_i^z \hat{\sigma}_j^z" />. For{' '}
          <MathBlock math="n" /> qubits, the set of all Pauli strings provides up to{' '}
          <MathBlock math="4^n - 1" /> independent observables — an exponentially large feature set.
        </p>
        <p>
          These expectation values form the feature vector that is passed to the classical linear readout:
        </p>
        <MathBlock
          display
          math="y(t) = \sum_k w_k \langle \hat{O}_k \rangle_t + b"
        />
        <p>
          The readout weights <MathBlock math="w_k" /> and bias <MathBlock math="b" /> are trained using
          ridge regression, exactly as in the classical case. Importantly, we only need a polynomial number
          of measurements to extract useful features — we don&apos;t need to measure all{' '}
          <MathBlock math="4^n - 1" /> observables.
        </p>
        <p>
          An important subtlety: quantum measurement is inherently probabilistic, so each expectation
          value must be estimated by repeating the experiment (running &quot;shots&quot;). The number of shots
          required for accurate estimation affects both the computational cost and the effective noise level
          of the QRC system.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.encoding} />

      {/* ============ PART III: Applications & Frontiers ============ */}

      <Section id="time-series-prediction" title="Time Series Prediction">
        <p>
          Time series prediction is the most widely studied application of QRC. The standard benchmarks include:
        </p>
        <ul>
          <li>
            <strong>NARMA tasks:</strong> The Nonlinear Auto-Regressive Moving Average task of order{' '}
            <MathBlock math="n" /> (NARMA-<MathBlock math="n" />) tests the ability to learn nonlinear
            temporal dependencies. The target output depends on the current input and the previous{' '}
            <MathBlock math="n" /> outputs, requiring the reservoir to maintain a fading memory of sufficient
            depth. NARMA-10 is a common benchmark:
          </li>
        </ul>
        <MathBlock
          display
          math="y(t+1) = 0.3 y(t) + 0.05 y(t) \sum_{i=0}^{9} y(t-i) + 1.5 x(t) x(t-9) + 0.1"
        />
        <ul>
          <li>
            <strong>Mackey-Glass system:</strong> A chaotic time series defined by a delay differential equation.
            Predicting its future values tests the reservoir&apos;s ability to model complex chaotic dynamics.
          </li>
          <li>
            <strong>Santa Fe laser data:</strong> Real-world experimental data from a chaotic laser system.
          </li>
        </ul>
        <p>
          Numerical studies have shown that QRC with as few as 5–7 qubits can match or exceed the
          performance of classical ESNs with hundreds of nodes on these benchmarks, suggesting a significant
          resource advantage.
        </p>
      </Section>

      <Section id="quantum-advantage" title="Quantum Advantage Arguments">
        <p>
          The question of quantum advantage in QRC can be framed through the <strong>kernel perspective</strong>.
          Any reservoir computer (classical or quantum) implicitly defines a kernel function:
        </p>
        <MathBlock
          display
          math="K(\mathbf{x}, \mathbf{x}') = \langle \phi(\mathbf{x}), \phi(\mathbf{x}') \rangle"
        />
        <p>
          where <MathBlock math="\phi(\mathbf{x})" /> is the feature map induced by the reservoir dynamics. The
          quantum reservoir&apos;s feature map operates in the exponentially large Hilbert space, defining a
          <strong> quantum kernel</strong> that may capture correlations inaccessible to polynomial-sized
          classical feature maps.
        </p>
        <p>
          There are several arguments for quantum advantage:
        </p>
        <ul>
          <li>
            <strong>Exponential feature space:</strong> An <MathBlock math="n" />-qubit reservoir provides
            access to a <MathBlock math="2^n" />-dimensional feature space through the density matrix elements.
          </li>
          <li>
            <strong>Entanglement-enhanced correlations:</strong> Quantum entanglement allows the reservoir
            to represent correlations between features that would require exponentially many classical nodes.
          </li>
          <li>
            <strong>Native quantum data processing:</strong> For tasks involving quantum data (e.g., classifying
            quantum states or learning quantum channels), QRC avoids the exponential overhead of classical
            simulation.
          </li>
        </ul>
        <p>
          However, proving rigorous quantum advantage remains an open challenge. The practical advantage
          depends on the specific task, the noise level of the quantum hardware, and the number of
          measurements available.
        </p>
      </Section>

      <Section id="physical-implementations" title="Physical Implementations">
        <p>
          One of QRC&apos;s greatest strengths is its flexibility in physical implementation. Because the reservoir
          dynamics are not trained, we can use <em>any</em> controllable quantum system. Several platforms have
          been explored:
        </p>
        <ul>
          <li>
            <strong>Superconducting qubits:</strong> Transmon-based processors (like those from IBM and Google)
            offer high connectivity and fast gate operations. QRC has been demonstrated on IBM quantum
            hardware with up to 7 qubits.
          </li>
          <li>
            <strong>Nuclear Magnetic Resonance (NMR):</strong> Liquid-state NMR systems use nuclear spins in
            molecules as qubits. While limited in scalability, NMR provides excellent coherence and precise
            control, making it ideal for proof-of-concept QRC experiments.
          </li>
          <li>
            <strong>Photonic systems:</strong> Optical implementations can operate at room temperature and
            offer high speeds. Photonic QRC uses the temporal and spectral modes of light as computational
            resources.
          </li>
          <li>
            <strong>Trapped ions:</strong> Long coherence times and high-fidelity operations make trapped ion
            systems attractive for QRC, though they currently face speed limitations.
          </li>
          <li>
            <strong>Nitrogen-vacancy centers:</strong> Solid-state spin defects in diamond offer room-temperature
            quantum properties and have been proposed for QRC applications.
          </li>
        </ul>
      </Section>

      <Section id="research-directions" title="Current Research Directions">
        <p>
          Quantum reservoir computing is an active and rapidly evolving field. Key research directions include:
        </p>
        <ul>
          <li>
            <strong>Reservoir design optimization:</strong> While the reservoir isn&apos;t trained by backpropagation,
            its structure (connectivity, coupling strengths, input encoding) can be optimized. Techniques
            from random matrix theory and quantum chaos are being applied to understand optimal reservoir
            structures.
          </li>
          <li>
            <strong>Noise as a resource:</strong> Counter-intuitively, the noise and decoherence present in
            real quantum hardware may actually <em>help</em> QRC by providing the dissipation needed for
            fading memory. Some studies suggest that moderate noise levels can improve QRC performance.
          </li>
          <li>
            <strong>Hybrid quantum-classical architectures:</strong> Combining quantum reservoirs with classical
            pre- and post-processing layers to leverage the strengths of both paradigms.
          </li>
          <li>
            <strong>Temporal information processing capacity:</strong> Developing rigorous theoretical measures
            of the computational power of quantum reservoirs, extending classical information processing
            capacity measures to the quantum domain.
          </li>
          <li>
            <strong>Beyond supervised learning:</strong> Exploring QRC for reinforcement learning, generative
            modeling, and unsupervised feature extraction.
          </li>
        </ul>
        <p>
          The field sits at a fascinating intersection of quantum physics, machine learning, and dynamical
          systems theory. As quantum hardware continues to improve, QRC may be among the first quantum
          machine learning approaches to demonstrate clear, practical quantum advantage.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.applications} />
    </Essay>
  );
}
