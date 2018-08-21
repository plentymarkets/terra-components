import {
    Component,
    forwardRef,
    Input,
    OnInit
} from '@angular/core';
import {
    Observable,
    Subject
} from 'rxjs';
import { TerraSuggestionBoxValueInterface } from '../../../..';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    switchMap,
    tap
} from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
    selector: 'terra-live-search-component',
    template: require('./terra-live-search.component.html'),
    styles:   [require('./terra-live-search.component.scss')],
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraLiveSearchComponent),
            multi:       true
        }
    ]
})

export class TerraLiveSearchComponent<T> implements OnInit, ControlValueAccessor
{
    @Input()
    public name:string;

    @Input()
    public call:(text:string) => Observable<Array<T>>;

    @Input()
    public mappingFunc:(value:T) => TerraSuggestionBoxValueInterface;

    protected textInputChange$:Subject<string> = new Subject<string>();
    protected modelChange$:Subject<T> = new Subject<T>();

    protected suggestions:Array<TerraSuggestionBoxValueInterface> = [];
    protected selectedValue:T;

    private onChangeCallback:(value:any) => void;
    private onTouchedCallback:(value:any) => void;

    private flag:boolean;

    constructor()
    {
    }

    public ngOnInit():void
    {
        this.modelChange$.pipe(
            tap((value:T) =>
            {
                if(!isNullOrUndefined(this.onChangeCallback))
                {
                    this.onChangeCallback(value);
                }
            }),
            tap(() =>
            {
                this.flag = true;
            })
        ).subscribe();

        if(!isNullOrUndefined(this.call) && !isNullOrUndefined(this.mappingFunc))
        {
            this.textInputChange$.pipe(
                debounceTime(400),
                distinctUntilChanged(),
                filter(() =>
                {
                    return !this.flag;
                }),
                tap(() => this.suggestions = []), // TODO: FIX this resets the selected value right after it is set
                filter((text:string) => text.length > 2),
                switchMap((text:string) => this.call(text)),
                tap((response:Array<T>) => this.suggestions = response.map(this.mappingFunc))
            ).subscribe();
        }
    }

    public registerOnChange(fn:any):void
    {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn:any):void
    {
        this.onTouchedCallback = fn;
    }

    public writeValue(obj:T):void
    {
        this.selectedValue = obj;
    }

    public get value():T
    {
        return this.selectedValue;
    }

    protected onModelChange(event:any):void
    {
        if(!isNullOrUndefined(this.onChangeCallback))
        {
            this.onChangeCallback(event);
        }
    }
}
