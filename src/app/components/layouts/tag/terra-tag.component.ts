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

    /**
     * The background color for the tag.
     */
    @Input()
    public inputColor:string;

    @Input()
    public tagId:number;

    @Input()
    public isClosable:boolean = false;

    @Input()
    public names:Array<TerraTagNameInterface> = [];

    @Output()
    public onCloseTag:EventEmitter<number> = new EventEmitter<number>();

    protected tagName:string;

    private lang:string = localStorage.getItem('plentymarkets_lang_');

    public ngOnChanges(changes?:SimpleChanges):void
    {
        if(changes.hasOwnProperty('name') ||
           changes.hasOwnProperty('names') ||
           changes.hasOwnProperty('inputBadge'))
        {
            this.tagName = this.inputBadge ? this.inputBadge : this.translatedName;
        }
    }

    protected close():void
    {
        this.onCloseTag.emit(this.tagId);
    }

    private get translatedName():string
    {
        if(isNullOrUndefined(this.names))
        {
            return this.name;
        }

        const tagName:TerraTagNameInterface = this.names.find((name:TerraTagNameInterface) => name.language === this.lang);
        if(isNullOrUndefined(tagName))
        {
            return this.name;
        }
        else
        {
            return tagName.name;
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
