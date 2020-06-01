import React from 'react'

const RocketChatComponent = class extends React.Component {

  constructor(props) {
    super(props);    
    this.state = { auth: '', public_key: '' };
    this.getToken = this.getToken.bind(this);
  }

  componentDidMount() {
    this.getToken();
  }

  getToken = async () => {
    fetch(`https://idp.dev.fnopen.com/api/v1/sso/rocket-chat/fnvirtual-poc/profile?access_token=${this.props.accessToken}`)
    .then(response => response.json()) 
    .then(json => {
      console.log('HERE', json)
      this.setState({ auth: json.auth, public_key: json.public_key })
    }) 
  }

  render() {
    return (
      <div className="rocket-chat">
        working...         
      </div>
    )
  }
}

export default RocketChatComponent