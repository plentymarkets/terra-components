import {
    Component,
    OnInit,
    ViewContainerRef,
    ViewChild
} from '@angular/core';
import {
    LocaleService,
    LocalizationService,
    Locale
} from 'angular2localization';
import { TerraMultiSelectBoxValueInterface } from './forms/multi-select-box/data/terra-multi-select-box-value.interface';

@Component({
               selector: 'app-root',
               template: require('./terra-components.component.html'),
               styles:   [require('./terra-components.component.scss')]
           })
export class TerraComponentsComponent extends Locale implements OnInit
{
    private _viewContainerRef:ViewContainerRef;
    
    public constructor(private viewContainerRef:ViewContainerRef,
                       public local:LocaleService,
                       public localization:LocalizationService)
    {
        super(local, localization);
        
        // You need this small hack in order to catch application root view container ref
        this._viewContainerRef = viewContainerRef;
        
        //Definitions for i18n
        if(process.env.ENV === 'production')
        {
            this.localization.translationProvider('app/resources/locale_');
        }
        else
        {
            this.localization.translationProvider('src/app/resources/locale_');
        }
        
        this.locale.addLanguage('de');
        this.locale.addLanguage('en');
        this.locale.definePreferredLocale('en', 'EN', 30); //default language is en
        
        let langInLocalStorage:string = localStorage.getItem('plentymarkets_lang_');
        
        if(langInLocalStorage != null)
        {
            this.locale.setCurrentLocale(langInLocalStorage, langInLocalStorage.toUpperCase());
        }
        else
        {
            let lang = navigator.language.slice(0, 2).toLocaleLowerCase();
            
            if(lang !== 'de' && lang !== 'en')
            {
                lang = 'en';
            }
            
            this.locale.setCurrentLocale(lang, lang.toUpperCase());
            localStorage.setItem('plentymarkets_lang_', lang);
        }
        
        this.localization.updateTranslation();
    }
    
    ngOnInit()
    {
    }
}
