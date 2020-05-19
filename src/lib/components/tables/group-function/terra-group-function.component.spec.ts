import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslationModule } from 'angular-l10n';
import { TerraGroupFunctionComponent } from './terra-group-function.component';
import { TerraButtonComponentStub } from '../../../testing/terra-button.component.stub';

describe('Component: TerraGroupFunctionComponent', () =>
{
    let component:TerraGroupFunctionComponent;
    let fixture:ComponentFixture<TerraGroupFunctionComponent>;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraGroupFunctionComponent,
                TerraButtonComponentStub
            ],
            imports:      [
                NoopAnimationsModule,
                TranslationModule.forRoot({})
            ],
        });
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraGroupFunctionComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should initialize the component properties', () =>
    {
        expect(component.show).toEqual(false);
        expect(component.disableExecution).toEqual(true);
        expect(component.executeGroupFunction).toBeTruthy();
    });

    it('should emit on #executeGroupFunction when the button is clicked', () =>
    {
        const button:TerraButtonComponentStub = fixture.debugElement.query(By.directive(TerraButtonComponentStub)).componentInstance;
        spyOn(component.executeGroupFunction, 'emit');
        button.outputClicked.emit();
        expect(component.executeGroupFunction.emit).toHaveBeenCalled();
    });
});
