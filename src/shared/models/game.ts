import { NormalGame } from '../types/game';

export const EmptyGame: NormalGame = {
  id: '',
  currentQuestion: '',
  name: '',
  questionRevealed: false,
  revealedAnswers: [],
  team1: {
    name: '',
    points: 0,
  },
  team2: {
    name: '',
    points: 0,
  },
  type: 1,
  pointsMultiplier: 1,
  wrongAnswer: 0,
};
