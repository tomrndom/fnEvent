import React from 'react'
import { Disqus } from 'gatsby-plugin-disqus'

const DisqusComponent = () => {
  let disqusConfig = {
    url: `https://idp-gatsby-poc.netlify.app/`,
    identifier: 'gatsby-idp-poc',
    title: 'Comments',
  }
  return (
    <div className="disqus" style={{ padding: "15px" }}>
      <h1>{disqusConfig.title}</h1>      
      <Disqus config={disqusConfig} />
    </div>
  )
}

export default DisqusComponent