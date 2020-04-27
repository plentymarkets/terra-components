import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { StringHelper } from './string.helper';

/**
 * @deprecated Please set {@link TooltipDirective#onlyEllipsisTooltip} to true to get the same Result.
 */
@Directive({
  selector: '[terraLabelTooltip]'
})
export class TerraLabelTooltipDirective implements OnInit {
  @Input()
  public nameOfInput: string;

  @Input()
  public tooltipTextOfInput: string;

  @Output()
  public tooltipOfInputDisabledChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public tooltipDisabledChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public tooltipTextChange: EventEmitter<string> = new EventEmitter<string>();

  private _tooltipOfInputDisabled: boolean;

  private _tooltipDisabled: boolean;

  private _tooltipText: string;

  @Input()
  public get tooltipOfInputDisabled(): boolean {
    return this._tooltipOfInputDisabled;
  }

  public set tooltipOfInputDisabled(value: boolean) {
    this._tooltipOfInputDisabled = value;
    this.tooltipOfInputDisabledChange.emit(value);
  }

  @Input()
  public get tooltipDisabled(): boolean {
    return this._tooltipDisabled;
  }

  public set tooltipDisabled(value: boolean) {
    this._tooltipDisabled = value;
    this.tooltipDisabledChange.emit(value);
  }

  @Input()
  public get tooltipText(): string {
    return this._tooltipText;
  }

  public set tooltipText(value: string) {
    this._tooltipText = value;
    this.tooltipTextChange.emit(value);
  }

  constructor(private _elementRef: ElementRef) {}

  public ngOnInit(): void {
    this._tooltipOfInputDisabled = StringHelper.isNullUndefinedOrEmpty(this.tooltipTextOfInput);
  }

  @HostListener('mouseover')
  public onMouseOver(): void {
    let curOverflow: string = this._elementRef.nativeElement.style.overflow;

    // 'hide' overflow to get correct scrollWidth
    if (!curOverflow || curOverflow === 'visible') {
      this._elementRef.nativeElement.style.overflow = 'hidden';
    }

    // check if is overflowing
    let isOverflowing: boolean =
      this._elementRef.nativeElement.clientWidth < this._elementRef.nativeElement.scrollWidth;

    // 'reset' overflow to initial state
    this._elementRef.nativeElement.style.overflow = curOverflow;

    this.tooltipText = this.nameOfInput;

    this.tooltipDisabled = !isOverflowing;
    this.tooltipOfInputDisabled = !this.tooltipDisabled;
  }

  @HostListener('mouseout')
  public onMouseOut(): void {
    this.tooltipText = null;
    this.tooltipDisabled = true;
    this.tooltipOfInputDisabled = StringHelper.isNullUndefinedOrEmpty(this.tooltipTextOfInput);
  }
}
