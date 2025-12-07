import { Link } from 'react-router-dom'

import styles from './AuthHeaderForm.module.css'

interface AuthHeaderProps {
  logoSrc?: string
  title: string
  subtitle?: string
}

export const AuthHeaderForm = ({ logoSrc, title, subtitle }: AuthHeaderProps) => {
  const imgLogo = logoSrc || '/images/appLogo.webp'

  return (
    <header className={styles.authHeader}>
      <Link to="/">
        <img src={imgLogo} alt="App logo" className={styles.authHeaderLogo} />
      </Link>
      <h1 className={`text-title-lg ${styles.authHeaderTitle}`}>{title}</h1>
      {subtitle && <p className={`text-body-lg ${styles.authHeaderSubtitle}`}>{subtitle}</p>}
    </header>
  )
}
