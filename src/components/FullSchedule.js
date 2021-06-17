import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

// these two libraries are client-side only
import Schedule from "full-schedule-widget/dist";
import "full-schedule-widget/dist/index.css";

import HomeSettings from "../content/home-settings.json";

import { addToSchedule, removeFromSchedule } from "../actions/user-actions";

const FullSchedule = ({ summit, events, className, userProfile, marketingSettings, addToSchedule, removeFromSchedule, ...rest }) => {
  const wrapperClass = "schedule-container";

  if (!summit) return null;

  const componentProps = {
    events: events,
    summit: summit,
    marketingSettings: marketingSettings.colors,
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

const mapStateToProps = ({ userState, summitState, scheduleState }) => ({
  userProfile: userState.userProfile,
  marketingSettings: summitState.marketingSettings,
  summit: summitState.summit,
  events: scheduleState.events
});

export default connect(mapStateToProps, { addToSchedule, removeFromSchedule })(
  FullSchedule
);
