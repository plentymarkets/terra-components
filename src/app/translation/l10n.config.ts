import {
    L10nConfig,
    LogLevel,
    ProviderType,
    StorageStrategy
} from 'angular-l10n';
import { environment } from 'src/lib/environments/environment';


const logLevel:LogLevel = environment.test ? LogLevel.Off : LogLevel.Warn;
export const l10nConfig:L10nConfig = {
    logger:      {
        level: logLevel
    },
    locale:      {
        languages:     [
            {
                code: 'en',
                dir:  'ltr'
            },
            {
                code: 'de',
                dir:  'ltr'
            }
        ],
        language:      'en',
        defaultLocale: {
            languageCode: 'de',
            countryCode:  'DE'
        },
        currency:      'EUR',
        storage:       StorageStrategy.Local,
        storageNames:  {defaultLocale: 'plentymarkets_lang_'}
    },
    translation: {
        providers:            [
            {
                type:   ProviderType.Static,
                prefix: 'assets/lang/locale-'
            }
        ],
        caching:              true,
        composedKeySeparator: '.',
        i18nPlural:           false
    }
};
