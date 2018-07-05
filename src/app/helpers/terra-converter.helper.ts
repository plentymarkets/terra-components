import { L10nDecimalPipe, LocaleService } from 'angular-l10n';
import { Injectable } from '@angular/core';

export class TerraConverterHelper
{
    /**
     * Automatically change the byte size to the corresponding range with the appropriate unit
     * @param {number} byteSize
     * @param {string} defaultLocale
     * @returns {string}
     */
    public static convertAndFormatSize(byteSize:number, defaultLocale:string):string
    {
        let GB_CONVERSION_FACTOR:number = 1073741824;
        let MB_CONVERSION_FACTOR:number = 1048576;
        let KB_CONVERSION_FACTOR:number = 1024;

        if(byteSize >= GB_CONVERSION_FACTOR)
        {
            return this.getLocaleDecimalValue(byteSize / GB_CONVERSION_FACTOR, defaultLocale) + ' GB';
        }
        else if(byteSize >= MB_CONVERSION_FACTOR)
        {
            return this.getLocaleDecimalValue(byteSize / MB_CONVERSION_FACTOR, defaultLocale) + ' MB';
        }
        else if(byteSize >= KB_CONVERSION_FACTOR)
        {
            return this.getLocaleDecimalValue(byteSize / KB_CONVERSION_FACTOR, defaultLocale) + ' KB';
        }
        else
        {
            return this.getLocaleDecimalValue(byteSize, defaultLocale) + ' B';
        }
    }

    /**
     * @param {number} value
     * @param {string} defaultLocale
     * @returns {string}
     */
    public static getLocaleDecimalValue(value:number, defaultLocale:string):string
    {
        let pipe:L10nDecimalPipe = new L10nDecimalPipe();
        return pipe.transform(value, defaultLocale, '1.0-2'); // max 2 digits after the comma
    }
}
