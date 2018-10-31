/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * OverlayState is a bag of values for either the initial configuration or current state of an
 * overlay.
 */
var /**
 * OverlayState is a bag of values for either the initial configuration or current state of an
 * overlay.
 */
OverlayState = /** @class */ (function () {
    function OverlayState() {
        /**
         * Custom class to add to the overlay pane.
         */
        this.panelClass = '';
        /**
         * Whether the overlay has a backdrop.
         */
        this.hasBackdrop = false;
        /**
         * Custom class to add to the backdrop
         */
        this.backdropClass = 'cdk-overlay-dark-backdrop';
        /**
         * The direction of the text in the overlay panel.
         */
        this.direction = 'ltr';
    }
    return OverlayState;
}());
/**
 * OverlayState is a bag of values for either the initial configuration or current state of an
 * overlay.
 */
export { OverlayState };
if (false) {
    /**
     * Strategy with which to position the overlay.
     * @type {?}
     */
    OverlayState.prototype.positionStrategy;
    /**
     * Strategy to be used when handling scroll events while the overlay is open.
     * @type {?}
     */
    OverlayState.prototype.scrollStrategy;
    /**
     * Custom class to add to the overlay pane.
     * @type {?}
     */
    OverlayState.prototype.panelClass;
    /**
     * Whether the overlay has a backdrop.
     * @type {?}
     */
    OverlayState.prototype.hasBackdrop;
    /**
     * Custom class to add to the backdrop
     * @type {?}
     */
    OverlayState.prototype.backdropClass;
    /**
     * The width of the overlay panel. If a number is provided, pixel units are assumed.
     * @type {?}
     */
    OverlayState.prototype.width;
    /**
     * The height of the overlay panel. If a number is provided, pixel units are assumed.
     * @type {?}
     */
    OverlayState.prototype.height;
    /**
     * The min-width of the overlay panel. If a number is provided, pixel units are assumed.
     * @type {?}
     */
    OverlayState.prototype.minWidth;
    /**
     * The min-height of the overlay panel. If a number is provided, pixel units are assumed.
     * @type {?}
     */
    OverlayState.prototype.minHeight;
    /**
     * The direction of the text in the overlay panel.
     * @type {?}
     */
    OverlayState.prototype.direction;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2NvcmUvb3ZlcmxheS9vdmVybGF5LXN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBU0E7Ozs7QUFBQTs7Ozs7MEJBUXVCLEVBQUU7Ozs7MkJBR0EsS0FBSzs7Ozs2QkFHSiwyQkFBMkI7Ozs7eUJBZXRCLEtBQUs7O3VCQXRDcEM7SUE0Q0MsQ0FBQTs7Ozs7QUFuQ0Qsd0JBbUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQb3NpdGlvblN0cmF0ZWd5fSBmcm9tICcuL3Bvc2l0aW9uL3Bvc2l0aW9uLXN0cmF0ZWd5JztcbmltcG9ydCB7TGF5b3V0RGlyZWN0aW9ufSBmcm9tICcuLi9ydGwvZGlyJztcbmltcG9ydCB7U2Nyb2xsU3RyYXRlZ3l9IGZyb20gJy4vc2Nyb2xsL3Njcm9sbC1zdHJhdGVneSc7XG5cblxuLyoqXG4gKiBPdmVybGF5U3RhdGUgaXMgYSBiYWcgb2YgdmFsdWVzIGZvciBlaXRoZXIgdGhlIGluaXRpYWwgY29uZmlndXJhdGlvbiBvciBjdXJyZW50IHN0YXRlIG9mIGFuXG4gKiBvdmVybGF5LlxuICovXG5leHBvcnQgY2xhc3MgT3ZlcmxheVN0YXRlIHtcbiAgLyoqIFN0cmF0ZWd5IHdpdGggd2hpY2ggdG8gcG9zaXRpb24gdGhlIG92ZXJsYXkuICovXG4gIHBvc2l0aW9uU3RyYXRlZ3k6IFBvc2l0aW9uU3RyYXRlZ3k7XG5cbiAgLyoqIFN0cmF0ZWd5IHRvIGJlIHVzZWQgd2hlbiBoYW5kbGluZyBzY3JvbGwgZXZlbnRzIHdoaWxlIHRoZSBvdmVybGF5IGlzIG9wZW4uICovXG4gIHNjcm9sbFN0cmF0ZWd5OiBTY3JvbGxTdHJhdGVneTtcblxuICAvKiogQ3VzdG9tIGNsYXNzIHRvIGFkZCB0byB0aGUgb3ZlcmxheSBwYW5lLiAqL1xuICBwYW5lbENsYXNzOiBzdHJpbmcgPSAnJztcblxuICAvKiogV2hldGhlciB0aGUgb3ZlcmxheSBoYXMgYSBiYWNrZHJvcC4gKi9cbiAgaGFzQmFja2Ryb3A6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogQ3VzdG9tIGNsYXNzIHRvIGFkZCB0byB0aGUgYmFja2Ryb3AgKi9cbiAgYmFja2Ryb3BDbGFzczogc3RyaW5nID0gJ2Nkay1vdmVybGF5LWRhcmstYmFja2Ryb3AnO1xuXG4gIC8qKiBUaGUgd2lkdGggb2YgdGhlIG92ZXJsYXkgcGFuZWwuIElmIGEgbnVtYmVyIGlzIHByb3ZpZGVkLCBwaXhlbCB1bml0cyBhcmUgYXNzdW1lZC4gKi9cbiAgd2lkdGg6IG51bWJlciB8IHN0cmluZztcblxuICAvKiogVGhlIGhlaWdodCBvZiB0aGUgb3ZlcmxheSBwYW5lbC4gSWYgYSBudW1iZXIgaXMgcHJvdmlkZWQsIHBpeGVsIHVuaXRzIGFyZSBhc3N1bWVkLiAqL1xuICBoZWlnaHQ6IG51bWJlciB8IHN0cmluZztcblxuICAvKiogVGhlIG1pbi13aWR0aCBvZiB0aGUgb3ZlcmxheSBwYW5lbC4gSWYgYSBudW1iZXIgaXMgcHJvdmlkZWQsIHBpeGVsIHVuaXRzIGFyZSBhc3N1bWVkLiAqL1xuICBtaW5XaWR0aDogbnVtYmVyIHwgc3RyaW5nO1xuXG4gIC8qKiBUaGUgbWluLWhlaWdodCBvZiB0aGUgb3ZlcmxheSBwYW5lbC4gSWYgYSBudW1iZXIgaXMgcHJvdmlkZWQsIHBpeGVsIHVuaXRzIGFyZSBhc3N1bWVkLiAqL1xuICBtaW5IZWlnaHQ6IG51bWJlciB8IHN0cmluZztcblxuICAvKiogVGhlIGRpcmVjdGlvbiBvZiB0aGUgdGV4dCBpbiB0aGUgb3ZlcmxheSBwYW5lbC4gKi9cbiAgZGlyZWN0aW9uOiBMYXlvdXREaXJlY3Rpb24gPSAnbHRyJztcblxuICAvLyBUT0RPKGplbGJvdXJuKTogY29uZmlndXJhdGlvbiBzdGlsbCB0byBhZGRcbiAgLy8gLSBmb2N1cyB0cmFwXG4gIC8vIC0gZGlzYWJsZSBwb2ludGVyIGV2ZW50c1xuICAvLyAtIHotaW5kZXhcbn1cbiJdfQ==