import { Event } from '@angular/router';
import {
    Observable,
    ReplaySubject
} from 'rxjs';

export class MockRouter
{
    public url:string = 'start';

    private subject:ReplaySubject<Event> = new ReplaySubject<Event>();

    constructor(initialEvent?:Event)
    {
        this.sendEvent(initialEvent);
    }

    public get events():Observable<Event>
    {
        return this.subject.asObservable();
    }

    public sendEvent(event:Event):void
    {
        this.subject.next(event);
    }
}
