import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
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
    @Input() inputType;
    @Output() outputClose = new EventEmitter<any>();
    private _left:string = '0%';
    
    constructor()
    {
    }
    
    ngOnInit()
    {
    }
    
    ngDoCheck()
    {
        if(this.inputComponents.length == 1)
        {
            this._left = '0%';
        }
        else if(this.inputComponents.length == 2)
        {
            this._left = '0%';
        }
        else if(this.inputComponents.length == 3)
        {
            this._left = '0%';
        }
        else if(this.inputComponents.length == 4)
        {
            this._left = '-33.33%';
        }
        else if(this.inputComponents.length == 5)
        {
            this._left = '-66.66%';
        }
        else if(this.inputComponents.length == 6)
        {
            this._left = '-99.99%';
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
                    //this.hideView(component);
                    this.inputComponents.pop();
                }
            }
        )
        //this.hideView(component);
    }
    
    private hideView(component:TerraSplitViewInterface):void
    {
        component.hidden = true;
    }
}
