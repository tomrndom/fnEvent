import React from "react"
import { Router } from "@reach/router"
import { connect } from 'react-redux'

import { onUserAuth, getUserInfo } from "openstack-uicore-foundation/lib/methods";
import TokenExpirePage from "../templates/token-expire-page"

import AuthorizationCallbackRoute from "../routes/authorization-callback-route"
import LogOutCallbackRoute from "../routes/logout-callback-route"

const Auth = class extends React.Component {

  render() {

    let { onUserAuth, getUserInfo, location } = this.props;

    return (
      <Router basepath="/auth">
        <AuthorizationCallbackRoute onUserAuth={onUserAuth} path='/callback' getUserInfo={getUserInfo} />
        <LogOutCallbackRoute path='/logout' />
        <TokenExpirePage path="/expired" location={location} />
      </Router>
    )
  }
}

const mapStateToProps = ({ loggedUserState }) => ({
  backUrl: loggedUserState.backUrl,
})

export default connect(mapStateToProps, {
  onUserAuth,
  getUserInfo,
})(Auth)