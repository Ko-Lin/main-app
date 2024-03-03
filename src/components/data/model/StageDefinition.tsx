import { GetTimeNow } from "@/components/util/timeUtil";
import {
  AgendaDefinition,
  IAgendaDefinition,
  IUserAgendaConfig,
} from "./AgendaDefinition";

export interface IStageDefinition {
  id: string;
  userId: string;
  name: string;
  agendaDefinitions: IAgendaDefinition[];
}

export interface IStageConfig {
  id: string;
  userId: string;
  name: string;
  startDate: string;
  agendaConfigs: IUserAgendaConfig[];
}
export function StageDefinition(props: IStageConfig): IStageDefinition {
  const abstractAgenda = props.agendaConfigs.map(AgendaDefinition);
  abstractAgenda.forEach((agenda, index) => {
    if (agenda.since !== null) return;
    if (index === 0) {
      const since = new Date(Date.parse(props.startDate)) ?? GetTimeNow();
      agenda.since = since;
      agenda.until = new Date(
        since.getTime() + agenda.config.durationInSec * 1000
      );
    } else {
      const previousAgenda = abstractAgenda[index - 1];
      const since = previousAgenda.until ?? GetTimeNow();
      agenda.since = since;
      agenda.until = new Date(
        since.getTime() + agenda.config.durationInSec * 1000
      );
    }
  });

  return {
    id: props.id,
    userId: props.userId,
    name: props.name,
    agendaDefinitions: abstractAgenda,
  };
}
