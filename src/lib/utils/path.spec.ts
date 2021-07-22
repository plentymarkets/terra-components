import { basename, dirname, extName, isAbsolute, isDirectory, isFile, join, sizeString } from './path';

describe('Util: Path:', () => {
    it('should get the basename of a path', () => {
        expect(basename('/any/absolute/path/')).toBe('path');
        expect(basename('any/relative/path/')).toBe('path');
        expect(basename('/path/to/file.txt')).toBe('file.txt');
    });
    it('should get the parent directory name of a path', () => {
        expect(dirname('/any/absolute/path/')).toBe('/any/absolute');
        expect(dirname('any/relative/path/')).toBe('any/relative');
        expect(dirname('/path/to/file.txt')).toBe('/path/to');
    });
    it('should join directories correctly', () => {
        expect(join('any', 'path')).toBe('any/path');
        expect(join('any', '/path')).toBe('any/path');
        expect(join('any/', 'path')).toBe('any/path');
        expect(join('any/', '/path')).toBe('any/path');
    });
    it('should check of a path is absolute', () => {
        expect(isAbsolute('/any/absolute/path/')).toBe(true);
        expect(isAbsolute('any/relative/path/')).toBe(false);
    });
    it('should check if a path is a file', () => {
        expect(isFile('/any/absolute/path/')).toBe(false);
        expect(isFile('any/relative/path/')).toBe(false);
        expect(isFile('/path/to/file.txt')).toBe(true);
    });
    it('should check if a path is a directory', () => {
        expect(isDirectory('/any/absolute/path/')).toBe(true);
        expect(isDirectory('any/relative/path/')).toBe(true);
        expect(isDirectory('/path/to/file.txt')).toBe(false);
    });

    it('should get the extension of a file', () => {
        expect(extName('/any/absolute/path/')).toBe('');
        expect(extName('')).toBe('');
        expect(extName('any/relative/path/')).toBe('');
        expect(extName('/path/to/file.txt')).toBe('txt');
        expect(extName('/path/to/file.TXT')).toBe('txt');
    });

    it('should convert numbers to readable memory size strings', () => {
        expect(sizeString(3)).toBe('3.00B');
        expect(sizeString(30)).toBe('30.00B');
        expect(sizeString(300)).toBe('300.00B');
        expect(sizeString(3000)).toBe('3.00kB');
        expect(sizeString(30000)).toBe('30.00kB');
        expect(sizeString(300000)).toBe('300.00kB');
        expect(sizeString(3000000)).toBe('3.00MB');
        expect(sizeString(30000000)).toBe('30.00MB');
        expect(sizeString(300000000)).toBe('300.00MB');
        expect(sizeString(3000000000)).toBe('3.00GB');
    });
});
