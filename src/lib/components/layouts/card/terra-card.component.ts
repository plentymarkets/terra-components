import { AfterContentChecked, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { StringHelper } from '../../../helpers/string.helper';

@Component({
  selector: 'terra-card',
  styleUrls: ['./terra-card.component.scss'],
  templateUrl: './terra-card.component.html'
})
export class TerraCardComponent implements AfterContentChecked {
  @ViewChild('header', { static: true })
  public _viewChildHeader: ElementRef;

  @ViewChild('body', { static: true })
  public _viewChildBody: ElementRef;

  @ViewChild('footer', { static: true })
  public _viewChildFooter: ElementRef;

  /**
   * @description an url to set for the background image of the card
   */
  @Input()
  public inputImagePath: string;

  /**
   * @description set an icon class if there is no image path set
   */
  @Input()
  public inputPlaceholderIcon: string;

  /**
   * @description set a class to show footer and wrapping div element as selected
   */
  @Input()
  public inputIsSelected: boolean = false;

  public _showHeader: boolean = false;
  public _showBody: boolean = false;
  public _showFooter: boolean = false;

  public ngAfterContentChecked(): void {
    this._showHeader = this._viewChildHeader.nativeElement.children.length > 0;
    this._showBody = this._viewChildBody.nativeElement.children.length > 0;
    this._showFooter = this._viewChildFooter.nativeElement.children.length > 0;
  }

  public get _hasImageOrPlaceholderIcon(): boolean {
    return (
      !StringHelper.isNullUndefinedOrEmpty(this.inputImagePath) ||
      !isNullOrUndefined(this.inputPlaceholderIcon)
    );
  }
}
