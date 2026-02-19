import { registerAuthToastListeners } from '@/auth/store/authToastListeners'
import { registerCategoryToastListeners } from '@/category/store/categoryToastListeners'
import { registerEventToastListeners } from '@/event/store/eventToastListeners'
import { registerInvitationToastListeners } from '@/invitation/store/invitationToastListeners'
import { registerNotificationToastListeners } from '@/notification/store/notificationToastListeners'
import { registerTaskToastListeners } from '@/task/store/taskToastListeners'
import { registerUserToastListeners } from '@/user/store/userToastListeners'

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
