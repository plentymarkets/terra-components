import {
    APP_INITIALIZER,
    Compiler,
    COMPILER_OPTIONS,
    CompilerFactory,
    ModuleWithProviders,
    NgModule
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import {
    AlertModule,
    ButtonsModule,
    ModalModule,
    TooltipModule
} from 'ngx-bootstrap';
import {
    L10nLoader,
    LocalizationModule
} from 'angular-l10n';
import { QuillModule } from 'ngx-quill';
import { TerraComponentsComponent } from './terra-components.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MyDatePickerModule } from 'mydatepicker';
import { AceEditorModule } from 'ng2-ace-editor';
import { TerraInteractModule } from './components/interactables/interact.module';
import { l10nConfig } from './translation/l10n.config';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Type } from '@angular/core/src/type';
import {
    components,
    exportedComponents
} from './components/component-collection';
import { examples } from './components/example-collection';
import { services } from './service/service-collection';
import { directives } from './components/directive-collection';
import { TerraLoadingSpinnerService } from './components/loading-spinner/service/terra-loading-spinner.service';
import { AlertService } from './components/alert/alert.service';
import { TerraFileBrowserService } from './components/file-browser/terra-file-browser.service';
import { TerraFrontendStorageService } from './components/file-browser/terra-frontend-storage.service';

export function createCompiler(compilerFactory:CompilerFactory):Compiler
{
    return compilerFactory.createCompiler();
}

export function initL10n(l10nLoader:L10nLoader):Function
{
    return ():Promise<void> =>
    {
        let langInLocalStorage:string = localStorage.getItem('plentymarkets_lang_');
        let lang:string = null;

        if(langInLocalStorage !== null)
        {
            lang = langInLocalStorage;
        }
        else
        {
            lang = navigator.language.slice(0, 2).toLocaleLowerCase();

            if(lang !== 'de' && lang !== 'en')
            {
                lang = 'en';
            }

            localStorage.setItem('plentymarkets_lang_', lang);
        }
        return l10nLoader.load();
    };
}

@NgModule({
    declarations:    [
        TerraComponentsComponent,
        ...components,
        ...directives,
        ...examples
    ],
    entryComponents: exportedComponents,
    exports:         [
        ...exportedComponents,
        ...directives,
        ...examples
    ],
    imports:         [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        LocalizationModule.forRoot(l10nConfig),
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        AlertModule.forRoot(),
        ButtonsModule.forRoot(),
        MyDatePickerModule,
        AceEditorModule,
        TerraInteractModule,
        QuillModule,
        RouterModule
    ],
    providers:       [
        TerraLoadingSpinnerService,
        AlertService,
        TerraFileBrowserService,
        TerraFrontendStorageService,
        {
            provide:  COMPILER_OPTIONS,
            useValue: {},
            multi:    true
        },
        {
            provide:  CompilerFactory,
            useClass: JitCompilerFactory,
            deps:     [COMPILER_OPTIONS]
        },
        {
            provide:    APP_INITIALIZER, // APP_INITIALIZER will execute the function when the app is initialized and delay what
                                         // it provides.
            useFactory: initL10n,
            deps:       [L10nLoader],
            multi:      true
        },
        {
            provide:    Compiler,
            useFactory: createCompiler,
            deps:       [CompilerFactory]
        }
    ],
    bootstrap:       [
        TerraComponentsComponent
    ]
})
export class TerraComponentsModule
{
    public static forRoot():ModuleWithProviders<any>
    {
        return {
            ngModule:  TerraComponentsModule,
            providers: services
        };
    }

    public static forChild():Type<any>
    {
        return TerraComponentsModule;
    }
}
