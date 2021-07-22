import { extName, isDirectory } from './path';

export function mapIconClass(file: string): string {
    const extension: string = extName(file);
    const iconMap: { [ext: string]: string } = {
        css: 'icon-file_extension_css',
        scss: 'icon-file_extension_css',
        less: 'icon-file_extension_css',
        csv: 'icon-file_extension_csv',
        doc: 'icon-file_extension_doc',
        docx: 'icon-file_extension_docx',
        gif: 'icon-file_extension_gif',
        gz: 'icon-file_extension_gzip',
        gzip: 'icon-file_extension_gzip',
        hh: 'icon-file_extension_hh',
        html: 'icon-file_extension_html',
        ico: 'icon-file_extension_ico',
        jpeg: 'icon-file_extension_jpeg',
        jpg: 'icon-file_extension_jpg',
        js: 'icon-file_extension_js',
        json: 'icon-file_extension_json',
        md: 'icon-file_extension_md',
        odt: 'icon-file_extension_openoffice',
        pdf: 'icon-file_extension_pdf',
        png: 'icon-file_extension_png',
        rtf: 'icon-file_extension_rtf',
        swf: 'icon-file_extension_swf',
        tar: 'icon-file_extension_tar',
        tif: 'icon-file_extension_tiff',
        tiff: 'icon-file_extension_tiff',
        twig: 'icon-file_extension_twig',
        txt: 'icon-file_extension_txt',
        xls: 'icon-file_extension_xls',
        xlsx: 'icon-file_extension_xlsx',
        xml: 'icon-file_extension_xml',
        zip: 'icon-file_extension_zip',
        rar: 'icon-file_extension_zip',
        '7z': 'icon-file_extension_zip'
    };

    return iconMap[extension] || 'icon-file_extension_blank';
}
export function isWebImage(file: string): boolean {
    if (isDirectory(file)) {
        return false;
    }

    let extension: string = extName(file);

    return ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].indexOf(extension) >= 0;
}
