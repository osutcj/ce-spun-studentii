import { Question } from "./question";

export enum PointsMode {
  Single = 1,
  Double = 2,
  Triple = 3,
}

export interface DBTeam {
  name: string;
  points: number;
}

export interface DBAnswer {
  text: string;
  revealed: boolean;
  points: number;
  revealed: boolean;
}

export interface DBQuestion {
  id: number;
  text: string;
  answers: DBAnswer[];
  revealed: boolean;
}

export interface FlashRoundAnswers {
  answer: string,
  points: number,
}
export interface FlashRound {
  answers1: FlashRoundAnswers[],
  answers2: FlashRoundAnswers[],
}

export interface DB {
  flash: FlashRound,
  currentQuestion: number;
  pointsMultiplier: PointsMode;
  questions: DBQuestion[];
  team1: DBTeam;
  team2: DBTeam;
}