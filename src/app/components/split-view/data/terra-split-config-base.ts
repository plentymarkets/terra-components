import { TerraSplitViewInterface } from './terra-split-view.interface';

export class TerraSplitConfigBase
{
    public modules:Array<TerraSplitViewInterface> = [];

    public addModule(module:TerraSplitViewInterface):void
    {
        for(let i = 0; i < this.modules.length; i++)
        {
            let hasSameModuleName = this.modules[i].mainComponentName != null &&
                                    this.modules[i].mainComponentName == module.mainComponentName;

            let hasSameInstanceKey = this.modules[i].instanceKey != null &&
                                     this.modules[i].instanceKey == module.instanceKey;

            let hasSameParams = JSON.stringify(this.modules[i].parameter) == JSON.stringify(module.parameter);

            if(hasSameModuleName && hasSameInstanceKey)
            {
                if(hasSameParams)
                {
                    return;
                }

                this.modules = this.modules.slice(0, i);
                break;
            }
        }
        this.modules.push(module);
        this.modules = this.modules.slice(0);
    }
}
