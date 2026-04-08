import { useEffect, useMemo, useState } from 'react'
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
import momNewbornImage from './assets/momnewborn.png'
import { services } from './data/services'

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
  'concierge-care': {
    whyTitle: 'Why families choose concierge care',
    whyCards: [
      'Flexible support around your exact schedule',
      'High-touch coordination for daily life and recovery',
      'Premium continuity from one trusted team',
    ],
    definitionTitle: 'What is concierge care?',
    definitionLeft:
      'Concierge care is personalized, lifestyle-integrated support designed for women who want dependable help beyond standard visit blocks. It is responsive, discreet, and tailored to evolving priorities.',
    definitionRight:
      'From home organization to recovery-focused routines, concierge care helps reduce mental load while preserving comfort and control. You receive practical support with a boutique level of service.',
    supportTitle: 'What concierge care includes',
    supportColumns: [
      {
        title: 'Lifestyle Support',
        bullets: ['Errands and coordination', 'Household flow assistance', 'Schedule-aligned support'],
      },
      {
        title: 'Care Coordination',
        bullets: [
          'Consistent communication',
          'Priority-based care planning',
          'Adjustments as needs evolve',
        ],
      },
      {
        title: 'Peace of Mind',
        bullets: ['Trusted ongoing partnership', 'Reduced daily pressure', 'Premium personalized service'],
      },
    ],
  },
  'post-operative-care': {
    whyTitle: 'Why families choose post-operative care',
    whyCards: [
      'Safer recovery with attentive home support',
      'Comfort and mobility assistance when you need it',
      'Reduced stress during a sensitive healing window',
    ],
    definitionTitle: 'What is post-operative care?',
    definitionLeft:
      'Post-operative care provides dedicated in-home support after procedures so recovery can happen with less strain and more consistency. It focuses on comfort, pacing, and practical assistance.',
    definitionRight:
      'We tailor support around your provider recommendations and personal preferences, helping you regain confidence at home while protecting rest, mobility, and healing progress.',
    supportTitle: 'What post-op support includes',
    supportColumns: [
      {
        title: 'Recovery Monitoring',
        bullets: ['Structured comfort check-ins', 'Routine consistency support', 'Attention to recovery goals'],
      },
      {
        title: 'Mobility & Comfort',
        bullets: [
          'Safe movement assistance',
          'Comfort-first environment setup',
          'Energy-conscious daily support',
        ],
      },
      {
        title: 'Personalized Care',
        bullets: ['Care adapted to your pace', 'Trusted communication', 'Calmer healing at home'],
      },
    ],
  },
}

const whyCardIconSets = {
  'postpartum-care': ['moon', 'lightbulb', 'heart'],
  'concierge-care': ['clock', 'clipboard', 'shield'],
  'post-operative-care': ['shield', 'activity', 'sparkle'],
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
  const serviceHeroImage = serviceId === 'postpartum-care' ? momNewbornImage : service?.image

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showFloatingHeader, setShowFloatingHeader] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [bookingStep, setBookingStep] = useState('calendar')
  const [schedulerMonth, setSchedulerMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  )
  const [bookingForm, setBookingForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    notes: '',
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

  const openBookingModal = () => {
    setBookingStep('calendar')
    setSelectedDate(null)
    setSelectedTime('')
    setBookingForm({
      fullName: '',
      email: '',
      phone: '',
      notes: '',
    })
    setIsBookingModalOpen(true)
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

  const handleSubmit = (event) => {
    event.preventDefault()
    setBookingStep('confirmed')
  }

  useEffect(() => {
    const handleScroll = () => {
      const threshold = Math.min(window.innerHeight * 0.2, 120)
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
            aria-controls="service-mobile-menu"
          >
            Menu
          </button>

          <nav
            className={`ml-auto hidden items-center justify-end gap-7 pr-1 text-sm font-medium sm:flex ${
              showFloatingHeader ? 'text-taupe' : 'text-cream/90'
            }`}
          >
            <Link
              to="/#services"
              className={`transition ${showFloatingHeader ? 'hover:text-charcoal' : 'hover:text-cream'}`}
            >
              Services
            </Link>
            <Link
              to="/#contact"
              className={`transition ${showFloatingHeader ? 'hover:text-charcoal' : 'hover:text-cream'}`}
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={openBookingModal}
              className={`transition ${showFloatingHeader ? 'hover:text-charcoal' : 'hover:text-cream'}`}
            >
              Booking
            </button>
          </nav>
        </div>

        {mobileMenuOpen && (
          <nav
            id="service-mobile-menu"
            className={`space-y-2 border-t px-5 py-4 text-sm font-medium sm:hidden ${
              showFloatingHeader
                ? 'border-charcoal/10 bg-sand text-charcoal'
                : 'border-cream/30 bg-charcoal/70 text-cream backdrop-blur-md'
            }`}
          >
            <Link
              to="/#services"
              className={`block rounded-lg px-3 py-2 ${showFloatingHeader ? 'hover:bg-cream' : 'hover:bg-cream/15'}`}
            >
              Services
            </Link>
            <Link
              to="/#contact"
              className={`block rounded-lg px-3 py-2 ${showFloatingHeader ? 'hover:bg-cream' : 'hover:bg-cream/15'}`}
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={openBookingModal}
              className={`block w-full rounded-lg px-3 py-2 text-left ${showFloatingHeader ? 'hover:bg-cream' : 'hover:bg-cream/15'}`}
            >
              Booking
            </button>
          </nav>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden bg-white">
          <img
            src={serviceHeroImage}
            alt={service.name}
            className="h-[62vh] min-h-[420px] w-full object-cover object-center lg:h-[70vh] lg:min-h-[520px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/62 via-charcoal/42 to-charcoal/12" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10">
              <div className="max-w-lg border border-white/70 bg-cream/96 p-6 shadow-2xl backdrop-blur-[6px] sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-goldDeep">
                  Service details
                </p>
                <h1 className="mt-2 text-4xl leading-tight text-charcoal sm:text-5xl">{service.name}</h1>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-goldDeep">
                  Starting at {service.startingAt}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-charcoal/85 sm:text-base">
                  {service.longDescription}
                </p>
                <button
                  type="button"
                  onClick={openBookingModal}
                  className="mt-7 inline-flex items-center justify-center rounded-none bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-charcoal transition hover:bg-goldDeep"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10">
            <div className="mb-10 text-center">
              <div className="mx-auto mb-3 h-px w-14 bg-gold/70" />
              <h2 className="text-3xl text-charcoal sm:text-4xl">{pageContent.whyTitle}</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
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
              <div className="grid grid-cols-1 gap-6 text-base leading-relaxed text-taupe sm:grid-cols-2 sm:gap-8">
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
              <p className="mx-auto mt-3 max-w-3xl text-sm text-taupe sm:text-base">
                Structured support that helps you feel more rested, more confident, and more in
                control throughout recovery.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {pageContent.supportColumns.map((column) => (
                <article
                  key={column.title}
                  className="rounded-2xl border border-beige bg-cream p-5 shadow-soft"
                >
                  <h3 className="text-2xl text-charcoal">{column.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-taupe sm:text-base">
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
              <h2 className="text-3xl text-charcoal sm:text-4xl">Book your consultation</h2>
              <p className="mt-3 text-sm text-taupe sm:text-base">
                Open our concierge calendar to select your date, time, and timezone.
              </p>
            </div>
            <div className="rounded-3xl border border-beige bg-white p-7 text-center shadow-soft sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-goldDeep">
                Interactive scheduler
              </p>
              <h3 className="mt-2 text-3xl text-charcoal sm:text-4xl">Select a date and time</h3>
              <button
                type="button"
                onClick={openBookingModal}
                className="mt-6 inline-flex items-center justify-center rounded-none bg-[#8b6449] px-7 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition hover:bg-[#74513d]"
              >
                Open Booking Calendar
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
                    {service.name} Consultation
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-taupe sm:text-base">
                    Book a private consultation and we&apos;ll recommend the best care plan for your
                    timeline, goals, and support preferences.
                  </p>
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
                    <label className="text-sm font-medium text-charcoal" htmlFor="service-timezone-select">
                      Time zone
                    </label>
                    <div className="relative mt-2">
                      <select
                        id="service-timezone-select"
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
                    className="mt-6 inline-flex w-full items-center justify-center rounded-none bg-[#8b6449] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition hover:bg-[#74513d] disabled:cursor-not-allowed disabled:bg-[#8b6449]/50"
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
                  <h3 className="mt-2 text-2xl text-charcoal">{service.name}</h3>
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

                <form onSubmit={handleSubmit} className="space-y-3">
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
                    className="inline-flex w-full items-center justify-center rounded-none bg-[#8b6449] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition hover:bg-[#74513d]"
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
                  {service.name} • {selectedDateLabel} • {selectedTime}
                </p>
                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="mt-6 inline-flex items-center justify-center rounded-none bg-[#8b6449] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition hover:bg-[#74513d]"
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

