import colors from '../content/colors.json';
import marketing_site from '../content/marketing-site.json';
import disqus_settings from '../content/disqus-settings.json';
import home_settings from '../content/home-settings.json';
import filters from '../content/filters.json';

import { START_LOADING, STOP_LOADING, LOGOUT_USER } from "openstack-uicore-foundation/lib/actions";
import { GET_SUMMIT_DATA } from '../actions/summit-actions'

const DEFAULT_STATE = {
  loading: false,
  summit: null,
  marketingSettings: {
    colors: colors,
    site: marketing_site,
    disqus: disqus_settings,
    home: home_settings,
    filters: filters
  }
};

const summitReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case LOGOUT_USER:
      return DEFAULT_STATE;
    case START_LOADING:
      return { ...state, loading: true };
    case STOP_LOADING:
      return { ...state, loading: false };
    case GET_SUMMIT_DATA:
      const summit = payload.response;
      return { ...state, loading: false, summit: summit };
    default:
      return state;
  }
};

export default summitReducer
