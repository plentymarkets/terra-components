import { TestBed } from '@angular/core/testing';
import { TerraLoadingSpinnerService } from './terra-loading-spinner.service';
import { IS_ROOT_WINDOW } from '../../../utils/window';
import {
    skip,
    take
} from 'rxjs/operators';

describe('TerraLoadingSpinnerService: ', () =>
{
    let service:TerraLoadingSpinnerService;

    beforeEach(() =>
    {
        service = TestBed.configureTestingModule({
            providers: [{provide: IS_ROOT_WINDOW, useValue: false}]
        }).get(TerraLoadingSpinnerService);
    });

    it('should create', () =>
    {
        expect(service).toBeTruthy();
    });

    it(`should not be loading right after its instantiation`, () =>
    {
        expect(service.isLoading).toBe(false);
    });

    it('should notify subscribers when the spinner has been started', () =>
    {
        service.observable.pipe(
            take(1) // take only the next emit and complete
        ).subscribe((loading:boolean) => expect(loading).toBe(true));
        service.start();
        expect(service.isLoading).toBe(true);
    });

    it('should notify subscribers when the spinner has been stopped', () =>
    {
        service.observable.pipe(
            skip(1), // skip the first emit, since calling start() will emit true
            take(1) // take only the next emit and complete
        ).subscribe((loading:boolean) => expect(loading).toBe(false));
        service.start();
        expect(service.isLoading).toBe(true);
        service.stop();
        expect(service.isLoading).toBe(false);
    });

    describe('in a iframe', () =>
    {
        let expectedValue:boolean;
        const listener:EventListener = (event:CustomEvent) => expect(event.detail.isLoading).toBe(expectedValue);
        beforeEach(() =>
        {
            window.addEventListener('loadingStatus', listener);
        });

        it('should notify the parent window about the loading status', () =>
        {
            service.observable.pipe(
                take(1) // take only the next emit and complete
            ).subscribe();
            expectedValue = true;
            service.start();
            expectedValue = false;
            service.stop();
        });

        afterEach(() =>
        {
            window.removeEventListener('loadingStatus', listener);
        });
    });

});
