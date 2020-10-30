import React from 'react'
import { connect } from 'react-redux'
import { StaticQuery, graphql } from "gatsby"
import Navbar from './Navbar'

const Header = ({ isLoggedUser, location, idpProfile, summit}) => (

  <StaticQuery
    query={graphql`
        query HeaderQuery {
          summit {
            logo
          }
        }
      `}
    render={data => (
      <header>
        <Navbar isLoggedUser={isLoggedUser} idpProfile={idpProfile} location={location}
          logo={
            summit && summit.logo ?
              summit.logo
              :
              data.summit && data.summit.logo ?
                data.summit.logo
                :
                null
          } />          
      </header>
    )}
  />
)

const mapStateToProps = ({ loggedUserState, summitState, userState }) => ({
  isLoggedUser: loggedUserState.isLoggedUser,
  idpProfile: userState.idpProfile,
  summit: summitState.summit
})

export default connect(mapStateToProps)(Header)