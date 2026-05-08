import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'

describe('App', () => {
  it('renders homepage without crashing', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(container).toBeTruthy()
  })

  it('renders all homepage sections', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(container.querySelector('.navbar')).toBeTruthy()
    expect(container.querySelector('.hero')).toBeTruthy()
    expect(container.querySelector('.sobre')).toBeTruthy()
    expect(container.querySelector('.habilidades')).toBeTruthy()
    expect(container.querySelector('.trabalhos')).toBeTruthy()
    expect(container.querySelector('.footer')).toBeTruthy()
  })

  it('renders Hero with logo image', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    const logo = document.querySelector('.hero-logo-img')
    expect(logo).toBeTruthy()
    expect(logo).toHaveAttribute('alt', 'LuaLu Art')
  })

  it('renders projetos academicos page', () => {
    render(
      <MemoryRouter initialEntries={['/projetos-academicos']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getAllByText('Projetos Acadêmicos').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Conheça alguns deles')).toBeTruthy()
  })

  it('renders Footer with contact info', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('LuaLu Art')).toBeTruthy()
    expect(screen.getByText('luanalipiresz@gmail.com')).toBeTruthy()
  })
})
