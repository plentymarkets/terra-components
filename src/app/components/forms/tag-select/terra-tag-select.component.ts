/**
 * @author mfrank
 */
import {
    Component,
    forwardRef,
    Input
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TerraTagInterface } from '../../layouts/tag/data/terra-tag.interface';
import { TerraSuggestionBoxValueInterface } from '../suggestion-box/data/terra-suggestion-box.interface';
import { isNullOrUndefined } from 'util';
import { TerraBaseData } from '../../data/terra-base.data';

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
export class TerraTagSelectComponent implements ControlValueAccessor
{
    @Input()
    public set tags(tagList:Array<any>)
    {
        if(isNullOrUndefined(this.tagList))
        {
            this.tagList = tagList;
            this.generateSuggestionValues(tagList);
        }
    }

    protected suggestionValues:Array<TerraSuggestionBoxValueInterface> = [];
    protected selectedTagId:number;
    protected selectedTagsList:Array<TerraTagInterface> = [];

    private tagList:Array<any>;

    public writeValue(selectedTagsList:any):void
    {
        // this.selectedTagsList valueList;

        this.selectedTagsList = selectedTagsList;

        this.onTouchedCallback();
        this.onChangeCallback(this.selectedTagsList);
    }

    public registerOnChange(fn:any):void
    {
        this.registerOnChange = fn;
    }

    public registerOnTouched(fn:any):void
    {
        this.registerOnTouched = fn;
    }

    protected tagSelected(value:any):void
    {
        console.log(value);

        const tagToSelect:any = this.tagList.find((tag:any) => tag.id === value);

        this.suggestionValues = this.suggestionValues.filter((suggestionValue:any) => suggestionValue.value !== value);

        this.writeValue(this.selectedTagsList.concat({
            badge: tagToSelect.name,
            color: tagToSelect.color,
            isClosable: true
        }));
    }

    private generateSuggestionValues(tagList:Array<any>):void
    {
        this.suggestionValues = tagList.map((tag:any) =>
        {
            /*
            icon?:string;
            imgsrc?:string;
            active?:boolean;
             */
            return {
                value: tag.id,
                caption: tag.name,
            };
        });
    }

    private onTouchedCallback:() => void = ():void => undefined;

    private onChangeCallback:(_:any) => void = (_:Array<TerraTagInterface>):void => undefined;
}
