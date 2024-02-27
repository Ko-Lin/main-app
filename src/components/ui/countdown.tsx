import "./countdown.css";
import React, { useEffect, useRef, useState } from "react";
import {
  GetTimeNow,
  ICountdownData,
  calculateTimeDistance,
  calculateTimeRemaining,
} from "../data/controller/stageDataController";
// write a count down component that takes a date prop and displays the time remaining until that date
// the component should update every second
// the component should display the time remaining in the format `hh:mm:ss`
// if the date has passed, the component should display `00:00:00`

export enum CountdownMode {
  Viewer,
  Agenda,
  Controller,
  Moderator,
}
interface CountdownProps {
  data: ICountdownData;
  mode: CountdownMode;
}

export const Countdown: React.FC<CountdownProps> = (props) => {
  const defaultAudioSrc = "/asset/audio/mixkit-store-door-bell-ring-934.wav";
  const [className, setClassName] = useState<string>("inactiveSession");
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const audioRef = useRef(null); // Reference to the audio component
  const [isPlaying, setIsPlaying] = useState(false); // State to manage play status
  const [muteAudio, setMuteAudio] = useState(true);
  const [startTime, setStartTime] = useState<string>("")
  const [endTime, setEndTime] = useState<string>("")
  const [showCountdown, setShowCountdown] = useState(
    props.mode !== CountdownMode.Viewer
  );

  useEffect(() => {
    setStartTime(props.data.since.toLocaleTimeString());
    setEndTime(props.data.until.toLocaleTimeString());
    const playSound = (src: string) => {
      if (isPlaying || audioRef.current === null) return;
      const audio = audioRef.current as HTMLAudioElement;
      audio.src = src;
      audio.play();
      setIsPlaying(true);
    };

    const interval = setInterval(() => {
      const distance = calculateTimeDistance(
        props.data.since,
        props.data.until
      );
      const timeRemaining = calculateTimeRemaining(distance);
      setTimeRemaining(timeRemaining);

      if (props.mode === CountdownMode.Viewer) {
        if (
          distance > 0 &&
          GetTimeNow().getTime() > props.data.since.getTime()
        ) {
          setShowCountdown(true);
        } else {
          setShowCountdown(false);
        }
      }

      if (distance < 0) {
        setClassName("expiredSession");
        if (distance > -1000) {
          playSound(defaultAudioSrc);
        }
        return;
      }
      else if(GetTimeNow().getTime() < props.data.since.getTime())
      {
        setClassName("inactiveSession");
        return;
      }

      const wrapUps = props.data.wrapUps
        .sort((a, b) => (a.wrapUpInSeconds > b.wrapUpInSeconds ? 1 : -1))
        .filter(
          (wrapUp) => distance <= wrapUp.wrapUpInSeconds * 1000 && distance > 0
        );

      if (wrapUps.length > 0) {
        const wrapUp = wrapUps[0];
        setClassName(wrapUp.className);
        if (wrapUp.wrapUpInSeconds * 1000 - distance < 1000 && !isPlaying)
          playSound(wrapUp.audioSrc);
      }
      else
      {
        setClassName("activeSession");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    props.data.since,
    props.data.until,
    props.data.wrapUps,
    isPlaying,
    props.mode,
  ]);

  return (
    <div className={showCountdown ? "countdown" : "hideCountdown"}>
      <div className="sessionTitle">
        <h1>{props.data.title}</h1>
      </div>
      <div id="sessionSpeaker">
        <h3>{props.data.speaker}</h3>
      </div>
      <div className={props.mode !== CountdownMode.Viewer ? "showDetails" : "hideDetails"}>
            <label>{startTime}</label>
            <label>{endTime}</label>
      </div>
      <div className={className}>
        {timeRemaining}

        <button
          className={props.mode === CountdownMode.Viewer ? "hideButton" : muteAudio ? "unmuteButton" : "muteButton"}
          onClick={() => {
            setMuteAudio(!muteAudio);
          }}
        >
          {muteAudio ? "Unmute" : "Mute"}
        </button>
      </div>
      <audio
        id="audio"
        ref={audioRef}
        muted={muteAudio}
        autoPlay={false}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};
