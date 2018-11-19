import { TerraTwoColumnsContainerDirective } from './terra-two-columns-container.directive';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import { RouterStub } from '../../../../testing/router-stub';
import { TerraTwoColumnsContainerComponent } from './terra-two-columns-container.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRouteStub } from '../../../../testing/activated-route-stub';


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

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraTwoColumnsContainerDirective,
                TerraTwoColumnsContainerComponent,
                TwoColumnsContainerDirectiveTestComponent
            ],
            providers: [
                { provide: Router, useValue: RouterStub },
                { provide: ActivatedRoute, useValue: ActivatedRouteStub }
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TwoColumnsContainerDirectiveTestComponent);
        component = fixture.componentInstance;
        directive = fixture.debugElement.query(By.directive(TerraTwoColumnsContainerDirective)).nativeElement;
    });

    it('should create', () =>
    {
        expect(directive).toBeTruthy();
    });
});
