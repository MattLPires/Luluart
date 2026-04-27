import { useRef, useState, useEffect } from 'react'
import './SkillCard.css'

function SkillCard({ nome, nivel, porcentagem, icone, iconClass }) {
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="skill-card" ref={cardRef}>
      <div className={`skill-icon ${iconClass || ''}`}>
        {icone}
      </div>
      <h4 className="skill-name">{nome}</h4>
      <span className="skill-level">{nivel}</span>
      <div className="skill-bar">
        <div
          className="skill-bar-fill"
          style={{ width: isVisible ? `${porcentagem}%` : '0%' }}
        />
      </div>
    </div>
  )
}

export default SkillCard
