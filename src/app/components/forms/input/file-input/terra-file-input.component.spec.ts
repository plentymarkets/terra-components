import { ElementRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TooltipModule,
    ModalModule } from 'ngx-bootstrap';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../../translation/l10n.config';
import { MockElementRef } from '../../../../testing/mock-element-ref';
import { TerraLabelTooltipDirective } from '../../../../helpers/terra-label-tooltip.directive';
import { TerraFileInputComponent } from './terra-file-input.component';
import { TerraThreeColumnsContainerComponent } from '../../../layouts/column-container/three-columns/terra-three-columns-container.component';
import { TerraNodeTreeComponent } from '../../../tree/node-tree/terra-node-tree.component';
import {
    TerraBaseToolbarComponent,
    TerraButtonComponent,
    TerraFileBrowserComponent,
    TerraFileChooserComponent,
    TerraOverlayComponent,
    TerraPortletComponent,
    TerraSimpleTableComponent,
    TerraFrontendStorageService,
    TerraLoadingSpinnerService,
    TerraFileBrowserService
} from '../../../../..';
import { TerraImagePreviewComponent } from '../../../file-browser/image-preview/image-preview.component';
import { TerraFileListComponent } from '../../../file-browser/file-list/file-list.component';
import { TerraTextInputComponent } from '../text-input/terra-text-input.component';
import { TerraCheckboxComponent } from '../../checkbox/terra-checkbox.component';
import { TerraNodeComponent } from '../../../tree/node-tree/node/terra-node.component';

fdescribe('TerraFileInputComponent', () =>
{
    let component:TerraFileInputComponent;
    let fixture:ComponentFixture<TerraFileInputComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraFileInputComponent,
                TerraFileChooserComponent,
                TerraFileBrowserComponent,
                TerraFileListComponent,
                TerraImagePreviewComponent,
                TerraButtonComponent,
                TerraOverlayComponent,
                TerraThreeColumnsContainerComponent,
                TerraSimpleTableComponent,
                TerraPortletComponent,
                TerraTextInputComponent,
                TerraCheckboxComponent,
                TerraBaseToolbarComponent,
                TerraNodeComponent,
                TerraNodeTreeComponent,
                TerraLabelTooltipDirective
            ],
            imports:      [
                TooltipModule.forRoot(),
                ModalModule.forRoot(),
                FormsModule,
                ReactiveFormsModule,
                HttpModule,
                HttpClientModule,
                LocalizationModule.forRoot(l10nConfig)
            ],
            providers:    [
                {
                    provide:  ElementRef,
                    useClass: MockElementRef
                },
                TerraFrontendStorageService,
                TerraLoadingSpinnerService,
                TerraFileBrowserService
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraFileInputComponent);
        component = fixture.componentInstance;

        component.value = null;

        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    afterAll(() =>
    {
        TestBed.resetTestingModule();
    });
});
