/**
 * TagNameInterface
 * Represents a tag name in a specific language.
 *
 * @author Emmanouil Stafilarakis <emmanouil.stafilarakis@plentymarkets.com>
 */
export interface TerraTagNameInterface {
    /** The ID of the tag name. */
    id?: number;
    /** The ID of the tag the name belongs to. */
    tagId?: number;
    /** The language of the name. */
    language: string;
    /** The name of the tag. */
    name: string;
}
