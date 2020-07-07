import {
    Component,
    OnInit
} from '@angular/core';
import { ColumnInterface } from './column.interface';
import { TerraOverlayButtonInterface } from '../../..';

@Component({
    selector:    'terra-data-table-example',
    templateUrl: './terra-data-table.component.example.html',
    styleUrls:   ['./terra-data-table.component.example.scss']
})
export class TableColumnSettingsComponent implements OnInit
{
    public _columns:Array<ColumnInterface> = [];
    public _selectedColumns:Array<ColumnInterface> = [];
    public primaryButtonInterface:TerraOverlayButtonInterface;

    constructor()
    {
        this.initOverlay();
    }

    public ngOnInit():void
    {
    }

    private initOverlay():void
    {
        this.primaryButtonInterface = {
            icon:          'icon-confirm',
            caption:       'do stuff',
            isDisabled:    false,
            clickFunction: ():void => this.customize()
        };
    }

    private customize()
    {
        //do stuff
    }
}
