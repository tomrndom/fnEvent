import React from "react"
const
  VideoComponent = ({ videoSrcURL, videoTitle, ...props }) => (
    <div className="video">
      <iframe
        width="100%"
        height="720"
        title={videoTitle}
        src={videoSrcURL}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen
      />
    </div>
  )
export default VideoComponent