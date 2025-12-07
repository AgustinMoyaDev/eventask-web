import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import {
  HomePage,
  TaskFormPage,
  TaskDetailPage,
  UserProfilePage,
  SeeAllPage,
} from '../router/lazyPages'

import { useSidebarContext } from '../context/sidebar/SidebarContext'

import { Sidebar } from '../components/sidebar/Sidebar'
import { GenericContentSkeleton } from '../components/skeletons/GenericContentSkeleton'

import styles from './RootLayout.module.css'

export const RootLayout = () => {
  const { isSidebarCollapsed, closeSidebar } = useSidebarContext()

  return (
    <div className={`${styles.rootLayout} container`}>
      <Sidebar isCollapsed={isSidebarCollapsed} onClose={closeSidebar} />
      <div className={styles.rootLayoutContent}>
        <Suspense fallback={<GenericContentSkeleton />}>
          <Routes>
            <Route path="home" element={<HomePage />} />
            <Route path="task/:id" element={<TaskDetailPage />} />
            <Route path="task-form" element={<TaskFormPage />} />
            <Route path="task-form/:id" element={<TaskFormPage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="see-all" element={<SeeAllPage />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}
