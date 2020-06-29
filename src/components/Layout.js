import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import Header from '../components/Header'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'

import { safePrefix } from '../utils/safePrefix';

// import "../styles/all.scss"
// import "../styles/palette.scss"
// import "../styles/bulma.scss"

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()
  return (
    <div id="container">
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon.png`}
          sizes="16x16"
        />

        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,700;1,300&display=swap" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <link rel="stylesheet" href={safePrefix('assets/css/main.css')}/>
      </Helmet>
      <Header />
      <div id="content-wrapper">{children}</div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
