import React from 'react'

import LobbyHero from '../content/hero-banner.json'
import styles from '../styles/lobby-hero.module.scss'

const EventHeroComponent = () => (
  <section className="hero">
    <div className={`${styles.heroEvents} columns`}>
      <div className={'column is-12'}>
        <div className={`${styles.heroBody} hero-body`}>
          <div className={`${styles.heroEventContainer} container`}>
            <span className={styles.title}>
              All Hands
            </span>
            <span className={styles.subtitle}>
              Meeting
            </span>
            <div className={styles.date}>
              <span>August 17, 2020</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

)

export default EventHeroComponent