import React from 'react'
import { Disqus } from 'gatsby-plugin-disqus'

const DisqusComponent = () => {
  let disqusConfig = {
    url: `https://idp-gatsby-poc.netlify.app/`,
    identifier: 'gatsby-idp-poc',
    title: 'Conversation',
  }
  return (
    <div className="disqus" style={{ paddingLeft: "20px" }}>
      <h3>{disqusConfig.title}</h3>      
      <Disqus config={disqusConfig} />
    </div>
  )
}

export default DisqusComponent