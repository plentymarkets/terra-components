export interface AlternateTextInterface
{
    key:string; // This should be the ID of the ColumnDef for example
    value:
        {
            altText:string; // The text that can be displayed alternatively to the ID
            selected:boolean;
        };
}
