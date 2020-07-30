import React from 'react'
import Slider from "react-slick";

import MarketingSite from '../content/marketing-site.json'
import styles from '../styles/lobby-hero.module.scss'

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const LobbyHeroMarketing = () => (
  <section className={styles.heroMarketing}>
    <div className={`${styles.heroMarketingColumns} columns is-gapless`}>
      <div className={`${styles.leftColumn} column is-6 is-black`}>
        <div className={`${styles.heroMarketingContainer} hero-body`}>
          <div className="container">
            <h1 className="title">
              {MarketingSite.heroBanner.title}
              <br />
              {MarketingSite.heroBanner.date}
            </h1>
            <h2 className="subtitle">
              {MarketingSite.heroBanner.subTitle}
            </h2>
            <div className={styles.heroButtons}>
              <a className={styles.link}>
                <button className={`${styles.button} button is-large`}>
                  <i className={`fa fa-2x fa-edit icon is-large`}></i>
                  <b>Register Now</b>
                </button>
              </a>
              <a className={styles.link}>
                <button className={`${styles.button} button is-large`}>
                  <i className={`fa fa-2x fa-sign-in icon is-large`}></i>
                  <b>Log In</b>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.rightColumn} column is-6 px-0`}>
        <Slider {...sliderSettings}>
          <div style={{height: '350px'}}>
            <div className={styles.imageSlider} style={{backgroundImage: `url(${MarketingSite.heroBanner.image})`}}>
            </div>            
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>        
      </div>
    </div>
  </section>

)

export default LobbyHeroMarketing