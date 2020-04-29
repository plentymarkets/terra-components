import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TerraInputComponent } from '../terra-input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TerraRegex } from '../../../../helpers/regex/terra-regex';
import { DefaultLocale } from 'angular-l10n';

let nextId: number = 0;

@Component({
    selector: 'terra-double-input',
    styleUrls: ['./terra-double-input.component.scss'],
    templateUrl: './terra-double-input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TerraDoubleInputComponent,
            multi: true
        }
    ]
})
/**
 * @deprecated since v4. Use '<mat-input>' instead. See {@link https://material.angular.io/components/input/overview}
 */
export class TerraDoubleInputComponent extends TerraInputComponent implements OnInit, OnDestroy {
    /**
     * @description If true, the value will be right-aligned.
     */
    @Input()
    public inputIsPriceInput: boolean = false;

    /**
     *
     * @description Set the decimal count. Default is 2. (0.01)
     */
    @Input()
    public inputDecimalCount: number = 2;

    @DefaultLocale()
    public _locale: string;

    public _step: number;

    /**
     * @description a unique string identifier for the specific input instance.
     */
    public _id: string;

    constructor() {
        super(TerraRegex.DOUBLE);

        // generate the id of the input instance
        this._id = `double-input_#${nextId++}`;
    }

    public ngOnInit(): void {
        this.regex = TerraRegex.getDouble(this.inputDecimalCount);
        this._step = 1 / Math.pow(10, this.inputDecimalCount);
    }

    public ngOnDestroy(): void {
        // implementation is required by angular-l10n. See https://robisim74.github.io/angular-l10n/spec/getting-the-translation/#messages
    }

    /**
     * Set the focus on the native input element.
     */
    public focusNativeInput(): void {
        setTimeout(() => {
            let input: HTMLInputElement = <HTMLInputElement>document.getElementById(this._id);
            input.focus();
        });
    }

    /**
     * Select the content of the native input element.
     */
    public selectNativeInput(): void {
        setTimeout(() => {
            let input: HTMLInputElement = <HTMLInputElement>document.getElementById(this._id);
            input.select();
        });
    }
}
