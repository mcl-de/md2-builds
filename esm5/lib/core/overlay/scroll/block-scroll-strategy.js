/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
var /**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
BlockScrollStrategy = /** @class */ (function () {
    function BlockScrollStrategy(_viewportRuler) {
        this._viewportRuler = _viewportRuler;
        this._previousHTMLStyles = { top: '', left: '' };
        this._isEnabled = false;
    }
    /**
     * @return {?}
     */
    BlockScrollStrategy.prototype.attach = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    BlockScrollStrategy.prototype.enable = /**
     * @return {?}
     */
    function () {
        if (this._canBeEnabled()) {
            /** @type {?} */
            var root = document.documentElement;
            this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition();
            // Cache the previous inline styles in case the user had set them.
            this._previousHTMLStyles.left = root.style.left;
            this._previousHTMLStyles.top = root.style.top;
            // Note: we're using the `html` node, instead of the `body`, because the `body` may
            // have the user agent margin, whereas the `html` is guaranteed not to have one.
            root.style.left = -this._previousScrollPosition.left + "px";
            root.style.top = -this._previousScrollPosition.top + "px";
            root.classList.add('cdk-global-scrollblock');
            this._isEnabled = true;
        }
    };
    /**
     * @return {?}
     */
    BlockScrollStrategy.prototype.disable = /**
     * @return {?}
     */
    function () {
        if (this._isEnabled) {
            this._isEnabled = false;
            document.documentElement.style.left = this._previousHTMLStyles.left;
            document.documentElement.style.top = this._previousHTMLStyles.top;
            document.documentElement.classList.remove('cdk-global-scrollblock');
            window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top);
        }
    };
    /**
     * @return {?}
     */
    BlockScrollStrategy.prototype._canBeEnabled = /**
     * @return {?}
     */
    function () {
        // Since the scroll strategies can't be singletons, we have to use a global CSS class
        // (`cdk-global-scrollblock`) to make sure that we don't try to disable global
        // scrolling multiple times.
        if (document.documentElement.classList.contains('cdk-global-scrollblock') || this._isEnabled) {
            return false;
        }
        /** @type {?} */
        var body = document.body;
        /** @type {?} */
        var viewport = this._viewportRuler.getViewportRect();
        return body.scrollHeight > viewport.height || body.scrollWidth > viewport.width;
    };
    return BlockScrollStrategy;
}());
/**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
export { BlockScrollStrategy };
if (false) {
    /** @type {?} */
    BlockScrollStrategy.prototype._previousHTMLStyles;
    /** @type {?} */
    BlockScrollStrategy.prototype._previousScrollPosition;
    /** @type {?} */
    BlockScrollStrategy.prototype._isEnabled;
    /** @type {?} */
    BlockScrollStrategy.prototype._viewportRuler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2stc2Nyb2xsLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9vdmVybGF5L3Njcm9sbC9ibG9jay1zY3JvbGwtc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU1BOzs7QUFBQTtJQUtFLDZCQUFvQixjQUE2QjtRQUE3QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTttQ0FKbkIsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7MEJBRTlCLEtBQUs7S0FFNEI7Ozs7SUFFdEQsb0NBQU07OztJQUFOLGVBQVk7Ozs7SUFFWixvQ0FBTTs7O0lBQU47UUFDRSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRTs7WUFDeEIsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQztZQUV0QyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDOztZQUcvRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ2hELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7OztZQUk5QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLE9BQUksQ0FBQztZQUM1RCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLE9BQUksQ0FBQztZQUMxRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO0tBQ0Y7Ozs7SUFFRCxxQ0FBTzs7O0lBQVA7UUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7WUFDcEUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUM7WUFDbEUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDcEUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwRjtLQUNGOzs7O0lBRU8sMkNBQWE7Ozs7Ozs7UUFJbkIsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzVGLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7O1FBRUQsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQzs7UUFDM0IsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7OzhCQXREcEY7SUF3REMsQ0FBQTs7OztBQWxERCwrQkFrREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Njcm9sbFN0cmF0ZWd5fSBmcm9tICcuL3Njcm9sbC1zdHJhdGVneSc7XG5pbXBvcnQge1ZpZXdwb3J0UnVsZXJ9IGZyb20gJy4uL3Bvc2l0aW9uL3ZpZXdwb3J0LXJ1bGVyJztcblxuLyoqXG4gKiBTdHJhdGVneSB0aGF0IHdpbGwgcHJldmVudCB0aGUgdXNlciBmcm9tIHNjcm9sbGluZyB3aGlsZSB0aGUgb3ZlcmxheSBpcyB2aXNpYmxlLlxuICovXG5leHBvcnQgY2xhc3MgQmxvY2tTY3JvbGxTdHJhdGVneSBpbXBsZW1lbnRzIFNjcm9sbFN0cmF0ZWd5IHtcbiAgcHJpdmF0ZSBfcHJldmlvdXNIVE1MU3R5bGVzID0geyB0b3A6ICcnLCBsZWZ0OiAnJyB9O1xuICBwcml2YXRlIF9wcmV2aW91c1Njcm9sbFBvc2l0aW9uOiB7IHRvcDogbnVtYmVyLCBsZWZ0OiBudW1iZXIgfTtcbiAgcHJpdmF0ZSBfaXNFbmFibGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlcikgeyB9XG5cbiAgYXR0YWNoKCkgeyB9XG5cbiAgZW5hYmxlKCkge1xuICAgIGlmICh0aGlzLl9jYW5CZUVuYWJsZWQoKSkge1xuICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgICAgdGhpcy5fcHJldmlvdXNTY3JvbGxQb3NpdGlvbiA9IHRoaXMuX3ZpZXdwb3J0UnVsZXIuZ2V0Vmlld3BvcnRTY3JvbGxQb3NpdGlvbigpO1xuXG4gICAgICAvLyBDYWNoZSB0aGUgcHJldmlvdXMgaW5saW5lIHN0eWxlcyBpbiBjYXNlIHRoZSB1c2VyIGhhZCBzZXQgdGhlbS5cbiAgICAgIHRoaXMuX3ByZXZpb3VzSFRNTFN0eWxlcy5sZWZ0ID0gcm9vdC5zdHlsZS5sZWZ0O1xuICAgICAgdGhpcy5fcHJldmlvdXNIVE1MU3R5bGVzLnRvcCA9IHJvb3Quc3R5bGUudG9wO1xuXG4gICAgICAvLyBOb3RlOiB3ZSdyZSB1c2luZyB0aGUgYGh0bWxgIG5vZGUsIGluc3RlYWQgb2YgdGhlIGBib2R5YCwgYmVjYXVzZSB0aGUgYGJvZHlgIG1heVxuICAgICAgLy8gaGF2ZSB0aGUgdXNlciBhZ2VudCBtYXJnaW4sIHdoZXJlYXMgdGhlIGBodG1sYCBpcyBndWFyYW50ZWVkIG5vdCB0byBoYXZlIG9uZS5cbiAgICAgIHJvb3Quc3R5bGUubGVmdCA9IGAkey10aGlzLl9wcmV2aW91c1Njcm9sbFBvc2l0aW9uLmxlZnR9cHhgO1xuICAgICAgcm9vdC5zdHlsZS50b3AgPSBgJHstdGhpcy5fcHJldmlvdXNTY3JvbGxQb3NpdGlvbi50b3B9cHhgO1xuICAgICAgcm9vdC5jbGFzc0xpc3QuYWRkKCdjZGstZ2xvYmFsLXNjcm9sbGJsb2NrJyk7XG4gICAgICB0aGlzLl9pc0VuYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGRpc2FibGUoKSB7XG4gICAgaWYgKHRoaXMuX2lzRW5hYmxlZCkge1xuICAgICAgdGhpcy5faXNFbmFibGVkID0gZmFsc2U7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUubGVmdCA9IHRoaXMuX3ByZXZpb3VzSFRNTFN0eWxlcy5sZWZ0O1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnRvcCA9IHRoaXMuX3ByZXZpb3VzSFRNTFN0eWxlcy50b3A7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnY2RrLWdsb2JhbC1zY3JvbGxibG9jaycpO1xuICAgICAgd2luZG93LnNjcm9sbCh0aGlzLl9wcmV2aW91c1Njcm9sbFBvc2l0aW9uLmxlZnQsIHRoaXMuX3ByZXZpb3VzU2Nyb2xsUG9zaXRpb24udG9wKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jYW5CZUVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgLy8gU2luY2UgdGhlIHNjcm9sbCBzdHJhdGVnaWVzIGNhbid0IGJlIHNpbmdsZXRvbnMsIHdlIGhhdmUgdG8gdXNlIGEgZ2xvYmFsIENTUyBjbGFzc1xuICAgIC8vIChgY2RrLWdsb2JhbC1zY3JvbGxibG9ja2ApIHRvIG1ha2Ugc3VyZSB0aGF0IHdlIGRvbid0IHRyeSB0byBkaXNhYmxlIGdsb2JhbFxuICAgIC8vIHNjcm9sbGluZyBtdWx0aXBsZSB0aW1lcy5cbiAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnY2RrLWdsb2JhbC1zY3JvbGxibG9jaycpIHx8IHRoaXMuX2lzRW5hYmxlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgIGNvbnN0IHZpZXdwb3J0ID0gdGhpcy5fdmlld3BvcnRSdWxlci5nZXRWaWV3cG9ydFJlY3QoKTtcbiAgICByZXR1cm4gYm9keS5zY3JvbGxIZWlnaHQgPiB2aWV3cG9ydC5oZWlnaHQgfHwgYm9keS5zY3JvbGxXaWR0aCA+IHZpZXdwb3J0LndpZHRoO1xuICB9XG59XG4iXX0=