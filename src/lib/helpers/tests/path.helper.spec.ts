import { PathHelper } from '../path.helper';

describe('Helper: PathHelper', () =>
{
    it('should check of a path is absolute', () =>
    {
        expect(PathHelper.isAbsolute('/any/absolute/path/')).toEqual(true);
        expect(PathHelper.isAbsolute('any/relative/path/')).toEqual(false);
    });

    it('should check if a path is a directory or a file', () =>
    {
        expect(PathHelper.isDirectory('/any/absolute/path/')).toEqual(true);
        expect(PathHelper.isFile('/any/absolute/path/')).toEqual(false);

        expect(PathHelper.isDirectory('any/relative/path/')).toEqual(true);
        expect(PathHelper.isFile('any/relative/path/')).toEqual(false);

        expect(PathHelper.isDirectory('/path/to/file.txt')).toEqual(false);
        expect(PathHelper.isFile('/path/to/file.txt')).toEqual(true);
    });

    it('should get the basename of a path', () =>
    {
        expect(PathHelper.basename('/any/absolute/path/')).toEqual('path');
        expect(PathHelper.basename('any/relative/path/')).toEqual('path');
        expect(PathHelper.basename('/path/to/file.txt')).toEqual('file.txt');
    });

    it('should get the parent directory name of a path', () =>
    {
        expect(PathHelper.dirname('/any/absolute/path/')).toEqual('/any/absolute');
        expect(PathHelper.dirname('any/relative/path/')).toEqual('any/relative');
        expect(PathHelper.dirname('/path/to/file.txt')).toEqual('/path/to');
    });

    it('should get the extension of a file', () =>
    {
        expect(PathHelper.extName('/any/absolute/path/')).toEqual('');
        expect(PathHelper.extName('any/relative/path/')).toEqual('');
        expect(PathHelper.extName('/path/to/file.txt')).toEqual('txt');
        expect(PathHelper.extName('/path/to/file.TXT')).toEqual('txt');
    });

    it('should join directories correctly', () =>
    {
        expect(PathHelper.join('any', 'path')).toEqual('any/path');
        expect(PathHelper.join('any', '/path')).toEqual('any/path');
        expect(PathHelper.join('any/', 'path')).toEqual('any/path');
        expect(PathHelper.join('any/', '/path')).toEqual('any/path');
    });

    it('should convert numbers to readable memory size strings', () =>
    {
        expect(PathHelper.sizeString(3)).toEqual('3.00B');
        expect(PathHelper.sizeString(30)).toEqual('30.00B');
        expect(PathHelper.sizeString(300)).toEqual('300.00B');
        expect(PathHelper.sizeString(3000)).toEqual('3.00kB');
        expect(PathHelper.sizeString(30000)).toEqual('30.00kB');
        expect(PathHelper.sizeString(300000)).toEqual('300.00kB');
        expect(PathHelper.sizeString(3000000)).toEqual('3.00MB');
        expect(PathHelper.sizeString(30000000)).toEqual('30.00MB');
        expect(PathHelper.sizeString(300000000)).toEqual('300.00MB');
        expect(PathHelper.sizeString(3000000000)).toEqual('3.00GB');
    });
});
