import { MockTranslationService } from './mock-translation-service';
import { NgModule } from '@angular/core';
import {
    InjectorRef,
    TranslationService
} from 'angular-l10n';

const translationService:MockTranslationService = new MockTranslationService();

@NgModule({
    providers: [
        InjectorRef,
        {
            provide:  TranslationService,
            useValue: translationService
        }
    ]
})
export class MockTranslationModule
{
    constructor(private injector:InjectorRef)
    {
        // Creates the instance of the InjectorRef, so that module dependencies are available.
    }
}
