import { RadioInputComponent } from './radio-input.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioGroupComponent } from './radio-group.component';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    template: `<tc-radio-group [ngModel]="1">
        <tc-radio-input></tc-radio-input>
    </tc-radio-group>`
})
class HostComponent {}

describe(`RadioInputComponent:`, () => {
    let fixture: ComponentFixture<HostComponent>;
    let component: HostComponent;
    let radioInputComponent: RadioInputComponent;
    let radioGroupComponent: RadioGroupComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [RadioInputComponent, RadioGroupComponent, HostComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HostComponent);
        component = fixture.componentInstance;
        radioInputComponent = fixture.debugElement.query(By.directive(RadioInputComponent)).componentInstance;
        radioGroupComponent = fixture.debugElement.query(By.directive(RadioGroupComponent)).componentInstance;

        fixture.detectChanges(); // initial bindings
    });

    it(`should create`, () => {
        expect(component).toBeTruthy();
        expect(radioInputComponent).toBeTruthy();
        expect(radioGroupComponent).toBeTruthy();
    });

    it(`should initialize its inputs`, () => {
        expect(radioInputComponent.label).toBeUndefined();
        expect(radioInputComponent.value).toBeUndefined();
        expect(radioInputComponent.disabled).toBe(false);
    });

    it(`should display the given #label text in the <label>`, () => {
        let labelElement: HTMLLabelElement = fixture.debugElement.query(By.css('label')).nativeElement;
        expect(labelElement.innerText).toBe('');

        const label: string = 'label';
        radioInputComponent.label = label;
        fixture.detectChanges();

        expect(labelElement.innerText.trim()).toBe(label.trim());
    });

    it(`should set [class.disabled] of the <label> depending on #disabled`, () => {
        let labelElement: HTMLLabelElement = fixture.debugElement.query(By.css('label')).nativeElement;
        expect(labelElement.classList.contains('disabled')).toBe(false);

        radioInputComponent.disabled = true;
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

            radioInputComponent.disabled = true;
            fixture.detectChanges();

            expect(inputElement.disabled).toBe(true);
        });

        it(`should set [value] attribute of the <input> depending on #value`, () => {
            const testValue: string = 'Test value';

            expect(inputElement.value).not.toBe(testValue);

            radioInputComponent.value = testValue;
            fixture.detectChanges();

            expect(inputElement.value).toBe(testValue);
        });

        it(`should set [name] attribute of the <input> depending on the group's #name property`, () => {
            const name: string = 'Test name';
            expect(inputElement.name).not.toBe(name);

            radioGroupComponent.name = name;
            fixture.detectChanges();

            expect(inputElement.name).toBe(name);
        });

        it(`should set [checked] attribute of the <input> if the group's #value equals #value`, () => {
            expect(inputElement.checked).toBe(false);

            const value: string = 'Test value';
            radioGroupComponent.value = value;
            radioInputComponent.value = value;
            fixture.detectChanges();

            expect(inputElement.checked).toBe(true);

            radioGroupComponent.value = 'Another value';
            fixture.detectChanges();

            expect(inputElement.checked).toBe(false);
        });

        it(`should assign #value to the group's #value if the <input>'s (change) event is triggered`, () => {
            const value: string = 'Test value';
            radioInputComponent.value = value;
            expect(radioGroupComponent.value).not.toBe(value);

            inputDebugElement.triggerEventHandler('change', {});

            expect(radioGroupComponent.value).toBe(value);
        });
    });
});
