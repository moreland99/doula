import { isAutoPreviewDevMail } from './devMail.js'
import { sendWithNodemailer } from './sendWithNodemailer.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_MESSAGE = 8000
const MAX_NAME = 200
const MAX_PHONE = 40

function trim(value) {
  if (value == null) return ''
  return String(value).trim()
}

function throwBad(message) {
  const err = new Error(message)
  err.statusCode = 400
  throw err
}

function formatContactLines(body) {
  const phone = trim(body.phone)
  const serviceInterest = trim(body.serviceInterest)
  const message = trim(body.message)
  return [
    'New contact message (Premier Doulas · premierdoulas.com)',
    '',
    `Name: ${trim(body.name)}`,
    `Email: ${trim(body.email)}`,
    `Phone: ${phone || '(not provided)'}`,
    `Service of interest: ${serviceInterest || '(none selected)'}`,
    '',
    'Message:',
    message,
  ].join('\n')
}

function formatConsultationLines(body) {
  const preferred = trim(body.preferredContact)
  const notes = trim(body.notes)
  return [
    'New consultation request (Premier Doulas · premierdoulas.com)',
    '',
    `Full name: ${trim(body.fullName)}`,
    `Email: ${trim(body.email)}`,
    `Phone: ${trim(body.phone)}`,
    `Service: ${trim(body.service)}`,
    `Preferred contact method: ${preferred || '(not specified)'}`,
    '',
    'Notes (optional):',
    notes || '(none)',
  ].join('\n')
}

/**
 * Validates payload and sends email via Nodemailer.
 * @returns {Promise<{ skipped?: boolean }>}
 */
export async function handleSubmission(body) {
  if (!body || typeof body !== 'object') {
    throwBad('Invalid payload')
  }

  const honeypot = trim(body.honeypot)
  if (honeypot) {
    return { skipped: true }
  }

  let businessEmail = trim(process.env.BUSINESS_EMAIL)
  if (!businessEmail && isAutoPreviewDevMail()) {
    businessEmail = 'preview@ethereal.email'
  }
  if (!businessEmail) {
    const err = new Error('BUSINESS_EMAIL is not configured')
    err.statusCode = 500
    throw err
  }

  const formType = body.formType
  if (formType !== 'contact' && formType !== 'consultation') {
    throwBad('Invalid form type')
  }

  const replyToEmail = trim(body.email)
  if (!replyToEmail || !EMAIL_RE.test(replyToEmail)) {
    throwBad('A valid email address is required')
  }

  let subject
  let text

  if (formType === 'contact') {
    const name = trim(body.name)
    const message = trim(body.message)
    if (!name) throwBad('Name is required')
    if (name.length > MAX_NAME) throwBad('Name is too long')
    if (!message) throwBad('Message is required')
    if (message.length > MAX_MESSAGE) throwBad('Message is too long')
    const phone = trim(body.phone)
    if (phone.length > MAX_PHONE) throwBad('Phone is too long')
    const serviceInterest = trim(body.serviceInterest)
    if (serviceInterest.length > 200) throwBad('Service selection is invalid')

    subject = 'New Contact Message - Premier Doulas'
    text = formatContactLines({ ...body, name, email: replyToEmail, phone, serviceInterest, message })
  } else {
    const fullName = trim(body.fullName)
    const phone = trim(body.phone)
    const service = trim(body.service)
    const preferredContact = trim(body.preferredContact)
    const notes = trim(body.notes)

    if (!fullName) throwBad('Full name is required')
    if (fullName.length > MAX_NAME) throwBad('Full name is too long')
    if (!phone) throwBad('Phone is required')
    if (phone.length > MAX_PHONE) throwBad('Phone is too long')
    if (!service) throwBad('Service is required')
    if (service.length > 200) throwBad('Service is invalid')
    if (notes.length > MAX_MESSAGE) throwBad('Notes are too long')
    if (preferredContact.length > 80) throwBad('Preferred contact is invalid')

    subject = 'New Consultation Request - Premier Doulas'
    text = formatConsultationLines({
      fullName,
      email: replyToEmail,
      phone,
      service,
      preferredContact,
      notes,
    })
  }

  await sendWithNodemailer({
    to: businessEmail,
    replyTo: replyToEmail,
    subject,
    text,
  })

  return {}
}
