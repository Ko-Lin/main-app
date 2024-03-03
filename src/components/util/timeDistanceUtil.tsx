import { GetTimeNow, compareDates } from "./timeUtil";


function calculateHours(distance: number) {
  return Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
}

function calculateSeconds(distance: number) {
  return Math.floor((distance % (1000 * 60)) / 1000);
}

function calculateMinutes(distance: number) {
  return Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
}

function formatDigits(num: number) {
  return num.toString().padStart(2, "0");
}

export function calculateTimeDistance(sinceDate: Date, untilDate: Date) {
  const now = GetTimeNow();

  const comparison = compareDates(now, sinceDate);
  const since = (comparison > 0 ? now : sinceDate).getTime();
  const until = untilDate.getTime();
  const diff = until - since;
  return diff;
}


export function calculateTimeRemaining(distance: number) {
  if(distance < 0) return "00:00:00";
  const hours = calculateHours(distance);
  const minutes = calculateMinutes(distance);
  const seconds = calculateSeconds(distance);

  return `${formatDigits(hours)}:${formatDigits(minutes)}:${formatDigits(
    seconds
  )}`;
}