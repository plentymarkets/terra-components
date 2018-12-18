import { TerraFileHelper } from './terra-file.helper';

export class TerraPdfHelper
{
    public static createPdfBlob(base64String:string):Blob
    {
        return TerraFileHelper.createFile(base64String, 'application/pdf');
    }
}
