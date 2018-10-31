/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, isDevMode } from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';
var GestureConfig = /** @class */ (function (_super) {
    tslib_1.__extends(GestureConfig, _super);
    function GestureConfig() {
        var _this = _super.call(this) || this;
        _this._hammer = typeof window !== 'undefined' ? (/** @type {?} */ (window)).Hammer : null;
        /* List of new event names to add to the gesture support list */
        _this.events = _this._hammer ? [
            'longpress',
            'slide',
            'slidestart',
            'slideend',
            'slideright',
            'slideleft'
        ] : [];
        if (!_this._hammer && isDevMode()) {
            console.warn('Could not find HammerJS. Certain Angular Material ' +
                'components may not work correctly.');
        }
        return _this;
    }
    /**
     * Builds Hammer instance manually to add custom recognizers that match the Material Design spec.
     *
     * Our gesture names come from the Material Design gestures spec:
     * https://www.google.com/design/spec/patterns/gestures.html#gestures-touch-mechanics
     *
     * More information on default recognizers can be found in Hammer docs:
     * http://hammerjs.github.io/recognizer-pan/
     * http://hammerjs.github.io/recognizer-press/
     *
     * @param element Element to which to assign the new HammerJS gestures.
     * @returns Newly-created HammerJS instance.
     */
    /**
     * Builds Hammer instance manually to add custom recognizers that match the Material Design spec.
     *
     * Our gesture names come from the Material Design gestures spec:
     * https://www.google.com/design/spec/patterns/gestures.html#gestures-touch-mechanics
     *
     * More information on default recognizers can be found in Hammer docs:
     * http://hammerjs.github.io/recognizer-pan/
     * http://hammerjs.github.io/recognizer-press/
     *
     * @param {?} element Element to which to assign the new HammerJS gestures.
     * @return {?} Newly-created HammerJS instance.
     */
    GestureConfig.prototype.buildHammer = /**
     * Builds Hammer instance manually to add custom recognizers that match the Material Design spec.
     *
     * Our gesture names come from the Material Design gestures spec:
     * https://www.google.com/design/spec/patterns/gestures.html#gestures-touch-mechanics
     *
     * More information on default recognizers can be found in Hammer docs:
     * http://hammerjs.github.io/recognizer-pan/
     * http://hammerjs.github.io/recognizer-press/
     *
     * @param {?} element Element to which to assign the new HammerJS gestures.
     * @return {?} Newly-created HammerJS instance.
     */
    function (element) {
        /** @type {?} */
        var mc = new this._hammer(element);
        /** @type {?} */
        var pan = new this._hammer.Pan();
        /** @type {?} */
        var swipe = new this._hammer.Swipe();
        /** @type {?} */
        var press = new this._hammer.Press();
        /** @type {?} */
        var slide = this._createRecognizer(pan, { event: 'slide', threshold: 0 }, swipe);
        /** @type {?} */
        var longpress = this._createRecognizer(press, { event: 'longpress', time: 500 });
        // Overwrite the default `pan` event to use the swipe event.
        pan.recognizeWith(swipe);
        // Add customized gestures to Hammer manager
        mc.add([swipe, press, pan, slide, longpress]);
        return /** @type {?} */ (mc);
    };
    /**
     * Creates a new recognizer, without affecting the default recognizers of HammerJS
     * @param {?} base
     * @param {?} options
     * @param {...?} inheritances
     * @return {?}
     */
    GestureConfig.prototype._createRecognizer = /**
     * Creates a new recognizer, without affecting the default recognizers of HammerJS
     * @param {?} base
     * @param {?} options
     * @param {...?} inheritances
     * @return {?}
     */
    function (base, options) {
        var inheritances = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            inheritances[_i - 2] = arguments[_i];
        }
        /** @type {?} */
        var recognizer = new (/** @type {?} */ (base.constructor))(options);
        inheritances.push(base);
        inheritances.forEach(function (item) { return recognizer.recognizeWith(item); });
        return recognizer;
    };
    GestureConfig.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GestureConfig.ctorParameters = function () { return []; };
    return GestureConfig;
}(HammerGestureConfig));
export { GestureConfig };
if (false) {
    /** @type {?} */
    GestureConfig.prototype._hammer;
    /** @type {?} */
    GestureConfig.prototype.events;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VzdHVyZS1jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2dlc3R1cmVzL2dlc3R1cmUtY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7O0lBSzNCLHlDQUFtQjtJQWFwRDtRQUFBLFlBQ0UsaUJBQU8sU0FRUjt3QkFyQitCLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsbUJBQUMsTUFBYSxFQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJOzt1QkFHMUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEMsV0FBVztZQUNYLE9BQU87WUFDUCxZQUFZO1lBQ1osVUFBVTtZQUNWLFlBQVk7WUFDWixXQUFXO1NBQ1osQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUtKLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxJQUFJLFNBQVMsRUFBRSxFQUFFO1lBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQ1Ysb0RBQW9EO2dCQUNwRCxvQ0FBb0MsQ0FDckMsQ0FBQztTQUNIOztLQUNGO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHOzs7Ozs7Ozs7Ozs7OztJQUNILG1DQUFXOzs7Ozs7Ozs7Ozs7O0lBQVgsVUFBWSxPQUFvQjs7UUFDOUIsSUFBTSxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztRQUdyQyxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7O1FBQ2pDLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7UUFDckMsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDOztRQUtyQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7O1FBQy9FLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDOztRQUcvRSxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUd6QixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFFOUMseUJBQU8sRUFBb0IsRUFBQztLQUM3Qjs7Ozs7Ozs7SUFHTyx5Q0FBaUI7Ozs7Ozs7Y0FBQyxJQUFnQixFQUFFLE9BQVk7UUFBRSxzQkFBNkI7YUFBN0IsVUFBNkIsRUFBN0IscUJBQTZCLEVBQTdCLElBQTZCO1lBQTdCLHFDQUE2Qjs7O1FBQ3JGLElBQUksVUFBVSxHQUFHLElBQUksbUJBQUMsSUFBSSxDQUFDLFdBQStCLEVBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVyRSxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQUM7UUFFN0QsT0FBTyxVQUFVLENBQUM7OztnQkFwRXJCLFVBQVU7Ozs7d0JBTFg7RUFNbUMsbUJBQW1CO1NBQXpDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIGlzRGV2TW9kZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0hhbW1lckdlc3R1cmVDb25maWd9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtIYW1tZXJTdGF0aWMsIEhhbW1lckluc3RhbmNlLCBSZWNvZ25pemVyLCBSZWNvZ25pemVyU3RhdGljfSBmcm9tICcuL2dlc3R1cmUtYW5ub3RhdGlvbnMnO1xuXG4vKiBBZGp1c3RzIGNvbmZpZ3VyYXRpb24gb2Ygb3VyIGdlc3R1cmUgbGlicmFyeSwgSGFtbWVyLiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdlc3R1cmVDb25maWcgZXh0ZW5kcyBIYW1tZXJHZXN0dXJlQ29uZmlnIHtcbiAgcHJpdmF0ZSBfaGFtbWVyOiBIYW1tZXJTdGF0aWMgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/ICh3aW5kb3cgYXMgYW55KS5IYW1tZXIgOiBudWxsO1xuXG4gIC8qIExpc3Qgb2YgbmV3IGV2ZW50IG5hbWVzIHRvIGFkZCB0byB0aGUgZ2VzdHVyZSBzdXBwb3J0IGxpc3QgKi9cbiAgZXZlbnRzOiBzdHJpbmdbXSA9IHRoaXMuX2hhbW1lciA/IFtcbiAgICAnbG9uZ3ByZXNzJyxcbiAgICAnc2xpZGUnLFxuICAgICdzbGlkZXN0YXJ0JyxcbiAgICAnc2xpZGVlbmQnLFxuICAgICdzbGlkZXJpZ2h0JyxcbiAgICAnc2xpZGVsZWZ0J1xuICBdIDogW107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmICghdGhpcy5faGFtbWVyICYmIGlzRGV2TW9kZSgpKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdDb3VsZCBub3QgZmluZCBIYW1tZXJKUy4gQ2VydGFpbiBBbmd1bGFyIE1hdGVyaWFsICcgK1xuICAgICAgICAnY29tcG9uZW50cyBtYXkgbm90IHdvcmsgY29ycmVjdGx5LidcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkcyBIYW1tZXIgaW5zdGFuY2UgbWFudWFsbHkgdG8gYWRkIGN1c3RvbSByZWNvZ25pemVycyB0aGF0IG1hdGNoIHRoZSBNYXRlcmlhbCBEZXNpZ24gc3BlYy5cbiAgICpcbiAgICogT3VyIGdlc3R1cmUgbmFtZXMgY29tZSBmcm9tIHRoZSBNYXRlcmlhbCBEZXNpZ24gZ2VzdHVyZXMgc3BlYzpcbiAgICogaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9kZXNpZ24vc3BlYy9wYXR0ZXJucy9nZXN0dXJlcy5odG1sI2dlc3R1cmVzLXRvdWNoLW1lY2hhbmljc1xuICAgKlxuICAgKiBNb3JlIGluZm9ybWF0aW9uIG9uIGRlZmF1bHQgcmVjb2duaXplcnMgY2FuIGJlIGZvdW5kIGluIEhhbW1lciBkb2NzOlxuICAgKiBodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL3JlY29nbml6ZXItcGFuL1xuICAgKiBodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL3JlY29nbml6ZXItcHJlc3MvXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50IEVsZW1lbnQgdG8gd2hpY2ggdG8gYXNzaWduIHRoZSBuZXcgSGFtbWVySlMgZ2VzdHVyZXMuXG4gICAqIEByZXR1cm5zIE5ld2x5LWNyZWF0ZWQgSGFtbWVySlMgaW5zdGFuY2UuXG4gICAqL1xuICBidWlsZEhhbW1lcihlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhhbW1lckluc3RhbmNlIHtcbiAgICBjb25zdCBtYyA9IG5ldyB0aGlzLl9oYW1tZXIoZWxlbWVudCk7XG5cbiAgICAvLyBEZWZhdWx0IEhhbW1lciBSZWNvZ25pemVycy5cbiAgICBsZXQgcGFuID0gbmV3IHRoaXMuX2hhbW1lci5QYW4oKTtcbiAgICBsZXQgc3dpcGUgPSBuZXcgdGhpcy5faGFtbWVyLlN3aXBlKCk7XG4gICAgbGV0IHByZXNzID0gbmV3IHRoaXMuX2hhbW1lci5QcmVzcygpO1xuXG4gICAgLy8gTm90aWNlIHRoYXQgYSBIYW1tZXJKUyByZWNvZ25pemVyIGNhbiBvbmx5IGRlcGVuZCBvbiBvbmUgb3RoZXIgcmVjb2duaXplciBvbmNlLlxuICAgIC8vIE90aGVyd2lzZSB0aGUgcHJldmlvdXMgYHJlY29nbml6ZVdpdGhgIHdpbGwgYmUgZHJvcHBlZC5cbiAgICAvLyBUT0RPOiBDb25maXJtIHRocmVzaG9sZCBudW1iZXJzIHdpdGggTWF0ZXJpYWwgRGVzaWduIFVYIFRlYW1cbiAgICBsZXQgc2xpZGUgPSB0aGlzLl9jcmVhdGVSZWNvZ25pemVyKHBhbiwge2V2ZW50OiAnc2xpZGUnLCB0aHJlc2hvbGQ6IDB9LCBzd2lwZSk7XG4gICAgbGV0IGxvbmdwcmVzcyA9IHRoaXMuX2NyZWF0ZVJlY29nbml6ZXIocHJlc3MsIHtldmVudDogJ2xvbmdwcmVzcycsIHRpbWU6IDUwMH0pO1xuXG4gICAgLy8gT3ZlcndyaXRlIHRoZSBkZWZhdWx0IGBwYW5gIGV2ZW50IHRvIHVzZSB0aGUgc3dpcGUgZXZlbnQuXG4gICAgcGFuLnJlY29nbml6ZVdpdGgoc3dpcGUpO1xuXG4gICAgLy8gQWRkIGN1c3RvbWl6ZWQgZ2VzdHVyZXMgdG8gSGFtbWVyIG1hbmFnZXJcbiAgICBtYy5hZGQoW3N3aXBlLCBwcmVzcywgcGFuLCBzbGlkZSwgbG9uZ3ByZXNzXSk7XG5cbiAgICByZXR1cm4gbWMgYXMgSGFtbWVySW5zdGFuY2U7XG4gIH1cblxuICAvKiogQ3JlYXRlcyBhIG5ldyByZWNvZ25pemVyLCB3aXRob3V0IGFmZmVjdGluZyB0aGUgZGVmYXVsdCByZWNvZ25pemVycyBvZiBIYW1tZXJKUyAqL1xuICBwcml2YXRlIF9jcmVhdGVSZWNvZ25pemVyKGJhc2U6IFJlY29nbml6ZXIsIG9wdGlvbnM6IGFueSwgLi4uaW5oZXJpdGFuY2VzOiBSZWNvZ25pemVyW10pIHtcbiAgICBsZXQgcmVjb2duaXplciA9IG5ldyAoYmFzZS5jb25zdHJ1Y3RvciBhcyBSZWNvZ25pemVyU3RhdGljKShvcHRpb25zKTtcblxuICAgIGluaGVyaXRhbmNlcy5wdXNoKGJhc2UpO1xuICAgIGluaGVyaXRhbmNlcy5mb3JFYWNoKGl0ZW0gPT4gcmVjb2duaXplci5yZWNvZ25pemVXaXRoKGl0ZW0pKTtcblxuICAgIHJldHVybiByZWNvZ25pemVyO1xuICB9XG5cbn1cbiJdfQ==