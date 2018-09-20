import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TerraOverlayComponent } from '../../layouts/overlay/terra-overlay.component';

@Component({
    selector: 'terra-note-example',
    styles:   [require('./terra-note.component.example.scss')],
    template: require('./terra-note.component.example.html')
})
export class TerraNoteComponentExample implements OnInit
{
    @ViewChild('overlay')
    public overlay:TerraOverlayComponent;

    protected noteTextAndID:string;
    protected noteTextAndSelected:string;
    protected noteTextDynamicExample:string;
    protected editorText:string;

    public ngOnInit():void
    {
        let defaultText:string = 'It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first ' +
                                 'victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret ' +
                                 'plans to the Empire\'s ultimate weapon, the Death Star, an armoured space station with enough power ' +
                                 'to destroy an entire planet. Pursued by the Empire\'s sinister agents, Princess Leia races home aboard ' +
                                 'her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy...';
        this.noteTextAndID = defaultText;
        this.noteTextAndSelected = defaultText;
        this.noteTextDynamicExample = defaultText;
        this.editorText = this.noteTextDynamicExample;
    }

    public showOverlay():void
    {
        this.overlay.showOverlay();
    }

    public saveText(text:string):void
    {
        this.noteTextDynamicExample = text;
        this.overlay.hideOverlay();
    }
}
