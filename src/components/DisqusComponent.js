import React from 'react'
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'

const DisqusComponent = () => {
  let disqusConfig = {
    url: `https://localhost:8000/`,
    identifier: 'id',
    title: 'title',
  }
  return (
    <div className="disqus" style={{ padding: "50px" }}>
      <h1>{disqusConfig.title}</h1>
      <CommentCount config={disqusConfig} placeholder={'...'} />
      <Disqus config={disqusConfig} />
    </div>
  )
}

export default DisqusComponent