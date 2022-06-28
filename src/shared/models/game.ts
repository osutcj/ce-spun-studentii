export interface NormalGame {
    currentQuestion: number,
    name: string,
    questionRevealed: boolean,
    revealedAnswers: Array < number >,
    team1: {
        points: number,
        name: string
    },
    team2: {
        points: number,
        name: string
    },
    type: 1
}
