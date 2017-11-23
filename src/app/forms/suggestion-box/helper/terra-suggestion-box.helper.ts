import { isNullOrUndefined } from 'util';
import { TerraSuggestionBoxValueInterface } from '../data/terra-suggestion-box.interface';

export class TerraSuggestionBoxHelper
{

    public static getSuggestionBoxEntryForCaption(caption:string,
                                                  terraSuggestionBoxValues:Array<TerraSuggestionBoxValueInterface>):TerraSuggestionBoxValueInterface
    {
        if(isNullOrUndefined(terraSuggestionBoxValues))
        {
            return null;
        }
        for(let value of terraSuggestionBoxValues)
        {
            if(value.value === caption)
            {
                return value;
            }
        }
        return null;
    }
}