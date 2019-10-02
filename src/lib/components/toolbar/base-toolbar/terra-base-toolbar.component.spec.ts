import { TerraBaseToolbarComponent } from './terra-base-toolbar.component';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { CommonModule } from '@angular/common';

describe ('Component: TerraBaseToolbarComponent', () =>
{
    let component:TerraBaseToolbarComponent;
    let fixture:ComponentFixture<TerraBaseToolbarComponent>;

    beforeEach(() =>
    {
        TestBed.configureTestingModule(
            {
                declarations: [TerraBaseToolbarComponent,
                ],
                imports:      [
                    CommonModule
                ]
            }
        ).compileComponents();
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraBaseToolbarComponent);
        component = fixture.componentInstance;
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should be sticky', () =>
    {
        fixture.detectChanges();
        expect(fixture.nativeElement).not.toHaveClass('terra-sticky-toolbar');

        component.isSticky = true;
        fixture.detectChanges();
        expect(fixture.nativeElement).toHaveClass('terra-sticky-toolbar');
    });
});
