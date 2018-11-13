/* tslint:disable:no-unused-variable */

import { Color } from './color.helper';

describe('Helper / Class: Color', () =>
{
    let color:Color;
    let validColor:string = '#123456';
    let round:Function;

    beforeEach(() =>
    {
        round = function(value:number, decimals:number):number
        {
            {
                const factor:number = Math.pow(10, decimals);
                return Math.round(value * factor) / factor;
            }
        };
    });

    it('should random return a valid Color', () =>
    {
        expect(Color.random()).toEqual(jasmine.any(Color));
    });

    it('should \'toHex\' return a string in range of a valid colors', () =>
    {
        let hexExp:RegExp = /^#[a-f0-9]{3}$|#[a-f0-9]{6}$/i;
        color = new Color(validColor);

        expect(color.toHEX()).toEqual(jasmine.any(String));
        expect(color.toHEX()).toEqual(jasmine.stringMatching(hexExp));
    });

    it('should \'toRGB\' return a value of type ColorRGB', () =>
    {
        color = new Color(validColor);

        expect(color.toRGB()).toEqual(jasmine.any(Object));
        expect(color.toRGB()).toEqual(jasmine.objectContaining({
            r: 18,
            g: 52,
            b: 86
        }));
    });

    it('should \'toHSL\' return a value of type ColorRGB', () =>
    {
        color = new Color('#0000ff');

        expect(color.toHSL()).toEqual(jasmine.any(Object));
        expect(color.toHSL()).toEqual(jasmine.objectContaining(
            {
                h: 0.6666666666666666,
                s: 1,
                l: 0.5
            }
        ));
    });

    it('should \'getGrayscale\' return a gray scale value a given color', () =>
    {
        let nonGrayColor:string = '#FF0000';
        color = new Color(nonGrayColor);

        expect(color.getGrayscale()).toEqual(jasmine.any(Number));
        let grayScaleColor:string = '#' + round(color.getGrayscale(), 0).toString()
                                             + round(color.getGrayscale(), 0).toString()
                                             + round(color.getGrayscale(), 0).toString();
        let expectedColor:Color = new Color(grayScaleColor);
        expect(expectedColor.toRGB()).not.toEqual(color.toRGB());
    });

    it('should \'isDark\' return true if color is dark', () =>
    {
        color = new Color('#123456');

        expect(color.isDark()).toBe(true);

        color = new Color('#AADDFF');

        expect(color.isDark()).toBe(false);
    });

    fit('should \'isLight\' return true if color is light', () =>
    {
        color = new Color('#AADDFF');

        expect(color.isLight()).toBe(true);

        color = new Color('#123456');

        expect(color.isLight()).toBe(false);
    });
});
