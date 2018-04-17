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
import { TerraConverterHelper } from './helpers/terra-converter.helper';
import { CategoryTreeConfig } from './components/category-picker/config/category-tree.config';
import { TerraJsonToFormFieldService } from './components/forms/dynamic-form/service/terra-json-to-form-field.service';
// ### import of terra-component examples
import { TerraButtonComponentExample } from './components/buttons/button/example/terra-button.component.example';
import { TerraAlertComponentExample } from './components/alert/example/terra-alert.component.example';
import { TerraCardComponentExample } from './components/layouts/card/example/terra-card.component.example';
import { TerraBaseToolbarComponentExample } from './components/toolbar/base-toolbar/example/terra-base-toolbar.component.example';
import { TerraOverlayComponentExample } from './components/layouts/overlay/example/terra-overlay.component.example';
import { TerraInfoboxComponentExample } from './components/layouts/info-box/example/terra-info-box.component.example';
import { TerraPortletComponentExample } from './components/layouts/portlet/example/terra-portlet.component.example';
import { TerraColorPickerComponentExample } from './components/forms/input/color-picker/example/terra-color-picker.component.example';
import { TerraDatePickerComponentExample } from './components/forms/input/date-picker/example/terra-date-picker.component.example';
import { TerraDoubleInputComponentExample } from './components/forms/input/double-input/example/terra-double-input.component.example';
import { TerraNumberInputComponentExample } from './components/forms/input/number-input/example/terra-number-input.component.example';
import { TerraTextAreaInputComponentExample } from './components/forms/input/text-area-input/example/terra-text-area-input.component.example';
import { TerraTextInputComponentExample } from './components/forms/input/text-input/example/terra-text-input.component.example';
import { TerraCheckboxComponentExample } from './components/forms/checkbox/example/terra-checkbox.component.example';
import { TerraMultiSelectBoxComponentExample } from './components/forms/multi-select-box/example/terra-multi-select-box.component.example';
import { TerraRadioButtonComponentExample } from './components/forms/radio-button/example/terra-radio-button.component.example';
import { TerraSelectBoxComponentExample } from './components/forms/select-box/example/terra-select-box.component.example';
import { TerraSliderComponentExample } from './components/forms/slider/example/terra-slider.component.example';
import { TerraSuggestionBoxComponentExample } from './components/forms/suggestion-box/example/terra-suggestion-box.component.example';
import { TerraDataTableComponentExample } from './components/tables/data-table/example/terra-data-table.component.example';
import { TerraTagComponentExample } from './components/layouts/tag/example/terra-tag.component.example';
import { TerraFileInputComponentExample } from './components/forms/input/file-input/example/terra-file-input.component.example';
import { TerraTreeComponentExample } from './components/tree/example/terra-tree.component.example';
import { TerraCheckboxTreeComponentExample } from './components/tree/checkbox-tree/example/terra-checkbox-tree.component.example';
import { TerraToggleComponentExample } from './components/buttons/toggle/example/terra-toggle.component.example';
import { TerraSyntaxEditorComponentExample } from './components/editors/syntax-editor/example/terra-syntax-editor.component.example';
import { TerraSimpleTableComponentExample } from './components/tables/simple/example/terra-table-simple.component.example';
import { TerraPagerComponentExample } from './components/pager/example/terra-pager.component.example';
import { TerraTaglistComponentExample } from './components/layouts/taglist/example/terra-taglist.component.example';
import { TerraNavigatorComponentExample } from './components/navigator/example/terra-navigator.component.example';
import { TerraNoResultNoticeComponentExample } from './components/no-result/example/terra-no-result-notice.component.example';
import { TerraButtonWithOptionsComponentExample } from './components/buttons/button-with-options/example/terra-button-with-options.component.example';
import { TerraInputComponentExample } from './components/forms/input/example/terra-input.component.example';
import { TerraFilterComponentExample } from './components/filter/example/terra-filter.component.example';
import { TerraDataTableContextMenuComponentExample }
from './components/tables/data-table/context-menu/example/terra-data-table-context-menu.component.example';
import { TerraNoteEditorComponentExample } from './components/editors/note-editor/example/terra-note-editor.component.example';
import { TerraNoteComponentExample } from './components/note/example/terra-note.component.example';
import { TerraNodeTreeComponentExample } from './components/tree/node-tree/example/terra-node-tree.component.example';
import { TerraDynamicFormComponent } from './components/forms/dynamic-form/terra-dynamic-form.component';
import { TerraDynamicSwitchComponent } from './components/forms/dynamic-form/dynamic-switch/terra-dynamic-switch.component';
import { TerraDynamicFormService } from './components/forms/dynamic-form/service/terra-dynamic-form.service';
import { TerraFormFieldControlService } from './components/forms/dynamic-form/service/terra-form-field-control.service';
import { TerraMultiCheckBoxComponent } from './components/forms/multi-check-box/terra-multi-check-box.component';
import { TerraMultiCheckBoxComponentExample } from './components/forms/multi-check-box/example/terra-multi-check-box.component.example';
import { TerraCategoryPickerComponent } from './components/category-picker/terra-category-picker.component';
import { TerraFileChooserComponent } from './components/buttons/file-chooser/terra-file-chooser.component';

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
        TerraMultiCheckBoxComponent,
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
        TerraFileChooserComponent,
        TerraNoResultNoticeComponent,
        TerraButtonWithOptionsComponent,
        FixedHeaderDirective,
        TerraNoteEditorComponent,
        TerraNoteComponent,
        TerraNodeTreeComponent,
        TerraNodeComponent,
        TerraCategoryPickerComponent,
        TerraDynamicFormComponent,
        TerraDynamicSwitchComponent,
        TerraCategoryPickerComponent,

        // ### declarations of terra-components examples
        TerraButtonComponentExample,
        TerraAlertComponentExample,
        TerraCardComponentExample,
        TerraBaseToolbarComponentExample,
        TerraOverlayComponentExample,
        TerraInfoboxComponentExample,
        TerraPortletComponentExample,
        TerraColorPickerComponentExample,
        TerraDatePickerComponentExample,
        TerraDoubleInputComponentExample,
        TerraNumberInputComponentExample,
        TerraTextAreaInputComponentExample,
        TerraTextInputComponentExample,
        TerraCheckboxComponentExample,
        TerraMultiSelectBoxComponentExample,
        TerraMultiCheckBoxComponentExample,
        TerraRadioButtonComponentExample,
        TerraSelectBoxComponentExample,
        TerraSliderComponentExample,
        TerraSuggestionBoxComponentExample,
        TerraDataTableComponentExample,
        TerraTagComponentExample,
        TerraFileInputComponentExample,
        TerraTreeComponentExample,
        TerraCheckboxTreeComponentExample,
        TerraToggleComponentExample,
        TerraSyntaxEditorComponentExample,
        TerraSimpleTableComponentExample,
        TerraPagerComponentExample,
        TerraTaglistComponentExample,
        TerraNavigatorComponentExample,
        TerraNoResultNoticeComponentExample,
        TerraButtonWithOptionsComponentExample,
        TerraInputComponentExample,
        TerraFilterComponentExample,
        TerraDataTableContextMenuComponentExample,
        TerraNoteEditorComponentExample,
        TerraNoteComponentExample,
        TerraNodeTreeComponentExample
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
        TerraMultiCheckBoxComponent,
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
        TerraFileChooserComponent,
        TerraButtonWithOptionsComponent,
        TerraNoteEditorComponent,
        TerraNoteComponent,
        TerraNodeTreeComponent,
        TerraNodeComponent,
        TerraCategoryPickerComponent
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
        TerraMultiCheckBoxComponent,
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
        TerraFileChooserComponent,
        TerraNoResultNoticeComponent,
        TerraButtonWithOptionsComponent,
        FixedHeaderDirective,
        TerraNoteEditorComponent,
        TerraNoteComponent,
        TerraNodeTreeComponent,
        TerraCategoryPickerComponent,
        TerraDynamicFormComponent,
        TerraDynamicSwitchComponent,
        TerraCategoryPickerComponent,

        // ### declarations of terra-components examples
        TerraButtonComponentExample,
        TerraAlertComponentExample,
        TerraCardComponentExample,
        TerraBaseToolbarComponentExample,
        TerraOverlayComponentExample,
        TerraInfoboxComponentExample,
        TerraPortletComponentExample,
        TerraColorPickerComponentExample,
        TerraDatePickerComponentExample,
        TerraDoubleInputComponentExample,
        TerraNumberInputComponentExample,
        TerraTextAreaInputComponentExample,
        TerraTextInputComponentExample,
        TerraCheckboxComponentExample,
        TerraMultiSelectBoxComponentExample,
        TerraMultiCheckBoxComponentExample,
        TerraRadioButtonComponentExample,
        TerraSelectBoxComponentExample,
        TerraSliderComponentExample,
        TerraSuggestionBoxComponentExample,
        TerraDataTableComponentExample,
        TerraTagComponentExample,
        TerraFileInputComponentExample,
        TerraTreeComponentExample,
        TerraCheckboxTreeComponentExample,
        TerraToggleComponentExample,
        TerraSyntaxEditorComponentExample,
        TerraSimpleTableComponentExample,
        TerraPagerComponentExample,
        TerraTaglistComponentExample,
        TerraNavigatorComponentExample,
        TerraNoResultNoticeComponentExample,
        TerraButtonWithOptionsComponentExample,
        TerraInputComponentExample,
        TerraFilterComponentExample,
        TerraDataTableContextMenuComponentExample,
        TerraNoteEditorComponentExample,
        TerraNoteComponentExample,
        TerraDynamicFormComponent,
        TerraDynamicSwitchComponent,
        TerraNodeTreeComponentExample
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
        TerraFileBrowserService,
        TerraConverterHelper,
    ],
    bootstrap:       [
        TerraComponentsComponent
    ]
})

export class TerraComponentsModule
{
    public static forRoot():ModuleWithProviders
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
                TerraAlertComponent,
                TerraDynamicFormService,
                TerraFormFieldControlService,
                TerraJsonToFormFieldService
            ]
        };
    }

    public static forChild():ModuleWithProviders
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
                TerraAlertComponent,
                CategoryTreeConfig,
                TerraJsonToFormFieldService
            ]
        };
    }
}
