import { APP_INITIALIZER, NgModule } from '@angular/core';
import { L10nIntlModule, L10nLoader, L10nTranslationModule } from 'angular-l10n';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { l10nConfig } from './translation/l10n.config';
import { AppComponent } from './app.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { TerraComponentsExamplesModule } from '../lib/terra-components-examples.module';
import { RouterModule } from '@angular/router';
import { DefaultUserLanguage } from './translation/user-language';
import { TerraFilterModule } from 'src/lib';
import { MatIconModule } from '@angular/material/icon';

export function initL10n(l10nLoader: L10nLoader): Function {
    return (): Promise<void> => l10nLoader.init();
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
        L10nTranslationModule.forRoot(l10nConfig, { userLanguage: DefaultUserLanguage }),
        L10nIntlModule
    ],
    declarations: [AppComponent, ShowcaseComponent],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initL10n,
            deps: [L10nLoader],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
