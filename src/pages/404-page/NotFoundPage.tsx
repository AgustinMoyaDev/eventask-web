import { ButtonLink } from '@/components/button-link/ButtonLink'

import styles from './NotFoundPage.module.css'

export const NotFoundPage = () => {
  return (
    <section className={styles.notFound}>
      <div className={styles.notFoundBg}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 400 1000"
          opacity="0.8"
          aria-hidden="true"
        >
          <defs>
            <filter
              id="nnnoise-filter"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              filterUnits="objectBoundingBox"
              primitiveUnits="userSpaceOnUse"
              colorInterpolationFilters="linearRGB"
            >
              <feTurbulence
                type="turbulence"
                baseFrequency="0.112"
                numOctaves="4"
                seed="15"
                stitchTiles="stitch"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                result="turbulence"
              ></feTurbulence>
              <feSpecularLighting
                surfaceScale="22"
                specularConstant="2.4"
                specularExponent="20"
                lightingColor="hsla(45, 3%, 69%, 1.00)"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                in="turbulence"
                result="specularLighting"
              >
                <feDistantLight azimuth="3" elevation="112"></feDistantLight>
              </feSpecularLighting>
            </filter>
          </defs>
          <rect width="1000" height="1000" fill="transparent"></rect>
          <rect
            width="1000"
            height="1000"
            fill="hsla(0, 3%, 69%, 1.00)"
            filter="url(#nnnoise-filter)"
          ></rect>
        </svg>
      </div>

      <div className={styles.notFoundAstronaut}>
        <img src="/images/astronaut.png" alt="" />
      </div>

      <div className={styles.notFoundUfo}>
        <img src="/images/ovni.png" alt="" />
      </div>

      <div className={styles.notFoundMoonWrapper}>
        <span className={styles.notFoundText}>4</span>
        <svg
          className={styles.notFoundMoon}
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="80" className={styles.notFoundMoonGlow} />
          <circle cx="130" cy="80" r="10" className={styles.notFoundMoonCrater} />
          <circle cx="70" cy="110" r="8" className={styles.notFoundMoonCrater} />
          <circle cx="100" cy="130" r="6" className={styles.notFoundMoonCrater} />
          <circle cx="85" cy="65" r="5" className={styles.notFoundMoonCrater} />
        </svg>
        <span className={styles.notFoundText}>4</span>
      </div>

      <div className={styles.notFoundMessageWrapper}>
        <h1 className={styles.notFoundTitle}>Page not found</h1>
        <h2 className={styles.notFoundSubtitle}>We couldn't find the page you were looking for</h2>
        <ButtonLink variant="tonal" className={styles.notFoundGoHomeBtn} to="/home">
          Go home page
        </ButtonLink>
      </div>
    </section>
  )
}
