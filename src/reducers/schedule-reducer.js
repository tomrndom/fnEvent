import {epochToMomentTimeZone} from 'openstack-uicore-foundation/lib/methods';

import events from '../content/events.json';
import filtersData from '../content/filters.json';

import { LOGOUT_USER } from "openstack-uicore-foundation/lib/actions";
import { UPDATE_FILTER, UPDATE_FILTERS, CHANGE_VIEW } from '../actions/schedule-actions'
import {RESET_STATE} from '../state/store';

const {color_source, ...filters} = filtersData;

const DEFAULT_STATE = {
  filters: filters,
  colorSource: color_source,
  events: events,
  allEvents: events,
  view: 'calendar'
};

const scheduleReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case RESET_STATE:
    case LOGOUT_USER:
      return DEFAULT_STATE;
    case UPDATE_FILTER: {
      const {type, values, summitTimezone} = payload;
      const {filters, allEvents} = state;
      filters[type].values = values;

      // update events
      const events = getFilteredEvents(allEvents, filters, summitTimezone);

      return {...state, filters, events}
    }
    case UPDATE_FILTERS: {
      const {filters, view, summitTimezone} = payload;
      const {allEvents} = state;

      // update events
      const events = getFilteredEvents(allEvents, filters, summitTimezone);

      return {...state, filters, events, view}
    }
    case CHANGE_VIEW: {
      const {view} = payload;
      return {...state, view}
    }
    default:
      return state;
  }
};

// filters: tracks, dates, levels, speakers, tags, locations

const getFilteredEvents = (events, filters, summitTimezone) => {

  return events.filter(ev => {
    let valid = true;

    if (filters.date?.values.length > 0) {
      const dateString = epochToMomentTimeZone(ev.start_date, summitTimezone).format('YYYY-MM-DD');
      valid = filters.date.values.includes(dateString);
      if (!valid) return false;
    }

    if (filters.level?.values.length > 0) {
      valid = filters.level.values.includes(ev.level);
      if (!valid) return false;
    }

    if (filters.track?.values.length > 0) {
      valid = filters.track.values.includes(ev.track.id);
      if (!valid) return false;
    }

    if (filters.speakers?.values.length > 0) {
      valid = ev.speakers.some(s => filters.speakers.values.includes(s.id)) || filters.speakers.values.includes(ev.moderator?.id);
      console.log(filters);
      if (!valid) return false;
    }

    if (filters.tags?.values.length > 0) {
      valid = ev.tags.values.some(t => filters.tags.includes(t.tag));
      if (!valid) return false;
    }

    if (filters.venues?.values.length > 0) {
      valid = filters.venues.values.includes(ev.location?.id);
      if (!valid) return false;
    }

    if (filters.track_groups?.values.length > 0) {
      valid = filters.track_groups.values.includes(ev.level);
      if (!valid) return false;
    }

    if (filters.event_types?.values.length > 0) {
      valid = filters.event_types.values.includes(ev.level);
      if (!valid) return false;
    }

    return true;
  });
};

export default scheduleReducer
