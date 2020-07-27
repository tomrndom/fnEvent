import React from 'react'

import { doLogin } from "openstack-uicore-foundation/lib/methods";

const LoginButton = class extends React.Component {

  getBackURL() {
    let { location } = this.props;
    let defaultLocation = '/a/';
    let previousURL = location.state?.backUrl ? location.state.backUrl : null;
    let backUrl = previousURL ? previousURL : defaultLocation;
    return backUrl;
  }

  onClickLogin() {
    this.getBackURL();
    doLogin(this.getBackURL());
  }

  render() {
    return (
      <div className="container">
        <div className="login-form">
          <h2 className="form-signin-heading">Virtual Event Login</h2>
          <button className="btn btn-lg btn-primary btn-block" onClick={() => this.onClickLogin()}>Sign in</button>
          <br /><br />
          <h4>Request access</h4>
          Get access to virtual event. Register <a href="https://idp.dev.fnopen.com/auth/register">here</a>
        </div>
      </div>
    )
  }
}

export default LoginButton