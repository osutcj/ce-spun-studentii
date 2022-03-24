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
  points: number;
  revealed: boolean;
}

export interface DBQuestion {
  id: number;
  text: string;
  answers: DBAnswer[];
  revealed: boolean;
}

export interface DB {
  currentQuestion: number;
  pointsMultiplier: PointsMode;
  questions: DBQuestion[];
  team1: DBTeam;
  team2: DBTeam;
}