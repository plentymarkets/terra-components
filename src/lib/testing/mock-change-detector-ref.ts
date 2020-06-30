import { ChangeDetectorRef } from '@angular/core';
import { noop } from 'rxjs';

export class MockChangeDetectorRef extends ChangeDetectorRef
{
    public markForCheck:() => void = noop;

    public checkNoChanges:() => void = noop;

    public detach:() => void = noop;

    public detectChanges:() => void = noop;

    public reattach:() => void = noop;
}
