// Get the next reset time (3 AM UTC)
export function getNextResetTime(): Date {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}

// Calculate time remaining until next reset
export function getTimeUntilReset(): {
  hours: number;
  minutes: number;
  seconds: number;
} {
  const now = new Date();
  const nextReset = getNextResetTime();
  const diff = nextReset.getTime() - now.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

export function getCurrentResetTime(): Date {
  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  return today;
}
