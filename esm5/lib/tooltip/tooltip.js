/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Directive, Input, ElementRef, ViewContainerRef, NgZone, Optional, Renderer2, ChangeDetectorRef, ViewEncapsulation, } from '@angular/core';
import { style, trigger, state, transition, animate, } from '@angular/animations';
import { Overlay, OverlayState, ComponentPortal, } from '../core/index';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Dir } from '../core/rtl/dir';
import { Platform } from '../core/platform/index';
import { ScrollDispatcher } from '../core/overlay/scroll/scroll-dispatcher';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
/** @typedef {?} */
var TooltipPosition;
export { TooltipPosition };
/** *
 * Time in ms to delay before changing the tooltip visibility to hidden
  @type {?} */
export var TOUCHEND_HIDE_DELAY = 1500;
/** *
 * Time in ms to throttle repositioning after scroll events.
  @type {?} */
export var SCROLL_THROTTLE_MS = 20;
/**
 * Throws an error if the user supplied an invalid tooltip position.
 * @param {?} position
 * @return {?}
 */
export function throwMd2TooltipInvalidPositionError(position) {
    throw new Error("Tooltip position \"" + position + "\" is invalid.");
}
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.google.com/components/tooltips.html
 */
var Md2Tooltip = /** @class */ (function () {
    function Md2Tooltip(_overlay, _elementRef, _scrollDispatcher, _viewContainerRef, _ngZone, _renderer, _platform, _dir) {
        var _this = this;
        this._overlay = _overlay;
        this._elementRef = _elementRef;
        this._scrollDispatcher = _scrollDispatcher;
        this._viewContainerRef = _viewContainerRef;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._platform = _platform;
        this._dir = _dir;
        this._position = 'below';
        this._disabled = false;
        /**
         * The default delay in ms before showing the tooltip after show is called
         */
        this.showDelay = 0;
        /**
         * The default delay in ms before hiding the tooltip after hide is called
         */
        this.hideDelay = 0;
        // The mouse events shouldn't be bound on iOS devices, because
        // they can prevent the first tap from firing its click event.
        if (!_platform.IOS) {
            _renderer.listen(_elementRef.nativeElement, 'mouseenter', function () { return _this.show(); });
            _renderer.listen(_elementRef.nativeElement, 'mouseleave', function () { return _this.hide(); });
        }
    }
    Object.defineProperty(Md2Tooltip.prototype, "position", {
        /** Allows the user to define the position of the tooltip relative to the parent element */
        get: /**
         * Allows the user to define the position of the tooltip relative to the parent element
         * @return {?}
         */
        function () { return this._position; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._position) {
                this._position = value;
                // TODO(andrewjs): When the overlay's position can be dynamically changed, do not destroy
                // the tooltip.
                if (this._tooltipInstance) {
                    this._disposeTooltip();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tooltip.prototype, "disabled", {
        /** Disables the display of the tooltip. */
        get: /**
         * Disables the display of the tooltip.
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
            // If tooltip is disabled, hide immediately.
            if (this._disabled) {
                this.hide(0);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tooltip.prototype, "message", {
        /** The message to be displayed in the tooltip */
        get: /**
         * The message to be displayed in the tooltip
         * @return {?}
         */
        function () { return this._message; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._message = value;
            if (this._tooltipInstance) {
                this._setTooltipMessage(this._message);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose the tooltip when destroyed.
     */
    /**
     * Dispose the tooltip when destroyed.
     * @return {?}
     */
    Md2Tooltip.prototype.ngOnDestroy = /**
     * Dispose the tooltip when destroyed.
     * @return {?}
     */
    function () {
        if (this._tooltipInstance) {
            this._disposeTooltip();
        }
    };
    /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input */
    /**
     * Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input
     * @param {?=} delay
     * @return {?}
     */
    Md2Tooltip.prototype.show = /**
     * Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input
     * @param {?=} delay
     * @return {?}
     */
    function (delay) {
        if (delay === void 0) { delay = this.showDelay; }
        if (this.disabled || !this._message || !this._message.trim()) {
            return;
        }
        if (!this._tooltipInstance) {
            this._createTooltip();
        }
        this._setTooltipMessage(this._message);
        this._tooltipInstance.show(this._position, delay);
    };
    /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input */
    /**
     * Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input
     * @param {?=} delay
     * @return {?}
     */
    Md2Tooltip.prototype.hide = /**
     * Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input
     * @param {?=} delay
     * @return {?}
     */
    function (delay) {
        if (delay === void 0) { delay = this.hideDelay; }
        if (this._tooltipInstance) {
            this._tooltipInstance.hide(delay);
        }
    };
    /** Shows/hides the tooltip */
    /**
     * Shows/hides the tooltip
     * @return {?}
     */
    Md2Tooltip.prototype.toggle = /**
     * Shows/hides the tooltip
     * @return {?}
     */
    function () {
        this._isTooltipVisible() ? this.hide() : this.show();
    };
    /** Returns true if the tooltip is currently visible to the user */
    /**
     * Returns true if the tooltip is currently visible to the user
     * @return {?}
     */
    Md2Tooltip.prototype._isTooltipVisible = /**
     * Returns true if the tooltip is currently visible to the user
     * @return {?}
     */
    function () {
        return !!this._tooltipInstance && this._tooltipInstance.isVisible();
    };
    /**
     * Create the tooltip to display
     * @return {?}
     */
    Md2Tooltip.prototype._createTooltip = /**
     * Create the tooltip to display
     * @return {?}
     */
    function () {
        var _this = this;
        this._createOverlay();
        /** @type {?} */
        var portal = new ComponentPortal(Md2TooltipComponent, this._viewContainerRef);
        this._tooltipInstance = this._overlayRef.attach(portal).instance;
        // Dispose the overlay when finished the shown tooltip.
        this._tooltipInstance.afterHidden().subscribe(function () {
            // Check first if the tooltip has already been removed through this components destroy.
            if (_this._tooltipInstance) {
                _this._disposeTooltip();
            }
        });
    };
    /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    Md2Tooltip.prototype._createOverlay = /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var origin = this._getOrigin();
        /** @type {?} */
        var position = this._getOverlayPosition();
        /** @type {?} */
        var strategy = this._overlay.position().connectedTo(this._elementRef, origin, position);
        strategy.withScrollableContainers(this._scrollDispatcher.getScrollContainers(this._elementRef));
        strategy.onPositionChange.subscribe(function (change) {
            if (change.scrollableViewProperties.isOverlayClipped &&
                _this._tooltipInstance && _this._tooltipInstance.isVisible()) {
                _this.hide(0);
            }
        });
        /** @type {?} */
        var config = new OverlayState();
        config.direction = this._dir ? this._dir.value : 'ltr';
        config.positionStrategy = strategy;
        config.scrollStrategy = this._overlay.scrollStrategies.reposition({
            scrollThrottle: SCROLL_THROTTLE_MS
        });
        this._overlayRef = this._overlay.create(config);
    };
    /**
     * Disposes the current tooltip and the overlay it is attached to
     * @return {?}
     */
    Md2Tooltip.prototype._disposeTooltip = /**
     * Disposes the current tooltip and the overlay it is attached to
     * @return {?}
     */
    function () {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._tooltipInstance = null;
    };
    /** Returns the origin position based on the user's position preference */
    /**
     * Returns the origin position based on the user's position preference
     * @return {?}
     */
    Md2Tooltip.prototype._getOrigin = /**
     * Returns the origin position based on the user's position preference
     * @return {?}
     */
    function () {
        if (this.position == 'above' || this.position == 'below') {
            return { originX: 'center', originY: this.position == 'above' ? 'top' : 'bottom' };
        }
        /** @type {?} */
        var isDirectionLtr = !this._dir || this._dir.value == 'ltr';
        if (this.position == 'left' ||
            this.position == 'before' && isDirectionLtr ||
            this.position == 'after' && !isDirectionLtr) {
            return { originX: 'start', originY: 'center' };
        }
        if (this.position == 'right' ||
            this.position == 'after' && isDirectionLtr ||
            this.position == 'before' && !isDirectionLtr) {
            return { originX: 'end', originY: 'center' };
        }
        throwMd2TooltipInvalidPositionError(this.position);
    };
    /** Returns the overlay position based on the user's preference */
    /**
     * Returns the overlay position based on the user's preference
     * @return {?}
     */
    Md2Tooltip.prototype._getOverlayPosition = /**
     * Returns the overlay position based on the user's preference
     * @return {?}
     */
    function () {
        if (this.position == 'above') {
            return { overlayX: 'center', overlayY: 'bottom' };
        }
        if (this.position == 'below') {
            return { overlayX: 'center', overlayY: 'top' };
        }
        /** @type {?} */
        var isLtr = !this._dir || this._dir.value == 'ltr';
        if (this.position == 'left' ||
            this.position == 'before' && isLtr ||
            this.position == 'after' && !isLtr) {
            return { overlayX: 'end', overlayY: 'center' };
        }
        if (this.position == 'right' ||
            this.position == 'after' && isLtr ||
            this.position == 'before' && !isLtr) {
            return { overlayX: 'start', overlayY: 'center' };
        }
        throwMd2TooltipInvalidPositionError(this.position);
    };
    /**
     * Updates the tooltip message and repositions the overlay according to the new message length
     * @param {?} message
     * @return {?}
     */
    Md2Tooltip.prototype._setTooltipMessage = /**
     * Updates the tooltip message and repositions the overlay according to the new message length
     * @param {?} message
     * @return {?}
     */
    function (message) {
        var _this = this;
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        this._tooltipInstance.message = message;
        this._tooltipInstance._markForCheck();
        this._ngZone.onMicrotaskEmpty.pipe(first()).subscribe(function () {
            if (_this._tooltipInstance) {
                _this._overlayRef.updatePosition();
            }
        });
    };
    Md2Tooltip.decorators = [
        { type: Directive, args: [{
                    selector: '[tooltip]',
                    host: {
                        '(longpress)': 'show()',
                        '(touchend)': 'hide(' + TOUCHEND_HIDE_DELAY + ')',
                    },
                    exportAs: 'md2Tooltip',
                },] }
    ];
    /** @nocollapse */
    Md2Tooltip.ctorParameters = function () { return [
        { type: Overlay },
        { type: ElementRef },
        { type: ScrollDispatcher },
        { type: ViewContainerRef },
        { type: NgZone },
        { type: Renderer2 },
        { type: Platform },
        { type: Dir, decorators: [{ type: Optional }] }
    ]; };
    Md2Tooltip.propDecorators = {
        position: [{ type: Input, args: ['tooltip-position',] }],
        disabled: [{ type: Input, args: ['tooltipDisabled',] }],
        showDelay: [{ type: Input, args: ['tooltip-delay',] }],
        hideDelay: [{ type: Input, args: ['tooltip-hide-delay',] }],
        message: [{ type: Input, args: ['tooltip',] }]
    };
    return Md2Tooltip;
}());
export { Md2Tooltip };
if (false) {
    /** @type {?} */
    Md2Tooltip.prototype._overlayRef;
    /** @type {?} */
    Md2Tooltip.prototype._tooltipInstance;
    /** @type {?} */
    Md2Tooltip.prototype._position;
    /** @type {?} */
    Md2Tooltip.prototype._disabled;
    /**
     * The default delay in ms before showing the tooltip after show is called
     * @type {?}
     */
    Md2Tooltip.prototype.showDelay;
    /**
     * The default delay in ms before hiding the tooltip after hide is called
     * @type {?}
     */
    Md2Tooltip.prototype.hideDelay;
    /** @type {?} */
    Md2Tooltip.prototype._message;
    /** @type {?} */
    Md2Tooltip.prototype._overlay;
    /** @type {?} */
    Md2Tooltip.prototype._elementRef;
    /** @type {?} */
    Md2Tooltip.prototype._scrollDispatcher;
    /** @type {?} */
    Md2Tooltip.prototype._viewContainerRef;
    /** @type {?} */
    Md2Tooltip.prototype._ngZone;
    /** @type {?} */
    Md2Tooltip.prototype._renderer;
    /** @type {?} */
    Md2Tooltip.prototype._platform;
    /** @type {?} */
    Md2Tooltip.prototype._dir;
}
/** @typedef {?} */
var TooltipVisibility;
export { TooltipVisibility };
/**
 * Internal component that wraps the tooltip's content.
 * \@docs-private
 */
var Md2TooltipComponent = /** @class */ (function () {
    function Md2TooltipComponent(_dir, _changeDetectorRef) {
        this._dir = _dir;
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * Property watched by the animation framework to show or hide the tooltip
         */
        this._visibility = 'initial';
        /**
         * Whether interactions on the page should close the tooltip
         */
        this._closeOnInteraction = false;
        /**
         * The transform origin used in the animation for showing and hiding the tooltip
         */
        this._transformOrigin = 'bottom';
        /**
         * Subject for notifying that the tooltip has been hidden from the view
         */
        this._onHide = new Subject();
    }
    /**
     * Shows the tooltip with an animation originating from the provided origin
     * @param position Position of the tooltip.
     * @param delay Amount of milliseconds to the delay showing the tooltip.
     */
    /**
     * Shows the tooltip with an animation originating from the provided origin
     * @param {?} position Position of the tooltip.
     * @param {?} delay Amount of milliseconds to the delay showing the tooltip.
     * @return {?}
     */
    Md2TooltipComponent.prototype.show = /**
     * Shows the tooltip with an animation originating from the provided origin
     * @param {?} position Position of the tooltip.
     * @param {?} delay Amount of milliseconds to the delay showing the tooltip.
     * @return {?}
     */
    function (position, delay) {
        var _this = this;
        // Cancel the delayed hide if it is scheduled
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
        // Body interactions should cancel the tooltip if there is a delay in showing.
        this._closeOnInteraction = true;
        this._setTransformOrigin(position);
        this._showTimeoutId = setTimeout(function () {
            _this._visibility = 'visible';
            // If this was set to true immediately, then a body click that triggers show() would
            // trigger interaction and close the tooltip right after it was displayed.
            // If this was set to true immediately, then a body click that triggers show() would
            // trigger interaction and close the tooltip right after it was displayed.
            _this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            _this._markForCheck();
            setTimeout(function () { return _this._closeOnInteraction = true; }, 0);
        }, delay);
    };
    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param delay Amount of milliseconds to delay showing the tooltip.
     */
    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param {?} delay Amount of milliseconds to delay showing the tooltip.
     * @return {?}
     */
    Md2TooltipComponent.prototype.hide = /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param {?} delay Amount of milliseconds to delay showing the tooltip.
     * @return {?}
     */
    function (delay) {
        var _this = this;
        // Cancel the delayed show if it is scheduled
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
        }
        this._hideTimeoutId = setTimeout(function () {
            _this._visibility = 'hidden';
            _this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            _this._markForCheck();
        }, delay);
    };
    /**
     * Returns an observable that notifies when the tooltip has been hidden from view
     */
    /**
     * Returns an observable that notifies when the tooltip has been hidden from view
     * @return {?}
     */
    Md2TooltipComponent.prototype.afterHidden = /**
     * Returns an observable that notifies when the tooltip has been hidden from view
     * @return {?}
     */
    function () {
        return this._onHide.asObservable();
    };
    /**
     * Whether the tooltip is being displayed
     */
    /**
     * Whether the tooltip is being displayed
     * @return {?}
     */
    Md2TooltipComponent.prototype.isVisible = /**
     * Whether the tooltip is being displayed
     * @return {?}
     */
    function () {
        return this._visibility === 'visible';
    };
    /** Sets the tooltip transform origin according to the tooltip position */
    /**
     * Sets the tooltip transform origin according to the tooltip position
     * @param {?} value
     * @return {?}
     */
    Md2TooltipComponent.prototype._setTransformOrigin = /**
     * Sets the tooltip transform origin according to the tooltip position
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var isLtr = !this._dir || this._dir.value == 'ltr';
        switch (value) {
            case 'before':
                this._transformOrigin = isLtr ? 'right' : 'left';
                break;
            case 'after':
                this._transformOrigin = isLtr ? 'left' : 'right';
                break;
            case 'left':
                this._transformOrigin = 'right';
                break;
            case 'right':
                this._transformOrigin = 'left';
                break;
            case 'above':
                this._transformOrigin = 'bottom';
                break;
            case 'below':
                this._transformOrigin = 'top';
                break;
            default: throwMd2TooltipInvalidPositionError(value);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    Md2TooltipComponent.prototype._afterVisibilityAnimation = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (e.toState === 'hidden' && !this.isVisible()) {
            this._onHide.next();
        }
    };
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.google.com/components/tooltips.html#tooltips-interaction
     */
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.google.com/components/tooltips.html#tooltips-interaction
     * @return {?}
     */
    Md2TooltipComponent.prototype._handleBodyInteraction = /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.google.com/components/tooltips.html#tooltips-interaction
     * @return {?}
     */
    function () {
        if (this._closeOnInteraction) {
            this.hide(0);
        }
    };
    /**
     * Marks that the tooltip needs to be checked in the next change detection run.
     * Mainly used for rendering the initial text before positioning a tooltip, which
     * can be problematic in components with OnPush change detection.
     */
    /**
     * Marks that the tooltip needs to be checked in the next change detection run.
     * Mainly used for rendering the initial text before positioning a tooltip, which
     * can be problematic in components with OnPush change detection.
     * @return {?}
     */
    Md2TooltipComponent.prototype._markForCheck = /**
     * Marks that the tooltip needs to be checked in the next change detection run.
     * Mainly used for rendering the initial text before positioning a tooltip, which
     * can be problematic in components with OnPush change detection.
     * @return {?}
     */
    function () {
        this._changeDetectorRef.markForCheck();
    };
    Md2TooltipComponent.decorators = [
        { type: Component, args: [{
                    selector: 'md2-tooltip',
                    template: "<div class=\"md2-tooltip\"\n     [style.transform-origin]=\"_transformOrigin\"\n     [@state]=\"_visibility\"\n     (@state.done)=\"_afterVisibilityAnimation($event)\"\n     [innerHTML]=\"message\">\n</div>",
                    animations: [
                        trigger('state', [
                            state('void', style({ transform: 'scale(0)' })),
                            state('initial', style({ transform: 'scale(0)' })),
                            state('visible', style({ transform: 'scale(1)' })),
                            state('hidden', style({ transform: 'scale(0)' })),
                            transition('* => visible', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
                            transition('* => hidden', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
                        ])
                    ],
                    host: {
                        '[style.zoom]': '_visibility === "visible" ? 1 : null',
                        '(body:click)': 'this._handleBodyInteraction()'
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: ["md2-tooltip{pointer-events:none}.md2-tooltip{color:#fff;padding:6px 8px;border-radius:2px;font-size:10px;margin:14px;max-width:250px;background:rgba(97,97,97,.9);word-wrap:break-word}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}"]
                }] }
    ];
    /** @nocollapse */
    Md2TooltipComponent.ctorParameters = function () { return [
        { type: Dir, decorators: [{ type: Optional }] },
        { type: ChangeDetectorRef }
    ]; };
    return Md2TooltipComponent;
}());
export { Md2TooltipComponent };
if (false) {
    /**
     * Message to display in the tooltip
     * @type {?}
     */
    Md2TooltipComponent.prototype.message;
    /**
     * The timeout ID of any current timer set to show the tooltip
     * @type {?}
     */
    Md2TooltipComponent.prototype._showTimeoutId;
    /**
     * The timeout ID of any current timer set to hide the tooltip
     * @type {?}
     */
    Md2TooltipComponent.prototype._hideTimeoutId;
    /**
     * Property watched by the animation framework to show or hide the tooltip
     * @type {?}
     */
    Md2TooltipComponent.prototype._visibility;
    /**
     * Whether interactions on the page should close the tooltip
     * @type {?}
     */
    Md2TooltipComponent.prototype._closeOnInteraction;
    /**
     * The transform origin used in the animation for showing and hiding the tooltip
     * @type {?}
     */
    Md2TooltipComponent.prototype._transformOrigin;
    /**
     * Subject for notifying that the tooltip has been hidden from the view
     * @type {?}
     */
    Md2TooltipComponent.prototype._onHide;
    /** @type {?} */
    Md2TooltipComponent.prototype._dir;
    /** @type {?} */
    Md2TooltipComponent.prototype._changeDetectorRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL3Rvb2x0aXAvdG9vbHRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIsTUFBTSxFQUNOLFFBQVEsRUFFUixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsS0FBSyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FFUixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFDTCxPQUFPLEVBQ1AsWUFBWSxFQUVaLGVBQWUsR0FHaEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM1RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7Ozs7OztBQUsxRSxXQUFhLG1CQUFtQixHQUFHLElBQUksQ0FBQzs7OztBQUd4QyxXQUFhLGtCQUFrQixHQUFHLEVBQUUsQ0FBQzs7Ozs7O0FBR3JDLE1BQU0sOENBQThDLFFBQWdCO0lBQ2xFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXFCLFFBQVEsbUJBQWUsQ0FBQyxDQUFDO0NBQy9EOzs7Ozs7OztJQW1FQyxvQkFBb0IsUUFBaUIsRUFDM0IsYUFDQSxtQkFDQSxtQkFDQSxTQUNBLFdBQ0EsV0FD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S0FDRjtJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCwyQ0FBYTs7Ozs7O0lBQWI7UUFDRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDeEM7O2dCQWxKRixTQUFTLFNBQUM7b0JBRVQsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLDBOQUEyQjtvQkFFM0IsVUFBVSxFQUFFO3dCQUNWLE9BQU8sQ0FBQyxPQUFPLEVBQUU7NEJBQ2YsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQzs0QkFDL0MsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQzs0QkFDbEQsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQzs0QkFDbEQsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQzs0QkFDakQsVUFBVSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsc0NBQXNDLENBQUMsQ0FBQzs0QkFDM0UsVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsb0NBQW9DLENBQUMsQ0FBQzt5QkFDekUsQ0FBQztxQkFDSDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osY0FBYyxFQUFFLHNDQUFzQzt3QkFDdEQsY0FBYyxFQUFFLCtCQUErQjtxQkFDaEQ7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN0Qzs7OztnQkFyUlEsR0FBRyx1QkE0U0ksUUFBUTtnQkFqVXRCLGlCQUFpQjs7OEJBVm5COztTQXFUYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIEVsZW1lbnRSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIE5nWm9uZSxcbiAgT3B0aW9uYWwsXG4gIE9uRGVzdHJveSxcbiAgUmVuZGVyZXIyLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgc3R5bGUsXG4gIHRyaWdnZXIsXG4gIHN0YXRlLFxuICB0cmFuc2l0aW9uLFxuICBhbmltYXRlLFxuICBBbmltYXRpb25FdmVudCxcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBPdmVybGF5LFxuICBPdmVybGF5U3RhdGUsXG4gIE92ZXJsYXlSZWYsXG4gIENvbXBvbmVudFBvcnRhbCxcbiAgT3ZlcmxheUNvbm5lY3Rpb25Qb3NpdGlvbixcbiAgT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uLFxufSBmcm9tICcuLi9jb3JlL2luZGV4JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGlyIH0gZnJvbSAnLi4vY29yZS9ydGwvZGlyJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi4vY29yZS9wbGF0Zm9ybS9pbmRleCc7XG5pbXBvcnQgeyBTY3JvbGxEaXNwYXRjaGVyIH0gZnJvbSAnLi4vY29yZS9vdmVybGF5L3Njcm9sbC9zY3JvbGwtZGlzcGF0Y2hlcic7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICcuLi9jb3JlL2NvZXJjaW9uL2Jvb2xlYW4tcHJvcGVydHknO1xuXG5leHBvcnQgdHlwZSBUb29sdGlwUG9zaXRpb24gPSAnbGVmdCcgfCAncmlnaHQnIHwgJ2Fib3ZlJyB8ICdiZWxvdycgfCAnYmVmb3JlJyB8ICdhZnRlcic7XG5cbi8qKiBUaW1lIGluIG1zIHRvIGRlbGF5IGJlZm9yZSBjaGFuZ2luZyB0aGUgdG9vbHRpcCB2aXNpYmlsaXR5IHRvIGhpZGRlbiAqL1xuZXhwb3J0IGNvbnN0IFRPVUNIRU5EX0hJREVfREVMQVkgPSAxNTAwO1xuXG4vKiogVGltZSBpbiBtcyB0byB0aHJvdHRsZSByZXBvc2l0aW9uaW5nIGFmdGVyIHNjcm9sbCBldmVudHMuICovXG5leHBvcnQgY29uc3QgU0NST0xMX1RIUk9UVExFX01TID0gMjA7XG5cbi8qKiBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIHVzZXIgc3VwcGxpZWQgYW4gaW52YWxpZCB0b29sdGlwIHBvc2l0aW9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93TWQyVG9vbHRpcEludmFsaWRQb3NpdGlvbkVycm9yKHBvc2l0aW9uOiBzdHJpbmcpIHtcbiAgdGhyb3cgbmV3IEVycm9yKGBUb29sdGlwIHBvc2l0aW9uIFwiJHtwb3NpdGlvbn1cIiBpcyBpbnZhbGlkLmApO1xufVxuXG4vKipcbiAqIERpcmVjdGl2ZSB0aGF0IGF0dGFjaGVzIGEgbWF0ZXJpYWwgZGVzaWduIHRvb2x0aXAgdG8gdGhlIGhvc3QgZWxlbWVudC4gQW5pbWF0ZXMgdGhlIHNob3dpbmcgYW5kXG4gKiBoaWRpbmcgb2YgYSB0b29sdGlwIHByb3ZpZGVkIHBvc2l0aW9uIChkZWZhdWx0cyB0byBiZWxvdyB0aGUgZWxlbWVudCkuXG4gKlxuICogaHR0cHM6Ly9tYXRlcmlhbC5nb29nbGUuY29tL2NvbXBvbmVudHMvdG9vbHRpcHMuaHRtbFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdG9vbHRpcF0nLFxuICBob3N0OiB7XG4gICAgJyhsb25ncHJlc3MpJzogJ3Nob3coKScsXG4gICAgJyh0b3VjaGVuZCknOiAnaGlkZSgnICsgVE9VQ0hFTkRfSElERV9ERUxBWSArICcpJyxcbiAgfSxcbiAgZXhwb3J0QXM6ICdtZDJUb29sdGlwJyxcbn0pXG5leHBvcnQgY2xhc3MgTWQyVG9vbHRpcCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIF9vdmVybGF5UmVmOiBPdmVybGF5UmVmO1xuICBfdG9vbHRpcEluc3RhbmNlOiBNZDJUb29sdGlwQ29tcG9uZW50O1xuXG4gIHByaXZhdGUgX3Bvc2l0aW9uOiBUb29sdGlwUG9zaXRpb24gPSAnYmVsb3cnO1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBBbGxvd3MgdGhlIHVzZXIgdG8gZGVmaW5lIHRoZSBwb3NpdGlvbiBvZiB0aGUgdG9vbHRpcCByZWxhdGl2ZSB0byB0aGUgcGFyZW50IGVsZW1lbnQgKi9cbiAgQElucHV0KCd0b29sdGlwLXBvc2l0aW9uJylcbiAgZ2V0IHBvc2l0aW9uKCk6IFRvb2x0aXBQb3NpdGlvbiB7IHJldHVybiB0aGlzLl9wb3NpdGlvbjsgfVxuICBzZXQgcG9zaXRpb24odmFsdWU6IFRvb2x0aXBQb3NpdGlvbikge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcG9zaXRpb24pIHtcbiAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdmFsdWU7XG5cbiAgICAgIC8vIFRPRE8oYW5kcmV3anMpOiBXaGVuIHRoZSBvdmVybGF5J3MgcG9zaXRpb24gY2FuIGJlIGR5bmFtaWNhbGx5IGNoYW5nZWQsIGRvIG5vdCBkZXN0cm95XG4gICAgICAvLyB0aGUgdG9vbHRpcC5cbiAgICAgIGlmICh0aGlzLl90b29sdGlwSW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5fZGlzcG9zZVRvb2x0aXAoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogRGlzYWJsZXMgdGhlIGRpc3BsYXkgb2YgdGhlIHRvb2x0aXAuICovXG4gIEBJbnB1dCgndG9vbHRpcERpc2FibGVkJylcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgLy8gSWYgdG9vbHRpcCBpcyBkaXNhYmxlZCwgaGlkZSBpbW1lZGlhdGVseS5cbiAgICBpZiAodGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuaGlkZSgwKTtcbiAgICB9XG4gIH1cblxuICAvKiogVGhlIGRlZmF1bHQgZGVsYXkgaW4gbXMgYmVmb3JlIHNob3dpbmcgdGhlIHRvb2x0aXAgYWZ0ZXIgc2hvdyBpcyBjYWxsZWQgKi9cbiAgQElucHV0KCd0b29sdGlwLWRlbGF5Jykgc2hvd0RlbGF5ID0gMDtcblxuICAvKiogVGhlIGRlZmF1bHQgZGVsYXkgaW4gbXMgYmVmb3JlIGhpZGluZyB0aGUgdG9vbHRpcCBhZnRlciBoaWRlIGlzIGNhbGxlZCAqL1xuICBASW5wdXQoJ3Rvb2x0aXAtaGlkZS1kZWxheScpIGhpZGVEZWxheSA9IDA7XG5cbiAgcHJpdmF0ZSBfbWVzc2FnZTogc3RyaW5nO1xuXG4gIC8qKiBUaGUgbWVzc2FnZSB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHRvb2x0aXAgKi9cbiAgQElucHV0KCd0b29sdGlwJykgZ2V0IG1lc3NhZ2UoKSB7IHJldHVybiB0aGlzLl9tZXNzYWdlOyB9XG4gIHNldCBtZXNzYWdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9tZXNzYWdlID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuX3Rvb2x0aXBJbnN0YW5jZSkge1xuICAgICAgdGhpcy5fc2V0VG9vbHRpcE1lc3NhZ2UodGhpcy5fbWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSxcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3Njcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsXG4gICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcikge1xuXG4gICAgLy8gVGhlIG1vdXNlIGV2ZW50cyBzaG91bGRuJ3QgYmUgYm91bmQgb24gaU9TIGRldmljZXMsIGJlY2F1c2VcbiAgICAvLyB0aGV5IGNhbiBwcmV2ZW50IHRoZSBmaXJzdCB0YXAgZnJvbSBmaXJpbmcgaXRzIGNsaWNrIGV2ZW50LlxuICAgIGlmICghX3BsYXRmb3JtLklPUykge1xuICAgICAgX3JlbmRlcmVyLmxpc3RlbihfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbW91c2VlbnRlcicsICgpID0+IHRoaXMuc2hvdygpKTtcbiAgICAgIF9yZW5kZXJlci5saXN0ZW4oX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21vdXNlbGVhdmUnLCAoKSA9PiB0aGlzLmhpZGUoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIHRvb2x0aXAgd2hlbiBkZXN0cm95ZWQuXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fdG9vbHRpcEluc3RhbmNlKSB7XG4gICAgICB0aGlzLl9kaXNwb3NlVG9vbHRpcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTaG93cyB0aGUgdG9vbHRpcCBhZnRlciB0aGUgZGVsYXkgaW4gbXMsIGRlZmF1bHRzIHRvIHRvb2x0aXAtZGVsYXktc2hvdyBvciAwbXMgaWYgbm8gaW5wdXQgKi9cbiAgc2hvdyhkZWxheTogbnVtYmVyID0gdGhpcy5zaG93RGVsYXkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAhdGhpcy5fbWVzc2FnZSB8fCAhdGhpcy5fbWVzc2FnZS50cmltKCkpIHsgcmV0dXJuOyB9XG5cbiAgICBpZiAoIXRoaXMuX3Rvb2x0aXBJbnN0YW5jZSkge1xuICAgICAgdGhpcy5fY3JlYXRlVG9vbHRpcCgpO1xuICAgIH1cblxuICAgIHRoaXMuX3NldFRvb2x0aXBNZXNzYWdlKHRoaXMuX21lc3NhZ2UpO1xuICAgIHRoaXMuX3Rvb2x0aXBJbnN0YW5jZS5zaG93KHRoaXMuX3Bvc2l0aW9uLCBkZWxheSk7XG4gIH1cblxuICAvKiogSGlkZXMgdGhlIHRvb2x0aXAgYWZ0ZXIgdGhlIGRlbGF5IGluIG1zLCBkZWZhdWx0cyB0byB0b29sdGlwLWRlbGF5LWhpZGUgb3IgMG1zIGlmIG5vIGlucHV0ICovXG4gIGhpZGUoZGVsYXk6IG51bWJlciA9IHRoaXMuaGlkZURlbGF5KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3Rvb2x0aXBJbnN0YW5jZSkge1xuICAgICAgdGhpcy5fdG9vbHRpcEluc3RhbmNlLmhpZGUoZGVsYXkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTaG93cy9oaWRlcyB0aGUgdG9vbHRpcCAqL1xuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5faXNUb29sdGlwVmlzaWJsZSgpID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRydWUgaWYgdGhlIHRvb2x0aXAgaXMgY3VycmVudGx5IHZpc2libGUgdG8gdGhlIHVzZXIgKi9cbiAgX2lzVG9vbHRpcFZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5fdG9vbHRpcEluc3RhbmNlICYmIHRoaXMuX3Rvb2x0aXBJbnN0YW5jZS5pc1Zpc2libGUoKTtcbiAgfVxuXG4gIC8qKiBDcmVhdGUgdGhlIHRvb2x0aXAgdG8gZGlzcGxheSAqL1xuICBwcml2YXRlIF9jcmVhdGVUb29sdGlwKCk6IHZvaWQge1xuICAgIHRoaXMuX2NyZWF0ZU92ZXJsYXkoKTtcbiAgICBsZXQgcG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChNZDJUb29sdGlwQ29tcG9uZW50LCB0aGlzLl92aWV3Q29udGFpbmVyUmVmKTtcbiAgICB0aGlzLl90b29sdGlwSW5zdGFuY2UgPSB0aGlzLl9vdmVybGF5UmVmLmF0dGFjaChwb3J0YWwpLmluc3RhbmNlO1xuXG4gICAgLy8gRGlzcG9zZSB0aGUgb3ZlcmxheSB3aGVuIGZpbmlzaGVkIHRoZSBzaG93biB0b29sdGlwLlxuICAgIHRoaXMuX3Rvb2x0aXBJbnN0YW5jZS5hZnRlckhpZGRlbigpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAvLyBDaGVjayBmaXJzdCBpZiB0aGUgdG9vbHRpcCBoYXMgYWxyZWFkeSBiZWVuIHJlbW92ZWQgdGhyb3VnaCB0aGlzIGNvbXBvbmVudHMgZGVzdHJveS5cbiAgICAgIGlmICh0aGlzLl90b29sdGlwSW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5fZGlzcG9zZVRvb2x0aXAoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBDcmVhdGUgdGhlIG92ZXJsYXkgY29uZmlnIGFuZCBwb3NpdGlvbiBzdHJhdGVneSAqL1xuICBwcml2YXRlIF9jcmVhdGVPdmVybGF5KCk6IHZvaWQge1xuICAgIGxldCBvcmlnaW4gPSB0aGlzLl9nZXRPcmlnaW4oKTtcbiAgICBsZXQgcG9zaXRpb24gPSB0aGlzLl9nZXRPdmVybGF5UG9zaXRpb24oKTtcblxuICAgIC8vIENyZWF0ZSBjb25uZWN0ZWQgcG9zaXRpb24gc3RyYXRlZ3kgdGhhdCBsaXN0ZW5zIGZvciBzY3JvbGwgZXZlbnRzIHRvIHJlcG9zaXRpb24uXG4gICAgLy8gQWZ0ZXIgcG9zaXRpb24gY2hhbmdlcyBvY2N1ciBhbmQgdGhlIG92ZXJsYXkgaXMgY2xpcHBlZCBieSBhIHBhcmVudCBzY3JvbGxhYmxlIHRoZW5cbiAgICAvLyBjbG9zZSB0aGUgdG9vbHRpcC5cbiAgICBsZXQgc3RyYXRlZ3kgPSB0aGlzLl9vdmVybGF5LnBvc2l0aW9uKCkuY29ubmVjdGVkVG8odGhpcy5fZWxlbWVudFJlZiwgb3JpZ2luLCBwb3NpdGlvbik7XG4gICAgc3RyYXRlZ3kud2l0aFNjcm9sbGFibGVDb250YWluZXJzKHRoaXMuX3Njcm9sbERpc3BhdGNoZXIuZ2V0U2Nyb2xsQ29udGFpbmVycyh0aGlzLl9lbGVtZW50UmVmKSk7XG4gICAgc3RyYXRlZ3kub25Qb3NpdGlvbkNoYW5nZS5zdWJzY3JpYmUoKGNoYW5nZTogYW55KSA9PiB7XG4gICAgICBpZiAoY2hhbmdlLnNjcm9sbGFibGVWaWV3UHJvcGVydGllcy5pc092ZXJsYXlDbGlwcGVkICYmXG4gICAgICAgIHRoaXMuX3Rvb2x0aXBJbnN0YW5jZSAmJiB0aGlzLl90b29sdGlwSW5zdGFuY2UuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgdGhpcy5oaWRlKDApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IGNvbmZpZyA9IG5ldyBPdmVybGF5U3RhdGUoKTtcblxuICAgIGNvbmZpZy5kaXJlY3Rpb24gPSB0aGlzLl9kaXIgPyB0aGlzLl9kaXIudmFsdWUgOiAnbHRyJztcbiAgICBjb25maWcucG9zaXRpb25TdHJhdGVneSA9IHN0cmF0ZWd5O1xuICAgIGNvbmZpZy5zY3JvbGxTdHJhdGVneSA9IHRoaXMuX292ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKHtcbiAgICAgIHNjcm9sbFRocm90dGxlOiBTQ1JPTExfVEhST1RUTEVfTVNcbiAgICB9KTtcblxuICAgIHRoaXMuX292ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZShjb25maWcpO1xuICB9XG5cbiAgLyoqIERpc3Bvc2VzIHRoZSBjdXJyZW50IHRvb2x0aXAgYW5kIHRoZSBvdmVybGF5IGl0IGlzIGF0dGFjaGVkIHRvICovXG4gIHByaXZhdGUgX2Rpc3Bvc2VUb29sdGlwKCk6IHZvaWQge1xuICAgIHRoaXMuX292ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgIHRoaXMuX292ZXJsYXlSZWYgPSBudWxsO1xuICAgIHRoaXMuX3Rvb2x0aXBJbnN0YW5jZSA9IG51bGw7XG4gIH1cblxuICAvKiogUmV0dXJucyB0aGUgb3JpZ2luIHBvc2l0aW9uIGJhc2VkIG9uIHRoZSB1c2VyJ3MgcG9zaXRpb24gcHJlZmVyZW5jZSAqL1xuICBfZ2V0T3JpZ2luKCk6IE9yaWdpbkNvbm5lY3Rpb25Qb3NpdGlvbiB7XG4gICAgaWYgKHRoaXMucG9zaXRpb24gPT0gJ2Fib3ZlJyB8fCB0aGlzLnBvc2l0aW9uID09ICdiZWxvdycpIHtcbiAgICAgIHJldHVybiB7IG9yaWdpblg6ICdjZW50ZXInLCBvcmlnaW5ZOiB0aGlzLnBvc2l0aW9uID09ICdhYm92ZScgPyAndG9wJyA6ICdib3R0b20nIH07XG4gICAgfVxuXG4gICAgY29uc3QgaXNEaXJlY3Rpb25MdHIgPSAhdGhpcy5fZGlyIHx8IHRoaXMuX2Rpci52YWx1ZSA9PSAnbHRyJztcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA9PSAnbGVmdCcgfHxcbiAgICAgIHRoaXMucG9zaXRpb24gPT0gJ2JlZm9yZScgJiYgaXNEaXJlY3Rpb25MdHIgfHxcbiAgICAgIHRoaXMucG9zaXRpb24gPT0gJ2FmdGVyJyAmJiAhaXNEaXJlY3Rpb25MdHIpIHtcbiAgICAgIHJldHVybiB7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdjZW50ZXInIH07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPT0gJ3JpZ2h0JyB8fFxuICAgICAgdGhpcy5wb3NpdGlvbiA9PSAnYWZ0ZXInICYmIGlzRGlyZWN0aW9uTHRyIHx8XG4gICAgICB0aGlzLnBvc2l0aW9uID09ICdiZWZvcmUnICYmICFpc0RpcmVjdGlvbkx0cikge1xuICAgICAgcmV0dXJuIHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICdjZW50ZXInIH07XG4gICAgfVxuXG4gICAgdGhyb3dNZDJUb29sdGlwSW52YWxpZFBvc2l0aW9uRXJyb3IodGhpcy5wb3NpdGlvbik7XG4gIH1cblxuICAvKiogUmV0dXJucyB0aGUgb3ZlcmxheSBwb3NpdGlvbiBiYXNlZCBvbiB0aGUgdXNlcidzIHByZWZlcmVuY2UgKi9cbiAgX2dldE92ZXJsYXlQb3NpdGlvbigpOiBPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uIHtcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA9PSAnYWJvdmUnKSB7XG4gICAgICByZXR1cm4geyBvdmVybGF5WDogJ2NlbnRlcicsIG92ZXJsYXlZOiAnYm90dG9tJyB9O1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBvc2l0aW9uID09ICdiZWxvdycpIHtcbiAgICAgIHJldHVybiB7IG92ZXJsYXlYOiAnY2VudGVyJywgb3ZlcmxheVk6ICd0b3AnIH07XG4gICAgfVxuXG4gICAgY29uc3QgaXNMdHIgPSAhdGhpcy5fZGlyIHx8IHRoaXMuX2Rpci52YWx1ZSA9PSAnbHRyJztcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA9PSAnbGVmdCcgfHxcbiAgICAgIHRoaXMucG9zaXRpb24gPT0gJ2JlZm9yZScgJiYgaXNMdHIgfHxcbiAgICAgIHRoaXMucG9zaXRpb24gPT0gJ2FmdGVyJyAmJiAhaXNMdHIpIHtcbiAgICAgIHJldHVybiB7IG92ZXJsYXlYOiAnZW5kJywgb3ZlcmxheVk6ICdjZW50ZXInIH07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPT0gJ3JpZ2h0JyB8fFxuICAgICAgdGhpcy5wb3NpdGlvbiA9PSAnYWZ0ZXInICYmIGlzTHRyIHx8XG4gICAgICB0aGlzLnBvc2l0aW9uID09ICdiZWZvcmUnICYmICFpc0x0cikge1xuICAgICAgcmV0dXJuIHsgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAnY2VudGVyJyB9O1xuICAgIH1cblxuICAgIHRocm93TWQyVG9vbHRpcEludmFsaWRQb3NpdGlvbkVycm9yKHRoaXMucG9zaXRpb24pO1xuICB9XG5cbiAgLyoqIFVwZGF0ZXMgdGhlIHRvb2x0aXAgbWVzc2FnZSBhbmQgcmVwb3NpdGlvbnMgdGhlIG92ZXJsYXkgYWNjb3JkaW5nIHRvIHRoZSBuZXcgbWVzc2FnZSBsZW5ndGggKi9cbiAgcHJpdmF0ZSBfc2V0VG9vbHRpcE1lc3NhZ2UobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgLy8gTXVzdCB3YWl0IGZvciB0aGUgbWVzc2FnZSB0byBiZSBwYWludGVkIHRvIHRoZSB0b29sdGlwIHNvIHRoYXQgdGhlIG92ZXJsYXkgY2FuIHByb3Blcmx5XG4gICAgLy8gY2FsY3VsYXRlIHRoZSBjb3JyZWN0IHBvc2l0aW9uaW5nIGJhc2VkIG9uIHRoZSBzaXplIG9mIHRoZSB0ZXh0LlxuICAgIHRoaXMuX3Rvb2x0aXBJbnN0YW5jZS5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLl90b29sdGlwSW5zdGFuY2UuX21hcmtGb3JDaGVjaygpO1xuXG4gICAgdGhpcy5fbmdab25lLm9uTWljcm90YXNrRW1wdHkucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLl9vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgVG9vbHRpcFZpc2liaWxpdHkgPSAnaW5pdGlhbCcgfCAndmlzaWJsZScgfCAnaGlkZGVuJztcblxuLyoqXG4gKiBJbnRlcm5hbCBjb21wb25lbnQgdGhhdCB3cmFwcyB0aGUgdG9vbHRpcCdzIGNvbnRlbnQuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBcbiAgc2VsZWN0b3I6ICdtZDItdG9vbHRpcCcsXG4gIHRlbXBsYXRlVXJsOiAndG9vbHRpcC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3Rvb2x0aXAuc2NzcyddLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignc3RhdGUnLCBbXG4gICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUoMCknIH0pKSxcbiAgICAgIHN0YXRlKCdpbml0aWFsJywgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZSgwKScgfSkpLFxuICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDEpJyB9KSksXG4gICAgICBzdGF0ZSgnaGlkZGVuJywgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZSgwKScgfSkpLFxuICAgICAgdHJhbnNpdGlvbignKiA9PiB2aXNpYmxlJywgYW5pbWF0ZSgnMTUwbXMgY3ViaWMtYmV6aWVyKDAuMCwgMC4wLCAwLjIsIDEpJykpLFxuICAgICAgdHJhbnNpdGlvbignKiA9PiBoaWRkZW4nLCBhbmltYXRlKCcxNTBtcyBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDEsIDEpJykpLFxuICAgIF0pXG4gIF0sXG4gIGhvc3Q6IHtcbiAgICAnW3N0eWxlLnpvb21dJzogJ192aXNpYmlsaXR5ID09PSBcInZpc2libGVcIiA/IDEgOiBudWxsJyxcbiAgICAnKGJvZHk6Y2xpY2spJzogJ3RoaXMuX2hhbmRsZUJvZHlJbnRlcmFjdGlvbigpJ1xuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1kMlRvb2x0aXBDb21wb25lbnQge1xuICAvKiogTWVzc2FnZSB0byBkaXNwbGF5IGluIHRoZSB0b29sdGlwICovXG4gIG1lc3NhZ2U6IHN0cmluZztcblxuICAvKiogVGhlIHRpbWVvdXQgSUQgb2YgYW55IGN1cnJlbnQgdGltZXIgc2V0IHRvIHNob3cgdGhlIHRvb2x0aXAgKi9cbiAgX3Nob3dUaW1lb3V0SWQ6IG51bWJlcjtcblxuICAvKiogVGhlIHRpbWVvdXQgSUQgb2YgYW55IGN1cnJlbnQgdGltZXIgc2V0IHRvIGhpZGUgdGhlIHRvb2x0aXAgKi9cbiAgX2hpZGVUaW1lb3V0SWQ6IG51bWJlcjtcblxuICAvKiogUHJvcGVydHkgd2F0Y2hlZCBieSB0aGUgYW5pbWF0aW9uIGZyYW1ld29yayB0byBzaG93IG9yIGhpZGUgdGhlIHRvb2x0aXAgKi9cbiAgX3Zpc2liaWxpdHk6IFRvb2x0aXBWaXNpYmlsaXR5ID0gJ2luaXRpYWwnO1xuXG4gIC8qKiBXaGV0aGVyIGludGVyYWN0aW9ucyBvbiB0aGUgcGFnZSBzaG91bGQgY2xvc2UgdGhlIHRvb2x0aXAgKi9cbiAgX2Nsb3NlT25JbnRlcmFjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgdHJhbnNmb3JtIG9yaWdpbiB1c2VkIGluIHRoZSBhbmltYXRpb24gZm9yIHNob3dpbmcgYW5kIGhpZGluZyB0aGUgdG9vbHRpcCAqL1xuICBfdHJhbnNmb3JtT3JpZ2luOiBzdHJpbmcgPSAnYm90dG9tJztcblxuICAvKiogU3ViamVjdCBmb3Igbm90aWZ5aW5nIHRoYXQgdGhlIHRvb2x0aXAgaGFzIGJlZW4gaGlkZGVuIGZyb20gdGhlIHZpZXcgKi9cbiAgcHJpdmF0ZSBfb25IaWRlOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKCBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpciwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIHRvb2x0aXAgd2l0aCBhbiBhbmltYXRpb24gb3JpZ2luYXRpbmcgZnJvbSB0aGUgcHJvdmlkZWQgb3JpZ2luXG4gICAqIEBwYXJhbSBwb3NpdGlvbiBQb3NpdGlvbiBvZiB0aGUgdG9vbHRpcC5cbiAgICogQHBhcmFtIGRlbGF5IEFtb3VudCBvZiBtaWxsaXNlY29uZHMgdG8gdGhlIGRlbGF5IHNob3dpbmcgdGhlIHRvb2x0aXAuXG4gICAqL1xuICBzaG93KHBvc2l0aW9uOiBUb29sdGlwUG9zaXRpb24sIGRlbGF5OiBudW1iZXIpOiB2b2lkIHtcbiAgICAvLyBDYW5jZWwgdGhlIGRlbGF5ZWQgaGlkZSBpZiBpdCBpcyBzY2hlZHVsZWRcbiAgICBpZiAodGhpcy5faGlkZVRpbWVvdXRJZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2hpZGVUaW1lb3V0SWQpO1xuICAgIH1cblxuICAgIC8vIEJvZHkgaW50ZXJhY3Rpb25zIHNob3VsZCBjYW5jZWwgdGhlIHRvb2x0aXAgaWYgdGhlcmUgaXMgYSBkZWxheSBpbiBzaG93aW5nLlxuICAgIHRoaXMuX2Nsb3NlT25JbnRlcmFjdGlvbiA9IHRydWU7XG5cbiAgICB0aGlzLl9zZXRUcmFuc2Zvcm1PcmlnaW4ocG9zaXRpb24pO1xuICAgIHRoaXMuX3Nob3dUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX3Zpc2liaWxpdHkgPSAndmlzaWJsZSc7XG5cbiAgICAgIC8vIElmIHRoaXMgd2FzIHNldCB0byB0cnVlIGltbWVkaWF0ZWx5LCB0aGVuIGEgYm9keSBjbGljayB0aGF0IHRyaWdnZXJzIHNob3coKSB3b3VsZFxuICAgICAgLy8gdHJpZ2dlciBpbnRlcmFjdGlvbiBhbmQgY2xvc2UgdGhlIHRvb2x0aXAgcmlnaHQgYWZ0ZXIgaXQgd2FzIGRpc3BsYXllZC5cbiAgICAgIHRoaXMuX2Nsb3NlT25JbnRlcmFjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAvLyBNYXJrIGZvciBjaGVjayBzbyBpZiBhbnkgcGFyZW50IGNvbXBvbmVudCBoYXMgc2V0IHRoZVxuICAgICAgLy8gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgdG8gT25QdXNoIGl0IHdpbGwgYmUgY2hlY2tlZCBhbnl3YXlzXG4gICAgICB0aGlzLl9tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fY2xvc2VPbkludGVyYWN0aW9uID0gdHJ1ZSwgMCk7XG4gICAgfSwgZGVsYXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJlZ2lucyB0aGUgYW5pbWF0aW9uIHRvIGhpZGUgdGhlIHRvb2x0aXAgYWZ0ZXIgdGhlIHByb3ZpZGVkIGRlbGF5IGluIG1zLlxuICAgKiBAcGFyYW0gZGVsYXkgQW1vdW50IG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheSBzaG93aW5nIHRoZSB0b29sdGlwLlxuICAgKi9cbiAgaGlkZShkZWxheTogbnVtYmVyKTogdm9pZCB7XG4gICAgLy8gQ2FuY2VsIHRoZSBkZWxheWVkIHNob3cgaWYgaXQgaXMgc2NoZWR1bGVkXG4gICAgaWYgKHRoaXMuX3Nob3dUaW1lb3V0SWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zaG93VGltZW91dElkKTtcbiAgICB9XG5cbiAgICB0aGlzLl9oaWRlVGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl92aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICB0aGlzLl9jbG9zZU9uSW50ZXJhY3Rpb24gPSBmYWxzZTtcblxuICAgICAgLy8gTWFyayBmb3IgY2hlY2sgc28gaWYgYW55IHBhcmVudCBjb21wb25lbnQgaGFzIHNldCB0aGVcbiAgICAgIC8vIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IHRvIE9uUHVzaCBpdCB3aWxsIGJlIGNoZWNrZWQgYW55d2F5c1xuICAgICAgdGhpcy5fbWFya0ZvckNoZWNrKCk7XG4gICAgfSwgZGVsYXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JzZXJ2YWJsZSB0aGF0IG5vdGlmaWVzIHdoZW4gdGhlIHRvb2x0aXAgaGFzIGJlZW4gaGlkZGVuIGZyb20gdmlld1xuICAgKi9cbiAgYWZ0ZXJIaWRkZW4oKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX29uSGlkZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSB0b29sdGlwIGlzIGJlaW5nIGRpc3BsYXllZFxuICAgKi9cbiAgaXNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92aXNpYmlsaXR5ID09PSAndmlzaWJsZSc7XG4gIH1cblxuICAvKiogU2V0cyB0aGUgdG9vbHRpcCB0cmFuc2Zvcm0gb3JpZ2luIGFjY29yZGluZyB0byB0aGUgdG9vbHRpcCBwb3NpdGlvbiAqL1xuICBfc2V0VHJhbnNmb3JtT3JpZ2luKHZhbHVlOiBUb29sdGlwUG9zaXRpb24pIHtcbiAgICBjb25zdCBpc0x0ciA9ICF0aGlzLl9kaXIgfHwgdGhpcy5fZGlyLnZhbHVlID09ICdsdHInO1xuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgIGNhc2UgJ2JlZm9yZSc6IHRoaXMuX3RyYW5zZm9ybU9yaWdpbiA9IGlzTHRyID8gJ3JpZ2h0JyA6ICdsZWZ0JzsgYnJlYWs7XG4gICAgICBjYXNlICdhZnRlcic6IHRoaXMuX3RyYW5zZm9ybU9yaWdpbiA9IGlzTHRyID8gJ2xlZnQnIDogJ3JpZ2h0JzsgYnJlYWs7XG4gICAgICBjYXNlICdsZWZ0JzogdGhpcy5fdHJhbnNmb3JtT3JpZ2luID0gJ3JpZ2h0JzsgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6IHRoaXMuX3RyYW5zZm9ybU9yaWdpbiA9ICdsZWZ0JzsgYnJlYWs7XG4gICAgICBjYXNlICdhYm92ZSc6IHRoaXMuX3RyYW5zZm9ybU9yaWdpbiA9ICdib3R0b20nOyBicmVhaztcbiAgICAgIGNhc2UgJ2JlbG93JzogdGhpcy5fdHJhbnNmb3JtT3JpZ2luID0gJ3RvcCc7IGJyZWFrO1xuICAgICAgZGVmYXVsdDogdGhyb3dNZDJUb29sdGlwSW52YWxpZFBvc2l0aW9uRXJyb3IodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIF9hZnRlclZpc2liaWxpdHlBbmltYXRpb24oZTogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZS50b1N0YXRlID09PSAnaGlkZGVuJyAmJiAhdGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgdGhpcy5fb25IaWRlLm5leHQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJhY3Rpb25zIG9uIHRoZSBIVE1MIGJvZHkgc2hvdWxkIGNsb3NlIHRoZSB0b29sdGlwIGltbWVkaWF0ZWx5IGFzIGRlZmluZWQgaW4gdGhlXG4gICAqIG1hdGVyaWFsIGRlc2lnbiBzcGVjLlxuICAgKiBodHRwczovL21hdGVyaWFsLmdvb2dsZS5jb20vY29tcG9uZW50cy90b29sdGlwcy5odG1sI3Rvb2x0aXBzLWludGVyYWN0aW9uXG4gICAqL1xuICBfaGFuZGxlQm9keUludGVyYWN0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jbG9zZU9uSW50ZXJhY3Rpb24pIHtcbiAgICAgIHRoaXMuaGlkZSgwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWFya3MgdGhhdCB0aGUgdG9vbHRpcCBuZWVkcyB0byBiZSBjaGVja2VkIGluIHRoZSBuZXh0IGNoYW5nZSBkZXRlY3Rpb24gcnVuLlxuICAgKiBNYWlubHkgdXNlZCBmb3IgcmVuZGVyaW5nIHRoZSBpbml0aWFsIHRleHQgYmVmb3JlIHBvc2l0aW9uaW5nIGEgdG9vbHRpcCwgd2hpY2hcbiAgICogY2FuIGJlIHByb2JsZW1hdGljIGluIGNvbXBvbmVudHMgd2l0aCBPblB1c2ggY2hhbmdlIGRldGVjdGlvbi5cbiAgICovXG4gIF9tYXJrRm9yQ2hlY2soKTogdm9pZCB7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==