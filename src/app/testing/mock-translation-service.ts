import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { ITranslationService } from 'angular-l10n';

export class MockTranslationService// implements ITranslationService
{
    private lang:string = 'de';
    public translationChanged():Observable<string>
    {
        return of(this.lang);
    }

    public getLanguage():string
    {
        return this.lang;
    }
}
