export interface InteractableOptions {
    allowFrom?: string;
    ignoreFrom?: string;
    max?: number;
    maxPerElement?: number;
    manualStart?: boolean;
}

export interface InteractDraggableOptions extends InteractableOptions {}
