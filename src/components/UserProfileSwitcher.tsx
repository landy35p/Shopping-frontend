import type { UserProfile } from '../data/mockUsers'

interface Props {
  users: UserProfile[]
  activeId: string
  onSelect: (id: string) => void
}

export function UserProfileSwitcher({ users, activeId, onSelect }: Props) {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
      {users.map(u => (
        <button
          key={u.id}
          onClick={() => onSelect(u.id)}
          style={{
            padding: '8px 16px',
            borderRadius: 24,
            border: activeId === u.id ? '2px solid #1976d2' : '2px solid #e0e0e0',
            background: activeId === u.id ? '#e3f2fd' : '#fff',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: activeId === u.id ? 700 : 400,
          }}
        >
          {u.avatarEmoji} {u.name}
        </button>
      ))}
    </div>
  )
}
