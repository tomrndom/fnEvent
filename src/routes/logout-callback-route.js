/**
 * Copyright 2019
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
import URI from "urijs"
import React from 'react'
import { connect } from 'react-redux'
import { navigate } from "gatsby"

import { doLogout, initLogOut } from 'openstack-uicore-foundation/lib/methods'
//import { handleResetReducers } from '../actions/event-actions'

class LogOutCallbackRoute extends React.Component {

  render() {

    let { location } = this.props;

    let postLogoutState = window.localStorage.getItem('post_logout_state');
    if (postLogoutState) {
      window.localStorage.removeItem('post_logout_state');
      let query = URI.parseQuery(location.search);
      if (query.hasOwnProperty("state") && query["state"] === postLogoutState) {
        doLogout()
      }
    } else {
      let backUrl = location.state?.backUrl ? location.state.backUrl : '/a/';
      window.localStorage.setItem('post_logout_redirect_path', backUrl);
      initLogOut()
      return null
    }

    let backUrl = window.localStorage.getItem('post_logout_redirect_path');
    window.localStorage.removeItem('post_logout_redirect_path');
    navigate(backUrl ? backUrl : '/a/')
    return null
  }
}

export default LogOutCallbackRoute