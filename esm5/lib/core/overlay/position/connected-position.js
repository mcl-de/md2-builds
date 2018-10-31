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
var /**
 * The points of the origin element and the overlay element to connect.
 */
ConnectionPositionPair = /** @class */ (function () {
    function ConnectionPositionPair(origin, overlay) {
        this.originX = origin.originX;
        this.originY = origin.originY;
        this.overlayX = overlay.overlayX;
        this.overlayY = overlay.overlayY;
    }
    return ConnectionPositionPair;
}());
/**
 * The points of the origin element and the overlay element to connect.
 */
export { ConnectionPositionPair };
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
var /**
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
ScrollableViewProperties = /** @class */ (function () {
    function ScrollableViewProperties() {
    }
    return ScrollableViewProperties;
}());
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
export { ScrollableViewProperties };
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
var ConnectedOverlayPositionChange = /** @class */ (function () {
    function ConnectedOverlayPositionChange(connectionPair, scrollableViewProperties) {
        this.connectionPair = connectionPair;
        this.scrollableViewProperties = scrollableViewProperties;
    }
    /** @nocollapse */
    ConnectedOverlayPositionChange.ctorParameters = function () { return [
        { type: ConnectionPositionPair },
        { type: ScrollableViewProperties, decorators: [{ type: Optional }] }
    ]; };
    return ConnectedOverlayPositionChange;
}());
export { ConnectedOverlayPositionChange };
if (false) {
    /** @type {?} */
    ConnectedOverlayPositionChange.prototype.connectionPair;
    /** @type {?} */
    ConnectedOverlayPositionChange.prototype.scrollableViewProperties;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGVkLXBvc2l0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9vdmVybGF5L3Bvc2l0aW9uL2Nvbm5lY3RlZC1wb3NpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CdkM7OztBQUFBO0lBTUUsZ0NBQVksTUFBZ0MsRUFBRSxPQUFrQztRQUM5RSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7S0FDbEM7aUNBaENIO0lBaUNDLENBQUE7Ozs7QUFaRCxrQ0FZQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O21DQTFEQTtJQStEQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFMRCxvQ0FLQzs7Ozs7Ozs7Ozs7Ozs7O0lBSUMsd0NBQW1CLGNBQXNDLEVBQzFCLHdCQUFrRDtRQUQ5RCxtQkFBYyxHQUFkLGNBQWMsQ0FBd0I7UUFDMUIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtLQUFJOzs7Z0JBRGxELHNCQUFzQjtnQkFDQSx3QkFBd0IsdUJBQXBFLFFBQVE7O3lDQXBFdkI7O1NBa0VhLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBIb3Jpem9udGFsIGRpbWVuc2lvbiBvZiBhIGNvbm5lY3Rpb24gcG9pbnQgb24gdGhlIHBlcmltZXRlciBvZiB0aGUgb3JpZ2luIG9yIG92ZXJsYXkgZWxlbWVudC4gKi9cbmltcG9ydCB7T3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IHR5cGUgSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3MgPSAnc3RhcnQnIHwgJ2NlbnRlcicgfCAnZW5kJztcblxuLyoqIFZlcnRpY2FsIGRpbWVuc2lvbiBvZiBhIGNvbm5lY3Rpb24gcG9pbnQgb24gdGhlIHBlcmltZXRlciBvZiB0aGUgb3JpZ2luIG9yIG92ZXJsYXkgZWxlbWVudC4gKi9cbmV4cG9ydCB0eXBlIFZlcnRpY2FsQ29ubmVjdGlvblBvcyA9ICd0b3AnIHwgJ2NlbnRlcicgfCAnYm90dG9tJztcblxuXG4vKiogQSBjb25uZWN0aW9uIHBvaW50IG9uIHRoZSBvcmlnaW4gZWxlbWVudC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uIHtcbiAgb3JpZ2luWDogSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3M7XG4gIG9yaWdpblk6IFZlcnRpY2FsQ29ubmVjdGlvblBvcztcbn1cblxuLyoqIEEgY29ubmVjdGlvbiBwb2ludCBvbiB0aGUgb3ZlcmxheSBlbGVtZW50LiAqL1xuZXhwb3J0IGludGVyZmFjZSBPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uIHtcbiAgb3ZlcmxheVg6IEhvcml6b250YWxDb25uZWN0aW9uUG9zO1xuICBvdmVybGF5WTogVmVydGljYWxDb25uZWN0aW9uUG9zO1xufVxuXG4vKiogVGhlIHBvaW50cyBvZiB0aGUgb3JpZ2luIGVsZW1lbnQgYW5kIHRoZSBvdmVybGF5IGVsZW1lbnQgdG8gY29ubmVjdC4gKi9cbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uUG9zaXRpb25QYWlyIHtcbiAgb3JpZ2luWDogSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3M7XG4gIG9yaWdpblk6IFZlcnRpY2FsQ29ubmVjdGlvblBvcztcbiAgb3ZlcmxheVg6IEhvcml6b250YWxDb25uZWN0aW9uUG9zO1xuICBvdmVybGF5WTogVmVydGljYWxDb25uZWN0aW9uUG9zO1xuXG4gIGNvbnN0cnVjdG9yKG9yaWdpbjogT3JpZ2luQ29ubmVjdGlvblBvc2l0aW9uLCBvdmVybGF5OiBPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uKSB7XG4gICAgdGhpcy5vcmlnaW5YID0gb3JpZ2luLm9yaWdpblg7XG4gICAgdGhpcy5vcmlnaW5ZID0gb3JpZ2luLm9yaWdpblk7XG4gICAgdGhpcy5vdmVybGF5WCA9IG92ZXJsYXkub3ZlcmxheVg7XG4gICAgdGhpcy5vdmVybGF5WSA9IG92ZXJsYXkub3ZlcmxheVk7XG4gIH1cbn1cblxuLyoqXG4gKiBTZXQgb2YgcHJvcGVydGllcyByZWdhcmRpbmcgdGhlIHBvc2l0aW9uIG9mIHRoZSBvcmlnaW4gYW5kIG92ZXJsYXkgcmVsYXRpdmUgdG8gdGhlIHZpZXdwb3J0XG4gKiB3aXRoIHJlc3BlY3QgdG8gdGhlIGNvbnRhaW5pbmcgU2Nyb2xsYWJsZSBlbGVtZW50cy5cbiAqXG4gKiBUaGUgb3ZlcmxheSBhbmQgb3JpZ2luIGFyZSBjbGlwcGVkIGlmIGFueSBwYXJ0IG9mIHRoZWlyIGJvdW5kaW5nIGNsaWVudCByZWN0YW5nbGUgZXhjZWVkcyB0aGVcbiAqIGJvdW5kcyBvZiBhbnkgb25lIG9mIHRoZSBzdHJhdGVneSdzIFNjcm9sbGFibGUncyBib3VuZGluZyBjbGllbnQgcmVjdGFuZ2xlLlxuICpcbiAqIFRoZSBvdmVybGF5IGFuZCBvcmlnaW4gYXJlIG91dHNpZGUgdmlldyBpZiB0aGVyZSBpcyBubyBvdmVybGFwIGJldHdlZW4gdGhlaXIgYm91bmRpbmcgY2xpZW50XG4gKiByZWN0YW5nbGUgYW5kIGFueSBvbmUgb2YgdGhlIHN0cmF0ZWd5J3MgU2Nyb2xsYWJsZSdzIGJvdW5kaW5nIGNsaWVudCByZWN0YW5nbGUuXG4gKlxuICogICAgICAgLS0tLS0tLS0tLS0gICAgICAgICAgICAgICAgICAgIC0tLS0tLS0tLS0tXG4gKiAgICAgICB8IG91dHNpZGUgfCAgICAgICAgICAgICAgICAgICAgfCBjbGlwcGVkIHxcbiAqICAgICAgIHwgIHZpZXcgICB8ICAgICAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogICAgICAgfCAgICAgICAgIHwgICAgICAgICAgICAgIHwgICAgIHwgICAgICAgICB8ICAgICAgICB8XG4gKiAgICAgICAtLS0tLS0tLS0tICAgICAgICAgICAgICAgfCAgICAgLS0tLS0tLS0tLS0gICAgICAgIHxcbiAqICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICAgICB8ICAgIHwgICAgICBTY3JvbGxhYmxlICAgICAgICB8XG4gKiAgfCAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgfCAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICB8ICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICB8ICAgICAgU2Nyb2xsYWJsZSAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuZXhwb3J0IGNsYXNzIFNjcm9sbGFibGVWaWV3UHJvcGVydGllcyB7XG4gIGlzT3JpZ2luQ2xpcHBlZDogYm9vbGVhbjtcbiAgaXNPcmlnaW5PdXRzaWRlVmlldzogYm9vbGVhbjtcbiAgaXNPdmVybGF5Q2xpcHBlZDogYm9vbGVhbjtcbiAgaXNPdmVybGF5T3V0c2lkZVZpZXc6IGJvb2xlYW47XG59XG5cbi8qKiBUaGUgY2hhbmdlIGV2ZW50IGVtaXR0ZWQgYnkgdGhlIHN0cmF0ZWd5IHdoZW4gYSBmYWxsYmFjayBwb3NpdGlvbiBpcyB1c2VkLiAqL1xuZXhwb3J0IGNsYXNzIENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb25uZWN0aW9uUGFpcjogQ29ubmVjdGlvblBvc2l0aW9uUGFpcixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgcHVibGljIHNjcm9sbGFibGVWaWV3UHJvcGVydGllczogU2Nyb2xsYWJsZVZpZXdQcm9wZXJ0aWVzKSB7fVxufVxuIl19