export class Answer {

    public constructor (
        public points: number = 0,
        public revealed: boolean = false,
        public text: string = '',
    ) {}
}