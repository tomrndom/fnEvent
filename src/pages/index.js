import { navigate } from "gatsby"

const IndexPage = ({location}) => {
  if (location.pathname === `/`) {
    navigate("/auth")
    return null
  }
}

export default IndexPage
