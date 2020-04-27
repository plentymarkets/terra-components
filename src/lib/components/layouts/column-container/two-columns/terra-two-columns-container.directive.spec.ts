import { TerraTwoColumnsContainerDirective } from './terra-two-columns-container.directive';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MockRouter } from '../../../../testing/mock-router';
import { TerraTwoColumnsContainerComponent } from './terra-two-columns-container.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockActivatedRoute } from '../../../../testing/mock-activated-route';

@Component({
  template: `<terra-2-col mobileRouting>
    <span left>Left</span>
    <span right>Right</span>
  </terra-2-col>`
})
class TwoColumnsContainerDirectiveTestComponent {}

describe('TerraTwoColumnsContainerDirective', () => {
  let fixture: ComponentFixture<TwoColumnsContainerDirectiveTestComponent>;
  let component: TwoColumnsContainerDirectiveTestComponent;
  let directive: TerraTwoColumnsContainerDirective;
  let twoColComponent: TerraTwoColumnsContainerComponent;
  const router: MockRouter = new MockRouter();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TerraTwoColumnsContainerDirective,
        TerraTwoColumnsContainerComponent,
        TwoColumnsContainerDirectiveTestComponent
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoColumnsContainerDirectiveTestComponent);
    component = fixture.componentInstance;
    twoColComponent = fixture.debugElement.query(By.css('terra-2-col')).componentInstance;
    let directiveDebugElement: DebugElement = fixture.debugElement.query(
      By.directive(TerraTwoColumnsContainerDirective)
    );
    directive = directiveDebugElement.injector.get(TerraTwoColumnsContainerDirective);

    fixture.detectChanges();
  });

  it(`should create the test component, terra-2-col and the directive`, () => {
    expect(component).toBeTruthy();
    expect(twoColComponent).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it(`should hide left but show right column on small devices by default`, () => {
    expect(twoColComponent._leftColumn).toContain('hidden-xs');
    expect(twoColComponent._rightColumn).not.toContain('hidden-xs');
  });

  it(`should hide left but show right column on small devices if routed to a route that is not redirected`, () => {
    router.sendEvent(new NavigationEnd(1, 'start/dashboard', 'start/dashboard'));
    expect(twoColComponent._leftColumn).toContain('hidden-xs');
    expect(twoColComponent._rightColumn).not.toContain('hidden-xs');
  });

  it(`should hide right but show left column on small devices if routed to a redirected route`, () => {
    router.sendEvent(new NavigationEnd(1, 'start', 'start/dashboard'));
    expect(twoColComponent._leftColumn).not.toContain('hidden-xs');
    expect(twoColComponent._rightColumn).toContain('hidden-xs');
  });

  it(`should not do anything if routed to a route that does not equal the basePath`, () => {
    const leftColumn: string = twoColComponent._leftColumn;
    const rightColumn: string = twoColComponent._rightColumn;

    router.sendEvent(new NavigationEnd(1, 'dummy', 'dummy'));

    // nothing has changed
    expect(twoColComponent._leftColumn).toEqual(leftColumn);
    expect(twoColComponent._rightColumn).toEqual(rightColumn);
  });
});
