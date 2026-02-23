import { registerAuthToastListeners } from '@/features/auth/store/authToastListeners'
import { registerCategoryToastListeners } from '@/features/category/store/categoryToastListeners'
import { registerEventToastListeners } from '@/features/event/store/eventToastListeners'
import { registerInvitationToastListeners } from '@/features/invitation/store/invitationToastListeners'
import { registerNotificationToastListeners } from '@/features/notification/store/notificationToastListeners'
import { registerTaskToastListeners } from '@/features/task/store/taskToastListeners'
import { registerUserToastListeners } from '@/features/user/store/userToastListeners'

let initialized = false

export function registerToastListeners() {
  if (initialized) return
  initialized = true

  registerAuthToastListeners()
  registerCategoryToastListeners()
  registerEventToastListeners()
  registerInvitationToastListeners()
  registerNotificationToastListeners()
  registerTaskToastListeners()
  registerUserToastListeners()
}
