import nodemailer from 'nodemailer'
import { isAutoPreviewDevMail } from './devMail.js'

let etherealSetupPromise = null

async function getEtherealMailer() {
  if (!etherealSetupPromise) {
    etherealSetupPromise = (async () => {
      const account = await nodemailer.createTestAccount()
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: account.user, pass: account.pass },
      })
      return { transporter, account }
    })()
  }
  return etherealSetupPromise
}

/**
 * @param {{ to: string, replyTo: string, subject: string, text: string }} params
 */
export async function sendWithNodemailer({ to, replyTo, subject, text }) {
  if (isAutoPreviewDevMail()) {
    const { transporter, account } = await getEtherealMailer()
    const info = await transporter.sendMail({
      from: `"Premier Doulas (dev preview)" <${account.user}>`,
      to,
      replyTo,
      subject,
      text,
    })
    const previewUrl = nodemailer.getTestMessageUrl(info)
    if (previewUrl) {
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('  DEV MAIL PREVIEW — open this link to read the message:')
      console.log(`  ${previewUrl}`)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    }
    return
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    const err = new Error('SMTP is not configured')
    err.statusCode = 500
    throw err
  }

  const port = Number(SMTP_PORT || '587')
  const from = process.env.SMTP_FROM?.trim() || SMTP_USER

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from,
    to,
    replyTo,
    subject,
    text,
  })
}
