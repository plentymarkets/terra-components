import {
    Component,
    Input
} from '@angular/core';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import {
    MAT_DIALOG_DATA,
    MatDialogModule
} from '@angular/material/dialog';
import { TranslationModule } from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { TableSettingsDialogComponent } from './table-settings-dialog.component';
import { TableSettingsDialogData } from '../interface/table-settings-dialog-data.interface';

@Component({
    selector: 'terra-button',
    template: ''
})
class MockButtonComponent
{
    @Input()
    public inputCaption:string;
}

let mockDialogData:TableSettingsDialogData = {
    columns: [],
    selectedColumns: []
};

describe('TableSettingsDialogComponent', () =>
{
    let fixture:ComponentFixture<TableSettingsDialogComponent>;
    let component:TableSettingsDialogComponent;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TableSettingsDialogComponent,
                MockButtonComponent
            ],
            imports:      [
                MatListModule,
                MatDialogModule,
                TranslationModule.forRoot({}),
                FormsModule
            ],
            providers:    [{
                provide:  MAT_DIALOG_DATA,
                useValue: mockDialogData
            }]
        });

        fixture = TestBed.createComponent(TableSettingsDialogComponent);
        component = fixture.componentInstance;
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
