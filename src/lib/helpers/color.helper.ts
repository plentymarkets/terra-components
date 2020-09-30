/**
 * Defines RGB-formatted colors.
 * @package modules/helpers
 */
import { isUndefined } from 'util';
import { TerraRegex } from './regex/terra-regex';

export type ColorRGB = { r: number; g: number; b: number };

/**
 * Defines HSL-formatted colors.
 * @package modules/helpers
 */
export type ColorHSL = { h: number; s: number; l: number };

/**
 * Handles transformation of colors between hexadecimal representation and RGB and HSL representation.
 * Providers functions to decide if a color is dark enough to read white text on it
 * or light enough to read white text.
 *
 * @package modules/helpers
 */
export class Color {
    private r: number = 0;
    private g: number = 0;
    private b: number = 0;

    /**
     * Construct a new color instance. Accepts hexadecimal formatted colors as string or colors formatted as RGB or HSL.
     * @param color string|ColorRGB|ColorHSL
     */
    constructor(color?: string | ColorRGB | ColorHSL) {
        if (color) {
            if (this.isHEX(color)) {
                this.readHEX(<string>color);
                return;
            }

            if (this.isRGB(color)) {
                this.readRGB(<ColorRGB>color);
                return;
            }

            if (this.isHSL(color)) {
                this.readHSL(<ColorHSL>color);
                return;
            }
        }
    }

    public static random(): Color {
        let rgb: ColorRGB = {
            r: Math.floor(Math.random() * 255),
            g: Math.floor(Math.random() * 255),
            b: Math.floor(Math.random() * 255)
        };

        return new Color(rgb);
    }

    /**
     * Converts this color to a hexadecimal string.
     */
    public toHEX(): string {
        return (
            '#' +
            (this.r < 16 ? '0' : '') +
            this.r.toString(16) +
            (this.g < 16 ? '0' : '') +
            this.g.toString(16) +
            (this.b < 16 ? '0' : '') +
            this.b.toString(16)
        );
    }

    /**
     * Converts this color to a RGB formatted representation.
     */
    public toRGB(): ColorRGB {
        return {
            r: this.r,
            g: this.g,
            b: this.b
        };
    }

    /**
     * Converts this color to a HSL formatted representation.
     */
    public toHSL(): ColorHSL {
        let r: number = this.r / 255;
        let g: number = this.g / 255;
        let b: number = this.b / 255;
        let max: number = Math.max(r, g, b);
        let min: number = Math.min(r, g, b);

        let h: number = (max + min) / 2;
        let s: number = (max + min) / 2;
        let l: number = (max + min) / 2;

        if (max === min) {
            h = 0;
            s = 0;
        } else {
            let diff: number = max - min;
            if (l > 0.5) {
                s = diff / (2 - max - min);
            } else {
                s = diff / (max + min);
            }

            switch (max) {
                case r:
                    h = (g - b) / diff + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / diff + 2;
                    break;
                case b:
                    h = (r - g) / diff + 4;
                    break;
                default:
                    throw new Error('This should never be reached!');
            }

            h = h / 6;
        }

        return {
            h,
            s,
            l
        };
    }

    /**
     * Calculate the grayscale of this color.
     */
    public getGrayscale(): number {
        return this.r * 0.299 + this.g * 0.587 + this.b * 0.114;
    }

    /**
     * Decide if this color is dark enough so white text could be read.
     */
    public isDark(): boolean {
        return this.getGrayscale() < 186;
    }

    /**
     * Decide if this color is light enough so black text could be read.
     */
    public isLight(): boolean {
        return this.getGrayscale() >= 186;
    }

    /**
     * Checks if a given color is formatted as a string containing a hexadecimal
     * representation of a color
     * @param color string|ColorRGB|ColorHSL The color
     */
    private isHEX(color: string | ColorRGB | ColorHSL): boolean {
        let hexExp: RegExp = new RegExp(TerraRegex.COLOR_HEX);
        return typeof color === 'string' && hexExp.test(color);
    }

    /**
     * Checks if a given color is given in a RGB-representation.
     * @param color string|ColorRGB|ColorHSL The color
     */
    private isRGB(color: string | ColorRGB | ColorHSL): boolean {
        return !isUndefined((<ColorRGB>color).r);
    }

    /**
     * Checks if a given color is given in a HSL-representation.
     * @param color string|ColorRGB|ColorHSL The color
     */
    private isHSL(color: string | ColorRGB | ColorHSL): boolean {
        return !isUndefined((<ColorHSL>color).h);
    }

    /**
     * Converts a string representation of a color to a RGB representation.
     * @param color string The hexadecimal representation of a color
     */
    private readHEX(color: string): void {
        color = color.replace('#', '');
        if (color.length === 3) {
            color += color;
        }

        this.r = parseInt(color.substr(0, 2), 16);
        this.g = parseInt(color.substr(2, 2), 16);
        this.b = parseInt(color.substr(4, 2), 16);
    }

    /**
     * Read a color formatted as RGB. No transformation required because colors are stored as RGB internally.
     * @param color ColorRGB The color formatted as RGB.
     */
    private readRGB(color: ColorRGB): void {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
    }

    /**
     * Read a color formatted as HSL.
     * @param color ColorHSL The color formatted as HSL
     */
    private readHSL(color: ColorHSL): void {
        let r: number = color.l;
        let g: number = color.l;
        let b: number = color.l;

        if (color.s !== 0) {
            let q: number;
            if (color.l < 0.5) {
                q = color.l * (1 + color.s);
            } else {
                q = color.l + color.s - color.l * color.s;
            }

            let p: number = 2 * color.l - q;

            r = this.hue2rgb(p, q, color.h + 1 / 3);
            g = this.hue2rgb(p, q, color.h);
            b = this.hue2rgb(p, q, color.h - 1 / 3);
        }

        this.r = Math.round(r * 255);
        this.g = Math.round(g * 255);
        this.b = Math.round(b * 255);
    }

    private hue2rgb(p: number, q: number, t: number): number {
        if (t < 0) {
            t += 1;
        }
        if (t > 1) {
            t -= 1;
        }
        if (t < 1 / 6) {
            return p + (q - p) * 6 * t;
        }
        if (t < 1 / 2) {
            return q;
        }
        if (t < 2 / 3) {
            return p + (q - p) * (2 / 3 - t) * 6;
        }
        return p;
    }
}
