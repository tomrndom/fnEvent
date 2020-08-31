import React from "react";
import { connect } from "react-redux";
import { Clock } from 'openstack-uicore-foundation/lib/components';
import { updateClock } from "../actions/clock-actions";

const ClockComponent = class extends React.Component {

  handleClockTick = (timestamp) => {
    const { updateClock } = this.props;
    updateClock(timestamp);
  };

  render() {
    const { summit } = this.props;

    return (
      <div>
        {summit &&
          <Clock onTick={this.handleClockTick} timezone={summit.time_zone_id} />
        }
      </div>
    );
  }
}


export default connect(null, { updateClock })(ClockComponent);