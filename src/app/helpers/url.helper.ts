export class UrlHelper
{
    public static removeLeadingSlash(url:string):string
    {
        if(url.startsWith('/'))
        {
            // remove leading slash in url
            url = url.slice(1, url.length);
        }

        return url;
    }
}