import {
    Event,
    Router
} from '@angular/router';
import {
    Observable,
    ReplaySubject
} from 'rxjs';
import { FactoryProvider } from '@angular/core';

export const mockRouterProvider:FactoryProvider = {
    provide: Router,
    useFactory: () => new MockRouter()
};

export class MockRouter
{
    public url:string = 'start/dashboard';

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
