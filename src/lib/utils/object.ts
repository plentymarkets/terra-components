import * as cloneDeep_ from 'lodash.clonedeep';
import { isNullOrUndefined } from 'util';

const _cloneDeep: (val: Object) => Object = cloneDeep_;
export function cloneDeep(obj: Object): Object {
    return _cloneDeep(obj);
}

export function removeBlankAttributesFromObject(obj: Object): void {
    Object.keys(obj).forEach((key: string) => {
        if (isNullOrUndefined(obj[key])) {
            delete obj[key];
        }
    });
}
