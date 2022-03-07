export class Answer {
    points: number | undefined;
    revealed: boolean | undefined;
    text: String | undefined;


    constructor(points?: number|undefined, revealed?: boolean|undefined, text?: String|undefined) {
        this.points = points === undefined ? 0 : points;
        this.revealed = revealed === undefined ? false : revealed;
        this.text = text === undefined ? "" : text;
    }
}