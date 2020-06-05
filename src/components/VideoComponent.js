import React from 'react'

import LiveVideoPlayer from './LiveVideoPlayer';
import YoutubeVideoComponent from './YoutubeVideoComponent';

const VideoComponent = class extends React.Component {

  constructor(props) {
    super(props);

    this.checkLiveVideo = this.checkLiveVideo.bind(this);
  }

  checkLiveVideo(url) {
    let isLiveVideo = null;
    url.match(/.m3u8/) ? isLiveVideo = true : isLiveVideo = false;
    return isLiveVideo;
  }

  render() {
    const { url } = this.props;
    
    if (url) {
      if (this.checkLiveVideo(url)) {
        const videoJsOptions = {
          autoplay: true,
          controls: true,
          fluid: true,
          sources: [{
            src: url,
            type: 'application/x-mpegURL'
          }]
        }
        return (
          <LiveVideoPlayer {...videoJsOptions} />
        )
      } else {
        return (
          <YoutubeVideoComponent videoSrcURL={url} />
        )
      }
    } else {
      return <span className="no-video">No video URL Provided</span>
    }
  }

}

export default VideoComponent
