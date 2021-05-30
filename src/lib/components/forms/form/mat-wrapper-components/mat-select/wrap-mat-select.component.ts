import {
    Component,
    Input,
    OnInit
} from "@angular/core";
import { TerraSelectBoxValueInterface } from "../../../select-box/data/terra-select-box.interface";
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from "@angular/forms";
import { noop } from "rxjs";

@Component({
    selector:    'terra-wrap-mat-select',
    templateUrl: './wrap-mat-select.component.html',
    providers:   [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: WrapMatSelectComponent,
            multi:       true
        }
    ]
})
export class WrapMatSelectComponent implements OnInit, ControlValueAccessor
{
    @Input()
    public inputName:string = ' ';

    @Input()
    public inputIsRequired:boolean = false;

    @Input()
    public inputIsDisabled:boolean = false;

    @Input()
    public inputIsSmall:boolean = false;

    @Input()
    public inputOpenOnTop:boolean = false;

    @Input()
    public inputTooltipText:string = '';

    @Input()
    public inputListBoxValues:Array<TerraSelectBoxValueInterface> = [];

    public selected:any;

    private _onTouchedCallback:() => void = noop;
    private _onChangeCallback:(_:any) => void = noop;

    constructor()
    {
    }

    ngOnInit()
    {
    }

    public selectionChanged(change:any):void
    {
        this._onChangeCallback(change.value);
    }

    public registerOnChange(fn:(_:any) => void):void
    {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn:() => void):void
    {
        this._onTouchedCallback = fn;
    }

    writeValue(obj:any):void
    {
        this.selected = obj;
    }
}

