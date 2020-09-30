import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Language } from 'angular-l10n';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'terra-stopwatch',
    styleUrls: ['./terra-stopwatch.component.scss'],
    templateUrl: './terra-stopwatch.component.html'
})
export class TerraStopwatchComponent implements OnInit, OnDestroy {
    /**
     * @description If true, the start, pause and reset control will show
     */
    @Input()
    public controls: boolean = false;

    /**
     * @description If true, stopwatch starts if component initialize
     */
    @Input()
    public autoPlay: boolean = false;

    /**
     * @description If true, buttons are small
     */
    @Input()
    public isSmall: boolean = false;

    /**
     * @description set the current value of the stopwatch
     */
    @Input()
    public set seconds(value: number) {
        this._secondsValue = value;
        this.secondsChange.emit(this.seconds);
    }

    /**
     * @description returns the current value of the stopwatch
     */
    public get seconds(): number {
        return this._secondsValue || 0;
    }

    /**
     * @description notification if the current value of the stopwatch changes. If the stopwatch is running it emits a new value every
     *     single second.
     */
    @Output()
    public readonly secondsChange: EventEmitter<number> = new EventEmitter<number>();

    @Language()
    public _lang: string;

    public readonly _langPrefix: string = 'terraStopwatch.';

    private _timer: number = null;
    private _secondsValue: number = 0;

    /**
     * @description initialisation routine. Starts the stopwatch if autoPlay is set.
     */
    public ngOnInit(): void {
        if (this.autoPlay) {
            this.start();
        }
    }

    public ngOnDestroy(): void {
        // implementation is required by angular-l10n. See https://robisim74.github.io/angular-l10n/spec/getting-the-translation/#messages
    }

    /**
     * @description states whether the stop watch is currently running
     */
    public get isRunning(): boolean {
        return !isNullOrUndefined(this._timer);
    }

    /**
     * @description starts the stopwatch
     */
    public start(): void {
        if (!this.isRunning) {
            this._timer = window.setInterval(() => this.incrementSeconds(), 1000);
        }
    }

    /**
     * @description stops the stopwatch
     */
    public stop(): void {
        if (this.isRunning) {
            window.clearInterval(this._timer);
            this._timer = null;
        }
    }

    /**
     * @description resets the stopwatch
     */
    public reset(): void {
        this.stop();
        this.seconds = 0;
    }

    /**
     * @description returns the current stopwatch value in a time string format
     */
    public get _timeString(): string {
        return this.format(this.seconds);
    }

    private format(timerSeconds: number): string {
        let hours: number = this.getHours(timerSeconds);
        let minutes: number = this.getMinutes(timerSeconds);
        let seconds: number = this.getSeconds(timerSeconds);
        return this.getDigitString(hours) + ':' + this.getDigitString(minutes) + ':' + this.getDigitString(seconds);
    }

    private getDigitString(value: number): string {
        return (value < 10 ? '0' : '') + value;
    }

    private getHours(seconds: number): number {
        return Math.floor((seconds / 3600) % 24);
    }

    private getMinutes(seconds: number): number {
        return Math.floor((seconds / 60) % 60);
    }

    private getSeconds(seconds: number): number {
        return seconds % 60;
    }

    private incrementSeconds(): void {
        this.seconds += 1;
    }
}
