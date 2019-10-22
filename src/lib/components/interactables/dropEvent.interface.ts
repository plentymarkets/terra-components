import {
    Interactable,
    InteractEvent
} from 'interactjs';

export interface DropEvent
{
    dragEvent:InteractEvent;
    draggable:Interactable;
    dropzone:Interactable;
    interaction:any;
    relatedTarget:HTMLElement;
    target:HTMLElement;
    timeStamp:number;
    dropData:any;
    type:'drop';
}
