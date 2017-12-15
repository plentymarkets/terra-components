/**
 * @author dtrauf
 *
 */
export interface TerraTagInterface
{
    isTagged?:boolean
    isTaggable?:boolean;
    /**
     *  will be mandatory in next major release.
     */
    badge?:string;
    customClass?:string;
}
