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
        console.log(json);
        this.setState({ auth: json.auth, public_key: json.public_key })
      })
  }

  render() {

    const { title } = this.props;

    let disqusConfig = {
      url: window.location,
      identifier: window.location,
      title: title,
      remoteAuthS3: this.state.auth,
      apiKey: this.state.public_key,
    }
    
    if (!disqusConfig.remoteAuthS3 && !disqusConfig.apiKey) {
      return null;
    } else {
      return (
        <div className="disqus" style={{ paddingLeft: "20px" }}>
          <h3>Conversation</h3>
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