/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Optional } from '@angular/core';
/** @typedef {?} */
var HorizontalConnectionPos;
export { HorizontalConnectionPos };
/** @typedef {?} */
var VerticalConnectionPos;
export { VerticalConnectionPos };
/**
 * A connection point on the origin element.
 * @record
 */
export function OriginConnectionPosition() { }
/** @type {?} */
OriginConnectionPosition.prototype.originX;
/** @type {?} */
OriginConnectionPosition.prototype.originY;
/**
 * A connection point on the overlay element.
 * @record
 */
export function OverlayConnectionPosition() { }
/** @type {?} */
OverlayConnectionPosition.prototype.overlayX;
/** @type {?} */
OverlayConnectionPosition.prototype.overlayY;
/**
 * The points of the origin element and the overlay element to connect.
 */
export class ConnectionPositionPair {
    /**
     * @param {?} origin
     * @param {?} overlay
     */
    constructor(origin, overlay) {
        this.originX = origin.originX;
        this.originY = origin.originY;
        this.overlayX = overlay.overlayX;
        this.overlayY = overlay.overlayY;
    }
}
if (false) {
    /** @type {?} */
    ConnectionPositionPair.prototype.originX;
    /** @type {?} */
    ConnectionPositionPair.prototype.originY;
    /** @type {?} */
    ConnectionPositionPair.prototype.overlayX;
    /** @type {?} */
    ConnectionPositionPair.prototype.overlayY;
}
/**
 * Set of properties regarding the position of the origin and overlay relative to the viewport
 * with respect to the containing Scrollable elements.
 *
 * The overlay and origin are clipped if any part of their bounding client rectangle exceeds the
 * bounds of any one of the strategy's Scrollable's bounding client rectangle.
 *
 * The overlay and origin are outside view if there is no overlap between their bounding client
 * rectangle and any one of the strategy's Scrollable's bounding client rectangle.
 *
 *       -----------                    -----------
 *       | outside |                    | clipped |
 *       |  view   |              --------------------------
 *       |         |              |     |         |        |
 *       ----------               |     -----------        |
 *  --------------------------    |                        |
 *  |                        |    |      Scrollable        |
 *  |                        |    |                        |
 *  |                        |     --------------------------
 *  |      Scrollable        |
 *  |                        |
 *  --------------------------
 */
export class ScrollableViewProperties {
}
if (false) {
    /** @type {?} */
    ScrollableViewProperties.prototype.isOriginClipped;
    /** @type {?} */
    ScrollableViewProperties.prototype.isOriginOutsideView;
    /** @type {?} */
    ScrollableViewProperties.prototype.isOverlayClipped;
    /** @type {?} */
    ScrollableViewProperties.prototype.isOverlayOutsideView;
}
/**
 * The change event emitted by the strategy when a fallback position is used.
 */
export class ConnectedOverlayPositionChange {
    /**
     * @param {?} connectionPair
     * @param {?} scrollableViewProperties
     */
    constructor(connectionPair, scrollableViewProperties) {
        this.connectionPair = connectionPair;
        this.scrollableViewProperties = scrollableViewProperties;
    }
}
/** @nocollapse */
ConnectedOverlayPositionChange.ctorParameters = () => [
    { type: ConnectionPositionPair },
    { type: ScrollableViewProperties, decorators: [{ type: Optional }] }
];
if (false) {
    /** @type {?} */
    ConnectedOverlayPositionChange.prototype.connectionPair;
    /** @type {?} */
    ConnectedOverlayPositionChange.prototype.scrollableViewProperties;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGVkLXBvc2l0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9vdmVybGF5L3Bvc2l0aW9uL2Nvbm5lY3RlZC1wb3NpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CdkMsTUFBTTs7Ozs7SUFNSixZQUFZLE1BQWdDLEVBQUUsT0FBa0M7UUFDOUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO0tBQ2xDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkQsTUFBTTtDQUtMOzs7Ozs7Ozs7Ozs7OztBQUdELE1BQU07Ozs7O0lBQ0osWUFBbUIsY0FBc0MsRUFDMUIsd0JBQWtEO1FBRDlELG1CQUFjLEdBQWQsY0FBYyxDQUF3QjtRQUMxQiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO0tBQUk7Ozs7WUFEbEQsc0JBQXNCO1lBQ0Esd0JBQXdCLHVCQUFwRSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEhvcml6b250YWwgZGltZW5zaW9uIG9mIGEgY29ubmVjdGlvbiBwb2ludCBvbiB0aGUgcGVyaW1ldGVyIG9mIHRoZSBvcmlnaW4gb3Igb3ZlcmxheSBlbGVtZW50LiAqL1xuaW1wb3J0IHtPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5leHBvcnQgdHlwZSBIb3Jpem9udGFsQ29ubmVjdGlvblBvcyA9ICdzdGFydCcgfCAnY2VudGVyJyB8ICdlbmQnO1xuXG4vKiogVmVydGljYWwgZGltZW5zaW9uIG9mIGEgY29ubmVjdGlvbiBwb2ludCBvbiB0aGUgcGVyaW1ldGVyIG9mIHRoZSBvcmlnaW4gb3Igb3ZlcmxheSBlbGVtZW50LiAqL1xuZXhwb3J0IHR5cGUgVmVydGljYWxDb25uZWN0aW9uUG9zID0gJ3RvcCcgfCAnY2VudGVyJyB8ICdib3R0b20nO1xuXG5cbi8qKiBBIGNvbm5lY3Rpb24gcG9pbnQgb24gdGhlIG9yaWdpbiBlbGVtZW50LiAqL1xuZXhwb3J0IGludGVyZmFjZSBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb24ge1xuICBvcmlnaW5YOiBIb3Jpem9udGFsQ29ubmVjdGlvblBvcztcbiAgb3JpZ2luWTogVmVydGljYWxDb25uZWN0aW9uUG9zO1xufVxuXG4vKiogQSBjb25uZWN0aW9uIHBvaW50IG9uIHRoZSBvdmVybGF5IGVsZW1lbnQuICovXG5leHBvcnQgaW50ZXJmYWNlIE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb24ge1xuICBvdmVybGF5WDogSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3M7XG4gIG92ZXJsYXlZOiBWZXJ0aWNhbENvbm5lY3Rpb25Qb3M7XG59XG5cbi8qKiBUaGUgcG9pbnRzIG9mIHRoZSBvcmlnaW4gZWxlbWVudCBhbmQgdGhlIG92ZXJsYXkgZWxlbWVudCB0byBjb25uZWN0LiAqL1xuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb25Qb3NpdGlvblBhaXIge1xuICBvcmlnaW5YOiBIb3Jpem9udGFsQ29ubmVjdGlvblBvcztcbiAgb3JpZ2luWTogVmVydGljYWxDb25uZWN0aW9uUG9zO1xuICBvdmVybGF5WDogSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3M7XG4gIG92ZXJsYXlZOiBWZXJ0aWNhbENvbm5lY3Rpb25Qb3M7XG5cbiAgY29uc3RydWN0b3Iob3JpZ2luOiBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb24sIG92ZXJsYXk6IE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb24pIHtcbiAgICB0aGlzLm9yaWdpblggPSBvcmlnaW4ub3JpZ2luWDtcbiAgICB0aGlzLm9yaWdpblkgPSBvcmlnaW4ub3JpZ2luWTtcbiAgICB0aGlzLm92ZXJsYXlYID0gb3ZlcmxheS5vdmVybGF5WDtcbiAgICB0aGlzLm92ZXJsYXlZID0gb3ZlcmxheS5vdmVybGF5WTtcbiAgfVxufVxuXG4vKipcbiAqIFNldCBvZiBwcm9wZXJ0aWVzIHJlZ2FyZGluZyB0aGUgcG9zaXRpb24gb2YgdGhlIG9yaWdpbiBhbmQgb3ZlcmxheSByZWxhdGl2ZSB0byB0aGUgdmlld3BvcnRcbiAqIHdpdGggcmVzcGVjdCB0byB0aGUgY29udGFpbmluZyBTY3JvbGxhYmxlIGVsZW1lbnRzLlxuICpcbiAqIFRoZSBvdmVybGF5IGFuZCBvcmlnaW4gYXJlIGNsaXBwZWQgaWYgYW55IHBhcnQgb2YgdGhlaXIgYm91bmRpbmcgY2xpZW50IHJlY3RhbmdsZSBleGNlZWRzIHRoZVxuICogYm91bmRzIG9mIGFueSBvbmUgb2YgdGhlIHN0cmF0ZWd5J3MgU2Nyb2xsYWJsZSdzIGJvdW5kaW5nIGNsaWVudCByZWN0YW5nbGUuXG4gKlxuICogVGhlIG92ZXJsYXkgYW5kIG9yaWdpbiBhcmUgb3V0c2lkZSB2aWV3IGlmIHRoZXJlIGlzIG5vIG92ZXJsYXAgYmV0d2VlbiB0aGVpciBib3VuZGluZyBjbGllbnRcbiAqIHJlY3RhbmdsZSBhbmQgYW55IG9uZSBvZiB0aGUgc3RyYXRlZ3kncyBTY3JvbGxhYmxlJ3MgYm91bmRpbmcgY2xpZW50IHJlY3RhbmdsZS5cbiAqXG4gKiAgICAgICAtLS0tLS0tLS0tLSAgICAgICAgICAgICAgICAgICAgLS0tLS0tLS0tLS1cbiAqICAgICAgIHwgb3V0c2lkZSB8ICAgICAgICAgICAgICAgICAgICB8IGNsaXBwZWQgfFxuICogICAgICAgfCAgdmlldyAgIHwgICAgICAgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgICAgICB8ICAgICAgICAgfCAgICAgICAgICAgICAgfCAgICAgfCAgICAgICAgIHwgICAgICAgIHxcbiAqICAgICAgIC0tLS0tLS0tLS0gICAgICAgICAgICAgICB8ICAgICAtLS0tLS0tLS0tLSAgICAgICAgfFxuICogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAgIHwgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgfCAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgfCAgICAgIFNjcm9sbGFibGUgICAgICAgIHxcbiAqICB8ICAgICAgICAgICAgICAgICAgICAgICAgfCAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIHwgICAgICBTY3JvbGxhYmxlICAgICAgICB8XG4gKiAgfCAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5leHBvcnQgY2xhc3MgU2Nyb2xsYWJsZVZpZXdQcm9wZXJ0aWVzIHtcbiAgaXNPcmlnaW5DbGlwcGVkOiBib29sZWFuO1xuICBpc09yaWdpbk91dHNpZGVWaWV3OiBib29sZWFuO1xuICBpc092ZXJsYXlDbGlwcGVkOiBib29sZWFuO1xuICBpc092ZXJsYXlPdXRzaWRlVmlldzogYm9vbGVhbjtcbn1cblxuLyoqIFRoZSBjaGFuZ2UgZXZlbnQgZW1pdHRlZCBieSB0aGUgc3RyYXRlZ3kgd2hlbiBhIGZhbGxiYWNrIHBvc2l0aW9uIGlzIHVzZWQuICovXG5leHBvcnQgY2xhc3MgQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGNvbm5lY3Rpb25QYWlyOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBwdWJsaWMgc2Nyb2xsYWJsZVZpZXdQcm9wZXJ0aWVzOiBTY3JvbGxhYmxlVmlld1Byb3BlcnRpZXMpIHt9XG59XG4iXX0=