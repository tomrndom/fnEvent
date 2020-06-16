import React from "react"
import { Router } from "@reach/router"
import { connect } from 'react-redux'
import { navigate } from "gatsby"

import Layout from "../components/Layout"
import LoginPage from "../templates/login-page"
import HomePage from "../templates/home-page"
import EventPage from "../templates/event-page"

import PrivateRoute from "../components/PrivateRoute"

const App = class extends React.Component {

  render() {

    let { isLoggedUser } = this.props;

    return (
      <Router basepath="/a">
        <PrivateRoute path="/" component={EventPage} isLoggedIn={isLoggedUser} />
        <PrivateRoute path="/event/:eventId" component={EventPage} isLoggedIn={isLoggedUser} />
        <LoginPage path="/login" />
      </Router>
    )
  }
}

const mapStateToProps = ({ loggedUserState }) => ({
  isLoggedUser: loggedUserState.isLoggedUser,
  backUrl: loggedUserState.backUrl,
})

export default connect(mapStateToProps)(App)