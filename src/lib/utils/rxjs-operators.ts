import {
    MonoTypeOperatorFunction,
    noop,
    Subject
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';

export function takeUntilDestroyed<T>(target:any):MonoTypeOperatorFunction<T>
{
    const destroy:Subject<void> = new Subject();
    if(!implementsOnDestroy(target))
    {
        target.ngOnDestroy = noop;
    }

    function ngOnDestroy(this:any):void
    {
        destroy.next();
        destroy.complete();

        target.ngOnDestroy.apply(this);
    }

    target.ngOnDestroy = ngOnDestroy;

    return takeUntil<T>(destroy);
}

function implementsOnDestroy(object:any):object is OnDestroy
{
    return object.hasOwnProperty('ngOnDestroy') && typeof object.ngOnDestroy !== 'undefined';
}
