import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Dropdown } from '@/components/dropdown/Dropdown'
import { ButtonTheme } from '@/components/button-theme/ButtonTheme'
import { UserAvatar } from '@/components/user-avatar/UserAvatar'

import { TASK_STATUS } from '@/types/entities/task'

import { useAuthActions } from '@/store/hooks/useAuthActions'
import { useUserActions } from '@/store/hooks/useUserActions'
import { useTaskActions } from '@/store/hooks/useTaskActions'

import { LogoutIcon, UserSettingIcon } from '../icons/Icons'

import styles from './AvatarDropdown.module.css'

/**
 * Reusable avatar dropdown component for user menu
 * Displays user avatar with dropdown containing profile info and navigation
 * @returns JSX.Element - Avatar dropdown with user menu
 */
export const AvatarDropdown = () => {
  const { currentUserId, logout } = useAuthActions()

  const { user } = useUserActions()
  const { tasks } = useTaskActions()
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
