import React from 'react'
import PropTypes from 'prop-types'
import { graphql, navigate } from 'gatsby'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import { createBrowserHistory } from 'history'

import Loadable from "@loadable/component"

const ScheduleLiteClientSide = Loadable(() => import('../components/ScheduleLiteComponent'))

export const HomePageTemplate = class extends React.Component {

  constructor(props) {
    super(props);

    this.onEventChange = this.onEventChange.bind(this);
  }

  componentWillMount() {
    const { loggedUser, eventId } = this.props;
    if (!loggedUser.isLoggedUser) {
      navigate('/a/login');
    }
  }

  onEventChange(ev) {
    navigate(`/a/event/${ev}`);
  }

  render() {

    const { loggedUser } = this.props;

    return (
      <div className="schedule">
        <div className="schedule__row">
          <div className="schedule__row--left">
            <div className="rocket-container">
              <ScheduleLiteClientSide accessToken={loggedUser.accessToken} eventClick={(ev) => this.onEventChange(ev)} />
            </div>
          </div>
          <div className="schedule__row--right">
            <div className="sponsor-container">
              <img src="/img/intel.png" alt="sponsor" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

HomePageTemplate.propTypes = {
  loggedUser: PropTypes.object,
  // event: PropTypes.object,
  eventId: PropTypes.string,
  getEventBySlug: PropTypes.func,
}

const HomePage = ({ data, loggedUser, location }) => {

  if (data) {
    const { event } = data
    return (
      <Layout>
        <HomePageTemplate
          loggedUser={loggedUser}
          location={location}
        />
      </Layout>
    )
  } else {
    return (
      <Layout>
        <HomePageTemplate
          loggedUser={loggedUser}
          location={location}
        />
      </Layout>
    )
  }
}

HomePage.propTypes = {
  data: PropTypes.object,
  loggedUser: PropTypes.object,
  location: PropTypes.object,
}

// export const HomePageQuery = graphql`
//   query HomePage($id: String!) {
//     event(id: { eq: $id }) {
//       title
//       description
//       attending_media      
//       end_date
//       etherpad_link
//       meeting_url
//       start_date
//       streaming_url
//       timezone
//     }
//   }
// `

const mapStateToProps = ({ loggedUserState, eventState }) => ({
  loggedUser: loggedUserState,
})

export default connect(mapStateToProps, {})(HomePage);
