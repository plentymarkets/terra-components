import { MatPaginatorIntl } from '@angular/material/paginator';
import { TerraMatPaginatorIntl } from './terra-mat-paginator-intl';
import {
    L10nLoader,
    LocaleService,
    TranslationModule,
    TranslationService
} from 'angular-l10n';
import {
    async,
    TestBed
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { l10nConfig } from '../../../app/translation/l10n.config';

fdescribe('TerraMatPaginatorIntl', () =>
    {
        let paginatorIntl:MatPaginatorIntl;
        let translationService:TranslationService;

        beforeEach(async () =>
        {
            TestBed.configureTestingModule({
                imports:   [
                    FormsModule,
                    HttpClientModule,
                    TranslationModule.forRoot(l10nConfig)
                ],
                providers: [
                    {
                        provide:  MatPaginatorIntl,
                        useClass: TerraMatPaginatorIntl
                    }
                ]
            });
        });

        beforeEach(async () =>
        {
            translationService = TestBed.get(TranslationService);

            paginatorIntl = new TerraMatPaginatorIntl(translationService);
        });

        it('should initialize the paginator intl', () =>
        {
            paginatorIntl = new TerraMatPaginatorIntl(translationService);
            expect(paginatorIntl).toBeTruthy();
        });

        it('should return the right value', async(() =>
        {
            let rangedLabel:string = paginatorIntl.getRangeLabel(1, 1, 1);
            expect(rangedLabel).toEqual('2 – 2 terraMatPaginatorIntl.ofLabel 1');

        }));

        it('should return the right value', async(() =>
        {
            let rangedLabel:string = paginatorIntl.getRangeLabel(1, 1, 1);
            expect(rangedLabel).toEqual('2 – 2 terraMatPaginatorIntl.ofLabel 1');
        }));
    }
);
