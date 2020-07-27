import React from "react"
import { navigate } from "gatsby"

import envVariables from '../utils/envVariables';

import { OPSessionChecker } from "openstack-uicore-foundation/lib/components";

const PrivateRoute = ({ component: Component, isLoggedIn, location, ...rest }) => {

  if (!isLoggedIn && location.pathname !== `/a/login`) {
    let previousURL = location.state?.backUrl ? location.state.backUrl : null;
    navigate('/a/login', {
      state: {
        backUrl: previousURL
      }
    })
    return null
  }

  const clientId = envVariables.OAUTH2_CLIENT_ID;
  const idpBaseUrl = envVariables.IDP_BASE_URL;

  return (
    <>
      <OPSessionChecker clientId={clientId} idpBaseUrl={idpBaseUrl} />
      <Component location={location} {...rest} />
    </>
  );
}

export default PrivateRoute