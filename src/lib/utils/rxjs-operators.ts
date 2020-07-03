import {
    MonoTypeOperatorFunction,
    Subject
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export function takeUntilDestroyed(target:any):MonoTypeOperatorFunction<any>
{
    const destroy:Subject<boolean> = new Subject<boolean>();
    const targetNgOnDestroy:Function = target.ngOnDestroy;
    if(typeof targetNgOnDestroy === 'undefined')
    {
        console.log(target.constructor ? target.constructor.name : 'takeUntilDestroyed', 'missingOnDestroy');
    }

    function ngOnDestroy(this:any):void
    {
        destroy.next(true);
        destroy.complete();

        if(targetNgOnDestroy)
        {
            targetNgOnDestroy.apply(this);
        }
    }

    target.ngOnDestroy = ngOnDestroy;

    return takeUntil(destroy);
}
