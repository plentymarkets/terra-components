import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatMenu } from '@angular/material/menu';
import { FilterToolbarComponent } from './filter-toolbar.component';
import { FilterModule } from '../../filter.module';
import { FilterChipDefDirective } from '../../directives/filter-chip-def.directive';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatChipListHarness } from '@angular/material/chips/testing';
import { DisplayWhenFn } from '../../models';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FilterMenuDirective } from '../../directives/filter-menu.directive';

// tslint:disable:component-max-inline-declarations
@Component({
    template: `
        <mat-menu #filterMenu="terraFilterMenu" terraFilterMenu>
            <form terraFilterContainer>
                <terra-filter-content>
                    <div terraFilterChipDef>
                        <label terraFilterChipLabel>My Label</label>
                        <input type="text" [ngModel]="'Hello'" name="text" />
                    </div>
                    <div terraFilterChipDef [terraFilterChipDisplayWhen]="displayWhenPositive">
                        <label terraFilterChipLabel>Another Label</label>
                        <input type="number" [ngModel]="0" name="number" />
                    </div>
                </terra-filter-content>
            </form>
        </mat-menu>
        <terra-filter-toolbar [filterMenu]="filterMenu" (search)="search()"></terra-filter-toolbar>
    `
})
class HostComponent {
    public search(): void {
        // noop
    }

    public displayWhenPositive: DisplayWhenFn = (value: any) => value >= 0;
}

describe('FilterToolbarComponent:', () => {
    let fixture: ComponentFixture<HostComponent>;
    let component: HostComponent;
    let toolbarComponent: FilterToolbarComponent;
    let loader: HarnessLoader;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [FilterModule, FormsModule, NoopAnimationsModule],
            declarations: [HostComponent]
        }).createComponent(HostComponent);
        component = fixture.componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

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

    it('should display the chips depending on their given `DisplayWhenFn`', async () => {
        const chipList: MatChipListHarness = await loader.getHarness(MatChipListHarness);
        expect((await chipList.getChips()).length).toBe(2);

        // open the menu before querying for the chip defs
        const menu: MatMenuHarness = await loader.getHarness(MatMenuHarness);
        await menu.open();

        const chipDefs: Array<FilterChipDefDirective> = fixture.debugElement
            .queryAll(By.directive(FilterChipDefDirective))
            .map((de: DebugElement) => de.injector.get(FilterChipDefDirective));

        // set the value of the control to null, since we expect the first chip not to be displayed when the value is null || undefined
        chipDefs[0].control.control.setValue(null);
        expect((await chipList.getChips()).length).toBe(1);

        // set the value of the control to a negative integer, since we passed a custom displayWhenFn which should hide the chip in this case.
        chipDefs[1].control.control.setValue(-1);
        expect((await chipList.getChips()).length).toBe(0);
    });
});
