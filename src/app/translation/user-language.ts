import { Inject, Injectable } from '@angular/core';
import { L10nConfig, L10nUserLanguage, L10N_CONFIG } from 'angular-l10n';
import { StringHelper } from 'src/lib/helpers/string.helper';

@Injectable()
export class DefaultUserLanguage implements L10nUserLanguage {
    constructor(@Inject(L10N_CONFIG) private config: L10nConfig) {}

    public async get(): Promise<string | null> {
        let browserLanguage = localStorage.getItem('plentymarkets_lang_');
        if (
            StringHelper.isNullUndefinedOrEmpty(browserLanguage) &&
            typeof navigator !== 'undefined' &&
            navigator.language
        ) {
            switch (this.config.format) {
                case 'language':
                    browserLanguage = navigator.language.split('-')[0];
                    break;
                case 'language-region':
                    browserLanguage = navigator.language;
                    break;
            }
        }
        return Promise.resolve(browserLanguage);
    }
}
