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
export class ScrollStrategyOptions {
    /**
     * @param {?} _scrollDispatcher
     * @param {?} _viewportRuler
     */
    constructor(_scrollDispatcher, _viewportRuler) {
        this._scrollDispatcher = _scrollDispatcher;
        this._viewportRuler = _viewportRuler;
        /**
         * Do nothing on scroll.
         */
        this.noop = () => new NoopScrollStrategy();
        /**
         * Close the overlay as soon as the user scrolls.
         */
        this.close = () => new CloseScrollStrategy(this._scrollDispatcher);
        /**
         * Block scrolling.
         */
        this.block = () => new BlockScrollStrategy(this._viewportRuler);
        /**
         * Update the overlay's position on scroll.
         * @param config Configuration to be used inside the scroll strategy.
         * Allows debouncing the reposition calls.
         */
        this.reposition = (config) => new RepositionScrollStrategy(this._scrollDispatcher, config);
    }
}
ScrollStrategyOptions.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ScrollStrategyOptions.ctorParameters = () => [
    { type: ScrollDispatcher },
    { type: ViewportRuler }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXN0cmF0ZWd5LW9wdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL292ZXJsYXkvc2Nyb2xsL3Njcm9sbC1zdHJhdGVneS1vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQ0wsd0JBQXdCLEdBRXpCLE1BQU0sOEJBQThCLENBQUM7Ozs7Ozs7QUFVdEMsTUFBTTs7Ozs7SUFDSixZQUNVLG1CQUNBO1FBREEsc0JBQWlCLEdBQWpCLGlCQUFpQjtRQUNqQixtQkFBYyxHQUFkLGNBQWM7Ozs7b0JBR2pCLEdBQUcsRUFBRSxDQUFDLElBQUksa0JBQWtCLEVBQUU7Ozs7cUJBRzdCLEdBQUcsRUFBRSxDQUFDLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDOzs7O3FCQUdyRCxHQUFHLEVBQUUsQ0FBQyxJQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7Ozs7OzswQkFPN0MsQ0FBQyxNQUF1QyxFQUFFLEVBQUUsQ0FDckQsSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDO0tBakJwQjs7O1lBSjdDLFVBQVU7Ozs7WUFkSCxnQkFBZ0I7WUFDaEIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1Njcm9sbFN0cmF0ZWd5fSBmcm9tICcuL3Njcm9sbC1zdHJhdGVneSc7XG5pbXBvcnQge0Nsb3NlU2Nyb2xsU3RyYXRlZ3l9IGZyb20gJy4vY2xvc2Utc2Nyb2xsLXN0cmF0ZWd5JztcbmltcG9ydCB7Tm9vcFNjcm9sbFN0cmF0ZWd5fSBmcm9tICcuL25vb3Atc2Nyb2xsLXN0cmF0ZWd5JztcbmltcG9ydCB7QmxvY2tTY3JvbGxTdHJhdGVneX0gZnJvbSAnLi9ibG9jay1zY3JvbGwtc3RyYXRlZ3knO1xuaW1wb3J0IHtTY3JvbGxEaXNwYXRjaGVyfSBmcm9tICcuL3Njcm9sbC1kaXNwYXRjaGVyJztcbmltcG9ydCB7Vmlld3BvcnRSdWxlcn0gZnJvbSAnLi4vcG9zaXRpb24vdmlld3BvcnQtcnVsZXInO1xuaW1wb3J0IHtcbiAgUmVwb3NpdGlvblNjcm9sbFN0cmF0ZWd5LFxuICBSZXBvc2l0aW9uU2Nyb2xsU3RyYXRlZ3lDb25maWcsXG59IGZyb20gJy4vcmVwb3NpdGlvbi1zY3JvbGwtc3RyYXRlZ3knO1xuXG5cbi8qKlxuICogT3B0aW9ucyBmb3IgaG93IGFuIG92ZXJsYXkgd2lsbCBoYW5kbGUgc2Nyb2xsaW5nLlxuICpcbiAqIFVzZXJzIGNhbiBwcm92aWRlIGEgY3VzdG9tIHZhbHVlIGZvciBgU2Nyb2xsU3RyYXRlZ3lPcHRpb25zYCB0byByZXBsYWNlIHRoZSBkZWZhdWx0XG4gKiBiZWhhdmlvcnMuIFRoaXMgY2xhc3MgcHJpbWFyaWx5IGFjdHMgYXMgYSBmYWN0b3J5IGZvciBTY3JvbGxTdHJhdGVneSBpbnN0YW5jZXMuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTY3JvbGxTdHJhdGVneU9wdGlvbnMge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9zY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLFxuICAgIHByaXZhdGUgX3ZpZXdwb3J0UnVsZXI6IFZpZXdwb3J0UnVsZXIpIHsgfVxuXG4gIC8qKiBEbyBub3RoaW5nIG9uIHNjcm9sbC4gKi9cbiAgbm9vcCA9ICgpID0+IG5ldyBOb29wU2Nyb2xsU3RyYXRlZ3koKTtcblxuICAvKiogQ2xvc2UgdGhlIG92ZXJsYXkgYXMgc29vbiBhcyB0aGUgdXNlciBzY3JvbGxzLiAqL1xuICBjbG9zZSA9ICgpID0+IG5ldyBDbG9zZVNjcm9sbFN0cmF0ZWd5KHRoaXMuX3Njcm9sbERpc3BhdGNoZXIpO1xuXG4gIC8qKiBCbG9jayBzY3JvbGxpbmcuICovXG4gIGJsb2NrID0gKCkgPT4gbmV3IEJsb2NrU2Nyb2xsU3RyYXRlZ3kodGhpcy5fdmlld3BvcnRSdWxlcik7XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgb3ZlcmxheSdzIHBvc2l0aW9uIG9uIHNjcm9sbC5cbiAgICogQHBhcmFtIGNvbmZpZyBDb25maWd1cmF0aW9uIHRvIGJlIHVzZWQgaW5zaWRlIHRoZSBzY3JvbGwgc3RyYXRlZ3kuXG4gICAqIEFsbG93cyBkZWJvdW5jaW5nIHRoZSByZXBvc2l0aW9uIGNhbGxzLlxuICAgKi9cbiAgcmVwb3NpdGlvbiA9IChjb25maWc/OiBSZXBvc2l0aW9uU2Nyb2xsU3RyYXRlZ3lDb25maWcpID0+XG4gICAgICBuZXcgUmVwb3NpdGlvblNjcm9sbFN0cmF0ZWd5KHRoaXMuX3Njcm9sbERpc3BhdGNoZXIsIGNvbmZpZylcbn1cbiJdfQ==