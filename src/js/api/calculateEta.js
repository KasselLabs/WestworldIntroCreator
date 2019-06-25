import humanizeDuration from 'humanize-duration';

const ESTIMATED_HOURS_TO_RENDER = 2;

const calculateEta = (queuePosition) => {
  const eta = queuePosition * ESTIMATED_HOURS_TO_RENDER * 60 * 60 * 1000;
  const etaText = humanizeDuration(eta, { largest: 1, units: ['d', 'h'] });

  return etaText;
};

export default calculateEta;
