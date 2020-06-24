import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Layout from '../components/Layout'

import URI from "urijs";
import { doLogin } from "openstack-uicore-foundation/lib/methods";

export const TokenExpirePageTemplate = class extends React.Component {

  constructor(props) {
    super(props);

    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  redirectToLogin() {
    let previousLocation = window.history?.state?.backUrl ? window.history.state.backUrl : '/a/'
    let url = URI(window.location.href);
    let location = url.pathname();
    if (location === '/') location = previousLocation
    let query = url.search(true);
    let fragment = url.fragment();
    let backUrl = query.hasOwnProperty('BackUrl') ? query['BackUrl'] : location;
    if (fragment != null && fragment != '') {
      backUrl += `#${fragment}`;
    }
    setTimeout(() => {
      doLogin(backUrl);
    }, 5000);
  }

  render() {

    // this.redirectToLogin();

    return (
      <div className="container pt-5 pb-5">
        <div className="columns">
          <div className="column is-three-quarters">
            <div className="rocket-container">
              <h3>Your session has timed out. You will be redirected to the login page</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TokenExpirePageTemplate.propTypes = {
  loggedUser: PropTypes.object
}

const TokenExpirePage = ({ loggedUser }) => {

  return (
    <Layout>
      <TokenExpirePageTemplate
        loggedUser={loggedUser}
      />
    </Layout>
  )

}

TokenExpirePage.propTypes = {
  summit: PropTypes.object,
  loggedUser: PropTypes.object,
  location: PropTypes.object,
}

const mapStateToProps = ({ loggedUserState }) => ({
  loggedUser: loggedUserState
})

export default connect(mapStateToProps)(TokenExpirePage);
