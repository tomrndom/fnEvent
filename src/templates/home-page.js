import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

import Loadable from "@loadable/component"

import YoutubeVideoComponent from '../components/YoutubeVideoComponent'
import DisqusComponent from '../components/DisqusComponent'
import Etherpad from '../components/Etherpad'
import RocketChatComponent from '../components/RocketChat'
import LiveVideoPlayer from '../components/LiveVideoPlayer'

const ScheduleClientSide = Loadable(() => import('../components/ScheduleComponent'))

export const HomePageTemplate = ({ title, content, contentComponent, loggedUserState }) => {
  const PageContent = contentComponent || Content

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    fluid: true,
    sources: [{
      src: 'https://stream.mux.com/jMXSdkQaDVOWa6r1zYYDr6YyckfbDxIKzbKLsTnqexw.m3u8',
      type: 'application/x-mpegURL'
    }],
  }

  return (
    <section className="section section--gradient">
      <div className="video-row">
        <div className="video-player">
          <YoutubeVideoComponent videoSrcURL="https://www.youtube.com/embed/0eEisMm9ykg" videoTitle="Introducing Airship" />
        </div>
        <div className="disqus-container">
          <DisqusComponent accessToken={loggedUserState.accessToken} />
        </div>
      </div>
      <div className="talk">
        <div className="talk__row">
          <div className="talk__row--left">
            <span className="talk__date">Wednesday, November 14, 9:20am-9:25am - CityCube Berlin - Level 1 - Hall A4-6</span>
            <h1>
              <b>Introducing Airship</b>
            </h1>
            <div className="talk__speaker">
              <img />
              <span>Alan Meadows & Matt McEuen</span>
              <br /><br />
              <div className="talk__description">
                Swisscom has one of the largest in-production industry standard Platform as a Service built on Openstack.
                Their offering is focused on providing an enterprise-grade PaaS environment to customers worldwide and with various delivery models based on Cloud Foundry and Openstack.
              </div>
            </div>
          </div>
          <div className="talk__row--right">
            <div className="talk__"> &lt;3 Like | Share</div>
            <div className="talk__join-button">join zoom to take the mic !</div>
          </div>
        </div>
        <div className="talk__row">
          <div className="talk__row--left">
            <Etherpad className="talk__etherpad" />
          </div>
          <div className="talk__row--right">
            <div className="talk__docs">
              <div className="talk__docs--title">Documents</div>
            </div>
          </div>
        </div>
        {content && <PageContent className="content" content={content} />}
        <RocketChatComponent accessToken={loggedUserState.accessToken} embedded={true} />
        <LiveVideoPlayer {...videoJsOptions} />
      </div>
      <br /><br />
      <div className="schedule">
        <div className="schedule__row">
          <div className="schedule__row--left">
            <div className="schedule-container">
              <ScheduleClientSide base='auth/home' accessToken={loggedUserState.accessToken} />
            </div>
          </div>
          <div className="schedule__row--right">
            <div className="sponsor-container">
              <img src="/img/intel.png" alt="sponsor" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

HomePageTemplate.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const HomePage = ({ data, loggedUserState }) => {

  if (data) {
    const { markdownRemark: post } = data

    return (
      <Layout>
        <HomePageTemplate
          contentComponent={HTMLContent}
          title={post.frontmatter.title}
          content={post.html}
          loggedUserState={loggedUserState}
        />
      </Layout>
    )
  } else {
    return (
      <HomePageTemplate
        contentComponent={HTMLContent}
        loggedUserState={loggedUserState}
      />
    )
  }
}

HomePage.propTypes = {
  data: PropTypes.object,
  loggedUserState: PropTypes.object
}

export default connect(state => ({
  loggedUserState: state.loggedUserState
}), null)(HomePage)

export const homePageQuery = graphql`
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
