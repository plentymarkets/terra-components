import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { FilterToolbarComponent } from './filter-toolbar.component';
import { TerraFilterModule } from '../../filter.module';
import { FilterChipDefDirective } from '../../directives/filter-chip-def.directive';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatChipListHarness } from '@angular/material/chips/testing';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FilterMenuDirective } from '../../directives/filter-menu.directive';
import { DisplayWhenFn } from '../../models/display-when-function.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { L10N_LOCALE, L10nTranslationModule, L10nTranslationService } from 'angular-l10n';
import { MockTranslationService } from '../../../../testing/mock-translation-service';
import { RouterTestingModule } from '@angular/router/testing';

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
        <terra-filter-toolbar
            [enableSearchInput]="true"
            [autocompleteLabels]="['test']"
            [filterMenu]="filterMenu"
            (search)="search()"
        ></terra-filter-toolbar>
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
            imports: [TerraFilterModule, FormsModule, NoopAnimationsModule, L10nTranslationModule, RouterTestingModule],
            declarations: [HostComponent],
            providers: [
                {
                    provide: L10nTranslationService,
                    useClass: MockTranslationService
                },
                {
                    provide: L10N_LOCALE,
                    useValue: { language: 'de' }
                }
            ]
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

    it('should toggle the mat menu on click', () => {
        const menuTrigger: DebugElement = fixture.debugElement.query(By.directive(MatMenuTrigger));
        expect(menuTrigger.injector.get(MatMenuTrigger)).toBe(toolbarComponent.menuTrigger);

        spyOn(toolbarComponent.menuTrigger, 'toggleMenu');
        menuTrigger.nativeElement.click();
        expect(toolbarComponent.menuTrigger.toggleMenu).toHaveBeenCalled();
    });

    it('should emit the search event when the search icon is clicked', (doneFn: Function) => {
        const searchButton: DebugElement = fixture.debugElement.query(By.css('button#searchButton'));
        expect(searchButton).toBeTruthy();
        let calls = 0;

        toolbarComponent.search.subscribe({
            next: () => {
                calls++;
            },
            complete: () => {
                expect(calls).toEqual(2);
                doneFn();
            }
        });

        searchButton.nativeElement.click();
        toolbarComponent._onInputSearch();
        toolbarComponent.search.complete();
    });

    it('should emit an event and reset the autocomplete input when an option select event is fired', (doneFn: Function) => {
        const mockEvent = jasmine.createSpyObj<MatAutocompleteSelectedEvent>('mockEvent', ['option', 'source']);
        const resetSpy = spyOn(toolbarComponent.searchInputControl, 'reset');

        toolbarComponent.optionSelected.subscribe({
            next: (event: any) => {
                expect(event.value).toEqual('');
            },
            complete: () => {
                expect(resetSpy).toHaveBeenCalled();
                doneFn();
            }
        });

        toolbarComponent._onOptionSelected(mockEvent, '');
        toolbarComponent.optionSelected.complete();
    });
});
