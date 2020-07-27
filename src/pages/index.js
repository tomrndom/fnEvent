import { navigate } from "gatsby"
import { connect } from 'react-redux'

const IndexPage = ({ location, isLoggedUser }) => {
  
  let currentLocation = location.pathname;

  if (!isLoggedUser) {
    navigate('/a/login', {
      state: {
        backUrl: currentLocation,
      },
    });
    return null
  } else {
    navigate('/a/', {
      state: {
        backUrl: currentLocation,
      },
    });
    return null
  }
}

const mapStateToProps = ({ loggedUserState }) => ({
  isLoggedUser: loggedUserState.isLoggedUser,
})

export default connect(mapStateToProps)(IndexPage)