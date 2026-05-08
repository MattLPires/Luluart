import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import NavbarPages from '../components/NavbarPages.jsx'
import Footer from '../components/Footer.jsx'
import { StarIcon } from '../icons/SvgIcons'
import { projetos } from '../data/projetos.js'
import useReveal from '../hooks/useReveal.js'
import './ProjetosAcademicos.css'

function ProjetosAcademicos() {
  const [ref, isVisible] = useReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <NavbarPages ativa="Projetos Acadêmicos" />
      <section className="projetos-page">
        <div className="container" ref={ref}>
          <div className={`reveal ${isVisible ? 'visible' : ''}`}>
            <span className="section-label"><StarIcon /> Portfólio</span>
            <h1 className="projetos-page-title">Projetos Acadêmicos</h1>
            <p className="projetos-page-desc">
              Durante o Ensino Médio Técnico em Administração, tive a oportunidade de realizar
              alguns projetos acadêmicos em que desenvolvi a criação de peças visuais e aprimorei
              minhas habilidades.
            </p>
          </div>
          <h2 className={`projetos-page-subtitle reveal ${isVisible ? 'visible' : ''}`}>
            Conheça alguns deles
          </h2>
          <div className="projetos-grid">
            {projetos.map((projeto, i) => (
              <Link
                to={`/projetos-academicos/${projeto.slug}`}
                className={`projeto-card reveal ${isVisible ? 'visible' : ''}`}
                key={projeto.slug}
              >
                <div className="projeto-card-img-wrap">
                  <img src={projeto.coverCard} alt={projeto.titulo} className="projeto-card-img" />
                </div>
                <div className="projeto-card-info">
                  <h3 className="projeto-card-title">{projeto.titulo}</h3>
                  <span className="projeto-card-sub">{projeto.subtitulo}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default ProjetosAcademicos
