import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import LoginPage from "../templates/login-page"
import HomePage from "../templates/home-page"
import PrivateRoute from "../components/PrivateRoute"

const App = () => {
  return (
    <Layout>
      <Router basepath="/">
        <LoginPage path="/login" />
        <PrivateRoute path="/home" component={HomePage} isLoggedIn={false}/>
      </Router>
    </Layout>
  )
}
export default App