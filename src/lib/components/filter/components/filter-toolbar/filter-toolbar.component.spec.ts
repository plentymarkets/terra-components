import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatMenu } from '@angular/material/menu';
import { FilterToolbarComponent } from './filter-toolbar.component';
import { FilterMenuDirective } from '../../directives';

// tslint:disable:component-max-inline-declarations
@Component({
    template: `<mat-menu #filterMenu="terraFilterMenu" terraFilterMenu>
            <form terraFilterContainer>
                <terra-filter-content>
                    <div terraFilterChipDef>
                        <label terraFilterChipLabel>My Label</label>
                        <input type="text" [ngModel]="'Hello'" name="text" />
                    </div>
                </terra-filter-content>
            </form>
        </mat-menu>
        <terra-filter-toolbar [filterMenu]="filterMenu" (search)="search()"></terra-filter-toolbar> `
})
class HostComponent {
    public search(): void {
        // noop
    }
}

describe('FilterToolbarComponent:', () => {
    let fixture: ComponentFixture<HostComponent>;
    let component: HostComponent;
    let toolbarComponent: FilterToolbarComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [HostComponent]
        }).createComponent(HostComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        toolbarComponent = fixture.debugElement.query(By.directive(FilterToolbarComponent)).componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(toolbarComponent).toBeTruthy();
    });

    it('should provide access to the mat menu via the menu getter', () => {
        const menu: MatMenu = fixture.debugElement.query(By.directive(MatMenu)).componentInstance;
        const filterMenu: FilterMenuDirective = fixture.debugElement
            .query(By.directive(FilterMenuDirective))
            .injector.get(FilterMenuDirective);
        expect(toolbarComponent.menu).toBe(menu);
        expect(toolbarComponent.menu).toBe(filterMenu.menu);
    });

    it('should provide access to the chip definitions via the chips$ getter', () => {
        const filterMenu: FilterMenuDirective = fixture.debugElement
            .query(By.directive(FilterMenuDirective))
            .injector.get(FilterMenuDirective);
        expect(toolbarComponent.chips$).toBe(filterMenu.container.chips$);

        filterMenu.container = null;
        expect(toolbarComponent.chips$).toBeUndefined();
    });

    it('should call the function on the EventEmitter "search" after click on button', () => {
        const searchButton: HTMLButtonElement = fixture.debugElement.query(By.css('button#searchButton'))
            .nativeElement as HTMLButtonElement;
        spyOn(component, 'search');
        searchButton.click();
        expect(component.search).toHaveBeenCalled();
    });
});
