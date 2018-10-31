/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
var RippleState = {
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
var /**
 * Reference to a previously launched ripple element.
 */
RippleRef = /** @class */ (function () {
    function RippleRef(_renderer, element, config) {
        this._renderer = _renderer;
        this.element = element;
        this.config = config;
        /**
         * Current state of the ripple reference.
         */
        this.state = RippleState.HIDDEN;
    }
    /** Fades out the ripple element. */
    /**
     * Fades out the ripple element.
     * @return {?}
     */
    RippleRef.prototype.fadeOut = /**
     * Fades out the ripple element.
     * @return {?}
     */
    function () {
        this._renderer.fadeOutRipple(this);
    };
    return RippleRef;
}());
/**
 * Reference to a previously launched ripple element.
 */
export { RippleRef };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlwcGxlLXJlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2NvcmUvcmlwcGxlL3JpcHBsZS1yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBSUUsWUFBUyxFQUFFLFVBQU8sRUFBRSxhQUFVLEVBQUUsU0FBTTs7O3dCQUF0QyxTQUFTO3dCQUFFLE9BQU87d0JBQUUsVUFBVTt3QkFBRSxNQUFNOzs7O0FBTXhDOzs7QUFBQTtJQUtFLG1CQUNVLFdBQ0QsU0FDQTtRQUZDLGNBQVMsR0FBVCxTQUFTO1FBQ1YsWUFBTyxHQUFQLE9BQU87UUFDUCxXQUFNLEdBQU4sTUFBTTs7OztxQkFMTSxXQUFXLENBQUMsTUFBTTtLQU10QztJQUVELG9DQUFvQzs7Ozs7SUFDcEMsMkJBQU87Ozs7SUFBUDtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BDO29CQXhCSDtJQXlCQyxDQUFBOzs7O0FBZkQscUJBZUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JpcHBsZUNvbmZpZywgUmlwcGxlUmVuZGVyZXJ9IGZyb20gJy4vcmlwcGxlLXJlbmRlcmVyJztcblxuLyoqIFBvc3NpYmxlIHN0YXRlcyBmb3IgYSByaXBwbGUgZWxlbWVudC4gKi9cbmV4cG9ydCBlbnVtIFJpcHBsZVN0YXRlIHtcbiAgRkFESU5HX0lOLCBWSVNJQkxFLCBGQURJTkdfT1VULCBISURERU5cbn1cblxuLyoqXG4gKiBSZWZlcmVuY2UgdG8gYSBwcmV2aW91c2x5IGxhdW5jaGVkIHJpcHBsZSBlbGVtZW50LlxuICovXG5leHBvcnQgY2xhc3MgUmlwcGxlUmVmIHtcblxuICAvKiogQ3VycmVudCBzdGF0ZSBvZiB0aGUgcmlwcGxlIHJlZmVyZW5jZS4gKi9cbiAgc3RhdGU6IFJpcHBsZVN0YXRlID0gUmlwcGxlU3RhdGUuSElEREVOO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSaXBwbGVSZW5kZXJlcixcbiAgICBwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgcHVibGljIGNvbmZpZzogUmlwcGxlQ29uZmlnKSB7XG4gIH1cblxuICAvKiogRmFkZXMgb3V0IHRoZSByaXBwbGUgZWxlbWVudC4gKi9cbiAgZmFkZU91dCgpIHtcbiAgICB0aGlzLl9yZW5kZXJlci5mYWRlT3V0UmlwcGxlKHRoaXMpO1xuICB9XG59XG4iXX0=