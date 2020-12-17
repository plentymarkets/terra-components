import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { L10nLocale, L10nTranslationService, L10N_LOCALE } from 'angular-l10n';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraBaseEditorComponent } from '../base-editor/terra-base-editor.component';
import { TerraOverlayComponent } from '../../layouts/overlay/terra-overlay.component';
import { isNullOrUndefined } from 'util';
import { HtmlLinter } from './helper/html-linter.helper';
import { HtmlLinterRule } from './helper/html-linter-rule.enum';
import { HtmlLinterMessageInterface } from './helper/html-linter-message.interface';
import { TerraButtonInterface } from '../../buttons/button/data/terra-button.interface';

@Component({
    selector: 'terra-code-editor',
    templateUrl: './terra-code-editor.component.html',
    styleUrls: ['./terra-code-editor.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TerraCodeEditorComponent,
            multi: true
        }
    ]
})
/** @deprecated since v5.0. Please use ck-editor instead */
export class TerraCodeEditorComponent extends TerraBaseEditorComponent implements OnInit {
    public showCodeView: boolean = false;
    public editorContent: string = '';
    public rawContent: string = '';

    /**
     * @description If false, switching from code view to editor view is disabled while the input code is not valid. Default true.
     */
    @Input()
    public switchFromCode: boolean = true;

    @ViewChild('viewConfirmationOverlay', { static: true })
    public overlay: TerraOverlayComponent;

    public _viewConfirmation: { primaryButton: TerraButtonInterface; secondaryButton: TerraButtonInterface };

    public _isValidMarkup: boolean = true;

    public _invalidMarkupHint: string = '';

    private _isInitialized: boolean = false;

    private _linter: HtmlLinter;

    constructor(
        @Inject(L10N_LOCALE) public _locale: L10nLocale,
        translation: L10nTranslationService,
        myElement: ElementRef
    ) {
        super(translation, myElement);
        // initialize placeholder
        this._placeholder = this._translation.translate('terraNoteEditor.insertText');

        const self: TerraCodeEditorComponent = this;

        this._modules = {
            toolbar: {
                container: [
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [
                        {
                            header: [1, 2, 3, 4, 5, 6, false]
                        }
                    ],
                    ['link'],
                    ['code-block']
                ],
                handlers: {
                    'code-block': function (): void {
                        // 'this' points to the toolbar instance of the quill editor.
                        if (!self.showCodeView) {
                            self.rawContent = self._value;
                            self.showCodeView = true;
                        }
                    }
                }
            }
        };

        this._linter = new HtmlLinter([
            HtmlLinterRule.attrUnsafeChars,
            HtmlLinterRule.doctypeHtml5,
            HtmlLinterRule.inlineScriptDisabled,
            HtmlLinterRule.tagPair,
            HtmlLinterRule.styleDisabled
        ]);
    }

    public writeValue(value: string): void {
        this._value = value;
        // check if value is assigned first (initially)
        if (!this._isInitialized) {
            this.editorContent = value;
            this.rawContent = value;
            setTimeout(() => {
                // check if editor will change the markup
                this._checkCodeFormat().then((hasChanges: boolean) => {
                    // show raw content if editor will change the markup
                    this.showCodeView = hasChanges;

                    // wait until next tick to avoid emitting changes when initially assigning values
                    setTimeout(() => {
                        this._isInitialized = true;
                    });
                });
            });
        }
    }

    public ngOnInit(): void {
        super.ngOnInit();
        this._viewConfirmation = {
            primaryButton: {
                icon: 'icon-check',
                caption: this._translation.translate(
                    'terraCodeEditor.changeViewOverlay.primaryButton',
                    localStorage.getItem('lang')
                ),
                clickFunction: (): void => {
                    this._closeCodeView(true);
                    this.overlay.hideOverlay();
                }
            },
            secondaryButton: {
                icon: 'icon-cancel',
                caption: this._translation.translate(
                    'terraCodeEditor.changeViewOverlay.secondaryButton',
                    localStorage.getItem('lang')
                ),
                clickFunction: (): void => {
                    this.overlay.hideOverlay();
                }
            }
        };
    }

    public _emitChanges(isEditorContent: boolean = true): void {
        if (!this._isInitialized) {
            return;
        }

        if (isEditorContent && !this.showCodeView) {
            this._value = this.editorContent;
            this._onChangeCallback(this._value);
        } else if (!isEditorContent && this.showCodeView) {
            if (this._validateMarkup()) {
                this._value = this._safeHtml(this.rawContent);
                this._onChangeCallback(this._value);
            }
        }
    }

    public _closeCodeView(forceClose: boolean = false): void {
        this._checkCodeFormat().then((hasChanges: boolean) => {
            if (hasChanges && !forceClose) {
                // editor has changed the content
                if (this.switchFromCode) {
                    this.overlay.showOverlay();
                }
            } else {
                // no changes to content => show editor
                this.showCodeView = false;

                // force switching to editor even if this will lead to changes of the markup
                if (forceClose) {
                    this._emitChanges(true);
                }
            }
        });
    }

    private _checkCodeFormat(): Promise<boolean> {
        return new Promise((resolve: Function, reject: Function): void => {
            // store current editor value temporarily
            const tmpValue: string = this.editorContent;

            // assign raw content to editor
            this.editorContent = this.rawContent;

            // wait until change detection has been applied
            setTimeout(() => {
                // check if editor has changed the value by removing any tags or attributes
                // remove whitespaces before comparison to ignore code formattings
                if (!isNullOrUndefined(this.editorContent) || !isNullOrUndefined(this.rawContent)) {
                    if (this.editorContent.replace(/\s/g, '') !== this.rawContent.replace(/\s/g, '')) {
                        resolve(true);

                        // re-assign the original value
                        this.editorContent = tmpValue;
                    } else {
                        resolve(false);
                    }
                } else {
                    resolve(false);
                }
            });
        });
    }

    private _validateMarkup(): boolean {
        this._isValidMarkup = true;

        let errors: Array<HtmlLinterMessageInterface> = this._linter.verify('<div>' + this.rawContent + '</div>');

        if (errors.length > 0) {
            this._isValidMarkup = false;
            this._invalidMarkupHint = this._translation.translate('terraCodeEditor.linterMessage', {
                line: errors[0].line,
                col: errors[0].col,
                message: this._translation.translate('terraCodeEditor.linterRules.' + errors[0].rule)
            });
        }

        return this._isValidMarkup;
    }

    private _safeHtml(input: string): string {
        let parser: DOMParser = new DOMParser();
        let doc: HTMLDocument = parser.parseFromString(input, 'text/html');
        return doc.body.innerHTML;
    }
}
