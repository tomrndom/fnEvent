import React from "react"
import { navigate } from "gatsby"

import envVariables from '../utils/envVariables';
import authorizedUser from '../utils/authorizedGroups';

import { OPSessionChecker } from "openstack-uicore-foundation/lib/components";

const PrivateRoute = ({ component: Component, isLoggedIn, location, user, startDate, marketingNow, ...rest }) => {

  if (!isLoggedIn && location.pathname !== `/`) {
    navigate('/', {
      state: {
        backUrl: `${location.href}`
      }
    })
    return null
  }

  if (!user || !user.groups) { 
    return (
      <div className="container pt-5">
        <div className="columns">
          <div className="column">
            <h3>Checking credentials...</h3>
          </div>
        </div>
      </div>
    )
  }

  const isAuthorized = authorizedUser(user.groups);

  if (envVariables.REGISTRATION_BASE_URL) {
    const ticketPurchased = user.summit_tickets?.includes(envVariables.SUMMIT_ID);

    if (!ticketPurchased && !isAuthorized) {
      navigate('/authz/ticket', {
        state: {
          error: 'no-ticket'
        }
      })
      return null
    }
  }

  if (!(startDate < marketingNow) && !isAuthorized) {
    setTimeout(() => {
      navigate('/')
    }, 3000);
    return (
      <div className="container pt-5">
        <div className="columns">
          <div className="column">
            <h3>Its not yet show time!</h3>
          </div>
        </div>
      </div>
    )
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