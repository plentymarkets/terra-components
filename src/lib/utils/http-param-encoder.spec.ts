import { httpParamEncoder } from './http-param-encoder';

describe('HttpParamEncoder:', () => {
    it('should use `encodeURIComponent` to encode the key', () => {
        let key: string = '$implicit';
        expect(httpParamEncoder.encodeKey(key)).toBe(encodeURIComponent(key));
        key = '?``?)=(//&(%§!';
        expect(httpParamEncoder.encodeKey(key)).toBe(encodeURIComponent(key));
    });

    it('should use `encodeURIComponent` to encode the value', () => {
        let value: string = '&%$/&&))?(==)(&';
        expect(httpParamEncoder.encodeValue(value)).toBe(encodeURIComponent(value));
        value = '!"§$%&/()=?`´°^-_;.#+*<>';
        expect(httpParamEncoder.encodeValue(value)).toBe(encodeURIComponent(value));
    });
});
