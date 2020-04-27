import { S3StorageObjectInterface } from '../../components/file-browser/model/s3-storage-object.interface';

/**
 * @author mfrank
 */

export interface FileDataInterface {
  isTruncated: boolean;
  nextContinuationToken: string;
  commonPrefixes: Array<string>;
  objects: Array<S3StorageObjectInterface>;
}

export const fileData: FileDataInterface = {
  isTruncated: false,
  nextContinuationToken: '',
  commonPrefixes: ['.thumbs/'],
  objects: [
    {
      key: 'Bildschirmfoto_2018-01-25_um_14.37.01.png',
      lastModified: '2018-09-07T13:04:39+00:00',
      eTag: '454f190caa2162c8fac1228dc1231592',
      size: '39496',
      storageClass: 'STANDARD',
      publicUrl:
        'https://cdndev.plentymarkets.com/97/frontend/Bildschirmfoto_2018-01-25_um_14.37.01.png',
      previewUrl:
        'https://cdndev.plentymarkets.com/97/frontend/.thumbs/Bildschirmfoto_2018-01-25_um_14.37.01.png'
    },
    {
      key: 'Bildschirmfoto_2018-01-29_um_09.31.40.png',
      lastModified: '2018-09-07T13:04:35+00:00',
      eTag: '0d038c3274e32d0179c991501189248e',
      size: '506615',
      storageClass: 'STANDARD',
      publicUrl:
        'https://cdndev.plentymarkets.com/97/frontend/Bildschirmfoto_2018-01-29_um_09.31.40.png',
      previewUrl:
        'https://cdndev.plentymarkets.com/97/frontend/.thumbs/Bildschirmfoto_2018-01-29_um_09.31.40.png'
    },
    {
      key: 'Bildschirmfoto_2018-01-30_um_10.52.24.png',
      lastModified: '2018-09-07T13:04:33+00:00',
      eTag: 'c49f63827ea36d83829938211f952a88',
      size: '1348992',
      storageClass: 'STANDARD',
      publicUrl:
        'https://cdndev.plentymarkets.com/97/frontend/Bildschirmfoto_2018-01-30_um_10.52.24.png',
      previewUrl:
        'https://cdndev.plentymarkets.com/97/frontend/.thumbs/Bildschirmfoto_2018-01-30_um_10.52.24.png'
    }
  ]
};
