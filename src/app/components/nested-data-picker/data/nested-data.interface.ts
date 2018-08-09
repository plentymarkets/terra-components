import { Observable } from 'rxjs/Observable';

/**
 * @author chirila-ioan-daniel
 */
export interface NestedDataInterface<T>
{
    label?:string;
    key?:string;
    isSelected?:boolean;
    children?:Array<NestedDataInterface<T>>;
    onLazyLoad?:() => Observable<any>;
    selectable?:boolean;
    data?:T;
}
