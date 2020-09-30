import { Component, OnInit } from '@angular/core';
import { TerraSuggestionBoxValueInterface } from '../data/terra-suggestion-box.interface';

@Component({
    selector: 'terra-suggestion-box-example',
    styleUrls: ['./terra-suggestion-box.component.example.scss'],
    templateUrl: './terra-suggestion-box.component.example.html'
})
export class TerraSuggestionBoxComponentExample implements OnInit {
    public _textInputValue: string;
    public _iconList: Array<TerraSuggestionBoxValueInterface> = [];
    public _iconClass: string;

    public _contactsSuggestions: Array<TerraSuggestionBoxValueInterface> = [];
    public _selectedContact: { name: string; age: number };
    public _contactSelectionText: string;

    private _contacts: Array<{ name: string; age: number }> = [
        {
            name: 'Max',
            age: 26
        },
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

    public ngOnInit(): void {
        this._iconClass = 'icon-plugin';
        this._iconList.push(
            {
                value: 'icon-plugin',
                caption: 'icon-plugin'
            },
            {
                value: 'icon-delete',
                caption: 'icon-delete'
            },
            {
                value: 'icon-add',
                caption: 'icon-add'
            },
            {
                value: 'icon-box_plus',
                caption: 'icon-box_plus'
            },
            {
                value: 'icon-flag_blue',
                caption: 'icon-flag_blue'
            },
            {
                value: 'icon-anonymize',
                caption: 'icon-anonymize'
            },
            {
                value: 'icon-active_doc',
                caption: 'icon-active_doc'
            },
            {
                value: 'icon-active_fold_open',
                caption: 'icon-active_fold_open'
            },
            {
                value: 'icon-real',
                caption: 'icon-real'
            },
            {
                value: 'icon-plenty_base',
                caption: 'icon-plenty_base'
            },
            {
                value: 'icon-servicecenter',
                caption: 'icon-servicecenter'
            },
            {
                value: 'icon-colorpicker',
                caption: 'icon-colorpicker'
            },
            {
                value: 'icon-align_left',
                caption: 'icon-align_left'
            },
            {
                value: 'icon-device_mobile',
                caption: 'icon-device_mobile'
            },
            {
                value: 'icon-ebay',
                caption: 'icon-ebay'
            }
        );

        this._contactsSuggestions = this._contacts.map((contact: { name: string; age: number }) => {
            return {
                caption: contact.name,
                value: contact
            };
        });
    }
}
