import {
    Translation,
    TranslationService,
    LocaleService
} from 'angular-l10n';

/**
 * @author mfrank
 */
export class TranslatableComponent extends Translation
{
    constructor(public locale:LocaleService, translation:TranslationService)
    {
        super(translation);
    
        this.locale.addConfiguration()
            .addLanguages(['de', 'en'])
            .setCookieExpiration(30)
            .defineDefaultLocale('en', 'EN');
    
        let langInLocalStorage:string = localStorage.getItem('plentymarkets_lang_');
    
        if(langInLocalStorage != null)
        {
            this.locale.setCurrentLanguage(langInLocalStorage);
        }
        else
        {
            let lang = navigator.language.slice(0, 2).toLocaleLowerCase();
        
            if(lang !== 'de' && lang !== 'en')
            {
                lang = 'en';
            }
        
            this.locale.setCurrentLanguage(lang);
            localStorage.setItem('plentymarkets_lang_', lang);
        }
    
        this.locale.init();
    }
    
    public addProvider(providerPath:string):void
    {
        //TODO korrekten productive pfad angeben
        if(process.env.ENV === 'production')
        {
            this.translation.addConfiguration().addProvider('./@plentymarkets/terra-components/app/assets/lang/' + providerPath + '/' + providerPath + '-');
        }
        else
        {
            this.translation.addConfiguration().addProvider('./node_modules/@plentymarkets/terra-components/app/assets/lang/' + providerPath + '/' + providerPath + '-');
        }
    
        this.translation.init();
    }
}