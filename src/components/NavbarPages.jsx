import { Link } from 'react-router-dom'
import useNavbarScroll from '../hooks/useNavbarScroll'
import './Navbar.css'
import './NavbarPages.css'

const navLinks = [
  { label: "Início", to: "/" },
  { label: "Projetos Acadêmicos", to: "/projetos-academicos" },
  { label: "Materiais", to: "/materiais" },
  { label: "Ilustrações", to: "/ilustracoes" }
]

function NavbarPages({ ativa }) {
  const scrolled = useNavbarScroll()

  return (
    <nav className={`navbar navbar-pages${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner container">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className={`${link.isCta ? 'nav-btn' : 'nav-link'}${link.label === ativa ? ' nav-active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default NavbarPages
