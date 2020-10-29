import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerraTagComponent } from './terra-tag.component';
import { tagOne, tagTwo } from '../../../testing/mock-tags';
import { DebugElement, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TerraTagNameInterface } from './data/terra-tag-name.interface';
import { L10nTranslationModule, L10nTranslationService, L10N_LOCALE } from 'angular-l10n';
import { MockTranslationService } from '../../../testing/mock-translation-service';
import { mockL10nConfig } from 'src/lib/testing/mock-l10n-config';

describe('TerraTagComponent', () => {
    let component: TerraTagComponent;
    let fixture: ComponentFixture<TerraTagComponent>;
    let tagDiv: DebugElement;
    const name: string = 'Test';

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TerraTagComponent],
            providers: [
                {
                    provide: L10nTranslationService,
                    useClass: MockTranslationService
                },
                {
                    provide: L10N_LOCALE,
                    useValue: { language: 'de' }
                }
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TerraTagComponent);
        component = fixture.componentInstance;

        tagDiv = fixture.debugElement.query(By.css('div.tag'));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be initialized', () => {
        expect(component.inputIsTaggable).toBe(false);
        expect(component.inputCustomClass).toBeUndefined();
        expect(component.inputColor).toBeUndefined();
        expect(component.inputBadge).toBeUndefined();
        expect(component.name).toBeUndefined();
        expect(component.names).toEqual([]);
        expect(component.inputIsTagged).toBe(false);
        expect(component.isClosable).toBe(false);
        expect(component.tagId).toBeUndefined();
    });

    it('should have set tagDiv classes equal to `inputCustomClass`', () => {
        expect(tagDiv.classes['tag']).toBe(true); // only the tag class is set

        const customClass: string = 'testClass';
        component.inputCustomClass = customClass;

        fixture.detectChanges();

        expect(tagDiv.classes[customClass]).toBe(true);
    });

    describe('taggable', () => {
        it('should show tag icon depending on inputIsTaggable', () => {
            let iconElement: DebugElement = tagDiv.query(By.css('span.tag-icon'));
            expect(iconElement).toBeFalsy();

            component.inputIsTaggable = true;

            fixture.detectChanges();

            iconElement = tagDiv.query(By.css('span.tag-icon'));

            expect(iconElement).toBeTruthy();
        });

        it('should set classes to tag icon depending on inputIsTagged', () => {
            component.inputIsTaggable = true;
            component.inputIsTagged = true;

            fixture.detectChanges();

            let iconElement: DebugElement = tagDiv.query(By.css('span.tag-icon'));

            expect(iconElement.classes['isTagged']).toBe(true);
            expect(iconElement.classes['icon-ticket_prio1']).toBe(true);
            expect(iconElement.classes['icon-ticket_prio8']).toBeFalsy();

            component.inputIsTagged = false;

            fixture.detectChanges();

            expect(iconElement.classes['isTagged']).toBeFalsy();
            expect(iconElement.classes['icon-ticket_prio1']).toBeFalsy();
            expect(iconElement.classes['icon-ticket_prio8']).toBe(true);
        });
    });

    describe(`depending on #inputColor`, () => {
        it('should have background-color style equal to #inputColor', () => {
            expect(tagDiv.styles['background-color']).toBeFalsy(); // no background color set

            component.inputColor = tagOne.color;

            fixture.detectChanges();

            expect(tagDiv.styles['background-color']).toEqual(tagOne.color);
        });

        it('should set color style to tag icon depending on #inputColor', () => {
            component.inputIsTaggable = true;
            fixture.detectChanges();

            const iconElement: HTMLSpanElement = tagDiv.query(By.css('span.tag-icon')).nativeElement;

            // dark background, light font color
            component.inputColor = '#111111';
            fixture.detectChanges();
            expect(iconElement.style.color).toEqual('rgb(255, 255, 255)');

            // light background, dark font color
            component.inputColor = '#ffffff';
            fixture.detectChanges();
            expect(iconElement.style.color).toEqual('rgb(0, 0, 0)');
        });

        it('should set color style to tag text depending on #inputColor', () => {
            const textElement: HTMLSpanElement = tagDiv.query(By.css('span.tag-text')).nativeElement;
            expect(textElement.style.color).toBeFalsy(); // style is not present

            // dark background, light font color
            component.inputColor = '#111111';
            fixture.detectChanges();
            expect(textElement.style.color).toEqual('rgb(255, 255, 255)');

            // light background, dark font color
            component.inputColor = '#ffffff';
            fixture.detectChanges();
            expect(textElement.style.color).toEqual('rgb(0, 0, 0)');
        });
    });

    describe(`translates the tag name`, () => {
        beforeEach(() => {
            fixture.detectChanges(); // this needs to be called to initialize the Language-Decorator!!
        });

        it('should set text depending on inputBadge', () => {
            component.inputBadge = name;
            component.ngOnChanges({ inputBadge: new SimpleChange(null, name, true) });
            fixture.detectChanges();

            let textElement: DebugElement = tagDiv.query(By.css('span.tag-text'));
            let text: HTMLSpanElement = textElement.nativeElement;
            expect(text.innerText).toEqual(name);

            component.inputBadge = null;
            component.name = name;

            component.ngOnChanges({ name: new SimpleChange(null, name, true) });
            fixture.detectChanges();

            textElement = tagDiv.query(By.css('span.tag-text'));
            text = textElement.nativeElement;

            expect(text.innerText).toEqual(name);
        });

        it('should set text depending on name', () => {
            component.inputBadge = null;
            component.name = name;

            component.ngOnChanges({ name: new SimpleChange(null, name, true) });
            fixture.detectChanges();

            let textElement: DebugElement = tagDiv.query(By.css('span.tag-text'));
            let text: HTMLSpanElement = textElement.nativeElement;

            expect(text.innerText).toEqual(name);
        });

        it('should set text depending on names', () => {
            component.inputBadge = null;
            component.name = null;
            component.names = tagOne.names;

            component.ngOnChanges({ names: new SimpleChange(null, tagOne.names, true) });
            fixture.detectChanges();

            let textElement: DebugElement = tagDiv.query(By.css('span.tag-text'));
            let text: HTMLSpanElement = textElement.nativeElement;

            let translationService: MockTranslationService = TestBed.get(L10nTranslationService);
            let tagName: TerraTagNameInterface = tagOne.names.find((tag: TerraTagNameInterface) => {
                console.log('locale ' + translationService.getLocale().language);
                console.log('tag ' + tag.language);
                return tag.language === translationService.getLocale().language;
            });
            expect(text.innerText).toEqual(tagName.name);
        });
    });

    describe('closable', () => {
        it('should show close icon depending on isClosable', () => {
            let closeElement: DebugElement = tagDiv.query(By.css('span.icon-close'));
            expect(closeElement).toBeNull();

            component.isClosable = true;

            fixture.detectChanges();

            closeElement = tagDiv.query(By.css('span.icon-close'));

            expect(closeElement).toBeDefined();
        });

        it('should close tag on close icon click', (done: DoneFn) => {
            component.isClosable = true;
            component.tagId = 1337;

            fixture.detectChanges();

            component.closeTag.subscribe((id: number) => {
                expect(id).toBe(component.tagId);
                done();
            });

            let closeElement: DebugElement = tagDiv.query(By.css('span.icon-close'));

            closeElement.triggerEventHandler('click', null);
        });
    });
});
