import { environment } from '../environments/environment';

export class WindowHelper
{
    /**
     * @description checks whether code is currently executed in the root window, or in the test environment
     */
    public static get isRootWindow():boolean
    {
        // since tests are run in an iframe, we need to check for test environment here to make them work
        return window === window.parent || environment.test;
    }
}
