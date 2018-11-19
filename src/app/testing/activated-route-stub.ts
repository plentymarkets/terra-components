import {
    Observable,
    ReplaySubject
} from 'rxjs';
import { Data } from '@angular/router';

export class ActivatedRouteStub
{
    private subject:ReplaySubject<Data> = new ReplaySubject<Data>();

    public get data():Observable<Data>
    {
        return this.subject.asObservable();
    }
}
