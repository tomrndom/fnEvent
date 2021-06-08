import React from "react"
import { Helmet } from 'react-helmet'
import { connect } from "react-redux";

import SpeakersWidget from 'speakers-widget';
import 'speakers-widget/index.css';

import EventsData from '../content/events.json'
import SpeakersData from '../content/speakers.json'

const SpeakersWidgetComponent = ({now, marketingSettings, ...props}) => {
    const widgetProps = {
        date: now,
        // featured: true,
        speakersData: SpeakersData,
        eventsData: EventsData,
        marketingData: marketingSettings.colors,
        ...props
    };

    return (
        <>
            <Helmet>
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/awesome-bootstrap-checkbox/1.0.2/awesome-bootstrap-checkbox.min.css" />
            </Helmet>
            <div>
                <SpeakersWidget {...widgetProps} />
            </div>
        </>
    )
}

const mapStateToProps = ({ clockState, summitState }) => ({
    now: clockState.nowUtc,
    marketingSettings: summitState.marketingSettings
});

export default connect(mapStateToProps, null)(SpeakersWidgetComponent)