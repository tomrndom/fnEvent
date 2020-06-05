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

import { epochToMomentTimeZone } from "openstack-uicore-foundation/lib/methods";

const ScheduleClientSide = Loadable(() => import('../components/ScheduleComponent'))

export const EventPageTemplate = class extends React.Component {

  constructor(props) {
    super(props);
    this.state = { eventId: '' };

    this.formatEventDate = this.formatEventDate.bind(this);
    this.formatSpeakers = this.formatSpeakers.bind(this);
    this.formatEventLocation = this.formatEventLocation.bind(this);
  }

  componentDidMount() {
    let eventSlug = window.location.search.replace('?id=', '')
    this.props.getEventBySlug2(eventSlug);
  }

  formatEventDate(startDate, endDate) {
    // const timeZone = summit.time_zone_id;
    // const date = epochToMomentTimeZone(event.start_date, timeZone).format('dddd, MMMM D')
    // const startTime = epochToMomentTimeZone(event.start_date, timeZone).format('h:mm a');
    // const endTime = epochToMomentTimeZone(event.end_date, timeZone).format('h:mm a');
    // const dateNice = `${date}, ${startTime} - ${endTime}`;
    // return dateNice;
  }

  formatSpeakers(speakers) {
    let formatedSpeakers = '';
    speakers.map((speaker, index) => {
      formatedSpeakers += `${speaker.first_name} ${speaker.last_name}`;
      if (speakers.length > index + 2) formatedSpeakers += ', ';
      if (speakers.length - 2 === index) formatedSpeakers += ' & ';
    })
    return formatedSpeakers;
  }

  formatEventLocation(event) {
    let formattedLocation = `${event.location?.venue?.name} - ${event.location?.floor?.name} - ${event.location?.name}`;
    return formattedLocation;
  }

  render() {

    const { loggedUser, event } = this.props;

    if (event) {
      return (
        <section className="section section--gradient">
          <div className="video-row">
            <div className="video-player">
              <VideoComponent url={event.streaming_url} />
            </div>
            <div className="disqus-container">
              <DisqusComponent accessToken={loggedUser.accessToken} />
            </div>
          </div>
          <div className="talk">
            <div className="talk__row">
              <div className="talk__row--left">
                <span className="talk__date">Date - {this.formatEventLocation(event)}</span>
                <h1>
                  <b>{event.title}</b>
                </h1>
                <div className="talk__speaker">
                  <img />
                  <span className="talk__speaker--name">{this.formatSpeakers(event.speakers)}</span>
                  <br /><br />
                  <div className="talk__description" dangerouslySetInnerHTML={{ __html: event.description }} />
                </div>
              </div>
              <div className="talk__row--right">
                <div className="talk__"> &lt;3 Like | Share</div>
                <div className="talk__join-button">join zoom to take the mic !</div>
              </div>
            </div>
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
                  {/* <ScheduleClientSide base='auth/event' accessToken={loggedUser.accessToken} /> */}
                  <RocketChatComponent accessToken={loggedUser.accessToken} embedded={false} />
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
      return <span>Event not found</span>
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