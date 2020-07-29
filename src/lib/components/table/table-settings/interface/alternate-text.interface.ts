export interface AlternateTextInterface
{
    key:string; // This should be the ID of the ColumnDef for example
    altText:string; // The text that can be displayed alternatively to the ID
    selected:boolean; // Marks if a row should be displayed in the table or not
}
