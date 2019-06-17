import { Provider } from '@angular/core';
import { TerraDynamicFormService } from '../components/forms/dynamic-form/service/terra-dynamic-form.service';
import { TerraMultiSplitViewBreadcrumbsService } from '../components/split-view/multi/injectables/terra-multi-split-view-breadcrumbs.service';
import { TerraFormFieldControlService } from '../components/forms/dynamic-form/service/terra-form-field-control.service';
import { TerraFileBrowserService } from '../components/file-browser/terra-file-browser.service';

export const services:Array<Provider> = [
    TerraFileBrowserService,
    TerraDynamicFormService,
    TerraFormFieldControlService,
    TerraMultiSplitViewBreadcrumbsService
];
