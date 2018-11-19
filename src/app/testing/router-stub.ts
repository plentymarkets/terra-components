import { Event } from '@angular/router';
import {
    Observable,
    ReplaySubject
} from 'rxjs';

export class RouterStub
{
    public url:string = 'start';

    private subject:ReplaySubject<Event> = new ReplaySubject<Event>();

    public get events():Observable<Event>
    {
        return this.subject.asObservable();
    }
}
