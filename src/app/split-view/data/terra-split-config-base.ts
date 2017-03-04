import { TerraSplitViewInterface } from "./terra-split-view.interface";

export class TerraSplitConfigBase
{
    public _modules:Array<TerraSplitViewInterface> = [];

    public addModule(module:TerraSplitViewInterface):void
    {
        for (var i = 0; i < this._modules.length; i++)
        {
            // check if this module is already loaded
            if (this._modules[i].mainComponentName == module.mainComponentName)
            {
                // TODO: == might not be sufficient here
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
}