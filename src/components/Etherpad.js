import React from "react"
const
  Etherpad = ({ videoSrcURL, videoTitle, ...props }) => (
    <div className={props.className}>
      <iframe
        width="100%"
        height="420"
        src='https://etherpad.opendev.org/p/octagon'
      />
    </div>
  )
export default Etherpad