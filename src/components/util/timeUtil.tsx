
// provides the current time app wide
export function GetTimeNow() {
  return new Date();
}

export function compareDates(date1: Date, date2: Date) {
  if (date1.getUTCFullYear() > date2.getUTCFullYear()) return 1;
  if (date1.getUTCFullYear() < date2.getUTCFullYear()) return -1;
  if (date1.getUTCMonth() > date2.getUTCMonth()) return 1;
  if (date1.getUTCMonth() < date2.getUTCMonth()) return -1;
  if (date1.getUTCDate() > date2.getUTCDate()) return 1;
  if (date1.getUTCDate() < date2.getUTCDate()) return -1;
  if (date1.getUTCHours() > date2.getUTCHours()) return 1;
  if (date1.getUTCHours() < date2.getUTCHours()) return -1;
  if (date1.getUTCMinutes() > date2.getUTCMinutes()) return 1;
  if (date1.getUTCMinutes() < date2.getUTCMinutes()) return -1;
  if (date1.getUTCSeconds() > date2.getUTCSeconds()) return 1;
  if (date1.getUTCSeconds() < date2.getUTCSeconds()) return -1;

  return 0;
}