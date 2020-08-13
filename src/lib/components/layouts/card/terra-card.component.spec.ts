import {
    Component,
    DebugElement
} from '@angular/core';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraCardComponent } from './terra-card.component';
import { By } from '@angular/platform-browser';

@Component({
    template: `
                  <terra-card>
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
class CardTestComponent
{
}

describe(`TerraCardComponent:`, () =>
{
    let component:CardTestComponent;
    let cardComponent:TerraCardComponent;
    let fixture:ComponentFixture<CardTestComponent>;
    let debugElement:DebugElement;

    const expectedImagePath:string = 'app/assets/images/logo_plenty.svg';
    const expectedIcon:string = 'icon-save';

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            declarations: [TerraCardComponent,
                           CardTestComponent]
        });
    });

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(CardTestComponent);
        component = fixture.componentInstance;
        cardComponent = fixture.debugElement.query(By.css('terra-card')).componentInstance;
        fixture.detectChanges();
        debugElement = fixture.debugElement;
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should initialize its inputs', () =>
    {
        expect(cardComponent.inputIsSelected).toBe(false);
        expect(cardComponent.inputImagePath).toBeUndefined();
        expect(cardComponent.inputPlaceholderIcon).toBeUndefined();
    });

    describe('in footer content section', () =>
    {
        let footerElement:DebugElement;

        beforeEach(() =>
            {
                footerElement = debugElement.query(By.css('div.card-footer'));
            }
        );

        it(`should <div> for footer be shown if content is given`, () =>
        {
            let ngContentElement:DebugElement = footerElement.query(By.css('p'));
            let footerContentElement:HTMLElement = ngContentElement.nativeElement;
            expect(footerElement).toBeTruthy();
            expect(cardComponent._viewChildFooter).toBeTruthy();
            expect(cardComponent._viewChildFooter.nativeElement.children.length).toBeGreaterThan(0);
            expect(footerContentElement.innerHTML).toEqual('card footer');
            expect(footerElement.nativeElement.hidden).toBe(false);
        });

        it('should set class selected depending on #inputIsSelected', () =>
        {
            let terraCardElement:DebugElement = debugElement.query(By.css('div.terra-card'));
            expect(footerElement.classes['selected']).toBeFalsy();
            expect(terraCardElement.classes['selected']).toBeFalsy();

            cardComponent.inputIsSelected = true;
            fixture.detectChanges();
            expect(footerElement.classes['selected']).toBeTruthy();
            expect(terraCardElement.classes['selected']).toBeTruthy();
        });
    });

    describe('in header content section', () =>
    {
        it(`should show <div> for header if content is given`, () =>
        {
            let headerElement:DebugElement = debugElement.query(By.css('div.card-header'));
            let ngContentElement:DebugElement = headerElement.query(By.css('p'));
            let headerContentElement:HTMLElement = ngContentElement.nativeElement;
            expect(headerElement).toBeTruthy();
            expect(cardComponent._viewChildHeader).toBeTruthy();
            expect(cardComponent._viewChildHeader.nativeElement.children.length).toBeGreaterThan(0);
            expect(headerContentElement.innerHTML).toEqual('card header');
            expect(headerElement.nativeElement.hidden).toBe(false);
        });
    });

    describe('in body content section', () =>
    {
        it(`should show <div> for body if content is given`, () =>
        {
            let bodyElement:DebugElement = debugElement.query(By.css('div.card-block'));
            let ngContentElement:DebugElement = bodyElement.query(By.css('p'));
            let bodyContentElement:HTMLElement = ngContentElement.nativeElement;
            expect(bodyElement).toBeTruthy();
            expect(cardComponent._viewChildHeader).toBeTruthy();
            expect(cardComponent._viewChildHeader.nativeElement.children.length).toBeGreaterThan(0);
            expect(bodyContentElement.innerHTML).toEqual('card content');
            expect(bodyElement.nativeElement.hidden).toBe(false);
        });
    });

    describe('in image section', () =>
    {
        let imageElement:DebugElement;
        let iconElement:DebugElement;

        it('should show image if #inputImagePath is set', () =>
        {
            cardComponent.inputImagePath = '';
            fixture.detectChanges();
            imageElement = debugElement.query(By.css('div.terra-card-image'));

            expect(imageElement).toBeFalsy();

            cardComponent.inputImagePath = expectedImagePath;
            fixture.detectChanges();
            imageElement = debugElement.query(By.css('div.terra-card-image'));
            expect(imageElement).toBeTruthy();
        });

        it('should show icon if #inputPlaceholderIcon is set', () =>
        {
            cardComponent.inputPlaceholderIcon = expectedIcon;
            fixture.detectChanges();
            iconElement = debugElement.query(By.css('div.terra-card-placeholder'));

            expect(iconElement).toBeTruthy();
            expect(iconElement.classes[expectedIcon]).toBe(true);
        });

        it('should show no image and no icon if #inputPlaceholderIcon and #inputPlaceholderIcon are not set', () =>
        {
            fixture.detectChanges();
            iconElement = debugElement.query(By.css('div.terra-card-placeholder'));
            imageElement = debugElement.query(By.css('div.terra-card-image'));
            expect(iconElement).toBeFalsy();
            expect(imageElement).toBeFalsy();
        });

        it('should show only the image if both #inputPlaceholderIcon and #inputPlaceholderIcon are set', () =>
        {
            cardComponent.inputPlaceholderIcon = expectedIcon;
            cardComponent.inputImagePath = expectedImagePath;
            fixture.detectChanges();
            imageElement = debugElement.query(By.css('div.terra-card-image'));
            iconElement = debugElement.query(By.css('div.terra-card-placeholder'));
            expect(imageElement).toBeTruthy();
            expect(iconElement).toBeFalsy();
        });

        it('should set style.background-image if an image is given', () =>
        {
            let backgroundImageElement:DebugElement;
            cardComponent.inputImagePath = expectedImagePath;
            fixture.detectChanges();
            backgroundImageElement = fixture.debugElement.query(By.css('div.terra-card-image'));
            expect(backgroundImageElement).toBeTruthy();
            expect(backgroundImageElement.styles['background-image']).toBe(`url(${expectedImagePath})`);
        });
    });
});
