/**
 * @author dtrauf
 *
 */
export interface TerraTagInterface
{
    isTagged?:boolean
    isTaggable?:boolean;
    /**
     * @deprecated will be removed in next major release. Please use badge instead.
     */
    caption?:string;
    /**
     *  will be mandatory in next major release.
     */
    badge?:string;
    customClass?:string;
}
