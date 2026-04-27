import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import SkillCard from './SkillCard'

let observeCallback

beforeEach(() => {
  observeCallback = null
  const mockIntersectionObserver = vi.fn((callback) => {
    observeCallback = callback
    return {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }
  })
  vi.stubGlobal('IntersectionObserver', mockIntersectionObserver)
})

describe('SkillCard', () => {
  it('renders nome, nivel and progress bar', () => {
    render(
      <SkillCard
        nome="Canva"
        nivel="Avançado"
        porcentagem={95}
        icone={<span>C</span>}
        iconClass="icon-canva"
      />
    )

    expect(screen.getByText('Canva')).toBeInTheDocument()
    expect(screen.getByText('Avançado')).toBeInTheDocument()
    expect(document.querySelector('.skill-bar')).toBeInTheDocument()
  })

  it('renders nome in an h4 element', () => {
    render(
      <SkillCard
        nome="Krita"
        nivel="Avançado"
        porcentagem={90}
        icone={<span>K</span>}
        iconClass="icon-krita"
      />
    )

    const heading = screen.getByText('Krita')
    expect(heading.tagName).toBe('H4')
  })

  it('renders the icon inside a circle with iconClass', () => {
    render(
      <SkillCard
        nome="Photoshop"
        nivel="Intermediário"
        porcentagem={65}
        icone={<span>Ps</span>}
        iconClass="icon-ps"
      />
    )

    const iconContainer = document.querySelector('.skill-icon')
    expect(iconContainer).toBeInTheDocument()
    expect(iconContainer.classList.contains('icon-ps')).toBe(true)
    expect(screen.getByText('Ps')).toBeInTheDocument()
  })

  it('starts progress bar at 0% before intersection', () => {
    render(
      <SkillCard
        nome="Figma"
        nivel="Básico"
        porcentagem={35}
        icone={<span>F</span>}
        iconClass="icon-figma"
      />
    )

    const fill = document.querySelector('.skill-bar-fill')
    expect(fill.style.width).toBe('0%')
  })

  it('animates progress bar to porcentagem% after intersection', () => {
    render(
      <SkillCard
        nome="Canva"
        nivel="Avançado"
        porcentagem={95}
        icone={<span>C</span>}
        iconClass="icon-canva"
      />
    )

    act(() => {
      observeCallback([{ isIntersecting: true, target: document.createElement('div') }])
    })

    const fill = document.querySelector('.skill-bar-fill')
    expect(fill.style.width).toBe('95%')
  })

  it('renders nivel with skill-level class', () => {
    render(
      <SkillCard
        nome="Illustrator"
        nivel="Intermediário"
        porcentagem={65}
        icone={<span>Ai</span>}
        iconClass="icon-ai"
      />
    )

    const level = screen.getByText('Intermediário')
    expect(level.classList.contains('skill-level')).toBe(true)
  })
})
