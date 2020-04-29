import { CKEditorDirective } from './ck-editor.directive';
import { CKEditorComponent } from 'ckeditor4-angular';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `<ckeditor tcCkEditor></ckeditor>`
})
class CkEditorTestHostComponent {}

describe('CkFullDirective', () => {
    let component: CkEditorTestHostComponent;
    let fixture: ComponentFixture<CkEditorTestHostComponent>;
    let directive: CKEditorDirective;
    let ckComponent: CKEditorComponent;

    const ckurl: string = 'https://cdn.ckeditor.com/4.11.4/full-all/ckeditor.js';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CKEditorDirective, CkEditorTestHostComponent, CKEditorComponent]
        }).compileComponents();
    }));

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
});
