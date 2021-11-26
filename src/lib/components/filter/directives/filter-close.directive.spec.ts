import { Component, DebugElement } from '@angular/core';
import { FilterCloseDirective, terraFilterClose } from './filter-close.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    template: `<button terraFilterClose></button>`
})
class HostComponent {}

describe('FilterCloseDirective', () => {
    let fixture: ComponentFixture<HostComponent>;
    let component: HostComponent;
    let directive: FilterCloseDirective;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [HostComponent, FilterCloseDirective]
        }).createComponent(HostComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        directive = fixture.debugElement.query(By.directive(FilterCloseDirective)).injector.get(FilterCloseDirective);
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should add a hidden property to the MouseEvent when the button is clicked', () => {
        const event: MouseEvent = new MouseEvent('click');
        const button: DebugElement = fixture.debugElement.query(By.css('button'));
        button.nativeElement.dispatchEvent(event);

        expect(event[terraFilterClose]).toBeTrue();
    });
});
