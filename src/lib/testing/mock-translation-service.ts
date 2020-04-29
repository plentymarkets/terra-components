import { Observable, of } from 'rxjs';

/**
 * based on https://github.com/robisim74/angular-l10n/blob/angular_v5/src/services/translation.service.ts
 */
export class MockTranslationService {
    // implements ITranslationService
    private lang: string = 'de';

    public translationChanged(): Observable<string> {
        return of(this.lang);
    }

    public getLanguage(): string {
        return this.lang;
    }

    public translate(key: string): string {
        return key;
    }

    public latestTranslation(): Observable<string> {
        return of(this.lang);
    }
}
