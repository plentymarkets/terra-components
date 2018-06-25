import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { TranslationService } from 'angular-l10n';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Component({
    selector:  'terra-base-editor',
    template:  require('./terra-base-editor.component.html'),
    styles:    [
        require('./terra-base-editor.component.scss'),
        require('quill/dist/quill.bubble.css'),
        require('quill/dist/quill.snow.css'),
        require('./terra-base-editor.component.glob.scss').toString()
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
    public inputPlaceholder:string;

    @Input()
    public inputFixedHeight:string;

    @Input()
    public inputMinHeight:string;

    @Output()
    public ngModelChange:EventEmitter<string> = new EventEmitter();

    protected _placeholder:string;
    protected _value:string;
    protected _modules:{ [index:string]:Object };

    constructor(protected translation:TranslationService,
                protected _myElement:ElementRef)
    {
        // initialize placeholder
        this._placeholder = this.translation.translate('terraNoteEditor.insertText');
        this._modules = {
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

    public registerOnChange(fn:() => void):void
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

    private _onChangeCallback:() => void = ():void => undefined;
    private _onTouchedCallback:() => void = ():void => undefined;
}
