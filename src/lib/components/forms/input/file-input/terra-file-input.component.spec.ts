import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModule } from 'ngx-bootstrap';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../../../app/translation/l10n.config';
import { TerraLabelTooltipDirective } from '../../../../helpers/terra-label-tooltip.directive';
import { TerraFileInputComponent } from './terra-file-input.component';
import { TerraThreeColumnsContainerComponent } from '../../../layouts/column-container/three-columns/terra-three-columns-container.component';
import { TerraNodeTreeComponent } from '../../../tree/node-tree/terra-node-tree.component';
import { TerraImagePreviewComponent } from '../../../file-browser/image-preview/image-preview.component';
import { TerraFileListComponent } from '../../../file-browser/file-list/file-list.component';
import { TerraTextInputComponent } from '../text-input/terra-text-input.component';
import { TerraCheckboxComponent } from '../../checkbox/terra-checkbox.component';
import { TerraNodeComponent } from '../../../tree/node-tree/node/terra-node.component';
import { TerraRegex } from '../../../../helpers/regex/terra-regex';
import { terraFrontendStorageServiceStub } from '../../../../testing/file-input/terra-frontend-storage-service-stub';
import { fileData } from '../../../../testing/file-input/file-data';
import { By } from '@angular/platform-browser';
import { TerraFrontendStorageService } from '../../../file-browser/terra-frontend-storage.service';
import { TerraFileChooserComponent } from '../../../buttons/file-chooser/terra-file-chooser.component';
import { TerraFileBrowserComponent } from '../../../file-browser/terra-file-browser.component';
import { TerraButtonComponent } from '../../../buttons/button/terra-button.component';
import { TerraOverlayComponent } from '../../../layouts/overlay/terra-overlay.component';
import { TerraSimpleTableComponent } from '../../../tables/simple/terra-simple-table.component';
import { TerraPortletComponent } from '../../../layouts/portlet/terra-portlet.component';
import { TerraBaseToolbarComponent } from '../../../toolbar/base-toolbar/terra-base-toolbar.component';
import { TerraLoadingSpinnerService } from '../../../loading-spinner/service/terra-loading-spinner.service';
import { TerraFileBrowserService } from '../../../file-browser/terra-file-browser.service';
import { TerraStorageObject } from '../../../file-browser/model/terra-storage-object';
import { TerraInfoComponent } from '../../../info/terra-info.component';
import { TooltipDirective } from '../../../tooltip/tooltip.directive';
import { Router } from '@angular/router';
import { MockRouter } from '../../../../testing/mock-router';
import Spy = jasmine.Spy;
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('TerraFileInputComponent', () => {
    let component: TerraFileInputComponent;
    let fixture: ComponentFixture<TerraFileInputComponent>;

    const jpgFileName: string = 'a-total-NewFile_name.jpg';
    const folderName: string = 'i-amYour_folder/';
    const router: MockRouter = new MockRouter();

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TooltipDirective,
                TerraFileListComponent,
                TerraFileBrowserComponent,
                TerraFileChooserComponent,
                TerraFileInputComponent,
                TerraImagePreviewComponent,
                TerraButtonComponent,
                TerraOverlayComponent,
                TerraThreeColumnsContainerComponent,
                TerraSimpleTableComponent,
                TerraPortletComponent,
                TerraInfoComponent,
                TerraTextInputComponent,
                TerraCheckboxComponent,
                TerraBaseToolbarComponent,
                TerraNodeComponent,
                TerraNodeTreeComponent,
                TerraLabelTooltipDirective
            ],
            imports: [
                ModalModule.forRoot(),
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                LocalizationModule.forRoot(l10nConfig),
                MatDialogModule
            ],
            providers: [
                {
                    provide: Router,
                    useValue: router
                },
                {
                    provide: TerraFrontendStorageService,
                    useValue: terraFrontendStorageServiceStub
                },
                {
                    provide: MatDialog,
                    useValue: {}
                },
                TerraLoadingSpinnerService,
                TerraFileBrowserService
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TerraFileInputComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should accept TerraRegex.MIXED by default', () => {
        expect(component.regex).toBe(TerraRegex.MIXED);
    });

    it('should have inputShowPreview false by default', () => {
        expect(component.inputShowPreview).toBe(false);
    });

    it('should have inputAllowFolders true by default', () => {
        expect(component.inputAllowFolders).toBe(true);
    });

    it('should be a webImage if the extension is .jpg', () => {
        expect(component.isWebImage(jpgFileName)).toBe(true);
    });

    it('should have publicUrl as value after selection', () => {
        component.onObjectSelected(new TerraStorageObject(fileData.objects[0]));

        expect(component.value).toEqual(fileData.objects[0].publicUrl);
    });

    it('should have a icon class `jpg` if the file has a jpg extension', () => {
        expect(component.getIconClass(jpgFileName)).toBe('icon-file_extension_jpg');
    });

    it('should have a icon class `folder` if the file is a folder', () => {
        expect(component.getIconClass(folderName)).toBe('icon-folder');
    });

    it('should call `resetValue` on button click', () => {
        const resetValue: Spy = spyOn(component, 'resetValue');
        const button: TerraButtonComponent = fixture.debugElement.query(
            By.css('terra-button.input-group-btn.margin-left')
        ).componentInstance as TerraButtonComponent;

        button.outputClicked.emit();

        expect(resetValue).toHaveBeenCalled();
    });

    it('should have a value after selection and after reset the value should be an empty string', () => {
        component.onObjectSelected(new TerraStorageObject(fileData.objects[1]));

        expect(component.value).toEqual(fileData.objects[1].publicUrl);

        component.resetValue();

        expect(component.value).toBe('');
    });

    it('should call `onPreviewClicked` on file preview click', () => {
        component.inputShowPreview = true;
        fixture.detectChanges();

        const onPreviewClicked: Spy = spyOn(component, 'onPreviewClicked');
        const divFilePreview: HTMLDivElement = fixture.debugElement.query(By.css('div.file-preview')).nativeElement;

        divFilePreview.click();

        expect(onPreviewClicked).toHaveBeenCalled();
    });

    it('should call `isWebImage` after value changed', () => {
        const isWebImage: Spy = spyOn(component, 'isWebImage');

        component.inputShowPreview = true;
        component.onObjectSelected(new TerraStorageObject(fileData.objects[1]));

        fixture.detectChanges();

        expect(isWebImage).toHaveBeenCalled();
    });

    it('should have a span with an image equal to the value as background-image when the image is a web image', () => {
        component.inputShowPreview = true;
        component.onObjectSelected(new TerraStorageObject(fileData.objects[1]));

        fixture.detectChanges();

        const spanElement: HTMLSpanElement = fixture.debugElement.query(By.css('div.file-preview span:first-child'))
            .nativeElement;

        expect(spanElement.style.backgroundImage).toContain('url("' + component.value + '")');
    });

    it('should have a span with a span that has the value as class in it when the image is not a web image', () => {
        component.inputShowPreview = true;

        fixture.detectChanges();

        const spanElement: HTMLSpanElement = fixture.debugElement.query(
            By.css('div.file-preview span:first-child span:first-child')
        ).nativeElement;

        expect(spanElement.className).toBe('');
    });
});
