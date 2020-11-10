import { L10nConfig } from 'angular-l10n';
import { l10nTerraComponents } from 'src/lib/translations/components/l10n-terra-components';

export const l10nConfig: L10nConfig = {
    format: 'language',
    providers: [{ name: 'terra-components', asset: l10nTerraComponents }],
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
