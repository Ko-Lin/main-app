"use client";
import React from "react";
import { GetStageListingData, generateStageViewerPath } from "@/components/data/controller/stageDataController";

export default function StageList() {
  const data = GetStageListingData()
  return (
    <div>
      {data.map(stage => (<a href={generateStageViewerPath(stage.id)} key={stage.id}>{stage.name}</a>))}
    </div>
  )
}
