import {
    Component,
    OnInit
} from '@angular/core';
import { TerraButtonInterface } from '../../button/data/terra-button.interface';
import { TerraSimpleTableCellInterface } from '../../../tables/simple/cell/terra-simple-table-cell.interface';
import { TerraSimpleTableRowInterface } from '../../../tables/simple/row/terra-simple-table-row.interface';


@Component({
    selector: 'terra-button-with-options-example',
    styles:   [require('./terra-button-with-options.component.example.scss')],
    template: require('./terra-button-with-options.component.example.html'),
})
export class TerraButtonWithOptionsComponentExample implements OnInit
{
    protected buttonOptionList:Array<TerraButtonInterface> = [];
    protected simpleTableHeaderList:Array<TerraSimpleTableCellInterface> = [];
    protected simpleTableRowList:Array<TerraSimpleTableRowInterface<any>> = [];
    private listEntryCounter:number = 0;

    public ngOnInit():void
    {
        this.buttonOptionList.push({
            caption:       'Add new account',
            icon:          'icon-add',
            clickFunction: ():void => this.addAccount()
        });
        this.buttonOptionList.push({
            caption:       'Delete all accounts',
            icon:          'icon-delete',
            clickFunction: ():void => this.deleteAllAccounts()
        });
        this.simpleTableHeaderList.push(
            {
                caption: 'id'
            },
            {
                caption: 'username'
            },
            {
                caption: 'mail'
            });
        while(this.listEntryCounter < 5)
        {
            this.addAccount();
        }
    }

    public addAccount():void
    {
        let userName:string = 'user' + Date.now();
        this.simpleTableRowList.push(
            {
                cellList:
                    [
                        {
                            caption: this.listEntryCounter++,
                        },
                        {
                            caption: userName,
                            icon:    'icon-user_my_account'
                        },
                        {
                            caption: userName + '@plentymarkets.com',
                            icon:    'icon-email_service'
                        },

                    ]
            });
    }

    public deleteAllAccounts():void
    {
        this.simpleTableRowList = [];
        this.listEntryCounter = 0;
    }
}
