/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ElementRef, ViewEncapsulation, Directive, Optional, Renderer, Self, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
import { Overlay } from '../core/overlay/overlay';
import { OverlayState } from '../core/overlay/overlay-state';
import { TemplatePortal } from '../core/portal/portal';
import { ColorUtil, Rgba, Hsla, Hsva } from './color-util';
var SliderPosition = /** @class */ (function () {
    function SliderPosition(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
    return SliderPosition;
}());
export { SliderPosition };
if (false) {
    /** @type {?} */
    SliderPosition.prototype.h;
    /** @type {?} */
    SliderPosition.prototype.s;
    /** @type {?} */
    SliderPosition.prototype.v;
    /** @type {?} */
    SliderPosition.prototype.a;
}
var SliderDimension = /** @class */ (function () {
    function SliderDimension(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
    return SliderDimension;
}());
export { SliderDimension };
if (false) {
    /** @type {?} */
    SliderDimension.prototype.h;
    /** @type {?} */
    SliderDimension.prototype.s;
    /** @type {?} */
    SliderDimension.prototype.v;
    /** @type {?} */
    SliderDimension.prototype.a;
}
/** @typedef {?} */
var Container;
export { Container };
/** @type {?} */
var nextId = 0;
var TextDirective = /** @class */ (function () {
    function TextDirective() {
        this.newValue = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    TextDirective.prototype.changeInput = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        event.preventDefault();
        /** @type {?} */
        var value = event.target.value;
        if (this.rg === undefined) {
            this.newValue.emit(value);
        }
        else {
            /** @type {?} */
            var numeric = parseFloat(value);
            if (!isNaN(numeric) && numeric >= 0 && numeric <= this.rg) {
                this.newValue.emit({ v: numeric, rg: this.rg });
            }
        }
    };
    TextDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[text]',
                    host: {
                        '(input)': 'changeInput($event)'
                    }
                },] }
    ];
    TextDirective.propDecorators = {
        newValue: [{ type: Output, args: ['newValue',] }],
        text: [{ type: Input, args: ['text',] }],
        rg: [{ type: Input, args: ['rg',] }]
    };
    return TextDirective;
}());
export { TextDirective };
if (false) {
    /** @type {?} */
    TextDirective.prototype.newValue;
    /** @type {?} */
    TextDirective.prototype.text;
    /** @type {?} */
    TextDirective.prototype.rg;
}
var ColorpickerSliderDirective = /** @class */ (function () {
    function ColorpickerSliderDirective(_element) {
        var _this = this;
        this._element = _element;
        this.change = new EventEmitter();
        this.listenerMove = function (event) { _this.move(event); };
        this.listenerStop = function () { _this.stop(); };
    }
    /**
     * set cursor position
     * @param event
     */
    /**
     * set cursor position
     * @param {?} event
     * @return {?}
     */
    ColorpickerSliderDirective.prototype.setCursor = /**
     * set cursor position
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var height = this._getNativeElement().offsetHeight;
        /** @type {?} */
        var width = this._getNativeElement().offsetWidth;
        /** @type {?} */
        var x = Math.max(0, Math.min(this.getX(event), width));
        /** @type {?} */
        var y = Math.max(0, Math.min(this.getY(event), height));
        if (this.pointX !== undefined && this.pointY !== undefined) {
            this.change.emit({
                s: x / width, v: (1 - y / height),
                pointX: this.pointX, pointY: this.pointY
            });
        }
        else if (this.pointX === undefined && this.pointY !== undefined) {
            this.change.emit({ v: y / height, rg: this.pointY });
        }
        else {
            this.change.emit({ v: x / width, rg: this.pointX });
        }
    };
    /**
     * input event listner
     * @param event
     */
    /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    ColorpickerSliderDirective.prototype.move = /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.setCursor(event);
    };
    /**
     * input event listner
     * @param event
     */
    /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    ColorpickerSliderDirective.prototype.start = /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.setCursor(event);
        document.addEventListener('mousemove', this.listenerMove);
        document.addEventListener('touchmove', this.listenerMove);
        document.addEventListener('mouseup', this.listenerStop);
        document.addEventListener('touchend', this.listenerStop);
    };
    /**
     * stop mouse event
     */
    /**
     * stop mouse event
     * @return {?}
     */
    ColorpickerSliderDirective.prototype.stop = /**
     * stop mouse event
     * @return {?}
     */
    function () {
        document.removeEventListener('mousemove', this.listenerMove);
        document.removeEventListener('touchmove', this.listenerMove);
        document.removeEventListener('mouseup', this.listenerStop);
        document.removeEventListener('touchend', this.listenerStop);
    };
    /**
     * get x
     * @param event
     */
    /**
     * get x
     * @param {?} event
     * @return {?}
     */
    ColorpickerSliderDirective.prototype.getX = /**
     * get x
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var boundingClientRect = this._getNativeElement().getBoundingClientRect();
        return (event.pageX !== undefined ? event.pageX : event.touches[0].pageX) -
            boundingClientRect.left - window.pageXOffset;
    };
    /**
     * get y
     * @param event
     */
    /**
     * get y
     * @param {?} event
     * @return {?}
     */
    ColorpickerSliderDirective.prototype.getY = /**
     * get y
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var boundingClientRect = this._getNativeElement().getBoundingClientRect();
        return (event.pageY !== undefined ? event.pageY : event.touches[0].pageY) -
            boundingClientRect.top - window.pageYOffset;
    };
    /**
     * @return {?}
     */
    ColorpickerSliderDirective.prototype._getNativeElement = /**
     * @return {?}
     */
    function () {
        return this._element.nativeElement;
    };
    ColorpickerSliderDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[colorpicker-slider]',
                    host: {
                        '(mousedown)': 'start($event)',
                        '(touchstart)': 'start($event)'
                    }
                },] }
    ];
    /** @nocollapse */
    ColorpickerSliderDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ColorpickerSliderDirective.propDecorators = {
        slider: [{ type: Input, args: ['colorpicker-slider',] }],
        pointX: [{ type: Input, args: ['point-x',] }],
        pointY: [{ type: Input, args: ['point-y',] }],
        change: [{ type: Output, args: ['change',] }]
    };
    return ColorpickerSliderDirective;
}());
export { ColorpickerSliderDirective };
if (false) {
    /** @type {?} */
    ColorpickerSliderDirective.prototype.slider;
    /** @type {?} */
    ColorpickerSliderDirective.prototype.pointX;
    /** @type {?} */
    ColorpickerSliderDirective.prototype.pointY;
    /** @type {?} */
    ColorpickerSliderDirective.prototype.change;
    /** @type {?} */
    ColorpickerSliderDirective.prototype.listenerMove;
    /** @type {?} */
    ColorpickerSliderDirective.prototype.listenerStop;
    /** @type {?} */
    ColorpickerSliderDirective.prototype._element;
}
/**
 * Change event object emitted by Md2Colorpicker.
 */
var /**
 * Change event object emitted by Md2Colorpicker.
 */
Md2ColorChange = /** @class */ (function () {
    function Md2ColorChange(source, color) {
        this.source = source;
        this.color = color;
    }
    return Md2ColorChange;
}());
/**
 * Change event object emitted by Md2Colorpicker.
 */
export { Md2ColorChange };
if (false) {
    /** @type {?} */
    Md2ColorChange.prototype.source;
    /** @type {?} */
    Md2ColorChange.prototype.color;
}
var Md2Colorpicker = /** @class */ (function () {
    function Md2Colorpicker(_element, _overlay, _viewContainerRef, _renderer, _util, _control) {
        this._element = _element;
        this._overlay = _overlay;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._util = _util;
        this._control = _control;
        this._innerValue = '';
        this.backColor = true;
        this._defalutColor = '#000000';
        /**
         * Whether or not the overlay panel is open.
         */
        this._panelOpen = false;
        this._color = null;
        /**
         * Whether filling out the select is required in the form.
         */
        this._required = false;
        /**
         * Whether the select is disabled.
         */
        this._disabled = false;
        this.isInputFocus = false;
        this._container = 'inline';
        this.isInputValidColor = false;
        this._onChange = function () { };
        this._onTouched = function () { };
        this.cFormat = 'hex';
        this.colorpickerChange = new EventEmitter();
        /**
         * Event emitted when the selected date has been changed by the user.
         */
        this.change = new EventEmitter();
        this.tabindex = 0;
        this.id = 'md2-colorpicker-' + (++nextId);
        /**
         * Event emitted when the select has been opened.
         */
        this.onOpen = new EventEmitter();
        /**
         * Event emitted when the select has been closed.
         */
        this.onClose = new EventEmitter();
        this._created = false;
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }
    Object.defineProperty(Md2Colorpicker.prototype, "color", {
        get: /**
         * @return {?}
         */
        function () { return this._color; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._color = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "placeholder", {
        /** Placeholder to be shown if no value has been selected. */
        get: /**
         * Placeholder to be shown if no value has been selected.
         * @return {?}
         */
        function () { return this._placeholder; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._placeholder = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "required", {
        get: /**
         * @return {?}
         */
        function () { return this._required; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "disabled", {
        /** Whether the component is disabled. */
        get: /**
         * Whether the component is disabled.
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._innerValue;
        },
        /**
        * set accessor including call the onchange callback
        */
        set: /**
         * set accessor including call the onchange callback
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this._innerValue) {
                if (v) {
                    this.hsva = this._util.stringToHsva(v);
                }
                this._innerValue = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "container", {
        get: /**
         * @return {?}
         */
        function () { return this._container; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._container !== value) {
                this._container = value || 'inline';
                this.destroyPanel();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "setGradient", {
        get: /**
         * @return {?}
         */
        function () {
            return {
                'background-image': 'linear-gradient(to right, transparent, transparent),' +
                    'linear-gradient(to left, ' + this.hexText + ', rgba(255, 255, 255, 0))'
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Md2Colorpicker.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () { this.destroyPanel(); };
    Object.defineProperty(Md2Colorpicker.prototype, "panelOpen", {
        /** Whether or not the overlay panel is open. */
        get: /**
         * Whether or not the overlay panel is open.
         * @return {?}
         */
        function () {
            return this._panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    /** Toggles the overlay panel open or closed. */
    /**
     * Toggles the overlay panel open or closed.
     * @return {?}
     */
    Md2Colorpicker.prototype.toggle = /**
     * Toggles the overlay panel open or closed.
     * @return {?}
     */
    function () {
        this.panelOpen ? this.close() : this.open();
    };
    /** Opens the overlay panel. */
    /**
     * Opens the overlay panel.
     * @return {?}
     */
    Md2Colorpicker.prototype.open = /**
     * Opens the overlay panel.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var hsva = this._util.stringToHsva(this.color + '');
        this.isInputFocus = true;
        if (hsva) {
            this.hsva = hsva;
        }
        else {
            this.hsva = this._util.stringToHsva(this._defalutColor);
        }
        this.sliderDim = new SliderDimension(245, 250, 130, 245);
        this.slider = new SliderPosition(0, 0, 0, 0);
        if (this.cFormat === 'rgb') {
            this.format = 1;
        }
        else if (this.cFormat === 'hsl') {
            this.format = 2;
        }
        else {
            this.format = 0;
        }
        this.update();
        if (this.disabled) {
            return;
        }
        if (!this._isColorpickerVisible) {
            this._initialColor = this.color;
            this.update();
            this._isColorpickerVisible = true;
        }
        else {
            this._isColorpickerVisible = false;
        }
        this._createOverlay();
        if (!this._portal) {
            this._portal = new TemplatePortal(this._templatePortal, this._viewContainerRef);
        }
        this._overlayRef.attach(this._portal);
        this._subscribeToBackdrop();
        this._panelOpen = true;
        this.onOpen.emit();
    };
    /** Closes the overlay panel and focuses the host element. */
    /**
     * Closes the overlay panel and focuses the host element.
     * @return {?}
     */
    Md2Colorpicker.prototype.close = /**
     * Closes the overlay panel and focuses the host element.
     * @return {?}
     */
    function () {
        this._panelOpen = false;
        this.isInputFocus = false;
        if (this._overlayRef) {
            this._overlayRef.detach();
            this._backdropSubscription.unsubscribe();
        }
        this._isColorpickerVisible = false;
        if (this._innerValue) {
            this.setColorFromString(this._innerValue);
        }
    };
    /** Removes the panel from the DOM. */
    /**
     * Removes the panel from the DOM.
     * @return {?}
     */
    Md2Colorpicker.prototype.destroyPanel = /**
     * Removes the panel from the DOM.
     * @return {?}
     */
    function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._cleanUpSubscriptions();
        }
    };
    /**
     * @return {?}
     */
    Md2Colorpicker.prototype._onBlur = /**
     * @return {?}
     */
    function () {
        if (!this.panelOpen) {
            this._onTouched();
        }
    };
    /**
      * input event listner
      * @param event
      */
    /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    Md2Colorpicker.prototype.changeInput = /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var value = event.target.value;
        this.colorpickerChange.emit(value);
    };
    /**
    * set saturation,lightness,hue,alpha,RGB value
    * @param val
    * @param rg
    */
    /**
     * set saturation,lightness,hue,alpha,RGB value
     * @param {?} val
     * @return {?}
     */
    Md2Colorpicker.prototype.setSaturation = /**
     * set saturation,lightness,hue,alpha,RGB value
     * @param {?} val
     * @return {?}
     */
    function (val) {
        /** @type {?} */
        var hsla = this._util.hsva2hsla(this.hsva);
        hsla.s = val.v / val.rg;
        this.hsva = this._util.hsla2hsva(hsla);
        this.update();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    Md2Colorpicker.prototype.setLightness = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        /** @type {?} */
        var hsla = this._util.hsva2hsla(this.hsva);
        hsla.l = val.v / val.rg;
        this.hsva = this._util.hsla2hsva(hsla);
        this.update();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    Md2Colorpicker.prototype.setHue = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.hsva.h = val.v / val.rg;
        this.update();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    Md2Colorpicker.prototype.setAlpha = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.hsva.a = val.v / val.rg;
        this.update();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    Md2Colorpicker.prototype.setR = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        /** @type {?} */
        var rgba = this._util.hsvaToRgba(this.hsva);
        rgba.r = val.v / val.rg;
        this.hsva = this._util.rgbaToHsva(rgba);
        this.update();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    Md2Colorpicker.prototype.setG = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        /** @type {?} */
        var rgba = this._util.hsvaToRgba(this.hsva);
        rgba.g = val.v / val.rg;
        this.hsva = this._util.rgbaToHsva(rgba);
        this.update();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    Md2Colorpicker.prototype.setB = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        /** @type {?} */
        var rgba = this._util.hsvaToRgba(this.hsva);
        rgba.b = val.v / val.rg;
        this.hsva = this._util.rgbaToHsva(rgba);
        this.update();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    Md2Colorpicker.prototype.setSaturationAndBrightness = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.hsva.s = val.s / val.pointX;
        this.hsva.v = val.v / val.pointY;
        this.update();
    };
    /**
     * @return {?}
     */
    Md2Colorpicker.prototype.clickOk = /**
     * @return {?}
     */
    function () {
        this._isColorpickerVisible = false;
        this.isInputValidColor = false;
        this.color = this._innerValue;
        if (this._innerValue != this._initialColor) {
            this._emitChangeEvent();
        }
        this.close();
    };
    /**
    * deselect recent color and close popup
    */
    /**
     * deselect recent color and close popup
     * @return {?}
     */
    Md2Colorpicker.prototype.cancelColor = /**
     * deselect recent color and close popup
     * @return {?}
     */
    function () {
        this._innerValue = this._initialColor;
        this.close();
    };
    /**
     * @param {?} str
     * @return {?}
     */
    Md2Colorpicker.prototype.isValidColor = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str.match(/^#[a-f0-9]{6}$/i) !== null;
    };
    /**
       * set color
       * @param value
       */
    /**
     * set color
     * @param {?} value
     * @return {?}
     */
    Md2Colorpicker.prototype.setColorFromString = /**
     * set color
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.isValidColor(value)) {
            value = '#000000';
            this.backColor = false;
        }
        /** @type {?} */
        var hsva = this._util.stringToHsva(value);
        if (hsva !== null) {
            this.hsva = hsva;
        }
        this.update();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Md2Colorpicker.prototype.formatPolicy = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.format = value;
        if (this.format === 0 && this.hsva.a < 1) {
            this.format++;
        }
        return this.format;
    };
    /**
     * update color
     */
    /**
     * update color
     * @return {?}
     */
    Md2Colorpicker.prototype.update = /**
     * update color
     * @return {?}
     */
    function () {
        /** @type {?} */
        var hsla = this._util.hsva2hsla(this.hsva);
        /** @type {?} */
        var rgba = this._util.denormalizeRGBA(this._util.hsvaToRgba(this.hsva));
        /** @type {?} */
        var hueRgba = this._util.denormalizeRGBA(this._util.hsvaToRgba(new Hsva(this.hsva.h, 1, 1, 1)));
        this.alphaColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
        this._hueSliderColor = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';
        this.hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
        this.rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
        if (this.backColor) {
            this.hexText = this._util.hexText(rgba);
        }
        this.backColor = true;
        /** @type {?} */
        var colorCode = Math.round((this.rgbaText.r * 299 + this.rgbaText.g * 587 +
            this.rgbaText.b * 114) / 1000);
        if (colorCode >= 128 || this.hsva.a < 0.35) {
            this.fontColor = 'black';
            this._isDark = true;
        }
        else {
            this.fontColor = 'white';
            this._isDark = false;
        }
        if (this.format === 0 && this.hsva.a < 1) {
            this.format++;
        }
        this.outputColor = this._util.outputFormat(this.hsva, this.cFormat);
        this.slider = new SliderPosition((this.hsva.h) * this.sliderDim.h, this.hsva.s * this.sliderDim.s - 7, (1 - this.hsva.v) * this.sliderDim.v - 7, this.hsva.a * this.sliderDim.a);
        this._innerValue = this.outputColor;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Md2Colorpicker.prototype.clearColor = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        this.color = '';
        this._emitChangeEvent();
    };
    /**
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    Md2Colorpicker.prototype.isDescendant = /**
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    function (parent, child) {
        /** @type {?} */
        var node = child.parentNode;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };
    /**
     * @return {?}
     */
    Md2Colorpicker.prototype.checkInputVal = /**
     * @return {?}
     */
    function () {
        this.hsva = this._util.stringToHsva(this.color + '');
        this.isInputFocus = false;
        if (this.hsva) {
            if (this._innerValue !== this.color) {
                this._emitChangeEvent();
            }
            this.isInputValidColor = false;
        }
        else {
            this.isInputValidColor = true;
        }
        this._onTouched();
    };
    /** Emits an event when the user selects a color. */
    /**
     * Emits an event when the user selects a color.
     * @return {?}
     */
    Md2Colorpicker.prototype._emitChangeEvent = /**
     * Emits an event when the user selects a color.
     * @return {?}
     */
    function () {
        this._onChange(this.color);
        this.change.emit(new Md2ColorChange(this, this.color));
        this._innerValue = this.color;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Md2Colorpicker.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._innerValue = value;
        this.color = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    Md2Colorpicker.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    Md2Colorpicker.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    Md2Colorpicker.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @return {?}
     */
    Md2Colorpicker.prototype._subscribeToBackdrop = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._backdropSubscription = this._overlayRef.backdropClick().subscribe(function () {
            _this._innerValue = _this._initialColor;
            _this.close();
        });
    };
    /**
     *  This method creates the overlay from the provided panel's template and saves its
     *  OverlayRef so that it can be attached to the DOM when open is called.
     * @return {?}
     */
    Md2Colorpicker.prototype._createOverlay = /**
     *  This method creates the overlay from the provided panel's template and saves its
     *  OverlayRef so that it can be attached to the DOM when open is called.
     * @return {?}
     */
    function () {
        if (!this._overlayRef) {
            /** @type {?} */
            var config = new OverlayState();
            if (this.container === 'inline') {
                config.positionStrategy = this._createPickerPositionStrategy();
                config.hasBackdrop = true;
                config.backdropClass = 'cdk-overlay-transparent-backdrop';
                config.scrollStrategy = this._overlay.scrollStrategies.reposition();
            }
            else {
                config.positionStrategy = this._overlay.position()
                    .global()
                    .centerHorizontally()
                    .centerVertically();
                config.hasBackdrop = true;
            }
            this._overlayRef = this._overlay.create(config);
        }
    };
    /**
     * Create the popup PositionStrategy.
     * @return {?}
     */
    Md2Colorpicker.prototype._createPickerPositionStrategy = /**
     * Create the popup PositionStrategy.
     * @return {?}
     */
    function () {
        return this._overlay.position()
            .connectedTo(this._element, { originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' })
            .withFallbackPosition({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'top' })
            .withFallbackPosition({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'bottom' })
            .withFallbackPosition({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'bottom' });
    };
    /**
     * @return {?}
     */
    Md2Colorpicker.prototype._cleanUpSubscriptions = /**
     * @return {?}
     */
    function () {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
        if (this._positionSubscription) {
            this._positionSubscription.unsubscribe();
        }
    };
    Md2Colorpicker.decorators = [
        { type: Component, args: [{
                    selector: 'md2-colorpicker',
                    template: "\n<div class=\"md2-colorpicker-trigger\">\n  <div class=\"color-picker-selector\" [class.color-error]=\"isInputValidColor && required\">\n    <div class=\"md2-colorpicker-preview\" (click)=\"toggle()\">\n      <div class=\"color-fill\" [style.background-color]=\"color\"> </div>\n    </div>\n    <div class=\"md2-colorpicker-input\" [class.input-focused]=\"isInputFocus\">\n      <span class=\"md2-colorpicker-placeholder\" [class.has-value]=\"color\">{{ placeholder }}</span>\n      <input class=\"md2-colorpicker-value\" autocomplete=\"off\" value=\"color\" [tabindex]=\"tabindex\" [disabled]=\"disabled\" [(ngModel)]=\"color\" (focus)=\"isInputFocus=true\" (blur)=\"checkInputVal()\" />\n      <span *ngIf=\"color && !required && !disabled\" class=\"color-clear\" (click)=\"clearColor($event)\">\n        <svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\">\n          <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n        </svg>\n      </span>\n    </div>\n  </div>\n</div>\n<ng-template #portal>\n  <div class=\"md2-colorpicker-panel\" tabindex=\"0\" [attr.container]=\"container\">\n    <div class=\"md2-colorpicker-content\">\n      <div class=\"md2-colorpicker-wrapper\">\n        <div class=\"md2-color-picker\">\n          <div class=\"selected-color\">\n            <div class=\"selected-color-bg\" [style.background]=\"outputColor\">\n              <div class=\"color-input\">\n                <div [hidden]=\"format!=2\" class=\"hsla-text\">\n                  <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"360\" [rg]=\"360\" (newValue)=\"setHue($event)\" [value]=\"hslaText.h\" />\n                  <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"100\" [rg]=\"100\" (newValue)=\"setSaturation($event)\" [value]=\"hslaText.s\" />\n                  <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"100\" [rg]=\"100\" (newValue)=\"setLightness($event)\" [value]=\"hslaText.l\" />\n                  <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]+([\\.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\" [rg]=\"1\" (newValue)=\"setAlpha($event)\" [value]=\"hslaText.a\" />\n                </div>\n                <div [hidden]=\"format!=1\" class=\"rgba-text\">\n                  <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setR($event)\" [value]=\"rgbaText.r\" />\n                  <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setG($event)\" [value]=\"rgbaText.g\" />\n                  <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setB($event)\" [value]=\"rgbaText.b\" />\n                  <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]+([\\.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\" [rg]=\"1\" (newValue)=\"setAlpha($event)\" [value]=\"rgbaText.a\" />\n                </div>\n                <div [hidden]=\"format!=0\" class=\"hex-text\">\n                  <input [text] (newValue)=\"setColorFromString($event)\" [style.color]=\"fontColor\" [value]=\"hexText\" />\n                </div>\n              </div>\n              <div class=\"color-bar\" [class.dark]=\"_isDark\">\n                <div [style.color]=\"fontColor\" class=\"clearfix\">\n                  <div class=\"type-policy\" [class.active]=\"format==0\" (click)=\"formatPolicy(0)\">HEX</div>\n                  <div class=\"type-policy\" [class.active]=\"format==1\" (click)=\"formatPolicy(1)\">RGBA</div>\n                  <div class=\"type-policy\" [class.active]=\"format==2\" (click)=\"formatPolicy(2)\">HSLA</div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"input-color-content\">\n            <div [colorpicker-slider] [style.background-color]=\"_hueSliderColor\" [point-x]=\"1\" [point-y]=\"1\" (change)=\"setSaturationAndBrightness($event)\" class=\"saturation-lightness\">\n              <div [style.left.px]=\"slider.s\" [style.top.px]=\"slider.v\" class=\"cursor\"></div>\n            </div>\n            <div [colorpicker-slider] [point-x]=\"1\" (change)=\"setHue($event)\" class=\"hue\">\n              <div [style.left.px]=\"slider.h\" class=\"color-picker-marker\"></div>\n            </div>\n            <div [colorpicker-slider] [point-x]=\"1\" (change)=\"setAlpha($event)\" class=\"alpha\">\n              <div class=\"alpha-main\" [ngStyle]=\"setGradient\">\n                <div [style.left.px]=\"slider.a\" class=\"color-picker-marker\"></div>\n              </div>\n\n            </div>\n          </div>\n          <div class=\"md2-color-picker-actions\">\n            <div class=\"md2-button\" (click)=\"cancelColor()\">Cancel</div>\n            <div class=\"md2-button\" (click)=\"clickOk()\">Ok</div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-template>\n",
                    host: {
                        'role': 'colorpicker',
                        '[id]': 'id',
                        '[class.md2-colorpicker-disabled]': 'disabled',
                        '[attr.aria-label]': 'placeholder',
                        '[attr.aria-required]': 'required.toString()',
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: [".md2-colorpicker-wrapper{border-radius:3px;background-color:#fff;z-index:10;box-shadow:0 2px 6px rgba(0,0,0,.4);overflow:hidden}.md2-colorpicker-panel{outline:0;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.md2-colorpicker-panel[container=dialog]{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.md2-colorpicker-disabled{pointer-events:none;cursor:default}.md2-colorpicker-disabled .color-picker-selector .md2-colorpicker-value{color:rgba(0,0,0,.38);border-color:transparent;background-image:linear-gradient(to right,rgba(0,0,0,.38) 0,rgba(0,0,0,.38) 33%,transparent 0);background-position:bottom -1px left 0;background-size:4px 1px;background-repeat:repeat-x}.md2-colorpicker-input{color:rgba(0,0,0,.38);border-bottom:1px solid rgba(0,0,0,.12);display:flex;justify-content:space-between;align-items:center;height:30px;min-width:180px;line-height:22px;position:relative;box-sizing:border-box}[aria-disabled=true] .md2-colorpicker-input{background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;border-color:transparent;background-position:0 bottom;cursor:default}md2-colorpicker:focus:not(.md2-colorpicker-disabled) .md2-colorpicker-input{color:#106cc8;border-color:#106cc8}md2-colorpicker.ng-invalid.ng-touched:not(.md2-colorpicker-disabled) .md2-colorpicker-input{color:#f44336;border-color:#f44336}.input-focused{color:#106cc8;border-color:#106cc8}.inline-control{width:150px;margin-right:16px;padding:16px 0}.md2-colorpicker-placeholder{position:absolute;right:18px;bottom:100%;left:0;padding:0 2px;-webkit-transform:translate3d(0,26px,0) scale(1);transform:translate3d(0,26px,0) scale(1);-webkit-transform-origin:left top;transform-origin:left top;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;transition:150ms cubic-bezier(.25,.8,.25,1)}[aria-required=true] .md2-colorpicker-placeholder::after{content:'*'}.md2-colorpicker-input.input-focused .md2-colorpicker-placeholder{color:#106cc8}.md2-colorpicker-input.input-focused .md2-colorpicker-placeholder,md2-colorpicker .md2-colorpicker-placeholder.has-value{-webkit-transform:translate3d(0,6px,0) scale(.75);transform:translate3d(0,6px,0) scale(.75)}.color-error .md2-colorpicker-input,.color-error .md2-colorpicker-placeholder{color:#f44336!important;border-color:#f44336}.color-error .color-fill{background-color:transparent!important}.color-picker-selector{display:block;padding:18px 0 4px 46px;white-space:nowrap}.color-picker-selector .md2-colorpicker-preview{position:absolute;top:19px;left:6px;content:'';width:24px;height:24px;overflow:hidden;background-color:#fff;background:linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd),linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd);background-size:8px 8px;background-position:0 0,4px 4px;border:2px solid #fafafa;display:block;fill:#5a5a5a;cursor:pointer;border-radius:50%;vertical-align:middle;box-shadow:0 1px 1px 0 rgba(0,0,0,.2),0 1px 1px 1px rgba(0,0,0,.14),0 1px 1px 1px rgba(0,0,0,.12)}.color-picker-selector .md2-colorpicker-preview .color-fill{width:100%;height:100%}.color-picker-selector .md2-colorpicker-value{font-size:15px;background:0 0;border:0;outline:0;position:relative;display:block;min-width:160px;height:30px;padding:2px 2px 1px;margin:0;line-height:26px;color:rgba(0,0,0,.87);vertical-align:middle;box-sizing:border-box}md2-colorpicker{position:relative;display:block;outline:0}.md2-color-picker{position:relative;display:block;width:266px;outline:0}.md2-color-picker *{box-sizing:border-box}.md2-color-picker .input-color-content{position:relative;padding:8px}.md2-color-picker i{cursor:default;position:relative}.md2-color-picker input{font-size:16px;height:50px;outline:0}.md2-color-picker div.cursor-sv{cursor:default;position:relative;border-radius:50%;width:15px;height:15px;border:1px solid #ddd}.md2-color-picker div.cursor{cursor:crosshair;position:relative;border-radius:50%;width:13px;height:13px;box-shadow:0 0 2px 0 rgba(0,0,0,.5),inset 0 0 2px 0 rgba(0,0,0,.5);border:2px solid #fff}.md2-color-picker div.color-picker-marker{cursor:crosshair;position:relative;border:2px solid #fff;box-shadow:0 0 2px 0 rgba(0,0,0,.5);height:100%;width:5px;border-bottom:0;border-top:0}.md2-color-picker .saturation-lightness{width:100%;height:130px;border-radius:2px;overflow:hidden;background-image:linear-gradient(to top,#000,rgba(0,0,0,0)),linear-gradient(to right,#fff,rgba(255,255,255,0))}.md2-color-picker .saturation-lightness:hover{cursor:crosshair}.md2-color-picker .hue{position:relative;width:100%;height:30px;margin:8px 0;border-radius:2px;background:linear-gradient(to right,red,#ff0,#0f0,#0ff,#00f,#f0f,red)}.md2-color-picker .alpha{position:relative;width:100%;height:30px;border-radius:2px;background:linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd),linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd);background-size:8px 8px;background-position:0 0,4px 4px}.md2-color-picker .alpha .alpha-main{position:absolute;height:100%;opacity:1;background-image:linear-gradient(to left,transparent,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));width:100%}.md2-color-picker .selected-color{position:relative;width:100%;height:75px;background-color:#fff;background:linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd),linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd);background-size:8px 8px;background-position:0 0,4px 4px}.md2-color-picker .selected-color .selected-color-bg{position:absolute;height:100%;opacity:1;width:100%}.md2-color-picker .selected-color .color-bar{position:absolute;width:100%;bottom:0}.md2-color-picker .selected-color .color-input{position:relative}.color-clear{color:rgba(0,0,0,.4);cursor:pointer}.color-clear svg{vertical-align:bottom;fill:#686868}.clearfix::after,.clearfix::before{content:' ';display:table}.clearfix::after{clear:both}.hex-text{width:100%}.hex-text input{width:100%;border:0;padding:4px;text-align:center;background:0 0}.hex-text div{text-align:center;float:left;clear:left;width:160px;margin-top:4px}.hsla-text,.rgba-text{text-align:center}.hsla-text input,.rgba-text input{width:50px;border:0;padding:4px 0;background:0 0;text-align:center}.hsla-text div,.rgba-text div{text-align:center;display:block}.hsla-text label,.rgba-text label{text-align:center;display:inline-block;font-size:15px}.md2-color-picker-actions{text-align:right}.md2-color-picker-actions .md2-button{display:inline-block;min-width:64px;margin:4px 8px 8px 0;padding:0 12px;font-size:14px;color:#106cc8;line-height:36px;text-align:center;text-transform:uppercase;border-radius:2px;cursor:pointer;box-sizing:border-box;transition:450ms cubic-bezier(.23,1,.32,1)}.md2-color-picker-actions .md2-button:hover{background:#ebebeb}.hsla-text div:nth-child(5),.rgba-text div:nth-child(5){clear:left}.type-policy{width:33.333333%;text-align:center;font-size:14px;display:inline-block;float:left;padding:4px 8px 3px;border-bottom:2px solid transparent;cursor:pointer;background:rgba(255,255,255,.25)}.dark .type-policy{background:rgba(0,0,0,.25)}.type-policy.active{border-color:rgba(255,255,255,.5);background:0 0}.dark .type-policy.active{border-color:rgba(0,0,0,.5)}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.6)}"]
                }] }
    ];
    /** @nocollapse */
    Md2Colorpicker.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Overlay },
        { type: ViewContainerRef },
        { type: Renderer },
        { type: ColorUtil },
        { type: NgControl, decorators: [{ type: Self }, { type: Optional }] }
    ]; };
    Md2Colorpicker.propDecorators = {
        color: [{ type: Input }],
        placeholder: [{ type: Input }],
        required: [{ type: Input }],
        disabled: [{ type: Input }],
        cFormat: [{ type: Input, args: ['format',] }],
        colorpickerChange: [{ type: Output, args: ['colorpickerChange',] }],
        change: [{ type: Output }],
        tabindex: [{ type: Input }],
        id: [{ type: Input }],
        container: [{ type: Input }],
        onOpen: [{ type: Output }],
        onClose: [{ type: Output }],
        _templatePortal: [{ type: ViewChild, args: ['portal',] }]
    };
    return Md2Colorpicker;
}());
export { Md2Colorpicker };
if (false) {
    /** @type {?} */
    Md2Colorpicker.prototype._portal;
    /** @type {?} */
    Md2Colorpicker.prototype._overlayRef;
    /** @type {?} */
    Md2Colorpicker.prototype._backdropSubscription;
    /** @type {?} */
    Md2Colorpicker.prototype._positionSubscription;
    /** @type {?} */
    Md2Colorpicker.prototype._innerValue;
    /** @type {?} */
    Md2Colorpicker.prototype._isColorpickerVisible;
    /** @type {?} */
    Md2Colorpicker.prototype._hueSliderColor;
    /** @type {?} */
    Md2Colorpicker.prototype.slider;
    /** @type {?} */
    Md2Colorpicker.prototype.sliderDim;
    /** @type {?} */
    Md2Colorpicker.prototype.hsva;
    /** @type {?} */
    Md2Colorpicker.prototype.rgbaText;
    /** @type {?} */
    Md2Colorpicker.prototype.hslaText;
    /** @type {?} */
    Md2Colorpicker.prototype.outputColor;
    /** @type {?} */
    Md2Colorpicker.prototype.alphaColor;
    /** @type {?} */
    Md2Colorpicker.prototype.hexText;
    /** @type {?} */
    Md2Colorpicker.prototype.format;
    /** @type {?} */
    Md2Colorpicker.prototype.backColor;
    /** @type {?} */
    Md2Colorpicker.prototype._created;
    /** @type {?} */
    Md2Colorpicker.prototype._defalutColor;
    /** @type {?} */
    Md2Colorpicker.prototype._initialColor;
    /**
     * Whether or not the overlay panel is open.
     * @type {?}
     */
    Md2Colorpicker.prototype._panelOpen;
    /** @type {?} */
    Md2Colorpicker.prototype._color;
    /**
     * Whether filling out the select is required in the form.
     * @type {?}
     */
    Md2Colorpicker.prototype._required;
    /**
     * Whether the select is disabled.
     * @type {?}
     */
    Md2Colorpicker.prototype._disabled;
    /** @type {?} */
    Md2Colorpicker.prototype.isInputFocus;
    /**
     * The placeholder displayed in the trigger of the select.
     * @type {?}
     */
    Md2Colorpicker.prototype._placeholder;
    /** @type {?} */
    Md2Colorpicker.prototype._container;
    /** @type {?} */
    Md2Colorpicker.prototype.fontColor;
    /** @type {?} */
    Md2Colorpicker.prototype._isDark;
    /** @type {?} */
    Md2Colorpicker.prototype.isInputValidColor;
    /** @type {?} */
    Md2Colorpicker.prototype._onChange;
    /** @type {?} */
    Md2Colorpicker.prototype._onTouched;
    /** @type {?} */
    Md2Colorpicker.prototype.cFormat;
    /** @type {?} */
    Md2Colorpicker.prototype.colorpickerChange;
    /**
     * Event emitted when the selected date has been changed by the user.
     * @type {?}
     */
    Md2Colorpicker.prototype.change;
    /** @type {?} */
    Md2Colorpicker.prototype.tabindex;
    /** @type {?} */
    Md2Colorpicker.prototype.id;
    /**
     * Event emitted when the select has been opened.
     * @type {?}
     */
    Md2Colorpicker.prototype.onOpen;
    /**
     * Event emitted when the select has been closed.
     * @type {?}
     */
    Md2Colorpicker.prototype.onClose;
    /** @type {?} */
    Md2Colorpicker.prototype._templatePortal;
    /** @type {?} */
    Md2Colorpicker.prototype._element;
    /** @type {?} */
    Md2Colorpicker.prototype._overlay;
    /** @type {?} */
    Md2Colorpicker.prototype._viewContainerRef;
    /** @type {?} */
    Md2Colorpicker.prototype._renderer;
    /** @type {?} */
    Md2Colorpicker.prototype._util;
    /** @type {?} */
    Md2Colorpicker.prototype._control;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JwaWNrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb2xvcnBpY2tlci9jb2xvcnBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBQ1YsaUJBQWlCLEVBQ2pCLFNBQVMsRUFFVCxRQUFRLEVBQ1IsUUFBUSxFQUNSLElBQUksRUFDSixXQUFXLEVBQ1gsU0FBUyxFQUNULGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUwsU0FBUyxFQUNWLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDMUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRWxELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUU3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUzRCxJQUFBO0lBQ0Usd0JBQW1CLENBQVMsRUFBUyxDQUFTLEVBQVMsQ0FBUyxFQUFTLENBQVM7UUFBL0QsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUFTLE1BQUMsR0FBRCxDQUFDLENBQVE7UUFBUyxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQVMsTUFBQyxHQUFELENBQUMsQ0FBUTtLQUFLO3lCQTlCekY7SUErQkMsQ0FBQTtBQUZELDBCQUVDOzs7Ozs7Ozs7OztBQUNELElBQUE7SUFDRSx5QkFBbUIsQ0FBUyxFQUFTLENBQVMsRUFBUyxDQUFTLEVBQVMsQ0FBUztRQUEvRCxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQVMsTUFBQyxHQUFELENB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QixJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDMUM7UUFDRCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM5QixJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDMUM7OztnQkFuZEosU0FBUyxTQUFDO29CQUVULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLHVrS0FBK0I7b0JBRS9CLElBQUksRUFBRTt3QkFDSixNQUFNLEVBQUUsYUFBYTt3QkFDckIsTUFBTSxFQUFFLElBQUk7d0JBQ1osa0NBQWtDLEVBQUUsVUFBVTt3QkFDOUMsbUJBQW1CLEVBQUUsYUFBYTt3QkFDbEMsc0JBQXNCLEVBQUUscUJBQXFCO3FCQUM5QztvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3RDOzs7O2dCQWxMQyxVQUFVO2dCQWdCSCxPQUFPO2dCQVBkLGdCQUFnQjtnQkFKaEIsUUFBUTtnQkFpQkQsU0FBUztnQkFUaEIsU0FBUyx1QkEwUm9CLElBQUksWUFBSSxRQUFROzs7d0JBckU1QyxLQUFLOzhCQUtMLEtBQUs7MkJBSUwsS0FBSzsyQkFLTCxLQUFLOzBCQUtMLEtBQUssU0FBQyxRQUFRO29DQUNkLE1BQU0sU0FBQyxtQkFBbUI7eUJBRTFCLE1BQU07MkJBQ04sS0FBSztxQkFDTCxLQUFLOzRCQWtCTCxLQUFLO3lCQWtCTCxNQUFNOzBCQUdOLE1BQU07a0NBRU4sU0FBUyxTQUFDLFFBQVE7O3lCQXhTckI7O1NBd0xhLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgRWxlbWVudFJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIERpcmVjdGl2ZSxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgUmVuZGVyZXIsXG4gIFNlbGYsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgTmdDb250cm9sXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJy4uL2NvcmUvY29lcmNpb24vYm9vbGVhbi1wcm9wZXJ0eSc7XG5pbXBvcnQgeyBPdmVybGF5IH0gZnJvbSAnLi4vY29yZS9vdmVybGF5L292ZXJsYXknO1xuaW1wb3J0IHsgT3ZlcmxheVJlZiB9IGZyb20gJy4uL2NvcmUvb3ZlcmxheS9vdmVybGF5LXJlZic7XG5pbXBvcnQgeyBPdmVybGF5U3RhdGUgfSBmcm9tICcuLi9jb3JlL292ZXJsYXkvb3ZlcmxheS1zdGF0ZSc7XG5pbXBvcnQgeyBQb3NpdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi4vY29yZS9vdmVybGF5L3Bvc2l0aW9uL3Bvc2l0aW9uLXN0cmF0ZWd5JztcbmltcG9ydCB7IFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnLi4vY29yZS9wb3J0YWwvcG9ydGFsJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29sb3JVdGlsLCBSZ2JhLCBIc2xhLCBIc3ZhIH0gZnJvbSAnLi9jb2xvci11dGlsJztcblxuZXhwb3J0IGNsYXNzIFNsaWRlclBvc2l0aW9uIHtcbiAgY29uc3RydWN0b3IocHVibGljIGg6IG51bWJlciwgcHVibGljIHM6IG51bWJlciwgcHVibGljIHY6IG51bWJlciwgcHVibGljIGE6IG51bWJlcikgeyB9XG59XG5leHBvcnQgY2xhc3MgU2xpZGVyRGltZW5zaW9uIHtcbiAgY29uc3RydWN0b3IocHVibGljIGg6IG51bWJlciwgcHVibGljIHM6IG51bWJlciwgcHVibGljIHY6IG51bWJlciwgcHVibGljIGE6IG51bWJlcikgeyB9XG59XG5cbmV4cG9ydCB0eXBlIENvbnRhaW5lciA9ICdpbmxpbmUnIHwgJ2RpYWxvZyc7XG5cbmxldCBuZXh0SWQgPSAwO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdGV4dF0nLFxuICBob3N0OiB7XG4gICAgJyhpbnB1dCknOiAnY2hhbmdlSW5wdXQoJGV2ZW50KSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0RGlyZWN0aXZlIHtcbiAgQE91dHB1dCgnbmV3VmFsdWUnKSBuZXdWYWx1ZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBASW5wdXQoJ3RleHQnKSB0ZXh0OiBhbnk7XG4gIEBJbnB1dCgncmcnKSByZzogbnVtYmVyO1xuICBjaGFuZ2VJbnB1dChldmVudDogYW55KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgaWYgKHRoaXMucmcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5uZXdWYWx1ZS5lbWl0KHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG51bWVyaWMgPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgIGlmICghaXNOYU4obnVtZXJpYykgJiYgbnVtZXJpYyA+PSAwICYmIG51bWVyaWMgPD0gdGhpcy5yZykge1xuICAgICAgICB0aGlzLm5ld1ZhbHVlLmVtaXQoeyB2OiBudW1lcmljLCByZzogdGhpcy5yZyB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NvbG9ycGlja2VyLXNsaWRlcl0nLFxuICBob3N0OiB7XG4gICAgJyhtb3VzZWRvd24pJzogJ3N0YXJ0KCRldmVudCknLFxuICAgICcodG91Y2hzdGFydCknOiAnc3RhcnQoJGV2ZW50KSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBDb2xvcnBpY2tlclNsaWRlckRpcmVjdGl2ZSB7XG4gIEBJbnB1dCgnY29sb3JwaWNrZXItc2xpZGVyJykgc2xpZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgncG9pbnQteCcpIHBvaW50WDogbnVtYmVyO1xuICBASW5wdXQoJ3BvaW50LXknKSBwb2ludFk6IG51bWJlcjtcbiAgQE91dHB1dCgnY2hhbmdlJykgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHByaXZhdGUgbGlzdGVuZXJNb3ZlOiBhbnk7XG4gIHByaXZhdGUgbGlzdGVuZXJTdG9wOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHRoaXMubGlzdGVuZXJNb3ZlID0gKGV2ZW50OiBhbnkpID0+IHsgdGhpcy5tb3ZlKGV2ZW50KTsgfTtcbiAgICB0aGlzLmxpc3RlbmVyU3RvcCA9ICgpID0+IHsgdGhpcy5zdG9wKCk7IH07XG4gIH1cblxuICAvKipcbiAgICogc2V0IGN1cnNvciBwb3NpdGlvblxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIHNldEN1cnNvcihldmVudDogYW55KSB7XG4gICAgbGV0IGhlaWdodCA9IHRoaXMuX2dldE5hdGl2ZUVsZW1lbnQoKS5vZmZzZXRIZWlnaHQ7XG4gICAgbGV0IHdpZHRoID0gdGhpcy5fZ2V0TmF0aXZlRWxlbWVudCgpLm9mZnNldFdpZHRoO1xuICAgIGxldCB4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy5nZXRYKGV2ZW50KSwgd2lkdGgpKTtcbiAgICBsZXQgeSA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMuZ2V0WShldmVudCksIGhlaWdodCkpO1xuXG4gICAgaWYgKHRoaXMucG9pbnRYICE9PSB1bmRlZmluZWQgJiYgdGhpcy5wb2ludFkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh7XG4gICAgICAgIHM6IHggLyB3aWR0aCwgdjogKDEgLSB5IC8gaGVpZ2h0KSxcbiAgICAgICAgcG9pbnRYOiB0aGlzLnBvaW50WCwgcG9pbnRZOiB0aGlzLnBvaW50WVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBvaW50WCA9PT0gdW5kZWZpbmVkICYmIHRoaXMucG9pbnRZICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQoeyB2OiB5IC8gaGVpZ2h0LCByZzogdGhpcy5wb2ludFkgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQoeyB2OiB4IC8gd2lkdGgsIHJnOiB0aGlzLnBvaW50WCB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaW5wdXQgZXZlbnQgbGlzdG5lclxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIG1vdmUoZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZXRDdXJzb3IoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIGlucHV0IGV2ZW50IGxpc3RuZXJcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBzdGFydChldmVudDogYW55KSB7XG4gICAgdGhpcy5zZXRDdXJzb3IoZXZlbnQpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubGlzdGVuZXJNb3ZlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmxpc3RlbmVyTW92ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubGlzdGVuZXJTdG9wKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMubGlzdGVuZXJTdG9wKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdG9wIG1vdXNlIGV2ZW50XG4gICAqL1xuICBzdG9wKCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubGlzdGVuZXJNb3ZlKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmxpc3RlbmVyTW92ZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubGlzdGVuZXJTdG9wKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMubGlzdGVuZXJTdG9wKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgeFxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIGdldFgoZXZlbnQ6IGFueSkge1xuICAgIGxldCBib3VuZGluZ0NsaWVudFJlY3QgPSB0aGlzLl9nZXROYXRpdmVFbGVtZW50KCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIChldmVudC5wYWdlWCAhPT0gdW5kZWZpbmVkID8gZXZlbnQucGFnZVggOiBldmVudC50b3VjaGVzWzBdLnBhZ2VYKSAtXG4gICAgICBib3VuZGluZ0NsaWVudFJlY3QubGVmdCAtIHdpbmRvdy5wYWdlWE9mZnNldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgeVxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIGdldFkoZXZlbnQ6IGFueSkge1xuICAgIGxldCBib3VuZGluZ0NsaWVudFJlY3QgPSB0aGlzLl9nZXROYXRpdmVFbGVtZW50KCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIChldmVudC5wYWdlWSAhPT0gdW5kZWZpbmVkID8gZXZlbnQucGFnZVkgOiBldmVudC50b3VjaGVzWzBdLnBhZ2VZKSAtXG4gICAgICBib3VuZGluZ0NsaWVudFJlY3QudG9wIC0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICB9XG5cbiAgX2dldE5hdGl2ZUVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuLyoqXG4gKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgTWQyQ29sb3JwaWNrZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBNZDJDb2xvckNoYW5nZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1kMkNvbG9ycGlja2VyLCBwdWJsaWMgY29sb3I6IHN0cmluZykgeyB9XG59XG5cbkBDb21wb25lbnQoe1xuICBcbiAgc2VsZWN0b3I6ICdtZDItY29sb3JwaWNrZXInLFxuICB0ZW1wbGF0ZVVybDogJ2NvbG9ycGlja2VyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY29sb3JwaWNrZXIuc2NzcyddLFxuICBob3N0OiB7XG4gICAgJ3JvbGUnOiAnY29sb3JwaWNrZXInLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW2NsYXNzLm1kMi1jb2xvcnBpY2tlci1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsXSc6ICdwbGFjZWhvbGRlcicsXG4gICAgJ1thdHRyLmFyaWEtcmVxdWlyZWRdJzogJ3JlcXVpcmVkLnRvU3RyaW5nKCknLFxuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1kMkNvbG9ycGlja2VyIGltcGxlbWVudHMgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgcHJpdmF0ZSBfcG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDtcbiAgcHJpdmF0ZSBfb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcbiAgcHJpdmF0ZSBfYmFja2Ryb3BTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfcG9zaXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBfaW5uZXJWYWx1ZTogc3RyaW5nID0gJyc7XG4gIF9pc0NvbG9ycGlja2VyVmlzaWJsZTogYm9vbGVhbjtcbiAgX2h1ZVNsaWRlckNvbG9yOiBzdHJpbmc7XG4gIHNsaWRlcjogU2xpZGVyUG9zaXRpb247XG4gIHNsaWRlckRpbTogU2xpZGVyRGltZW5zaW9uO1xuICBoc3ZhOiBIc3ZhO1xuICByZ2JhVGV4dDogUmdiYTtcbiAgaHNsYVRleHQ6IEhzbGE7XG4gIG91dHB1dENvbG9yOiBzdHJpbmc7XG4gIGFscGhhQ29sb3I6IHN0cmluZztcbiAgaGV4VGV4dDogc3RyaW5nO1xuICBmb3JtYXQ6IG51bWJlcjtcbiAgYmFja0NvbG9yOiBib29sZWFuID0gdHJ1ZTtcblxuICBwcml2YXRlIF9jcmVhdGVkOiBib29sZWFuO1xuICBwcml2YXRlIF9kZWZhbHV0Q29sb3I6IHN0cmluZyA9ICcjMDAwMDAwJztcbiAgcHJpdmF0ZSBfaW5pdGlhbENvbG9yOiBzdHJpbmc7XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoZSBvdmVybGF5IHBhbmVsIGlzIG9wZW4uICovXG4gIHByaXZhdGUgX3BhbmVsT3BlbiA9IGZhbHNlO1xuICBwcml2YXRlIF9jb2xvcjogc3RyaW5nID0gbnVsbDtcblxuICAvKiogV2hldGhlciBmaWxsaW5nIG91dCB0aGUgc2VsZWN0IGlzIHJlcXVpcmVkIGluIHRoZSBmb3JtLiAgKi9cbiAgX3JlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNlbGVjdCBpcyBkaXNhYmxlZC4gICovXG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGlzSW5wdXRGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgcGxhY2Vob2xkZXIgZGlzcGxheWVkIGluIHRoZSB0cmlnZ2VyIG9mIHRoZSBzZWxlY3QuICovXG4gIHByaXZhdGUgX3BsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHByaXZhdGUgX2NvbnRhaW5lcjogQ29udGFpbmVyID0gJ2lubGluZSc7XG5cbiAgZm9udENvbG9yOiBzdHJpbmc7XG4gIF9pc0Rhcms6IGJvb2xlYW47XG4gIGlzSW5wdXRWYWxpZENvbG9yOiBib29sZWFuID0gZmFsc2U7XG5cbiAgX29uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHsgfTtcbiAgX29uVG91Y2hlZCA9ICgpID0+IHsgfTtcblxuICBASW5wdXQoKVxuICBnZXQgY29sb3IoKSB7IHJldHVybiB0aGlzLl9jb2xvcjsgfVxuICBzZXQgY29sb3IodmFsdWU6IHN0cmluZykgeyB0aGlzLl9jb2xvciA9IHZhbHVlOyB9XG5cbiAgLyoqIFBsYWNlaG9sZGVyIHRvIGJlIHNob3duIGlmIG5vIHZhbHVlIGhhcyBiZWVuIHNlbGVjdGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgcGxhY2Vob2xkZXIoKSB7IHJldHVybiB0aGlzLl9wbGFjZWhvbGRlcjsgfVxuICBzZXQgcGxhY2Vob2xkZXIodmFsdWU6IHN0cmluZykgeyB0aGlzLl9wbGFjZWhvbGRlciA9IHZhbHVlOyB9XG5cbiAgQElucHV0KClcbiAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7IH1cbiAgc2V0IHJlcXVpcmVkKHZhbHVlKSB7IHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBjb21wb25lbnQgaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIEBJbnB1dCgnZm9ybWF0JykgY0Zvcm1hdDogc3RyaW5nID0gJ2hleCc7XG4gIEBPdXRwdXQoJ2NvbG9ycGlja2VyQ2hhbmdlJykgY29sb3JwaWNrZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0ZWQgZGF0ZSBoYXMgYmVlbiBjaGFuZ2VkIGJ5IHRoZSB1c2VyLiAqL1xuICBAT3V0cHV0KCkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWQyQ29sb3JDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNZDJDb2xvckNoYW5nZT4oKTtcbiAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSAnbWQyLWNvbG9ycGlja2VyLScgKyAoKytuZXh0SWQpO1xuXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9pbm5lclZhbHVlO1xuXG4gIH1cbiAgLyoqXG4gICogc2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICAqL1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuX2lubmVyVmFsdWUpIHtcbiAgICAgIGlmICh2KSB7XG4gICAgICAgIHRoaXMuaHN2YSA9IHRoaXMuX3V0aWwuc3RyaW5nVG9Ic3ZhKHYpO1xuICAgICAgfVxuICAgICAgdGhpcy5faW5uZXJWYWx1ZSA9IHY7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IGNvbnRhaW5lcigpIHsgcmV0dXJuIHRoaXMuX2NvbnRhaW5lcjsgfVxuICBzZXQgY29udGFpbmVyKHZhbHVlOiBDb250YWluZXIpIHtcbiAgICBpZiAodGhpcy5fY29udGFpbmVyICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fY29udGFpbmVyID0gdmFsdWUgfHwgJ2lubGluZSc7XG4gICAgICB0aGlzLmRlc3Ryb3lQYW5lbCgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzZXRHcmFkaWVudCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2JhY2tncm91bmQtaW1hZ2UnOiAnbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCB0cmFuc3BhcmVudCwgdHJhbnNwYXJlbnQpLCcgK1xuICAgICAgJ2xpbmVhci1ncmFkaWVudCh0byBsZWZ0LCAnICsgdGhpcy5oZXhUZXh0ICsgJywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwKSknXG4gICAgfTtcblxuICB9XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IGhhcyBiZWVuIG9wZW5lZC4gKi9cbiAgQE91dHB1dCgpIG9uT3BlbjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCBoYXMgYmVlbiBjbG9zZWQuICovXG4gIEBPdXRwdXQoKSBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgQFZpZXdDaGlsZCgncG9ydGFsJykgX3RlbXBsYXRlUG9ydGFsOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyLFxuICAgIHByaXZhdGUgX3V0aWw6IENvbG9yVXRpbCwgQFNlbGYoKSBAT3B0aW9uYWwoKSBwdWJsaWMgX2NvbnRyb2w6IE5nQ29udHJvbCkge1xuICAgIHRoaXMuX2NyZWF0ZWQgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5fY29udHJvbCkge1xuICAgICAgdGhpcy5fY29udHJvbC52YWx1ZUFjY2Vzc29yID0gdGhpcztcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHsgdGhpcy5kZXN0cm95UGFuZWwoKTsgfVxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGUgb3ZlcmxheSBwYW5lbCBpcyBvcGVuLiAqL1xuICBnZXQgcGFuZWxPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9wYW5lbE9wZW47XG4gIH1cblxuICAvKiogVG9nZ2xlcyB0aGUgb3ZlcmxheSBwYW5lbCBvcGVuIG9yIGNsb3NlZC4gKi9cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMucGFuZWxPcGVuID8gdGhpcy5jbG9zZSgpIDogdGhpcy5vcGVuKCk7XG4gIH1cblxuICAvKiogT3BlbnMgdGhlIG92ZXJsYXkgcGFuZWwuICovXG4gIG9wZW4oKTogdm9pZCB7XG4gICAgbGV0IGhzdmEgPSB0aGlzLl91dGlsLnN0cmluZ1RvSHN2YSh0aGlzLmNvbG9yICsgJycpO1xuICAgIHRoaXMuaXNJbnB1dEZvY3VzID0gdHJ1ZTtcbiAgICBpZiAoaHN2YSkge1xuICAgICAgdGhpcy5oc3ZhID0gaHN2YTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oc3ZhID0gdGhpcy5fdXRpbC5zdHJpbmdUb0hzdmEodGhpcy5fZGVmYWx1dENvbG9yKTtcbiAgICB9XG5cbiAgICB0aGlzLnNsaWRlckRpbSA9IG5ldyBTbGlkZXJEaW1lbnNpb24oMjQ1LCAyNTAsIDEzMCwgMjQ1KTtcbiAgICB0aGlzLnNsaWRlciA9IG5ldyBTbGlkZXJQb3NpdGlvbigwLCAwLCAwLCAwKTtcbiAgICBpZiAodGhpcy5jRm9ybWF0ID09PSAncmdiJykge1xuICAgICAgdGhpcy5mb3JtYXQgPSAxO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jRm9ybWF0ID09PSAnaHNsJykge1xuICAgICAgdGhpcy5mb3JtYXQgPSAyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZvcm1hdCA9IDA7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGUoKTtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cbiAgICBpZiAoIXRoaXMuX2lzQ29sb3JwaWNrZXJWaXNpYmxlKSB7XG4gICAgICB0aGlzLl9pbml0aWFsQ29sb3IgPSB0aGlzLmNvbG9yO1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIHRoaXMuX2lzQ29sb3JwaWNrZXJWaXNpYmxlID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faXNDb2xvcnBpY2tlclZpc2libGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLl9jcmVhdGVPdmVybGF5KCk7XG5cbiAgICBpZiAoIXRoaXMuX3BvcnRhbCkge1xuICAgICAgdGhpcy5fcG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuX3RlbXBsYXRlUG9ydGFsLCB0aGlzLl92aWV3Q29udGFpbmVyUmVmKTtcbiAgICB9XG5cbiAgICB0aGlzLl9vdmVybGF5UmVmLmF0dGFjaCh0aGlzLl9wb3J0YWwpO1xuICAgIHRoaXMuX3N1YnNjcmliZVRvQmFja2Ryb3AoKTtcbiAgICB0aGlzLl9wYW5lbE9wZW4gPSB0cnVlO1xuICAgIHRoaXMub25PcGVuLmVtaXQoKTtcbiAgfVxuXG4gIC8qKiBDbG9zZXMgdGhlIG92ZXJsYXkgcGFuZWwgYW5kIGZvY3VzZXMgdGhlIGhvc3QgZWxlbWVudC4gKi9cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fcGFuZWxPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5pc0lucHV0Rm9jdXMgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgIHRoaXMuX2JhY2tkcm9wU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHRoaXMuX2lzQ29sb3JwaWNrZXJWaXNpYmxlID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuX2lubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0Q29sb3JGcm9tU3RyaW5nKHRoaXMuX2lubmVyVmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBSZW1vdmVzIHRoZSBwYW5lbCBmcm9tIHRoZSBET00uICovXG4gIGRlc3Ryb3lQYW5lbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmID0gbnVsbDtcblxuICAgICAgdGhpcy5fY2xlYW5VcFN1YnNjcmlwdGlvbnMoKTtcbiAgICB9XG4gIH1cblxuICBfb25CbHVyKCkge1xuICAgIGlmICghdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICAqIGlucHV0IGV2ZW50IGxpc3RuZXJcbiAgICAqIEBwYXJhbSBldmVudFxuICAgICovXG4gIGNoYW5nZUlucHV0KGV2ZW50OiBhbnkpIHtcbiAgICBsZXQgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5jb2xvcnBpY2tlckNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAqIHNldCBzYXR1cmF0aW9uLGxpZ2h0bmVzcyxodWUsYWxwaGEsUkdCIHZhbHVlXG4gICogQHBhcmFtIHZhbFxuICAqIEBwYXJhbSByZ1xuICAqL1xuICBzZXRTYXR1cmF0aW9uKHZhbDogeyB2OiBudW1iZXIsIHJnOiBudW1iZXIgfSkge1xuICAgIGxldCBoc2xhID0gdGhpcy5fdXRpbC5oc3ZhMmhzbGEodGhpcy5oc3ZhKTtcbiAgICBoc2xhLnMgPSB2YWwudiAvIHZhbC5yZztcbiAgICB0aGlzLmhzdmEgPSB0aGlzLl91dGlsLmhzbGEyaHN2YShoc2xhKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgc2V0TGlnaHRuZXNzKHZhbDogeyB2OiBudW1iZXIsIHJnOiBudW1iZXIgfSkge1xuICAgIGxldCBoc2xhID0gdGhpcy5fdXRpbC5oc3ZhMmhzbGEodGhpcy5oc3ZhKTtcbiAgICBoc2xhLmwgPSB2YWwudiAvIHZhbC5yZztcbiAgICB0aGlzLmhzdmEgPSB0aGlzLl91dGlsLmhzbGEyaHN2YShoc2xhKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgc2V0SHVlKHZhbDogeyB2OiBudW1iZXIsIHJnOiBudW1iZXIgfSkge1xuICAgIHRoaXMuaHN2YS5oID0gdmFsLnYgLyB2YWwucmc7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHNldEFscGhhKHZhbDogeyB2OiBudW1iZXIsIHJnOiBudW1iZXIgfSkge1xuICAgIHRoaXMuaHN2YS5hID0gdmFsLnYgLyB2YWwucmc7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHNldFIodmFsOiB7IHY6IG51bWJlciwgcmc6IG51bWJlciB9KSB7XG4gICAgbGV0IHJnYmEgPSB0aGlzLl91dGlsLmhzdmFUb1JnYmEodGhpcy5oc3ZhKTtcbiAgICByZ2JhLnIgPSB2YWwudiAvIHZhbC5yZztcbiAgICB0aGlzLmhzdmEgPSB0aGlzLl91dGlsLnJnYmFUb0hzdmEocmdiYSk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuICBzZXRHKHZhbDogeyB2OiBudW1iZXIsIHJnOiBudW1iZXIgfSkge1xuICAgIGxldCByZ2JhID0gdGhpcy5fdXRpbC5oc3ZhVG9SZ2JhKHRoaXMuaHN2YSk7XG4gICAgcmdiYS5nID0gdmFsLnYgLyB2YWwucmc7XG4gICAgdGhpcy5oc3ZhID0gdGhpcy5fdXRpbC5yZ2JhVG9Ic3ZhKHJnYmEpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cbiAgc2V0Qih2YWw6IHsgdjogbnVtYmVyLCByZzogbnVtYmVyIH0pIHtcbiAgICBsZXQgcmdiYSA9IHRoaXMuX3V0aWwuaHN2YVRvUmdiYSh0aGlzLmhzdmEpO1xuICAgIHJnYmEuYiA9IHZhbC52IC8gdmFsLnJnO1xuICAgIHRoaXMuaHN2YSA9IHRoaXMuX3V0aWwucmdiYVRvSHN2YShyZ2JhKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG4gIHNldFNhdHVyYXRpb25BbmRCcmlnaHRuZXNzKHZhbDogeyBzOiBudW1iZXIsIHY6IG51bWJlciwgcG9pbnRYOiBudW1iZXIsIHBvaW50WTogbnVtYmVyIH0pIHtcbiAgICB0aGlzLmhzdmEucyA9IHZhbC5zIC8gdmFsLnBvaW50WDtcbiAgICB0aGlzLmhzdmEudiA9IHZhbC52IC8gdmFsLnBvaW50WTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG4gIGNsaWNrT2soKSB7XG4gICAgdGhpcy5faXNDb2xvcnBpY2tlclZpc2libGUgPSBmYWxzZTtcbiAgICB0aGlzLmlzSW5wdXRWYWxpZENvbG9yID0gZmFsc2U7XG4gICAgdGhpcy5jb2xvciA9IHRoaXMuX2lubmVyVmFsdWU7XG5cbiAgICBpZiAodGhpcy5faW5uZXJWYWx1ZSAhPSB0aGlzLl9pbml0aWFsQ29sb3IpIHtcbiAgICAgIHRoaXMuX2VtaXRDaGFuZ2VFdmVudCgpO1xuICAgIH1cbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICAvKipcbiAgKiBkZXNlbGVjdCByZWNlbnQgY29sb3IgYW5kIGNsb3NlIHBvcHVwXG4gICovXG4gIGNhbmNlbENvbG9yKCkge1xuICAgIHRoaXMuX2lubmVyVmFsdWUgPSB0aGlzLl9pbml0aWFsQ29sb3I7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG4gIGlzVmFsaWRDb2xvcihzdHI6IHN0cmluZykge1xuICAgIHJldHVybiBzdHIubWF0Y2goL14jW2EtZjAtOV17Nn0kL2kpICE9PSBudWxsO1xuICB9XG4gIC8qKlxuICAgICAqIHNldCBjb2xvclxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICBzZXRDb2xvckZyb21TdHJpbmcodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkQ29sb3IodmFsdWUpKSB7XG4gICAgICB2YWx1ZSA9ICcjMDAwMDAwJztcbiAgICAgIHRoaXMuYmFja0NvbG9yID0gZmFsc2U7XG4gICAgfVxuICAgIGxldCBoc3ZhID0gdGhpcy5fdXRpbC5zdHJpbmdUb0hzdmEodmFsdWUpO1xuICAgIGlmIChoc3ZhICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmhzdmEgPSBoc3ZhO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgZm9ybWF0UG9saWN5KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLmZvcm1hdCA9IHZhbHVlO1xuICAgIGlmICh0aGlzLmZvcm1hdCA9PT0gMCAmJiB0aGlzLmhzdmEuYSA8IDEpIHtcbiAgICAgIHRoaXMuZm9ybWF0Kys7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmZvcm1hdDtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgY29sb3JcbiAgICovXG4gIHVwZGF0ZSgpIHtcbiAgICBsZXQgaHNsYSA9IHRoaXMuX3V0aWwuaHN2YTJoc2xhKHRoaXMuaHN2YSk7XG4gICAgbGV0IHJnYmEgPSB0aGlzLl91dGlsLmRlbm9ybWFsaXplUkdCQSh0aGlzLl91dGlsLmhzdmFUb1JnYmEodGhpcy5oc3ZhKSk7XG4gICAgbGV0IGh1ZVJnYmEgPSB0aGlzLl91dGlsLmRlbm9ybWFsaXplUkdCQSh0aGlzLl91dGlsLmhzdmFUb1JnYmEoXG4gICAgICBuZXcgSHN2YSh0aGlzLmhzdmEuaCwgMSwgMSwgMSkpKTtcblxuICAgIHRoaXMuYWxwaGFDb2xvciA9ICdyZ2IoJyArIHJnYmEuciArICcsJyArIHJnYmEuZyArICcsJyArIHJnYmEuYiArICcpJztcbiAgICB0aGlzLl9odWVTbGlkZXJDb2xvciA9ICdyZ2IoJyArIGh1ZVJnYmEuciArICcsJyArIGh1ZVJnYmEuZyArICcsJyArIGh1ZVJnYmEuYiArICcpJztcbiAgICB0aGlzLmhzbGFUZXh0ID0gbmV3IEhzbGEoTWF0aC5yb3VuZCgoaHNsYS5oKSAqIDM2MCksIE1hdGgucm91bmQoaHNsYS5zICogMTAwKSxcbiAgICAgIE1hdGgucm91bmQoaHNsYS5sICogMTAwKSwgTWF0aC5yb3VuZChoc2xhLmEgKiAxMDApIC8gMTAwKTtcbiAgICB0aGlzLnJnYmFUZXh0ID0gbmV3IFJnYmEocmdiYS5yLCByZ2JhLmcsIHJnYmEuYiwgTWF0aC5yb3VuZChyZ2JhLmEgKiAxMDApIC8gMTAwKTtcbiAgICBpZiAodGhpcy5iYWNrQ29sb3IpIHtcbiAgICAgIHRoaXMuaGV4VGV4dCA9IHRoaXMuX3V0aWwuaGV4VGV4dChyZ2JhKTtcbiAgICB9XG4gICAgdGhpcy5iYWNrQ29sb3IgPSB0cnVlO1xuICAgIGxldCBjb2xvckNvZGUgPSBNYXRoLnJvdW5kKCh0aGlzLnJnYmFUZXh0LnIgKiAyOTkgKyB0aGlzLnJnYmFUZXh0LmcgKiA1ODcgK1xuICAgICAgdGhpcy5yZ2JhVGV4dC5iICogMTE0KSAvIDEwMDApO1xuICAgIGlmIChjb2xvckNvZGUgPj0gMTI4IHx8IHRoaXMuaHN2YS5hIDwgMC4zNSkge1xuICAgICAgdGhpcy5mb250Q29sb3IgPSAnYmxhY2snO1xuICAgICAgdGhpcy5faXNEYXJrID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb250Q29sb3IgPSAnd2hpdGUnO1xuICAgICAgdGhpcy5faXNEYXJrID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZm9ybWF0ID09PSAwICYmIHRoaXMuaHN2YS5hIDwgMSkge1xuICAgICAgdGhpcy5mb3JtYXQrKztcbiAgICB9XG4gICAgdGhpcy5vdXRwdXRDb2xvciA9IHRoaXMuX3V0aWwub3V0cHV0Rm9ybWF0KHRoaXMuaHN2YSwgdGhpcy5jRm9ybWF0KTtcbiAgICB0aGlzLnNsaWRlciA9IG5ldyBTbGlkZXJQb3NpdGlvbigodGhpcy5oc3ZhLmgpICogdGhpcy5zbGlkZXJEaW0uaCxcbiAgICAgIHRoaXMuaHN2YS5zICogdGhpcy5zbGlkZXJEaW0ucyAtIDcsICgxIC0gdGhpcy5oc3ZhLnYpICogdGhpcy5zbGlkZXJEaW0udiAtIDcsXG4gICAgICB0aGlzLmhzdmEuYSAqIHRoaXMuc2xpZGVyRGltLmEpO1xuICAgIHRoaXMuX2lubmVyVmFsdWUgPSB0aGlzLm91dHB1dENvbG9yO1xuICB9XG5cbiAgY2xlYXJDb2xvcihldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmNvbG9yID0gJyc7XG4gICAgdGhpcy5fZW1pdENoYW5nZUV2ZW50KCk7XG4gIH1cblxuICBpc0Rlc2NlbmRhbnQocGFyZW50OiBhbnksIGNoaWxkOiBhbnkpIHtcbiAgICBsZXQgbm9kZSA9IGNoaWxkLnBhcmVudE5vZGU7XG4gICAgd2hpbGUgKG5vZGUgIT09IG51bGwpIHtcbiAgICAgIGlmIChub2RlID09PSBwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjaGVja0lucHV0VmFsKCk6IHZvaWQge1xuICAgIHRoaXMuaHN2YSA9IHRoaXMuX3V0aWwuc3RyaW5nVG9Ic3ZhKHRoaXMuY29sb3IgKyAnJyk7XG4gICAgdGhpcy5pc0lucHV0Rm9jdXMgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5oc3ZhKSB7XG4gICAgICBpZiAodGhpcy5faW5uZXJWYWx1ZSAhPT0gdGhpcy5jb2xvcikge1xuICAgICAgICB0aGlzLl9lbWl0Q2hhbmdlRXZlbnQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNJbnB1dFZhbGlkQ29sb3IgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc0lucHV0VmFsaWRDb2xvciA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICB9XG5cbiAgLyoqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhIGNvbG9yLiAqL1xuICBfZW1pdENoYW5nZUV2ZW50KCk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlKHRoaXMuY29sb3IpO1xuICAgIHRoaXMuY2hhbmdlLmVtaXQobmV3IE1kMkNvbG9yQ2hhbmdlKHRoaXMsIHRoaXMuY29sb3IpKTtcbiAgICB0aGlzLl9pbm5lclZhbHVlID0gdGhpcy5jb2xvcjtcbiAgfVxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9pbm5lclZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5jb2xvciA9IHZhbHVlO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5fb25DaGFuZ2UgPSBmbjsgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQgeyB0aGlzLl9vblRvdWNoZWQgPSBmbjsgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3Vic2NyaWJlVG9CYWNrZHJvcCgpOiB2b2lkIHtcbiAgICB0aGlzLl9iYWNrZHJvcFN1YnNjcmlwdGlvbiA9IHRoaXMuX292ZXJsYXlSZWYuYmFja2Ryb3BDbGljaygpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl9pbm5lclZhbHVlID0gdGhpcy5faW5pdGlhbENvbG9yO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqICBUaGlzIG1ldGhvZCBjcmVhdGVzIHRoZSBvdmVybGF5IGZyb20gdGhlIHByb3ZpZGVkIHBhbmVsJ3MgdGVtcGxhdGUgYW5kIHNhdmVzIGl0c1xuICAgKiAgT3ZlcmxheVJlZiBzbyB0aGF0IGl0IGNhbiBiZSBhdHRhY2hlZCB0byB0aGUgRE9NIHdoZW4gb3BlbiBpcyBjYWxsZWQuXG4gICAqL1xuICBwcml2YXRlIF9jcmVhdGVPdmVybGF5KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgbGV0IGNvbmZpZyA9IG5ldyBPdmVybGF5U3RhdGUoKTtcbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lciA9PT0gJ2lubGluZScpIHtcbiAgICAgICAgY29uZmlnLnBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLl9jcmVhdGVQaWNrZXJQb3NpdGlvblN0cmF0ZWd5KCk7XG4gICAgICAgIGNvbmZpZy5oYXNCYWNrZHJvcCA9IHRydWU7XG4gICAgICAgIGNvbmZpZy5iYWNrZHJvcENsYXNzID0gJ2Nkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wJztcbiAgICAgICAgY29uZmlnLnNjcm9sbFN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbmZpZy5wb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAgICAgLmdsb2JhbCgpXG4gICAgICAgICAgLmNlbnRlckhvcml6b250YWxseSgpXG4gICAgICAgICAgLmNlbnRlclZlcnRpY2FsbHkoKTtcbiAgICAgICAgY29uZmlnLmhhc0JhY2tkcm9wID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX292ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZShjb25maWcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBDcmVhdGUgdGhlIHBvcHVwIFBvc2l0aW9uU3RyYXRlZ3kuICovXG4gIHByaXZhdGUgX2NyZWF0ZVBpY2tlclBvc2l0aW9uU3RyYXRlZ3koKTogUG9zaXRpb25TdHJhdGVneSB7XG4gICAgcmV0dXJuIHRoaXMuX292ZXJsYXkucG9zaXRpb24oKVxuICAgICAgLmNvbm5lY3RlZFRvKHRoaXMuX2VsZW1lbnQsXG4gICAgICB7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICd0b3AnIH0sXG4gICAgICB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ3RvcCcgfSlcbiAgICAgIC53aXRoRmFsbGJhY2tQb3NpdGlvbihcbiAgICAgIHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICd0b3AnIH0sXG4gICAgICB7IG92ZXJsYXlYOiAnZW5kJywgb3ZlcmxheVk6ICd0b3AnIH0pXG4gICAgICAud2l0aEZhbGxiYWNrUG9zaXRpb24oXG4gICAgICB7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdib3R0b20nIH0sXG4gICAgICB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2JvdHRvbScgfSlcbiAgICAgIC53aXRoRmFsbGJhY2tQb3NpdGlvbihcbiAgICAgIHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICdib3R0b20nIH0sXG4gICAgICB7IG92ZXJsYXlYOiAnZW5kJywgb3ZlcmxheVk6ICdib3R0b20nIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2xlYW5VcFN1YnNjcmlwdGlvbnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2JhY2tkcm9wU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9iYWNrZHJvcFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fcG9zaXRpb25TdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX3Bvc2l0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==