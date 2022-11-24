export interface DBAnswer {
    answer: string;
    points: number;
}

export interface DBQuestion {
    id: string,
    text: string;
    answers: DBAnswer[];
}

export class EmptyQuestion implements DBQuestion {
    id : string;
    text : string;
    answers : DBAnswer[];

    constructor() {
        this.id = "";
        this.text = "";
        this.answers = [];
    }

}
