/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { OverlayContainer } from './overlay-container';
/**
 * The FullscreenOverlayContainer is the alternative to OverlayContainer
 * that supports correct displaying of overlay elements in Fullscreen mode
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
 * It should be provided in the root component that way:
 * providers: [
 *   {provide: OverlayContainer, useClass: FullscreenOverlayContainer}
 * ],
 */
var FullscreenOverlayContainer = /** @class */ (function (_super) {
    tslib_1.__extends(FullscreenOverlayContainer, _super);
    function FullscreenOverlayContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    FullscreenOverlayContainer.prototype._createContainer = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype._createContainer.call(this);
        this._adjustParentForFullscreenChange();
        this._addFullscreenChangeListener(function () { return _this._adjustParentForFullscreenChange(); });
    };
    /**
     * @return {?}
     */
    FullscreenOverlayContainer.prototype._adjustParentForFullscreenChange = /**
     * @return {?}
     */
    function () {
        if (!this._containerElement) {
            return;
        }
        /** @type {?} */
        var fullscreenElement = this.getFullscreenElement();
        /** @type {?} */
        var parent = fullscreenElement || document.body;
        parent.appendChild(this._containerElement);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    FullscreenOverlayContainer.prototype._addFullscreenChangeListener = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        if (document.fullscreenEnabled) {
            document.addEventListener('fullscreenchange', fn);
        }
        else if (document.webkitFullscreenEnabled) {
            document.addEventListener('webkitfullscreenchange', fn);
        }
        else if ((/** @type {?} */ (document)).mozFullScreenEnabled) {
            document.addEventListener('mozfullscreenchange', fn);
        }
        else if ((/** @type {?} */ (document)).msFullscreenEnabled) {
            document.addEventListener('MSFullscreenChange', fn);
        }
    };
    /**
     * When the page is put into fullscreen mode, a specific element is specified.
     * Only that element and its children are visible when in fullscreen mode.
    */
    /**
     * When the page is put into fullscreen mode, a specific element is specified.
     * Only that element and its children are visible when in fullscreen mode.
     * @return {?}
     */
    FullscreenOverlayContainer.prototype.getFullscreenElement = /**
     * When the page is put into fullscreen mode, a specific element is specified.
     * Only that element and its children are visible when in fullscreen mode.
     * @return {?}
     */
    function () {
        return document.fullscreenElement ||
            document.webkitFullscreenElement ||
            (/** @type {?} */ (document)).mozFullScreenElement ||
            (/** @type {?} */ (document)).msFullscreenElement ||
            null;
    };
    FullscreenOverlayContainer.decorators = [
        { type: Injectable }
    ];
    return FullscreenOverlayContainer;
}(OverlayContainer));
export { FullscreenOverlayContainer };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbHNjcmVlbi1vdmVybGF5LWNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2NvcmUvb3ZlcmxheS9mdWxsc2NyZWVuLW92ZXJsYXktY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7Ozs7Ozs7SUFZTCxzREFBZ0I7Ozs7Ozs7SUFDcEQscURBQWdCOzs7SUFBMUI7UUFBQSxpQkFJQztRQUhDLGlCQUFNLGdCQUFnQixXQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGdDQUFnQyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsZ0NBQWdDLEVBQUUsRUFBdkMsQ0FBdUMsQ0FBQyxDQUFDO0tBQ2xGOzs7O0lBRU8scUVBQWdDOzs7O1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsT0FBTztTQUNSOztRQUNELElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7O1FBQ3BELElBQUksTUFBTSxHQUFHLGlCQUFpQixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDaEQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7Ozs7O0lBR3JDLGlFQUE0Qjs7OztjQUFDLEVBQWM7UUFDakQsSUFBSSxRQUFRLENBQUMsaUJBQWlCLEVBQUU7WUFDOUIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ25EO2FBQU0sSUFBSSxRQUFRLENBQUMsdUJBQXVCLEVBQUU7WUFDM0MsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO2FBQU0sSUFBSSxtQkFBQyxRQUFlLEVBQUMsQ0FBQyxvQkFBb0IsRUFBRTtZQUNqRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDdEQ7YUFBTSxJQUFJLG1CQUFDLFFBQWUsRUFBQyxDQUFDLG1CQUFtQixFQUFFO1lBQ2hELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNyRDs7SUFHSDs7O01BR0U7Ozs7OztJQUNGLHlEQUFvQjs7Ozs7SUFBcEI7UUFDRSxPQUFPLFFBQVEsQ0FBQyxpQkFBaUI7WUFDN0IsUUFBUSxDQUFDLHVCQUF1QjtZQUNoQyxtQkFBQyxRQUFlLEVBQUMsQ0FBQyxvQkFBb0I7WUFDdEMsbUJBQUMsUUFBZSxFQUFDLENBQUMsbUJBQW1CO1lBQ3JDLElBQUksQ0FBQztLQUNWOztnQkF2Q0YsVUFBVTs7cUNBWlg7RUFhZ0QsZ0JBQWdCO1NBQW5ELDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge092ZXJsYXlDb250YWluZXJ9IGZyb20gJy4vb3ZlcmxheS1jb250YWluZXInO1xuXG4vKipcbiAqIFRoZSBGdWxsc2NyZWVuT3ZlcmxheUNvbnRhaW5lciBpcyB0aGUgYWx0ZXJuYXRpdmUgdG8gT3ZlcmxheUNvbnRhaW5lclxuICogdGhhdCBzdXBwb3J0cyBjb3JyZWN0IGRpc3BsYXlpbmcgb2Ygb3ZlcmxheSBlbGVtZW50cyBpbiBGdWxsc2NyZWVuIG1vZGVcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L3JlcXVlc3RGdWxsU2NyZWVuXG4gKiBJdCBzaG91bGQgYmUgcHJvdmlkZWQgaW4gdGhlIHJvb3QgY29tcG9uZW50IHRoYXQgd2F5OlxuICogcHJvdmlkZXJzOiBbXG4gKiAgIHtwcm92aWRlOiBPdmVybGF5Q29udGFpbmVyLCB1c2VDbGFzczogRnVsbHNjcmVlbk92ZXJsYXlDb250YWluZXJ9XG4gKiBdLFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRnVsbHNjcmVlbk92ZXJsYXlDb250YWluZXIgZXh0ZW5kcyBPdmVybGF5Q29udGFpbmVyIHtcbiAgcHJvdGVjdGVkIF9jcmVhdGVDb250YWluZXIoKTogdm9pZCB7XG4gICAgc3VwZXIuX2NyZWF0ZUNvbnRhaW5lcigpO1xuICAgIHRoaXMuX2FkanVzdFBhcmVudEZvckZ1bGxzY3JlZW5DaGFuZ2UoKTtcbiAgICB0aGlzLl9hZGRGdWxsc2NyZWVuQ2hhbmdlTGlzdGVuZXIoKCkgPT4gdGhpcy5fYWRqdXN0UGFyZW50Rm9yRnVsbHNjcmVlbkNoYW5nZSgpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkanVzdFBhcmVudEZvckZ1bGxzY3JlZW5DaGFuZ2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9jb250YWluZXJFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBmdWxsc2NyZWVuRWxlbWVudCA9IHRoaXMuZ2V0RnVsbHNjcmVlbkVsZW1lbnQoKTtcbiAgICBsZXQgcGFyZW50ID0gZnVsbHNjcmVlbkVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keTtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5fY29udGFpbmVyRWxlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRGdWxsc2NyZWVuQ2hhbmdlTGlzdGVuZXIoZm46ICgpID0+IHZvaWQpIHtcbiAgICBpZiAoZG9jdW1lbnQuZnVsbHNjcmVlbkVuYWJsZWQpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBmbik7XG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRW5hYmxlZCkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsIGZuKTtcbiAgICB9IGVsc2UgaWYgKChkb2N1bWVudCBhcyBhbnkpLm1vekZ1bGxTY3JlZW5FbmFibGVkKSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3pmdWxsc2NyZWVuY2hhbmdlJywgZm4pO1xuICAgIH0gZWxzZSBpZiAoKGRvY3VtZW50IGFzIGFueSkubXNGdWxsc2NyZWVuRW5hYmxlZCkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignTVNGdWxsc2NyZWVuQ2hhbmdlJywgZm4pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIHRoZSBwYWdlIGlzIHB1dCBpbnRvIGZ1bGxzY3JlZW4gbW9kZSwgYSBzcGVjaWZpYyBlbGVtZW50IGlzIHNwZWNpZmllZC5cbiAgICogT25seSB0aGF0IGVsZW1lbnQgYW5kIGl0cyBjaGlsZHJlbiBhcmUgdmlzaWJsZSB3aGVuIGluIGZ1bGxzY3JlZW4gbW9kZS5cbiAgKi9cbiAgZ2V0RnVsbHNjcmVlbkVsZW1lbnQoKTogRWxlbWVudCB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50IHx8XG4gICAgICAgIGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IHx8XG4gICAgICAgIChkb2N1bWVudCBhcyBhbnkpLm1vekZ1bGxTY3JlZW5FbGVtZW50IHx8XG4gICAgICAgIChkb2N1bWVudCBhcyBhbnkpLm1zRnVsbHNjcmVlbkVsZW1lbnQgfHxcbiAgICAgICAgbnVsbDtcbiAgfVxufVxuIl19