import { Component } from '@angular/core';
import { TerraLoadingSpinnerService } from '../service/terra-loading-spinner.service';

/**
 * @author mscharf
 */
@Component({
    selector: 'terra-loading-spinner-example',
    styles:   [require('./terra-loading-spinner.component.example.scss')],
    template: require('./terra-loading-spinner.component.example.html')
})
export class TerraLoadingSpinnerComponentExample
{
    constructor(protected service:TerraLoadingSpinnerService)
    {}
}
