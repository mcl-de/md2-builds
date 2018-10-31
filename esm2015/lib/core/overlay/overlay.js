/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ComponentFactoryResolver, Injectable, ApplicationRef, Injector, NgZone, } from '@angular/core';
import { OverlayState } from './overlay-state';
import { DomPortalHost } from '../portal/dom-portal-host';
import { OverlayRef } from './overlay-ref';
import { OverlayPositionBuilder } from './position/overlay-position-builder';
import { VIEWPORT_RULER_PROVIDER } from './position/viewport-ruler';
import { OverlayContainer, OVERLAY_CONTAINER_PROVIDER } from './overlay-container';
import { ScrollStrategyOptions } from './scroll/index';
/** *
 * Next overlay unique ID.
  @type {?} */
let nextUniqueId = 0;
/** *
 * The default state for newly created overlays.
  @type {?} */
let defaultState = new OverlayState();
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
export class Overlay {
    /**
     * @param {?} scrollStrategies
     * @param {?} _overlayContainer
     * @param {?} _componentFactoryResolver
     * @param {?} _positionBuilder
     * @param {?} _appRef
     * @param {?} _injector
     * @param {?} _ngZone
     */
    constructor(scrollStrategies, _overlayContainer, _componentFactoryResolver, _positionBuilder, _appRef, _injector, _ngZone) {
        this.scrollStrategies = scrollStrategies;
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._positionBuilder = _positionBuilder;
        this._appRef = _appRef;
        this._injector = _injector;
        this._ngZone = _ngZone;
    }
    /**
     * Creates an overlay.
     * @param {?=} state State to apply to the overlay.
     * @return {?} Reference to the created overlay.
     */
    create(state = defaultState) {
        return this._createOverlayRef(this._createPaneElement(), state);
    }
    /**
     * Returns a position builder that can be used, via fluent API,
     * to construct and configure a position strategy.
     * @return {?}
     */
    position() {
        return this._positionBuilder;
    }
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @return {?} Newly-created pane element
     */
    _createPaneElement() {
        /** @type {?} */
        let pane = document.createElement('div');
        pane.id = `cdk-overlay-${nextUniqueId++}`;
        pane.classList.add('cdk-overlay-pane');
        this._overlayContainer.getContainerElement().appendChild(pane);
        return pane;
    }
    /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param {?} pane The DOM element to turn into a portal host.
     * @return {?} A portal host for the given DOM element.
     */
    _createPortalHost(pane) {
        return new DomPortalHost(pane, this._componentFactoryResolver, this._appRef, this._injector);
    }
    /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param {?} pane DOM element for the overlay
     * @param {?} state
     * @return {?}
     */
    _createOverlayRef(pane, state) {
        /** @type {?} */
        let scrollStrategy = state.scrollStrategy || this.scrollStrategies.noop();
        /** @type {?} */
        let portalHost = this._createPortalHost(pane);
        return new OverlayRef(portalHost, pane, state, scrollStrategy, this._ngZone);
    }
}
Overlay.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Overlay.ctorParameters = () => [
    { type: ScrollStrategyOptions },
    { type: OverlayContainer },
    { type: ComponentFactoryResolver },
    { type: OverlayPositionBuilder },
    { type: ApplicationRef },
    { type: Injector },
    { type: NgZone }
];
if (false) {
    /** @type {?} */
    Overlay.prototype.scrollStrategies;
    /** @type {?} */
    Overlay.prototype._overlayContainer;
    /** @type {?} */
    Overlay.prototype._componentFactoryResolver;
    /** @type {?} */
    Overlay.prototype._positionBuilder;
    /** @type {?} */
    Overlay.prototype._appRef;
    /** @type {?} */
    Overlay.prototype._injector;
    /** @type {?} */
    Overlay.prototype._ngZone;
}
/** *
 * Providers for Overlay and its related injectables.
  @type {?} */
export const OVERLAY_PROVIDERS = [
    Overlay,
    OverlayPositionBuilder,
    VIEWPORT_RULER_PROVIDER,
    OVERLAY_CONTAINER_PROVIDER,
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2NvcmUvb3ZlcmxheS9vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLFVBQVUsRUFDVixjQUFjLEVBQ2QsUUFBUSxFQUNSLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFDLGdCQUFnQixFQUFFLDBCQUEwQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFpQixxQkFBcUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7O0FBSXJFLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQzs7OztBQUdyQixJQUFJLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDOzs7Ozs7Ozs7QUFZdEMsTUFBTTs7Ozs7Ozs7OztJQUNKLFlBQW1CLGdCQUF1QyxFQUN0QyxtQkFDQSwyQkFDQSxrQkFDQSxTQUNBLFdBQ0E7UUFORCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXVCO1FBQ3RDLHNCQUFpQixHQUFqQixpQkFBaUI7UUFDakIsOEJBQXlCLEdBQXpCLHlCQUF5QjtRQUN6QixxQkFBZ0IsR0FBaEIsZ0JBQWdCO1FBQ2hCLFlBQU8sR0FBUCxPQUFPO1FBQ1AsY0FBUyxHQUFULFNBQVM7UUFDVCxZQUFPLEdBQVAsT0FBTztLQUFhOzs7Ozs7SUFPeEMsTUFBTSxDQUFDLFFBQXNCLFlBQVk7UUFDdkMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDakU7Ozs7OztJQU1ELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztLQUM5Qjs7Ozs7SUFNTyxrQkFBa0I7O1FBQ3hCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekMsSUFBSSxDQUFDLEVBQUUsR0FBRyxlQUFlLFlBQVksRUFBRSxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0QsT0FBTyxJQUFJLENBQUM7Ozs7Ozs7SUFRTixpQkFBaUIsQ0FBQyxJQUFpQjtRQUN6QyxPQUFPLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMseUJBQXlCLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7Ozs7O0lBUXZGLGlCQUFpQixDQUFDLElBQWlCLEVBQUUsS0FBbUI7O1FBQzlELElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDOztRQUMxRSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7O1lBMURoRixVQUFVOzs7O1lBbEJhLHFCQUFxQjtZQURyQyxnQkFBZ0I7WUFadEIsd0JBQXdCO1lBVWxCLHNCQUFzQjtZQVI1QixjQUFjO1lBQ2QsUUFBUTtZQUNSLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBGUixhQUFhLGlCQUFpQixHQUFlO0lBQzNDLE9BQU87SUFDUCxzQkFBc0I7SUFDdEIsdUJBQXVCO0lBQ3ZCLDBCQUEwQjtDQUMzQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBJbmplY3RhYmxlLFxuICBBcHBsaWNhdGlvblJlZixcbiAgSW5qZWN0b3IsXG4gIE5nWm9uZSxcbiAgUHJvdmlkZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPdmVybGF5U3RhdGV9IGZyb20gJy4vb3ZlcmxheS1zdGF0ZSc7XG5pbXBvcnQge0RvbVBvcnRhbEhvc3R9IGZyb20gJy4uL3BvcnRhbC9kb20tcG9ydGFsLWhvc3QnO1xuaW1wb3J0IHtPdmVybGF5UmVmfSBmcm9tICcuL292ZXJsYXktcmVmJztcbmltcG9ydCB7T3ZlcmxheVBvc2l0aW9uQnVpbGRlcn0gZnJvbSAnLi9wb3NpdGlvbi9vdmVybGF5LXBvc2l0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHtWSUVXUE9SVF9SVUxFUl9QUk9WSURFUn0gZnJvbSAnLi9wb3NpdGlvbi92aWV3cG9ydC1ydWxlcic7XG5pbXBvcnQge092ZXJsYXlDb250YWluZXIsIE9WRVJMQVlfQ09OVEFJTkVSX1BST1ZJREVSfSBmcm9tICcuL292ZXJsYXktY29udGFpbmVyJztcbmltcG9ydCB7U2Nyb2xsU3RyYXRlZ3ksIFNjcm9sbFN0cmF0ZWd5T3B0aW9uc30gZnJvbSAnLi9zY3JvbGwvaW5kZXgnO1xuXG5cbi8qKiBOZXh0IG92ZXJsYXkgdW5pcXVlIElELiAqL1xubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKiBUaGUgZGVmYXVsdCBzdGF0ZSBmb3IgbmV3bHkgY3JlYXRlZCBvdmVybGF5cy4gKi9cbmxldCBkZWZhdWx0U3RhdGUgPSBuZXcgT3ZlcmxheVN0YXRlKCk7XG5cblxuLyoqXG4gKiBTZXJ2aWNlIHRvIGNyZWF0ZSBPdmVybGF5cy4gT3ZlcmxheXMgYXJlIGR5bmFtaWNhbGx5IGFkZGVkIHBpZWNlcyBvZiBmbG9hdGluZyBVSSwgbWVhbnQgdG8gYmVcbiAqIHVzZWQgYXMgYSBsb3ctbGV2ZWwgYnVpbGRpbmcgYnVpbGRpbmcgYmxvY2sgZm9yIG90aGVyIGNvbXBvbmVudHMuIERpYWxvZ3MsIHRvb2x0aXBzLCBtZW51cyxcbiAqIHNlbGVjdHMsIGV0Yy4gY2FuIGFsbCBiZSBidWlsdCB1c2luZyBvdmVybGF5cy4gVGhlIHNlcnZpY2Ugc2hvdWxkIHByaW1hcmlseSBiZSB1c2VkIGJ5IGF1dGhvcnNcbiAqIG9mIHJlLXVzYWJsZSBjb21wb25lbnRzIHJhdGhlciB0aGFuIGRldmVsb3BlcnMgYnVpbGRpbmcgZW5kLXVzZXIgYXBwbGljYXRpb25zLlxuICpcbiAqIEFuIG92ZXJsYXkgKmlzKiBhIFBvcnRhbEhvc3QsIHNvIGFueSBraW5kIG9mIFBvcnRhbCBjYW4gYmUgbG9hZGVkIGludG8gb25lLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3ZlcmxheSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzY3JvbGxTdHJhdGVnaWVzOiBTY3JvbGxTdHJhdGVneU9wdGlvbnMsXG4gICAgICAgICAgICAgIHByaXZhdGUgX292ZXJsYXlDb250YWluZXI6IE92ZXJsYXlDb250YWluZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF9wb3NpdGlvbkJ1aWxkZXI6IE92ZXJsYXlQb3NpdGlvbkJ1aWxkZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2FwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUpIHsgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIG92ZXJsYXkuXG4gICAqIEBwYXJhbSBzdGF0ZSBTdGF0ZSB0byBhcHBseSB0byB0aGUgb3ZlcmxheS5cbiAgICogQHJldHVybnMgUmVmZXJlbmNlIHRvIHRoZSBjcmVhdGVkIG92ZXJsYXkuXG4gICAqL1xuICBjcmVhdGUoc3RhdGU6IE92ZXJsYXlTdGF0ZSA9IGRlZmF1bHRTdGF0ZSk6IE92ZXJsYXlSZWYge1xuICAgIHJldHVybiB0aGlzLl9jcmVhdGVPdmVybGF5UmVmKHRoaXMuX2NyZWF0ZVBhbmVFbGVtZW50KCksIHN0YXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgcG9zaXRpb24gYnVpbGRlciB0aGF0IGNhbiBiZSB1c2VkLCB2aWEgZmx1ZW50IEFQSSxcbiAgICogdG8gY29uc3RydWN0IGFuZCBjb25maWd1cmUgYSBwb3NpdGlvbiBzdHJhdGVneS5cbiAgICovXG4gIHBvc2l0aW9uKCk6IE92ZXJsYXlQb3NpdGlvbkJ1aWxkZXIge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbkJ1aWxkZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgRE9NIGVsZW1lbnQgZm9yIGFuIG92ZXJsYXkgYW5kIGFwcGVuZHMgaXQgdG8gdGhlIG92ZXJsYXkgY29udGFpbmVyLlxuICAgKiBAcmV0dXJucyBOZXdseS1jcmVhdGVkIHBhbmUgZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlUGFuZUVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIGxldCBwYW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBwYW5lLmlkID0gYGNkay1vdmVybGF5LSR7bmV4dFVuaXF1ZUlkKyt9YDtcbiAgICBwYW5lLmNsYXNzTGlzdC5hZGQoJ2Nkay1vdmVybGF5LXBhbmUnKTtcbiAgICB0aGlzLl9vdmVybGF5Q29udGFpbmVyLmdldENvbnRhaW5lckVsZW1lbnQoKS5hcHBlbmRDaGlsZChwYW5lKTtcblxuICAgIHJldHVybiBwYW5lO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIERvbVBvcnRhbEhvc3QgaW50byB3aGljaCB0aGUgb3ZlcmxheSBjb250ZW50IGNhbiBiZSBsb2FkZWQuXG4gICAqIEBwYXJhbSBwYW5lIFRoZSBET00gZWxlbWVudCB0byB0dXJuIGludG8gYSBwb3J0YWwgaG9zdC5cbiAgICogQHJldHVybnMgQSBwb3J0YWwgaG9zdCBmb3IgdGhlIGdpdmVuIERPTSBlbGVtZW50LlxuICAgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlUG9ydGFsSG9zdChwYW5lOiBIVE1MRWxlbWVudCk6IERvbVBvcnRhbEhvc3Qge1xuICAgIHJldHVybiBuZXcgRG9tUG9ydGFsSG9zdChwYW5lLCB0aGlzLl9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHRoaXMuX2FwcFJlZiwgdGhpcy5faW5qZWN0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gT3ZlcmxheVJlZiBmb3IgYW4gb3ZlcmxheSBpbiB0aGUgZ2l2ZW4gRE9NIGVsZW1lbnQuXG4gICAqIEBwYXJhbSBwYW5lIERPTSBlbGVtZW50IGZvciB0aGUgb3ZlcmxheVxuICAgKiBAcGFyYW0gc3RhdGVcbiAgICovXG4gIHByaXZhdGUgX2NyZWF0ZU92ZXJsYXlSZWYocGFuZTogSFRNTEVsZW1lbnQsIHN0YXRlOiBPdmVybGF5U3RhdGUpOiBPdmVybGF5UmVmIHtcbiAgICBsZXQgc2Nyb2xsU3RyYXRlZ3kgPSBzdGF0ZS5zY3JvbGxTdHJhdGVneSB8fCB0aGlzLnNjcm9sbFN0cmF0ZWdpZXMubm9vcCgpO1xuICAgIGxldCBwb3J0YWxIb3N0ID0gdGhpcy5fY3JlYXRlUG9ydGFsSG9zdChwYW5lKTtcbiAgICByZXR1cm4gbmV3IE92ZXJsYXlSZWYocG9ydGFsSG9zdCwgcGFuZSwgc3RhdGUsIHNjcm9sbFN0cmF0ZWd5LCB0aGlzLl9uZ1pvbmUpO1xuICB9XG59XG5cbi8qKiBQcm92aWRlcnMgZm9yIE92ZXJsYXkgYW5kIGl0cyByZWxhdGVkIGluamVjdGFibGVzLiAqL1xuZXhwb3J0IGNvbnN0IE9WRVJMQVlfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICBPdmVybGF5LFxuICBPdmVybGF5UG9zaXRpb25CdWlsZGVyLFxuICBWSUVXUE9SVF9SVUxFUl9QUk9WSURFUixcbiAgT1ZFUkxBWV9DT05UQUlORVJfUFJPVklERVIsXG5dO1xuIl19