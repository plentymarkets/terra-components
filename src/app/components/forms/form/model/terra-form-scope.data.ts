import { isNullOrUndefined } from 'util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TerraKeyValueInterface } from '../../../../../';

export class TerraFormScope
{
    public onDataChanged:BehaviorSubject<any> = new BehaviorSubject<any>({});

    public get data():any
    {
        return this._data;
    }

    public set data(value:any)
    {
        this._data = value;
        this.onDataChanged.next(value);
    }

    constructor(private _data:any = {}, private parent?:TerraFormScope)
    {
    }

    public evaluate<T>(expression:string):T
    {
        try
        {
            if(isNullOrUndefined(this._data))
            {
                return (new Function('return ' + expression)).apply(null);
            }
            else
            {
                let data:TerraKeyValueInterface<any> = this.getEvaluationData();
                let keys:Array<string> = Object.keys(data);
                let values:Array<any> = keys.map((key:string) => data[key] || null);

                return (new Function(...keys, 'return ' + expression)).apply(null, values);
            }
        }
        catch(e)
        {
            return null;
        }
    }

    public createChildScope(data:any = {}):TerraFormScope
    {
        let scope:TerraFormScope = new TerraFormScope( data, this );
        this.onDataChanged.subscribe((value:any) =>
        {
            scope.onDataChanged.next(scope.data);
        });
        return scope;
    }

    protected getEvaluationData():TerraKeyValueInterface<any>
    {
        let result:TerraKeyValueInterface<any> = {};

        if ( !isNullOrUndefined(this.parent) )
        {
            result = this.parent.getEvaluationData();
        }

        Object.keys( this._data ).forEach((key:string) =>
        {
            result[key] = this._data[key] || null;
        });

        return result;
    }
}
