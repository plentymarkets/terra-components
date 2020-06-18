import { MatPaginatorIntl } from '@angular/material/paginator';
import { TerraMatPaginatorIntl } from './terra-mat-paginator-intl';
import { TranslationService } from 'angular-l10n';
import {
    async,
    TestBed
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MockTranslationModule } from '../../testing/mock-translation-module';

describe('TerraMatPaginatorIntl', () =>
    {
        let paginatorIntl:MatPaginatorIntl;
        let translationService:TranslationService;

        beforeEach(async () =>
        {
            TestBed.configureTestingModule({
                imports:   [
                    FormsModule,
                    MockTranslationModule
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

        it('should return `2 – 2 terraMatPaginatorIntl.ofLabel 1`', () =>
        {
            const page:number = 1;
            const pageSize:number = 1;
            const length:number = 1;

            let rangedLabel:string = paginatorIntl.getRangeLabel(page, pageSize, length);
            expect(rangedLabel).toEqual('2 – 2 terraMatPaginatorIntl.ofLabel 1');

        });

        it('should return `0 terraMatPaginatorIntl.ofLabel 1` if pageSize is 0', () =>
        {
            const page:number = 1;
            const pageSize:number = 0;
            const length:number = 1;

            let rangedLabel:string = paginatorIntl.getRangeLabel(page, pageSize, length);
            expect(rangedLabel).toEqual('0 terraMatPaginatorIntl.ofLabel 1');
        });

        it('should return `1 – 1 terraMatPaginatorIntl.ofLabel 1`', () =>
        {
            const page:number = 0;
            const pageSize:number = 1;
            const length:number = 1;

            let rangedLabel:string = paginatorIntl.getRangeLabel(page, pageSize, length);
            expect(rangedLabel).toEqual('1 – 1 terraMatPaginatorIntl.ofLabel 1');
        });

        it('should return `0 terraMatPaginatorIntl.ofLabel 1 if pageSize is 0`', () =>
        {
            const page:number = 0;
            const pageSize:number = 0;
            const length:number = 1;

            let rangedLabel:string = paginatorIntl.getRangeLabel(page, pageSize, length);
            expect(rangedLabel).toEqual('0 terraMatPaginatorIntl.ofLabel 1');
        });

        it('should return `0 terraMatPaginatorIntl.ofLabel 0` if length is 0', () =>
        {
            const page:number = 1;
            const pageSize:number = 0;
            const length:number = 0;

            let rangedLabel:string = paginatorIntl.getRangeLabel(page, pageSize, length);
            expect(rangedLabel).toEqual('0 terraMatPaginatorIntl.ofLabel 0');
        });
    }
);
