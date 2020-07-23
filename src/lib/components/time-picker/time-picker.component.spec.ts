import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { TimePickerComponent } from './time-picker.component';
import { TimePickerModule } from './time-picker.module';

fdescribe('TimePickerComponent', () =>
{
    let component:TimePickerComponent;
    let fixture:ComponentFixture<TimePickerComponent>;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            imports: [TimePickerModule]
        });
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TimePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
