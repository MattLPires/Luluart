import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App.jsx'

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />)
    expect(container).toBeTruthy()
  })

  it('renders all sections in order', () => {
    const { container } = render(<App />)
    expect(container.querySelector('.navbar')).toBeTruthy()
    expect(container.querySelector('.hero')).toBeTruthy()
    expect(container.querySelector('.sobre')).toBeTruthy()
    expect(container.querySelector('.habilidades')).toBeTruthy()
    expect(container.querySelector('.trabalhos')).toBeTruthy()
    expect(container.querySelector('.footer')).toBeTruthy()
  })

  it('renders Navbar with navigation links', () => {
    render(<App />)
    expect(screen.getByText('Início')).toBeTruthy()
    expect(screen.getAllByText('Ilustrações').length).toBeGreaterThanOrEqual(1)
  })

  it('renders Hero with logo image', () => {
    render(<App />)
    const logo = document.querySelector('.hero-logo-img')
    expect(logo).toBeTruthy()
    expect(logo).toHaveAttribute('alt', 'LuaLu Art')
  })

  it('renders Footer with credits', () => {
    render(<App />)
    expect(screen.getByText('LuaLu Art')).toBeTruthy()
    expect(screen.getByText('luanalipiresz@gmail.com')).toBeTruthy()
  })
})
