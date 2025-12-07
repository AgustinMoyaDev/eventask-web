import { Skeleton } from '@/components/skeletons/Skeleton'

export const CalendarContentSkeleton = () => {
  return (
    <div
      className="calendar-skeleton"
      style={{ marginTop: '2rem', padding: '1rem', height: '100%' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <Skeleton width={150} height={32} />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Skeleton width={80} height={32} />
          <Skeleton width={32} height={32} />
          <Skeleton width={32} height={32} />
        </div>
      </div>

      <Skeleton width="100%" height="400px" />
    </div>
  )
}
