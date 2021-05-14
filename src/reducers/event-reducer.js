import EventObject from '../content/events.json';

import { START_LOADING, STOP_LOADING, LOGOUT_USER } from "openstack-uicore-foundation/lib/actions";

import { GET_EVENT_DATA, GET_EVENT_DATA_ERROR } from '../actions/event-actions'

const DEFAULT_STATE = {
  loading: false,
  event: null,
  allEvents: EventObject
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
    case GET_EVENT_DATA:
      const event = payload.response || payload.event;
      const index = state.allEvents.findIndex((e) => e.id === event.id);
      var allEvents = null;
      if (index > 0) {
        allEvents = [...state.allEvents];
        allEvents[index] = event;
      } else {
        allEvents = [...state.allEvents, event];
      }
      return { ...state, loading: false, allEvents: allEvents, event: event };
    case GET_EVENT_DATA_ERROR: {
      return { ...state, loading: false, event: null }
    }
    default:
      return state;
  }
}

export default eventReducer
