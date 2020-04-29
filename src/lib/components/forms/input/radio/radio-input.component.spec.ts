import { RadioInputComponent } from './radio-input.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioGroupComponent } from './radio-group.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe(`RadioInputComponent:`, () => {
    let fixture: ComponentFixture<RadioInputComponent>;
    let component: RadioInputComponent;
    let radioGroupComponent: RadioGroupComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RadioInputComponent],
            providers: [
                {
                    provide: RadioGroupComponent,
                    useValue: { value: 1 }
                }
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioInputComponent);
        component = fixture.componentInstance;
        radioGroupComponent = TestBed.get(RadioGroupComponent);
    });

    it(`should create`, () => {
        expect(component).toBeTruthy();
    });

    it(`should initialize its inputs`, () => {
        expect(component.label).toBeUndefined();
        expect(component.value).toBeUndefined();
        expect(component.disabled).toBe(false);
    });

    it(`should display the given #label text in the <label>`, () => {
        let labelElement: HTMLLabelElement = fixture.debugElement.query(By.css('label')).nativeElement;
        expect(labelElement.innerText).toBe('');

        const label: string = 'label';
        component.label = label;
        fixture.detectChanges();

        expect(labelElement.innerText.trim()).toBe(label.trim());
    });

    it(`should set [class.disabled] of the <label> depending on #disabled`, () => {
        let labelElement: HTMLLabelElement = fixture.debugElement.query(By.css('label')).nativeElement;
        expect(labelElement.classList.contains('disabled')).toBe(false);

        component.disabled = true;
        fixture.detectChanges();

        expect(labelElement.classList.contains('disabled')).toBe(true);
    });

    it(`should set [class.inline] of the <label> depending on the group's #inline property`, () => {
        let labelElement: DebugElement = fixture.debugElement.query(By.css('label'));
        expect(labelElement.classes.hasOwnProperty('inline')).toBe(false);

        radioGroupComponent.inline = true;

        fixture.detectChanges();

        expect(labelElement.classes['inline']).toBe(true);
    });

    describe(``, () => {
        let inputDebugElement: DebugElement;
        let inputElement: HTMLInputElement;
        beforeEach(() => {
            inputDebugElement = fixture.debugElement.query(By.css('input[type="radio"]'));
            inputElement = inputDebugElement.nativeElement;
        });

        it(`should set the <label>'s [for] and the <input>'s [id] attribute correctly`, () => {
            let labelElement: HTMLLabelElement = fixture.debugElement.query(By.css('label')).nativeElement;
            fixture.detectChanges();
            expect(inputElement.id).toMatch(/radio-input#\d+/);
            expect(labelElement.htmlFor).toEqual(inputElement.id);
        });

        it(`should set [disabled] attribute of the <input> depending on #disabled`, () => {
            expect(inputElement.disabled).toBe(false);

            component.disabled = true;
            fixture.detectChanges();

            expect(inputElement.disabled).toBe(true);
        });

        it(`should set [value] attribute of the <input> depending on #value`, () => {
            const testValue: string = 'Test value';

            expect(inputElement.value).not.toBe(testValue);

            component.value = testValue;
            fixture.detectChanges();

            expect(inputElement.value).toBe(testValue);
        });

        it(`should set [name] attribute of the <input> depending on the group's #name property`, () => {
            expect(inputElement.name).toBe('');

            const name: string = 'Test name';
            radioGroupComponent.name = name;
            fixture.detectChanges();

            expect(inputElement.name).toBe(name);
        });

        it(`should set [checked] attribute of the <input> if the group's #value equals #value`, () => {
            expect(inputElement.checked).toBe(false);

            const value: string = 'Test value';
            component.value = value;
            radioGroupComponent.value = value;
            fixture.detectChanges();

            expect(inputElement.checked).toBe(true);

            radioGroupComponent.value = 'Another value';
            fixture.detectChanges();

            expect(inputElement.checked).toBe(false);
        });

        it(`should assign #value to the group's #value if the <input>'s (change) event is triggered`, () => {
            const value: string = 'Test value';
            component.value = value;
            expect(radioGroupComponent.value).not.toBe(value);

            inputDebugElement.triggerEventHandler('change', {});

            expect(radioGroupComponent.value).toBe(value);
        });
    });
});
