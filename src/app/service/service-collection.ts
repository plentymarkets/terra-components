import { Provider } from '@angular/core';
import {
    TerraAlertComponent,
    TerraBaseService,
    TerraBreadcrumbsService,
    TerraDataTableContextMenuService,
    TerraDynamicFormService,
    TerraFormFieldControlService,
    TerraFrontendStorageService,
    TerraJsonToFormFieldService,
    TerraLoadingSpinnerService,
    TerraMultiSplitViewBreadcrumbsService
} from '../..';
import { TerraNavigatorSplitViewConfig } from '../components/navigator/config/terra-navigator-split-view.config';
import { TerraUrlParamsDecorator } from './data/terra-url-params-decorator.service';

export const services:Array<Provider> = [
    TerraLoadingSpinnerService,
    TerraDataTableContextMenuService,
    TerraBaseService,
    TerraNavigatorSplitViewConfig,
    TerraUrlParamsDecorator,
    TerraFrontendStorageService,
    TerraAlertComponent,
    TerraDynamicFormService,
    TerraFormFieldControlService,
    TerraJsonToFormFieldService,
    TerraMultiSplitViewBreadcrumbsService,
    TerraBreadcrumbsService
];
