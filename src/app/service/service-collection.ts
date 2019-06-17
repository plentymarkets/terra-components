import { Provider } from '@angular/core';
import { TerraFrontendStorageService } from '../components/file-browser/terra-frontend-storage.service';
import { TerraDynamicFormService } from '../components/forms/dynamic-form/service/terra-dynamic-form.service';
import { TerraBreadcrumbsService } from '../components/breadcrumbs/service/terra-breadcrumbs.service';
import { TerraJsonToFormFieldService } from '../components/forms/dynamic-form/service/terra-json-to-form-field.service';
import { TerraMultiSplitViewBreadcrumbsService } from '../components/split-view/multi/injectables/terra-multi-split-view-breadcrumbs.service';
import { TerraFormFieldControlService } from '../components/forms/dynamic-form/service/terra-form-field-control.service';
import { TerraFileBrowserService } from '../components/file-browser/terra-file-browser.service';

export const services:Array<Provider> = [
    TerraFileBrowserService,
    TerraFrontendStorageService,
    TerraDynamicFormService,
    TerraFormFieldControlService,
    TerraJsonToFormFieldService,
    TerraMultiSplitViewBreadcrumbsService,
    TerraBreadcrumbsService
];
