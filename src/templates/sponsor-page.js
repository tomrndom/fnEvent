import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { connect } from 'react-redux'

import SponsorHeader from '../components/SponsorHeader'
import LiveEventWidgetComponent from '../components/LiveEventWidgetComponent'
import ScheduleLiteComponent from '../components/ScheduleLiteComponent'
import AdvertiseComponent from '../components/AdvertiseComponent'
import DocumentsComponent from '../components/DocumentsComponent'
import DisqusComponent from '../components/DisqusComponent'
import SponsorBanner from '../components/SponsorBanner'
import HeroComponent from '../components/HeroComponent'

import envVariables from '../utils/envVariables';
import SummitObject from '../content/summit.json'
import SponsorData from '../content/sponsor-data.json'

import Layout from '../components/Layout'

import styles from '../styles/sponsor-page.module.scss'

export const SponsorPageTemplate = class extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sponsor: null
    }
  }

  componentWillMount() {
    const { sponsorId } = this.props;
    const sponsor = SponsorData.sponsors.find(e => e.id === parseInt(sponsorId));
    if (sponsor) this.setState({ sponsor: sponsor });
  }

  componentDidMount() {
    console.log(this.state.sponsor)
  }

  onEventChange = (ev) => {
    const { eventId } = this.props;
    if (eventId !== `${ev.id}`) {
      navigate(`/a/event/${ev.id}`);
    }
  }

  render() {
    const { loggedUser, user } = this.props;
    const { sponsor } = this.state;
    let { summit } = SummitObject;

    if (!sponsor) {
      return <HeroComponent title="Sponsor not found" redirectTo="/a/" />
    } else {
      return (
        <>
          <SponsorHeader sponsor={sponsor} />
          <section className={`section px-0 ${sponsor.tier === 'gold' ? 'pt-5' : 'pt-0'} pb-0`}>
            <div className="columns mx-0 my-0 is-multiline">
              {sponsor.tier === 'gold' ?
                <React.Fragment>
                  <div className="column is-three-quarters px-5 py-0">
                    <h2>{sponsor.title}</h2>
                    <span>
                      {sponsor.intro}
                    </span>
                  </div>
                  <div className="column is-one-quarter px-5 py-0">
                    <DisqusComponent disqusSSO={user.disqusSSO} className={styles.disqusContainerSponsor} summit={summit} title="" />
                  </div>
                </React.Fragment>
                :
                <React.Fragment>
                  <div className="column is-half px-5 py-0">
                    <h2>{sponsor.title}</h2>
                    <span>
                      {sponsor.intro}
                    </span>
                  </div>
                  <div className="column is-half px-0 py-0">
                    <img src="/img/chemex.jpg" />
                  </div>
                </React.Fragment>
              }
              <div className="column is-three-quarters px-5 py-0">
                <LiveEventWidgetComponent
                  onEventClick={(ev) => this.onEventChange(ev)}
                />
              </div>
              <div className="column is-one-quarter px-5 py-0">
                <DocumentsComponent event={sponsor} sponsor={true} />
              </div>
              <div className="column is-three-quarters px-5 py-0">
                <ScheduleLiteComponent
                  accessToken={loggedUser.accessToken}
                  onEventClick={(ev) => this.onEventChange(ev)}
                  onViewAllEventsClick={() => this.onViewAllEventsClick()}
                  landscape={false}
                  yourSchedule={false}
                  showNav={false}
                  showAllEvents={false}
                  eventCount={3}
                />
              </div>
              <div className="column is-one-quarter px-5 py-0">
                <AdvertiseComponent section='lobby' column="left" style={{ marginTop: '2em' }} />
              </div>
              <div className="column is-three-quarters px-5 py-0">
                <SponsorBanner />
              </div>
            </div>
          </section>
        </>
      )
    }
  }
}

const SponsorPage = (
  {
    loggedUser,
    sponsorId,
    user,
    getDisqusSSO
  }
) => {

  return (
    <Layout>
      <SponsorPageTemplate
        loggedUser={loggedUser}
        sponsorId={sponsorId}
        user={user}
        getDisqusSSO={getDisqusSSO}
      />
    </Layout>
  )
}

SponsorPage.propTypes = {
  loggedUser: PropTypes.object,
  sponsorId: PropTypes.string,
  user: PropTypes.object,
  getDisqusSSO: PropTypes.func,
}

SponsorPageTemplate.propTypes = {
  loggedUser: PropTypes.object,
  sponsorId: PropTypes.string,
  user: PropTypes.object,
  getDisqusSSO: PropTypes.func,
}

const mapStateToProps = (
  {
    loggedUserState,
    userState,
  }
) => ({

  loggedUser: loggedUserState,
  user: userState,
})

export default connect(mapStateToProps, {})(SponsorPage);