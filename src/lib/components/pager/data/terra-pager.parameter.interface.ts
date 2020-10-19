import { TerraBaseParameterInterface } from '../../data/terra-base-parameter.interface';

/** @deprecated since v5.0. Please use mat-paginator instead */
export interface TerraPagerParameterInterface extends TerraBaseParameterInterface {
    page?: number;
    itemsPerPage?: number;
}
