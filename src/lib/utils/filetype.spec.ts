import { isWebImage, mapIconClass } from './filetype';

describe('Util: Filetype', () => {
    it('Method: isWebImage() should return if a name is in the array of webimages', () => {
        let file = 'test.jpeg';
        expect(isWebImage(file)).toBeTrue();
        file = 'test.pdf';
        expect(isWebImage(file)).toBeFalse();
    });

    it('Method: isWebImage() should return false if input is a directory', () => {
        const directory = '/any/absolute/path/';
        expect(isWebImage(directory)).toBeFalse();
    });

    it('Method: mapIconClass() should map the correct icon-file-extension to a file name', () => {
        const file = 'test.jpeg';
        expect(mapIconClass(file)).toBe('icon-file_extension_jpeg');
    });

    it('Method: mapIconClass() should return `icon-file_extension_blank` if file extension is unknown', () => {
        const file = 'test.jfif';
        expect(mapIconClass(file)).toBe('icon-file_extension_blank');
    });
});
