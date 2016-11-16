import {
    Component,
    OnInit,
    Input,
    DoCheck
} from '@angular/core';
import { TerraSplitViewInterface } from './data/terra-split-view.interface';

@Component({
               selector: 'terra-split-view',
               styles:   [require('./terra-split-view.component.scss').toString()],
               template: require('./terra-split-view.component.html')
           })
export class TerraSplitViewComponent implements OnInit, DoCheck
{
    @Input() inputmodules:Array<TerraSplitViewInterface>;
    @Input() inputNavbarEntryName:string;
    private _isSingleComponent:boolean;
    
    constructor()
    {
    }
    
    ngOnInit()
    {
    }
    
    ngDoCheck()
    {
        if(this.inputmodules.length > 3)
        {
            for(let index = this.inputmodules.length - 1; index >= 0; index--)
            {
                if(this.inputmodules.length - 1 - index < 3)
                {
                    this.inputmodules[index].hidden = false;
                }
                else
                {
                    this.inputmodules[index].hidden = true;
                }
            }
        }
        else
        {
            if(this.inputmodules[0]) this.inputmodules[0].hidden = false;
            if(this.inputmodules[1]) this.inputmodules[1].hidden = false;
            if(this.inputmodules[2]) this.inputmodules[2].hidden = false;
        }
        
        if(this.inputmodules.length == 1)
        {
            this._isSingleComponent = true;
        }
        else
        {
            this._isSingleComponent = false;
        }
    }
    
    private onClick():void
    {
        this.inputmodules.pop();
    }
}
