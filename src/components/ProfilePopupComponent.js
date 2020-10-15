import React from 'react'

import styles from '../styles/profile.module.scss'

const ProfilePopupComponent = ({ className }) => (
  <div class={`modal ${className}`}>
    <div class="modal-background"></div>
    <div class={`modal-card ${styles.profilePopup}`}>
      <header class="modal-card-head">
        <p class="modal-card-title">Edit profile</p>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div>
          <span>Profile picture</span>
          <div>
            Foto y controles
          </div>
        </div>
        <div>
          <span>Profile Ino</span>
          <div>
            First Name
            <input></input>
          </div>
          <div>
            Last Name
        <input></input>
          </div>
          <div>
            Company Name
        <input></input>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button">Discard</button>
        <button class="button is-success">Update</button>
      </footer>
    </div>
  </div>

)

export default ProfilePopupComponent