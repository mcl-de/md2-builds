/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
const RippleState = {
    FADING_IN: 0, VISIBLE: 1, FADING_OUT: 2, HIDDEN: 3,
};
export { RippleState };
RippleState[RippleState.FADING_IN] = 'FADING_IN';
RippleState[RippleState.VISIBLE] = 'VISIBLE';
RippleState[RippleState.FADING_OUT] = 'FADING_OUT';
RippleState[RippleState.HIDDEN] = 'HIDDEN';
/**
 * Reference to a previously launched ripple element.
 */
export class RippleRef {
    /**
     * @param {?} _renderer
     * @param {?} element
     * @param {?} config
     */
    constructor(_renderer, element, config) {
        this._renderer = _renderer;
        this.element = element;
        this.config = config;
        /**
         * Current state of the ripple reference.
         */
        this.state = RippleState.HIDDEN;
    }
    /**
     * Fades out the ripple element.
     * @return {?}
     */
    fadeOut() {
        this._renderer.fadeOutRipple(this);
    }
}
if (false) {
    /**
     * Current state of the ripple reference.
     * @type {?}
     */
    RippleRef.prototype.state;
    /** @type {?} */
    RippleRef.prototype._renderer;
    /** @type {?} */
    RippleRef.prototype.element;
    /** @type {?} */
    RippleRef.prototype.config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlwcGxlLXJlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2NvcmUvcmlwcGxlL3JpcHBsZS1yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBSUUsWUFBUyxFQUFFLFVBQU8sRUFBRSxhQUFVLEVBQUUsU0FBTTs7O3dCQUF0QyxTQUFTO3dCQUFFLE9BQU87d0JBQUUsVUFBVTt3QkFBRSxNQUFNOzs7O0FBTXhDLE1BQU07Ozs7OztJQUtKLFlBQ1UsV0FDRCxTQUNBO1FBRkMsY0FBUyxHQUFULFNBQVM7UUFDVixZQUFPLEdBQVAsT0FBTztRQUNQLFdBQU0sR0FBTixNQUFNOzs7O3FCQUxNLFdBQVcsQ0FBQyxNQUFNO0tBTXRDOzs7OztJQUdELE9BQU87UUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNwQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSaXBwbGVDb25maWcsIFJpcHBsZVJlbmRlcmVyfSBmcm9tICcuL3JpcHBsZS1yZW5kZXJlcic7XG5cbi8qKiBQb3NzaWJsZSBzdGF0ZXMgZm9yIGEgcmlwcGxlIGVsZW1lbnQuICovXG5leHBvcnQgZW51bSBSaXBwbGVTdGF0ZSB7XG4gIEZBRElOR19JTiwgVklTSUJMRSwgRkFESU5HX09VVCwgSElEREVOXG59XG5cbi8qKlxuICogUmVmZXJlbmNlIHRvIGEgcHJldmlvdXNseSBsYXVuY2hlZCByaXBwbGUgZWxlbWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJpcHBsZVJlZiB7XG5cbiAgLyoqIEN1cnJlbnQgc3RhdGUgb2YgdGhlIHJpcHBsZSByZWZlcmVuY2UuICovXG4gIHN0YXRlOiBSaXBwbGVTdGF0ZSA9IFJpcHBsZVN0YXRlLkhJRERFTjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmlwcGxlUmVuZGVyZXIsXG4gICAgcHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIHB1YmxpYyBjb25maWc6IFJpcHBsZUNvbmZpZykge1xuICB9XG5cbiAgLyoqIEZhZGVzIG91dCB0aGUgcmlwcGxlIGVsZW1lbnQuICovXG4gIGZhZGVPdXQoKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIuZmFkZU91dFJpcHBsZSh0aGlzKTtcbiAgfVxufVxuIl19