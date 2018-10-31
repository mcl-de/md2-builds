/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Optional, SkipSelf } from '@angular/core';
import { ScrollDispatcher } from '../scroll/scroll-dispatcher';
/**
 * Simple utility for getting the bounds of the browser viewport.
 * \@docs-private
 */
var ViewportRuler = /** @class */ (function () {
    function ViewportRuler(scrollDispatcher) {
        var _this = this;
        // Subscribe to scroll and resize events and update the document rectangle on changes.
        scrollDispatcher.scrolled(null, function () { return _this._cacheViewportGeometry(); });
    }
    /** Gets a ClientRect for the viewport's bounds. */
    /**
     * Gets a ClientRect for the viewport's bounds.
     * @param {?=} documentRect
     * @return {?}
     */
    ViewportRuler.prototype.getViewportRect = /**
     * Gets a ClientRect for the viewport's bounds.
     * @param {?=} documentRect
     * @return {?}
     */
    function (documentRect) {
        if (documentRect === void 0) { documentRect = this._documentRect; }
        // Cache the document bounding rect so that we don't recompute it for multiple calls.
        if (!documentRect) {
            this._cacheViewportGeometry();
            documentRect = this._documentRect;
        }
        /** @type {?} */
        var scrollPosition = this.getViewportScrollPosition(documentRect);
        /** @type {?} */
        var height = window.innerHeight;
        /** @type {?} */
        var width = window.innerWidth;
        return {
            top: scrollPosition.top,
            left: scrollPosition.left,
            bottom: scrollPosition.top + height,
            right: scrollPosition.left + width,
            height: height,
            width: width,
        };
    };
    /**
     * Gets the (top, left) scroll position of the viewport.
     * @param documentRect
     */
    /**
     * Gets the (top, left) scroll position of the viewport.
     * @param {?=} documentRect
     * @return {?}
     */
    ViewportRuler.prototype.getViewportScrollPosition = /**
     * Gets the (top, left) scroll position of the viewport.
     * @param {?=} documentRect
     * @return {?}
     */
    function (documentRect) {
        if (documentRect === void 0) { documentRect = this._documentRect; }
        // Cache the document bounding rect so that we don't recompute it for multiple calls.
        if (!documentRect) {
            this._cacheViewportGeometry();
            documentRect = this._documentRect;
        }
        /** @type {?} */
        var top = -documentRect.top || document.body.scrollTop || window.scrollY ||
            document.documentElement.scrollTop || 0;
        /** @type {?} */
        var left = -documentRect.left || document.body.scrollLeft || window.scrollX ||
            document.documentElement.scrollLeft || 0;
        return { top: top, left: left };
    };
    /** Caches the latest client rectangle of the document element. */
    /**
     * Caches the latest client rectangle of the document element.
     * @return {?}
     */
    ViewportRuler.prototype._cacheViewportGeometry = /**
     * Caches the latest client rectangle of the document element.
     * @return {?}
     */
    function () {
        this._documentRect = document.documentElement.getBoundingClientRect();
    };
    ViewportRuler.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ViewportRuler.ctorParameters = function () { return [
        { type: ScrollDispatcher }
    ]; };
    return ViewportRuler;
}());
export { ViewportRuler };
if (false) {
    /**
     * Cached document client rectangle.
     * @type {?}
     */
    ViewportRuler.prototype._documentRect;
}
/**
 * @param {?} parentRuler
 * @param {?} scrollDispatcher
 * @return {?}
 */
export function VIEWPORT_RULER_PROVIDER_FACTORY(parentRuler, scrollDispatcher) {
    return parentRuler || new ViewportRuler(scrollDispatcher);
}
/** @type {?} */
export var VIEWPORT_RULER_PROVIDER = {
    // If there is already a ViewportRuler available, use that. Otherwise, provide a new one.
    provide: ViewportRuler,
    deps: [[new Optional(), new SkipSelf(), ViewportRuler], ScrollDispatcher],
    useFactory: VIEWPORT_RULER_PROVIDER_FACTORY
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3BvcnQtcnVsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL292ZXJsYXkvcG9zaXRpb24vdmlld3BvcnQtcnVsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQzs7Ozs7O0lBYTNELHVCQUFZLGdCQUFrQztRQUE5QyxpQkFHQzs7UUFEQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsc0JBQXNCLEVBQUUsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO0tBQ3RFO0lBRUQsbURBQW1EOzs7Ozs7SUFDbkQsdUNBQWU7Ozs7O0lBQWYsVUFBZ0IsWUFBaUM7UUFBakMsNkJBQUEsRUFBQSxlQUFlLElBQUksQ0FBQyxhQUFhOztRQUUvQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQzlCLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQ25DOztRQVdELElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLENBQUMsQ0FBQzs7UUFDcEUsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQzs7UUFDbEMsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUVoQyxPQUFPO1lBQ0wsR0FBRyxFQUFFLGNBQWMsQ0FBQyxHQUFHO1lBQ3ZCLElBQUksRUFBRSxjQUFjLENBQUMsSUFBSTtZQUN6QixNQUFNLEVBQUUsY0FBYyxDQUFDLEdBQUcsR0FBRyxNQUFNO1lBQ25DLEtBQUssRUFBRSxjQUFjLENBQUMsSUFBSSxHQUFHLEtBQUs7WUFDbEMsTUFBTSxRQUFBO1lBQ04sS0FBSyxPQUFBO1NBQ04sQ0FBQztLQUNIO0lBR0Q7OztPQUdHOzs7Ozs7SUFDSCxpREFBeUI7Ozs7O0lBQXpCLFVBQTBCLFlBQWlDO1FBQWpDLDZCQUFBLEVBQUEsZUFBZSxJQUFJLENBQUMsYUFBYTs7UUFFekQsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNqQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUM5QixZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUNuQzs7UUFRRCxJQUFNLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLE9BQU87WUFDNUQsUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDOztRQUV0RCxJQUFNLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLE9BQU87WUFDL0QsUUFBUSxDQUFDLGVBQWUsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDO1FBRXZELE9BQU8sRUFBQyxHQUFHLEtBQUEsRUFBRSxJQUFJLE1BQUEsRUFBQyxDQUFDO0tBQ3BCO0lBRUQsa0VBQWtFOzs7OztJQUNsRSw4Q0FBc0I7Ozs7SUFBdEI7UUFDRSxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMscUJBQXFCLEVBQUUsQ0FBQztLQUN2RTs7Z0JBeEVGLFVBQVU7Ozs7Z0JBUEgsZ0JBQWdCOzt3QkFEeEI7O1NBU2EsYUFBYTs7Ozs7Ozs7Ozs7OztBQTJFMUIsTUFBTSwwQ0FBMEMsV0FBMEIsRUFDMUIsZ0JBQWtDO0lBQ2hGLE9BQU8sV0FBVyxJQUFJLElBQUksYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Q0FDM0Q7O0FBRUQsV0FBYSx1QkFBdUIsR0FBRzs7SUFFckMsT0FBTyxFQUFFLGFBQWE7SUFDdEIsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLElBQUksUUFBUSxFQUFFLEVBQUUsYUFBYSxDQUFDLEVBQUUsZ0JBQWdCLENBQUM7SUFDekUsVUFBVSxFQUFFLCtCQUErQjtDQUM1QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBPcHRpb25hbCwgU2tpcFNlbGZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTY3JvbGxEaXNwYXRjaGVyfSBmcm9tICcuLi9zY3JvbGwvc2Nyb2xsLWRpc3BhdGNoZXInO1xuXG5cbi8qKlxuICogU2ltcGxlIHV0aWxpdHkgZm9yIGdldHRpbmcgdGhlIGJvdW5kcyBvZiB0aGUgYnJvd3NlciB2aWV3cG9ydC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZpZXdwb3J0UnVsZXIge1xuXG4gIC8qKiBDYWNoZWQgZG9jdW1lbnQgY2xpZW50IHJlY3RhbmdsZS4gKi9cbiAgcHJpdmF0ZSBfZG9jdW1lbnRSZWN0PzogQ2xpZW50UmVjdDtcblxuICBjb25zdHJ1Y3RvcihzY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyKSB7XG4gICAgLy8gU3Vic2NyaWJlIHRvIHNjcm9sbCBhbmQgcmVzaXplIGV2ZW50cyBhbmQgdXBkYXRlIHRoZSBkb2N1bWVudCByZWN0YW5nbGUgb24gY2hhbmdlcy5cbiAgICBzY3JvbGxEaXNwYXRjaGVyLnNjcm9sbGVkKG51bGwsICgpID0+IHRoaXMuX2NhY2hlVmlld3BvcnRHZW9tZXRyeSgpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGEgQ2xpZW50UmVjdCBmb3IgdGhlIHZpZXdwb3J0J3MgYm91bmRzLiAqL1xuICBnZXRWaWV3cG9ydFJlY3QoZG9jdW1lbnRSZWN0ID0gdGhpcy5fZG9jdW1lbnRSZWN0KTogQ2xpZW50UmVjdCB7XG4gICAgLy8gQ2FjaGUgdGhlIGRvY3VtZW50IGJvdW5kaW5nIHJlY3Qgc28gdGhhdCB3ZSBkb24ndCByZWNvbXB1dGUgaXQgZm9yIG11bHRpcGxlIGNhbGxzLlxuICAgIGlmICghZG9jdW1lbnRSZWN0KSB7XG4gICAgICB0aGlzLl9jYWNoZVZpZXdwb3J0R2VvbWV0cnkoKTtcbiAgICAgIGRvY3VtZW50UmVjdCA9IHRoaXMuX2RvY3VtZW50UmVjdDtcbiAgICB9XG5cbiAgICAvLyBVc2UgdGhlIGRvY3VtZW50IGVsZW1lbnQncyBib3VuZGluZyByZWN0IHJhdGhlciB0aGFuIHRoZSB3aW5kb3cgc2Nyb2xsIHByb3BlcnRpZXNcbiAgICAvLyAoZS5nLiBwYWdlWU9mZnNldCwgc2Nyb2xsWSkgZHVlIHRvIGluIGlzc3VlIGluIENocm9tZSBhbmQgSUUgd2hlcmUgd2luZG93IHNjcm9sbFxuICAgIC8vIHByb3BlcnRpZXMgYW5kIGNsaWVudCBjb29yZGluYXRlcyAoYm91bmRpbmdDbGllbnRSZWN0LCBjbGllbnRYL1ksIGV0Yy4pIGFyZSBpbiBkaWZmZXJlbnRcbiAgICAvLyBjb25jZXB0dWFsIHZpZXdwb3J0cy4gVW5kZXIgbW9zdCBjaXJjdW1zdGFuY2VzIHRoZXNlIHZpZXdwb3J0cyBhcmUgZXF1aXZhbGVudCwgYnV0IHRoZXlcbiAgICAvLyBjYW4gZGlzYWdyZWUgd2hlbiB0aGUgcGFnZSBpcyBwaW5jaC16b29tZWQgKG9uIGRldmljZXMgdGhhdCBzdXBwb3J0IHRvdWNoKS5cbiAgICAvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDg5MjA2I2M0XG4gICAgLy8gV2UgdXNlIHRoZSBkb2N1bWVudEVsZW1lbnQgaW5zdGVhZCBvZiB0aGUgYm9keSBiZWNhdXNlLCBieSBkZWZhdWx0ICh3aXRob3V0IGEgY3NzIHJlc2V0KVxuICAgIC8vIGJyb3dzZXJzIHR5cGljYWxseSBnaXZlIHRoZSBkb2N1bWVudCBib2R5IGFuIDhweCBtYXJnaW4sIHdoaWNoIGlzIG5vdCBpbmNsdWRlZCBpblxuICAgIC8vIGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLlxuICAgIGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gdGhpcy5nZXRWaWV3cG9ydFNjcm9sbFBvc2l0aW9uKGRvY3VtZW50UmVjdCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIGNvbnN0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9wOiBzY3JvbGxQb3NpdGlvbi50b3AsXG4gICAgICBsZWZ0OiBzY3JvbGxQb3NpdGlvbi5sZWZ0LFxuICAgICAgYm90dG9tOiBzY3JvbGxQb3NpdGlvbi50b3AgKyBoZWlnaHQsXG4gICAgICByaWdodDogc2Nyb2xsUG9zaXRpb24ubGVmdCArIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgd2lkdGgsXG4gICAgfTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldHMgdGhlICh0b3AsIGxlZnQpIHNjcm9sbCBwb3NpdGlvbiBvZiB0aGUgdmlld3BvcnQuXG4gICAqIEBwYXJhbSBkb2N1bWVudFJlY3RcbiAgICovXG4gIGdldFZpZXdwb3J0U2Nyb2xsUG9zaXRpb24oZG9jdW1lbnRSZWN0ID0gdGhpcy5fZG9jdW1lbnRSZWN0KSB7XG4gICAgLy8gQ2FjaGUgdGhlIGRvY3VtZW50IGJvdW5kaW5nIHJlY3Qgc28gdGhhdCB3ZSBkb24ndCByZWNvbXB1dGUgaXQgZm9yIG11bHRpcGxlIGNhbGxzLlxuICAgIGlmICghZG9jdW1lbnRSZWN0KSB7XG4gICAgICB0aGlzLl9jYWNoZVZpZXdwb3J0R2VvbWV0cnkoKTtcbiAgICAgIGRvY3VtZW50UmVjdCA9IHRoaXMuX2RvY3VtZW50UmVjdDtcbiAgICB9XG5cbiAgICAvLyBUaGUgdG9wLWxlZnQtY29ybmVyIG9mIHRoZSB2aWV3cG9ydCBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBzY3JvbGwgcG9zaXRpb24gb2YgdGhlIGRvY3VtZW50XG4gICAgLy8gYm9keSwgbm9ybWFsbHkganVzdCAoc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wKS4gSG93ZXZlciwgQ2hyb21lIGFuZCBGaXJlZm94IGRpc2FncmVlIGFib3V0XG4gICAgLy8gd2hldGhlciBgZG9jdW1lbnQuYm9keWAgb3IgYGRvY3VtZW50LmRvY3VtZW50RWxlbWVudGAgaXMgdGhlIHNjcm9sbGVkIGVsZW1lbnQsIHNvIHJlYWRpbmdcbiAgICAvLyBgc2Nyb2xsVG9wYCBhbmQgYHNjcm9sbExlZnRgIGlzIGluY29uc2lzdGVudC4gSG93ZXZlciwgdXNpbmcgdGhlIGJvdW5kaW5nIHJlY3Qgb2ZcbiAgICAvLyBgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50YCB3b3JrcyBjb25zaXN0ZW50bHksIHdoZXJlIHRoZSBgdG9wYCBhbmQgYGxlZnRgIHZhbHVlcyB3aWxsXG4gICAgLy8gZXF1YWwgbmVnYXRpdmUgdGhlIHNjcm9sbCBwb3NpdGlvbi5cbiAgICBjb25zdCB0b3AgPSAtZG9jdW1lbnRSZWN0LnRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCB3aW5kb3cuc2Nyb2xsWSB8fFxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCAwO1xuXG4gICAgY29uc3QgbGVmdCA9IC1kb2N1bWVudFJlY3QubGVmdCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgd2luZG93LnNjcm9sbFggfHxcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0IHx8IDA7XG5cbiAgICByZXR1cm4ge3RvcCwgbGVmdH07XG4gIH1cblxuICAvKiogQ2FjaGVzIHRoZSBsYXRlc3QgY2xpZW50IHJlY3RhbmdsZSBvZiB0aGUgZG9jdW1lbnQgZWxlbWVudC4gKi9cbiAgX2NhY2hlVmlld3BvcnRHZW9tZXRyeSgpIHtcbiAgICB0aGlzLl9kb2N1bWVudFJlY3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gVklFV1BPUlRfUlVMRVJfUFJPVklERVJfRkFDVE9SWShwYXJlbnRSdWxlcjogVmlld3BvcnRSdWxlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIpIHtcbiAgcmV0dXJuIHBhcmVudFJ1bGVyIHx8IG5ldyBWaWV3cG9ydFJ1bGVyKHNjcm9sbERpc3BhdGNoZXIpO1xufVxuXG5leHBvcnQgY29uc3QgVklFV1BPUlRfUlVMRVJfUFJPVklERVIgPSB7XG4gIC8vIElmIHRoZXJlIGlzIGFscmVhZHkgYSBWaWV3cG9ydFJ1bGVyIGF2YWlsYWJsZSwgdXNlIHRoYXQuIE90aGVyd2lzZSwgcHJvdmlkZSBhIG5ldyBvbmUuXG4gIHByb3ZpZGU6IFZpZXdwb3J0UnVsZXIsXG4gIGRlcHM6IFtbbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpLCBWaWV3cG9ydFJ1bGVyXSwgU2Nyb2xsRGlzcGF0Y2hlcl0sXG4gIHVzZUZhY3Rvcnk6IFZJRVdQT1JUX1JVTEVSX1BST1ZJREVSX0ZBQ1RPUllcbn07XG4iXX0=