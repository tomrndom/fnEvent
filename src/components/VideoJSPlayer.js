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
      const src = this.player.src();

      let reloadPlayer = null;
      let modal = null;

      this.player.on('error', () => {
        //        if (firstHalf !== null) {
        this.player.errorDisplay.close();
        modal = this.player.createModal();
        modal.closeable(false);
        let newElement = document.createElement('div');
        newElement.classList.add('video-error');
        let message = firstHalf ? 'Video stream will begin momentarily' : 'VOD will be available soon';
        newElement.innerHTML = `
          <section class="hero">
            <div class="hero-body">
              <div class='has-text-centered'}>
                <h1 class="title">${message}</h1>               
              </div>
            </div>
          </section>
          `
        modal.content(newElement);
        modal.fill();
        reloadPlayer = setInterval(() => {
          console.log('reload player...')
          if (this.player.error().code === 4) {
            this.player.reset();
            this.player.src(src);
          }
        }, 30000);
        //}
      });

      this.player.on('playing', () => {
        console.log('playing')
        if (reloadPlayer) clearInterval(reloadPlayer);
        if (modal) modal.dispose();
      });

      this.player.on('ended', () => {
        console.log('stream finished')
        const isLive = this.player.liveTracker.isLive();
        if (isLive) {
          modal = this.player.createModal();
          modal.closeable(false);
          let newElement = document.createElement('div');
          newElement.classList.add('video-error');
          let message = 'VOD will be available soon';
          newElement.innerHTML = `
            <section class="hero">
              <div class="hero-body">
                <div class='has-text-centered'}>
                  <h1 class="title">${message}</h1>               
                </div>
              </div>
            </section>
            `
          modal.content(newElement);
          modal.fill();
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