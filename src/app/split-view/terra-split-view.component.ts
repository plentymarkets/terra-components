import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { TerraSplitViewInterface } from './data/terra-split-view.interface';
import {
    Locale,
    LocaleService,
    LocalizationService
} from 'angular2localization';

@Component({
               selector: 'terra-split-view',
               styles:   [require('./terra-split-view.component.scss')],
               template: require('./terra-split-view.component.html')
           })
export class TerraSplitViewComponent extends Locale implements OnChanges
{
    @Input() inputModules:Array<TerraSplitViewInterface>;
    @Input() inputShowBreadcrumbs:boolean;
    private _breadCrumbsPath:string;
    
    constructor(public locale:LocaleService, public localization:LocalizationService)
    {
        super(locale, localization);
        this.inputShowBreadcrumbs = true; // default
        this._breadCrumbsPath = '';
    }
    
    ngOnChanges(changes:SimpleChanges)
    {
        if(changes["inputModules"].currentValue !== undefined && changes["inputModules"].currentValue.length > 0 )
        {
            if(this.inputModules != null)
            {
                this.focusView(this.inputModules[this.inputModules.length - 1].mainComponentName);
            }
        }
    }
    
    private focusView(id:string):void
    {
        setTimeout(function()
        {
            let anchor = $('#' + id);

            if (anchor[0].getBoundingClientRect().left > $('.side-scroller').scrollLeft() - 3 &&
                anchor[0].getBoundingClientRect().right <= (window.innerWidth || document.documentElement.clientWidth))
            {
                return;
            }

            $('.side-scroller').stop();
            $('.side-scroller').animate({
                scrollLeft: (anchor.offset().left + $('.side-scroller').scrollLeft() - 3)
            }, 500);
          
        });
    }

}

