import { navigate } from "gatsby"
import { connect } from 'react-redux'

const IndexPage = ({ location, isLoggedUser }) => {
  
  if (!isLoggedUser) {
    navigate('/a/login');
    return null
  } else {
    navigate('/a/');
    return null
  }
}

const mapStateToProps = ({ loggedUserState }) => ({
  isLoggedUser: loggedUserState.isLoggedUser,
})

export default connect(mapStateToProps)(IndexPage)