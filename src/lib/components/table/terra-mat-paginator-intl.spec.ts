import { MatPaginatorIntl } from '@angular/material/paginator';
import { TerraMatPaginatorIntl } from './terra-mat-paginator-intl';
import {
    L10nLoader,
    LocaleService,
    TranslationModule,
    TranslationService
} from 'angular-l10n';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { l10nConfig } from '../../../app/translation/l10n.config';

fdescribe('TerraMatPaginatorIntl', () =>
    {

        let l10nLoader:L10nLoader;
        let locale:LocaleService;

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

        beforeEach(async (done:any) =>
        {
            l10nLoader = TestBed.get(L10nLoader);

            l10nLoader.load().then(() => done());
        });

        it('should initialize the paginator intl', () =>
        {
            locale = TestBed.get(LocaleService);

            let paginatorIntl:MatPaginatorIntl;
            let translationService:TranslationService;

            translationService = TestBed.get(TranslationService);

            locale.setCurrentLanguage('de');

            paginatorIntl = new TerraMatPaginatorIntl(translationService);
            expect(paginatorIntl).toBeTruthy();
        });

        it('should translate the strings in german', (done:any) =>
        {
            locale = TestBed.get(LocaleService);

            let paginatorIntl:MatPaginatorIntl;
            let translationService:TranslationService;

            translationService = TestBed.get(TranslationService);

            locale.setCurrentLanguage('de');

            paginatorIntl = new TerraMatPaginatorIntl(translationService);

            paginatorIntl.changes.subscribe(() =>
            {
                expect(paginatorIntl.itemsPerPageLabel).toEqual('Ergebnisse pro Seite');
                expect(paginatorIntl.firstPageLabel).toEqual('Erste Seite');
                expect(paginatorIntl.lastPageLabel).toEqual('Letzte Seite');
                expect(paginatorIntl.nextPageLabel).toEqual('Nächste Seite');
                expect(paginatorIntl.previousPageLabel).toEqual('Vorherige Seite');

                done();
            });
            done();
        });

        it('should translate the strings in english', (done:any) =>
        {
            locale = TestBed.get(LocaleService);

            let paginatorIntl:MatPaginatorIntl;
            let translationService:TranslationService;

            translationService = TestBed.get(TranslationService);

            locale.setCurrentLanguage('en');

            paginatorIntl = new TerraMatPaginatorIntl(translationService);

            paginatorIntl.changes.subscribe(() =>
            {
                expect(paginatorIntl.itemsPerPageLabel).toEqual('Items per page');
                expect(paginatorIntl.firstPageLabel).toEqual('First page');
                expect(paginatorIntl.lastPageLabel).toEqual('Last Page');
                expect(paginatorIntl.nextPageLabel).toEqual('Next page');
                expect(paginatorIntl.previousPageLabel).toEqual('Previous page');

                done();
            });
            done();
        });

        it('should return the right string in german', (done:any) =>
        {
            locale = TestBed.get(LocaleService);

            let paginatorIntl:MatPaginatorIntl;
            let translationService:TranslationService;

            translationService = TestBed.get(TranslationService);

            locale.setCurrentLanguage('de');

            paginatorIntl = new TerraMatPaginatorIntl(translationService);

            paginatorIntl.changes.subscribe(() =>
            {
                let rangedLabel:string = paginatorIntl.getRangeLabel(1, 1, 1);
                expect(rangedLabel).toEqual('2 – 2 von 1');

                done();
            });
            done();
        });

        it('should return the right string in english', (done:any) =>
        {
            locale = TestBed.get(LocaleService);

            let paginatorIntl:MatPaginatorIntl;
            let translationService:TranslationService;

            translationService = TestBed.get(TranslationService);

            locale.setCurrentLanguage('en');

            paginatorIntl = new TerraMatPaginatorIntl(translationService);

            paginatorIntl.changes.subscribe(() =>
            {
                let rangedLabel:string = paginatorIntl.getRangeLabel(1, 1, 1);
                expect(rangedLabel).toEqual('2 – 2 of 1');

                done();
            });
            done();
        });
    }
);
