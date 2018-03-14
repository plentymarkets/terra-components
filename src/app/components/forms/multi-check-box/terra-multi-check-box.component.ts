import {
    Component,
    forwardRef,
    Input,
    OnInit,
    ViewChild
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TranslationService } from 'angular-l10n';
import { isNullOrUndefined } from 'util';
import { TerraCheckboxComponent } from '../checkbox/terra-checkbox.component';
import { TerraMultiCheckBoxValueInterface } from './data/terra-multi-check-box-value.interface';

@Component({
    selector: 'terra-multi-check-box',
    styles:   [require('./terra-multi-check-box.component.scss')],
    template: require('./terra-multi-check-box.component.html'),
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraMultiCheckBoxComponent),
            multi:       true
        }
    ]
})
export class TerraMultiCheckBoxComponent implements OnInit, ControlValueAccessor
{
    /**
     * @description If true, the multi check box will be disabled. Default false.
     * */
    @Input() public inputIsDisabled:boolean;

    /**
     * @description If true, the multi check box will be disabled. Default false.
     * */
    @Input() public inputName:string;

    protected valueList:Array<TerraMultiCheckBoxValueInterface> = [];

    @ViewChild('viewChildHeaderCheckbox') protected viewChildHeaderCheckbox:TerraCheckboxComponent;
    protected headerCheckboxValue:boolean;

    private _isInit:boolean;

    private _langPrefix:string = 'terraMultiCheckBox';

    constructor(public translation:TranslationService)
    {
        this.headerCheckboxValue = false;
    }

    public writeValue(valueList:Array<TerraMultiCheckBoxValueInterface>):void
    {
        this.valueList = valueList;

        this.checkHeaderCheckboxState();

        this.onTouchedCallback();
        this.onChangeCallback(this.valueList);
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
            this.inputName = this.translation.translate(this._langPrefix + '.selectAll');

            // this is necessary for language switch
            this.translation.translationChanged.subscribe(() =>
            {
                this.inputName = this.translation.translate(this._langPrefix + '.selectAll');
            });
        }

        this._isInit = true;
    }

    protected onHeaderCheckboxChange(isChecked:boolean):void
    {
        this.valueList.forEach((value:TerraMultiCheckBoxValueInterface) =>
        {
            value.selected = isChecked;
        });
    }

    protected checkHeaderCheckboxState():void
    {
        if(!isNullOrUndefined(this.valueList))
        {
            let filteredValues:Array<TerraMultiCheckBoxValueInterface> = this.valueList.filter((entry:TerraMultiCheckBoxValueInterface) =>
            {
                return entry.selected;
            });

            this.changeHeaderCheckboxState(filteredValues.length);
        }
    }

    private changeHeaderCheckboxState(filteredLength:number):void
    {
        if(filteredLength === 0)
        {
            this.headerCheckboxValue = false;
        }
        else if(filteredLength === this.valueList.length)
        {
            this.headerCheckboxValue = true;
        }
        else
        {
            this.headerCheckboxValue = undefined;
            this.viewChildHeaderCheckbox.isIndeterminate = true;
        }
    }

    private onTouchedCallback:() => void = ():void => undefined;

    private onChangeCallback:(_:any) => void = (_:any):void => undefined;
}
