export class TerraBaseServiceHelper
{
    static createPdfBlob(base64String:string):Blob
    {
        let byteCharacters:string = atob(base64String);
        let byteArrays:any = [];

        for(let offset:number = 0; offset < byteCharacters.length; offset += 512)
        {
            let slice:string = byteCharacters.slice(offset, offset + 512);

            let byteNumbers:Array<any> = new Array(slice.length);
            for(let i:number = 0; i < slice.length; i++)
            {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            let byteArray:Uint8Array = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, {type: 'application/pdf'});
    }
}
