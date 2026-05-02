/**
 * POST form payloads to the mail API. Uses same-origin /api in production;
 * optional VITE_CONTACT_API_URL for absolute origin during special setups.
 */
export async function submitForm(payload) {
  const base = (import.meta.env.VITE_CONTACT_API_URL ?? '').replace(/\/$/, '')
  const path = '/api/send-email'
  const url = base ? `${base}${path}` : path

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  let data = {}
  try {
    data = await response.json()
  } catch {
    /* ignore */
  }

  if (!response.ok) {
    throw new Error(data.error || response.statusText || 'Request failed')
  }

  return data
}
