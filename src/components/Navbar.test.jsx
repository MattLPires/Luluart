import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

beforeEach(() => {
  Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
})

describe('Navbar', () => {
  it('renders exactly 4 navigation links', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4)
  })

  it('renders correct link labels', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    expect(screen.getByText('Início')).toBeInTheDocument()
    expect(screen.getByText('Projetos Acadêmicos')).toBeInTheDocument()
    expect(screen.getByText('Materiais')).toBeInTheDocument()
    expect(screen.getByText('Ilustrações')).toBeInTheDocument()
  })

  it('renders Ilustrações link with nav-link class', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    const ctaLink = screen.getByText('Ilustrações')
    expect(ctaLink).toHaveClass('nav-link')
  })

  it('renders non-CTA links with nav-link class', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    expect(screen.getByText('Início')).toHaveClass('nav-link')
    expect(screen.getByText('Projetos Acadêmicos')).toHaveClass('nav-link')
    expect(screen.getByText('Materiais')).toHaveClass('nav-link')
  })

  it('does not have scrolled class initially', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    const nav = document.querySelector('.navbar')
    expect(nav.classList.contains('scrolled')).toBe(false)
  })

  it('adds scrolled class when scrollY > 20', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    act(() => {
      window.scrollY = 50
      window.dispatchEvent(new Event('scroll'))
    })
    const nav = document.querySelector('.navbar')
    expect(nav.classList.contains('scrolled')).toBe(true)
  })

  it('removes scrolled class when scrollY <= 20', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    act(() => {
      window.scrollY = 50
      window.dispatchEvent(new Event('scroll'))
    })
    act(() => {
      window.scrollY = 10
      window.dispatchEvent(new Event('scroll'))
    })
    const nav = document.querySelector('.navbar')
    expect(nav.classList.contains('scrolled')).toBe(false)
  })
})
