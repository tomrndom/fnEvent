// import ...
import React, { Component } from "react"
import { navigate } from "gatsby"

const PrivateRoute = ({ component: Component, isLoggedIn, location, ...rest }) => {

  if (!isLoggedIn && location.pathname !== `/`) {
    navigate("/")
    return null
  }

  return <Component {...rest} />
}
export default PrivateRoute