import {
    APP_INITIALIZER,
    NgModule
} from '@angular/core';
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
import { TimePickerComponent } from './time-picker/time-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

export function initL10n(l10nLoader:L10nLoader):Function
{
    return ():Promise<void> => l10nLoader.load();
}

/**
 * @description This is the sandbox app's corresponding NgModule.
 *
 * NOTE: It is not publicly accessible either.
 */
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        HttpClientModule,
        LocalizationModule.forRoot(l10nConfig),
        TerraComponentsExamplesModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule
    ],
    declarations: [
        AppComponent,
        ShowcaseComponent,
        TimePickerComponent
    ],
    providers:    [
        {
            provide:    APP_INITIALIZER,
            useFactory: initL10n,
            deps:       [L10nLoader],
            multi:      true
        }
    ],
    bootstrap:    [AppComponent]
})
export class AppModule
{}
