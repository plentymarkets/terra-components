import {
    ModuleWithProviders,
    NgModule
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    AlertModule,
    ButtonsModule,
    ModalModule,
    TooltipModule
} from 'ngx-bootstrap';
import { QuillModule } from 'ngx-quill';
import { TerraComponentsComponent } from './terra-components.component';
import { TerraAlertPanelComponent } from './components/alert/terra-alert-panel.component';
import { TerraTextInputComponent } from './components/forms/input/text-input/terra-text-input.component';
import { TerraColorPickerComponent } from './components/forms/input/color-picker/terra-color-picker.component';
import { TerraNumberInputComponent } from './components/forms/input/number-input/terra-number-input.component';
import { TerraButtonComponent } from './components/buttons/button/terra-button.component';
import { TerraTreeComponent } from './components/tree/terra-tree.component';
import { TerraCheckboxTreeComponent } from './components/tree/checkbox-tree/terra-checkbox-tree.component';
import { TerraCheckboxComponent } from './components/forms/checkbox/terra-checkbox.component';
import { TerraRadioButtonComponent } from './components/forms/radio-button/terra-radio-button.component';
import { TerraSelectBoxComponent } from './components/forms/select-box/terra-select-box.component';
import { TerraBaseToolbarComponent } from './components/toolbar/base-toolbar/terra-base-toolbar.component';
import { TerraIndicatorComponent } from './components/indicator/terra-indicator.component';
import { TerraPagerComponent } from './components/pager/terra-pager.component';
import { TerraInfoBoxComponent } from './components/layouts/info-box/terra-info-box.component';
import { TerraTaglistComponent } from './components/layouts/taglist/terra-taglist.component';
import { TerraTagComponent } from './components/layouts/tag/terra-tag.component';
import { TerraLoadingSpinnerComponent } from './components/loading-spinner/terra-loading-spinner.component';
import { TerraOverlayComponent } from './components/layouts/overlay/terra-overlay.component';
import { TerraDataTableComponent } from './components/tables/data-table/terra-data-table.component';
import { TerraDataTableContextMenuComponent } from './components/tables/data-table/context-menu/terra-data-table-context-menu.component';
import { TerraDataTableContextMenuDirective } from './components/tables/data-table/context-menu/directive/terra-data-table-context-menu.directive';
import { TerraSimpleTableComponent } from './components/tables/simple/terra-simple-table.component';
import { TerraDoubleInputComponent } from './components/forms/input/double-input/terra-double-input.component';
import { TerraSplitViewComponent } from './components/split-view/terra-split-view.component';
import { TerraPortletComponent } from './components/layouts/portlet/terra-portlet.component';
import { TerraFilterComponent } from './components/filter/terra-filter.component';
import { TerraMultiSelectBoxComponent } from './components/forms/multi-select-box/terra-multi-select-box.component';
import { TerraDynamicComponentLoaderComponent } from './components/dynamic-component-loader/terra-dynamic-component-loader.component';
import { TerraDynamicModuleLoaderComponent } from './components/dynamic-module-loader/terra-dynamic-module-loader.component';
import { TerraTileBoxComponent } from './components/tile/box/terra-tile-box.component';
import { TerraTileBoxPanelComponent } from './components/tile/panel/terra-tile-box-panel.component';
import { TerraSuggestionBoxComponent } from './components/forms/suggestion-box/terra-suggestion-box.component';
import { TerraDatePickerComponent } from './components/forms/input/date-picker/terra-date-picker.component';
import { TerraTextAreaInputComponent } from './components/forms/input/text-area-input/terra-text-area-input.component';
import { TerraCardComponent } from './components/layouts/card/terra-card.component';
import { TerraNavigatorComponent } from './components/navigator/terra-navigator.component';
import { TerraToggleComponent } from './components/buttons/toggle/terra-toggle.component';
import { TerraSyntaxEditorComponent } from './components/editors/syntax-editor/terra-syntax-editor.component';
import { TerraMultiSplitViewComponent } from './components/split-view/multi/terra-multi-split-view.component';
import { TerraSliderComponent } from './components/forms/slider/terra-slider.component';
import { TerraFileBrowserComponent } from './components/file-browser/terra-file-browser.component';
import { TerraFileInputComponent } from './components/forms/input/file-input/terra-file-input.component';
import { TerraNoResultNoticeComponent } from './components/no-result/terra-no-result-notice.component';
import { TerraButtonWithOptionsComponent } from './components/buttons/button-with-options/terra-button-with-options.component';
import { FixedHeaderDirective } from './components/tables/fixed-header/fixed-header.directive';
import { TerraNoteEditorComponent } from './components/editors/note-editor/terra-note-editor.component';
import { TerraNoteComponent } from './components/note/terra-note.component';
import { TerraNodeTreeComponent } from './components/tree/node-tree/terra-node-tree.component';
import { TerraNodeComponent } from './components/tree/node-tree/node/terra-node.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MyDatePickerModule } from 'mydatepicker';
import { TranslationModule } from 'angular-l10n';
import { AceEditorModule } from 'ng2-ace-editor';
import { TerraInteractModule } from './components/interactables/interact.module';
import { COMPILER_PROVIDERS } from '@angular/compiler';
import { TerraNavigatorSplitViewConfig } from './components/navigator/config/terra-navigator-split-view.config';
import { TerraFrontendStorageService } from './components/file-browser/terra-frontend-storage.service';
import { TerraFileBrowserService } from './components/file-browser/terra-file-browser.service';
import { TerraLoadingSpinnerService } from './components/loading-spinner/service/terra-loading-spinner.service';
import { TerraDataTableContextMenuService } from './components/tables/data-table/context-menu/service/terra-data-table-context-menu.service';
import { TerraBaseService } from './service/terra-base.service';
import { TerraUrlParamsDecorator } from './service/data/terra-url-params-decorator.service';
import { TerraAlertComponent } from './components/alert/terra-alert.component';
import { TerraInfoComponent } from './components/info/terra-info.component';

@NgModule({
    declarations:    [
        TerraComponentsComponent,
        TerraAlertPanelComponent,
        TerraTextInputComponent,
        TerraColorPickerComponent,
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
        TerraInfoBoxComponent,
        TerraTaglistComponent,
        TerraTagComponent,
        TerraLoadingSpinnerComponent,
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
        TerraDynamicComponentLoaderComponent,
        TerraDynamicModuleLoaderComponent,
        TerraTileBoxComponent,
        TerraTileBoxPanelComponent,
        TerraSuggestionBoxComponent,
        TerraDatePickerComponent,
        TerraTextAreaInputComponent,
        TerraCardComponent,
        TerraNavigatorComponent,
        TerraToggleComponent,
        TerraSyntaxEditorComponent,
        TerraMultiSplitViewComponent,
        TerraSliderComponent,
        TerraFileBrowserComponent,
        TerraFileInputComponent,
        TerraNoResultNoticeComponent,
        TerraButtonWithOptionsComponent,
        FixedHeaderDirective,
        TerraNoteEditorComponent,
        TerraNoteComponent,
        TerraNodeTreeComponent,
        TerraNodeComponent,
        TerraInfoComponent
    ],
    entryComponents: [
        TerraAlertPanelComponent,
        TerraTextInputComponent,
        TerraColorPickerComponent,
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
        TerraInfoBoxComponent,
        TerraTaglistComponent,
        TerraTagComponent,
        TerraLoadingSpinnerComponent,
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
        TerraTextAreaInputComponent,
        TerraCardComponent,
        TerraNavigatorComponent,
        TerraToggleComponent,
        TerraSyntaxEditorComponent,
        TerraMultiSplitViewComponent,
        TerraSliderComponent,
        TerraFileBrowserComponent,
        TerraFileInputComponent,
        TerraButtonWithOptionsComponent,
        TerraNoteEditorComponent,
        TerraNoteComponent,
        TerraNodeTreeComponent,
        TerraNodeComponent,
        TerraInfoComponent
    ],
    exports:         [
        TerraAlertPanelComponent,
        TerraTextInputComponent,
        TerraColorPickerComponent,
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
        TerraInfoBoxComponent,
        TerraTaglistComponent,
        TerraTagComponent,
        TerraLoadingSpinnerComponent,
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
        TerraDynamicComponentLoaderComponent,
        TerraDynamicModuleLoaderComponent,
        TerraTileBoxComponent,
        TerraTileBoxPanelComponent,
        TerraSuggestionBoxComponent,
        TerraDatePickerComponent,
        TerraTextAreaInputComponent,
        TerraCardComponent,
        TerraNavigatorComponent,
        TerraToggleComponent,
        TerraSyntaxEditorComponent,
        TerraMultiSplitViewComponent,
        TerraSliderComponent,
        TerraFileBrowserComponent,
        TerraFileInputComponent,
        TerraNoResultNoticeComponent,
        TerraButtonWithOptionsComponent,
        FixedHeaderDirective,
        TerraNoteEditorComponent,
        TerraNoteComponent,
        TerraNodeTreeComponent,
        TerraInfoComponent
    ],
    imports:         [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        HttpModule,
        TooltipModule.forRoot(),
        AlertModule.forRoot(),
        ButtonsModule.forRoot(),
        TranslationModule.forRoot(),
        MyDatePickerModule,
        AceEditorModule,
        TerraInteractModule,
        QuillModule
    ],
    providers:       [
        COMPILER_PROVIDERS,
        TerraNavigatorSplitViewConfig,
        TerraFrontendStorageService,
        TerraFileBrowserService
    ],
    bootstrap:       [
        TerraComponentsComponent
    ]
})
export class TerraComponentsModule
{
    static forRoot():ModuleWithProviders
    {
        return {
            ngModule:  TerraComponentsModule,
            providers: [
                TerraLoadingSpinnerService,
                TerraDataTableContextMenuService,
                TerraBaseService,
                TerraNavigatorSplitViewConfig,
                TerraUrlParamsDecorator,
                TerraFrontendStorageService,
                TerraAlertComponent
            ]
        };
    }

    static forChild():ModuleWithProviders
    {
        return {
            ngModule:  TerraComponentsModule,
            providers: [
                TerraLoadingSpinnerService,
                TerraDataTableContextMenuService,
                TerraBaseService,
                TerraNavigatorSplitViewConfig,
                TerraUrlParamsDecorator,
                TerraFrontendStorageService,
                TerraAlertComponent
            ]
        };
    }
}
