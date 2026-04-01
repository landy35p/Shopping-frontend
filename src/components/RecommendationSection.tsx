import type { Product } from '../hooks/useRecommendations'
import { ProductCard } from './ProductCard'

interface Props {
  products: Product[]
  reasoning: string
  isLoading: boolean
  error: string | null
}

export function RecommendationSection({ products, reasoning, isLoading, error }: Props) {
  const waitingForProducts = isLoading && products.length === 0
  const waitingForReasoning = isLoading && products.length > 0 && !reasoning

  if (error) {
    return (
      <div style={{
        padding: '20px 24px',
        borderRadius: 10,
        background: '#fff5f5',
        border: '1px solid #ffcdd2',
        color: '#c62828',
      }}>
        <div style={{ fontSize: 18, marginBottom: 8 }}>⚠️ 推薦服務暫時無法使用</div>
        <div style={{ fontSize: 13, color: '#e53935', lineHeight: 1.6 }}>
          {error.includes('fetch') || error.includes('connect')
            ? '無法連線至 AI 服務，請確認 Ollama 已正常啟動後再試。'
            : `錯誤：${error}`}
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: '#aaa' }}>
          提示：確認 Docker 中 ollama_embedding 容器正在運行。
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Stage 1: Waiting for products */}
      {waitingForProducts && (
        <div style={{ marginBottom: 16, color: '#1976d2', fontSize: 14 }}>
          <span className="spinner" />
          AI 正在分析您的購買偏好，尋找最適合的商品...
        </div>
      )}

      {/* Product cards */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        {waitingForProducts
          ? Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="skeleton"
                style={{
                  width: 160,
                  height: 200,
                  background: '#eeeeee',
                  borderRadius: 8,
                  animationDelay: `${i * 150}ms`,
                }}
              />
            ))
          : products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>

      {/* Stage 2: Products arrived, waiting for LLM reasoning */}
      {waitingForReasoning && (
        <div style={{
          background: '#f8f9fa',
          borderRadius: 8,
          padding: 16,
          fontSize: 14,
          color: '#1976d2',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span className="spinner" />
          AI 正在生成個性化推薦說明，需要一些時間請耐心等候...
        </div>
      )}

      {/* Stage 3: Reasoning streaming */}
      {reasoning && (
        <div
          className="section-fade"
          style={{
            background: '#f8f9fa',
            borderRadius: 8,
            padding: 20,
            fontSize: 14,
            lineHeight: 1.9,
            color: '#333',
            whiteSpace: 'pre-wrap',
            borderLeft: '4px solid #1976d2',
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 10, color: '#1976d2', fontSize: 15 }}>
            🤖 AI 推薦說明
          </div>
          {reasoning}
          {isLoading && <span className="cursor-blink" style={{ marginLeft: 2 }}>▌</span>}
        </div>
      )}
    </div>
  )
}

