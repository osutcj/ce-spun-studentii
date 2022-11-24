export interface DBAnswer {
  answer: string;
  points: number;
}

export interface DBQuestion {
  id: string;
  text: string;
  answers: DBAnswer[];
}
