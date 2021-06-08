import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

// these two libraries are client-side only
import Schedule from "full-schedule-widget/dist";
import "full-schedule-widget/dist/index.css";

import HomeSettings from "../content/home-settings.json";
import EventsData from "../content/events.json";
import SummitData from "../content/summit.json";

import { addToSchedule, removeFromSchedule } from "../actions/user-actions";

const FullSchedule = ({ className, userProfile, marketingSettings, addToSchedule, removeFromSchedule, ...rest }) => {
  const wrapperClass = "schedule-container";

  const componentProps = {
    eventsData: EventsData,
    summitData: SummitData.summit,
    marketingData: marketingSettings.colors,
    userProfile: userProfile,
    triggerAction: (action, { event }) => {
      switch (action) {
        case "ADDED_TO_SCHEDULE": {
          return addToSchedule(event);
        }
        case "REMOVED_FROM_SCHEDULE": {
          return removeFromSchedule(event);
        }
      }
    },
    getShareLink: () => {},
    getSyncLink: () => {},
    title: "Schedule",
    filters: {},
    colorSource: "track",
    withThumbs: false,
    defaultImage: HomeSettings.schedule_default_image,
    ...rest
  };

  return (
    <div className={className || wrapperClass}>
      <Schedule {...componentProps} />
    </div>
  );
};

const mapStateToProps = ({ userState, summitState }) => ({
  userProfile: userState.userProfile,
  marketingSettings: summitState.marketingSettings
});

export default connect(mapStateToProps, { addToSchedule, removeFromSchedule })(
  FullSchedule
);
