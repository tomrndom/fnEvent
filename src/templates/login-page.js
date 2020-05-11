import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

import '../styles/login.css'

export const LoginPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

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

      <div className="container">
        <div className="login-form">
          <form className="form-signin" role="form" method="post" action="/login">
            <input type="hidden" name="_token" value="WvdDIsxe5lUZPlu5MVoa6abY65FEtooo5cdbG2gy" />
            <h2 className="form-signin-heading">Sponsor Services Login</h2>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            <br /><br />
            <h4>Request access</h4>
              To request access to Sponsor Services, please <a href="/request">click here.</a>
          </form>
        </div>
      </div>      
    </React.Fragment>
  )
}

LoginPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const LoginPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <LoginPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

LoginPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default LoginPage

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
