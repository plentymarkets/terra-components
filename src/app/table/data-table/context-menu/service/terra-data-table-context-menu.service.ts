import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { TerraDataTableContextMenuEntryInterface } from '../data/terra-data-table-context-menu-entry.interface';
import { TerraBaseData } from '../../../../data/terra-base.data';

/**
 * @author mkunze
 */
@Injectable()
export class TerraDataTableContextMenuService<D extends TerraBaseData>
{
    public show:Subject<{ event:MouseEvent, obj:TerraDataTableContextMenuEntryInterface<D>[] }> =
        new Subject<{ event:MouseEvent, obj:TerraDataTableContextMenuEntryInterface<D>[] }>();

    public init:Subject<TerraDataTableContextMenuEntryInterface<D>[]> =
        new Subject<TerraDataTableContextMenuEntryInterface<D>[]>();
}
