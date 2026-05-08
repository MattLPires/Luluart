import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import NavbarPages from '../components/NavbarPages.jsx'
import Footer from '../components/Footer.jsx'
import { projetos } from '../data/projetos.js'
import useReveal from '../hooks/useReveal.js'
import { ArrowIcon } from '../icons/SvgIcons'
import './ProjetoDetalhe.css'

function ProjetoDetalhe() {
  const { slug } = useParams()
  const projeto = projetos.find(p => p.slug === slug)
  const [ref, isVisible] = useReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!projeto) {
    return (
      <>
        <NavbarPages ativa="Projetos Acadêmicos" />
        <div className="projeto-not-found container">
          <h1>Projeto não encontrado</h1>
          <Link to="/projetos-academicos">Voltar aos projetos</Link>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <NavbarPages ativa="Projetos Acadêmicos" />
      <section className={`projeto-detalhe projeto-detalhe--${projeto.slug}`} ref={ref}>
        {projeto.heroImage && (
          <div className="projeto-hero">
            <div className="projeto-hero-bg" />
            <div className="projeto-hero-content container">
              <div className={`projeto-hero-img-wrap reveal ${isVisible ? 'visible' : ''}`}>
                <img src={projeto.heroImage} alt={projeto.titulo} className="projeto-hero-img" />
              </div>
              <div className={`projeto-hero-text reveal ${isVisible ? 'visible' : ''}`}>
                <h1 className="projeto-hero-title">{projeto.titulo}</h1>
                <p className="projeto-hero-desc">{projeto.descricaoCurta}</p>
              </div>
            </div>
          </div>
        )}

        {projeto.sobreProjeto.length > 0 && (
          <div className="projeto-sobre container">
            <h2 className={`projeto-sobre-title reveal ${isVisible ? 'visible' : ''}`}>Sobre o projeto</h2>
            {projeto.sobreProjeto.map((paragrafo, i) => (
              <p key={i} className={`projeto-sobre-text reveal ${isVisible ? 'visible' : ''}`}>{paragrafo}</p>
            ))}
          </div>
        )}

        {projeto.galeria.length > 0 && (
          <div className="projeto-galeria container">
            <h2 className={`projeto-galeria-title reveal ${isVisible ? 'visible' : ''}`}>Peças visuais</h2>
            <div className="projeto-galeria-bento">
              <div className={`projeto-galeria-destaque reveal ${isVisible ? 'visible' : ''}`}>
                <img src={projeto.galeria[0]} alt={`${projeto.titulo} - peça principal`} />
              </div>
              <div className="projeto-galeria-grid">
                {projeto.galeria.slice(1).map((img, i) => (
                  <div key={i} className={`projeto-galeria-item reveal ${isVisible ? 'visible' : ''}`}>
                    <img src={img} alt={`${projeto.titulo} - peça ${i + 2}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="projeto-voltar container">
          <Link to="/projetos-academicos" className="projeto-voltar-btn">
            <ArrowIcon style={{ transform: 'rotate(180deg)' }} /> Voltar aos projetos
          </Link>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default ProjetoDetalhe
