import {
    Component,
    Input,
    DoCheck
} from '@angular/core';
import { TerraSplitViewInterface } from './data/terra-split-view.interface';

@Component({
               selector:   'terra-split-view',
               styles:     [require('./terra-split-view.component.scss').toString()],
               template:   require('./terra-split-view.component.html'),
           })
export class TerraSplitViewComponent implements DoCheck
{
    @Input() inputModules:Array<TerraSplitViewInterface>;
    @Input() inputShowBreadcrumbs:boolean;
    private _isSingleComponent:boolean;
    private _breadCrumbsPath:string;
    
    constructor()
    {
        this.inputShowBreadcrumbs = true;
        this._breadCrumbsPath = '';
    }
    
    
    ngDoCheck()
    {
        if(this.inputModules.length > 3)
        {
            for(let index = this.inputModules.length - 1; index >= 0; index--)
            {
                if(this.inputModules.length - 1 - index < 3)
                {
                    this.inputModules[index].hidden = false;
                }
                else
                {
                    this.inputModules[index].hidden = true;
                }
            }
        }
        else
        {
            if(this.inputModules[0])
            {
                this.inputModules[0].hidden = false;
            }
            if(this.inputModules[1])
            {
                this.inputModules[1].hidden = false;
            }
            if(this.inputModules[2])
            {
                this.inputModules[2].hidden = false;
            }
        }
        
        if(this.inputModules.length == 1)
        {
            this._isSingleComponent = true;
        }
        else
        {
            this._isSingleComponent = false;
        }
    }
    
    public get breadCrumbsPath():string
    {
        return this._breadCrumbsPath;
    }
    
    public set isSingleComponent(value:boolean)
    {
        this._isSingleComponent = value;
    }
    
    public get isSingleComponent():boolean
    {
        return this._isSingleComponent;
    }
    
    private onClick():void
    {
        this.inputModules.pop();
    }
    
    private copyPath():void
    {
        this._breadCrumbsPath = "";
        this.inputModules.forEach
        (
            (module) =>
            {
                if(this._breadCrumbsPath == '')
                {
                    this._breadCrumbsPath += module.name;
                }
                else
                {
                    this._breadCrumbsPath += '»' + module.name;
                }
            }
        )
    }
}
