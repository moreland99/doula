import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Activity,
  ClipboardList,
  Clock3,
  Heart,
  Lightbulb,
  MoonStar,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import doulaLogo from './assets/doula.svg'
import { services } from './data/services'
import { submitForm } from './lib/submitForm'

const servicePageContent = {
  'postpartum-care': {
    whyTitle: 'Why families choose postpartum support',
    whyCards: [
      'More restorative sleep during the earliest weeks',
      'Expert guidance without late-night uncertainty',
      'Calmer routines and confidence that lasts',
    ],
    definitionTitle: 'What is postpartum care?',
    definitionLeft:
      'Postpartum care offers structured in-home support after birth so mothers can rest, recover, and feel held through physical and emotional transition. It combines practical care, education, and gentle guidance.',
    definitionRight:
      'Your care plan can include daytime or overnight support depending on your family needs. The goal is simple: protect maternal wellbeing, reduce overwhelm, and make the earliest weeks feel manageable.',
    supportTitle: 'What postpartum support includes',
    supportColumns: [
      {
        title: 'Maternal Recovery',
        bullets: [
          'Comfort-first care routines',
          'Recovery check-ins and pacing',
          'Practical support with daily flow',
        ],
      },
      {
        title: 'Newborn Support',
        bullets: ['Feeding and soothing guidance', 'Sleep rhythm support', 'Hands-on infant care coaching'],
      },
      {
        title: 'Family Confidence',
        bullets: [
          'Real-time answers from experts',
          'Reduced stress and decision fatigue',
          'A stronger start at home',
        ],
      },
    ],
  },
  'infant-care': {
    whyTitle: 'Why families choose infant support',
    whyCards: [
      'Steadier newborn routines with expert guidance',
      'Hands-on support that lowers first-month overwhelm',
      'Confidence-building care tailored to your baby',
    ],
    definitionTitle: 'What is infant care?',
    definitionLeft:
      'Infant care provides one-on-one in-home support focused on your baby\'s day-to-day needs during the earliest months. It combines practical care with coaching so families can build routines that feel sustainable and calm.',
    definitionRight:
      'Support can include soothing guidance, sleep rhythm planning, feeding flow help, and confidence-building infant handling techniques. The goal is to reduce uncertainty and help your family feel supported every day.',
    supportTitle: 'What infant support includes',
    supportColumns: [
      {
        title: 'Daily Infant Care',
        bullets: ['Soothing and calming techniques', 'Sleep rhythm guidance', 'Hands-on newborn support'],
      },
      {
        title: 'Routine Building',
        bullets: [
          'Feeding and nap flow planning',
          'Care structure that fits your home',
          'Adjustments as your baby grows',
        ],
      },
      {
        title: 'Family Confidence',
        bullets: ['Real-time expert reassurance', 'Lower stress during transitions', 'Supportive in-home coaching'],
      },
    ],
  },
  'lactation-support': {
    whyTitle: 'Why families choose lactation support',
    whyCards: [
      'Feeding support tailored to your goals and comfort',
      'Practical help that improves consistency and confidence',
      'Compassionate guidance without pressure or judgment',
    ],
    definitionTitle: 'What is lactation support?',
    definitionLeft:
      'Lactation support offers hands-on feeding guidance to help mothers and babies find a rhythm that works. It includes practical adjustments for latch, positioning, pumping, and comfort based on your unique goals.',
    definitionRight:
      'Whether you are establishing breastfeeding, combination feeding, or pumping routines, support is tailored to your stage. The focus is reducing stress, improving comfort, and making feeding more manageable at home.',
    supportTitle: 'What lactation support includes',
    supportColumns: [
      {
        title: 'Feeding Techniques',
        bullets: ['Latch and positioning support', 'Pacing and transfer guidance', 'Comfort-focused adjustments'],
      },
      {
        title: 'Plan Personalization',
        bullets: [
          'Support for nursing and pumping',
          'Flexible routines for your schedule',
          'Strategies aligned to your goals',
        ],
      },
      {
        title: 'Ongoing Guidance',
        bullets: ['Progress check-ins and refinements', 'Support through transitions', 'Steadier feeding confidence'],
      },
    ],
  },
}

const whyCardIconSets = {
  'postpartum-care': ['moon', 'lightbulb', 'heart'],
  'infant-care': ['clock', 'clipboard', 'shield'],
  'lactation-support': ['shield', 'activity', 'sparkle'],
}

const iconMap = {
  moon: MoonStar,
  lightbulb: Lightbulb,
  heart: Heart,
  clock: Clock3,
  clipboard: ClipboardList,
  shield: ShieldCheck,
  activity: Activity,
  sparkle: Sparkles,
}

const renderWhyIcon = (iconKey) => {
  const Icon = iconMap[iconKey] ?? Sparkles
  return <Icon className="h-12 w-12 text-charcoal" strokeWidth={1.4} />
}

function ServicePage() {
  const { serviceId } = useParams()
  const service = services.find((item) => item.id === serviceId)
  const pageContent = servicePageContent[serviceId]
  const whyIconSet = whyCardIconSets[serviceId] ?? ['sparkle', 'sparkle', 'sparkle']
  const serviceHeroImage = service?.image

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [bookingSubmitted, setBookingSubmitted] = useState(false)
  const [bookingSubmitting, setBookingSubmitting] = useState(false)
  const [bookingError, setBookingError] = useState(null)
  const [bookingHoneypot, setBookingHoneypot] = useState('')
  const [bookingForm, setBookingForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredContact: '',
    notes: '',
  })

  const openBookingModal = () => {
    setBookingSubmitted(false)
    setBookingError(null)
    setBookingHoneypot('')
    setBookingForm({
      fullName: '',
      email: '',
      phone: '',
      preferredContact: '',
      notes: '',
    })
    setIsBookingModalOpen(true)
  }

  const closeBookingModal = () => {
    setIsBookingModalOpen(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setBookingError(null)
    setBookingSubmitting(true)
    try {
      await submitForm({
        formType: 'consultation',
        honeypot: bookingHoneypot,
        fullName: bookingForm.fullName,
        email: bookingForm.email,
        phone: bookingForm.phone,
        service: service.name,
        preferredContact: bookingForm.preferredContact,
        notes: bookingForm.notes,
      })
      setBookingSubmitted(true)
      setBookingHoneypot('')
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setBookingSubmitting(false)
    }
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-cream px-5 py-16 text-center">
        <h1 className="text-4xl text-charcoal">Service not found</h1>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-none bg-[#8b6449] px-6 py-3 text-sm font-semibold text-cream transition hover:bg-[#74513d]"
        >
          Return Home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-7 sm:py-3.5 lg:px-10 lg:py-4">
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3" aria-label="Premier Doulas home">
            <img src={doulaLogo} alt="Premier Doulas" className="h-12 w-auto object-contain sm:h-14" />
            <span className="whitespace-nowrap font-heading text-lg tracking-wide text-charcoal transition-colors sm:text-xl">
              Premier Doulas
            </span>
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center p-1.5 text-charcoal transition hover:text-charcoal/70 sm:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="service-mobile-menu"
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>

          <nav className="ml-auto hidden items-center justify-end gap-8 pr-1 text-sm font-medium text-charcoal/85 sm:flex">
            <Link to="/#services" className="transition hover:text-charcoal">
              Services
            </Link>
            <Link to="/#contact" className="transition hover:text-charcoal">
              Contact
            </Link>
            <button
              type="button"
              onClick={openBookingModal}
              className="transition hover:text-charcoal"
            >
              Booking
            </button>
          </nav>
        </div>

        {mobileMenuOpen && (
          <nav
            id="service-mobile-menu"
            className="space-y-1 px-5 pb-4 pt-0 text-sm font-medium text-charcoal sm:hidden"
          >
            <Link to="/#services" className="block rounded-xl px-3 py-3 hover:bg-cream">
              Services
            </Link>
            <Link to="/#contact" className="block rounded-xl px-3 py-3 hover:bg-cream">
              Contact
            </Link>
            <button
              type="button"
              onClick={openBookingModal}
              className="block w-full rounded-xl px-3 py-3 text-left hover:bg-cream"
            >
              Booking
            </button>
          </nav>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden bg-white pt-16 sm:pt-[74px]">
          <img
            src={serviceHeroImage}
            alt={service.name}
            className="h-[58svh] min-h-[390px] max-h-[600px] w-full object-cover object-center sm:h-[60svh] sm:min-h-[430px] lg:h-[64vh] lg:max-h-[660px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/52 via-charcoal/32 to-charcoal/10" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10">
              <div className="max-w-lg border border-white/70 bg-cream/95 p-4 shadow-2xl backdrop-blur-[6px] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-goldDeep">
                  Service details
                </p>
                <h1 className="mt-2 text-[2rem] leading-tight text-charcoal sm:text-5xl">{service.name}</h1>
                <p className="mt-4 text-sm leading-relaxed text-charcoal/90 sm:text-base">
                  {service.longDescription}
                </p>
                <button
                  type="button"
                  onClick={openBookingModal}
                  className="mt-7 inline-flex w-full items-center justify-center rounded-none bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-charcoal transition hover:bg-goldDeep sm:w-auto"
                >
                  Request Consultation
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              <article className="rounded-2xl border border-beige bg-cream p-6 shadow-soft sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-goldDeep">
                  How this service works
                </p>
                <h2 className="mt-2 text-3xl text-charcoal sm:text-4xl">{service.name} in detail</h2>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-charcoal/75 sm:text-base">
                  {service.packageHighlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-goldDeep" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-2xl border border-beige bg-cream p-6 shadow-soft sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-goldDeep">
                  What plans can include
                </p>
                <h2 className="mt-2 text-3xl text-charcoal sm:text-4xl">Common inclusions</h2>
                <p className="mt-4 text-sm leading-relaxed text-charcoal/75 sm:text-base">
                  Every family receives a personalized care plan, but these are common support options we
                  tailor based on your recovery timeline, home routine, and desired level of help.
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-charcoal/75 sm:text-base">
                  {service.included.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-goldDeep" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10">
            <div className="mb-10 text-center">
              <div className="mx-auto mb-3 h-px w-14 bg-gold/70" />
              <h2 className="text-3xl text-charcoal sm:text-4xl">{pageContent.whyTitle}</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {pageContent.whyCards.map((item, index) => (
                <article
                  key={item}
                  className="rounded-2xl border border-beige bg-cream p-5 text-center shadow-soft"
                >
                  <span className="inline-flex items-center justify-center">
                    {renderWhyIcon(whyIconSet[index])}
                  </span>
                  <p className="mt-5 text-lg leading-snug text-charcoal">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#eaf1f0] py-14 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-3 h-px w-14 bg-gold/70" />
                <h2 className="text-3xl text-charcoal sm:text-4xl">{pageContent.definitionTitle}</h2>
              </div>
              <div className="grid grid-cols-1 gap-6 text-base leading-relaxed text-charcoal/75 sm:grid-cols-2 sm:gap-8">
                <p>{pageContent.definitionLeft}</p>
                <p>{pageContent.definitionRight}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10">
            <div className="mb-10 text-center">
              <h2 className="text-3xl text-charcoal sm:text-4xl">{pageContent.supportTitle}</h2>
              <p className="mx-auto mt-3 max-w-3xl text-sm text-charcoal/75 sm:text-base">
                Structured support that helps you feel more rested, more confident, and more in
                control throughout recovery.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pageContent.supportColumns.map((column) => (
                <article
                  key={column.title}
                  className="rounded-2xl border border-beige bg-cream p-5 shadow-soft"
                >
                  <h3 className="text-2xl text-charcoal">{column.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-charcoal/75 sm:text-base">
                    {column.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-goldDeep" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="book" className="bg-sand py-14 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-4xl px-5 sm:px-7 lg:px-10">
            <div className="mb-8 text-center">
              <h2 className="text-3xl text-charcoal sm:text-4xl">Request a consultation</h2>
              <p className="mt-3 text-sm text-charcoal/75 sm:text-base">
                Tell us a little about yourself and we&apos;ll reach out to schedule your private consultation.
              </p>
            </div>
            <div className="rounded-3xl border border-beige bg-white p-7 text-center shadow-soft sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-goldDeep">
                Get started
              </p>
              <h3 className="mt-2 text-3xl text-charcoal sm:text-4xl">We&apos;d love to hear from you</h3>
              <button
                type="button"
                onClick={openBookingModal}
                className="mt-6 inline-flex items-center justify-center rounded-none bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal transition hover:bg-goldDeep"
              >
                Request Consultation
              </button>
            </div>
          </div>
        </section>
      </main>

      {isBookingModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/55 p-4 sm:p-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Consultation request"
            className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-beige bg-white shadow-2xl"
          >
            <button
              type="button"
              onClick={closeBookingModal}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/20 bg-white text-charcoal transition hover:bg-sand"
              aria-label="Close consultation modal"
            >
              ×
            </button>

            {!bookingSubmitted && (
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="border-b border-beige bg-cream p-6 text-center sm:p-8 lg:border-b-0 lg:border-r">
                  <img src={doulaLogo} alt="Premier Doulas logo" className="mx-auto h-16 w-auto object-contain" />
                  <p className="mt-2 font-heading text-2xl leading-none tracking-wide text-gold sm:text-3xl">
                    Premier
                  </p>
                  <p className="font-heading text-2xl leading-none tracking-wide text-gold sm:text-3xl">
                    Doulas
                  </p>
                  <h3 className="mt-4 font-heading text-2xl leading-tight text-charcoal sm:text-3xl">
                    {service.name} Consultation
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-charcoal/75 sm:text-base">
                    Share a few details and we&apos;ll reach out to schedule a private consultation
                    tailored to your timeline, goals, and support preferences.
                  </p>
                  <div className="mt-6 space-y-2 text-sm text-charcoal/80">
                    <p>• 20 minute consultation</p>
                    <p>• Phone or virtual call</p>
                    <p>• Personalized next-step guidance</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="relative space-y-4 p-6 sm:p-8">
                  <h3 className="text-2xl text-charcoal">Your details</h3>
                  <div
                    className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0"
                    aria-hidden="true"
                  >
                    <label className="flex flex-col gap-1">
                      Company website
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={bookingHoneypot}
                        onChange={(event) => setBookingHoneypot(event.target.value)}
                      />
                    </label>
                  </div>
                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium text-charcoal">Full name</span>
                    <input
                      type="text"
                      value={bookingForm.fullName}
                      onChange={(event) =>
                        setBookingForm((previous) => ({ ...previous, fullName: event.target.value }))
                      }
                      required
                      className="w-full rounded-xl border border-beige bg-cream px-3 py-3 text-sm text-charcoal outline-none transition focus:border-gold"
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium text-charcoal">Email</span>
                    <input
                      type="email"
                      value={bookingForm.email}
                      onChange={(event) =>
                        setBookingForm((previous) => ({ ...previous, email: event.target.value }))
                      }
                      required
                      className="w-full rounded-xl border border-beige bg-cream px-3 py-3 text-sm text-charcoal outline-none transition focus:border-gold"
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium text-charcoal">Phone</span>
                    <input
                      type="tel"
                      value={bookingForm.phone}
                      onChange={(event) =>
                        setBookingForm((previous) => ({ ...previous, phone: event.target.value }))
                      }
                      required
                      className="w-full rounded-xl border border-beige bg-cream px-3 py-3 text-sm text-charcoal outline-none transition focus:border-gold"
                    />
                  </label>
                  <fieldset className="space-y-2">
                    <legend className="text-sm font-medium text-charcoal">Preferred contact method</legend>
                    <div className="mt-1 flex flex-wrap gap-4">
                      {['Phone', 'Email', 'No preference'].map((method) => (
                        <label key={method} className="flex items-center gap-2 text-sm text-charcoal/80">
                          <input
                            type="radio"
                            name="preferredContact"
                            value={method}
                            checked={bookingForm.preferredContact === method}
                            onChange={(event) =>
                              setBookingForm((previous) => ({
                                ...previous,
                                preferredContact: event.target.value,
                              }))
                            }
                            className="accent-gold"
                          />
                          {method}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium text-charcoal">Message (optional)</span>
                    <textarea
                      rows={3}
                      value={bookingForm.notes}
                      onChange={(event) =>
                        setBookingForm((previous) => ({ ...previous, notes: event.target.value }))
                      }
                      placeholder="Tell us about your due date, care preferences, or any questions you have."
                      className="w-full rounded-xl border border-beige bg-cream px-3 py-3 text-sm text-charcoal outline-none transition focus:border-gold"
                    />
                  </label>
                  {bookingError && (
                    <p className="text-sm text-red-700" role="alert">
                      {bookingError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={bookingSubmitting}
                    className="inline-flex w-full items-center justify-center rounded-none bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal transition hover:bg-goldDeep disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {bookingSubmitting ? 'Sending…' : 'Request Consultation'}
                  </button>
                </form>
              </div>
            )}

            {bookingSubmitted && (
              <div className="p-7 text-center sm:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-goldDeep">Thank you</p>
                <h3 className="mt-2 text-3xl text-charcoal sm:text-4xl">
                  Your consultation request has been received.
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm text-charcoal/75 sm:text-base">
                  We&apos;ll be in touch soon to schedule your {service.name} consultation.
                </p>
                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="mt-6 inline-flex items-center justify-center rounded-none bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal transition hover:bg-goldDeep"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ServicePage

