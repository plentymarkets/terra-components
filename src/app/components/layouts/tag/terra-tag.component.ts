import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Color } from '../../forms/input/color-picker/color.helper';
import { TerraTagNameInterface } from './data/terra-tag-name.interface';

@Component({
    selector: 'terra-tag',
    styles:   [require('./terra-tag.component.scss')],
    template: require('./terra-tag.component.html')
})
export class TerraTagComponent
{
    @Input()
    public name:string;

    @Input()
    public inputBadge:string;

    @Input()
    public inputIsTagged:boolean = false;

    @Input()
    public inputIsTaggable:boolean = false;

    @Input()
    public inputCustomClass:string;

    @Input()
    /**
     * The background color for the tag.
     */
    public inputColor:string;

    @Input()
    public tagId:number;

    @Input()
    public isClosable:boolean = false;

    @Input()
    public names:Array<TerraTagNameInterface>;

    @Output()
    public onCloseTag:EventEmitter<number> = new EventEmitter<number>();

    private lang:string = localStorage.getItem('plentymarkets_lang_');

    protected close():void
    {
        this.onCloseTag.emit(this.tagId);
    }

    protected getName():string
    {
        return this.inputBadge ? this.inputBadge : this.getTranslatedName();
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
    protected getBgColor():string
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
    protected getColor():string
    {
        if(!isNullOrUndefined(this.inputColor))
        {
            return (new Color(this.inputColor)).isDark() ? '#ffffff' : '#000000';
        }
        return null;
    }
}
