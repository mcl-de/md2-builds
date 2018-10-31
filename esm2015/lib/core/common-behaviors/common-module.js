/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule, InjectionToken, Optional, Inject, isDevMode } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { CompatibilityModule } from '../compatibility/compatibility';
/** *
 * Injection token that configures whether the Material sanity checks are enabled.
  @type {?} */
export const MATERIAL_SANITY_CHECKS = new InjectionToken('md-sanity-checks');
/**
 * Module that captures anything that should be loaded and/or run for *all* Angular Material
 * components. This includes Bidi, compatibility mode, etc.
 *
 * This module should be imported to each top-level component module (e.g., MdTabsModule).
 */
export class MdCommonModule {
    /**
     * @param {?} _document
     * @param {?} _sanityChecksEnabled
     */
    constructor(_document, _sanityChecksEnabled) {
        this._document = _document;
        /**
         * Whether we've done the global sanity checks (e.g. a theme is loaded, there is a doctype).
         */
        this._hasDoneGlobalChecks = false;
        if (_sanityChecksEnabled && !this._hasDoneGlobalChecks && _document && isDevMode()) {
            this._checkDoctype();
            this._checkTheme();
            this._hasDoneGlobalChecks = true;
        }
    }
    /**
     * @return {?}
     */
    _checkDoctype() {
        if (!this._document.doctype) {
            console.warn('Current document does not have a doctype. This may cause ' +
                'some Angular Material components not to behave as expected.');
        }
    }
    /**
     * @return {?}
     */
    _checkTheme() {
        if (typeof getComputedStyle === 'function') {
            /** @type {?} */
            const testElement = this._document.createElement('div');
            testElement.classList.add('mat-theme-loaded-marker');
            this._document.body.appendChild(testElement);
            if (getComputedStyle(testElement).display !== 'none') {
                console.warn('Could not find Angular Material core theme. Most Material ' +
                    'components may not work as expected. For more info refer ' +
                    'to the theming guide: https://material.angular.io/guide/theming');
            }
            this._document.body.removeChild(testElement);
        }
    }
}
MdCommonModule.decorators = [
    { type: NgModule, args: [{
                imports: [CompatibilityModule],
                exports: [CompatibilityModule],
                providers: [{
                        provide: MATERIAL_SANITY_CHECKS, useValue: true,
                    }],
            },] }
];
/** @nocollapse */
MdCommonModule.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [MATERIAL_SANITY_CHECKS,] }] }
];
if (false) {
    /**
     * Whether we've done the global sanity checks (e.g. a theme is loaded, there is a doctype).
     * @type {?}
     */
    MdCommonModule.prototype._hasDoneGlobalChecks;
    /** @type {?} */
    MdCommonModule.prototype._document;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2NvcmUvY29tbW9uLWJlaGF2aW9ycy9jb21tb24tbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDbkQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7Ozs7QUFJbkUsYUFBYSxzQkFBc0IsR0FBRyxJQUFJLGNBQWMsQ0FBVSxrQkFBa0IsQ0FBQyxDQUFDOzs7Ozs7O0FBZ0J0RixNQUFNOzs7OztJQUlKLFlBQ3dDLFNBQWMsRUFDUixvQkFBNkI7UUFEbkMsY0FBUyxHQUFULFNBQVMsQ0FBSzs7OztvQ0FIdkIsS0FBSztRQU1sQyxJQUFJLG9CQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixJQUFJLFNBQVMsSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUNsRixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7U0FDbEM7S0FDRjs7OztJQUVPLGFBQWE7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQ1YsMkRBQTJEO2dCQUMzRCw2REFBNkQsQ0FDOUQsQ0FBQztTQUNIOzs7OztJQUdLLFdBQVc7UUFDakIsSUFBSSxPQUFPLGdCQUFnQixLQUFLLFVBQVUsRUFBRTs7WUFDMUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFeEQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFN0MsSUFBSSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFO2dCQUNwRCxPQUFPLENBQUMsSUFBSSxDQUNWLDREQUE0RDtvQkFDNUQsMkRBQTJEO29CQUMzRCxpRUFBaUUsQ0FDbEUsQ0FBQzthQUNIO1lBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzlDOzs7O1lBL0NKLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDOUIsT0FBTyxFQUFFLENBQUMsbUJBQW1CLENBQUM7Z0JBQzlCLFNBQVMsRUFBRSxDQUFDO3dCQUNWLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxRQUFRLEVBQUUsSUFBSTtxQkFDaEQsQ0FBQzthQUNIOzs7OzRDQU1JLFFBQVEsWUFBSSxNQUFNLFNBQUMsUUFBUTswQ0FDM0IsUUFBUSxZQUFJLE1BQU0sU0FBQyxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLCBJbmplY3Rpb25Ub2tlbiwgT3B0aW9uYWwsIEluamVjdCwgaXNEZXZNb2RlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtDb21wYXRpYmlsaXR5TW9kdWxlfSBmcm9tICcuLi9jb21wYXRpYmlsaXR5L2NvbXBhdGliaWxpdHknO1xuXG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjb25maWd1cmVzIHdoZXRoZXIgdGhlIE1hdGVyaWFsIHNhbml0eSBjaGVja3MgYXJlIGVuYWJsZWQuICovXG5leHBvcnQgY29uc3QgTUFURVJJQUxfU0FOSVRZX0NIRUNLUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxib29sZWFuPignbWQtc2FuaXR5LWNoZWNrcycpO1xuXG5cbi8qKlxuICogTW9kdWxlIHRoYXQgY2FwdHVyZXMgYW55dGhpbmcgdGhhdCBzaG91bGQgYmUgbG9hZGVkIGFuZC9vciBydW4gZm9yICphbGwqIEFuZ3VsYXIgTWF0ZXJpYWxcbiAqIGNvbXBvbmVudHMuIFRoaXMgaW5jbHVkZXMgQmlkaSwgY29tcGF0aWJpbGl0eSBtb2RlLCBldGMuXG4gKlxuICogVGhpcyBtb2R1bGUgc2hvdWxkIGJlIGltcG9ydGVkIHRvIGVhY2ggdG9wLWxldmVsIGNvbXBvbmVudCBtb2R1bGUgKGUuZy4sIE1kVGFic01vZHVsZSkuXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21wYXRpYmlsaXR5TW9kdWxlXSxcbiAgZXhwb3J0czogW0NvbXBhdGliaWxpdHlNb2R1bGVdLFxuICBwcm92aWRlcnM6IFt7XG4gICAgcHJvdmlkZTogTUFURVJJQUxfU0FOSVRZX0NIRUNLUywgdXNlVmFsdWU6IHRydWUsXG4gIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBNZENvbW1vbk1vZHVsZSB7XG4gIC8qKiBXaGV0aGVyIHdlJ3ZlIGRvbmUgdGhlIGdsb2JhbCBzYW5pdHkgY2hlY2tzIChlLmcuIGEgdGhlbWUgaXMgbG9hZGVkLCB0aGVyZSBpcyBhIGRvY3R5cGUpLiAqL1xuICBwcml2YXRlIF9oYXNEb25lR2xvYmFsQ2hlY2tzID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVEVSSUFMX1NBTklUWV9DSEVDS1MpIF9zYW5pdHlDaGVja3NFbmFibGVkOiBib29sZWFuKSB7XG5cbiAgICBpZiAoX3Nhbml0eUNoZWNrc0VuYWJsZWQgJiYgIXRoaXMuX2hhc0RvbmVHbG9iYWxDaGVja3MgJiYgX2RvY3VtZW50ICYmIGlzRGV2TW9kZSgpKSB7XG4gICAgICB0aGlzLl9jaGVja0RvY3R5cGUoKTtcbiAgICAgIHRoaXMuX2NoZWNrVGhlbWUoKTtcbiAgICAgIHRoaXMuX2hhc0RvbmVHbG9iYWxDaGVja3MgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NoZWNrRG9jdHlwZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2RvY3VtZW50LmRvY3R5cGUpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ0N1cnJlbnQgZG9jdW1lbnQgZG9lcyBub3QgaGF2ZSBhIGRvY3R5cGUuIFRoaXMgbWF5IGNhdXNlICcgK1xuICAgICAgICAnc29tZSBBbmd1bGFyIE1hdGVyaWFsIGNvbXBvbmVudHMgbm90IHRvIGJlaGF2ZSBhcyBleHBlY3RlZC4nXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NoZWNrVGhlbWUoKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiBnZXRDb21wdXRlZFN0eWxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zdCB0ZXN0RWxlbWVudCA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICB0ZXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtYXQtdGhlbWUtbG9hZGVkLW1hcmtlcicpO1xuICAgICAgdGhpcy5fZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXN0RWxlbWVudCk7XG5cbiAgICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKHRlc3RFbGVtZW50KS5kaXNwbGF5ICE9PSAnbm9uZScpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdDb3VsZCBub3QgZmluZCBBbmd1bGFyIE1hdGVyaWFsIGNvcmUgdGhlbWUuIE1vc3QgTWF0ZXJpYWwgJyArXG4gICAgICAgICAgJ2NvbXBvbmVudHMgbWF5IG5vdCB3b3JrIGFzIGV4cGVjdGVkLiBGb3IgbW9yZSBpbmZvIHJlZmVyICcgK1xuICAgICAgICAgICd0byB0aGUgdGhlbWluZyBndWlkZTogaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL3RoZW1pbmcnXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2RvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGVzdEVsZW1lbnQpO1xuICAgIH1cbiAgfVxufVxuIl19