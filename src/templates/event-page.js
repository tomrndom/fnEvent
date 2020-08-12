import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { connect } from 'react-redux'

import envVariables from '../utils/envVariables';
import SummitObject from '../content/summit.json'

import Layout from '../components/Layout'

import DisqusComponent from '../components/DisqusComponent'
import Etherpad from '../components/Etherpad'
import ScheduleLiteComponent from '../components/ScheduleLiteComponent'
import SimpleChatWidgetComponent from '../components/SimpleChatWidgetComponent'
import VideoComponent from '../components/VideoComponent'
import TalkComponent from '../components/TalkComponent'
import AdvertiseComponent from '../components/AdvertiseComponent'
import DocumentsComponent from '../components/DocumentsComponent'
import EventHeroComponent from '../components/EventHeroComponent'

import { getEventBySlug } from '../actions/event-actions'
import { getDisqusSSO } from '../actions/user-actions'

import { AttendanceTracker } from "openstack-uicore-foundation/lib/components";

export const EventPageTemplate = class extends React.Component {

  constructor(props) {
    super(props);
    this.onEventChange = this.onEventChange.bind(this);
  }

  componentWillMount() {
    const { eventId } = this.props;
    this.props.getEventBySlug(eventId);
  }

  componentDidMount() {
    this.props.getDisqusSSO();
  }

  onEventChange(ev) {
    navigate(`/a/event/${ev}`);
    this.props.getEventBySlug(ev);
  }

  render() {

    const { loggedUser, event, user } = this.props;
    let { summit } = SummitObject;

    if (event) {
      return (
        <>
          <EventHeroComponent />
          {event.id &&
            <AttendanceTracker
              key={event.id}
              eventId={event.id}
              summitId={summit.id}
              apiBaseUrl={envVariables.SUMMIT_API_BASE_URL}
              accessToken={loggedUser.accessToken}
            />
          }
          <section className="section px-0 py-0" style={{ marginBottom: event.class_name !== 'Presentation' ? '-3rem' : '' }}>
            <div className="columns is-gapless">
              {event.streaming_url ?
                <div className="column is-three-quarters px-0 py-0">
                  <VideoComponent url={event.streaming_url} />
                  {event.meeting_url &&
                    <div className="join-zoom-container">
                      <span>
                        Take the Virtual Mic and participate!
                      </span>
                      <a className="zoom-link" href={event.meeting_url}>
                        <button className="zoom-button button">
                          <b>Join now</b>
                        </button>
                      </a>
                      <a target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                      </a>
                    </div>
                  }
                </div>
                :
                <div className="column is-three-quarters px-0 py-0 is-hidden-mobile">
                  <TalkComponent event={event} summit={summit} noStream={true} />
                </div>
              }
              <div className="column is-hidden-tablet">
                <TalkComponent event={event} summit={summit} noStream={true} />
              </div>
              <div className="column" style={{ position: 'relative', borderBottom: '1px solid #d3d3d3' }}>
                <DisqusComponent disqusSSO={user.disqusSSO} event={event} summit={summit} title="Public Conversation" />
              </div>
            </div>
          </section>
          {event.streaming_url &&
            <section className="section px-0 pt-6 pb-0">
              <div className="columns mx-0 my-0 is-multiline">
                <div className="column px-0 py-0 is-three-quarters is-hidden-mobile">
                  <TalkComponent event={event} summit={summit} noStream={true} />
                </div>
                <DocumentsComponent event={event} />
                {event.etherpad_link &&
                  <div className="column is-three-quarters">
                    <Etherpad className="talk__etherpad" etherpad_link={event.etherpad_link} userName={user.userProfile.first_name} />
                  </div>
                }
                <div className="column is-one-quarter" style={{ marginLeft: 'auto' }}>
                  <SimpleChatWidgetComponent accessToken={loggedUser.accessToken} />
                </div>
              </div>
            </section>
          }
        </>
      )
    } else {
      return (
        <section className="section px-4 py-6">
          <div className="columns">
            <div className="column is-three-quarters pb-6">
              <span>Event not found</span>
              <br />
              <ScheduleLiteComponent accessToken={loggedUser.accessToken} landscape={true} onEventClick={(ev) => this.onEventChange(ev)} />
            </div>
            <div className="column is-one-quarter has-text-centered pb-6">
              <AdvertiseComponent section='event' id={event.id} />
            </div>
          </div>
        </section >
      )
    }
  }
}

const EventPage = (
  {
    loggedUser,
    event,
    eventId,
    user,
    getEventBySlug,
    getDisqusSSO
  }
) => {

  return (
    <Layout>
      <EventPageTemplate
        loggedUser={loggedUser}
        event={event}
        eventId={eventId}
        user={user}
        getEventBySlug={getEventBySlug}
        getDisqusSSO={getDisqusSSO}
      />
    </Layout>
  )
}

EventPage.propTypes = {
  loggedUser: PropTypes.object,
  event: PropTypes.object,
  eventId: PropTypes.string,
  user: PropTypes.object,
  getEventBySlug: PropTypes.func,
  getDisqusSSO: PropTypes.func,
}

EventPageTemplate.propTypes = {
  loggedUser: PropTypes.object,
  event: PropTypes.object,
  eventId: PropTypes.string,
  user: PropTypes.object,
  getEventBySlug: PropTypes.func,
  getDisqusSSO: PropTypes.func,
}

const mapStateToProps = (
  {
    loggedUserState,
    eventState,
    userState
  }
) => ({

  loggedUser: loggedUserState,
  event: eventState.event,
  user: userState,
})

export default connect(
  mapStateToProps,
  {
    getEventBySlug,
    getDisqusSSO
  }
)(EventPage);