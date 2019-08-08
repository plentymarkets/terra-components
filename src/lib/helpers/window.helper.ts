export class WindowHelper
{
    /**
     * checks whether this service is used in the root window, or in the test environment
     */
    public static get isRootWindow():boolean
    {
        // since tests are run in an iframe, we need to check for test environment here to make them work
        return window === window.parent || process.env.ENV === 'test';
    }
}
