import { useState } from 'react'
import { Link } from 'react-router-dom'
import desktopHero from './assets/desktopHero.png'
import mobileHero from './assets/mobileHero.png'
import doulaLogo from './assets/doula.svg'
import doulaNewImage from './assets/doulanew.png'
import { faqs, services, testimonials } from './data/services'
import { submitForm } from './lib/submitForm'

const serviceDisplayName = {
  'postpartum-care': 'Postpartum Care',
  'infant-care': 'Infant Care',
  'lactation-support': 'Lactation Support',
}

const trustStats = [
  { value: '500+', label: 'Families Supported' },
  { value: '4.9', label: 'Average Rating' },
  { value: '3', label: 'Specialized Services' },
]

const careQuotes = [
  {
    title: 'Postpartum care changes outcomes',
    text: 'Consistent postpartum support improves healing, emotional wellbeing, and confidence during the earliest weeks after birth.',
    author: 'Maternal Health Review',
  },
  {
    title: 'Home nursing care restores comfort',
    text: 'Care delivered in the home often improves rest, lowers stress, and helps families feel safer through recovery.',
    author: 'Journal of Community Nursing',
  },
  {
    title: 'Personalized care builds trust',
    text: 'When care plans are tailored to each woman, adherence improves and long-term recovery experiences become more positive.',
    author: "Women's Health Collaborative",
  },
  {
    title: 'Compassion is clinical excellence',
    text: 'Skilled care and emotional reassurance together create the strongest foundation for recovery and family wellbeing.',
    author: 'Family Care Standards Forum',
  },
]

/** Purple editorial quote carousel between testimonials and booking. Set `true` to show again. */
const showCareQuoteCarousel = false

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(services[0].name)
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactSubmitting, setContactSubmitting] = useState(false)
  const [contactError, setContactError] = useState(null)
  const [contactHoneypot, setContactHoneypot] = useState('')
  const [openFaq, setOpenFaq] = useState(0)
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [bookingSubmitted, setBookingSubmitted] = useState(false)
  const [bookingSubmitting, setBookingSubmitting] = useState(false)
  const [bookingError, setBookingError] = useState(null)
  const [bookingHoneypot, setBookingHoneypot] = useState('')

  const [bookingForm, setBookingForm] = useState({
    service: services[0].name,
    fullName: '',
    email: '',
    phone: '',
    preferredContact: '',
    notes: '',
  })

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: '',
    message: '',
  })

  const openBookingForService = (serviceName) => {
    setSelectedService(serviceName)
    setBookingSubmitted(false)
    setBookingError(null)
    setBookingHoneypot('')
    setBookingForm({
      service: serviceName,
      fullName: '',
      email: '',
      phone: '',
      preferredContact: '',
      notes: '',
    })
    setIsBookingModalOpen(true)
  }

  const handleBookingSubmit = async (event) => {
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
        service: bookingForm.service,
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

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    setContactError(null)
    setContactSubmitting(true)
    try {
      await submitForm({
        formType: 'contact',
        honeypot: contactHoneypot,
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        serviceInterest: contactForm.serviceInterest,
        message: contactForm.message,
      })
      setContactSubmitted(true)
      setContactHoneypot('')
      setContactForm({
        name: '',
        email: '',
        phone: '',
        serviceInterest: '',
        message: '',
      })
    } catch (error) {
      setContactError(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setContactSubmitting(false)
    }
  }

  const closeBookingModal = () => {
    setIsBookingModalOpen(false)
  }

  const showPreviousQuote = () => {
    setQuoteIndex((index) => (index - 1 + careQuotes.length) % careQuotes.length)
  }

  const showNextQuote = () => {
    setQuoteIndex((index) => (index + 1) % careQuotes.length)
  }

  return (
    <div className="min-h-screen bg-cream">

      {/* ── Header ───────────────────────────────────────────────── */}
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
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>

          <nav className="ml-auto hidden items-center gap-8 pr-1 text-sm font-medium text-charcoal/85 sm:flex">
            <a href="#services" className="transition hover:text-charcoal">
              Services
            </a>
            <a href="#contact" className="transition hover:text-charcoal">
              Contact
            </a>
            <button
              type="button"
              onClick={() => openBookingForService(selectedService)}
              className="transition hover:text-charcoal"
            >
              Booking
            </button>
          </nav>
        </div>

        {mobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="space-y-1 px-5 pb-4 pt-0 text-sm font-medium text-charcoal sm:hidden"
          >
            <a href="#services" className="block rounded-xl px-3 py-3 hover:bg-cream">
              Services
            </a>
            <a href="#contact" className="block rounded-xl px-3 py-3 hover:bg-cream">
              Contact
            </a>
            <button
              type="button"
              onClick={() => openBookingForService(selectedService)}
              className="block w-full rounded-xl px-3 py-3 text-left hover:bg-cream"
            >
              Booking
            </button>
          </nav>
        )}
      </header>

      <main>

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="relative pt-16 sm:pt-[74px]">
          {/* Mobile: image first, copy below — avoids the text card covering the bottom of the photo (baby). sm+: full-bleed + overlay card. */}
          <div className="relative flex flex-col sm:block sm:h-[95svh] sm:min-h-[640px] sm:max-h-[960px] lg:h-[94vh] lg:max-h-[1000px]">
            <div className="relative h-[58svh] min-h-[380px] max-h-[560px] w-full shrink-0 overflow-hidden sm:absolute sm:inset-0 sm:h-full sm:max-h-none sm:min-h-0">
              <picture>
                <source media="(max-width: 639px)" srcSet={mobileHero} />
                <img
                  src={desktopHero}
                  alt="Premier Doulas caregiver supporting a mother and newborn at home"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_62%] sm:object-[50%_72%] lg:object-[50%_68%]"
                />
              </picture>

              <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-charcoal/28 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 hidden h-64 bg-gradient-to-t from-cream/95 to-transparent sm:block" />
            </div>

            <div className="relative z-10 sm:absolute sm:inset-0 sm:flex sm:items-center">
              <div className="mx-auto w-full max-w-7xl px-0 sm:px-7 lg:px-10">
                <div className="w-full sm:max-w-[470px] lg:max-w-[520px]">
                  <div className="bg-cream px-5 py-6 sm:rounded-sm sm:bg-cream/90 sm:px-8 sm:py-9 sm:shadow-sm sm:backdrop-blur-sm lg:px-10 lg:py-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-goldDeep">
                      Premium in-home care
                    </p>
                    <h1 className="mt-3 font-heading text-[1.75rem] leading-[1.08] tracking-tight text-charcoal sm:text-[2.3rem] lg:text-[2.7rem]">
                      Compassionate care for mothers and babies.
                    </h1>
                    <p className="mt-4 text-sm leading-relaxed text-charcoal/80 sm:max-w-xs sm:text-base">
                      Postpartum, infant, and lactation support at home.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                      <button
                        type="button"
                        onClick={() => openBookingForService(selectedService)}
                        className="inline-flex w-full items-center justify-center rounded-none bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal transition hover:bg-goldDeep sm:w-auto"
                      >
                        Request Consultation
                      </button>
                      <a
                        href="#services"
                        className="text-sm font-medium text-charcoal/75 transition hover:text-charcoal"
                      >
                        Our services ↓
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust stats bar ──────────────────────────────────────── */}
        <section className="border-b border-beige bg-white py-8 sm:py-10">
          <div className="mx-auto w-full max-w-3xl px-5 sm:px-7 lg:px-10">
            <div className="grid grid-cols-3 divide-x divide-beige text-center">
              {trustStats.map(({ value, label }) => (
                <div key={label} className="px-4 sm:px-8">
                  <p className="font-heading text-2xl text-charcoal sm:text-3xl lg:text-4xl">{value}</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-charcoal/50 sm:text-xs">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services grid ────────────────────────────────────────── */}
        <section id="services" className="bg-cream py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10">
            <div className="mb-12 text-center sm:mb-14">
              <div className="mx-auto mb-4 h-0.5 w-12 bg-gold" />
              <h2 className="font-heading text-3xl text-charcoal sm:text-4xl">My Services</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-charcoal/80 sm:text-base">
                Premium in-home care tailored to every stage of early motherhood.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7 lg:gap-8">
              {services.map((service) => (
                <article key={service.id} className="group flex flex-col overflow-hidden rounded-2xl border border-beige/90 bg-white shadow-soft">
                  <div className="overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="aspect-[4/3] w-full object-cover object-[50%_64%] transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-goldDeep">
                      {service.name}
                    </p>
                    <h3 className="mt-1.5 font-heading text-2xl text-charcoal">
                      {serviceDisplayName[service.id] ?? service.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/80">
                      {service.description}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-beige pt-5">
                      <Link
                        to={`/services/${service.id}`}
                        className="inline-flex items-center justify-center rounded-none border border-charcoal/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal transition hover:bg-sand"
                      >
                        View Service
                      </Link>
                      <button
                        type="button"
                        onClick={() => openBookingForService(service.name)}
                        className="text-xs font-semibold uppercase tracking-[0.14em] text-goldDeep transition hover:text-charcoal"
                      >
                        Book →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────────── */}
        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10">
            <div className="mb-10 text-center sm:mb-12">
              <div className="mx-auto mb-4 h-0.5 w-12 bg-gold" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-goldDeep">
                Client stories
              </p>
              <h2 className="mt-2 font-heading text-3xl text-charcoal sm:text-4xl">
                What families are saying
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="flex flex-col rounded-2xl border border-beige bg-cream p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md sm:p-7"
                >
                  <span
                    className="select-none font-heading text-5xl leading-none text-gold/40"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/80 sm:text-base">
                    {testimonial.quote}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-beige pt-4">
                    <div>
                      <p className="text-sm font-semibold text-charcoal">{testimonial.name}</p>
                      <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.14em] text-goldDeep">
                        {testimonial.service}
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-1"
                      role="img"
                      aria-label={`${testimonial.stars} out of 5 stars`}
                    >
                      {Array.from({ length: testimonial.stars }).map((_, i) => (
                        <span
                          key={i}
                          className="inline-block h-1.5 w-1.5 rounded-full bg-gold"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quote carousel ───────────────────────────────────────── */}
        <section
          className={`bg-white py-10 sm:py-12 lg:py-14${showCareQuoteCarousel ? '' : ' hidden'}`}
          aria-hidden={!showCareQuoteCarousel}
        >
          <div className="mx-auto w-full max-w-[90rem] px-3 sm:px-5 lg:px-8">
            <div className="relative min-h-[520px] overflow-hidden bg-gradient-to-br from-[#8d737d] via-[#7b6671] to-[#6a5964] px-6 py-14 text-center text-cream sm:min-h-[590px] sm:px-12 sm:py-16 md:min-h-[640px] md:px-16 md:py-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14)_0%,transparent_45%),radial-gradient(circle_at_80%_85%,rgba(255,255,255,0.1)_0%,transparent_40%)]" />
              <img
                src={doulaLogo}
                alt="Premier Doulas logo mark"
                className="relative mx-auto h-20 w-auto opacity-75 sm:h-24 md:h-28"
              />
              <p className="relative mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-cream/85 sm:text-base">
                {careQuotes[quoteIndex].title}
              </p>
              <p className="relative mx-auto mt-6 max-w-5xl font-heading text-3xl leading-snug text-cream sm:text-4xl lg:text-5xl">
                {careQuotes[quoteIndex].text}
              </p>
              <div className="relative mt-7 space-y-1 text-base text-cream/90 sm:text-lg">
                <p className="font-semibold">{careQuotes[quoteIndex].author}</p>
                <p className="text-sm sm:text-base">{`${quoteIndex + 1} of ${careQuotes.length}`}</p>
              </div>
              <div className="relative mt-8 flex items-center justify-center gap-4 md:mt-0">
                <button
                  type="button"
                  onClick={showPreviousQuote}
                  aria-label="Show previous quote"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/70 text-xl text-cream transition hover:bg-cream/15 md:absolute md:left-8 md:top-1/2 md:-translate-y-1/2"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={showNextQuote}
                  aria-label="Show next quote"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/70 text-xl text-cream transition hover:bg-cream/15 md:absolute md:right-8 md:top-1/2 md:-translate-y-1/2"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Two-tone booking CTA ─────────────────────────────────── */}
        <section id="booking" className="overflow-hidden">
          <div className="mx-auto max-w-[90rem]">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative min-h-[300px] md:min-h-0">
                <img
                  src={doulaNewImage}
                  alt="Premier Doulas personalized care at home"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col justify-center bg-charcoal px-7 py-12 sm:px-10 sm:py-16 md:px-12 md:py-20">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                  Get started
                </p>
                <h2 className="mt-3 font-heading text-3xl text-cream sm:text-4xl">
                  Begin your care journey.
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70 sm:text-base">
                  Share a few details and we&apos;ll reach out to schedule your private consultation at no cost.
                </p>
                <div className="mt-7">
                  <button
                    type="button"
                    onClick={() => openBookingForService(selectedService)}
                    className="inline-flex items-center justify-center rounded-none bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal transition hover:bg-goldDeep"
                  >
                    Request Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact form ─────────────────────────────────────────── */}
        <section id="contact" className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-goldDeep">
                Get in touch
              </p>
              <h2 className="mt-2 text-3xl text-charcoal sm:text-4xl">Not ready to schedule yet?</h2>
              <p className="mt-2 text-sm text-charcoal/75 sm:text-base">
                Send a quick message and our team will reach out with guidance.
              </p>
            </div>
            <form
              onSubmit={handleContactSubmit}
              className="relative grid grid-cols-1 gap-4 rounded-3xl border border-beige bg-cream p-5 sm:p-8 lg:grid-cols-2"
            >
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
                    value={contactHoneypot}
                    onChange={(event) => setContactHoneypot(event.target.value)}
                  />
                </label>
              </div>
              <label className="space-y-1.5">
                <span className="text-sm font-medium text-charcoal">Name</span>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(event) =>
                    setContactForm((previous) => ({ ...previous, name: event.target.value }))
                  }
                  className="w-full rounded-xl border border-beige bg-white px-3 py-3 text-sm text-charcoal outline-none transition focus:border-gold"
                  required
                />
              </label>
              <label className="space-y-1.5">
                <span className="text-sm font-medium text-charcoal">Email</span>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(event) =>
                    setContactForm((previous) => ({ ...previous, email: event.target.value }))
                  }
                  className="w-full rounded-xl border border-beige bg-white px-3 py-3 text-sm text-charcoal outline-none transition focus:border-gold"
                  required
                />
              </label>
              <label className="space-y-1.5">
                <span className="text-sm font-medium text-charcoal">Phone</span>
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(event) =>
                    setContactForm((previous) => ({ ...previous, phone: event.target.value }))
                  }
                  className="w-full rounded-xl border border-beige bg-white px-3 py-3 text-sm text-charcoal outline-none transition focus:border-gold"
                />
              </label>
              <label className="space-y-1.5">
                <span className="text-sm font-medium text-charcoal">Service of interest</span>
                <div className="relative">
                  <select
                    value={contactForm.serviceInterest}
                    onChange={(event) =>
                      setContactForm((previous) => ({
                        ...previous,
                        serviceInterest: event.target.value,
                      }))
                    }
                    className="w-full appearance-none rounded-xl border border-beige bg-white px-3 py-3 pr-11 text-sm text-charcoal outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                  >
                    <option value="">Select one</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.name}>
                        {serviceDisplayName[service.id] ?? service.name}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-charcoal/55">
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="m5.5 7.5 4.5 4.8 4.5-4.8" />
                    </svg>
                  </span>
                </div>
              </label>
              <label className="space-y-1.5 lg:col-span-2">
                <span className="text-sm font-medium text-charcoal">Message</span>
                <textarea
                  rows={4}
                  value={contactForm.message}
                  onChange={(event) =>
                    setContactForm((previous) => ({ ...previous, message: event.target.value }))
                  }
                  className="w-full rounded-xl border border-beige bg-white px-3 py-3 text-sm text-charcoal outline-none transition focus:border-gold"
                  required
                />
              </label>
              <div className="relative lg:col-span-2">
                <button
                  type="submit"
                  disabled={contactSubmitting}
                  className="inline-flex items-center justify-center rounded-none bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal transition hover:bg-goldDeep disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {contactSubmitting ? 'Sending…' : 'Send Message'}
                </button>
                {contactError && (
                  <p className="mt-3 text-sm text-red-700" role="alert">
                    {contactError}
                  </p>
                )}
                {contactSubmitted && (
                  <p className="mt-3 text-sm text-charcoal/75">
                    Thank you. We received your message and will follow up soon.
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section id="faq" className="bg-cream py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-5xl px-5 sm:px-7 lg:px-10">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 h-0.5 w-12 bg-gold" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-goldDeep">FAQ</p>
              <h2 className="mt-2 text-3xl text-charcoal sm:text-4xl">Common questions</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <article key={faq.question} className="overflow-hidden rounded-2xl border border-beige bg-white transition hover:shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpenFaq((current) => (current === index ? -1 : index))}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-sand sm:px-6"
                  >
                    <span className="font-medium text-charcoal">{faq.question}</span>
                    <span className="shrink-0 text-xl text-goldDeep">{openFaq === index ? '−' : '+'}</span>
                  </button>
                  {openFaq === index && (
                    <div className="border-t border-beige px-5 py-4 text-sm leading-relaxed text-charcoal/75 sm:px-6">
                      {faq.answer}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── Booking modal ────────────────────────────────────────── */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/55 p-4 sm:p-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Consultation booking"
            className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-beige bg-white shadow-2xl"
          >
            <button
              type="button"
              onClick={closeBookingModal}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/20 bg-white text-charcoal transition hover:bg-sand"
              aria-label="Close booking modal"
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
                    {selectedService} Consultation
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

                <form onSubmit={handleBookingSubmit} className="relative space-y-4 p-6 sm:p-8">
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
                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium text-charcoal">Service of interest</span>
                    <div className="relative">
                      <select
                        value={bookingForm.service}
                        onChange={(event) =>
                          setBookingForm((previous) => ({ ...previous, service: event.target.value }))
                        }
                        className="w-full appearance-none rounded-xl border border-beige bg-cream px-3 py-3 pr-11 text-sm text-charcoal outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.name}>
                            {serviceDisplayName[s.id] ?? s.name}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-charcoal/55">
                        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="m5.5 7.5 4.5 4.8 4.5-4.8" />
                        </svg>
                      </span>
                    </div>
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
                    className="inline-flex w-full items-center justify-center rounded-none bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal transition hover:bg-goldDeep disabled:cursor-not-allowed disabled:opacity-60"
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
                  We&apos;ll be in touch soon to schedule your {bookingForm.service} consultation.
                </p>
                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="mt-6 inline-flex items-center justify-center rounded-none bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal transition hover:bg-goldDeep"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-charcoal/10 bg-sand px-5 py-9 sm:px-7 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 text-sm text-charcoal/75 sm:flex-row sm:items-center sm:justify-between">
          <p>Premier Doulas, premium personalized care for women.</p>
          <p>Postpartum, infant, and lactation support.</p>
        </div>
      </footer>

    </div>
  )
}

export default App
