import useReveal from '../hooks/useReveal'
import { StarIcon, BookIcon, GradCapIcon, ArrowIcon } from '../icons/SvgIcons'
import FormacaoCard from './FormacaoCard'
import './SobreMim.css'

const formacaoAcademica = [
  { titulo: "Design de Mídias Digitais", instituicao: "Fatec Barueri", anos: "2025 – 2028" },
  { titulo: "Ensino médio integrado ao Técnico de Administração", instituicao: "Etec de Cotia", anos: "2022 – 2024" }
]

const cursosComplementares = [
  { titulo: "Empreende Sim!", instituicao: "FEA – USP · Empreendedorismo e inovação social", anos: ["1ª participação – 2023", "2ª participação – 2024"] }
]

function SobreMim() {
  const [ref, isVisible] = useReveal()

  return (
    <section className="sobre" id="sobre" ref={ref}>
      <div className="container">
        <div className={`reveal ${isVisible ? 'visible' : ''}`}>
          <span className="section-label"><StarIcon /> Conheça</span>
          <h2 className="section-title">Sobre mim</h2>
        </div>
        <div className="sobre-grid">
          <div className={`sobre-text reveal ${isVisible ? 'visible' : ''}`}>
            <p>
              Olá! Sou a Luana, estudante de Design de Mídias Digitais na Fatec Barueri.
              Desde pequena, sempre fui apaixonada por arte e criatividade, e encontrei no
              design digital o caminho perfeito para transformar ideias em experiências visuais.
            </p>
            <p>
              Minha jornada acadêmica começou no ensino técnico em Administração na Etec de Cotia,
              onde desenvolvi habilidades de organização e gestão que hoje complementam meu olhar
              criativo. Atualmente, exploro ferramentas como Canva, Krita e Photoshop para criar
              projetos que unem estética e funcionalidade.
            </p>
            <p>
              Acredito que o design tem o poder de contar histórias e conectar pessoas. Este
              portfólio reúne meus trabalhos e projetos acadêmicos, refletindo minha evolução
              como designer e minha paixão por criar coisas bonitas e significativas.
            </p>
            <a href="#trabalhos" className="sobre-cta">
              Ver meus trabalhos <ArrowIcon />
            </a>
          </div>
          <div className={`sobre-formacao reveal ${isVisible ? 'visible' : ''}`}>
            <h3 className="formacao-title"><BookIcon /> Formação Acadêmica</h3>
            {formacaoAcademica.map((item, i) => (
              <FormacaoCard key={i} titulo={item.titulo} instituicao={item.instituicao} anos={item.anos} />
            ))}
            <h3 className="formacao-title"><GradCapIcon /> Cursos Complementares</h3>
            {cursosComplementares.map((item, i) => (
              <FormacaoCard key={i} titulo={item.titulo} instituicao={item.instituicao} anos={item.anos} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SobreMim
