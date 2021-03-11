export interface ColumnInterface {
    /**
     * This should be the ID of the ColumnDef for example.
     */
    key: string;
    /**
     * The text that can be displayed alternatively to the ID.
     */
    label: string;
    /**
     * Indication of whether a column is sticky.
     */
    sticky?: boolean;
    /**
     * Indication of whether an end column is sticky.
     */
    stickyEnd?: boolean;
}
