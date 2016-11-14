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
    @Input() inputComponents:Array<TerraSplitViewInterface>;
    private _left:string = '0%';
    
    constructor()
    {
    }
    
    ngOnInit()
    {
    }
    
    ngDoCheck()
    {
        if(this.inputComponents.length > 3)
        {
            for(let index = this.inputComponents.length -1; index >= 0; index--)
            {
                if(this.inputComponents.length -1 -index < 3)
                {
                    this.inputComponents[index].hidden = false;
                }
                else
                {
                    this.inputComponents[index].hidden = true;
                }
            }
        }
        else
        {
            if(this.inputComponents[0]) this.inputComponents[0].hidden = false;
            if(this.inputComponents[1]) this.inputComponents[1].hidden = false;
            if(this.inputComponents[2]) this.inputComponents[2].hidden = false;
        }
    }
    
    private onClick(component:TerraSplitViewInterface):void
    {
        this.inputComponents.forEach
        (
            (comp) =>
            {
                if(comp === component)
                {
                    this.inputComponents.pop();
                }
            }
        )
    }
}
