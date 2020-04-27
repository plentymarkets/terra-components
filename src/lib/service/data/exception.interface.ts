/**
 * @author pweyrich
 * @deprecated since v3.0.0. Use angular's [HttpClient](https://angular.io/guide/http) instead.
 */
export interface Exception {
  message: string;
  code?: number;
  exception: string;
}
