import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'

import envVariables from '../utils/envVariables'

import SummitObject from '../content/summit.json'

export const TicketErrorPageTemplate = class extends React.Component {

  constructor(props) {
    super(props);

    const { location } = this.props;

    this.state = {
      error: location.state?.error
    }
  }

  redirect() {
    const { error } = this.state;

    if (envVariables.REGISTRATION_BASE_URL) {

      let targetUrl = null;
      switch (error) {
        case 'no-ticket':
          const { summit: { slug } } = SummitObject
          targetUrl = `${envVariables.REGISTRATION_BASE_URL}/a/${slug}/`;
          break;
        case 'incomplete':
          targetUrl = `${envVariables.REGISTRATION_BASE_URL}/a/tickets`;
          break;
        default:
          break;
      }

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 5000);

    } else {

      setTimeout(() => {
        navigate('/')
      }, 5000);
    }
  }

  getErrorMessage() {
    const { error } = this.state;

    let message = '';

    switch (error) {
      case 'no-ticket':
        message = 'I’m sorry you are not registered for this event.';
        break;
      case 'incomplete':
        message = 'You have not answered questions required to join the event.';
        break;
      default:
        break;
    }

    return message;
  }

  getRedirectMessage() {
    const { error } = this.state;

    return error && envVariables.REGISTRATION_BASE_URL ?
      'You will be redirected to registration.' : '';
  }

  render() {
    const { error } = this.state;

    if (error) {
      this.redirect();
      return (
        <div className="container pt-5">
          <div className="columns">
            <div className="column">
              <h3>{this.getErrorMessage()}</h3>
              <h3>{this.getRedirectMessage()}</h3>
            </div>
          </div>
        </div>
      )
    } else {
      navigate('/')
      return null
    }
  }
}

TicketErrorPageTemplate.propTypes = {
  location: PropTypes.object,
}

const TicketErrorPage = ({ location }) => {

  return (
    <TicketErrorPageTemplate
      location={location}
    />
  )

}

TicketErrorPage.propTypes = {
  location: PropTypes.object,
}

export default TicketErrorPage;