import {
    L10nConfig,
    LogLevel,
    ProviderType,
    StorageStrategy
} from 'angular-l10n';
import { environment } from '../../environments/environment';

export const l10nConfig:L10nConfig =  {
    logger: {
        level: environment.production ? LogLevel.Off : LogLevel.Warn
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
        language:      'en',
        defaultLocale: { languageCode: 'en', countryCode: 'GB' },
        currency:      'GBR',
        storage:       StorageStrategy.Local,
        storageNames: { defaultLocale: 'plentymarkets_lang_' }
    },
    translation: {
        providers:            [
            {
                type:   ProviderType.Static,
                prefix: environment.l10nPrefix
            }
        ],
        caching:              true,
        composedKeySeparator: '.',
        i18nPlural:           false
    }
};


