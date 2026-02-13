'use client';

import { Essay, Section } from '@/components/Essay';
import { MathBlock } from '@/components/MathBlock';
import { ReviewCardSet } from '@/components/ReviewCardSet';
import { echoStateCards } from '@/data/echo-state-cards';

export default function EchoStatePage() {
  const cardSets = {
    architecture: echoStateCards.filter((c) => {
      const n = parseInt(c.id.split('-')[1]);
      return n <= 5;
    }),
    esp: echoStateCards.filter((c) => {
      const n = parseInt(c.id.split('-')[1]);
      return n >= 6 && n <= 13;
    }),
    design: echoStateCards.filter((c) => {
      const n = parseInt(c.id.split('-')[1]);
      return n >= 14 && n <= 20;
    }),
    applications: echoStateCards.filter((c) => {
      const n = parseInt(c.id.split('-')[1]);
      return n >= 21;
    }),
  };

  return (
    <Essay
      title="How Echo State Networks Work"
      subtitle="A detailed exploration of echo state networks — the classical foundation of reservoir computing — covering the echo state property, spectral radius, and practical design."
    >
      <Section id="esn-introduction" title="Introduction">
        <p>
          Echo State Networks (ESNs), introduced by Herbert Jaeger in 2001, represent one of the most
          elegant ideas in machine learning: rather than painstakingly training every weight in a recurrent
          neural network, simply <strong>fix the recurrent weights randomly</strong> and only train the output
          layer. This seemingly reckless approach works remarkably well, and understanding <em>why</em> it
          works reveals deep connections between dynamical systems theory and machine learning.
        </p>
        <p>
          This essay explores ESNs in detail — their architecture, the mathematical properties that make
          them work, practical design guidelines, and their limitations. If you&apos;re coming from the QRC
          essay, this will deepen your understanding of the classical foundations upon which quantum
          reservoir computing is built.
        </p>
      </Section>

      <Section id="esn-architecture" title="ESN Architecture">
        <p>
          An ESN has three distinct layers:
        </p>
        <p>
          <strong>The Input Layer</strong> connects external inputs to the reservoir through a weight matrix{' '}
          <MathBlock math="\mathbf{W}_{\text{in}} \in \mathbb{R}^{N \times K}" />, where{' '}
          <MathBlock math="N" /> is the reservoir size and <MathBlock math="K" /> is the input dimension.
          These weights are drawn randomly (typically uniform or Gaussian) and <em>never trained</em>. The
          input scaling factor <MathBlock math="s_{\text{in}}" /> controls how strongly inputs drive the
          reservoir:
        </p>
        <MathBlock
          display
          math="\mathbf{W}_{\text{in}} \leftarrow s_{\text{in}} \cdot \mathbf{W}_{\text{in}}"
        />
        <p>
          <strong>The Reservoir</strong> is a large recurrent network with{' '}
          <MathBlock math="N" /> nodes (typically 100–10,000) connected by a sparse random weight matrix{' '}
          <MathBlock math="\mathbf{W}_{\text{res}} \in \mathbb{R}^{N \times N}" />. Sparsity is important —
          typically only 1–10% of possible connections are non-zero. The reservoir state evolves as:
        </p>
        <MathBlock
          display
          math="\mathbf{h}(t) = (1 - \alpha)\,\mathbf{h}(t-1) + \alpha\,\tanh\!\left(\mathbf{W}_{\text{in}}\,\mathbf{x}(t) + \mathbf{W}_{\text{res}}\,\mathbf{h}(t-1)\right)"
        />
        <p>
          The parameter <MathBlock math="\alpha \in (0, 1]" /> is the <strong>leaking rate</strong>. When{' '}
          <MathBlock math="\alpha = 1" />, there is no leaking and we get a standard ESN update. Smaller
          values create a leaky integrator that smooths the dynamics and acts as a low-pass filter on the
          reservoir states.
        </p>
        <p>
          <strong>The Readout Layer</strong> computes the output as a linear combination of reservoir states:
        </p>
        <MathBlock
          display
          math="\mathbf{y}(t) = \mathbf{W}_{\text{out}} [\mathbf{h}(t); \mathbf{x}(t); 1]"
        />
        <p>
          where we typically concatenate the reservoir state, the current input, and a bias term. The
          readout weights <MathBlock math="\mathbf{W}_{\text{out}}" /> are the <em>only</em> trainable
          parameters in the entire network.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.architecture} />

      <Section id="echo-state-property" title="The Echo State Property">
        <p>
          The <strong>echo state property (ESP)</strong> is the fundamental theoretical requirement for
          ESNs to work correctly. Informally, it states that the reservoir&apos;s state should be uniquely
          determined by the input history, regardless of the initial state.
        </p>
        <p>
          More precisely, an ESN has the echo state property if for any input sequence{' '}
          <MathBlock math="\{\mathbf{x}(t)\}_{t=-\infty}^{T}" /> and any two initial states{' '}
          <MathBlock math="\mathbf{h}_1(0)" /> and <MathBlock math="\mathbf{h}_2(0)" />, the resulting
          reservoir states converge:
        </p>
        <MathBlock
          display
          math="\|\mathbf{h}_1(t) - \mathbf{h}_2(t)\| \to 0 \quad \text{as} \quad t \to \infty"
        />
        <p>
          In other words, the reservoir &quot;forgets&quot; its initial state — the current state is an{' '}
          <strong>echo</strong> of the input history, not of the initialization. This is essential because:
        </p>
        <ul>
          <li>It ensures the reservoir implements a well-defined function from input sequences to states.</li>
          <li>It guarantees reproducibility — the same input always produces the same reservoir dynamics.</li>
          <li>It provides the fading memory needed for temporal processing: recent inputs have more influence than distant ones.</li>
        </ul>
        <p>
          Without the ESP, the reservoir would be chaotic — sensitive to initial conditions and unable to
          implement a consistent input-output mapping. The readout layer would be trying to learn a
          non-deterministic function, which is fundamentally impossible.
        </p>
      </Section>

      <Section id="spectral-radius" title="Spectral Radius">
        <p>
          The <strong>spectral radius</strong> <MathBlock math="\rho(\mathbf{W}_{\text{res}})" /> is the
          magnitude of the largest eigenvalue of the reservoir weight matrix. It is the single most important
          hyperparameter in ESN design.
        </p>
        <p>
          A <em>sufficient</em> condition for the echo state property (with{' '}
          <MathBlock math="\tanh" /> activation) is that the largest singular value{' '}
          <MathBlock math="\sigma_{\max}(\mathbf{W}_{\text{res}}) < 1" />. A <em>necessary</em> condition is:
        </p>
        <MathBlock
          display
          math="\rho(\mathbf{W}_{\text{res}}) < 1"
        />
        <p>
          In practice, we rescale the reservoir matrix to achieve a desired spectral radius:
        </p>
        <MathBlock
          display
          math="\mathbf{W}_{\text{res}} \leftarrow \frac{\rho_{\text{desired}}}{\rho(\mathbf{W}_{\text{res}}^{(\text{raw})})} \cdot \mathbf{W}_{\text{res}}^{(\text{raw})}"
        />
        <p>
          The choice of spectral radius creates a fundamental trade-off:
        </p>
        <ul>
          <li>
            <strong>Small <MathBlock math="\rho" /> (e.g., 0.1–0.5):</strong> Fast forgetting, short memory.
            Good for tasks requiring only recent input history. Very stable dynamics.
          </li>
          <li>
            <strong>Large <MathBlock math="\rho" /> (e.g., 0.9–0.99):</strong> Slow forgetting, long memory.
            Needed for tasks with long-range dependencies. Operates near the &quot;edge of chaos&quot; where
            computational capacity is maximized, but stability may be reduced.
          </li>
          <li>
            <strong><MathBlock math="\rho \geq 1" />:</strong> ESP violated. Reservoir becomes chaotic.
            Reservoir states explode or oscillate unpredictably. Unusable for computation.
          </li>
        </ul>
        <p>
          The optimal spectral radius depends strongly on the task. For tasks requiring long memory (like
          NARMA-10), values close to 1 work best. For fast-changing signals with short-range correlations,
          smaller values are preferred.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.esp} />

      <Section id="reservoir-design" title="Reservoir Design Principles">
        <p>
          Beyond the spectral radius, several design choices affect ESN performance:
        </p>
        <p>
          <strong>Reservoir size <MathBlock math="N" />:</strong> Larger reservoirs have more computational
          power but require more training data to avoid overfitting. A rule of thumb: the reservoir should be
          at least 2–10× larger than the number of independent features needed for the task.
        </p>
        <p>
          <strong>Sparsity:</strong> The fraction of non-zero connections in{' '}
          <MathBlock math="\mathbf{W}_{\text{res}}" />. Sparse reservoirs (1–20% connectivity) often
          outperform dense ones because sparsity creates diverse sub-networks within the reservoir, each
          specializing in different aspects of the input dynamics.
        </p>
        <p>
          <strong>Input scaling <MathBlock math="s_{\text{in}}" />:</strong> Controls the nonlinearity of
          the reservoir response. Large input scaling pushes neuron activations toward the saturation regions
          of the <MathBlock math="\tanh" /> function, increasing nonlinearity. Small input scaling keeps
          activations in the near-linear region around zero. Optimal input scaling depends on whether the
          task requires mostly linear or strongly nonlinear processing.
        </p>
        <p>
          <strong>Bias:</strong> Adding a bias term <MathBlock math="\mathbf{b}" /> to the reservoir
          update can shift the operating point of the neurons. This is particularly useful for tasks that
          require asymmetric responses.
        </p>
        <p>
          <strong>Weight distribution:</strong> Reservoir weights can be drawn from various distributions
          (uniform, Gaussian, discrete <MathBlock math="\{-1, 0, +1\}" />). In practice, the choice of
          distribution has relatively little impact compared to the spectral radius and sparsity — what
          matters most is the global structure, not the individual weight values.
        </p>
      </Section>

      <Section id="training-readout" title="Training the Readout">
        <p>
          Training an ESN consists of three phases:
        </p>
        <p>
          <strong>1. Washout:</strong> Run the reservoir on an initial portion of the input sequence (typically
          100–500 time steps) to eliminate the influence of the arbitrary initial state. The reservoir states
          during this period are discarded.
        </p>
        <p>
          <strong>2. State collection:</strong> Continue running the reservoir and collect states{' '}
          <MathBlock math="\mathbf{h}(t)" /> along with the corresponding target outputs{' '}
          <MathBlock math="\mathbf{y}_{\text{target}}(t)" /> into matrices{' '}
          <MathBlock math="\mathbf{H}" /> and <MathBlock math="\mathbf{Y}" />.
        </p>
        <p>
          <strong>3. Regression:</strong> Solve for the readout weights using ridge regression
          (Tikhonov regularization):
        </p>
        <MathBlock
          display
          math="\mathbf{W}_{\text{out}} = \mathbf{Y} \mathbf{H}^\top \left(\mathbf{H}\mathbf{H}^\top + \beta \mathbf{I}\right)^{-1}"
        />
        <p>
          The regularization parameter <MathBlock math="\beta" /> is critical. Too small, and the readout
          overfits to training data noise. Too large, and the readout underfits, ignoring useful reservoir
          dynamics. Cross-validation is the standard method for selecting <MathBlock math="\beta" />.
        </p>
        <p>
          The entire training process has <strong>no gradient computation</strong>, <strong>no iterative
          optimization</strong>, and <strong>no hyperparameter-sensitive training loops</strong>. It is
          a single linear algebra operation — a dramatic simplification compared to training standard RNNs
          with BPTT.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.design} />

      <Section id="esn-applications" title="Applications">
        <p>
          ESNs have been successfully applied to a wide range of problems:
        </p>
        <ul>
          <li>
            <strong>Time series prediction:</strong> Chaotic systems (Mackey-Glass, Lorenz attractor),
            financial forecasting, weather prediction. ESNs were among the first methods to achieve
            competitive performance on the Santa Fe laser benchmark.
          </li>
          <li>
            <strong>Signal processing:</strong> Nonlinear channel equalization, noise reduction, system
            identification. The inherent nonlinear dynamics of the reservoir make it naturally suited for
            these tasks.
          </li>
          <li>
            <strong>Speech and language:</strong> Phoneme recognition, speech synthesis, language modeling.
            The temporal memory of the reservoir captures the sequential structure of speech.
          </li>
          <li>
            <strong>Robotics:</strong> Motor control, inverse kinematics, gait generation. The fast training
            allows online adaptation to changing conditions.
          </li>
          <li>
            <strong>Classification:</strong> Pattern recognition on temporal data, gesture recognition,
            EEG analysis. The reservoir transforms time series into rich feature vectors that linear
            classifiers can easily separate.
          </li>
        </ul>
      </Section>

      <Section id="esn-limitations" title="Limitations & Extensions">
        <p>
          Despite their elegance, ESNs have notable limitations:
        </p>
        <ul>
          <li>
            <strong>Reservoir selection:</strong> The performance is sensitive to hyperparameters (spectral
            radius, size, sparsity, input scaling) that must be tuned. While easier than training all weights,
            this still requires careful experimentation.
          </li>
          <li>
            <strong>Scalability:</strong> For very complex tasks, very large reservoirs may be needed,
            leading to high memory costs for storing states and solving the regression.
          </li>
          <li>
            <strong>Long-range dependencies:</strong> Even with spectral radius near 1, ESNs struggle with
            very long-range temporal dependencies compared to LSTMs and Transformers.
          </li>
          <li>
            <strong>Linear readout limitation:</strong> The readout is fundamentally linear. If the target
            function requires highly nonlinear combinations of features that the reservoir doesn&apos;t
            naturally provide, performance suffers.
          </li>
        </ul>
        <p>
          Several extensions address these limitations:
        </p>
        <ul>
          <li>
            <strong>Deep ESNs:</strong> Stack multiple reservoir layers, with each layer processing the
            output of the previous one. This introduces hierarchical temporal processing.
          </li>
          <li>
            <strong>Intrinsic plasticity:</strong> Adapt the reservoir neurons&apos; activation functions (not
            the weights) to optimize the information content of the reservoir states.
          </li>
          <li>
            <strong>Conceptors:</strong> A mechanism introduced by Jaeger for selectively filtering reservoir
            dynamics, enabling pattern generation and interpolation between learned patterns.
          </li>
        </ul>
        <p>
          These extensions expand the capabilities of ESNs while maintaining the core advantage: the
          recurrent weights are never trained by backpropagation. This property is what makes ESNs the
          natural precursor to quantum reservoir computing, where the &quot;reservoir&quot; is a physical quantum
          system whose dynamics are fixed by the laws of physics.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.applications} />
    </Essay>
  );
}
