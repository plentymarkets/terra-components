import {
    Observable,
    Subscriber
} from 'rxjs';
import { TerraNavigatorNodeInterface } from '../data/terra-navigator-node.interface';

/**
 * @author mscharf
 */
export class TerraNavigatorConfig<D>
{
    public observableNodeListChanged:Observable<TerraNavigatorNodeInterface<D>>;
    public observableAddNewNodes:Observable<any>;
    
    private _subscriberNodeListChanged:Subscriber<TerraNavigatorNodeInterface<D>>;
    private _subscriberAddNewNodes:Subscriber<any>;
    
    constructor()
    {
        this.observableNodeListChanged = new Observable<TerraNavigatorNodeInterface<D>>(
            (subscriber:Subscriber<TerraNavigatorNodeInterface<D>>) =>
            {
                this._subscriberNodeListChanged = subscriber;
            });
        
        this.observableAddNewNodes = new Observable<any>(
            (subscriber:Subscriber<any>) =>
            {
                this._subscriberAddNewNodes = subscriber;
            });
    }
    
    public addNodeAt(newNode:TerraNavigatorNodeInterface<D>)
    {
        if(this._subscriberNodeListChanged)
        {
            this._subscriberNodeListChanged.next(newNode);
        }
    }
    
    public addNodes(newNodes:any)
    {
        if(this._subscriberAddNewNodes)
        {
            this._subscriberAddNewNodes.next(newNodes);
        }
    }
}
