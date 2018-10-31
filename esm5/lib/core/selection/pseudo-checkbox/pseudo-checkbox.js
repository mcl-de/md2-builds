/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, Input, ElementRef, Renderer2, } from '@angular/core';
import { mixinColor } from '../../common-behaviors/color';
/** @typedef {?} */
var MdPseudoCheckboxState;
export { MdPseudoCheckboxState };
var MdPseudoCheckboxBase = /** @class */ (function () {
    function MdPseudoCheckboxBase(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
    }
    return MdPseudoCheckboxBase;
}());
export { MdPseudoCheckboxBase };
if (false) {
    /** @type {?} */
    MdPseudoCheckboxBase.prototype._renderer;
    /** @type {?} */
    MdPseudoCheckboxBase.prototype._elementRef;
}
/** @type {?} */
export var _MdPseudoCheckboxBase = mixinColor(MdPseudoCheckboxBase, 'accent');
/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with <md-checkbox> and should *not* be used if the user would directly interact
 * with the checkbox. The pseudo-checkbox should only be used as an implementation detail of
 * more complex components that appropriately handle selected / checked state.
 * \@docs-private
 */
var MdPseudoCheckbox = /** @class */ (function (_super) {
    tslib_1.__extends(MdPseudoCheckbox, _super);
    function MdPseudoCheckbox(elementRef, renderer) {
        var _this = _super.call(this, renderer, elementRef) || this;
        /**
         * Display state of the checkbox.
         */
        _this.state = 'unchecked';
        /**
         * Whether the checkbox is disabled.
         */
        _this.disabled = false;
        return _this;
    }
    MdPseudoCheckbox.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'md-pseudo-checkbox, mat-pseudo-checkbox',
                    inputs: ['color'],
                    template: '',
                    host: {
                        'class': 'mat-pseudo-checkbox',
                        '[class.mat-pseudo-checkbox-indeterminate]': 'state === "indeterminate"',
                        '[class.mat-pseudo-checkbox-checked]': 'state === "checked"',
                        '[class.mat-pseudo-checkbox-disabled]': 'disabled',
                    },
                    styles: [".mat-pseudo-checkbox{width:20px;height:20px;border:2px solid;border-radius:2px;cursor:pointer;display:inline-block;vertical-align:middle;box-sizing:border-box;position:relative;transition:border-color 90ms cubic-bezier(0,0,.2,.1),background-color 90ms cubic-bezier(0,0,.2,.1)}.mat-pseudo-checkbox::after{position:absolute;opacity:0;content:'';border-bottom:2px solid currentColor;transition:opacity 90ms cubic-bezier(0,0,.2,.1)}.mat-pseudo-checkbox.mat-pseudo-checkbox-checked,.mat-pseudo-checkbox.mat-pseudo-checkbox-indeterminate{border:none}.mat-pseudo-checkbox-disabled{cursor:default}.mat-pseudo-checkbox-indeterminate::after{top:9px;left:2px;width:16px;opacity:1}.mat-pseudo-checkbox-checked::after{top:5px;left:3px;width:12px;height:5px;border-left:2px solid currentColor;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);opacity:1}"]
                }] }
    ];
    /** @nocollapse */
    MdPseudoCheckbox.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    MdPseudoCheckbox.propDecorators = {
        state: [{ type: Input }],
        disabled: [{ type: Input }]
    };
    return MdPseudoCheckbox;
}(_MdPseudoCheckboxBase));
export { MdPseudoCheckbox };
if (false) {
    /**
     * Display state of the checkbox.
     * @type {?}
     */
    MdPseudoCheckbox.prototype.state;
    /**
     * Whether the checkbox is disabled.
     * @type {?}
     */
    MdPseudoCheckbox.prototype.disabled;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHNldWRvLWNoZWNrYm94LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9zZWxlY3Rpb24vcHNldWRvLWNoZWNrYm94L3BzZXVkby1jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLEtBQUssRUFDTCxVQUFVLEVBQ1YsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBVyxVQUFVLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQzs7OztBQU1sRSxJQUFBO0lBQ0UsOEJBQW1CLFNBQW9CLEVBQVMsV0FBdUI7UUFBcEQsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0tBQUk7K0JBZDdFO0lBZUMsQ0FBQTtBQUZELGdDQUVDOzs7Ozs7OztBQUNELFdBQWEscUJBQXFCLEdBQUcsVUFBVSxDQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7O0lBNEIxQyw0Q0FBcUI7SUFPekQsMEJBQVksVUFBc0IsRUFBRSxRQUFtQjtRQUF2RCxZQUNFLGtCQUFNLFFBQVEsRUFBRSxVQUFVLENBQUMsU0FDNUI7Ozs7c0JBUHVDLFdBQVc7Ozs7eUJBR3RCLEtBQUs7O0tBSWpDOztnQkF2QkYsU0FBUyxTQUFDO29CQUVULGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUUseUNBQXlDO29CQUVuRCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7b0JBQ2pCLFFBQVEsRUFBRSxFQUFFO29CQUNaLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUscUJBQXFCO3dCQUM5QiwyQ0FBMkMsRUFBRSwyQkFBMkI7d0JBQ3hFLHFDQUFxQyxFQUFFLHFCQUFxQjt3QkFDNUQsc0NBQXNDLEVBQUUsVUFBVTtxQkFDbkQ7O2lCQUNGOzs7O2dCQXZDQyxVQUFVO2dCQUNWLFNBQVM7Ozt3QkF5Q1IsS0FBSzsyQkFHTCxLQUFLOzsyQkFqRFI7RUE0Q3NDLHFCQUFxQjtTQUE5QyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBJbnB1dCxcbiAgRWxlbWVudFJlZixcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2FuQ29sb3IsIG1peGluQ29sb3J9IGZyb20gJy4uLy4uL2NvbW1vbi1iZWhhdmlvcnMvY29sb3InO1xuXG5leHBvcnQgdHlwZSBNZFBzZXVkb0NoZWNrYm94U3RhdGUgPSAndW5jaGVja2VkJyB8ICdjaGVja2VkJyB8ICdpbmRldGVybWluYXRlJztcblxuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1kQ2hpcC5cbmV4cG9ydCBjbGFzcyBNZFBzZXVkb0NoZWNrYm94QmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuZXhwb3J0IGNvbnN0IF9NZFBzZXVkb0NoZWNrYm94QmFzZSA9IG1peGluQ29sb3IoTWRQc2V1ZG9DaGVja2JveEJhc2UsICdhY2NlbnQnKTtcblxuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IHNob3dzIGEgc2ltcGxpZmllZCBjaGVja2JveCB3aXRob3V0IGluY2x1ZGluZyBhbnkga2luZCBvZiBcInJlYWxcIiBjaGVja2JveC5cbiAqIE1lYW50IHRvIGJlIHVzZWQgd2hlbiB0aGUgY2hlY2tib3ggaXMgcHVyZWx5IGRlY29yYXRpdmUgYW5kIGEgbGFyZ2UgbnVtYmVyIG9mIHRoZW0gd2lsbCBiZVxuICogaW5jbHVkZWQsIHN1Y2ggYXMgZm9yIHRoZSBvcHRpb25zIGluIGEgbXVsdGktc2VsZWN0LiBVc2VzIG5vIFNWR3Mgb3IgY29tcGxleCBhbmltYXRpb25zLlxuICpcbiAqIE5vdGUgdGhhdCB0aGlzIGNvbXBvbmVudCB3aWxsIGJlIGNvbXBsZXRlbHkgaW52aXNpYmxlIHRvIHNjcmVlbi1yZWFkZXIgdXNlcnMuIFRoaXMgaXMgKm5vdCpcbiAqIGludGVyY2hhbmdlYWJsZSB3aXRoIDxtZC1jaGVja2JveD4gYW5kIHNob3VsZCAqbm90KiBiZSB1c2VkIGlmIHRoZSB1c2VyIHdvdWxkIGRpcmVjdGx5IGludGVyYWN0XG4gKiB3aXRoIHRoZSBjaGVja2JveC4gVGhlIHBzZXVkby1jaGVja2JveCBzaG91bGQgb25seSBiZSB1c2VkIGFzIGFuIGltcGxlbWVudGF0aW9uIGRldGFpbCBvZlxuICogbW9yZSBjb21wbGV4IGNvbXBvbmVudHMgdGhhdCBhcHByb3ByaWF0ZWx5IGhhbmRsZSBzZWxlY3RlZCAvIGNoZWNrZWQgc3RhdGUuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICdtZC1wc2V1ZG8tY2hlY2tib3gsIG1hdC1wc2V1ZG8tY2hlY2tib3gnLFxuICBzdHlsZVVybHM6IFsncHNldWRvLWNoZWNrYm94LnNjc3MnXSxcbiAgaW5wdXRzOiBbJ2NvbG9yJ10sXG4gIHRlbXBsYXRlOiAnJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtcHNldWRvLWNoZWNrYm94JyxcbiAgICAnW2NsYXNzLm1hdC1wc2V1ZG8tY2hlY2tib3gtaW5kZXRlcm1pbmF0ZV0nOiAnc3RhdGUgPT09IFwiaW5kZXRlcm1pbmF0ZVwiJyxcbiAgICAnW2NsYXNzLm1hdC1wc2V1ZG8tY2hlY2tib3gtY2hlY2tlZF0nOiAnc3RhdGUgPT09IFwiY2hlY2tlZFwiJyxcbiAgICAnW2NsYXNzLm1hdC1wc2V1ZG8tY2hlY2tib3gtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWRQc2V1ZG9DaGVja2JveCBleHRlbmRzIF9NZFBzZXVkb0NoZWNrYm94QmFzZSBpbXBsZW1lbnRzIENhbkNvbG9yIHtcbiAgLyoqIERpc3BsYXkgc3RhdGUgb2YgdGhlIGNoZWNrYm94LiAqL1xuICBASW5wdXQoKSBzdGF0ZTogTWRQc2V1ZG9DaGVja2JveFN0YXRlID0gJ3VuY2hlY2tlZCc7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoZWNrYm94IGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBzdXBlcihyZW5kZXJlciwgZWxlbWVudFJlZik7XG4gIH1cbn1cbiJdfQ==