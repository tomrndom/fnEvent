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

import envVariables from '../utils/envVariables';
import SummitObject from '../content/summit.json'

import Layout from '../components/Layout'

import styles from '../styles/sponsor-page.module.scss'

export const SponsorPageTemplate = class extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    const { loggedUser, user } = this.props;
    let { summit } = SummitObject;

    return (
      <>
        <SponsorHeader />
        <section className="section px-0 pt-5 pb-0">
          <div className="columns mx-0 my-0 is-multiline">
            <div className="column is-three-quarters px-5 py-0">
              <h2>We are Lenovo</h2>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget ipsum tempor lorem 
                interdum volutpat eu et elit. Sed eleifend justo et semper ultrices. Fusce porta ut sapien at 
                posuere. Donec placerat, lacus eget imperdiet maximus, nunc lectus viverra ligula, in sodales 
                tortor justo vel sem. Vestibulum eleifend, nibh a dapibus rhoncus, tortor dui venenatis enim, 
                ac euismod augue velit at justo. Cras porta lacus est, nec rhoncus augue luctus quis. 
                Pellentesque justo risus, scelerisque laoreet tortor quis, vehicula volutpat ipsum.
              </span>
            </div>
            <div className="column is-one-quarter px-5 py-0">
              <DisqusComponent disqusSSO={user.disqusSSO} className={styles.disqusContainerSponsor} summit={summit} title="" />
            </div>
            <div className="column is-three-quarters px-5 py-0">
              <LiveEventWidgetComponent
                onEventClick={(ev) => this.onEventChange(ev)}
              />
            </div>
            <div className="column is-one-quarter px-5 py-0">
              {/* <DocumentsComponent /> */}
              documents
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