
"use client";
import { GetStageData } from "@/components/data/controller/stageDataController";
import { Countdown, CountdownMode } from "@/components/ui/countdown";
import { TimeDisplay, TimeTypes } from "@/components/ui/timeDisplay";

export default function StageViewer({
  params,
}: {
  params: { stageId: string };
}) {
  const data = GetStageData(params.stageId);

  return (
    <div>
      {data?.countdowns.map((c) => (
        <Countdown key={c.id} data={c} mode={CountdownMode.Controller} />
      ))}
      <TimeDisplay type={TimeTypes.Local} />
      <TimeDisplay type={TimeTypes.UTC} />
    </div>
  );
}
