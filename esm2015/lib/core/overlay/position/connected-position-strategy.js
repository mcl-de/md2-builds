/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ConnectionPositionPair, ConnectedOverlayPositionChange } from './connected-position';
import { Subject } from 'rxjs';
/** @typedef {?} */
var ElementBoundingPositions;
/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
export class ConnectedPositionStrategy {
    /**
     * @param {?} _connectedTo
     * @param {?} _originPos
     * @param {?} _overlayPos
     * @param {?} _viewportRuler
     */
    constructor(_connectedTo, _originPos, _overlayPos, _viewportRuler) {
        this._connectedTo = _connectedTo;
        this._originPos = _originPos;
        this._overlayPos = _overlayPos;
        this._viewportRuler = _viewportRuler;
        this._dir = 'ltr';
        /**
         * The offset in pixels for the overlay connection point on the x-axis
         */
        this._offsetX = 0;
        /**
         * The offset in pixels for the overlay connection point on the y-axis
         */
        this._offsetY = 0;
        /**
         * The Scrollable containers used to check scrollable view properties on position change.
         */
        this.scrollables = [];
        /**
         * Ordered list of preferred positions, from most to least desirable.
         */
        this._preferredPositions = [];
        this._onPositionChange = new Subject();
        this._origin = this._connectedTo.nativeElement;
        this.withFallbackPosition(_originPos, _overlayPos);
    }
    /**
     * Whether the we're dealing with an RTL context
     * @return {?}
     */
    get _isRtl() {
        return this._dir === 'rtl';
    }
    /**
     * Emits an event when the connection point changes.
     * @return {?}
     */
    get onPositionChange() {
        return this._onPositionChange.asObservable();
    }
    /**
     * Ordered list of preferred positions, from most to least desirable.
     * @return {?}
     */
    get positions() {
        return this._preferredPositions;
    }
    /**
     * To be used to for any cleanup after the element gets destroyed.
     * @return {?}
     */
    dispose() { }
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin fits on-screen.
     * \@docs-private
     *
     * @param {?} element Element to which to apply the CSS styles.
     * @return {?} Resolves when the styles have been applied.
     */
    apply(element) {
        // Cache the overlay pane element in case re-calculating position is necessary
        this._pane = element;
        /** @type {?} */
        const originRect = this._origin.getBoundingClientRect();
        /** @type {?} */
        const overlayRect = element.getBoundingClientRect();
        /** @type {?} */
        const viewportRect = this._viewportRuler.getViewportRect();
        /** @type {?} */
        let fallbackPoint = null;
        /** @type {?} */
        let fallbackPosition = null;
        // We want to place the overlay in the first of the preferred positions such that the
        // overlay fits on-screen.
        for (let pos of this._preferredPositions) {
            /** @type {?} */
            let originPoint = this._getOriginConnectionPoint(originRect, pos);
            /** @type {?} */
            let overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportRect, pos);
            // If the overlay in the calculated position fits on-screen, put it there and we're done.
            if (overlayPoint.fitsInViewport) {
                this._setElementPosition(element, overlayRect, overlayPoint, pos);
                // Save the last connected position in case the position needs to be re-calculated.
                this._lastConnectedPosition = pos;
                /** @type {?} */
                const scrollableViewProperties = this.getScrollableViewProperties(element);
                /** @type {?} */
                const positionChange = new ConnectedOverlayPositionChange(pos, scrollableViewProperties);
                this._onPositionChange.next(positionChange);
                return Promise.resolve(null);
            }
            else if (!fallbackPoint || fallbackPoint.visibleArea < overlayPoint.visibleArea) {
                fallbackPoint = overlayPoint;
                fallbackPosition = pos;
            }
        }
        // If none of the preferred positions were in the viewport, take the one
        // with the largest visible area.
        this._setElementPosition(element, overlayRect, fallbackPoint, fallbackPosition);
        return Promise.resolve(null);
    }
    /**
     * This re-aligns the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     * @return {?}
     */
    recalculateLastPosition() {
        /** @type {?} */
        const originRect = this._origin.getBoundingClientRect();
        /** @type {?} */
        const overlayRect = this._pane.getBoundingClientRect();
        /** @type {?} */
        const viewportRect = this._viewportRuler.getViewportRect();
        /** @type {?} */
        const lastPosition = this._lastConnectedPosition || this._preferredPositions[0];
        /** @type {?} */
        let originPoint = this._getOriginConnectionPoint(originRect, lastPosition);
        /** @type {?} */
        let overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportRect, lastPosition);
        this._setElementPosition(this._pane, overlayRect, overlayPoint, lastPosition);
    }
    /**
     * Sets the list of Scrollable containers that host the origin element so that
     * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
     * Scrollable must be an ancestor element of the strategy's origin element.
     * @param {?} scrollables
     * @return {?}
     */
    withScrollableContainers(scrollables) {
        this.scrollables = scrollables;
    }
    /**
     * Adds a new preferred fallback position.
     * @param {?} originPos
     * @param {?} overlayPos
     * @return {?}
     */
    withFallbackPosition(originPos, overlayPos) {
        this._preferredPositions.push(new ConnectionPositionPair(originPos, overlayPos));
        return this;
    }
    /**
     * Sets the layout direction so the overlay's position can be adjusted to match.
     * @param {?} dir New layout direction.
     * @return {?}
     */
    withDirection(dir) {
        this._dir = dir;
        return this;
    }
    /**
     * Sets an offset for the overlay's connection point on the x-axis
     * @param {?} offset New offset in the X axis.
     * @return {?}
     */
    withOffsetX(offset) {
        this._offsetX = offset;
        return this;
    }
    /**
     * Sets an offset for the overlay's connection point on the y-axis
     * @param {?} offset New offset in the Y axis.
     * @return {?}
     */
    withOffsetY(offset) {
        this._offsetY = offset;
        return this;
    }
    /**
     * Gets the horizontal (x) "start" dimension based on whether the overlay is in an RTL context.
     * @param {?} rect
     * @return {?}
     */
    _getStartX(rect) {
        return this._isRtl ? rect.right : rect.left;
    }
    /**
     * Gets the horizontal (x) "end" dimension based on whether the overlay is in an RTL context.
     * @param {?} rect
     * @return {?}
     */
    _getEndX(rect) {
        return this._isRtl ? rect.left : rect.right;
    }
    /**
     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
     * @param {?} originRect
     * @param {?} pos
     * @return {?}
     */
    _getOriginConnectionPoint(originRect, pos) {
        /** @type {?} */
        const originStartX = this._getStartX(originRect);
        /** @type {?} */
        const originEndX = this._getEndX(originRect);
        /** @type {?} */
        let x;
        if (pos.originX == 'center') {
            x = originStartX + (originRect.width / 2);
        }
        else {
            x = pos.originX == 'start' ? originStartX : originEndX;
        }
        /** @type {?} */
        let y;
        if (pos.originY == 'center') {
            y = originRect.top + (originRect.height / 2);
        }
        else {
            y = pos.originY == 'top' ? originRect.top : originRect.bottom;
        }
        return { x, y };
    }
    /**
     * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
     * origin point to which the overlay should be connected, as well as how much of the element
     * would be inside the viewport at that position.
     * @param {?} originPoint
     * @param {?} overlayRect
     * @param {?} viewportRect
     * @param {?} pos
     * @return {?}
     */
    _getOverlayPoint(originPoint, overlayRect, viewportRect, pos) {
        /** @type {?} */
        let overlayStartX;
        if (pos.overlayX == 'center') {
            overlayStartX = -overlayRect.width / 2;
        }
        else if (pos.overlayX === 'start') {
            overlayStartX = this._isRtl ? -overlayRect.width : 0;
        }
        else {
            overlayStartX = this._isRtl ? 0 : -overlayRect.width;
        }
        /** @type {?} */
        let overlayStartY;
        if (pos.overlayY == 'center') {
            overlayStartY = -overlayRect.height / 2;
        }
        else {
            overlayStartY = pos.overlayY == 'top' ? 0 : -overlayRect.height;
        }
        /** @type {?} */
        let x = originPoint.x + overlayStartX + this._offsetX;
        /** @type {?} */
        let y = originPoint.y + overlayStartY + this._offsetY;
        /** @type {?} */
        let leftOverflow = 0 - x;
        /** @type {?} */
        let rightOverflow = (x + overlayRect.width) - viewportRect.width;
        /** @type {?} */
        let topOverflow = 0 - y;
        /** @type {?} */
        let bottomOverflow = (y + overlayRect.height) - viewportRect.height;
        /** @type {?} */
        let visibleWidth = this._subtractOverflows(overlayRect.width, leftOverflow, rightOverflow);
        /** @type {?} */
        let visibleHeight = this._subtractOverflows(overlayRect.height, topOverflow, bottomOverflow);
        /** @type {?} */
        let visibleArea = visibleWidth * visibleHeight;
        /** @type {?} */
        let fitsInViewport = (overlayRect.width * overlayRect.height) === visibleArea;
        return { x, y, fitsInViewport, visibleArea };
    }
    /**
     * Gets the view properties of the trigger and overlay, including whether they are clipped
     * or completely outside the view of any of the strategy's scrollables.
     * @param {?} overlay
     * @return {?}
     */
    getScrollableViewProperties(overlay) {
        /** @type {?} */
        const originBounds = this._getElementBounds(this._origin);
        /** @type {?} */
        const overlayBounds = this._getElementBounds(overlay);
        /** @type {?} */
        const scrollContainerBounds = this.scrollables.map((scrollable) => {
            return this._getElementBounds(scrollable.getElementRef().nativeElement);
        });
        return {
            isOriginClipped: this.isElementClipped(originBounds, scrollContainerBounds),
            isOriginOutsideView: this.isElementOutsideView(originBounds, scrollContainerBounds),
            isOverlayClipped: this.isElementClipped(overlayBounds, scrollContainerBounds),
            isOverlayOutsideView: this.isElementOutsideView(overlayBounds, scrollContainerBounds),
        };
    }
    /**
     * Whether the element is completely out of the view of any of the containers.
     * @param {?} elementBounds
     * @param {?} containersBounds
     * @return {?}
     */
    isElementOutsideView(elementBounds, containersBounds) {
        return containersBounds.some((containerBounds) => {
            /** @type {?} */
            const outsideAbove = elementBounds.bottom < containerBounds.top;
            /** @type {?} */
            const outsideBelow = elementBounds.top > containerBounds.bottom;
            /** @type {?} */
            const outsideLeft = elementBounds.right < containerBounds.left;
            /** @type {?} */
            const outsideRight = elementBounds.left > containerBounds.right;
            return outsideAbove || outsideBelow || outsideLeft || outsideRight;
        });
    }
    /**
     * Whether the element is clipped by any of the containers.
     * @param {?} elementBounds
     * @param {?} containersBounds
     * @return {?}
     */
    isElementClipped(elementBounds, containersBounds) {
        return containersBounds.some((containerBounds) => {
            /** @type {?} */
            const clippedAbove = elementBounds.top < containerBounds.top;
            /** @type {?} */
            const clippedBelow = elementBounds.bottom > containerBounds.bottom;
            /** @type {?} */
            const clippedLeft = elementBounds.left < containerBounds.left;
            /** @type {?} */
            const clippedRight = elementBounds.right > containerBounds.right;
            return clippedAbove || clippedBelow || clippedLeft || clippedRight;
        });
    }
    /**
     * Physically positions the overlay element to the given coordinate.
     * @param {?} element
     * @param {?} overlayRect
     * @param {?} overlayPoint
     * @param {?} pos
     * @return {?}
     */
    _setElementPosition(element, overlayRect, overlayPoint, pos) {
        /** @type {?} */
        let verticalStyleProperty = pos.overlayY === 'bottom' ? 'bottom' : 'top';
        /** @type {?} */
        let y = verticalStyleProperty === 'top' ?
            overlayPoint.y :
            document.documentElement.clientHeight - (overlayPoint.y + overlayRect.height);
        /** @type {?} */
        let horizontalStyleProperty;
        if (this._dir === 'rtl') {
            horizontalStyleProperty = pos.overlayX === 'end' ? 'left' : 'right';
        }
        else {
            horizontalStyleProperty = pos.overlayX === 'end' ? 'right' : 'left';
        }
        /** @type {?} */
        let x = horizontalStyleProperty === 'left' ?
            overlayPoint.x :
            document.documentElement.clientWidth - (overlayPoint.x + overlayRect.width);
        // Reset any existing styles. This is necessary in case the preferred position has
        // changed since the last `apply`.
        ['top', 'bottom', 'left', 'right'].forEach((p) => element.style[p] = null);
        element.style[verticalStyleProperty] = `${y}px`;
        element.style[horizontalStyleProperty] = `${x}px`;
    }
    /**
     * Returns the bounding positions of the provided element with respect to the viewport.
     * @param {?} element
     * @return {?}
     */
    _getElementBounds(element) {
        /** @type {?} */
        const boundingClientRect = element.getBoundingClientRect();
        return {
            top: boundingClientRect.top,
            right: boundingClientRect.left + boundingClientRect.width,
            bottom: boundingClientRect.top + boundingClientRect.height,
            left: boundingClientRect.left
        };
    }
    /**
     * Subtracts the amount that an element is overflowing on an axis from it's length.
     * @param {?} length
     * @param {...?} overflows
     * @return {?}
     */
    _subtractOverflows(length, ...overflows) {
        return overflows.reduce((currentValue, currentOverflow) => {
            return currentValue - Math.max(currentOverflow, 0);
        }, length);
    }
}
if (false) {
    /** @type {?} */
    ConnectedPositionStrategy.prototype._dir;
    /**
     * The offset in pixels for the overlay connection point on the x-axis
     * @type {?}
     */
    ConnectedPositionStrategy.prototype._offsetX;
    /**
     * The offset in pixels for the overlay connection point on the y-axis
     * @type {?}
     */
    ConnectedPositionStrategy.prototype._offsetY;
    /**
     * The Scrollable containers used to check scrollable view properties on position change.
     * @type {?}
     */
    ConnectedPositionStrategy.prototype.scrollables;
    /**
     * Ordered list of preferred positions, from most to least desirable.
     * @type {?}
     */
    ConnectedPositionStrategy.prototype._preferredPositions;
    /**
     * The origin element against which the overlay will be positioned.
     * @type {?}
     */
    ConnectedPositionStrategy.prototype._origin;
    /**
     * The overlay pane element.
     * @type {?}
     */
    ConnectedPositionStrategy.prototype._pane;
    /**
     * The last position to have been calculated as the best fit position.
     * @type {?}
     */
    ConnectedPositionStrategy.prototype._lastConnectedPosition;
    /** @type {?} */
    ConnectedPositionStrategy.prototype._onPositionChange;
    /** @type {?} */
    ConnectedPositionStrategy.prototype._connectedTo;
    /** @type {?} */
    ConnectedPositionStrategy.prototype._originPos;
    /** @type {?} */
    ConnectedPositionStrategy.prototype._overlayPos;
    /** @type {?} */
    ConnectedPositionStrategy.prototype._viewportRuler;
}
/**
 * A simple (x, y) coordinate.
 * @record
 */
function Point() { }
/** @type {?} */
Point.prototype.x;
/** @type {?} */
Point.prototype.y;
/**
 * Expands the simple (x, y) coordinate by adding info about whether the
 * element would fit inside the viewport at that position, as well as
 * how much of the element would be visible.
 * @record
 */
function OverlayPoint() { }
/** @type {?|undefined} */
OverlayPoint.prototype.visibleArea;
/** @type {?|undefined} */
OverlayPoint.prototype.fitsInViewport;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGVkLXBvc2l0aW9uLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9vdmVybGF5L3Bvc2l0aW9uL2Nvbm5lY3RlZC1wb3NpdGlvbi1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0EsT0FBTyxFQUNMLHNCQUFzQixFQUd0Qiw4QkFBOEIsRUFDL0IsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUMsT0FBTyxFQUFhLE1BQU0sTUFBTSxDQUFDOzs7Ozs7Ozs7O0FBc0J6QyxNQUFNOzs7Ozs7O0lBcUNKLFlBQ1ksY0FDQSxZQUNBLGFBQ0E7UUFIQSxpQkFBWSxHQUFaLFlBQVk7UUFDWixlQUFVLEdBQVYsVUFBVTtRQUNWLGdCQUFXLEdBQVgsV0FBVztRQUNYLG1CQUFjLEdBQWQsY0FBYztvQkF4Q1gsS0FBSzs7Ozt3QkFHTyxDQUFDOzs7O3dCQUdELENBQUM7Ozs7MkJBR1EsRUFBRTs7OzttQ0FRVSxFQUFFO2lDQVlKLElBQUksT0FBTyxFQUFrQztRQVl6RixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBQy9DLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7S0FDcEQ7Ozs7O0lBL0JELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUM7S0FDNUI7Ozs7O0lBa0JELElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0tBQzlDOzs7OztJQVlELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0tBQ2pDOzs7OztJQUtELE9BQU8sTUFBTTs7Ozs7Ozs7O0lBVWIsS0FBSyxDQUFDLE9BQW9COztRQUV4QixJQUFJLENBQUMsS0FBSyxHQUFHLE9B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QU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQW9CLEVBQUUsZUFBdUIsRUFBRSxFQUFFO1lBQ3hFLE9BQU8sWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3BELEVBQUUsTUFBTSxDQUFDLENBQUM7O0NBRWQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Bvc2l0aW9uU3RyYXRlZ3l9IGZyb20gJy4vcG9zaXRpb24tc3RyYXRlZ3knO1xuaW1wb3J0IHtFbGVtZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Vmlld3BvcnRSdWxlcn0gZnJvbSAnLi92aWV3cG9ydC1ydWxlcic7XG5pbXBvcnQge1xuICBDb25uZWN0aW9uUG9zaXRpb25QYWlyLFxuICBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb24sXG4gIE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb24sXG4gIENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSwgU2Nyb2xsYWJsZVZpZXdQcm9wZXJ0aWVzXG59IGZyb20gJy4vY29ubmVjdGVkLXBvc2l0aW9uJztcbmltcG9ydCB7U3ViamVjdCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1Njcm9sbGFibGV9IGZyb20gJy4uL3Njcm9sbC9zY3JvbGxhYmxlJztcblxuLyoqXG4gKiBDb250YWluZXIgdG8gaG9sZCB0aGUgYm91bmRpbmcgcG9zaXRpb25zIG9mIGEgcGFydGljdWxhciBlbGVtZW50IHdpdGggcmVzcGVjdCB0byB0aGUgdmlld3BvcnQsXG4gKiB3aGVyZSB0b3AgYW5kIGJvdHRvbSBhcmUgdGhlIHktYXhpcyBjb29yZGluYXRlcyBvZiB0aGUgYm91bmRpbmcgcmVjdGFuZ2xlIGFuZCBsZWZ0IGFuZCByaWdodCBhcmVcbiAqIHRoZSB4LWF4aXMgY29vcmRpbmF0ZXMuXG4gKi9cbnR5cGUgRWxlbWVudEJvdW5kaW5nUG9zaXRpb25zID0ge1xuICB0b3A6IG51bWJlcjtcbiAgcmlnaHQ6IG51bWJlcjtcbiAgYm90dG9tOiBudW1iZXI7XG4gIGxlZnQ6IG51bWJlcjtcbn07XG5cbi8qKlxuICogQSBzdHJhdGVneSBmb3IgcG9zaXRpb25pbmcgb3ZlcmxheXMuIFVzaW5nIHRoaXMgc3RyYXRlZ3ksIGFuIG92ZXJsYXkgaXMgZ2l2ZW4gYW5cbiAqIGltcGxpY2l0IHBvc2l0aW9uIHJlbGF0aXZlIHNvbWUgb3JpZ2luIGVsZW1lbnQuIFRoZSByZWxhdGl2ZSBwb3NpdGlvbiBpcyBkZWZpbmVkIGluIHRlcm1zIG9mXG4gKiBhIHBvaW50IG9uIHRoZSBvcmlnaW4gZWxlbWVudCB0aGF0IGlzIGNvbm5lY3RlZCB0byBhIHBvaW50IG9uIHRoZSBvdmVybGF5IGVsZW1lbnQuIEZvciBleGFtcGxlLFxuICogYSBiYXNpYyBkcm9wZG93biBpcyBjb25uZWN0aW5nIHRoZSBib3R0b20tbGVmdCBjb3JuZXIgb2YgdGhlIG9yaWdpbiB0byB0aGUgdG9wLWxlZnQgY29ybmVyXG4gKiBvZiB0aGUgb3ZlcmxheS5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kgaW1wbGVtZW50cyBQb3NpdGlvblN0cmF0ZWd5IHtcbiAgcHJpdmF0ZSBfZGlyID0gJ2x0cic7XG5cbiAgLyoqIFRoZSBvZmZzZXQgaW4gcGl4ZWxzIGZvciB0aGUgb3ZlcmxheSBjb25uZWN0aW9uIHBvaW50IG9uIHRoZSB4LWF4aXMgKi9cbiAgcHJpdmF0ZSBfb2Zmc2V0WDogbnVtYmVyID0gMDtcblxuICAvKiogVGhlIG9mZnNldCBpbiBwaXhlbHMgZm9yIHRoZSBvdmVybGF5IGNvbm5lY3Rpb24gcG9pbnQgb24gdGhlIHktYXhpcyAqL1xuICBwcml2YXRlIF9vZmZzZXRZOiBudW1iZXIgPSAwO1xuXG4gIC8qKiBUaGUgU2Nyb2xsYWJsZSBjb250YWluZXJzIHVzZWQgdG8gY2hlY2sgc2Nyb2xsYWJsZSB2aWV3IHByb3BlcnRpZXMgb24gcG9zaXRpb24gY2hhbmdlLiAqL1xuICBwcml2YXRlIHNjcm9sbGFibGVzOiBTY3JvbGxhYmxlW10gPSBbXTtcblxuICAvKiogV2hldGhlciB0aGUgd2UncmUgZGVhbGluZyB3aXRoIGFuIFJUTCBjb250ZXh0ICovXG4gIGdldCBfaXNSdGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RpciA9PT0gJ3J0bCc7XG4gIH1cblxuICAvKiogT3JkZXJlZCBsaXN0IG9mIHByZWZlcnJlZCBwb3NpdGlvbnMsIGZyb20gbW9zdCB0byBsZWFzdCBkZXNpcmFibGUuICovXG4gIF9wcmVmZXJyZWRQb3NpdGlvbnM6IENvbm5lY3Rpb25Qb3NpdGlvblBhaXJbXSA9IFtdO1xuXG4gIC8qKiBUaGUgb3JpZ2luIGVsZW1lbnQgYWdhaW5zdCB3aGljaCB0aGUgb3ZlcmxheSB3aWxsIGJlIHBvc2l0aW9uZWQuICovXG4gIHByaXZhdGUgX29yaWdpbjogSFRNTEVsZW1lbnQ7XG5cbiAgLyoqIFRoZSBvdmVybGF5IHBhbmUgZWxlbWVudC4gKi9cbiAgcHJpdmF0ZSBfcGFuZTogSFRNTEVsZW1lbnQ7XG5cbiAgLyoqIFRoZSBsYXN0IHBvc2l0aW9uIHRvIGhhdmUgYmVlbiBjYWxjdWxhdGVkIGFzIHRoZSBiZXN0IGZpdCBwb3NpdGlvbi4gKi9cbiAgcHJpdmF0ZSBfbGFzdENvbm5lY3RlZFBvc2l0aW9uOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyO1xuXG4gIF9vblBvc2l0aW9uQ2hhbmdlOlxuICAgICAgU3ViamVjdDxDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2U+ID0gbmV3IFN1YmplY3Q8Q29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlPigpO1xuXG4gIC8qKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBjb25uZWN0aW9uIHBvaW50IGNoYW5nZXMuICovXG4gIGdldCBvblBvc2l0aW9uQ2hhbmdlKCk6IE9ic2VydmFibGU8Q29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlPiB7XG4gICAgcmV0dXJuIHRoaXMuX29uUG9zaXRpb25DaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2Nvbm5lY3RlZFRvOiBFbGVtZW50UmVmLFxuICAgICAgcHJpdmF0ZSBfb3JpZ2luUG9zOiBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb24sXG4gICAgICBwcml2YXRlIF9vdmVybGF5UG9zOiBPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uLFxuICAgICAgcHJpdmF0ZSBfdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlcikge1xuICAgIHRoaXMuX29yaWdpbiA9IHRoaXMuX2Nvbm5lY3RlZFRvLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy53aXRoRmFsbGJhY2tQb3NpdGlvbihfb3JpZ2luUG9zLCBfb3ZlcmxheVBvcyk7XG4gIH1cblxuICAvKiogT3JkZXJlZCBsaXN0IG9mIHByZWZlcnJlZCBwb3NpdGlvbnMsIGZyb20gbW9zdCB0byBsZWFzdCBkZXNpcmFibGUuICovXG4gIGdldCBwb3NpdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZWZlcnJlZFBvc2l0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBUbyBiZSB1c2VkIHRvIGZvciBhbnkgY2xlYW51cCBhZnRlciB0aGUgZWxlbWVudCBnZXRzIGRlc3Ryb3llZC5cbiAgICovXG4gIGRpc3Bvc2UoKSB7IH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIG92ZXJsYXkgZWxlbWVudCwgdXNpbmcgd2hpY2hldmVyIHByZWZlcnJlZCBwb3NpdGlvbiByZWxhdGl2ZVxuICAgKiB0byB0aGUgb3JpZ2luIGZpdHMgb24tc2NyZWVuLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50IEVsZW1lbnQgdG8gd2hpY2ggdG8gYXBwbHkgdGhlIENTUyBzdHlsZXMuXG4gICAqIEByZXR1cm5zIFJlc29sdmVzIHdoZW4gdGhlIHN0eWxlcyBoYXZlIGJlZW4gYXBwbGllZC5cbiAgICovXG4gIGFwcGx5KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gQ2FjaGUgdGhlIG92ZXJsYXkgcGFuZSBlbGVtZW50IGluIGNhc2UgcmUtY2FsY3VsYXRpbmcgcG9zaXRpb24gaXMgbmVjZXNzYXJ5XG4gICAgdGhpcy5fcGFuZSA9IGVsZW1lbnQ7XG5cbiAgICAvLyBXZSBuZWVkIHRoZSBib3VuZGluZyByZWN0cyBmb3IgdGhlIG9yaWdpbiBhbmQgdGhlIG92ZXJsYXkgdG8gZGV0ZXJtaW5lIGhvdyB0byBwb3NpdGlvblxuICAgIC8vIHRoZSBvdmVybGF5IHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4uXG4gICAgY29uc3Qgb3JpZ2luUmVjdCA9IHRoaXMuX29yaWdpbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBvdmVybGF5UmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAvLyBXZSB1c2UgdGhlIHZpZXdwb3J0IHJlY3QgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgYSBwb3NpdGlvbiB3b3VsZCBnbyBvZmYtc2NyZWVuLlxuICAgIGNvbnN0IHZpZXdwb3J0UmVjdCA9IHRoaXMuX3ZpZXdwb3J0UnVsZXIuZ2V0Vmlld3BvcnRSZWN0KCk7XG5cbiAgICAvLyBGYWxsYmFjayBwb2ludCBpZiBub25lIG9mIHRoZSBmYWxsYmFja3MgZml0IGludG8gdGhlIHZpZXdwb3J0LlxuICAgIGxldCBmYWxsYmFja1BvaW50OiBPdmVybGF5UG9pbnQgPSBudWxsO1xuICAgIGxldCBmYWxsYmFja1Bvc2l0aW9uOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyID0gbnVsbDtcblxuICAgIC8vIFdlIHdhbnQgdG8gcGxhY2UgdGhlIG92ZXJsYXkgaW4gdGhlIGZpcnN0IG9mIHRoZSBwcmVmZXJyZWQgcG9zaXRpb25zIHN1Y2ggdGhhdCB0aGVcbiAgICAvLyBvdmVybGF5IGZpdHMgb24tc2NyZWVuLlxuICAgIGZvciAobGV0IHBvcyBvZiB0aGlzLl9wcmVmZXJyZWRQb3NpdGlvbnMpIHtcbiAgICAgIC8vIEdldCB0aGUgKHgsIHkpIHBvaW50IG9mIGNvbm5lY3Rpb24gb24gdGhlIG9yaWdpbiwgYW5kIHRoZW4gdXNlIHRoYXQgdG8gZ2V0IHRoZVxuICAgICAgLy8gKHRvcCwgbGVmdCkgY29vcmRpbmF0ZSBmb3IgdGhlIG92ZXJsYXkgYXQgYHBvc2AuXG4gICAgICBsZXQgb3JpZ2luUG9pbnQgPSB0aGlzLl9nZXRPcmlnaW5Db25uZWN0aW9uUG9pbnQob3JpZ2luUmVjdCwgcG9zKTtcbiAgICAgIGxldCBvdmVybGF5UG9pbnQgPSB0aGlzLl9nZXRPdmVybGF5UG9pbnQob3JpZ2luUG9pbnQsIG92ZXJsYXlSZWN0LCB2aWV3cG9ydFJlY3QsIHBvcyk7XG5cbiAgICAgIC8vIElmIHRoZSBvdmVybGF5IGluIHRoZSBjYWxjdWxhdGVkIHBvc2l0aW9uIGZpdHMgb24tc2NyZWVuLCBwdXQgaXQgdGhlcmUgYW5kIHdlJ3JlIGRvbmUuXG4gICAgICBpZiAob3ZlcmxheVBvaW50LmZpdHNJblZpZXdwb3J0KSB7XG4gICAgICAgIHRoaXMuX3NldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50LCBvdmVybGF5UmVjdCwgb3ZlcmxheVBvaW50LCBwb3MpO1xuXG4gICAgICAgIC8vIFNhdmUgdGhlIGxhc3QgY29ubmVjdGVkIHBvc2l0aW9uIGluIGNhc2UgdGhlIHBvc2l0aW9uIG5lZWRzIHRvIGJlIHJlLWNhbGN1bGF0ZWQuXG4gICAgICAgIHRoaXMuX2xhc3RDb25uZWN0ZWRQb3NpdGlvbiA9IHBvcztcblxuICAgICAgICAvLyBOb3RpZnkgdGhhdCB0aGUgcG9zaXRpb24gaGFzIGJlZW4gY2hhbmdlZCBhbG9uZyB3aXRoIGl0cyBjaGFuZ2UgcHJvcGVydGllcy5cbiAgICAgICAgY29uc3Qgc2Nyb2xsYWJsZVZpZXdQcm9wZXJ0aWVzID0gdGhpcy5nZXRTY3JvbGxhYmxlVmlld1Byb3BlcnRpZXMoZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uQ2hhbmdlID0gbmV3IENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZShwb3MsIHNjcm9sbGFibGVWaWV3UHJvcGVydGllcyk7XG4gICAgICAgIHRoaXMuX29uUG9zaXRpb25DaGFuZ2UubmV4dChwb3NpdGlvbkNoYW5nZSk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgIH0gZWxzZSBpZiAoIWZhbGxiYWNrUG9pbnQgfHwgZmFsbGJhY2tQb2ludC52aXNpYmxlQXJlYSA8IG92ZXJsYXlQb2ludC52aXNpYmxlQXJlYSkge1xuICAgICAgICBmYWxsYmFja1BvaW50ID0gb3ZlcmxheVBvaW50O1xuICAgICAgICBmYWxsYmFja1Bvc2l0aW9uID0gcG9zO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIG5vbmUgb2YgdGhlIHByZWZlcnJlZCBwb3NpdGlvbnMgd2VyZSBpbiB0aGUgdmlld3BvcnQsIHRha2UgdGhlIG9uZVxuICAgIC8vIHdpdGggdGhlIGxhcmdlc3QgdmlzaWJsZSBhcmVhLlxuICAgIHRoaXMuX3NldEVsZW1lbnRQb3NpdGlvbihlbGVtZW50LCBvdmVybGF5UmVjdCwgZmFsbGJhY2tQb2ludCwgZmFsbGJhY2tQb3NpdGlvbik7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgcmUtYWxpZ25zIHRoZSBvdmVybGF5IGVsZW1lbnQgd2l0aCB0aGUgdHJpZ2dlciBpbiBpdHMgbGFzdCBjYWxjdWxhdGVkIHBvc2l0aW9uLFxuICAgKiBldmVuIGlmIGEgcG9zaXRpb24gaGlnaGVyIGluIHRoZSBcInByZWZlcnJlZCBwb3NpdGlvbnNcIiBsaXN0IHdvdWxkIG5vdyBmaXQuIFRoaXNcbiAgICogYWxsb3dzIG9uZSB0byByZS1hbGlnbiB0aGUgcGFuZWwgd2l0aG91dCBjaGFuZ2luZyB0aGUgb3JpZW50YXRpb24gb2YgdGhlIHBhbmVsLlxuICAgKi9cbiAgcmVjYWxjdWxhdGVMYXN0UG9zaXRpb24oKTogdm9pZCB7XG4gICAgY29uc3Qgb3JpZ2luUmVjdCA9IHRoaXMuX29yaWdpbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBvdmVybGF5UmVjdCA9IHRoaXMuX3BhbmUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgdmlld3BvcnRSZWN0ID0gdGhpcy5fdmlld3BvcnRSdWxlci5nZXRWaWV3cG9ydFJlY3QoKTtcbiAgICBjb25zdCBsYXN0UG9zaXRpb24gPSB0aGlzLl9sYXN0Q29ubmVjdGVkUG9zaXRpb24gfHwgdGhpcy5fcHJlZmVycmVkUG9zaXRpb25zWzBdO1xuXG4gICAgbGV0IG9yaWdpblBvaW50ID0gdGhpcy5fZ2V0T3JpZ2luQ29ubmVjdGlvblBvaW50KG9yaWdpblJlY3QsIGxhc3RQb3NpdGlvbik7XG4gICAgbGV0IG92ZXJsYXlQb2ludCA9IHRoaXMuX2dldE92ZXJsYXlQb2ludChvcmlnaW5Qb2ludCwgb3ZlcmxheVJlY3QsIHZpZXdwb3J0UmVjdCwgbGFzdFBvc2l0aW9uKTtcbiAgICB0aGlzLl9zZXRFbGVtZW50UG9zaXRpb24odGhpcy5fcGFuZSwgb3ZlcmxheVJlY3QsIG92ZXJsYXlQb2ludCwgbGFzdFBvc2l0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsaXN0IG9mIFNjcm9sbGFibGUgY29udGFpbmVycyB0aGF0IGhvc3QgdGhlIG9yaWdpbiBlbGVtZW50IHNvIHRoYXRcbiAgICogb24gcmVwb3NpdGlvbiB3ZSBjYW4gZXZhbHVhdGUgaWYgaXQgb3IgdGhlIG92ZXJsYXkgaGFzIGJlZW4gY2xpcHBlZCBvciBvdXRzaWRlIHZpZXcuIEV2ZXJ5XG4gICAqIFNjcm9sbGFibGUgbXVzdCBiZSBhbiBhbmNlc3RvciBlbGVtZW50IG9mIHRoZSBzdHJhdGVneSdzIG9yaWdpbiBlbGVtZW50LlxuICAgKi9cbiAgd2l0aFNjcm9sbGFibGVDb250YWluZXJzKHNjcm9sbGFibGVzOiBTY3JvbGxhYmxlW10pIHtcbiAgICB0aGlzLnNjcm9sbGFibGVzID0gc2Nyb2xsYWJsZXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG5ldyBwcmVmZXJyZWQgZmFsbGJhY2sgcG9zaXRpb24uXG4gICAqIEBwYXJhbSBvcmlnaW5Qb3NcbiAgICogQHBhcmFtIG92ZXJsYXlQb3NcbiAgICovXG4gIHdpdGhGYWxsYmFja1Bvc2l0aW9uKFxuICAgICAgb3JpZ2luUG9zOiBPcmlnaW5Db25uZWN0aW9uUG9zaXRpb24sXG4gICAgICBvdmVybGF5UG9zOiBPdmVybGF5Q29ubmVjdGlvblBvc2l0aW9uKTogdGhpcyB7XG4gICAgdGhpcy5fcHJlZmVycmVkUG9zaXRpb25zLnB1c2gobmV3IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIob3JpZ2luUG9zLCBvdmVybGF5UG9zKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbGF5b3V0IGRpcmVjdGlvbiBzbyB0aGUgb3ZlcmxheSdzIHBvc2l0aW9uIGNhbiBiZSBhZGp1c3RlZCB0byBtYXRjaC5cbiAgICogQHBhcmFtIGRpciBOZXcgbGF5b3V0IGRpcmVjdGlvbi5cbiAgICovXG4gIHdpdGhEaXJlY3Rpb24oZGlyOiAnbHRyJyB8ICdydGwnKTogdGhpcyB7XG4gICAgdGhpcy5fZGlyID0gZGlyO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgYW4gb2Zmc2V0IGZvciB0aGUgb3ZlcmxheSdzIGNvbm5lY3Rpb24gcG9pbnQgb24gdGhlIHgtYXhpc1xuICAgKiBAcGFyYW0gb2Zmc2V0IE5ldyBvZmZzZXQgaW4gdGhlIFggYXhpcy5cbiAgICovXG4gIHdpdGhPZmZzZXRYKG9mZnNldDogbnVtYmVyKTogdGhpcyB7XG4gICAgdGhpcy5fb2Zmc2V0WCA9IG9mZnNldDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGFuIG9mZnNldCBmb3IgdGhlIG92ZXJsYXkncyBjb25uZWN0aW9uIHBvaW50IG9uIHRoZSB5LWF4aXNcbiAgICogQHBhcmFtICBvZmZzZXQgTmV3IG9mZnNldCBpbiB0aGUgWSBheGlzLlxuICAgKi9cbiAgd2l0aE9mZnNldFkob2Zmc2V0OiBudW1iZXIpOiB0aGlzIHtcbiAgICB0aGlzLl9vZmZzZXRZID0gb2Zmc2V0O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGhvcml6b250YWwgKHgpIFwic3RhcnRcIiBkaW1lbnNpb24gYmFzZWQgb24gd2hldGhlciB0aGUgb3ZlcmxheSBpcyBpbiBhbiBSVEwgY29udGV4dC5cbiAgICogQHBhcmFtIHJlY3RcbiAgICovXG4gIHByaXZhdGUgX2dldFN0YXJ0WChyZWN0OiBDbGllbnRSZWN0KTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5faXNSdGwgPyByZWN0LnJpZ2h0IDogcmVjdC5sZWZ0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGhvcml6b250YWwgKHgpIFwiZW5kXCIgZGltZW5zaW9uIGJhc2VkIG9uIHdoZXRoZXIgdGhlIG92ZXJsYXkgaXMgaW4gYW4gUlRMIGNvbnRleHQuXG4gICAqIEBwYXJhbSByZWN0XG4gICAqL1xuICBwcml2YXRlIF9nZXRFbmRYKHJlY3Q6IENsaWVudFJlY3QpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pc1J0bCA/IHJlY3QubGVmdCA6IHJlY3QucmlnaHQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSAoeCwgeSkgY29vcmRpbmF0ZSBvZiBhIGNvbm5lY3Rpb24gcG9pbnQgb24gdGhlIG9yaWdpbiBiYXNlZCBvbiBhIHJlbGF0aXZlIHBvc2l0aW9uLlxuICAgKiBAcGFyYW0gb3JpZ2luUmVjdFxuICAgKiBAcGFyYW0gcG9zXG4gICAqL1xuICBwcml2YXRlIF9nZXRPcmlnaW5Db25uZWN0aW9uUG9pbnQob3JpZ2luUmVjdDogQ2xpZW50UmVjdCwgcG9zOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyKTogUG9pbnQge1xuICAgIGNvbnN0IG9yaWdpblN0YXJ0WCA9IHRoaXMuX2dldFN0YXJ0WChvcmlnaW5SZWN0KTtcbiAgICBjb25zdCBvcmlnaW5FbmRYID0gdGhpcy5fZ2V0RW5kWChvcmlnaW5SZWN0KTtcblxuICAgIGxldCB4OiBudW1iZXI7XG4gICAgaWYgKHBvcy5vcmlnaW5YID09ICdjZW50ZXInKSB7XG4gICAgICB4ID0gb3JpZ2luU3RhcnRYICsgKG9yaWdpblJlY3Qud2lkdGggLyAyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9IHBvcy5vcmlnaW5YID09ICdzdGFydCcgPyBvcmlnaW5TdGFydFggOiBvcmlnaW5FbmRYO1xuICAgIH1cblxuICAgIGxldCB5OiBudW1iZXI7XG4gICAgaWYgKHBvcy5vcmlnaW5ZID09ICdjZW50ZXInKSB7XG4gICAgICB5ID0gb3JpZ2luUmVjdC50b3AgKyAob3JpZ2luUmVjdC5oZWlnaHQgLyAyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeSA9IHBvcy5vcmlnaW5ZID09ICd0b3AnID8gb3JpZ2luUmVjdC50b3AgOiBvcmlnaW5SZWN0LmJvdHRvbTtcbiAgICB9XG5cbiAgICByZXR1cm4ge3gsIHl9O1xuICB9XG5cblxuICAvKipcbiAgICogR2V0cyB0aGUgKHgsIHkpIGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0IGNvcm5lciBvZiB0aGUgb3ZlcmxheSBnaXZlbiBhIGdpdmVuIHBvc2l0aW9uIGFuZFxuICAgKiBvcmlnaW4gcG9pbnQgdG8gd2hpY2ggdGhlIG92ZXJsYXkgc2hvdWxkIGJlIGNvbm5lY3RlZCwgYXMgd2VsbCBhcyBob3cgbXVjaCBvZiB0aGUgZWxlbWVudFxuICAgKiB3b3VsZCBiZSBpbnNpZGUgdGhlIHZpZXdwb3J0IGF0IHRoYXQgcG9zaXRpb24uXG4gICAqL1xuICBwcml2YXRlIF9nZXRPdmVybGF5UG9pbnQoXG4gICAgICBvcmlnaW5Qb2ludDogUG9pbnQsXG4gICAgICBvdmVybGF5UmVjdDogQ2xpZW50UmVjdCxcbiAgICAgIHZpZXdwb3J0UmVjdDogQ2xpZW50UmVjdCxcbiAgICAgIHBvczogQ29ubmVjdGlvblBvc2l0aW9uUGFpcik6IE92ZXJsYXlQb2ludCB7XG4gICAgLy8gQ2FsY3VsYXRlIHRoZSAob3ZlcmxheVN0YXJ0WCwgb3ZlcmxheVN0YXJ0WSksIHRoZSBzdGFydCBvZiB0aGUgcG90ZW50aWFsIG92ZXJsYXkgcG9zaXRpb25cbiAgICAvLyByZWxhdGl2ZSB0byB0aGUgb3JpZ2luIHBvaW50LlxuICAgIGxldCBvdmVybGF5U3RhcnRYOiBudW1iZXI7XG4gICAgaWYgKHBvcy5vdmVybGF5WCA9PSAnY2VudGVyJykge1xuICAgICAgb3ZlcmxheVN0YXJ0WCA9IC1vdmVybGF5UmVjdC53aWR0aCAvIDI7XG4gICAgfSBlbHNlIGlmIChwb3Mub3ZlcmxheVggPT09ICdzdGFydCcpIHtcbiAgICAgIG92ZXJsYXlTdGFydFggPSB0aGlzLl9pc1J0bCA/IC1vdmVybGF5UmVjdC53aWR0aCA6IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIG92ZXJsYXlTdGFydFggPSB0aGlzLl9pc1J0bCA/IDAgOiAtb3ZlcmxheVJlY3Qud2lkdGg7XG4gICAgfVxuXG4gICAgbGV0IG92ZXJsYXlTdGFydFk6IG51bWJlcjtcbiAgICBpZiAocG9zLm92ZXJsYXlZID09ICdjZW50ZXInKSB7XG4gICAgICBvdmVybGF5U3RhcnRZID0gLW92ZXJsYXlSZWN0LmhlaWdodCAvIDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIG92ZXJsYXlTdGFydFkgPSBwb3Mub3ZlcmxheVkgPT0gJ3RvcCcgPyAwIDogLW92ZXJsYXlSZWN0LmhlaWdodDtcbiAgICB9XG5cbiAgICAvLyBUaGUgKHgsIHkpIGNvb3JkaW5hdGVzIG9mIHRoZSBvdmVybGF5LlxuICAgIGxldCB4ID0gb3JpZ2luUG9pbnQueCArIG92ZXJsYXlTdGFydFggKyB0aGlzLl9vZmZzZXRYO1xuICAgIGxldCB5ID0gb3JpZ2luUG9pbnQueSArIG92ZXJsYXlTdGFydFkgKyB0aGlzLl9vZmZzZXRZO1xuXG4gICAgLy8gSG93IG11Y2ggdGhlIG92ZXJsYXkgd291bGQgb3ZlcmZsb3cgYXQgdGhpcyBwb3NpdGlvbiwgb24gZWFjaCBzaWRlLlxuICAgIGxldCBsZWZ0T3ZlcmZsb3cgPSAwIC0geDtcbiAgICBsZXQgcmlnaHRPdmVyZmxvdyA9ICh4ICsgb3ZlcmxheVJlY3Qud2lkdGgpIC0gdmlld3BvcnRSZWN0LndpZHRoO1xuICAgIGxldCB0b3BPdmVyZmxvdyA9IDAgLSB5O1xuICAgIGxldCBib3R0b21PdmVyZmxvdyA9ICh5ICsgb3ZlcmxheVJlY3QuaGVpZ2h0KSAtIHZpZXdwb3J0UmVjdC5oZWlnaHQ7XG5cbiAgICAvLyBWaXNpYmxlIHBhcnRzIG9mIHRoZSBlbGVtZW50IG9uIGVhY2ggYXhpcy5cbiAgICBsZXQgdmlzaWJsZVdpZHRoID0gdGhpcy5fc3VidHJhY3RPdmVyZmxvd3Mob3ZlcmxheVJlY3Qud2lkdGgsIGxlZnRPdmVyZmxvdywgcmlnaHRPdmVyZmxvdyk7XG4gICAgbGV0IHZpc2libGVIZWlnaHQgPSB0aGlzLl9zdWJ0cmFjdE92ZXJmbG93cyhvdmVybGF5UmVjdC5oZWlnaHQsIHRvcE92ZXJmbG93LCBib3R0b21PdmVyZmxvdyk7XG5cbiAgICAvLyBUaGUgYXJlYSBvZiB0aGUgZWxlbWVudCB0aGF0J3Mgd2l0aGluIHRoZSB2aWV3cG9ydC5cbiAgICBsZXQgdmlzaWJsZUFyZWEgPSB2aXNpYmxlV2lkdGggKiB2aXNpYmxlSGVpZ2h0O1xuICAgIGxldCBmaXRzSW5WaWV3cG9ydCA9IChvdmVybGF5UmVjdC53aWR0aCAqIG92ZXJsYXlSZWN0LmhlaWdodCkgPT09IHZpc2libGVBcmVhO1xuXG4gICAgcmV0dXJuIHt4LCB5LCBmaXRzSW5WaWV3cG9ydCwgdmlzaWJsZUFyZWF9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHZpZXcgcHJvcGVydGllcyBvZiB0aGUgdHJpZ2dlciBhbmQgb3ZlcmxheSwgaW5jbHVkaW5nIHdoZXRoZXIgdGhleSBhcmUgY2xpcHBlZFxuICAgKiBvciBjb21wbGV0ZWx5IG91dHNpZGUgdGhlIHZpZXcgb2YgYW55IG9mIHRoZSBzdHJhdGVneSdzIHNjcm9sbGFibGVzLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRTY3JvbGxhYmxlVmlld1Byb3BlcnRpZXMob3ZlcmxheTogSFRNTEVsZW1lbnQpOiBTY3JvbGxhYmxlVmlld1Byb3BlcnRpZXMge1xuICAgIGNvbnN0IG9yaWdpbkJvdW5kcyA9IHRoaXMuX2dldEVsZW1lbnRCb3VuZHModGhpcy5fb3JpZ2luKTtcbiAgICBjb25zdCBvdmVybGF5Qm91bmRzID0gdGhpcy5fZ2V0RWxlbWVudEJvdW5kcyhvdmVybGF5KTtcbiAgICBjb25zdCBzY3JvbGxDb250YWluZXJCb3VuZHMgPSB0aGlzLnNjcm9sbGFibGVzLm1hcCgoc2Nyb2xsYWJsZTogU2Nyb2xsYWJsZSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2dldEVsZW1lbnRCb3VuZHMoc2Nyb2xsYWJsZS5nZXRFbGVtZW50UmVmKCkubmF0aXZlRWxlbWVudCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaXNPcmlnaW5DbGlwcGVkOiB0aGlzLmlzRWxlbWVudENsaXBwZWQob3JpZ2luQm91bmRzLCBzY3JvbGxDb250YWluZXJCb3VuZHMpLFxuICAgICAgaXNPcmlnaW5PdXRzaWRlVmlldzogdGhpcy5pc0VsZW1lbnRPdXRzaWRlVmlldyhvcmlnaW5Cb3VuZHMsIHNjcm9sbENvbnRhaW5lckJvdW5kcyksXG4gICAgICBpc092ZXJsYXlDbGlwcGVkOiB0aGlzLmlzRWxlbWVudENsaXBwZWQob3ZlcmxheUJvdW5kcywgc2Nyb2xsQ29udGFpbmVyQm91bmRzKSxcbiAgICAgIGlzT3ZlcmxheU91dHNpZGVWaWV3OiB0aGlzLmlzRWxlbWVudE91dHNpZGVWaWV3KG92ZXJsYXlCb3VuZHMsIHNjcm9sbENvbnRhaW5lckJvdW5kcyksXG4gICAgfTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBlbGVtZW50IGlzIGNvbXBsZXRlbHkgb3V0IG9mIHRoZSB2aWV3IG9mIGFueSBvZiB0aGUgY29udGFpbmVycy4gKi9cbiAgcHJpdmF0ZSBpc0VsZW1lbnRPdXRzaWRlVmlldyhcbiAgICAgIGVsZW1lbnRCb3VuZHM6IEVsZW1lbnRCb3VuZGluZ1Bvc2l0aW9ucyxcbiAgICAgIGNvbnRhaW5lcnNCb3VuZHM6IEVsZW1lbnRCb3VuZGluZ1Bvc2l0aW9uc1tdKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNvbnRhaW5lcnNCb3VuZHMuc29tZSgoY29udGFpbmVyQm91bmRzOiBFbGVtZW50Qm91bmRpbmdQb3NpdGlvbnMpID0+IHtcbiAgICAgIGNvbnN0IG91dHNpZGVBYm92ZSA9IGVsZW1lbnRCb3VuZHMuYm90dG9tIDwgY29udGFpbmVyQm91bmRzLnRvcDtcbiAgICAgIGNvbnN0IG91dHNpZGVCZWxvdyA9IGVsZW1lbnRCb3VuZHMudG9wID4gY29udGFpbmVyQm91bmRzLmJvdHRvbTtcbiAgICAgIGNvbnN0IG91dHNpZGVMZWZ0ID0gZWxlbWVudEJvdW5kcy5yaWdodCA8IGNvbnRhaW5lckJvdW5kcy5sZWZ0O1xuICAgICAgY29uc3Qgb3V0c2lkZVJpZ2h0ID0gZWxlbWVudEJvdW5kcy5sZWZ0ID4gY29udGFpbmVyQm91bmRzLnJpZ2h0O1xuXG4gICAgICByZXR1cm4gb3V0c2lkZUFib3ZlIHx8IG91dHNpZGVCZWxvdyB8fCBvdXRzaWRlTGVmdCB8fCBvdXRzaWRlUmlnaHQ7XG4gICAgfSk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgZWxlbWVudCBpcyBjbGlwcGVkIGJ5IGFueSBvZiB0aGUgY29udGFpbmVycy4gKi9cbiAgcHJpdmF0ZSBpc0VsZW1lbnRDbGlwcGVkKFxuICAgICAgZWxlbWVudEJvdW5kczogRWxlbWVudEJvdW5kaW5nUG9zaXRpb25zLFxuICAgICAgY29udGFpbmVyc0JvdW5kczogRWxlbWVudEJvdW5kaW5nUG9zaXRpb25zW10pOiBib29sZWFuIHtcbiAgICByZXR1cm4gY29udGFpbmVyc0JvdW5kcy5zb21lKChjb250YWluZXJCb3VuZHM6IEVsZW1lbnRCb3VuZGluZ1Bvc2l0aW9ucykgPT4ge1xuICAgICAgY29uc3QgY2xpcHBlZEFib3ZlID0gZWxlbWVudEJvdW5kcy50b3AgPCBjb250YWluZXJCb3VuZHMudG9wO1xuICAgICAgY29uc3QgY2xpcHBlZEJlbG93ID0gZWxlbWVudEJvdW5kcy5ib3R0b20gPiBjb250YWluZXJCb3VuZHMuYm90dG9tO1xuICAgICAgY29uc3QgY2xpcHBlZExlZnQgPSBlbGVtZW50Qm91bmRzLmxlZnQgPCBjb250YWluZXJCb3VuZHMubGVmdDtcbiAgICAgIGNvbnN0IGNsaXBwZWRSaWdodCA9IGVsZW1lbnRCb3VuZHMucmlnaHQgPiBjb250YWluZXJCb3VuZHMucmlnaHQ7XG5cbiAgICAgIHJldHVybiBjbGlwcGVkQWJvdmUgfHwgY2xpcHBlZEJlbG93IHx8IGNsaXBwZWRMZWZ0IHx8IGNsaXBwZWRSaWdodDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBQaHlzaWNhbGx5IHBvc2l0aW9ucyB0aGUgb3ZlcmxheSBlbGVtZW50IHRvIHRoZSBnaXZlbiBjb29yZGluYXRlLiAqL1xuICBwcml2YXRlIF9zZXRFbGVtZW50UG9zaXRpb24oXG4gICAgICBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgIG92ZXJsYXlSZWN0OiBDbGllbnRSZWN0LFxuICAgICAgb3ZlcmxheVBvaW50OiBQb2ludCxcbiAgICAgIHBvczogQ29ubmVjdGlvblBvc2l0aW9uUGFpcikge1xuXG4gICAgLy8gV2Ugd2FudCB0byBzZXQgZWl0aGVyIGB0b3BgIG9yIGBib3R0b21gIGJhc2VkIG9uIHdoZXRoZXIgdGhlIG92ZXJsYXkgd2FudHMgdG8gYXBwZWFyIGFib3ZlXG4gICAgLy8gb3IgYmVsb3cgdGhlIG9yaWdpbiBhbmQgdGhlIGRpcmVjdGlvbiBpbiB3aGljaCB0aGUgZWxlbWVudCB3aWxsIGV4cGFuZC5cbiAgICBsZXQgdmVydGljYWxTdHlsZVByb3BlcnR5OiBhbnkgPSBwb3Mub3ZlcmxheVkgPT09ICdib3R0b20nID8gJ2JvdHRvbScgOiAndG9wJztcblxuICAgIC8vIFdoZW4gdXNpbmcgYGJvdHRvbWAsIHdlIGFkanVzdCB0aGUgeSBwb3NpdGlvbiBzdWNoIHRoYXQgaXQgaXMgdGhlIGRpc3RhbmNlXG4gICAgLy8gZnJvbSB0aGUgYm90dG9tIG9mIHRoZSB2aWV3cG9ydCByYXRoZXIgdGhhbiB0aGUgdG9wLlxuICAgIGxldCB5ID0gdmVydGljYWxTdHlsZVByb3BlcnR5ID09PSAndG9wJyA/XG4gICAgICAgIG92ZXJsYXlQb2ludC55IDpcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtIChvdmVybGF5UG9pbnQueSArIG92ZXJsYXlSZWN0LmhlaWdodCk7XG5cbiAgICAvLyBXZSB3YW50IHRvIHNldCBlaXRoZXIgYGxlZnRgIG9yIGByaWdodGAgYmFzZWQgb24gd2hldGhlciB0aGUgb3ZlcmxheSB3YW50cyB0byBhcHBlYXIgXCJiZWZvcmVcIlxuICAgIC8vIG9yIFwiYWZ0ZXJcIiB0aGUgb3JpZ2luLCB3aGljaCBkZXRlcm1pbmVzIHRoZSBkaXJlY3Rpb24gaW4gd2hpY2ggdGhlIGVsZW1lbnQgd2lsbCBleHBhbmQuXG4gICAgLy8gRm9yIHRoZSBob3Jpem9udGFsIGF4aXMsIHRoZSBtZWFuaW5nIG9mIFwiYmVmb3JlXCIgYW5kIFwiYWZ0ZXJcIiBjaGFuZ2UgYmFzZWQgb24gd2hldGhlciB0aGVcbiAgICAvLyBwYWdlIGlzIGluIFJUTCBvciBMVFIuXG4gICAgbGV0IGhvcml6b250YWxTdHlsZVByb3BlcnR5OiBhbnk7XG4gICAgaWYgKHRoaXMuX2RpciA9PT0gJ3J0bCcpIHtcbiAgICAgIGhvcml6b250YWxTdHlsZVByb3BlcnR5ID0gcG9zLm92ZXJsYXlYID09PSAnZW5kJyA/ICdsZWZ0JyA6ICdyaWdodCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhvcml6b250YWxTdHlsZVByb3BlcnR5ID0gcG9zLm92ZXJsYXlYID09PSAnZW5kJyA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgfVxuXG4gICAgLy8gV2hlbiB3ZSdyZSBzZXR0aW5nIGByaWdodGAsIHdlIGFkanVzdCB0aGUgeCBwb3NpdGlvbiBzdWNoIHRoYXQgaXQgaXMgdGhlIGRpc3RhbmNlXG4gICAgLy8gZnJvbSB0aGUgcmlnaHQgZWRnZSBvZiB0aGUgdmlld3BvcnQgcmF0aGVyIHRoYW4gdGhlIGxlZnQgZWRnZS5cbiAgICBsZXQgeCA9IGhvcml6b250YWxTdHlsZVByb3BlcnR5ID09PSAnbGVmdCcgP1xuICAgICAgb3ZlcmxheVBvaW50LnggOlxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIC0gKG92ZXJsYXlQb2ludC54ICsgb3ZlcmxheVJlY3Qud2lkdGgpO1xuXG5cbiAgICAvLyBSZXNldCBhbnkgZXhpc3Rpbmcgc3R5bGVzLiBUaGlzIGlzIG5lY2Vzc2FyeSBpbiBjYXNlIHRoZSBwcmVmZXJyZWQgcG9zaXRpb24gaGFzXG4gICAgLy8gY2hhbmdlZCBzaW5jZSB0aGUgbGFzdCBgYXBwbHlgLlxuICAgIFsndG9wJywgJ2JvdHRvbScsICdsZWZ0JywgJ3JpZ2h0J10uZm9yRWFjaCgocDogYW55KSA9PiBlbGVtZW50LnN0eWxlW3BdID0gbnVsbCk7XG5cbiAgICBlbGVtZW50LnN0eWxlW3ZlcnRpY2FsU3R5bGVQcm9wZXJ0eV0gPSBgJHt5fXB4YDtcbiAgICBlbGVtZW50LnN0eWxlW2hvcml6b250YWxTdHlsZVByb3BlcnR5XSA9IGAke3h9cHhgO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdGhlIGJvdW5kaW5nIHBvc2l0aW9ucyBvZiB0aGUgcHJvdmlkZWQgZWxlbWVudCB3aXRoIHJlc3BlY3QgdG8gdGhlIHZpZXdwb3J0LiAqL1xuICBwcml2YXRlIF9nZXRFbGVtZW50Qm91bmRzKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogRWxlbWVudEJvdW5kaW5nUG9zaXRpb25zIHtcbiAgICBjb25zdCBib3VuZGluZ0NsaWVudFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiB7XG4gICAgICB0b3A6IGJvdW5kaW5nQ2xpZW50UmVjdC50b3AsXG4gICAgICByaWdodDogYm91bmRpbmdDbGllbnRSZWN0LmxlZnQgKyBib3VuZGluZ0NsaWVudFJlY3Qud2lkdGgsXG4gICAgICBib3R0b206IGJvdW5kaW5nQ2xpZW50UmVjdC50b3AgKyBib3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0LFxuICAgICAgbGVmdDogYm91bmRpbmdDbGllbnRSZWN0LmxlZnRcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnRyYWN0cyB0aGUgYW1vdW50IHRoYXQgYW4gZWxlbWVudCBpcyBvdmVyZmxvd2luZyBvbiBhbiBheGlzIGZyb20gaXQncyBsZW5ndGguXG4gICAqL1xuICBwcml2YXRlIF9zdWJ0cmFjdE92ZXJmbG93cyhsZW5ndGg6IG51bWJlciwgLi4ub3ZlcmZsb3dzOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgcmV0dXJuIG92ZXJmbG93cy5yZWR1Y2UoKGN1cnJlbnRWYWx1ZTogbnVtYmVyLCBjdXJyZW50T3ZlcmZsb3c6IG51bWJlcikgPT4ge1xuICAgICAgcmV0dXJuIGN1cnJlbnRWYWx1ZSAtIE1hdGgubWF4KGN1cnJlbnRPdmVyZmxvdywgMCk7XG4gICAgfSwgbGVuZ3RoKTtcbiAgfVxufVxuXG4vKiogQSBzaW1wbGUgKHgsIHkpIGNvb3JkaW5hdGUuICovXG5pbnRlcmZhY2UgUG9pbnQge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBFeHBhbmRzIHRoZSBzaW1wbGUgKHgsIHkpIGNvb3JkaW5hdGUgYnkgYWRkaW5nIGluZm8gYWJvdXQgd2hldGhlciB0aGVcbiAqIGVsZW1lbnQgd291bGQgZml0IGluc2lkZSB0aGUgdmlld3BvcnQgYXQgdGhhdCBwb3NpdGlvbiwgYXMgd2VsbCBhc1xuICogaG93IG11Y2ggb2YgdGhlIGVsZW1lbnQgd291bGQgYmUgdmlzaWJsZS5cbiAqL1xuaW50ZXJmYWNlIE92ZXJsYXlQb2ludCBleHRlbmRzIFBvaW50IHtcbiAgdmlzaWJsZUFyZWE/OiBudW1iZXI7XG4gIGZpdHNJblZpZXdwb3J0PzogYm9vbGVhbjtcbn1cbiJdfQ==