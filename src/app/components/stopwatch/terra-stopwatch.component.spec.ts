import { TerraStopwatchComponent } from './terra-stopwatch.component';
import {
    async,
    ComponentFixture,
    discardPeriodicTasks,
    fakeAsync,
    TestBed,
    tick
} from '@angular/core/testing';
import { TerraButtonComponent } from '../buttons/button/terra-button.component';
import { TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../translation/l10n.config';
import Spy = jasmine.Spy;

describe('Component: TerraStopwatchComponent', () =>
{
    let component:TerraStopwatchComponent;
    let fixture:ComponentFixture<TerraStopwatchComponent>;
    const ticks:number = 2;
    const ticksInMilliseconds:number = ticks * 1000 + 1;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraStopwatchComponent,
                TerraButtonComponent
            ],
            imports:      [
                TooltipModule.forRoot(),
                FormsModule,
                HttpModule,
                HttpClientModule,
                LocalizationModule.forRoot(l10nConfig)
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraStopwatchComponent);
        component = fixture.componentInstance;
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should initialise its inputs and outputs', () =>
    {
        expect(component.autoPlay).toBe(false);
        expect(component.isSmall).toBe(false);
        expect(component.controls).toBe(false);
        expect(component.isRunning).toBe(false);
        expect(component.seconds).toBe(0);
    });

    it('should update #isRunning when starting, stopping and resetting the watch', () =>
    {
        component.start();
        expect(component.isRunning).toBe(true);
        component.stop();
        expect(component.isRunning).toBe(false);
        component.start();
        expect(component.isRunning).toBe(true);
        component.reset();
        expect(component.isRunning).toBe(false);
    });

    it('should reset seconds value when calling the #reset method', () =>
    {
        component.seconds = 2;
        expect(component.seconds).toBe(2);
        component.reset();
        expect(component.seconds).toBe(0);
    });

    it('should call the #stop method when calling #reset', () =>
    {
        let spy:Spy = spyOn(component, 'stop');
        component.reset();
        expect(spy).toHaveBeenCalled();
    });

    it('should start the watch when calling the #start method', fakeAsync(() =>
    {
        component.start();
        tick(ticksInMilliseconds);
        expect(component.seconds).toBe(ticks);

        discardPeriodicTasks();
    }));

    it('should start automatically if #autoPlay is true', fakeAsync(() =>
    {
        let spy:Spy = spyOn(component, 'start').and.callThrough();
        component.autoPlay = true;
        component.ngOnInit();

        expect(spy).toHaveBeenCalled();
        tick(ticksInMilliseconds);
        expect(component.seconds).toBeGreaterThan(0);

        discardPeriodicTasks();
    }));

    it('should not start automatically if #autoPlay is false', fakeAsync(() =>
    {
        let spy:Spy = spyOn(component, 'start').and.callThrough();
        component.autoPlay = false;
        component.ngOnInit();

        expect(spy).not.toHaveBeenCalled();
        tick(ticksInMilliseconds);
        expect(component.seconds).toBe(0);
    }));

    it('should start and stop', fakeAsync(() =>
    {
        component.start();
        tick(ticksInMilliseconds);
        expect(component.seconds).toBe(ticks);

        component.stop();
        tick(ticksInMilliseconds);
        expect(component.seconds).toEqual(ticks);
    }));
});
