import MarketingSite from '../content/marketing-site.json';

const getPhase = function (summit, now, phase) {

  let { summit: { start_date, end_date } } = summit;

  const deltaSummit = MarketingSite.summit_delta_start_time ? MarketingSite.summit_delta_start_time : 0;

  let newPhase = null;

  if (phase === null) {
    newPhase = start_date + deltaSummit > now ? 'before' : end_date < now ? 'after' : start_date - deltaSummit < now && end_date > now ? 'during' : null;
    console.log('bnew phase', newPhase)
    return newPhase;
  } else if (phase === 'before') {
    newPhase = start_date - deltaSummit < now && end_date > now ? 'during' : 'before';
    console.log('bnew phase', newPhase)
    return newPhase;
  } else if (phase === 'during') {
    newPhase = end_date < now ? 'after' : 'during';
    console.log('bnew phase', newPhase)
    return newPhase;
  }

}

export default getPhase