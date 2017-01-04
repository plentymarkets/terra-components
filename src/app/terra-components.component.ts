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
import { TerraTileBoxInterface } from './tile/box/data/terra-tile-box.interface';
import { TerraTileBoxPanelComponent } from './tile/panel/terra-tile-box-panel.component';

@Component({
               selector: 'app-root',
               template: require('./terra-components.component.html'),
               styles:   [require('./terra-components.component.scss').toString()],
           })
export class TerraComponentsComponent extends Locale implements OnInit
{
    private _viewContainerRef:ViewContainerRef;
    @ViewChild(TerraTileBoxPanelComponent) tileBoxPanel:TerraTileBoxPanelComponent;
    
    private tileList:Array<TerraTileBoxInterface>;
    
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
        
        this.tileList = [
            {
                title:      'Plugin1 zum testen langer text',
                subTitle:'Vers.: 1.0.1 zum testen langer text',
                imagePath: 'src/app/tile/box/tmp/ceres.png',
                text: 'Kurzbeschreibung Plugin asdasd asd  alsjdalkskdj aldja lkdajs dlasjd lajsd aldsjaldj aslkdj alsdj alsdjalsdj ad as das da ds as da sd asd a da d asd a da sd ads ad sblaa blaablaa lalala blaablubblub blaa blaa lalala blaa blubblub blaa lalalablaa lalala blaa blaa blaa blaa blaa blubblub blaa blubbaa blubblub blaa lalala dadia',
                buttonList: [
                    {
                        icon: 'icon-folder',
                        clickFunction:()=>{
                            alert('Plugin1 inbox click')
                        },
                        tooltipText: 'inbox'
                    },
                    {
                        icon: 'icon-plugin_copy_to_stage',
                        clickFunction:()=>{
                            alert('Plugin1 stage click')
                        },
                        tooltipText: 'stage'
                    },
                    {
                        icon: 'icon-plugin_productive',
                        clickFunction:()=>{
                            alert('Plugin1 productive click')
                        },
                        tooltipText: 'productive'
                    }
                ]
            },
            {
                title: 'Plugin2',
                subTitle:'Vers.: 1.0.1',
                text: 'Kurzbeschreibung Plugin blaa blaablaa lalala blaablubblub blaa blaa lalala blaa blubblub blaa lalalablaa lalala blaa blaa blaa blaa blaa blubblub blaa blubbaa blubblub blaa lalala dadia'
            },
            {
                title: 'Plugin3',
                subTitle:'Vers.: 0.0.150',
                text: 'Kurzbeschreibung Plugin blaa blaablaa lalala blaablubblub blaa blaa lalala blaa blubblub blaa lalalablaa lalala blaa blaa blaa blaa blaa blubblub blaa blubbaa blubblub blaa lalala dadia'
            },
            {
                title: 'Plugin4',
                subTitle:'Vers.: 1.9.1',
                text: 'Kurzbeschreibung Plugin blaa blaablaa lalala blaablubblub blaa blaa lalala blaa blubblub blaa lalalablaa lalala blaa blaa blaa blaa blaa blubblub blaa blubbaa blubblub blaa lalala dadia'
            },
            {
                title: 'Plugin5',
                subTitle:'Vers.: 3.4.5',
                text: 'Kurzbeschreibung Plugin blaa blaablaa lalala blaablubblub blaa blaa lalala blaa blubblub blaa lalalablaa lalala blaa blaa blaa blaa blaa blubblub blaa blubbaa blubblub blaa lalala dadia'
            },
            {
                title: 'Plugin6',
                subTitle:'Vers.: 1.0.0',
                text: 'Kurzbeschreibung Plugin blaa blaablaa lalala blaablubblub blaa blaa lalala blaa blubblub blaa lalalablaa lalala blaa blaa blaa blaa blaa blubblub blaa blubbaa blubblub blaa lalala dadia'
            }
        ]
    }
    
    ngOnInit()
    {
    }
    
    private openOverlayStatic():void
    {
    }
    
    click()
    {
        console.log(this.tileBoxPanel.selectedTileBoxList);
    }
}
