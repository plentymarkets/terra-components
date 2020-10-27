import { L10nConfig } from 'angular-l10n';
import { environment } from 'src/lib/environments/environment';
import { i18nTerraComponents } from 'src/lib/translations/components/i18n-terra-components';

export const l10nConfig: L10nConfig = {
    format: 'language-region',
    providers: [{ name: 'terra-components', asset: i18nTerraComponents }],
    cache: true,
    keySeparator: '.',
    defaultLocale: {
        language: 'de-DE',
        currency: 'EUR'
    },
    schema: [
        { locale: { language: 'de-DE', currency: 'EUR' }, dir: 'ltr', text: 'Deutsch' },
        { locale: { language: 'en-EN', currency: 'GBP' }, dir: 'ltr', text: 'English' }
    ]
};

// const logLevel: LogLevel = environment.test ? LogLevel.Off : LogLevel.Warn;

// export const l10nConfig: L10nConfig = {
//     locale: {
//         languages: [
//             {
//                 code: 'en',
//                 dir: 'ltr'
//             },
//             {
//                 code: 'de',
//                 dir: 'ltr'
//             }
//         ],
//         language: 'en',
//         defaultLocale: {
//             languageCode: 'de',
//             countryCode: 'DE'
//         },
//         currency: 'EUR',
//         storage: StorageStrategy.Local,
//         storageNames: { defaultLocale: 'plentymarkets_lang_' }
//     },
//     translation: {
//         providers: [
//             {
//                 type: ProviderType.Static,
//                 prefix: 'assets/lang/locale-'
//             }
//         ],
//         caching: true,
//         composedKeySeparator: '.',
//         i18nPlural: false
//     }
// };
