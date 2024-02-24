"use client";
import { GetStageData } from "@/components/data/controller/stageDataController";
import { Countdown } from "@/components/ui/countdown";
import { TimeDisplay, TimeTypes } from "@/components/ui/timeDisplay";

export default function StageViewer({ params,}: {
    params: { stageId: string};
}) {

    const data = GetStageData(params.stageId);

  return (
    <div>
      <TimeDisplay type={TimeTypes.Local} />
      <TimeDisplay type={TimeTypes.UTC} />
      {
        data?.countdowns.map(c => (<Countdown key={c.id} sinceDate={c.sinceDate()} untilDate={c.untilDate()} wrappUps={c.getWrapUps()} />))
      }
    </div>
  );
}