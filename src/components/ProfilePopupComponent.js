import React from 'react'

import styles from '../styles/profile.module.scss'

const ProfilePopupComponent = ({ userProfile, closePopup, showProfile }) => (



  <div className={`${styles.modal} ${showProfile ? styles.isActive : ''}`}>
    <div className={`${styles.modalBackground}`}></div>
    <div className={`${styles.modalCard} ${styles.profilePopup}`}>
      <header className={`${styles.modalCardHead}`}>
        <p className={`${styles.modalCardTitle}`}>Edit profile</p>        
        <i onClick={() => closePopup()} className={`${styles.closeIcon} fa fa-times icon is-large`}></i>
      </header>
      <section className={`${styles.modalCardBody}`}>
        <div>
          <span>Profile picture</span>
          <div>
            Foto y controles
          </div>
        </div>
        <div>
          <span>Profile Info</span>
          <div>
            <label>First Name</label>
            <div className={`${styles.field}`}>
              <div className={`${styles.control}`}>
                <input className={`${styles.input} ${styles.isPrimary}`} type="text" placeholder="First Name" />
              </div>
            </div>
          </div>
          <div>
            <label>Last Name</label>
            <div className={`${styles.field}`}>
              <div className={`${styles.control}`}>
                <input className={`${styles.input} ${styles.isPrimary}`} type="text" placeholder="Last Name" />
              </div>
            </div>
          </div>
          <div>
            <label>Company</label>
            <div className={`${styles.field}`}>
              <div className={`${styles.control}`}>
                <input className={`${styles.input} ${styles.isPrimary}`} type="text" placeholder="Company" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className={`${styles.modalCardFoot}`}>
        <button className="button">Discard</button>
        <button className="button is-success">Update</button>
      </footer>
    </div>
  </div>

)

export default ProfilePopupComponent