import { Answer } from "./answer";

export class Question {
    id: String = "";
    text: String = "";
    answers: Array<Object> = [];
    revealed: boolean = false;
    constructor(id?: String|any, text?: String|any, answers?: Array<Answer>|any, revealed?:boolean|any) {
        this.id = id === undefined ? "" : id;
        this.text = text === undefined ? "" : text;
        this.answers = answers === undefined ? [] : answers;
        this.revealed = revealed === undefined ? false : revealed;
    }
}