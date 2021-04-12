import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberInputComponent } from './number-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NumberInputComponent', () => {
    let fixture: ComponentFixture<NumberInputComponent>;
    let component: NumberInputComponent;
    let inputDebugElement: DebugElement;
    let inputElement: HTMLInputElement;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [MatFormFieldModule, MatInputModule, NoopAnimationsModule],
            declarations: [NumberInputComponent]
        }).createComponent(NumberInputComponent);

        component = fixture.componentInstance;
        inputDebugElement = fixture.debugElement.query(By.css('input'));
        inputElement = inputDebugElement.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
