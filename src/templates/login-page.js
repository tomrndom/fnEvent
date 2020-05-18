import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

import { onUserAuth, doLogin, doLogout, initLogOut, getUserInfo } from "openstack-uicore-foundation/lib/methods";

import '../styles/login.css'
import LoginButton from '../components/LoginButton'

export const LoginPageTemplate = ({ title, content, contentComponent, loggedUserState }) => {
  const PageContent = contentComponent || Content

  if (loggedUserState.isLoggedUser) {
    console.log('yay!')
    
  } else {
    console.log('nay!')
  }

  return (
    <React.Fragment>
      <div className="modal fade" id="modal-confirmation" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body"></div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="modal-warning" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header panel-heading">
              <h4 className="modal-title"></h4>
            </div>
            <div className="row">
              <div className="col-sm-1 modal-icon"><span className="glyphicon glyphicon-exclamation-sign modal-warning-icon"></span></div>
              <div className="col-sm-11 modal-body"></div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">OK</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="confirm-delete" tabIndex="-1" role="dialog" aria-labelledby="Delete dialog" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body"></div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              <a href="#" className="btn btn-danger danger" id="delete-confirm-button">Delete</a>
            </div>
          </div>
        </div>
      </div>

      <LoginButton />
    </React.Fragment>
  )
}

LoginPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const LoginPage = ({ data, loggedUserState }) => {
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
}

LoginPage.propTypes = {
  data: PropTypes.object.isRequired,
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
