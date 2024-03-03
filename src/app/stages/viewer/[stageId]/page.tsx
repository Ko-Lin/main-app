"use client";
import { GetStageDefinition } from "@/components/data/controller/stageDataController";
import { Countdown, CountdownMode } from "@/components/ui/countdown";

export default function StageViewer({
  params,
}: {
  params: { stageId: string };
}) {
  const data = GetStageDefinition(params.stageId);

  return (
    <div>
      {data?.agendaDefinitions.map((c) => (
        <Countdown key={c.id} data={c} mode={CountdownMode.Viewer} />
      ))}
    </div>
  );
}
