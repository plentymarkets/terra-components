import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FloatTheadDirective } from './float-thead.directive';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import { MockActivatedRoute } from '../../../../testing/mock-activated-route';
import { MockRouter } from '../../../../testing/mock-router';

/* tslint:disable component-max-inline-declarations */
@Component({
    template: `
                  <table [floatThead]="true">
                      <thead>
                          <tr>
                              <th>Column1</th>
                              <th>Column2</th>
                              <th>Column3</th>
                              <th>Column4</th>
                              <th>Column5</th>
                          </tr>
                      </thead>
                  </table>`
})
class FloatTheadTestHostComponent
{
}
/* tslint:enable component-max-inline-declarations*/

describe('FloatTheadDirective', () =>
{
    let component:FloatTheadTestHostComponent;
    let fixture:ComponentFixture<FloatTheadTestHostComponent>;
    let directive:FloatTheadDirective;
    let tableComponent:HTMLTableElement;
    const router:MockRouter = new MockRouter();

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                FloatTheadDirective,
                FloatTheadTestHostComponent
            ],
            providers:    [
                {provide:     Router,
                    useValue: router
                },
                {provide:     ActivatedRoute,
                    useClass: MockActivatedRoute
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(FloatTheadTestHostComponent);
        component = fixture.componentInstance;

        directive = fixture.debugElement.query(By.directive(FloatTheadDirective)).injector.get(FloatTheadDirective);
        tableComponent = fixture.debugElement.query(By.directive(FloatTheadDirective)).componentInstance;
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
        expect(directive).toBeTruthy();
        expect(tableComponent).toBeTruthy();
    });
});
