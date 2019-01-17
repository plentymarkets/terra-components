import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { DataRowComponent } from './data-row.component';
import { TerraDataTableComponent } from '../terra-data-table.component';
import { TerraCheckboxComponent } from '../../../forms/checkbox/terra-checkbox.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TerraDataTableRowInterface } from '../interfaces/terra-data-table-row.interface';
import Spy = jasmine.Spy;

export const dataTableStub:Partial<TerraDataTableComponent<any, any>> =
    {
        rowClicked:         ():void =>
                            {
                                return;
                            },
        inputHasCheckboxes: true
    };

fdescribe('Component: DataRowComponent', () =>
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
                FormsModule,
            ],
            providers:    [
                {
                    provide:  TerraDataTableComponent,
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
