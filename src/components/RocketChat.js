import React from 'react'

const RocketChatComponent = class extends React.Component {

  constructor(props) {
    super(props);
    this.state = { auth: '', loggedIn: false, displayChat: false };
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

    let { loggedIn, displayChat } = this.state;

    if (loggedIn) {
      return (
        <div className="rocket-chat">
          <div className="rocket-chat--button" onClick={() => this.setState({ displayChat: !displayChat })}>
            <img src={displayChat ? '/img/close.svg' : '/img/chat.svg'} width="30px"/>
          </div>
          <iframe
            src="https://rocket-chat.dev.fnopen.com/channel/general?layout=embedded"
            width='400px'
            height="600px"
            style={{display : `${displayChat? '': 'none'}`}}
            className="rocket-chat--embedded"
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