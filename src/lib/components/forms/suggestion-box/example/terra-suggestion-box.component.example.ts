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
            name: 'Max',
            age:  26
        },
        {
            name: 'Max Mustermann',
            age:  28
        },
        {
            name: 'Thomas Schmidt',
            age:  28
        },
        {
            name: 'Sabrina Meyer',
            age:  29
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
                value:   'icon-plugin',
                caption: 'icon-plugin'
            },
            {
                value:   'icon-delete',
                caption: 'icon-delete'
            },
            {
                value:   'icon-add',
                caption: 'icon-add'
            },
            {
                value:   'icon-box_plus',
                caption: 'icon-box_plus'
            },
            {
                value:   'icon-flag_blue',
                caption: 'icon-flag_blue'
            },
            {
                value:   'icon-anonymize',
                caption: 'icon-anonymize'
            },
            {
                value:   'icon-active_doc',
                caption: 'icon-active_doc'
            },
            {
                value:   'icon-active_fold_open',
                caption: 'icon-active_fold_open'
            },
            {
                value:   'icon-real',
                caption: 'icon-real'
            },
            {
                value:   'icon-plenty_base',
                caption: 'icon-plenty_base'
            },
            {
                value:   'icon-servicecenter',
                caption: 'icon-servicecenter'
            },
            {
                value:   'icon-colorpicker',
                caption: 'icon-colorpicker'
            },
            {
                value:   'icon-align_left',
                caption: 'icon-align_left'
            },
            {
                value:   'icon-device_mobile',
                caption: 'icon-device_mobile'
            },
            {
                value:   'icon-ebay',
                caption: 'icon-ebay'
            }
        );

        this.contactsSuggestions = this.contacts.map((contact:any) =>
        {
            return {
                caption: contact.name,
                value:   contact
            };
        });
    }
}
