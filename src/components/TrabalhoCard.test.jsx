import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TrabalhoCard from './TrabalhoCard'

describe('TrabalhoCard', () => {
  const defaultProps = {
    titulo: 'Projetos Acadêmicos',
    imagem: '/projetos-acad.jpeg',
    linkTexto: 'Ver projetos',
    href: '#projetos'
  }

  it('renders the title and Visualizar button', () => {
    render(<MemoryRouter><TrabalhoCard {...defaultProps} /></MemoryRouter>)
    expect(screen.getByText('Projetos Acadêmicos')).toBeInTheDocument()
    expect(screen.getByText('Visualizar')).toBeInTheDocument()
  })

  it('renders the title in an h4 element', () => {
    render(<MemoryRouter><TrabalhoCard {...defaultProps} /></MemoryRouter>)
    const heading = screen.getByText('Projetos Acadêmicos')
    expect(heading.tagName).toBe('H4')
  })

  it('renders the overlay button with linkTexto', () => {
    render(<MemoryRouter><TrabalhoCard {...defaultProps} /></MemoryRouter>)
    expect(screen.getByText('Ver projetos')).toBeInTheDocument()
  })

  it('renders the image in the thumbnail area', () => {
    render(<MemoryRouter><TrabalhoCard {...defaultProps} /></MemoryRouter>)
    const img = document.querySelector('.trabalho-thumb-img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/projetos-acad.jpeg')
  })

  it('uses React Router Link when to prop is provided', () => {
    render(
      <MemoryRouter>
        <TrabalhoCard {...defaultProps} to="/projetos-academicos" />
      </MemoryRouter>
    )
    expect(screen.getByText('Visualizar')).toHaveAttribute('href', '/projetos-academicos')
  })
})
