/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { RippleRef, RippleState } from './ripple-ref';
/** *
 * Fade-in duration for the ripples. Can be modified with the speedFactor option.
  @type {?} */
export var RIPPLE_FADE_IN_DURATION = 450;
/** *
 * Fade-out duration for the ripples in milliseconds. This can't be modified by the speedFactor.
  @type {?} */
export var RIPPLE_FADE_OUT_DURATION = 400;
/** @typedef {?} */
var RippleConfig;
export { RippleConfig };
/**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * \@docs-private
 */
var /**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * \@docs-private
 */
RippleRenderer = /** @class */ (function () {
    function RippleRenderer(elementRef, _ngZone, _ruler, platform) {
        this._ngZone = _ngZone;
        this._ruler = _ruler;
        /**
         * Whether the mouse is currently down or not.
         */
        this._isMousedown = false;
        /**
         * Events to be registered on the trigger element.
         */
        this._triggerEvents = new Map();
        /**
         * Set of currently active ripple references.
         */
        this._activeRipples = new Set();
        /**
         * Ripple config for all ripples created by events.
         */
        this.rippleConfig = {};
        /**
         * Whether mouse ripples should be created or not.
         */
        this.rippleDisabled = false;
        // Only do anything if we're on the browser.
        if (platform.isBrowser) {
            this._containerElement = elementRef.nativeElement;
            // Specify events which need to be registered on the trigger.
            this._triggerEvents.set('mousedown', this.onMousedown.bind(this));
            this._triggerEvents.set('mouseup', this.onMouseup.bind(this));
            this._triggerEvents.set('mouseleave', this.onMouseLeave.bind(this));
            // By default use the host element as trigger element.
            this.setTriggerElement(this._containerElement);
        }
    }
    /** Fades in a ripple at the given coordinates. */
    /**
     * Fades in a ripple at the given coordinates.
     * @param {?} pageX
     * @param {?} pageY
     * @param {?=} config
     * @return {?}
     */
    RippleRenderer.prototype.fadeInRipple = /**
     * Fades in a ripple at the given coordinates.
     * @param {?} pageX
     * @param {?} pageY
     * @param {?=} config
     * @return {?}
     */
    function (pageX, pageY, config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        /** @type {?} */
        var containerRect = this._containerElement.getBoundingClientRect();
        if (config.centered) {
            pageX = containerRect.left + containerRect.width / 2;
            pageY = containerRect.top + containerRect.height / 2;
        }
        else {
            /** @type {?} */
            var scrollPosition = this._ruler.getViewportScrollPosition();
            pageX -= scrollPosition.left;
            pageY -= scrollPosition.top;
        }
        /** @type {?} */
        var radius = config.radius || distanceToFurthestCorner(pageX, pageY, containerRect);
        /** @type {?} */
        var duration = RIPPLE_FADE_IN_DURATION * (1 / (config.speedFactor || 1));
        /** @type {?} */
        var offsetX = pageX - containerRect.left;
        /** @type {?} */
        var offsetY = pageY - containerRect.top;
        /** @type {?} */
        var ripple = document.createElement('div');
        ripple.classList.add('mat-ripple-element');
        ripple.style.left = offsetX - radius + "px";
        ripple.style.top = offsetY - radius + "px";
        ripple.style.height = radius * 2 + "px";
        ripple.style.width = radius * 2 + "px";
        // If the color is not set, the default CSS color will be used.
        ripple.style.backgroundColor = config.color;
        ripple.style.transitionDuration = duration + "ms";
        this._containerElement.appendChild(ripple);
        // By default the browser does not recalculate the styles of dynamically created
        // ripple elements. This is critical because then the `scale` would not animate properly.
        enforceStyleRecalculation(ripple);
        ripple.style.transform = 'scale(1)';
        /** @type {?} */
        var rippleRef = new RippleRef(this, ripple, config);
        rippleRef.state = RippleState.FADING_IN;
        // Add the ripple reference to the list of all active ripples.
        this._activeRipples.add(rippleRef);
        // Wait for the ripple element to be completely faded in.
        // Once it's faded in, the ripple can be hidden immediately if the mouse is released.
        this.runTimeoutOutsideZone(function () {
            rippleRef.state = RippleState.VISIBLE;
            if (!config.persistent && !_this._isMousedown) {
                rippleRef.fadeOut();
            }
        }, duration);
        return rippleRef;
    };
    /** Fades out a ripple reference. */
    /**
     * Fades out a ripple reference.
     * @param {?} rippleRef
     * @return {?}
     */
    RippleRenderer.prototype.fadeOutRipple = /**
     * Fades out a ripple reference.
     * @param {?} rippleRef
     * @return {?}
     */
    function (rippleRef) {
        // For ripples that are not active anymore, don't re-un the fade-out animation.
        if (!this._activeRipples.delete(rippleRef)) {
            return;
        }
        /** @type {?} */
        var rippleEl = rippleRef.element;
        rippleEl.style.transitionDuration = RIPPLE_FADE_OUT_DURATION + "ms";
        rippleEl.style.opacity = '0';
        rippleRef.state = RippleState.FADING_OUT;
        // Once the ripple faded out, the ripple can be safely removed from the DOM.
        this.runTimeoutOutsideZone(function () {
            rippleRef.state = RippleState.HIDDEN;
            rippleEl.parentNode.removeChild(rippleEl);
        }, RIPPLE_FADE_OUT_DURATION);
    };
    /** Fades out all currently active ripples. */
    /**
     * Fades out all currently active ripples.
     * @return {?}
     */
    RippleRenderer.prototype.fadeOutAll = /**
     * Fades out all currently active ripples.
     * @return {?}
     */
    function () {
        this._activeRipples.forEach(function (ripple) { return ripple.fadeOut(); });
    };
    /** Sets the trigger element and registers the mouse events. */
    /**
     * Sets the trigger element and registers the mouse events.
     * @param {?} element
     * @return {?}
     */
    RippleRenderer.prototype.setTriggerElement = /**
     * Sets the trigger element and registers the mouse events.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var _this = this;
        // Remove all previously register event listeners from the trigger element.
        if (this._triggerElement) {
            this._triggerEvents.forEach(function (fn, type) { return _this._triggerElement.removeEventListener(type, fn); });
        }
        if (element) {
            // If the element is not null, register all event listeners on the trigger element.
            this._ngZone.runOutsideAngular(function () {
                _this._triggerEvents.forEach(function (fn, type) { return element.addEventListener(type, fn); });
            });
        }
        this._triggerElement = element;
    };
    /**
     * Listener being called on mousedown event.
     * @param {?} event
     * @return {?}
     */
    RippleRenderer.prototype.onMousedown = /**
     * Listener being called on mousedown event.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.rippleDisabled) {
            this._isMousedown = true;
            this.fadeInRipple(event.pageX, event.pageY, this.rippleConfig);
        }
    };
    /**
     * Listener being called on mouseup event.
     * @return {?}
     */
    RippleRenderer.prototype.onMouseup = /**
     * Listener being called on mouseup event.
     * @return {?}
     */
    function () {
        this._isMousedown = false;
        // Fade-out all ripples that are completely visible and not persistent.
        this._activeRipples.forEach(function (ripple) {
            if (!ripple.config.persistent && ripple.state === RippleState.VISIBLE) {
                ripple.fadeOut();
            }
        });
    };
    /**
     * Listener being called on mouseleave event.
     * @return {?}
     */
    RippleRenderer.prototype.onMouseLeave = /**
     * Listener being called on mouseleave event.
     * @return {?}
     */
    function () {
        if (this._isMousedown) {
            this.onMouseup();
        }
    };
    /**
     * Runs a timeout outside of the Angular zone to avoid triggering the change detection.
     * @param {?} fn
     * @param {?=} delay
     * @return {?}
     */
    RippleRenderer.prototype.runTimeoutOutsideZone = /**
     * Runs a timeout outside of the Angular zone to avoid triggering the change detection.
     * @param {?} fn
     * @param {?=} delay
     * @return {?}
     */
    function (fn, delay) {
        if (delay === void 0) { delay = 0; }
        this._ngZone.runOutsideAngular(function () { return setTimeout(fn, delay); });
    };
    return RippleRenderer;
}());
/**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * \@docs-private
 */
export { RippleRenderer };
if (false) {
    /**
     * Element where the ripples are being added to.
     * @type {?}
     */
    RippleRenderer.prototype._containerElement;
    /**
     * Element which triggers the ripple elements on mouse events.
     * @type {?}
     */
    RippleRenderer.prototype._triggerElement;
    /**
     * Whether the mouse is currently down or not.
     * @type {?}
     */
    RippleRenderer.prototype._isMousedown;
    /**
     * Events to be registered on the trigger element.
     * @type {?}
     */
    RippleRenderer.prototype._triggerEvents;
    /**
     * Set of currently active ripple references.
     * @type {?}
     */
    RippleRenderer.prototype._activeRipples;
    /**
     * Ripple config for all ripples created by events.
     * @type {?}
     */
    RippleRenderer.prototype.rippleConfig;
    /**
     * Whether mouse ripples should be created or not.
     * @type {?}
     */
    RippleRenderer.prototype.rippleDisabled;
    /** @type {?} */
    RippleRenderer.prototype._ngZone;
    /** @type {?} */
    RippleRenderer.prototype._ruler;
}
/**
 * Enforces a style recalculation of a DOM element by computing its styles.
 * @param {?} element
 * @return {?}
 */
function enforceStyleRecalculation(element) {
    // Enforce a style recalculation by calling `getComputedStyle` and accessing any property.
    // Calling `getPropertyValue` is important to let optimizers know that this is not a noop.
    // See: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
    window.getComputedStyle(element).getPropertyValue('opacity');
}
/**
 * Returns the distance from the point (x, y) to the furthest corner of a rectangle.
 * @param {?} x
 * @param {?} y
 * @param {?} rect
 * @return {?}
 */
function distanceToFurthestCorner(x, y, rect) {
    /** @type {?} */
    var distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
    /** @type {?} */
    var distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return Math.sqrt(distX * distX + distY * distY);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlwcGxlLXJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9yaXBwbGUvcmlwcGxlLXJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBQyxNQUFNLGNBQWMsQ0FBQzs7OztBQUlwRCxXQUFhLHVCQUF1QixHQUFHLEdBQUcsQ0FBQzs7OztBQUczQyxXQUFhLHdCQUF3QixHQUFHLEdBQUcsQ0FBQzs7Ozs7Ozs7Ozs7QUFpQjVDOzs7Ozs7O0FBQUE7SUF1QkUsd0JBQ0ksVUFBc0IsRUFDZCxTQUNBLFFBQ1IsUUFBa0I7UUFGVixZQUFPLEdBQVAsT0FBTztRQUNQLFdBQU0sR0FBTixNQUFNOzs7OzRCQWpCYyxLQUFLOzs7OzhCQUdaLElBQUksR0FBRyxFQUFlOzs7OzhCQUd0QixJQUFJLEdBQUcsRUFBYTs7Ozs0QkFHaEIsRUFBRTs7Ozs4QkFHTCxLQUFLOztRQVE3QixJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7O1lBR2xELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztZQUdwRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FD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RCwwQkFrTEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUQsbUNBQW1DLE9BQW9COzs7O0lBSXJELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUM5RDs7Ozs7Ozs7QUFLRCxrQ0FBa0MsQ0FBUyxFQUFFLENBQVMsRUFBRSxJQUFnQjs7SUFDdEUsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O0lBQzFFLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzFFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQztDQUNqRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RWxlbWVudFJlZiwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UGxhdGZvcm19IGZyb20gJy4uL3BsYXRmb3JtL3BsYXRmb3JtJztcbmltcG9ydCB7Vmlld3BvcnRSdWxlcn0gZnJvbSAnLi4vb3ZlcmxheS9wb3NpdGlvbi92aWV3cG9ydC1ydWxlcic7XG5pbXBvcnQge1JpcHBsZVJlZiwgUmlwcGxlU3RhdGV9IGZyb20gJy4vcmlwcGxlLXJlZic7XG5cblxuLyoqIEZhZGUtaW4gZHVyYXRpb24gZm9yIHRoZSByaXBwbGVzLiBDYW4gYmUgbW9kaWZpZWQgd2l0aCB0aGUgc3BlZWRGYWN0b3Igb3B0aW9uLiAqL1xuZXhwb3J0IGNvbnN0IFJJUFBMRV9GQURFX0lOX0RVUkFUSU9OID0gNDUwO1xuXG4vKiogRmFkZS1vdXQgZHVyYXRpb24gZm9yIHRoZSByaXBwbGVzIGluIG1pbGxpc2Vjb25kcy4gVGhpcyBjYW4ndCBiZSBtb2RpZmllZCBieSB0aGUgc3BlZWRGYWN0b3IuICovXG5leHBvcnQgY29uc3QgUklQUExFX0ZBREVfT1VUX0RVUkFUSU9OID0gNDAwO1xuXG5leHBvcnQgdHlwZSBSaXBwbGVDb25maWcgPSB7XG4gIGNvbG9yPzogc3RyaW5nO1xuICBjZW50ZXJlZD86IGJvb2xlYW47XG4gIHJhZGl1cz86IG51bWJlcjtcbiAgc3BlZWRGYWN0b3I/OiBudW1iZXI7XG4gIHBlcnNpc3RlbnQ/OiBib29sZWFuO1xufTtcblxuLyoqXG4gKiBIZWxwZXIgc2VydmljZSB0aGF0IHBlcmZvcm1zIERPTSBtYW5pcHVsYXRpb25zLiBOb3QgaW50ZW5kZWQgdG8gYmUgdXNlZCBvdXRzaWRlIHRoaXMgbW9kdWxlLlxuICogVGhlIGNvbnN0cnVjdG9yIHRha2VzIGEgcmVmZXJlbmNlIHRvIHRoZSByaXBwbGUgZGlyZWN0aXZlJ3MgaG9zdCBlbGVtZW50IGFuZCBhIG1hcCBvZiBET01cbiAqIGV2ZW50IGhhbmRsZXJzIHRvIGJlIGluc3RhbGxlZCBvbiB0aGUgZWxlbWVudCB0aGF0IHRyaWdnZXJzIHJpcHBsZSBhbmltYXRpb25zLlxuICogVGhpcyB3aWxsIGV2ZW50dWFsbHkgYmVjb21lIGEgY3VzdG9tIHJlbmRlcmVyIG9uY2UgQW5ndWxhciBzdXBwb3J0IGV4aXN0cy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNsYXNzIFJpcHBsZVJlbmRlcmVyIHtcblxuICAvKiogRWxlbWVudCB3aGVyZSB0aGUgcmlwcGxlcyBhcmUgYmVpbmcgYWRkZWQgdG8uICovXG4gIHByaXZhdGUgX2NvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIC8qKiBFbGVtZW50IHdoaWNoIHRyaWdnZXJzIHRoZSByaXBwbGUgZWxlbWVudHMgb24gbW91c2UgZXZlbnRzLiAqL1xuICBwcml2YXRlIF90cmlnZ2VyRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIG1vdXNlIGlzIGN1cnJlbnRseSBkb3duIG9yIG5vdC4gKi9cbiAgcHJpdmF0ZSBfaXNNb3VzZWRvd246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogRXZlbnRzIHRvIGJlIHJlZ2lzdGVyZWQgb24gdGhlIHRyaWdnZXIgZWxlbWVudC4gKi9cbiAgcHJpdmF0ZSBfdHJpZ2dlckV2ZW50cyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cbiAgLyoqIFNldCBvZiBjdXJyZW50bHkgYWN0aXZlIHJpcHBsZSByZWZlcmVuY2VzLiAqL1xuICBwcml2YXRlIF9hY3RpdmVSaXBwbGVzID0gbmV3IFNldDxSaXBwbGVSZWY+KCk7XG5cbiAgLyoqIFJpcHBsZSBjb25maWcgZm9yIGFsbCByaXBwbGVzIGNyZWF0ZWQgYnkgZXZlbnRzLiAqL1xuICByaXBwbGVDb25maWc6IFJpcHBsZUNvbmZpZyA9IHt9O1xuXG4gIC8qKiBXaGV0aGVyIG1vdXNlIHJpcHBsZXMgc2hvdWxkIGJlIGNyZWF0ZWQgb3Igbm90LiAqL1xuICByaXBwbGVEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgICAgcHJpdmF0ZSBfcnVsZXI6IFZpZXdwb3J0UnVsZXIsXG4gICAgICBwbGF0Zm9ybTogUGxhdGZvcm0pIHtcbiAgICAvLyBPbmx5IGRvIGFueXRoaW5nIGlmIHdlJ3JlIG9uIHRoZSBicm93c2VyLlxuICAgIGlmIChwbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHRoaXMuX2NvbnRhaW5lckVsZW1lbnQgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIC8vIFNwZWNpZnkgZXZlbnRzIHdoaWNoIG5lZWQgdG8gYmUgcmVnaXN0ZXJlZCBvbiB0aGUgdHJpZ2dlci5cbiAgICAgIHRoaXMuX3RyaWdnZXJFdmVudHMuc2V0KCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2Vkb3duLmJpbmQodGhpcykpO1xuICAgICAgdGhpcy5fdHJpZ2dlckV2ZW50cy5zZXQoJ21vdXNldXAnLCB0aGlzLm9uTW91c2V1cC5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMuX3RyaWdnZXJFdmVudHMuc2V0KCdtb3VzZWxlYXZlJywgdGhpcy5vbk1vdXNlTGVhdmUuYmluZCh0aGlzKSk7XG5cbiAgICAgIC8vIEJ5IGRlZmF1bHQgdXNlIHRoZSBob3N0IGVsZW1lbnQgYXMgdHJpZ2dlciBlbGVtZW50LlxuICAgICAgdGhpcy5zZXRUcmlnZ2VyRWxlbWVudCh0aGlzLl9jb250YWluZXJFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICAvKiogRmFkZXMgaW4gYSByaXBwbGUgYXQgdGhlIGdpdmVuIGNvb3JkaW5hdGVzLiAqL1xuICBmYWRlSW5SaXBwbGUocGFnZVg6IG51bWJlciwgcGFnZVk6IG51bWJlciwgY29uZmlnOiBSaXBwbGVDb25maWcgPSB7fSk6IFJpcHBsZVJlZiB7XG4gICAgbGV0IGNvbnRhaW5lclJlY3QgPSB0aGlzLl9jb250YWluZXJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgaWYgKGNvbmZpZy5jZW50ZXJlZCkge1xuICAgICAgcGFnZVggPSBjb250YWluZXJSZWN0LmxlZnQgKyBjb250YWluZXJSZWN0LndpZHRoIC8gMjtcbiAgICAgIHBhZ2VZID0gY29udGFpbmVyUmVjdC50b3AgKyBjb250YWluZXJSZWN0LmhlaWdodCAvIDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN1YnRyYWN0IHNjcm9sbCB2YWx1ZXMgZnJvbSB0aGUgY29vcmRpbmF0ZXMgYmVjYXVzZSBjYWxjdWxhdGlvbnMgYmVsb3dcbiAgICAgIC8vIGFyZSBhbHdheXMgcmVsYXRpdmUgdG8gdGhlIHZpZXdwb3J0IHJlY3RhbmdsZS5cbiAgICAgIGxldCBzY3JvbGxQb3NpdGlvbiA9IHRoaXMuX3J1bGVyLmdldFZpZXdwb3J0U2Nyb2xsUG9zaXRpb24oKTtcbiAgICAgIHBhZ2VYIC09IHNjcm9sbFBvc2l0aW9uLmxlZnQ7XG4gICAgICBwYWdlWSAtPSBzY3JvbGxQb3NpdGlvbi50b3A7XG4gICAgfVxuXG4gICAgbGV0IHJhZGl1cyA9IGNvbmZpZy5yYWRpdXMgfHwgZGlzdGFuY2VUb0Z1cnRoZXN0Q29ybmVyKHBhZ2VYLCBwYWdlWSwgY29udGFpbmVyUmVjdCk7XG4gICAgbGV0IGR1cmF0aW9uID0gUklQUExFX0ZBREVfSU5fRFVSQVRJT04gKiAoMSAvIChjb25maWcuc3BlZWRGYWN0b3IgfHwgMSkpO1xuICAgIGxldCBvZmZzZXRYID0gcGFnZVggLSBjb250YWluZXJSZWN0LmxlZnQ7XG4gICAgbGV0IG9mZnNldFkgPSBwYWdlWSAtIGNvbnRhaW5lclJlY3QudG9wO1xuXG4gICAgbGV0IHJpcHBsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJpcHBsZS5jbGFzc0xpc3QuYWRkKCdtYXQtcmlwcGxlLWVsZW1lbnQnKTtcblxuICAgIHJpcHBsZS5zdHlsZS5sZWZ0ID0gYCR7b2Zmc2V0WCAtIHJhZGl1c31weGA7XG4gICAgcmlwcGxlLnN0eWxlLnRvcCA9IGAke29mZnNldFkgLSByYWRpdXN9cHhgO1xuICAgIHJpcHBsZS5zdHlsZS5oZWlnaHQgPSBgJHtyYWRpdXMgKiAyfXB4YDtcbiAgICByaXBwbGUuc3R5bGUud2lkdGggPSBgJHtyYWRpdXMgKiAyfXB4YDtcblxuICAgIC8vIElmIHRoZSBjb2xvciBpcyBub3Qgc2V0LCB0aGUgZGVmYXVsdCBDU1MgY29sb3Igd2lsbCBiZSB1c2VkLlxuICAgIHJpcHBsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb25maWcuY29sb3I7XG4gICAgcmlwcGxlLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGAke2R1cmF0aW9ufW1zYDtcblxuICAgIHRoaXMuX2NvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQocmlwcGxlKTtcblxuICAgIC8vIEJ5IGRlZmF1bHQgdGhlIGJyb3dzZXIgZG9lcyBub3QgcmVjYWxjdWxhdGUgdGhlIHN0eWxlcyBvZiBkeW5hbWljYWxseSBjcmVhdGVkXG4gICAgLy8gcmlwcGxlIGVsZW1lbnRzLiBUaGlzIGlzIGNyaXRpY2FsIGJlY2F1c2UgdGhlbiB0aGUgYHNjYWxlYCB3b3VsZCBub3QgYW5pbWF0ZSBwcm9wZXJseS5cbiAgICBlbmZvcmNlU3R5bGVSZWNhbGN1bGF0aW9uKHJpcHBsZSk7XG5cbiAgICByaXBwbGUuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlKDEpJztcblxuICAgIC8vIEV4cG9zZWQgcmVmZXJlbmNlIHRvIHRoZSByaXBwbGUgdGhhdCB3aWxsIGJlIHJldHVybmVkLlxuICAgIGxldCByaXBwbGVSZWYgPSBuZXcgUmlwcGxlUmVmKHRoaXMsIHJpcHBsZSwgY29uZmlnKTtcblxuICAgIHJpcHBsZVJlZi5zdGF0ZSA9IFJpcHBsZVN0YXRlLkZBRElOR19JTjtcblxuICAgIC8vIEFkZCB0aGUgcmlwcGxlIHJlZmVyZW5jZSB0byB0aGUgbGlzdCBvZiBhbGwgYWN0aXZlIHJpcHBsZXMuXG4gICAgdGhpcy5fYWN0aXZlUmlwcGxlcy5hZGQocmlwcGxlUmVmKTtcblxuICAgIC8vIFdhaXQgZm9yIHRoZSByaXBwbGUgZWxlbWVudCB0byBiZSBjb21wbGV0ZWx5IGZhZGVkIGluLlxuICAgIC8vIE9uY2UgaXQncyBmYWRlZCBpbiwgdGhlIHJpcHBsZSBjYW4gYmUgaGlkZGVuIGltbWVkaWF0ZWx5IGlmIHRoZSBtb3VzZSBpcyByZWxlYXNlZC5cbiAgICB0aGlzLnJ1blRpbWVvdXRPdXRzaWRlWm9uZSgoKSA9PiB7XG4gICAgICByaXBwbGVSZWYuc3RhdGUgPSBSaXBwbGVTdGF0ZS5WSVNJQkxFO1xuXG4gICAgICBpZiAoIWNvbmZpZy5wZXJzaXN0ZW50ICYmICF0aGlzLl9pc01vdXNlZG93bikge1xuICAgICAgICByaXBwbGVSZWYuZmFkZU91dCgpO1xuICAgICAgfVxuICAgIH0sIGR1cmF0aW9uKTtcblxuICAgIHJldHVybiByaXBwbGVSZWY7XG4gIH1cblxuICAvKiogRmFkZXMgb3V0IGEgcmlwcGxlIHJlZmVyZW5jZS4gKi9cbiAgZmFkZU91dFJpcHBsZShyaXBwbGVSZWY6IFJpcHBsZVJlZikge1xuICAgIC8vIEZvciByaXBwbGVzIHRoYXQgYXJlIG5vdCBhY3RpdmUgYW55bW9yZSwgZG9uJ3QgcmUtdW4gdGhlIGZhZGUtb3V0IGFuaW1hdGlvbi5cbiAgICBpZiAoIXRoaXMuX2FjdGl2ZVJpcHBsZXMuZGVsZXRlKHJpcHBsZVJlZikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcmlwcGxlRWwgPSByaXBwbGVSZWYuZWxlbWVudDtcblxuICAgIHJpcHBsZUVsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGAke1JJUFBMRV9GQURFX09VVF9EVVJBVElPTn1tc2A7XG4gICAgcmlwcGxlRWwuc3R5bGUub3BhY2l0eSA9ICcwJztcblxuICAgIHJpcHBsZVJlZi5zdGF0ZSA9IFJpcHBsZVN0YXRlLkZBRElOR19PVVQ7XG5cbiAgICAvLyBPbmNlIHRoZSByaXBwbGUgZmFkZWQgb3V0LCB0aGUgcmlwcGxlIGNhbiBiZSBzYWZlbHkgcmVtb3ZlZCBmcm9tIHRoZSBET00uXG4gICAgdGhpcy5ydW5UaW1lb3V0T3V0c2lkZVpvbmUoKCkgPT4ge1xuICAgICAgcmlwcGxlUmVmLnN0YXRlID0gUmlwcGxlU3RhdGUuSElEREVOO1xuICAgICAgcmlwcGxlRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyaXBwbGVFbCk7XG4gICAgfSwgUklQUExFX0ZBREVfT1VUX0RVUkFUSU9OKTtcbiAgfVxuXG4gIC8qKiBGYWRlcyBvdXQgYWxsIGN1cnJlbnRseSBhY3RpdmUgcmlwcGxlcy4gKi9cbiAgZmFkZU91dEFsbCgpIHtcbiAgICB0aGlzLl9hY3RpdmVSaXBwbGVzLmZvckVhY2gocmlwcGxlID0+IHJpcHBsZS5mYWRlT3V0KCkpO1xuICB9XG5cbiAgLyoqIFNldHMgdGhlIHRyaWdnZXIgZWxlbWVudCBhbmQgcmVnaXN0ZXJzIHRoZSBtb3VzZSBldmVudHMuICovXG4gIHNldFRyaWdnZXJFbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgLy8gUmVtb3ZlIGFsbCBwcmV2aW91c2x5IHJlZ2lzdGVyIGV2ZW50IGxpc3RlbmVycyBmcm9tIHRoZSB0cmlnZ2VyIGVsZW1lbnQuXG4gICAgaWYgKHRoaXMuX3RyaWdnZXJFbGVtZW50KSB7XG4gICAgICB0aGlzLl90cmlnZ2VyRXZlbnRzLmZvckVhY2goKGZuLCB0eXBlKSA9PiB0aGlzLl90cmlnZ2VyRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuKSk7XG4gICAgfVxuXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIC8vIElmIHRoZSBlbGVtZW50IGlzIG5vdCBudWxsLCByZWdpc3RlciBhbGwgZXZlbnQgbGlzdGVuZXJzIG9uIHRoZSB0cmlnZ2VyIGVsZW1lbnQuXG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLl90cmlnZ2VyRXZlbnRzLmZvckVhY2goKGZuLCB0eXBlKSA9PiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4pKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuX3RyaWdnZXJFbGVtZW50ID0gZWxlbWVudDtcbiAgfVxuXG4gIC8qKiBMaXN0ZW5lciBiZWluZyBjYWxsZWQgb24gbW91c2Vkb3duIGV2ZW50LiAqL1xuICBwcml2YXRlIG9uTW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLnJpcHBsZURpc2FibGVkKSB7XG4gICAgICB0aGlzLl9pc01vdXNlZG93biA9IHRydWU7XG4gICAgICB0aGlzLmZhZGVJblJpcHBsZShldmVudC5wYWdlWCwgZXZlbnQucGFnZVksIHRoaXMucmlwcGxlQ29uZmlnKTtcbiAgICB9XG4gIH1cblxuICAvKiogTGlzdGVuZXIgYmVpbmcgY2FsbGVkIG9uIG1vdXNldXAgZXZlbnQuICovXG4gIHByaXZhdGUgb25Nb3VzZXVwKCkge1xuICAgIHRoaXMuX2lzTW91c2Vkb3duID0gZmFsc2U7XG5cbiAgICAvLyBGYWRlLW91dCBhbGwgcmlwcGxlcyB0aGF0IGFyZSBjb21wbGV0ZWx5IHZpc2libGUgYW5kIG5vdCBwZXJzaXN0ZW50LlxuICAgIHRoaXMuX2FjdGl2ZVJpcHBsZXMuZm9yRWFjaChyaXBwbGUgPT4ge1xuICAgICAgaWYgKCFyaXBwbGUuY29uZmlnLnBlcnNpc3RlbnQgJiYgcmlwcGxlLnN0YXRlID09PSBSaXBwbGVTdGF0ZS5WSVNJQkxFKSB7XG4gICAgICAgIHJpcHBsZS5mYWRlT3V0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogTGlzdGVuZXIgYmVpbmcgY2FsbGVkIG9uIG1vdXNlbGVhdmUgZXZlbnQuICovXG4gIHByaXZhdGUgb25Nb3VzZUxlYXZlKCkge1xuICAgIGlmICh0aGlzLl9pc01vdXNlZG93bikge1xuICAgICAgdGhpcy5vbk1vdXNldXAoKTtcbiAgICB9XG4gIH1cblxuICAvKiogUnVucyBhIHRpbWVvdXQgb3V0c2lkZSBvZiB0aGUgQW5ndWxhciB6b25lIHRvIGF2b2lkIHRyaWdnZXJpbmcgdGhlIGNoYW5nZSBkZXRlY3Rpb24uICovXG4gIHByaXZhdGUgcnVuVGltZW91dE91dHNpZGVab25lKGZuOiBGdW5jdGlvbiwgZGVsYXkgPSAwKSB7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHNldFRpbWVvdXQoZm4sIGRlbGF5KSk7XG4gIH1cblxufVxuXG4vKiogRW5mb3JjZXMgYSBzdHlsZSByZWNhbGN1bGF0aW9uIG9mIGEgRE9NIGVsZW1lbnQgYnkgY29tcHV0aW5nIGl0cyBzdHlsZXMuICovXG4vLyBUT0RPKGRldnZlcnNpb24pOiBNb3ZlIGludG8gZ2xvYmFsIHV0aWxpdHkgZnVuY3Rpb24uXG5mdW5jdGlvbiBlbmZvcmNlU3R5bGVSZWNhbGN1bGF0aW9uKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gIC8vIEVuZm9yY2UgYSBzdHlsZSByZWNhbGN1bGF0aW9uIGJ5IGNhbGxpbmcgYGdldENvbXB1dGVkU3R5bGVgIGFuZCBhY2Nlc3NpbmcgYW55IHByb3BlcnR5LlxuICAvLyBDYWxsaW5nIGBnZXRQcm9wZXJ0eVZhbHVlYCBpcyBpbXBvcnRhbnQgdG8gbGV0IG9wdGltaXplcnMga25vdyB0aGF0IHRoaXMgaXMgbm90IGEgbm9vcC5cbiAgLy8gU2VlOiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9wYXVsaXJpc2gvNWQ1MmZiMDgxYjM1NzBjODFlM2FcbiAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnb3BhY2l0eScpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGRpc3RhbmNlIGZyb20gdGhlIHBvaW50ICh4LCB5KSB0byB0aGUgZnVydGhlc3QgY29ybmVyIG9mIGEgcmVjdGFuZ2xlLlxuICovXG5mdW5jdGlvbiBkaXN0YW5jZVRvRnVydGhlc3RDb3JuZXIoeDogbnVtYmVyLCB5OiBudW1iZXIsIHJlY3Q6IENsaWVudFJlY3QpIHtcbiAgY29uc3QgZGlzdFggPSBNYXRoLm1heChNYXRoLmFicyh4IC0gcmVjdC5sZWZ0KSwgTWF0aC5hYnMoeCAtIHJlY3QucmlnaHQpKTtcbiAgY29uc3QgZGlzdFkgPSBNYXRoLm1heChNYXRoLmFicyh5IC0gcmVjdC50b3ApLCBNYXRoLmFicyh5IC0gcmVjdC5ib3R0b20pKTtcbiAgcmV0dXJuIE1hdGguc3FydChkaXN0WCAqIGRpc3RYICsgZGlzdFkgKiBkaXN0WSk7XG59XG4iXX0=