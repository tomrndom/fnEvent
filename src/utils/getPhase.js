import MarketingSite from '../content/marketing-site.json';

export const getSummitPhase = function (summit, now) {

  let { summit: { start_date, end_date } } = summit;

  const deltaSummit = MarketingSite.summit_delta_start_time ? MarketingSite.summit_delta_start_time : 0;

  let newPhase = start_date - deltaSummit < now && end_date > now ? 0 : start_date - deltaSummit > now ? -1 : end_date < now ? 1 : null;  

  return newPhase;
}

export const getEventPhase = function (event, now) {
  
}