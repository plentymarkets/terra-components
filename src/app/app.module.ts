import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { PlentyCheckboxTree} from './tree/checkbox-tree/plenty-checkbox-tree.component';
import { PlentyCheckbox } from './forms/checkbox/plenty-checkbox.component';
import { PlentySelectBox } from './forms/select-box/plenty-select-box.component';
import { PlentyDclWrapper } from './dcl-wrapper/plenty-dcl-wrapper.component';
import { PlentyBaseToolbar } from './toolbar/base-toolbar/plenty-base-toolbar.component';
import { PlentyIndicator } from './indicator/plenty-indicator.component';
import { PlentyPagerComponent } from './pager/plenty-pager.component';
import { PlentyInfobox } from './infobox/plenty-infobox.component';
import { PlentyTaglist } from './taglist/plenty-taglist.component';
import { PlentyTag } from './tag/plenty-tag.component';
import { PlentyLoadingBar } from './loading-bar/plenty-loading-bar.component';
import { PlentyOverlay } from './overlay/plenty-overlay.component';
import { PlentyDataTable } from './table/data-table/plenty-data-table.component';
import { PlentyDataTableContextMenu } from './table/data-table/context-menu/plenty-data-table-context-menu.component';
import { PlentyDataTableContextMenuDirective } from './table/data-table/context-menu/directive/plenty-data-table-context-menu.directive';
import { PlentyDoubleInput } from './forms/input/double-input/plenty-double-input.component';

@NgModule({
              declarations: [
                  AppComponent,
                  PlentyTextInput,
                  PlentyNumberInput,
                  PlentyButton,
                  PlentyTree,
                  PlentyCheckboxTree,
                  PlentyCheckbox,
                  PlentySelectBox,
                  PlentyDclWrapper,
                  PlentyBaseToolbar,
                  PlentyIndicator,
                  PlentyPagerComponent,
                  PlentyIndicator,
                  PlentyInfobox,
                  PlentyTaglist,
                  PlentyTag,
                  PlentyLoadingBar,
                  PlentyOverlay,
                  PlentyDataTable,
                  PlentyDataTableContextMenu,
                  PlentyDataTableContextMenuDirective,
                  PlentyDoubleInput
              ],
              imports:      [
                  BrowserModule,
                  FormsModule,
                  ReactiveFormsModule,
                  ModalModule,
                  HttpModule,
                  Ng2BootstrapModule,
                  TooltipModule,
                  AlertModule,
                  ModalModule
              ],
              providers:    [],
              bootstrap:    [AppComponent]
          })
export class AppModule
{
}
