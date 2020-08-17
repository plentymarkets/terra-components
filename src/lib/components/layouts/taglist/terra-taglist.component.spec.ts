import { TerraTaglistComponent } from './terra-taglist.component';
import { tagList } from '../../../testing/mock-tags';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerraTagComponent } from '../tag/terra-tag.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TerraTagInterface } from '../tag/data/terra-tag.interface';
import { MockTranslationModule } from '../../../testing/mock-translation-module';

describe('TerraTaglistComponent', () => {
    let component: TerraTaglistComponent;
    let fixture: ComponentFixture<TerraTaglistComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TerraTagComponent, TerraTaglistComponent],
            imports: [MockTranslationModule]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TerraTaglistComponent);
        component = fixture.componentInstance;
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it(`should initialize its inputs and outputs`, () => {
        expect(component.inputTagList).toBeUndefined();
        expect(component.isReadOnly).toBeFalsy();
        expect(component.onCloseTag).toBeDefined();
        expect(component.closeTag).toBeDefined();
    });

    describe(`with tags`, () => {
        let tagDebugElements: Array<DebugElement>;
        beforeEach(() => {
            component.inputTagList = tagList;
            fixture.detectChanges();
            tagDebugElements = fixture.debugElement.queryAll(By.css('terra-tag'));
        });

        it(`should render tags defined by #inputTagList`, () => {
            expect(tagDebugElements.length).toEqual(tagList.length);
        });

        it(`should set isClosable depending on the tag's isClosable property if #isReadOnly is falsy`, () => {
            let tags: Array<TerraTagComponent> = tagDebugElements.map(
                (debugElement: DebugElement) => debugElement.componentInstance
            );

            tags.forEach((tag: TerraTagComponent, index: number) => {
                expect(tag.isClosable).toEqual(tagList[index].isClosable);
            });
        });

        it(`should isClosable be falsy if #isReadOnly is true`, () => {
            component.isReadOnly = true;
            fixture.detectChanges();

            tagDebugElements = fixture.debugElement.queryAll(By.css('terra-tag'));
            let tags: Array<TerraTagComponent> = tagDebugElements.map(
                (debugElement: DebugElement) => debugElement.componentInstance
            );

            tags.forEach((tag: TerraTagComponent) => {
                expect(tag.isClosable).toBeFalsy();
            });
        });

        it(`should properly map the tag interface's properties to the tag component's inputs`, () => {
            let tags: Array<TerraTagComponent> = tagDebugElements.map(
                (debugElement: DebugElement) => debugElement.componentInstance
            );

            tags.forEach((tag: TerraTagComponent, index: number) => {
                let tagInterface: TerraTagInterface = tagList[index];

                expect(tag.tagId).toEqual(tagInterface.id);
                expect(tag.inputBadge).toEqual(tagInterface.name);
                expect(tag.name).toEqual(tagInterface.name);
                expect(tag.inputIsTaggable).toEqual(tagInterface.isTaggable);
                expect(tag.inputIsTagged).toEqual(tagInterface.isTagged);
                expect(tag.inputCustomClass).toEqual(tagInterface.customClass);
                expect(tag.inputColor).toEqual(tagInterface.color);
                expect(tag.isClosable).toEqual(tagInterface.isClosable && !component.isReadOnly);
                expect(tag.names).toEqual(tagInterface.names);
            });
        });

        it(`should emit on #onCloseTag if a tag component emits on its #onCloseTag-Emitter`, () => {
            let tagToCloseDeprecated: number = 0;
            let tagToClose: number = 0;
            component.onCloseTag.subscribe((tagId: number) => (tagToCloseDeprecated = tagId));
            component.closeTag.subscribe((tagId: number) => (tagToClose = tagId));

            let tags: Array<TerraTagComponent> = tagDebugElements.map(
                (debugElement: DebugElement) => debugElement.componentInstance
            );
            let tagDeprecated: TerraTagComponent = tags[0];
            let tag: TerraTagComponent = tags[0];
            tagDeprecated.onCloseTag.emit(tagDeprecated.tagId);
            tag.closeTag.emit(tag.tagId);

            expect(tagToCloseDeprecated).not.toBe(0);
            expect(tagToCloseDeprecated).toBe(tagDeprecated.tagId);
            expect(tagToClose).not.toBe(0);
            expect(tagToClose).toBe(tag.tagId);
        });
    });
});
