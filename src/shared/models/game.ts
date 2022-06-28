export interface DBTeam {
    name: string;
    points: number;
}

export interface NormalGame {
    currentQuestion: number,
    name: string,
    questionRevealed: boolean,
    revealedAnswers: Array < number >,
    team1: DBTeam,
    team2: DBTeam,
    type: 1
}
