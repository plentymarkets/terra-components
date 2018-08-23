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
import { TerraKeyValuePairInterface } from '../../../../models/terra-key-value-pair.interface';

@Component({
    selector: 'terra-form-entry-list',
    template: require('./terra-form-entry-list.component.html'),
    styles:   [require('./terra-form-entry-list.component.scss')]
})
export class TerraFormEntryListComponent implements OnInit
{
    private static itemCount:number = 0;

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
                this.emitValue();
            });
        }
        else
        {
            if(!this.compareValues(value))
            {
                this.value = value.map((entry:any) =>
                {
                    return {
                        key: TerraFormEntryListComponent.itemCount++,
                        value: entry
                    };
                });
            }
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

    private value:Array<{key:number, value:any}> = [];

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
            this.value.push({
                key: TerraFormEntryListComponent.itemCount++,
                value: isNullOrUndefined(this.inputFormField.defaultValue) ? null : this.inputFormField.defaultValue
            });
            this.emitValue();
        }
    }

    protected get canRemoveElement():boolean
    {
        return isNaN(this.min) || this.value.length > this.min;
    }

    protected removeElement(key:number):void
    {
        let index:number = this.value.findIndex((entry:{key:number, value:any}) => entry.key === key);
        if(index < 0 || index > this.value.length)
        {
            return;
        }

        if(this.canRemoveElement)
        {
            this.value.splice(index, 1);
            this.emitValue();
        }
    }

    protected fillRange():void
    {
        let defaultValue:any = !isNullOrUndefined(this.inputFormField) ? this.inputFormField.defaultValue : null;
        while(!isNaN(this.min) && this.min > this.value.length)
        {
            this.value.push({
                key: TerraFormEntryListComponent.itemCount++,
                value: defaultValue
            });
        }
        while(!isNaN(this.max) && this.max < this.value.length)
        {
            this.value.pop();
        }
    }

    protected onElementValueChanged(key:number, value:any):void
    {
        let entry:{key:number, value:any} = this.value.find((e:{key:number, value:any}) => e.key === key);
        if ( !isNullOrUndefined(entry) )
        {
            entry.value = value;
            this.emitValue();
        }
    }

    protected trackByFn(index:number, item:{key:number, value:any}):number
    {
        console.log(item.key);
        return item.key;
    }

    private emitValue():void
    {
        this.outputFormValueChanged.next(
            this.value.map((entry:{key:number, value:any}) => entry.value)
        );
    }

    private compareValues(values:Array<any>):boolean
    {
        if(values.length !== this.value.length)
        {
            return false;
        }

        this.value.forEach((entry:{ key:number, value:any }, index:number) =>
        {
            if(entry.value !== values[index])
            {
                return false;
            }
        });

        return true;
    }

}
