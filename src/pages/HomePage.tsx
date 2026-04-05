import { useEffect, useState } from 'react'
import { MOCK_USERS } from '../data/mockUsers'
import { useRecommendations } from '../hooks/useRecommendations'
import { RecommendationSection } from '../components/RecommendationSection'
import { UserProfileSwitcher } from '../components/UserProfileSwitcher'

type Mode = 'user' | 'search'

export function HomePage() {
  const [activeUserId, setActiveUserId] = useState(MOCK_USERS[0].id)
  const [sectionKey, setSectionKey] = useState(0)
  const [mode, setMode] = useState<Mode>('user')
  const [promptInput, setPromptInput] = useState('')
  const [submittedPrompt, setSubmittedPrompt] = useState('')
  const { products, reasoning, isLoading, error, fetch: fetchRec, fetchByPrompt, reset } = useRecommendations()

  // 切換用戶 或 切換模式時統一處理（合併避免重複觸發）
  useEffect(() => {
    if (mode === 'user') {
      reset()
      setSectionKey(k => k + 1)
      fetchRec(activeUserId)
    } else {
      reset()
      setSectionKey(k => k + 1)
      setSubmittedPrompt('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUserId, mode])

  const activeUser = MOCK_USERS.find(u => u.id === activeUserId)

  const handleSearch = () => {
    const trimmed = promptInput.trim()
    if (!trimmed) return
    reset()
    setSubmittedPrompt(trimmed)
    setSectionKey(k => k + 1)
    fetchByPrompt(trimmed)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '24px 16px' }}>
      <h1 style={{ fontSize: 24, marginBottom: 6 }}>🛍️ Yahoo 購物 AI 推薦 Demo</h1>
      <p style={{ color: '#888', marginBottom: 20, fontSize: 14 }}>
        切換不同用戶 Persona，或直接輸入關鍵字搜尋商品
      </p>

      {/* 模式切換 Tab */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '2px solid #e0e0e0' }}>
        {(['user', 'search'] as const).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: '8px 20px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: mode === m ? 700 : 400,
              color: mode === m ? '#1976d2' : '#666',
              borderBottom: mode === m ? '3px solid #1976d2' : '3px solid transparent',
              marginBottom: -2,
              transition: 'all 0.15s',
            }}
          >
            {m === 'user' ? '👤 個人化推薦' : '🔍 關鍵字搜尋'}
          </button>
        ))}
      </div>

      {mode === 'user' ? (
        <>
          <UserProfileSwitcher
            users={MOCK_USERS}
            activeId={activeUserId}
            onSelect={setActiveUserId}
          />
          <div className="section-fade" key={sectionKey} style={{ marginTop: 8 }}>
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
        </>
      ) : (
        <>
          {/* 搜尋輸入框 */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            <input
              type="text"
              placeholder="輸入商品需求，例如：適合電競的滑鼠"
              value={promptInput}
              onChange={e => setPromptInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                padding: '10px 14px',
                fontSize: 15,
                border: '1.5px solid #bbb',
                borderRadius: 8,
                outline: 'none',
              }}
            />
            <button
              onClick={handleSearch}
              disabled={isLoading || !promptInput.trim()}
              style={{
                padding: '10px 22px',
                background: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: isLoading || !promptInput.trim() ? 'not-allowed' : 'pointer',
                opacity: isLoading || !promptInput.trim() ? 0.6 : 1,
                transition: 'opacity 0.15s',
              }}
            >
              搜尋
            </button>
          </div>

          {submittedPrompt && (
            <div className="section-fade" key={sectionKey}>
              <h2 style={{ fontSize: 18, marginBottom: 16 }}>
                🔎 「{submittedPrompt}」的推薦結果
              </h2>
              <RecommendationSection
                products={products}
                reasoning={reasoning}
                isLoading={isLoading}
                error={error}
              />
            </div>
          )}
        </>
      )}
    </main>
  )
}

