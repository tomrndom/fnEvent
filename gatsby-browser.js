import ReduxWrapper from "./src/state/ReduxWrapper"
export const wrapRootElement = ReduxWrapper

if (typeof window === 'object') {
  window.IDP_BASE_URL        = process.env.IDP_BASE_URL;
  window.API_BASE_URL        = process.env.API_BASE_URL;
  window.OAUTH2_CLIENT_ID    = process.env.OAUTH2_CLIENT_ID;
  window.SCOPES              = process.env.SCOPES;
}
