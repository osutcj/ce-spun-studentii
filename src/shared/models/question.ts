import { Answer } from "./answer";

export class Question {
  public constructor(
    public readonly id = '',
    public text = '',
    public answers: Answer[] = [],
    public revealed = false,
  ) {}
}
