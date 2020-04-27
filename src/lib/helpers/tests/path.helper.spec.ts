import { PathHelper } from '../path.helper';

describe('Helper: PathHelper', () => {
  it('should check of a path is absolute', () => {
    expect(PathHelper.isAbsolute('/any/absolute/path/')).toBe(true);
    expect(PathHelper.isAbsolute('any/relative/path/')).toBe(false);
  });

  it('should check if a path is a directory or a file', () => {
    expect(PathHelper.isDirectory('/any/absolute/path/')).toBe(true);
    expect(PathHelper.isFile('/any/absolute/path/')).toBe(false);

    expect(PathHelper.isDirectory('any/relative/path/')).toBe(true);
    expect(PathHelper.isFile('any/relative/path/')).toBe(false);

    expect(PathHelper.isDirectory('/path/to/file.txt')).toBe(false);
    expect(PathHelper.isFile('/path/to/file.txt')).toBe(true);
  });

  it('should get the basename of a path', () => {
    expect(PathHelper.basename('/any/absolute/path/')).toBe('path');
    expect(PathHelper.basename('any/relative/path/')).toBe('path');
    expect(PathHelper.basename('/path/to/file.txt')).toBe('file.txt');
  });

  it('should get the parent directory name of a path', () => {
    expect(PathHelper.dirname('/any/absolute/path/')).toBe('/any/absolute');
    expect(PathHelper.dirname('any/relative/path/')).toBe('any/relative');
    expect(PathHelper.dirname('/path/to/file.txt')).toBe('/path/to');
  });

  it('should get the extension of a file', () => {
    expect(PathHelper.extName('/any/absolute/path/')).toBe('');
    expect(PathHelper.extName('any/relative/path/')).toBe('');
    expect(PathHelper.extName('/path/to/file.txt')).toBe('txt');
    expect(PathHelper.extName('/path/to/file.TXT')).toBe('txt');
  });

  it('should join directories correctly', () => {
    expect(PathHelper.join('any', 'path')).toBe('any/path');
    expect(PathHelper.join('any', '/path')).toBe('any/path');
    expect(PathHelper.join('any/', 'path')).toBe('any/path');
    expect(PathHelper.join('any/', '/path')).toBe('any/path');
  });

  it('should convert numbers to readable memory size strings', () => {
    expect(PathHelper.sizeString(3)).toBe('3.00B');
    expect(PathHelper.sizeString(30)).toBe('30.00B');
    expect(PathHelper.sizeString(300)).toBe('300.00B');
    expect(PathHelper.sizeString(3000)).toBe('3.00kB');
    expect(PathHelper.sizeString(30000)).toBe('30.00kB');
    expect(PathHelper.sizeString(300000)).toBe('300.00kB');
    expect(PathHelper.sizeString(3000000)).toBe('3.00MB');
    expect(PathHelper.sizeString(30000000)).toBe('30.00MB');
    expect(PathHelper.sizeString(300000000)).toBe('300.00MB');
    expect(PathHelper.sizeString(3000000000)).toBe('3.00GB');
  });
});
