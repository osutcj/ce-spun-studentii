import { Answer } from "./answer";

export class Question {
    public constructor(
      public readonly id: string = '',
      public text: String = '',
      public answers: Answer[] = [],
      public revealed: boolean = false,
    ) {}
}
