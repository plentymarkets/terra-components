import * as Interact from '@interactjs/types/types';

export interface DropEvent
{
    dragEvent:Interact.InteractEvent;
    draggable:Interact.Interactable;
    dropzone:Interact.Interactable;
    interaction:any;
    relatedTarget:HTMLElement;
    target:HTMLElement;
    timeStamp:number;
    dropData:any;
    type:'drop';
}
