import {
    Component,
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

@Component({
    selector:  'terra-category-picker',
    template:  require('./terra-category-picker.component.html'),
    styles:    [
        require('./terra-note-editor.component.scss').toString()
    ],
    providers: [{
        provide:     NG_VALUE_ACCESSOR,
        useExisting: TerraNoteEditorComponent,
        multi:       true
    }]
})
export class TerraNoteEditorComponent implements OnInit, ControlValueAccessor
{
    //@Input() inputPlaceholder:string;

    @Output() ngModelChange:EventEmitter<string> = new EventEmitter();

    private _value:string;
    private _onChangeCallback:() => void;
    private _onTouchedCallback:() => void;

    constructor(private translation:TranslationService)
    {
        // initialize callbacks
        this._onChangeCallback = () =>
        {
        };
        this._onTouchedCallback = () =>
        {
        };
    }

    public ngOnInit():void
    {
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
