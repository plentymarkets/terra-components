import {
    Component,
    OnInit
} from "@angular/core";
import { TerraSuggestionBoxValueInterface } from '../data/terra-suggestion-box.interface';

@Component({
    selector: 'terra-suggestion-box-example',
    styles:   [require('./terra-suggestion-box.component.example.scss')],
    template: require('./terra-suggestion-box.component.example.html'),
})
export class TerraSuggestionBoxComponentExample implements OnInit
{
    private _iconList:Array<TerraSuggestionBoxValueInterface> = [];
    private _iconClass: string;
    ngOnInit()
    {
        this._iconClass = "icon-plugin";
        this._iconList.push
        (
            {
                value: "icon-plugin",
                caption: "icon-plugin"
            },
            {
                value: "icon-delete",
                caption: "icon-delete"
            },
            {
                value:"icon-add",
                caption: "icon-add"
            },
            {
                value: "icon-box_plus",
                caption: "icon-box_plus"
            },
            {
                value: "icon-flag_blue",
                caption: "icon-flag_blue"
            }
        );
    }

}