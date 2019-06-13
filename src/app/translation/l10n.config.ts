import {
    L10nConfig,
    LogLevel,
    ProviderType,
    StorageStrategy
} from 'angular-l10n';
import { environment } from '../../environments/environment';

const prodL10nConfig:L10nConfig = {
    logger: {
        level: LogLevel.Off
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
                prefix: 'assets/lang/locale-'
            }
        ],
        caching:              true,
        composedKeySeparator: '.',
        i18nPlural:           false
    }
};

const devL10nConfig:L10nConfig = {
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
                prefix: 'assets/lang/locale-'
            }
        ],
        caching:              true,
        composedKeySeparator: '.',
        i18nPlural:           false
    }
};

export const l10nConfig:L10nConfig = environment.production ? prodL10nConfig : devL10nConfig;

