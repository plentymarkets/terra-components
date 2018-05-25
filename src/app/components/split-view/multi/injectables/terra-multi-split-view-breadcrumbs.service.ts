import { Injectable } from '@angular/core';
import { TerraKeyValueInterface } from '../../../../../';

@Injectable()
export class TerraMultiSplitViewBreadcrumbsService
{
    public breadcrumbList:TerraKeyValueInterface<Array<string>> = {};
}
