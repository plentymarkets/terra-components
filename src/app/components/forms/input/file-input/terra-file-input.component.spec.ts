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
import {
    ModalModule,
    TooltipModule
} from 'ngx-bootstrap';
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
    TerraFileBrowserService,
    TerraFileChooserComponent,
    TerraFrontendStorageService,
    TerraLoadingSpinnerService,
    TerraOverlayComponent,
    TerraPortletComponent,
    TerraSimpleTableComponent,
    TerraStorageObject
} from '../../../../..';
import { TerraImagePreviewComponent } from '../../../file-browser/image-preview/image-preview.component';
import { TerraFileListComponent } from '../../../file-browser/file-list/file-list.component';
import { TerraTextInputComponent } from '../text-input/terra-text-input.component';
import { TerraCheckboxComponent } from '../../checkbox/terra-checkbox.component';
import { TerraNodeComponent } from '../../../tree/node-tree/node/terra-node.component';
import { TerraRegex } from '../../../../helpers/regex/terra-regex';
import { terraFrontendStorageServiceStub } from '../../../../testing/file-input/terra-frontend-storage-service-stub';
import { fileData } from '../../../../testing/file-input/file-data';

fdescribe('TerraFileInputComponent', () =>
{
    let component:TerraFileInputComponent;
    let fixture:ComponentFixture<TerraFileInputComponent>;
    let frontendStorageService:TerraFrontendStorageService;

    const jpgFileName:string = 'a-total-NewFile_name.jpg';
    const folderName:string = 'i-aYour_folder/';

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
                {
                    provide:  TerraFrontendStorageService,
                    useValue: terraFrontendStorageServiceStub
                },
                TerraLoadingSpinnerService,
                TerraFileBrowserService
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraFileInputComponent);
        component = fixture.componentInstance;
        frontendStorageService = fixture.debugElement.injector.get(TerraFrontendStorageService);

        component.value = null;

        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should accept TerraRegex.MIXED by default', () =>
    {
        expect(component.regex).toBe(TerraRegex.MIXED);
    });

    it('should have showPreview false by default', () =>
    {
        expect(component.inputShowPreview).toBeFalsy();
    });

    it('should have inputAllowFolders true by default', () =>
    {
        expect(component.inputAllowFolders).toBeTruthy();
    });

    it('should be an webImage if the extension is .jpg', () =>
    {
        expect(component.isWebImage(jpgFileName)).toBeTruthy();
    });

    it('should have publicUrl as value after selection', () =>
    {
        component.onObjectSelected(new TerraStorageObject(fileData.objects[0]));

        expect(component.value).toBe(fileData.objects[0].publicUrl);
    });

    it('should have a icon class `jpg` if the file has a jpg extension', () =>
    {
        expect(component.getIconClass(jpgFileName)).toBe('icon-file_extension_jpg');
    });

    it('should have a icon class `jpg` if the file has a jpg extension', () =>
    {
        expect(component.getIconClass(folderName)).toBe('icon-folder');
    });

    it('should have a value after selection and after reset the value should an empty string', () =>
    {
        component.onObjectSelected(new TerraStorageObject(fileData.objects[1]));

        expect(component.value).toBe(fileData.objects[1].publicUrl);

        component.resetValue();

        expect(component.value).toBe('');
    });
});
