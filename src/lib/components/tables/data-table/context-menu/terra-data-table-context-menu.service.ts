import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TerraBaseData } from '../../../data/terra-base.data';

/**
 * @author mkunze
 * @deprecated since v5.
 */
@Injectable()
export class TerraDataTableContextMenuService<D extends TerraBaseData> {
    /**
     * @description channel for component <-> directive communication which is used to open the context menu on click
     */
    public show: Subject<{ event: MouseEvent; data: D }> = new Subject<{ event: MouseEvent; data: D }>();
}
