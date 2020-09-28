import { Color } from './color.helper';
import { TerraRegex } from './regex/terra-regex';

describe('Helper / Class: Color', () => {
    let color: Color;
    const validColor: string = '#123456';
    const blue: string = '#0000ff';
    let round: Function;
    let hexExp: RegExp = new RegExp(TerraRegex.COLOR_HEX);

    beforeAll(() => {
        round = function (value: number, decimals: number): number {
            {
                const factor: number = Math.pow(10, decimals);
                return Math.round(value * factor) / factor;
            }
        };
    });

    it('should random return a valid Color', () => {
        expect(Color.random()).toEqual(jasmine.any(Color));
    });

    it("should 'toHex' return a string in range of a valid colors", () => {
        color = new Color(validColor);

        expect(color.toHEX()).toEqual(jasmine.any(String));
        expect(color.toHEX()).toEqual(jasmine.stringMatching(hexExp));
    });

    it("should 'toRGB' return a value of type ColorRGB", () => {
        color = new Color(validColor);

        expect(color.toRGB()).toEqual(jasmine.any(Object));
        expect(color.toRGB()).toEqual({
            r: 18,
            g: 52,
            b: 86
        });
    });

    it("should 'toHSL' return a value of type ColorHSL", () => {
        color = new Color(blue);

        expect(color.toHSL()).toEqual(jasmine.any(Object));
        expect(color.toHSL()).toEqual({
            h: 0.6666666666666666,
            s: 1,
            l: 0.5
        });
    });

    it("should 'getGrayscale' return a gray scale value to a given color", () => {
        let nonGrayColor: string = '#FF0000';
        color = new Color(nonGrayColor);

        expect(color.getGrayscale()).toEqual(jasmine.any(Number));
        let grayScaleColor: string =
            '#' +
            round(color.getGrayscale(), 0).toString() +
            round(color.getGrayscale(), 0).toString() +
            round(color.getGrayscale(), 0).toString();
        let expectedColor: Color = new Color(grayScaleColor);
        expect(expectedColor.toRGB()).not.toEqual(color.toRGB());
    });

    it("should 'isDark' return true if color is dark", () => {
        color = new Color('#123456');
        expect(color.isDark()).toBe(true);

        color = new Color('#AADDFF');
        expect(color.isDark()).toBe(false);

        // edge case
        color = new Color('#BABABA');
        expect(color.isDark()).toBe(false);
    });

    it("should 'isLight' return true if color is light", () => {
        color = new Color('#AADDFF');
        expect(color.isLight()).toBe(true);

        color = new Color('#123456');
        expect(color.isLight()).toBe(false);

        // edge case
        color = new Color('#BABABA');
        expect(color.isLight()).toBe(true);
    });
});
