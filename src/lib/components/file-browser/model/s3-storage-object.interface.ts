export interface S3StorageObjectInterface {
  eTag: string;
  key: string;
  lastModified: string;
  size: string | number;
  publicUrl: string;
  previewUrl?: string;
  storageClass: 'STANDARD' | 'STANDARD_IA' | 'GLACIER' | 'RRS';
}

export function createS3StorageObject(key: string): S3StorageObjectInterface {
  return {
    eTag: '',
    key: key,
    lastModified: new Date().toISOString(),
    size: 0,
    publicUrl: '',
    storageClass: 'STANDARD'
  };
}
