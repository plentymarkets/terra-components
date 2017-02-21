import { TerraLoadingBarService } from './loading-bar/service/terra-loading-bar.service';
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
    TooltipModule,
    AlertModule,
    ModalModule,
    ButtonsModule
} from 'ng2-bootstrap';
import { TerraComponentsComponent } from './terra-components.component';
import { TerraTextInputComponent } from './forms/input/text-input/terra-text-input.component';
import { TerraNumberInputComponent } from './forms/input/number-input/terra-number-input.component';
import { TerraButtonComponent } from './button/terra-button.component';
import { TerraTreeComponent } from './tree/terra-tree.component';
import { TerraCheckboxTreeComponent } from './tree/checkbox-tree/terra-checkbox-tree.component';
import { TerraCheckboxComponent } from './forms/checkbox/terra-checkbox.component';
import { TerraRadioButtonComponent } from './forms/radio-button/terra-radio-button.component';
import { TerraSelectBoxComponent } from './forms/select-box/terra-select-box.component';
import { TerraMultiSelectBoxComponent } from './forms/multi-select-box/terra-multi-select-box.component';
import { TerraDclWrapperComponent } from './dcl-wrapper/terra-dcl-wrapper.component';
import { TerraBaseToolbarComponent } from './toolbar/base-toolbar/terra-base-toolbar.component';
import { TerraIndicatorComponent } from './indicator/terra-indicator.component';
import { TerraPagerComponent } from './pager/terra-pager.component';
import { TerraInfoboxComponent } from './infobox/terra-infobox.component';
import { TerraTaglistComponent } from './taglist/terra-taglist.component';
import { TerraTagComponent } from './tag/terra-tag.component';
import { TerraLoadingBarComponent } from './loading-bar/terra-loading-bar.component';
import { TerraOverlayComponent } from './overlay/terra-overlay.component';
import { TerraDataTableComponent } from './table/data-table/terra-data-table.component';
import { TerraDataTableContextMenuComponent } from './table/data-table/context-menu/terra-data-table-context-menu.component';
import { TerraDataTableContextMenuDirective } from './table/data-table/context-menu/directive/terra-data-table-context-menu.directive';
import { TerraDoubleInputComponent } from './forms/input/double-input/terra-double-input.component';
import { TerraPortletComponent } from './portlet/terra-portlet.component';
import { TerraSplitViewComponent } from './split-view/terra-split-view.component';
import { TerraFilterComponent } from './filter/terra-filter.component';
import { TerraDataTableContextMenuService } from './table/data-table/context-menu/service/terra-data-table-context-menu.service';
import { TerraBaseService } from './service/terra-base.service';
import { TerraAlertComponent } from './alert/terra-alert.component';
import { TerraAlertPanelComponent } from './alert/terra-alert-panel.component';
import { TerraDynamicModuleLoaderComponent } from './dynamic-module-loader/terra-dynamic-module-loader.component';
import { TerraSimpleTableComponent } from './table/simple/terra-simple-table.component';
import { ClipboardModule } from 'angular2-clipboard/src/clipboard.module';
import { COMPILER_PROVIDERS } from '@angular/compiler';
import {
    LocaleService,
    LocalizationService,
    LocaleModule,
    LocalizationModule
} from 'angular2localization';
import { TerraTileBoxComponent } from './tile/box/terra-tile-box.component';
import { TerraTileBoxPanelComponent } from './tile/panel/terra-tile-box-panel.component';
import { TerraSuggestionBoxComponent } from './forms/suggestion-box/terra-suggestion-box.component';
import { TerraDatePickerComponent } from './forms/input/date-picker/terra-date-picker.component';
import { MyDatePickerModule } from 'mydatepicker';
import { TerraTextAreaInputComponent } from './forms/input/text-area-input/terra-text-area-input.component';

export { TerraAlertPanelComponent } from './alert/terra-alert-panel.component';
export { TerraAlertComponent } from './alert/terra-alert.component';
export { TerraButtonInterface } from './button/data/terra-button.interface';
export { TerraButtonComponent } from './button/terra-button.component';
export { TerraBaseData } from './data/terra-base.data';
export { TerraDclWrapperComponent } from './dcl-wrapper/terra-dcl-wrapper.component';
export { TerraFilterComponent } from './filter/terra-filter.component';
export { TerraCheckboxComponent } from './forms/checkbox/terra-checkbox.component';
export { TerraRadioButtonComponent } from './forms/radio-button/terra-radio-button.component';
export { TerraInputComponent } from './forms/input/terra-input.component';
export { TerraDoubleInputComponent } from './forms/input/double-input/terra-double-input.component';
export { TerraNumberInputComponent } from './forms/input/number-input/terra-number-input.component';
export { TerraTextInputComponent } from './forms/input/text-input/terra-text-input.component';
export { TerraSelectBoxValueInterface } from './forms/select-box/data/terra-select-box.interface';
export { TerraSelectBoxComponent } from './forms/select-box/terra-select-box.component';
export { TerraMultiSelectBoxValueInterface } from './forms/multi-select-box/data/terra-multi-select-box-value.interface';
export { TerraMultiSelectBoxComponent } from './forms/multi-select-box/terra-multi-select-box.component';
export { TerraIndicatorComponent } from './indicator/terra-indicator.component';
export { TerraInfoboxComponent } from './infobox/terra-infobox.component';
export { TerraLoadingBarService } from './loading-bar/service/terra-loading-bar.service';
export { TerraLoadingBarComponent } from './loading-bar/terra-loading-bar.component';
export { TerraOverlayComponent } from './overlay/terra-overlay.component';
export { TerraOverlayButtonInterface } from './overlay/data/terra-overlay-button.interface';
export { TerraPagerInterface } from './pager/data/terra-pager.interface';
export { TerraPagerComponent } from './pager/terra-pager.component';
export { TerraPortletComponent } from './portlet/terra-portlet.component';
export { TerraRegex } from './regex/terra-regex';
export { TerraBaseService } from './service/terra-base.service';
export { TerraSplitViewInterface } from './split-view/data/terra-split-view.interface';
export { TerraSplitViewComponent } from './split-view/terra-split-view.component';
export { TerraDataTableCellInterface } from './table/data-table/cell/terra-data-table-cell.interface';
export { TerraDataTableHeaderCellInterface } from './table/data-table/cell/terra-data-table-header-cell.interface';
export { TerraSimpleTableCellInterface } from './table/simple/cell/terra-simple-table-cell.interface';
export { TerraSimpleTableHeaderCellInterface } from './table/simple/cell/terra-simple-table-header-cell.interface';
export { TerraSimpleTableComponent } from './table/simple/terra-simple-table.component';
export { TerraSimpleTableRowInterface } from './table/simple/row/terra-simple-table-row.interface';
export { TerraDataTableContextMenuDirective } from './table/data-table/context-menu/directive/terra-data-table-context-menu.directive';
export { TerraDataTableContextMenuEntryInterface } from './table/data-table/context-menu/data/terra-data-table-context-menu-entry.interface';
export { TerraDataTableContextMenuService } from './table/data-table/context-menu/service/terra-data-table-context-menu.service';
export { TerraDataTableContextMenuComponent } from './table/data-table/context-menu/terra-data-table-context-menu.component';
export { TerraDataTableComponent } from './table/data-table/terra-data-table.component';
export { TerraDataTableRowInterface } from './table/data-table/row/terra-data-table-row.interface';
export { TerraTagComponent } from './tag/terra-tag.component';
export { TerraTagInterface } from './tag/data/terra-tag.interface';
export { TerraTaglistComponent } from './taglist/terra-taglist.component';
export { TerraBaseToolbarComponent } from './toolbar/base-toolbar/terra-base-toolbar.component';
export { TerraTreeComponent } from './tree/terra-tree.component';
export { TerraBaseTreeComponent } from './tree/base/terra-base-tree.component';
export { TerraCheckboxTreeComponent } from './tree/checkbox-tree/terra-checkbox-tree.component';
export { TerraLeafInterface } from './tree/leaf/terra-leaf.interface';
export { TerraDynamicModuleLoaderComponent } from './dynamic-module-loader/terra-dynamic-module-loader.component';
export { TerraTileBoxComponent } from './tile/box/terra-tile-box.component';
export { TerraTileBoxPanelComponent } from './tile/panel/terra-tile-box-panel.component';
export { TerraTileBoxInterface } from './tile/box/data/terra-tile-box.interface';
export { TerraTileBoxColor } from './tile/box/data/terra-tile-box-color';
export { TerraSuggestionBoxComponent } from './forms/suggestion-box/terra-suggestion-box.component';
export { TerraDatePickerComponent } from './forms/input/date-picker/terra-date-picker.component';
export { TerraTextAreaInputComponent } from './forms/input/text-area-input/terra-text-area-input.component';

@NgModule({
              declarations:    [
                  TerraComponentsComponent,
                  TerraAlertPanelComponent,
                  TerraDclWrapperComponent,
                  TerraTextInputComponent,
                  TerraNumberInputComponent,
                  TerraButtonComponent,
                  TerraTreeComponent,
                  TerraCheckboxTreeComponent,
                  TerraCheckboxComponent,
                  TerraRadioButtonComponent,
                  TerraSelectBoxComponent,
                  TerraBaseToolbarComponent,
                  TerraIndicatorComponent,
                  TerraPagerComponent,
                  TerraIndicatorComponent,
                  TerraInfoboxComponent,
                  TerraTaglistComponent,
                  TerraTagComponent,
                  TerraLoadingBarComponent,
                  TerraOverlayComponent,
                  TerraDataTableComponent,
                  TerraDataTableContextMenuComponent,
                  TerraDataTableContextMenuDirective,
                  TerraSimpleTableComponent,
                  TerraDoubleInputComponent,
                  TerraPortletComponent,
                  TerraSplitViewComponent,
                  TerraFilterComponent,
                  TerraMultiSelectBoxComponent,
                  TerraDynamicModuleLoaderComponent,
                  TerraTileBoxComponent,
                  TerraTileBoxPanelComponent,
                  TerraSuggestionBoxComponent,
                  TerraDatePickerComponent,
                  TerraTextAreaInputComponent
              ],
              entryComponents: [
                  TerraTextInputComponent,
                  TerraNumberInputComponent,
                  TerraButtonComponent,
                  TerraTreeComponent,
                  TerraCheckboxTreeComponent,
                  TerraCheckboxComponent,
                  TerraRadioButtonComponent,
                  TerraSelectBoxComponent,
                  TerraBaseToolbarComponent,
                  TerraIndicatorComponent,
                  TerraPagerComponent,
                  TerraIndicatorComponent,
                  TerraInfoboxComponent,
                  TerraTaglistComponent,
                  TerraTagComponent,
                  TerraLoadingBarComponent,
                  TerraOverlayComponent,
                  TerraDataTableComponent,
                  TerraDataTableContextMenuComponent,
                  TerraSimpleTableComponent,
                  TerraDoubleInputComponent,
                  TerraPortletComponent,
                  TerraSplitViewComponent,
                  TerraFilterComponent,
                  TerraMultiSelectBoxComponent,
                  TerraTileBoxComponent,
                  TerraTileBoxPanelComponent,
                  TerraSuggestionBoxComponent,
                  TerraDatePickerComponent,
                  TerraTextAreaInputComponent
              ],
              exports:         [
                  TerraAlertPanelComponent,
                  TerraDclWrapperComponent,
                  TerraTextInputComponent,
                  TerraNumberInputComponent,
                  TerraButtonComponent,
                  TerraTreeComponent,
                  TerraCheckboxTreeComponent,
                  TerraCheckboxComponent,
                  TerraRadioButtonComponent,
                  TerraSelectBoxComponent,
                  TerraBaseToolbarComponent,
                  TerraIndicatorComponent,
                  TerraPagerComponent,
                  TerraIndicatorComponent,
                  TerraInfoboxComponent,
                  TerraTaglistComponent,
                  TerraTagComponent,
                  TerraLoadingBarComponent,
                  TerraOverlayComponent,
                  TerraDataTableComponent,
                  TerraDataTableContextMenuComponent,
                  TerraSimpleTableComponent,
                  TerraDoubleInputComponent,
                  TerraPortletComponent,
                  TerraSplitViewComponent,
                  TerraFilterComponent,
                  TerraMultiSelectBoxComponent,
                  TerraDynamicModuleLoaderComponent,
                  TerraTileBoxComponent,
                  TerraTileBoxPanelComponent,
                  TerraSuggestionBoxComponent,
                  TerraDatePickerComponent,
                  TerraTextAreaInputComponent
              ],
              imports:         [
                  BrowserModule,
                  FormsModule,
                  ReactiveFormsModule,
                  ModalModule.forRoot(),
                  HttpModule,
                  TooltipModule.forRoot(),
                  AlertModule.forRoot(),
                  ButtonsModule.forRoot(),
                  ClipboardModule,
                  LocaleModule,
                  LocalizationModule,
                  MyDatePickerModule
              ],
              providers:       [
                  COMPILER_PROVIDERS,
                  LocaleService,
                  LocalizationService
              ],
              bootstrap:       [
                  //TerraComponentsComponent
              ]
          })
export class TerraComponentsModule
{
    static forRoot():ModuleWithProviders
    {
        return {
            ngModule:  TerraComponentsModule,
            providers: [TerraLoadingBarService,
                        TerraDataTableContextMenuService,
                        TerraBaseService,
                        TerraAlertComponent]
        };
    }
    
    static forChild():ModuleWithProviders
    {
        return {
            ngModule:  TerraComponentsModule,
            providers: [TerraLoadingBarService,
                        TerraDataTableContextMenuService,
                        TerraBaseService,
                        TerraAlertComponent]
        };
    }
    
}
