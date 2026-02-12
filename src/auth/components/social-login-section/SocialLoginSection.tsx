import { type CredentialResponse, GoogleLogin } from '@react-oauth/google'

import { useAuthMutations } from '@/auth/hooks/useAuthMutations'

import styles from './SocialLoginSection.module.css'

export const SocialLoginSection = () => {
  const { loginWithGoogle, loginWithGoogleAuthError } = useAuthMutations()

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.error('No credential returned from Google log in')
      return
    }
    await loginWithGoogle({ idToken: credentialResponse.credential })
  }

  const handleGoogleError = () => {
    console.error('Google log in failed')
  }

  return (
    <>
      {loginWithGoogleAuthError?.message && (
        <p className={styles.loginError}>{loginWithGoogleAuthError.message}</p>
      )}

      <div className={styles.loginSocial}>
        <p className={styles.loginSocialTitle}>Or access with:</p>
        <div className={styles.loginSocialLinks}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            type="icon"
            shape="circle"
            theme="filled_black"
          />
        </div>
      </div>
    </>
  )
}
