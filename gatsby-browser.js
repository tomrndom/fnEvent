import ReduxWrapper from "./src/state/ReduxWrapper"
export const wrapRootElement = ReduxWrapper

if (typeof window === 'object') {
  window.IDP_BASE_URL               = process.env.GATSBY_IDP_BASE_URL;
  window.SUMMIT_API_BASE_URL        = process.env.GATSBY_SUMMIT_API_BASE_URL;
  window.OAUTH2_CLIENT_ID           = process.env.GATSBY_OAUTH2_CLIENT_ID;
  window.SCOPES                     = process.env.GATSBY_SCOPES;
  window.SUMMIT_API_BASE_URL        = process.env.GATSBY_SUMMIT_API_BASE_URL;
  window.SUMMIT_ID                  = process.env.GATSBY_SUMMIT_ID;
}
