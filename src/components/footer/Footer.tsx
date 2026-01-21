import { Link } from 'react-router-dom'
import { HeartIcon } from '../icons/Icons'
import styles from './Footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        &copy; Built with
        <span className={styles.heart}>
          <HeartIcon />
        </span>
        <Link
          to="https://agustin-moya-dev.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Agustin Moya
        </Link>
      </p>
    </footer>
  )
}
