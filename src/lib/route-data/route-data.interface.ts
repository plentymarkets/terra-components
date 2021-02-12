import { LabelFunction } from './route-data-types';

/** Specifies the extra data that is related to a single route. */
export interface RouteDataInterface {
    label: string | LabelFunction;
}
