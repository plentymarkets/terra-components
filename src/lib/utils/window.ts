import { InjectionToken } from '@angular/core';

/** @description checks whether the passed window is the root. */
export function isRootWindow(window: Window): boolean {
    return window === window.parent;
}

/** @description Injection token that can be used to determine whether code is currently executed in the root window. */
export const IS_ROOT_WINDOW: InjectionToken<boolean> = new InjectionToken('Is this the root window?', {
    providedIn: 'root',
    factory: (): boolean => isRootWindow(window)
});
