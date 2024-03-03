/*
Configation -> Definition
// Consider one table definition
*/

import { IStageConfig, IStageDefinition, StageDefinition } from "../model/StageDefinition";

const manualStartStage = `
[
  {
    "id": "1",
    "name": "Manual Trigger Stage",
    "userId": "Ko",
    "agendaConfigs": [
      {
        "id": "1",
        "title": "Manual Start",
        "showTitle": true,
        "speaker": "Ko",
        "showSpeaker": true,
        "trigger": "MANUAL",
        "startDate": null,
        "startTime": null,
        "durationInSec": 60,
        "previousAgendaId": null,
        "wrapUps": [
          {
            "wrapUpInSeconds": 10,
            "style": "RED"
          },
          {
            "wrapUpInSeconds": 30,
            "style": "YELLOW"
          },
          {
            "wrapUpInSeconds": 50,
            "style": "GREEN"
          }
        ]
      },
      {
        "id": "2",
        "title": "Ren is delicious",
        "showTitle": false,
        "speaker": "Ko",
        "showSpeaker": false,
        "trigger": "MANUAL",
        "startDate": null,
        "startTime": null,
        "durationInSec": 120,
        "previousAgendaId": null,
        "wrapUps": [
          {
            "wrapUpInSeconds": 10,
            "style": "RED"
          },
          {
            "wrapUpInSeconds": 30,
            "style": "YELLOW"
          },
          {
            "wrapUpInSeconds": 50,
            "style": "GREEN"
          }
        ]
      }
    ]
  }
]
`

export function GetStageConfigs() : IStageConfig[]
{
  return JSON.parse(manualStartStage); 
}


export function GetStageDefinitions(): IStageDefinition[] {
  const stagesConfig = GetStageConfigs();
  return stagesConfig.map(StageDefinition);
}

export function GetStageDefinition(stageId: string): IStageDefinition | undefined {
  return GetStageDefinitions().find((s) => s.id === stageId);
}

export function generateStageViewerPath(stageId: string): string {
  return `/stages/viewer/${stageId}`;
}

export function generateStageControllerPath(stageId: string): string {
  return `/stages/controller/${stageId}`;
}