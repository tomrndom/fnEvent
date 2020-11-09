import React from 'react'
import videojs from 'video.js';
import Youtube from 'videojs-youtube';
import 'videojs-mux';

import 'video.js/dist/video-js.css';

import envVariables from '../utils/envVariables'

class VideoJSPlayer extends React.Component {
  componentDidMount() {
    const { title, namespace, firstHalf } = this.props;

    let plugins = {}

    if (envVariables.MUX_ENV_KEY) {
      plugins = {
        ...plugins,
        mux: {
          debug: false,
          data: {
            env_key: envVariables.MUX_ENV_KEY,
            video_title: title,
            sub_property_id: namespace,
            /* Metadata
            player_init_time: playerInitTime*/
          }
        }
      }
    }

    const options = {
      html5: {
        hls: {
          overrideNative: !videojs.browser.IS_SAFARI,
        },
      },
      plugins: plugins,
      ...this.props,
    };

    const onPlayerReady = () => {
      console.log('onPlayerReady', this.player);
      this.player.on('error', () => {
        if (firstHalf !== null) {
          this.player.errorDisplay.close();
          let modal = this.player.createModal();
          modal.closeable(false);
          let newElement = document.createElement('div');          
          newElement.style.display = 'flex';
          newElement.style.height = '100%';
          let message = firstHalf ? 'Video stream will begin momentarily' : 'VOD will be available soon';
          newElement.innerHTML = `
          <section class="hero" style="background-color: #8CC639; align-self: center; width: 100%">
            <div class="hero-body">
              <div class='has-text-centered'}>
                <h1 style='color: white' class="title">${message}</h1>               
              </div>
            </div>
          </section>
          `
          modal.content(newElement);
          modal.fill();          
          modal.on('modalclose', () => {
            this.player.play();
          });
        }
      });
    }

    this.player = videojs(this.videoNode, options, onPlayerReady);
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sources !== this.props.sources) {
      this.player.src(nextProps.sources);
      this.player.poster(nextProps.poster);
    }
  }
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video
            ref={node => (this.videoNode = node)}
            className="video-js vjs-big-play-centered"
            playsInline={this.props.playsInline}
          />
        </div>
      </div>
    );
  }
}

export default VideoJSPlayer;