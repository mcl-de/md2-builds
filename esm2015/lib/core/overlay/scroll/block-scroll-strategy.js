/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
export class BlockScrollStrategy {
    /**
     * @param {?} _viewportRuler
     */
    constructor(_viewportRuler) {
        this._viewportRuler = _viewportRuler;
        this._previousHTMLStyles = { top: '', left: '' };
        this._isEnabled = false;
    }
    /**
     * @return {?}
     */
    attach() { }
    /**
     * @return {?}
     */
    enable() {
        if (this._canBeEnabled()) {
            /** @type {?} */
            const root = document.documentElement;
            this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition();
            // Cache the previous inline styles in case the user had set them.
            this._previousHTMLStyles.left = root.style.left;
            this._previousHTMLStyles.top = root.style.top;
            // Note: we're using the `html` node, instead of the `body`, because the `body` may
            // have the user agent margin, whereas the `html` is guaranteed not to have one.
            root.style.left = `${-this._previousScrollPosition.left}px`;
            root.style.top = `${-this._previousScrollPosition.top}px`;
            root.classList.add('cdk-global-scrollblock');
            this._isEnabled = true;
        }
    }
    /**
     * @return {?}
     */
    disable() {
        if (this._isEnabled) {
            this._isEnabled = false;
            document.documentElement.style.left = this._previousHTMLStyles.left;
            document.documentElement.style.top = this._previousHTMLStyles.top;
            document.documentElement.classList.remove('cdk-global-scrollblock');
            window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top);
        }
    }
    /**
     * @return {?}
     */
    _canBeEnabled() {
        // Since the scroll strategies can't be singletons, we have to use a global CSS class
        // (`cdk-global-scrollblock`) to make sure that we don't try to disable global
        // scrolling multiple times.
        if (document.documentElement.classList.contains('cdk-global-scrollblock') || this._isEnabled) {
            return false;
        }
        /** @type {?} */
        const body = document.body;
        /** @type {?} */
        const viewport = this._viewportRuler.getViewportRect();
        return body.scrollHeight > viewport.height || body.scrollWidth > viewport.width;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2stc2Nyb2xsLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9vdmVybGF5L3Njcm9sbC9ibG9jay1zY3JvbGwtc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU1BLE1BQU07Ozs7SUFLSixZQUFvQixjQUE2QjtRQUE3QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTttQ0FKbkIsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7MEJBRTlCLEtBQUs7S0FFNEI7Ozs7SUFFdEQsTUFBTSxNQUFNOzs7O0lBRVosTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFOztZQUN4QixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDO1lBRXRDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLHlCQUF5QixFQUFFLENBQUM7O1lBRy9FLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDaEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7O1lBSTlDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxJQUFJLENBQUM7WUFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUMxRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO0tBQ0Y7Ozs7SUFFRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1lBQ3BFLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDO1lBQ2xFLFFBQVEsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3BFLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEY7S0FDRjs7OztJQUVPLGFBQWE7Ozs7UUFJbkIsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzVGLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7O1FBRUQsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQzs7UUFDM0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7O0NBRW5GIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTY3JvbGxTdHJhdGVneX0gZnJvbSAnLi9zY3JvbGwtc3RyYXRlZ3knO1xuaW1wb3J0IHtWaWV3cG9ydFJ1bGVyfSBmcm9tICcuLi9wb3NpdGlvbi92aWV3cG9ydC1ydWxlcic7XG5cbi8qKlxuICogU3RyYXRlZ3kgdGhhdCB3aWxsIHByZXZlbnQgdGhlIHVzZXIgZnJvbSBzY3JvbGxpbmcgd2hpbGUgdGhlIG92ZXJsYXkgaXMgdmlzaWJsZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEJsb2NrU2Nyb2xsU3RyYXRlZ3kgaW1wbGVtZW50cyBTY3JvbGxTdHJhdGVneSB7XG4gIHByaXZhdGUgX3ByZXZpb3VzSFRNTFN0eWxlcyA9IHsgdG9wOiAnJywgbGVmdDogJycgfTtcbiAgcHJpdmF0ZSBfcHJldmlvdXNTY3JvbGxQb3NpdGlvbjogeyB0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyIH07XG4gIHByaXZhdGUgX2lzRW5hYmxlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3ZpZXdwb3J0UnVsZXI6IFZpZXdwb3J0UnVsZXIpIHsgfVxuXG4gIGF0dGFjaCgpIHsgfVxuXG4gIGVuYWJsZSgpIHtcbiAgICBpZiAodGhpcy5fY2FuQmVFbmFibGVkKCkpIHtcbiAgICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICAgIHRoaXMuX3ByZXZpb3VzU2Nyb2xsUG9zaXRpb24gPSB0aGlzLl92aWV3cG9ydFJ1bGVyLmdldFZpZXdwb3J0U2Nyb2xsUG9zaXRpb24oKTtcblxuICAgICAgLy8gQ2FjaGUgdGhlIHByZXZpb3VzIGlubGluZSBzdHlsZXMgaW4gY2FzZSB0aGUgdXNlciBoYWQgc2V0IHRoZW0uXG4gICAgICB0aGlzLl9wcmV2aW91c0hUTUxTdHlsZXMubGVmdCA9IHJvb3Quc3R5bGUubGVmdDtcbiAgICAgIHRoaXMuX3ByZXZpb3VzSFRNTFN0eWxlcy50b3AgPSByb290LnN0eWxlLnRvcDtcblxuICAgICAgLy8gTm90ZTogd2UncmUgdXNpbmcgdGhlIGBodG1sYCBub2RlLCBpbnN0ZWFkIG9mIHRoZSBgYm9keWAsIGJlY2F1c2UgdGhlIGBib2R5YCBtYXlcbiAgICAgIC8vIGhhdmUgdGhlIHVzZXIgYWdlbnQgbWFyZ2luLCB3aGVyZWFzIHRoZSBgaHRtbGAgaXMgZ3VhcmFudGVlZCBub3QgdG8gaGF2ZSBvbmUuXG4gICAgICByb290LnN0eWxlLmxlZnQgPSBgJHstdGhpcy5fcHJldmlvdXNTY3JvbGxQb3NpdGlvbi5sZWZ0fXB4YDtcbiAgICAgIHJvb3Quc3R5bGUudG9wID0gYCR7LXRoaXMuX3ByZXZpb3VzU2Nyb2xsUG9zaXRpb24udG9wfXB4YDtcbiAgICAgIHJvb3QuY2xhc3NMaXN0LmFkZCgnY2RrLWdsb2JhbC1zY3JvbGxibG9jaycpO1xuICAgICAgdGhpcy5faXNFbmFibGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBkaXNhYmxlKCkge1xuICAgIGlmICh0aGlzLl9pc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMuX2lzRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmxlZnQgPSB0aGlzLl9wcmV2aW91c0hUTUxTdHlsZXMubGVmdDtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS50b3AgPSB0aGlzLl9wcmV2aW91c0hUTUxTdHlsZXMudG9wO1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Nkay1nbG9iYWwtc2Nyb2xsYmxvY2snKTtcbiAgICAgIHdpbmRvdy5zY3JvbGwodGhpcy5fcHJldmlvdXNTY3JvbGxQb3NpdGlvbi5sZWZ0LCB0aGlzLl9wcmV2aW91c1Njcm9sbFBvc2l0aW9uLnRvcCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2FuQmVFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIC8vIFNpbmNlIHRoZSBzY3JvbGwgc3RyYXRlZ2llcyBjYW4ndCBiZSBzaW5nbGV0b25zLCB3ZSBoYXZlIHRvIHVzZSBhIGdsb2JhbCBDU1MgY2xhc3NcbiAgICAvLyAoYGNkay1nbG9iYWwtc2Nyb2xsYmxvY2tgKSB0byBtYWtlIHN1cmUgdGhhdCB3ZSBkb24ndCB0cnkgdG8gZGlzYWJsZSBnbG9iYWxcbiAgICAvLyBzY3JvbGxpbmcgbXVsdGlwbGUgdGltZXMuXG4gICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Nkay1nbG9iYWwtc2Nyb2xsYmxvY2snKSB8fCB0aGlzLl9pc0VuYWJsZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBjb25zdCB2aWV3cG9ydCA9IHRoaXMuX3ZpZXdwb3J0UnVsZXIuZ2V0Vmlld3BvcnRSZWN0KCk7XG4gICAgcmV0dXJuIGJvZHkuc2Nyb2xsSGVpZ2h0ID4gdmlld3BvcnQuaGVpZ2h0IHx8IGJvZHkuc2Nyb2xsV2lkdGggPiB2aWV3cG9ydC53aWR0aDtcbiAgfVxufVxuIl19