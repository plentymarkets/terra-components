import { TerraBaseParameterInterface } from '../../data/terra-base-parameter.interface';

export interface TerraPagerParameterInterface extends TerraBaseParameterInterface {
  page?: number;
  itemsPerPage?: number;
}
