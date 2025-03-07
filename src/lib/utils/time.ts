// Get the next reset time (3 AM UTC)
export function getNextResetTime() {
  const now = new Date();
  const nextReset = new Date(now);
  nextReset.setUTCHours(3, 0, 0, 0);

  // If it's past 3 AM UTC today, set to 3 AM UTC tomorrow
  if (now.getTime() > nextReset.getTime()) {
    nextReset.setUTCDate(nextReset.getUTCDate() + 1);
  }

  return nextReset;
}

// Calculate time remaining until next reset
export function getTimeUntilReset() {
  const now = new Date();
  const nextReset = getNextResetTime();
  const difference = nextReset.getTime() - now.getTime();

  return {
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    total: difference,
  };
}
