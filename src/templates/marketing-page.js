import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import LobbyHeroMarketing from '../components/LobbyHeroMarketing'
import ScheduleLiteComponent from "../components/ScheduleLiteComponent"
import DisqusComponent from '../components/DisqusComponent'
import Content, { HTMLContent } from '../components/Content'
import envVariables from '../utils/envVariables';

import MarketingSite from '../content/marketing-site.json'

export const MarketingPageTemplate = ({
  title,
  content,
  contentComponent,
  user
}) => {
  const PageContent = contentComponent || Content

  return (
    <React.Fragment>
      <LobbyHeroMarketing />
      <div className="columns" id="marketing-columns">
        <div className="column is-half px-6 py-6">
          {MarketingSite.leftColumn.schedule &&
            <React.Fragment>
              <h2 style={{ fontWeight: 'bold' }}>Full Event Schedule</h2>
              <ScheduleLiteComponent accessToken={false} landscape={true} eventCount={10} eventClick={(ev) => this.onEventChange(ev)} />
            </React.Fragment>
          }
          {MarketingSite.leftColumn.disqus &&
            <React.Fragment>
              <h2 style={{ fontWeight: 'bold' }}>Join the conversation</h2>
              <DisqusComponent disqusSSO={user?.disqusSSO} summit={envVariables.SUMMIT_ID} title="" style={{ position: 'static' }}/>
            </React.Fragment>
          }
        </div>
        <div className="column is-half px-0">

          <div className="grid">
            {MarketingSite.sponsors.map((item, index) => {
              return (
                <div className={`grid-item-${index + 1}`} style={{ backgroundImage: `url(${item.image})` }} />
              )
            })}
          </div>
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
  user: PropTypes.object,
}

const MarketingPage = ({ data, user }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <Layout marketing={true}>
      <MarketingPageTemplate
        contentComponent={HTMLContent}
        title={frontmatter.title}
        content={html}
        user={user}
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
  user: PropTypes.object
}

const mapStateToProps = ({ userState }) => ({  
  user: userState,
})

export default connect(mapStateToProps, {})(MarketingPage)

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

