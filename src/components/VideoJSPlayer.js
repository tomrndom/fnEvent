import React, { Component } from "react";
import videojs from 'video.js';
import Youtube from 'videojs-youtube';

import 'video.js/dist/video-js.css'

export default class VideoPlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      updateCount: 0
    };
  }
  
  setup() {
    let updateCount = this.state.updateCount;
    this.setState({
      updateCount: updateCount + 1
    });
  }

  componentDidMount() {
    this.setup();
  }

  componentWillReceiveProps(nextProps) {
    // You should probably change this check
    if(this.props !== nextProps)
      this.setup();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.updateCount !== prevState.updateCount) {
      // If it has a player, dispose
      if(this.player) {
        this.player.dispose();
      }
      // Create new player
      this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
        console.log('onPlayerReady', this)
      });
    }
  }

  componentWillUnmount() {
    // Dispose player on unmount
    if(this.player) {
      this.player.dispose();
    }
  }
  render() {
    // Use `key` so React knows this item is going to change
    const key = `${this.props.id || ''}-${this.state.updateCount}`;
    return (
      <div key={key} data-vjs-player>
        <video ref={ node => this.videoNode = node } className="video-js vjs-big-play-centered"></video>
      </div>
    )
  }
}