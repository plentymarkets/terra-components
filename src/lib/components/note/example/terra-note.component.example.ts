import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TerraOverlayComponent } from '../../layouts/overlay/terra-overlay.component';

@Component({
    selector:    'terra-note-example',
    styleUrls:   ['./terra-note.component.example.scss'],
    templateUrl: './terra-note.component.example.html'
})
export class TerraNoteComponentExample implements OnInit
{
    public _noteTextAndID:string;
    public _noteTextAndSelected:string;

    public ngOnInit():void
    {
        let defaultText:string = 'It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first ' +
                                 'victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret ' +
                                 'plans to the Empire\'s ultimate weapon, the Death Star, an armoured space station with enough power ' +
                                 'to destroy an entire planet. Pursued by the Empire\'s sinister agents, Princess Leia races home aboard ' +
                                 'her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy...';
        this._noteTextAndID = defaultText;
        this._noteTextAndSelected = defaultText;
    }
}
