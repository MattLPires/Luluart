import { useEffect, useState, useRef } from 'react'
import NavbarPages from '../components/NavbarPages.jsx'
import Footer from '../components/Footer.jsx'
import { StarIcon } from '../icons/SvgIcons'
import './Materiais.css'

const todasImagens = [
  { src: "/materiais/stories/1.jpg", categoria: "Stories" },
  { src: "/materiais/stories/2.jpg", categoria: "Stories" },
  { src: "/materiais/stories/3.jpg", categoria: "Stories" },
  { src: "/materiais/posters/kamissama-kiss.jpg", categoria: "Posters" },
  { src: "/materiais/cartoes/roxofrente.jpg", categoria: "Cartões" },
  { src: "/materiais/cartoes/roxoverso.jpg", categoria: "Cartões" },
  { src: "/materiais/cartoes/vermelhofrente.jpg", categoria: "Cartões" },
  { src: "/materiais/cartoes/vermelhoverso.jpg", categoria: "Cartões" },
  { src: "/materiais/logos/iconblack.jpg", categoria: "Logos" },
  { src: "/materiais/logos/iconpurple.jpg", categoria: "Logos" },
  { src: "/materiais/logos/iconred.jpg", categoria: "Logos" }
]

const categorias = ["Todos", "Stories", "Posters", "Cartões", "Logos"]

function Materiais() {
  const [filtro, setFiltro] = useState("Todos")
  const [visivel, setVisivel] = useState(false)
  const [imagensVisiveis, setImagensVisiveis] = useState([])
  const heroRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setTimeout(() => setVisivel(true), 100)
  }, [])

  useEffect(() => {
    const filtradas = filtro === "Todos"
      ? todasImagens
      : todasImagens.filter(img => img.categoria === filtro)

    setImagensVisiveis([])
    filtradas.forEach((_, i) => {
      setTimeout(() => {
        setImagensVisiveis(prev => [...prev, i])
      }, i * 80)
    })
  }, [filtro])

  const imagensFiltradas = filtro === "Todos"
    ? todasImagens
    : todasImagens.filter(img => img.categoria === filtro)

  return (
    <>
      <NavbarPages ativa="Materiais" />
      <section className="materiais-page">
        <div className={`materiais-hero ${visivel ? 'materiais-hero--visible' : ''}`} ref={heroRef}>
          <div className="materiais-hero-bg">
            <div className="materiais-hero-orb materiais-hero-orb--1" />
            <div className="materiais-hero-orb materiais-hero-orb--2" />
            <div className="materiais-hero-orb materiais-hero-orb--3" />
          </div>
          <div className="container materiais-hero-content">
            <span className="section-label"><StarIcon /> Portfólio</span>
            <h1 className="materiais-hero-title">Conheça meu trabalho</h1>
            <p className="materiais-hero-desc">E alguns projetos pessoais</p>
          </div>
        </div>

        <div className="container">
          <div className={`materiais-filtros ${visivel ? 'materiais-filtros--visible' : ''}`}>
            {categorias.map(cat => (
              <button
                key={cat}
                className={`materiais-filtro-btn ${filtro === cat ? 'materiais-filtro-btn--ativo' : ''}`}
                onClick={() => setFiltro(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="materiais-masonry" ref={gridRef}>
            {imagensFiltradas.map((img, i) => (
              <div
                key={img.src}
                className={`materiais-card ${imagensVisiveis.includes(i) ? 'materiais-card--visible' : ''}`}
              >
                <div className="materiais-card-inner">
                  <img src={img.src} alt={`${img.categoria} - ${i + 1}`} loading="lazy" />
                  <div className="materiais-card-overlay">
                    <span className="materiais-card-tag">{img.categoria}</span>
                  </div>
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

export default Materiais
