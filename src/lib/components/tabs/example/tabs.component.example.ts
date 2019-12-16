import { Component } from '@angular/core';
import { noop } from 'rxjs';

@Component({
    selector:    'tc-tabs-component-example',
    templateUrl: './tabs.component.example.html',
    styleUrls:   ['./tabs.component.example.scss']
})
export class TabsComponentExample
{
    public _links:Array<string> = ['First',
                                   'Second',
                                   'Third'];
    public _activeLink:string = this._links[0];

    public _show():() => void
    {
        return ():void => alert('Context-menu show');
    }

    public _onHidden():() => void
    {
        return noop;
    }
}
