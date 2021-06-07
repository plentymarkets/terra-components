import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterContentDirective } from './filter-content.directive';

@Component({
    template: `<div terraFilterContent></div>`
})
class HostComponent {}

describe('FilterContentDirective:', () => {
    let fixture: ComponentFixture<HostComponent>;
    let hostElement: DebugElement;
    let directive: FilterContentDirective;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [HostComponent, FilterContentDirective]
        }).createComponent(HostComponent);

        hostElement = fixture.debugElement.query(By.directive(FilterContentDirective));
        directive = hostElement.injector.get(FilterContentDirective);
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
    });

    it('should apply ".terra-filter-content" class to its host', () => {
        expect(hostElement.nativeElement.classList).toContain('terra-filter-content');
    });
});
