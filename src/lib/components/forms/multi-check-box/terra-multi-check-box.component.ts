import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TranslationService } from 'angular-l10n';
import { isNullOrUndefined } from 'util';
import { TerraMultiCheckBoxValueInterface } from './data/terra-multi-check-box-value.interface';
import { throttleTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

/** @deprecated since v5. Use angular material's [select](https://material.angular.io/components/select/overview#multiple-selection) instead. */
@Component({
    selector:  'terra-multi-check-box',
    styleUrls: ['./terra-multi-check-box.component.scss'],
    templateUrl: './terra-multi-check-box.component.html',
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: TerraMultiCheckBoxComponent,
            multi:       true
        }
    ]
})
export class TerraMultiCheckBoxComponent implements OnInit, OnDestroy, ControlValueAccessor
{
    /**
     * @description If true, the multi check box will be disabled. Default false.
     * */
    @Input()
    public inputIsDisabled:boolean = false;
    /**
     * @description If true, the multi check box will be disabled. Default false.
     * */
    @Input()
    public inputName:string;
    /**
     * @description set the initial collapsed state.
     * @default false
     */
    @Input()
    public collapsed:boolean = false;
    /**
     * @description Set the function which will be executed when checkbox state changes.
     */
    @Output()
    public checkboxStateChanges:EventEmitter<Array<TerraMultiCheckBoxValueInterface>> = new EventEmitter<Array<TerraMultiCheckBoxValueInterface>>();

    public _valueList:Array<TerraMultiCheckBoxValueInterface> = [];

    public _headerCheckboxValue:boolean = false;
    public _headerCheckboxIndeterminate:boolean = false;

    private _changedCheckboxes$:Subject<Array<TerraMultiCheckBoxValueInterface>> = new Subject<Array<TerraMultiCheckBoxValueInterface>>();
    private readonly _langPrefix:string = 'terraMultiCheckBox';

    constructor(private _translation:TranslationService)
    {}

    public writeValue(valueList:Array<TerraMultiCheckBoxValueInterface>):void
    {
        this._valueList = valueList;

        this._checkHeaderCheckboxState();
    }

    public registerOnChange(fn:any):void
    {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn:any):void
    {
        this.onTouchedCallback = fn;
    }

    public ngOnInit():void
    {
        if(!this.inputName)
        {
            // this is necessary for language switch
            this._translation.translationChanged().subscribe(() =>
            {
                this.inputName = this._translation.translate(this._langPrefix + '.selectAll');
            });
        }

        this._changedCheckboxes$.pipe(throttleTime(100)).subscribe((checkboxes:Array<TerraMultiCheckBoxValueInterface>) =>
        {
            this.emitCallbacks(this._valueList, checkboxes);
        });
    }

    public ngOnDestroy():void
    {
        this._changedCheckboxes$.complete();
    }

    public _checkboxChanged(checkBox:TerraMultiCheckBoxValueInterface):void
    {
        this._checkHeaderCheckboxState();
        this._changedCheckboxes$.next([checkBox]);
    }

    public _onHeaderCheckboxChange(isChecked:boolean):void
    {
        let changedCheckboxes:Array<TerraMultiCheckBoxValueInterface> = [];

        this._valueList.forEach((value:TerraMultiCheckBoxValueInterface) =>
        {
            if(value.selected !== isChecked)
            {
                value.selected = isChecked;
                changedCheckboxes.push(value);
            }
        });

        this._changedCheckboxes$.next(changedCheckboxes);
    }

    public _checkHeaderCheckboxState():void
    {
        if(!isNullOrUndefined(this._valueList))
        {
            let filteredValues:Array<TerraMultiCheckBoxValueInterface> = this._valueList.filter((entry:TerraMultiCheckBoxValueInterface) =>
            {
                return entry.selected;
            });

            this.changeHeaderCheckboxState(filteredValues.length);
        }
    }

    public _toggleCollapsed():void
    {
        if(!this.inputIsDisabled)
        {
            this.collapsed = !this.collapsed;
        }
    }

    public _trackByValue(index:number, entry:TerraMultiCheckBoxValueInterface):any
    {
        return entry.value;
    }

    private emitCallbacks(value:Array<TerraMultiCheckBoxValueInterface>, changedCheckboxes:Array<TerraMultiCheckBoxValueInterface>):void
    {
        this.onTouchedCallback();
        this.onChangeCallback(value);
        this.checkboxStateChanges.emit(changedCheckboxes);
    }

    private changeHeaderCheckboxState(filteredLength:number):void
    {
        if(filteredLength === 0)
        {
            this._headerCheckboxValue = false;
        }
        else if(filteredLength === this._valueList.length)
        {
            this._headerCheckboxValue = true;
        }
        else
        {
            this._headerCheckboxIndeterminate = true;
        }
    }

    private onTouchedCallback:() => void = ():void => undefined;

    private onChangeCallback:(_:any) => void = (_:any):void => undefined;
}
