import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { Language } from 'angular-l10n';
import { isNullOrUndefined } from 'util';

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
    public controls:boolean = false;

    /**
     * @description If true, stopwatch starts if component initialize
     */
    @Input()
    public autoPlay:boolean = false;

    /**
     * @description If true, buttons are small
     */
    @Input()
    public isSmall:boolean = false;

    /**
     * @description set the current value of the stopwatch
     */
    @Input()
    public set seconds(value:number)
    {
        this.secondsValue = value;
        this.secondsChange.emit(this.seconds);
    }

    /**
     * @description returns the current value of the stopwatch
     */
    public get seconds():number
    {
        return this.secondsValue || 0;
    }

    /**
     * @description notification if the current value of the stopwatch changes. If the stopwatch is running it emits a new value every
     *     single second.
     */
    @Output()
    public secondsChange:EventEmitter<number> = new EventEmitter<number>();

    @Language()
    protected lang:string;

    protected readonly langPrefix:string = 'terraStopwatch';

    private timer:number = null;
    private secondsValue:number = 0;

    /**
     * @description initialisation routine. Stats the stopwatch if autoPlay is set.
     */
    public ngOnInit():void
    {
        if(this.autoPlay)
        {
            this.start();
        }
    }

    /**
     * @description states whether the stop watch is currently running
     */
    public get isRunning():boolean
    {
        return !isNullOrUndefined(this.timer);
    }

    /**
     * @description starts the stopwatch
     */
    public start():void
    {
        this.timer = window.setInterval(() => this.incrementSeconds(), 1000);
    }

    /**
     * @description stops the stopwatch
     */
    public stop():void
    {
        window.clearInterval(this.timer);
        this.timer = null;
    }

    /**
     * @description resets the stopwatch
     */
    public reset():void
    {
        this.stop();
        this.seconds = 0;
    }

    /**
     * @description returns the stopwatch format
     */
    protected get format():string
    {
        return (Math.floor(((this.seconds / 3600) % 24)) < 10 ? '0' : '') +
               Math.floor(((this.seconds / 3600) % 24)) + ':' +
               (Math.floor((this.seconds / 60 % 60)) < 10 ? '0' : '') + Math.floor((this.seconds / 60 % 60)) + ':' +
               (this.seconds % 60 < 10 ? '0' : '') + this.seconds % 60;
    }

    private incrementSeconds():void
    {
        this.seconds += 1;
    }
}
