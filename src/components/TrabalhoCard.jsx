import './TrabalhoCard.css'

function TrabalhoCard({ titulo, imagem, linkTexto, href }) {
  return (
    <div className="trabalho-card">
      <div className="trabalho-thumb">
        <img src={imagem} alt={titulo} className="trabalho-thumb-img" />
        <div className="trabalho-overlay">
          <a className="trabalho-overlay-btn" href={href}>
            {linkTexto}
          </a>
        </div>
      </div>
      <div className="trabalho-info">
        <h4 className="trabalho-title">{titulo}</h4>
        <a className="trabalho-btn" href={href}>
          Visualizar
        </a>
      </div>
    </div>
  )
}

export default TrabalhoCard
