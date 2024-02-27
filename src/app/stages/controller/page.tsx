
"use client";
import React from "react";
import { GetStageListingData, generateStageControllerPath } from "@/components/data/controller/stageDataController";

export default function StageList() {
  const data = GetStageListingData()
  return (
    <div>
      {data.map(stage => (<a href={generateStageControllerPath(stage.id)} key={stage.id}>{stage.name}</a>))}
    </div>
  )
}
