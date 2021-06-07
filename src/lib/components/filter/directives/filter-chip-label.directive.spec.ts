import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterChipLabelDirective } from './filter-chip-label.directive';
import { FilterChipDefDirective } from './filter-chip-def.directive';

// tslint:disable:component-max-inline-declarations
@Component({
    template: `<label terraFilterChipLabel>My Label</label>`
})
class HostComponent {}

describe('FilterChipDefDirective', () => {
    let fixture: ComponentFixture<HostComponent>;
    let component: HostComponent;
    let directive: FilterChipLabelDirective;
    const chipDef: FilterChipDefDirective = { label: undefined } as FilterChipDefDirective;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [HostComponent, FilterChipLabelDirective],
            providers: [{ provide: FilterChipDefDirective, useValue: chipDef }]
        }).createComponent(HostComponent);
        component = fixture.componentInstance;

        directive = fixture.debugElement
            .query(By.directive(FilterChipLabelDirective))
            .injector.get(FilterChipLabelDirective);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
    });

    it('should retrieve the inner text of its host element and set it as label of the chip def', () => {
        expect(chipDef.label).toBe('My Label');
    });
});
