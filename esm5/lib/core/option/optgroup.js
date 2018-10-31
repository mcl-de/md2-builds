/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { mixinDisabled } from '../common-behaviors/disabled';
var MdOptgroupBase = /** @class */ (function () {
    function MdOptgroupBase() {
    }
    return MdOptgroupBase;
}());
export { MdOptgroupBase };
/** @type {?} */
export var _MdOptgroupMixinBase = mixinDisabled(MdOptgroupBase);
/** @type {?} */
var _uniqueOptgroupIdCounter = 0;
/**
 * Component that is used to group instances of `md-option`.
 */
var MdOptgroup = /** @class */ (function (_super) {
    tslib_1.__extends(MdOptgroup, _super);
    function MdOptgroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Unique id for the underlying label.
         */
        _this._labelId = "mat-optgroup-label-" + _uniqueOptgroupIdCounter++;
        return _this;
    }
    MdOptgroup.decorators = [
        { type: Component, args: [{
                    selector: 'md-optgroup, mat-optgroup',
                    template: "<label class=\"mat-optgroup-label\" [id]=\"_labelId\">{{ label }}</label>\n<ng-content select=\"md-option, mat-option\"></ng-content>\n",
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['disabled'],
                    host: {
                        'class': 'mat-optgroup',
                        'role': 'group',
                        '[class.mat-optgroup-disabled]': 'disabled',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-labelledby]': '_labelId',
                    }
                }] }
    ];
    MdOptgroup.propDecorators = {
        label: [{ type: Input }]
    };
    return MdOptgroup;
}(_MdOptgroupMixinBase));
export { MdOptgroup };
if (false) {
    /**
     * Label for the option group.
     * @type {?}
     */
    MdOptgroup.prototype.label;
    /**
     * Unique id for the underlying label.
     * @type {?}
     */
    MdOptgroup.prototype._labelId;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0Z3JvdXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL29wdGlvbi9vcHRncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsaUJBQWlCLEVBQThCLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RixPQUFPLEVBQUMsYUFBYSxFQUFhLE1BQU0sOEJBQThCLENBQUM7QUFHdkUsSUFBQTs7O3lCQUpBO0lBSStCLENBQUE7QUFBL0IsMEJBQStCOztBQUMvQixXQUFhLG9CQUFvQixHQUFHLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFHbEUsSUFBSSx3QkFBd0IsR0FBRyxDQUFDLENBQUM7Ozs7O0lBbUJELHNDQUFvQjs7Ozs7O3lCQUsvQix3QkFBc0Isd0JBQXdCLEVBQUk7Ozs7Z0JBbkJ0RSxTQUFTLFNBQUM7b0JBRVQsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsbUpBQTRCO29CQUM1QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNwQixJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLGNBQWM7d0JBQ3ZCLE1BQU0sRUFBRSxPQUFPO3dCQUNmLCtCQUErQixFQUFFLFVBQVU7d0JBQzNDLHNCQUFzQixFQUFFLHFCQUFxQjt3QkFDN0Msd0JBQXdCLEVBQUUsVUFBVTtxQkFDckM7aUJBQ0Y7Ozt3QkFHRSxLQUFLOztxQkE3QlI7RUEyQmdDLG9CQUFvQjtTQUF2QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHttaXhpbkRpc2FibGVkLCBDYW5EaXNhYmxlfSBmcm9tICcuLi9jb21tb24tYmVoYXZpb3JzL2Rpc2FibGVkJztcblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNZE9wdGdyb3VwLlxuZXhwb3J0IGNsYXNzIE1kT3B0Z3JvdXBCYXNlIHsgfVxuZXhwb3J0IGNvbnN0IF9NZE9wdGdyb3VwTWl4aW5CYXNlID0gbWl4aW5EaXNhYmxlZChNZE9wdGdyb3VwQmFzZSk7XG5cbi8vIENvdW50ZXIgZm9yIHVuaXF1ZSBncm91cCBpZHMuXG5sZXQgX3VuaXF1ZU9wdGdyb3VwSWRDb3VudGVyID0gMDtcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBpcyB1c2VkIHRvIGdyb3VwIGluc3RhbmNlcyBvZiBgbWQtb3B0aW9uYC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIFxuICBzZWxlY3RvcjogJ21kLW9wdGdyb3VwLCBtYXQtb3B0Z3JvdXAnLFxuICB0ZW1wbGF0ZVVybDogJ29wdGdyb3VwLmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtb3B0Z3JvdXAnLFxuICAgICdyb2xlJzogJ2dyb3VwJyxcbiAgICAnW2NsYXNzLm1hdC1vcHRncm91cC1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdfbGFiZWxJZCcsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWRPcHRncm91cCBleHRlbmRzIF9NZE9wdGdyb3VwTWl4aW5CYXNlIGltcGxlbWVudHMgQ2FuRGlzYWJsZSB7XG4gIC8qKiBMYWJlbCBmb3IgdGhlIG9wdGlvbiBncm91cC4gKi9cbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcblxuICAvKiogVW5pcXVlIGlkIGZvciB0aGUgdW5kZXJseWluZyBsYWJlbC4gKi9cbiAgX2xhYmVsSWQ6IHN0cmluZyA9IGBtYXQtb3B0Z3JvdXAtbGFiZWwtJHtfdW5pcXVlT3B0Z3JvdXBJZENvdW50ZXIrK31gO1xufVxuIl19