import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

import '../styles/login.css'
import LoginButton from '../components/LoginButton'

import { navigate } from "gatsby"

export const LoginPageTemplate = ({ title, content, contentComponent, loggedUserState }) => {
  const PageContent = contentComponent || Content

  if (loggedUserState.isLoggedUser) {
    navigate('/auth/home');
  }

  return (
    <React.Fragment>
      <LoginButton />
    </React.Fragment>
  )
}

LoginPageTemplate.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const LoginPage = ({ data, loggedUserState }) => {
  if (data) {
    const { markdownRemark: post } = data

    return (
      <Layout>
        <LoginPageTemplate
          contentComponent={HTMLContent}
          title={post.frontmatter.title}
          content={post.html}
          loggedUserState={loggedUserState}
        />
      </Layout>
    )
  } else {
    return (
      <LoginPageTemplate
        contentComponent={HTMLContent}
        loggedUserState={loggedUserState}
      />
    )
  }
}

LoginPage.propTypes = {
  data: PropTypes.object,
}

export default connect(state => ({
  loggedUserState: state.loggedUserState
}), null)(LoginPage)

export const loginPageQuery = graphql`
  query LoginPage($id: String!) {
    markdownRemark(id: {eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
