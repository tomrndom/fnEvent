import { START_LOADING, STOP_LOADING, LOGOUT_USER } from "openstack-uicore-foundation/lib/actions";

import { GET_SUMMIT_DATA, UPDATE_CLOCK } from '../actions/summit-actions'

const DEFAULT_STATE = {
  loading: false,
  summit: {},
  nowUtc: null,
}

const summitReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case LOGOUT_USER:
      return DEFAULT_STATE;
    case START_LOADING:
      return { ...state, loading: true };
      break;
    case STOP_LOADING:
      return { ...state, loading: false };
      break;
    case UPDATE_CLOCK:
      let { timestamp } = payload;
      return { ...state, nowUtc: timestamp };
    case GET_SUMMIT_DATA:
      const summit = payload.response;
      return { ...state, loading: false, summit: summit };
      break;
    default:
      return state;
      break;
  }
}

export default summitReducer
