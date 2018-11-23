import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import { TerraTagComponent } from '../../../..';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../translation/l10n.config';
import { HttpClientModule } from '@angular/common/http';
import {
    tagOne,
    tagTwo
} from '../../../testing/mock-tags';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TerraTagNameInterface } from './data/terra-tag-name.interface';

describe('TerraTagComponent', () =>
{
    let component:TerraTagComponent;
    let fixture:ComponentFixture<TerraTagComponent>;
    let tagDiv:DebugElement;
    const customClass:string = 'testClass';
    const name:string = 'Test';

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraTagComponent
            ],
            imports:      [
                HttpClientModule,
                LocalizationModule.forRoot(l10nConfig)
            ],
            providers:    []
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraTagComponent);
        component = fixture.componentInstance;

        tagDiv = fixture.debugElement.query(By.css('div.tag'));
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should be initialized', () =>
    {
        expect(component.inputIsTaggable).toBe(false);
        expect(component.inputCustomClass).toBeUndefined();
        expect(component.inputColor).toBeUndefined();
        expect(component.inputBadge).toBeUndefined();
        expect(component.name).toBeUndefined();
        expect(component.names).toBeUndefined();
        expect(component.inputIsTagged).toBe(false);
        expect(component.isClosable).toBe(false);
        expect(component.tagId).toBeUndefined();
    });

    it('`inputColor` should be equal to background-color style', () =>
    {
        expect(tagDiv.styles['background-color']).toBeFalsy(); // no background color set

        component.inputColor = tagOne.color;

        fixture.detectChanges();

        expect(tagDiv.styles['background-color']).toEqual(component.inputColor);
    });

    it('`inputCustomClass` should set and equal to class of tagDiv', () =>
    {
        expect(Object.entries(tagDiv.classes).length).toBe(0); // no classes set

        component.inputCustomClass = customClass;

        fixture.detectChanges();

        expect(Object.entries(tagDiv.classes).length).toBeGreaterThan(0);
        expect(tagDiv.classes[customClass]).toBe(true);
    });

    it('should show tag icon depending on inputIsTaggable', () =>
    {
        let iconElement:DebugElement = tagDiv.query(By.css('span.tag-icon'));
        expect(iconElement).toBeFalsy();

        component.inputIsTaggable = true;

        fixture.detectChanges();

        iconElement = tagDiv.query(By.css('span.tag-icon'));

        expect(iconElement).toBeTruthy();
    });

    it('should set color style to tag icon depending on inputColor', () =>
    {
        component.inputIsTaggable = true;
        fixture.detectChanges();

        let iconElement:DebugElement = tagDiv.query(By.css('span.tag-icon'));

        expect(iconElement.styles['color']).toBeFalsy(); // style is not present

        component.inputColor = tagTwo.color;

        fixture.detectChanges();

        iconElement = tagDiv.query(By.css('span.tag-icon'));

        // getting access to protected/private methods
        expect(iconElement.styles['color']).toEqual(component['getColor']()); // style is present and equals #ffffff or #000000
    });

    it('should set classes to tag icon depending on inputIsTagged', () =>
    {
        component.inputIsTaggable = true;
        component.inputIsTagged = true;

        fixture.detectChanges();

        let iconElement:DebugElement = tagDiv.query(By.css('span.tag-icon'));

        expect(iconElement.classes['isTagged']).toBe(true);
        expect(iconElement.classes['icon-ticket_prio1']).toBe(true);
        expect(iconElement.classes['icon-ticket_prio8']).toBe(false);

        component.inputIsTagged = false;

        fixture.detectChanges();

        expect(iconElement.classes['isTagged']).toBe(false);
        expect(iconElement.classes['icon-ticket_prio1']).toBe(false);
        expect(iconElement.classes['icon-ticket_prio8']).toBe(true);
    });

    it('should set color style to tag text depending on inputColor', () =>
    {
        component.inputIsTaggable = true;
        fixture.detectChanges();

        let textElement:DebugElement = tagDiv.query(By.css('span.tag-text'));

        expect(textElement.styles['color']).toBeFalsy(); // style is not present

        component.inputColor = tagTwo.color;

        fixture.detectChanges();

        // getting access to protected/private methods
        expect(textElement.styles['color']).toEqual(component['getColor']()); // style is present and equals #ffffff or #000000
    });

    it('should set text depending on inputBadge', () =>
    {
        component.inputBadge = name;

        fixture.detectChanges();

        let textElement:DebugElement = tagDiv.query(By.css('span.tag-text'));
        let text:HTMLSpanElement = textElement.nativeElement;

        expect(text.innerHTML).toEqual(name);

        component.inputBadge = null;
        component.name = name;

        fixture.detectChanges();

        textElement = tagDiv.query(By.css('span.tag-text'));
        text = textElement.nativeElement;

        expect(text.innerHTML).toEqual(name);

        component.inputBadge = null;
        component.name = null;
        component.names = tagOne.names;

        fixture.detectChanges();
    });

    it('should set text depending on name', () =>
    {
        component.inputBadge = null;
        component.name = name;

        fixture.detectChanges();

        let textElement:DebugElement = tagDiv.query(By.css('span.tag-text'));
        let text:HTMLSpanElement = textElement.nativeElement;

        expect(text.innerHTML).toEqual(name);
    });

    it('should set text depending on names', () =>
    {
        let lang:string = localStorage.getItem('plentymarkets_lang_');

        component.inputBadge = null;
        component.name = null;
        component.names = tagOne.names;

        fixture.detectChanges();

        let textElement:DebugElement = tagDiv.query(By.css('span.tag-text'));
        let text:HTMLSpanElement = textElement.nativeElement;

        let tagName:TerraTagNameInterface = tagOne.names.find((tag:TerraTagNameInterface) => tag.language === lang);

        expect(text.innerHTML).toEqual(tagName.name);
    });

    it('should show close icon depending on isClosable', () =>
    {
        let closeElement:DebugElement = tagDiv.query(By.css('span.icon-close'));
        expect(closeElement).toBeNull();

        component.isClosable = true;

        fixture.detectChanges();

        closeElement = tagDiv.query(By.css('span.icon-close'));

        expect(closeElement).toBeDefined();
    });

    it('should close tag on close icon click', (done:Function) =>
    {
        component.isClosable = true;
        component.tagId = 1337;

        fixture.detectChanges();

        component.onCloseTag.subscribe((id:number) =>
        {
            expect(id).toBe(component.tagId);
            done();
        });

        let closeElement:DebugElement = tagDiv.query(By.css('span.icon-close'));

        closeElement.triggerEventHandler('click', null);
    });
});

