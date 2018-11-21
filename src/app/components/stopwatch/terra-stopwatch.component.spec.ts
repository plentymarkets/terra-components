import { TerraStopwatchComponent } from './terra-stopwatch.component';
import Spy = jasmine.Spy;
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraButtonComponent } from '../buttons/button/terra-button.component';
import { TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../translation/l10n.config';

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
        jasmine.clock().uninstall();
        jasmine.clock().install();
    });

    afterEach(() =>
    {
        jasmine.clock().uninstall();
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

    it('should start the watch when calling the #start method', () =>
    {
        component.start();
        jasmine.clock().tick(ticksInMilliseconds);
        expect(component.seconds).toBe(ticks);
    });

    it('should start automatically if #autoPlay is true', () =>
    {
        let spy:Spy = spyOn(component, 'start').and.callThrough();
        component.autoPlay = true;
        component.ngOnInit();

        expect(spy).toHaveBeenCalled();
        jasmine.clock().tick(ticksInMilliseconds);
        expect(component.seconds).toBeGreaterThan(0);
    });

    it('should not start automatically if #autoPlay is false', () =>
    {
        let spy:Spy = spyOn(component, 'start').and.callThrough();
        component.autoPlay = false;
        component.ngOnInit();

        expect(spy).not.toHaveBeenCalled();
        jasmine.clock().tick(ticksInMilliseconds);
        expect(component.seconds).toBe(0);
    });

    it('should start and stop', () =>
    {
        component.start();
        jasmine.clock().tick(ticksInMilliseconds);
        expect(component.seconds).toBe(ticks);

        component.stop();
        jasmine.clock().tick(ticksInMilliseconds);
        expect(component.seconds).toEqual(ticks);
    });
});
