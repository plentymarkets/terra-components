import { Observable } from 'rxjs/Observable';

export interface TerraNodeInterface<D>
{
    /**
     * @description The identifier of node. It must be UNIQUE.
     */
    id:string|number;

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
     * @description Check if hidden or not. Optional.
     */
    isHidden?:boolean;

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
    onClick?:()=>void;

    /**
     * @description Lazy loading function to get data from server. Optional.
     */
    onLazyLoad?:()=>Observable<any>;
}