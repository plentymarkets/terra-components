import {
    Component,
    DebugElement
} from '@angular/core';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraCardComponent } from './terra-card.component';
import { By } from '@angular/platform-browser';

@Component({
    template : `
                  <terra-card inputImagePath="app/assets/images/logo_plenty.svg">
                      <div terra-card-header>
                          <p>card header</p>
                      </div>
                      <div terra-card-content>
                          <p>card content</p>
                      </div>
                      <div terra-card-footer>
                          <p>card footer</p>
                      </div>
                  </terra-card>
              `
})
class CardTestComponent{}

fdescribe('TerraCardComponent', () =>
{
    let component:CardTestComponent;
    let cardComponent:TerraCardComponent;
    let fixture:ComponentFixture<CardTestComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [TerraCardComponent,
                           CardTestComponent]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(CardTestComponent);
        component = fixture.componentInstance;
        cardComponent = fixture.debugElement.query(By.css('terra-card')).componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    // footer
    it('should div-element for footer be shown if content is given', () =>
    {
        let debugElement:DebugElement = fixture.debugElement;
        let footerElement:DebugElement = debugElement.query(By.css('div.card-footer'));
        let ngContentElement:DebugElement = footerElement.query(By.css('p'));
        expect(footerElement).toBeTruthy();
        expect(cardComponent.viewChildFooter).toBeTruthy();
        expect(cardComponent.viewChildFooter.nativeElement.children.length).toBeGreaterThan(0);
        expect(ngContentElement.nativeElement.textContent.trim()).toEqual('card footer');
    });

    it('should class selected is set depending on #inputIsSelected', () =>
    {
        cardComponent.inputIsSelected = true;
        fixture.detectChanges();
        let debugElement:DebugElement = fixture.debugElement;
        let selectedClass:DebugElement = debugElement.query(By.css('div.selected'));
        expect(selectedClass).toBeTruthy();
    });

    // header
    it('should div-element for header be shown if content is given', () =>
    {
        let debugElement:DebugElement = fixture.debugElement;
        let headerElement:DebugElement = debugElement.query(By.css('div.card-header'));
        let ngContentElement:DebugElement = headerElement.query(By.css('p'));
        expect(headerElement).toBeTruthy();
        expect(cardComponent.viewChildHeader).toBeTruthy();
        expect(cardComponent.viewChildHeader.nativeElement.children.length).toBeGreaterThan(0);
        expect(ngContentElement.nativeElement.textContent.trim()).toEqual('card header');
    });

    // block
    it('should div-element for content be shown if content is given', () =>
    {
        let debugElement:DebugElement = fixture.debugElement;
        let contentElement:DebugElement = debugElement.query(By.css('div.card-block'));
        let ngContentElement:DebugElement = contentElement.query(By.css('p'));
        expect(contentElement).toBeTruthy();
        expect(ngContentElement.nativeElement.textContent.trim()).toEqual('card content');
    });
});
