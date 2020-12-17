import { CKEditorDirective } from './ck-editor.directive';
import { CKEditor4, CKEditorComponent } from 'ckeditor4-angular';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `<ckeditor tcCkEditor></ckeditor>`
})
class CkEditorTestHostComponent {}

describe('CkEditorDirective', () => {
    let component: CkEditorTestHostComponent;
    let fixture: ComponentFixture<CkEditorTestHostComponent>;
    let directive: CKEditorDirective;
    let ckComponent: CKEditorComponent;

    const ckurl: string = 'https://cdn.ckeditor.com/4.11.4/full-all/ckeditor.js';

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CKEditorDirective, CkEditorTestHostComponent, CKEditorComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CkEditorTestHostComponent);
        component = fixture.componentInstance;

        directive = fixture.debugElement.query(By.directive(CKEditorDirective)).injector.get(CKEditorDirective);
        ckComponent = fixture.debugElement.query(By.directive(CKEditorDirective)).componentInstance;
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
        expect(directive).toBeTruthy();
        expect(ckComponent).toBeTruthy();
    });

    it('should set ckeditor url to https://cdn.ckeditor.com/4.11.4/full-all/ckeditor.js', () => {
        expect(ckComponent.editorUrl).toBe(ckurl);
    });

    it('should set the editor type to "divarea" by default', () => {
        expect(ckComponent.type).toBe(CKEditor4.EditorType.DIVAREA);
    });
});
