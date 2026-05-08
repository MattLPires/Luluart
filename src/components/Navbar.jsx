import { Link } from 'react-router-dom'
import useNavbarScroll from '../hooks/useNavbarScroll'
import './Navbar.css'

const navLinks = [
  { label: "Início", href: "/inicio", isActive: true },
  { label: "Projetos Acadêmicos", to: "/projetos-academicos" },
  { label: "Materiais", href: "/materiais" },
  { label: "Ilustrações", href: "/ilustracoes" }
]

function Navbar() {
  const scrolled = useNavbarScroll()

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner container">
        {navLinks.map((link) =>
          link.to ? (
            <Link
              key={link.label}
              to={link.to}
              className="nav-link"
            >
              {link.label}
            </Link>
          ) : (
            <a
              key={link.label}
              href={link.href}
              className={`nav-link${link.isActive ? ' nav-active' : ''}`}
            >
              {link.label}
            </a>
          )
        )}
      </div>
    </nav>
  )
}

export default Navbar
