import { TerraTwoColumnsContainerDirective } from './terra-two-columns-container.directive';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {
    ActivatedRoute,
    NavigationEnd,
    Router
} from '@angular/router';
import { MockRouter } from '../../../../testing/mock-router';
import {
    TerraTwoColumnsContainerComponent
} from './terra-two-columns-container.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockActivatedRoute } from '../../../../testing/mock-activated-route';


@Component({
    template: `<terra-2-col mobileRouting>
        <span left>Left</span>
        <span right>Right</span>
    </terra-2-col>`
})
class TwoColumnsContainerDirectiveTestComponent {}


fdescribe('TerraTwoColumnsContainerDirective', () =>
{
    let fixture:ComponentFixture<TwoColumnsContainerDirectiveTestComponent>;
    let component:TwoColumnsContainerDirectiveTestComponent;
    let directive:TerraTwoColumnsContainerDirective;
    let twoColComponent:TerraTwoColumnsContainerComponent;
    const activatedRoute:MockActivatedRoute = new MockActivatedRoute();
    const router:MockRouter = new MockRouter();

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraTwoColumnsContainerDirective,
                TerraTwoColumnsContainerComponent,
                TwoColumnsContainerDirectiveTestComponent
            ],
            providers:    [
                { provide: Router, useValue: router },
                { provide: ActivatedRoute, useValue: activatedRoute }
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TwoColumnsContainerDirectiveTestComponent);
        component = fixture.componentInstance;
        directive = fixture.debugElement.query(By.directive(TerraTwoColumnsContainerDirective)).nativeElement;
        twoColComponent = fixture.debugElement.query(By.css('terra-2-col')).nativeElement;

        fixture.detectChanges();
    });

    it('should create the test component, terra-2-col and the directive', () =>
    {
        expect(component).toBeTruthy();
        expect(twoColComponent).toBeTruthy();
        expect(directive).toBeTruthy();
    });

    it(`should hide left column on small devices if it is routed to a redirected route`, () =>
    {
        router.sendEvent(new NavigationEnd(1, 'hmm', 'hmm2'));
        //directive.ngOnInit();
        // right column should be hidden
        //expect(twoColComponent.leftColumn).toContain(TwoColumnHelper.leftRightHiddenXS());
    });

    xit(`updates the #basePath if the route data changes`, () =>
    {

    });
});
