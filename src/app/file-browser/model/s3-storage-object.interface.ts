export interface S3StorageObject
{
    eTag: string;
    key: string;
    lastModified: string;
    size: number;
    publicUrl: string;
    storageClass: "STANDARD" | "STANDARD_IA" | "GLACIER" | "RRS"
}

export function createS3StorageObject( key ): S3StorageObject
{
    return {
        eTag: "",
        key: key,
        lastModified: (new Date()).toISOString(),
        publicUrl: "",
        size: 0,
        storageClass: "STANDARD"
    };
}