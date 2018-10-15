import { Provider } from '@angular/core';
import { TerraLoadingSpinnerService } from '../components/loading-spinner/service/terra-loading-spinner.service';
import { TerraBaseService } from './terra-base.service';
import { TerraFrontendStorageService } from '../components/file-browser/terra-frontend-storage.service';
import { TerraAlertComponent } from '../components/alert/terra-alert.component';
import { TerraDynamicFormService } from '../components/forms/dynamic-form/service/terra-dynamic-form.service';
import { TerraDataTableContextMenuService } from '../components/tables/data-table/context-menu/service/terra-data-table-context-menu.service';
import { TerraBreadcrumbsService } from '../components/breadcrumbs/service/terra-breadcrumbs.service';
import { TerraJsonToFormFieldService } from '../components/forms/dynamic-form/service/terra-json-to-form-field.service';
import { TerraMultiSplitViewBreadcrumbsService } from '../components/split-view/multi/injectables/terra-multi-split-view-breadcrumbs.service';
import { TerraFormFieldControlService } from '../components/forms/dynamic-form/service/terra-form-field-control.service';

export const services:Array<Provider> = [
    TerraLoadingSpinnerService,
    TerraDataTableContextMenuService,
    TerraBaseService,
    TerraFrontendStorageService,
    TerraAlertComponent,
    TerraDynamicFormService,
    TerraFormFieldControlService,
    TerraJsonToFormFieldService,
    TerraMultiSplitViewBreadcrumbsService,
    TerraBreadcrumbsService
];
