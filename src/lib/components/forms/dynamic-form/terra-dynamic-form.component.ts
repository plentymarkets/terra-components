/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { TerraFormFieldControlService } from './service/terra-form-field-control.service';
import { TerraFormFieldBase } from './data/terra-form-field-base';
import { TerraDynamicFormFunctionsHandler } from './handler/terra-dynamic-form-functions.handler';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Language } from 'angular-l10n';

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export enum TerraHtmlMethods {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
export interface TerraDynamicFormRequestParams {
    route: string;
    htmlMethod: TerraHtmlMethods;
    params?: {};
}

/**
 * @deprecated since v5.0.0. Use terra-form instead.
 */
@Component({
    selector: 'terra-dynamic-form',
    templateUrl: './terra-dynamic-form.component.html',
    styleUrls: ['./terra-dynamic-form.component.scss'],
    providers: [TerraFormFieldControlService]
})
export class TerraDynamicFormComponent implements OnInit, OnChanges, OnDestroy {
    @Input()
    public inputFormFunctions: TerraDynamicFormFunctionsHandler<any>;

    @Input()
    public inputFormFields: Array<TerraFormFieldBase<any>>;

    @Input()
    public inputPortletStyle: string;

    @Input()
    public inputRequestParams: TerraDynamicFormRequestParams;

    @Input()
    public inputHasNoSaveButton: boolean;

    @Input()
    public inputHasNoResetButton: boolean;

    @Input()
    public inputHasToggleButton: boolean;

    @Input()
    public inputIsDisabled: boolean;

    @Input()
    public inputUsePortlet: boolean = true;

    @Input()
    public inputShowDeprecatedEntries: boolean = false;

    @Output()
    public readonly inputShowDeprecatedEntriesChange: EventEmitter<boolean> = new EventEmitter();

    @Language()
    public _lang: string;

    constructor(public _formFieldControlService: TerraFormFieldControlService) {
        this.inputPortletStyle = 'col-12 col-md-8 col-lg-5';
        this.inputRequestParams = {
            route: '',
            htmlMethod: null,
            params: {}
        };

        this.inputHasNoSaveButton = false;
        this.inputHasNoResetButton = false;
        this.inputHasToggleButton = false;
        this.inputIsDisabled = false;
    }

    public ngOnInit(): void {
        if (isNullOrUndefined(this.inputFormFields) || isNullOrUndefined(this.inputFormFunctions)) {
            console.error('inputFormFields and inputFormFunctions must be set.');
        } else {
            this._formFieldControlService.createFormGroup(this.inputFormFields);
            this.inputFormFunctions.formFieldControlService = this._formFieldControlService;

            this.registerValueChange();
        }
        if (!isNullOrUndefined(this.inputHasToggleButton) && !this.inputHasToggleButton) {
            this.inputShowDeprecatedEntries = false;
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['inputFormFields']) {
            this._formFieldControlService.createFormGroup(this.inputFormFields);
            this.registerValueChange();
        }
    }

    public ngOnDestroy(): void {
        // implementation is required by angular-l10n. See https://robisim74.github.io/angular-l10n/spec/getting-the-translation/#messages
    }

    public _validate(): void {
        if (this._formFieldControlService.dynamicFormGroup.valid) {
            this.inputFormFunctions.saveCallback(this._formFieldControlService.dynamicFormGroup.value);
        } else {
            this.inputFormFunctions.errorCallback(
                this._formFieldControlService.dynamicFormGroup,
                this._formFieldControlService.translationMapping
            );
        }
    }

    public _onResetClick(): void {
        this._formFieldControlService.resetForm();
    }

    public _onToggleClick(): void {
        this.inputShowDeprecatedEntries = !this.inputShowDeprecatedEntries;
        this.inputShowDeprecatedEntriesChange.emit(this.inputShowDeprecatedEntries);
    }

    private registerValueChange(): void {
        if (!isNullOrUndefined(this.inputFormFunctions.onValueChangedCallback)) {
            let stream$: Observable<any> = this._formFieldControlService.dynamicFormGroup.valueChanges;

            if (this.inputFormFunctions.valueChangeDebounce > 0) {
                stream$ = stream$.pipe(debounceTime(this.inputFormFunctions.valueChangeDebounce));
            }

            stream$.subscribe((value: any) => {
                this.inputFormFunctions.onValueChangedCallback(value);
            });
        }
    }
}
