import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { DataRowComponent } from './data-row.component';
import { TerraDataTableComponent } from '../terra-data-table.component';
import { TerraCheckboxComponent } from '../../../forms/checkbox/terra-checkbox.component';
import { TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../../translation/l10n.config';
import { By } from '@angular/platform-browser';
import Spy = jasmine.Spy;
import { TerraDataTableRowInterface } from '../interfaces/terra-data-table-row.interface';

export const dataTableStub:Partial<TerraDataTableComponent<any, any>> =
    {
        rowClicked:         ():void =>
                            {
                                return;
                            },
        inputHasCheckboxes: true
    };

describe('Component: DataRowComponent', () =>
{
    let component:DataRowComponent;
    let fixture:ComponentFixture<DataRowComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                DataRowComponent,
                TerraCheckboxComponent,
            ],
            imports:      [
                TooltipModule.forRoot(),
                FormsModule,
                LocalizationModule.forRoot(l10nConfig)
            ],
            providers:    [
                {
                    provide:     TerraDataTableComponent,
                    useValue: dataTableStub
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(DataRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should call data table #rowClicked() on click', () =>
    {
        const rowClicked:Spy = spyOn(component.dataTable, 'rowClicked');
        component.onClick();

        expect(rowClicked).toHaveBeenCalled();
    });

    it('should set classes according to rowData', () =>
    {
        let rowData:TerraDataTableRowInterface<any> = {
            isActive: false,
            selected: false,
            disabled: false
        };

        component.tcDataRow = rowData;

        fixture.detectChanges();

        expect(fixture.debugElement.classes['selected']).toBe(false);
        expect(fixture.debugElement.classes['isActive']).toBe(false);
        expect(fixture.debugElement.classes['disabled']).toBe(false);

        rowData = {
            isActive: true,
            selected: true,
            disabled: true
        };

        component.tcDataRow = rowData;

        fixture.detectChanges();

        expect(fixture.debugElement.classes['selected']).toBe(true);
        expect(fixture.debugElement.classes['isActive']).toBe(true);
        expect(fixture.debugElement.classes['disabled']).toBe(true);
    });

    it('should toggle checkbox visibility', () =>
    {
        expect(fixture.debugElement.query(By.css('terra-checkbox'))).toBeTruthy();

        component.dataTable.inputHasCheckboxes = false;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('terra-checkbox'))).toBeFalsy();
    });
});
