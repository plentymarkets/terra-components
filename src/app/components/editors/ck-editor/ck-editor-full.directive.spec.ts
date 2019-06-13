import { CKEditorFullDirective } from './ck-editor-full.directive';
import { CKEditorComponent } from 'ckeditor4-angular';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `<ckeditor tcCkFull></ckeditor>`
})
class CkEditorTestHostComponent
{
}

describe('CkFullDirective', () =>
{
    let component:CkEditorTestHostComponent;
    let fixture:ComponentFixture<CkEditorTestHostComponent>;
    let directive:CKEditorFullDirective;
    let ckComponent:CKEditorComponent;

    const ckurl:string = 'https://cdn.ckeditor.com/4.11.4/full-all/ckeditor.js';

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                CKEditorFullDirective,
                CkEditorTestHostComponent,
                CKEditorComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(CkEditorTestHostComponent);
        component = fixture.componentInstance;

        directive = fixture.debugElement.query(By.directive(CKEditorFullDirective)).injector.get(CKEditorFullDirective);
        ckComponent = fixture.debugElement.query(By.directive(CKEditorFullDirective)).injector.get(CKEditorComponent);
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
        expect(directive).toBeTruthy();
        expect(ckComponent).toBeTruthy();
    });

    it('should set ckeditor url to https://cdn.ckeditor.com/4.11.4/full-all/ckeditor.js', () =>
    {
        expect(ckComponent.editorUrl).toBe(ckurl);
    });
});
