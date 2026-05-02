import postpartumImage from '../assets/Postpartum.png'
import newbornImage from '../assets/Newborn.png'
import lactationImage from '../assets/Lactation.png'

export const services = [
  {
    id: 'postpartum-care',
    name: 'Postpartum',
    startingAt: '$___',
    description:
      'In-home support designed to help mothers rest, recover, and feel fully cared for in the early weeks after birth.',
    longDescription:
      'Our postpartum care blends practical support with compassionate guidance so mothers can heal, bond, and settle into this new season with confidence. Your care plan is built around your daily rhythm and includes hands-on newborn support, maternal recovery assistance, feeding guidance, and emotional reassurance so you are never navigating those early weeks alone.',
    image: postpartumImage,
    included: ['4-hour visit package', 'Overnight support options', 'Customized recovery support'],
    packageHighlights: [
      'Hands-on newborn and maternal care during daytime or overnight blocks',
      'Feeding and soothing support tailored to your family routine',
      'Recovery-focused planning, education, and emotional reassurance',
    ],
  },
  {
    id: 'infant-care',
    name: 'Infant',
    startingAt: '$___',
    description:
      'Specialized newborn and infant care support to help families build steady routines and confidence at home.',
    longDescription:
      'Infant care is focused one-to-one support for your baby\'s earliest months. We provide practical guidance around soothing, sleep rhythms, feeding flow, and daily newborn needs so families feel calm, informed, and supported from day one.',
    image: newbornImage,
    included: ['Newborn routine planning', 'Soothing and sleep rhythm guidance', 'Hands-on infant support'],
    packageHighlights: [
      'One-on-one infant support tailored to your baby\'s stage and temperament',
      'Real-time guidance for daily routines, soothing, and confidence-building care',
      'Flexible visit structure that evolves with your family\'s needs',
    ],
  },
  {
    id: 'lactation-support',
    name: 'Lactation',
    startingAt: '$___',
    description:
      'Personalized lactation support to help feeding feel more comfortable, consistent, and sustainable.',
    longDescription:
      'Lactation support provides practical, judgment-free guidance for feeding goals at every stage. We help with latch techniques, positioning, comfort strategies, and plan adjustments so feeding works better for both mother and baby.',
    image: lactationImage,
    included: ['Latch and positioning guidance', 'Comfort-focused feeding strategies', 'Customized feeding plans'],
    packageHighlights: [
      'Hands-on assessment and support for breastfeeding and pumping routines',
      'Personalized strategies for supply, comfort, and sustainable feeding rhythm',
      'Ongoing guidance that adapts as your baby grows and needs change',
    ],
  },
]

export const faqs = [
  {
    question: 'What happens during a consultation?',
    answer:
      'We discuss your goals, timeline, and care preferences, then recommend the most supportive service plan for your situation.',
  },
  {
    question: 'Do you offer in-home support?',
    answer:
      'Yes. Premier Doulas care is designed for in-home support so you can recover and rest in a familiar, comfortable environment.',
  },
  {
    question: 'How are packages priced?',
    answer:
      'Packages start at transparent base rates and are adjusted based on hours, care complexity, and level of support requested.',
  },
  {
    question: 'Can care plans be customized?',
    answer:
      'Absolutely. Every care plan is personalized to your recovery needs, family routine, and desired level of postpartum, infant, and lactation support.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'We currently support select local areas. During your consultation, we confirm availability and build the right care schedule.',
  },
]

export const testimonials = [
  {
    quote:
      'Working with Premier Doulas was one of the best decisions we made as new parents. From the start, the depth of expertise, especially with twins, stood out. Their guidance on feeding, soothing, and sleep made an immediate difference in our home. Within weeks, our boys went from waking multiple times a night to sleeping through.',
    name: 'Sarah P.',
    service: 'Premier Doulas Client',
    stars: 5,
  },
  {
    quote:
      'We used Premier Doulas with both of our babies. Everyone on our postpartum team was simply amazing and never judgmental.',
    name: 'Caroline F.',
    service: 'Premier Doulas Client',
    stars: 5,
  },
  {
    quote:
      'Premier Doulas was truly a lifesaver. Our family relocated two months before I gave birth, and they helped us navigate everything. We slept soundly while our doula took care of my baby\'s overnight needs as well as mine. I trusted her wholeheartedly and never doubted my daughter was in the best hands. Our doula was very knowledgeable, recognized first signs of reflux, and offered helpful solutions. She was nonjudgmental when I decided to pump overnight instead of waking to nurse. I think every new mom deserves Premier Doulas.',
    name: 'Helen L.',
    service: 'Premier Doulas Client',
    stars: 5,
  },
  {
    quote:
      'We had a great experience working with Premier\'s team of doulas. They taught us so much, from swaddling techniques to overnight diaper changes without waking our little one. We slept peacefully throughout and always received a full report in the morning. I just booked them again for our upcoming winter baby.',
    name: 'Erin O.',
    service: 'Premier Doulas Client',
    stars: 5,
  },
]

