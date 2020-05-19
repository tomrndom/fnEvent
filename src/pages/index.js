import { navigate } from "gatsby"

const IndexPage = ({location}) => {
  if (location.pathname === `/`) {
    navigate("/app")
    return null
  }
}

export default IndexPage
