import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { TranslationService } from 'angular-l10n';
import { TerraStopwatchInterface } from './data/terra-stopwatch.interface';

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

    protected stopwatch:TerraStopwatchInterface;
    protected langPrefix:string = 'terraStopwatch';

    constructor(public translation:TranslationService)
    {
    }

    public ngOnInit():void
    {
        this.initStopwatch();
        if(this.inputIsAutoPlay)
        {
            this.start();
        }
    }

    /**
     * @description returns stopwatch value in seconds
     */
    public getTimeInSeconds():number
    {
        return this.stopwatch.seconds;
    }

    /**
     * @description starts the stopwatch
     */
    public start():void
    {
        this.stopwatch.timer = window.setInterval(() => this.incrementSeconds(), 1000);
        this.stopwatch.state = 1;
    }

    /**
     * @description stops the stopwatch
     */
    public stop():void
    {
        window.clearInterval(this.stopwatch.timer);
        this.stopwatch.state = 0;
    }

    /**
     * @description resets the stopwatch
     */
    public reset():void
    {
        window.clearInterval(this.stopwatch.timer);
        this.initStopwatch();
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
        return (Math.floor(((this.stopwatch.seconds / 3600) % 24)) < 10 ? '0' : '') +
               Math.floor(((this.stopwatch.seconds / 3600) % 24)) + ':' +
               (Math.floor((this.stopwatch.seconds / 60 % 60)) < 10 ? '0' : '') + Math.floor((this.stopwatch.seconds / 60 % 60)) + ':' +
               (this.stopwatch.seconds % 60 < 10 ? '0' : '') + this.stopwatch.seconds % 60;
    }

    private incrementSeconds():number
    {
        return this.stopwatch.seconds += 1;
    }

    private initStopwatch():void
    {
        this.stopwatch = {
            seconds: 0,
            state: 0,
            timer: 0
        };
    }
}
