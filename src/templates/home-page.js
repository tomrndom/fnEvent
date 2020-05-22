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
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                Livestream
              </h2>
              {content && <PageContent className="content" content={content} />}
              <VideoComponent videoSrcURL="https://www.youtube.com/embed/P7d1H83IcjE" />
              <DisqusComponent />
              <ScheduleClientSide base='auth/home'/>
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
