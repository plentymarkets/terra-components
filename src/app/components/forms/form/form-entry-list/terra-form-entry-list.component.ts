import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Type
} from '@angular/core';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import {
    isArray,
    isNullOrUndefined,
    isString
} from 'util';
import { TerraFormScope } from '../model/terra-form-scope.data';

@Component({
    selector: 'terra-form-entry-list',
    template: require('./terra-form-entry-list.component.html'),
    styles:   [require('./terra-form-entry-list.component.scss')]
})
export class TerraFormEntryListComponent implements OnInit
{
    @Input()
    public inputFormField:TerraFormFieldInterface;

    @Input()
    public set inputFormValue(value:Array<any>)
    {
        if(isNullOrUndefined(value) || !isArray(value))
        {
            this.value = [];
            setTimeout(() =>
            {
                this.outputFormValueChanged.next(this.value);
            });
        }
        else
        {
            this.value = value;
        }
        this.fillRange();
    }

    @Input()
    public inputListRange:boolean | string;

    @Input()
    public inputScope:TerraFormScope;

    @Input()
    public inputControlTypeMap:{ [key:string]:Type<any> } = {};

    @Input()
    public inputIsDisabled:boolean = false;

    @Output()
    public outputFormValueChanged:EventEmitter<any> = new EventEmitter<any>();

    protected min:number;
    protected max:number;

    private value:Array<any> = [];

    public ngOnInit():void
    {
        if(isString(this.inputListRange))
        {
            let match:RegExpExecArray = /^\[(\d*),(\d*)]$/.exec(this.inputListRange);
            if(match !== null)
            {
                this.min = parseInt(match[1], 10);
                this.max = parseInt(match[2], 10);
            }
            else
            {
                this.min = 1 / 0;   // NaN
                this.max = 1 / 0;   // NaN
            }
            this.fillRange();
        }
    }

    protected get canAddElement():boolean
    {
        return isNaN(this.max) || this.value.length - 1 < this.max;
    }

    protected addElement():void
    {
        if(this.canAddElement)
        {
            this.value.push(isNullOrUndefined(this.inputFormField.defaultValue) ? null : this.inputFormField.defaultValue);
            this.outputFormValueChanged.next(this.value);
        }
    }

    protected get canRemoveElement():boolean
    {
        return isNaN(this.min) || this.value.length > this.min;
    }

    protected removeElement(index:number):void
    {
        if(index < 0 || index > this.value.length)
        {
            return;
        }

        if(this.canRemoveElement)
        {
            this.value.splice(index, 1);
            this.outputFormValueChanged.next(this.value);
        }
    }

    protected fillRange():void
    {
        let defaultValue:any = !isNullOrUndefined(this.inputFormField) ? this.inputFormField.defaultValue : null;
        while(!isNaN(this.min) && this.min > this.value.length)
        {
            this.value.push(defaultValue);
        }
        while(!isNaN(this.max) && this.max < this.value.length)
        {
            this.value.pop();
        }
    }

    protected onElementValueChanged(index:number, value:any):void
    {
        this.value[index] = value;
        this.outputFormValueChanged.next(this.value);
    }

    protected trackByFn(index:number, item:any):number
    {
        return item;
    }

}
