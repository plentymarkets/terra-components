export enum PlentyLoadingBarEventType {
    PROGRESS,
    HEIGHT,
    COLOR,
    VISIBLE
}

export class PlentyLoadingBarEvent
{
    constructor(public type: PlentyLoadingBarEventType,
                public value: any)
    {
    }
}