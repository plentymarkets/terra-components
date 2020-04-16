import { TerraPlacementEnum } from '../../../helpers/enums/terra-placement.enum';
import {
    Component,
    ElementRef,
    Input,
    OnInit
} from '@angular/core';
import { TranslationService } from 'angular-l10n';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { noop } from 'rxjs';
import { quillBasePreset } from '../quill/presets';

/** @deprecated since v5. Use quill-editor and our quillBasePreset instead */
@Component({
    selector:    'terra-base-editor',
    templateUrl: './terra-base-editor.component.html',
    providers:   [{
        provide:     NG_VALUE_ACCESSOR,
        useExisting: TerraBaseEditorComponent,
        multi:       true
    }]
})
export class TerraBaseEditorComponent implements OnInit, ControlValueAccessor
{
    @Input()
    public inputHeaderLabel:string;

    @Input()
    public inputPlaceholder:string;

    @Input()
    public inputFixedHeight:string;

    @Input()
    public inputMinHeight:string;

    /** @description add validation as a required field.*/
    @Input()
    public required:boolean;

    /** @description Set the tooltip.*/
    @Input()
    public tooltipText:string;

    /**
     * @deprecated since v4. Is replaced by the TooltipDirective and will be removed with the next major version.
     * @description Set the tooltip placement (bottom, top, left, right). Default top.
     * */
    @Input()
    public tooltipPlacement:TerraPlacementEnum;

    public _placeholder:string;
    public _value:string;
    public _modules:{ [index:string]:Object };

    public _onChangeCallback:(_:any) => void = noop;
    public _onTouchedCallback:(_:any) => void = noop;

    constructor(protected _translation:TranslationService,
                protected _myElement:ElementRef)
    {
        // initialize placeholder
        this._placeholder = this._translation.translate('terraNoteEditor.insertText');
        this._modules = quillBasePreset;
    }

    public ngOnInit():void
    {
        this.inputMinHeight = isNullOrUndefined(this.inputMinHeight) ? '100px' : this.inputMinHeight;
        // overwrite default placeholder if input is defined
        if(this.inputPlaceholder)
        {
            this._placeholder = this.inputPlaceholder;
        }
    }

    public writeValue(value:string):void
    {
        this._value = value;
    }

    public registerOnChange(fn:(_:any) => void):void
    {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn:() => void):void
    {
        this._onTouchedCallback = fn;
    }

    public focus():void
    {
        this._myElement.nativeElement.querySelector('.ql-editor').focus();
    }
}
