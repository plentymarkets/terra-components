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

@Component({
    selector:  'terra-base-editor',
    template:  require('./terra-base-editor.component.html'),
    styles:    [
        require('./terra-base-editor.component.scss')
    ],
    providers: [{
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

    /** @description Set the tooltip placement (bottom, top, left, right). Default top.*/
    @Input()
    public tooltipPlacement:TerraPlacementEnum;

    protected placeholder:string;
    protected value:string;
    protected modules:{ [index:string]:Object };

    protected onChangeCallback:(_:any) => void = noop;
    protected onTouchedCallback:(_:any) => void = noop;

    constructor(protected translation:TranslationService,
                protected myElement:ElementRef)
    {
        // initialize placeholder
        this.placeholder = this.translation.translate('terraNoteEditor.insertText');
        this.modules = {
            toolbar: [
                ['bold',
                 'italic',
                 'underline',
                 'strike']        // toggled buttons
            ]
        };
    }

    public ngOnInit():void
    {
        this.tooltipPlacement = isNullOrUndefined(this.tooltipPlacement) ? TerraPlacementEnum.TOP : this.tooltipPlacement;
        this.inputMinHeight = isNullOrUndefined(this.inputMinHeight) ? '100px' : this.inputMinHeight;
        // overwrite default placeholder if input is defined
        if(this.inputPlaceholder)
        {
            this.placeholder = this.inputPlaceholder;
        }
    }

    public writeValue(value:string):void
    {
        this.value = value;
    }

    public registerOnChange(fn:(_:any) => void):void
    {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn:() => void):void
    {
        this.onTouchedCallback = fn;
    }

    public focus():void
    {
        this.myElement.nativeElement.querySelector('.ql-editor').focus();
    }
}
