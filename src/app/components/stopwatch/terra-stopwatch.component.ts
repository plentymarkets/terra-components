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
    public inputEnableControls:boolean = false;

    /**
     * @description If true, stopwatch starts if component initialize
     */
    @Input()
    public inputIsAutoPlay:boolean = false;

    /**
     * @description If true, buttons are small
     */
    @Input()
    public inputIsSmall:boolean = false;

    protected langPrefix:string = 'terraStopwatch';

    private stopwatch:Stopwatch = new Stopwatch();

    constructor(public translation:TranslationService)
    {
    }

    public ngOnInit():void
    {
        if(this.inputIsAutoPlay)
        {
            this.start();
        }
    }

    /**
     * @description returns stopwatch value in milliseconds
     */
    public getTimeInMilliseconds():number
    {
        return this.stopwatch.ms;
    }

    /**
     * @description starts the stopwatch
     */
    public start():void
    {
        this.stopwatch.start();
    }

    /**
     * @description stops the stopwatch
     */
    public stop():void
    {
        this.stopwatch.stop();
    }

    /**
     * @description resets the stopwatch
     */
    public reset():void
    {
        this.stopwatch.reset();
    }

    /**
     * @description returns the stopwatch format
     */
    protected get format():string
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
     * @description runs the function for start and stop control
     */
    protected startAndStopControl():void
    {
        this.stopwatch.state === 1 ? this.stop() : this.start();
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
