"use client";
import React from "react";
import { GetStageDefinitions, generateStageViewerPath } from "@/components/data/controller/stageDataController";

export default function StageList() {
  const data = GetStageDefinitions()
  return (
    <div>
      {data.map(stage => (<a href={generateStageViewerPath(stage.id)} key={stage.id}>{stage.name}</a>))}
    </div>
  )
}
