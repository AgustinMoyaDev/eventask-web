import clsx from 'clsx'

import { SkeletonProps } from '@/types/ui/skeleton'

import styles from './Skeleton.module.css'

export const Skeleton = ({
  className,
  width,
  height,
  borderRadius,
  stylesInline,
}: SkeletonProps) => {
  const style: React.CSSProperties = {
    width,
    height,
    borderRadius,
    pointerEvents: 'none',
    ...stylesInline,
  }

  const skeletonClassName = clsx(styles && styles.skeleton, className)

  return <div className={skeletonClassName} style={style} aria-hidden="true" />
}
