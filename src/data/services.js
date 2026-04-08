import postpartumImage from '../assets/Postpartum.png'
import postOpImage from '../assets/PostOp.png'
import conciergeImage from '../assets/Concierge.jpg'

export const services = [
  {
    id: 'postpartum-care',
    name: 'Postpartum Care',
    startingAt: '$___',
    description:
      'In-home support designed to help mothers rest, recover, and feel fully cared for in the early weeks after birth.',
    longDescription:
      'Our postpartum care blends practical support with compassionate guidance so mothers can heal, bond, and settle into this new season with confidence. Every plan is tailored to your pace, home rhythm, and recovery priorities.',
    image: postpartumImage,
    included: ['4-hour visit package', 'Overnight support options', 'Customized recovery support'],
    packageHighlights: [
      'Hands-on newborn and maternal care during daytime or overnight blocks',
      'Feeding and soothing support tailored to your family routine',
      'Recovery-focused planning, education, and emotional reassurance',
    ],
  },
  {
    id: 'concierge-care',
    name: 'Concierge Care',
    startingAt: '$___',
    description:
      'High-touch lifestyle and care assistance tailored to your schedule, priorities, and evolving home needs.',
    longDescription:
      'Concierge care is our most flexible offering for women who want premium ongoing support with daily living, comfort routines, and personalized service. We help you stay supported while life remains full and dynamic.',
    image: conciergeImage,
    included: ['Errands and lifestyle support', 'Home assistance', 'Tailored care add-ons'],
    packageHighlights: [
      'Lifestyle support integrated into your preferred schedule',
      'Home assistance and coordination for a calmer daily flow',
      'Custom add-ons based on evolving needs and priorities',
    ],
  },
  {
    id: 'post-operative-care',
    name: 'Post-Operative Care',
    startingAt: '$___',
    description:
      'Compassionate post-op care that prioritizes comfort, mobility support, and a calmer healing experience at home.',
    longDescription:
      'Our post-operative care service helps you recover safely in the comfort of home with attentive, discreet support. We focus on comfort, mobility, and consistency so you can heal with less stress and more confidence.',
    image: postOpImage,
    included: ['Recovery monitoring', 'Mobility and comfort support', 'Personalized in-home care'],
    packageHighlights: [
      'Structured check-ins for comfort and recovery progress',
      'Support with movement, routines, and home environment adjustments',
      'Personalized care coordination that aligns with your provider guidance',
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
      'Yes. Premier Doula care is designed for in-home support so you can recover and rest in a familiar, comfortable environment.',
  },
  {
    question: 'How are packages priced?',
    answer:
      'Packages start at transparent base rates and are adjusted based on hours, care complexity, and level of support requested.',
  },
  {
    question: 'Can care plans be customized?',
    answer:
      'Absolutely. Every care plan is personalized to your recovery needs, family routine, and desired level of concierge support.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'We currently support select local areas. During your consultation, we confirm availability and build the right care schedule.',
  },
]

