export enum TerraLoadingBarEventType
{
    PROGRESS,
    HEIGHT,
    COLOR,
    VISIBLE
}

export class TerraLoadingBarEvent
{
    constructor(public type:TerraLoadingBarEventType,
                public value:any)
    {
    }
}