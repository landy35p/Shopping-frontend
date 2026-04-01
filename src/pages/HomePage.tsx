import { useEffect, useState } from 'react'
import { MOCK_USERS } from '../data/mockUsers'
import { useRecommendations } from '../hooks/useRecommendations'
import { RecommendationSection } from '../components/RecommendationSection'
import { UserProfileSwitcher } from '../components/UserProfileSwitcher'

export function HomePage() {
  const [activeUserId, setActiveUserId] = useState(MOCK_USERS[0].id)
  const [sectionKey, setSectionKey] = useState(0)
  const { products, reasoning, isLoading, error, fetch: fetchRec, reset } = useRecommendations()

  useEffect(() => {
    reset()
    setSectionKey(k => k + 1)
    fetchRec(activeUserId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUserId])

  const activeUser = MOCK_USERS.find(u => u.id === activeUserId)

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '24px 16px' }}>
      <h1 style={{ fontSize: 24, marginBottom: 6 }}>🛍️ Yahoo 購物 AI 推薦 Demo</h1>
      <p style={{ color: '#888', marginBottom: 28, fontSize: 14 }}>
        切換不同用戶 Persona，觀察 AI 個性化推薦差異
      </p>

      <UserProfileSwitcher
        users={MOCK_USERS}
        activeId={activeUserId}
        onSelect={setActiveUserId}
      />

      <div
        className="section-fade"
        key={sectionKey}
        style={{ marginTop: 8 }}
      >
        <h2 style={{ fontSize: 18, marginBottom: 16 }}>
          為 {activeUser?.avatarEmoji} {activeUser?.name} 推薦
        </h2>
        <RecommendationSection
          products={products}
          reasoning={reasoning}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </main>
  )
}

