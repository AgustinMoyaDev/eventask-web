import { Skeleton } from '@/components/skeletons/Skeleton'

import styles from './AuthLayout.module.css'

export const AuthContentSkeleton = () => {
  return (
    <div
      className={styles.auth}
      style={{
        width: '100%',
        height: '40rem',
        display: 'flex',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '2rem',
          marginTop: '1rem',
        }}
      >
        <Skeleton width="5rem" height="5rem" stylesInline={{ alignSelf: 'center' }} />

        <Skeleton width="100%" height="3.5rem" borderRadius="8px" />
        <Skeleton width="100%" height="3.5rem" borderRadius="8px" />
        <Skeleton width="100%" height="3.5rem" borderRadius="8px" />
        <Skeleton width="100%" height="3.5rem" borderRadius="8px" />
        <Skeleton
          width="100%"
          height="3rem"
          borderRadius="2rem"
          stylesInline={{ marginTop: '1rem' }}
        />

        <Skeleton width="8rem" height="2rem" stylesInline={{ alignSelf: 'center' }} />
      </div>
    </div>
  )
}
