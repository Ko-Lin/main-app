import React from "react";

enum CountDownTrigger {
  Manual,
  Scheduled,
}

export interface IWrapUp {
  wrapUpInSeconds: number;
  style: React.CSSProperties;
}

export interface ICountdownData {
  id: string;
  title: string;
  speaker: string;
  until: Date;
  since: Date;
  wrapUps: IWrapUp[];
}

interface IStageData {
  id: string;
  name?: string;
  // a collection of countdowns
  countdowns: ICountdownData[];
}

// provides the current time app wide
export function GetTimeNow() {
  return new Date();
}

export const DefaultInSessionStyle: React.CSSProperties = {
  color: "#fff",
  backgroundColor: "#000",
  padding: "10px",
  borderRadius: "5px",
  width: "fit-content",
  fontFamily: "Arial, sans-serif",
  fontSize: "12em",
};
export const WrapUpRed: React.CSSProperties = {
  color: "#000",
  backgroundColor: "red",
  padding: "10px",
  borderRadius: "5px",
  width: "fit-content",
  fontFamily: "Arial, sans-serif",
  fontSize: "12em",
};

export const WrapUpGray: React.CSSProperties = {
  color: "#000",
  backgroundColor: "gray",
  padding: "10px",
  borderRadius: "5px",
  width: "fit-content",
  fontFamily: "Arial, sans-serif",
  fontSize: "12em",
};

export const WrapUpYellow: React.CSSProperties = {
  color: "#000",
  backgroundColor: "yellow",
  padding: "10px",
  borderRadius: "5px",
  width: "fit-content",
  fontFamily: "Arial, sans-serif",
  fontSize: "12em",
}

export function GetStageListingData(): IStageData[] {
  // return a date 2 mins from now
  const now = new Date(2024, 1, 24, 17, 55);
  const twoMinutesLater = new Date(now);
  twoMinutesLater.setMinutes(now.getMinutes() + 2);
  const fiveMinutesLater = new Date(now);
  fiveMinutesLater.setMinutes(now.getMinutes() + 10);

  // create some dummy stage data
  const countdowns: ICountdownData[] = [
    {
      id: "1",
      title: "Countdown 1",
      speaker: "Speaker 1",
      since: now,
      until: twoMinutesLater,
      wrapUps: [
        {
          wrapUpInSeconds: 30,
          style: WrapUpRed,
        },
        {
          wrapUpInSeconds: 60,
          style: WrapUpYellow,
        },
      ],
    },
    {
      id: "2",
      title: "Countdown 2",
      speaker: "Speaker 2",
      since: twoMinutesLater,
      until: fiveMinutesLater,
      wrapUps: [ 
        {
          wrapUpInSeconds: 30,
          style: WrapUpRed,
        },
        {
          wrapUpInSeconds: 60,
          style: WrapUpYellow,
        },
      ],
    },
  ];

  const stageList: IStageData[] = [
    {
      id: "1",
      name: "Stage 1",
      countdowns: countdowns,
    },
    {
      id: "2",
      name: "Stage 2",
      countdowns: countdowns,
    },
  ];

  return stageList;
}

export function GetStageData(stageId: string): IStageData | undefined {
  return GetStageListingData().find((s) => s.id === stageId);
}

export function generateStageViewerPath(stageId: string): string {
  return `/stages/viewer/${stageId}`;
}
