import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraTagInterface } from '../../layouts/tag/data/terra-tag.interface';
import { TerraSuggestionBoxValueInterface } from '../suggestion-box/data/terra-suggestion-box.interface';
import { isNullOrUndefined } from 'util';
import { TerraTagNameInterface } from '../../layouts/tag/data/terra-tag-name.interface';
import { Language } from 'angular-l10n';
import { noop } from 'rxjs';

@Component({
    selector: 'terra-tag-select',
    styleUrls: ['./terra-tag-select.component.scss'],
    templateUrl: './terra-tag-select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TerraTagSelectComponent,
            multi: true
        }
    ]
})
export class TerraTagSelectComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
    @Input()
    public name: string;

    @Input()
    public tags: Array<TerraTagInterface>;

    @Input()
    public isDisabled: boolean = false;

    @Input()
    public isReadOnly: boolean = false;

    @Language()
    public _lang: string;

    public _suggestionValues: Array<TerraSuggestionBoxValueInterface> = [];
    public _selectedTag: TerraTagInterface;
    public _selectedTags: Array<TerraTagInterface> = [];

    private _tagList: Array<TerraTagInterface>;

    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_: Array<TerraTagInterface>) => void = noop;

    public ngOnInit(): void {
        this._generateSuggestionValues(this._tagList);
    }

    public ngOnDestroy(): void {
        // implementation is required by angular-l10n. See https://robisim74.github.io/angular-l10n/spec/getting-the-translation/#messages
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('tags')) {
            let tags: Array<TerraTagInterface> = changes['tags'].currentValue as Array<TerraTagInterface>;
            tags.forEach((tag: TerraTagInterface) => (tag.isClosable = true));
            this._tagList = tags;
            this._generateSuggestionValues(tags);
        }
    }

    public writeValue(selectedTags: Array<TerraTagInterface>): void {
        this._selectedTags = selectedTags;

        this._onTouchedCallback();
        this._onChangeCallback(selectedTags);
    }

    public registerOnChange(fn: (_: Array<TerraTagInterface>) => void): void {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this._onTouchedCallback = fn;
    }

    /**
     * Writes the selected tag into the model of the component.
     * @param selectedTag
     */
    public _addSelectedTag(selectedTag: TerraTagInterface): void {
        if (
            !this.isReadOnly &&
            !isNullOrUndefined(selectedTag) &&
            !this._selectedTags.find((tag: TerraTagInterface) => tag === selectedTag)
        ) {
            this.writeValue(this._selectedTags.concat(selectedTag));
        }
    }

    /**
     * Remove the specific tag id and updates the model of the component.
     * @param tagId
     */
    public _closeTag(tagId: number): void {
        this._selectedTags.splice(
            this._selectedTags.findIndex((tag: TerraTagInterface) => tag.id === tagId),
            1
        );

        this.writeValue(this._selectedTags);
    }

    /**
     * Generates the values for the TerraSuggestionsBox from a array of TerraTagInterface.
     * @param tagList
     */
    private _generateSuggestionValues(tagList: Array<TerraTagInterface>): void {
        this._suggestionValues = tagList.map((tag: TerraTagInterface) => {
            return {
                value: tag,
                caption: this._getTranslatedName(tag)
            };
        });
        this._suggestionValues.unshift({
            value: null,
            caption: ''
        });
    }

    /**
     * Returns the name. If the names attribute of the tag is set it returns the name for the current language.
     * @param tag
     */
    private _getTranslatedName(tag: TerraTagInterface): string {
        // Fallback if names or this._lang is not set
        if (isNullOrUndefined(tag.names) || isNullOrUndefined(this._lang)) {
            return tag.name;
        } else {
            const tagName: TerraTagNameInterface = tag.names.find(
                (name: TerraTagNameInterface) => name.language === this._lang
            );

            // Fallback if no name for this._lang is set
            if (isNullOrUndefined(tagName)) {
                return tag.name;
            } else {
                return tagName.name;
            }
        }
    }
}
