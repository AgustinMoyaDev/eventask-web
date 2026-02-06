import { Link } from 'react-router-dom'

import { AuthHeaderForm } from '@/auth/components/auth-header-form/AuthHeaderForm'
import { RegisterForm } from '@/auth/components/register-form/RegisterForm'

import styles from './RegisterPage.module.css'

const RegisterPage = () => {
  return (
    <section>
      <AuthHeaderForm title="Create new account" />
      <RegisterForm />
      <p className={styles.registerSwitch}>
        Already have an account?&nbsp;
        <Link to="/auth/login">Log in.</Link>
      </p>
    </section>
  )
}

export default RegisterPage
