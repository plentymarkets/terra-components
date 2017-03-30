import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { TerraSplitViewInterface } from './data/terra-split-view.interface';

@Component({
               selector: 'terra-split-view',
               styles:   [require('./terra-split-view.component.scss')],
               template: require('./terra-split-view.component.html')
           })
export class TerraSplitViewComponent implements OnChanges
{
    @Input() inputModules:Array<TerraSplitViewInterface>;
    @Input() inputShowBreadcrumbs:boolean;
    private _breadCrumbsPath:string;
    
    constructor()
    {
        this.inputShowBreadcrumbs = true; // default
        this._breadCrumbsPath = '';
    }
    
    ngOnChanges(changes:SimpleChanges)
    {
        if (changes["inputModules"].currentValue !== undefined && changes["inputModules"].currentValue.length > 0)
        {
            if (this.inputModules != null)
            {
                let currentModule = this.inputModules[this.inputModules.length - 1]
                this.focusView(currentModule.mainComponentName + "_" + currentModule.instanceKey);
            }
        }
    }
    
    private focusView(id:string):void
    {
        setTimeout(function() {
            let anchor = $('#' + id);
        
            if (anchor[0].getBoundingClientRect().left > anchor.parent().scrollLeft() - 3 &&
                anchor[0].getBoundingClientRect().right <= anchor.parent()[0].getBoundingClientRect().right)
            {
                return;
            }
        
            anchor.parent().stop();
            anchor.parent().animate({ scrollLeft: (anchor[0].getBoundingClientRect().left + anchor.parent().scrollLeft() - 3) }, 500);
        });
    }
}
