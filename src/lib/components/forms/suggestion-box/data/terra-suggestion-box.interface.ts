import { TerraBaseData } from '../../../data/terra-base.data';

/** @deprecated since v5. */
export interface TerraSuggestionBoxValueInterface {
    /** The value of the suggestion value */
    value: number | string | TerraBaseData;
    // i18n from locale_de and locale_en
    caption: string;
    /** Optional icon for suggestion value */
    icon?: string;
    /** Optional image for suggestion value (only the src-attribute) */
    imgsrc?: string;
    active?: boolean;
}
