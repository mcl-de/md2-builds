/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ViewportRuler } from './viewport-ruler';
import { ConnectedPositionStrategy } from './connected-position-strategy';
import { Injectable } from '@angular/core';
import { GlobalPositionStrategy } from './global-position-strategy';
/**
 * Builder for overlay position strategy.
 */
export class OverlayPositionBuilder {
    /**
     * @param {?} _viewportRuler
     */
    constructor(_viewportRuler) {
        this._viewportRuler = _viewportRuler;
    }
    /**
     * Creates a global position strategy.
     * @return {?}
     */
    global() {
        return new GlobalPositionStrategy();
    }
    /**
     * Creates a relative position strategy.
     * @param {?} elementRef
     * @param {?} originPos
     * @param {?} overlayPos
     * @return {?}
     */
    connectedTo(elementRef, originPos, overlayPos) {
        return new ConnectedPositionStrategy(elementRef, originPos, overlayPos, this._viewportRuler);
    }
}
OverlayPositionBuilder.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OverlayPositionBuilder.ctorParameters = () => [
    { type: ViewportRuler }
];
if (false) {
    /** @type {?} */
    OverlayPositionBuilder.prototype._viewportRuler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wb3NpdGlvbi1idWlsZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9vdmVybGF5L3Bvc2l0aW9uL292ZXJsYXktcG9zaXRpb24tYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3hFLE9BQU8sRUFBYSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7Ozs7QUFPbEUsTUFBTTs7OztJQUNKLFlBQW9CLGNBQTZCO1FBQTdCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO0tBQUs7Ozs7O0lBS3RELE1BQU07UUFDSixPQUFPLElBQUksc0JBQXNCLEVBQUUsQ0FBQztLQUNyQzs7Ozs7Ozs7SUFRRCxXQUFXLENBQ1AsVUFBc0IsRUFDdEIsU0FBbUMsRUFDbkMsVUFBcUM7UUFDdkMsT0FBTyxJQUFJLHlCQUF5QixDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztLQUM5Rjs7O1lBdEJGLFVBQVU7Ozs7WUFUSCxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtWaWV3cG9ydFJ1bGVyfSBmcm9tICcuL3ZpZXdwb3J0LXJ1bGVyJztcbmltcG9ydCB7Q29ubmVjdGVkUG9zaXRpb25TdHJhdGVneX0gZnJvbSAnLi9jb25uZWN0ZWQtcG9zaXRpb24tc3RyYXRlZ3knO1xuaW1wb3J0IHtFbGVtZW50UmVmLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7R2xvYmFsUG9zaXRpb25TdHJhdGVneX0gZnJvbSAnLi9nbG9iYWwtcG9zaXRpb24tc3RyYXRlZ3knO1xuaW1wb3J0IHtPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uLCBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb259IGZyb20gJy4vY29ubmVjdGVkLXBvc2l0aW9uJztcblxuXG5cbi8qKiBCdWlsZGVyIGZvciBvdmVybGF5IHBvc2l0aW9uIHN0cmF0ZWd5LiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE92ZXJsYXlQb3NpdGlvbkJ1aWxkZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF92aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyKSB7IH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGdsb2JhbCBwb3NpdGlvbiBzdHJhdGVneS5cbiAgICovXG4gIGdsb2JhbCgpOiBHbG9iYWxQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICByZXR1cm4gbmV3IEdsb2JhbFBvc2l0aW9uU3RyYXRlZ3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgcmVsYXRpdmUgcG9zaXRpb24gc3RyYXRlZ3kuXG4gICAqIEBwYXJhbSBlbGVtZW50UmVmXG4gICAqIEBwYXJhbSBvcmlnaW5Qb3NcbiAgICogQHBhcmFtIG92ZXJsYXlQb3NcbiAgICovXG4gIGNvbm5lY3RlZFRvKFxuICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgIG9yaWdpblBvczogT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uLFxuICAgICAgb3ZlcmxheVBvczogT3ZlcmxheUNvbm5lY3Rpb25Qb3NpdGlvbik6IENvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgIHJldHVybiBuZXcgQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneShlbGVtZW50UmVmLCBvcmlnaW5Qb3MsIG92ZXJsYXlQb3MsIHRoaXMuX3ZpZXdwb3J0UnVsZXIpO1xuICB9XG59XG4iXX0=