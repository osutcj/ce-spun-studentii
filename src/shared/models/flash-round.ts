export interface FlashRoundAnswers {
    answer: string,
    points: number
}

export interface FlashRound {
    id: string,
    name: string,
    answers1: FlashRoundAnswers[] | EmptyFlashRoundAnswer[],
    answers2: FlashRoundAnswers[] | EmptyFlashRoundAnswer[],
    type: number
    currentRound: number,
}

export class EmptyFlashRoundAnswer implements FlashRoundAnswers {
    answer: string;
    points: number;

    constructor() {
        this.answer = "";
        this.points = 0;
    }
}
