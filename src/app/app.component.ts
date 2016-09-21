import {
    Component,
    OnInit,

} from '@angular/core';

@Component({
               selector: 'app-root',
               template: require('./app.component.html'),
               styles:   [require('./app.component.scss')],
           })

export class AppComponent implements OnInit
{
    ngOnInit()
    {
    }

}
