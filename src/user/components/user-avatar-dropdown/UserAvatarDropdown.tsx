import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { TASK_STATUS } from '@/types/entities/task'

import { useAuthState } from '@/auth/store/hooks/useAuthState'
import { useAuthMutations } from '@/auth/store/hooks/useAuthMutations'
import { useUserProfileQueries } from '@/user/store/hooks/useUserProfileQueries'
import { useTaskQueries } from '@/task/store/hooks/useTaskQueries'

import { LogoutIcon, UserSettingIcon } from '@/components/icons/Icons'
import { Dropdown } from '@/components/dropdown/Dropdown'
import { ButtonTheme } from '@/components/button-theme/ButtonTheme'
import { UserAvatar } from '@/user/components/user-avatar/UserAvatar'

import styles from './UserAvatarDropdown.module.css'

/**
 * Reusable avatar dropdown component for user menu
 * Displays user avatar with dropdown containing profile info and navigation
 * @returns JSX.Element - Avatar dropdown with user menu
 */
export const UserAvatarDropdown = () => {
  const { currentUserId } = useAuthState()
  const { logout } = useAuthMutations()

  const { user } = useUserProfileQueries()
  const { tasks } = useTaskQueries()
  const navigate = useNavigate()

  /**
   * Calculate pending tasks count for user dashboard
   * @returns number - Count of tasks with PENDING status
   */
  const pendingTasksCount = useMemo(
    () => tasks.filter(task => task.status === TASK_STATUS.PENDING).length,
    [tasks]
  )

  const menuItems = useMemo(
    () => [
      {
        label: 'Profile',
        icon: <UserSettingIcon />,
        onClick: () => navigate('/profile'),
      },
      {
        label: 'Sign out',
        icon: <LogoutIcon />,
        onClick: () => logout(),
      },
    ],
    [navigate, logout]
  )

  if (!currentUserId || !user) return null

  return (
    <Dropdown
      className={styles.userDropdown}
      classNameMenuWrapper={styles.userDropdownMenuWrapper}
      trigger={
        <UserAvatar
          className={styles.userDropdownTrigger}
          imageUrl={user.profileImageURL}
          firstName={user.firstName}
          lastName={user.lastName}
          size="md"
          ariaLabel="User menu"
        />
      }
    >
      <ul className={styles.userDropdownContent}>
        <div className={styles.userDropdownHeader}>
          <div className={styles.userDropdownInfo}>
            <span className={styles.userDropdownName}>
              {user.firstName} {user.lastName}
            </span>
            <small className={styles.userDropdownTasks}>
              {pendingTasksCount === 1 ? '1 pending task' : `${pendingTasksCount} pending tasks`}
            </small>
          </div>

          <ButtonTheme />
        </div>

        {menuItems.map(({ label, icon, onClick }) => (
          <li key={label} className={styles.userDropdownMenuItem} role="menuitem" onClick={onClick}>
            {icon}
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </Dropdown>
  )
}
