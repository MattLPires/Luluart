import './Hero.css'

function Sparkle({ className }) {
  return (
    <svg className={`sparkle ${className}`} viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
      <path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z" />
    </svg>
  )
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-bg">
        <div className="hero-gradient hero-gradient-1" />
        <div className="hero-gradient hero-gradient-2" />
        <div className="hero-gradient hero-gradient-3" />
      </div>
      <Sparkle className="sparkle-1" />
      <Sparkle className="sparkle-2" />
      <Sparkle className="sparkle-3" />
      <Sparkle className="sparkle-4" />
      <Sparkle className="sparkle-5" />
      <div className="hero-content">
        <img src="/logo.png" alt="LuaLu Art" className="hero-logo-img" />
        <div className="hero-subtitle-row">
          <span className="hero-subtitle">Arte &amp; Design</span>
          <span className="hero-badge">Arte &amp; Design</span>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-line" />
      </div>
    </section>
  )
}

export default Hero
