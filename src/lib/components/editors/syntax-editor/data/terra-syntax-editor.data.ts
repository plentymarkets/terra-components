export interface TerraSyntaxEditorData {
    row: number;
    text: string; // Or the Json reply from the parser
    type: string; // error, warning, info
    column: number;
}
