import React, { useEffect, useState } from "react";
import {
  DefaultExpiredSessionStyle,
  DefaultInactiveSessionStyle,
  ICountdownData,
  calculateTimeDistance,
  calculateTimeRemaining,
} from "../data/controller/stageDataController";
// write a count down component that takes a date prop and displays the time remaining until that date
// the component should update every second
// the component should display the time remaining in the format `hh:mm:ss`
// if the date has passed, the component should display `00:00:00`

interface CountdownProps {
  data: ICountdownData;
}

export const Countdown: React.FC<CountdownProps> = (props) => {
  const [inSessionStyle, setInSessionStyle] = useState<React.CSSProperties>(
    DefaultInactiveSessionStyle
  );
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const distance = calculateTimeDistance(
        props.data.since,
        props.data.until
      );
      const timeRemaining = calculateTimeRemaining(distance);
      setTimeRemaining(timeRemaining);
      if (distance < 0) {
        setInSessionStyle(DefaultExpiredSessionStyle);
      }

      const wrapUp = props.data.wrapUps
        .sort((a, b) => (a.wrapUpInSeconds > b.wrapUpInSeconds ? 1 : -1))
        .filter(
          (wrapUp) => distance <= wrapUp.wrapUpInSeconds * 1000 && distance > 0
        );
      if (wrapUp.length > 0) {
        setInSessionStyle(wrapUp[0].style);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [props.data.since, props.data.until, props.data.wrapUps]);


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>{props.data.title}</h1>
      <h3>{props.data.speaker}</h3>
      <div style={inSessionStyle}>{timeRemaining}</div>
    </div>
  );
};
