import {
    AfterViewInit,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    Type,
    ViewChildren
} from '@angular/core';
import { TerraFormScope } from '../model/terra-form-scope.data';
import {
    isNullOrUndefined,
    isString
} from 'util';
import { TerraFormFieldInterface } from '../model/terra-form-field.interface';
import { TerraKeyValuePairInterface } from '../../../../models/terra-key-value-pair.interface';
import {
    FormControl,
    FormGroup,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import {
    TerraFormEntryComponent,
    TerraFormEntryListComponent
} from '../../../../..';

@Component({
    selector: 'terra-form-container',
    template: require('./terra-form-container.component.html'),
    styles:   [require('./terra-form-container.component.scss')]
})
export class TerraFormContainerComponent implements OnInit, OnChanges, AfterViewInit
{
    @Input()
    public inputScope:TerraFormScope;

    @Input()
    public inputControlTypeMap:{ [key:string]:Type<any> } = {};

    @Input()
    public set inputValue(value:any)
    {
        if(isNullOrUndefined(value))
        {
            this.value = {};
        }
        else
        {
            this.value = value;
        }
    }

    public get inputValue():any
    {
        return this.value;
    }

    @Input()
    public set inputFormFields(fields:{ [key:string]:TerraFormFieldInterface })
    {
        this.formFields = Object.keys(fields)
                                .map((key:string) =>
                                {
                                    return {
                                        key:   key,
                                        value: fields[key]
                                    };
                                });

        this.updateFieldVisibility();
    }

    @Input()
    public inputIsDisabled:boolean = false;

    @Input()
    public formKey:string;

    @Output()
    public outputFormValueChanged:EventEmitter<TerraKeyValuePairInterface<any>> = new EventEmitter<TerraKeyValuePairInterface<any>>();

    public formGroup:FormGroup = new FormGroup({});

    protected formFields:Array<TerraKeyValuePairInterface<TerraFormFieldInterface>> = [];
    protected formFieldVisibility:{ [key:string]:boolean } = {};

    private value:any = {};

    // constructor(@Optional() @Host() @Inject(forwardRef(() => TerraFormEntryComponent))  private formEntry:TerraFormEntryComponent)
    // { }

    @ViewChildren('child')
    private childEntries:QueryList<TerraFormEntryComponent | TerraFormEntryListComponent>;

    public ngOnInit():void
    {
        this.inputScope.onDataChanged.subscribe((data:any) =>
        {
            this.updateFieldVisibility();
        });

        this.formFields.forEach((test:TerraKeyValuePairInterface<TerraFormFieldInterface>) => {
            this.formGroup.addControl(test.key, new FormControl(this.inputValue[test.key])); // TODO: add support for formGroup and formArrays
        });

        // if(!isNullOrUndefined(this.formEntry))
        // {
        //     if(!isNullOrUndefined(this.formEntry.formContainer))
        //     {
        //         this.formEntry.formContainer.formGroup.addControl(this.inputFormFieldKey, this.formGroup);
        //     }
        //     else if(!isNullOrUndefined(this.formEntry.formList))
        //     {
        //         this.formEntry.formList.formArray.insert(+this.inputFormFieldKey, this.formGroup);
        //     }
        // }
    }

    public ngAfterViewInit():void
    {
        // this.childEntries.forEach((entry:TerraFormEntryComponent | TerraFormEntryListComponent) =>
        // {
        //     if(entry instanceof TerraFormEntryComponent)
        //     {
        //         // this.formGroup.addControl(entry.formKey, entry.formGroup ? entry.formGroup : entry.formControl);
        //     }
        //     else if(entry instanceof TerraFormEntryListComponent)
        //     {
        //         this.formGroup.addControl(entry.inputFormFieldKey, entry.formArray);
        //     }
        // });
        //
        // this.childEntries.changes.subscribe((changes:any) =>
        // {
        //     console.log(changes);
        // });
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('inputScope'))
        {
            this.updateFieldVisibility();
        }
        if(changes.hasOwnProperty('inputValue'))
        {
            console.log(changes['inputValue'].currentValue);
            this.formGroup.patchValue(changes['inputValue'].currentValue);
        }
    }

    protected onFormValueChanged(key:string, value:any):void
    {
        this.value[key] = value;
        this.updateFieldVisibility();
        this.outputFormValueChanged.next({
            key:   key,
            value: value
        });
    }

    private updateFieldVisibility():void
    {
        this.formFields
            .forEach((field:TerraKeyValuePairInterface<TerraFormFieldInterface>) =>
            {
                if(isString(field.value.isVisible))
                {
                    this.formFieldVisibility[field.key] = this.inputScope.evaluate(field.value.isVisible);
                }
                else
                {
                    this.formFieldVisibility[field.key] = isNullOrUndefined(field.value.isVisible) || field.value.isVisible;
                }
            });
    }
}
