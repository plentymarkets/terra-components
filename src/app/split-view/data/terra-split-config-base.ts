import { TerraSplitViewInterface } from './terra-split-view.interface';

export class TerraSplitConfigBase
{
    private _modules:Array<TerraSplitViewInterface> = [];
    
    public addModule(module:TerraSplitViewInterface):void
    {
        for (let i = 0; i < this._modules.length; i++)
        {
            // check if this module is already loaded
            if (this._modules[i].mainComponentName == module.mainComponentName ||
                (this._modules[i].instanceKey != null && this._modules[i].instanceKey == module.instanceKey))
            {
                if (this._modules[i].parameter == module.parameter)
                {
                    // same module, same parameters => do nothing
                    return;
                }
                // same module, different parameters => drop old instance (including child modules) and reload
                this._modules = this._modules.slice(0, i);
                break;
            }
        }
        this._modules.push(module);
        this._modules = this._modules.slice(0);
    }
    
    public get modules():Array<TerraSplitViewInterface>
    {
        return this._modules;
    }
    
    public set modules(value:Array<TerraSplitViewInterface>)
    {
        this._modules = value;
    }
}