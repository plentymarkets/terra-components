import * as interact_ from 'interactjs';
const interact = interact_;

export interface DropEvent
{
    dragEvent:interact.InteractEvent;
    draggable:interact.Interactable;
    dropzone:interact.Interactable;
    interaction:any;
    relatedTarget:HTMLElement;
    target:HTMLElement;
    timeStamp:number;
    dropData:any;
    type:'drop';
}
