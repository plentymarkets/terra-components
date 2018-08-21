/**
 * @author mfrank
 */
import {
    Component,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TerraTagInterface } from '../../layouts/tag/data/terra-tag.interface';
import { TerraSuggestionBoxValueInterface } from '../suggestion-box/data/terra-suggestion-box.interface';
import { isNullOrUndefined } from 'util';
import { TerraBaseData } from '../../data/terra-base.data';
import { TerraTagNameInterface } from '../../layouts/tag/data/terra-tag-name.interface';
import { Language } from 'angular-l10n';

@Component({
    selector: 'terra-tag-select',
    styles:   [require('./terra-tag-select.component.scss')],
    template: require('./terra-tag-select.component.html'),
    providers: [
        {
            provide:     NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TerraTagSelectComponent),
            multi:       true
        }
    ]
})
export class TerraTagSelectComponent implements ControlValueAccessor, OnInit, OnChanges
{
    @Language()
    public lang:string;

    @Input()
    public name:string;

    @Input()
    public tags:Array<TerraTagInterface>;

    @Input()
    public isDisabled:boolean = false;

    @Input()
    public isReadOnly:boolean = false;

    protected suggestionValues:Array<TerraSuggestionBoxValueInterface> = [];
    protected selectedTag:TerraTagInterface;
    protected selectedTags:Array<TerraTagInterface> = [];

    private tagList:Array<TerraTagInterface>;

    public ngOnInit():void
    {
        this.generateSuggestionValues(this.tagList);
    }

    public ngOnChanges(changes:SimpleChanges):void
    {
        if(changes.hasOwnProperty('tags'))
        {
            let tags:Array<TerraTagInterface> = (changes['tags'].currentValue as Array<TerraTagInterface>);
            tags.forEach((tag:TerraTagInterface) => tag.isClosable = true);
            this.tagList = tags;
            this.generateSuggestionValues(tags);
        }
    }

    public writeValue(selectedTags:any):void
    {
        this.selectedTags = selectedTags;

        this.onTouchedCallback();
        this.onChangeCallback(selectedTags);
    }

    public registerOnChange(fn:any):void
    {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn:any):void
    {
        this.onTouchedCallback = fn;
    }

    /**
     * Writes the selected tag into the model of the component.
     * @param {TerraTagInterface} selectedTag
     */
    protected addSelectedTag(selectedTag:TerraTagInterface):void
    {
        if(!this.isReadOnly && !isNullOrUndefined(selectedTag) && !this.selectedTags.find((tag:TerraTagInterface) => tag === selectedTag))
        {
            this.writeValue(this.selectedTags.concat(selectedTag));
        }
    }

    /**
     * Remove the specific tag id and updates the model of the component.
     * @param {number} tagId
     */
    protected closeTag(tagId:number):void
    {
        this.selectedTags.splice(
            this.selectedTags.findIndex((tag:TerraTagInterface) => tag.id === tagId),
            1
        );

        this.writeValue(this.selectedTags);
    }

    /**
     * Generates the values for the TerraSuggestionsBox from a array of TerraTagInterface.
     * @param {Array<TerraTagInterface>} tagList
     */
    private generateSuggestionValues(tagList:Array<TerraTagInterface>):void
    {
        this.suggestionValues = tagList.map((tag:TerraTagInterface) =>
        {
            return {
                value: tag,
                caption: this.getTranslatedName(tag),
            };
        });
        this.suggestionValues.unshift({value: null, caption: ''});
    }

    /**
     * Returns the name. If the names attribute of the tag is set it returns the name for the current language.
     * @param {TerraTagInterface} tag
     * @return {string}
     */
    private getTranslatedName(tag:TerraTagInterface):string
    {
        // Fallback if names or this.lang is not set
        if(isNullOrUndefined(tag.names) || isNullOrUndefined(this.lang))
        {
            return tag.name;
        }
        else
        {
            const tagName:TerraTagNameInterface = tag.names.find((name:TerraTagNameInterface) => name.language === this.lang);

            // Fallback if no name for this.lang is set
            if(isNullOrUndefined(tagName))
            {
                return tag.name;
            }
            else
            {
                return tagName.name;
            }
        }
    }

    private onTouchedCallback:() => void = ():void => undefined;

    private onChangeCallback:(_:any) => void = (selectedTagsList:Array<TerraTagInterface>):void => undefined;
}
