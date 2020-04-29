export class DispatchHelper {
    public static dispatchEvent(eventToDispatch: Event | CustomEvent): void {
        if (window === window.top) {
            window.dispatchEvent(eventToDispatch);
        } else {
            window.parent.window.dispatchEvent(eventToDispatch);
        }
    }
}
