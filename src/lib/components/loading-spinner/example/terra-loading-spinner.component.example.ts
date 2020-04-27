import { Component } from '@angular/core';
import { TerraLoadingSpinnerService } from '../service/terra-loading-spinner.service';

/**
 * @author mscharf
 */
@Component({
  selector: 'terra-loading-spinner-example',
  templateUrl: './terra-loading-spinner.component.example.html',
  styleUrls: ['./terra-loading-spinner.component.example.scss']
})
export class TerraLoadingSpinnerComponentExample {
  constructor(public _service: TerraLoadingSpinnerService) {}
}
