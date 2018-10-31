/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, isDevMode } from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';
export class GestureConfig extends HammerGestureConfig {
    constructor() {
        super();
        this._hammer = typeof window !== 'undefined' ? (/** @type {?} */ (window)).Hammer : null;
        /* List of new event names to add to the gesture support list */
        this.events = this._hammer ? [
            'longpress',
            'slide',
            'slidestart',
            'slideend',
            'slideright',
            'slideleft'
        ] : [];
        if (!this._hammer && isDevMode()) {
            console.warn('Could not find HammerJS. Certain Angular Material ' +
                'components may not work correctly.');
        }
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
     * @param {?} element Element to which to assign the new HammerJS gestures.
     * @return {?} Newly-created HammerJS instance.
     */
    buildHammer(element) {
        /** @type {?} */
        const mc = new this._hammer(element);
        /** @type {?} */
        let pan = new this._hammer.Pan();
        /** @type {?} */
        let swipe = new this._hammer.Swipe();
        /** @type {?} */
        let press = new this._hammer.Press();
        /** @type {?} */
        let slide = this._createRecognizer(pan, { event: 'slide', threshold: 0 }, swipe);
        /** @type {?} */
        let longpress = this._createRecognizer(press, { event: 'longpress', time: 500 });
        // Overwrite the default `pan` event to use the swipe event.
        pan.recognizeWith(swipe);
        // Add customized gestures to Hammer manager
        mc.add([swipe, press, pan, slide, longpress]);
        return /** @type {?} */ (mc);
    }
    /**
     * Creates a new recognizer, without affecting the default recognizers of HammerJS
     * @param {?} base
     * @param {?} options
     * @param {...?} inheritances
     * @return {?}
     */
    _createRecognizer(base, options, ...inheritances) {
        /** @type {?} */
        let recognizer = new (/** @type {?} */ (base.constructor))(options);
        inheritances.push(base);
        inheritances.forEach(item => recognizer.recognizeWith(item));
        return recognizer;
    }
}
GestureConfig.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GestureConfig.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    GestureConfig.prototype._hammer;
    /** @type {?} */
    GestureConfig.prototype.events;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VzdHVyZS1jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2dlc3R1cmVzL2dlc3R1cmUtY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUs5RCxNQUFNLG9CQUFxQixTQUFRLG1CQUFtQjtJQWFwRDtRQUNFLEtBQUssRUFBRSxDQUFDO3VCQWJzQixPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLG1CQUFDLE1BQWEsRUFBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSTs7c0JBRzFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLFdBQVc7WUFDWCxPQUFPO1lBQ1AsWUFBWTtZQUNaLFVBQVU7WUFDVixZQUFZO1lBQ1osV0FBVztTQUNaLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFLSixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUNoQyxPQUFPLENBQUMsSUFBSSxDQUNWLG9EQUFvRDtnQkFDcEQsb0NBQW9DLENBQ3JDLENBQUM7U0FDSDtLQUNGOzs7Ozs7Ozs7Ozs7OztJQWVELFdBQVcsQ0FBQyxPQUFvQjs7UUFDOUIsTUFBTSxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztRQUdyQyxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7O1FBQ2pDLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7UUFDckMsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDOztRQUtyQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7O1FBQy9FLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDOztRQUcvRSxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUd6QixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFFOUMseUJBQU8sRUFBb0IsRUFBQztLQUM3Qjs7Ozs7Ozs7SUFHTyxpQkFBaUIsQ0FBQyxJQUFnQixFQUFFLE9BQVksRUFBRSxHQUFHLFlBQTBCOztRQUNyRixJQUFJLFVBQVUsR0FBRyxJQUFJLG1CQUFDLElBQUksQ0FBQyxXQUErQixFQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckUsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTdELE9BQU8sVUFBVSxDQUFDOzs7O1lBcEVyQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBpc0Rldk1vZGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIYW1tZXJHZXN0dXJlQ29uZmlnfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7SGFtbWVyU3RhdGljLCBIYW1tZXJJbnN0YW5jZSwgUmVjb2duaXplciwgUmVjb2duaXplclN0YXRpY30gZnJvbSAnLi9nZXN0dXJlLWFubm90YXRpb25zJztcblxuLyogQWRqdXN0cyBjb25maWd1cmF0aW9uIG9mIG91ciBnZXN0dXJlIGxpYnJhcnksIEhhbW1lci4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHZXN0dXJlQ29uZmlnIGV4dGVuZHMgSGFtbWVyR2VzdHVyZUNvbmZpZyB7XG4gIHByaXZhdGUgX2hhbW1lcjogSGFtbWVyU3RhdGljID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyAod2luZG93IGFzIGFueSkuSGFtbWVyIDogbnVsbDtcblxuICAvKiBMaXN0IG9mIG5ldyBldmVudCBuYW1lcyB0byBhZGQgdG8gdGhlIGdlc3R1cmUgc3VwcG9ydCBsaXN0ICovXG4gIGV2ZW50czogc3RyaW5nW10gPSB0aGlzLl9oYW1tZXIgPyBbXG4gICAgJ2xvbmdwcmVzcycsXG4gICAgJ3NsaWRlJyxcbiAgICAnc2xpZGVzdGFydCcsXG4gICAgJ3NsaWRlZW5kJyxcbiAgICAnc2xpZGVyaWdodCcsXG4gICAgJ3NsaWRlbGVmdCdcbiAgXSA6IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAoIXRoaXMuX2hhbW1lciAmJiBpc0Rldk1vZGUoKSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnQ291bGQgbm90IGZpbmQgSGFtbWVySlMuIENlcnRhaW4gQW5ndWxhciBNYXRlcmlhbCAnICtcbiAgICAgICAgJ2NvbXBvbmVudHMgbWF5IG5vdCB3b3JrIGNvcnJlY3RseS4nXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZHMgSGFtbWVyIGluc3RhbmNlIG1hbnVhbGx5IHRvIGFkZCBjdXN0b20gcmVjb2duaXplcnMgdGhhdCBtYXRjaCB0aGUgTWF0ZXJpYWwgRGVzaWduIHNwZWMuXG4gICAqXG4gICAqIE91ciBnZXN0dXJlIG5hbWVzIGNvbWUgZnJvbSB0aGUgTWF0ZXJpYWwgRGVzaWduIGdlc3R1cmVzIHNwZWM6XG4gICAqIGh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vZGVzaWduL3NwZWMvcGF0dGVybnMvZ2VzdHVyZXMuaHRtbCNnZXN0dXJlcy10b3VjaC1tZWNoYW5pY3NcbiAgICpcbiAgICogTW9yZSBpbmZvcm1hdGlvbiBvbiBkZWZhdWx0IHJlY29nbml6ZXJzIGNhbiBiZSBmb3VuZCBpbiBIYW1tZXIgZG9jczpcbiAgICogaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby9yZWNvZ25pemVyLXBhbi9cbiAgICogaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby9yZWNvZ25pemVyLXByZXNzL1xuICAgKlxuICAgKiBAcGFyYW0gZWxlbWVudCBFbGVtZW50IHRvIHdoaWNoIHRvIGFzc2lnbiB0aGUgbmV3IEhhbW1lckpTIGdlc3R1cmVzLlxuICAgKiBAcmV0dXJucyBOZXdseS1jcmVhdGVkIEhhbW1lckpTIGluc3RhbmNlLlxuICAgKi9cbiAgYnVpbGRIYW1tZXIoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIYW1tZXJJbnN0YW5jZSB7XG4gICAgY29uc3QgbWMgPSBuZXcgdGhpcy5faGFtbWVyKGVsZW1lbnQpO1xuXG4gICAgLy8gRGVmYXVsdCBIYW1tZXIgUmVjb2duaXplcnMuXG4gICAgbGV0IHBhbiA9IG5ldyB0aGlzLl9oYW1tZXIuUGFuKCk7XG4gICAgbGV0IHN3aXBlID0gbmV3IHRoaXMuX2hhbW1lci5Td2lwZSgpO1xuICAgIGxldCBwcmVzcyA9IG5ldyB0aGlzLl9oYW1tZXIuUHJlc3MoKTtcblxuICAgIC8vIE5vdGljZSB0aGF0IGEgSGFtbWVySlMgcmVjb2duaXplciBjYW4gb25seSBkZXBlbmQgb24gb25lIG90aGVyIHJlY29nbml6ZXIgb25jZS5cbiAgICAvLyBPdGhlcndpc2UgdGhlIHByZXZpb3VzIGByZWNvZ25pemVXaXRoYCB3aWxsIGJlIGRyb3BwZWQuXG4gICAgLy8gVE9ETzogQ29uZmlybSB0aHJlc2hvbGQgbnVtYmVycyB3aXRoIE1hdGVyaWFsIERlc2lnbiBVWCBUZWFtXG4gICAgbGV0IHNsaWRlID0gdGhpcy5fY3JlYXRlUmVjb2duaXplcihwYW4sIHtldmVudDogJ3NsaWRlJywgdGhyZXNob2xkOiAwfSwgc3dpcGUpO1xuICAgIGxldCBsb25ncHJlc3MgPSB0aGlzLl9jcmVhdGVSZWNvZ25pemVyKHByZXNzLCB7ZXZlbnQ6ICdsb25ncHJlc3MnLCB0aW1lOiA1MDB9KTtcblxuICAgIC8vIE92ZXJ3cml0ZSB0aGUgZGVmYXVsdCBgcGFuYCBldmVudCB0byB1c2UgdGhlIHN3aXBlIGV2ZW50LlxuICAgIHBhbi5yZWNvZ25pemVXaXRoKHN3aXBlKTtcblxuICAgIC8vIEFkZCBjdXN0b21pemVkIGdlc3R1cmVzIHRvIEhhbW1lciBtYW5hZ2VyXG4gICAgbWMuYWRkKFtzd2lwZSwgcHJlc3MsIHBhbiwgc2xpZGUsIGxvbmdwcmVzc10pO1xuXG4gICAgcmV0dXJuIG1jIGFzIEhhbW1lckluc3RhbmNlO1xuICB9XG5cbiAgLyoqIENyZWF0ZXMgYSBuZXcgcmVjb2duaXplciwgd2l0aG91dCBhZmZlY3RpbmcgdGhlIGRlZmF1bHQgcmVjb2duaXplcnMgb2YgSGFtbWVySlMgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlUmVjb2duaXplcihiYXNlOiBSZWNvZ25pemVyLCBvcHRpb25zOiBhbnksIC4uLmluaGVyaXRhbmNlczogUmVjb2duaXplcltdKSB7XG4gICAgbGV0IHJlY29nbml6ZXIgPSBuZXcgKGJhc2UuY29uc3RydWN0b3IgYXMgUmVjb2duaXplclN0YXRpYykob3B0aW9ucyk7XG5cbiAgICBpbmhlcml0YW5jZXMucHVzaChiYXNlKTtcbiAgICBpbmhlcml0YW5jZXMuZm9yRWFjaChpdGVtID0+IHJlY29nbml6ZXIucmVjb2duaXplV2l0aChpdGVtKSk7XG5cbiAgICByZXR1cm4gcmVjb2duaXplcjtcbiAgfVxuXG59XG4iXX0=