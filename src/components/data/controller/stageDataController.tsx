
const simpleTests = `
[
  {
    "id": 1,
    "title": "Simple Test 1",
    "speaker": "Ko",
    "duration": 1,
    "firstWrapUpInSec": 40,
    "secondWrapUpInSec": 25,
    "lastWrapUpInSec": 10
  },
  {
    "id": 2,
    "title": "Simple Test 2",
    "speaker": "Ko",
    "duration": 2,
    "firstWrapUpInSec": 50,
    "secondWrapUpInSec": 40,
    "lastWrapUpInSec": 20
  },
  {
    "id": 3,
    "title": "Simple Test 3",
    "speaker": "Ko",
    "duration": 3,
    "firstWrapUpInSec": 50,
    "secondWrapUpInSec": 40,
    "lastWrapUpInSec": 20
  },
  {
    "id": 4,
    "title": "Simple Test 4",
    "speaker": "Ko",
    "duration": 7,
    "firstWrapUpInSec": 180,
    "secondWrapUpInSec": 120,
    "lastWrapUpInSec": 60
  }
] 
`

const kidsHomework = `
[
  {
    "id": 1,
    "title": "Kids Homework",
    "speaker": "Ren / Cyrsu / Ko",
    "duration": 60,
    "firstWrapUpInSec": 180,
    "secondWrapUpInSec": 120,
    "lastWrapUpInSec": 60
  }
] 
`
const semiIdeaFocusGroup = ` 
[
  {
    "id": 1,
    "title": "測試軟體 / 喇叭 / 麥克風",
    "speaker": "電信/經營規劃／JC",
    "duration": 30,
    "firstWrapUpInSec": 180,
    "secondWrapUpInSec": 120,
    "lastWrapUpInSec": 60
  },
  {
    "id": 2,
    "title": "開場",
    "speaker": "IC 設計-販售-小卡肖",
    "duration": 3,
    "firstWrapUpInSec": 60,
    "secondWrapUpInSec": 40,
    "lastWrapUpInSec": 20
  },
  {
    "id": 3,
    "title": "規則介紹 / 輪流自我介紹",
    "speaker": "IC 設計-販售-小卡肖",
    "duration": 7,
    "firstWrapUpInSec": 180,
    "secondWrapUpInSec": 120,
    "lastWrapUpInSec": 60
  },
  {
    "id": 4,
    "title": "Timer Duty 說明",
    "speaker": "資訊/工程師𝟯.𝟭𝟰𝟭𝟱",
    "duration": 2,
    "firstWrapUpInSec": 60,
    "secondWrapUpInSec": 40,
    "lastWrapUpInSec": 20
  },
  {
    "id": 5,
    "title": "What are AI Chips",
    "speaker": "新竹封測業務喬治",
    "duration": 7,
    "firstWrapUpInSec": 180,
    "secondWrapUpInSec": 120,
    "lastWrapUpInSec": 60
  },
  {
    "id": 6,
    "title": "GPUs / TPUs",
    "speaker": "封測_CS_錢夫人",
    "duration": 7,
    "firstWrapUpInSec": 180,
    "secondWrapUpInSec": 120,
    "lastWrapUpInSec": 60
  },
  {
    "id": 7,
    "title": "FPGAs",
    "speaker": "IC製造-艾倫",
    "duration": 7,
    "firstWrapUpInSec": 180,
    "secondWrapUpInSec": 120,
    "lastWrapUpInSec": 60
  },
  {
    "id": 8,
    "title": "ASICs / NPUs / VPUs",
    "speaker": "IC PM/Vivi",
    "duration": 7,
    "firstWrapUpInSec": 180,
    "secondWrapUpInSec": 120,
    "lastWrapUpInSec": 60
  },
  {
    "id": 9,
    "title": "Application of AI chips",
    "speaker": "JH-Sales",
    "duration": 7,
    "firstWrapUpInSec": 180,
    "secondWrapUpInSec": 120,
    "lastWrapUpInSec": 60
  },
  {
    "id": 10,
    "title": "Break",
    "speaker": "None",
    "duration": 5,
    "firstWrapUpInSec": 180,
    "secondWrapUpInSec": 120,
    "lastWrapUpInSec": 60
  },
  {
    "id": 11,
    "title": "Q&A Session",
    "speaker": "智動化/ 無人車AMR/外星仁",
    "duration": 30,
    "firstWrapUpInSec": 180,
    "secondWrapUpInSec": 120,
    "lastWrapUpInSec": 60
  },
  {
    "id": 12,
    "title": "主持人：邀請成員讀書會回饋",
    "speaker": "IC 設計-販售-小卡肖",
    "duration": 10,
    "firstWrapUpInSec": 180,
    "secondWrapUpInSec": 120,
    "lastWrapUpInSec": 60
  },
  {
    "id": 13,
    "title": "散會",
    "speaker": "IC 設計-販售-小卡肖",
    "duration": 2,
    "firstWrapUpInSec": 60,
    "secondWrapUpInSec": 40,
    "lastWrapUpInSec": 20
  }
]
`
interface IAgenda {
  id: number;
  title: string;
  speaker: string;
  duration: number;
  firstWrapUpInSec: number;
  secondWrapUpInSec: number;
  lastWrapUpInSec: number;
}

enum CountDownTrigger {
  Manual,
  Scheduled,
}

export interface IWrapUp {
  wrapUpInSeconds: number;
  className: string;
  audioSrc: string;
}

export interface ICountdownData {
  id: string;
  title: string;
  speaker: string;
  until: Date;
  since: Date;
  wrapUps: IWrapUp[];
  timeRemaining?: string;
}

interface IStageData {
  id: string;
  name?: string;
  // a collection of countdowns
  countdowns: ICountdownData[];
}

// provides the current time app wide
export function GetTimeNow() {
  return new Date();
}


function calculateHours(distance: number) {
  return Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
}

function calculateSeconds(distance: number) {
  return Math.floor((distance % (1000 * 60)) / 1000);
}

function calculateMinutes(distance: number) {
  return Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
}

function formatDigits(num: number) {
  return num.toString().padStart(2, "0");
}

function compareDates(date1: Date, date2: Date) {
  if (date1.getUTCFullYear() > date2.getUTCFullYear()) return 1;
  if (date1.getUTCFullYear() < date2.getUTCFullYear()) return -1;
  if (date1.getUTCMonth() > date2.getUTCMonth()) return 1;
  if (date1.getUTCMonth() < date2.getUTCMonth()) return -1;
  if (date1.getUTCDate() > date2.getUTCDate()) return 1;
  if (date1.getUTCDate() < date2.getUTCDate()) return -1;
  if (date1.getUTCHours() > date2.getUTCHours()) return 1;
  if (date1.getUTCHours() < date2.getUTCHours()) return -1;
  if (date1.getUTCMinutes() > date2.getUTCMinutes()) return 1;
  if (date1.getUTCMinutes() < date2.getUTCMinutes()) return -1;
  if (date1.getUTCSeconds() > date2.getUTCSeconds()) return 1;
  if (date1.getUTCSeconds() < date2.getUTCSeconds()) return -1;

  return 0;
}

export function calculateTimeDistance(sinceDate: Date, untilDate: Date) {
  const now = GetTimeNow();

  const comparison = compareDates(now, sinceDate);
  const since = (comparison > 0 ? now : sinceDate).getTime();
  const until = untilDate.getTime();
  const diff = until - since;
  return diff;
}

export function calculateTimeRemaining(distance: number) {
  if(distance < 0) return "00:00:00";
  const hours = calculateHours(distance);
  const minutes = calculateMinutes(distance);
  const seconds = calculateSeconds(distance);

  return `${formatDigits(hours)}:${formatDigits(minutes)}:${formatDigits(
    seconds
  )}`;
}

function generateTimeXMinutesLater(source: Date, minutes: number) {
  const later = new Date(source);
  later.setMinutes(source.getMinutes() + minutes);
  return later;
}

function generateCountdowns(agendas: IAgenda[], startTime: Date): ICountdownData[] {
  let current = startTime;
  const countdowns: ICountdownData[] = agendas.sort((a,b) => a.id > b.id ? 1 : -1).map((agenda) => {
    const until = generateTimeXMinutesLater(current, agenda.duration);
    const countdown: ICountdownData = {
      id: agenda.id.toString(),
      title: agenda.title,
      speaker: agenda.speaker,
      since: current,
      until: until,
      wrapUps: [
        {
          wrapUpInSeconds: agenda.lastWrapUpInSec,
          className: 'wrapUpRed',
          audioSrc: "/asset/audio/mixkit-clear-announce-tones-2861.wav"
        },
        {
          wrapUpInSeconds: agenda.secondWrapUpInSec,
          className: 'wrapUpYellow',
          audioSrc: "/asset/audio/mixkit-confirmation-tone-2867.wav"
        },
        {
          wrapUpInSeconds: agenda.firstWrapUpInSec,
          className: 'wrapUpGreen',
          audioSrc: "/asset/audio/mixkit-confirmation-tone-2867.wav"
        },
      ],
    };
    current = until;
    return countdown;
  });

  return countdowns;

}
export function GetStageListingData(): IStageData[] {
  // return a date 2 mins from now
  const startTime = new Date(2024, 1, 27, 22, 30);

  const semiIdeaAgendas: IAgenda[] = JSON.parse(semiIdeaFocusGroup);
  const kidsHomeworkAgendas: IAgenda[] = JSON.parse(kidsHomework);
  const simpleTestAgendas: IAgenda[] = JSON.parse(simpleTests);

  // create some dummy stage data

  const stage1: ICountdownData[] = generateCountdowns(semiIdeaAgendas, startTime);
  const stage2: ICountdownData[] = generateCountdowns(kidsHomeworkAgendas, startTime);
  const stage3: ICountdownData[] = generateCountdowns(simpleTestAgendas,new Date()); 
				
  const stageList: IStageData[] = [
    {
      id: "1",
      name: "SEMI-IDEA Focus Group",
      countdowns: stage1,
    },
    {
      id: "2",
      name: "Homework",
      countdowns: stage2,
    },
    {
      id: "3",
      name: "Simple Test",
      countdowns: stage3,
    }
  ];

  return stageList;
}

export function GetStageData(stageId: string): IStageData | undefined {
  return GetStageListingData().find((s) => s.id === stageId);
}

export function generateStageViewerPath(stageId: string): string {
  return `/stages/viewer/${stageId}`;
}

export function generateStageControllerPath(stageId: string): string {
  return `/stages/controller/${stageId}`;
}