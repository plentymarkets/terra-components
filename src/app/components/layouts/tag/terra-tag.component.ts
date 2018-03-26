import {
    Component,
    Input
} from '@angular/core';

@Component({
    selector: 'terra-tag',
    styles:   [require('./terra-tag.component.scss')],
    template: require('./terra-tag.component.html')
})
export class TerraTagComponent
{
    @Input()
    public inputBadge:string;

    @Input()
    public inputIsTagged:boolean;

    @Input()
    public inputIsTaggable:boolean;

    @Input()
    public inputCustomClass:string;

    constructor()
    {
        this.inputIsTagged = false;
        this.inputIsTaggable = false;
        this.inputCustomClass = null;
    }
}
