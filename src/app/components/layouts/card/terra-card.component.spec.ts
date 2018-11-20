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
    template: `
                  <terra-card inputPlaceholderIcon="icon-save">
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

    const expectedImagePath:string = 'app/assets/images/logo_plenty.svg';
    const expectedIcon:string = 'icon-save';

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

    afterEach(() =>
    {
        cardComponent.inputPlaceholderIcon = null;
        cardComponent.inputImagePath = null;
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

    it('should set class selected depending on #inputIsSelected', () =>
    {
        let debugElement:DebugElement = fixture.debugElement;
        let footerElement:DebugElement = debugElement.query(By.css('div.card-footer'));
        expect(footerElement.classes['selected']).toBeFalsy();

        cardComponent.inputIsSelected = true;
        fixture.detectChanges();
        expect(footerElement.classes['selected']).toBeTruthy();
    });

    // header
    it('should show div-element for header if content is given', () =>
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
    it('should show div-element for content if content is given', () =>
    {
        let debugElement:DebugElement = fixture.debugElement;
        let contentElement:DebugElement = debugElement.query(By.css('div.card-block'));
        let ngContentElement:DebugElement = contentElement.query(By.css('p'));
        expect(contentElement).toBeTruthy();
        expect(ngContentElement.nativeElement.textContent.trim()).toEqual('card content');
    });

    // image
    it('should show image if #inputImagePath is set', () =>
    {
        let debugElement:DebugElement;
        let imageElement:DebugElement;

        cardComponent.inputImagePath = '';
        fixture.detectChanges();
        debugElement = fixture.debugElement;
        imageElement = debugElement.query(By.css('div.terra-card-image'));
        expect(imageElement).toBeFalsy();

        cardComponent.inputImagePath = expectedImagePath;
        fixture.detectChanges();
        imageElement = debugElement.query(By.css('div.terra-card-image'));
        expect(imageElement).toBeTruthy();
    });

    it('should show icon if #inputPlaceholderIcon is set', () =>
    {
        let debugElement:DebugElement = fixture.debugElement;
        let iconElement:DebugElement = debugElement.query(By.css('div.terra-card-placeholder'));
        expect(iconElement).toBeTruthy();
        expect(cardComponent.inputPlaceholderIcon).toEqual(expectedIcon);
    });

    it('should show no image and no icon if #inputPlaceholderIcon and #inputPlaceholderIcon are not set', () =>
    {
        let debugElement:DebugElement = fixture.debugElement;
        let imageElement:DebugElement;
        let iconElement:DebugElement;

        cardComponent.inputPlaceholderIcon = cardComponent.inputImagePath = null;
        fixture.detectChanges();
        iconElement = debugElement.query(By.css('div.terra-card-placeholder'));
        imageElement = debugElement.query(By.css('div.terra-card-image'));
        expect(iconElement).toBeFalsy();
        expect(imageElement).toBeFalsy();
    });

    it('should show only the image if both #inputPlaceholderIcon and #inputPlaceholderIcon are set', () =>
    {
        let debugElement:DebugElement = fixture.debugElement;
        let imageElement:DebugElement;
        let iconElement:DebugElement;

        cardComponent.inputPlaceholderIcon = expectedIcon;
        cardComponent.inputImagePath = expectedImagePath;
        fixture.detectChanges();
        imageElement = debugElement.query(By.css('div.terra-card-image'));
        iconElement = debugElement.query(By.css('div.terra-card-placeholder'));
        expect(imageElement).toBeTruthy();
        expect(iconElement).toBeFalsy();
    });
});
