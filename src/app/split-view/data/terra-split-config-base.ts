import { TerraSplitViewInterface } from './terra-split-view.interface';

export class TerraSplitConfigBase
{
    private _modules:Array<TerraSplitViewInterface> = [];

    public addModule(module:TerraSplitViewInterface):void
    {
        for(let i = 0; i < this._modules.length; i++)
        {
            let hasSameModuleName = this._modules[i].mainComponentName != null &&
                                    this._modules[i].mainComponentName == module.mainComponentName;

            let hasSameInstanceKey = this._modules[i].instanceKey != null &&
                                     this._modules[i].instanceKey == module.instanceKey;

            let hasSameParams = JSON.stringify(this._modules[i].parameter) == JSON.stringify(module.parameter);

            if(hasSameModuleName && hasSameInstanceKey)
            {
                if(hasSameParams)
                {
                    return;
                }

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
