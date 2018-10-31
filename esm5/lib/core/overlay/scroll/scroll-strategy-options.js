/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CloseScrollStrategy } from './close-scroll-strategy';
import { NoopScrollStrategy } from './noop-scroll-strategy';
import { BlockScrollStrategy } from './block-scroll-strategy';
import { ScrollDispatcher } from './scroll-dispatcher';
import { ViewportRuler } from '../position/viewport-ruler';
import { RepositionScrollStrategy, } from './reposition-scroll-strategy';
/**
 * Options for how an overlay will handle scrolling.
 *
 * Users can provide a custom value for `ScrollStrategyOptions` to replace the default
 * behaviors. This class primarily acts as a factory for ScrollStrategy instances.
 */
var ScrollStrategyOptions = /** @class */ (function () {
    function ScrollStrategyOptions(_scrollDispatcher, _viewportRuler) {
        var _this = this;
        this._scrollDispatcher = _scrollDispatcher;
        this._viewportRuler = _viewportRuler;
        /**
         * Do nothing on scroll.
         */
        this.noop = function () { return new NoopScrollStrategy(); };
        /**
         * Close the overlay as soon as the user scrolls.
         */
        this.close = function () { return new CloseScrollStrategy(_this._scrollDispatcher); };
        /**
         * Block scrolling.
         */
        this.block = function () { return new BlockScrollStrategy(_this._viewportRuler); };
        /**
         * Update the overlay's position on scroll.
         * @param config Configuration to be used inside the scroll strategy.
         * Allows debouncing the reposition calls.
         */
        this.reposition = function (config) {
            return new RepositionScrollStrategy(_this._scrollDispatcher, config);
        };
    }
    ScrollStrategyOptions.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ScrollStrategyOptions.ctorParameters = function () { return [
        { type: ScrollDispatcher },
        { type: ViewportRuler }
    ]; };
    return ScrollStrategyOptions;
}());
export { ScrollStrategyOptions };
if (false) {
    /**
     * Do nothing on scroll.
     * @type {?}
     */
    ScrollStrategyOptions.prototype.noop;
    /**
     * Close the overlay as soon as the user scrolls.
     * @type {?}
     */
    ScrollStrategyOptions.prototype.close;
    /**
     * Block scrolling.
     * @type {?}
     */
    ScrollStrategyOptions.prototype.block;
    /**
     * Update the overlay's position on scroll.
     * \@param config Configuration to be used inside the scroll strategy.
     * Allows debouncing the reposition calls.
     * @type {?}
     */
    ScrollStrategyOptions.prototype.reposition;
    /** @type {?} */
    ScrollStrategyOptions.prototype._scrollDispatcher;
    /** @type {?} */
    ScrollStrategyOptions.prototype._viewportRuler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXN0cmF0ZWd5LW9wdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL292ZXJsYXkvc2Nyb2xsL3Njcm9sbC1zdHJhdGVneS1vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQ0wsd0JBQXdCLEdBRXpCLE1BQU0sOEJBQThCLENBQUM7Ozs7Ozs7O0lBV3BDLCtCQUNVLG1CQUNBO1FBRlYsaUJBRTRDO1FBRGxDLHNCQUFpQixHQUFqQixpQkFBaUI7UUFDakIsbUJBQWMsR0FBZCxjQUFjOzs7O29CQUdqQixjQUFNLE9BQUEsSUFBSSxrQkFBa0IsRUFBRSxFQUF4QixDQUF3Qjs7OztxQkFHN0IsY0FBTSxPQUFBLElBQUksbUJBQW1CLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLEVBQS9DLENBQStDOzs7O3FCQUdyRCxjQUFNLE9BQUEsSUFBSSxtQkFBbUIsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLEVBQTVDLENBQTRDOzs7Ozs7MEJBTzdDLFVBQUMsTUFBdUM7WUFDakQsT0FBQSxJQUFJLHdCQUF3QixDQUFDLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUM7UUFBNUQsQ0FBNEQ7S0FqQnBCOztnQkFKN0MsVUFBVTs7OztnQkFkSCxnQkFBZ0I7Z0JBQ2hCLGFBQWE7O2dDQU5yQjs7U0FvQmEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U2Nyb2xsU3RyYXRlZ3l9IGZyb20gJy4vc2Nyb2xsLXN0cmF0ZWd5JztcbmltcG9ydCB7Q2xvc2VTY3JvbGxTdHJhdGVneX0gZnJvbSAnLi9jbG9zZS1zY3JvbGwtc3RyYXRlZ3knO1xuaW1wb3J0IHtOb29wU2Nyb2xsU3RyYXRlZ3l9IGZyb20gJy4vbm9vcC1zY3JvbGwtc3RyYXRlZ3knO1xuaW1wb3J0IHtCbG9ja1Njcm9sbFN0cmF0ZWd5fSBmcm9tICcuL2Jsb2NrLXNjcm9sbC1zdHJhdGVneSc7XG5pbXBvcnQge1Njcm9sbERpc3BhdGNoZXJ9IGZyb20gJy4vc2Nyb2xsLWRpc3BhdGNoZXInO1xuaW1wb3J0IHtWaWV3cG9ydFJ1bGVyfSBmcm9tICcuLi9wb3NpdGlvbi92aWV3cG9ydC1ydWxlcic7XG5pbXBvcnQge1xuICBSZXBvc2l0aW9uU2Nyb2xsU3RyYXRlZ3ksXG4gIFJlcG9zaXRpb25TY3JvbGxTdHJhdGVneUNvbmZpZyxcbn0gZnJvbSAnLi9yZXBvc2l0aW9uLXNjcm9sbC1zdHJhdGVneSc7XG5cblxuLyoqXG4gKiBPcHRpb25zIGZvciBob3cgYW4gb3ZlcmxheSB3aWxsIGhhbmRsZSBzY3JvbGxpbmcuXG4gKlxuICogVXNlcnMgY2FuIHByb3ZpZGUgYSBjdXN0b20gdmFsdWUgZm9yIGBTY3JvbGxTdHJhdGVneU9wdGlvbnNgIHRvIHJlcGxhY2UgdGhlIGRlZmF1bHRcbiAqIGJlaGF2aW9ycy4gVGhpcyBjbGFzcyBwcmltYXJpbHkgYWN0cyBhcyBhIGZhY3RvcnkgZm9yIFNjcm9sbFN0cmF0ZWd5IGluc3RhbmNlcy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNjcm9sbFN0cmF0ZWd5T3B0aW9ucyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3Njcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsXG4gICAgcHJpdmF0ZSBfdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlcikgeyB9XG5cbiAgLyoqIERvIG5vdGhpbmcgb24gc2Nyb2xsLiAqL1xuICBub29wID0gKCkgPT4gbmV3IE5vb3BTY3JvbGxTdHJhdGVneSgpO1xuXG4gIC8qKiBDbG9zZSB0aGUgb3ZlcmxheSBhcyBzb29uIGFzIHRoZSB1c2VyIHNjcm9sbHMuICovXG4gIGNsb3NlID0gKCkgPT4gbmV3IENsb3NlU2Nyb2xsU3RyYXRlZ3kodGhpcy5fc2Nyb2xsRGlzcGF0Y2hlcik7XG5cbiAgLyoqIEJsb2NrIHNjcm9sbGluZy4gKi9cbiAgYmxvY2sgPSAoKSA9PiBuZXcgQmxvY2tTY3JvbGxTdHJhdGVneSh0aGlzLl92aWV3cG9ydFJ1bGVyKTtcblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBvdmVybGF5J3MgcG9zaXRpb24gb24gc2Nyb2xsLlxuICAgKiBAcGFyYW0gY29uZmlnIENvbmZpZ3VyYXRpb24gdG8gYmUgdXNlZCBpbnNpZGUgdGhlIHNjcm9sbCBzdHJhdGVneS5cbiAgICogQWxsb3dzIGRlYm91bmNpbmcgdGhlIHJlcG9zaXRpb24gY2FsbHMuXG4gICAqL1xuICByZXBvc2l0aW9uID0gKGNvbmZpZz86IFJlcG9zaXRpb25TY3JvbGxTdHJhdGVneUNvbmZpZykgPT5cbiAgICAgIG5ldyBSZXBvc2l0aW9uU2Nyb2xsU3RyYXRlZ3kodGhpcy5fc2Nyb2xsRGlzcGF0Y2hlciwgY29uZmlnKVxufVxuIl19