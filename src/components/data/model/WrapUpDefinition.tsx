export enum WrapUpStyle {
  Red = "RED",
  Yellow = "YELLOW",
  Green = "GREEN"
}

export interface IWrapUpConfig
{
  wrapUpInSeconds: number;
  style: WrapUpStyle;
}

export interface IWrapUpDefinition {
  wrapUpInSeconds: number;
  className: string;
  audioSrc: string;
}

const clearAnnounceTonesSrc = "/asset/audio/mixkit-clear-announce-tones-2861.wav"
const confirmationToneSrc = "/asset/audio/mixkit-confirmation-tone-2867.wav"
const correctAnswerRewardSrc = "/asset/audio/mixkit-correct-answer-reward-952.wav"
const correctAnswerToneSrc = "/asset/audio/mixkit-correct-answer-tone-2870.wav"
const exitDoorSrc = "/asset/audio/mixkit-store-door-bell-ring-934.wav"

function getAudioSrc(style: WrapUpStyle): string {
  switch(style)
  {
    case WrapUpStyle.Red:
        return clearAnnounceTonesSrc;
    case WrapUpStyle.Yellow:
    case WrapUpStyle.Green:
        return confirmationToneSrc;
  }
}

function getClassName(style: WrapUpStyle): string {
  switch(style)
  {
    case WrapUpStyle.Red:
        return "wrapUpRed";
    case WrapUpStyle.Yellow:
        return "wrapUpYellow";
    case WrapUpStyle.Green:
        return "wrapUpGreen";
  }
}

export function WrapUpDefinition (props: IWrapUpConfig) : IWrapUpDefinition {
    return {
        wrapUpInSeconds: props.wrapUpInSeconds,
        className: getClassName(props.style),
        audioSrc: getAudioSrc(props.style)
    }
}