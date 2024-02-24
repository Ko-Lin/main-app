import React, { useEffect, useState } from "react";
import { DefaultInSessionStyle, GetTimeNow, IWrapUp } from "../data/controller/stageDataController";
import { get } from "http";
// write a count down component that takes a date prop and displays the time remaining until that date
// the component should update every second
// the component should display the time remaining in the format `hh:mm:ss`
// if the date has passed, the component should display `00:00:00`

interface CountdownProps {
  untilDate: Date,
  sinceDate: Date
  wrappUps: IWrapUp[]
}
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

function compareDates(date1: Date, date2: Date) {
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

function calculateTimeDistance(sinceDate: Date, untilDate: Date) {
  const now = GetTimeNow();
  
  const comparison = compareDates(now, sinceDate);
  const since = (comparison > 0 ? now : sinceDate).getTime();
  const until = untilDate.getTime();
  const diff = until - since;
  return  diff > 0 ? diff : 0;
}

function calculateTimeRemaining(distance: number) {
  const hours = calculateHours(distance);
  const minutes = calculateMinutes(distance);
  const seconds = calculateSeconds(distance);

  return `${formatDigits(hours)}:${formatDigits(minutes)}:${formatDigits(
    seconds
  )}`;
}

export const Countdown: React.FC<CountdownProps> = ( props ) => {


  const [inSessionStyle, setInSessionStyle] = useState<React.CSSProperties>(DefaultInSessionStyle);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  

  useEffect(() => {
    const interval = setInterval(() => {
      const distance = calculateTimeDistance(props.sinceDate, props.untilDate);
      const timeRemaining = calculateTimeRemaining(distance);
      setTimeRemaining(timeRemaining);
      props.wrappUps.sort((a, b) => a.wrapUpInSeconds > b.wrapUpInSeconds ? 1 : -1).some(wrapUp => {
        if (distance <= (wrapUp.wrapUpInSeconds * 1000)) 
          {
          setInSessionStyle(wrapUp.style);
          return true;
        }
        return false;
      });
    }, 1000);

    return () => clearInterval(interval);
  },[props.sinceDate, props.untilDate, props.wrappUps]);

  return (
    <div
      style={inSessionStyle}
    >
      {timeRemaining}
    </div>
  );
};
