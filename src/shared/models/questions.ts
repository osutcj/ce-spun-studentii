export interface DBAnswer {
    text: string;
    points: number;
}

export interface DBQuestion {
    text: string;
    answers: DBAnswer[];
}
