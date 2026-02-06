import { useNavigate, useSearchParams } from 'react-router-dom'

import { AuthHeaderForm } from '@/auth/components/auth-header-form/AuthHeaderForm'

import { ResetPasswordForm } from '@/auth/components/reset-password-form/ResetPasswordForm'

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''

  return (
    <section>
      <AuthHeaderForm title="Reset your password" />
      <ResetPasswordForm token={token} onSuccess={() => navigate('/auth/login')} />
    </section>
  )
}

export default ResetPasswordPage
