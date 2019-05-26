export class DispatchHelper
{
    public static dispatchEvent(eventToDispatch:Event | CustomEvent):void
    {
        if(!window.parent)
        {
            // workaround for plugins in GWT (loaded via iFrame)
            if(!window.parent.window.parent)
            {
                window.parent.window.parent.window.dispatchEvent(eventToDispatch);
            }
            else
            {
                window.parent.window.dispatchEvent(eventToDispatch);
            }
        }
        else
        {
            window.dispatchEvent(eventToDispatch);
        }
    }
}
