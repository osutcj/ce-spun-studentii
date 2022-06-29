export interface DBTeam {
    name: string;
    points: number;
}

export interface NormalGame {
    id: string,
    currentQuestion: string,
    name: string,
    questionRevealed: boolean,
    revealedAnswers: Array<number>,
    team1: DBTeam,
    team2: DBTeam,
    type: number,
    pointsMultiplier: number
}

export const EmptyGame: NormalGame = {
    id: "",
    currentQuestion: "",
    name: "",
    questionRevealed: false,
    revealedAnswers: [],
    team1: {
        name: "",
        points: 0,
    },
    team2: {
        name: "",
        points: 0,
    },
    type: 1,
    pointsMultiplier: 1,
}
