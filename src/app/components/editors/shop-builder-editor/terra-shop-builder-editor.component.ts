import { Component, ElementRef } from '@angular/core';
import { TranslationService } from 'angular-l10n';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraBaseEditorComponent } from '../base-editor/terra-base-editor.component';

@Component({
    selector:  'terra-shop-builder-editor',
    template:  require('./terra-shop-builder-editor.component.html'),
    styles:    [
        require('./terra-shop-builder-editor.component.scss'),
        require('quill/dist/quill.bubble.css'),
        require('quill/dist/quill.snow.css'),
        require('./terra-shop-builder-editor.component.glob.scss').toString()
    ],
    providers: [{
        provide:     NG_VALUE_ACCESSOR,
        useExisting: TerraShopBuilderEditorComponent,
        multi:       true
    }]
})
export class TerraShopBuilderEditorComponent extends TerraBaseEditorComponent
{
    public showCodeView:boolean = false;
    public rawContent:string = '';

    constructor(protected translation:TranslationService, protected _myElement:ElementRef)
    {
        super(translation, _myElement);
        // initialize placeholder
        this._placeholder = this.translation.translate('terraNoteEditor.insertText');

        const self:TerraShopBuilderEditorComponent = this;

        this._modules = {
            toolbar: {
                container: [
                    ['bold', 'italic', 'underline', 'strike'],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    [{'script': 'sub'}, {'script': 'super'}],
                    [{'header': [1, 2, 3, 4, 5, 6, false]}],
                    ['link', 'image'],
                    ['code-block']
                ],
                handlers: {
                    'code-block': function():void
                    {
                        // 'this' points to the toolbar instance of the quill editor.
                        if (!self.showCodeView)
                        {
                            self.rawContent = self._value;
                            self.showCodeView = true;
                        }
                        else
                        {
                            self._value = self.rawContent;
                            self.ngModelChange.emit(self.rawContent);
                            self.showCodeView = false;
                        }
                    }
                }
            }
        };
    }
}
