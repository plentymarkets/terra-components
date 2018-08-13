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
    public tags:Array<TerraTagInterface>;

    @Input()
    public isDisabled:boolean = false;

    @Input()
    public isReadOnly:boolean = false;

    protected suggestionValues:Array<TerraSuggestionBoxValueInterface> = [];
    protected selectedTagId:number;
    protected selectedTagsList:Array<TerraTagInterface> = [];

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

    public writeValue(selectedTagsList:any):void
    {
        this.selectedTagsList = selectedTagsList;

        this.onTouchedCallback();
        this.onChangeCallback(selectedTagsList);
    }

    public registerOnChange(fn:any):void
    {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn:any):void
    {
        this.onTouchedCallback = fn;
    }

    protected tagSelected(value:TerraTagInterface):void
    {
        if(!this.selectedTagsList.find((tag:TerraTagInterface) => tag === value))
        {
            this.writeValue(this.selectedTagsList.concat(value));
        }
    }

    protected closeTag(tagId:any):void
    {
        this.selectedTagsList.splice(
            this.selectedTagsList.findIndex((tag:any) => tag.id === tagId),
            1
        );

        this.writeValue(this.selectedTagsList);
    }

    private generateSuggestionValues(tagList:Array<TerraTagInterface>):void
    {
        this.suggestionValues = tagList.map((tag:TerraTagInterface) =>
        {
            return {
                value: tag,
                caption: this.getTranslatedName(tag),
            };
        });
    }

    private getTranslatedName(tag:TerraTagInterface):string
    {
        if(isNullOrUndefined(tag.names) || isNullOrUndefined(this.lang))
        {
            return tag.name;
        }
        else
        {
            return tag.names.find((name:TerraTagNameInterface) => name.language === this.lang).name;
        }
    }

    private onTouchedCallback:() => void = ():void => undefined;

    private onChangeCallback:(_:any) => void = (selectedTagsList:Array<TerraTagInterface>):void => undefined;
}
