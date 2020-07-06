import React from 'react'

import styles from '../styles/lobby-hero.module.scss';

const LobbyHeroComponent = ({ }) => (

  <section class="hero is-medium">
    <div className={`${styles.heroColumns} columns`}>
      <div className={`${styles.leftColumn} column is-6 is-black`}>
        <div class={`${styles.heroContainer} hero-body`}>
          <div class="container">
            <h1 class="title">
              Hero title
            </h1>
            <h2 class="subtitle">
              Hero subtitle
            </h2>
          </div>
        </div>
      </div>
      <div className={`${styles.midColumn} column is-1 is-info`}></div>
      <div className={`${styles.rightColumn} column is-6 is-danger`}></div>
    </div>
  </section>

)

export default LobbyHeroComponent