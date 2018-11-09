/* tslint:disable:no-unused-variable */

import { TerraColorPickerComponent } from './terra-color-picker.component';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LocalizationModule } from 'angular-l10n';
import { TooltipModule } from 'ngx-bootstrap';
import { l10nConfig } from '../../../../translation/l10n.config';
import { TerraLabelTooltipDirective } from '../../../../helpers/terra-label-tooltip.directive';
import { Color } from './color.helper';

fdescribe('Component: TerraColorPickerComponent', () =>
{
    let component:any = new TerraColorPickerComponent();
    let expectedColor:string = '';
    let darkColor:string = '#111111';
    let fixture:ComponentFixture<TerraColorPickerComponent>;
    let color:Color = new Color(darkColor);

    beforeEach(() =>
        {
            TestBed.configureTestingModule(
                {
                    declarations: [TerraColorPickerComponent,
                                   TerraLabelTooltipDirective],
                    imports: [
                        TooltipModule.forRoot(),
                        FormsModule,
                        LocalizationModule.forRoot(l10nConfig)
                    ]
                }
            ).compileComponents();
        }
    );

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraColorPickerComponent);
        component = fixture.componentInstance;

        expectedColor = '#ffffff';

        fixture.detectChanges();
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

    it('should color regex be defined and the value of input be #ffffff', () =>
    {
        expect(component.color).toBeDefined();
        expect(component.color).toEqual(expectedColor);
    });

    it('should getter of color return the value of the input or #ffffff', () =>
    {
        expect(component.color).toEqual(expectedColor);
        expectedColor = '#123456';
        component.color = expectedColor;
        expect(component.color).toEqual(expectedColor);
    });

    it('should isDark return true if color is dark', () =>
    {
        component.color = '#123456';
        expect(component.isDark()).toBe(true);
        component.color = '#000000';
        expect(component.isDark()).toBe(true);

        component.color = '#ABCDEF';
        expect(component.isDark()).toBe(false);
        component.color = '#FFFFFF';
        expect(component.isDark()).toBe(false);
    });
});
