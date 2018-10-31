/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport. We use flexbox, instead of
 * transforms, in order to avoid issues with subpixel rendering which can cause the
 * element to become blurry.
 */
var /**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport. We use flexbox, instead of
 * transforms, in order to avoid issues with subpixel rendering which can cause the
 * element to become blurry.
 */
GlobalPositionStrategy = /** @class */ (function () {
    function GlobalPositionStrategy() {
        this._cssPosition = 'static';
        this._topOffset = '';
        this._bottomOffset = '';
        this._leftOffset = '';
        this._rightOffset = '';
        this._alignItems = '';
        this._justifyContent = '';
        this._width = '';
        this._height = '';
    }
    /**
     * Sets the top position of the overlay. Clears any previously set vertical position.
     * @param value New top offset.
     */
    /**
     * Sets the top position of the overlay. Clears any previously set vertical position.
     * @param {?} value New top offset.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.top = /**
     * Sets the top position of the overlay. Clears any previously set vertical position.
     * @param {?} value New top offset.
     * @return {?}
     */
    function (value) {
        this._bottomOffset = '';
        this._topOffset = value;
        this._alignItems = 'flex-start';
        return this;
    };
    /**
     * Sets the left position of the overlay. Clears any previously set horizontal position.
     * @param value New left offset.
     */
    /**
     * Sets the left position of the overlay. Clears any previously set horizontal position.
     * @param {?} value New left offset.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.left = /**
     * Sets the left position of the overlay. Clears any previously set horizontal position.
     * @param {?} value New left offset.
     * @return {?}
     */
    function (value) {
        this._rightOffset = '';
        this._leftOffset = value;
        this._justifyContent = 'flex-start';
        return this;
    };
    /**
     * Sets the bottom position of the overlay. Clears any previously set vertical position.
     * @param value New bottom offset.
     */
    /**
     * Sets the bottom position of the overlay. Clears any previously set vertical position.
     * @param {?} value New bottom offset.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.bottom = /**
     * Sets the bottom position of the overlay. Clears any previously set vertical position.
     * @param {?} value New bottom offset.
     * @return {?}
     */
    function (value) {
        this._topOffset = '';
        this._bottomOffset = value;
        this._alignItems = 'flex-end';
        return this;
    };
    /**
     * Sets the right position of the overlay. Clears any previously set horizontal position.
     * @param value New right offset.
     */
    /**
     * Sets the right position of the overlay. Clears any previously set horizontal position.
     * @param {?} value New right offset.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.right = /**
     * Sets the right position of the overlay. Clears any previously set horizontal position.
     * @param {?} value New right offset.
     * @return {?}
     */
    function (value) {
        this._leftOffset = '';
        this._rightOffset = value;
        this._justifyContent = 'flex-end';
        return this;
    };
    /**
     * Sets the overlay width and clears any previously set width.
     * @param value New width for the overlay
     */
    /**
     * Sets the overlay width and clears any previously set width.
     * @param {?} value New width for the overlay
     * @return {?}
     */
    GlobalPositionStrategy.prototype.width = /**
     * Sets the overlay width and clears any previously set width.
     * @param {?} value New width for the overlay
     * @return {?}
     */
    function (value) {
        this._width = value;
        // When the width is 100%, we should reset the `left` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.left('0px');
        }
        return this;
    };
    /**
     * Sets the overlay height and clears any previously set height.
     * @param value New height for the overlay
     */
    /**
     * Sets the overlay height and clears any previously set height.
     * @param {?} value New height for the overlay
     * @return {?}
     */
    GlobalPositionStrategy.prototype.height = /**
     * Sets the overlay height and clears any previously set height.
     * @param {?} value New height for the overlay
     * @return {?}
     */
    function (value) {
        this._height = value;
        // When the height is 100%, we should reset the `top` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.top('0px');
        }
        return this;
    };
    /**
     * Centers the overlay horizontally with an optional offset.
     * Clears any previously set horizontal position.
     *
     * @param offset Overlay offset from the horizontal center.
     */
    /**
     * Centers the overlay horizontally with an optional offset.
     * Clears any previously set horizontal position.
     *
     * @param {?=} offset Overlay offset from the horizontal center.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.centerHorizontally = /**
     * Centers the overlay horizontally with an optional offset.
     * Clears any previously set horizontal position.
     *
     * @param {?=} offset Overlay offset from the horizontal center.
     * @return {?}
     */
    function (offset) {
        if (offset === void 0) { offset = ''; }
        this.left(offset);
        this._justifyContent = 'center';
        return this;
    };
    /**
     * Centers the overlay vertically with an optional offset.
     * Clears any previously set vertical position.
     *
     * @param offset Overlay offset from the vertical center.
     */
    /**
     * Centers the overlay vertically with an optional offset.
     * Clears any previously set vertical position.
     *
     * @param {?=} offset Overlay offset from the vertical center.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.centerVertically = /**
     * Centers the overlay vertically with an optional offset.
     * Clears any previously set vertical position.
     *
     * @param {?=} offset Overlay offset from the vertical center.
     * @return {?}
     */
    function (offset) {
        if (offset === void 0) { offset = ''; }
        this.top(offset);
        this._alignItems = 'center';
        return this;
    };
    /**
     * Apply the position to the element.
     * @docs-private
     *
     * @param element Element to which to apply the CSS.
     * @returns Resolved when the styles have been applied.
     */
    /**
     * Apply the position to the element.
     * \@docs-private
     *
     * @param {?} element Element to which to apply the CSS.
     * @return {?} Resolved when the styles have been applied.
     */
    GlobalPositionStrategy.prototype.apply = /**
     * Apply the position to the element.
     * \@docs-private
     *
     * @param {?} element Element to which to apply the CSS.
     * @return {?} Resolved when the styles have been applied.
     */
    function (element) {
        if (!this._wrapper) {
            this._wrapper = document.createElement('div');
            this._wrapper.classList.add('cdk-global-overlay-wrapper');
            element.parentNode.insertBefore(this._wrapper, element);
            this._wrapper.appendChild(element);
        }
        /** @type {?} */
        var styles = element.style;
        /** @type {?} */
        var parentStyles = (/** @type {?} */ (element.parentNode)).style;
        styles.position = this._cssPosition;
        styles.marginTop = this._topOffset;
        styles.marginLeft = this._leftOffset;
        styles.marginBottom = this._bottomOffset;
        styles.marginRight = this._rightOffset;
        styles.width = this._width;
        styles.height = this._height;
        parentStyles.justifyContent = this._justifyContent;
        parentStyles.alignItems = this._alignItems;
        return Promise.resolve(null);
    };
    /**
     * Removes the wrapper element from the DOM.
     */
    /**
     * Removes the wrapper element from the DOM.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.dispose = /**
     * Removes the wrapper element from the DOM.
     * @return {?}
     */
    function () {
        if (this._wrapper && this._wrapper.parentNode) {
            this._wrapper.parentNode.removeChild(this._wrapper);
            this._wrapper = null;
        }
    };
    return GlobalPositionStrategy;
}());
/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport. We use flexbox, instead of
 * transforms, in order to avoid issues with subpixel rendering which can cause the
 * element to become blurry.
 */
export { GlobalPositionStrategy };
if (false) {
    /** @type {?} */
    GlobalPositionStrategy.prototype._cssPosition;
    /** @type {?} */
    GlobalPositionStrategy.prototype._topOffset;
    /** @type {?} */
    GlobalPositionStrategy.prototype._bottomOffset;
    /** @type {?} */
    GlobalPositionStrategy.prototype._leftOffset;
    /** @type {?} */
    GlobalPositionStrategy.prototype._rightOffset;
    /** @type {?} */
    GlobalPositionStrategy.prototype._alignItems;
    /** @type {?} */
    GlobalPositionStrategy.prototype._justifyContent;
    /** @type {?} */
    GlobalPositionStrategy.prototype._width;
    /** @type {?} */
    GlobalPositionStrategy.prototype._height;
    /** @type {?} */
    GlobalPositionStrategy.prototype._wrapper;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLXBvc2l0aW9uLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9vdmVybGF5L3Bvc2l0aW9uL2dsb2JhbC1wb3NpdGlvbi1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBU0E7Ozs7OztBQUFBOzs0QkFDaUMsUUFBUTswQkFDVixFQUFFOzZCQUNDLEVBQUU7MkJBQ0osRUFBRTs0QkFDRCxFQUFFOzJCQUNILEVBQUU7K0JBQ0UsRUFBRTtzQkFDWCxFQUFFO3VCQUNELEVBQUU7O0lBSzVCOzs7T0FHRzs7Ozs7O0lBQ0gsb0NBQUc7Ozs7O0lBQUgsVUFBSSxLQUFhO1FBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUM7UUFDaEMsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gscUNBQUk7Ozs7O0lBQUosVUFBSyxLQUFhO1FBQ2hCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsWUFBWSxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRDs7O09BR0c7Ozs7OztJQUNILHVDQUFNOzs7OztJQUFOLFVBQU8sS0FBYTtRQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUM5QixPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxzQ0FBSzs7Ozs7SUFBTCxVQUFNLEtBQWE7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUM7UUFDbEMsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsc0NBQUs7Ozs7O0lBQUwsVUFBTSxLQUFhO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOzs7UUFJcEIsSUFBSSxLQUFLLEtBQUssTUFBTSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEI7UUFFRCxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCx1Q0FBTTs7Ozs7SUFBTixVQUFPLEtBQWE7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7OztRQUlyQixJQUFJLEtBQUssS0FBSyxNQUFNLEVBQUU7WUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqQjtRQUVELE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSCxtREFBa0I7Ozs7Ozs7SUFBbEIsVUFBbUIsTUFBVztRQUFYLHVCQUFBLEVBQUEsV0FBVztRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSCxpREFBZ0I7Ozs7Ozs7SUFBaEIsVUFBaUIsTUFBVztRQUFYLHVCQUFBLEVBQUEsV0FBVztRQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO1FBQzVCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRDs7Ozs7O09BTUc7Ozs7Ozs7O0lBQ0gsc0NBQUs7Ozs7Ozs7SUFBTCxVQUFNLE9BQW9CO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUMxRCxPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3BDOztRQUVELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7O1FBQzNCLElBQUksWUFBWSxHQUFHLG1CQUFDLE9BQU8sQ0FBQyxVQUF5QixFQUFDLENBQUMsS0FBSyxDQUFDO1FBRTdELE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNwQyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDbkMsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN6QyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDdkMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUU3QixZQUFZLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDbkQsWUFBWSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRTNDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5QjtJQUVEOztPQUVHOzs7OztJQUNILHdDQUFPOzs7O0lBQVA7UUFDRSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN0QjtLQUNGO2lDQW5LSDtJQW9LQyxDQUFBOzs7Ozs7O0FBM0pELGtDQTJKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UG9zaXRpb25TdHJhdGVneX0gZnJvbSAnLi9wb3NpdGlvbi1zdHJhdGVneSc7XG5cblxuLyoqXG4gKiBBIHN0cmF0ZWd5IGZvciBwb3NpdGlvbmluZyBvdmVybGF5cy4gVXNpbmcgdGhpcyBzdHJhdGVneSwgYW4gb3ZlcmxheSBpcyBnaXZlbiBhblxuICogZXhwbGljaXQgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlIGJyb3dzZXIncyB2aWV3cG9ydC4gV2UgdXNlIGZsZXhib3gsIGluc3RlYWQgb2ZcbiAqIHRyYW5zZm9ybXMsIGluIG9yZGVyIHRvIGF2b2lkIGlzc3VlcyB3aXRoIHN1YnBpeGVsIHJlbmRlcmluZyB3aGljaCBjYW4gY2F1c2UgdGhlXG4gKiBlbGVtZW50IHRvIGJlY29tZSBibHVycnkuXG4gKi9cbmV4cG9ydCBjbGFzcyBHbG9iYWxQb3NpdGlvblN0cmF0ZWd5IGltcGxlbWVudHMgUG9zaXRpb25TdHJhdGVneSB7XG4gIHByaXZhdGUgX2Nzc1Bvc2l0aW9uOiBzdHJpbmcgPSAnc3RhdGljJztcbiAgcHJpdmF0ZSBfdG9wT2Zmc2V0OiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSBfYm90dG9tT2Zmc2V0OiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSBfbGVmdE9mZnNldDogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgX3JpZ2h0T2Zmc2V0OiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSBfYWxpZ25JdGVtczogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgX2p1c3RpZnlDb250ZW50OiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSBfd2lkdGg6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIF9oZWlnaHQ6IHN0cmluZyA9ICcnO1xuXG4gIC8qIEEgbGF6aWx5LWNyZWF0ZWQgd3JhcHBlciBmb3IgdGhlIG92ZXJsYXkgZWxlbWVudCB0aGF0IGlzIHVzZWQgYXMgYSBmbGV4IGNvbnRhaW5lci4gICovXG4gIHByaXZhdGUgX3dyYXBwZXI6IEhUTUxFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0b3AgcG9zaXRpb24gb2YgdGhlIG92ZXJsYXkuIENsZWFycyBhbnkgcHJldmlvdXNseSBzZXQgdmVydGljYWwgcG9zaXRpb24uXG4gICAqIEBwYXJhbSB2YWx1ZSBOZXcgdG9wIG9mZnNldC5cbiAgICovXG4gIHRvcCh2YWx1ZTogc3RyaW5nKTogdGhpcyB7XG4gICAgdGhpcy5fYm90dG9tT2Zmc2V0ID0gJyc7XG4gICAgdGhpcy5fdG9wT2Zmc2V0ID0gdmFsdWU7XG4gICAgdGhpcy5fYWxpZ25JdGVtcyA9ICdmbGV4LXN0YXJ0JztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsZWZ0IHBvc2l0aW9uIG9mIHRoZSBvdmVybGF5LiBDbGVhcnMgYW55IHByZXZpb3VzbHkgc2V0IGhvcml6b250YWwgcG9zaXRpb24uXG4gICAqIEBwYXJhbSB2YWx1ZSBOZXcgbGVmdCBvZmZzZXQuXG4gICAqL1xuICBsZWZ0KHZhbHVlOiBzdHJpbmcpOiB0aGlzIHtcbiAgICB0aGlzLl9yaWdodE9mZnNldCA9ICcnO1xuICAgIHRoaXMuX2xlZnRPZmZzZXQgPSB2YWx1ZTtcbiAgICB0aGlzLl9qdXN0aWZ5Q29udGVudCA9ICdmbGV4LXN0YXJ0JztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBib3R0b20gcG9zaXRpb24gb2YgdGhlIG92ZXJsYXkuIENsZWFycyBhbnkgcHJldmlvdXNseSBzZXQgdmVydGljYWwgcG9zaXRpb24uXG4gICAqIEBwYXJhbSB2YWx1ZSBOZXcgYm90dG9tIG9mZnNldC5cbiAgICovXG4gIGJvdHRvbSh2YWx1ZTogc3RyaW5nKTogdGhpcyB7XG4gICAgdGhpcy5fdG9wT2Zmc2V0ID0gJyc7XG4gICAgdGhpcy5fYm90dG9tT2Zmc2V0ID0gdmFsdWU7XG4gICAgdGhpcy5fYWxpZ25JdGVtcyA9ICdmbGV4LWVuZCc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgcmlnaHQgcG9zaXRpb24gb2YgdGhlIG92ZXJsYXkuIENsZWFycyBhbnkgcHJldmlvdXNseSBzZXQgaG9yaXpvbnRhbCBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHZhbHVlIE5ldyByaWdodCBvZmZzZXQuXG4gICAqL1xuICByaWdodCh2YWx1ZTogc3RyaW5nKTogdGhpcyB7XG4gICAgdGhpcy5fbGVmdE9mZnNldCA9ICcnO1xuICAgIHRoaXMuX3JpZ2h0T2Zmc2V0ID0gdmFsdWU7XG4gICAgdGhpcy5fanVzdGlmeUNvbnRlbnQgPSAnZmxleC1lbmQnO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG92ZXJsYXkgd2lkdGggYW5kIGNsZWFycyBhbnkgcHJldmlvdXNseSBzZXQgd2lkdGguXG4gICAqIEBwYXJhbSB2YWx1ZSBOZXcgd2lkdGggZm9yIHRoZSBvdmVybGF5XG4gICAqL1xuICB3aWR0aCh2YWx1ZTogc3RyaW5nKTogdGhpcyB7XG4gICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcblxuICAgIC8vIFdoZW4gdGhlIHdpZHRoIGlzIDEwMCUsIHdlIHNob3VsZCByZXNldCB0aGUgYGxlZnRgIGFuZCB0aGUgb2Zmc2V0LFxuICAgIC8vIGluIG9yZGVyIHRvIGVuc3VyZSB0aGF0IHRoZSBlbGVtZW50IGlzIGZsdXNoIGFnYWluc3QgdGhlIHZpZXdwb3J0IGVkZ2UuXG4gICAgaWYgKHZhbHVlID09PSAnMTAwJScpIHtcbiAgICAgIHRoaXMubGVmdCgnMHB4Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgb3ZlcmxheSBoZWlnaHQgYW5kIGNsZWFycyBhbnkgcHJldmlvdXNseSBzZXQgaGVpZ2h0LlxuICAgKiBAcGFyYW0gdmFsdWUgTmV3IGhlaWdodCBmb3IgdGhlIG92ZXJsYXlcbiAgICovXG4gIGhlaWdodCh2YWx1ZTogc3RyaW5nKTogdGhpcyB7XG4gICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XG5cbiAgICAvLyBXaGVuIHRoZSBoZWlnaHQgaXMgMTAwJSwgd2Ugc2hvdWxkIHJlc2V0IHRoZSBgdG9wYCBhbmQgdGhlIG9mZnNldCxcbiAgICAvLyBpbiBvcmRlciB0byBlbnN1cmUgdGhhdCB0aGUgZWxlbWVudCBpcyBmbHVzaCBhZ2FpbnN0IHRoZSB2aWV3cG9ydCBlZGdlLlxuICAgIGlmICh2YWx1ZSA9PT0gJzEwMCUnKSB7XG4gICAgICB0aGlzLnRvcCgnMHB4Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ2VudGVycyB0aGUgb3ZlcmxheSBob3Jpem9udGFsbHkgd2l0aCBhbiBvcHRpb25hbCBvZmZzZXQuXG4gICAqIENsZWFycyBhbnkgcHJldmlvdXNseSBzZXQgaG9yaXpvbnRhbCBwb3NpdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIG9mZnNldCBPdmVybGF5IG9mZnNldCBmcm9tIHRoZSBob3Jpem9udGFsIGNlbnRlci5cbiAgICovXG4gIGNlbnRlckhvcml6b250YWxseShvZmZzZXQgPSAnJyk6IHRoaXMge1xuICAgIHRoaXMubGVmdChvZmZzZXQpO1xuICAgIHRoaXMuX2p1c3RpZnlDb250ZW50ID0gJ2NlbnRlcic7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ2VudGVycyB0aGUgb3ZlcmxheSB2ZXJ0aWNhbGx5IHdpdGggYW4gb3B0aW9uYWwgb2Zmc2V0LlxuICAgKiBDbGVhcnMgYW55IHByZXZpb3VzbHkgc2V0IHZlcnRpY2FsIHBvc2l0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gb2Zmc2V0IE92ZXJsYXkgb2Zmc2V0IGZyb20gdGhlIHZlcnRpY2FsIGNlbnRlci5cbiAgICovXG4gIGNlbnRlclZlcnRpY2FsbHkob2Zmc2V0ID0gJycpOiB0aGlzIHtcbiAgICB0aGlzLnRvcChvZmZzZXQpO1xuICAgIHRoaXMuX2FsaWduSXRlbXMgPSAnY2VudGVyJztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGUgcG9zaXRpb24gdG8gdGhlIGVsZW1lbnQuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnQgRWxlbWVudCB0byB3aGljaCB0byBhcHBseSB0aGUgQ1NTLlxuICAgKiBAcmV0dXJucyBSZXNvbHZlZCB3aGVuIHRoZSBzdHlsZXMgaGF2ZSBiZWVuIGFwcGxpZWQuXG4gICAqL1xuICBhcHBseShlbGVtZW50OiBIVE1MRWxlbWVudCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdGhpcy5fd3JhcHBlcikge1xuICAgICAgdGhpcy5fd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGhpcy5fd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdjZGstZ2xvYmFsLW92ZXJsYXktd3JhcHBlcicpO1xuICAgICAgZWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLl93cmFwcGVyLCBlbGVtZW50KTtcbiAgICAgIHRoaXMuX3dyYXBwZXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgbGV0IHN0eWxlcyA9IGVsZW1lbnQuc3R5bGU7XG4gICAgbGV0IHBhcmVudFN0eWxlcyA9IChlbGVtZW50LnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQpLnN0eWxlO1xuXG4gICAgc3R5bGVzLnBvc2l0aW9uID0gdGhpcy5fY3NzUG9zaXRpb247XG4gICAgc3R5bGVzLm1hcmdpblRvcCA9IHRoaXMuX3RvcE9mZnNldDtcbiAgICBzdHlsZXMubWFyZ2luTGVmdCA9IHRoaXMuX2xlZnRPZmZzZXQ7XG4gICAgc3R5bGVzLm1hcmdpbkJvdHRvbSA9IHRoaXMuX2JvdHRvbU9mZnNldDtcbiAgICBzdHlsZXMubWFyZ2luUmlnaHQgPSB0aGlzLl9yaWdodE9mZnNldDtcbiAgICBzdHlsZXMud2lkdGggPSB0aGlzLl93aWR0aDtcbiAgICBzdHlsZXMuaGVpZ2h0ID0gdGhpcy5faGVpZ2h0O1xuXG4gICAgcGFyZW50U3R5bGVzLmp1c3RpZnlDb250ZW50ID0gdGhpcy5fanVzdGlmeUNvbnRlbnQ7XG4gICAgcGFyZW50U3R5bGVzLmFsaWduSXRlbXMgPSB0aGlzLl9hbGlnbkl0ZW1zO1xuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSB3cmFwcGVyIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxuICAgKi9cbiAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fd3JhcHBlciAmJiB0aGlzLl93cmFwcGVyLnBhcmVudE5vZGUpIHtcbiAgICAgIHRoaXMuX3dyYXBwZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLl93cmFwcGVyKTtcbiAgICAgIHRoaXMuX3dyYXBwZXIgPSBudWxsO1xuICAgIH1cbiAgfVxufVxuIl19