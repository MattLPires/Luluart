import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import useReveal from './useReveal'

describe('useReveal', () => {
  let observeMock
  let unobserveMock
  let disconnectMock
  let observerCallback
  let originalIO

  beforeEach(() => {
    observeMock = vi.fn()
    unobserveMock = vi.fn()
    disconnectMock = vi.fn()
    originalIO = globalThis.IntersectionObserver

    globalThis.IntersectionObserver = vi.fn((callback) => {
      observerCallback = callback
      return {
        observe: observeMock,
        unobserve: unobserveMock,
        disconnect: disconnectMock,
      }
    })
  })

  afterEach(() => {
    globalThis.IntersectionObserver = originalIO
  })

  it('returns a ref and isVisible=false initially', () => {
    const { result } = renderHook(() => useReveal())
    const [ref, isVisible] = result.current
    expect(ref.current).toBeNull()
    expect(isVisible).toBe(false)
  })

  it('creates IntersectionObserver with default threshold 0.15', () => {
    renderHook(() => useReveal())
    expect(globalThis.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.15 }
    )
  })

  it('sets isVisible=true when entry is intersecting', () => {
    const div = document.createElement('div')
    const { result } = renderHook(() => useReveal())

    act(() => {
      observerCallback([{ isIntersecting: true, target: div }])
    })

    expect(result.current[1]).toBe(true)
  })

  it('unobserves the element after it becomes visible', () => {
    const div = document.createElement('div')
    const { result } = renderHook(() => useReveal())

    act(() => {
      observerCallback([{ isIntersecting: true, target: div }])
    })

    expect(unobserveMock).toHaveBeenCalledWith(div)
  })

  it('does not set isVisible when entry is not intersecting', () => {
    const { result } = renderHook(() => useReveal())

    act(() => {
      observerCallback([{ isIntersecting: false, target: document.createElement('div') }])
    })

    expect(result.current[1]).toBe(false)
  })

  it('disconnects observer on unmount', () => {
    const { unmount } = renderHook(() => useReveal())
    unmount()
    expect(disconnectMock).toHaveBeenCalled()
  })

  it('returns isVisible=true when IntersectionObserver is not available', () => {
    delete globalThis.IntersectionObserver

    const { result } = renderHook(() => useReveal())
    expect(result.current[1]).toBe(true)
  })

  it('accepts custom options', () => {
    renderHook(() => useReveal({ threshold: 0.5 }))
    expect(globalThis.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.5 }
    )
  })
})
