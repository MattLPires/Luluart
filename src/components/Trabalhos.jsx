import useReveal from '../hooks/useReveal'
import { StarIcon } from '../icons/SvgIcons'
import TrabalhoCard from './TrabalhoCard'
import './Trabalhos.css'

const trabalhos = [
  { titulo: "Projetos Acadêmicos", imagem: "/projetos-acad.jpeg", linkTexto: "Ver projetos" },
  { titulo: "Materiais", imagem: "/materiais.jpeg", linkTexto: "Ver materiais" },
  { titulo: "Ilustrações", imagem: "/ilustracoes.jpeg", linkTexto: "Ver ilustrações" }
]

function Trabalhos() {
  const [ref, isVisible] = useReveal()

  return (
    <section className="trabalhos" id="trabalhos" ref={ref}>
      <div className="container">
        <div className={`reveal ${isVisible ? 'visible' : ''}`}>
          <span className="section-label"><StarIcon /> Portfólio</span>
          <h2 className="section-title">Trabalhos</h2>
        </div>
        <div className="trabalhos-grid">
          {trabalhos.map((trabalho, i) => (
            <TrabalhoCard
              key={i}
              titulo={trabalho.titulo}
              imagem={trabalho.imagem}
              linkTexto={trabalho.linkTexto}
              href="#"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Trabalhos
