/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/** @type {?} */
export const COLOR_RGB = /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/;
/** @type {?} */
export const COLOR_HSL = /(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/;
export class Hsva {
    /**
     * @param {?} h
     * @param {?} s
     * @param {?} v
     * @param {?} a
     */
    constructor(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
}
if (false) {
    /** @type {?} */
    Hsva.prototype.h;
    /** @type {?} */
    Hsva.prototype.s;
    /** @type {?} */
    Hsva.prototype.v;
    /** @type {?} */
    Hsva.prototype.a;
}
export class Hsla {
    /**
     * @param {?} h
     * @param {?} s
     * @param {?} l
     * @param {?} a
     */
    constructor(h, s, l, a) {
        this.h = h;
        this.s = s;
        this.l = l;
        this.a = a;
    }
}
if (false) {
    /** @type {?} */
    Hsla.prototype.h;
    /** @type {?} */
    Hsla.prototype.s;
    /** @type {?} */
    Hsla.prototype.l;
    /** @type {?} */
    Hsla.prototype.a;
}
export class Rgba {
    /**
     * @param {?} r
     * @param {?} g
     * @param {?} b
     * @param {?} a
     */
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}
if (false) {
    /** @type {?} */
    Rgba.prototype.r;
    /** @type {?} */
    Rgba.prototype.g;
    /** @type {?} */
    Rgba.prototype.b;
    /** @type {?} */
    Rgba.prototype.a;
}
export class ColorUtil {
    /**
     * hsla to hsva
     * @param {?} hsla
     * @return {?}
     */
    hsla2hsva(hsla) {
        /** @type {?} */
        let h = Math.min(hsla.h, 1);
        /** @type {?} */
        let s = Math.min(hsla.s, 1);
        /** @type {?} */
        let l = Math.min(hsla.l, 1);
        /** @type {?} */
        let a = Math.min(hsla.a, 1);
        if (l === 0) {
            return { h: h, s: 0, v: 0, a: a };
        }
        else {
            /** @type {?} */
            let v = l + s * (1 - Math.abs(2 * l - 1)) / 2;
            return { h: h, s: 2 * (v - l) / v, v: v, a: a };
        }
    }
    /**
     * hsva to hsla
     * @param {?} hsva
     * @return {?}
     */
    hsva2hsla(hsva) {
        /** @type {?} */
        let h = hsva.h;
        /** @type {?} */
        let s = hsva.s;
        /** @type {?} */
        let v = hsva.v;
        /** @type {?} */
        let a = hsva.a;
        if (v === 0) {
            return new Hsla(h, 0, 0, a);
        }
        else if (s === 0 && v === 1) {
            return new Hsla(h, 1, 1, a);
        }
        else {
            /** @type {?} */
            let l = v * (2 - s) / 2;
            return new Hsla(h, v * s / (1 - Math.abs(2 * l - 1)), l, a);
        }
    }
    /**
     * rgba to hsva
     * @param {?} rgba
     * @return {?}
     */
    rgbaToHsva(rgba) {
        /** @type {?} */
        let r = Math.min(rgba.r, 1);
        /** @type {?} */
        let g = Math.min(rgba.g, 1);
        /** @type {?} */
        let b = Math.min(rgba.b, 1);
        /** @type {?} */
        let a = Math.min(rgba.a, 1);
        /** @type {?} */
        let max = Math.max(r, g, b);
        /** @type {?} */
        let min = Math.min(r, g, b);
        /** @type {?} */
        let h;
        /** @type {?} */
        let s;
        /** @type {?} */
        let v = max;
        /** @type {?} */
        let d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max === min) {
            h = 0;
        }
        else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return new Hsva(h, s, v, a);
    }
    /**
     * hsva to rgba
     * @param {?} hsva
     * @return {?}
     */
    hsvaToRgba(hsva) {
        /** @type {?} */
        let h = hsva.h;
        /** @type {?} */
        let s = hsva.s;
        /** @type {?} */
        let v = hsva.v;
        /** @type {?} */
        let a = hsva.a;
        /** @type {?} */
        let r;
        /** @type {?} */
        let g;
        /** @type {?} */
        let b;
        /** @type {?} */
        let i = Math.floor(h * 6);
        /** @type {?} */
        let f = h * 6 - i;
        /** @type {?} */
        let p = v * (1 - s);
        /** @type {?} */
        let q = v * (1 - f * s);
        /** @type {?} */
        let t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
        }
        return new Rgba(r, g, b, a);
    }
    /**
     * string to hsva
     * @param {?} colorString
     * @return {?}
     */
    stringToHsva(colorString) {
        /** @type {?} */
        let stringParsers = [
            {
                re: COLOR_RGB,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[2]) / 255, parseInt(execResult[3]) / 255, parseInt(execResult[4]) / 255, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            },
            {
                re: COLOR_HSL,
                parse: function (execResult) {
                    return new Hsla(parseInt(execResult[2]) / 360, parseInt(execResult[3]) / 100, parseInt(execResult[4]) / 100, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            },
            {
                re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[1], 16) / 255, parseInt(execResult[2], 16) / 255, parseInt(execResult[3], 16) / 255, 1);
                }
            },
            {
                re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[1] + execResult[1], 16) / 255, parseInt(execResult[2] + execResult[2], 16) / 255, parseInt(execResult[3] + execResult[3], 16) / 255, 1);
                }
            }
        ];
        colorString = colorString.toLowerCase();
        /** @type {?} */
        let hsva = null;
        for (let key in stringParsers) {
            if (stringParsers.hasOwnProperty(key)) {
                /** @type {?} */
                let parser = stringParsers[key];
                /** @type {?} */
                let match = parser.re.exec(colorString);
                /** @type {?} */
                let color = match && parser.parse(match);
                if (color) {
                    if (color instanceof Rgba) {
                        hsva = this.rgbaToHsva(color);
                    }
                    else if (color instanceof Hsla) {
                        hsva = this.hsla2hsva(color);
                    }
                    return hsva;
                }
            }
        }
        return hsva;
    }
    /**
     * output formate of color
     * @param {?} hsva
     * @param {?} outputFormat
     * @return {?}
     */
    outputFormat(hsva, outputFormat) {
        if (hsva.a < 1) {
            switch (outputFormat) {
                case 'hsl':
                    /** @type {?} */
                    let hsla = this.hsva2hsla(hsva);
                    /** @type {?} */
                    let hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                    return 'hsla(' + hslaText.h + ',' + hslaText.s + '%,' +
                        hslaText.l + '%,' + hslaText.a + ')';
                default:
                    /** @type {?} */
                    let rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
                    return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b +
                        ',' + Math.round(rgba.a * 100) / 100 + ')';
            }
        }
        else {
            switch (outputFormat) {
                case 'hsl':
                    /** @type {?} */
                    let hsla = this.hsva2hsla(hsva);
                    /** @type {?} */
                    let hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                    return 'hsl(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%)';
                case 'rgb':
                    /** @type {?} */
                    let rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
                    return 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
                default:
                    return this.hexText(this.denormalizeRGBA(this.hsvaToRgba(hsva)));
            }
        }
    }
    /**
     * @param {?} rgba
     * @return {?}
     */
    hexText(rgba) {
        /** @type {?} */
        let mainText = ((1 << 24) | (rgba.r << 16) | (rgba.g << 8) | rgba.b).toString(16);
        /** @type {?} */
        let hexText = '#' + mainText.substr(1);
        return hexText.toLowerCase();
    }
    /**
     * @param {?} rgba
     * @return {?}
     */
    denormalizeRGBA(rgba) {
        return new Rgba(Math.round(rgba.r * 255), Math.round(rgba.g * 255), Math.round(rgba.b * 255), rgba.a);
    }
}
ColorUtil.decorators = [
    { type: Injectable }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItdXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2NvbG9ycGlja2VyL2NvbG9yLXV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTNDLGFBQWEsU0FBUyxHQUFHLDJGQUEyRixDQUFDOztBQUNySCxhQUFhLFNBQVMsR0FBRyx5RkFBeUYsQ0FBQztBQUVuSCxNQUFNOzs7Ozs7O0lBQ0osWUFBbUIsQ0FBUyxFQUFTLENBQVMsRUFBUyxDQUFTLEVBQVMsQ0FBUztRQUEvRCxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQVMsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUFTLE1BQUMsR0FBRCxDQUFDLENBQVE7UUFBUyxNQUFDLEdBQUQsQ0FBQyxDQUFRO0tBQUs7Q0FDeEY7Ozs7Ozs7Ozs7O0FBQ0QsTUFBTTs7Ozs7OztJQUNKLFlBQW1CLENBQVMsRUFBUyxDQUFTLEVBQVMsQ0FBUyxFQUFTLENBQVM7UUFBL0QsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUFTLE1BQUMsR0FBRCxDQUFDLENBQVE7UUFBUyxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQVMsTUFBQyxHQUFELENBQUMsQ0FBUTtLQUFLO0NBQ3hGOzs7Ozs7Ozs7OztBQUNELE1BQU07Ozs7Ozs7SUFDSixZQUFtQixDQUFTLEVBQVMsQ0FBUyxFQUFTLENBQVMsRUFBUyxDQUFTO1FBQS9ELE1BQUMsR0FBRCxDQUFDLENBQVE7UUFBUyxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQVMsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUFTLE1BQUMsR0FBRCxDQUFDLENBQVE7S0FBSztDQUN4Rjs7Ozs7Ozs7Ozs7QUFHRCxNQUFNOzs7Ozs7SUFLSixTQUFTLENBQUMsSUFBVTs7UUFDbEIsSUFBSSxDQUFDLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENB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QyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQ2hFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDckM7OztZQWxORixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgQ09MT1JfUkdCID0gLyhyZ2IpYT9cXChcXHMqKFxcZHsxLDN9KVxccyosXFxzKihcXGR7MSwzfSlcXHMqJT8sXFxzKihcXGR7MSwzfSlcXHMqJT8oPzosXFxzKihcXGQrKD86XFwuXFxkKyk/KVxccyopP1xcKS87XG5leHBvcnQgY29uc3QgQ09MT1JfSFNMID0gLyhoc2wpYT9cXChcXHMqKFxcZHsxLDN9KVxccyosXFxzKihcXGR7MSwzfSklXFxzKixcXHMqKFxcZHsxLDN9KSVcXHMqKD86LFxccyooXFxkKyg/OlxcLlxcZCspPylcXHMqKT9cXCkvO1xuXG5leHBvcnQgY2xhc3MgSHN2YSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBoOiBudW1iZXIsIHB1YmxpYyBzOiBudW1iZXIsIHB1YmxpYyB2OiBudW1iZXIsIHB1YmxpYyBhOiBudW1iZXIpIHsgfVxufVxuZXhwb3J0IGNsYXNzIEhzbGEge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaDogbnVtYmVyLCBwdWJsaWMgczogbnVtYmVyLCBwdWJsaWMgbDogbnVtYmVyLCBwdWJsaWMgYTogbnVtYmVyKSB7IH1cbn1cbmV4cG9ydCBjbGFzcyBSZ2JhIHtcbiAgY29uc3RydWN0b3IocHVibGljIHI6IG51bWJlciwgcHVibGljIGc6IG51bWJlciwgcHVibGljIGI6IG51bWJlciwgcHVibGljIGE6IG51bWJlcikgeyB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb2xvclV0aWwge1xuICAvKipcbiogaHNsYSB0byBoc3ZhXG4qIEBwYXJhbSBoc2xhXG4qL1xuICBoc2xhMmhzdmEoaHNsYTogSHNsYSkge1xuICAgIGxldCBoOiBudW1iZXIgPSBNYXRoLm1pbihoc2xhLmgsIDEpLCBzID0gTWF0aC5taW4oaHNsYS5zLCAxKSwgbCA9IE1hdGgubWluKGhzbGEubCwgMSk7XG4gICAgbGV0IGEgPSBNYXRoLm1pbihoc2xhLmEsIDEpO1xuICAgIGlmIChsID09PSAwKSB7XG4gICAgICByZXR1cm4geyBoOiBoLCBzOiAwLCB2OiAwLCBhOiBhIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB2OiBudW1iZXIgPSBsICsgcyAqICgxIC0gTWF0aC5hYnMoMiAqIGwgLSAxKSkgLyAyO1xuICAgICAgcmV0dXJuIHsgaDogaCwgczogMiAqICh2IC0gbCkgLyB2LCB2OiB2LCBhOiBhIH07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogaHN2YSB0byBoc2xhXG4gICogQHBhcmFtIGhzdmFcbiAgKi9cbiAgaHN2YTJoc2xhKGhzdmE6IEhzdmEpIHtcbiAgICBsZXQgaCA9IGhzdmEuaCwgcyA9IGhzdmEucywgdiA9IGhzdmEudiwgYSA9IGhzdmEuYTtcbiAgICBpZiAodiA9PT0gMCkge1xuICAgICAgcmV0dXJuIG5ldyBIc2xhKGgsIDAsIDAsIGEpO1xuICAgIH0gZWxzZSBpZiAocyA9PT0gMCAmJiB2ID09PSAxKSB7XG4gICAgICByZXR1cm4gbmV3IEhzbGEoaCwgMSwgMSwgYSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBsOiBudW1iZXIgPSB2ICogKDIgLSBzKSAvIDI7XG4gICAgICByZXR1cm4gbmV3IEhzbGEoaCwgdiAqIHMgLyAoMSAtIE1hdGguYWJzKDIgKiBsIC0gMSkpLCBsLCBhKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmdiYSB0byBoc3ZhXG4gICAqIEBwYXJhbSByZ2JhXG4gICAqL1xuICByZ2JhVG9Ic3ZhKHJnYmE6IFJnYmEpIHtcbiAgICBsZXQgcjogbnVtYmVyID0gTWF0aC5taW4ocmdiYS5yLCAxKSwgZyA9IE1hdGgubWluKHJnYmEuZywgMSksIGIgPSBNYXRoLm1pbihyZ2JhLmIsIDEpO1xuICAgIGxldCBhID0gTWF0aC5taW4ocmdiYS5hLCAxKTtcbiAgICBsZXQgbWF4OiBudW1iZXIgPSBNYXRoLm1heChyLCBnLCBiKSwgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gICAgbGV0IGg6IG51bWJlciwgczogbnVtYmVyLCB2OiBudW1iZXIgPSBtYXg7XG4gICAgbGV0IGQ6IG51bWJlciA9IG1heCAtIG1pbjtcbiAgICBzID0gbWF4ID09PSAwID8gMCA6IGQgLyBtYXg7XG5cbiAgICBpZiAobWF4ID09PSBtaW4pIHtcbiAgICAgIGggPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKG1heCkge1xuICAgICAgICBjYXNlIHI6XG4gICAgICAgICAgaCA9IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGc6XG4gICAgICAgICAgaCA9IChiIC0gcikgLyBkICsgMjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBiOlxuICAgICAgICAgIGggPSAociAtIGcpIC8gZCArIDQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBoIC89IDY7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBIc3ZhKGgsIHMsIHYsIGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhzdmEgdG8gcmdiYVxuICAgKiBAcGFyYW0gaHN2YVxuICAgKi9cbiAgaHN2YVRvUmdiYShoc3ZhOiBIc3ZhKSB7XG4gICAgbGV0IGg6IG51bWJlciA9IGhzdmEuaCwgczogbnVtYmVyID0gaHN2YS5zLCB2OiBudW1iZXIgPSBoc3ZhLnYsIGE6IG51bWJlciA9IGhzdmEuYTtcbiAgICBsZXQgcjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcjtcblxuICAgIGxldCBpOiBudW1iZXIgPSBNYXRoLmZsb29yKGggKiA2KTtcbiAgICBsZXQgZjogbnVtYmVyID0gaCAqIDYgLSBpO1xuICAgIGxldCBwOiBudW1iZXIgPSB2ICogKDEgLSBzKTtcbiAgICBsZXQgcTogbnVtYmVyID0gdiAqICgxIC0gZiAqIHMpO1xuICAgIGxldCB0OiBudW1iZXIgPSB2ICogKDEgLSAoMSAtIGYpICogcyk7XG5cbiAgICBzd2l0Y2ggKGkgJSA2KSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHIgPSB2OyBnID0gdDsgYiA9IHA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByID0gcTsgZyA9IHY7IGIgPSBwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgciA9IHA7IGcgPSB2OyBiID0gdDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHIgPSBwOyBnID0gcTsgYiA9IHY7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICByID0gdDsgZyA9IHA7IGIgPSB2O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgciA9IHY7IGcgPSBwOyBiID0gcTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBSZ2JhKHIsIGcsIGIsIGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0cmluZyB0byBoc3ZhXG4gICAqIEBwYXJhbSBjb2xvclN0cmluZ1xuICAgKi9cbiAgc3RyaW5nVG9Ic3ZhKGNvbG9yU3RyaW5nOiBzdHJpbmcpIHtcbiAgICBsZXQgc3RyaW5nUGFyc2VycyA9IFtcbiAgICAgIHtcbiAgICAgICAgcmU6IENPTE9SX1JHQixcbiAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChleGVjUmVzdWx0OiBBcnJheTxzdHJpbmc+KSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBSZ2JhKHBhcnNlSW50KGV4ZWNSZXN1bHRbMl0pIC8gMjU1LFxuICAgICAgICAgICAgcGFyc2VJbnQoZXhlY1Jlc3VsdFszXSkgLyAyNTUsXG4gICAgICAgICAgICBwYXJzZUludChleGVjUmVzdWx0WzRdKSAvIDI1NSxcbiAgICAgICAgICAgIGlzTmFOKHBhcnNlRmxvYXQoZXhlY1Jlc3VsdFs1XSkpID8gMSA6IHBhcnNlRmxvYXQoZXhlY1Jlc3VsdFs1XSkpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByZTogQ09MT1JfSFNMLFxuICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGV4ZWNSZXN1bHQ6IEFycmF5PHN0cmluZz4pIHtcbiAgICAgICAgICByZXR1cm4gbmV3IEhzbGEocGFyc2VJbnQoZXhlY1Jlc3VsdFsyXSkgLyAzNjAsXG4gICAgICAgICAgICBwYXJzZUludChleGVjUmVzdWx0WzNdKSAvIDEwMCxcbiAgICAgICAgICAgIHBhcnNlSW50KGV4ZWNSZXN1bHRbNF0pIC8gMTAwLFxuICAgICAgICAgICAgaXNOYU4ocGFyc2VGbG9hdChleGVjUmVzdWx0WzVdKSkgPyAxIDogcGFyc2VGbG9hdChleGVjUmVzdWx0WzVdKSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJlOiAvIyhbYS1mQS1GMC05XXsyfSkoW2EtZkEtRjAtOV17Mn0pKFthLWZBLUYwLTldezJ9KSQvLFxuICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGV4ZWNSZXN1bHQ6IEFycmF5PHN0cmluZz4pIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFJnYmEocGFyc2VJbnQoZXhlY1Jlc3VsdFsxXSwgMTYpIC8gMjU1LFxuICAgICAgICAgICAgcGFyc2VJbnQoZXhlY1Jlc3VsdFsyXSwgMTYpIC8gMjU1LFxuICAgICAgICAgICAgcGFyc2VJbnQoZXhlY1Jlc3VsdFszXSwgMTYpIC8gMjU1LFxuICAgICAgICAgICAgMSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJlOiAvIyhbYS1mQS1GMC05XSkoW2EtZkEtRjAtOV0pKFthLWZBLUYwLTldKSQvLFxuICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGV4ZWNSZXN1bHQ6IEFycmF5PHN0cmluZz4pIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFJnYmEocGFyc2VJbnQoZXhlY1Jlc3VsdFsxXSArIGV4ZWNSZXN1bHRbMV0sIDE2KSAvIDI1NSxcbiAgICAgICAgICAgIHBhcnNlSW50KGV4ZWNSZXN1bHRbMl0gKyBleGVjUmVzdWx0WzJdLCAxNikgLyAyNTUsXG4gICAgICAgICAgICBwYXJzZUludChleGVjUmVzdWx0WzNdICsgZXhlY1Jlc3VsdFszXSwgMTYpIC8gMjU1LFxuICAgICAgICAgICAgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdO1xuICAgIGNvbG9yU3RyaW5nID0gY29sb3JTdHJpbmcudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgaHN2YTogYW55ID0gbnVsbDtcbiAgICBmb3IgKGxldCBrZXkgaW4gc3RyaW5nUGFyc2Vycykge1xuICAgICAgaWYgKHN0cmluZ1BhcnNlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBsZXQgcGFyc2VyID0gc3RyaW5nUGFyc2Vyc1trZXldO1xuICAgICAgICBsZXQgbWF0Y2g6IEFycmF5PHN0cmluZz4gPSBwYXJzZXIucmUuZXhlYyhjb2xvclN0cmluZyk7XG4gICAgICAgIGxldCBjb2xvciA9IG1hdGNoICYmIHBhcnNlci5wYXJzZShtYXRjaCk7XG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgIGlmIChjb2xvciBpbnN0YW5jZW9mIFJnYmEpIHtcbiAgICAgICAgICAgIGhzdmEgPSB0aGlzLnJnYmFUb0hzdmEoY29sb3IpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29sb3IgaW5zdGFuY2VvZiBIc2xhKSB7XG4gICAgICAgICAgICBoc3ZhID0gdGhpcy5oc2xhMmhzdmEoY29sb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaHN2YTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaHN2YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBvdXRwdXQgZm9ybWF0ZSBvZiBjb2xvclxuICAgKiBAcGFyYW0gaHN2YVxuICAgKiBAcGFyYW0gb3V0cHV0Rm9ybWF0XG4gICAqL1xuICBvdXRwdXRGb3JtYXQoaHN2YTogSHN2YSwgb3V0cHV0Rm9ybWF0OiBzdHJpbmcpIHtcbiAgICBpZiAoaHN2YS5hIDwgMSkge1xuICAgICAgc3dpdGNoIChvdXRwdXRGb3JtYXQpIHtcbiAgICAgICAgY2FzZSAnaHNsJzpcbiAgICAgICAgICBsZXQgaHNsYSA9IHRoaXMuaHN2YTJoc2xhKGhzdmEpO1xuICAgICAgICAgIGxldCBoc2xhVGV4dCA9IG5ldyBIc2xhKE1hdGgucm91bmQoKGhzbGEuaCkgKiAzNjApLCBNYXRoLnJvdW5kKGhzbGEucyAqIDEwMCksXG4gICAgICAgICAgICBNYXRoLnJvdW5kKGhzbGEubCAqIDEwMCksIE1hdGgucm91bmQoaHNsYS5hICogMTAwKSAvIDEwMFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuICdoc2xhKCcgKyBoc2xhVGV4dC5oICsgJywnICsgaHNsYVRleHQucyArICclLCcgK1xuICAgICAgICAgICAgaHNsYVRleHQubCArICclLCcgKyBoc2xhVGV4dC5hICsgJyknO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGxldCByZ2JhID0gdGhpcy5kZW5vcm1hbGl6ZVJHQkEodGhpcy5oc3ZhVG9SZ2JhKGhzdmEpKTtcbiAgICAgICAgICByZXR1cm4gJ3JnYmEoJyArIHJnYmEuciArICcsJyArIHJnYmEuZyArICcsJyArIHJnYmEuYiArXG4gICAgICAgICAgICAnLCcgKyBNYXRoLnJvdW5kKHJnYmEuYSAqIDEwMCkgLyAxMDAgKyAnKSc7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAob3V0cHV0Rm9ybWF0KSB7XG4gICAgICAgIGNhc2UgJ2hzbCc6XG4gICAgICAgICAgbGV0IGhzbGEgPSB0aGlzLmhzdmEyaHNsYShoc3ZhKTtcbiAgICAgICAgICBsZXQgaHNsYVRleHQgPSBuZXcgSHNsYShNYXRoLnJvdW5kKChoc2xhLmgpICogMzYwKSwgTWF0aC5yb3VuZChoc2xhLnMgKiAxMDApLFxuICAgICAgICAgICAgTWF0aC5yb3VuZChoc2xhLmwgKiAxMDApLCBNYXRoLnJvdW5kKGhzbGEuYSAqIDEwMCkgLyAxMDApO1xuICAgICAgICAgIHJldHVybiAnaHNsKCcgKyBoc2xhVGV4dC5oICsgJywnICsgaHNsYVRleHQucyArICclLCcgKyBoc2xhVGV4dC5sICsgJyUpJztcbiAgICAgICAgY2FzZSAncmdiJzpcbiAgICAgICAgICBsZXQgcmdiYSA9IHRoaXMuZGVub3JtYWxpemVSR0JBKHRoaXMuaHN2YVRvUmdiYShoc3ZhKSk7XG4gICAgICAgICAgcmV0dXJuICdyZ2IoJyArIHJnYmEuciArICcsJyArIHJnYmEuZyArICcsJyArIHJnYmEuYiArICcpJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gdGhpcy5oZXhUZXh0KHRoaXMuZGVub3JtYWxpemVSR0JBKHRoaXMuaHN2YVRvUmdiYShoc3ZhKSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBoZXhUZXh0KHJnYmE6IFJnYmEpIHtcbiAgICBsZXQgbWFpblRleHQgPSAoKDEgPDwgMjQpIHwgKHJnYmEuciA8PCAxNikgfCAocmdiYS5nIDw8IDgpIHwgcmdiYS5iKS50b1N0cmluZygxNik7XG4gICAgbGV0IGhleFRleHQgPSAnIycgKyBtYWluVGV4dC5zdWJzdHIoMSk7XG4gICAgcmV0dXJuIGhleFRleHQudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIGRlbm9ybWFsaXplUkdCQShyZ2JhOiBSZ2JhKSB7XG4gICAgcmV0dXJuIG5ldyBSZ2JhKE1hdGgucm91bmQocmdiYS5yICogMjU1KSwgTWF0aC5yb3VuZChyZ2JhLmcgKiAyNTUpLFxuICAgICAgTWF0aC5yb3VuZChyZ2JhLmIgKiAyNTUpLCByZ2JhLmEpO1xuICB9XG59XG4iXX0=