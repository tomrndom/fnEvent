import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

import Loadable from "@loadable/component"

import YoutubeVideoComponent from '../components/YoutubeVideoComponent'
import DisqusComponent from '../components/DisqusComponent'
import Etherpad from '../components/Etherpad'
import RocketChatComponent from '../components/RocketChat'
import VideoComponent from '../components/VideoComponent'

import { getEventBySlug2 } from '../state/event-actions'

import TalkComponent from '../components/TalkComponent'

const ScheduleClientSide = Loadable(() => import('../components/ScheduleComponent'))

export const EventPageTemplate = class extends React.Component {

  constructor(props) {
    super(props);
    this.state = { eventId: '' };

  }

  componentDidMount() {
    let eventSlug = window.location.search.replace('?id=', '')
    this.props.getEventBySlug2(eventSlug);    
  }  

  componentDidUpdate() {
    console.log('component update');
  }

  render() {

    const { loggedUser, event } = this.props;

    console.log(event);

    if (event) {
      return (
        <section className="section section--gradient">
          <div className="video-row">
            <div className="video-player">
              {event.streaming_url ?
                <VideoComponent url={event.streaming_url} />
                :
                <TalkComponent event={event} noStream={true} />
              }
            </div>
            <div className="disqus-container">
              <DisqusComponent accessToken={loggedUser.accessToken} title={event.title} />
            </div>
          </div>
          <div className="talk">
            {event.streaming_url ? <TalkComponent event={event} noStream={false} /> : null}
            <div className="talk__row">
              <div className="talk__row--left">
                {event.etherpad_link && <Etherpad className="talk__etherpad" etherpad_link={event.etherpad_link} />}
              </div>
              <div className="talk__row--right">
                {/* <div className="talk__docs">
                  <div className="talk__docs--title">Documents</div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="schedule">
            <div className="schedule__row">
              <div className="schedule__row--left">
                <div className="rocket-container">
                  <RocketChatComponent accessToken={loggedUser.accessToken} embedded={false} />
                  <br/><br/><br/>
                  <ScheduleClientSide base='auth/event'/>
                </div>
              </div>
              <div className="schedule__row--right">
                <div className="sponsor-container">
                  <img src="/img/intel.png" alt="sponsor" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    } else {
      return (
        <div className="schedule">
          <div className="schedule__row">
            <div className="schedule__row--left">
              <div className="rocket-container">
                <span>Event not found</span>
                <ScheduleClientSide base='auth/event' accessToken={loggedUser.accessToken} />
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
}

EventPageTemplate.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const EventPage = ({ loggedUser, event, getEventBySlug2 }) => {

  return (
    <EventPageTemplate
      loggedUser={loggedUser}
      event={event}
      getEventBySlug2={getEventBySlug2}
    />
  )

}

EventPage.propTypes = {
  loggedUser: PropTypes.object,
  event: PropTypes.object
}

const mapStateToProps = ({ loggedUserState, eventState }) => ({
  loggedUser: loggedUserState,
  event: eventState.event
})

export default connect(
  mapStateToProps,
  {
    getEventBySlug2
  }
)(EventPage);