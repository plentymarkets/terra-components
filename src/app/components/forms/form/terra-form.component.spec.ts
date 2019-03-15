import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraFormComponent } from './terra-form.component';
import { TerraFormContainerComponent } from './form-container/terra-form-container.component';

fdescribe(`TerraCardComponent:`, () =>
{
    let component:TerraFormComponent;
    let fixture:ComponentFixture<TerraFormComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [TerraFormComponent,
                           TerraFormContainerComponent],
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should initialize its inputs', () =>
    {
        // TODO
    });
});
