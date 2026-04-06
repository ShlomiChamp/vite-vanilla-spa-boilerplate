import './style.css'

// ── EEG path generator ──────────────────────────────────────────────────────
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

// ── Build hero wave SVG ──────────────────────────────────────────────────────
function heroWaveSVG() {
  const W = 960
  const channels = [
    { y: 50,  amp: 18, freq: 0.09,  phase: 0.0, color: '#8B5CF6', opacity: 0.55, sw: 1.5 },
    { y: 90,  amp: 14, freq: 0.13,  phase: 1.8, color: '#A78BFA', opacity: 0.38, sw: 1.0 },
    { y: 130, amp: 22, freq: 0.07,  phase: 3.2, color: '#22D3EE', opacity: 0.28, sw: 1.0 },
    { y: 160, amp: 12, freq: 0.17,  phase: 0.9, color: '#8B5CF6', opacity: 0.20, sw: 0.8 },
  ]

  const paths = channels.map(ch => {
    const left  = eegPath(ch.y, W, ch.amp, ch.freq, ch.phase)
    const right = eegPath(ch.y, W, ch.amp, ch.freq, ch.phase)
    return `
      <path d="${left}"  stroke="${ch.color}" stroke-width="${ch.sw}" fill="none" opacity="${ch.opacity}"/>
      <path d="${right}" stroke="${ch.color}" stroke-width="${ch.sw}" fill="none" opacity="${ch.opacity}" transform="translate(${W},0)"/>`
  }).join('')

  return `<svg class="hero-wave-svg" viewBox="0 0 ${W * 2} 180" preserveAspectRatio="none"
           xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${paths}</svg>`
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
  const colors = ['#A78BFA', '#8B5CF6', '#C4B5FD', '#22D3EE', '#A78BFA']

  const rows = channels.map((ch, i) => `
    <text class="eeg-channel-label" x="0" y="${ch.y + 4}">${labels[i]}</text>
    <path d="${eegPath(ch.y, W - 36, ch.amp, ch.freq, ch.phase)}"
          stroke="${colors[i]}" stroke-width="1.5" fill="none"
          transform="translate(36,0)"
          style="opacity:0;animation:eeg-fade 0.8s ease ${0.1 + i * 0.15}s forwards"/>
  `).join('')

  return `
    <svg viewBox="0 0 ${W} 176" xmlns="http://www.w3.org/2000/svg"
         style="width:100%;overflow:visible" role="img"
         aria-label="Live EEG brain activity display showing 5 channels: Fp1, C3, Pz, O1, T4">${rows}</svg>`
}

// ── Page template ────────────────────────────────────────────────────────────
function template() {
  return /* html */`
    <!-- ── Navigation ── -->
    <nav id="nav" aria-label="Primary navigation">
      <div class="nav-inner">
        <a href="#top" class="nav-logo" aria-label="NeuraWave — home">NeuraWave</a>
        <ul class="nav-links" role="list">
          <li><a href="#features">Features</a></li>
          <li><a href="#science">Science</a></li>
          <li><a href="#technology">Technology</a></li>
          <li><a href="#use-cases">Use Cases</a></li>
        </ul>
        <a href="#order" class="nav-cta" aria-label="Order NeuraWave">Order</a>
      </div>
    </nav>

    <!-- ── Hero ── -->
    <section class="hero" id="top">
      <div class="hero-video-bg">
        <iframe
          src="https://www.youtube.com/embed/--iN63lgsc4?autoplay=1&mute=1&loop=1&playlist=--iN63lgsc4&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1"
          allow="autoplay; encrypted-media"
          allowfullscreen
          title="Hero background video"
        ></iframe>
      </div>
      <div class="hero-video-overlay"></div>
      <canvas id="neuron-canvas" aria-hidden="true"></canvas>
      <p class="hero-eyebrow">Introducing</p>
      <h1 class="hero-title">NeuraWave</h1>
      <p class="hero-tagline">Your mind, decoded.</p>
      <p class="hero-desc">
        The world's first AI-powered brain interface that understands,
        interprets, and responds to your neural activity — in real time.
      </p>
      <div class="hero-ctas ctas">
        <a href="#technology" class="btn btn-purple" aria-label="Learn more about NeuraWave technology">Learn more</a>
        <a href="#order"      class="btn btn-outline-dark" aria-label="Order NeuraWave device">Order now</a>
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
        <!-- Bento grid: [wide 2col][1col] / [1col][wide 2col] -->
        <div class="features-bento">
          <div class="feat-card feat-card--wide reveal" role="group" aria-label="Feature: Real-Time Neural Decoding">
            <div class="feat-icon" aria-hidden="true">🧠</div>
            <h3 class="feat-title">Real-Time Neural Decoding</h3>
            <p class="feat-desc">
              NeuraWave processes all 256 channels simultaneously at 2 kHz,
              decoding intent, emotion, and cognitive states with sub-5ms
              latency — faster than conscious thought.
            </p>
          </div>
          <div class="feat-card reveal" role="group" aria-label="Feature: LLM Brain Interpreter">
            <div class="feat-icon" aria-hidden="true">✨</div>
            <h3 class="feat-title">LLM Brain Interpreter</h3>
            <p class="feat-desc">
              A purpose-built large language model converts raw neural patterns
              into actionable insights, natural-language descriptions, and
              context-aware responses you can actually use.
            </p>
          </div>
          <div class="feat-card reveal" role="group" aria-label="Feature: On-Device Privacy">
            <div class="feat-icon" aria-hidden="true">🔒</div>
            <h3 class="feat-title">On-Device Privacy</h3>
            <p class="feat-desc">
              All neural inference runs on-device. Your brain data never
              leaves NeuraWave without your explicit consent. No cloud
              required for core functionality. Your mind is your own.
            </p>
          </div>
          <div class="feat-card feat-card--wide reveal" role="group" aria-label="Feature: Adaptive Personalization">
            <div class="feat-icon" aria-hidden="true">⚡</div>
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
          <div class="uc-card reveal" role="group" aria-label="Use case: Peak Focus">
            <span class="uc-emoji" aria-hidden="true">🎯</span>
            <h3 class="uc-title">Peak Focus</h3>
            <p class="uc-desc">
              NeuraWave detects concentration dips and activates
              personalized audio or lighting cues to restore deep
              work states before you even notice you've drifted.
            </p>
          </div>
          <div class="uc-card reveal" role="group" aria-label="Use case: Mindful Wellbeing">
            <span class="uc-emoji" aria-hidden="true">🧘</span>
            <h3 class="uc-title">Mindful Wellbeing</h3>
            <p class="uc-desc">
              Real-time stress and anxiety detection with guided
              breathing prompts that adapt to your neural state
              moment by moment.
            </p>
          </div>
          <div class="uc-card reveal" role="group" aria-label="Use case: Health Monitoring">
            <span class="uc-emoji" aria-hidden="true">🏥</span>
            <h3 class="uc-title">Health Monitoring</h3>
            <p class="uc-desc">
              Track biomarkers linked to fatigue and cognitive
              change, with clinical-grade reports your healthcare
              provider can actually use.
            </p>
          </div>
          <div class="uc-card reveal" role="group" aria-label="Use case: Creative Flow">
            <span class="uc-emoji" aria-hidden="true">🎨</span>
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

    <!-- ── Fat Footer ── -->
    <footer role="contentinfo">
      <div class="footer-inner">
        <div class="footer-brand">
          <a href="#top" class="footer-logo" aria-label="NeuraWave — back to top">NeuraWave</a>
          <p class="footer-tagline">The world's first AI-powered brain interface. Your mind, decoded.</p>
        </div>
        <nav class="footer-col" aria-label="Product navigation">
          <h4 class="footer-col-title">Product</h4>
          <ul role="list">
            <li><a href="#features">Features</a></li>
            <li><a href="#science">Science</a></li>
            <li><a href="#technology">Technology</a></li>
            <li><a href="#use-cases">Use Cases</a></li>
            <li><a href="#order">Pricing</a></li>
          </ul>
        </nav>
        <nav class="footer-col" aria-label="Company navigation">
          <h4 class="footer-col-title">Company</h4>
          <ul role="list">
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </nav>
        <nav class="footer-col" aria-label="Support navigation">
          <h4 class="footer-col-title">Support</h4>
          <ul role="list">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Status</a></li>
            <li><a href="#">Community</a></li>
          </ul>
        </nav>
        <nav class="footer-col" aria-label="Legal navigation">
          <h4 class="footer-col-title">Legal</h4>
          <ul role="list">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Accessibility</a></li>
            <li><a href="#">Compliance</a></li>
            <li><a href="#">Security</a></li>
          </ul>
        </nav>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">
          Copyright © 2026 NeuraWave, Inc. All rights reserved.
          NeuraWave is committed to inclusive design and WCAG 2.1 AA accessibility standards.
          Certified for clinical use in 42 countries.
        </p>
      </div>
    </footer>
  `
}

// ── Neuron canvas animation ──────────────────────────────────────────────────
// Animated neural network: floating nodes, connecting lines, traveling pulses
function initNeuronCanvas() {
  const canvas = document.getElementById('neuron-canvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  function resize() {
    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize, { passive: true })

  const count = Math.min(65, Math.floor((canvas.width * canvas.height) / 13000))
  const CONN  = 155  // max connection distance

  const nodes = Array.from({ length: count }, () => ({
    x:     Math.random() * canvas.width,
    y:     Math.random() * canvas.height,
    vx:    (Math.random() - 0.5) * 0.22,
    vy:    (Math.random() - 0.5) * 0.22,
    r:     1.4 + Math.random() * 2,
    phase: Math.random() * Math.PI * 2,
  }))

  const pulses = []

  function spawnPulse() {
    const a = Math.floor(Math.random() * nodes.length)
    let best = -1, bestD = Infinity
    nodes.forEach((n, i) => {
      if (i === a) return
      const d = Math.hypot(n.x - nodes[a].x, n.y - nodes[a].y)
      if (d < CONN && d < bestD) { bestD = d; best = i }
    })
    if (best >= 0) {
      pulses.push({ from: a, to: best, t: 0, speed: 0.011 + Math.random() * 0.009 })
    }
  }

  let tick = 0

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    tick++

    // Move nodes
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy
      n.phase += 0.007
      if (n.x < 0 || n.x > canvas.width)  n.vx *= -1
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1
    })

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x
        const dy = nodes[j].y - nodes[i].y
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < CONN) {
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - d / CONN) * 0.14})`
          ctx.lineWidth = 0.65
          ctx.stroke()
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      const alpha = 0.30 + 0.15 * Math.sin(n.phase)
      const r     = n.r  * (0.88 + 0.12 * Math.sin(n.phase * 1.6))
      ctx.beginPath()
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`
      ctx.fill()
    })

    // Update & draw traveling pulses
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i]
      p.t += p.speed
      if (p.t >= 1) { pulses.splice(i, 1); continue }

      const fn = nodes[p.from], tn = nodes[p.to]
      const x  = fn.x + (tn.x - fn.x) * p.t
      const y  = fn.y + (tn.y - fn.y) * p.t
      const a  = Math.sin(p.t * Math.PI)

      // Soft violet glow ring
      const grd = ctx.createRadialGradient(x, y, 0, x, y, 7)
      grd.addColorStop(0, `rgba(167, 139, 250, ${a * 0.75})`)
      grd.addColorStop(1, `rgba(167, 139, 250, 0)`)
      ctx.beginPath()
      ctx.arc(x, y, 7, 0, Math.PI * 2)
      ctx.fillStyle = grd
      ctx.fill()

      // Electric cyan bright core
      ctx.beginPath()
      ctx.arc(x, y, 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(34, 211, 238, ${a * 0.9})`
      ctx.fill()
    }

    // Spawn new pulses periodically
    if (tick % 42 === 0) spawnPulse()

    requestAnimationFrame(draw)
  }

  draw()
  // Initial burst so something is moving right away
  for (let i = 0; i < 6; i++) setTimeout(spawnPulse, i * 280)
}

// ── Nav: go dark only when over dark sections ────────────────────────────────
function initNav() {
  const nav = document.getElementById('nav')
  const darkSections = document.querySelectorAll('.spotlight, .ai-section')

  darkSections.forEach(section => {
    new IntersectionObserver(([entry]) => {
      section.classList.toggle('is-dark-visible', entry.isIntersecting)
      nav.classList.toggle('dark', [...darkSections].some(s => s.classList.contains('is-dark-visible')))
    }, { threshold: 0.05 }).observe(section)
  })
}

// ── Parallax — hero elements drift at different rates on scroll ──────────────
function initParallax() {
  let ticking = false
  const heroEl = document.querySelector('.hero')

  function update() {
    const scrollY = window.scrollY
    if (!heroEl || scrollY > heroEl.offsetHeight * 1.1) { ticking = false; return }

    const title   = document.querySelector('.hero-title')
    const tagline = document.querySelector('.hero-tagline')
    const desc    = document.querySelector('.hero-desc')
    const ctas    = document.querySelector('.hero-ctas')
    const wave    = document.querySelector('.hero-wave')

    if (title)   title.style.transform   = `translateY(${scrollY * 0.10}px)`
    if (tagline) tagline.style.transform = `translateY(${scrollY * 0.07}px)`
    if (desc)    desc.style.transform    = `translateY(${scrollY * 0.05}px)`
    if (ctas)    ctas.style.transform    = `translateY(${scrollY * 0.04}px)`
    if (wave)    wave.style.transform    = `translateY(${scrollY * -0.13}px)`

    ticking = false
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true }
  }, { passive: true })
}

// ── Word reveal — wrap text words in animated spans ──────────────────────────
// Only applied to section-headings (plain text, no gradient children)
function initWordReveal() {
  document.querySelectorAll('h2.section-heading').forEach(el => {
    Array.from(el.childNodes).forEach(child => {
      if (child.nodeType !== Node.TEXT_NODE) return
      const text = child.textContent
      if (!text.trim()) return
      const frag = document.createDocumentFragment()
      text.split(/(\s+)/).forEach(part => {
        if (!part.trim()) {
          frag.appendChild(document.createTextNode(part))
        } else {
          const span = document.createElement('span')
          span.className = 'word-reveal'
          span.textContent = part
          frag.appendChild(span)
        }
      })
      el.replaceChild(frag, child)
    })
  })
}

// ── Scroll-reveal ────────────────────────────────────────────────────────────
function initReveal() {
  initWordReveal()

  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        // Stagger each word-reveal span within the element
        e.target.querySelectorAll('.word-reveal').forEach((w, i) => {
          w.style.transitionDelay = `${i * 0.055}s`
        })
        io.unobserve(e.target)
      }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('.reveal').forEach(el => io.observe(el))
}

// ── Hero mouse parallax — neuron canvas drifts with cursor ───────────────────
function initHeroMouseParallax() {
  const hero   = document.querySelector('.hero')
  const canvas = document.getElementById('neuron-canvas')
  if (!hero || !canvas) return

  let ticking = false

  hero.addEventListener('mousemove', e => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect()
      const mx = (e.clientX - rect.left) / rect.width  - 0.5
      const my = (e.clientY - rect.top)  / rect.height - 0.5
      canvas.style.transform  = `translate(${mx * -18}px, ${my * -12}px)`
      canvas.style.transition = 'transform 0.15s ease'
      ticking = false
    })
  }, { passive: true })

  hero.addEventListener('mouseleave', () => {
    canvas.style.transform  = 'translate(0,0)'
    canvas.style.transition = 'transform 1.2s ease'
  }, { passive: true })
}

// ── Boot ─────────────────────────────────────────────────────────────────────
document.getElementById('app').innerHTML = template()
initNav()
initReveal()
initNeuronCanvas()
initParallax()
initHeroMouseParallax()
// Trigger hero entrance animations after a short paint delay
setTimeout(() => document.body.classList.add('loaded'), 60)
