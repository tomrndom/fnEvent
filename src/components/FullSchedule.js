import React from "react";
import { connect } from "react-redux";
import { addToSchedule, removeFromSchedule } from "../actions/user-actions";
import { getShareLink, callAction } from "../actions/schedule-actions";
import {needsLogin} from "../utils/schedule";

// these two libraries are client-side only
import Schedule from "full-schedule-widget/dist";
import "full-schedule-widget/dist/index.css";

import HomeSettings from "../content/home-settings.json";

const FullSchedule = ({
  summit,
  events,
  filters,
  view,
  className,
  userProfile,
  marketingSettings,
  addToSchedule,
  removeFromSchedule,
  callAction,
  ...rest
}) => {

  if (!summit) return null;

  const componentProps = {
    title: "Schedule",
    events: events,
    summit: summit,
    view: view,
    marketingSettings: marketingSettings.colors,
    userProfile: userProfile,
    triggerAction: (action, payload) => {
      switch (action) {
        case "ADDED_TO_SCHEDULE": {
          return addToSchedule(payload.event);
        }
        case "REMOVED_FROM_SCHEDULE": {
          return removeFromSchedule(payload.event);
        }
        default:
          return callAction(action, payload);
      }
    },
    colorSource: "track",
    withThumbs: false,
    defaultImage: HomeSettings.schedule_default_image,
    getShareLink: () => getShareLink(filters, view),
    onStartChat: () => {},
    onEventClick: () => {},
    needsLogin: needsLogin,
    ...rest,
  };

  return (
    <div className={className || "schedule-container"}>
      <Schedule {...componentProps} />
    </div>
  );
};

const mapStateToProps = ({ userState, summitState, scheduleState }) => ({
  userProfile: userState.userProfile,
  marketingSettings: summitState.marketingSettings,
  summit: summitState.summit,
  events: scheduleState.events,
  filters: scheduleState.filters,
  view: scheduleState.view,
});

export default connect(mapStateToProps, {
  addToSchedule,
  removeFromSchedule,
  callAction
})(FullSchedule);
