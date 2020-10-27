import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';

/**
 * @author mkunze
 * @description This component provides the default template and functionality to display form fields which are supposed to set filters
 */
@Component({
    selector: 'tc-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit, OnDestroy {
    /**
     * @description Notifies when the search button has been clicked or the enter key has been pressed.
     */
    @Output()
    public search: EventEmitter<void> = new EventEmitter<void>();

    /**
     * @description Notifies when the reset button has been clicked
     */
    @Output()
    public reset: EventEmitter<void> = new EventEmitter<void>();

    constructor(@Inject(L10N_LOCALE) public _locale: L10nLocale) {}

    public ngOnInit(): void {
        // implementation is required by angular-l10n. See https://robisim74.github.io/angular-l10n/spec/getting-the-translation/#messages
    }

    public ngOnDestroy(): void {
        // implementation is required by angular-l10n. See https://robisim74.github.io/angular-l10n/spec/getting-the-translation/#messages
    }
}
