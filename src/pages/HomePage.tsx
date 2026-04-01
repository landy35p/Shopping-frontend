import { useEffect, useState } from 'react'
import { MOCK_USERS } from '../data/mockUsers'
import { useRecommendations } from '../hooks/useRecommendations'
import { RecommendationSection } from '../components/RecommendationSection'
import { UserProfileSwitcher } from '../components/UserProfileSwitcher'

export function HomePage() {
  const [activeUserId, setActiveUserId] = useState(MOCK_USERS[0].id)
  const { products, reasoning, isLoading, error, fetch: fetchRec, reset } = useRecommendations()

  useEffect(() => {
    reset()
    fetchRec(activeUserId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUserId])

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '24px 16px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>🛍️ Yahoo 購物 AI 推薦 Demo</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>切換不同用戶 Persona，觀察個性化推薦差異</p>

      <UserProfileSwitcher
        users={MOCK_USERS}
        activeId={activeUserId}
        onSelect={setActiveUserId}
      />

      <h2 style={{ fontSize: 18, marginBottom: 16 }}>為你推薦</h2>
      <RecommendationSection
        products={products}
        reasoning={reasoning}
        isLoading={isLoading}
        error={error}
      />
    </main>
  )
}
