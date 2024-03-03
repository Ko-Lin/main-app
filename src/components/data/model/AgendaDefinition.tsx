import { IWrapUpConfig, IWrapUpDefinition, WrapUpDefinition } from "./WrapUpDefinition";

export enum Trigger {
  Manual = "MANUAL",
  Scheduled = "SCHEDULED",
  PreviousAgenda = "PREVIOUS_AGENDA"
}
export interface IUserAgendaConfig
{
  id: string;
  title: string;
  showTitle: boolean;
  speaker: string;
  showSpeaker: boolean;
  trigger: Trigger;
  startDate: Date; // Mode: Scheduled, Optional
  startTime: Date; // Mode: Scheduled
  durationInSec: number;  // Required
  previousAgendaId: string | null; // Mode: PreviousAgenda
  wrapUps: IWrapUpConfig[];
}

export interface IAgendaDefinition {
    id: string;
    title: string;
    speaker: string;
    showTitle: boolean;
    showSpeaker: boolean;
    wrapUps: IWrapUpDefinition[];
    since: Date | null;
    until: Date | null;
    config : IUserAgendaConfig;
  }


function getStartDate(props: IUserAgendaConfig): Date | null {
    if(props.trigger === Trigger.Scheduled)
    {
        return new Date(props.startDate.getDate() + props.startTime.getTime());
    }

    return null;
}

export function AgendaDefinition (props: IUserAgendaConfig) : IAgendaDefinition {

    const since = getStartDate(props)
    return {
        id: props.id,
        title: props.title,
        speaker: props.speaker,
        showTitle: props.showTitle,
        showSpeaker: props.showSpeaker,
        wrapUps: props.wrapUps.map(WrapUpDefinition),
        since: null,
        until: null,
        config: props
    }
}