import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { TranslationService } from 'angular-l10n';
import * as Stopwatch from 'timer-stopwatch';

@Component({
    selector: 'terra-stopwatch',
    styles:   [require('./terra-stopwatch.component.scss')],
    template: require('./terra-stopwatch.component.html'),
})
export class TerraStopwatchComponent implements OnInit
{
    @Input()
    public inputEnableControls:boolean;

    @Input()
    public inputIsAutoPlay:boolean;

    protected langPrefix:string = 'terraStopwatch';

    private stopwatch:any;

    constructor(public translation:TranslationService)
    {
        this.inputEnableControls = false;
        this.inputIsAutoPlay = false;
        this.stopwatch = new Stopwatch();
    }

    public ngOnInit():void
    {
        if(this.inputIsAutoPlay)
        {
            this.startStopwatch();
        }
    }

    public getStopwatchTimeInMilliseconds():number
    {
        return this.stopwatch.ms;
    }

    public startStopwatch():void
    {
        this.stopwatch.start();
    }

    public stopStopwatch():void
    {
        this.stopwatch.stop();
    }

    public resetStopwatch():void
    {
        this.stopwatch.reset();
    }

    protected get stopWatchTime():string
    {
        return this.getStopwatchPattern();
    }

    protected get resetControlTooltip():string
    {
        return this.translation.translate(this.langPrefix + '.reset');
    }

    protected get startAndStopControlTooltip():string
    {
        return this.translation.translate(this.langPrefix + (this.stopwatch.state === 1 ? '.pause' : '.start'));
    }

    protected get startAndStopControlIcon():string
    {
        return this.stopwatch.state === 1 ? 'icon-control_pause' : 'icon-control_play';
    }

    protected startAndStopControl():void
    {
        return this.stopwatch.state === 1 ? this.stopStopwatch() : this.startStopwatch();
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
