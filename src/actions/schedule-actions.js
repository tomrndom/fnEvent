import {createAction} from 'openstack-uicore-foundation/lib/methods';

export const UPDATE_EVENTS = 'UPDATE_EVENTS';
export const UPDATE_FILTER = 'UPDATE_FILTER';


export const updateFilter = (filter) => (dispatch, getState) => {
    const {summit} = getState().summitState;
    dispatch(createAction(UPDATE_FILTER)({...filter, summitTimezone: summit.time_zone_id}))
};