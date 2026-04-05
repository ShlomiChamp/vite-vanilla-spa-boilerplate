import './style.css'

// ── EEG path generator ──────────────────────────────────────────────────────
// Produces a realistic-looking EEG waveform as an SVG path string.
// Mixes three sine frequencies to create the irregular, organic shape.
function eegPath(yCenter, totalWidth, amplitude, freq, phase = 0) {
  const steps = 300
  let d = `M 0 ${yCenter}`
  for (let i = 1; i <= steps; i++) {
    const x = (i / steps) * totalWidth
    const y =
      yCenter +
      Math.sin(i * freq + phase) * amplitude * 0.55 +
      Math.sin(i * freq * 2.7 + phase * 1.3) * amplitude * 0.30 +
      Math.sin(i * freq * 6.1 + phase * 0.6) * amplitude * 0.15
    d += ` L ${x.toFixed(1)} ${y.toFixed(2)}`
  }
  return d
}

// ── Build hero wave SVG (two copies side-by-side for seamless scroll) ───────
function heroWaveSVG() {
  const W = 960
  const channels = [
    { y: 50,  amp: 18, freq: 0.09,  phase: 0.0, color: '#818cf8', opacity: 0.55, sw: 1.5 },
    { y: 90,  amp: 14, freq: 0.13,  phase: 1.8, color: '#a78bfa', opacity: 0.35, sw: 1.0 },
    { y: 130, amp: 22, freq: 0.07,  phase: 3.2, color: '#c084fc', opacity: 0.25, sw: 1.0 },
    { y: 160, amp: 12, freq: 0.17,  phase: 0.9, color: '#818cf8', opacity: 0.20, sw: 0.8 },
  ]

  const paths = channels.map(ch => {
    const left  = eegPath(ch.y, W, ch.amp, ch.freq, ch.phase)
    const right = eegPath(ch.y, W, ch.amp, ch.freq, ch.phase) // same → seamless
    return `
      <path d="${left}"  stroke="${ch.color}" stroke-width="${ch.sw}" fill="none" opacity="${ch.opacity}"/>
      <path d="${right}" stroke="${ch.color}" stroke-width="${ch.sw}" fill="none" opacity="${ch.opacity}" transform="translate(${W},0)"/>`
  }).join('')

  return `<svg class="hero-wave-svg" viewBox="0 0 ${W * 2} 180" preserveAspectRatio="none"
           xmlns="http://www.w3.org/2000/svg">${paths}</svg>`
}

// ── Build spotlight EEG display ──────────────────────────────────────────────
function spotlightEEG() {
  const W = 832
  const channels = [
    { y: 24,  amp: 10, freq: 0.14, phase: 0.0 },
    { y: 56,  amp: 14, freq: 0.09, phase: 1.5 },
    { y: 88,  amp: 8,  freq: 0.19, phase: 2.8 },
    { y: 120, amp: 12, freq: 0.11, phase: 0.7 },
    { y: 152, amp: 10, freq: 0.16, phase: 3.5 },
  ]
  const labels = ['Fp1', 'C3', 'Pz', 'O1', 'T4']
  const colors = ['#818cf8', '#a78bfa', '#c084fc', '#818cf8', '#a78bfa']

  const rows = channels.map((ch, i) => `
    <text class="eeg-channel-label" x="0" y="${ch.y + 4}">${labels[i]}</text>
    <path d="${eegPath(ch.y, W - 36, ch.amp, ch.freq, ch.phase)}"
          stroke="${colors[i]}" stroke-width="1.4" fill="none" opacity="0.75"
          transform="translate(36,0)"
          style="opacity:0;animation:eeg-fade 0.7s ease ${0.1 + i * 0.12}s forwards"/>
  `).join('')

  return `
    <style>
      @keyframes eeg-fade { to { opacity: 0.75 } }
    </style>
    <svg viewBox="0 0 ${W} 176" xmlns="http://www.w3.org/2000/svg"
         style="width:100%;overflow:visible">${rows}</svg>`
}

// ── Page template ────────────────────────────────────────────────────────────
function template() {
  return /* html */`
    <!-- ── Navigation ── -->
    <nav id="nav">
      <div class="nav-inner">
        <a href="#top" class="nav-logo">NeuraWave</a>
        <ul class="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#science">Science</a></li>
          <li><a href="#technology">Technology</a></li>
          <li><a href="#use-cases">Use Cases</a></li>
        </ul>
        <a href="#order" class="nav-cta">Order</a>
      </div>
    </nav>

    <!-- ── Hero ── -->
    <section class="hero" id="top">
      <p class="hero-eyebrow">Introducing</p>
      <h1 class="hero-title">NeuraWave</h1>
      <p class="hero-tagline">Your mind, decoded.</p>
      <p class="hero-desc">
        The world's first AI-powered brain interface that understands,
        interprets, and responds to your neural activity — in real time.
      </p>
      <div class="hero-ctas ctas">
        <a href="#technology" class="btn btn-purple">Learn more</a>
        <a href="#order"      class="btn btn-outline-white">Order now</a>
      </div>
      <div class="hero-wave">${heroWaveSVG()}</div>
    </section>

    <!-- ── Intro ── -->
    <section class="intro">
      <div class="section-inner">
        <p class="label label-blue reveal">Brain-Computer Interface</p>
        <h2 class="section-heading reveal">
          The first AI brain interface<br>that truly listens.
        </h2>
        <p class="section-body reveal" style="margin:20px auto 0">
          NeuraWave captures the electrical signals of your brain with
          medical-grade precision, then uses a custom large language model
          to interpret what they mean — and acts on it.
        </p>
      </div>
    </section>

    <!-- ── Stats ── -->
    <section class="stats">
      <div class="section-inner">
        <div class="stats-grid reveal">
          <div class="stat-cell">
            <div class="stat-value">256<span class="stat-unit">ch</span></div>
            <div class="stat-label">EEG electrode channels</div>
          </div>
          <div class="stat-cell">
            <div class="stat-value">&lt;5<span class="stat-unit">ms</span></div>
            <div class="stat-label">End-to-end latency</div>
          </div>
          <div class="stat-cell">
            <div class="stat-value">98<span class="stat-unit">%</span></div>
            <div class="stat-label">AI decoding accuracy</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Spotlight ── -->
    <section class="spotlight" id="science">
      <p class="label label-muted reveal">Hardware meets AI</p>
      <h2 class="spotlight-title reveal">
        256 channels.<br><em>Real-time AI.</em><br>Zero compromise.
      </h2>
      <p class="spotlight-body reveal">
        NeuraWave combines medical-grade dry EEG sensors with a custom neural
        language model trained on over 10 million hours of brain signal data.
        The result: a device that doesn't just measure your brain — it understands it.
      </p>
      <div class="ctas reveal" style="justify-content:center">
        <a href="#features" class="btn btn-primary">Explore features</a>
      </div>
      <div class="eeg-display reveal">${spotlightEEG()}</div>
    </section>

    <!-- ── Features ── -->
    <section class="features" id="features">
      <div class="section-inner">
        <div class="features-header">
          <p class="label label-blue reveal">What it does</p>
          <h2 class="section-heading reveal">Engineered for<br>the human mind.</h2>
        </div>
        <div class="features-grid">
          <div class="feat-card reveal">
            <div class="feat-icon">🧠</div>
            <h3 class="feat-title">Real-Time Neural Decoding</h3>
            <p class="feat-desc">
              NeuraWave processes all 256 channels simultaneously at 2 kHz,
              decoding intent, emotion, and cognitive states with sub-5ms
              latency — faster than conscious thought.
            </p>
          </div>
          <div class="feat-card reveal">
            <div class="feat-icon">✨</div>
            <h3 class="feat-title">LLM Brain Interpreter</h3>
            <p class="feat-desc">
              A purpose-built large language model converts raw neural patterns
              into actionable insights, natural-language descriptions, and
              context-aware responses you can actually use.
            </p>
          </div>
          <div class="feat-card reveal">
            <div class="feat-icon">🔒</div>
            <h3 class="feat-title">On-Device Privacy</h3>
            <p class="feat-desc">
              All neural inference runs on-device. Your brain data never
              leaves NeuraWave without your explicit consent. No cloud
              required for core functionality. Your mind is your own.
            </p>
          </div>
          <div class="feat-card reveal">
            <div class="feat-icon">⚡</div>
            <h3 class="feat-title">Adaptive Personalization</h3>
            <p class="feat-desc">
              NeuraWave continuously fine-tunes its model to your unique
              neural signature, improving accuracy with every session until
              it knows your patterns better than you do.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── How it works ── -->
    <section class="how" id="how">
      <div class="section-inner">
        <p class="label label-blue reveal">How it works</p>
        <h2 class="section-heading reveal">Simple to wear.<br>Remarkable inside.</h2>
        <div class="steps">
          <div class="step reveal">
            <div class="step-num">1</div>
            <h3 class="step-title">Wear NeuraWave</h3>
            <p class="step-desc">
              Place the lightweight headband. 256 dry electrodes make
              contact in seconds — no gel, no clinic, no setup time.
            </p>
          </div>
          <div class="step reveal">
            <div class="step-num">2</div>
            <h3 class="step-title">Signals Captured</h3>
            <p class="step-desc">
              Medical-grade sensors record your brain's electrical
              activity across all regions simultaneously at ultra-high
              resolution and dynamic range.
            </p>
          </div>
          <div class="step reveal">
            <div class="step-num">3</div>
            <h3 class="step-title">AI Interprets & Acts</h3>
            <p class="step-desc">
              The on-device LLM translates neural patterns into insights,
              commands, and natural language — delivered through the
              companion app in real time.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── AI Technology ── -->
    <section class="ai-section" id="technology">
      <p class="label label-purple reveal">The engine inside</p>
      <h2 class="ai-title reveal">
        A language model<br>built for the brain.
      </h2>
      <p class="ai-body reveal">
        NeuraWave's on-device AI was trained on the largest annotated EEG
        dataset ever assembled — 10 million hours across 50,000 participants.
        It speaks your brain's language fluently.
      </p>
      <div class="ai-chips reveal">
        <span class="ai-chip">Neural Language Model</span>
        <span class="ai-chip">On-Device Inference</span>
        <span class="ai-chip">EEG Signal Processing</span>
        <span class="ai-chip">Emotion Recognition</span>
        <span class="ai-chip">Intent Detection</span>
        <span class="ai-chip">Focus State Measurement</span>
        <span class="ai-chip">Sleep Stage Analysis</span>
        <span class="ai-chip">Stress &amp; Anxiety Detection</span>
        <span class="ai-chip">Adaptive Personalization</span>
        <span class="ai-chip">Natural Language Output</span>
        <span class="ai-chip">Motor Imagery Decoding</span>
        <span class="ai-chip">Privacy-First Architecture</span>
      </div>
    </section>

    <!-- ── Use Cases ── -->
    <section class="use-cases" id="use-cases">
      <div class="section-inner">
        <div class="use-cases-header">
          <p class="label label-blue reveal">Applications</p>
          <h2 class="section-heading reveal">Your brain.<br>Endless possibilities.</h2>
        </div>
        <div class="use-cases-grid">
          <div class="uc-card reveal">
            <span class="uc-emoji">🎯</span>
            <h3 class="uc-title">Peak Focus</h3>
            <p class="uc-desc">
              NeuraWave detects concentration dips and activates
              personalized audio or lighting cues to restore deep
              work states before you even notice you've drifted.
            </p>
          </div>
          <div class="uc-card reveal">
            <span class="uc-emoji">🧘</span>
            <h3 class="uc-title">Mindful Wellbeing</h3>
            <p class="uc-desc">
              Real-time stress and anxiety detection with guided
              breathing prompts that adapt to your neural state
              moment by moment.
            </p>
          </div>
          <div class="uc-card reveal">
            <span class="uc-emoji">🏥</span>
            <h3 class="uc-title">Health Monitoring</h3>
            <p class="uc-desc">
              Track biomarkers linked to fatigue and cognitive
              change, with clinical-grade reports your healthcare
              provider can actually use.
            </p>
          </div>
          <div class="uc-card reveal">
            <span class="uc-emoji">🎨</span>
            <h3 class="uc-title">Creative Flow</h3>
            <p class="uc-desc">
              Enter flow states on demand. NeuraWave recognizes the
              neural signature of creative inspiration and helps
              you reach it faster — and stay longer.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Order ── -->
    <section class="order" id="order">
      <div class="section-inner">
        <h2 class="order-name reveal">NeuraWave</h2>
        <p class="order-price reveal">From $599</p>
        <p class="order-note reveal">
          Free shipping · 30-day returns · Clinical certification in 42 countries
        </p>
        <div class="ctas reveal" style="justify-content:center">
          <a href="#" class="btn btn-primary">Order now</a>
          <a href="#technology" class="btn btn-outline-blue">Learn more</a>
        </div>
      </div>
    </section>

    <!-- ── Footer ── -->
    <footer>
      <div class="footer-inner">
        <p class="footer-copy">Copyright © 2026 NeuraWave, Inc. All rights reserved.</p>
        <nav class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Legal</a>
          <a href="#">Accessibility</a>
          <a href="#">Contact</a>
          <a href="#">Site Map</a>
        </nav>
      </div>
    </footer>
  `
}

// ── Nav dark mode: switch when hero scrolls out of view ─────────────────────
function initNav() {
  const nav  = document.getElementById('nav')
  const hero = document.querySelector('.hero')

  new IntersectionObserver(
    ([entry]) => nav.classList.toggle('dark', !entry.isIntersecting),
    { threshold: 0.05 }
  ).observe(hero)
}

// ── Scroll-reveal ────────────────────────────────────────────────────────────
function initReveal() {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        io.unobserve(e.target)
      }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('.reveal').forEach(el => io.observe(el))
}

// ── Boot ─────────────────────────────────────────────────────────────────────
document.getElementById('app').innerHTML = template()
initNav()
initReveal()
