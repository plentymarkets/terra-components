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
    catchError,
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    switchMap,
    tap
} from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { of } from 'rxjs/observable/of';

@Component({
    selector:  'terra-live-search',
    template:  require('./terra-live-search.component.html'),
    styles:    [require('./terra-live-search.component.scss')],
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
    public getSingleElement:(value:T) => Observable<T>;

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
            tap((value:T) => this.onModelChange(value)),
            tap(() => this.flag = true)
        ).subscribe();

        if(!isNullOrUndefined(this.call) && !isNullOrUndefined(this.mappingFunc))
        {
            this.textInputChange$.pipe(
                debounceTime(400),
                distinctUntilChanged(),
                filter(() =>
                {
                    if(this.flag)
                    {
                        this.flag = false;
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                }),
                tap(() => this.suggestions = []),
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

    public writeValue(value:T):void
    {
        if(!this.suggestions.find((suggestion:TerraSuggestionBoxValueInterface) => suggestion.value === value))
        {
            this.getSingleElement(value).pipe(
                catchError(() => of(undefined)),
                filter((val:T) => !isNullOrUndefined(val)),
                map(this.mappingFunc),
                tap((element:TerraSuggestionBoxValueInterface) =>
                {
                    this.suggestions = [element];
                    this.selectedValue = value;
                })
            ).subscribe();
        }
        else
        {
            this.selectedValue = value;
        }
    }

    protected onModelChange(value:any):void
    {
        if(!isNullOrUndefined(this.onChangeCallback))
        {
            this.onChangeCallback(value);
        }
    }
}
