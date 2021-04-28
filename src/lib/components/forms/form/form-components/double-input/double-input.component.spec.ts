import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleInputComponent } from './double-input.component';

describe('DoubleInputComponent', () => {
    let component: DoubleInputComponent;
    let fixture: ComponentFixture<DoubleInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DoubleInputComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DoubleInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
