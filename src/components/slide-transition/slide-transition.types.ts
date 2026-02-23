export interface SlideTransitionProps {
  direction: 'left' | 'right' | 'center' | null
  onAnimationEnd?: () => void
  children: React.ReactNode
}
