import { TerraTagNameInterface } from './terra-tag-name.interface';

/**
 * @author dtrauf
 *
 */
export interface TerraTagInterface
{
    /** The ID of the tag */
    id?:number;
    /** The base name of the tag. Will be mandatory in next major release.*/
    name?:string;
    tagName?:string;

    /** A list with translation of the base name. */
    names?:Array<TerraTagNameInterface>;

    /** The color of the tag. */
    color?:string;

    isTagged?:boolean;
    isTaggable?:boolean;
    isClosable?:boolean;
    customClass?:string;


    /**
     * @deprecated will be removed in next major release. Please use badge instead.
     */
    caption?:string;

    /**
     *  @deprecated will be mandatory in next major release.
     */
    badge?:string;
}
