/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewEncapsulation, Input, ElementRef, Renderer2, } from '@angular/core';
import { mixinColor } from '../../common-behaviors/color';
/** @typedef {?} */
var MdPseudoCheckboxState;
export { MdPseudoCheckboxState };
export class MdPseudoCheckboxBase {
    /**
     * @param {?} _renderer
     * @param {?} _elementRef
     */
    constructor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    MdPseudoCheckboxBase.prototype._renderer;
    /** @type {?} */
    MdPseudoCheckboxBase.prototype._elementRef;
}
/** @type {?} */
export const _MdPseudoCheckboxBase = mixinColor(MdPseudoCheckboxBase, 'accent');
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
export class MdPseudoCheckbox extends _MdPseudoCheckboxBase {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(elementRef, renderer) {
        super(renderer, elementRef);
        /**
         * Display state of the checkbox.
         */
        this.state = 'unchecked';
        /**
         * Whether the checkbox is disabled.
         */
        this.disabled = false;
    }
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
MdPseudoCheckbox.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
MdPseudoCheckbox.propDecorators = {
    state: [{ type: Input }],
    disabled: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHNldWRvLWNoZWNrYm94LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9zZWxlY3Rpb24vcHNldWRvLWNoZWNrYm94L3BzZXVkby1jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsS0FBSyxFQUNMLFVBQVUsRUFDVixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFXLFVBQVUsRUFBQyxNQUFNLDhCQUE4QixDQUFDOzs7O0FBTWxFLE1BQU07Ozs7O0lBQ0osWUFBbUIsU0FBb0IsRUFBUyxXQUF1QjtRQUFwRCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7S0FBSTtDQUM1RTs7Ozs7Ozs7QUFDRCxhQUFhLHFCQUFxQixHQUFHLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxRQUFRLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FBNEJoRixNQUFNLHVCQUF3QixTQUFRLHFCQUFxQjs7Ozs7SUFPekQsWUFBWSxVQUFzQixFQUFFLFFBQW1CO1FBQ3JELEtBQUssQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7Ozs7cUJBTlUsV0FBVzs7Ozt3QkFHdEIsS0FBSztLQUlqQzs7O1lBdkJGLFNBQVMsU0FBQztnQkFFVCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFLHlDQUF5QztnQkFFbkQsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixRQUFRLEVBQUUsRUFBRTtnQkFDWixJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLHFCQUFxQjtvQkFDOUIsMkNBQTJDLEVBQUUsMkJBQTJCO29CQUN4RSxxQ0FBcUMsRUFBRSxxQkFBcUI7b0JBQzVELHNDQUFzQyxFQUFFLFVBQVU7aUJBQ25EOzthQUNGOzs7O1lBdkNDLFVBQVU7WUFDVixTQUFTOzs7b0JBeUNSLEtBQUs7dUJBR0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIElucHV0LFxuICBFbGVtZW50UmVmLFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDYW5Db2xvciwgbWl4aW5Db2xvcn0gZnJvbSAnLi4vLi4vY29tbW9uLWJlaGF2aW9ycy9jb2xvcic7XG5cbmV4cG9ydCB0eXBlIE1kUHNldWRvQ2hlY2tib3hTdGF0ZSA9ICd1bmNoZWNrZWQnIHwgJ2NoZWNrZWQnIHwgJ2luZGV0ZXJtaW5hdGUnO1xuXG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWRDaGlwLlxuZXhwb3J0IGNsYXNzIE1kUHNldWRvQ2hlY2tib3hCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG59XG5leHBvcnQgY29uc3QgX01kUHNldWRvQ2hlY2tib3hCYXNlID0gbWl4aW5Db2xvcihNZFBzZXVkb0NoZWNrYm94QmFzZSwgJ2FjY2VudCcpO1xuXG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgc2hvd3MgYSBzaW1wbGlmaWVkIGNoZWNrYm94IHdpdGhvdXQgaW5jbHVkaW5nIGFueSBraW5kIG9mIFwicmVhbFwiIGNoZWNrYm94LlxuICogTWVhbnQgdG8gYmUgdXNlZCB3aGVuIHRoZSBjaGVja2JveCBpcyBwdXJlbHkgZGVjb3JhdGl2ZSBhbmQgYSBsYXJnZSBudW1iZXIgb2YgdGhlbSB3aWxsIGJlXG4gKiBpbmNsdWRlZCwgc3VjaCBhcyBmb3IgdGhlIG9wdGlvbnMgaW4gYSBtdWx0aS1zZWxlY3QuIFVzZXMgbm8gU1ZHcyBvciBjb21wbGV4IGFuaW1hdGlvbnMuXG4gKlxuICogTm90ZSB0aGF0IHRoaXMgY29tcG9uZW50IHdpbGwgYmUgY29tcGxldGVseSBpbnZpc2libGUgdG8gc2NyZWVuLXJlYWRlciB1c2Vycy4gVGhpcyBpcyAqbm90KlxuICogaW50ZXJjaGFuZ2VhYmxlIHdpdGggPG1kLWNoZWNrYm94PiBhbmQgc2hvdWxkICpub3QqIGJlIHVzZWQgaWYgdGhlIHVzZXIgd291bGQgZGlyZWN0bHkgaW50ZXJhY3RcbiAqIHdpdGggdGhlIGNoZWNrYm94LiBUaGUgcHNldWRvLWNoZWNrYm94IHNob3VsZCBvbmx5IGJlIHVzZWQgYXMgYW4gaW1wbGVtZW50YXRpb24gZGV0YWlsIG9mXG4gKiBtb3JlIGNvbXBsZXggY29tcG9uZW50cyB0aGF0IGFwcHJvcHJpYXRlbHkgaGFuZGxlIHNlbGVjdGVkIC8gY2hlY2tlZCBzdGF0ZS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gIFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ21kLXBzZXVkby1jaGVja2JveCwgbWF0LXBzZXVkby1jaGVja2JveCcsXG4gIHN0eWxlVXJsczogWydwc2V1ZG8tY2hlY2tib3guc2NzcyddLFxuICBpbnB1dHM6IFsnY29sb3InXSxcbiAgdGVtcGxhdGU6ICcnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1wc2V1ZG8tY2hlY2tib3gnLFxuICAgICdbY2xhc3MubWF0LXBzZXVkby1jaGVja2JveC1pbmRldGVybWluYXRlXSc6ICdzdGF0ZSA9PT0gXCJpbmRldGVybWluYXRlXCInLFxuICAgICdbY2xhc3MubWF0LXBzZXVkby1jaGVja2JveC1jaGVja2VkXSc6ICdzdGF0ZSA9PT0gXCJjaGVja2VkXCInLFxuICAgICdbY2xhc3MubWF0LXBzZXVkby1jaGVja2JveC1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBNZFBzZXVkb0NoZWNrYm94IGV4dGVuZHMgX01kUHNldWRvQ2hlY2tib3hCYXNlIGltcGxlbWVudHMgQ2FuQ29sb3Ige1xuICAvKiogRGlzcGxheSBzdGF0ZSBvZiB0aGUgY2hlY2tib3guICovXG4gIEBJbnB1dCgpIHN0YXRlOiBNZFBzZXVkb0NoZWNrYm94U3RhdGUgPSAndW5jaGVja2VkJztcblxuICAvKiogV2hldGhlciB0aGUgY2hlY2tib3ggaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHN1cGVyKHJlbmRlcmVyLCBlbGVtZW50UmVmKTtcbiAgfVxufVxuIl19