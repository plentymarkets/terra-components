import { LocalizationModule } from 'angular-l10n';
import { TerraStopwatchComponent } from './terra-stopwatch.component';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ElementRef } from '@angular/core';
import { MockElementRef } from '../../testing/mock-element-ref';
import { TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { l10nConfig } from '../../translation/l10n.config';
import { TerraButtonComponent } from '../../../';

describe('Component: TerraStopwatchComponent', () =>
{
    let component:TerraStopwatchComponent;
    let fixture:ComponentFixture<TerraStopwatchComponent>;

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
            ],
            providers:    [
                {
                    provide:  ElementRef,
                    useClass: MockElementRef
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraStopwatchComponent);
        component = fixture.componentInstance;

        component.reset();
        component.inputIsAutoPlay = false;

        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should auto run', (done:any) =>
    {
        component.inputIsAutoPlay = true;
        component.ngOnInit();
        setTimeout(() =>
        {
            expect(component.getTimeInMilliseconds()).toBeGreaterThan(0);
            done();
        }, 100);
    });

    it('should not auto run', () =>
    {
        component.inputIsAutoPlay = false;
        component.ngOnInit();
        expect(component.getTimeInMilliseconds()).toEqual(0);
    });

    it('should start and reset', (done:any) =>
    {
        component.start();
        setTimeout(() =>
        {
            expect(component.getTimeInMilliseconds()).toBeGreaterThan(0);
            component.reset();
            expect(component.getTimeInMilliseconds()).toEqual(0);
            done();
        }, 100);
    });

    it('should start and stop', (done:any) =>
    {
        component.start();
        let time:number;
        setTimeout(() =>
        {
            expect(component.getTimeInMilliseconds()).toBeGreaterThan(0);
            component.stop();
            time = component.getTimeInMilliseconds();
        }, 100);
        setTimeout(() =>
        {
            expect(component.getTimeInMilliseconds()).toEqual(time);
            done();
        }, 200);
    });
});
