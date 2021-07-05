import React from "react"
import {connect} from "react-redux";
import { Helmet } from 'react-helmet'

// these two libraries are client-side only
import LiveEventWidget from 'live-event-widget/dist/index.js';
import 'live-event-widget/dist/index.css';

import HomeSettings from "../content/home-settings";
import EventsData from '../content/events.json'
import SummitData from '../content/summit.json'

const LiveEventWidgetComponent = ({marketingSettings, ...rest}) => {

    const widgetProps = {
        title: "",
        defaultImage: HomeSettings.schedule_default_image,
        eventsData: EventsData,
        summitData: SummitData.summit,
        marketingData: marketingSettings.colors,
        ...rest
    };

    return (
        <>
            <Helmet>
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/awesome-bootstrap-checkbox/1.0.2/awesome-bootstrap-checkbox.min.css" />
            </Helmet>
            <div>
                <LiveEventWidget {...widgetProps} />
            </div>
        </>
    )
};

const mapStateToProps = ({ summitState }) => ({
    marketingSettings: summitState.marketingSettings
});

export default connect(mapStateToProps, { })(LiveEventWidgetComponent)