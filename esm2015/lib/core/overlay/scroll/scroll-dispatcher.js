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
export const DEFAULT_SCROLL_TIME = 20;
/**
 * Service contained all registered Scrollable references and emits an event when any one of the
 * Scrollable references emit a scrolled event.
 */
export class ScrollDispatcher {
    /**
     * @param {?} _ngZone
     * @param {?} _platform
     */
    constructor(_ngZone, _platform) {
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
     * @param {?} scrollable Scrollable instance to be registered.
     * @return {?}
     */
    register(scrollable) {
        /** @type {?} */
        const scrollSubscription = scrollable.elementScrolled().subscribe(() => this._notify());
        this.scrollableReferences.set(scrollable, scrollSubscription);
    }
    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     * @param {?} scrollable Scrollable instance to be deregistered.
     * @return {?}
     */
    deregister(scrollable) {
        if (this.scrollableReferences.has(scrollable)) {
            this.scrollableReferences.get(scrollable).unsubscribe();
            this.scrollableReferences.delete(scrollable);
        }
    }
    /**
     * Subscribes to an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     * @param {?=} auditTimeInMs
     * @param {?=} callback
     * @return {?}
     */
    scrolled(auditTimeInMs = DEFAULT_SCROLL_TIME, callback) {
        // Scroll events can only happen on the browser, so do nothing if we're not on the browser.
        if (!this._platform.isBrowser) {
            return Subscription.EMPTY;
        }
        /** @type {?} */
        let observable = auditTimeInMs > 0 ?
            this._scrolled.asObservable().pipe(auditTime(auditTimeInMs)) :
            this._scrolled.asObservable();
        this._scrolledCount++;
        if (!this._globalSubscription) {
            this._globalSubscription = this._ngZone.runOutsideAngular(() => {
                return merge(fromEvent(window.document, 'scroll'), fromEvent(window, 'resize')).subscribe(() => this._notify());
            });
        }
        /** @type {?} */
        let subscription = observable.subscribe(callback);
        subscription.add(() => {
            this._scrolledCount--;
            if (this._globalSubscription && !this.scrollableReferences.size && !this._scrolledCount) {
                this._globalSubscription.unsubscribe();
                this._globalSubscription = null;
            }
        });
        return subscription;
    }
    /**
     * Returns all registered Scrollables that contain the provided element.
     * @param {?} elementRef
     * @return {?}
     */
    getScrollContainers(elementRef) {
        /** @type {?} */
        const scrollingContainers = [];
        this.scrollableReferences.forEach((_subscription, scrollable) => {
            if (this.scrollableContainsElement(scrollable, elementRef)) {
                scrollingContainers.push(scrollable);
            }
        });
        return scrollingContainers;
    }
    /**
     * Returns true if the element is contained within the provided Scrollable.
     * @param {?} scrollable
     * @param {?} elementRef
     * @return {?}
     */
    scrollableContainsElement(scrollable, elementRef) {
        /** @type {?} */
        let element = elementRef.nativeElement;
        /** @type {?} */
        let scrollableElement = scrollable.getElementRef().nativeElement;
        // Traverse through the element parents until we reach null, checking if any of the elements
        // are the scrollable's element.
        do {
            if (element == scrollableElement) {
                return true;
            }
        } while (element = element.parentElement);
    }
    /**
     * Sends a notification that a scroll event has been fired.
     * @return {?}
     */
    _notify() {
        this._scrolled.next();
    }
}
ScrollDispatcher.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ScrollDispatcher.ctorParameters = () => [
    { type: NgZone },
    { type: Platform }
];
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
export const SCROLL_DISPATCHER_PROVIDER = {
    // If there is already a ScrollDispatcher available, use that. Otherwise, provide a new one.
    provide: ScrollDispatcher,
    deps: [[new Optional(), new SkipSelf(), ScrollDispatcher], NgZone, Platform],
    useFactory: SCROLL_DISPATCHER_PROVIDER_FACTORY
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLWRpc3BhdGNoZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL292ZXJsYXkvc2Nyb2xsL3Njcm9sbC1kaXNwYXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWEsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJekMsYUFBYSxtQkFBbUIsR0FBRyxFQUFFLENBQUM7Ozs7O0FBT3RDLE1BQU07Ozs7O0lBQ0osWUFBb0IsT0FBZSxFQUFVLFNBQW1CO1FBQTVDLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFVOzs7O3lCQUdyQyxJQUFJLE9BQU8sRUFBUTs7OzttQ0FHVixJQUFJOzs7OzhCQUdmLENBQUM7Ozs7O29DQU00QixJQUFJLEdBQUcsRUFBRTtLQWZNOzs7Ozs7O0lBc0JyRSxRQUFRLENBQUMsVUFBc0I7O1FBQzdCLE1BQU0sa0JBQWtCLEdBQUcsVUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUV4RixJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0tBQy9EOzs7Ozs7SUFNRCxVQUFVLENBQUMsVUFBc0I7UUFDL0IsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMs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Ozs7Ozs7Ozs7QUFrSWhCLE1BQU0sNkNBQ0YsZ0JBQWtDLEVBQUUsTUFBYyxFQUFFLFFBQWtCO0lBQ3hFLE9BQU8sZ0JBQWdCLElBQUksSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDbkU7O0FBRUQsYUFBYSwwQkFBMEIsR0FBRzs7SUFFeEMsT0FBTyxFQUFFLGdCQUFnQjtJQUN6QixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxRQUFRLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUM7SUFDNUUsVUFBVSxFQUFFLGtDQUFrQztDQUMvQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFbGVtZW50UmVmLCBJbmplY3RhYmxlLCBOZ1pvbmUsIE9wdGlvbmFsLCBTa2lwU2VsZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9pbmRleCc7XG5pbXBvcnQge1Njcm9sbGFibGV9IGZyb20gJy4vc2Nyb2xsYWJsZSc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb24sIG1lcmdlLCBmcm9tRXZlbnR9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHthdWRpdFRpbWV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG4vKiogVGltZSBpbiBtcyB0byB0aHJvdHRsZSB0aGUgc2Nyb2xsaW5nIGV2ZW50cyBieSBkZWZhdWx0LiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0NST0xMX1RJTUUgPSAyMDtcblxuLyoqXG4gKiBTZXJ2aWNlIGNvbnRhaW5lZCBhbGwgcmVnaXN0ZXJlZCBTY3JvbGxhYmxlIHJlZmVyZW5jZXMgYW5kIGVtaXRzIGFuIGV2ZW50IHdoZW4gYW55IG9uZSBvZiB0aGVcbiAqIFNjcm9sbGFibGUgcmVmZXJlbmNlcyBlbWl0IGEgc2Nyb2xsZWQgZXZlbnQuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTY3JvbGxEaXNwYXRjaGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybSkgeyB9XG5cbiAgLyoqIFN1YmplY3QgZm9yIG5vdGlmeWluZyB0aGF0IGEgcmVnaXN0ZXJlZCBzY3JvbGxhYmxlIHJlZmVyZW5jZSBlbGVtZW50IGhhcyBiZWVuIHNjcm9sbGVkLiAqL1xuICBfc2Nyb2xsZWQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKiBLZWVwcyB0cmFjayBvZiB0aGUgZ2xvYmFsIGBzY3JvbGxgIGFuZCBgcmVzaXplYCBzdWJzY3JpcHRpb25zLiAqL1xuICBfZ2xvYmFsU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBudWxsO1xuXG4gIC8qKiBLZWVwcyB0cmFjayBvZiB0aGUgYW1vdW50IG9mIHN1YnNjcmlwdGlvbnMgdG8gYHNjcm9sbGVkYC4gVXNlZCBmb3IgY2xlYW5pbmcgdXAgYWZ0ZXJ3YXJkcy4gKi9cbiAgcHJpdmF0ZSBfc2Nyb2xsZWRDb3VudCA9IDA7XG5cbiAgLyoqXG4gICAqIE1hcCBvZiBhbGwgdGhlIHNjcm9sbGFibGUgcmVmZXJlbmNlcyB0aGF0IGFyZSByZWdpc3RlcmVkIHdpdGggdGhlIHNlcnZpY2UgYW5kIHRoZWlyXG4gICAqIHNjcm9sbCBldmVudCBzdWJzY3JpcHRpb25zLlxuICAgKi9cbiAgc2Nyb2xsYWJsZVJlZmVyZW5jZXM6IE1hcDxTY3JvbGxhYmxlLCBTdWJzY3JpcHRpb24+ID0gbmV3IE1hcCgpO1xuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBTY3JvbGxhYmxlIHdpdGggdGhlIHNlcnZpY2UgYW5kIGxpc3RlbnMgZm9yIGl0cyBzY3JvbGxlZCBldmVudHMuIFdoZW4gdGhlXG4gICAqIHNjcm9sbGFibGUgaXMgc2Nyb2xsZWQsIHRoZSBzZXJ2aWNlIGVtaXRzIHRoZSBldmVudCBpbiBpdHMgc2Nyb2xsZWQgb2JzZXJ2YWJsZS5cbiAgICogQHBhcmFtIHNjcm9sbGFibGUgU2Nyb2xsYWJsZSBpbnN0YW5jZSB0byBiZSByZWdpc3RlcmVkLlxuICAgKi9cbiAgcmVnaXN0ZXIoc2Nyb2xsYWJsZTogU2Nyb2xsYWJsZSk6IHZvaWQge1xuICAgIGNvbnN0IHNjcm9sbFN1YnNjcmlwdGlvbiA9IHNjcm9sbGFibGUuZWxlbWVudFNjcm9sbGVkKCkuc3Vic2NyaWJlKCgpID0+IHRoaXMuX25vdGlmeSgpKTtcblxuICAgIHRoaXMuc2Nyb2xsYWJsZVJlZmVyZW5jZXMuc2V0KHNjcm9sbGFibGUsIHNjcm9sbFN1YnNjcmlwdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogRGVyZWdpc3RlcnMgYSBTY3JvbGxhYmxlIHJlZmVyZW5jZSBhbmQgdW5zdWJzY3JpYmVzIGZyb20gaXRzIHNjcm9sbCBldmVudCBvYnNlcnZhYmxlLlxuICAgKiBAcGFyYW0gc2Nyb2xsYWJsZSBTY3JvbGxhYmxlIGluc3RhbmNlIHRvIGJlIGRlcmVnaXN0ZXJlZC5cbiAgICovXG4gIGRlcmVnaXN0ZXIoc2Nyb2xsYWJsZTogU2Nyb2xsYWJsZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNjcm9sbGFibGVSZWZlcmVuY2VzLmhhcyhzY3JvbGxhYmxlKSkge1xuICAgICAgdGhpcy5zY3JvbGxhYmxlUmVmZXJlbmNlcy5nZXQoc2Nyb2xsYWJsZSkudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuc2Nyb2xsYWJsZVJlZmVyZW5jZXMuZGVsZXRlKHNjcm9sbGFibGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmVzIHRvIGFuIG9ic2VydmFibGUgdGhhdCBlbWl0cyBhbiBldmVudCB3aGVuZXZlciBhbnkgb2YgdGhlIHJlZ2lzdGVyZWQgU2Nyb2xsYWJsZVxuICAgKiByZWZlcmVuY2VzIChvciB3aW5kb3csIGRvY3VtZW50LCBvciBib2R5KSBmaXJlIGEgc2Nyb2xsZWQgZXZlbnQuIENhbiBwcm92aWRlIGEgdGltZSBpbiBtc1xuICAgKiB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBcInRocm90dGxlXCIgdGltZS5cbiAgICovXG4gIHNjcm9sbGVkKGF1ZGl0VGltZUluTXM6IG51bWJlciA9IERFRkFVTFRfU0NST0xMX1RJTUUsIGNhbGxiYWNrOiAoKSA9PiBhbnkpOiBTdWJzY3JpcHRpb24ge1xuICAgIC8vIFNjcm9sbCBldmVudHMgY2FuIG9ubHkgaGFwcGVuIG9uIHRoZSBicm93c2VyLCBzbyBkbyBub3RoaW5nIGlmIHdlJ3JlIG5vdCBvbiB0aGUgYnJvd3Nlci5cbiAgICBpZiAoIXRoaXMuX3BsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICB9XG5cbiAgICAvLyBJbiB0aGUgY2FzZSBvZiBhIDBtcyBkZWxheSwgdXNlIGFuIG9ic2VydmFibGUgd2l0aG91dCBhdWRpdFRpbWVcbiAgICAvLyBzaW5jZSBpdCBkb2VzIGFkZCBhIHBlcmNlcHRpYmxlIGRlbGF5IGluIHByb2Nlc3Npbmcgb3ZlcmhlYWQuXG4gICAgbGV0IG9ic2VydmFibGUgPSBhdWRpdFRpbWVJbk1zID4gMCA/XG4gICAgICB0aGlzLl9zY3JvbGxlZC5hc09ic2VydmFibGUoKS5waXBlKGF1ZGl0VGltZShhdWRpdFRpbWVJbk1zKSkgOlxuICAgICAgdGhpcy5fc2Nyb2xsZWQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICB0aGlzLl9zY3JvbGxlZENvdW50Kys7XG5cbiAgICBpZiAoIXRoaXMuX2dsb2JhbFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fZ2xvYmFsU3Vic2NyaXB0aW9uID0gdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKFxuICAgICAgICAgIGZyb21FdmVudCh3aW5kb3cuZG9jdW1lbnQsICdzY3JvbGwnKSxcbiAgICAgICAgICBmcm9tRXZlbnQod2luZG93LCAncmVzaXplJylcbiAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fbm90aWZ5KCkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gTm90ZSB0aGF0IHdlIG5lZWQgdG8gZG8gdGhlIHN1YnNjcmliaW5nIGZyb20gaGVyZSwgaW4gb3JkZXIgdG8gYmUgYWJsZSB0byByZW1vdmVcbiAgICAvLyB0aGUgZ2xvYmFsIGV2ZW50IGxpc3RlbmVycyBvbmNlIHRoZXJlIGFyZSBubyBtb3JlIHN1YnNjcmlwdGlvbnMuXG4gICAgbGV0IHN1YnNjcmlwdGlvbiA9IG9ic2VydmFibGUuc3Vic2NyaWJlKGNhbGxiYWNrKTtcblxuICAgIHN1YnNjcmlwdGlvbi5hZGQoKCkgPT4ge1xuICAgICAgdGhpcy5fc2Nyb2xsZWRDb3VudC0tO1xuXG4gICAgICBpZiAodGhpcy5fZ2xvYmFsU3Vic2NyaXB0aW9uICYmICF0aGlzLnNjcm9sbGFibGVSZWZlcmVuY2VzLnNpemUgJiYgIXRoaXMuX3Njcm9sbGVkQ291bnQpIHtcbiAgICAgICAgdGhpcy5fZ2xvYmFsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuX2dsb2JhbFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICB9XG5cbiAgLyoqIFJldHVybnMgYWxsIHJlZ2lzdGVyZWQgU2Nyb2xsYWJsZXMgdGhhdCBjb250YWluIHRoZSBwcm92aWRlZCBlbGVtZW50LiAqL1xuICBnZXRTY3JvbGxDb250YWluZXJzKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpOiBTY3JvbGxhYmxlW10ge1xuICAgIGNvbnN0IHNjcm9sbGluZ0NvbnRhaW5lcnM6IFNjcm9sbGFibGVbXSA9IFtdO1xuXG4gICAgdGhpcy5zY3JvbGxhYmxlUmVmZXJlbmNlcy5mb3JFYWNoKChfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24sIHNjcm9sbGFibGU6IFNjcm9sbGFibGUpID0+IHtcbiAgICAgIGlmICh0aGlzLnNjcm9sbGFibGVDb250YWluc0VsZW1lbnQoc2Nyb2xsYWJsZSwgZWxlbWVudFJlZikpIHtcbiAgICAgICAgc2Nyb2xsaW5nQ29udGFpbmVycy5wdXNoKHNjcm9sbGFibGUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNjcm9sbGluZ0NvbnRhaW5lcnM7XG4gIH1cblxuICAvKiogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50IGlzIGNvbnRhaW5lZCB3aXRoaW4gdGhlIHByb3ZpZGVkIFNjcm9sbGFibGUuICovXG4gIHNjcm9sbGFibGVDb250YWluc0VsZW1lbnQoc2Nyb2xsYWJsZTogU2Nyb2xsYWJsZSwgZWxlbWVudFJlZjogRWxlbWVudFJlZik6IGJvb2xlYW4ge1xuICAgIGxldCBlbGVtZW50ID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGxldCBzY3JvbGxhYmxlRWxlbWVudCA9IHNjcm9sbGFibGUuZ2V0RWxlbWVudFJlZigpLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAvLyBUcmF2ZXJzZSB0aHJvdWdoIHRoZSBlbGVtZW50IHBhcmVudHMgdW50aWwgd2UgcmVhY2ggbnVsbCwgY2hlY2tpbmcgaWYgYW55IG9mIHRoZSBlbGVtZW50c1xuICAgIC8vIGFyZSB0aGUgc2Nyb2xsYWJsZSdzIGVsZW1lbnQuXG4gICAgZG8ge1xuICAgICAgaWYgKGVsZW1lbnQgPT0gc2Nyb2xsYWJsZUVsZW1lbnQpIHsgcmV0dXJuIHRydWU7IH1cbiAgICB9IHdoaWxlIChlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbiAgfVxuXG4gIC8qKiBTZW5kcyBhIG5vdGlmaWNhdGlvbiB0aGF0IGEgc2Nyb2xsIGV2ZW50IGhhcyBiZWVuIGZpcmVkLiAqL1xuICBfbm90aWZ5KCkge1xuICAgIHRoaXMuX3Njcm9sbGVkLm5leHQoKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU0NST0xMX0RJU1BBVENIRVJfUFJPVklERVJfRkFDVE9SWShcbiAgICBwYXJlbnREaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLCBuZ1pvbmU6IE5nWm9uZSwgcGxhdGZvcm06IFBsYXRmb3JtKSB7XG4gIHJldHVybiBwYXJlbnREaXNwYXRjaGVyIHx8IG5ldyBTY3JvbGxEaXNwYXRjaGVyKG5nWm9uZSwgcGxhdGZvcm0pO1xufVxuXG5leHBvcnQgY29uc3QgU0NST0xMX0RJU1BBVENIRVJfUFJPVklERVIgPSB7XG4gIC8vIElmIHRoZXJlIGlzIGFscmVhZHkgYSBTY3JvbGxEaXNwYXRjaGVyIGF2YWlsYWJsZSwgdXNlIHRoYXQuIE90aGVyd2lzZSwgcHJvdmlkZSBhIG5ldyBvbmUuXG4gIHByb3ZpZGU6IFNjcm9sbERpc3BhdGNoZXIsXG4gIGRlcHM6IFtbbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpLCBTY3JvbGxEaXNwYXRjaGVyXSwgTmdab25lLCBQbGF0Zm9ybV0sXG4gIHVzZUZhY3Rvcnk6IFNDUk9MTF9ESVNQQVRDSEVSX1BST1ZJREVSX0ZBQ1RPUllcbn07XG4iXX0=