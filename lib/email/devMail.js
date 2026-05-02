/** True when local dev API runs without SMTP — uses Ethereal preview links instead. */
export function isAutoPreviewDevMail() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_API_DEV } = process.env
  return (
    CONTACT_API_DEV === '1' &&
    (!SMTP_HOST || !SMTP_USER || !SMTP_PASS)
  )
}
