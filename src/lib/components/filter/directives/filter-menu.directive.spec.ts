import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { FilterMenuDirective } from './filter-menu.directive';
import { FilterContainerDirective } from './filter-container.directive';

// tslint:disable:component-max-inline-declarations
@Component({
    template: `<mat-menu terraFilterMenu>
        <form terraFilterContainer></form>
    </mat-menu>`
})
class HostComponent {
    @ViewChild(FilterContainerDirective, { static: true })
    public container: FilterContainerDirective;
}

describe('FilterMenuDirective', () => {
    let fixture: ComponentFixture<HostComponent>;
    let component: HostComponent;
    let directive: FilterMenuDirective;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [MatMenuModule],
            declarations: [HostComponent, FilterMenuDirective, FilterContainerDirective]
        }).createComponent(HostComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        directive = fixture.debugElement.query(By.directive(FilterMenuDirective)).injector.get(FilterMenuDirective);
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it(`should set the menu's panel class to "terra-filter-menu"`, () => {
        const menu: MatMenu = fixture.debugElement.query(By.directive(MatMenu)).componentInstance;
        // expect(menu.panelClass).toBe('terra-filter-menu'); // unfortunately there's no getter for the panelClass
        expect(menu._classList['terra-filter-menu']).toBe(true);
    });

    it('should retrieve the reference to the material menu', () => {
        const menu: MatMenu = fixture.debugElement.query(By.directive(MatMenu)).componentInstance;
        expect(directive.menu).toBe(menu);
    });

    it('should query the contained FilterContainerDirective', () => {
        expect(directive.container).toBe(component.container);
        expect(directive.container instanceof FilterContainerDirective).toBe(true);
    });
});
