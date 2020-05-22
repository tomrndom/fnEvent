import React from 'react'
import Loadable from "@loadable/component"

import Layout from '../../components/Layout'

import VideoComponent from '../../components/VideoComponent'
import DisqusComponent from '../../components/DisqusComponent'
const ScheduleClientSide = Loadable(() => import('../../components/ScheduleComponent'))

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        Testing place
        
        <VideoComponent videoSrcURL="https://www.youtube.com/embed/P7d1H83IcjE" />
        <DisqusComponent />
        <ScheduleClientSide base='blog'/>
      </Layout>
    )
  }
}
