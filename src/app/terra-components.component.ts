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
import { TerraNavigatorNodeInterface } from './navigator/data/terra-navigator-node.interface';

@Component({
               selector: 'app-root',
               template: require('./terra-components.component.html'),
               styles:   [require('./terra-components.component.scss')]
           })
export class TerraComponentsComponent extends Translation implements OnInit
{
    private _viewContainerRef:ViewContainerRef;
    private myNodes:Array<TerraNavigatorNodeInterface>;
    
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
            .defineDefaultLocale('en',
                                 'EN');
        
        let langInLocalStorage:string = localStorage.getItem('plentymarkets_lang_');
        
        if(langInLocalStorage != null)
        {
            this.locale.setCurrentLanguage(langInLocalStorage);
        }
        else
        {
            let lang = navigator.language.slice(0,
                                                2).toLocaleLowerCase();
            
            if(lang !== 'de' && lang !== 'en')
            {
                lang = 'en';
            }
            
            this.locale.setCurrentLanguage(lang);
            localStorage.setItem('plentymarkets_lang_',
                                 lang);
        }
        
        this.locale.init();
        
        //Definitions for i18n
        if(process.env.ENV === 'production')
        {
            this.translation.addConfiguration().addProvider('app/assets/lang/locale-');
        }
        else
        {
            this.translation.addConfiguration().addProvider('src/app/assets/lang/locale-');
        }
        
        this.translation.init();
    }
    
    ngOnInit()
    {
        
        this.myNodes = [
            {
                nodeName: "Lvl1",
                children: [
                    {
                        nodeName: "Lvl2 #0",
                        children: null
                    },
                    {
                        nodeName: "Lvl2 #1 ABC",
                        children: [
                            {
                                nodeName: "LEVEL 3 - 1",
                                children: null,
                            }
                        ]
                    },
                    {
                        nodeName: "Lvl2 #2",
                        children: null
                    }
                ]
            },
            {
                nodeName: "Lvl2",
                children: [
                    {
                        nodeName: "Lvl2 #0",
                        children: null
                    },
                    {
                        nodeName: "Lvl2 #1 ABC",
                        children: [
                            {
                                nodeName: "LEVEL 3 - 2",
                                children: null
                            }
                        ]
                    },
                    {
                        nodeName: "Lvl2 #2 SDSSSSS",
                        children: null
                    }
                ]
            }
        ];
    }
}
