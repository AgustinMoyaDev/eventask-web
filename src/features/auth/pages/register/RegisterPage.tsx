import { Link } from 'react-router-dom'

import { AuthHeaderForm } from '@/features/auth/components/auth-header-form/AuthHeaderForm'
import { RegisterForm } from '@/features/auth/components/register-form/RegisterForm'

import styles from './RegisterPage.module.css'

const RegisterPage = () => {
  return (
    <section>
      <AuthHeaderForm title="Create new account" />
      <RegisterForm />
      <p className={styles.registerSwitch}>
        Already have an account?&nbsp;
        <Link to="/auth/login" viewTransition>
          Log in.
        </Link>
      </p>
    </section>
  )
}

export default RegisterPage
