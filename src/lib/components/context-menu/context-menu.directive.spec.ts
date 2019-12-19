import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {
    Component,
    DebugElement
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MockRouter } from '../../testing/mock-router';
import { ContextMenuDirective } from './context-menu.directive';

/* tslint:disable:component-max-inline-declarations */
@Component({
    template: `
                  <label [tcContextMenu]="contextMenu">test</label>
                  <ng-template #contextMenu>
                      <a>
                          <span class="left-icon icon-reload"></span>
                          reload
                      </a>
                      <a>
                          <span class="left-icon icon-copy"></span>
                          duplicate
                      </a>
                      <a>
                          <span class="left-icon icon-manual_search"></span>
                          searchInManual
                      </a>
                      <a>
                          <span class="left-icon icon-design_copy"></span>
                          closeOtherTabs
                      </a>
                      <a>
                          <span class="left-icon icon-favourite_active"></span>
                          addToFavourites
                      </a>
                      <a class="danger">
                          <span class="left-icon icon-favourite_inactive"></span>
                          removeFromFavourites
                      </a>
                  </ng-template>`
})
class ContextMenuDirectiveHostComponent
{
}

describe('ContextMenuDirective', () =>
{
    let component:ContextMenuDirectiveHostComponent;
    let fixture:ComponentFixture<ContextMenuDirectiveHostComponent>;
    let inputEl:DebugElement;
    let directive:ContextMenuDirective;
    const router:MockRouter = new MockRouter();

    beforeEach(() =>
    {
        fixture = TestBed.configureTestingModule({
            declarations: [
                ContextMenuDirective,
                ContextMenuDirectiveHostComponent
            ],
            providers:    [
                {
                    provide:  Router,
                    useValue: router
                }]
        }).createComponent(ContextMenuDirectiveHostComponent);

        component = fixture.componentInstance;
        directive = fixture.debugElement.query(By.directive(ContextMenuDirective)).injector.get(ContextMenuDirective);

        inputEl = fixture.debugElement.query(By.css('label'));
    });

    it('should create an instance', () =>
    {
        expect(component).toBeTruthy();
        expect(directive).toBeTruthy();
    });

    it('should initialize `tcContextMenu`', () =>
    {
        fixture.detectChanges();
        expect(directive.tcContextMenu).toBeTruthy();
    });
});
