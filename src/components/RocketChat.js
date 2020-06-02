import React from 'react'

const RocketChatComponent = class extends React.Component {

  constructor(props) {
    super(props);
    this.state = { auth: '', loggedIn: false };
    this.getToken = this.getToken.bind(this);
  }

  componentDidMount() {
    this.getToken();
  }

  getToken = async () => {
    fetch(`https://idp.dev.fnopen.com/api/v1/sso/rocket-chat/fnvirtual-poc/profile?access_token=${this.props.accessToken}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ auth: json.authToken })
      })
      .then(() => {
        window.parent.postMessage({
          event: 'login-with-token',
          loginToken: this.state.auth
        }, 'https://rocket-chat.dev.fnopen.com/')
      }).then(() => this.setState({ loggedIn: true }))
  }

  render() {

    let { loggedIn } = this.state;

    if (loggedIn) {
      return (
        <div className="rocket-chat">
          <iframe
            src="https://rocket-chat.dev.fnopen.com/channel/general?layout=embedded"
            width='100%'
            height="500px"
          ></iframe>
        </div>
      )
    } else {
      return (
        <span>Loading...</span>
      )
    }
  }
}

export default RocketChatComponent