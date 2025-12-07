export interface SlideTransitionProps {
  direction: 'left' | 'right' | 'center' | null
  /** Clear direction when animation ends */
  onAnimationEnd?: () => void
  children: React.ReactNode
}
