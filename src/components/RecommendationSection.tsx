import type { Product } from '../hooks/useRecommendations'
import { ProductCard } from './ProductCard'

interface Props {
  products: Product[]
  reasoning: string
  isLoading: boolean
  error: string | null
}

export function RecommendationSection({ products, reasoning, isLoading, error }: Props) {
  if (error) {
    return <div style={{ color: '#e53935', padding: 16 }}>⚠️ 載入失敗：{error}</div>
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        {products.length === 0 && isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 160,
                  height: 200,
                  background: '#f0f0f0',
                  borderRadius: 8,
                  animation: 'pulse 1.5s infinite',
                }}
              />
            ))
          : products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      {reasoning && (
        <div style={{
          background: '#f8f9fa',
          borderRadius: 8,
          padding: 16,
          fontSize: 14,
          lineHeight: 1.8,
          color: '#333',
          whiteSpace: 'pre-wrap',
        }}>
          <strong>🤖 AI 推薦說明</strong>
          <br />
          {reasoning}
          {isLoading && <span style={{ animation: 'blink 1s infinite' }}>▌</span>}
        </div>
      )}
    </div>
  )
}
