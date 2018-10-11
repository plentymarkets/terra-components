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
    /**
     * @description If true, the start, pause and reset control will show
     */
    @Input()
    public inputEnableControls:boolean;

    /**
     * @description If true, stopwatch starts if component initialize
     */
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

    /**
     * @description returns stopwatch value in milliseconds
     */
    public getStopwatchTimeInMilliseconds():number
    {
        return this.stopwatch.ms;
    }

    /**
     * @description starts the stopwatch
     */
    public startStopwatch():void
    {
        this.stopwatch.start();
    }

    /**
     * @description stops the stopwatch
     */
    public stopStopwatch():void
    {
        this.stopwatch.stop();
    }

    /**
     * @description resets the stopwatch
     */
    public resetStopwatch():void
    {
        this.stopwatch.reset();
    }

    /**
     * @description returns the stopwatch format
     */
    protected get stopWatchTime():string
    {
        return this.getStopwatchPattern();
    }

    /**
     * @description returns the tooltip for reset control
     */
    protected get resetControlTooltip():string
    {
        return this.translation.translate(this.langPrefix + '.reset');
    }

    /**
     * @description returns the tooltip for start and stop control
     */
    protected get startAndStopControlTooltip():string
    {
        return this.translation.translate(this.langPrefix + (this.stopwatch.state === 1 ? '.pause' : '.start'));
    }

    /**
     * @description returns the icon for start and stop control
     */
    protected get startAndStopControlIcon():string
    {
        return this.stopwatch.state === 1 ? 'icon-control_pause' : 'icon-control_play';
    }

    /**
     * @description returns the function for start and stop control
     */
    protected startAndStopControl():void
    {
        return this.stopwatch.state === 1 ? this.stopStopwatch() : this.startStopwatch();
    }

    /**
     * @description build and return stopwatch pattern/format
     */
    private getStopwatchPattern():string
    {
        return (Math.floor(((this.stopwatch.ms / 3600000) % 24)) < 10 ? '0' : '') +
               Math.floor(((this.stopwatch.ms / 3600000) % 24)) + ':' +
               (Math.floor(((this.stopwatch.ms / 60000) % 60)) < 10 ? '0' : '') +
               Math.floor(((this.stopwatch.ms / 60000) % 60)) + ':' +
               (Math.floor(((this.stopwatch.ms / 1000) % 60)) < 10 ? '0' : '') +
               Math.floor(((this.stopwatch.ms / 1000) % 60));
    }
}
