import { handleSubmission } from '../lib/email/handleSubmission.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).setHeader('Allow', 'POST').json({ error: 'Method not allowed' })
    return
  }

  try {
    let body = req.body
    if (typeof body === 'string') {
      body = JSON.parse(body || '{}')
    }
    await handleSubmission(body)
    res.status(200).json({ ok: true })
  } catch (err) {
    const code = err.statusCode || 500
    res.status(code).json({ error: err.message || 'Server error' })
  }
}
