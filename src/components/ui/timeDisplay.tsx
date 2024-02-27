import './timeDisplay.css';
// render local time display component
import { useEffect, useState } from "react";
export enum TimeTypes {
  Local,
  UTC,
}

interface TimeDisplayProps {
  type: TimeTypes;
  distance?: number;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = (props) => {
  const [time, setTime] = useState<string>("");
  const [timeZone, setTimeZone] = useState<string>("");
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const time = props.type == TimeTypes.Local ?  date.toTimeString() : date.toISOString();
      const localTimeZone = props.type == TimeTypes.Local ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC";
      setTime(time);
      setTimeZone(localTimeZone);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className='RealTimeDisplay'>
      <div>{timeZone}</div>
      <div
        style={{
          color: "#fff",
          backgroundColor: "#000",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {time}
      </div>
    </div>
  );
};
