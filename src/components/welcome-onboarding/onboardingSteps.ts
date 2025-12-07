export interface OnboardingStep {
  id: number
  title: string
  description: string
  image: string
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: 'Welcome to EvenTask',
    description:
      'Here you can manage your tasks, schedule events, and collaborate with your team all in one place.',
    image: '/images/appLogo.webp',
  },
  {
    id: 2,
    title: 'Create and Organize',
    description:
      'Easily create tasks, assign them to custom categories, and set priorities to keep everything under control.',
    image: '/images/onboarding/calendar.webp',
  },
  {
    id: 3,
    title: 'Integrated Calendar',
    description:
      'Visualize all your events in the integrated calendar. Schedule meetings, deadlines, and never miss an important date.',
    image: '/images/onboarding/schedule.webp',
  },
  {
    id: 4,
    title: 'Team Collaboration',
    description: 'Invite team members, assign tasks, share events, and work together efficiently.',
    image: '/images/onboarding/board.webp',
  },
]
