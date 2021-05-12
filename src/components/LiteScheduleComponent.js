import React from "react"
import { Helmet } from 'react-helmet'
import { connect } from "react-redux";

// these two libraries are client-side only
import LiteSchedule from 'lite-schedule-widget/dist';
import 'lite-schedule-widget/dist/index.css';

import HomeSettings from '../content/home-settings.json'
import EventsData from '../content/events.json'
import SummitData from '../content/summit.json'
import MarketingData from '../content/colors.json'

import { addToSchedule, removeFromSchedule } from '../actions/user-actions';

const LiteScheduleComponent = ({ className, userProfile, page, addToSchedule, removeFromSchedule, ...rest }) => {
    const wrapperClass = page === 'marketing-site' ? 'schedule-container-marketing' : 'schedule-container';

    const componentProps = {
      defaultImage: HomeSettings.schedule_default_image,
      eventsData: EventsData,
      summitData: SummitData.summit,
      marketingData: MarketingData.colors,
      userProfile: userProfile,
      triggerAction: (action, {event}) => {
        switch (action) {
          case 'ADDED_TO_SCHEDULE': {
              return addToSchedule(event);
          }
          case 'REMOVED_FROM_SCHEDULE': {
            return removeFromSchedule(event);
          }
        }
      }
    };

    return (
      <React.Fragment>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/awesome-bootstrap-checkbox/1.0.2/awesome-bootstrap-checkbox.min.css" />
        </Helmet>
        <div className={className || wrapperClass}>
          <LiteSchedule {...componentProps} {...rest} />
        </div>
      </React.Fragment>
    )
};

const mapStateToProps = ({ userState }) => ({
  userProfile: userState.userProfile
});

export default connect(mapStateToProps, { addToSchedule, removeFromSchedule })(LiteScheduleComponent)
