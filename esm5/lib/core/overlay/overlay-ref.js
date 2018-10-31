/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
var /**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
OverlayRef = /** @class */ (function () {
    function OverlayRef(_portalHost, _pane, _state, _scrollStrategy, _ngZone) {
        this._portalHost = _portalHost;
        this._pane = _pane;
        this._state = _state;
        this._scrollStrategy = _scrollStrategy;
        this._ngZone = _ngZone;
        this._backdropElement = null;
        this._backdropClick = new Subject();
        this._attachments = new Subject();
        this._detachments = new Subject();
        _scrollStrategy.attach(this);
    }
    Object.defineProperty(OverlayRef.prototype, "overlayElement", {
        /** The overlay's HTML element */
        get: /**
         * The overlay's HTML element
         * @return {?}
         */
        function () {
            return this._pane;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Attaches the overlay to a portal instance and adds the backdrop.
     * @param portal Portal instance to which to attach the overlay.
     * @returns The portal attachment result.
     */
    /**
     * Attaches the overlay to a portal instance and adds the backdrop.
     * @param {?} portal Portal instance to which to attach the overlay.
     * @return {?} The portal attachment result.
     */
    OverlayRef.prototype.attach = /**
     * Attaches the overlay to a portal instance and adds the backdrop.
     * @param {?} portal Portal instance to which to attach the overlay.
     * @return {?} The portal attachment result.
     */
    function (portal) {
        /** @type {?} */
        var attachResult = this._portalHost.attach(portal);
        // Update the pane element with the given state configuration.
        this._updateStackingOrder();
        this.updateSize();
        this.updateDirection();
        this.updatePosition();
        this._scrollStrategy.enable();
        // Enable pointer events for the overlay pane element.
        this._togglePointerEvents(true);
        if (this._state.hasBackdrop) {
            this._attachBackdrop();
        }
        if (this._state.panelClass) {
            this._pane.classList.add(this._state.panelClass);
        }
        // Only emit the `attachments` event once all other setup is done.
        this._attachments.next();
        return attachResult;
    };
    /**
     * Detaches an overlay from a portal.
     * @returns Resolves when the overlay has been detached.
     */
    /**
     * Detaches an overlay from a portal.
     * @return {?} Resolves when the overlay has been detached.
     */
    OverlayRef.prototype.detach = /**
     * Detaches an overlay from a portal.
     * @return {?} Resolves when the overlay has been detached.
     */
    function () {
        this.detachBackdrop();
        // When the overlay is detached, the pane element should disable pointer events.
        // This is necessary because otherwise the pane element will cover the page and disable
        // pointer events therefore. Depends on the position strategy and the applied pane boundaries.
        this._togglePointerEvents(false);
        this._scrollStrategy.disable();
        /** @type {?} */
        var detachmentResult = this._portalHost.detach();
        // Only emit after everything is detached.
        this._detachments.next();
        return detachmentResult;
    };
    /**
     * Cleans up the overlay from the DOM.
     */
    /**
     * Cleans up the overlay from the DOM.
     * @return {?}
     */
    OverlayRef.prototype.dispose = /**
     * Cleans up the overlay from the DOM.
     * @return {?}
     */
    function () {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.dispose();
        }
        if (this._scrollStrategy) {
            this._scrollStrategy.disable();
            this._scrollStrategy = null;
        }
        this.detachBackdrop();
        this._portalHost.dispose();
        this._attachments.complete();
        this._backdropClick.complete();
        this._detachments.next();
        this._detachments.complete();
    };
    /**
     * Checks whether the overlay has been attached.
     */
    /**
     * Checks whether the overlay has been attached.
     * @return {?}
     */
    OverlayRef.prototype.hasAttached = /**
     * Checks whether the overlay has been attached.
     * @return {?}
     */
    function () {
        return this._portalHost.hasAttached();
    };
    /**
     * Returns an observable that emits when the backdrop has been clicked.
     */
    /**
     * Returns an observable that emits when the backdrop has been clicked.
     * @return {?}
     */
    OverlayRef.prototype.backdropClick = /**
     * Returns an observable that emits when the backdrop has been clicked.
     * @return {?}
     */
    function () {
        return this._backdropClick.asObservable();
    };
    /** Returns an observable that emits when the overlay has been attached. */
    /**
     * Returns an observable that emits when the overlay has been attached.
     * @return {?}
     */
    OverlayRef.prototype.attachments = /**
     * Returns an observable that emits when the overlay has been attached.
     * @return {?}
     */
    function () {
        return this._attachments.asObservable();
    };
    /** Returns an observable that emits when the overlay has been detached. */
    /**
     * Returns an observable that emits when the overlay has been detached.
     * @return {?}
     */
    OverlayRef.prototype.detachments = /**
     * Returns an observable that emits when the overlay has been detached.
     * @return {?}
     */
    function () {
        return this._detachments.asObservable();
    };
    /**
     * Gets the current state config of the overlay.
     */
    /**
     * Gets the current state config of the overlay.
     * @return {?}
     */
    OverlayRef.prototype.getState = /**
     * Gets the current state config of the overlay.
     * @return {?}
     */
    function () {
        return this._state;
    };
    /** Updates the position of the overlay based on the position strategy. */
    /**
     * Updates the position of the overlay based on the position strategy.
     * @return {?}
     */
    OverlayRef.prototype.updatePosition = /**
     * Updates the position of the overlay based on the position strategy.
     * @return {?}
     */
    function () {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.apply(this._pane);
        }
    };
    /**
     * Updates the text direction of the overlay panel.
     * @return {?}
     */
    OverlayRef.prototype.updateDirection = /**
     * Updates the text direction of the overlay panel.
     * @return {?}
     */
    function () {
        this._pane.setAttribute('dir', this._state.direction);
    };
    /** Updates the size of the overlay based on the overlay config. */
    /**
     * Updates the size of the overlay based on the overlay config.
     * @return {?}
     */
    OverlayRef.prototype.updateSize = /**
     * Updates the size of the overlay based on the overlay config.
     * @return {?}
     */
    function () {
        if (this._state.width || this._state.width === 0) {
            this._pane.style.width = formatCssUnit(this._state.width);
        }
        if (this._state.height || this._state.height === 0) {
            this._pane.style.height = formatCssUnit(this._state.height);
        }
        if (this._state.minWidth || this._state.minWidth === 0) {
            this._pane.style.minWidth = formatCssUnit(this._state.minWidth);
        }
        if (this._state.minHeight || this._state.minHeight === 0) {
            this._pane.style.minHeight = formatCssUnit(this._state.minHeight);
        }
    };
    /**
     * Toggles the pointer events for the overlay pane element.
     * @param {?} enablePointer
     * @return {?}
     */
    OverlayRef.prototype._togglePointerEvents = /**
     * Toggles the pointer events for the overlay pane element.
     * @param {?} enablePointer
     * @return {?}
     */
    function (enablePointer) {
        this._pane.style.pointerEvents = enablePointer ? 'auto' : 'none';
    };
    /**
     * Attaches a backdrop for this overlay.
     * @return {?}
     */
    OverlayRef.prototype._attachBackdrop = /**
     * Attaches a backdrop for this overlay.
     * @return {?}
     */
    function () {
        var _this = this;
        this._backdropElement = document.createElement('div');
        this._backdropElement.classList.add('cdk-overlay-backdrop');
        this._backdropElement.classList.add(this._state.backdropClass);
        // Insert the backdrop before the pane in the DOM order,
        // in order to handle stacked overlays properly.
        this._pane.parentElement.insertBefore(this._backdropElement, this._pane);
        // Forward backdrop clicks such that the consumer of the overlay can perform whatever
        // action desired when such a click occurs (usually closing the overlay).
        this._backdropElement.addEventListener('click', function () { return _this._backdropClick.next(null); });
        // Add class to fade-in the backdrop after one frame.
        requestAnimationFrame(function () {
            if (_this._backdropElement) {
                _this._backdropElement.classList.add('cdk-overlay-backdrop-showing');
            }
        });
    };
    /**
     * Updates the stacking order of the element, moving it to the top if necessary.
     * This is required in cases where one overlay was detached, while another one,
     * that should be behind it, was destroyed. The next time both of them are opened,
     * the stacking will be wrong, because the detached element's pane will still be
     * in its original DOM position.
     * @return {?}
     */
    OverlayRef.prototype._updateStackingOrder = /**
     * Updates the stacking order of the element, moving it to the top if necessary.
     * This is required in cases where one overlay was detached, while another one,
     * that should be behind it, was destroyed. The next time both of them are opened,
     * the stacking will be wrong, because the detached element's pane will still be
     * in its original DOM position.
     * @return {?}
     */
    function () {
        if (this._pane.nextSibling) {
            this._pane.parentNode.appendChild(this._pane);
        }
    };
    /** Detaches the backdrop (if any) associated with the overlay. */
    /**
     * Detaches the backdrop (if any) associated with the overlay.
     * @return {?}
     */
    OverlayRef.prototype.detachBackdrop = /**
     * Detaches the backdrop (if any) associated with the overlay.
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var backdropToDetach = this._backdropElement;
        if (backdropToDetach) {
            /** @type {?} */
            var finishDetach_1 = function () {
                // It may not be attached to anything in certain cases (e.g. unit tests).
                if (backdropToDetach && backdropToDetach.parentNode) {
                    backdropToDetach.parentNode.removeChild(backdropToDetach);
                }
                // It is possible that a new portal has been attached to this overlay since we started
                // removing the backdrop. If that is the case, only clear the backdrop reference if it
                // is still the same instance that we started to remove.
                if (_this._backdropElement == backdropToDetach) {
                    _this._backdropElement = null;
                }
            };
            backdropToDetach.classList.remove('cdk-overlay-backdrop-showing');
            backdropToDetach.classList.remove(this._state.backdropClass);
            backdropToDetach.addEventListener('transitionend', finishDetach_1);
            // If the backdrop doesn't have a transition, the `transitionend` event won't fire.
            // In this case we make it unclickable and we try to remove it after a delay.
            backdropToDetach.style.pointerEvents = 'none';
            // Run this outside the Angular zone because there's nothing that Angular cares about.
            // If it were to run inside the Angular zone, every test that used Overlay would have to be
            // either async or fakeAsync.
            this._ngZone.runOutsideAngular(function () {
                setTimeout(finishDetach_1, 500);
            });
        }
    };
    return OverlayRef;
}());
/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
export { OverlayRef };
if (false) {
    /** @type {?} */
    OverlayRef.prototype._backdropElement;
    /** @type {?} */
    OverlayRef.prototype._backdropClick;
    /** @type {?} */
    OverlayRef.prototype._attachments;
    /** @type {?} */
    OverlayRef.prototype._detachments;
    /** @type {?} */
    OverlayRef.prototype._portalHost;
    /** @type {?} */
    OverlayRef.prototype._pane;
    /** @type {?} */
    OverlayRef.prototype._state;
    /** @type {?} */
    OverlayRef.prototype._scrollStrategy;
    /** @type {?} */
    OverlayRef.prototype._ngZone;
}
/**
 * @param {?} value
 * @return {?}
 */
function formatCssUnit(value) {
    return typeof value === 'string' ? /** @type {?} */ (value) : value + "px";
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1yZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL292ZXJsYXkvb3ZlcmxheS1yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUlBLE9BQU8sRUFBYSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7Ozs7O0FBT3pDOzs7O0FBQUE7SUFNRSxvQkFDWSxhQUNBLE9BQ0EsUUFDQSxpQkFDQTtRQUpBLGdCQUFXLEdBQVgsV0FBVztRQUNYLFVBQUssR0FBTCxLQUFLO1FBQ0wsV0FBTSxHQUFOLE1BQU07UUFDTixvQkFBZSxHQUFmLGVBQWU7UUFDZixZQUFPLEdBQVAsT0FBTztnQ0FWcUIsSUFBSTs4QkFDTCxJQUFJLE9BQU8sRUFBRTs0QkFDN0IsSUFBSSxPQUFPLEVBQVE7NEJBQ25CLElBQUksT0FBTyxFQUFRO1FBU3hDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUI7SUFHRCxzQkFBSSxzQ0FBYztRQURsQixpQ0FBaUM7Ozs7O1FBQ2pDO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ25COzs7T0FBQTtJQUVEOzs7O09BSUc7Ozs7OztJQUNILDJCQUFNOzs7OztJQUFOLFVBQU8sTUFBbUI7O1FBQ3hCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztRQUduRCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDOztRQUc5QixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFD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RUFBRTtvQkFDN0MsS0FBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztpQkFDOUI7YUFDRixDQUFDO1lBRUYsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBQ2xFLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM3RCxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsY0FBWSxDQUFDLENBQUM7OztZQUlqRSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQzs7OztZQUs5QyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDO2dCQUM3QixVQUFVLENBQUMsY0FBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQy9CLENBQUMsQ0FBQztTQUNKO0tBQ0Y7cUJBbFBIO0lBbVBDLENBQUE7Ozs7O0FBeE9ELHNCQXdPQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVELHVCQUF1QixLQUFzQjtJQUMzQyxPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLG1CQUFDLEtBQWUsRUFBQyxDQUFDLENBQUksS0FBSyxPQUFJLENBQUM7Q0FDbkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BvcnRhbEhvc3QsIFBvcnRhbH0gZnJvbSAnLi4vcG9ydGFsL3BvcnRhbCc7XG5pbXBvcnQge092ZXJsYXlTdGF0ZX0gZnJvbSAnLi9vdmVybGF5LXN0YXRlJztcbmltcG9ydCB7U2Nyb2xsU3RyYXRlZ3l9IGZyb20gJy4vc2Nyb2xsL3Njcm9sbC1zdHJhdGVneSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuXG5cbi8qKlxuICogUmVmZXJlbmNlIHRvIGFuIG92ZXJsYXkgdGhhdCBoYXMgYmVlbiBjcmVhdGVkIHdpdGggdGhlIE92ZXJsYXkgc2VydmljZS5cbiAqIFVzZWQgdG8gbWFuaXB1bGF0ZSBvciBkaXNwb3NlIG9mIHNhaWQgb3ZlcmxheS5cbiAqL1xuZXhwb3J0IGNsYXNzIE92ZXJsYXlSZWYgaW1wbGVtZW50cyBQb3J0YWxIb3N0IHtcbiAgcHJpdmF0ZSBfYmFja2Ryb3BFbGVtZW50OiBIVE1MRWxlbWVudCA9IG51bGw7XG4gIHByaXZhdGUgX2JhY2tkcm9wQ2xpY2s6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgX2F0dGFjaG1lbnRzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZGV0YWNobWVudHMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfcG9ydGFsSG9zdDogUG9ydGFsSG9zdCxcbiAgICAgIHByaXZhdGUgX3BhbmU6IEhUTUxFbGVtZW50LFxuICAgICAgcHJpdmF0ZSBfc3RhdGU6IE92ZXJsYXlTdGF0ZSxcbiAgICAgIHByaXZhdGUgX3Njcm9sbFN0cmF0ZWd5OiBTY3JvbGxTdHJhdGVneSxcbiAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7XG5cbiAgICBfc2Nyb2xsU3RyYXRlZ3kuYXR0YWNoKHRoaXMpO1xuICB9XG5cbiAgLyoqIFRoZSBvdmVybGF5J3MgSFRNTCBlbGVtZW50ICovXG4gIGdldCBvdmVybGF5RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX3BhbmU7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoZXMgdGhlIG92ZXJsYXkgdG8gYSBwb3J0YWwgaW5zdGFuY2UgYW5kIGFkZHMgdGhlIGJhY2tkcm9wLlxuICAgKiBAcGFyYW0gcG9ydGFsIFBvcnRhbCBpbnN0YW5jZSB0byB3aGljaCB0byBhdHRhY2ggdGhlIG92ZXJsYXkuXG4gICAqIEByZXR1cm5zIFRoZSBwb3J0YWwgYXR0YWNobWVudCByZXN1bHQuXG4gICAqL1xuICBhdHRhY2gocG9ydGFsOiBQb3J0YWw8YW55Pik6IGFueSB7XG4gICAgbGV0IGF0dGFjaFJlc3VsdCA9IHRoaXMuX3BvcnRhbEhvc3QuYXR0YWNoKHBvcnRhbCk7XG5cbiAgICAvLyBVcGRhdGUgdGhlIHBhbmUgZWxlbWVudCB3aXRoIHRoZSBnaXZlbiBzdGF0ZSBjb25maWd1cmF0aW9uLlxuICAgIHRoaXMuX3VwZGF0ZVN0YWNraW5nT3JkZXIoKTtcbiAgICB0aGlzLnVwZGF0ZVNpemUoKTtcbiAgICB0aGlzLnVwZGF0ZURpcmVjdGlvbigpO1xuICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcbiAgICB0aGlzLl9zY3JvbGxTdHJhdGVneS5lbmFibGUoKTtcblxuICAgIC8vIEVuYWJsZSBwb2ludGVyIGV2ZW50cyBmb3IgdGhlIG92ZXJsYXkgcGFuZSBlbGVtZW50LlxuICAgIHRoaXMuX3RvZ2dsZVBvaW50ZXJFdmVudHModHJ1ZSk7XG5cbiAgICBpZiAodGhpcy5fc3RhdGUuaGFzQmFja2Ryb3ApIHtcbiAgICAgIHRoaXMuX2F0dGFjaEJhY2tkcm9wKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3N0YXRlLnBhbmVsQ2xhc3MpIHtcbiAgICAgIHRoaXMuX3BhbmUuY2xhc3NMaXN0LmFkZCh0aGlzLl9zdGF0ZS5wYW5lbENsYXNzKTtcbiAgICB9XG5cbiAgICAvLyBPbmx5IGVtaXQgdGhlIGBhdHRhY2htZW50c2AgZXZlbnQgb25jZSBhbGwgb3RoZXIgc2V0dXAgaXMgZG9uZS5cbiAgICB0aGlzLl9hdHRhY2htZW50cy5uZXh0KCk7XG5cbiAgICByZXR1cm4gYXR0YWNoUmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERldGFjaGVzIGFuIG92ZXJsYXkgZnJvbSBhIHBvcnRhbC5cbiAgICogQHJldHVybnMgUmVzb2x2ZXMgd2hlbiB0aGUgb3ZlcmxheSBoYXMgYmVlbiBkZXRhY2hlZC5cbiAgICovXG4gIGRldGFjaCgpOiBQcm9taXNlPGFueT4ge1xuICAgIHRoaXMuZGV0YWNoQmFja2Ryb3AoKTtcblxuICAgIC8vIFdoZW4gdGhlIG92ZXJsYXkgaXMgZGV0YWNoZWQsIHRoZSBwYW5lIGVsZW1lbnQgc2hvdWxkIGRpc2FibGUgcG9pbnRlciBldmVudHMuXG4gICAgLy8gVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBvdGhlcndpc2UgdGhlIHBhbmUgZWxlbWVudCB3aWxsIGNvdmVyIHRoZSBwYWdlIGFuZCBkaXNhYmxlXG4gICAgLy8gcG9pbnRlciBldmVudHMgdGhlcmVmb3JlLiBEZXBlbmRzIG9uIHRoZSBwb3NpdGlvbiBzdHJhdGVneSBhbmQgdGhlIGFwcGxpZWQgcGFuZSBib3VuZGFyaWVzLlxuICAgIHRoaXMuX3RvZ2dsZVBvaW50ZXJFdmVudHMoZmFsc2UpO1xuICAgIHRoaXMuX3Njcm9sbFN0cmF0ZWd5LmRpc2FibGUoKTtcblxuICAgIGxldCBkZXRhY2htZW50UmVzdWx0ID0gdGhpcy5fcG9ydGFsSG9zdC5kZXRhY2goKTtcblxuICAgIC8vIE9ubHkgZW1pdCBhZnRlciBldmVyeXRoaW5nIGlzIGRldGFjaGVkLlxuICAgIHRoaXMuX2RldGFjaG1lbnRzLm5leHQoKTtcblxuICAgIHJldHVybiBkZXRhY2htZW50UmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFucyB1cCB0aGUgb3ZlcmxheSBmcm9tIHRoZSBET00uXG4gICAqL1xuICBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zdGF0ZS5wb3NpdGlvblN0cmF0ZWd5KSB7XG4gICAgICB0aGlzLl9zdGF0ZS5wb3NpdGlvblN0cmF0ZWd5LmRpc3Bvc2UoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc2Nyb2xsU3RyYXRlZ3kpIHtcbiAgICAgIHRoaXMuX3Njcm9sbFN0cmF0ZWd5LmRpc2FibGUoKTtcbiAgICAgIHRoaXMuX3Njcm9sbFN0cmF0ZWd5ID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLmRldGFjaEJhY2tkcm9wKCk7XG4gICAgdGhpcy5fcG9ydGFsSG9zdC5kaXNwb3NlKCk7XG4gICAgdGhpcy5fYXR0YWNobWVudHMuY29tcGxldGUoKTtcbiAgICB0aGlzLl9iYWNrZHJvcENsaWNrLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fZGV0YWNobWVudHMubmV4dCgpO1xuICAgIHRoaXMuX2RldGFjaG1lbnRzLmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIG92ZXJsYXkgaGFzIGJlZW4gYXR0YWNoZWQuXG4gICAqL1xuICBoYXNBdHRhY2hlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcG9ydGFsSG9zdC5oYXNBdHRhY2hlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdoZW4gdGhlIGJhY2tkcm9wIGhhcyBiZWVuIGNsaWNrZWQuXG4gICAqL1xuICBiYWNrZHJvcENsaWNrKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9iYWNrZHJvcENsaWNrLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgYW4gb2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdoZW4gdGhlIG92ZXJsYXkgaGFzIGJlZW4gYXR0YWNoZWQuICovXG4gIGF0dGFjaG1lbnRzKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9hdHRhY2htZW50cy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIGFuIG9ic2VydmFibGUgdGhhdCBlbWl0cyB3aGVuIHRoZSBvdmVybGF5IGhhcyBiZWVuIGRldGFjaGVkLiAqL1xuICBkZXRhY2htZW50cygpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fZGV0YWNobWVudHMuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgY3VycmVudCBzdGF0ZSBjb25maWcgb2YgdGhlIG92ZXJsYXkuXG4gICAqL1xuICBnZXRTdGF0ZSgpOiBPdmVybGF5U3RhdGUge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgfVxuXG4gIC8qKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgb3ZlcmxheSBiYXNlZCBvbiB0aGUgcG9zaXRpb24gc3RyYXRlZ3kuICovXG4gIHVwZGF0ZVBvc2l0aW9uKCkge1xuICAgIGlmICh0aGlzLl9zdGF0ZS5wb3NpdGlvblN0cmF0ZWd5KSB7XG4gICAgICB0aGlzLl9zdGF0ZS5wb3NpdGlvblN0cmF0ZWd5LmFwcGx5KHRoaXMuX3BhbmUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBVcGRhdGVzIHRoZSB0ZXh0IGRpcmVjdGlvbiBvZiB0aGUgb3ZlcmxheSBwYW5lbC4gKi9cbiAgcHJpdmF0ZSB1cGRhdGVEaXJlY3Rpb24oKSB7XG4gICAgdGhpcy5fcGFuZS5zZXRBdHRyaWJ1dGUoJ2RpcicsIHRoaXMuX3N0YXRlLmRpcmVjdGlvbik7XG4gIH1cblxuICAvKiogVXBkYXRlcyB0aGUgc2l6ZSBvZiB0aGUgb3ZlcmxheSBiYXNlZCBvbiB0aGUgb3ZlcmxheSBjb25maWcuICovXG4gIHVwZGF0ZVNpemUoKSB7XG4gICAgaWYgKHRoaXMuX3N0YXRlLndpZHRoIHx8IHRoaXMuX3N0YXRlLndpZHRoID09PSAwKSB7XG4gICAgICB0aGlzLl9wYW5lLnN0eWxlLndpZHRoID0gZm9ybWF0Q3NzVW5pdCh0aGlzLl9zdGF0ZS53aWR0aCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3N0YXRlLmhlaWdodCB8fCB0aGlzLl9zdGF0ZS5oZWlnaHQgPT09IDApIHtcbiAgICAgIHRoaXMuX3BhbmUuc3R5bGUuaGVpZ2h0ID0gZm9ybWF0Q3NzVW5pdCh0aGlzLl9zdGF0ZS5oZWlnaHQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9zdGF0ZS5taW5XaWR0aCB8fCB0aGlzLl9zdGF0ZS5taW5XaWR0aCA9PT0gMCkge1xuICAgICAgdGhpcy5fcGFuZS5zdHlsZS5taW5XaWR0aCA9IGZvcm1hdENzc1VuaXQodGhpcy5fc3RhdGUubWluV2lkdGgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9zdGF0ZS5taW5IZWlnaHQgfHwgdGhpcy5fc3RhdGUubWluSGVpZ2h0ID09PSAwKSB7XG4gICAgICB0aGlzLl9wYW5lLnN0eWxlLm1pbkhlaWdodCA9IGZvcm1hdENzc1VuaXQodGhpcy5fc3RhdGUubWluSGVpZ2h0KTtcbiAgICB9XG4gIH1cblxuICAvKiogVG9nZ2xlcyB0aGUgcG9pbnRlciBldmVudHMgZm9yIHRoZSBvdmVybGF5IHBhbmUgZWxlbWVudC4gKi9cbiAgcHJpdmF0ZSBfdG9nZ2xlUG9pbnRlckV2ZW50cyhlbmFibGVQb2ludGVyOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcGFuZS5zdHlsZS5wb2ludGVyRXZlbnRzID0gZW5hYmxlUG9pbnRlciA/ICdhdXRvJyA6ICdub25lJztcbiAgfVxuXG4gIC8qKiBBdHRhY2hlcyBhIGJhY2tkcm9wIGZvciB0aGlzIG92ZXJsYXkuICovXG4gIHByaXZhdGUgX2F0dGFjaEJhY2tkcm9wKCkge1xuICAgIHRoaXMuX2JhY2tkcm9wRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX2JhY2tkcm9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjZGstb3ZlcmxheS1iYWNrZHJvcCcpO1xuICAgIHRoaXMuX2JhY2tkcm9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuX3N0YXRlLmJhY2tkcm9wQ2xhc3MpO1xuXG4gICAgLy8gSW5zZXJ0IHRoZSBiYWNrZHJvcCBiZWZvcmUgdGhlIHBhbmUgaW4gdGhlIERPTSBvcmRlcixcbiAgICAvLyBpbiBvcmRlciB0byBoYW5kbGUgc3RhY2tlZCBvdmVybGF5cyBwcm9wZXJseS5cbiAgICB0aGlzLl9wYW5lLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRoaXMuX2JhY2tkcm9wRWxlbWVudCwgdGhpcy5fcGFuZSk7XG5cbiAgICAvLyBGb3J3YXJkIGJhY2tkcm9wIGNsaWNrcyBzdWNoIHRoYXQgdGhlIGNvbnN1bWVyIG9mIHRoZSBvdmVybGF5IGNhbiBwZXJmb3JtIHdoYXRldmVyXG4gICAgLy8gYWN0aW9uIGRlc2lyZWQgd2hlbiBzdWNoIGEgY2xpY2sgb2NjdXJzICh1c3VhbGx5IGNsb3NpbmcgdGhlIG92ZXJsYXkpLlxuICAgIHRoaXMuX2JhY2tkcm9wRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuX2JhY2tkcm9wQ2xpY2submV4dChudWxsKSk7XG5cbiAgICAvLyBBZGQgY2xhc3MgdG8gZmFkZS1pbiB0aGUgYmFja2Ryb3AgYWZ0ZXIgb25lIGZyYW1lLlxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fYmFja2Ryb3BFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX2JhY2tkcm9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5nJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgc3RhY2tpbmcgb3JkZXIgb2YgdGhlIGVsZW1lbnQsIG1vdmluZyBpdCB0byB0aGUgdG9wIGlmIG5lY2Vzc2FyeS5cbiAgICogVGhpcyBpcyByZXF1aXJlZCBpbiBjYXNlcyB3aGVyZSBvbmUgb3ZlcmxheSB3YXMgZGV0YWNoZWQsIHdoaWxlIGFub3RoZXIgb25lLFxuICAgKiB0aGF0IHNob3VsZCBiZSBiZWhpbmQgaXQsIHdhcyBkZXN0cm95ZWQuIFRoZSBuZXh0IHRpbWUgYm90aCBvZiB0aGVtIGFyZSBvcGVuZWQsXG4gICAqIHRoZSBzdGFja2luZyB3aWxsIGJlIHdyb25nLCBiZWNhdXNlIHRoZSBkZXRhY2hlZCBlbGVtZW50J3MgcGFuZSB3aWxsIHN0aWxsIGJlXG4gICAqIGluIGl0cyBvcmlnaW5hbCBET00gcG9zaXRpb24uXG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVTdGFja2luZ09yZGVyKCkge1xuICAgIGlmICh0aGlzLl9wYW5lLm5leHRTaWJsaW5nKSB7XG4gICAgICB0aGlzLl9wYW5lLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodGhpcy5fcGFuZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIERldGFjaGVzIHRoZSBiYWNrZHJvcCAoaWYgYW55KSBhc3NvY2lhdGVkIHdpdGggdGhlIG92ZXJsYXkuICovXG4gIGRldGFjaEJhY2tkcm9wKCk6IHZvaWQge1xuICAgIGxldCBiYWNrZHJvcFRvRGV0YWNoID0gdGhpcy5fYmFja2Ryb3BFbGVtZW50O1xuXG4gICAgaWYgKGJhY2tkcm9wVG9EZXRhY2gpIHtcbiAgICAgIGxldCBmaW5pc2hEZXRhY2ggPSAoKSA9PiB7XG4gICAgICAgIC8vIEl0IG1heSBub3QgYmUgYXR0YWNoZWQgdG8gYW55dGhpbmcgaW4gY2VydGFpbiBjYXNlcyAoZS5nLiB1bml0IHRlc3RzKS5cbiAgICAgICAgaWYgKGJhY2tkcm9wVG9EZXRhY2ggJiYgYmFja2Ryb3BUb0RldGFjaC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgYmFja2Ryb3BUb0RldGFjaC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJhY2tkcm9wVG9EZXRhY2gpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSXQgaXMgcG9zc2libGUgdGhhdCBhIG5ldyBwb3J0YWwgaGFzIGJlZW4gYXR0YWNoZWQgdG8gdGhpcyBvdmVybGF5IHNpbmNlIHdlIHN0YXJ0ZWRcbiAgICAgICAgLy8gcmVtb3ZpbmcgdGhlIGJhY2tkcm9wLiBJZiB0aGF0IGlzIHRoZSBjYXNlLCBvbmx5IGNsZWFyIHRoZSBiYWNrZHJvcCByZWZlcmVuY2UgaWYgaXRcbiAgICAgICAgLy8gaXMgc3RpbGwgdGhlIHNhbWUgaW5zdGFuY2UgdGhhdCB3ZSBzdGFydGVkIHRvIHJlbW92ZS5cbiAgICAgICAgaWYgKHRoaXMuX2JhY2tkcm9wRWxlbWVudCA9PSBiYWNrZHJvcFRvRGV0YWNoKSB7XG4gICAgICAgICAgdGhpcy5fYmFja2Ryb3BFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgYmFja2Ryb3BUb0RldGFjaC5jbGFzc0xpc3QucmVtb3ZlKCdjZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5nJyk7XG4gICAgICBiYWNrZHJvcFRvRGV0YWNoLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fc3RhdGUuYmFja2Ryb3BDbGFzcyk7XG4gICAgICBiYWNrZHJvcFRvRGV0YWNoLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmaW5pc2hEZXRhY2gpO1xuXG4gICAgICAvLyBJZiB0aGUgYmFja2Ryb3AgZG9lc24ndCBoYXZlIGEgdHJhbnNpdGlvbiwgdGhlIGB0cmFuc2l0aW9uZW5kYCBldmVudCB3b24ndCBmaXJlLlxuICAgICAgLy8gSW4gdGhpcyBjYXNlIHdlIG1ha2UgaXQgdW5jbGlja2FibGUgYW5kIHdlIHRyeSB0byByZW1vdmUgaXQgYWZ0ZXIgYSBkZWxheS5cbiAgICAgIGJhY2tkcm9wVG9EZXRhY2guc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcblxuICAgICAgLy8gUnVuIHRoaXMgb3V0c2lkZSB0aGUgQW5ndWxhciB6b25lIGJlY2F1c2UgdGhlcmUncyBub3RoaW5nIHRoYXQgQW5ndWxhciBjYXJlcyBhYm91dC5cbiAgICAgIC8vIElmIGl0IHdlcmUgdG8gcnVuIGluc2lkZSB0aGUgQW5ndWxhciB6b25lLCBldmVyeSB0ZXN0IHRoYXQgdXNlZCBPdmVybGF5IHdvdWxkIGhhdmUgdG8gYmVcbiAgICAgIC8vIGVpdGhlciBhc3luYyBvciBmYWtlQXN5bmMuXG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KGZpbmlzaERldGFjaCwgNTAwKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXRDc3NVbml0KHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyB2YWx1ZSBhcyBzdHJpbmcgOiBgJHt2YWx1ZX1weGA7XG59XG4iXX0=