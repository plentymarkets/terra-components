import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { TranslationService } from 'angular-l10n';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
    selector: 'terra-wysiwyg-editor',
    template: require('./terra-wysiwyg-editor.component.html'),
    styles:   [require('./terra-wysiwyg-editor.component.scss')],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: TerraWysiwygEditorComponent,
        multi: true
    }]
})
export class TerraWysiwygEditorComponent implements OnInit, ControlValueAccessor
{
    @Input() inputPlaceholder:string;

    @Output() ngModelChange:EventEmitter<string> = new EventEmitter();

    private _placeholder:string;
    private _value:string;
    private _onChangeCallback:() => void;
    private _onTouchedCallback:() => void;

    constructor(private translation:TranslationService)
    {
        // initialize placeholder
        this._placeholder = this.translation.translate('terraEditor.insertText');

        // initialize callbacks
        this._onChangeCallback = () => {};
        this._onTouchedCallback = () => {};
    }

    public ngOnInit():void
    {
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

    public registerOnChange(fn:any):void
    {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn:any):void
    {
        this._onTouchedCallback = fn;
    }
}
