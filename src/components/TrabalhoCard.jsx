import { Link } from 'react-router-dom'
import './TrabalhoCard.css'

function TrabalhoCard({ titulo, imagem, linkTexto, href, to }) {
  const LinkOrA = to ? Link : 'a'
  const linkProps = to ? { to } : { href }

  return (
    <div className="trabalho-card">
      <div className="trabalho-thumb">
        <img src={imagem} alt={titulo} className="trabalho-thumb-img" />
        <div className="trabalho-overlay">
          <LinkOrA className="trabalho-overlay-btn" {...linkProps}>
            {linkTexto}
          </LinkOrA>
        </div>
      </div>
      <div className="trabalho-info">
        <h4 className="trabalho-title">{titulo}</h4>
        <LinkOrA className="trabalho-btn" {...linkProps}>
          Visualizar
        </LinkOrA>
      </div>
    </div>
  )
}

export default TrabalhoCard
