import { TestBed } from '@angular/core/testing';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TerraMatPaginatorIntl } from './terra-mat-paginator-intl';
import { TranslationService } from 'angular-l10n';
import { MockTranslationService } from '../../testing/mock-translation-service';

describe('TerraMatPaginatorIntl', () =>
{
    let paginatorIntl:MatPaginatorIntl;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide:  TranslationService,
                    useClass: MockTranslationService
                },
                {
                    provide:  MatPaginatorIntl,
                    useClass: TerraMatPaginatorIntl
                }
            ]
        });
    });

    beforeEach(() =>
    {
        paginatorIntl = TestBed.get(MatPaginatorIntl);
    });

    it('should initialize the paginator intl', () =>
    {
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

    it('should return `0 terraMatPaginatorIntl.ofLabel 1` if pageSize is 0', () =>
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
});
