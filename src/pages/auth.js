import React from "react"
import { Router } from "@reach/router"
import { connect } from 'react-redux'
import { navigate } from "gatsby"

import Layout from "../components/Layout"
import LoginPage from "../templates/login-page"
import HomePage from "../templates/home-page"

import PrivateRoute from "../components/PrivateRoute"

import { onUserAuth, doLogout, getUserInfo } from "openstack-uicore-foundation/lib/methods";

import Loadable from "@loadable/component"

// const LoadableAuthorizedRoute = Loadable(() => import('../routes/authorized-route')) 
const LoadableAuthorizationCallbackRoute = Loadable(() => import('../routes/authorization-callback-route')) 
const LoadableLogOutCallbackRoute = Loadable(() => import('../routes/logout-callback-route')) 

const App = class extends React.Component {
 
  render() {

    let {isLoggedUser, onUserAuth, doLogout, getUserInfo, member, backUrl, summit} = this.props;

    if (typeof window !== `undefined` && window.location.pathname === '/auth/callback' && isLoggedUser) {      
      navigate('/auth/home')
    }

    return (
      <Layout>
        <Router basepath="/auth">
          {/* <LoadableAuthorizedRoute isLoggedUser={false} doLogin={this.onClickLogin.bind(this)} backUrl={backUrl} path="/home" component={HomePage} /> */}
          <LoadableAuthorizationCallbackRoute onUserAuth={onUserAuth} path='/callback' getUserInfo={getUserInfo} />
          <LoadableLogOutCallbackRoute doLogout={doLogout} path='/logout' />
          <PrivateRoute path="/home" component={HomePage} isLoggedIn={isLoggedUser} />
          <LoginPage path="/" />          
        </Router>
      </Layout >
    )
  }
}

const mapStateToProps = ({ loggedUserState }) => ({
  isLoggedUser: loggedUserState.isLoggedUser,
  backUrl: loggedUserState.backUrl,
})

export default connect(mapStateToProps, {
  onUserAuth,
  doLogout,
  getUserInfo,
})(App)