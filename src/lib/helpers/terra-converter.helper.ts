import { L10nIntlService } from 'angular-l10n';

export class TerraConverterHelper {
    /**
     * Automatically change the byte size to the corresponding range with the appropriate unit
     * @param byteSize
     * @param localeService
     */
    public static convertAndFormatSize(byteSize: number, localeService: L10nIntlService): string {
        let GB_CONVERSION_FACTOR: number = 1073741824;
        let MB_CONVERSION_FACTOR: number = 1048576;
        let KB_CONVERSION_FACTOR: number = 1024;

        if (byteSize >= GB_CONVERSION_FACTOR) {
            return this.getLocaleDecimalValue(byteSize / GB_CONVERSION_FACTOR, localeService) + ' GB';
        } else if (byteSize >= MB_CONVERSION_FACTOR) {
            return this.getLocaleDecimalValue(byteSize / MB_CONVERSION_FACTOR, localeService) + ' MB';
        } else if (byteSize >= KB_CONVERSION_FACTOR) {
            return this.getLocaleDecimalValue(byteSize / KB_CONVERSION_FACTOR, localeService) + ' KB';
        } else {
            return this.getLocaleDecimalValue(byteSize, localeService) + ' B';
        }
    }

    /**
     * @param value
     * @param localeService
     */
    public static getLocaleDecimalValue(value: number, localeService: L10nIntlService): string {
        return localeService.formatNumber(value, { digits: '1.0-2' }); // max 2 digits after the comma
    }
}
