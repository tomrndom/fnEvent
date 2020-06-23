import React from 'react'
import { connect } from 'react-redux'
import { Link, StaticQuery, graphql } from "gatsby"
import LogoutButton from './LogoutButton'
import { handleResetReducers } from '../state/event-actions'
import Navbar from './Navbar'

const Header = ({ isLoggedUser, summit, handleResetReducers }) => (

  <StaticQuery
    query={graphql`
        query HeadingQuery {
          summit {
            logo
          }
        }
      `}
    render={data => (
      <header>
        <Navbar isLoggedUser={isLoggedUser} clearState={handleResetReducers}
          logo={
            summit && summit.logo ?
              summit.logo
              :
              data.summit && data.summit.logo ?
                data.summit.logo
                :
                "/img/opendevbadge-nav.png"
          } />
        {/* <div className="header">
          <Link
            to="/"
          >
            {summit && summit.logo ?
              <img src={summit.logo} alt="Show Logo" />
              :
              data.summit && data.summit.logo ?
                <img src={data.summit.logo} alt="Show Logo" />
                :
                <img src="/img/opendevbadge-nav.png" alt="Show Logo" />
            }
          </Link> */}
        {/* <LogoutButton isLoggedUser={isLoggedUser} clearState={handleResetReducers} /> */}
        {/* </div> */}
      </header>
    )}
  />
)

const mapStateToProps = ({ loggedUserState, summitState }) => ({
  isLoggedUser: loggedUserState.isLoggedUser,
  summit: summitState.summit
})

export default connect(mapStateToProps, { handleResetReducers })(Header)