import React from 'react'
import URI from "urijs";

import { doLogin } from "openstack-uicore-foundation/lib/methods";

const LoginButton = class extends React.Component {

  getBackURL() {
    let defaultLocation = '/app/home';
    let url      = URI(window.location.href);
    console.log('url', url)
    let location = url.pathname();
    if (location === '/') location = defaultLocation
    let query    = url.search(true);
    let fragment = url.fragment();      
    let backUrl  = query.hasOwnProperty('BackUrl') ? query['BackUrl'] : location;
    console.log('location', location)
    console.log('query', query)
    console.log('fragment', fragment)
    console.log('back url', backUrl)
    if(fragment != null && fragment != ''){
        backUrl += `#${fragment}`;
    }
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
          <h2 className="form-signin-heading">Sponsor Services Login</h2>
          <button className="btn btn-lg btn-primary btn-block" onClick={() => this.onClickLogin()}>Sign in</button>
          <br /><br />
          <h4>Request access</h4>
              To request access to Sponsor Services, please <a href="#">click here.</a>
        </div>
      </div>
    )
  }
}

export default LoginButton



