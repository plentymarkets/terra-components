/**
 * @author mkunze
 */
import { Injectable } from '@angular/core';
import { TerraBaseData } from '../data/terra-base.data';
import { Subject } from 'rxjs';

@Injectable()
export class ContextMenuService<D extends TerraBaseData>
{
    /**
     * @description channel for component <-> directive communication which is used to open the context menu on click
     */
    public show:Subject<MouseEvent> =
        new Subject<MouseEvent>();
}
