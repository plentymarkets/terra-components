import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TranslationModule } from 'angular-l10n';
import {
    MatDialog,
    MatDialogRef
} from '@angular/material/dialog';
import {
    Directive,
    Input
} from '@angular/core';
import { TableSettingsComponent } from './table-settings.component';
import { of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import Spy = jasmine.Spy;

@Directive({selector:'[tcTooltip]'})
class MockTooltipDirective
{
    @Input('tcTooltip')
    tooltip:string
}

describe('TableSettingsComponent', () =>
{
    let component:TableSettingsComponent;
    let fixture:ComponentFixture<TableSettingsComponent>;

    let mockDialogRef:Partial<MatDialogRef<any>> = {
        afterClosed: () => of([])
    };
    let mockDialog:Partial<MatDialog> = {
        open: () => mockDialogRef as MatDialogRef<any>,
    };

    beforeEach(() =>
    {
        TestBed.configureTestingModule(
            {
                declarations: [TableSettingsComponent,
                               MockTooltipDirective],
                imports:      [
                    TranslationModule.forRoot({}),
                    MatButtonModule],
                providers: [
                    {
                        provide: MatDialog,
                        useValue: mockDialog
                    }
                ]
            }
        );
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TableSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should open settings dialog', () =>
    {
        const dialog:MatDialog = TestBed.get(MatDialog);
        const spyOpen:Spy = spyOn(dialog, 'open').and.callThrough();
        component._openSettings();
        expect(spyOpen).toHaveBeenCalled();
    });
});

// @NgModule({
//     declarations:    [TableSettingsDialogComponent,
//                       TerraButtonComponent,
//                       TooltipDirective],
//     entryComponents: [TableSettingsDialogComponent],
//     imports:         [MatDialogModule,
//                       MatSelectModule,
//                       FormsModule,
//                       MatListModule,
//                       BrowserModule,
//                       LocalizationModule.forRoot({})],
//     providers:       [
//         {
//             provide:  Router,
//             useValue: new MockRouter()
//         }],
//     exports:         [TooltipDirective]
// })
// class TestModule
// {
// }
