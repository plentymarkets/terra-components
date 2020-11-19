import { L10nLocale } from 'angular-l10n';
import { Observable, of } from 'rxjs';

/**
 * based on https://github.com/robisim74/angular-l10n/blob/angular_v5/src/services/translation.service.ts
 */
export class MockTranslationService {
    // implements ITranslationService
    private locale: L10nLocale = { language: 'de' };

    public onChange(): Observable<string> {
        return of(this.locale.language);
    }

    public getLocale(): L10nLocale {
        return this.locale;
    }

    public translate(key: string): string {
        return key;
    }

    public latestTranslation(): Observable<string> {
        return of(this.locale.language);
    }
}
