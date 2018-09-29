import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import * as Stopwatch from 'timer-stopwatch';
import { TranslationService } from 'angular-l10n';

@Component({
    selector: 'terra-stopwatch-example',
    styles:   [require('./terra-stopwatch.component.example.scss')],
    template: require('./terra-stopwatch.component.example.html'),
})
export class TerraStopwatchComponentExample implements OnInit
{
    constructor()
    {
    }

    public ngOnInit():void
    {
    }
}
