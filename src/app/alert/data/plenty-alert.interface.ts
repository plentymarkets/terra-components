export interface PlentyAlertInterface
{
    msg:string,
    closable:boolean,
    type:string,
    dismissOnTimeout:number,
    identifier?:string
}