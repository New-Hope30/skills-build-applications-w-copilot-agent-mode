const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function collectionFromResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

export async function getCollection(resource) {
  const response = await fetch(`${API_BASE_URL}/${resource}/`)
  if (!response.ok) throw new Error(`Could not load ${resource}.`)
  return collectionFromResponse(await response.json())
}

export function formatDate(value) {
  return value ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(value)) : 'Recently'
}
