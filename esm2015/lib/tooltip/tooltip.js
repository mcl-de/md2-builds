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
export const TOUCHEND_HIDE_DELAY = 1500;
/** *
 * Time in ms to throttle repositioning after scroll events.
  @type {?} */
export const SCROLL_THROTTLE_MS = 20;
/**
 * Throws an error if the user supplied an invalid tooltip position.
 * @param {?} position
 * @return {?}
 */
export function throwMd2TooltipInvalidPositionError(position) {
    throw new Error(`Tooltip position "${position}" is invalid.`);
}
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.google.com/components/tooltips.html
 */
export class Md2Tooltip {
    /**
     * @param {?} _overlay
     * @param {?} _elementRef
     * @param {?} _scrollDispatcher
     * @param {?} _viewContainerRef
     * @param {?} _ngZone
     * @param {?} _renderer
     * @param {?} _platform
     * @param {?} _dir
     */
    constructor(_overlay, _elementRef, _scrollDispatcher, _viewContainerRef, _ngZone, _renderer, _platform, _dir) {
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
            _renderer.listen(_elementRef.nativeElement, 'mouseenter', () => this.show());
            _renderer.listen(_elementRef.nativeElement, 'mouseleave', () => this.hide());
        }
    }
    /**
     * Allows the user to define the position of the tooltip relative to the parent element
     * @return {?}
     */
    get position() { return this._position; }
    /**
     * @param {?} value
     * @return {?}
     */
    set position(value) {
        if (value !== this._position) {
            this._position = value;
            // TODO(andrewjs): When the overlay's position can be dynamically changed, do not destroy
            // the tooltip.
            if (this._tooltipInstance) {
                this._disposeTooltip();
            }
        }
    }
    /**
     * Disables the display of the tooltip.
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        // If tooltip is disabled, hide immediately.
        if (this._disabled) {
            this.hide(0);
        }
    }
    /**
     * The message to be displayed in the tooltip
     * @return {?}
     */
    get message() { return this._message; }
    /**
     * @param {?} value
     * @return {?}
     */
    set message(value) {
        this._message = value;
        if (this._tooltipInstance) {
            this._setTooltipMessage(this._message);
        }
    }
    /**
     * Dispose the tooltip when destroyed.
     * @return {?}
     */
    ngOnDestroy() {
        if (this._tooltipInstance) {
            this._disposeTooltip();
        }
    }
    /**
     * Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input
     * @param {?=} delay
     * @return {?}
     */
    show(delay = this.showDelay) {
        if (this.disabled || !this._message || !this._message.trim()) {
            return;
        }
        if (!this._tooltipInstance) {
            this._createTooltip();
        }
        this._setTooltipMessage(this._message);
        this._tooltipInstance.show(this._position, delay);
    }
    /**
     * Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input
     * @param {?=} delay
     * @return {?}
     */
    hide(delay = this.hideDelay) {
        if (this._tooltipInstance) {
            this._tooltipInstance.hide(delay);
        }
    }
    /**
     * Shows/hides the tooltip
     * @return {?}
     */
    toggle() {
        this._isTooltipVisible() ? this.hide() : this.show();
    }
    /**
     * Returns true if the tooltip is currently visible to the user
     * @return {?}
     */
    _isTooltipVisible() {
        return !!this._tooltipInstance && this._tooltipInstance.isVisible();
    }
    /**
     * Create the tooltip to display
     * @return {?}
     */
    _createTooltip() {
        this._createOverlay();
        /** @type {?} */
        let portal = new ComponentPortal(Md2TooltipComponent, this._viewContainerRef);
        this._tooltipInstance = this._overlayRef.attach(portal).instance;
        // Dispose the overlay when finished the shown tooltip.
        this._tooltipInstance.afterHidden().subscribe(() => {
            // Check first if the tooltip has already been removed through this components destroy.
            if (this._tooltipInstance) {
                this._disposeTooltip();
            }
        });
    }
    /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    _createOverlay() {
        /** @type {?} */
        let origin = this._getOrigin();
        /** @type {?} */
        let position = this._getOverlayPosition();
        /** @type {?} */
        let strategy = this._overlay.position().connectedTo(this._elementRef, origin, position);
        strategy.withScrollableContainers(this._scrollDispatcher.getScrollContainers(this._elementRef));
        strategy.onPositionChange.subscribe((change) => {
            if (change.scrollableViewProperties.isOverlayClipped &&
                this._tooltipInstance && this._tooltipInstance.isVisible()) {
                this.hide(0);
            }
        });
        /** @type {?} */
        let config = new OverlayState();
        config.direction = this._dir ? this._dir.value : 'ltr';
        config.positionStrategy = strategy;
        config.scrollStrategy = this._overlay.scrollStrategies.reposition({
            scrollThrottle: SCROLL_THROTTLE_MS
        });
        this._overlayRef = this._overlay.create(config);
    }
    /**
     * Disposes the current tooltip and the overlay it is attached to
     * @return {?}
     */
    _disposeTooltip() {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._tooltipInstance = null;
    }
    /**
     * Returns the origin position based on the user's position preference
     * @return {?}
     */
    _getOrigin() {
        if (this.position == 'above' || this.position == 'below') {
            return { originX: 'center', originY: this.position == 'above' ? 'top' : 'bottom' };
        }
        /** @type {?} */
        const isDirectionLtr = !this._dir || this._dir.value == 'ltr';
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
    }
    /**
     * Returns the overlay position based on the user's preference
     * @return {?}
     */
    _getOverlayPosition() {
        if (this.position == 'above') {
            return { overlayX: 'center', overlayY: 'bottom' };
        }
        if (this.position == 'below') {
            return { overlayX: 'center', overlayY: 'top' };
        }
        /** @type {?} */
        const isLtr = !this._dir || this._dir.value == 'ltr';
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
    }
    /**
     * Updates the tooltip message and repositions the overlay according to the new message length
     * @param {?} message
     * @return {?}
     */
    _setTooltipMessage(message) {
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        this._tooltipInstance.message = message;
        this._tooltipInstance._markForCheck();
        this._ngZone.onMicrotaskEmpty.pipe(first()).subscribe(() => {
            if (this._tooltipInstance) {
                this._overlayRef.updatePosition();
            }
        });
    }
}
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
Md2Tooltip.ctorParameters = () => [
    { type: Overlay },
    { type: ElementRef },
    { type: ScrollDispatcher },
    { type: ViewContainerRef },
    { type: NgZone },
    { type: Renderer2 },
    { type: Platform },
    { type: Dir, decorators: [{ type: Optional }] }
];
Md2Tooltip.propDecorators = {
    position: [{ type: Input, args: ['tooltip-position',] }],
    disabled: [{ type: Input, args: ['tooltipDisabled',] }],
    showDelay: [{ type: Input, args: ['tooltip-delay',] }],
    hideDelay: [{ type: Input, args: ['tooltip-hide-delay',] }],
    message: [{ type: Input, args: ['tooltip',] }]
};
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
export class Md2TooltipComponent {
    /**
     * @param {?} _dir
     * @param {?} _changeDetectorRef
     */
    constructor(_dir, _changeDetectorRef) {
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
     * @param {?} position Position of the tooltip.
     * @param {?} delay Amount of milliseconds to the delay showing the tooltip.
     * @return {?}
     */
    show(position, delay) {
        // Cancel the delayed hide if it is scheduled
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
        // Body interactions should cancel the tooltip if there is a delay in showing.
        this._closeOnInteraction = true;
        this._setTransformOrigin(position);
        this._showTimeoutId = setTimeout(() => {
            this._visibility = 'visible';
            // If this was set to true immediately, then a body click that triggers show() would
            // trigger interaction and close the tooltip right after it was displayed.
            this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this._markForCheck();
            setTimeout(() => this._closeOnInteraction = true, 0);
        }, delay);
    }
    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param {?} delay Amount of milliseconds to delay showing the tooltip.
     * @return {?}
     */
    hide(delay) {
        // Cancel the delayed show if it is scheduled
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
        }
        this._hideTimeoutId = setTimeout(() => {
            this._visibility = 'hidden';
            this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this._markForCheck();
        }, delay);
    }
    /**
     * Returns an observable that notifies when the tooltip has been hidden from view
     * @return {?}
     */
    afterHidden() {
        return this._onHide.asObservable();
    }
    /**
     * Whether the tooltip is being displayed
     * @return {?}
     */
    isVisible() {
        return this._visibility === 'visible';
    }
    /**
     * Sets the tooltip transform origin according to the tooltip position
     * @param {?} value
     * @return {?}
     */
    _setTransformOrigin(value) {
        /** @type {?} */
        const isLtr = !this._dir || this._dir.value == 'ltr';
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
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _afterVisibilityAnimation(e) {
        if (e.toState === 'hidden' && !this.isVisible()) {
            this._onHide.next();
        }
    }
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.google.com/components/tooltips.html#tooltips-interaction
     * @return {?}
     */
    _handleBodyInteraction() {
        if (this._closeOnInteraction) {
            this.hide(0);
        }
    }
    /**
     * Marks that the tooltip needs to be checked in the next change detection run.
     * Mainly used for rendering the initial text before positioning a tooltip, which
     * can be problematic in components with OnPush change detection.
     * @return {?}
     */
    _markForCheck() {
        this._changeDetectorRef.markForCheck();
    }
}
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
Md2TooltipComponent.ctorParameters = () => [
    { type: Dir, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL3Rvb2x0aXAvdG9vbHRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIsTUFBTSxFQUNOLFFBQVEsRUFFUixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsS0FBSyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FFUixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFDTCxPQUFPLEVBQ1AsWUFBWSxFQUVaLGVBQWUsR0FHaEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM1RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7Ozs7OztBQUsxRSxhQUFhLG1CQUFtQixHQUFHLElBQUksQ0FBQzs7OztBQUd4QyxhQUFhLGtCQUFrQixHQUFHLEVBQUUsQ0FBQzs7Ozs7O0FBR3JDLE1BQU0sOENBQThDLFFBQWdCO0lBQ2xFLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLFFBQVEsZUFBZSxDQUFDLENBQUM7Q0FDL0Q7Ozs7Ozs7QUFnQkQsTUFBTTs7Ozs7Ozs7Ozs7SUFtREosWUFBb0IsUUFBaUIsRUFDM0IsYUFDQSxtQkFDQSxt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QWEsRUFBRSxPQUFPLENBQUMsb0NBQW9DLENBQUMsQ0FBQztxQkFDekUsQ0FBQztpQkFDSDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osY0FBYyxFQUFFLHNDQUFzQztvQkFDdEQsY0FBYyxFQUFFLCtCQUErQjtpQkFDaEQ7Z0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7O1lBclJRLEdBQUcsdUJBNFNJLFFBQVE7WUFqVXRCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgRWxlbWVudFJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgTmdab25lLFxuICBPcHRpb25hbCxcbiAgT25EZXN0cm95LFxuICBSZW5kZXJlcjIsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBzdHlsZSxcbiAgdHJpZ2dlcixcbiAgc3RhdGUsXG4gIHRyYW5zaXRpb24sXG4gIGFuaW1hdGUsXG4gIEFuaW1hdGlvbkV2ZW50LFxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIE92ZXJsYXksXG4gIE92ZXJsYXlTdGF0ZSxcbiAgT3ZlcmxheVJlZixcbiAgQ29tcG9uZW50UG9ydGFsLFxuICBPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uLFxuICBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb24sXG59IGZyb20gJy4uL2NvcmUvaW5kZXgnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEaXIgfSBmcm9tICcuLi9jb3JlL3J0bC9kaXInO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuLi9jb3JlL3BsYXRmb3JtL2luZGV4JztcbmltcG9ydCB7IFNjcm9sbERpc3BhdGNoZXIgfSBmcm9tICcuLi9jb3JlL292ZXJsYXkvc2Nyb2xsL3Njcm9sbC1kaXNwYXRjaGVyJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJy4uL2NvcmUvY29lcmNpb24vYm9vbGVhbi1wcm9wZXJ0eSc7XG5cbmV4cG9ydCB0eXBlIFRvb2x0aXBQb3NpdGlvbiA9ICdsZWZ0JyB8ICdyaWdodCcgfCAnYWJvdmUnIHwgJ2JlbG93JyB8ICdiZWZvcmUnIHwgJ2FmdGVyJztcblxuLyoqIFRpbWUgaW4gbXMgdG8gZGVsYXkgYmVmb3JlIGNoYW5naW5nIHRoZSB0b29sdGlwIHZpc2liaWxpdHkgdG8gaGlkZGVuICovXG5leHBvcnQgY29uc3QgVE9VQ0hFTkRfSElERV9ERUxBWSA9IDE1MDA7XG5cbi8qKiBUaW1lIGluIG1zIHRvIHRocm90dGxlIHJlcG9zaXRpb25pbmcgYWZ0ZXIgc2Nyb2xsIGV2ZW50cy4gKi9cbmV4cG9ydCBjb25zdCBTQ1JPTExfVEhST1RUTEVfTVMgPSAyMDtcblxuLyoqIFRocm93cyBhbiBlcnJvciBpZiB0aGUgdXNlciBzdXBwbGllZCBhbiBpbnZhbGlkIHRvb2x0aXAgcG9zaXRpb24uICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dNZDJUb29sdGlwSW52YWxpZFBvc2l0aW9uRXJyb3IocG9zaXRpb246IHN0cmluZykge1xuICB0aHJvdyBuZXcgRXJyb3IoYFRvb2x0aXAgcG9zaXRpb24gXCIke3Bvc2l0aW9ufVwiIGlzIGludmFsaWQuYCk7XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYXR0YWNoZXMgYSBtYXRlcmlhbCBkZXNpZ24gdG9vbHRpcCB0byB0aGUgaG9zdCBlbGVtZW50LiBBbmltYXRlcyB0aGUgc2hvd2luZyBhbmRcbiAqIGhpZGluZyBvZiBhIHRvb2x0aXAgcHJvdmlkZWQgcG9zaXRpb24gKGRlZmF1bHRzIHRvIGJlbG93IHRoZSBlbGVtZW50KS5cbiAqXG4gKiBodHRwczovL21hdGVyaWFsLmdvb2dsZS5jb20vY29tcG9uZW50cy90b29sdGlwcy5odG1sXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0b29sdGlwXScsXG4gIGhvc3Q6IHtcbiAgICAnKGxvbmdwcmVzcyknOiAnc2hvdygpJyxcbiAgICAnKHRvdWNoZW5kKSc6ICdoaWRlKCcgKyBUT1VDSEVORF9ISURFX0RFTEFZICsgJyknLFxuICB9LFxuICBleHBvcnRBczogJ21kMlRvb2x0aXAnLFxufSlcbmV4cG9ydCBjbGFzcyBNZDJUb29sdGlwIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWY7XG4gIF90b29sdGlwSW5zdGFuY2U6IE1kMlRvb2x0aXBDb21wb25lbnQ7XG5cbiAgcHJpdmF0ZSBfcG9zaXRpb246IFRvb2x0aXBQb3NpdGlvbiA9ICdiZWxvdyc7XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIEFsbG93cyB0aGUgdXNlciB0byBkZWZpbmUgdGhlIHBvc2l0aW9uIG9mIHRoZSB0b29sdGlwIHJlbGF0aXZlIHRvIHRoZSBwYXJlbnQgZWxlbWVudCAqL1xuICBASW5wdXQoJ3Rvb2x0aXAtcG9zaXRpb24nKVxuICBnZXQgcG9zaXRpb24oKTogVG9vbHRpcFBvc2l0aW9uIHsgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uOyB9XG4gIHNldCBwb3NpdGlvbih2YWx1ZTogVG9vbHRpcFBvc2l0aW9uKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9wb3NpdGlvbikge1xuICAgICAgdGhpcy5fcG9zaXRpb24gPSB2YWx1ZTtcblxuICAgICAgLy8gVE9ETyhhbmRyZXdqcyk6IFdoZW4gdGhlIG92ZXJsYXkncyBwb3NpdGlvbiBjYW4gYmUgZHluYW1pY2FsbHkgY2hhbmdlZCwgZG8gbm90IGRlc3Ryb3lcbiAgICAgIC8vIHRoZSB0b29sdGlwLlxuICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLl9kaXNwb3NlVG9vbHRpcCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBEaXNhYmxlcyB0aGUgZGlzcGxheSBvZiB0aGUgdG9vbHRpcC4gKi9cbiAgQElucHV0KCd0b29sdGlwRGlzYWJsZWQnKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuICBzZXQgZGlzYWJsZWQodmFsdWUpIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICAvLyBJZiB0b29sdGlwIGlzIGRpc2FibGVkLCBoaWRlIGltbWVkaWF0ZWx5LlxuICAgIGlmICh0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgdGhpcy5oaWRlKDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUaGUgZGVmYXVsdCBkZWxheSBpbiBtcyBiZWZvcmUgc2hvd2luZyB0aGUgdG9vbHRpcCBhZnRlciBzaG93IGlzIGNhbGxlZCAqL1xuICBASW5wdXQoJ3Rvb2x0aXAtZGVsYXknKSBzaG93RGVsYXkgPSAwO1xuXG4gIC8qKiBUaGUgZGVmYXVsdCBkZWxheSBpbiBtcyBiZWZvcmUgaGlkaW5nIHRoZSB0b29sdGlwIGFmdGVyIGhpZGUgaXMgY2FsbGVkICovXG4gIEBJbnB1dCgndG9vbHRpcC1oaWRlLWRlbGF5JykgaGlkZURlbGF5ID0gMDtcblxuICBwcml2YXRlIF9tZXNzYWdlOiBzdHJpbmc7XG5cbiAgLyoqIFRoZSBtZXNzYWdlIHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgdG9vbHRpcCAqL1xuICBASW5wdXQoJ3Rvb2x0aXAnKSBnZXQgbWVzc2FnZSgpIHsgcmV0dXJuIHRoaXMuX21lc3NhZ2U7IH1cbiAgc2V0IG1lc3NhZ2UodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX21lc3NhZ2UgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5fdG9vbHRpcEluc3RhbmNlKSB7XG4gICAgICB0aGlzLl9zZXRUb29sdGlwTWVzc2FnZSh0aGlzLl9tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RpcjogRGlyKSB7XG5cbiAgICAvLyBUaGUgbW91c2UgZXZlbnRzIHNob3VsZG4ndCBiZSBib3VuZCBvbiBpT1MgZGV2aWNlcywgYmVjYXVzZVxuICAgIC8vIHRoZXkgY2FuIHByZXZlbnQgdGhlIGZpcnN0IHRhcCBmcm9tIGZpcmluZyBpdHMgY2xpY2sgZXZlbnQuXG4gICAgaWYgKCFfcGxhdGZvcm0uSU9TKSB7XG4gICAgICBfcmVuZGVyZXIubGlzdGVuKF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWVudGVyJywgKCkgPT4gdGhpcy5zaG93KCkpO1xuICAgICAgX3JlbmRlcmVyLmxpc3RlbihfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbW91c2VsZWF2ZScsICgpID0+IHRoaXMuaGlkZSgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgdG9vbHRpcCB3aGVuIGRlc3Ryb3llZC5cbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl90b29sdGlwSW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX2Rpc3Bvc2VUb29sdGlwKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFNob3dzIHRoZSB0b29sdGlwIGFmdGVyIHRoZSBkZWxheSBpbiBtcywgZGVmYXVsdHMgdG8gdG9vbHRpcC1kZWxheS1zaG93IG9yIDBtcyBpZiBubyBpbnB1dCAqL1xuICBzaG93KGRlbGF5OiBudW1iZXIgPSB0aGlzLnNob3dEZWxheSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICF0aGlzLl9tZXNzYWdlIHx8ICF0aGlzLl9tZXNzYWdlLnRyaW0oKSkgeyByZXR1cm47IH1cblxuICAgIGlmICghdGhpcy5fdG9vbHRpcEluc3RhbmNlKSB7XG4gICAgICB0aGlzLl9jcmVhdGVUb29sdGlwKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fc2V0VG9vbHRpcE1lc3NhZ2UodGhpcy5fbWVzc2FnZSk7XG4gICAgdGhpcy5fdG9vbHRpcEluc3RhbmNlLnNob3codGhpcy5fcG9zaXRpb24sIGRlbGF5KTtcbiAgfVxuXG4gIC8qKiBIaWRlcyB0aGUgdG9vbHRpcCBhZnRlciB0aGUgZGVsYXkgaW4gbXMsIGRlZmF1bHRzIHRvIHRvb2x0aXAtZGVsYXktaGlkZSBvciAwbXMgaWYgbm8gaW5wdXQgKi9cbiAgaGlkZShkZWxheTogbnVtYmVyID0gdGhpcy5oaWRlRGVsYXkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdG9vbHRpcEluc3RhbmNlKSB7XG4gICAgICB0aGlzLl90b29sdGlwSW5zdGFuY2UuaGlkZShkZWxheSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFNob3dzL2hpZGVzIHRoZSB0b29sdGlwICovXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9pc1Rvb2x0aXBWaXNpYmxlKCkgPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdygpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdG9vbHRpcCBpcyBjdXJyZW50bHkgdmlzaWJsZSB0byB0aGUgdXNlciAqL1xuICBfaXNUb29sdGlwVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLl90b29sdGlwSW5zdGFuY2UgJiYgdGhpcy5fdG9vbHRpcEluc3RhbmNlLmlzVmlzaWJsZSgpO1xuICB9XG5cbiAgLyoqIENyZWF0ZSB0aGUgdG9vbHRpcCB0byBkaXNwbGF5ICovXG4gIHByaXZhdGUgX2NyZWF0ZVRvb2x0aXAoKTogdm9pZCB7XG4gICAgdGhpcy5fY3JlYXRlT3ZlcmxheSgpO1xuICAgIGxldCBwb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsKE1kMlRvb2x0aXBDb21wb25lbnQsIHRoaXMuX3ZpZXdDb250YWluZXJSZWYpO1xuICAgIHRoaXMuX3Rvb2x0aXBJbnN0YW5jZSA9IHRoaXMuX292ZXJsYXlSZWYuYXR0YWNoKHBvcnRhbCkuaW5zdGFuY2U7XG5cbiAgICAvLyBEaXNwb3NlIHRoZSBvdmVybGF5IHdoZW4gZmluaXNoZWQgdGhlIHNob3duIHRvb2x0aXAuXG4gICAgdGhpcy5fdG9vbHRpcEluc3RhbmNlLmFmdGVySGlkZGVuKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIC8vIENoZWNrIGZpcnN0IGlmIHRoZSB0b29sdGlwIGhhcyBhbHJlYWR5IGJlZW4gcmVtb3ZlZCB0aHJvdWdoIHRoaXMgY29tcG9uZW50cyBkZXN0cm95LlxuICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBJbnN0YW5jZSkge1xuICAgICAgICB0aGlzLl9kaXNwb3NlVG9vbHRpcCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIENyZWF0ZSB0aGUgb3ZlcmxheSBjb25maWcgYW5kIHBvc2l0aW9uIHN0cmF0ZWd5ICovXG4gIHByaXZhdGUgX2NyZWF0ZU92ZXJsYXkoKTogdm9pZCB7XG4gICAgbGV0IG9yaWdpbiA9IHRoaXMuX2dldE9yaWdpbigpO1xuICAgIGxldCBwb3NpdGlvbiA9IHRoaXMuX2dldE92ZXJsYXlQb3NpdGlvbigpO1xuXG4gICAgLy8gQ3JlYXRlIGNvbm5lY3RlZCBwb3NpdGlvbiBzdHJhdGVneSB0aGF0IGxpc3RlbnMgZm9yIHNjcm9sbCBldmVudHMgdG8gcmVwb3NpdGlvbi5cbiAgICAvLyBBZnRlciBwb3NpdGlvbiBjaGFuZ2VzIG9jY3VyIGFuZCB0aGUgb3ZlcmxheSBpcyBjbGlwcGVkIGJ5IGEgcGFyZW50IHNjcm9sbGFibGUgdGhlblxuICAgIC8vIGNsb3NlIHRoZSB0b29sdGlwLlxuICAgIGxldCBzdHJhdGVneSA9IHRoaXMuX292ZXJsYXkucG9zaXRpb24oKS5jb25uZWN0ZWRUbyh0aGlzLl9lbGVtZW50UmVmLCBvcmlnaW4sIHBvc2l0aW9uKTtcbiAgICBzdHJhdGVneS53aXRoU2Nyb2xsYWJsZUNvbnRhaW5lcnModGhpcy5fc2Nyb2xsRGlzcGF0Y2hlci5nZXRTY3JvbGxDb250YWluZXJzKHRoaXMuX2VsZW1lbnRSZWYpKTtcbiAgICBzdHJhdGVneS5vblBvc2l0aW9uQ2hhbmdlLnN1YnNjcmliZSgoY2hhbmdlOiBhbnkpID0+IHtcbiAgICAgIGlmIChjaGFuZ2Uuc2Nyb2xsYWJsZVZpZXdQcm9wZXJ0aWVzLmlzT3ZlcmxheUNsaXBwZWQgJiZcbiAgICAgICAgdGhpcy5fdG9vbHRpcEluc3RhbmNlICYmIHRoaXMuX3Rvb2x0aXBJbnN0YW5jZS5pc1Zpc2libGUoKSkge1xuICAgICAgICB0aGlzLmhpZGUoMCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgY29uZmlnID0gbmV3IE92ZXJsYXlTdGF0ZSgpO1xuXG4gICAgY29uZmlnLmRpcmVjdGlvbiA9IHRoaXMuX2RpciA/IHRoaXMuX2Rpci52YWx1ZSA6ICdsdHInO1xuICAgIGNvbmZpZy5wb3NpdGlvblN0cmF0ZWd5ID0gc3RyYXRlZ3k7XG4gICAgY29uZmlnLnNjcm9sbFN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oe1xuICAgICAgc2Nyb2xsVGhyb3R0bGU6IFNDUk9MTF9USFJPVFRMRV9NU1xuICAgIH0pO1xuXG4gICAgdGhpcy5fb3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKGNvbmZpZyk7XG4gIH1cblxuICAvKiogRGlzcG9zZXMgdGhlIGN1cnJlbnQgdG9vbHRpcCBhbmQgdGhlIG92ZXJsYXkgaXQgaXMgYXR0YWNoZWQgdG8gKi9cbiAgcHJpdmF0ZSBfZGlzcG9zZVRvb2x0aXAoKTogdm9pZCB7XG4gICAgdGhpcy5fb3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgdGhpcy5fb3ZlcmxheVJlZiA9IG51bGw7XG4gICAgdGhpcy5fdG9vbHRpcEluc3RhbmNlID0gbnVsbDtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRoZSBvcmlnaW4gcG9zaXRpb24gYmFzZWQgb24gdGhlIHVzZXIncyBwb3NpdGlvbiBwcmVmZXJlbmNlICovXG4gIF9nZXRPcmlnaW4oKTogT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uIHtcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA9PSAnYWJvdmUnIHx8IHRoaXMucG9zaXRpb24gPT0gJ2JlbG93Jykge1xuICAgICAgcmV0dXJuIHsgb3JpZ2luWDogJ2NlbnRlcicsIG9yaWdpblk6IHRoaXMucG9zaXRpb24gPT0gJ2Fib3ZlJyA/ICd0b3AnIDogJ2JvdHRvbScgfTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0RpcmVjdGlvbkx0ciA9ICF0aGlzLl9kaXIgfHwgdGhpcy5fZGlyLnZhbHVlID09ICdsdHInO1xuICAgIGlmICh0aGlzLnBvc2l0aW9uID09ICdsZWZ0JyB8fFxuICAgICAgdGhpcy5wb3NpdGlvbiA9PSAnYmVmb3JlJyAmJiBpc0RpcmVjdGlvbkx0ciB8fFxuICAgICAgdGhpcy5wb3NpdGlvbiA9PSAnYWZ0ZXInICYmICFpc0RpcmVjdGlvbkx0cikge1xuICAgICAgcmV0dXJuIHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ2NlbnRlcicgfTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wb3NpdGlvbiA9PSAncmlnaHQnIHx8XG4gICAgICB0aGlzLnBvc2l0aW9uID09ICdhZnRlcicgJiYgaXNEaXJlY3Rpb25MdHIgfHxcbiAgICAgIHRoaXMucG9zaXRpb24gPT0gJ2JlZm9yZScgJiYgIWlzRGlyZWN0aW9uTHRyKSB7XG4gICAgICByZXR1cm4geyBvcmlnaW5YOiAnZW5kJywgb3JpZ2luWTogJ2NlbnRlcicgfTtcbiAgICB9XG5cbiAgICB0aHJvd01kMlRvb2x0aXBJbnZhbGlkUG9zaXRpb25FcnJvcih0aGlzLnBvc2l0aW9uKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRoZSBvdmVybGF5IHBvc2l0aW9uIGJhc2VkIG9uIHRoZSB1c2VyJ3MgcHJlZmVyZW5jZSAqL1xuICBfZ2V0T3ZlcmxheVBvc2l0aW9uKCk6IE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb24ge1xuICAgIGlmICh0aGlzLnBvc2l0aW9uID09ICdhYm92ZScpIHtcbiAgICAgIHJldHVybiB7IG92ZXJsYXlYOiAnY2VudGVyJywgb3ZlcmxheVk6ICdib3R0b20nIH07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPT0gJ2JlbG93Jykge1xuICAgICAgcmV0dXJuIHsgb3ZlcmxheVg6ICdjZW50ZXInLCBvdmVybGF5WTogJ3RvcCcgfTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0x0ciA9ICF0aGlzLl9kaXIgfHwgdGhpcy5fZGlyLnZhbHVlID09ICdsdHInO1xuICAgIGlmICh0aGlzLnBvc2l0aW9uID09ICdsZWZ0JyB8fFxuICAgICAgdGhpcy5wb3NpdGlvbiA9PSAnYmVmb3JlJyAmJiBpc0x0ciB8fFxuICAgICAgdGhpcy5wb3NpdGlvbiA9PSAnYWZ0ZXInICYmICFpc0x0cikge1xuICAgICAgcmV0dXJuIHsgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ2NlbnRlcicgfTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wb3NpdGlvbiA9PSAncmlnaHQnIHx8XG4gICAgICB0aGlzLnBvc2l0aW9uID09ICdhZnRlcicgJiYgaXNMdHIgfHxcbiAgICAgIHRoaXMucG9zaXRpb24gPT0gJ2JlZm9yZScgJiYgIWlzTHRyKSB7XG4gICAgICByZXR1cm4geyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICdjZW50ZXInIH07XG4gICAgfVxuXG4gICAgdGhyb3dNZDJUb29sdGlwSW52YWxpZFBvc2l0aW9uRXJyb3IodGhpcy5wb3NpdGlvbik7XG4gIH1cblxuICAvKiogVXBkYXRlcyB0aGUgdG9vbHRpcCBtZXNzYWdlIGFuZCByZXBvc2l0aW9ucyB0aGUgb3ZlcmxheSBhY2NvcmRpbmcgdG8gdGhlIG5ldyBtZXNzYWdlIGxlbmd0aCAqL1xuICBwcml2YXRlIF9zZXRUb29sdGlwTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAvLyBNdXN0IHdhaXQgZm9yIHRoZSBtZXNzYWdlIHRvIGJlIHBhaW50ZWQgdG8gdGhlIHRvb2x0aXAgc28gdGhhdCB0aGUgb3ZlcmxheSBjYW4gcHJvcGVybHlcbiAgICAvLyBjYWxjdWxhdGUgdGhlIGNvcnJlY3QgcG9zaXRpb25pbmcgYmFzZWQgb24gdGhlIHNpemUgb2YgdGhlIHRleHQuXG4gICAgdGhpcy5fdG9vbHRpcEluc3RhbmNlLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuX3Rvb2x0aXBJbnN0YW5jZS5fbWFya0ZvckNoZWNrKCk7XG5cbiAgICB0aGlzLl9uZ1pvbmUub25NaWNyb3Rhc2tFbXB0eS5waXBlKGZpcnN0KCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fdG9vbHRpcEluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuX292ZXJsYXlSZWYudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBUb29sdGlwVmlzaWJpbGl0eSA9ICdpbml0aWFsJyB8ICd2aXNpYmxlJyB8ICdoaWRkZW4nO1xuXG4vKipcbiAqIEludGVybmFsIGNvbXBvbmVudCB0aGF0IHdyYXBzIHRoZSB0b29sdGlwJ3MgY29udGVudC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gIFxuICBzZWxlY3RvcjogJ21kMi10b29sdGlwJyxcbiAgdGVtcGxhdGVVcmw6ICd0b29sdGlwLmh0bWwnLFxuICBzdHlsZVVybHM6IFsndG9vbHRpcC5zY3NzJ10sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdzdGF0ZScsIFtcbiAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZSgwKScgfSkpLFxuICAgICAgc3RhdGUoJ2luaXRpYWwnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDApJyB9KSksXG4gICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUoMSknIH0pKSxcbiAgICAgIHN0YXRlKCdoaWRkZW4nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDApJyB9KSksXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IHZpc2libGUnLCBhbmltYXRlKCcxNTBtcyBjdWJpYy1iZXppZXIoMC4wLCAwLjAsIDAuMiwgMSknKSksXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IGhpZGRlbicsIGFuaW1hdGUoJzE1MG1zIGN1YmljLWJlemllcigwLjQsIDAuMCwgMSwgMSknKSksXG4gICAgXSlcbiAgXSxcbiAgaG9zdDoge1xuICAgICdbc3R5bGUuem9vbV0nOiAnX3Zpc2liaWxpdHkgPT09IFwidmlzaWJsZVwiID8gMSA6IG51bGwnLFxuICAgICcoYm9keTpjbGljayknOiAndGhpcy5faGFuZGxlQm9keUludGVyYWN0aW9uKCknXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWQyVG9vbHRpcENvbXBvbmVudCB7XG4gIC8qKiBNZXNzYWdlIHRvIGRpc3BsYXkgaW4gdGhlIHRvb2x0aXAgKi9cbiAgbWVzc2FnZTogc3RyaW5nO1xuXG4gIC8qKiBUaGUgdGltZW91dCBJRCBvZiBhbnkgY3VycmVudCB0aW1lciBzZXQgdG8gc2hvdyB0aGUgdG9vbHRpcCAqL1xuICBfc2hvd1RpbWVvdXRJZDogbnVtYmVyO1xuXG4gIC8qKiBUaGUgdGltZW91dCBJRCBvZiBhbnkgY3VycmVudCB0aW1lciBzZXQgdG8gaGlkZSB0aGUgdG9vbHRpcCAqL1xuICBfaGlkZVRpbWVvdXRJZDogbnVtYmVyO1xuXG4gIC8qKiBQcm9wZXJ0eSB3YXRjaGVkIGJ5IHRoZSBhbmltYXRpb24gZnJhbWV3b3JrIHRvIHNob3cgb3IgaGlkZSB0aGUgdG9vbHRpcCAqL1xuICBfdmlzaWJpbGl0eTogVG9vbHRpcFZpc2liaWxpdHkgPSAnaW5pdGlhbCc7XG5cbiAgLyoqIFdoZXRoZXIgaW50ZXJhY3Rpb25zIG9uIHRoZSBwYWdlIHNob3VsZCBjbG9zZSB0aGUgdG9vbHRpcCAqL1xuICBfY2xvc2VPbkludGVyYWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFRoZSB0cmFuc2Zvcm0gb3JpZ2luIHVzZWQgaW4gdGhlIGFuaW1hdGlvbiBmb3Igc2hvd2luZyBhbmQgaGlkaW5nIHRoZSB0b29sdGlwICovXG4gIF90cmFuc2Zvcm1PcmlnaW46IHN0cmluZyA9ICdib3R0b20nO1xuXG4gIC8qKiBTdWJqZWN0IGZvciBub3RpZnlpbmcgdGhhdCB0aGUgdG9vbHRpcCBoYXMgYmVlbiBoaWRkZW4gZnJvbSB0aGUgdmlldyAqL1xuICBwcml2YXRlIF9vbkhpZGU6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgY29uc3RydWN0b3IoIEBPcHRpb25hbCgpIHByaXZhdGUgX2RpcjogRGlyLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgdG9vbHRpcCB3aXRoIGFuIGFuaW1hdGlvbiBvcmlnaW5hdGluZyBmcm9tIHRoZSBwcm92aWRlZCBvcmlnaW5cbiAgICogQHBhcmFtIHBvc2l0aW9uIFBvc2l0aW9uIG9mIHRoZSB0b29sdGlwLlxuICAgKiBAcGFyYW0gZGVsYXkgQW1vdW50IG9mIG1pbGxpc2Vjb25kcyB0byB0aGUgZGVsYXkgc2hvd2luZyB0aGUgdG9vbHRpcC5cbiAgICovXG4gIHNob3cocG9zaXRpb246IFRvb2x0aXBQb3NpdGlvbiwgZGVsYXk6IG51bWJlcik6IHZvaWQge1xuICAgIC8vIENhbmNlbCB0aGUgZGVsYXllZCBoaWRlIGlmIGl0IGlzIHNjaGVkdWxlZFxuICAgIGlmICh0aGlzLl9oaWRlVGltZW91dElkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5faGlkZVRpbWVvdXRJZCk7XG4gICAgfVxuXG4gICAgLy8gQm9keSBpbnRlcmFjdGlvbnMgc2hvdWxkIGNhbmNlbCB0aGUgdG9vbHRpcCBpZiB0aGVyZSBpcyBhIGRlbGF5IGluIHNob3dpbmcuXG4gICAgdGhpcy5fY2xvc2VPbkludGVyYWN0aW9uID0gdHJ1ZTtcblxuICAgIHRoaXMuX3NldFRyYW5zZm9ybU9yaWdpbihwb3NpdGlvbik7XG4gICAgdGhpcy5fc2hvd1RpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fdmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcblxuICAgICAgLy8gSWYgdGhpcyB3YXMgc2V0IHRvIHRydWUgaW1tZWRpYXRlbHksIHRoZW4gYSBib2R5IGNsaWNrIHRoYXQgdHJpZ2dlcnMgc2hvdygpIHdvdWxkXG4gICAgICAvLyB0cmlnZ2VyIGludGVyYWN0aW9uIGFuZCBjbG9zZSB0aGUgdG9vbHRpcCByaWdodCBhZnRlciBpdCB3YXMgZGlzcGxheWVkLlxuICAgICAgdGhpcy5fY2xvc2VPbkludGVyYWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIC8vIE1hcmsgZm9yIGNoZWNrIHNvIGlmIGFueSBwYXJlbnQgY29tcG9uZW50IGhhcyBzZXQgdGhlXG4gICAgICAvLyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB0byBPblB1c2ggaXQgd2lsbCBiZSBjaGVja2VkIGFueXdheXNcbiAgICAgIHRoaXMuX21hcmtGb3JDaGVjaygpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9jbG9zZU9uSW50ZXJhY3Rpb24gPSB0cnVlLCAwKTtcbiAgICB9LCBkZWxheSk7XG4gIH1cblxuICAvKipcbiAgICogQmVnaW5zIHRoZSBhbmltYXRpb24gdG8gaGlkZSB0aGUgdG9vbHRpcCBhZnRlciB0aGUgcHJvdmlkZWQgZGVsYXkgaW4gbXMuXG4gICAqIEBwYXJhbSBkZWxheSBBbW91bnQgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5IHNob3dpbmcgdGhlIHRvb2x0aXAuXG4gICAqL1xuICBoaWRlKGRlbGF5OiBudW1iZXIpOiB2b2lkIHtcbiAgICAvLyBDYW5jZWwgdGhlIGRlbGF5ZWQgc2hvdyBpZiBpdCBpcyBzY2hlZHVsZWRcbiAgICBpZiAodGhpcy5fc2hvd1RpbWVvdXRJZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3Nob3dUaW1lb3V0SWQpO1xuICAgIH1cblxuICAgIHRoaXMuX2hpZGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX3Zpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgIHRoaXMuX2Nsb3NlT25JbnRlcmFjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAvLyBNYXJrIGZvciBjaGVjayBzbyBpZiBhbnkgcGFyZW50IGNvbXBvbmVudCBoYXMgc2V0IHRoZVxuICAgICAgLy8gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgdG8gT25QdXNoIGl0IHdpbGwgYmUgY2hlY2tlZCBhbnl3YXlzXG4gICAgICB0aGlzLl9tYXJrRm9yQ2hlY2soKTtcbiAgICB9LCBkZWxheSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYnNlcnZhYmxlIHRoYXQgbm90aWZpZXMgd2hlbiB0aGUgdG9vbHRpcCBoYXMgYmVlbiBoaWRkZW4gZnJvbSB2aWV3XG4gICAqL1xuICBhZnRlckhpZGRlbigpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fb25IaWRlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIHRvb2x0aXAgaXMgYmVpbmcgZGlzcGxheWVkXG4gICAqL1xuICBpc1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Zpc2liaWxpdHkgPT09ICd2aXNpYmxlJztcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSB0b29sdGlwIHRyYW5zZm9ybSBvcmlnaW4gYWNjb3JkaW5nIHRvIHRoZSB0b29sdGlwIHBvc2l0aW9uICovXG4gIF9zZXRUcmFuc2Zvcm1PcmlnaW4odmFsdWU6IFRvb2x0aXBQb3NpdGlvbikge1xuICAgIGNvbnN0IGlzTHRyID0gIXRoaXMuX2RpciB8fCB0aGlzLl9kaXIudmFsdWUgPT0gJ2x0cic7XG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgY2FzZSAnYmVmb3JlJzogdGhpcy5fdHJhbnNmb3JtT3JpZ2luID0gaXNMdHIgPyAncmlnaHQnIDogJ2xlZnQnOyBicmVhaztcbiAgICAgIGNhc2UgJ2FmdGVyJzogdGhpcy5fdHJhbnNmb3JtT3JpZ2luID0gaXNMdHIgPyAnbGVmdCcgOiAncmlnaHQnOyBicmVhaztcbiAgICAgIGNhc2UgJ2xlZnQnOiB0aGlzLl90cmFuc2Zvcm1PcmlnaW4gPSAncmlnaHQnOyBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0JzogdGhpcy5fdHJhbnNmb3JtT3JpZ2luID0gJ2xlZnQnOyBicmVhaztcbiAgICAgIGNhc2UgJ2Fib3ZlJzogdGhpcy5fdHJhbnNmb3JtT3JpZ2luID0gJ2JvdHRvbSc7IGJyZWFrO1xuICAgICAgY2FzZSAnYmVsb3cnOiB0aGlzLl90cmFuc2Zvcm1PcmlnaW4gPSAndG9wJzsgYnJlYWs7XG4gICAgICBkZWZhdWx0OiB0aHJvd01kMlRvb2x0aXBJbnZhbGlkUG9zaXRpb25FcnJvcih2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgX2FmdGVyVmlzaWJpbGl0eUFuaW1hdGlvbihlOiBBbmltYXRpb25FdmVudCk6IHZvaWQge1xuICAgIGlmIChlLnRvU3RhdGUgPT09ICdoaWRkZW4nICYmICF0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICB0aGlzLl9vbkhpZGUubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmFjdGlvbnMgb24gdGhlIEhUTUwgYm9keSBzaG91bGQgY2xvc2UgdGhlIHRvb2x0aXAgaW1tZWRpYXRlbHkgYXMgZGVmaW5lZCBpbiB0aGVcbiAgICogbWF0ZXJpYWwgZGVzaWduIHNwZWMuXG4gICAqIGh0dHBzOi8vbWF0ZXJpYWwuZ29vZ2xlLmNvbS9jb21wb25lbnRzL3Rvb2x0aXBzLmh0bWwjdG9vbHRpcHMtaW50ZXJhY3Rpb25cbiAgICovXG4gIF9oYW5kbGVCb2R5SW50ZXJhY3Rpb24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2Nsb3NlT25JbnRlcmFjdGlvbikge1xuICAgICAgdGhpcy5oaWRlKDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNYXJrcyB0aGF0IHRoZSB0b29sdGlwIG5lZWRzIHRvIGJlIGNoZWNrZWQgaW4gdGhlIG5leHQgY2hhbmdlIGRldGVjdGlvbiBydW4uXG4gICAqIE1haW5seSB1c2VkIGZvciByZW5kZXJpbmcgdGhlIGluaXRpYWwgdGV4dCBiZWZvcmUgcG9zaXRpb25pbmcgYSB0b29sdGlwLCB3aGljaFxuICAgKiBjYW4gYmUgcHJvYmxlbWF0aWMgaW4gY29tcG9uZW50cyB3aXRoIE9uUHVzaCBjaGFuZ2UgZGV0ZWN0aW9uLlxuICAgKi9cbiAgX21hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIl19