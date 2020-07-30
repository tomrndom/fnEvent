import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import LobbyHeroMarketing from '../components/LobbyHeroMarketing'
import ScheduleLiteComponent from "../components/ScheduleLiteComponent";
import Content, { HTMLContent } from '../components/Content'

export const MarketingPageTemplate = ({
  title,
  content,
  contentComponent
}) => {
  const PageContent = contentComponent || Content

  return (
    <React.Fragment>
      <LobbyHeroMarketing />
      <div className="columns">
        <div className="column is-half px-6 py-6">
          <h2 style={{ fontWeight: 'bold' }}>Full Event Schedule</h2>
          <ScheduleLiteComponent accessToken={false} landscape={true} eventCount={10} eventClick={(ev) => this.onEventChange(ev)} />
        </div>
        <div className="column is-half px-0">

          <div className="marketing-images">
            <div className="marketing-img" style={{ backgroundColor: 'green' }}>
              1
            </div>
            <div className="marketing-img-double" style={{ backgroundColor: 'pink' }}>
              1</div>
            <div className="marketing-img" style={{ backgroundColor: 'red' }}>
              1</div>
            <div className="marketing-img" style={{ backgroundColor: 'brown' }}>
              1</div>
            <div className="marketing-img" style={{ backgroundColor: 'white' }}>
              1</div>
            <div className="marketing-img-double" style={{ backgroundColor: 'black' }}>
              1</div>
          </div>


          {/* <div className="grid">
            <div className="grid-item-1" style={{ backgroundColor: 'green' }}>
              1
            </div>
            <div className="grid-item-2" style={{ backgroundColor: 'pink' }}>
              1</div>
            <div className="grid-item-3" style={{ backgroundColor: 'red' }}>
              1</div>
            <div className="grid-item-4" style={{ backgroundColor: 'brown' }}>
              1</div>
            <div className="grid-item-5" style={{ backgroundColor: 'white' }}>
              1</div>
            <div className="grid-item-6" style={{ backgroundColor: 'black' }}>
              1</div>
          </div> */}
        </div>
      </div>
      <PageContent content={content} />
    </React.Fragment>
  )
}

MarketingPageTemplate.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const MarketingPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <Layout marketing={true}>
      <MarketingPageTemplate
        contentComponent={HTMLContent}
        title={frontmatter.title}
        content={html}
      />
    </Layout>
  )
}

MarketingPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default MarketingPage

export const marketingPageQuery = graphql`
  query MarketingPageTemplate($id: String!) {    
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {        
        title
      }
    }
  }
`

