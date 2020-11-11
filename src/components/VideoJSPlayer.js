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
      console.log('¡src', src);

      let reloadPlayer = null;
      let modal = null;
      let isLive = null;

      this.player.on('error', () => {
        const videoError = this.player.error();
        console.log('video error', videoError);
        //        if (firstHalf !== null && videoError.code === 2) {
        if (reloadPlayer === null) {
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
          // if (firstHalf) {
            reloadPlayer = setInterval(() => {
              console.log('reload player...')
              this.player.load();
              this.player.src(src);
              this.player.reset();
            }, 60000);
          // }
        }
        //}
      });

      this.player.on('playing', () => {
        console.log('playing')
        if (reloadPlayer) clearInterval(reloadPlayer);
        if (modal) modal.dispose();
        console.log(this.player.duration());
        console.log(this.player.liveTracker);
        console.log(this.player.liveTracker.isTracking());
        console.log(this.player.liveTracker.isLive());        
        if (this.player.duration() === Infinity) {
          isLive = true;
        };
      });

      this.player.on('ended', () => {
        console.log('stream finished');        
        console.log(isLive);
        if (isLive) {
          this.player.pause();
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