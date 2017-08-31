import {
    Component,
    OnInit,
    ViewContainerRef
} from '@angular/core';
import {
    LocaleService,
    Translation,
    TranslationService
} from 'angular-l10n';

@Component({
               selector: 'app-root',
               template: require('./terra-components.component.html'),
               styles:   [require('./terra-components.component.scss')]
           })
export class TerraComponentsComponent extends Translation implements OnInit
{
    private _viewContainerRef:ViewContainerRef;

    public constructor(private viewContainerRef:ViewContainerRef,
                       public locale:LocaleService,
                       public translation:TranslationService)
    {
        super(translation);

        // You need this small hack in order to catch application root view container ref
        this._viewContainerRef = viewContainerRef;

        this.locale.addConfiguration()
            .addLanguages(['de',
                           'en'])
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

        //Definitions for i18n
        if(process.env.ENV === 'production')
        {
            this.translation.addConfiguration().addProvider('app/assets/lang/locale-').disableI18nPlural();
        }
        else
        {
            this.translation.addConfiguration().addProvider('src/app/assets/lang/locale-').disableI18nPlural();
        }

        this.translation.init();
    }

    ngOnInit()
    {
    }
}
