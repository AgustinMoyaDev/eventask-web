import { Link } from 'react-router-dom'

import { AuthHeaderForm } from '@/auth/components/auth-header-form/AuthHeaderForm'
import { LoginForm } from '@/auth/LoginForm/LoginForm'
import { SocialLoginSection } from '@/auth/SocialLoginSection/SocialLoginSection'

import styles from './LoginPage.module.css'

const LoginPage = () => {
  return (
    <section>
      <AuthHeaderForm title="Log in to your account" />
      <LoginForm />
      <SocialLoginSection />
      <p className={styles.loginSwitch}>
        <span>Don't have an account?&nbsp;</span>
        <Link to="/auth/register">Create account.</Link>
      </p>
    </section>
  )
}

export default LoginPage
