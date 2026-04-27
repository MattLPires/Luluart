import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TrabalhoCard from './TrabalhoCard'

describe('TrabalhoCard', () => {
  const defaultProps = {
    titulo: 'Projetos Acadêmicos',
    imagem: '/projetos-acad.jpeg',
    linkTexto: 'Ver projetos',
    href: '#projetos'
  }

  it('renders the title and Visualizar button', () => {
    render(<TrabalhoCard {...defaultProps} />)
    expect(screen.getByText('Projetos Acadêmicos')).toBeInTheDocument()
    expect(screen.getByText('Visualizar')).toBeInTheDocument()
  })

  it('renders the title in an h4 element', () => {
    render(<TrabalhoCard {...defaultProps} />)
    const heading = screen.getByText('Projetos Acadêmicos')
    expect(heading.tagName).toBe('H4')
  })

  it('renders the overlay button with linkTexto', () => {
    render(<TrabalhoCard {...defaultProps} />)
    expect(screen.getByText('Ver projetos')).toBeInTheDocument()
  })

  it('renders the image in the thumbnail area', () => {
    render(<TrabalhoCard {...defaultProps} />)
    const img = document.querySelector('.trabalho-thumb-img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/projetos-acad.jpeg')
  })

  it('sets href on both the overlay button and Visualizar link', () => {
    render(<TrabalhoCard {...defaultProps} />)
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveAttribute('href', '#projetos')
    })
  })
})
