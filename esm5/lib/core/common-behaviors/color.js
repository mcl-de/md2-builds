/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * \@docs-private
 * @record
 */
export function CanColor() { }
/** @type {?} */
CanColor.prototype.color;
/**
 * \@docs-private
 * @record
 */
export function HasRenderer() { }
/** @type {?} */
HasRenderer.prototype._renderer;
/** @type {?} */
HasRenderer.prototype._elementRef;
/** @typedef {?} */
var ThemePalette;
export { ThemePalette };
/**
 * Mixin to augment a directive with a `color` property.
 * @template T
 * @param {?} base
 * @param {?=} defaultColor
 * @return {?}
 */
export function mixinColor(base, defaultColor) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, tslib_1.__spread(args)) || this;
            _this._color = null;
            // Set the default color that can be specified from the mixin.
            // Set the default color that can be specified from the mixin.
            _this.color = defaultColor;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "color", {
            get: /**
             * @return {?}
             */
            function () { return this._color; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var colorPalette = value || defaultColor;
                if (colorPalette !== this._color) {
                    if (this._color) {
                        this._renderer.removeClass(this._elementRef.nativeElement, "mat-" + this._color);
                    }
                    if (colorPalette) {
                        this._renderer.addClass(this._elementRef.nativeElement, "mat-" + colorPalette);
                    }
                    this._color = colorPalette;
                }
            },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }(base));
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2NvbW1vbi1iZWhhdmlvcnMvY29sb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxNQUFNLHFCQUF5RCxJQUFPLEVBQUUsWUFBMkI7SUFFakc7UUFBcUIsbUNBQUk7UUFtQnZCO1lBQVksY0FBYztpQkFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO2dCQUFkLHlCQUFjOztZQUExQixnREFDVyxJQUFJLFdBSWQ7MkJBdkI4QixJQUFJOztZQXNCakMsQUFEQSw4REFBOEQ7WUFDOUQsS0FBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7O1NBQzNCO1FBckJELHNCQUFJLDBCQUFLOzs7O1lBQVQsY0FBNEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Ozs7O1lBQ2pELFVBQVUsS0FBbUI7O2dCQUMzQixJQUFNLFlBQVksR0FBRyxLQUFLLElBQUksWUFBWSxDQUFDO2dCQUUzQyxJQUFJLFlBQVksS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNoQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7d0JBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsU0FBTyxJQUFJLENBQUMsTUFBUSxDQUFDLENBQUM7cUJBQ2xGO29CQUNELElBQUksWUFBWSxFQUFFO3dCQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxTQUFPLFlBQWMsQ0FBQyxDQUFDO3FCQUNoRjtvQkFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztpQkFDNUI7YUFDRjs7O1dBZGdEO3NCQXZCckQ7S0E2Q0csQUF6Qk0sQ0FBYyxJQUFJLEdBeUJ2QjtDQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb25zdHJ1Y3Rvcn0gZnJvbSAnLi9jb25zdHJ1Y3Rvcic7XG5pbXBvcnQge0VsZW1lbnRSZWYsIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgaW50ZXJmYWNlIENhbkNvbG9yIHtcbiAgY29sb3I6IHN0cmluZztcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBpbnRlcmZhY2UgSGFzUmVuZGVyZXIge1xuICBfcmVuZGVyZXI6IFJlbmRlcmVyMjtcbiAgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG59XG5cbi8qKiBQb3NzaWJsZSBjb2xvciBwYWxldHRlIHZhbHVlcy4gICovXG5leHBvcnQgdHlwZSBUaGVtZVBhbGV0dGUgPSAncHJpbWFyeScgfCAnYWNjZW50JyB8ICd3YXJuJyB8IG51bGw7XG5cbi8qKiBNaXhpbiB0byBhdWdtZW50IGEgZGlyZWN0aXZlIHdpdGggYSBgY29sb3JgIHByb3BlcnR5LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1peGluQ29sb3I8VCBleHRlbmRzIENvbnN0cnVjdG9yPEhhc1JlbmRlcmVyPj4oYmFzZTogVCwgZGVmYXVsdENvbG9yPzogVGhlbWVQYWxldHRlKVxuICAgIDogQ29uc3RydWN0b3I8Q2FuQ29sb3I+ICYgVCB7XG4gIHJldHVybiBjbGFzcyBleHRlbmRzIGJhc2Uge1xuICAgIHByaXZhdGUgX2NvbG9yOiBUaGVtZVBhbGV0dGUgPSBudWxsO1xuXG4gICAgZ2V0IGNvbG9yKCk6IFRoZW1lUGFsZXR0ZSB7IHJldHVybiB0aGlzLl9jb2xvcjsgfVxuICAgIHNldCBjb2xvcih2YWx1ZTogVGhlbWVQYWxldHRlKSB7XG4gICAgICBjb25zdCBjb2xvclBhbGV0dGUgPSB2YWx1ZSB8fCBkZWZhdWx0Q29sb3I7XG5cbiAgICAgIGlmIChjb2xvclBhbGV0dGUgIT09IHRoaXMuX2NvbG9yKSB7XG4gICAgICAgIGlmICh0aGlzLl9jb2xvcikge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgYG1hdC0ke3RoaXMuX2NvbG9yfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2xvclBhbGV0dGUpIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGBtYXQtJHtjb2xvclBhbGV0dGV9YCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb2xvciA9IGNvbG9yUGFsZXR0ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgIC8vIFNldCB0aGUgZGVmYXVsdCBjb2xvciB0aGF0IGNhbiBiZSBzcGVjaWZpZWQgZnJvbSB0aGUgbWl4aW4uXG4gICAgICB0aGlzLmNvbG9yID0gZGVmYXVsdENvbG9yO1xuICAgIH1cbiAgfTtcbn1cblxuIl19