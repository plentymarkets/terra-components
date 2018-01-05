import {
    Component,
    Input,
    OnInit
} from '@angular/core';

@Component({
    selector: 'terra-tag',
    styles:   [require('./terra-tag.component.scss')],
    template: require('./terra-tag.component.html')
})
export class TerraTagComponent implements OnInit
{
    public get isActive():boolean
    {
        return this._isActive;
    }

    @Input() inputBadge:string;
    @Input() inputIsTagged:boolean;
    @Input() inputIsTaggable:boolean;
    @Input() inputCustomClass:string;
    @Input() inputIsClickable:boolean;

    private _isActive:boolean;

    constructor()
    {
        this.inputIsTagged = false;
        this.inputIsTaggable = false;
        this.inputCustomClass = null;
        this.inputIsClickable = false;
        this._isActive = false;
    }

    ngOnInit()
    {
    }

    private toggleActive():void
    {
        this._isActive = !this._isActive;
    }
}
