import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Layout from '../components/Layout'

import URI from "urijs";
import { handleResetReducers } from '../actions/event-actions'
import { doLogin } from "openstack-uicore-foundation/lib/methods";

export const TokenExpirePageTemplate = class extends React.Component {

  constructor(props) {
    super(props);

    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  redirectToLogin() {
    const { location, handleResetReducers } = this.props;

    let previousLocation = location.state?.backUrl ? location.state.backUrl : '/a/'
    // console.log('previous', previousLocation);
    let url = URI(window.location.href);
    let browserLocation = url.pathname();
    if (browserLocation === '/') browserLocation = previousLocation
    let query = url.search(true);
    let fragment = url.fragment();
    let backUrl = query.hasOwnProperty('BackUrl') ? query['BackUrl'] : browserLocation;
    if (fragment != null && fragment != '') {
      backUrl += `#${fragment}`;
    }
    // console.log('back url', backUrl)
    // console.log('pathname', url.pathname())
    // console.log('browser location', browserLocation)
    // console.log('url', url)
    // console.log('query', query)
    // console.log('fragment', fragment)
    setTimeout(() => {
      handleResetReducers();
      doLogin(backUrl);
    }, 5000);
  }

  render() {

    this.redirectToLogin();

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

const TokenExpirePage = ({ loggedUser, location, handleResetReducers }) => {

  return (
    <TokenExpirePageTemplate
      loggedUser={loggedUser}
      location={location}
      handleResetReducers={handleResetReducers}
    />
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

export default connect(mapStateToProps, { handleResetReducers })(TokenExpirePage);
