import { MockTranslationService } from './mock-translation-service';
import { NgModule } from '@angular/core';
import { L10nTranslationService } from 'angular-l10n';

const translationService: MockTranslationService = new MockTranslationService();

/**
 * based on https://github.com/robisim74/angular-l10n/blob/angular_v5/src/modules/translation.module.ts
 */
@NgModule({
    providers: [
        {
            provide: L10nTranslationService,
            useValue: translationService
        }
    ]
})
export class MockTranslationModule {
    constructor() {
        // Creates the instance of the InjectorRef, so that module dependencies are available.
    }
}
