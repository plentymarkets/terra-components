import { isNullOrUndefined } from 'util';
import { cloneDeep, removeBlankAttributesFromObject } from './object';

describe('Util Object:', () => {
    it('Method: cloneDeep() should create a deep copy of an object', () => {
        const obj = {
            x: 23
        };
        const deepCopy = cloneDeep(obj);
        expect(deepCopy).toEqual({ x: 23 });
        expect(obj.x).toBe(23);
        obj.x = 10;
        expect(deepCopy).toEqual({ x: 23 });
        expect(obj.x).toBe(10);
    });

    it('Method: removeBlankAttributesFromObject() should remove undefined or null attributes', () => {
        const expectedObj: any = {
            value: 23
        };
        const obj: any = {
            value: 23,
            nullValue: null,
            undefinedValue: undefined
        };
        removeBlankAttributesFromObject(obj);
        expect(obj).toEqual(expectedObj);
    });
});
