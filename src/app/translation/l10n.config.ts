import { L10nConfig } from 'angular-l10n';
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
