/* tslint:disable:no-unused-variable */

import { TerraIndicatorComponent } from './terra-indicator.component';

describe('Component: TerraIndicatorComponent', () =>
{
    let component:any = new TerraIndicatorComponent();

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should inputType be defined', () =>
    {
        expect(component.inputType).toBeDefined();
        expect(component.inputType).toEqual('default');
    });
});
