import { isNullOrUndefined } from 'util';
import { TerraSuggestionBoxValueInterface } from '../data/terra-suggestion-box.interface';

export class TerraSuggestionBoxHelper
{

    public static getSuggestionBoxEntryForCaption(caption:string,
                                                  terraSuggestionBoxValues:Array<TerraSuggestionBoxValueInterface>,
                                                  fallbackValue:TerraSuggestionBoxValueInterface):TerraSuggestionBoxValueInterface
    {
        if(isNullOrUndefined(terraSuggestionBoxValues))
        {
            return fallbackValue;
        }
        for(let value of terraSuggestionBoxValues)
        {
            if(value.value === caption)
            {
                return value;
            }
        }
        return fallbackValue;
    }

    static generateSuggestionBoxEntryFromCaption(searchString:string):TerraSuggestionBoxValueInterface
    {
        let suggestionBoxEntry:TerraSuggestionBoxValueInterface = {
            value:   searchString,
            caption: searchString
        };
        return suggestionBoxEntry;
    }
}