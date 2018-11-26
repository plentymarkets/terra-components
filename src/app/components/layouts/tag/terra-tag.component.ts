import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Color } from '../../forms/input/color-picker/color.helper';
import { TerraTagNameInterface } from './data/terra-tag-name.interface';

@Component({
    selector: 'terra-tag',
    styles:   [require('./terra-tag.component.scss')],
    template: require('./terra-tag.component.html')
})
export class TerraTagComponent implements OnChanges
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
    private translatedName:string;

    public ngOnChanges(changes?:SimpleChanges):void
    {
        if(changes.hasOwnProperty('name'))
        {
            this.name = changes['name'].currentValue;
            this.translateName();
        }
        else if(changes.hasOwnProperty('names'))
        {
            this.names = changes['names'].currentValue;
            this.translateName();
        }
    }

    protected close():void
    {
        this.onCloseTag.emit(this.tagId);
    }

    protected get displayedName():string
    {
        if(isNullOrUndefined(this.translatedName))
        {
            this.translateName();
        }

        return this.inputBadge ? this.inputBadge : this.translatedName;
    }

    private translateName():void
    {
        // Fallback if names not set
        if(isNullOrUndefined(this.names))
        {
            this.translatedName = this.name;
        }
        else
        {
            const tagName:TerraTagNameInterface = this.names.find((name:TerraTagNameInterface) => name.language === this.lang);

            // Fallback if no name for this.lang is set
            if(isNullOrUndefined(tagName))
            {
                this.translatedName = this.name;
            }
            else
            {
                this.translatedName = tagName.name;
            }
        }
    }

    /**
     * Get the background color.
     * @returns {string}
     * @see inputColor
     */
    protected get bgColor():string
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
    protected get color():string
    {
        if(!isNullOrUndefined(this.inputColor))
        {
            return (new Color(this.inputColor)).isDark() ? '#ffffff' : '#000000';
        }
        return null;
    }
}
