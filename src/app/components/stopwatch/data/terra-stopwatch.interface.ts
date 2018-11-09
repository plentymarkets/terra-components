import { TerraStopWatchStateEnum } from './terra-stopwatch.enum';

export interface TerraStopwatchInterface
{
    seconds:number;
    state:TerraStopWatchStateEnum;
    timer:number;
}
