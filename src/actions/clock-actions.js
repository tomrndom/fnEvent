import {
  getRequest,
  createAction,
  stopLoading,
  startLoading,
} from 'openstack-uicore-foundation/lib/methods';

import SummitObject from '../content/summit.json';

import { customErrorHandler } from '../utils/customErrorHandler';
import { PHASES, getSummitPhase, getEventPhase } from '../utils/phasesUtils';

export const SUMMIT_PHASE_AFTER = 'SUMMIT_PHASE_AFTER'
export const SUMMIT_PHASE_DURING = 'SUMMIT_PHASE_DURING'
export const SUMMIT_PHASE_BEFORE = 'SUMMIT_PHASE_BEFORE'
export const EVENT_PHASE_BEFORE = 'EVENT_PHASE_BEFORE'
export const EVENT_PHASE_DURING = 'EVENT_PHASE_DURING'
export const EVENT_PHASE_AFTER = 'EVENT_PHASE_AFTER'
export const UPDATE_CLOCK = 'UPDATE_CLOCK';
export const GET_TIME_NOW = 'GET_TIME_NOW';
export const TIME_NOW = 'TIME_NOW';


export const getTimeNow = () => (dispatch) => {

  return getRequest(
    dispatch(startLoading()),
    createAction(GET_TIME_NOW),
    `https://timeintervalsince1970.appspot.com/`,
    customErrorHandler
  )({})(dispatch).then((response) => {
    const payload = response.response;
    dispatch(stopLoading());
    dispatch(createAction(UPDATE_CLOCK)(payload));
  }
  ).catch(e => {
    dispatch(stopLoading());
    return (e);
  });
};

export const updateClock = (timestamp) => (dispatch, getState) => {

  const { summitState: { nowUtc, summit_phase }, eventState: { event, event_phase } } = getState();

  if (nowUtc) {
    const summitPhase = getSummitPhase(SummitObject, nowUtc, summit_phase);
    if (summit_phase !== summitPhase) {
      switch (summitPhase) {
        case PHASES.BEFORE:
          dispatch(createAction(SUMMIT_PHASE_BEFORE)(PHASES.BEFORE))
          break;
        case PHASES.DURING:
          dispatch(createAction(SUMMIT_PHASE_DURING)(PHASES.DURING))
          break;
        case PHASES.AFTER:
          dispatch(createAction(SUMMIT_PHASE_AFTER)(PHASES.AFTER))
          break;
        default:
          break;
      }
    }
    const eventPhase = getEventPhase(event, nowUtc, event_phase);
    if (event_phase !== eventPhase) {
      switch (eventPhase) {
        case PHASES.BEFORE:
          dispatch(createAction(EVENT_PHASE_BEFORE)(PHASES.BEFORE))
          break;
        case PHASES.DURING:
          dispatch(createAction(EVENT_PHASE_DURING)(PHASES.DURING))
          break;
        case PHASES.AFTER:
          dispatch(createAction(EVENT_PHASE_AFTER)(PHASES.AFTER))
          break;
        default:
          break;
      }
  }

  dispatch(createAction(UPDATE_CLOCK)({ timestamp }));
};