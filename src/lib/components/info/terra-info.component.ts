import { Component, Input } from '@angular/core';
import { TerraPlacementEnum } from '../../helpers/enums/terra-placement.enum';

@Component({
  selector: 'terra-info',
  styleUrls: ['./terra-info.component.scss'],
  templateUrl: './terra-info.component.html'
})
export class TerraInfoComponent {
  /**
   * @deprecated since v4. Is replaced by the TooltipDirective and will be removed with the next major version.
   */
  @Input()
  public textPlacement: TerraPlacementEnum;

  @Input()
  public isDisabled: boolean;

  @Input()
  public text: string;

  constructor() {
    this.textPlacement = TerraPlacementEnum.TOP;
  }
}
