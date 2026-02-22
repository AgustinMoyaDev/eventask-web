import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import clsx from 'clsx'

import { useSidebarContext } from '@/context/sidebar/SidebarContext'
import { SidebarProvider } from '@/context/sidebar/SidebarProvider'
import { BreadcrumbProvider } from '@/context/breadcrumb/BreadcrumbProvider'

import { GenericContentSkeleton } from '@/components/skeletons/GenericContentSkeleton'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { Header } from '@/components/header/Header'
import { Breadcrumb } from '@/components/breadcrumb/Breadcrumb'
import { Footer } from '@/components/footer/Footer'

import styles from './MainLayout.module.css'

const MainLayoutContent = () => {
  const { isSidebarCollapsed, closeSidebar } = useSidebarContext()

  return (
    <div className={styles.mainLayoutWrapper}>
      <Header />
      <div className={`${styles.mainLayoutBody} container`}>
        <Sidebar isCollapsed={isSidebarCollapsed} onClose={closeSidebar} />
        <main className={clsx('main', styles.mainContent)}>
          <Breadcrumb />
          <Suspense fallback={<GenericContentSkeleton />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export const MainLayout = () => {
  return (
    <SidebarProvider>
      <BreadcrumbProvider>
        <MainLayoutContent />
      </BreadcrumbProvider>
    </SidebarProvider>
  )
}
