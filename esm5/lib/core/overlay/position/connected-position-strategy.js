/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var /**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
ConnectedPositionStrategy = /** @class */ (function () {
    function ConnectedPositionStrategy(_connectedTo, _originPos, _overlayPos, _viewportRuler) {
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
    Object.defineProperty(ConnectedPositionStrategy.prototype, "_isRtl", {
        /** Whether the we're dealing with an RTL context */
        get: /**
         * Whether the we're dealing with an RTL context
         * @return {?}
         */
        function () {
            return this._dir === 'rtl';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedPositionStrategy.prototype, "onPositionChange", {
        /** Emits an event when the connection point changes. */
        get: /**
         * Emits an event when the connection point changes.
         * @return {?}
         */
        function () {
            return this._onPositionChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedPositionStrategy.prototype, "positions", {
        /** Ordered list of preferred positions, from most to least desirable. */
        get: /**
         * Ordered list of preferred positions, from most to least desirable.
         * @return {?}
         */
        function () {
            return this._preferredPositions;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * To be used to for any cleanup after the element gets destroyed.
     */
    /**
     * To be used to for any cleanup after the element gets destroyed.
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.dispose = /**
     * To be used to for any cleanup after the element gets destroyed.
     * @return {?}
     */
    function () { };
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin fits on-screen.
     * @docs-private
     *
     * @param element Element to which to apply the CSS styles.
     * @returns Resolves when the styles have been applied.
     */
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin fits on-screen.
     * \@docs-private
     *
     * @param {?} element Element to which to apply the CSS styles.
     * @return {?} Resolves when the styles have been applied.
     */
    ConnectedPositionStrategy.prototype.apply = /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin fits on-screen.
     * \@docs-private
     *
     * @param {?} element Element to which to apply the CSS styles.
     * @return {?} Resolves when the styles have been applied.
     */
    function (element) {
        var e_1, _a;
        // Cache the overlay pane element in case re-calculating position is necessary
        this._pane = element;
        /** @type {?} */
        var originRect = this._origin.getBoundingClientRect();
        /** @type {?} */
        var overlayRect = element.getBoundingClientRect();
        /** @type {?} */
        var viewportRect = this._viewportRuler.getViewportRect();
        /** @type {?} */
        var fallbackPoint = null;
        /** @type {?} */
        var fallbackPosition = null;
        try {
            // We want to place the overlay in the first of the preferred positions such that the
            // overlay fits on-screen.
            for (var _b = tslib_1.__values(this._preferredPositions), _c = _b.next(); !_c.done; _c = _b.next()) {
                var pos = _c.value;
                /** @type {?} */
                var originPoint = this._getOriginConnectionPoint(originRect, pos);
                /** @type {?} */
                var overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportRect, pos);
                // If the overlay in the calculated position fits on-screen, put it there and we're done.
                if (overlayPoint.fitsInViewport) {
                    this._setElementPosition(element, overlayRect, overlayPoint, pos);
                    // Save the last connected position in case the position needs to be re-calculated.
                    this._lastConnectedPosition = pos;
                    /** @type {?} */
                    var scrollableViewProperties = this.getScrollableViewProperties(element);
                    /** @type {?} */
                    var positionChange = new ConnectedOverlayPositionChange(pos, scrollableViewProperties);
                    this._onPositionChange.next(positionChange);
                    return Promise.resolve(null);
                }
                else if (!fallbackPoint || fallbackPoint.visibleArea < overlayPoint.visibleArea) {
                    fallbackPoint = overlayPoint;
                    fallbackPosition = pos;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // If none of the preferred positions were in the viewport, take the one
        // with the largest visible area.
        this._setElementPosition(element, overlayRect, fallbackPoint, fallbackPosition);
        return Promise.resolve(null);
    };
    /**
     * This re-aligns the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     */
    /**
     * This re-aligns the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.recalculateLastPosition = /**
     * This re-aligns the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var originRect = this._origin.getBoundingClientRect();
        /** @type {?} */
        var overlayRect = this._pane.getBoundingClientRect();
        /** @type {?} */
        var viewportRect = this._viewportRuler.getViewportRect();
        /** @type {?} */
        var lastPosition = this._lastConnectedPosition || this._preferredPositions[0];
        /** @type {?} */
        var originPoint = this._getOriginConnectionPoint(originRect, lastPosition);
        /** @type {?} */
        var overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportRect, lastPosition);
        this._setElementPosition(this._pane, overlayRect, overlayPoint, lastPosition);
    };
    /**
     * Sets the list of Scrollable containers that host the origin element so that
     * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
     * Scrollable must be an ancestor element of the strategy's origin element.
     */
    /**
     * Sets the list of Scrollable containers that host the origin element so that
     * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
     * Scrollable must be an ancestor element of the strategy's origin element.
     * @param {?} scrollables
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.withScrollableContainers = /**
     * Sets the list of Scrollable containers that host the origin element so that
     * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
     * Scrollable must be an ancestor element of the strategy's origin element.
     * @param {?} scrollables
     * @return {?}
     */
    function (scrollables) {
        this.scrollables = scrollables;
    };
    /**
     * Adds a new preferred fallback position.
     * @param originPos
     * @param overlayPos
     */
    /**
     * Adds a new preferred fallback position.
     * @param {?} originPos
     * @param {?} overlayPos
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.withFallbackPosition = /**
     * Adds a new preferred fallback position.
     * @param {?} originPos
     * @param {?} overlayPos
     * @return {?}
     */
    function (originPos, overlayPos) {
        this._preferredPositions.push(new ConnectionPositionPair(originPos, overlayPos));
        return this;
    };
    /**
     * Sets the layout direction so the overlay's position can be adjusted to match.
     * @param dir New layout direction.
     */
    /**
     * Sets the layout direction so the overlay's position can be adjusted to match.
     * @param {?} dir New layout direction.
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.withDirection = /**
     * Sets the layout direction so the overlay's position can be adjusted to match.
     * @param {?} dir New layout direction.
     * @return {?}
     */
    function (dir) {
        this._dir = dir;
        return this;
    };
    /**
     * Sets an offset for the overlay's connection point on the x-axis
     * @param offset New offset in the X axis.
     */
    /**
     * Sets an offset for the overlay's connection point on the x-axis
     * @param {?} offset New offset in the X axis.
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.withOffsetX = /**
     * Sets an offset for the overlay's connection point on the x-axis
     * @param {?} offset New offset in the X axis.
     * @return {?}
     */
    function (offset) {
        this._offsetX = offset;
        return this;
    };
    /**
     * Sets an offset for the overlay's connection point on the y-axis
     * @param  offset New offset in the Y axis.
     */
    /**
     * Sets an offset for the overlay's connection point on the y-axis
     * @param {?} offset New offset in the Y axis.
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.withOffsetY = /**
     * Sets an offset for the overlay's connection point on the y-axis
     * @param {?} offset New offset in the Y axis.
     * @return {?}
     */
    function (offset) {
        this._offsetY = offset;
        return this;
    };
    /**
     * Gets the horizontal (x) "start" dimension based on whether the overlay is in an RTL context.
     * @param {?} rect
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._getStartX = /**
     * Gets the horizontal (x) "start" dimension based on whether the overlay is in an RTL context.
     * @param {?} rect
     * @return {?}
     */
    function (rect) {
        return this._isRtl ? rect.right : rect.left;
    };
    /**
     * Gets the horizontal (x) "end" dimension based on whether the overlay is in an RTL context.
     * @param {?} rect
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._getEndX = /**
     * Gets the horizontal (x) "end" dimension based on whether the overlay is in an RTL context.
     * @param {?} rect
     * @return {?}
     */
    function (rect) {
        return this._isRtl ? rect.left : rect.right;
    };
    /**
     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
     * @param {?} originRect
     * @param {?} pos
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._getOriginConnectionPoint = /**
     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
     * @param {?} originRect
     * @param {?} pos
     * @return {?}
     */
    function (originRect, pos) {
        /** @type {?} */
        var originStartX = this._getStartX(originRect);
        /** @type {?} */
        var originEndX = this._getEndX(originRect);
        /** @type {?} */
        var x;
        if (pos.originX == 'center') {
            x = originStartX + (originRect.width / 2);
        }
        else {
            x = pos.originX == 'start' ? originStartX : originEndX;
        }
        /** @type {?} */
        var y;
        if (pos.originY == 'center') {
            y = originRect.top + (originRect.height / 2);
        }
        else {
            y = pos.originY == 'top' ? originRect.top : originRect.bottom;
        }
        return { x: x, y: y };
    };
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
    ConnectedPositionStrategy.prototype._getOverlayPoint = /**
     * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
     * origin point to which the overlay should be connected, as well as how much of the element
     * would be inside the viewport at that position.
     * @param {?} originPoint
     * @param {?} overlayRect
     * @param {?} viewportRect
     * @param {?} pos
     * @return {?}
     */
    function (originPoint, overlayRect, viewportRect, pos) {
        /** @type {?} */
        var overlayStartX;
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
        var overlayStartY;
        if (pos.overlayY == 'center') {
            overlayStartY = -overlayRect.height / 2;
        }
        else {
            overlayStartY = pos.overlayY == 'top' ? 0 : -overlayRect.height;
        }
        /** @type {?} */
        var x = originPoint.x + overlayStartX + this._offsetX;
        /** @type {?} */
        var y = originPoint.y + overlayStartY + this._offsetY;
        /** @type {?} */
        var leftOverflow = 0 - x;
        /** @type {?} */
        var rightOverflow = (x + overlayRect.width) - viewportRect.width;
        /** @type {?} */
        var topOverflow = 0 - y;
        /** @type {?} */
        var bottomOverflow = (y + overlayRect.height) - viewportRect.height;
        /** @type {?} */
        var visibleWidth = this._subtractOverflows(overlayRect.width, leftOverflow, rightOverflow);
        /** @type {?} */
        var visibleHeight = this._subtractOverflows(overlayRect.height, topOverflow, bottomOverflow);
        /** @type {?} */
        var visibleArea = visibleWidth * visibleHeight;
        /** @type {?} */
        var fitsInViewport = (overlayRect.width * overlayRect.height) === visibleArea;
        return { x: x, y: y, fitsInViewport: fitsInViewport, visibleArea: visibleArea };
    };
    /**
     * Gets the view properties of the trigger and overlay, including whether they are clipped
     * or completely outside the view of any of the strategy's scrollables.
     * @param {?} overlay
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.getScrollableViewProperties = /**
     * Gets the view properties of the trigger and overlay, including whether they are clipped
     * or completely outside the view of any of the strategy's scrollables.
     * @param {?} overlay
     * @return {?}
     */
    function (overlay) {
        var _this = this;
        /** @type {?} */
        var originBounds = this._getElementBounds(this._origin);
        /** @type {?} */
        var overlayBounds = this._getElementBounds(overlay);
        /** @type {?} */
        var scrollContainerBounds = this.scrollables.map(function (scrollable) {
            return _this._getElementBounds(scrollable.getElementRef().nativeElement);
        });
        return {
            isOriginClipped: this.isElementClipped(originBounds, scrollContainerBounds),
            isOriginOutsideView: this.isElementOutsideView(originBounds, scrollContainerBounds),
            isOverlayClipped: this.isElementClipped(overlayBounds, scrollContainerBounds),
            isOverlayOutsideView: this.isElementOutsideView(overlayBounds, scrollContainerBounds),
        };
    };
    /**
     * Whether the element is completely out of the view of any of the containers.
     * @param {?} elementBounds
     * @param {?} containersBounds
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.isElementOutsideView = /**
     * Whether the element is completely out of the view of any of the containers.
     * @param {?} elementBounds
     * @param {?} containersBounds
     * @return {?}
     */
    function (elementBounds, containersBounds) {
        return containersBounds.some(function (containerBounds) {
            /** @type {?} */
            var outsideAbove = elementBounds.bottom < containerBounds.top;
            /** @type {?} */
            var outsideBelow = elementBounds.top > containerBounds.bottom;
            /** @type {?} */
            var outsideLeft = elementBounds.right < containerBounds.left;
            /** @type {?} */
            var outsideRight = elementBounds.left > containerBounds.right;
            return outsideAbove || outsideBelow || outsideLeft || outsideRight;
        });
    };
    /**
     * Whether the element is clipped by any of the containers.
     * @param {?} elementBounds
     * @param {?} containersBounds
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.isElementClipped = /**
     * Whether the element is clipped by any of the containers.
     * @param {?} elementBounds
     * @param {?} containersBounds
     * @return {?}
     */
    function (elementBounds, containersBounds) {
        return containersBounds.some(function (containerBounds) {
            /** @type {?} */
            var clippedAbove = elementBounds.top < containerBounds.top;
            /** @type {?} */
            var clippedBelow = elementBounds.bottom > containerBounds.bottom;
            /** @type {?} */
            var clippedLeft = elementBounds.left < containerBounds.left;
            /** @type {?} */
            var clippedRight = elementBounds.right > containerBounds.right;
            return clippedAbove || clippedBelow || clippedLeft || clippedRight;
        });
    };
    /**
     * Physically positions the overlay element to the given coordinate.
     * @param {?} element
     * @param {?} overlayRect
     * @param {?} overlayPoint
     * @param {?} pos
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._setElementPosition = /**
     * Physically positions the overlay element to the given coordinate.
     * @param {?} element
     * @param {?} overlayRect
     * @param {?} overlayPoint
     * @param {?} pos
     * @return {?}
     */
    function (element, overlayRect, overlayPoint, pos) {
        /** @type {?} */
        var verticalStyleProperty = pos.overlayY === 'bottom' ? 'bottom' : 'top';
        /** @type {?} */
        var y = verticalStyleProperty === 'top' ?
            overlayPoint.y :
            document.documentElement.clientHeight - (overlayPoint.y + overlayRect.height);
        /** @type {?} */
        var horizontalStyleProperty;
        if (this._dir === 'rtl') {
            horizontalStyleProperty = pos.overlayX === 'end' ? 'left' : 'right';
        }
        else {
            horizontalStyleProperty = pos.overlayX === 'end' ? 'right' : 'left';
        }
        /** @type {?} */
        var x = horizontalStyleProperty === 'left' ?
            overlayPoint.x :
            document.documentElement.clientWidth - (overlayPoint.x + overlayRect.width);
        // Reset any existing styles. This is necessary in case the preferred position has
        // changed since the last `apply`.
        ['top', 'bottom', 'left', 'right'].forEach(function (p) { return element.style[p] = null; });
        element.style[verticalStyleProperty] = y + "px";
        element.style[horizontalStyleProperty] = x + "px";
    };
    /**
     * Returns the bounding positions of the provided element with respect to the viewport.
     * @param {?} element
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._getElementBounds = /**
     * Returns the bounding positions of the provided element with respect to the viewport.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var boundingClientRect = element.getBoundingClientRect();
        return {
            top: boundingClientRect.top,
            right: boundingClientRect.left + boundingClientRect.width,
            bottom: boundingClientRect.top + boundingClientRect.height,
            left: boundingClientRect.left
        };
    };
    /**
     * Subtracts the amount that an element is overflowing on an axis from it's length.
     * @param {?} length
     * @param {...?} overflows
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._subtractOverflows = /**
     * Subtracts the amount that an element is overflowing on an axis from it's length.
     * @param {?} length
     * @param {...?} overflows
     * @return {?}
     */
    function (length) {
        var overflows = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            overflows[_i - 1] = arguments[_i];
        }
        return overflows.reduce(function (currentValue, currentOverflow) {
            return currentValue - Math.max(currentOverflow, 0);
        }, length);
    };
    return ConnectedPositionStrategy;
}());
/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
export { ConnectedPositionStrategy };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGVkLXBvc2l0aW9uLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9vdmVybGF5L3Bvc2l0aW9uL2Nvbm5lY3RlZC1wb3NpdGlvbi1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE9BQU8sRUFDTCxzQkFBc0IsRUFHdEIsOEJBQThCLEVBQy9CLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFDLE9BQU8sRUFBYSxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7OztBQXNCekM7Ozs7Ozs7QUFBQTtJQXFDRSxtQ0FDWSxjQUNBLFlBQ0EsYUFDQTtRQUhBLGlCQUFZLEdBQVosWUFBWTtRQUNaLGVBQVUsR0FBVixVQUFVO1FBQ1YsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsbUJBQWMsR0FBZCxjQUFjO29CQXhDWCxLQUFLOzs7O3dCQUdPLENBQUM7Ozs7d0JBR0QsQ0FBQzs7OzsyQkFHUSxFQUFFOzs7O21DQVFVLEVBQUU7aUNBWUosSUFBSSxPQUFPLEVBQWtDO1FBWXpGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFDL0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztLQUNwRDtJQS9CRCxzQkFBSSw2Q0FBTTtRQURWLG9EQUFvRDs7Ozs7UUFDcEQ7WUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDO1NBQzVCOzs7T0FBQTtJQWtCRCxzQkFBSSx1REFBZ0I7UUFEcEIsd0RBQXdEOzs7OztRQUN4RDtZQUNFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzlDOzs7T0FBQTtJQVlELHNCQUFJLGdEQUFTO1FBRGIseUVBQXlFOzs7OztRQUN6RTtZQUNFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO1NBQ2pDOzs7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QUNoRCxPQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLEdBQU0sQ0FBQyxPQUFJLENBQUM7Ozs7Ozs7SUFJNUMscURBQWlCOzs7OztjQUFDLE9BQW9COztRQUM1QyxJQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzNELE9BQU87WUFDTCxHQUFHLEVBQUUsa0JBQWtCLENBQUMsR0FBRztZQUMzQixLQUFLLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDLEtBQUs7WUFDekQsTUFBTSxFQUFFLGtCQUFrQixDQUFDLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNO1lBQzFELElBQUksRUFBRSxrQkFBa0IsQ0FBQyxJQUFJO1NBQzlCLENBQUM7Ozs7Ozs7O0lBTUksc0RBQWtCOzs7Ozs7Y0FBQyxNQUFjO1FBQUUsbUJBQXNCO2FBQXRCLFVBQXNCLEVBQXRCLHFCQUFzQixFQUF0QixJQUFzQjtZQUF0QixrQ0FBc0I7O1FBQy9ELE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFDLFlBQW9CLEVBQUUsZUFBdUI7WUFDcEUsT0FBTyxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDcEQsRUFBRSxNQUFNLENBQUMsQ0FBQzs7b0NBelpmO0lBMlpDLENBQUE7Ozs7Ozs7O0FBNVhELHFDQTRYQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UG9zaXRpb25TdHJhdGVneX0gZnJvbSAnLi9wb3NpdGlvbi1zdHJhdGVneSc7XG5pbXBvcnQge0VsZW1lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtWaWV3cG9ydFJ1bGVyfSBmcm9tICcuL3ZpZXdwb3J0LXJ1bGVyJztcbmltcG9ydCB7XG4gIENvbm5lY3Rpb25Qb3NpdGlvblBhaXIsXG4gIE9yaWdpbkNvbm5lY3Rpb25Qb3NpdGlvbixcbiAgT3ZlcmxheUNvbm5lY3Rpb25Qb3NpdGlvbixcbiAgQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlLCBTY3JvbGxhYmxlVmlld1Byb3BlcnRpZXNcbn0gZnJvbSAnLi9jb25uZWN0ZWQtcG9zaXRpb24nO1xuaW1wb3J0IHtTdWJqZWN0LCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7U2Nyb2xsYWJsZX0gZnJvbSAnLi4vc2Nyb2xsL3Njcm9sbGFibGUnO1xuXG4vKipcbiAqIENvbnRhaW5lciB0byBob2xkIHRoZSBib3VuZGluZyBwb3NpdGlvbnMgb2YgYSBwYXJ0aWN1bGFyIGVsZW1lbnQgd2l0aCByZXNwZWN0IHRvIHRoZSB2aWV3cG9ydCxcbiAqIHdoZXJlIHRvcCBhbmQgYm90dG9tIGFyZSB0aGUgeS1heGlzIGNvb3JkaW5hdGVzIG9mIHRoZSBib3VuZGluZyByZWN0YW5nbGUgYW5kIGxlZnQgYW5kIHJpZ2h0IGFyZVxuICogdGhlIHgtYXhpcyBjb29yZGluYXRlcy5cbiAqL1xudHlwZSBFbGVtZW50Qm91bmRpbmdQb3NpdGlvbnMgPSB7XG4gIHRvcDogbnVtYmVyO1xuICByaWdodDogbnVtYmVyO1xuICBib3R0b206IG51bWJlcjtcbiAgbGVmdDogbnVtYmVyO1xufTtcblxuLyoqXG4gKiBBIHN0cmF0ZWd5IGZvciBwb3NpdGlvbmluZyBvdmVybGF5cy4gVXNpbmcgdGhpcyBzdHJhdGVneSwgYW4gb3ZlcmxheSBpcyBnaXZlbiBhblxuICogaW1wbGljaXQgcG9zaXRpb24gcmVsYXRpdmUgc29tZSBvcmlnaW4gZWxlbWVudC4gVGhlIHJlbGF0aXZlIHBvc2l0aW9uIGlzIGRlZmluZWQgaW4gdGVybXMgb2ZcbiAqIGEgcG9pbnQgb24gdGhlIG9yaWdpbiBlbGVtZW50IHRoYXQgaXMgY29ubmVjdGVkIHRvIGEgcG9pbnQgb24gdGhlIG92ZXJsYXkgZWxlbWVudC4gRm9yIGV4YW1wbGUsXG4gKiBhIGJhc2ljIGRyb3Bkb3duIGlzIGNvbm5lY3RpbmcgdGhlIGJvdHRvbS1sZWZ0IGNvcm5lciBvZiB0aGUgb3JpZ2luIHRvIHRoZSB0b3AtbGVmdCBjb3JuZXJcbiAqIG9mIHRoZSBvdmVybGF5LlxuICovXG5leHBvcnQgY2xhc3MgQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSBpbXBsZW1lbnRzIFBvc2l0aW9uU3RyYXRlZ3kge1xuICBwcml2YXRlIF9kaXIgPSAnbHRyJztcblxuICAvKiogVGhlIG9mZnNldCBpbiBwaXhlbHMgZm9yIHRoZSBvdmVybGF5IGNvbm5lY3Rpb24gcG9pbnQgb24gdGhlIHgtYXhpcyAqL1xuICBwcml2YXRlIF9vZmZzZXRYOiBudW1iZXIgPSAwO1xuXG4gIC8qKiBUaGUgb2Zmc2V0IGluIHBpeGVscyBmb3IgdGhlIG92ZXJsYXkgY29ubmVjdGlvbiBwb2ludCBvbiB0aGUgeS1heGlzICovXG4gIHByaXZhdGUgX29mZnNldFk6IG51bWJlciA9IDA7XG5cbiAgLyoqIFRoZSBTY3JvbGxhYmxlIGNvbnRhaW5lcnMgdXNlZCB0byBjaGVjayBzY3JvbGxhYmxlIHZpZXcgcHJvcGVydGllcyBvbiBwb3NpdGlvbiBjaGFuZ2UuICovXG4gIHByaXZhdGUgc2Nyb2xsYWJsZXM6IFNjcm9sbGFibGVbXSA9IFtdO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSB3ZSdyZSBkZWFsaW5nIHdpdGggYW4gUlRMIGNvbnRleHQgKi9cbiAgZ2V0IF9pc1J0bCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyID09PSAncnRsJztcbiAgfVxuXG4gIC8qKiBPcmRlcmVkIGxpc3Qgb2YgcHJlZmVycmVkIHBvc2l0aW9ucywgZnJvbSBtb3N0IHRvIGxlYXN0IGRlc2lyYWJsZS4gKi9cbiAgX3ByZWZlcnJlZFBvc2l0aW9uczogQ29ubmVjdGlvblBvc2l0aW9uUGFpcltdID0gW107XG5cbiAgLyoqIFRoZSBvcmlnaW4gZWxlbWVudCBhZ2FpbnN0IHdoaWNoIHRoZSBvdmVybGF5IHdpbGwgYmUgcG9zaXRpb25lZC4gKi9cbiAgcHJpdmF0ZSBfb3JpZ2luOiBIVE1MRWxlbWVudDtcblxuICAvKiogVGhlIG92ZXJsYXkgcGFuZSBlbGVtZW50LiAqL1xuICBwcml2YXRlIF9wYW5lOiBIVE1MRWxlbWVudDtcblxuICAvKiogVGhlIGxhc3QgcG9zaXRpb24gdG8gaGF2ZSBiZWVuIGNhbGN1bGF0ZWQgYXMgdGhlIGJlc3QgZml0IHBvc2l0aW9uLiAqL1xuICBwcml2YXRlIF9sYXN0Q29ubmVjdGVkUG9zaXRpb246IENvbm5lY3Rpb25Qb3NpdGlvblBhaXI7XG5cbiAgX29uUG9zaXRpb25DaGFuZ2U6XG4gICAgICBTdWJqZWN0PENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZT4gPSBuZXcgU3ViamVjdDxDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2U+KCk7XG5cbiAgLyoqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIGNvbm5lY3Rpb24gcG9pbnQgY2hhbmdlcy4gKi9cbiAgZ2V0IG9uUG9zaXRpb25DaGFuZ2UoKTogT2JzZXJ2YWJsZTxDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2U+IHtcbiAgICByZXR1cm4gdGhpcy5fb25Qb3NpdGlvbkNoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfY29ubmVjdGVkVG86IEVsZW1lbnRSZWYsXG4gICAgICBwcml2YXRlIF9vcmlnaW5Qb3M6IE9yaWdpbkNvbm5lY3Rpb25Qb3NpdGlvbixcbiAgICAgIHByaXZhdGUgX292ZXJsYXlQb3M6IE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb24sXG4gICAgICBwcml2YXRlIF92aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyKSB7XG4gICAgdGhpcy5fb3JpZ2luID0gdGhpcy5fY29ubmVjdGVkVG8ubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLndpdGhGYWxsYmFja1Bvc2l0aW9uKF9vcmlnaW5Qb3MsIF9vdmVybGF5UG9zKTtcbiAgfVxuXG4gIC8qKiBPcmRlcmVkIGxpc3Qgb2YgcHJlZmVycmVkIHBvc2l0aW9ucywgZnJvbSBtb3N0IHRvIGxlYXN0IGRlc2lyYWJsZS4gKi9cbiAgZ2V0IHBvc2l0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJlZmVycmVkUG9zaXRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvIGJlIHVzZWQgdG8gZm9yIGFueSBjbGVhbnVwIGFmdGVyIHRoZSBlbGVtZW50IGdldHMgZGVzdHJveWVkLlxuICAgKi9cbiAgZGlzcG9zZSgpIHsgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgb3ZlcmxheSBlbGVtZW50LCB1c2luZyB3aGljaGV2ZXIgcHJlZmVycmVkIHBvc2l0aW9uIHJlbGF0aXZlXG4gICAqIHRvIHRoZSBvcmlnaW4gZml0cyBvbi1zY3JlZW4uXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnQgRWxlbWVudCB0byB3aGljaCB0byBhcHBseSB0aGUgQ1NTIHN0eWxlcy5cbiAgICogQHJldHVybnMgUmVzb2x2ZXMgd2hlbiB0aGUgc3R5bGVzIGhhdmUgYmVlbiBhcHBsaWVkLlxuICAgKi9cbiAgYXBwbHkoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBDYWNoZSB0aGUgb3ZlcmxheSBwYW5lIGVsZW1lbnQgaW4gY2FzZSByZS1jYWxjdWxhdGluZyBwb3NpdGlvbiBpcyBuZWNlc3NhcnlcbiAgICB0aGlzLl9wYW5lID0gZWxlbWVudDtcblxuICAgIC8vIFdlIG5lZWQgdGhlIGJvdW5kaW5nIHJlY3RzIGZvciB0aGUgb3JpZ2luIGFuZCB0aGUgb3ZlcmxheSB0byBkZXRlcm1pbmUgaG93IHRvIHBvc2l0aW9uXG4gICAgLy8gdGhlIG92ZXJsYXkgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbi5cbiAgICBjb25zdCBvcmlnaW5SZWN0ID0gdGhpcy5fb3JpZ2luLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IG92ZXJsYXlSZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIFdlIHVzZSB0aGUgdmlld3BvcnQgcmVjdCB0byBkZXRlcm1pbmUgd2hldGhlciBhIHBvc2l0aW9uIHdvdWxkIGdvIG9mZi1zY3JlZW4uXG4gICAgY29uc3Qgdmlld3BvcnRSZWN0ID0gdGhpcy5fdmlld3BvcnRSdWxlci5nZXRWaWV3cG9ydFJlY3QoKTtcblxuICAgIC8vIEZhbGxiYWNrIHBvaW50IGlmIG5vbmUgb2YgdGhlIGZhbGxiYWNrcyBmaXQgaW50byB0aGUgdmlld3BvcnQuXG4gICAgbGV0IGZhbGxiYWNrUG9pbnQ6IE92ZXJsYXlQb2ludCA9IG51bGw7XG4gICAgbGV0IGZhbGxiYWNrUG9zaXRpb246IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIgPSBudWxsO1xuXG4gICAgLy8gV2Ugd2FudCB0byBwbGFjZSB0aGUgb3ZlcmxheSBpbiB0aGUgZmlyc3Qgb2YgdGhlIHByZWZlcnJlZCBwb3NpdGlvbnMgc3VjaCB0aGF0IHRoZVxuICAgIC8vIG92ZXJsYXkgZml0cyBvbi1zY3JlZW4uXG4gICAgZm9yIChsZXQgcG9zIG9mIHRoaXMuX3ByZWZlcnJlZFBvc2l0aW9ucykge1xuICAgICAgLy8gR2V0IHRoZSAoeCwgeSkgcG9pbnQgb2YgY29ubmVjdGlvbiBvbiB0aGUgb3JpZ2luLCBhbmQgdGhlbiB1c2UgdGhhdCB0byBnZXQgdGhlXG4gICAgICAvLyAodG9wLCBsZWZ0KSBjb29yZGluYXRlIGZvciB0aGUgb3ZlcmxheSBhdCBgcG9zYC5cbiAgICAgIGxldCBvcmlnaW5Qb2ludCA9IHRoaXMuX2dldE9yaWdpbkNvbm5lY3Rpb25Qb2ludChvcmlnaW5SZWN0LCBwb3MpO1xuICAgICAgbGV0IG92ZXJsYXlQb2ludCA9IHRoaXMuX2dldE92ZXJsYXlQb2ludChvcmlnaW5Qb2ludCwgb3ZlcmxheVJlY3QsIHZpZXdwb3J0UmVjdCwgcG9zKTtcblxuICAgICAgLy8gSWYgdGhlIG92ZXJsYXkgaW4gdGhlIGNhbGN1bGF0ZWQgcG9zaXRpb24gZml0cyBvbi1zY3JlZW4sIHB1dCBpdCB0aGVyZSBhbmQgd2UncmUgZG9uZS5cbiAgICAgIGlmIChvdmVybGF5UG9pbnQuZml0c0luVmlld3BvcnQpIHtcbiAgICAgICAgdGhpcy5fc2V0RWxlbWVudFBvc2l0aW9uKGVsZW1lbnQsIG92ZXJsYXlSZWN0LCBvdmVybGF5UG9pbnQsIHBvcyk7XG5cbiAgICAgICAgLy8gU2F2ZSB0aGUgbGFzdCBjb25uZWN0ZWQgcG9zaXRpb24gaW4gY2FzZSB0aGUgcG9zaXRpb24gbmVlZHMgdG8gYmUgcmUtY2FsY3VsYXRlZC5cbiAgICAgICAgdGhpcy5fbGFzdENvbm5lY3RlZFBvc2l0aW9uID0gcG9zO1xuXG4gICAgICAgIC8vIE5vdGlmeSB0aGF0IHRoZSBwb3NpdGlvbiBoYXMgYmVlbiBjaGFuZ2VkIGFsb25nIHdpdGggaXRzIGNoYW5nZSBwcm9wZXJ0aWVzLlxuICAgICAgICBjb25zdCBzY3JvbGxhYmxlVmlld1Byb3BlcnRpZXMgPSB0aGlzLmdldFNjcm9sbGFibGVWaWV3UHJvcGVydGllcyhlbGVtZW50KTtcbiAgICAgICAgY29uc3QgcG9zaXRpb25DaGFuZ2UgPSBuZXcgQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlKHBvcywgc2Nyb2xsYWJsZVZpZXdQcm9wZXJ0aWVzKTtcbiAgICAgICAgdGhpcy5fb25Qb3NpdGlvbkNoYW5nZS5uZXh0KHBvc2l0aW9uQ2hhbmdlKTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgfSBlbHNlIGlmICghZmFsbGJhY2tQb2ludCB8fCBmYWxsYmFja1BvaW50LnZpc2libGVBcmVhIDwgb3ZlcmxheVBvaW50LnZpc2libGVBcmVhKSB7XG4gICAgICAgIGZhbGxiYWNrUG9pbnQgPSBvdmVybGF5UG9pbnQ7XG4gICAgICAgIGZhbGxiYWNrUG9zaXRpb24gPSBwb3M7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgbm9uZSBvZiB0aGUgcHJlZmVycmVkIHBvc2l0aW9ucyB3ZXJlIGluIHRoZSB2aWV3cG9ydCwgdGFrZSB0aGUgb25lXG4gICAgLy8gd2l0aCB0aGUgbGFyZ2VzdCB2aXNpYmxlIGFyZWEuXG4gICAgdGhpcy5fc2V0RWxlbWVudFBvc2l0aW9uKGVsZW1lbnQsIG92ZXJsYXlSZWN0LCBmYWxsYmFja1BvaW50LCBmYWxsYmFja1Bvc2l0aW9uKTtcblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyByZS1hbGlnbnMgdGhlIG92ZXJsYXkgZWxlbWVudCB3aXRoIHRoZSB0cmlnZ2VyIGluIGl0cyBsYXN0IGNhbGN1bGF0ZWQgcG9zaXRpb24sXG4gICAqIGV2ZW4gaWYgYSBwb3NpdGlvbiBoaWdoZXIgaW4gdGhlIFwicHJlZmVycmVkIHBvc2l0aW9uc1wiIGxpc3Qgd291bGQgbm93IGZpdC4gVGhpc1xuICAgKiBhbGxvd3Mgb25lIHRvIHJlLWFsaWduIHRoZSBwYW5lbCB3aXRob3V0IGNoYW5naW5nIHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgcGFuZWwuXG4gICAqL1xuICByZWNhbGN1bGF0ZUxhc3RQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCBvcmlnaW5SZWN0ID0gdGhpcy5fb3JpZ2luLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IG92ZXJsYXlSZWN0ID0gdGhpcy5fcGFuZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB2aWV3cG9ydFJlY3QgPSB0aGlzLl92aWV3cG9ydFJ1bGVyLmdldFZpZXdwb3J0UmVjdCgpO1xuICAgIGNvbnN0IGxhc3RQb3NpdGlvbiA9IHRoaXMuX2xhc3RDb25uZWN0ZWRQb3NpdGlvbiB8fCB0aGlzLl9wcmVmZXJyZWRQb3NpdGlvbnNbMF07XG5cbiAgICBsZXQgb3JpZ2luUG9pbnQgPSB0aGlzLl9nZXRPcmlnaW5Db25uZWN0aW9uUG9pbnQob3JpZ2luUmVjdCwgbGFzdFBvc2l0aW9uKTtcbiAgICBsZXQgb3ZlcmxheVBvaW50ID0gdGhpcy5fZ2V0T3ZlcmxheVBvaW50KG9yaWdpblBvaW50LCBvdmVybGF5UmVjdCwgdmlld3BvcnRSZWN0LCBsYXN0UG9zaXRpb24pO1xuICAgIHRoaXMuX3NldEVsZW1lbnRQb3NpdGlvbih0aGlzLl9wYW5lLCBvdmVybGF5UmVjdCwgb3ZlcmxheVBvaW50LCBsYXN0UG9zaXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxpc3Qgb2YgU2Nyb2xsYWJsZSBjb250YWluZXJzIHRoYXQgaG9zdCB0aGUgb3JpZ2luIGVsZW1lbnQgc28gdGhhdFxuICAgKiBvbiByZXBvc2l0aW9uIHdlIGNhbiBldmFsdWF0ZSBpZiBpdCBvciB0aGUgb3ZlcmxheSBoYXMgYmVlbiBjbGlwcGVkIG9yIG91dHNpZGUgdmlldy4gRXZlcnlcbiAgICogU2Nyb2xsYWJsZSBtdXN0IGJlIGFuIGFuY2VzdG9yIGVsZW1lbnQgb2YgdGhlIHN0cmF0ZWd5J3Mgb3JpZ2luIGVsZW1lbnQuXG4gICAqL1xuICB3aXRoU2Nyb2xsYWJsZUNvbnRhaW5lcnMoc2Nyb2xsYWJsZXM6IFNjcm9sbGFibGVbXSkge1xuICAgIHRoaXMuc2Nyb2xsYWJsZXMgPSBzY3JvbGxhYmxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IHByZWZlcnJlZCBmYWxsYmFjayBwb3NpdGlvbi5cbiAgICogQHBhcmFtIG9yaWdpblBvc1xuICAgKiBAcGFyYW0gb3ZlcmxheVBvc1xuICAgKi9cbiAgd2l0aEZhbGxiYWNrUG9zaXRpb24oXG4gICAgICBvcmlnaW5Qb3M6IE9yaWdpbkNvbm5lY3Rpb25Qb3NpdGlvbixcbiAgICAgIG92ZXJsYXlQb3M6IE92ZXJsYXlDb25uZWN0aW9uUG9zaXRpb24pOiB0aGlzIHtcbiAgICB0aGlzLl9wcmVmZXJyZWRQb3NpdGlvbnMucHVzaChuZXcgQ29ubmVjdGlvblBvc2l0aW9uUGFpcihvcmlnaW5Qb3MsIG92ZXJsYXlQb3MpKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsYXlvdXQgZGlyZWN0aW9uIHNvIHRoZSBvdmVybGF5J3MgcG9zaXRpb24gY2FuIGJlIGFkanVzdGVkIHRvIG1hdGNoLlxuICAgKiBAcGFyYW0gZGlyIE5ldyBsYXlvdXQgZGlyZWN0aW9uLlxuICAgKi9cbiAgd2l0aERpcmVjdGlvbihkaXI6ICdsdHInIHwgJ3J0bCcpOiB0aGlzIHtcbiAgICB0aGlzLl9kaXIgPSBkaXI7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBhbiBvZmZzZXQgZm9yIHRoZSBvdmVybGF5J3MgY29ubmVjdGlvbiBwb2ludCBvbiB0aGUgeC1heGlzXG4gICAqIEBwYXJhbSBvZmZzZXQgTmV3IG9mZnNldCBpbiB0aGUgWCBheGlzLlxuICAgKi9cbiAgd2l0aE9mZnNldFgob2Zmc2V0OiBudW1iZXIpOiB0aGlzIHtcbiAgICB0aGlzLl9vZmZzZXRYID0gb2Zmc2V0O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgYW4gb2Zmc2V0IGZvciB0aGUgb3ZlcmxheSdzIGNvbm5lY3Rpb24gcG9pbnQgb24gdGhlIHktYXhpc1xuICAgKiBAcGFyYW0gIG9mZnNldCBOZXcgb2Zmc2V0IGluIHRoZSBZIGF4aXMuXG4gICAqL1xuICB3aXRoT2Zmc2V0WShvZmZzZXQ6IG51bWJlcik6IHRoaXMge1xuICAgIHRoaXMuX29mZnNldFkgPSBvZmZzZXQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgaG9yaXpvbnRhbCAoeCkgXCJzdGFydFwiIGRpbWVuc2lvbiBiYXNlZCBvbiB3aGV0aGVyIHRoZSBvdmVybGF5IGlzIGluIGFuIFJUTCBjb250ZXh0LlxuICAgKiBAcGFyYW0gcmVjdFxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0U3RhcnRYKHJlY3Q6IENsaWVudFJlY3QpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pc1J0bCA/IHJlY3QucmlnaHQgOiByZWN0LmxlZnQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgaG9yaXpvbnRhbCAoeCkgXCJlbmRcIiBkaW1lbnNpb24gYmFzZWQgb24gd2hldGhlciB0aGUgb3ZlcmxheSBpcyBpbiBhbiBSVEwgY29udGV4dC5cbiAgICogQHBhcmFtIHJlY3RcbiAgICovXG4gIHByaXZhdGUgX2dldEVuZFgocmVjdDogQ2xpZW50UmVjdCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2lzUnRsID8gcmVjdC5sZWZ0IDogcmVjdC5yaWdodDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldHMgdGhlICh4LCB5KSBjb29yZGluYXRlIG9mIGEgY29ubmVjdGlvbiBwb2ludCBvbiB0aGUgb3JpZ2luIGJhc2VkIG9uIGEgcmVsYXRpdmUgcG9zaXRpb24uXG4gICAqIEBwYXJhbSBvcmlnaW5SZWN0XG4gICAqIEBwYXJhbSBwb3NcbiAgICovXG4gIHByaXZhdGUgX2dldE9yaWdpbkNvbm5lY3Rpb25Qb2ludChvcmlnaW5SZWN0OiBDbGllbnRSZWN0LCBwb3M6IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIpOiBQb2ludCB7XG4gICAgY29uc3Qgb3JpZ2luU3RhcnRYID0gdGhpcy5fZ2V0U3RhcnRYKG9yaWdpblJlY3QpO1xuICAgIGNvbnN0IG9yaWdpbkVuZFggPSB0aGlzLl9nZXRFbmRYKG9yaWdpblJlY3QpO1xuXG4gICAgbGV0IHg6IG51bWJlcjtcbiAgICBpZiAocG9zLm9yaWdpblggPT0gJ2NlbnRlcicpIHtcbiAgICAgIHggPSBvcmlnaW5TdGFydFggKyAob3JpZ2luUmVjdC53aWR0aCAvIDIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gcG9zLm9yaWdpblggPT0gJ3N0YXJ0JyA/IG9yaWdpblN0YXJ0WCA6IG9yaWdpbkVuZFg7XG4gICAgfVxuXG4gICAgbGV0IHk6IG51bWJlcjtcbiAgICBpZiAocG9zLm9yaWdpblkgPT0gJ2NlbnRlcicpIHtcbiAgICAgIHkgPSBvcmlnaW5SZWN0LnRvcCArIChvcmlnaW5SZWN0LmhlaWdodCAvIDIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB5ID0gcG9zLm9yaWdpblkgPT0gJ3RvcCcgPyBvcmlnaW5SZWN0LnRvcCA6IG9yaWdpblJlY3QuYm90dG9tO1xuICAgIH1cblxuICAgIHJldHVybiB7eCwgeX07XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSAoeCwgeSkgY29vcmRpbmF0ZSBvZiB0aGUgdG9wLWxlZnQgY29ybmVyIG9mIHRoZSBvdmVybGF5IGdpdmVuIGEgZ2l2ZW4gcG9zaXRpb24gYW5kXG4gICAqIG9yaWdpbiBwb2ludCB0byB3aGljaCB0aGUgb3ZlcmxheSBzaG91bGQgYmUgY29ubmVjdGVkLCBhcyB3ZWxsIGFzIGhvdyBtdWNoIG9mIHRoZSBlbGVtZW50XG4gICAqIHdvdWxkIGJlIGluc2lkZSB0aGUgdmlld3BvcnQgYXQgdGhhdCBwb3NpdGlvbi5cbiAgICovXG4gIHByaXZhdGUgX2dldE92ZXJsYXlQb2ludChcbiAgICAgIG9yaWdpblBvaW50OiBQb2ludCxcbiAgICAgIG92ZXJsYXlSZWN0OiBDbGllbnRSZWN0LFxuICAgICAgdmlld3BvcnRSZWN0OiBDbGllbnRSZWN0LFxuICAgICAgcG9zOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyKTogT3ZlcmxheVBvaW50IHtcbiAgICAvLyBDYWxjdWxhdGUgdGhlIChvdmVybGF5U3RhcnRYLCBvdmVybGF5U3RhcnRZKSwgdGhlIHN0YXJ0IG9mIHRoZSBwb3RlbnRpYWwgb3ZlcmxheSBwb3NpdGlvblxuICAgIC8vIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4gcG9pbnQuXG4gICAgbGV0IG92ZXJsYXlTdGFydFg6IG51bWJlcjtcbiAgICBpZiAocG9zLm92ZXJsYXlYID09ICdjZW50ZXInKSB7XG4gICAgICBvdmVybGF5U3RhcnRYID0gLW92ZXJsYXlSZWN0LndpZHRoIC8gMjtcbiAgICB9IGVsc2UgaWYgKHBvcy5vdmVybGF5WCA9PT0gJ3N0YXJ0Jykge1xuICAgICAgb3ZlcmxheVN0YXJ0WCA9IHRoaXMuX2lzUnRsID8gLW92ZXJsYXlSZWN0LndpZHRoIDogMDtcbiAgICB9IGVsc2Uge1xuICAgICAgb3ZlcmxheVN0YXJ0WCA9IHRoaXMuX2lzUnRsID8gMCA6IC1vdmVybGF5UmVjdC53aWR0aDtcbiAgICB9XG5cbiAgICBsZXQgb3ZlcmxheVN0YXJ0WTogbnVtYmVyO1xuICAgIGlmIChwb3Mub3ZlcmxheVkgPT0gJ2NlbnRlcicpIHtcbiAgICAgIG92ZXJsYXlTdGFydFkgPSAtb3ZlcmxheVJlY3QuaGVpZ2h0IC8gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgb3ZlcmxheVN0YXJ0WSA9IHBvcy5vdmVybGF5WSA9PSAndG9wJyA/IDAgOiAtb3ZlcmxheVJlY3QuaGVpZ2h0O1xuICAgIH1cblxuICAgIC8vIFRoZSAoeCwgeSkgY29vcmRpbmF0ZXMgb2YgdGhlIG92ZXJsYXkuXG4gICAgbGV0IHggPSBvcmlnaW5Qb2ludC54ICsgb3ZlcmxheVN0YXJ0WCArIHRoaXMuX29mZnNldFg7XG4gICAgbGV0IHkgPSBvcmlnaW5Qb2ludC55ICsgb3ZlcmxheVN0YXJ0WSArIHRoaXMuX29mZnNldFk7XG5cbiAgICAvLyBIb3cgbXVjaCB0aGUgb3ZlcmxheSB3b3VsZCBvdmVyZmxvdyBhdCB0aGlzIHBvc2l0aW9uLCBvbiBlYWNoIHNpZGUuXG4gICAgbGV0IGxlZnRPdmVyZmxvdyA9IDAgLSB4O1xuICAgIGxldCByaWdodE92ZXJmbG93ID0gKHggKyBvdmVybGF5UmVjdC53aWR0aCkgLSB2aWV3cG9ydFJlY3Qud2lkdGg7XG4gICAgbGV0IHRvcE92ZXJmbG93ID0gMCAtIHk7XG4gICAgbGV0IGJvdHRvbU92ZXJmbG93ID0gKHkgKyBvdmVybGF5UmVjdC5oZWlnaHQpIC0gdmlld3BvcnRSZWN0LmhlaWdodDtcblxuICAgIC8vIFZpc2libGUgcGFydHMgb2YgdGhlIGVsZW1lbnQgb24gZWFjaCBheGlzLlxuICAgIGxldCB2aXNpYmxlV2lkdGggPSB0aGlzLl9zdWJ0cmFjdE92ZXJmbG93cyhvdmVybGF5UmVjdC53aWR0aCwgbGVmdE92ZXJmbG93LCByaWdodE92ZXJmbG93KTtcbiAgICBsZXQgdmlzaWJsZUhlaWdodCA9IHRoaXMuX3N1YnRyYWN0T3ZlcmZsb3dzKG92ZXJsYXlSZWN0LmhlaWdodCwgdG9wT3ZlcmZsb3csIGJvdHRvbU92ZXJmbG93KTtcblxuICAgIC8vIFRoZSBhcmVhIG9mIHRoZSBlbGVtZW50IHRoYXQncyB3aXRoaW4gdGhlIHZpZXdwb3J0LlxuICAgIGxldCB2aXNpYmxlQXJlYSA9IHZpc2libGVXaWR0aCAqIHZpc2libGVIZWlnaHQ7XG4gICAgbGV0IGZpdHNJblZpZXdwb3J0ID0gKG92ZXJsYXlSZWN0LndpZHRoICogb3ZlcmxheVJlY3QuaGVpZ2h0KSA9PT0gdmlzaWJsZUFyZWE7XG5cbiAgICByZXR1cm4ge3gsIHksIGZpdHNJblZpZXdwb3J0LCB2aXNpYmxlQXJlYX07XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdmlldyBwcm9wZXJ0aWVzIG9mIHRoZSB0cmlnZ2VyIGFuZCBvdmVybGF5LCBpbmNsdWRpbmcgd2hldGhlciB0aGV5IGFyZSBjbGlwcGVkXG4gICAqIG9yIGNvbXBsZXRlbHkgb3V0c2lkZSB0aGUgdmlldyBvZiBhbnkgb2YgdGhlIHN0cmF0ZWd5J3Mgc2Nyb2xsYWJsZXMuXG4gICAqL1xuICBwcml2YXRlIGdldFNjcm9sbGFibGVWaWV3UHJvcGVydGllcyhvdmVybGF5OiBIVE1MRWxlbWVudCk6IFNjcm9sbGFibGVWaWV3UHJvcGVydGllcyB7XG4gICAgY29uc3Qgb3JpZ2luQm91bmRzID0gdGhpcy5fZ2V0RWxlbWVudEJvdW5kcyh0aGlzLl9vcmlnaW4pO1xuICAgIGNvbnN0IG92ZXJsYXlCb3VuZHMgPSB0aGlzLl9nZXRFbGVtZW50Qm91bmRzKG92ZXJsYXkpO1xuICAgIGNvbnN0IHNjcm9sbENvbnRhaW5lckJvdW5kcyA9IHRoaXMuc2Nyb2xsYWJsZXMubWFwKChzY3JvbGxhYmxlOiBTY3JvbGxhYmxlKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fZ2V0RWxlbWVudEJvdW5kcyhzY3JvbGxhYmxlLmdldEVsZW1lbnRSZWYoKS5uYXRpdmVFbGVtZW50KTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBpc09yaWdpbkNsaXBwZWQ6IHRoaXMuaXNFbGVtZW50Q2xpcHBlZChvcmlnaW5Cb3VuZHMsIHNjcm9sbENvbnRhaW5lckJvdW5kcyksXG4gICAgICBpc09yaWdpbk91dHNpZGVWaWV3OiB0aGlzLmlzRWxlbWVudE91dHNpZGVWaWV3KG9yaWdpbkJvdW5kcywgc2Nyb2xsQ29udGFpbmVyQm91bmRzKSxcbiAgICAgIGlzT3ZlcmxheUNsaXBwZWQ6IHRoaXMuaXNFbGVtZW50Q2xpcHBlZChvdmVybGF5Qm91bmRzLCBzY3JvbGxDb250YWluZXJCb3VuZHMpLFxuICAgICAgaXNPdmVybGF5T3V0c2lkZVZpZXc6IHRoaXMuaXNFbGVtZW50T3V0c2lkZVZpZXcob3ZlcmxheUJvdW5kcywgc2Nyb2xsQ29udGFpbmVyQm91bmRzKSxcbiAgICB9O1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGVsZW1lbnQgaXMgY29tcGxldGVseSBvdXQgb2YgdGhlIHZpZXcgb2YgYW55IG9mIHRoZSBjb250YWluZXJzLiAqL1xuICBwcml2YXRlIGlzRWxlbWVudE91dHNpZGVWaWV3KFxuICAgICAgZWxlbWVudEJvdW5kczogRWxlbWVudEJvdW5kaW5nUG9zaXRpb25zLFxuICAgICAgY29udGFpbmVyc0JvdW5kczogRWxlbWVudEJvdW5kaW5nUG9zaXRpb25zW10pOiBib29sZWFuIHtcbiAgICByZXR1cm4gY29udGFpbmVyc0JvdW5kcy5zb21lKChjb250YWluZXJCb3VuZHM6IEVsZW1lbnRCb3VuZGluZ1Bvc2l0aW9ucykgPT4ge1xuICAgICAgY29uc3Qgb3V0c2lkZUFib3ZlID0gZWxlbWVudEJvdW5kcy5ib3R0b20gPCBjb250YWluZXJCb3VuZHMudG9wO1xuICAgICAgY29uc3Qgb3V0c2lkZUJlbG93ID0gZWxlbWVudEJvdW5kcy50b3AgPiBjb250YWluZXJCb3VuZHMuYm90dG9tO1xuICAgICAgY29uc3Qgb3V0c2lkZUxlZnQgPSBlbGVtZW50Qm91bmRzLnJpZ2h0IDwgY29udGFpbmVyQm91bmRzLmxlZnQ7XG4gICAgICBjb25zdCBvdXRzaWRlUmlnaHQgPSBlbGVtZW50Qm91bmRzLmxlZnQgPiBjb250YWluZXJCb3VuZHMucmlnaHQ7XG5cbiAgICAgIHJldHVybiBvdXRzaWRlQWJvdmUgfHwgb3V0c2lkZUJlbG93IHx8IG91dHNpZGVMZWZ0IHx8IG91dHNpZGVSaWdodDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBlbGVtZW50IGlzIGNsaXBwZWQgYnkgYW55IG9mIHRoZSBjb250YWluZXJzLiAqL1xuICBwcml2YXRlIGlzRWxlbWVudENsaXBwZWQoXG4gICAgICBlbGVtZW50Qm91bmRzOiBFbGVtZW50Qm91bmRpbmdQb3NpdGlvbnMsXG4gICAgICBjb250YWluZXJzQm91bmRzOiBFbGVtZW50Qm91bmRpbmdQb3NpdGlvbnNbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjb250YWluZXJzQm91bmRzLnNvbWUoKGNvbnRhaW5lckJvdW5kczogRWxlbWVudEJvdW5kaW5nUG9zaXRpb25zKSA9PiB7XG4gICAgICBjb25zdCBjbGlwcGVkQWJvdmUgPSBlbGVtZW50Qm91bmRzLnRvcCA8IGNvbnRhaW5lckJvdW5kcy50b3A7XG4gICAgICBjb25zdCBjbGlwcGVkQmVsb3cgPSBlbGVtZW50Qm91bmRzLmJvdHRvbSA+IGNvbnRhaW5lckJvdW5kcy5ib3R0b207XG4gICAgICBjb25zdCBjbGlwcGVkTGVmdCA9IGVsZW1lbnRCb3VuZHMubGVmdCA8IGNvbnRhaW5lckJvdW5kcy5sZWZ0O1xuICAgICAgY29uc3QgY2xpcHBlZFJpZ2h0ID0gZWxlbWVudEJvdW5kcy5yaWdodCA+IGNvbnRhaW5lckJvdW5kcy5yaWdodDtcblxuICAgICAgcmV0dXJuIGNsaXBwZWRBYm92ZSB8fCBjbGlwcGVkQmVsb3cgfHwgY2xpcHBlZExlZnQgfHwgY2xpcHBlZFJpZ2h0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFBoeXNpY2FsbHkgcG9zaXRpb25zIHRoZSBvdmVybGF5IGVsZW1lbnQgdG8gdGhlIGdpdmVuIGNvb3JkaW5hdGUuICovXG4gIHByaXZhdGUgX3NldEVsZW1lbnRQb3NpdGlvbihcbiAgICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgICAgb3ZlcmxheVJlY3Q6IENsaWVudFJlY3QsXG4gICAgICBvdmVybGF5UG9pbnQ6IFBvaW50LFxuICAgICAgcG9zOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyKSB7XG5cbiAgICAvLyBXZSB3YW50IHRvIHNldCBlaXRoZXIgYHRvcGAgb3IgYGJvdHRvbWAgYmFzZWQgb24gd2hldGhlciB0aGUgb3ZlcmxheSB3YW50cyB0byBhcHBlYXIgYWJvdmVcbiAgICAvLyBvciBiZWxvdyB0aGUgb3JpZ2luIGFuZCB0aGUgZGlyZWN0aW9uIGluIHdoaWNoIHRoZSBlbGVtZW50IHdpbGwgZXhwYW5kLlxuICAgIGxldCB2ZXJ0aWNhbFN0eWxlUHJvcGVydHk6IGFueSA9IHBvcy5vdmVybGF5WSA9PT0gJ2JvdHRvbScgPyAnYm90dG9tJyA6ICd0b3AnO1xuXG4gICAgLy8gV2hlbiB1c2luZyBgYm90dG9tYCwgd2UgYWRqdXN0IHRoZSB5IHBvc2l0aW9uIHN1Y2ggdGhhdCBpdCBpcyB0aGUgZGlzdGFuY2VcbiAgICAvLyBmcm9tIHRoZSBib3R0b20gb2YgdGhlIHZpZXdwb3J0IHJhdGhlciB0aGFuIHRoZSB0b3AuXG4gICAgbGV0IHkgPSB2ZXJ0aWNhbFN0eWxlUHJvcGVydHkgPT09ICd0b3AnID9cbiAgICAgICAgb3ZlcmxheVBvaW50LnkgOlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gKG92ZXJsYXlQb2ludC55ICsgb3ZlcmxheVJlY3QuaGVpZ2h0KTtcblxuICAgIC8vIFdlIHdhbnQgdG8gc2V0IGVpdGhlciBgbGVmdGAgb3IgYHJpZ2h0YCBiYXNlZCBvbiB3aGV0aGVyIHRoZSBvdmVybGF5IHdhbnRzIHRvIGFwcGVhciBcImJlZm9yZVwiXG4gICAgLy8gb3IgXCJhZnRlclwiIHRoZSBvcmlnaW4sIHdoaWNoIGRldGVybWluZXMgdGhlIGRpcmVjdGlvbiBpbiB3aGljaCB0aGUgZWxlbWVudCB3aWxsIGV4cGFuZC5cbiAgICAvLyBGb3IgdGhlIGhvcml6b250YWwgYXhpcywgdGhlIG1lYW5pbmcgb2YgXCJiZWZvcmVcIiBhbmQgXCJhZnRlclwiIGNoYW5nZSBiYXNlZCBvbiB3aGV0aGVyIHRoZVxuICAgIC8vIHBhZ2UgaXMgaW4gUlRMIG9yIExUUi5cbiAgICBsZXQgaG9yaXpvbnRhbFN0eWxlUHJvcGVydHk6IGFueTtcbiAgICBpZiAodGhpcy5fZGlyID09PSAncnRsJykge1xuICAgICAgaG9yaXpvbnRhbFN0eWxlUHJvcGVydHkgPSBwb3Mub3ZlcmxheVggPT09ICdlbmQnID8gJ2xlZnQnIDogJ3JpZ2h0JztcbiAgICB9IGVsc2Uge1xuICAgICAgaG9yaXpvbnRhbFN0eWxlUHJvcGVydHkgPSBwb3Mub3ZlcmxheVggPT09ICdlbmQnID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgICB9XG5cbiAgICAvLyBXaGVuIHdlJ3JlIHNldHRpbmcgYHJpZ2h0YCwgd2UgYWRqdXN0IHRoZSB4IHBvc2l0aW9uIHN1Y2ggdGhhdCBpdCBpcyB0aGUgZGlzdGFuY2VcbiAgICAvLyBmcm9tIHRoZSByaWdodCBlZGdlIG9mIHRoZSB2aWV3cG9ydCByYXRoZXIgdGhhbiB0aGUgbGVmdCBlZGdlLlxuICAgIGxldCB4ID0gaG9yaXpvbnRhbFN0eWxlUHJvcGVydHkgPT09ICdsZWZ0JyA/XG4gICAgICBvdmVybGF5UG9pbnQueCA6XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggLSAob3ZlcmxheVBvaW50LnggKyBvdmVybGF5UmVjdC53aWR0aCk7XG5cblxuICAgIC8vIFJlc2V0IGFueSBleGlzdGluZyBzdHlsZXMuIFRoaXMgaXMgbmVjZXNzYXJ5IGluIGNhc2UgdGhlIHByZWZlcnJlZCBwb3NpdGlvbiBoYXNcbiAgICAvLyBjaGFuZ2VkIHNpbmNlIHRoZSBsYXN0IGBhcHBseWAuXG4gICAgWyd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnXS5mb3JFYWNoKChwOiBhbnkpID0+IGVsZW1lbnQuc3R5bGVbcF0gPSBudWxsKTtcblxuICAgIGVsZW1lbnQuc3R5bGVbdmVydGljYWxTdHlsZVByb3BlcnR5XSA9IGAke3l9cHhgO1xuICAgIGVsZW1lbnQuc3R5bGVbaG9yaXpvbnRhbFN0eWxlUHJvcGVydHldID0gYCR7eH1weGA7XG4gIH1cblxuICAvKiogUmV0dXJucyB0aGUgYm91bmRpbmcgcG9zaXRpb25zIG9mIHRoZSBwcm92aWRlZCBlbGVtZW50IHdpdGggcmVzcGVjdCB0byB0aGUgdmlld3BvcnQuICovXG4gIHByaXZhdGUgX2dldEVsZW1lbnRCb3VuZHMoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBFbGVtZW50Qm91bmRpbmdQb3NpdGlvbnMge1xuICAgIGNvbnN0IGJvdW5kaW5nQ2xpZW50UmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogYm91bmRpbmdDbGllbnRSZWN0LnRvcCxcbiAgICAgIHJpZ2h0OiBib3VuZGluZ0NsaWVudFJlY3QubGVmdCArIGJvdW5kaW5nQ2xpZW50UmVjdC53aWR0aCxcbiAgICAgIGJvdHRvbTogYm91bmRpbmdDbGllbnRSZWN0LnRvcCArIGJvdW5kaW5nQ2xpZW50UmVjdC5oZWlnaHQsXG4gICAgICBsZWZ0OiBib3VuZGluZ0NsaWVudFJlY3QubGVmdFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU3VidHJhY3RzIHRoZSBhbW91bnQgdGhhdCBhbiBlbGVtZW50IGlzIG92ZXJmbG93aW5nIG9uIGFuIGF4aXMgZnJvbSBpdCdzIGxlbmd0aC5cbiAgICovXG4gIHByaXZhdGUgX3N1YnRyYWN0T3ZlcmZsb3dzKGxlbmd0aDogbnVtYmVyLCAuLi5vdmVyZmxvd3M6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICByZXR1cm4gb3ZlcmZsb3dzLnJlZHVjZSgoY3VycmVudFZhbHVlOiBudW1iZXIsIGN1cnJlbnRPdmVyZmxvdzogbnVtYmVyKSA9PiB7XG4gICAgICByZXR1cm4gY3VycmVudFZhbHVlIC0gTWF0aC5tYXgoY3VycmVudE92ZXJmbG93LCAwKTtcbiAgICB9LCBsZW5ndGgpO1xuICB9XG59XG5cbi8qKiBBIHNpbXBsZSAoeCwgeSkgY29vcmRpbmF0ZS4gKi9cbmludGVyZmFjZSBQb2ludCB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xufVxuXG4vKipcbiAqIEV4cGFuZHMgdGhlIHNpbXBsZSAoeCwgeSkgY29vcmRpbmF0ZSBieSBhZGRpbmcgaW5mbyBhYm91dCB3aGV0aGVyIHRoZVxuICogZWxlbWVudCB3b3VsZCBmaXQgaW5zaWRlIHRoZSB2aWV3cG9ydCBhdCB0aGF0IHBvc2l0aW9uLCBhcyB3ZWxsIGFzXG4gKiBob3cgbXVjaCBvZiB0aGUgZWxlbWVudCB3b3VsZCBiZSB2aXNpYmxlLlxuICovXG5pbnRlcmZhY2UgT3ZlcmxheVBvaW50IGV4dGVuZHMgUG9pbnQge1xuICB2aXNpYmxlQXJlYT86IG51bWJlcjtcbiAgZml0c0luVmlld3BvcnQ/OiBib29sZWFuO1xufVxuIl19