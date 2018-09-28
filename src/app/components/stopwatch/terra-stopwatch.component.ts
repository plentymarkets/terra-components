import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import * as Stopwatch from 'timer-stopwatch';
import { TranslationService } from 'angular-l10n';

@Component({
    selector: 'terra-stopwatch',
    styles:   [require('./terra-stopwatch.component.scss')],
    template: require('./terra-stopwatch.component.html'),
})
export class TerraStopwatchComponent implements OnInit
{
    @Input()
    public inputEnableControls:boolean;

    private stopwatch:any;

    constructor(public translation:TranslationService)
    {
        this.inputEnableControls = false;
        this.stopwatch = new Stopwatch();
    }

    public ngOnInit():void
    {
    }

    public getStopwatchTimeInMilliseconds():number
    {
        return this.stopwatch.ms;
    }

    protected startStopwatch():void
    {
        this.stopwatch.start();
    }

    protected stopStopwatch():void
    {
        this.stopwatch.stop();
    }

    protected resetStopwatch():void
    {
        this.stopwatch.reset();
    }

    protected startAndStopControl():void
    {
        return this.stopwatch.state === 1 ? this.stopStopwatch() : this.startStopwatch();
    }

    protected get stopWatchTime():string
    {
        return this.getStopwatchPattern();
    }

    private getStopwatchPattern():string
    {
        return (Math.floor(((this.stopwatch.ms / (1000 * 60 * 60)) % 24)) < 10 ? '0' : '') +
               Math.floor(((this.stopwatch.ms / (1000 * 60 * 60)) % 24)) + ':' +
               (Math.floor(((this.stopwatch.ms / (1000 * 60)) % 60)) < 10 ? '0' : '') +
               Math.floor(((this.stopwatch.ms / (1000 * 60)) % 60)) + ':' +
               (Math.floor(((this.stopwatch.ms / 1000) % 60)) < 10 ? '0' : '') +
               Math.floor(((this.stopwatch.ms / 1000) % 60));
    }
}
