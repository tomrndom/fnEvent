import React, { Component } from "react"
import { Helmet } from 'react-helmet'

// these two libraries are client-side only
import 'summit-schedule-app'
import 'summit-schedule-app/dist/main.css'

const ScheduleComponent = class extends React.Component {
  // custom component using client-side libraries
  render() {
    return (
      <React.Fragment>
        <Helmet>          
          <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
          <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/awesome-bootstrap-checkbox/1.0.2/awesome-bootstrap-checkbox.min.css" />
        </Helmet>
        <summit-schedule
          summit_id="27"
          api_access_token=""
          api_url="https://testresource-server.openstack.org"
          schedule_base="schedule"
          schedule_url="localhost/schedule"
          login_url="login-url-not-set"
          calendar_instructions_link="calendar-instructions-link-not-set"
          venues_page_link="venues-page-not-set"
        />
      </React.Fragment>      
    )
  }  
}

export default ScheduleComponent