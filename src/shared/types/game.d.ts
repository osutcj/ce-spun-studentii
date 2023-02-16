export interface DBTeam {
  name: string;
  points: number;
}

export interface NormalGame {
  id: string;
  currentQuestion: string;
  name: string;
  questionRevealed: boolean;
  revealedAnswers: Array<number>;
  team1: DBTeam;
  team2: DBTeam;
  type: number;
  pointsMultiplier: number;
  wrongAnswer: number;
}

export interface AlertType {
  message: string;
  errorType: number;
}