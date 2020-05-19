import React from "react"
const
  Video = ({ videoSrcURL, videoTitle, ...props }) => (
    <div className="video" style={{ padding: "50px" }}>
      <iframe
        width="100%"
        height="1000"
        src="https://www.youtube.com/embed/P7d1H83IcjE"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen
      />
    </div>
  )
export default Video