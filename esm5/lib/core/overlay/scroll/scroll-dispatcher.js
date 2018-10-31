/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone, Optional, SkipSelf } from '@angular/core';
import { Platform } from '../../platform/index';
import { Subject } from 'rxjs';
import { Subscription, merge, fromEvent } from 'rxjs';
import { auditTime } from 'rxjs/operators';
/** *
 * Time in ms to throttle the scrolling events by default.
  @type {?} */
export var DEFAULT_SCROLL_TIME = 20;
/**
 * Service contained all registered Scrollable references and emits an event when any one of the
 * Scrollable references emit a scrolled event.
 */
var ScrollDispatcher = /** @class */ (function () {
    function ScrollDispatcher(_ngZone, _platform) {
        this._ngZone = _ngZone;
        this._platform = _platform;
        /**
         * Subject for notifying that a registered scrollable reference element has been scrolled.
         */
        this._scrolled = new Subject();
        /**
         * Keeps track of the global `scroll` and `resize` subscriptions.
         */
        this._globalSubscription = null;
        /**
         * Keeps track of the amount of subscriptions to `scrolled`. Used for cleaning up afterwards.
         */
        this._scrolledCount = 0;
        /**
         * Map of all the scrollable references that are registered with the service and their
         * scroll event subscriptions.
         */
        this.scrollableReferences = new Map();
    }
    /**
     * Registers a Scrollable with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event in its scrolled observable.
     * @param scrollable Scrollable instance to be registered.
     */
    /**
     * Registers a Scrollable with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event in its scrolled observable.
     * @param {?} scrollable Scrollable instance to be registered.
     * @return {?}
     */
    ScrollDispatcher.prototype.register = /**
     * Registers a Scrollable with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event in its scrolled observable.
     * @param {?} scrollable Scrollable instance to be registered.
     * @return {?}
     */
    function (scrollable) {
        var _this = this;
        /** @type {?} */
        var scrollSubscription = scrollable.elementScrolled().subscribe(function () { return _this._notify(); });
        this.scrollableReferences.set(scrollable, scrollSubscription);
    };
    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     * @param scrollable Scrollable instance to be deregistered.
     */
    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     * @param {?} scrollable Scrollable instance to be deregistered.
     * @return {?}
     */
    ScrollDispatcher.prototype.deregister = /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     * @param {?} scrollable Scrollable instance to be deregistered.
     * @return {?}
     */
    function (scrollable) {
        if (this.scrollableReferences.has(scrollable)) {
            this.scrollableReferences.get(scrollable).unsubscribe();
            this.scrollableReferences.delete(scrollable);
        }
    };
    /**
     * Subscribes to an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     */
    /**
     * Subscribes to an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     * @param {?=} auditTimeInMs
     * @param {?=} callback
     * @return {?}
     */
    ScrollDispatcher.prototype.scrolled = /**
     * Subscribes to an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     * @param {?=} auditTimeInMs
     * @param {?=} callback
     * @return {?}
     */
    function (auditTimeInMs, callback) {
        var _this = this;
        if (auditTimeInMs === void 0) { auditTimeInMs = DEFAULT_SCROLL_TIME; }
        // Scroll events can only happen on the browser, so do nothing if we're not on the browser.
        if (!this._platform.isBrowser) {
            return Subscription.EMPTY;
        }
        /** @type {?} */
        var observable = auditTimeInMs > 0 ?
            this._scrolled.asObservable().pipe(auditTime(auditTimeInMs)) :
            this._scrolled.asObservable();
        this._scrolledCount++;
        if (!this._globalSubscription) {
            this._globalSubscription = this._ngZone.runOutsideAngular(function () {
                return merge(fromEvent(window.document, 'scroll'), fromEvent(window, 'resize')).subscribe(function () { return _this._notify(); });
            });
        }
        /** @type {?} */
        var subscription = observable.subscribe(callback);
        subscription.add(function () {
            _this._scrolledCount--;
            if (_this._globalSubscription && !_this.scrollableReferences.size && !_this._scrolledCount) {
                _this._globalSubscription.unsubscribe();
                _this._globalSubscription = null;
            }
        });
        return subscription;
    };
    /** Returns all registered Scrollables that contain the provided element. */
    /**
     * Returns all registered Scrollables that contain the provided element.
     * @param {?} elementRef
     * @return {?}
     */
    ScrollDispatcher.prototype.getScrollContainers = /**
     * Returns all registered Scrollables that contain the provided element.
     * @param {?} elementRef
     * @return {?}
     */
    function (elementRef) {
        var _this = this;
        /** @type {?} */
        var scrollingContainers = [];
        this.scrollableReferences.forEach(function (_subscription, scrollable) {
            if (_this.scrollableContainsElement(scrollable, elementRef)) {
                scrollingContainers.push(scrollable);
            }
        });
        return scrollingContainers;
    };
    /** Returns true if the element is contained within the provided Scrollable. */
    /**
     * Returns true if the element is contained within the provided Scrollable.
     * @param {?} scrollable
     * @param {?} elementRef
     * @return {?}
     */
    ScrollDispatcher.prototype.scrollableContainsElement = /**
     * Returns true if the element is contained within the provided Scrollable.
     * @param {?} scrollable
     * @param {?} elementRef
     * @return {?}
     */
    function (scrollable, elementRef) {
        /** @type {?} */
        var element = elementRef.nativeElement;
        /** @type {?} */
        var scrollableElement = scrollable.getElementRef().nativeElement;
        // Traverse through the element parents until we reach null, checking if any of the elements
        // are the scrollable's element.
        do {
            if (element == scrollableElement) {
                return true;
            }
        } while (element = element.parentElement);
    };
    /** Sends a notification that a scroll event has been fired. */
    /**
     * Sends a notification that a scroll event has been fired.
     * @return {?}
     */
    ScrollDispatcher.prototype._notify = /**
     * Sends a notification that a scroll event has been fired.
     * @return {?}
     */
    function () {
        this._scrolled.next();
    };
    ScrollDispatcher.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ScrollDispatcher.ctorParameters = function () { return [
        { type: NgZone },
        { type: Platform }
    ]; };
    return ScrollDispatcher;
}());
export { ScrollDispatcher };
if (false) {
    /**
     * Subject for notifying that a registered scrollable reference element has been scrolled.
     * @type {?}
     */
    ScrollDispatcher.prototype._scrolled;
    /**
     * Keeps track of the global `scroll` and `resize` subscriptions.
     * @type {?}
     */
    ScrollDispatcher.prototype._globalSubscription;
    /**
     * Keeps track of the amount of subscriptions to `scrolled`. Used for cleaning up afterwards.
     * @type {?}
     */
    ScrollDispatcher.prototype._scrolledCount;
    /**
     * Map of all the scrollable references that are registered with the service and their
     * scroll event subscriptions.
     * @type {?}
     */
    ScrollDispatcher.prototype.scrollableReferences;
    /** @type {?} */
    ScrollDispatcher.prototype._ngZone;
    /** @type {?} */
    ScrollDispatcher.prototype._platform;
}
/**
 * @param {?} parentDispatcher
 * @param {?} ngZone
 * @param {?} platform
 * @return {?}
 */
export function SCROLL_DISPATCHER_PROVIDER_FACTORY(parentDispatcher, ngZone, platform) {
    return parentDispatcher || new ScrollDispatcher(ngZone, platform);
}
/** @type {?} */
export var SCROLL_DISPATCHER_PROVIDER = {
    // If there is already a ScrollDispatcher available, use that. Otherwise, provide a new one.
    provide: ScrollDispatcher,
    deps: [[new Optional(), new SkipSelf(), ScrollDispatcher], NgZone, Platform],
    useFactory: SCROLL_DISPATCHER_PROVIDER_FACTORY
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLWRpc3BhdGNoZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL292ZXJsYXkvc2Nyb2xsL3Njcm9sbC1kaXNwYXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWEsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJekMsV0FBYSxtQkFBbUIsR0FBRyxFQUFFLENBQUM7Ozs7OztJQVFwQywwQkFBb0IsT0FBZSxFQUFVLFNBQW1CO1FBQTVDLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFVOzs7O3lCQUdyQyxJQUFJLE9BQU8sRUFBUTs7OzttQ0FHVixJQUFJOzs7OzhCQUdmLENBQUM7Ozs7O29DQU00QixJQUFJLEdBQUcsRUFBRTtLQWZNO0lBaUJyRTs7OztPQUlHOzs7Ozs7O0lBQ0gsbUNBQVE7Ozs7OztJQUFSLFVBQVMsVUFBc0I7UUFBL0IsaUJBSUM7O1FBSEMsSUFBTSxrQkFBa0IsR0FBRyxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsT0FBTyxFQUFFLEVBQWQsQ0FBYyxDQUFDLENBQUM7UUFFeEYsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztLQUMvRDtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gscUNBQVU7Ozs7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YUFBYSxFQUFFO0tBQzNDO0lBRUQsK0RBQStEOzs7OztJQUMvRCxrQ0FBTzs7OztJQUFQO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN2Qjs7Z0JBakhGLFVBQVU7Ozs7Z0JBZnFCLE1BQU07Z0JBQzlCLFFBQVE7OzJCQURoQjs7U0FnQmEsZ0JBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUg3QixNQUFNLDZDQUNGLGdCQUFrQyxFQUFFLE1BQWMsRUFBRSxRQUFrQjtJQUN4RSxPQUFPLGdCQUFnQixJQUFJLElBQUksZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0NBQ25FOztBQUVELFdBQWEsMEJBQTBCLEdBQUc7O0lBRXhDLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekIsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLElBQUksUUFBUSxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO0lBQzVFLFVBQVUsRUFBRSxrQ0FBa0M7Q0FDL0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RWxlbWVudFJlZiwgSW5qZWN0YWJsZSwgTmdab25lLCBPcHRpb25hbCwgU2tpcFNlbGZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnLi4vLi4vcGxhdGZvcm0vaW5kZXgnO1xuaW1wb3J0IHtTY3JvbGxhYmxlfSBmcm9tICcuL3Njcm9sbGFibGUnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7U3Vic2NyaXB0aW9uLCBtZXJnZSwgZnJvbUV2ZW50fSBmcm9tICdyeGpzJztcbmltcG9ydCB7YXVkaXRUaW1lfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuLyoqIFRpbWUgaW4gbXMgdG8gdGhyb3R0bGUgdGhlIHNjcm9sbGluZyBldmVudHMgYnkgZGVmYXVsdC4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NDUk9MTF9USU1FID0gMjA7XG5cbi8qKlxuICogU2VydmljZSBjb250YWluZWQgYWxsIHJlZ2lzdGVyZWQgU2Nyb2xsYWJsZSByZWZlcmVuY2VzIGFuZCBlbWl0cyBhbiBldmVudCB3aGVuIGFueSBvbmUgb2YgdGhlXG4gKiBTY3JvbGxhYmxlIHJlZmVyZW5jZXMgZW1pdCBhIHNjcm9sbGVkIGV2ZW50LlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2Nyb2xsRGlzcGF0Y2hlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX25nWm9uZTogTmdab25lLCBwcml2YXRlIF9wbGF0Zm9ybTogUGxhdGZvcm0pIHsgfVxuXG4gIC8qKiBTdWJqZWN0IGZvciBub3RpZnlpbmcgdGhhdCBhIHJlZ2lzdGVyZWQgc2Nyb2xsYWJsZSByZWZlcmVuY2UgZWxlbWVudCBoYXMgYmVlbiBzY3JvbGxlZC4gKi9cbiAgX3Njcm9sbGVkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKiogS2VlcHMgdHJhY2sgb2YgdGhlIGdsb2JhbCBgc2Nyb2xsYCBhbmQgYHJlc2l6ZWAgc3Vic2NyaXB0aW9ucy4gKi9cbiAgX2dsb2JhbFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcblxuICAvKiogS2VlcHMgdHJhY2sgb2YgdGhlIGFtb3VudCBvZiBzdWJzY3JpcHRpb25zIHRvIGBzY3JvbGxlZGAuIFVzZWQgZm9yIGNsZWFuaW5nIHVwIGFmdGVyd2FyZHMuICovXG4gIHByaXZhdGUgX3Njcm9sbGVkQ291bnQgPSAwO1xuXG4gIC8qKlxuICAgKiBNYXAgb2YgYWxsIHRoZSBzY3JvbGxhYmxlIHJlZmVyZW5jZXMgdGhhdCBhcmUgcmVnaXN0ZXJlZCB3aXRoIHRoZSBzZXJ2aWNlIGFuZCB0aGVpclxuICAgKiBzY3JvbGwgZXZlbnQgc3Vic2NyaXB0aW9ucy5cbiAgICovXG4gIHNjcm9sbGFibGVSZWZlcmVuY2VzOiBNYXA8U2Nyb2xsYWJsZSwgU3Vic2NyaXB0aW9uPiA9IG5ldyBNYXAoKTtcblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgU2Nyb2xsYWJsZSB3aXRoIHRoZSBzZXJ2aWNlIGFuZCBsaXN0ZW5zIGZvciBpdHMgc2Nyb2xsZWQgZXZlbnRzLiBXaGVuIHRoZVxuICAgKiBzY3JvbGxhYmxlIGlzIHNjcm9sbGVkLCB0aGUgc2VydmljZSBlbWl0cyB0aGUgZXZlbnQgaW4gaXRzIHNjcm9sbGVkIG9ic2VydmFibGUuXG4gICAqIEBwYXJhbSBzY3JvbGxhYmxlIFNjcm9sbGFibGUgaW5zdGFuY2UgdG8gYmUgcmVnaXN0ZXJlZC5cbiAgICovXG4gIHJlZ2lzdGVyKHNjcm9sbGFibGU6IFNjcm9sbGFibGUpOiB2b2lkIHtcbiAgICBjb25zdCBzY3JvbGxTdWJzY3JpcHRpb24gPSBzY3JvbGxhYmxlLmVsZW1lbnRTY3JvbGxlZCgpLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9ub3RpZnkoKSk7XG5cbiAgICB0aGlzLnNjcm9sbGFibGVSZWZlcmVuY2VzLnNldChzY3JvbGxhYmxlLCBzY3JvbGxTdWJzY3JpcHRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlcmVnaXN0ZXJzIGEgU2Nyb2xsYWJsZSByZWZlcmVuY2UgYW5kIHVuc3Vic2NyaWJlcyBmcm9tIGl0cyBzY3JvbGwgZXZlbnQgb2JzZXJ2YWJsZS5cbiAgICogQHBhcmFtIHNjcm9sbGFibGUgU2Nyb2xsYWJsZSBpbnN0YW5jZSB0byBiZSBkZXJlZ2lzdGVyZWQuXG4gICAqL1xuICBkZXJlZ2lzdGVyKHNjcm9sbGFibGU6IFNjcm9sbGFibGUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zY3JvbGxhYmxlUmVmZXJlbmNlcy5oYXMoc2Nyb2xsYWJsZSkpIHtcbiAgICAgIHRoaXMuc2Nyb2xsYWJsZVJlZmVyZW5jZXMuZ2V0KHNjcm9sbGFibGUpLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnNjcm9sbGFibGVSZWZlcmVuY2VzLmRlbGV0ZShzY3JvbGxhYmxlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlcyB0byBhbiBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgYW4gZXZlbnQgd2hlbmV2ZXIgYW55IG9mIHRoZSByZWdpc3RlcmVkIFNjcm9sbGFibGVcbiAgICogcmVmZXJlbmNlcyAob3Igd2luZG93LCBkb2N1bWVudCwgb3IgYm9keSkgZmlyZSBhIHNjcm9sbGVkIGV2ZW50LiBDYW4gcHJvdmlkZSBhIHRpbWUgaW4gbXNcbiAgICogdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgXCJ0aHJvdHRsZVwiIHRpbWUuXG4gICAqL1xuICBzY3JvbGxlZChhdWRpdFRpbWVJbk1zOiBudW1iZXIgPSBERUZBVUxUX1NDUk9MTF9USU1FLCBjYWxsYmFjazogKCkgPT4gYW55KTogU3Vic2NyaXB0aW9uIHtcbiAgICAvLyBTY3JvbGwgZXZlbnRzIGNhbiBvbmx5IGhhcHBlbiBvbiB0aGUgYnJvd3Nlciwgc28gZG8gbm90aGluZyBpZiB3ZSdyZSBub3Qgb24gdGhlIGJyb3dzZXIuXG4gICAgaWYgKCF0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHJldHVybiBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgfVxuXG4gICAgLy8gSW4gdGhlIGNhc2Ugb2YgYSAwbXMgZGVsYXksIHVzZSBhbiBvYnNlcnZhYmxlIHdpdGhvdXQgYXVkaXRUaW1lXG4gICAgLy8gc2luY2UgaXQgZG9lcyBhZGQgYSBwZXJjZXB0aWJsZSBkZWxheSBpbiBwcm9jZXNzaW5nIG92ZXJoZWFkLlxuICAgIGxldCBvYnNlcnZhYmxlID0gYXVkaXRUaW1lSW5NcyA+IDAgP1xuICAgICAgdGhpcy5fc2Nyb2xsZWQuYXNPYnNlcnZhYmxlKCkucGlwZShhdWRpdFRpbWUoYXVkaXRUaW1lSW5NcykpIDpcbiAgICAgIHRoaXMuX3Njcm9sbGVkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgdGhpcy5fc2Nyb2xsZWRDb3VudCsrO1xuXG4gICAgaWYgKCF0aGlzLl9nbG9iYWxTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2dsb2JhbFN1YnNjcmlwdGlvbiA9IHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgICBmcm9tRXZlbnQod2luZG93LmRvY3VtZW50LCAnc2Nyb2xsJyksXG4gICAgICAgICAgZnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpXG4gICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHRoaXMuX25vdGlmeSgpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIE5vdGUgdGhhdCB3ZSBuZWVkIHRvIGRvIHRoZSBzdWJzY3JpYmluZyBmcm9tIGhlcmUsIGluIG9yZGVyIHRvIGJlIGFibGUgdG8gcmVtb3ZlXG4gICAgLy8gdGhlIGdsb2JhbCBldmVudCBsaXN0ZW5lcnMgb25jZSB0aGVyZSBhcmUgbm8gbW9yZSBzdWJzY3JpcHRpb25zLlxuICAgIGxldCBzdWJzY3JpcHRpb24gPSBvYnNlcnZhYmxlLnN1YnNjcmliZShjYWxsYmFjayk7XG5cbiAgICBzdWJzY3JpcHRpb24uYWRkKCgpID0+IHtcbiAgICAgIHRoaXMuX3Njcm9sbGVkQ291bnQtLTtcblxuICAgICAgaWYgKHRoaXMuX2dsb2JhbFN1YnNjcmlwdGlvbiAmJiAhdGhpcy5zY3JvbGxhYmxlUmVmZXJlbmNlcy5zaXplICYmICF0aGlzLl9zY3JvbGxlZENvdW50KSB7XG4gICAgICAgIHRoaXMuX2dsb2JhbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLl9nbG9iYWxTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIGFsbCByZWdpc3RlcmVkIFNjcm9sbGFibGVzIHRoYXQgY29udGFpbiB0aGUgcHJvdmlkZWQgZWxlbWVudC4gKi9cbiAgZ2V0U2Nyb2xsQ29udGFpbmVycyhlbGVtZW50UmVmOiBFbGVtZW50UmVmKTogU2Nyb2xsYWJsZVtdIHtcbiAgICBjb25zdCBzY3JvbGxpbmdDb250YWluZXJzOiBTY3JvbGxhYmxlW10gPSBbXTtcblxuICAgIHRoaXMuc2Nyb2xsYWJsZVJlZmVyZW5jZXMuZm9yRWFjaCgoX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uLCBzY3JvbGxhYmxlOiBTY3JvbGxhYmxlKSA9PiB7XG4gICAgICBpZiAodGhpcy5zY3JvbGxhYmxlQ29udGFpbnNFbGVtZW50KHNjcm9sbGFibGUsIGVsZW1lbnRSZWYpKSB7XG4gICAgICAgIHNjcm9sbGluZ0NvbnRhaW5lcnMucHVzaChzY3JvbGxhYmxlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBzY3JvbGxpbmdDb250YWluZXJzO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudCBpcyBjb250YWluZWQgd2l0aGluIHRoZSBwcm92aWRlZCBTY3JvbGxhYmxlLiAqL1xuICBzY3JvbGxhYmxlQ29udGFpbnNFbGVtZW50KHNjcm9sbGFibGU6IFNjcm9sbGFibGUsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpOiBib29sZWFuIHtcbiAgICBsZXQgZWxlbWVudCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBsZXQgc2Nyb2xsYWJsZUVsZW1lbnQgPSBzY3JvbGxhYmxlLmdldEVsZW1lbnRSZWYoKS5uYXRpdmVFbGVtZW50O1xuXG4gICAgLy8gVHJhdmVyc2UgdGhyb3VnaCB0aGUgZWxlbWVudCBwYXJlbnRzIHVudGlsIHdlIHJlYWNoIG51bGwsIGNoZWNraW5nIGlmIGFueSBvZiB0aGUgZWxlbWVudHNcbiAgICAvLyBhcmUgdGhlIHNjcm9sbGFibGUncyBlbGVtZW50LlxuICAgIGRvIHtcbiAgICAgIGlmIChlbGVtZW50ID09IHNjcm9sbGFibGVFbGVtZW50KSB7IHJldHVybiB0cnVlOyB9XG4gICAgfSB3aGlsZSAoZWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudCk7XG4gIH1cblxuICAvKiogU2VuZHMgYSBub3RpZmljYXRpb24gdGhhdCBhIHNjcm9sbCBldmVudCBoYXMgYmVlbiBmaXJlZC4gKi9cbiAgX25vdGlmeSgpIHtcbiAgICB0aGlzLl9zY3JvbGxlZC5uZXh0KCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNDUk9MTF9ESVNQQVRDSEVSX1BST1ZJREVSX0ZBQ1RPUlkoXG4gICAgcGFyZW50RGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlciwgbmdab25lOiBOZ1pvbmUsIHBsYXRmb3JtOiBQbGF0Zm9ybSkge1xuICByZXR1cm4gcGFyZW50RGlzcGF0Y2hlciB8fCBuZXcgU2Nyb2xsRGlzcGF0Y2hlcihuZ1pvbmUsIHBsYXRmb3JtKTtcbn1cblxuZXhwb3J0IGNvbnN0IFNDUk9MTF9ESVNQQVRDSEVSX1BST1ZJREVSID0ge1xuICAvLyBJZiB0aGVyZSBpcyBhbHJlYWR5IGEgU2Nyb2xsRGlzcGF0Y2hlciBhdmFpbGFibGUsIHVzZSB0aGF0LiBPdGhlcndpc2UsIHByb3ZpZGUgYSBuZXcgb25lLlxuICBwcm92aWRlOiBTY3JvbGxEaXNwYXRjaGVyLFxuICBkZXBzOiBbW25ldyBPcHRpb25hbCgpLCBuZXcgU2tpcFNlbGYoKSwgU2Nyb2xsRGlzcGF0Y2hlcl0sIE5nWm9uZSwgUGxhdGZvcm1dLFxuICB1c2VGYWN0b3J5OiBTQ1JPTExfRElTUEFUQ0hFUl9QUk9WSURFUl9GQUNUT1JZXG59O1xuIl19