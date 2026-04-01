/**
 * 統一 API 入口：讀取 VITE_API_BASE_URL，開發期透過 Vite Proxy 自動代理 /api/*。
 * 注意：開發期 base 為空字串，讓 Vite Proxy 接管；正式期使用完整 URL。
 */
const isDev = import.meta.env.DEV

const BASE = isDev ? '' : (import.meta.env.VITE_API_BASE_URL ?? '')

export const apiUrl = (path: string): string => `${BASE}${path}`
