/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, NgZone, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { ScrollDispatcher } from './scroll-dispatcher';
/**
 * Sends an event when the directive's element is scrolled. Registers itself with the
 * ScrollDispatcher service to include itself as part of its collection of scrolling events that it
 * can be listened to through the service.
 */
var Scrollable = /** @class */ (function () {
    function Scrollable(_elementRef, _scroll, _ngZone, _renderer) {
        this._elementRef = _elementRef;
        this._scroll = _scroll;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._elementScrolled = new Subject();
    }
    /**
     * @return {?}
     */
    Scrollable.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._scrollListener = this._ngZone.runOutsideAngular(function () {
            return _this._renderer.listen(_this.getElementRef().nativeElement, 'scroll', function (event) {
                _this._elementScrolled.next(event);
            });
        });
        this._scroll.register(this);
    };
    /**
     * @return {?}
     */
    Scrollable.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._scroll.deregister(this);
        if (this._scrollListener) {
            this._scrollListener();
            this._scrollListener = null;
        }
    };
    /**
     * Returns observable that emits when a scroll event is fired on the host element.
     */
    /**
     * Returns observable that emits when a scroll event is fired on the host element.
     * @return {?}
     */
    Scrollable.prototype.elementScrolled = /**
     * Returns observable that emits when a scroll event is fired on the host element.
     * @return {?}
     */
    function () {
        return this._elementScrolled.asObservable();
    };
    /**
     * @return {?}
     */
    Scrollable.prototype.getElementRef = /**
     * @return {?}
     */
    function () {
        return this._elementRef;
    };
    Scrollable.decorators = [
        { type: Directive, args: [{
                    selector: '[cdk-scrollable], [cdkScrollable]'
                },] }
    ];
    /** @nocollapse */
    Scrollable.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ScrollDispatcher },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
    return Scrollable;
}());
export { Scrollable };
if (false) {
    /** @type {?} */
    Scrollable.prototype._elementScrolled;
    /** @type {?} */
    Scrollable.prototype._scrollListener;
    /** @type {?} */
    Scrollable.prototype._elementRef;
    /** @type {?} */
    Scrollable.prototype._scroll;
    /** @type {?} */
    Scrollable.prototype._ngZone;
    /** @type {?} */
    Scrollable.prototype._renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsYWJsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2NvcmUvb3ZlcmxheS9zY3JvbGwvc2Nyb2xsYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQXFCLE1BQU0sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFhLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7OztJQWVuRCxvQkFBb0IsV0FBdUIsRUFDdkIsU0FDQSxTQUNBO1FBSEEsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsWUFBTyxHQUFQLE9BQU87UUFDUCxZQUFPLEdBQVAsT0FBTztRQUNQLGNBQVMsR0FBVCxTQUFTO2dDQU5jLElBQUksT0FBTyxFQUFFO0tBTVo7Ozs7SUFFNUMsNkJBQVE7OztJQUFSO1FBQUEsaUJBUUM7UUFQQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7WUFDcEQsT0FBTyxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxVQUFDLEtBQVk7Z0JBQ3RGLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbkMsQ0FBQyxDQUFDO1NBQ0osQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDN0I7Ozs7SUFFRCxnQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU5QixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1NBQzdCO0tBQ0Y7SUFFRDs7T0FFRzs7Ozs7SUFDSCxvQ0FBZTs7OztJQUFmO1FBQ0UsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDN0M7Ozs7SUFFRCxrQ0FBYTs7O0lBQWI7UUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDekI7O2dCQXhDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1DQUFtQztpQkFDOUM7Ozs7Z0JBWmtCLFVBQVU7Z0JBRXJCLGdCQUFnQjtnQkFGMEIsTUFBTTtnQkFBRSxTQUFTOztxQkFBbkU7O1NBYWEsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkluaXQsIE9uRGVzdHJveSwgTmdab25lLCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7U2Nyb2xsRGlzcGF0Y2hlcn0gZnJvbSAnLi9zY3JvbGwtZGlzcGF0Y2hlcic7XG5cblxuLyoqXG4gKiBTZW5kcyBhbiBldmVudCB3aGVuIHRoZSBkaXJlY3RpdmUncyBlbGVtZW50IGlzIHNjcm9sbGVkLiBSZWdpc3RlcnMgaXRzZWxmIHdpdGggdGhlXG4gKiBTY3JvbGxEaXNwYXRjaGVyIHNlcnZpY2UgdG8gaW5jbHVkZSBpdHNlbGYgYXMgcGFydCBvZiBpdHMgY29sbGVjdGlvbiBvZiBzY3JvbGxpbmcgZXZlbnRzIHRoYXQgaXRcbiAqIGNhbiBiZSBsaXN0ZW5lZCB0byB0aHJvdWdoIHRoZSBzZXJ2aWNlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2RrLXNjcm9sbGFibGVdLCBbY2RrU2Nyb2xsYWJsZV0nXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbGFibGUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2VsZW1lbnRTY3JvbGxlZDogU3ViamVjdDxFdmVudD4gPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIF9zY3JvbGxMaXN0ZW5lcjogRnVuY3Rpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc2Nyb2xsOiBTY3JvbGxEaXNwYXRjaGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9zY3JvbGxMaXN0ZW5lciA9IHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVuZGVyZXIubGlzdGVuKHRoaXMuZ2V0RWxlbWVudFJlZigpLm5hdGl2ZUVsZW1lbnQsICdzY3JvbGwnLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRTY3JvbGxlZC5uZXh0KGV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fc2Nyb2xsLnJlZ2lzdGVyKHRoaXMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc2Nyb2xsLmRlcmVnaXN0ZXIodGhpcyk7XG5cbiAgICBpZiAodGhpcy5fc2Nyb2xsTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMuX3Njcm9sbExpc3RlbmVyKCk7XG4gICAgICB0aGlzLl9zY3JvbGxMaXN0ZW5lciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgb2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdoZW4gYSBzY3JvbGwgZXZlbnQgaXMgZmlyZWQgb24gdGhlIGhvc3QgZWxlbWVudC5cbiAgICovXG4gIGVsZW1lbnRTY3JvbGxlZCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50U2Nyb2xsZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXRFbGVtZW50UmVmKCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmO1xuICB9XG59XG4iXX0=