import { GetTimeNow } from "@/components/util/timeUtil";
import { IWrapUpConfig, IWrapUpDefinition, WrapUpDefinition } from "./WrapUpDefinition";

export interface IUserAgendaConfig
{
  id: string;
  title: string;
  showTitle: boolean;
  speaker: string;
  showSpeaker: boolean;
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


export function AgendaDefinition (props: IUserAgendaConfig) : IAgendaDefinition {

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