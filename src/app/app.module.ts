import {
    APP_INITIALIZER,
    Compiler,
    COMPILER_OPTIONS,
    CompilerFactory,
    NgModule
} from '@angular/core';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import {
    L10nLoader,
    LocalizationModule
} from 'angular-l10n';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { l10nConfig } from './translation/l10n.config';
import { AppComponent } from './app.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { TerraComponentsExamplesModule } from '../lib/terra-components-examples.module';
import { RouterModule } from '@angular/router';

function createCompiler(compilerFactory:CompilerFactory):Compiler
{
    return compilerFactory.createCompiler();
}

function initL10n(l10nLoader:L10nLoader):Function
{
    return ():Promise<void> => l10nLoader.load();
}

/**
 * @description This is the sandbox app's corresponding NgModule.
 *
 * NOTE: It is not publicly accessible either.
 */
@NgModule({
    imports:      [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        HttpClientModule,
        LocalizationModule.forRoot(l10nConfig),
        TerraComponentsExamplesModule
    ],
    declarations: [
        AppComponent,
        ShowcaseComponent
    ],
    providers:    [
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
            provide:    APP_INITIALIZER,
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
    bootstrap:    [AppComponent]
})
export class AppModule
{}
