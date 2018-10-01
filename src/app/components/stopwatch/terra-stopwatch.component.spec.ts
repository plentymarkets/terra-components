import { TranslationService } from 'angular-l10n';
import { TerraStopwatchComponent } from './terra-stopwatch.component';

describe('Component: TerraStopwatchComponent', () =>
{
    let translationService:TranslationService;
    let component:TerraStopwatchComponent = new TerraStopwatchComponent(translationService);

    beforeEach(() =>
    {
        component.ngOnInit();
    });

    afterEach(() =>
    {
        component.resetStopwatch();
        component.inputIsAutoPlay = false;
    });

    it('should create an instance of TerraStopwatchComponent', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should auto run the stopwatch', (done) =>
    {
        component.inputIsAutoPlay = true;
        component.ngOnInit();
        setTimeout(() =>
        {
            expect(component.getStopwatchTimeInMilliseconds()).toBeGreaterThan(0);
            done();

        }, 500);
    });

    it('should not auto run the stopwatch', () =>
    {
        component.inputIsAutoPlay = false;
        component.ngOnInit();
        expect(component.getStopwatchTimeInMilliseconds()).toEqual(0);
    });
});
