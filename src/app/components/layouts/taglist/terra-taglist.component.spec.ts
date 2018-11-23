import { TerraTaglistComponent } from './terra-taglist.component';
import { tagList } from '../../../testing/mock-tags';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraTagComponent } from '../tag/terra-tag.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

fdescribe('TerraTaglistComponent', () =>
{
    let component:TerraTaglistComponent;
    let fixture:ComponentFixture<TerraTaglistComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [TerraTagComponent, TerraTaglistComponent]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraTaglistComponent);
        component = fixture.componentInstance;
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
    });

    it(`should initialise its inputs and outputs`, () =>
    {
        expect(component.inputTagList).toBeUndefined();
        expect(component.isReadOnly).toBeFalsy();
        expect(component.onCloseTag).toBeDefined();
    });

    describe(`with tags`, () =>
    {
        let tagDebugElements:Array<DebugElement>;
        beforeEach(() =>
        {
            component.inputTagList = tagList;
            fixture.detectChanges();
            tagDebugElements = fixture.debugElement.queryAll(By.css('terra-tag'));
        });

        it(`should render tags defined by #inputTagList`, () =>
        {
            let tags:Array<DebugElement> = fixture.debugElement.queryAll(By.css('terra-tag'));
            expect(tags.length).toEqual(tagList.length);
        });

        it(`should set isClosable depending on the tag's isClosable property if #isReadOnly is falsy`, () =>
        {
            let tags:Array<TerraTagComponent> = tagDebugElements.map((debugElement:DebugElement) => debugElement.componentInstance);

            tags.forEach((tag:TerraTagComponent, index:number) =>
            {
                expect(tag.isClosable).toEqual(tagList[index].isClosable);
            });
        });

        it(`should isClosable be falsy if #isReadOnly is true`, () =>
        {
            component.isReadOnly = true;
            fixture.detectChanges();

            tagDebugElements = fixture.debugElement.queryAll(By.css('terra-tag'));
            let tags:Array<TerraTagComponent> = tagDebugElements.map((debugElement:DebugElement) => debugElement.componentInstance);

            tags.forEach((tag:TerraTagComponent) =>
            {
                expect(tag.isClosable).toBeFalsy();
            });
        });
    });
});
