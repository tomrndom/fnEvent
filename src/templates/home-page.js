import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

import Loadable from "@loadable/component"

import VideoComponent from '../components/VideoComponent'
import DisqusComponent from '../components/DisqusComponent'
const ScheduleClientSide = Loadable(() => import('../components/ScheduleComponent'))

export const HomePageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="video-row">
        <div className="video-player">
          <VideoComponent videoSrcURL="https://www.youtube.com/embed/0eEisMm9ykg" videoTitle="Introducing Airship"/>
        </div>
        <div className="disqus-container">
          <DisqusComponent />          
        </div>
      </div>
      <div className="video-title" style={{ padding: "15px" }}>
        <span><b>Wednesday, November 14, 9:20am-9:25am - CityCube Berlin - Level 1 - Hall A4-6</b></span>
        <h1>
          <b>Introducing Airship</b>
        </h1>
        <div className="speaker-info">
          <img /> 
          <span>Alan Meadows & Matt McEuen</span>
          <br />
          <span><b>Job Title</b></span>
        </div>
        {content && <PageContent className="content" content={content} />}
      </div>
      <br /><br />
      <div className="schedule-row">
        <div className="sponsor-container">
          <img src="/img/intel.png" alt="sponsor"/>
        </div>
        <div className="schedule-container">
          <ScheduleClientSide base='auth/home'/>
        </div>
        <div className="docs-container">

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

const HomePage = ({ data }) => {

  if (data) {
    const { markdownRemark: post } = data

    return (
      <Layout>
        <HomePageTemplate
          contentComponent={HTMLContent}
          title={post.frontmatter.title}
          content={post.html}
        />
      </Layout>
    )
  } else {
    return (
      <HomePageTemplate
        contentComponent={HTMLContent}          
      />
    )
  }  
}

HomePage.propTypes = {
  data: PropTypes.object,
}

export default HomePage

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
