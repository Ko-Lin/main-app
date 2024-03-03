
"use client";
import React from "react";
import { GetStageConfigs, generateStageControllerPath } from "@/components/data/controller/stageDataController";

export default function StageList() {
  const data = GetStageConfigs()
  return (
    <div>
      {data.map(stage => (<a href={generateStageControllerPath(stage.id)} key={stage.id}>{stage.name}</a>))}
    </div>
  )
}
