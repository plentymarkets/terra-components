import { MatPaginatorIntl } from '@angular/material/paginator';
import { TerraMatPaginatorIntl } from './terra-mat-paginator-intl';
import {
    L10nConfig,
    L10nLoader,
    LocaleService,
    LocalizationModule,
    TranslationModule,
    TranslationService
} from 'angular-l10n';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { l10nConfig } from '../../../app/translation/l10n.config';

//const localeServiceStub:Partial<LocaleService> = {
//    getCurrentLanguage: ():string => 'de'
//};

fdescribe('TerraMatPaginatorIntl', () =>
    {
        let paginatorIntl:MatPaginatorIntl;

        beforeEach((done:any) =>
        {
            TestBed.configureTestingModule({
                imports:   [
                    FormsModule,
                    LocalizationModule.forRoot(l10nConfig)
                ],
                providers: [
                    {
                        provide:  MatPaginatorIntl,
                        useClass: TerraMatPaginatorIntl
                    },
                    LocaleService,
                    TranslationService
                ]
            });

            let l10nLoader:L10nLoader = TestBed.get(L10nLoader);
            let locale:LocaleService = TestBed.get(LocaleService);
            l10nLoader.load().then(() => done());

            locale.setCurrentLanguage('en');
            paginatorIntl = new TerraMatPaginatorIntl(TestBed.get(TranslationService));
        });

        it('should initialize the paginator', () =>
        {
            expect(paginatorIntl).toBeTruthy();
        });

        it('should translate the strings', () =>
        {
            expect(paginatorIntl.itemsPerPageLabel).toEqual('Ergebnisse pro Seite');
            expect(paginatorIntl.firstPageLabel).toEqual('Erste Seite');
            expect(paginatorIntl.lastPageLabel).toEqual('Letzte Seite');
            expect(paginatorIntl.nextPageLabel).toEqual('Nächste Seite');
            expect(paginatorIntl.previousPageLabel).toEqual('Vorherige Seite');
        });
    }
);
