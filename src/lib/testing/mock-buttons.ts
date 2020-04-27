import { TerraButtonInterface } from '../components/buttons/button/data/terra-button.interface';

export const mockButtonOne: TerraButtonInterface = {
  caption: 'Mock button one',
  clickFunction: (): void => {
    console.log('mock button one clicked');
  }
};

export const mockButtonTwo: TerraButtonInterface = {
  caption: 'Mock button two',
  isFlagged: true,
  isLarge: true,
  tooltipPlacement: 'bottom',
  tooltipText: 'Mock button two tooltip',
  clickFunction: (): void => {
    console.log('mock button two clicked');
  }
};

export const buttonList: Array<TerraButtonInterface> = [mockButtonOne, mockButtonTwo];
