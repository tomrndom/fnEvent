import ReduxWrapper from "./src/state/ReduxWrapper"
export const wrapRootElement = ReduxWrapper

const axios = require('axios')

if (typeof window === 'object') {
  window.IDP_BASE_URL               = process.env.GATSBY_IDP_BASE_URL;
  window.SUMMIT_API_BASE_URL        = process.env.GATSBY_SUMMIT_API_BASE_URL;
  window.SUMMIT_ID                  = process.env.GATSBY_SUMMIT_ID;
  window.OAUTH2_CLIENT_ID           = process.env.GATSBY_OAUTH2_CLIENT_ID;
  window.SCOPES                     = process.env.GATSBY_SCOPES;
  window.MARKETING_API_BASE_URL     = process.env.GATSBY_MARKETING_API_BASE_URL;

  let params = {
    per_page: 100,
    page: 1
  };

  axios.get(
    `${process.env.GATSBY_MARKETING_API_BASE_URL}/api/public/v1/config-values/all/shows/${process.env.GATSBY_SUMMIT_ID}`, { params }
  ).then((response) => {    
    response.data.data.forEach(setting => {      
      if (getComputedStyle(document.documentElement).getPropertyValue(`--${setting.key}`)) {
          document.documentElement.style.setProperty(`--${setting.key}`, setting.value);
          document.documentElement.style.setProperty(`--${setting.key}50`, `${setting.value}50`);
      }
  });
  }).catch(e => console.log('ERROR: ', e));  
}

