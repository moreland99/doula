/**
 * Local development API for POST /api/send-email (proxied from Vite).
 * Loads `.env` from the project root when dotenv is installed.
 */
import 'dotenv/config'
import express from 'express'
import { handleSubmission } from '../lib/email/handleSubmission.js'

const app = express()
const PORT = Number(process.env.CONTACT_API_PORT || 3001)

app.use(express.json({ limit: '48kb' }))

app.post('/api/send-email', async (req, res) => {
  try {
    await handleSubmission(req.body)
    res.status(200).json({ ok: true })
  } catch (err) {
    const code = err.statusCode || 500
    res.status(code).json({ error: err.message || 'Server error' })
  }
})

app.listen(PORT, () => {
  console.log(`Contact API listening on http://localhost:${PORT}`)
  if (process.env.CONTACT_API_DEV === '1') {
    console.log(
      '\nNo .env required for a quick test: submit a form in the browser, then open the DEV MAIL PREVIEW link printed below.\n',
    )
  }
})
