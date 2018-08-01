import { Injectable } from '@angular/core';
import { TerraTwoColumnsContainerDirective } from '../terra-two-columns-container.directive';
import { TerraTwoColumnsContainerComponent } from '../terra-two-columns-container.component';

@Injectable()
export class TerraTwoColumnsConfig
{
    public component:TerraTwoColumnsContainerComponent;

    constructor()
    {
    }
}
