import React from "react"
import { Helmet } from 'react-helmet'

import envVariables from '../utils/envVariables';

// these two libraries are client-side only
import LiveEventWidget from 'live-event-widget';
import 'live-event-widget/index.css';

import HomeSettings from "../content/home-settings";
import EventsData from '../content/events.json'
import SummitData from '../content/summit.json'
import MarketingData from '../content/colors.json'

const LiveEventWidgetComponent = class extends React.Component {

  render() {

    const widgetProps = {
      title: "",
      defaultImage: HomeSettings.schedule_default_image,
      eventsData: EventsData,
      summitData: SummitData.summit,
      marketingData: MarketingData.colors,
    };

    return (
      <>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/awesome-bootstrap-checkbox/1.0.2/awesome-bootstrap-checkbox.min.css" />
        </Helmet>
        <div>
          <LiveEventWidget {...widgetProps} {...this.props} />
        </div>
      </>
    )
  }
}

export default LiveEventWidgetComponent