import { useEffect, useState } from 'react'
import NavbarPages from '../components/NavbarPages.jsx'
import Footer from '../components/Footer.jsx'
import { StarIcon } from '../icons/SvgIcons'
import './Ilustracoes.css'

const ilustracoes = Array.from({ length: 16 }, (_, i) => ({
  src: `/ilustracoes/${String(i + 1).padStart(2, '0')}.jpg`
}))

function Ilustracoes() {
  const [visivel, setVisivel] = useState(false)
  const [imagensVisiveis, setImagensVisiveis] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    setTimeout(() => setVisivel(true), 100)
  }, [])

  useEffect(() => {
    if (visivel) {
      ilustracoes.forEach((_, i) => {
        setTimeout(() => {
          setImagensVisiveis(prev => [...prev, i])
        }, i * 80)
      })
    }
  }, [visivel])

  return (
    <>
      <NavbarPages ativa="Ilustrações" />
      <section className="ilustracoes-page">
        <div className={`ilustracoes-hero ${visivel ? 'ilustracoes-hero--visible' : ''}`}>
          <div className="ilustracoes-hero-bg">
            <div className="ilustracoes-hero-orb ilustracoes-hero-orb--1" />
            <div className="ilustracoes-hero-orb ilustracoes-hero-orb--2" />
            <div className="ilustracoes-hero-orb ilustracoes-hero-orb--3" />
          </div>
          <div className="container ilustracoes-hero-content">
            <span className="section-label"><StarIcon /> Galeria</span>
            <h1 className="ilustracoes-hero-title">Conheça minha arte</h1>
            <p className="ilustracoes-hero-desc">E alguns projetos pessoais</p>
          </div>
        </div>

        <div className="container">
          <div className="ilustracoes-masonry">
            {ilustracoes.map((img, i) => (
              <div
                key={img.src}
                className={`ilustracoes-card ${imagensVisiveis.includes(i) ? 'ilustracoes-card--visible' : ''}`}
              >
                <div className="ilustracoes-card-inner">
                  <img src={img.src} alt={`Ilustração ${i + 1}`} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Ilustracoes
