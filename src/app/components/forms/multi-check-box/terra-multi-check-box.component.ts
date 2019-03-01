import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    OnInit,
    Output,
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
import { throttleTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector:  'terra-multi-check-box',
    styles:    [require('./terra-multi-check-box.component.scss')],
    template:  require('./terra-multi-check-box.component.html'),
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraMultiCheckBoxComponent),
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

    protected valueList:Array<TerraMultiCheckBoxValueInterface> = [];

    @ViewChild('viewChildHeaderCheckbox')
    protected viewChildHeaderCheckbox:TerraCheckboxComponent;

    protected headerCheckboxValue:boolean;

    private langPrefix:string = 'terraMultiCheckBox';

    private changedCheckboxes$:Subject<Array<TerraMultiCheckBoxValueInterface>> = new Subject<Array<TerraMultiCheckBoxValueInterface>>();

    constructor(public translation:TranslationService)
    {
    }

    public writeValue(valueList:Array<TerraMultiCheckBoxValueInterface>):void
    {
        this.valueList = valueList;

        this.checkHeaderCheckboxState();

        this.changedCheckboxes$.next(this.valueList);
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
            this.translation.translationChanged().subscribe(() =>
            {
                this.inputName = this.translation.translate(this.langPrefix + '.selectAll');
            });
        }

        this.changedCheckboxes$.pipe(throttleTime(100)).subscribe((checkboxes:Array<TerraMultiCheckBoxValueInterface>) =>
        {
            this.emitCallbacks(this.valueList, checkboxes);
        });
    }

    public ngOnDestroy():void
    {
        this.changedCheckboxes$.complete();
    }

    protected checkboxChanged(checkBox:TerraMultiCheckBoxValueInterface):void
    {
        this.checkHeaderCheckboxState();
        this.changedCheckboxes$.next([checkBox]);
    }

    protected onHeaderCheckboxChange(isChecked:boolean):void
    {
        let changedCheckboxes:Array<TerraMultiCheckBoxValueInterface> = [];

        this.valueList.forEach((value:TerraMultiCheckBoxValueInterface) =>
        {
            if(value.selected !== isChecked)
            {
                value.selected = isChecked;
                changedCheckboxes.push(value);
            }
        });

        this.changedCheckboxes$.next(changedCheckboxes);
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

    protected toggleCollapsed():void
    {
        if(!this.inputIsDisabled)
        {
            this.collapsed = !this.collapsed;
        }
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
