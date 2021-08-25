import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { L10nTranslationModule } from 'angular-l10n';
import { TerraFileInputComponent } from './terra-file-input.component';
import { TerraRegex } from '../../../../helpers/regex/terra-regex';
import { fileData } from '../../../../testing/file-input/file-data';
import { By } from '@angular/platform-browser';
import { TerraButtonComponent } from '../../../buttons/button/terra-button.component';
import { TerraStorageObject } from '../../../file-browser/model/terra-storage-object';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { mockL10nConfig } from '../../../../testing/mock-l10n-config';
import { MockTooltipDirective } from '../../../../testing/mock-tooltip.directive';
import { Component, Input } from '@angular/core';
import { TerraPlacementEnum } from '../../../../helpers';
import { TerraBaseStorageService } from '../../../file-browser/terra-base-storage.interface';

@Component({
    selector: 'terra-file-chooser',
    template: ''
})
export class FileChooserMockComponent {
    @Input() public inputIcon: string;
    @Input() public inputTooltipText: string;
    @Input() public inputTooltipPlacement: TerraPlacementEnum;
    @Input() public inputAllowedExtensions: Array<string>;
    @Input() public inputAllowFolders: boolean;
    @Input() public inputStorageServices: Array<TerraBaseStorageService>;
}

describe('TerraFileInputComponent', () => {
    let component: TerraFileInputComponent;
    let fixture: ComponentFixture<TerraFileInputComponent>;

    const jpgFileName: string = 'a-total-NewFile_name.jpg';
    const folderName: string = 'i-amYour_folder/';

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                MockTooltipDirective,
                FileChooserMockComponent,
                TerraFileInputComponent,
                TerraButtonComponent
            ],
            imports: [FormsModule, L10nTranslationModule.forRoot(mockL10nConfig), MatDialogModule]
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
        spyOn(component, 'resetValue');
        const button: TerraButtonComponent = fixture.debugElement.query(
            By.css('terra-button.input-group-btn.margin-left')
        ).componentInstance as TerraButtonComponent;

        button.outputClicked.emit();

        expect(component.resetValue).toHaveBeenCalled();
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

        spyOn(component, 'onPreviewClicked');
        const divFilePreview: HTMLDivElement = fixture.debugElement.query(By.css('div.file-preview')).nativeElement;

        divFilePreview.click();

        expect(component.onPreviewClicked).toHaveBeenCalled();
    });

    it('should open a preview dialog when clicking on the file preview', () => {
        component.inputShowPreview = true;
        fixture.detectChanges();

        const dialog: MatDialog = TestBed.inject(MatDialog);
        spyOn(dialog, 'open');
        // ensure that the dialog can be opened by emulating that the selected file is a web image
        spyOn(component, 'isWebImage').and.returnValue(true);

        const divFilePreview: HTMLDivElement = fixture.debugElement.query(By.css('div.file-preview')).nativeElement;

        divFilePreview.click();

        const data: any = {
            filepath: component.value,
            filename: component.getFilename(component.value)
        };
        expect(dialog.open).toHaveBeenCalledWith(component._imagePreviewDialog, { data: data });
    });

    it('should call `isWebImage` after value changed', () => {
        spyOn(component, 'isWebImage');

        component.inputShowPreview = true;
        component.onObjectSelected(new TerraStorageObject(fileData.objects[1]));

        fixture.detectChanges();

        expect(component.isWebImage).toHaveBeenCalled();
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
