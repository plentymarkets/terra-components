import { isNullOrUndefined } from 'util';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class TerraDynamicFormScope
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

    constructor(private _data:any = {})
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
                let keys:Array<string> = Object.keys(this._data);
                let values:Array<any> = keys.map((key:string) => this._data[key] || null);
                return (new Function(...keys, 'return ' + expression)).apply(null, values);
            }
        }
        catch(e)
        {
            return null;
        }
    }
}
