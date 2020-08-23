import { START_LOADING, STOP_LOADING, LOGOUT_USER } from "openstack-uicore-foundation/lib/actions";

import { GET_EVENT_DATA, GET_EVENT_DATA_ERROR, EVENT_PHASE_BEFORE, EVENT_PHASE_DURING, EVENT_PHASE_AFTER } from '../actions/event-actions'

const DEFAULT_STATE = {
  loading: false,
  event: null,
  event_phase: null,
}

const eventReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case LOGOUT_USER:
      return DEFAULT_STATE;
    case START_LOADING:
      return { ...state, loading: true };
    case STOP_LOADING:
      return { ...state, loading: false };
    case EVENT_PHASE_AFTER: {
      return { ...state, event_phase: payload }
    }
    case EVENT_PHASE_DURING: {
      return { ...state, event_phase: payload }
    }
    case EVENT_PHASE_BEFORE: {
      return { ...state, event_phase: payload }
    }
    case GET_EVENT_DATA:
      const event = payload.response;
      return { ...state, loading: false, event: event };
    case GET_EVENT_DATA_ERROR: {
      return { ...state, loading: false, event: null }
    }
    default:
      return state;
  }
}

export default eventReducer
