import type { Product } from '../hooks/useRecommendations'

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: 8,
      padding: 12,
      background: '#fff',
      minWidth: 160,
      maxWidth: 200,
    }}>
      <div style={{
        width: '100%',
        height: 120,
        background: '#f5f5f5',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40,
        marginBottom: 8,
      }}>
        🛒
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, lineHeight: 1.4 }}>
        {product.title}
      </div>
      <div style={{ fontSize: 16, color: '#e53935', fontWeight: 700 }}>
        NT${product.price.toLocaleString()}
      </div>
      <div style={{ fontSize: 12, color: '#888' }}>
        ⭐ {product.rating.toFixed(1)}
      </div>
    </div>
  )
}
