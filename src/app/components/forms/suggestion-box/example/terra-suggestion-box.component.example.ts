import {
    Component,
    OnInit
} from '@angular/core';
import { TerraSuggestionBoxValueInterface } from '../data/terra-suggestion-box.interface';

@Component({
    selector: 'terra-suggestion-box-example',
    styles:   [require('./terra-suggestion-box.component.example.scss')],
    template: require('./terra-suggestion-box.component.example.html'),
})
export class TerraSuggestionBoxComponentExample implements OnInit
{
    protected textInputValue:string;
    protected iconList:Array<TerraSuggestionBoxValueInterface> = [];
    protected iconClass:string;

    protected contacts:Array<any> = [
        {
            name: 'Max Mustermann',
            age: 28
        },
        {
            name: 'Thomas Schmidt',
            age: 28
        },
        {
            name: 'Sabrina Meyer',
            age: 29
        }
    ];
    protected contactsSuggestions:Array<TerraSuggestionBoxValueInterface> = [];
    protected selectedContact:any;
    protected contactSelectionText:string;

    public ngOnInit():void
    {
        this.iconClass = 'icon-plugin';
        this.iconList.push
        (
            {
                value: 'icon-plugin',
                caption: 'icon-plugin'
            },
            {
                value: 'icon-delete',
                caption: 'icon-delete'
            },
            {
                value:'icon-add',
                caption: 'icon-add'
            },
            {
                value: 'icon-box_plus',
                caption: 'icon-box_plus'
            },
            {
                value: 'icon-flag_blue',
                caption: 'icon-flag_blue'
            }
        );

        this.contactsSuggestions = this.contacts.map(contact => {
            return {
                caption: contact.name,
                value: contact
            };
        });
    }
}
