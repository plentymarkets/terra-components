import {
    Component,
    OnInit
} from '@angular/core';
import { ColumnInterface } from './column.interface';
import { Language } from 'angular-l10n';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector:    'terra-column-settings',
    templateUrl: './terra-column-settings.component.html',
    styleUrls:   ['./terra-column-settings.component.scss']
})
export class TableColumnSettingsComponent implements OnInit
{
    public _columns:Array<ColumnInterface> = [];
    public _selectedColumns:Array<ColumnInterface> = [];

    @Language()
    public _lang:string;

    constructor(private _dialog:MatDialog)
    {
    }

    public ngOnInit():void
    {
    }

    private customize()
    {
        //do stuff
    }
}
