import ReduxWrapper from "./src/state/ReduxWrapper"
import Colors from './src/gatsby-plugin-theme-ui'

export const wrapRootElement = ReduxWrapper

if (typeof window === 'object') {
  window.IDP_BASE_URL = process.env.GATSBY_IDP_BASE_URL;
  window.SUMMIT_API_BASE_URL = process.env.GATSBY_SUMMIT_API_BASE_URL;
  window.SUMMIT_ID = process.env.GATSBY_SUMMIT_ID;
  window.OAUTH2_CLIENT_ID = process.env.GATSBY_OAUTH2_CLIENT_ID;
  window.SCOPES = process.env.GATSBY_SCOPES;
  window.MARKETING_API_BASE_URL = process.env.GATSBY_MARKETING_API_BASE_URL;

  Object.entries(Colors.colors).map(color => {    
    if (getComputedStyle(document.documentElement).getPropertyValue(`--${color[0]}`)) {      
      document.documentElement.style.setProperty(`--${color[0]}`, color[1]);
      document.documentElement.style.setProperty(`--${color[0]}50`, `${color[1]}50`);
    }
  });
}

