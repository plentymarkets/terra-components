import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterContainerDirective } from './filter-container.directive';
import { FilterChipDefDirective } from './filter-chip-def.directive';
import { FilterMenuDirective } from './filter-menu.directive';
import { MatMenu } from '@angular/material/menu';
import { terraFilterClose } from './filter-close.directive';

// tslint:disable:component-max-inline-declarations
@Component({
    template: `<div terraFilterMenu (click)="onClick()">
        <form terraFilterContainer>
            <input terraFilterChipDef />
            <input terraFilterChipDef />
        </form>
    </div>`
})
class HostComponent {
    public onClick(): void {
        // noop
    }
}

describe('FilterContainerDirective', () => {
    let fixture: ComponentFixture<HostComponent>;
    let component: HostComponent;
    let directive: FilterContainerDirective;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [HostComponent, FilterContainerDirective, FilterChipDefDirective, FilterMenuDirective],
            providers: [{ provide: MatMenu, useValue: {} }] // This is a workaround to provide a mat menu.
            // Using it in the template throws an error.
        }).createComponent(HostComponent);
        component = fixture.componentInstance;

        directive = fixture.debugElement
            .query(By.directive(FilterContainerDirective))
            .injector.get(FilterContainerDirective);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
    });

    it('should apply ".terra-filter-container" class to its host', () => {
        const hostElement: HTMLElement = fixture.debugElement.query(By.directive(FilterContainerDirective))
            .nativeElement;
        expect(hostElement.classList).toContain('terra-filter-container');
    });

    it('should stop propagation of click events on its host', () => {
        spyOn(component, 'onClick');

        const hostElement: HTMLElement = fixture.debugElement.query(By.directive(FilterContainerDirective))
            .nativeElement;
        hostElement.click();

        expect(component.onClick).not.toHaveBeenCalled();
    });

    it('should collect all filter chip definitions in its content', () => {
        let chipDefs: Array<FilterChipDefDirective> = [];
        directive.chips$.subscribe((chips: Array<FilterChipDefDirective>) => (chipDefs = chips));
        expect(chipDefs.length).toBe(2);
    });

    it('should register itself', () => {
        const menu: FilterMenuDirective = fixture.debugElement
            .query(By.directive(FilterMenuDirective))
            .injector.get(FilterMenuDirective);
        expect(menu.container).toBe(directive);
    });

    it('should NOT stop propagation when event has the `terraFilterClose` property.', () => {
        const event: MouseEvent = new MouseEvent('click');
        spyOn(event, 'stopPropagation');
        event[terraFilterClose] = true;
        const element: DebugElement = fixture.debugElement.query(By.directive(FilterContainerDirective));
        element.nativeElement.dispatchEvent(event);

        expect(event.stopPropagation).not.toHaveBeenCalled();
    });
});
