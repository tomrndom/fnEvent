import React from 'react'
import { Link } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'

import styles from '../styles/navbar.module.scss';
import LogoutButton from './LogoutButton';

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
            navBarActiveClass: `${styles.isActive}`,
          })
          : this.setState({
            navBarActiveClass: '',
          })
      }
    )
  }

  render() {

    let { isLoggedUser, clearState, logo } = this.props;

    return (
      <React.Fragment>
        <nav className={`${styles.navbar}`} role="navigation" aria-label="main navigation">
          <div className={styles.navbarBrand}>
            <Link to="/a/" className={styles.navbarItem}>
              {logo &&
                <img src={logo} alt="Show Logo" />
              }
            </Link>

            <a role="button" className={`${styles.navbarBurger} ${styles.burger} ${this.state.navBarActiveClass}`}
              aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
              onClick={() => this.toggleHamburger()}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className={`${styles.navbarMenu} ${this.state.navBarActiveClass}`}>
            <div className={styles.navbarStart}>
              {/* <Link to="/a/" className={styles.navbarItem}>
              Home
            </Link> */}
            </div>
            <div className={styles.navbarEnd}>
              <div className={styles.navbarItem}>
                <span>About the event</span>
              </div>
              <div className={styles.navbarItem}>
                <span>Who we are</span>
              </div>
              <div className={styles.navbarItem}>
                <span>Past events</span>
              </div>
              <div className={styles.navbarItem}>
                <span>Contact</span>
              </div>
              <div className={styles.navbarItem}>
                <span>Help</span>
              </div>
            </div>
          </div>
        </nav>
        <nav className={`${styles.navbar} ${styles.userNavbar}`} role="navigation" aria-label="main navigation">
          <div className={styles.navbarBrand}>
            {/* <Link to="/a/" className={styles.navbarItem}>
              {logo &&
                <img src={logo} alt="Show Logo" />
              }
            </Link> */}
          </div>

          <div id="navbarBasicExample" className={`${styles.navbarMenu} ${this.state.navBarActiveClass}`}>
            <div className={styles.navbarStart}>
              <a role="button" className={`${styles.navbarBurger} ${styles.burger} ${styles.userBurger}`}
                aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
              <div className={styles.navbarItem}>
                <a className={`${styles.button} ${styles.isLarge} ${styles.lobbyButton}`} onClick={() => { this.props.clearState(); }}>
                  <strong>Lobby</strong>
                </a>
              </div>
            </div>
            <div className={styles.navbarEnd}>
              <div className={styles.navbarItem}>
                <LogoutButton styles={styles} isLoggedUser={isLoggedUser} clearState={clearState} />
              </div>
            </div>
          </div>
        </nav>
      </React.Fragment>
    )
  }
}

export default Navbar
