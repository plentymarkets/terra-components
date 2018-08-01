import {
    Component,
    OnInit
} from '@angular/core';

@Component({
    selector: 'terra-text-input-example',
    styles:   [require('./terra-text-input.component.example.scss')],
    template: require('./terra-text-input.component.example.html'),
})
export class TerraTextInputComponentExample implements OnInit
{
    public readOnlyFieldText:string;
    public username:string;

    public ngOnInit():void
    {
        this.readOnlyFieldText = 'this text is not editable';
    }

    public showUsername():void
    {
        alert('Username: ' + this.username);
    }
}
