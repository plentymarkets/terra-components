import { PlentyLoadingBarService } from './loading-bar/service/plenty-loading-bar.service';
export { PlentyAlertPanel } from './alert/plenty-alert-panel.component';
export { PlentyAlert } from './alert/plenty-alert.component';
export { PlentyButtonInterface } from './button/interface/plenty-button-interface';
export { PlentyButton } from './button/plenty-button.component';
export { BaseData } from './data/base-data';
export { PlentyDclWrapper } from './dcl-wrapper/plenty-dcl-wrapper.component';
export { PlentyFilter } from './filter/plenty-filter.component';
export { PlentyCheckbox } from './forms/checkbox/plenty-checkbox.component';
export { PlentyInput } from './forms/input/plenty-input.component';
export { PlentyDoubleInput } from './forms/input/double-input/plenty-double-input.component';
export { PlentyNumberInput } from './forms/input/number-input/plenty-number-input.component';
export { PlentyTextInput } from './forms/input/text-input/plenty-text-input.component';
export { PlentySelectBoxValue } from './forms/select-box/value/plenty-select-box-value';
export { PlentySelectBox } from './forms/select-box/plenty-select-box.component';
export { PlentyIndicator } from './indicator/plenty-indicator.component';
export { PlentyInfobox } from './infobox/plenty-infobox.component';
export { PlentyLoadingBarService } from './loading-bar/service/plenty-loading-bar.service';
export { PlentyLoadingBar } from './loading-bar/plenty-loading-bar.component';
export { PlentyOverlay } from './overlay/plenty-overlay.component';
export { PlentyPagerData } from './pager/data/plenty-pager-data';
export { PlentyPager } from './pager/plenty-pager.component';
export { PlentyPortlet } from './portlet/plenty-portlet.component';
export { PlentyRegex } from './regex/plenty-regex';
export { BaseService } from './service/base.service';
export { PlentySplitViewData } from './split-view/data/plenty-split-view-data';
export { PlentySplitViewComponent } from './split-view/plenty-split-view.component';
export { PlentyTableCell } from './table/cell/plenty-table-cell';
export { PlentyTableHeaderCell } from './table/cell/plenty-table-header-cell';
export { PlentyDataTableContextMenuDirective } from './table/data-table/context-menu/directive/plenty-data-table-context-menu.directive';
export { PlentyDataTableContextMenuEntry } from './table/data-table/context-menu/interface/plenty-data-table-context-menu-entry';
export { PlentyDataTableContextMenuService } from './table/data-table/context-menu/service/plenty-data-table-context-menu.service';
export { PlentyDataTableContextMenu } from './table/data-table/context-menu/plenty-data-table-context-menu.component';
export { PlentyDataTable } from './table/data-table/plenty-data-table.component';
export { PlentyTableRow } from './table/row/plenty-table-row';
export { PlentyTag } from './tag/plenty-tag.component';
export { PlentyTagData } from './tag/data/plenty-tag-data';
export { PlentyTaglist } from './taglist/plenty-taglist.component';
export { PlentyBaseToolbar } from './toolbar/base-toolbar/plenty-base-toolbar.component';
export { PlentyTree } from './tree/plenty-tree.component';
export { PlentyBaseTree } from './tree/base/plenty-base-tree.component';
export { PlentyCheckboxTree } from './tree/checkbox-tree/plenty-checkbox-tree.component';
export { PlentyLeaf } from './tree/leaf/plenty-leaf.component';

import { BrowserModule } from '@angular/platform-browser';
import {
    NgModule,
    ModuleWithProviders
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    Ng2BootstrapModule,
    TooltipModule,
    AlertModule,
    ModalModule
} from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { PlentyTextInput } from './forms/input/text-input/plenty-text-input.component';
import { PlentyNumberInput } from './forms/input/number-input/plenty-number-input.component';
import { PlentyButton } from './button/plenty-button.component';
import { PlentyTree } from './tree/plenty-tree.component';
import { PlentyCheckboxTree } from './tree/checkbox-tree/plenty-checkbox-tree.component';
import { PlentyCheckbox } from './forms/checkbox/plenty-checkbox.component';
import { PlentySelectBox } from './forms/select-box/plenty-select-box.component';
import { PlentyDclWrapper } from './dcl-wrapper/plenty-dcl-wrapper.component';
import { PlentyBaseToolbar } from './toolbar/base-toolbar/plenty-base-toolbar.component';
import { PlentyIndicator } from './indicator/plenty-indicator.component';
import { PlentyPager } from './pager/plenty-pager.component';
import { PlentyInfobox } from './infobox/plenty-infobox.component';
import { PlentyTaglist } from './taglist/plenty-taglist.component';
import { PlentyTag } from './tag/plenty-tag.component';
import { PlentyLoadingBar } from './loading-bar/plenty-loading-bar.component';
import { PlentyOverlay } from './overlay/plenty-overlay.component';
import { PlentyDataTable } from './table/data-table/plenty-data-table.component';
import { PlentyDataTableContextMenu } from './table/data-table/context-menu/plenty-data-table-context-menu.component';
import { PlentyDataTableContextMenuDirective } from './table/data-table/context-menu/directive/plenty-data-table-context-menu.directive';
import { PlentyDoubleInput } from './forms/input/double-input/plenty-double-input.component';
import { PlentyPortlet } from './portlet/plenty-portlet.component';
import { PlentySplitViewComponent } from './split-view/plenty-split-view.component';
import { PlentyFilter } from './filter/plenty-filter.component';
import { PlentyDataTableContextMenuService } from './table/data-table/context-menu/service/plenty-data-table-context-menu.service';
import { BaseService } from './service/base.service';
import { PlentyAlert } from './alert/plenty-alert.component';
import { PlentyMultiSelectBox } from './forms/multi-select-box/plenty-multi-select-box.component';
import { PlentyAlertPanel } from './alert/plenty-alert-panel.component';

@NgModule({
              declarations:    [
                  AppComponent,
                  PlentyAlertPanel,
                  PlentyDclWrapper,
                  PlentyTextInput,
                  PlentyNumberInput,
                  PlentyButton,
                  PlentyTree,
                  PlentyCheckboxTree,
                  PlentyCheckbox,
                  PlentySelectBox,
                  PlentyBaseToolbar,
                  PlentyIndicator,
                  PlentyPager,
                  PlentyIndicator,
                  PlentyInfobox,
                  PlentyTaglist,
                  PlentyTag,
                  PlentyLoadingBar,
                  PlentyOverlay,
                  PlentyDataTable,
                  PlentyDataTableContextMenu,
                  PlentyDataTableContextMenuDirective,
                  PlentyDoubleInput,
                  PlentyPortlet,
                  PlentySplitViewComponent,
                  PlentyFilter,
                  PlentyMultiSelectBox
              ],
              entryComponents: [
                  PlentyTextInput,
                  PlentyNumberInput,
                  PlentyButton,
                  PlentyTree,
                  PlentyCheckboxTree,
                  PlentyCheckbox,
                  PlentySelectBox,
                  PlentyBaseToolbar,
                  PlentyIndicator,
                  PlentyPager,
                  PlentyIndicator,
                  PlentyInfobox,
                  PlentyTaglist,
                  PlentyTag,
                  PlentyLoadingBar,
                  PlentyOverlay,
                  PlentyDataTable,
                  PlentyDataTableContextMenu,
                  PlentyDoubleInput,
                  PlentyPortlet,
                  PlentySplitViewComponent,
                  PlentyFilter
              ],
              exports:         [
                  PlentyAlertPanel,
                  PlentyDclWrapper,
                  PlentyTextInput,
                  PlentyNumberInput,
                  PlentyButton,
                  PlentyTree,
                  PlentyCheckboxTree,
                  PlentyCheckbox,
                  PlentySelectBox,
                  PlentyBaseToolbar,
                  PlentyIndicator,
                  PlentyPager,
                  PlentyIndicator,
                  PlentyInfobox,
                  PlentyTaglist,
                  PlentyTag,
                  PlentyLoadingBar,
                  PlentyOverlay,
                  PlentyDataTable,
                  PlentyDataTableContextMenu,
                  PlentyDoubleInput,
                  PlentyPortlet,
                  PlentySplitViewComponent,
                  PlentyFilter
              ],
              imports:         [
                  BrowserModule,
                  FormsModule,
                  ReactiveFormsModule,
                  ModalModule,
                  HttpModule,
                  TooltipModule,
                  AlertModule
              ],
    // bootstrap: [AppComponent]
          })
export class AppModule
{
    static forRoot():ModuleWithProviders
    {
        return {
            ngModule:  AppModule,
            providers: [PlentyLoadingBarService,
                        PlentyDataTableContextMenuService,
                        BaseService,
                        PlentyAlert]
        };
    }

    static forChild():ModuleWithProviders
    {
        return {
            ngModule:  AppModule,
            providers: [PlentyLoadingBarService,
                        PlentyDataTableContextMenuService,
                        BaseService,
                        PlentyAlert]
        };
    }

}
