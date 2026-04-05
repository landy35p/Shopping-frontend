import { fetchEventSource } from '@microsoft/fetch-event-source'
import { useCallback, useRef, useState } from 'react'
import { apiUrl } from '../api/client'

export interface Product {
  id: string
  title: string
  price: number
  rating: number
  imageUrl: string
}

export interface ReasoningChunk {
  productId?: string
  text: string
}

export interface UseRecommendationsResult {
  products: Product[]
  reasoning: string
  isLoading: boolean
  error: string | null
  fetch: (userId: string) => void
  fetchByPrompt: (prompt: string) => void
  reset: () => void
}

export function useRecommendations(): UseRecommendationsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [reasoning, setReasoning] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const reset = useCallback(() => {
    abortRef.current?.abort()
    setProducts([])
    setReasoning('')
    setError(null)
    setIsLoading(false)
  }, [])

  const fetch = useCallback((userId: string) => {
    // reset 由呼叫方負責，這裡只負責建立連線
    const ctrl = new AbortController()
    abortRef.current = ctrl
    setIsLoading(true)

    fetchEventSource(apiUrl(`/api/recommendations/stream?userId=${encodeURIComponent(userId)}`), {
      signal: ctrl.signal,
      openWhenHidden: true, // 防止切換分頁時自動重連並重複送出請求
      onmessage(ev) {
        if (ev.event === 'product') {
          const p: Product = JSON.parse(ev.data)
          setProducts(prev => [...prev, p])
        } else if (ev.event === 'reasoning') {
          const r: ReasoningChunk = JSON.parse(ev.data)
          setReasoning(prev => prev + r.text)
        } else if (ev.event === 'done') {
          setIsLoading(false)
        }
      },
      onerror(err) {
        const msg = err instanceof Error ? err.message : String(err)
        const friendly = msg.includes('fetch') || msg.includes('connect') || msg.includes('network')
          ? '連線失敗'
          : msg
        setError(friendly)
        setIsLoading(false)
        throw err // stop retrying
      },
    })
  }, [])

  const fetchByPrompt = useCallback((prompt: string) => {
    // reset 由呼叫方負責，這裡只負責建立連線
    const ctrl = new AbortController()
    abortRef.current = ctrl
    setIsLoading(true)

    fetchEventSource(apiUrl(`/api/recommendations/stream/search?prompt=${encodeURIComponent(prompt)}`), {
      signal: ctrl.signal,
      openWhenHidden: true, // 防止切換分頁時自動重連並重複送出請求
      onmessage(ev) {
        if (ev.event === 'product') {
          const p: Product = JSON.parse(ev.data)
          setProducts(prev => [...prev, p])
        } else if (ev.event === 'reasoning') {
          const r: ReasoningChunk = JSON.parse(ev.data)
          setReasoning(prev => prev + r.text)
        } else if (ev.event === 'done') {
          setIsLoading(false)
        }
      },
      onerror(err) {
        const msg = err instanceof Error ? err.message : String(err)
        const friendly = msg.includes('fetch') || msg.includes('connect') || msg.includes('network')
          ? '連線失敗'
          : msg
        setError(friendly)
        setIsLoading(false)
        throw err // stop retrying
      },
    })
  }, [])

  return { products, reasoning, isLoading, error, fetch, fetchByPrompt, reset }
}
