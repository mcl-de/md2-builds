/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { mixinDisabled } from '../common-behaviors/disabled';
export class MdOptgroupBase {
}
/** @type {?} */
export const _MdOptgroupMixinBase = mixinDisabled(MdOptgroupBase);
/** @type {?} */
let _uniqueOptgroupIdCounter = 0;
/**
 * Component that is used to group instances of `md-option`.
 */
export class MdOptgroup extends _MdOptgroupMixinBase {
    constructor() {
        super(...arguments);
        /**
         * Unique id for the underlying label.
         */
        this._labelId = `mat-optgroup-label-${_uniqueOptgroupIdCounter++}`;
    }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0Z3JvdXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL29wdGlvbi9vcHRncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxpQkFBaUIsRUFBOEIsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBQyxhQUFhLEVBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUd2RSxNQUFNO0NBQXlCOztBQUMvQixhQUFhLG9CQUFvQixHQUFHLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFHbEUsSUFBSSx3QkFBd0IsR0FBRyxDQUFDLENBQUM7Ozs7QUFtQmpDLE1BQU0saUJBQWtCLFNBQVEsb0JBQW9COzs7Ozs7d0JBSy9CLHNCQUFzQix3QkFBd0IsRUFBRSxFQUFFOzs7O1lBbkJ0RSxTQUFTLFNBQUM7Z0JBRVQsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsbUpBQTRCO2dCQUM1QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUNwQixJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLGNBQWM7b0JBQ3ZCLE1BQU0sRUFBRSxPQUFPO29CQUNmLCtCQUErQixFQUFFLFVBQVU7b0JBQzNDLHNCQUFzQixFQUFFLHFCQUFxQjtvQkFDN0Msd0JBQXdCLEVBQUUsVUFBVTtpQkFDckM7YUFDRjs7O29CQUdFLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge21peGluRGlzYWJsZWQsIENhbkRpc2FibGV9IGZyb20gJy4uL2NvbW1vbi1iZWhhdmlvcnMvZGlzYWJsZWQnO1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1kT3B0Z3JvdXAuXG5leHBvcnQgY2xhc3MgTWRPcHRncm91cEJhc2UgeyB9XG5leHBvcnQgY29uc3QgX01kT3B0Z3JvdXBNaXhpbkJhc2UgPSBtaXhpbkRpc2FibGVkKE1kT3B0Z3JvdXBCYXNlKTtcblxuLy8gQ291bnRlciBmb3IgdW5pcXVlIGdyb3VwIGlkcy5cbmxldCBfdW5pcXVlT3B0Z3JvdXBJZENvdW50ZXIgPSAwO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGlzIHVzZWQgdG8gZ3JvdXAgaW5zdGFuY2VzIG9mIGBtZC1vcHRpb25gLlxuICovXG5AQ29tcG9uZW50KHtcbiAgXG4gIHNlbGVjdG9yOiAnbWQtb3B0Z3JvdXAsIG1hdC1vcHRncm91cCcsXG4gIHRlbXBsYXRlVXJsOiAnb3B0Z3JvdXAuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGlucHV0czogWydkaXNhYmxlZCddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1vcHRncm91cCcsXG4gICAgJ3JvbGUnOiAnZ3JvdXAnLFxuICAgICdbY2xhc3MubWF0LW9wdGdyb3VwLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkLnRvU3RyaW5nKCknLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ19sYWJlbElkJyxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNZE9wdGdyb3VwIGV4dGVuZHMgX01kT3B0Z3JvdXBNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5EaXNhYmxlIHtcbiAgLyoqIExhYmVsIGZvciB0aGUgb3B0aW9uIGdyb3VwLiAqL1xuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuXG4gIC8qKiBVbmlxdWUgaWQgZm9yIHRoZSB1bmRlcmx5aW5nIGxhYmVsLiAqL1xuICBfbGFiZWxJZDogc3RyaW5nID0gYG1hdC1vcHRncm91cC1sYWJlbC0ke191bmlxdWVPcHRncm91cElkQ291bnRlcisrfWA7XG59XG4iXX0=