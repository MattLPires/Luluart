import { StarIcon } from '../icons/SvgIcons'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-gradient-line" />
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">LuaLu Art</span>
            <span className="footer-area">Design de Mídias Digitais</span>
          </div>
          <div className="footer-contact">
            <h4 className="footer-contact-title"><StarIcon className="footer-star" /> Contato</h4>
            <a href="mailto:luanalipiresz@gmail.com" className="footer-link">luanalipiresz@gmail.com</a>
            <a href="https://wa.me/5511971932367" target="_blank" rel="noopener noreferrer" className="footer-link">+55 11 97193-2367</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Luana &middot; LuaLu Art. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
