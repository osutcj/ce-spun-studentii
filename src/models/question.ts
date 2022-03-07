import { Answer } from "./answer";

export class Question {
    public constructor(
      public readonly id: string = '',
      public text: string = '',
      public answers: Answer[] = [],
      public revealed: boolean = false,
    ) {}
}
