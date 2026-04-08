import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import doulaHero from './assets/doulahero.png'
import doulaLogo from './assets/doula.svg'
import momNewbornImage from './assets/momnewborn.png'
import doulaNewImage from './assets/doulanew.png'
import { faqs, services } from './data/services'

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
    author: 'Women’s Health Collaborative',
  },
  {
    title: 'Compassion is clinical excellence',
    text: 'Skilled care and emotional reassurance together create the strongest foundation for recovery and family wellbeing.',
    author: 'Family Care Standards Forum',
  },
]

const showCommunitySection = false
const showcaseOrder = ['postpartum-care', 'concierge-care', 'post-operative-care']

const showcaseCopy = {
  'postpartum-care': {
    eyebrow: 'Postpartum Care',
    heading: 'Newborn Care',
    subheading: 'Private support for a calmer fourth trimester',
    details: [
      'Our postpartum team provides attentive in-home care focused on maternal recovery, newborn guidance, and day-to-night reassurance.',
      'Each care plan is personalized to your routines, feeding preferences, and desired level of hands-on support, so home feels steady and peaceful from the start.',
    ],
  },
  'concierge-care': {
    eyebrow: 'Concierge Care',
    heading: 'Concierge Care',
    subheading: 'Flexible support tailored to your lifestyle',
    details: [
      'Concierge care blends practical home assistance with elevated personal support, giving you dependable help where it matters most day to day.',
      'From routine coordination to tailored add-ons, your service plan stays adaptable as priorities shift, so you always feel supported without added stress.',
    ],
  },
  'post-operative-care': {
    eyebrow: 'Post-Operative Care',
    heading: 'Post-Op Recovery',
    subheading: 'Discreet in-home support for steadier healing',
    details: [
      'We deliver focused post-operative care that prioritizes comfort, mobility assistance, and consistent routines during your recovery period.',
      'With thoughtful check-ins and personalized guidance at home, you can heal with greater confidence while reducing overwhelm for you and your family.',
    ],
  },
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showFloatingHeader, setShowFloatingHeader] = useState(false)
  const [selectedService, setSelectedService] = useState(services[0].name)
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [communitySubmitted, setCommunitySubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [bookingStep, setBookingStep] = useState('calendar')
  const [schedulerMonth, setSchedulerMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  )

  const [bookingForm, setBookingForm] = useState({
    service: services[0].name,
    fullName: '',
    email: '',
    phone: '',
    notes: '',
  })

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: '',
    message: '',
  })

  const [communityForm, setCommunityForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
  })

  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Toronto',
    'UTC',
  ]

  const availableTimes = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM']

  const monthLabel = schedulerMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })

  const calendarDays = useMemo(() => {
    const year = schedulerMonth.getFullYear()
    const month = schedulerMonth.getMonth()
    const firstDayIndex = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const slots = Array.from({ length: firstDayIndex }, () => null)
    for (let day = 1; day <= daysInMonth; day += 1) {
      slots.push(new Date(year, month, day))
    }
    return slots
  }, [schedulerMonth])

  const openBookingForService = (serviceName) => {
    setSelectedService(serviceName)
    setBookingStep('calendar')
    setSelectedDate(null)
    setSelectedTime('')
    setBookingForm((previous) => ({
      ...previous,
      service: serviceName,
      fullName: '',
      email: '',
      phone: '',
      notes: '',
    }))
    setIsBookingModalOpen(true)
  }

  const handleBookingSubmit = (event) => {
    event.preventDefault()
    setBookingStep('confirmed')
  }

  const handleContactSubmit = (event) => {
    event.preventDefault()
    setContactSubmitted(true)
  }

  const handleCommunitySubmit = (event) => {
    event.preventDefault()
    setCommunitySubmitted(true)
  }

  const closeBookingModal = () => {
    setIsBookingModalOpen(false)
  }

  const showPreviousMonth = () => {
    setSchedulerMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))
  }

  const showNextMonth = () => {
    setSchedulerMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))
  }

  const showPreviousQuote = () => {
    setQuoteIndex((index) => (index - 1 + careQuotes.length) % careQuotes.length)
  }

  const showNextQuote = () => {
    setQuoteIndex((index) => (index + 1) % careQuotes.length)
  }

  const canContinueToDetails = Boolean(selectedDate && selectedTime)

  const selectedDateLabel = selectedDate
    ? selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : ''

  const timezoneLabel = selectedTimezone.replace('_', ' ')

  const isDateSelected = (dateValue) =>
    selectedDate &&
    selectedDate.getFullYear() === dateValue.getFullYear() &&
    selectedDate.getMonth() === dateValue.getMonth() &&
    selectedDate.getDate() === dateValue.getDate()

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.72
      setShowFloatingHeader(window.scrollY > threshold)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!showFloatingHeader && mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }, [showFloatingHeader, mobileMenuOpen])

  return (
    <div className="min-h-screen bg-cream">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          showFloatingHeader
            ? 'border-b border-charcoal/12 bg-cream/90 shadow-sm backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 sm:px-7 sm:py-3.5 lg:px-10 lg:py-4">
          <Link to="/" className="flex items-center gap-3" aria-label="Premier Doula home">
            <img src={doulaLogo} alt="Premier Doula" className="h-12 w-auto object-contain sm:h-14" />
            <span
              className={`whitespace-nowrap font-heading text-lg tracking-wide transition-colors sm:text-xl ${
                showFloatingHeader ? 'text-charcoal' : 'text-cream'
              }`}
            >
              Premier Doula
            </span>
          </Link>

          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-none border px-3 py-1.5 text-sm font-medium transition sm:hidden ${
              showFloatingHeader
                ? 'border-charcoal/15 text-charcoal hover:bg-sand'
                : 'border-cream/50 text-cream hover:bg-cream/15'
            }`}
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            Menu
          </button>

          <nav
            className={`ml-auto hidden items-center justify-end gap-7 pr-1 text-sm font-medium sm:flex ${
              showFloatingHeader ? 'text-taupe' : 'text-cream/90'
            }`}
          >
            <a href="#services" className={`transition ${showFloatingHeader ? 'hover:text-charcoal' : 'hover:text-cream'}`}>
              Services
            </a>
            <a href="#contact" className={`transition ${showFloatingHeader ? 'hover:text-charcoal' : 'hover:text-cream'}`}>
              Contact
            </a>
            <button
              type="button"
              onClick={() => openBookingForService(selectedService)}
              className={`transition ${showFloatingHeader ? 'hover:text-charcoal' : 'hover:text-cream'}`}
            >
              Booking
            </button>
          </nav>
        </div>

        {mobileMenuOpen && (
          <nav
            id="mobile-menu"
            className={`space-y-2 border-t px-5 py-4 text-sm font-medium sm:hidden ${
              showFloatingHeader
                ? 'border-charcoal/10 bg-sand text-charcoal'
                : 'border-cream/30 bg-charcoal/70 text-cream backdrop-blur-md'
            }`}
          >
            <a href="#services" className={`block rounded-lg px-3 py-2 ${showFloatingHeader ? 'hover:bg-cream' : 'hover:bg-cream/15'}`}>
              Services
            </a>
            <a href="#contact" className={`block rounded-lg px-3 py-2 ${showFloatingHeader ? 'hover:bg-cream' : 'hover:bg-cream/15'}`}>
              Contact
            </a>
            <button
              type="button"
              onClick={() => openBookingForService(selectedService)}
              className={`block w-full rounded-lg px-3 py-2 text-left ${showFloatingHeader ? 'hover:bg-cream' : 'hover:bg-cream/15'}`}
            >
              Booking
            </button>
          </nav>
        )}
      </header>

      <main>
        <section className="relative h-[100svh] min-h-[620px] sm:min-h-screen">
          <div className="relative h-[100svh] min-h-[620px] w-full overflow-hidden sm:min-h-screen">
            <img
              src={doulaHero}
              alt="Premier Doula caregiver supporting a mother and newborn at home"
              className="absolute inset-0 h-full w-full object-cover object-[72%_center] sm:object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/10 via-charcoal/30 to-charcoal/55" />
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10">
                <div className="max-w-[640px] text-left lg:max-w-[700px]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/85 sm:text-sm">
                    Premium in-home women&apos;s care
                  </p>
                  <h1 className="mt-3 font-heading text-[2.25rem] leading-[1.03] tracking-tight text-cream sm:text-5xl lg:text-6xl">
                    Personalized care for recovery, comfort, and peace of mind.
                  </h1>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream/90 sm:text-base">
                    Thoughtful postpartum, post-operative, and concierge care delivered with
                    warmth and discretion in the comfort of your home.
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={() => openBookingForService(services[0].name)}
                      className="inline-flex items-center justify-center rounded-none bg-gold px-7 py-3 text-sm font-semibold text-charcoal shadow-soft transition hover:bg-goldDeep sm:text-base"
                    >
                      Book Consultation
                    </button>
                    <a
                      href="#services"
                      className="inline-flex items-center justify-center rounded-none border border-cream/70 bg-cream/10 px-7 py-3 text-sm font-semibold text-cream transition hover:bg-cream/20 sm:text-base"
                    >
                      View Services
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <a href="#services" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-cream/70">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">Scroll</span>
              <span className="mt-1 flex flex-col items-center leading-none">
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4 animate-bounce text-cream/45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="m5.5 7.5 4.5 4.8 4.5-4.8" />
                </svg>
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4 animate-bounce text-cream/35"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  style={{ animationDelay: '180ms' }}
                >
                  <path d="m5.5 7.5 4.5 4.8 4.5-4.8" />
                </svg>
              </span>
            </a>
          </div>
        </section>

        <section className="space-y-10 bg-white py-12 sm:space-y-12 sm:py-14 lg:space-y-16 lg:py-16">
          {showcaseOrder.map((serviceId, index) => {
            const service = services.find((item) => item.id === serviceId)
            if (!service) return null

            const content = showcaseCopy[serviceId]
            const showcaseImage = serviceId === 'postpartum-care' ? momNewbornImage : service.image
            const isReversed = index % 2 === 1

            return (
              <div
                key={service.id}
                className="grid w-full gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16"
              >
                <div className={isReversed ? 'lg:order-2' : 'lg:order-1'}>
                  <img
                    src={showcaseImage}
                    alt={service.name}
                    className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px]"
                  />
                </div>
                <div
                  className={`px-5 sm:px-7 ${
                    isReversed ? 'lg:order-1 lg:pl-10 lg:pr-6' : 'lg:order-2 lg:pl-14 lg:pr-16'
                  } ${index === 0 ? 'lg:-mt-6' : ''}`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-goldDeep">
                    {content.eyebrow}
                  </p>
                  <h2 className="mt-2 font-heading text-[2.3rem] uppercase tracking-[0.06em] text-charcoal sm:text-5xl">
                    {content.heading}
                  </h2>
                  <div className="mt-12 max-w-xl space-y-5 text-taupe lg:mt-16">
                    <p className="font-heading text-[1.7rem] leading-tight text-charcoal sm:text-[2rem]">
                      {content.subheading}
                    </p>
                    {content.details.map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-relaxed sm:text-base">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Link
                      to={`/services/${service.id}`}
                      className="inline-flex items-center justify-center rounded-none border border-charcoal/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal transition hover:bg-sand"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </section>

        <section id="services" className="bg-cream py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10">
            <div className="mb-10 space-y-3 text-center sm:mb-12">
              <div className="mx-auto h-px w-12 bg-gold/80" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-goldDeep">Our Services</p>
              <h2 className="mx-auto max-w-4xl text-3xl leading-tight text-charcoal sm:text-4xl lg:text-5xl">
                Care that meets you exactly where you are.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="overflow-hidden rounded-3xl border border-beige bg-white shadow-soft transition duration-300 hover:-translate-y-1"
                >
                  <img src={service.image} alt={service.name} className="h-56 w-full object-cover" />
                  <div className="space-y-4 p-6">
                    <h3 className="font-heading text-3xl leading-tight text-charcoal">{service.name}</h3>
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-goldDeep">
                      Starting at {service.startingAt}
                    </p>
                    <p className="text-sm leading-relaxed text-taupe sm:text-base">{service.description}</p>
                    <Link
                      to={`/services/${service.id}`}
                      className="inline-flex w-full items-center justify-center rounded-none bg-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal transition hover:bg-goldDeep"
                    >
                      Learn More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-white py-10 sm:py-12 lg:py-14">
          <div className="mx-auto w-full max-w-[90rem] px-3 sm:px-5 lg:px-8">
            <div className="relative min-h-[520px] overflow-hidden bg-gradient-to-br from-[#8d737d] via-[#7b6671] to-[#6a5964] px-6 py-14 text-center text-cream sm:min-h-[590px] sm:px-12 sm:py-16 md:min-h-[640px] md:px-16 md:py-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14)_0%,transparent_45%),radial-gradient(circle_at_80%_85%,rgba(255,255,255,0.1)_0%,transparent_40%)]" />
              <img
                src={doulaLogo}
                alt="Premier Doula logo mark"
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

        <section id="booking" className="bg-sand py-14 sm:py-16">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10">
            <div className="rounded-3xl border border-beige bg-white p-6 text-center shadow-soft sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-goldDeep">
                Interactive scheduler
              </p>
              <h2 className="mt-2 text-3xl text-charcoal sm:text-4xl">Book directly in our calendar</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-taupe sm:text-base">
                Choose your date, time, and timezone in our concierge booking modal.
              </p>
              <button
                type="button"
                onClick={() => openBookingForService(selectedService)}
                className="mt-6 inline-flex items-center justify-center rounded-none bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal transition hover:bg-goldDeep"
              >
                Open Booking Calendar
              </button>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10">
            <div className="mb-8">
              <h2 className="text-3xl text-charcoal sm:text-4xl">Not ready to schedule yet?</h2>
              <p className="mt-2 text-sm text-taupe sm:text-base">
                Send a quick message and our team will reach out with guidance.
              </p>
            </div>
            <form
              onSubmit={handleContactSubmit}
              className="grid grid-cols-1 gap-4 rounded-3xl border border-beige bg-cream p-5 sm:p-8 lg:grid-cols-2"
            >
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
                        {service.name}
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
              <div className="lg:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-none bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal transition hover:bg-goldDeep"
                >
                  Send Message
                </button>
                {contactSubmitted && (
                  <p className="mt-3 text-sm text-taupe">
                    Thank you. We received your message and will follow up soon.
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>

        {showCommunitySection && (
          <section className="bg-[#faf6f0] py-16 sm:py-20 lg:py-24">
            <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-7 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-10">
              <div className="relative mx-auto w-full max-w-2xl lg:max-w-3xl">
                <img
                  src={doulaNewImage}
                  alt="Mother and baby in warm embrace"
                  className="relative h-auto w-full scale-125 object-contain sm:scale-[1.3]"
                />
              </div>

              <div>
                <h2 className="text-4xl text-charcoal sm:text-5xl">Join the Community.</h2>
                <p className="mt-3 text-sm text-taupe sm:text-base">
                  Join our powerful community of mothers, experts, and advocates for elevated
                  postpartum care.
                </p>
                <p className="mt-3 text-sm text-taupe sm:text-base">
                  Whatever move we make next, you&apos;ll be the first to know.
                </p>

                <form
                  onSubmit={handleCommunitySubmit}
                  className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  <input
                    placeholder="First Name"
                    value={communityForm.firstName}
                    onChange={(event) =>
                      setCommunityForm((previous) => ({ ...previous, firstName: event.target.value }))
                    }
                    required
                    className="rounded-md border border-beige bg-white px-3 py-3 text-sm text-charcoal outline-none transition focus:border-gold"
                  />
                  <input
                    placeholder="Last Name"
                    value={communityForm.lastName}
                    onChange={(event) =>
                      setCommunityForm((previous) => ({ ...previous, lastName: event.target.value }))
                    }
                    required
                    className="rounded-md border border-beige bg-white px-3 py-3 text-sm text-charcoal outline-none transition focus:border-gold"
                  />
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={communityForm.email}
                    onChange={(event) =>
                      setCommunityForm((previous) => ({ ...previous, email: event.target.value }))
                    }
                    required
                    className="rounded-md border border-beige bg-white px-3 py-3 text-sm text-charcoal outline-none transition focus:border-gold sm:col-span-2"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={communityForm.phone}
                    onChange={(event) =>
                      setCommunityForm((previous) => ({ ...previous, phone: event.target.value }))
                    }
                    className="rounded-md border border-beige bg-white px-3 py-3 text-sm text-charcoal outline-none transition focus:border-gold sm:col-span-2"
                  />
                  <input
                    placeholder="City"
                    value={communityForm.city}
                    onChange={(event) =>
                      setCommunityForm((previous) => ({ ...previous, city: event.target.value }))
                    }
                    className="rounded-md border border-beige bg-white px-3 py-3 text-sm text-charcoal outline-none transition focus:border-gold"
                  />
                  <input
                    placeholder="State"
                    value={communityForm.state}
                    onChange={(event) =>
                      setCommunityForm((previous) => ({ ...previous, state: event.target.value }))
                    }
                    className="rounded-md border border-beige bg-white px-3 py-3 text-sm text-charcoal outline-none transition focus:border-gold"
                  />

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-none bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal transition hover:bg-goldDeep"
                    >
                      Join Now
                    </button>
                    {communitySubmitted && (
                      <p className="mt-3 text-sm text-taupe">
                        Thank you for joining. We&apos;ll share updates with you soon.
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </section>
        )}

        <section id="faq" className="bg-cream py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-5xl px-5 sm:px-7 lg:px-10">
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-goldDeep">FAQ</p>
              <h2 className="mt-2 text-3xl text-charcoal sm:text-4xl">Common questions</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <article key={faq.question} className="overflow-hidden rounded-2xl border border-beige bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenFaq((current) => (current === index ? -1 : index))}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-sand sm:px-6"
                  >
                    <span className="font-medium text-charcoal">{faq.question}</span>
                    <span className="text-xl text-goldDeep">{openFaq === index ? '−' : '+'}</span>
                  </button>
                  {openFaq === index && (
                    <div className="border-t border-beige px-5 py-4 text-sm leading-relaxed text-taupe sm:px-6">
                      {faq.answer}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {isBookingModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/55 p-4 sm:p-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Consultation booking calendar"
            className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-beige bg-white shadow-2xl"
          >
            <button
              type="button"
              onClick={closeBookingModal}
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/20 bg-white text-charcoal transition hover:bg-sand"
              aria-label="Close booking modal"
            >
              ×
            </button>

            {bookingStep === 'calendar' && (
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="border-b border-beige bg-cream p-6 sm:p-8 lg:border-b-0 lg:border-r">
                  <img src={doulaLogo} alt="Premier Doula logo" className="h-16 w-auto object-contain" />
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-goldDeep">
                    Premier Doula Reservations
                  </p>
                  <h3 className="mt-2 font-heading text-4xl leading-tight text-charcoal">
                    {selectedService} Consultation
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-taupe sm:text-base">
                    Book a private consultation and we&apos;ll recommend the best care plan for your
                    timeline, goals, and support preferences.
                  </p>
                  <div className="mt-6 space-y-2 text-sm text-charcoal/80">
                    <p>• 20 minute consultation</p>
                    <p>• Phone or virtual call</p>
                    <p>• Personalized next-step guidance</p>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-3xl text-charcoal">Select a Date & Time</h3>
                  <div className="mt-5 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={showPreviousMonth}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition hover:bg-sand"
                      aria-label="Previous month"
                    >
                      ←
                    </button>
                    <p className="font-medium text-charcoal">{monthLabel}</p>
                    <button
                      type="button"
                      onClick={showNextMonth}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition hover:bg-sand"
                      aria-label="Next month"
                    >
                      →
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs font-semibold tracking-[0.08em] text-taupe">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>
                  <div className="mt-2 grid grid-cols-7 gap-2">
                    {calendarDays.map((dayValue, index) =>
                      dayValue ? (
                        <button
                          key={`${dayValue.toISOString()}-${index}`}
                          type="button"
                          onClick={() => setSelectedDate(dayValue)}
                          className={`h-10 rounded-full text-sm font-medium transition ${
                            isDateSelected(dayValue)
                              ? 'bg-[#0f4a6f] text-white'
                              : 'text-charcoal hover:bg-sand'
                          }`}
                        >
                          {dayValue.getDate()}
                        </button>
                      ) : (
                        <span key={`empty-${index}`} />
                      ),
                    )}
                  </div>

                  <div className="mt-6">
                    <p className="text-sm font-medium text-charcoal">Available times</p>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {availableTimes.map((timeValue) => (
                        <button
                          key={timeValue}
                          type="button"
                          onClick={() => setSelectedTime(timeValue)}
                          className={`rounded-xl border px-3 py-2 text-sm transition ${
                            selectedTime === timeValue
                              ? 'border-[#0f4a6f] bg-[#0f4a6f] text-white'
                              : 'border-beige text-charcoal hover:bg-sand'
                          }`}
                        >
                          {timeValue}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="text-sm font-medium text-charcoal" htmlFor="timezone-select">
                      Time zone
                    </label>
                    <div className="relative mt-2">
                      <select
                        id="timezone-select"
                        value={selectedTimezone}
                        onChange={(event) => setSelectedTimezone(event.target.value)}
                        className="w-full appearance-none rounded-xl border border-beige bg-cream px-3 py-3 pr-11 text-sm text-charcoal outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                      >
                        {timezones.map((timezone) => (
                          <option key={timezone} value={timezone}>
                            {timezone.replace('_', ' ')}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-charcoal/55">
                        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="m5.5 7.5 4.5 4.8 4.5-4.8" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setBookingStep('details')}
                    disabled={!canContinueToDetails}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-none bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal transition hover:bg-goldDeep disabled:cursor-not-allowed disabled:bg-gold/50 disabled:text-charcoal/70"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {bookingStep === 'details' && (
              <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-2">
                <div className="rounded-2xl border border-beige bg-cream p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-goldDeep">Selected slot</p>
                  <h3 className="mt-2 text-2xl text-charcoal">{bookingForm.service}</h3>
                  <p className="mt-3 text-sm text-taupe">{selectedDateLabel}</p>
                  <p className="mt-1 text-sm text-taupe">{selectedTime}</p>
                  <p className="mt-1 text-sm text-taupe">{timezoneLabel}</p>
                  <button
                    type="button"
                    onClick={() => setBookingStep('calendar')}
                    className="mt-5 inline-flex items-center justify-center rounded-none border border-charcoal/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal transition hover:bg-white"
                  >
                    Change time
                  </button>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-3">
                  <h3 className="text-2xl text-charcoal">Your details</h3>
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
                    <span className="text-sm font-medium text-charcoal">Care notes (optional)</span>
                    <textarea
                      rows={3}
                      value={bookingForm.notes}
                      onChange={(event) =>
                        setBookingForm((previous) => ({ ...previous, notes: event.target.value }))
                      }
                      className="w-full rounded-xl border border-beige bg-cream px-3 py-3 text-sm text-charcoal outline-none transition focus:border-gold"
                    />
                  </label>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-none bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal transition hover:bg-goldDeep"
                  >
                    Confirm Consultation
                  </button>
                </form>
              </div>
            )}

            {bookingStep === 'confirmed' && (
              <div className="p-7 text-center sm:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-goldDeep">Thank you</p>
                <h3 className="mt-2 text-3xl text-charcoal sm:text-4xl">
                  Your consultation is requested.
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm text-taupe sm:text-base">
                  We&apos;ll be in touch soon to finalize your booking details.
                </p>
                <p className="mt-3 text-sm text-taupe">
                  {bookingForm.service} • {selectedDateLabel} • {selectedTime}
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

      <footer className="border-t border-charcoal/10 bg-sand px-5 py-9 sm:px-7 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 text-sm text-taupe sm:flex-row sm:items-center sm:justify-between">
          <p>Premier Doula, premium personalized care for women.</p>
          <p>Postpartum, post-operative, and concierge support.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
