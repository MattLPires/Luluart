import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import Navbar from './Navbar'

beforeEach(() => {
  Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
})

describe('Navbar', () => {
  it('renders exactly 4 navigation links', () => {
    render(<Navbar />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4)
  })

  it('renders correct link labels', () => {
    render(<Navbar />)
    expect(screen.getByText('Início')).toBeInTheDocument()
    expect(screen.getByText('Projetos Acadêmicos')).toBeInTheDocument()
    expect(screen.getByText('Materiais')).toBeInTheDocument()
    expect(screen.getByText('Ilustrações')).toBeInTheDocument()
  })

  it('renders Ilustrações link with nav-btn class', () => {
    render(<Navbar />)
    const ctaLink = screen.getByText('Ilustrações')
    expect(ctaLink).toHaveClass('nav-btn')
  })

  it('renders non-CTA links with nav-link class', () => {
    render(<Navbar />)
    expect(screen.getByText('Início')).toHaveClass('nav-link')
    expect(screen.getByText('Projetos Acadêmicos')).toHaveClass('nav-link')
    expect(screen.getByText('Materiais')).toHaveClass('nav-link')
  })

  it('renders correct href attributes', () => {
    render(<Navbar />)
    expect(screen.getByText('Início')).toHaveAttribute('href', '#inicio')
    expect(screen.getByText('Projetos Acadêmicos')).toHaveAttribute('href', '#trabalhos')
    expect(screen.getByText('Materiais')).toHaveAttribute('href', '#trabalhos')
    expect(screen.getByText('Ilustrações')).toHaveAttribute('href', '#trabalhos')
  })

  it('does not have scrolled class initially', () => {
    render(<Navbar />)
    const nav = document.querySelector('.navbar')
    expect(nav.classList.contains('scrolled')).toBe(false)
  })

  it('adds scrolled class when scrollY > 20', () => {
    render(<Navbar />)
    act(() => {
      window.scrollY = 50
      window.dispatchEvent(new Event('scroll'))
    })
    const nav = document.querySelector('.navbar')
    expect(nav.classList.contains('scrolled')).toBe(true)
  })

  it('removes scrolled class when scrollY <= 20', () => {
    render(<Navbar />)
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
