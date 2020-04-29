export interface DraggableOptions {
    manualStart?: boolean;
    max?: number;
    maxPerElement?: number;
    axis?: 'x' | 'y' | 'xy';
    autoScroll?: boolean;
    allowFrom?: string;
    ignoreFrom?: string;
}
