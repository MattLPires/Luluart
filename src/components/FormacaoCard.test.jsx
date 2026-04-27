import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FormacaoCard from './FormacaoCard'

describe('FormacaoCard', () => {
  it('renders titulo, instituicao and single ano string', () => {
    render(
      <FormacaoCard
        titulo="Design de Mídias Digitais"
        instituicao="Fatec Barueri"
        anos="2025 – 2028"
      />
    )

    expect(screen.getByText('Design de Mídias Digitais')).toBeInTheDocument()
    expect(screen.getByText('Fatec Barueri')).toBeInTheDocument()
    expect(screen.getByText('2025 – 2028')).toBeInTheDocument()
  })

  it('renders titulo in an h4 element', () => {
    render(
      <FormacaoCard
        titulo="Design de Mídias Digitais"
        instituicao="Fatec Barueri"
        anos="2025 – 2028"
      />
    )

    const heading = screen.getByText('Design de Mídias Digitais')
    expect(heading.tagName).toBe('H4')
  })

  it('renders instituicao with .inst class', () => {
    render(
      <FormacaoCard
        titulo="Teste"
        instituicao="Fatec Barueri"
        anos="2025"
      />
    )

    const inst = screen.getByText('Fatec Barueri')
    expect(inst.classList.contains('inst')).toBe(true)
  })

  it('renders single ano with .year class', () => {
    render(
      <FormacaoCard
        titulo="Teste"
        instituicao="Teste Inst"
        anos="2025 – 2028"
      />
    )

    const year = screen.getByText('2025 – 2028')
    expect(year.classList.contains('year')).toBe(true)
  })

  it('renders multiple anos when given an array', () => {
    render(
      <FormacaoCard
        titulo="Empreende Sim!"
        instituicao="FEA – USP"
        anos={['1ª participação – 2023', '2ª participação – 2024']}
      />
    )

    expect(screen.getByText('1ª participação – 2023')).toBeInTheDocument()
    expect(screen.getByText('2ª participação – 2024')).toBeInTheDocument()

    const years = document.querySelectorAll('.year')
    expect(years.length).toBe(2)
  })
})
