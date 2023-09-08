export interface FlashRoundAnswers {
  answer: string;
  points: number;
  showPoints?: boolean;
}

export interface FlashRound {
  id: string;
  name: string;
  answers: FlashRoundAnswers[];
  type: number;
  toggleWrongSound: boolean;
}
