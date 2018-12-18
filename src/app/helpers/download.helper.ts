import { PathHelper } from './path.helper';
import { TerraFileHelper } from './terra-file.helper';

export class TerraDownloadHelper
{
    public static downloadFile(object:any, filename:string):void
    {
        let fileURL:string = URL.createObjectURL(object);
        this.downloadFileFromUrl(fileURL, filename);
    }

    public static downloadFileFromUrl(url:string, filename:string):void
    {
        let link:HTMLAnchorElement = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
    }

    public static downloadImage(base64String:string, filename:string):void
    {
        let extension:string = PathHelper.extName(filename);

        let blob:Blob = TerraFileHelper.createFile(base64String, `image/${extension}`);

        this.downloadFile(blob, filename);
    }
}
