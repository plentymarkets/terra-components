import { Observable } from 'rxjs/Observable';

export interface TerraNodeInterface<D>
{
    /**
     * @description The identifier of node. It must be UNIQUE.
     */
    id:string | number;

    /**
     * @description The identifier of opened subview connected to the node.
     */
    subId?:string | number;

    /**
     * @description The caption.
     */
    name:string;

    /**
     * @description The icon. Optional.
     */
    icon?:string;

    /**
     * @description The children of current node. Optional.
     */
    children?:Array<TerraNodeInterface<D>>;

    /**
     * @description The parent of current node. Optional.
     */
    parent?:TerraNodeInterface<D>;

    /**
     * @description Check if visible or not. Optional.
     */
    isVisible?:boolean;

    /**
     * @description Set a node active. Optional.
     */
    isActive?:boolean;

    /**
     * @description Opens a node to show its children. Optional.
     */
    isOpen?:boolean;

    /**
     * @description The value of a node. Optional.
     */
    value?:D;

    /**
     * @description A click function to do something. Optional.
     */
    onClick?:() => void;

    /**
     * @description A double click function to do something. Optional.
     */
    onDblClick?:() => void;

    /**
     * @description Lazy loading function to get data from server. Optional.
     */
    onLazyLoad?:() => Observable<any>;

    /**
     * @description Check if lazy loading has finished to avoid firing a REST-Call again.
     */
    hasLoaded?:boolean;

    /**
     * @description Check if lazy loading is called.
     */
    isLoading?:boolean;

    /**
     * @description Tags used for search.
     */
    tags?:Array<string>;

    /**
     * @description  set the default visibility to reset search.
     */
    defaultVisibility?:boolean;

    /**
     * @description  set the the node is selectable
     */
    selectable?:boolean;

    /**
     * @description  set a tooltip for the node. default will be name.
     */
    tooltip?:string;

    /**
     * @description  set a tooltip placement for the node. default will be 'right'. Other values: 'left', 'top', 'bottom'
     */
    tooltipPlacement?:string;
}
