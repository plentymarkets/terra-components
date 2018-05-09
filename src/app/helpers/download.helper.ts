export class TerraDownloadHelper
{
    public static downloadFile(object:any, filename:string):void
    {
        let fileURL:string = URL.createObjectURL(object);

        let link:HTMLAnchorElement = document.createElement('a');
        link.href = fileURL;
        link.download = filename;
        document.body.appendChild(link);
        link.click();

        // TODO: Implement method to remove unused Download a-tags
    }
}
