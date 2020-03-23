import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Color } from '../../forms/input/color-picker/color.helper';
import { TerraTagNameInterface } from './data/terra-tag-name.interface';
import { Language } from 'angular-l10n';

@Component({
    selector:    'terra-tag',
    styleUrls:   ['./terra-tag.component.scss'],
    templateUrl: './terra-tag.component.html'
})
export class TerraTagComponent implements OnInit, OnChanges, OnDestroy
{
    /**
     * If no translation is given for the current language, this will be used as caption for the tag
     */
    @Input()
    public name:string;

    /**
     * Caption of the tag. If given, this is always shown.
     * @deprecated use 'name' instead
     */
    @Input()
    public inputBadge:string;

    /**
     * States whether a tag can be tagged.
     * @Default false
     */
    @Input()
    public inputIsTaggable:boolean = false;

    /**
     * States whether the tag should be tagged. This is only considered if 'inputIsTaggable' is set.
     * @default false
     */
    @Input()
    public inputIsTagged:boolean = false;

    /**
     * custom css class styles that are applied to the root container (div.tag) of the component
     */
    @Input()
    public inputCustomClass:string;

    /**
     * The background color for the tag.
     */
    @Input()
    public inputColor:string;

    /**
     * Id of a given tag
     */
    @Input()
    public tagId:number;

    /**
     * States whether a tag is closable or not. Displays a close icon if it is closable.
     * @default false
     */
    @Input()
    public isClosable:boolean = false;

    /**
     * Name of the tag in different languages.
     * @default []
     */
    @Input()
    public names:Array<TerraTagNameInterface> = [];

    /* eslint-disable @angular-eslint/no-output-on-prefix, @angular-eslint/prefer-output-readonly */
    /**
     * @deprecated use closeTag instead
     */
    @Output()
    public onCloseTag:EventEmitter<number> = new EventEmitter<number>();
    /* eslint-enable @angular-eslint/no-output-on-prefix, @angular-eslint/prefer-output-readonly */

    /**
     * Notifies when the user clicks on the close icon.
     */
    @Output()
    public readonly closeTag:EventEmitter<number> = new EventEmitter<number>();

    @Language()
    public _lang:string;

    public _tagName:string;

    public ngOnInit():void
    {
        if(this.onCloseTag.observers.length > 0)
        {
            console.warn('`onCloseTag` is deprecated. Please use `closeTag` instead.');
        }
    }

    public ngOnDestroy():void
    {
        // implementation is required by angular-l10n. See https://robisim74.github.io/angular-l10n/spec/getting-the-translation/#messages
    }

    /**
     * Change detection routine. Updates the 'tagName' depending on the inputs 'inputBadge', 'name' and 'names'.
     * @param changes
     */
    public ngOnChanges(changes?:SimpleChanges):void
    {
        if(changes.hasOwnProperty('name') || changes.hasOwnProperty('names') || changes.hasOwnProperty('inputBadge'))
        {
            this._tagName = this._getTagName();
        }
    }

    public _close():void
    {
        this.onCloseTag.emit(this.tagId);
        this.closeTag.emit(this.tagId);
    }

    /**
     * Get the background color.
     * @see inputColor
     */
    public get _bgColor():string
    {
        if(!isNullOrUndefined(this.inputColor))
        {
            return this.inputColor;
        }
        return null;
    }

    /**
     * Get the text color.
     */
    public get _color():string
    {
        if(!isNullOrUndefined(this.inputColor))
        {
            return (new Color(this.inputColor)).isDark() ? '#FFFFFF' : '#000000';
        }
        return null;
    }

    private _getTagName():string
    {
        if(this.inputBadge)
        {
            return this.inputBadge;
        }

        if(isNullOrUndefined(this.names))
        {
            return this.name;
        }

        const tagName:TerraTagNameInterface = this.names.find((name:TerraTagNameInterface) => name.language === this._lang);
        if(isNullOrUndefined(tagName))
        {
            return this.name;
        }
        else
        {
            return tagName.name;
        }
    }
}
