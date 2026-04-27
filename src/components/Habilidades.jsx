import useReveal from '../hooks/useReveal'
import { StarIcon } from '../icons/SvgIcons'
import SkillCard from './SkillCard'
import './Habilidades.css'

const habilidades = [
  { nome: "Canva", nivel: "Avançado", porcentagem: 95, iconClass: "icon-canva" },
  { nome: "Krita", nivel: "Avançado", porcentagem: 90, iconClass: "icon-krita" },
  { nome: "Photoshop", nivel: "Intermediário", porcentagem: 65, iconClass: "icon-ps" },
  { nome: "Illustrator", nivel: "Intermediário", porcentagem: 65, iconClass: "icon-ai" },
  { nome: "Figma", nivel: "Básico", porcentagem: 35, iconClass: "icon-figma" }
]

const skillIcons = {
  Canva: <img src="/canva.svg" alt="Canva" className="skill-icon-img" />,
  Krita: <img src="/krita.svg" alt="Krita" className="skill-icon-img" />,
  Photoshop: <img src="/ps.png" alt="Photoshop" className="skill-icon-img" />,
  Illustrator: <img src="/ai.png" alt="Illustrator" className="skill-icon-img" />,
  Figma: <img src="/figma.png" alt="Figma" className="skill-icon-img" />
}

function Habilidades() {
  const [ref, isVisible] = useReveal()

  return (
    <section className="habilidades" id="habilidades" ref={ref}>
      <div className="container">
        <div className={`reveal ${isVisible ? 'visible' : ''}`}>
          <span className="section-label"><StarIcon /> Ferramentas</span>
          <h2 className="section-title">Habilidades</h2>
        </div>
        <div className="skills-grid">
          {habilidades.map((skill, i) => (
            <SkillCard
              key={i}
              nome={skill.nome}
              nivel={skill.nivel}
              porcentagem={skill.porcentagem}
              icone={skillIcons[skill.nome]}
              iconClass={skill.iconClass}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Habilidades
