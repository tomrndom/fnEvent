import React from 'react'
import { connect } from 'react-redux'

import LogoutButton from './LogoutButton'
import { handleResetReducers } from '../state/event-actions'

const Header = class extends React.Component {

  render() {

    let { isLoggedUser } = this.props;

    return (
      <header>
        <div className="header">
          <img src="/img/opendevbadge-nav.png" alt="Show Logo" />          
          <LogoutButton isLoggedUser={isLoggedUser} clearState={this.props.handleResetReducers} />
        </div>
      </header>
    )
  }
}

const mapStateToProps = ({ loggedUserState }) => ({
  isLoggedUser: loggedUserState.isLoggedUser
})

export default connect(mapStateToProps, { handleResetReducers })(Header)