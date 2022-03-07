import { Answer } from "./answer";

export class Question {
    id: String;
    text: String;
    answers: Array<Object>;
    revealed: boolean;
    constructor(id?: String|any, text?: String|any, answers?: Array<Answer>|any, revealed?:boolean|any) {
        this.id = id;
        this.text = text;
        this.answers = answers;
        this.revealed = revealed;
    }
}