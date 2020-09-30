import { isNullOrUndefined } from 'util';
import { BehaviorSubject } from 'rxjs';
import { TerraKeyValueInterface } from '../../../../models';

export class TerraFormScope {
    public onDataChanged: BehaviorSubject<unknown> = new BehaviorSubject<unknown>({});

    public get data(): unknown {
        return this._data;
    }

    public set data(value: unknown) {
        this._data = value;
        this.onDataChanged.next(value);
    }

    constructor(private _data: unknown = {}, private parent?: TerraFormScope) {}

    public evaluate<T>(expression: string): T {
        try {
            if (isNullOrUndefined(this._data)) {
                return new Function('return ' + expression).apply(null);
            } else {
                let data: TerraKeyValueInterface<unknown> = this._getEvaluationData();
                let keys: Array<string> = Object.keys(data);
                let values: Array<unknown> = keys.map((key: string) => data[key] || null);

                return new Function(...keys, 'return ' + expression).apply(null, values);
            }
        } catch (e) {
            return null;
        }
    }

    public createChildScope(data: any = {}): TerraFormScope {
        let scope: TerraFormScope = new TerraFormScope(data, this);
        this.onDataChanged.subscribe(() => {
            scope.onDataChanged.next(scope.data);
        });
        return scope;
    }

    protected _getEvaluationData(): TerraKeyValueInterface<unknown> {
        let result: TerraKeyValueInterface<unknown> = {};

        if (!isNullOrUndefined(this.parent)) {
            result = this.parent._getEvaluationData();
        }

        Object.keys(this._data).forEach((key: string) => {
            result[key] = this._data[key] || null;
        });

        return result;
    }
}
