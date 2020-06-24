import React from 'react';
import videojs from 'video.js';
import Youtube from 'videojs-youtube';

import 'video.js/dist/video-js.css'

class VideoJSPlayer extends React.Component {

  constructor(props) {
    super(props)
    this.state = { updateCount: 0 }
  }
  
  setup() {
    let updateCount = this.state.updateCount
    this.setState({ updateCount: updateCount + 1 })
  }

  componentDidMount() {
    this.setup();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps) this.setup()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.updateCount !== prevState.updateCount) {
      if (this.player) this.player.pause()
      this.player = videojs(this.videoNode, this.props, null)
    }
  }

  componentWillUnmount() {
    if(this.player) this.player.dispose()
  }

  render() {
    const key = `${this.props.id || ''}-${this.state.updateCount}`
    return (
      <div key={key} data-vjs-player>
        <video ref={ node => this.videoNode = node } className="video-js vjs-big-play-centered"></video>
      </div>
    )
  }
}

export default VideoJSPlayer;