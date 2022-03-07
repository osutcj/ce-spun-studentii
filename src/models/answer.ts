export class Answer {
    points: number;
    revealed: boolean;
    text: String;


    constructor(points?: Number|any, revealed?: boolean|any, text?: String|any) {
        this.points = points;
        this.revealed = revealed;
        this.text = text;
    }
}