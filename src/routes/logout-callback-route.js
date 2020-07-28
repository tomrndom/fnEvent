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

import { handleResetReducers } from '../actions/event-actions'
import { initLogOut } from "openstack-uicore-foundation/lib/methods";

class LogOutCallbackRoute extends React.Component {

  render() {

    let { location, handleResetReducers } = this.props;

    let postLogoutState = window.localStorage.getItem('post_logout_state');
    let backUrl = window.localStorage.getItem('post_logout_back_uri');

    if (postLogoutState) {
      window.localStorage.removeItem('post_logout_state');
      window.localStorage.removeItem('post_logout_back_uri');
      let query = URI.parseQuery(location.search);
      if (query.hasOwnProperty("state") && query["state"] === postLogoutState) {
        handleResetReducers();
      }
      navigate(backUrl ? backUrl : '/a/');
    } else {
      let previousUrl = location.state?.backUrl ? location.state?.backUrl : '/a/';
      window.localStorage.setItem('post_logout_back_uri', previousUrl);
      initLogOut();
    }

    return null
  }
}

export default connect(null, { handleResetReducers })(LogOutCallbackRoute)