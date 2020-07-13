import React from 'react'
//import { Disqus } from 'gatsby-plugin-disqus'
import { DiscussionEmbed } from 'disqus-react';

const DisqusComponent = class extends React.Component {

  render() {

    const { disqusSSO, title, style, summit, event } = this.props;

    let disqusConfig = {
      url: window.location.href,
      identifier: `${event ? `summit/${summit.id}/event/${event.id}` : `summit/${summit.id}/lobby`}`,
      title: summit.name ? summit.name : event.title,
      remoteAuthS3: disqusSSO.auth,
      apiKey: disqusSSO.public_key,
    }

    if (!disqusConfig.remoteAuthS3 && !disqusConfig.apiKey) {
      return null;
    } else {
      return (
        <div className={style ? '' : 'disqus-container'} style={style}>
          <h3>{title}</h3>
          <DiscussionEmbed
            shortname='fnvirtual-poc'
            config={disqusConfig}
          />
        </div>
      )
    }
  }

}

export default DisqusComponent