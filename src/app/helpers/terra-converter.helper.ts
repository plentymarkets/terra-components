import { L10nDecimalPipe, LocaleService } from 'angular-l10n';
import { Injectable } from '@angular/core';

@Injectable()
export class TerraConverterHelper
{
    /**
     * Automatically change the byte size to the corresponding range with the appropriate unit
     * @param {number} byteSize
     * @param {LocaleService} localeService
     * @returns {string}
     */
    public convertAndFormatSize(byteSize:number, localeService:LocaleService):string
    {
        let GB_CONVERSION_FACTOR:number = 1073741824;
        let MB_CONVERSION_FACTOR:number = 1048576;
        let KB_CONVERSION_FACTOR:number = 1024;

        if(byteSize >= GB_CONVERSION_FACTOR)
        {
            return this.getLocaleDecimalValue(byteSize / GB_CONVERSION_FACTOR, localeService) + ' GB';
        }
        else if(byteSize >= MB_CONVERSION_FACTOR)
        {
            return this.getLocaleDecimalValue(byteSize / MB_CONVERSION_FACTOR, localeService) + ' MB';
        }
        else if(byteSize >= KB_CONVERSION_FACTOR)
        {
            return this.getLocaleDecimalValue(byteSize / KB_CONVERSION_FACTOR, localeService) + ' KB';
        }
        else
        {
            return this.getLocaleDecimalValue(byteSize, localeService) + ' B';
        }
    }

    /**
     * @param {number} value
     * @returns {string}
     */
    public getLocaleDecimalValue(value:number, locale:LocaleService):string
    {
        let pipe:L10nDecimalPipe = new L10nDecimalPipe();
        return pipe.transform(value, locale.getDefaultLocale(), '1.0-2'); // max 2 digits after the comma
    }
}
