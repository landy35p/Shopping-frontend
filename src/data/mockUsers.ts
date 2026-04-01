export interface UserProfile {
  id: string
  name: string
  persona: string
  avatarEmoji: string
}

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'user-tech',
    name: '科技控阿明',
    persona: '科技愛好者，喜歡最新 3C 產品、耳機、筆電、智慧裝置',
    avatarEmoji: '🧑‍💻',
  },
  {
    id: 'user-home',
    name: '居家達人小芳',
    persona: '重視居家品質，喜歡家電、廚房用品、生活好物',
    avatarEmoji: '🏠',
  },
  {
    id: 'user-sport',
    name: '運動王子小傑',
    persona: '熱愛戶外運動，喜歡運動裝備、健身器材、戶外用品',
    avatarEmoji: '⚽',
  },
]
