import React from 'react'
import { connect } from 'react-redux'

import LogoutButton from './LogoutButton'

const Header = class extends React.Component {

  render() {

    let { isLoggedUser } = this.props;

    return (
      <header>
        <div className="header">
          <img src="/img/logo.png" alt="FNTech Logo" />
          <LogoutButton isLoggedUser={isLoggedUser} />
        </div>
      </header>
    )
  }
}

const mapStateToProps = ({ loggedUserState }) => ({
  isLoggedUser: loggedUserState.isLoggedUser
})

export default connect(mapStateToProps)(Header)