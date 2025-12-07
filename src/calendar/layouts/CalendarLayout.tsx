import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import clsx from 'clsx'

import { CalendarPage } from '@/router/lazyPages'
import { useSidebarContext } from '@/context/sidebar/SidebarContext'

import { Sidebar } from '@/components/sidebar/Sidebar'

import { CalendarContentSkeleton } from './CalendarSkeleton'

import styles from './CalendarLayout.module.css'

export const CalendarLayout = () => {
  const { isSidebarCollapsed, closeSidebar } = useSidebarContext()

  return (
    <div className={clsx(styles.calendarLayout, 'container')}>
      <Sidebar isCollapsed={isSidebarCollapsed} onClose={closeSidebar} />
      <div className={styles.calendarLayoutContent}>
        <Suspense fallback={<CalendarContentSkeleton />}>
          <Routes>
            <Route index element={<CalendarPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}
