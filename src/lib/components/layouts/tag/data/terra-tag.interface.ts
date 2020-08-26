import { TerraTagNameInterface } from './terra-tag-name.interface';

/**
 * @author dtrauf
 *
 */
export interface TerraTagInterface {
    /** The ID of the tag */
    id?: number;
    /** The base name of the tag.*/
    name: string;
    tagName?: string;

    /** A list with translation of the base name. */
    names?: Array<TerraTagNameInterface>;

    /** The color of the tag. */
    color?: string;

    isTagged?: boolean;
    isTaggable?: boolean;
    isClosable?: boolean;
    customClass?: string;
}
