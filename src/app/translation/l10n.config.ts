import { L10nConfig } from 'angular-l10n';
import { i18nTerraComponents } from 'src/lib/translations/components/i18n-terra-components';

export const l10nConfig: L10nConfig = {
    format: 'language',
    providers: [{ name: 'terra-components', asset: i18nTerraComponents }],
    cache: true,
    keySeparator: '.',
    defaultLocale: {
        language: 'de',
        currency: 'EUR'
    },
    schema: [
        { locale: { language: 'de', currency: 'EUR' }, dir: 'ltr', text: 'Deutsch' },
        { locale: { language: 'en', currency: 'GBP' }, dir: 'ltr', text: 'English' }
    ]
};
