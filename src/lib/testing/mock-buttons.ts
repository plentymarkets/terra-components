import { TerraButtonInterface } from '../components/buttons/button/data/terra-button.interface';
import { TerraPlacementEnum } from '../helpers';

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

export const noResultsNoticeMockButtons: Array<TerraButtonInterface> = [
    {
        icon: 'icon-add',
        caption: 'Mock button one',
        tooltipText: 'Mock button one tooltip',
        clickFunction: (): void => {
            console.log('mock button one clicked');
        },
        tooltipPlacement: TerraPlacementEnum.RIGHT,
        isActive: true,
        isDisabled: false,
        isHidden: false,
        isDivider: false,
        isSmall: true,
        isHighlighted: false
    },
    {
        caption: 'Mock button two',
        tooltipPlacement: TerraPlacementEnum.LEFT,
        tooltipText: 'Mock button two tooltip',
        clickFunction: (): void => {
            console.log('mock button two clicked');
        }
    }
];
