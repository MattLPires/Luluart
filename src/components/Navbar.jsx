import useNavbarScroll from '../hooks/useNavbarScroll'
import './Navbar.css'

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Projetos Acadêmicos", href: "#trabalhos" },
  { label: "Materiais", href: "#trabalhos" },
  { label: "Ilustrações", href: "#trabalhos", isCta: true }
]

function Navbar() {
  const scrolled = useNavbarScroll()

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner container">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={link.isCta ? 'nav-btn' : 'nav-link'}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
