/* tslint:disable:no-unused-variable */

import { TerraColorPickerComponent } from './terra-color-picker.component';

describe('Component: TerraNoteComponent', () =>
{
    let component:any = new TerraColorPickerComponent();
    let expectedColor:string = '';

    beforeEach(() =>
    {
        expectedColor = '#ffffff';
    });

    afterEach(() =>
    {
        expectedColor = '';
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should constructor\'s regex be defined', () =>
    {
        expect(component.regex).toBeDefined();
    });

    it('should color regex be defined', () =>
    {
        expect(component.color).toBeDefined();
        expect(component.color).toEqual(expectedColor);
    });
});
