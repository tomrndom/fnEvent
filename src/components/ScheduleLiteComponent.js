import React, { Component } from "react"
import { Helmet } from 'react-helmet'

// these two libraries are client-side only
import ScheduleLite from 'schedule-lite/dist';
import 'schedule-lite/dist/index.css';

const ScheduleComponent = class extends React.Component {

  render() {

    const scheduleProps = {
      apiBaseUrl: "https://api.dev.fnopen.com",
      eventBaseUrl: "/a/event",
      trackBaseUrl: "/a/tracks",
      speakerBaseUrl: "/a/speakers",
      roomBaseUrl: "/a/rooms",
      summitId: 16,
      landscape: true,
      updateCallback: ev => console.log('event updated', ev),
      onEventClick: ev => this.props.eventClick(ev)
    };

    return (
      <React.Fragment>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/awesome-bootstrap-checkbox/1.0.2/awesome-bootstrap-checkbox.min.css" />
        </Helmet>
        <div style={{ padding: "0 15px" }}>
          <ScheduleLite {...scheduleProps} />
        </div>
      </React.Fragment>
    )
  }
}

export default ScheduleComponent