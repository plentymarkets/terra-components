/**
 * @author dtrauf
 *
 */
export interface TerraTagInterface
{
    isTagged?:boolean;
    isTaggable?:boolean;
    isClosable?:boolean;

    id?:number | string;

    /**
     * @deprecated will be removed in next major release. Please use badge instead.
     */
    caption?:string;

    /**
     *  will be mandatory in next major release.
     */
    badge?:string;
    customClass?:string;

    /**
     * The color of the tag
     */
    color?:string;
}
