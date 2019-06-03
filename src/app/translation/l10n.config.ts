import {
    L10nConfig,
    LogLevel,
    ProviderType,
    StorageStrategy
} from 'angular-l10n';
import { DefaultLocale } from 'angular-l10n/src/models/types';

export const l10nConfig:L10nConfig = getL10nConfig();

function getL10nConfig():L10nConfig
{
    let langInLocalStorage:string = localStorage.getItem('plentymarkets_lang_');
    let lang:string = null;

    if(langInLocalStorage !== null)
    {
        lang = langInLocalStorage;
    }
    else
    {
        lang = navigator.language.slice(0, 2).toLocaleLowerCase();

        if(lang !== 'de' && lang !== 'en')
        {
            lang = 'en';
        }

        localStorage.setItem('plentymarkets_lang_', lang);
    }

    let defaultLocale:DefaultLocale = lang === 'de' ?
        { languageCode: 'de', countryCode: 'DE' } :
        { languageCode: 'en', countryCode: 'GB' };

    let currency:string = lang === 'de' ? 'EUR' : 'GBP';

    let prefix:string = null;

    // Definitions for i18n
    if(process.env.ENV === 'production')
    {
        prefix = 'app/assets/lang/locale-';
    }
    else
    {
        prefix = 'src/app/assets/lang/locale-';
    }

    return {
        logger: {
            level: LogLevel.Warn
        },
        locale:      {
            languages: [
                {
                    code: 'en',
                    dir:  'ltr'
                },
                {
                    code: 'de',
                    dir:  'ltr'
                }
            ],
            language:      lang,
            defaultLocale: defaultLocale,
            currency:      currency,
            storage:       StorageStrategy.Cookie
        },
        translation: {
            providers:            [
                {
                    type:   ProviderType.Static,
                    prefix: prefix
                }
            ],
            caching:              true,
            composedKeySeparator: '.',
            i18nPlural:           false
        }
    };
}
