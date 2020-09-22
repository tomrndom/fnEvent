import React from 'react'

import Link from './Link'
import Content from '../content/marketing-site.json'
import footerContent from '../content/footer.json';

import styles from '../styles/sponsor-page.module.scss'

const SponsorHeader = () => (
  <section className={styles.hero}>
    <div className={`${styles.heroSponsor}`}>
      <div className={`${styles.heroBody}`}>
        <div className={`${styles.heroSponsorContainer}`}>
          {footerContent.social.display &&
            <div className={styles.leftContainer}>
              {footerContent.social.networks.map((net, index) => (
                net.display &&
                <Link to={net.link} className={styles.link} key={index}>
                  <i className={`fa icon is-large ${net.icon}`}></i>
                </Link>
              ))}
            </div>
          }
          <div className={styles.rightContainer}>
            <div className={styles.category}>Sponsor category</div>
            <div className={styles.buttons}>
              <a className={styles.link}>
                <button className={`${styles.button} button is-large`}>
                  <i className={`fa fa-2x fa-qrcode icon is-large`}></i>
                  <b>Call to Action</b>
                </button>
              </a>
              <a className={styles.link}>
                <button className={`${styles.button} button is-large`}>
                  <i className={`fa fa-2x fa-calendar icon is-large`}></i>
                  <b>Schedule Call</b>
                </button>
              </a>              
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.bottomBar}>
      <div className={styles.track}>
        <div>
          Lenovo - Smart Technologies / Lenovo - Smart Technologies / Lenovo - Smart Technologies / Lenovo - Smart Technologies / Lenovo - Smart Technologies / Lenovo - Smart Technologies / Lenovo - Smart Technologies / Lenovo - Smart Technologies / Lenovo - Smart Technologies /
        </div>
      </div>
    </div>
  </section>

)

export default SponsorHeader