import {
    Component,
    OnDestroy
} from '@angular/core';
import {
    interval,
    Subscription
} from 'rxjs';
import { takeUntilDestroyed } from './rxjs-operators';

@Component({
    template: ''
})
class TestComponent implements OnDestroy
{
    public subscription:Subscription = interval(100).pipe(
        takeUntilDestroyed(this)
    ).subscribe();

    public ngOnDestroy():void
    {
        console.log('destroyed');
    }
}

describe('', () =>
{
    const component:TestComponent = new TestComponent();
    it('', () =>
    {
        spyOn(console, 'log');
        component.ngOnDestroy();
        expect(component.subscription.closed).toBe(true);
        expect(console.log).toHaveBeenCalledWith('destroyed');
    });
});
