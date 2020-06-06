import React from 'react'
//import { Disqus } from 'gatsby-plugin-disqus'
import { DiscussionEmbed } from 'disqus-react';

const DisqusComponent = class extends React.Component {

  constructor(props) {
    super(props);
    this.state = { auth: '', public_key: '' };
    this.getToken = this.getToken.bind(this);
  }

  componentDidMount() {
    this.getToken();
  }

  getToken = async () => {
    fetch(`https://idp.dev.fnopen.com/api/v1/sso/disqus/fnvirtual-poc/profile?access_token=${this.props.accessToken}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ auth: json.auth, public_key: json.public_key })
      })
  }

  render() {
    let disqusConfig = {
      url: `https://idp-gatsby-poc.netlify.app/`,
      identifier: window.location,
      title: 'Conversation',
      remoteAuthS3: this.state.auth,
      apiKey: this.state.public_key,
    }
    
    if (!disqusConfig.remoteAuthS3 && !disqusConfig.apiKey) {
      return <span>Error loading Disqus</span>
    } else {
      return (
        <div className="disqus" style={{ paddingLeft: "20px" }}>
          <h3>{disqusConfig.title}</h3>
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