import { HttpParameterCodec, HttpUrlEncodingCodec } from '@angular/common/http';

/** @description A custom encoder for http params. */
class HttpParamEncoder extends HttpUrlEncodingCodec {
  public encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  public encodeValue(value: string): string {
    return encodeURIComponent(value);
  }
}

/** @description Instance of HttpParamEncoder, a custom encoder for http params. */
export const httpParamEncoder: HttpParameterCodec = new HttpParamEncoder();
