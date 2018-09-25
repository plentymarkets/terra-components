/* tslint:disable:no-unused-variable */

import { TerraInfoBoxComponent } from './terra-info-box.component';
import { TerraTagInterface } from '../../../../';

describe('Component: TerraInfoBoxComponent', () =>
{
    let component:TerraInfoBoxComponent = new TerraInfoBoxComponent();
    let tagList:Array<TerraTagInterface> = [];

    tagList.push(
        {
            name: 'test1'
        },
        {
            name: 'test2'
        }
    );

    beforeEach(() =>
        {
            component.inputTagList = tagList;
        }
    );

    afterEach(() =>
        {
            component.inputTagList = [];
        }
    );

    beforeEach(() =>
        {
            component.inputId = 5;
        }
    );

    afterEach(() =>
        {
            component.inputId = null;
        }
    );

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should getter \'hasFooter\' return true', () =>
        {
            expect(component.hasFooter).toBe(true);
            expect(component.inputId).toBe(5);
        }
    );
});
