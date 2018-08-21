import {
    Component,
    ElementRef,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslationService } from 'angular-l10n';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraBaseEditorComponent } from '../base-editor/terra-base-editor.component';
import { TerraOverlayComponent } from '../../layouts/overlay/terra-overlay.component';
import { TerraButtonInterface } from '../../../../';
import { isNullOrUndefined } from 'util';

@Component({
    selector:  'terra-code-editor',
    template:  require('./terra-code-editor.component.html'),
    styles:    [
        require('./terra-code-editor.component.scss'),
        require('quill/dist/quill.bubble.css'),
        require('quill/dist/quill.snow.css'),
        require('./terra-code-editor.component.glob.scss').toString()
    ],
    providers: [{
        provide:     NG_VALUE_ACCESSOR,
        useExisting: TerraCodeEditorComponent,
        multi:       true
    }]
})
export class TerraCodeEditorComponent extends TerraBaseEditorComponent implements OnInit
{
    public showCodeView:boolean = false;
    public editorContent:string = '';
    public rawContent:string = '';

    @ViewChild('viewConfirmationOverlay')
    public overlay:TerraOverlayComponent;

    protected viewConfirmation:{primaryButton:TerraButtonInterface, secondaryButton:TerraButtonInterface};

    private isInitialized:boolean = false;

    constructor(protected translation:TranslationService, protected myElement:ElementRef)
    {
        super(translation, myElement);
        // initialize placeholder
        this.placeholder = this.translation.translate('terraNoteEditor.insertText');

        const self:TerraCodeEditorComponent = this;

        this.modules = {
            toolbar: {
                container: [
                    ['bold', 'italic', 'underline', 'strike'],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    [{'header': [1, 2, 3, 4, 5, 6, false]}],
                    ['code-block']
                ],
                handlers: {
                    'code-block': function():void
                    {
                        // 'this' points to the toolbar instance of the quill editor.
                        if (!self.showCodeView)
                        {
                            self.rawContent = self.value;
                            self.showCodeView = true;
                        }
                    }
                }
            }
        };
    }

    public writeValue(value:string):void
    {
        this.value = value;
        // check if value is assigned first (initially)
        if (!this.isInitialized)
        {
            // check if editor will change the markup
            this.checkCodeFormat()
                .then((hasChanges:boolean) =>
                {
                    // show raw content if editor will change the markup
                    this.showCodeView   = hasChanges;
                    this.rawContent     = value;
                    this.editorContent  = value;

                    // wait until next tick to avoid emitting changes when initially assigning values
                    setTimeout(() =>
                    {
                        this.isInitialized  = true;
                    });
                });
        }
    }

    public ngOnInit():void
    {
        super.ngOnInit();
        this.viewConfirmation = {
            primaryButton: {
                icon: 'icon-check',
                caption: this.translation.translate('terraCodeEditor.changeViewOverlay.primaryButton',
                         localStorage.getItem('lang')),
                clickFunction: ():void =>
                {
                    this.closeCodeView(true);
                    this.overlay.hideOverlay();
                }
            },
            secondaryButton: {
                icon: 'icon-cancel',
                caption: this.translation.translate('terraCodeEditor.changeViewOverlay.secondaryButton',
                         localStorage.getItem('lang')),
                clickFunction: ():void =>
                {
                    this.overlay.hideOverlay();
                }
            }
        };
    }

    protected emitChanges(isEditorContent:boolean = true):void
    {
        if ( !this.isInitialized )
        {
            return;
        }

        if ( isEditorContent && !this.showCodeView )
        {
            this.value = this.editorContent;
            this.ngModelChange.emit(this.value);
        }
        else if ( !isEditorContent && this.showCodeView )
        {
            this.value = this.sanitizeHTML(this.rawContent);
            this.ngModelChange.emit(this.value);
        }

    }

    protected closeCodeView(forceClose:boolean = false):void
    {
        this.checkCodeFormat()
            .then((hasChanges:boolean) =>
            {
                if ( hasChanges && !forceClose )
                {
                    // editor has changed the content
                    this.overlay.showOverlay();
                }
                else
                {
                    // no changes to content => show editor
                    this.showCodeView = false;

                    // force switching to editor even if this will lead to changes of the markup
                    if ( forceClose )
                    {
                        this.emitChanges(true);
                    }
                }
            });
    }

    private checkCodeFormat():Promise<boolean>
    {
        return new Promise((resolve:Function, reject:Function):void =>
        {
            // store current editor value temporarily
            const tmpValue:string = this.editorContent;

            // assign raw content to editor
            this.editorContent = this.rawContent;

            // wait until change detection has been applied
            setTimeout(() =>
            {
                // check if editor has changed the value by removing any tags or attributes
                // remove whitespaces before comparison to ignore code formattings
                if(!isNullOrUndefined(this.editorContent) || !isNullOrUndefined(this.rawContent))
                {
                    if(this.editorContent.replace(/\s/g, '') !== this.rawContent.replace(/\s/g, ''))
                    {
                        resolve(true);

                        // re-assign the original value
                        this.editorContent = tmpValue;
                    }
                    else
                    {
                        resolve(false);
                    }
                }
                else
                {
                    resolve(false);
                }
            });
        });
    }

    /**
     * Validates the input html and adds missing closing tag or attribute tag.
     * @param {string} input
     * @returns {string}
     */
    private sanitizeHTML(input:string):string
    {
        //
        // CHECK FOR UNCLOSED QUOTES
        //
        const tagContentExp:RegExp = /<(\w[^>]*?)(\/?>)/g;
        let output:string = input.replace(tagContentExp, (match:string, tagContent:string, closingTag:string) =>
        {
            const attributeExp:RegExp = /([a-zA-Z0-9_-]+)=(?:"|')?(.*?)(?:"|')?(?=(?:\w+=)|\s*$)/g;
            tagContent = tagContent.replace(attributeExp, (attrMatch:string, attrName:string, attrValue:string) =>
            {
                if ( !!attrValue.trim() )
                {
                    return attrName + '="' + attrValue.trim() + '"';
                }
                return attrName;
            });
            return '<' + tagContent + closingTag;
        });

        //
        // DISABLE SRC ATTRIBUTES
        //
        output = output.replace(/src=/g, '###tmp-src=');

        //
        // SANITIZE UNCLOSED TAGS BY BROWSER
        //
        let tmp:any = document.createElement('div');
        tmp.innerHTML = output;
        output = tmp.innerHTML;

        const entities:any = {
            'lt': '<',
            'gt': '>',
            'amp': '&'
        };
        output = output.replace(/&(\w+);/g, (match:string, entity:string) =>
        {
            if ( entities.hasOwnProperty(entity) )
            {
                return entities[entity];
            }
            return match;
        });

        //
        // ENABLE SRC ATTRIBUTES AGAIN
        //
        output = output.replace(/###tmp-src=/g, 'src=');

        return output;
    }
}
