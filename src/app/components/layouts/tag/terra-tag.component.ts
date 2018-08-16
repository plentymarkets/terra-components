import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Color } from '../../forms/input/color-picker/color.helper';
import { TerraTagNameInterface } from './data/terra-tag-name.interface';
import { Language } from 'angular-l10n';

@Component({
    selector: 'terra-tag',
    styles:   [require('./terra-tag.component.scss')],
    template: require('./terra-tag.component.html')
})
export class TerraTagComponent
{
    @Language()
    public lang:string;

    @Input()
    public name:string;

    @Input()
    public inputBadge:string;

    @Input()
    public inputIsTagged:boolean;

    @Input()
    public inputIsTaggable:boolean;

    @Input()
    public inputCustomClass:string;

    @Input()
    /**
     * The background color for the tag.
     */
    public inputColor:string;

    @Input()
    public tagId:number | string;

    @Input()
    public isClosable:boolean;

    @Input()
    public names:Array<TerraTagNameInterface>;

    @Output()
    public onCloseTag:EventEmitter<number> = new EventEmitter<number>();

    constructor()
    {
        this.inputIsTagged = false;
        this.inputIsTaggable = false;
        this.inputColor = null;
        this.inputCustomClass = null;
        this.isClosable = false;
    }

    protected close():void
    {
        this.onCloseTag.emit(this.tagId);
    }

    protected getName():string
    {
        return this.inputBadge ? this.inputBadge :  this.getTranslatedName();
    }

    private getTranslatedName():string
    {
        // Fallback if names not set
        if(isNullOrUndefined(this.names))
        {
            return this.name;
        }
        else
        {
            const tagName:TerraTagNameInterface = this.names.find((name:TerraTagNameInterface) => name.language === this.lang);

            // Fallback if no name for this.lang is set
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

    /**
     * Get the background color.
     * @returns {string}
     * @see inputColor
     */
    private getBgColor():string
    {
        if(!isNullOrUndefined(this.inputColor))
        {
            return this.inputColor;
        }
        return null;
    }

    /**
     * Get the foreground color.
     */
    private getColor():string
    {
        if(!isNullOrUndefined(this.inputColor))
        {
            return (new Color(this.inputColor)).isDark() ? '#ffffff' : '#000000';
        }
        return null;
    }
}
