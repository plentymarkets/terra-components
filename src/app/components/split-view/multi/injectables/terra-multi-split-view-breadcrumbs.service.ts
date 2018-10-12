import { Injectable } from '@angular/core';
import { TerraKeyValueInterface } from '../../../../../';
/**
 * @deprecated Will be removed in the next major release.
 */
@Injectable()
export class TerraMultiSplitViewBreadcrumbsService
{
    public breadcrumbList:TerraKeyValueInterface<Array<string>> = {};
}
