import {
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { TerraPlacementEnum } from '../../helpers/enums/terra-placement.enum';

@Component({
    selector: 'terra-info',
    styles:   [require('./terra-info.component.scss')],
    template: require('./terra-info.component.html')
})
export class TerraInfoComponent implements OnInit
{
    @Input()
    public textPlacement:TerraPlacementEnum;

    @Input()
    public isDisabled:boolean;

    @Input()
    public text:string;

    constructor()
    {
        this.textPlacement = TerraPlacementEnum.TOP;
    }

    public ngOnInit():void
    {
        this.text = this.isDisabled ? '' : this.text;
    }
}
