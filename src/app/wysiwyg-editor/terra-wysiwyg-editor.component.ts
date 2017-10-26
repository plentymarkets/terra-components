import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { TranslationService } from 'angular-l10n';

@Component({
    selector: 'terra-wysiwyg-editor',
    template: require('./terra-wysiwyg-editor.component.html'),
    styles:   [require('./terra-wysiwyg-editor.component.scss')]
})
export class TerraWysiwygEditorComponent implements OnInit
{
    @Input() inputPlaceholder:string;

    private _placeholder:string;

    constructor(private translation:TranslationService)
    {
        // initialize placeholder
        this._placeholder = this.translation.translate('terraEditor.insertText');
    }

    public ngOnInit():void
    {
        // overwrite default placeholder if input is defined
        if(this.inputPlaceholder)
        {
            this._placeholder = this.inputPlaceholder;
        }
    }
}
