import { Observable, ReplaySubject } from 'rxjs';
import { Data } from '@angular/router';

export class MockActivatedRoute {
  private subject: ReplaySubject<Data> = new ReplaySubject<Data>();

  public get data(): Observable<Data> {
    return this.subject.asObservable();
  }
}
