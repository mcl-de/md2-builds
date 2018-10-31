/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class FullscreenOverlayContainer extends OverlayContainer {
    /**
     * @return {?}
     */
    _createContainer() {
        super._createContainer();
        this._adjustParentForFullscreenChange();
        this._addFullscreenChangeListener(() => this._adjustParentForFullscreenChange());
    }
    /**
     * @return {?}
     */
    _adjustParentForFullscreenChange() {
        if (!this._containerElement) {
            return;
        }
        /** @type {?} */
        let fullscreenElement = this.getFullscreenElement();
        /** @type {?} */
        let parent = fullscreenElement || document.body;
        parent.appendChild(this._containerElement);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    _addFullscreenChangeListener(fn) {
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
    }
    /**
     * When the page is put into fullscreen mode, a specific element is specified.
     * Only that element and its children are visible when in fullscreen mode.
     * @return {?}
     */
    getFullscreenElement() {
        return document.fullscreenElement ||
            document.webkitFullscreenElement ||
            (/** @type {?} */ (document)).mozFullScreenElement ||
            (/** @type {?} */ (document)).msFullscreenElement ||
            null;
    }
}
FullscreenOverlayContainer.decorators = [
    { type: Injectable }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbHNjcmVlbi1vdmVybGF5LWNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2NvcmUvb3ZlcmxheS9mdWxsc2NyZWVuLW92ZXJsYXktY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7Ozs7O0FBWXJELE1BQU0saUNBQWtDLFNBQVEsZ0JBQWdCOzs7O0lBQ3BELGdCQUFnQjtRQUN4QixLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsZ0NBQWdDLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsNEJBQTRCLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxFQUFFLENBQUMsQ0FBQztLQUNsRjs7OztJQUVPLGdDQUFnQztRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzNCLE9BQU87U0FDUjs7UUFDRCxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDOztRQUNwRCxJQUFJLE1BQU0sR0FBRyxpQkFBaUIsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Ozs7OztJQUdyQyw0QkFBNEIsQ0FBQyxFQUFjO1FBQ2pELElBQUksUUFBUSxDQUFDLGlCQUFpQixFQUFFO1lBQzlCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNuRDthQUFNLElBQUksUUFBUSxDQUFDLHVCQUF1QixFQUFFO1lBQzNDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN6RDthQUFNLElBQUksbUJBQUMsUUFBZSxFQUFDLENBQUMsb0JBQW9CLEVBQUU7WUFDakQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3REO2FBQU0sSUFBSSxtQkFBQyxRQUFlLEVBQUMsQ0FBQyxtQkFBbUIsRUFBRTtZQUNoRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDckQ7Ozs7Ozs7SUFPSCxvQkFBb0I7UUFDbEIsT0FBTyxRQUFRLENBQUMsaUJBQWlCO1lBQzdCLFFBQVEsQ0FBQyx1QkFBdUI7WUFDaEMsbUJBQUMsUUFBZSxFQUFDLENBQUMsb0JBQW9CO1lBQ3RDLG1CQUFDLFFBQWUsRUFBQyxDQUFDLG1CQUFtQjtZQUNyQyxJQUFJLENBQUM7S0FDVjs7O1lBdkNGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPdmVybGF5Q29udGFpbmVyfSBmcm9tICcuL292ZXJsYXktY29udGFpbmVyJztcblxuLyoqXG4gKiBUaGUgRnVsbHNjcmVlbk92ZXJsYXlDb250YWluZXIgaXMgdGhlIGFsdGVybmF0aXZlIHRvIE92ZXJsYXlDb250YWluZXJcbiAqIHRoYXQgc3VwcG9ydHMgY29ycmVjdCBkaXNwbGF5aW5nIG9mIG92ZXJsYXkgZWxlbWVudHMgaW4gRnVsbHNjcmVlbiBtb2RlXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9yZXF1ZXN0RnVsbFNjcmVlblxuICogSXQgc2hvdWxkIGJlIHByb3ZpZGVkIGluIHRoZSByb290IGNvbXBvbmVudCB0aGF0IHdheTpcbiAqIHByb3ZpZGVyczogW1xuICogICB7cHJvdmlkZTogT3ZlcmxheUNvbnRhaW5lciwgdXNlQ2xhc3M6IEZ1bGxzY3JlZW5PdmVybGF5Q29udGFpbmVyfVxuICogXSxcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZ1bGxzY3JlZW5PdmVybGF5Q29udGFpbmVyIGV4dGVuZHMgT3ZlcmxheUNvbnRhaW5lciB7XG4gIHByb3RlY3RlZCBfY3JlYXRlQ29udGFpbmVyKCk6IHZvaWQge1xuICAgIHN1cGVyLl9jcmVhdGVDb250YWluZXIoKTtcbiAgICB0aGlzLl9hZGp1c3RQYXJlbnRGb3JGdWxsc2NyZWVuQ2hhbmdlKCk7XG4gICAgdGhpcy5fYWRkRnVsbHNjcmVlbkNoYW5nZUxpc3RlbmVyKCgpID0+IHRoaXMuX2FkanVzdFBhcmVudEZvckZ1bGxzY3JlZW5DaGFuZ2UoKSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGp1c3RQYXJlbnRGb3JGdWxsc2NyZWVuQ2hhbmdlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fY29udGFpbmVyRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgZnVsbHNjcmVlbkVsZW1lbnQgPSB0aGlzLmdldEZ1bGxzY3JlZW5FbGVtZW50KCk7XG4gICAgbGV0IHBhcmVudCA9IGZ1bGxzY3JlZW5FbGVtZW50IHx8IGRvY3VtZW50LmJvZHk7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuX2NvbnRhaW5lckVsZW1lbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkRnVsbHNjcmVlbkNoYW5nZUxpc3RlbmVyKGZuOiAoKSA9PiB2b2lkKSB7XG4gICAgaWYgKGRvY3VtZW50LmZ1bGxzY3JlZW5FbmFibGVkKSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmdWxsc2NyZWVuY2hhbmdlJywgZm4pO1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVuYWJsZWQpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLCBmbik7XG4gICAgfSBlbHNlIGlmICgoZG9jdW1lbnQgYXMgYW55KS5tb3pGdWxsU2NyZWVuRW5hYmxlZCkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW96ZnVsbHNjcmVlbmNoYW5nZScsIGZuKTtcbiAgICB9IGVsc2UgaWYgKChkb2N1bWVudCBhcyBhbnkpLm1zRnVsbHNjcmVlbkVuYWJsZWQpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ01TRnVsbHNjcmVlbkNoYW5nZScsIGZuKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV2hlbiB0aGUgcGFnZSBpcyBwdXQgaW50byBmdWxsc2NyZWVuIG1vZGUsIGEgc3BlY2lmaWMgZWxlbWVudCBpcyBzcGVjaWZpZWQuXG4gICAqIE9ubHkgdGhhdCBlbGVtZW50IGFuZCBpdHMgY2hpbGRyZW4gYXJlIHZpc2libGUgd2hlbiBpbiBmdWxsc2NyZWVuIG1vZGUuXG4gICovXG4gIGdldEZ1bGxzY3JlZW5FbGVtZW50KCk6IEVsZW1lbnQge1xuICAgIHJldHVybiBkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCB8fFxuICAgICAgICBkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCB8fFxuICAgICAgICAoZG9jdW1lbnQgYXMgYW55KS5tb3pGdWxsU2NyZWVuRWxlbWVudCB8fFxuICAgICAgICAoZG9jdW1lbnQgYXMgYW55KS5tc0Z1bGxzY3JlZW5FbGVtZW50IHx8XG4gICAgICAgIG51bGw7XG4gIH1cbn1cbiJdfQ==