import summit from '../content/summit.json';
import colors from '../content/colors.json';
import marketing_site from '../content/marketing-site.json';
import disqus_settings from '../content/disqus-settings.json';
import home_settings from '../content/home-settings.json';

import { START_LOADING, STOP_LOADING, LOGOUT_USER } from "openstack-uicore-foundation/lib/actions";
import {RESET_STATE} from "../state/store";

const DEFAULT_STATE = {
  loading: false,
  summit: summit.summit,
  marketingSettings: {
    colors: colors,
    site: marketing_site,
    disqus: disqus_settings,
    home: home_settings,
  }
};

const summitReducer = (state = DEFAULT_STATE, action) => {
  const { type } = action;

  switch (type) {
    case RESET_STATE:
    case LOGOUT_USER:
      return DEFAULT_STATE;
    case START_LOADING:
      return { ...state, loading: true };
    case STOP_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default summitReducer
