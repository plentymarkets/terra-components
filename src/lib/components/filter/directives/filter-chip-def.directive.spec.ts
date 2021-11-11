import { Component, DebugElement } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterChipDefDirective } from './filter-chip-def.directive';
import { FilterChipLabelDirective } from './filter-chip-label.directive';
import { FilterContainerDirective } from './filter-container.directive';
import { DisplayWhenFn } from '../models/display-when-function.interface';

// tslint:disable:component-max-inline-declarations
// tslint:disable:max-function-line-count
@Component({
    template: `
        <form>
            <div terraFilterChipDef [terraFilterChipDisplayWhen]="displayAlways">
                <label terraFilterChipLabel>Template driven</label>
                <input ngModel name="template" />
            </div>
        </form>
        <form [formGroup]="form">
            <div terraFilterChipDef terraFilterChipHideValue>
                <label terraFilterChipLabel>Reactive</label>
                <input formControlName="reactive" />
            </div>
        </form>
    `
})
class HostComponent {
    public form: FormGroup = new FormGroup({
        reactive: new FormControl()
    });

    public displayAlways: DisplayWhenFn = () => true;
}

describe('FilterChipDefDirective', () => {
    let fixture: ComponentFixture<HostComponent>;
    let component: HostComponent;
    let directives: Array<DebugElement>;
    const container: FilterContainerDirective = {
        // tslint:disable
        addChipDef: (chipDef: FilterChipDefDirective) => {},
        removeChipDef: (chipDef: FilterChipDefDirective) => {}
        // tslint:enable
    } as FilterContainerDirective;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [HostComponent, FilterChipDefDirective, FilterChipLabelDirective],
            providers: [{ provide: FilterContainerDirective, useValue: container }]
        }).createComponent(HostComponent);
        component = fixture.componentInstance;

        directives = fixture.debugElement.queryAll(By.directive(FilterChipDefDirective));

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(directives).toBeTruthy();
        expect(directives.length).toBe(2);
    });

    it('should register itself in the FilterContainerDirective when initialized', () => {
        spyOn(container, 'addChipDef');

        const chipDef: FilterChipDefDirective = directives[0].injector.get(FilterChipDefDirective);
        chipDef.ngOnInit();

        expect(container.addChipDef).toHaveBeenCalledWith(chipDef);
    });

    it('should unregister itself from the FilterContainerDirective when destroyed', () => {
        spyOn(container, 'removeChipDef');

        const chipDef: FilterChipDefDirective = directives[0].injector.get(FilterChipDefDirective);
        chipDef.ngOnDestroy();

        expect(container.removeChipDef).toHaveBeenCalledWith(chipDef);
    });

    describe('in a template driven form:', () => {
        let directive: FilterChipDefDirective;

        beforeEach(() => {
            directive = directives[0].injector.get(FilterChipDefDirective);
        });

        it('should retrieve control of the filter', () => {
            expect(directive.control.name).toBe('template');
        });

        it('should retrieve the label of the filter', () => {
            expect(directive.label).toBe('Template driven');
        });

        it('should show the label by default', () => {
            expect(directive.hideValue).toBeFalsy();
        });

        it('should store a given `DisplayWhenFn` for later evaluation when the chip should be shown', () => {
            expect(directive.displayWhen).toBe(component.displayAlways);
        });
    });

    describe('in a reactive form', () => {
        let directive: FilterChipDefDirective;

        beforeEach(() => {
            directive = directives[1].injector.get(FilterChipDefDirective);
        });

        it('should retrieve the control of the filter', () => {
            expect(directive.control.name).toBe('reactive');
        });

        it('should retrieve the label of the filter', () => {
            expect(directive.label).toBe('Reactive');
        });

        it('should hide value if desired', () => {
            expect(directive.hideValue).toBe(true);
        });
    });
});
