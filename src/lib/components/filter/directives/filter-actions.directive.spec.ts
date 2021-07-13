import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterActionsDirective } from './filter-actions.directive';

@Component({
    template: `<div terraFilterActions></div>`
})
class HostComponent {}

describe('FilterActionsDirective:', () => {
    let fixture: ComponentFixture<HostComponent>;
    let hostElement: DebugElement;
    let directive: FilterActionsDirective;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [HostComponent, FilterActionsDirective]
        }).createComponent(HostComponent);

        hostElement = fixture.debugElement.query(By.directive(FilterActionsDirective));
        directive = hostElement.injector.get(FilterActionsDirective);
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
    });

    it('should apply ".terra-filter-actions" class to its host', () => {
        expect(hostElement.nativeElement.classList).toContain('terra-filter-actions');
    });
});
