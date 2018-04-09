import { TerraSplitViewInterface } from './terra-split-view.interface';
import { isNull } from 'util';

export class TerraSplitConfigBase
{
    public modules:Array<TerraSplitViewInterface> = [];

    public addModule(module:TerraSplitViewInterface):void
    {
        for(let i:number = 0; i < this.modules.length; i++)
        {
            let hasSameModuleName:boolean = !isNull(this.modules[i].mainComponentName) &&
                                    this.modules[i].mainComponentName === module.mainComponentName;

            let hasSameInstanceKey:boolean = !isNull(this.modules[i].instanceKey) &&
                                     this.modules[i].instanceKey === module.instanceKey;

            let hasSameParams:boolean = JSON.stringify(this.modules[i].parameter) === JSON.stringify(module.parameter);

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
