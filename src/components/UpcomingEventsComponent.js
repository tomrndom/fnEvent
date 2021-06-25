import React from "react"
import { Helmet } from 'react-helmet'
import { connect } from "react-redux";

// these two libraries are client-side only
import UpcomingEvents from 'upcoming-events-widget/dist';
import 'upcoming-events-widget/dist/index.css';

import HomeSettings from '../content/home-settings.json'
import EventsData from '../content/events.json'
import SummitData from '../content/summit.json'

import { addToSchedule, removeFromSchedule } from '../actions/user-actions';

const UpcomingEventsComponent = ({className, userProfile, page, addToSchedule, removeFromSchedule, marketingSettings, ...rest}) => {
    const wrapperClass = page === 'marketing-site' ? 'schedule-container-marketing' : 'schedule-container';

    const componentProps = {
        defaultImage: HomeSettings.schedule_default_image,
        eventsData: EventsData,
        summitData: SummitData.summit,
        marketingData: marketingSettings.colors,
        userProfile: userProfile,
        showAllEvents: true,
        triggerAction: (action, {event}) => {
            switch (action) {
                case 'ADDED_TO_SCHEDULE': {
                    return addToSchedule(event);
                }
                case 'REMOVED_FROM_SCHEDULE': {
                    return removeFromSchedule(event);
                }
                default:
                    return;
            }
        }
    };

    return (
      <>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/awesome-bootstrap-checkbox/1.0.2/awesome-bootstrap-checkbox.min.css" />
        </Helmet>
        <div className={className || wrapperClass}>
          <UpcomingEvents {...componentProps} {...rest} />
        </div>
      </>
    )
};

const mapStateToProps = ({ userState, summitState }) => ({
    userProfile: userState.userProfile,
    marketingSettings: summitState.marketingSettings
});

export default connect(mapStateToProps, { addToSchedule, removeFromSchedule })(UpcomingEventsComponent)
