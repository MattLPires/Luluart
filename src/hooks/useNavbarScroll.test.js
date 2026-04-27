import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import useNavbarScroll from './useNavbarScroll'

describe('useNavbarScroll', () => {
  let addEventSpy
  let removeEventSpy

  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true })
    addEventSpy = vi.spyOn(window, 'addEventListener')
    removeEventSpy = vi.spyOn(window, 'removeEventListener')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns false initially when scrollY is 0', () => {
    const { result } = renderHook(() => useNavbarScroll())
    expect(result.current).toBe(false)
  })

  it('registers a scroll event listener', () => {
    renderHook(() => useNavbarScroll())
    expect(addEventSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('returns true when scrollY exceeds default threshold of 20', () => {
    const { result } = renderHook(() => useNavbarScroll())

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 21, writable: true, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe(true)
  })

  it('returns false when scrollY equals the threshold', () => {
    const { result } = renderHook(() => useNavbarScroll())

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 20, writable: true, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe(false)
  })

  it('accepts a custom threshold', () => {
    const { result } = renderHook(() => useNavbarScroll(50))

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 51, writable: true, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe(true)
  })

  it('removes the scroll event listener on unmount', () => {
    const { unmount } = renderHook(() => useNavbarScroll())
    unmount()
    expect(removeEventSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('transitions back to false when scrolling back up', () => {
    const { result } = renderHook(() => useNavbarScroll())

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(true)

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 5, writable: true, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(false)
  })
})
