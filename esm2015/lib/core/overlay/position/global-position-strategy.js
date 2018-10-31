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
export class GlobalPositionStrategy {
    constructor() {
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
     * @param {?} value New top offset.
     * @return {?}
     */
    top(value) {
        this._bottomOffset = '';
        this._topOffset = value;
        this._alignItems = 'flex-start';
        return this;
    }
    /**
     * Sets the left position of the overlay. Clears any previously set horizontal position.
     * @param {?} value New left offset.
     * @return {?}
     */
    left(value) {
        this._rightOffset = '';
        this._leftOffset = value;
        this._justifyContent = 'flex-start';
        return this;
    }
    /**
     * Sets the bottom position of the overlay. Clears any previously set vertical position.
     * @param {?} value New bottom offset.
     * @return {?}
     */
    bottom(value) {
        this._topOffset = '';
        this._bottomOffset = value;
        this._alignItems = 'flex-end';
        return this;
    }
    /**
     * Sets the right position of the overlay. Clears any previously set horizontal position.
     * @param {?} value New right offset.
     * @return {?}
     */
    right(value) {
        this._leftOffset = '';
        this._rightOffset = value;
        this._justifyContent = 'flex-end';
        return this;
    }
    /**
     * Sets the overlay width and clears any previously set width.
     * @param {?} value New width for the overlay
     * @return {?}
     */
    width(value) {
        this._width = value;
        // When the width is 100%, we should reset the `left` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.left('0px');
        }
        return this;
    }
    /**
     * Sets the overlay height and clears any previously set height.
     * @param {?} value New height for the overlay
     * @return {?}
     */
    height(value) {
        this._height = value;
        // When the height is 100%, we should reset the `top` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.top('0px');
        }
        return this;
    }
    /**
     * Centers the overlay horizontally with an optional offset.
     * Clears any previously set horizontal position.
     *
     * @param {?=} offset Overlay offset from the horizontal center.
     * @return {?}
     */
    centerHorizontally(offset = '') {
        this.left(offset);
        this._justifyContent = 'center';
        return this;
    }
    /**
     * Centers the overlay vertically with an optional offset.
     * Clears any previously set vertical position.
     *
     * @param {?=} offset Overlay offset from the vertical center.
     * @return {?}
     */
    centerVertically(offset = '') {
        this.top(offset);
        this._alignItems = 'center';
        return this;
    }
    /**
     * Apply the position to the element.
     * \@docs-private
     *
     * @param {?} element Element to which to apply the CSS.
     * @return {?} Resolved when the styles have been applied.
     */
    apply(element) {
        if (!this._wrapper) {
            this._wrapper = document.createElement('div');
            this._wrapper.classList.add('cdk-global-overlay-wrapper');
            element.parentNode.insertBefore(this._wrapper, element);
            this._wrapper.appendChild(element);
        }
        /** @type {?} */
        let styles = element.style;
        /** @type {?} */
        let parentStyles = (/** @type {?} */ (element.parentNode)).style;
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
    }
    /**
     * Removes the wrapper element from the DOM.
     * @return {?}
     */
    dispose() {
        if (this._wrapper && this._wrapper.parentNode) {
            this._wrapper.parentNode.removeChild(this._wrapper);
            this._wrapper = null;
        }
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLXBvc2l0aW9uLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9vdmVybGF5L3Bvc2l0aW9uL2dsb2JhbC1wb3NpdGlvbi1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBU0EsTUFBTTs7NEJBQzJCLFFBQVE7MEJBQ1YsRUFBRTs2QkFDQyxFQUFFOzJCQUNKLEVBQUU7NEJBQ0QsRUFBRTsyQkFDSCxFQUFFOytCQUNFLEVBQUU7c0JBQ1gsRUFBRTt1QkFDRCxFQUFFOzs7Ozs7O0lBUzVCLEdBQUcsQ0FBQyxLQUFhO1FBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUM7UUFDaEMsT0FBTyxJQUFJLENBQUM7S0FDYjs7Ozs7O0lBTUQsSUFBSSxDQUFDLEtBQWE7UUFDaEIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxZQUFZLENBQUM7UUFDcEMsT0FBTyxJQUFJLENBQUM7S0FDYjs7Ozs7O0lBTUQsTUFBTSxDQUFDLEtBQWE7UUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUM7S0FDYjs7Ozs7O0lBTUQsS0FBSyxDQUFDLEtBQWE7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFV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ZWd5JztcblxuXG4vKipcbiAqIEEgc3RyYXRlZ3kgZm9yIHBvc2l0aW9uaW5nIG92ZXJsYXlzLiBVc2luZyB0aGlzIHN0cmF0ZWd5LCBhbiBvdmVybGF5IGlzIGdpdmVuIGFuXG4gKiBleHBsaWNpdCBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGUgYnJvd3NlcidzIHZpZXdwb3J0LiBXZSB1c2UgZmxleGJveCwgaW5zdGVhZCBvZlxuICogdHJhbnNmb3JtcywgaW4gb3JkZXIgdG8gYXZvaWQgaXNzdWVzIHdpdGggc3VicGl4ZWwgcmVuZGVyaW5nIHdoaWNoIGNhbiBjYXVzZSB0aGVcbiAqIGVsZW1lbnQgdG8gYmVjb21lIGJsdXJyeS5cbiAqL1xuZXhwb3J0IGNsYXNzIEdsb2JhbFBvc2l0aW9uU3RyYXRlZ3kgaW1wbGVtZW50cyBQb3NpdGlvblN0cmF0ZWd5IHtcbiAgcHJpdmF0ZSBfY3NzUG9zaXRpb246IHN0cmluZyA9ICdzdGF0aWMnO1xuICBwcml2YXRlIF90b3BPZmZzZXQ6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIF9ib3R0b21PZmZzZXQ6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIF9sZWZ0T2Zmc2V0OiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSBfcmlnaHRPZmZzZXQ6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIF9hbGlnbkl0ZW1zOiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSBfanVzdGlmeUNvbnRlbnQ6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIF93aWR0aDogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgX2hlaWdodDogc3RyaW5nID0gJyc7XG5cbiAgLyogQSBsYXppbHktY3JlYXRlZCB3cmFwcGVyIGZvciB0aGUgb3ZlcmxheSBlbGVtZW50IHRoYXQgaXMgdXNlZCBhcyBhIGZsZXggY29udGFpbmVyLiAgKi9cbiAgcHJpdmF0ZSBfd3JhcHBlcjogSFRNTEVsZW1lbnQ7XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRvcCBwb3NpdGlvbiBvZiB0aGUgb3ZlcmxheS4gQ2xlYXJzIGFueSBwcmV2aW91c2x5IHNldCB2ZXJ0aWNhbCBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHZhbHVlIE5ldyB0b3Agb2Zmc2V0LlxuICAgKi9cbiAgdG9wKHZhbHVlOiBzdHJpbmcpOiB0aGlzIHtcbiAgICB0aGlzLl9ib3R0b21PZmZzZXQgPSAnJztcbiAgICB0aGlzLl90b3BPZmZzZXQgPSB2YWx1ZTtcbiAgICB0aGlzLl9hbGlnbkl0ZW1zID0gJ2ZsZXgtc3RhcnQnO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxlZnQgcG9zaXRpb24gb2YgdGhlIG92ZXJsYXkuIENsZWFycyBhbnkgcHJldmlvdXNseSBzZXQgaG9yaXpvbnRhbCBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHZhbHVlIE5ldyBsZWZ0IG9mZnNldC5cbiAgICovXG4gIGxlZnQodmFsdWU6IHN0cmluZyk6IHRoaXMge1xuICAgIHRoaXMuX3JpZ2h0T2Zmc2V0ID0gJyc7XG4gICAgdGhpcy5fbGVmdE9mZnNldCA9IHZhbHVlO1xuICAgIHRoaXMuX2p1c3RpZnlDb250ZW50ID0gJ2ZsZXgtc3RhcnQnO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGJvdHRvbSBwb3NpdGlvbiBvZiB0aGUgb3ZlcmxheS4gQ2xlYXJzIGFueSBwcmV2aW91c2x5IHNldCB2ZXJ0aWNhbCBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHZhbHVlIE5ldyBib3R0b20gb2Zmc2V0LlxuICAgKi9cbiAgYm90dG9tKHZhbHVlOiBzdHJpbmcpOiB0aGlzIHtcbiAgICB0aGlzLl90b3BPZmZzZXQgPSAnJztcbiAgICB0aGlzLl9ib3R0b21PZmZzZXQgPSB2YWx1ZTtcbiAgICB0aGlzLl9hbGlnbkl0ZW1zID0gJ2ZsZXgtZW5kJztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSByaWdodCBwb3NpdGlvbiBvZiB0aGUgb3ZlcmxheS4gQ2xlYXJzIGFueSBwcmV2aW91c2x5IHNldCBob3Jpem9udGFsIHBvc2l0aW9uLlxuICAgKiBAcGFyYW0gdmFsdWUgTmV3IHJpZ2h0IG9mZnNldC5cbiAgICovXG4gIHJpZ2h0KHZhbHVlOiBzdHJpbmcpOiB0aGlzIHtcbiAgICB0aGlzLl9sZWZ0T2Zmc2V0ID0gJyc7XG4gICAgdGhpcy5fcmlnaHRPZmZzZXQgPSB2YWx1ZTtcbiAgICB0aGlzLl9qdXN0aWZ5Q29udGVudCA9ICdmbGV4LWVuZCc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgb3ZlcmxheSB3aWR0aCBhbmQgY2xlYXJzIGFueSBwcmV2aW91c2x5IHNldCB3aWR0aC5cbiAgICogQHBhcmFtIHZhbHVlIE5ldyB3aWR0aCBmb3IgdGhlIG92ZXJsYXlcbiAgICovXG4gIHdpZHRoKHZhbHVlOiBzdHJpbmcpOiB0aGlzIHtcbiAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xuXG4gICAgLy8gV2hlbiB0aGUgd2lkdGggaXMgMTAwJSwgd2Ugc2hvdWxkIHJlc2V0IHRoZSBgbGVmdGAgYW5kIHRoZSBvZmZzZXQsXG4gICAgLy8gaW4gb3JkZXIgdG8gZW5zdXJlIHRoYXQgdGhlIGVsZW1lbnQgaXMgZmx1c2ggYWdhaW5zdCB0aGUgdmlld3BvcnQgZWRnZS5cbiAgICBpZiAodmFsdWUgPT09ICcxMDAlJykge1xuICAgICAgdGhpcy5sZWZ0KCcwcHgnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBvdmVybGF5IGhlaWdodCBhbmQgY2xlYXJzIGFueSBwcmV2aW91c2x5IHNldCBoZWlnaHQuXG4gICAqIEBwYXJhbSB2YWx1ZSBOZXcgaGVpZ2h0IGZvciB0aGUgb3ZlcmxheVxuICAgKi9cbiAgaGVpZ2h0KHZhbHVlOiBzdHJpbmcpOiB0aGlzIHtcbiAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcblxuICAgIC8vIFdoZW4gdGhlIGhlaWdodCBpcyAxMDAlLCB3ZSBzaG91bGQgcmVzZXQgdGhlIGB0b3BgIGFuZCB0aGUgb2Zmc2V0LFxuICAgIC8vIGluIG9yZGVyIHRvIGVuc3VyZSB0aGF0IHRoZSBlbGVtZW50IGlzIGZsdXNoIGFnYWluc3QgdGhlIHZpZXdwb3J0IGVkZ2UuXG4gICAgaWYgKHZhbHVlID09PSAnMTAwJScpIHtcbiAgICAgIHRoaXMudG9wKCcwcHgnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDZW50ZXJzIHRoZSBvdmVybGF5IGhvcml6b250YWxseSB3aXRoIGFuIG9wdGlvbmFsIG9mZnNldC5cbiAgICogQ2xlYXJzIGFueSBwcmV2aW91c2x5IHNldCBob3Jpem9udGFsIHBvc2l0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gb2Zmc2V0IE92ZXJsYXkgb2Zmc2V0IGZyb20gdGhlIGhvcml6b250YWwgY2VudGVyLlxuICAgKi9cbiAgY2VudGVySG9yaXpvbnRhbGx5KG9mZnNldCA9ICcnKTogdGhpcyB7XG4gICAgdGhpcy5sZWZ0KG9mZnNldCk7XG4gICAgdGhpcy5fanVzdGlmeUNvbnRlbnQgPSAnY2VudGVyJztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDZW50ZXJzIHRoZSBvdmVybGF5IHZlcnRpY2FsbHkgd2l0aCBhbiBvcHRpb25hbCBvZmZzZXQuXG4gICAqIENsZWFycyBhbnkgcHJldmlvdXNseSBzZXQgdmVydGljYWwgcG9zaXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSBvZmZzZXQgT3ZlcmxheSBvZmZzZXQgZnJvbSB0aGUgdmVydGljYWwgY2VudGVyLlxuICAgKi9cbiAgY2VudGVyVmVydGljYWxseShvZmZzZXQgPSAnJyk6IHRoaXMge1xuICAgIHRoaXMudG9wKG9mZnNldCk7XG4gICAgdGhpcy5fYWxpZ25JdGVtcyA9ICdjZW50ZXInO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoZSBwb3NpdGlvbiB0byB0aGUgZWxlbWVudC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKlxuICAgKiBAcGFyYW0gZWxlbWVudCBFbGVtZW50IHRvIHdoaWNoIHRvIGFwcGx5IHRoZSBDU1MuXG4gICAqIEByZXR1cm5zIFJlc29sdmVkIHdoZW4gdGhlIHN0eWxlcyBoYXZlIGJlZW4gYXBwbGllZC5cbiAgICovXG4gIGFwcGx5KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLl93cmFwcGVyKSB7XG4gICAgICB0aGlzLl93cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0aGlzLl93cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2Nkay1nbG9iYWwtb3ZlcmxheS13cmFwcGVyJyk7XG4gICAgICBlbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuX3dyYXBwZXIsIGVsZW1lbnQpO1xuICAgICAgdGhpcy5fd3JhcHBlci5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9XG5cbiAgICBsZXQgc3R5bGVzID0gZWxlbWVudC5zdHlsZTtcbiAgICBsZXQgcGFyZW50U3R5bGVzID0gKGVsZW1lbnQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudCkuc3R5bGU7XG5cbiAgICBzdHlsZXMucG9zaXRpb24gPSB0aGlzLl9jc3NQb3NpdGlvbjtcbiAgICBzdHlsZXMubWFyZ2luVG9wID0gdGhpcy5fdG9wT2Zmc2V0O1xuICAgIHN0eWxlcy5tYXJnaW5MZWZ0ID0gdGhpcy5fbGVmdE9mZnNldDtcbiAgICBzdHlsZXMubWFyZ2luQm90dG9tID0gdGhpcy5fYm90dG9tT2Zmc2V0O1xuICAgIHN0eWxlcy5tYXJnaW5SaWdodCA9IHRoaXMuX3JpZ2h0T2Zmc2V0O1xuICAgIHN0eWxlcy53aWR0aCA9IHRoaXMuX3dpZHRoO1xuICAgIHN0eWxlcy5oZWlnaHQgPSB0aGlzLl9oZWlnaHQ7XG5cbiAgICBwYXJlbnRTdHlsZXMuanVzdGlmeUNvbnRlbnQgPSB0aGlzLl9qdXN0aWZ5Q29udGVudDtcbiAgICBwYXJlbnRTdHlsZXMuYWxpZ25JdGVtcyA9IHRoaXMuX2FsaWduSXRlbXM7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHdyYXBwZXIgZWxlbWVudCBmcm9tIHRoZSBET00uXG4gICAqL1xuICBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl93cmFwcGVyICYmIHRoaXMuX3dyYXBwZXIucGFyZW50Tm9kZSkge1xuICAgICAgdGhpcy5fd3JhcHBlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuX3dyYXBwZXIpO1xuICAgICAgdGhpcy5fd3JhcHBlciA9IG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=