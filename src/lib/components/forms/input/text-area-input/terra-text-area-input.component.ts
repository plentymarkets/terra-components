import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { TerraInputComponent } from '../terra-input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraRegex } from '../../../../helpers/regex/terra-regex';
import { isNullOrUndefined } from 'util';

let nextId:number = 0;

@Component({
    selector:  'terra-text-area-input',
    styleUrls: ['./terra-text-area-input.component.scss'],
    templateUrl: './terra-text-area-input.component.html',
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: TerraTextAreaInputComponent,
            multi:       true
        }
    ]
})
/**
 * @deprecated since v4. Use '<mat-input>' instead. See {@link https://material.angular.io/components/input/overview}
 */
export class TerraTextAreaInputComponent extends TerraInputComponent implements OnChanges
{
    /**
     * @description If true, the textarea is not resizeable. Default false.
     */
    @Input()
    public inputHasFixedHeight:boolean = false;

    /**
     * @description Sets the initial number of rows. Minimum is four.
     */
    @Input()
    public inputMaxRows:number;

    /**
     * @description a unique string identifier for the specific input instance.
     */
    public _id:string;
    private readonly _defaultMaxRows:number = 4;

    constructor()
    {
        super(TerraRegex.MIXED);

        // generate the id of the input instance
        this._id = `text-area-input_#${nextId++}`;
        this.inputMaxRows = this._defaultMaxRows;
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('inputMaxRows') && !isNullOrUndefined(changes.inputMaxRows))
        {
            this.inputMaxRows = Math.max(this._defaultMaxRows, changes.inputMaxRows.currentValue);
        }

        if(changes.hasOwnProperty('inputHasFixedHeight'))
        {
            this.inputHasFixedHeight = !!changes.inputHasFixedHeight.currentValue;
        }
    }

    /**
     * Set the focus on the native input element.
     */
    public focusNativeInput():void
    {
        setTimeout(():void =>
        {
            let input:HTMLInputElement = <HTMLInputElement> document.getElementById(this._id);
            input.focus();
        });
    }

    /**
     * Select the content of the native input element.
     */
    public selectNativeInput():void
    {
        setTimeout(():void =>
        {
            let input:HTMLInputElement = <HTMLInputElement> document.getElementById(this._id);
            input.select();
        });
    }
}
