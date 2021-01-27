/** Type of method that returns a label based on the activated route's params, data and queryParams.
 * angular-l10n's L10nTranslationService can be used to provide multi-lingual labels */
import { L10nTranslationService } from 'angular-l10n';
import { Data, Params } from '@angular/router';

export type LabelFunction = (
    translation: L10nTranslationService,
    params: Params,
    routeData: Data,
    queryParams: Params
) => string;
