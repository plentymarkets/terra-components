import { TerraFormComponentBaseInterface } from '../terra-form-component-base.interface';
import { TerraSuggestionBoxValueInterface } from '../../../suggestion-box/data/terra-suggestion-box.interface';

export interface SelectInterface extends TerraFormComponentBaseInterface {
    // NOTE: We'll continue to use `TerraSuggestionBoxValueInterface` internally here after it has been removed from the public API
    listBoxValues: Array<TerraSuggestionBoxValueInterface>;
}
