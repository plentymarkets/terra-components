import {
    Component,
    OnInit
} from '@angular/core';

@Component({
    selector: 'terra-text-input-example',
    styleUrls:   ['./terra-text-input.component.example.scss'],
    templateUrl: './terra-text-input.component.example.html',
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
