/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { mixinDisabled } from '../core/common-behaviors/disabled';
var Md2OptgroupBase = /** @class */ (function () {
    function Md2OptgroupBase() {
    }
    return Md2OptgroupBase;
}());
export { Md2OptgroupBase };
/** @type {?} */
export var _Md2OptgroupMixinBase = mixinDisabled(Md2OptgroupBase);
/** @type {?} */
var nextId = 0;
/**
 * Component that is used to group instances of `md2-option`.
 */
var Md2Optgroup = /** @class */ (function (_super) {
    tslib_1.__extends(Md2Optgroup, _super);
    function Md2Optgroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Unique id for the underlying label.
         */
        _this._labelId = "md2-optgroup-label-" + nextId++;
        return _this;
    }
    Md2Optgroup.decorators = [
        { type: Component, args: [{
                    selector: 'md2-optgroup',
                    template: "<label class=\"md2-optgroup-label\" [id]=\"_labelId\">{{ label }}</label>\n<ng-content select=\"md2-option\"></ng-content>\n",
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['disabled'],
                    host: {
                        'class': 'md2-optgroup',
                        'role': 'group',
                        '[class.md2-optgroup-disabled]': 'disabled',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-labelledby]': '_labelId',
                    },
                    styles: [".md2-optgroup-label{color:rgba(0,0,0,.54);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default;font-weight:700;font-size:14px}.md2-optgroup-disabled .md2-optgroup-label{color:rgba(0,0,0,.38)}"]
                }] }
    ];
    Md2Optgroup.propDecorators = {
        label: [{ type: Input }]
    };
    return Md2Optgroup;
}(_Md2OptgroupMixinBase));
export { Md2Optgroup };
if (false) {
    /**
     * Label for the option group.
     * @type {?}
     */
    Md2Optgroup.prototype.label;
    /**
     * Unique id for the underlying label.
     * @type {?}
     */
    Md2Optgroup.prototype._labelId;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0Z3JvdXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3Qvb3B0Z3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLGlCQUFpQixFQUE4QixLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFDLGFBQWEsRUFBYSxNQUFNLG1DQUFtQyxDQUFDO0FBRzVFLElBQUE7OzswQkFKQTtJQUlnQyxDQUFBO0FBQWhDLDJCQUFnQzs7QUFDaEMsV0FBYSxxQkFBcUIsR0FBRyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBR3BFLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQzs7Ozs7SUFvQmtCLHVDQUFxQjs7Ozs7O3lCQUtqQyx3QkFBc0IsTUFBTSxFQUFJOzs7O2dCQXBCcEQsU0FBUyxTQUFDO29CQUVULFFBQVEsRUFBRSxjQUFjO29CQUN4Qix3SUFBNEI7b0JBRTVCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQ3BCLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsY0FBYzt3QkFDdkIsTUFBTSxFQUFFLE9BQU87d0JBQ2YsK0JBQStCLEVBQUUsVUFBVTt3QkFDM0Msc0JBQXNCLEVBQUUscUJBQXFCO3dCQUM3Qyx3QkFBd0IsRUFBRSxVQUFVO3FCQUNyQzs7aUJBQ0Y7Ozt3QkFHRSxLQUFLOztzQkE5QlI7RUE0QmlDLHFCQUFxQjtTQUF6QyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHttaXhpbkRpc2FibGVkLCBDYW5EaXNhYmxlfSBmcm9tICcuLi9jb3JlL2NvbW1vbi1iZWhhdmlvcnMvZGlzYWJsZWQnO1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1kMk9wdGdyb3VwLlxuZXhwb3J0IGNsYXNzIE1kMk9wdGdyb3VwQmFzZSB7IH1cbmV4cG9ydCBjb25zdCBfTWQyT3B0Z3JvdXBNaXhpbkJhc2UgPSBtaXhpbkRpc2FibGVkKE1kMk9wdGdyb3VwQmFzZSk7XG5cbi8vIENvdW50ZXIgZm9yIHVuaXF1ZSBncm91cCBpZHMuXG5sZXQgbmV4dElkID0gMDtcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBpcyB1c2VkIHRvIGdyb3VwIGluc3RhbmNlcyBvZiBgbWQyLW9wdGlvbmAuXG4gKi9cbkBDb21wb25lbnQoe1xuICBcbiAgc2VsZWN0b3I6ICdtZDItb3B0Z3JvdXAnLFxuICB0ZW1wbGF0ZVVybDogJ29wdGdyb3VwLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnb3B0Z3JvdXAuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtZDItb3B0Z3JvdXAnLFxuICAgICdyb2xlJzogJ2dyb3VwJyxcbiAgICAnW2NsYXNzLm1kMi1vcHRncm91cC1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdfbGFiZWxJZCcsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWQyT3B0Z3JvdXAgZXh0ZW5kcyBfTWQyT3B0Z3JvdXBNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5EaXNhYmxlIHtcbiAgLyoqIExhYmVsIGZvciB0aGUgb3B0aW9uIGdyb3VwLiAqL1xuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuXG4gIC8qKiBVbmlxdWUgaWQgZm9yIHRoZSB1bmRlcmx5aW5nIGxhYmVsLiAqL1xuICBfbGFiZWxJZDogc3RyaW5nID0gYG1kMi1vcHRncm91cC1sYWJlbC0ke25leHRJZCsrfWA7XG59XG4iXX0=