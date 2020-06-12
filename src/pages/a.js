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
      <Layout>
        <Router basepath="/a">
          <LoginPage path="/login" />
          <PrivateRoute path="/home" component={HomePage} isLoggedIn={isLoggedUser} />
          <PrivateRoute path="/" component={EventPage} isLoggedIn={isLoggedUser} />
        </Router>
      </Layout>
    )
  }
}

const mapStateToProps = ({ loggedUserState }) => ({
  isLoggedUser: loggedUserState.isLoggedUser,
  backUrl: loggedUserState.backUrl,
})

export default connect(mapStateToProps)(App)