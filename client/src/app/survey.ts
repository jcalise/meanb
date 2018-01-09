export class Survey {
    constructor(
        _id: string = '',
        public name: string = '',
        public question: string = '',
        public options: any[] = []
    ) {}
}
