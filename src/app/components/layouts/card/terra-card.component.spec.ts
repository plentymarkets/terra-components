import {
    DebugElement,
    ElementRef
} from '@angular/core';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import { TerraCardComponent } from './terra-card.component';

import Spy = jasmine.Spy;
import { By } from '@angular/platform-browser';

fdescribe('TerraCardComponent', () =>
{
    let component:TerraCardComponent;
    let fixture:ComponentFixture<TerraCardComponent>;
    let createContent:Function;

    beforeAll(() =>
    {
        createContent = function(content:string):HTMLElement
        {
            let cont:HTMLElement = document.createElement(content);
            return cont;
        };
    });

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [TerraCardComponent]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraCardComponent);
        component = fixture.componentInstance;
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should div-element for footer be present if content is given', () =>
    {
        let debugElement:DebugElement = fixture.debugElement;
        let footerElement:DebugElement = debugElement.query(By.css('div.card-footer'));
        let elemRef:ElementRef = component.viewChildFooter.nativeElement;
        elemRef.nativeElement.innerHtml = '<div>Test</div>';
        expect(elemRef).toBeDefined();
        expect(footerElement).toBeTruthy();
    });

});
