/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule, Directive, Inject, Optional, ElementRef, InjectionToken } from '@angular/core';
/** @type {?} */
export const MATERIAL_COMPATIBILITY_MODE = new InjectionToken('md-compatibility-mode');
/**
 * Returns an exception to be thrown if the consumer has used
 * an invalid Material prefix on a component.
 * \@docs-private
 * @param {?} prefix
 * @param {?} nodeName
 * @return {?}
 */
export function getMdCompatibilityInvalidPrefixError(prefix, nodeName) {
    return Error(`The "${prefix}-" prefix cannot be used in ng-material v1 compatibility mode. ` +
        `It was used on an "${nodeName.toLowerCase()}" element.`);
}
/** *
 * Selector that matches all elements that may have style collisions with AngularJS Material.
  @type {?} */
export const MAT_ELEMENTS_SELECTOR = `
  [mat-button],
  [mat-fab],
  [mat-icon-button],
  [mat-mini-fab],
  [mat-raised-button],
  [matCardSubtitle],
  [matCardTitle],
  [matDialogActions],
  [matDialogClose],
  [matDialogContent],
  [matDialogTitle],
  [matLine],
  [matTabLabel],
  [matTabLink],
  [matTabNav],
  [matTooltip],
  mat-autocomplete,
  mat-button-toggle,
  mat-button-toggle,
  mat-button-toggle-group,
  mat-card,
  mat-card-actions,
  mat-card-content,
  mat-card-footer,
  mat-card-header,
  mat-card-subtitle,
  mat-card-title,
  mat-card-title-group,
  mat-checkbox,
  mat-chip,
  mat-dialog-actions,
  mat-dialog-container,
  mat-dialog-content,
  mat-divider,
  mat-error,
  mat-grid-list,
  mat-grid-tile,
  mat-grid-tile-footer,
  mat-grid-tile-header,
  mat-hint,
  mat-icon,
  mat-list,
  mat-list-item,
  mat-menu,
  mat-nav-list,
  mat-option,
  mat-placeholder,
  mat-progress-bar,
  mat-pseudo-checkbox,
  mat-radio-button,
  mat-radio-group,
  mat-select,
  mat-sidenav,
  mat-sidenav-container,
  mat-slider,
  mat-spinner,
  mat-tab,
  mat-tab-group,
  mat-toolbar`;
/** *
 * Selector that matches all elements that may have style collisions with AngularJS Material.
  @type {?} */
export const MD_ELEMENTS_SELECTOR = `
  [md-button],
  [md-fab],
  [md-icon-button],
  [md-mini-fab],
  [md-raised-button],
  [mdCardSubtitle],
  [mdCardTitle],
  [mdDialogActions],
  [mdDialogClose],
  [mdDialogContent],
  [mdDialogTitle],
  [mdLine],
  [mdTabLabel],
  [mdTabLink],
  [mdTabNav],
  [mdTooltip],
  md-autocomplete,
  md-button-toggle,
  md-button-toggle,
  md-button-toggle-group,
  md-card,
  md-card-actions,
  md-card-content,
  md-card-footer,
  md-card-header,
  md-card-subtitle,
  md-card-title,
  md-card-title-group,
  md-checkbox,
  md-chip,
  md-dialog-actions,
  md-dialog-container,
  md-dialog-content,
  md-divider,
  md-error,
  md-grid-list,
  md-grid-tile,
  md-grid-tile-footer,
  md-grid-tile-header,
  md-hint,
  md-icon,
  md-list,
  md-list-item,
  md-menu,
  md-nav-list,
  md-option,
  md-placeholder,
  md-progress-bar,
  md-pseudo-checkbox,
  md-radio-button,
  md-radio-group,
  md-select,
  md-sidenav,
  md-sidenav-container,
  md-slider,
  md-spinner,
  md-tab,
  md-tab-group,
  md-toolbar`;
/**
 * Directive that enforces that the `mat-` prefix cannot be used.
 */
export class MatPrefixRejector {
    /**
     * @param {?} isCompatibilityMode
     * @param {?} elementRef
     */
    constructor(isCompatibilityMode, elementRef) {
        if (!isCompatibilityMode) {
            throw getMdCompatibilityInvalidPrefixError('mat', elementRef.nativeElement.nodeName);
        }
    }
}
MatPrefixRejector.decorators = [
    { type: Directive, args: [{ selector: MAT_ELEMENTS_SELECTOR },] }
];
/** @nocollapse */
MatPrefixRejector.ctorParameters = () => [
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [MATERIAL_COMPATIBILITY_MODE,] }] },
    { type: ElementRef }
];
/**
 * Directive that enforces that the `md-` prefix cannot be used.
 */
export class MdPrefixRejector {
    /**
     * @param {?} isCompatibilityMode
     * @param {?} elementRef
     */
    constructor(isCompatibilityMode, elementRef) {
        if (isCompatibilityMode) {
            throw getMdCompatibilityInvalidPrefixError('md', elementRef.nativeElement.nodeName);
        }
    }
}
MdPrefixRejector.decorators = [
    { type: Directive, args: [{ selector: MD_ELEMENTS_SELECTOR },] }
];
/** @nocollapse */
MdPrefixRejector.ctorParameters = () => [
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [MATERIAL_COMPATIBILITY_MODE,] }] },
    { type: ElementRef }
];
/**
 * Module that enforces the default compatibility mode settings. When this module is loaded
 * without NoConflictStyleCompatibilityMode also being imported, it will throw an error if
 * there are any uses of the `mat-` prefix.
 */
export class CompatibilityModule {
}
CompatibilityModule.decorators = [
    { type: NgModule, args: [{
                declarations: [MatPrefixRejector, MdPrefixRejector],
                exports: [MatPrefixRejector, MdPrefixRejector],
            },] }
];
/**
 * Module that enforces "no-conflict" compatibility mode settings. When this module is loaded,
 * it will throw an error if there are any uses of the `md-` prefix.
 */
export class NoConflictStyleCompatibilityMode {
}
NoConflictStyleCompatibilityMode.decorators = [
    { type: NgModule, args: [{
                providers: [{
                        provide: MATERIAL_COMPATIBILITY_MODE, useValue: true,
                    }],
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGF0aWJpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2NvcmUvY29tcGF0aWJpbGl0eS9jb21wYXRpYmlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRWhHLGFBQWEsMkJBQTJCLEdBQUcsSUFBSSxjQUFjLENBQVUsdUJBQXVCLENBQUMsQ0FBQzs7Ozs7Ozs7O0FBT2hHLE1BQU0sK0NBQStDLE1BQWMsRUFBRSxRQUFnQjtJQUNuRixPQUFPLEtBQUssQ0FBQyxRQUFRLE1BQU0saUVBQWlFO1FBQzNFLHNCQUFzQixRQUFRLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO0NBQzVFOzs7O0FBR0QsYUFBYSxxQkFBcUIsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Y0EyRHZCLENBQUM7Ozs7QUFHZixhQUFhLG9CQUFvQixHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzthQTJEdkIsQ0FBQzs7OztBQUlkLE1BQU07Ozs7O0lBQ0osWUFDbUQsbUJBQTRCLEVBQzdFLFVBQXNCO1FBRXRCLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUN4QixNQUFNLG9DQUFvQyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3RGO0tBQ0Y7OztZQVRGLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxxQkFBcUIsRUFBQzs7OzswQ0FHdkMsUUFBUSxZQUFJLE1BQU0sU0FBQywyQkFBMkI7WUE5SUosVUFBVTs7Ozs7QUF5SnpELE1BQU07Ozs7O0lBQ0osWUFDbUQsbUJBQTRCLEVBQzdFLFVBQXNCO1FBRXRCLElBQUksbUJBQW1CLEVBQUU7WUFDdkIsTUFBTSxvQ0FBb0MsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyRjtLQUNGOzs7WUFURixTQUFTLFNBQUMsRUFBQyxRQUFRLEVBQUUsb0JBQW9CLEVBQUM7Ozs7MENBR3RDLFFBQVEsWUFBSSxNQUFNLFNBQUMsMkJBQTJCO1lBM0pKLFVBQVU7Ozs7Ozs7QUE4S3pELE1BQU07OztZQUpMLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQztnQkFDbkQsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUM7YUFDL0M7Ozs7OztBQWFELE1BQU07OztZQUxMLFFBQVEsU0FBQztnQkFDUixTQUFTLEVBQUUsQ0FBQzt3QkFDVixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsUUFBUSxFQUFFLElBQUk7cUJBQ3JELENBQUM7YUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsIERpcmVjdGl2ZSwgSW5qZWN0LCBPcHRpb25hbCwgRWxlbWVudFJlZiwgSW5qZWN0aW9uVG9rZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgTUFURVJJQUxfQ09NUEFUSUJJTElUWV9NT0RFID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdtZC1jb21wYXRpYmlsaXR5LW1vZGUnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGV4Y2VwdGlvbiB0byBiZSB0aHJvd24gaWYgdGhlIGNvbnN1bWVyIGhhcyB1c2VkXG4gKiBhbiBpbnZhbGlkIE1hdGVyaWFsIHByZWZpeCBvbiBhIGNvbXBvbmVudC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1kQ29tcGF0aWJpbGl0eUludmFsaWRQcmVmaXhFcnJvcihwcmVmaXg6IHN0cmluZywgbm9kZU5hbWU6IHN0cmluZykge1xuICByZXR1cm4gRXJyb3IoYFRoZSBcIiR7cHJlZml4fS1cIiBwcmVmaXggY2Fubm90IGJlIHVzZWQgaW4gbmctbWF0ZXJpYWwgdjEgY29tcGF0aWJpbGl0eSBtb2RlLiBgICtcbiAgICAgICAgICAgICAgICAgICBgSXQgd2FzIHVzZWQgb24gYW4gXCIke25vZGVOYW1lLnRvTG93ZXJDYXNlKCl9XCIgZWxlbWVudC5gKTtcbn1cblxuLyoqIFNlbGVjdG9yIHRoYXQgbWF0Y2hlcyBhbGwgZWxlbWVudHMgdGhhdCBtYXkgaGF2ZSBzdHlsZSBjb2xsaXNpb25zIHdpdGggQW5ndWxhckpTIE1hdGVyaWFsLiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9FTEVNRU5UU19TRUxFQ1RPUiA9IGBcbiAgW21hdC1idXR0b25dLFxuICBbbWF0LWZhYl0sXG4gIFttYXQtaWNvbi1idXR0b25dLFxuICBbbWF0LW1pbmktZmFiXSxcbiAgW21hdC1yYWlzZWQtYnV0dG9uXSxcbiAgW21hdENhcmRTdWJ0aXRsZV0sXG4gIFttYXRDYXJkVGl0bGVdLFxuICBbbWF0RGlhbG9nQWN0aW9uc10sXG4gIFttYXREaWFsb2dDbG9zZV0sXG4gIFttYXREaWFsb2dDb250ZW50XSxcbiAgW21hdERpYWxvZ1RpdGxlXSxcbiAgW21hdExpbmVdLFxuICBbbWF0VGFiTGFiZWxdLFxuICBbbWF0VGFiTGlua10sXG4gIFttYXRUYWJOYXZdLFxuICBbbWF0VG9vbHRpcF0sXG4gIG1hdC1hdXRvY29tcGxldGUsXG4gIG1hdC1idXR0b24tdG9nZ2xlLFxuICBtYXQtYnV0dG9uLXRvZ2dsZSxcbiAgbWF0LWJ1dHRvbi10b2dnbGUtZ3JvdXAsXG4gIG1hdC1jYXJkLFxuICBtYXQtY2FyZC1hY3Rpb25zLFxuICBtYXQtY2FyZC1jb250ZW50LFxuICBtYXQtY2FyZC1mb290ZXIsXG4gIG1hdC1jYXJkLWhlYWRlcixcbiAgbWF0LWNhcmQtc3VidGl0bGUsXG4gIG1hdC1jYXJkLXRpdGxlLFxuICBtYXQtY2FyZC10aXRsZS1ncm91cCxcbiAgbWF0LWNoZWNrYm94LFxuICBtYXQtY2hpcCxcbiAgbWF0LWRpYWxvZy1hY3Rpb25zLFxuICBtYXQtZGlhbG9nLWNvbnRhaW5lcixcbiAgbWF0LWRpYWxvZy1jb250ZW50LFxuICBtYXQtZGl2aWRlcixcbiAgbWF0LWVycm9yLFxuICBtYXQtZ3JpZC1saXN0LFxuICBtYXQtZ3JpZC10aWxlLFxuICBtYXQtZ3JpZC10aWxlLWZvb3RlcixcbiAgbWF0LWdyaWQtdGlsZS1oZWFkZXIsXG4gIG1hdC1oaW50LFxuICBtYXQtaWNvbixcbiAgbWF0LWxpc3QsXG4gIG1hdC1saXN0LWl0ZW0sXG4gIG1hdC1tZW51LFxuICBtYXQtbmF2LWxpc3QsXG4gIG1hdC1vcHRpb24sXG4gIG1hdC1wbGFjZWhvbGRlcixcbiAgbWF0LXByb2dyZXNzLWJhcixcbiAgbWF0LXBzZXVkby1jaGVja2JveCxcbiAgbWF0LXJhZGlvLWJ1dHRvbixcbiAgbWF0LXJhZGlvLWdyb3VwLFxuICBtYXQtc2VsZWN0LFxuICBtYXQtc2lkZW5hdixcbiAgbWF0LXNpZGVuYXYtY29udGFpbmVyLFxuICBtYXQtc2xpZGVyLFxuICBtYXQtc3Bpbm5lcixcbiAgbWF0LXRhYixcbiAgbWF0LXRhYi1ncm91cCxcbiAgbWF0LXRvb2xiYXJgO1xuXG4vKiogU2VsZWN0b3IgdGhhdCBtYXRjaGVzIGFsbCBlbGVtZW50cyB0aGF0IG1heSBoYXZlIHN0eWxlIGNvbGxpc2lvbnMgd2l0aCBBbmd1bGFySlMgTWF0ZXJpYWwuICovXG5leHBvcnQgY29uc3QgTURfRUxFTUVOVFNfU0VMRUNUT1IgPSBgXG4gIFttZC1idXR0b25dLFxuICBbbWQtZmFiXSxcbiAgW21kLWljb24tYnV0dG9uXSxcbiAgW21kLW1pbmktZmFiXSxcbiAgW21kLXJhaXNlZC1idXR0b25dLFxuICBbbWRDYXJkU3VidGl0bGVdLFxuICBbbWRDYXJkVGl0bGVdLFxuICBbbWREaWFsb2dBY3Rpb25zXSxcbiAgW21kRGlhbG9nQ2xvc2VdLFxuICBbbWREaWFsb2dDb250ZW50XSxcbiAgW21kRGlhbG9nVGl0bGVdLFxuICBbbWRMaW5lXSxcbiAgW21kVGFiTGFiZWxdLFxuICBbbWRUYWJMaW5rXSxcbiAgW21kVGFiTmF2XSxcbiAgW21kVG9vbHRpcF0sXG4gIG1kLWF1dG9jb21wbGV0ZSxcbiAgbWQtYnV0dG9uLXRvZ2dsZSxcbiAgbWQtYnV0dG9uLXRvZ2dsZSxcbiAgbWQtYnV0dG9uLXRvZ2dsZS1ncm91cCxcbiAgbWQtY2FyZCxcbiAgbWQtY2FyZC1hY3Rpb25zLFxuICBtZC1jYXJkLWNvbnRlbnQsXG4gIG1kLWNhcmQtZm9vdGVyLFxuICBtZC1jYXJkLWhlYWRlcixcbiAgbWQtY2FyZC1zdWJ0aXRsZSxcbiAgbWQtY2FyZC10aXRsZSxcbiAgbWQtY2FyZC10aXRsZS1ncm91cCxcbiAgbWQtY2hlY2tib3gsXG4gIG1kLWNoaXAsXG4gIG1kLWRpYWxvZy1hY3Rpb25zLFxuICBtZC1kaWFsb2ctY29udGFpbmVyLFxuICBtZC1kaWFsb2ctY29udGVudCxcbiAgbWQtZGl2aWRlcixcbiAgbWQtZXJyb3IsXG4gIG1kLWdyaWQtbGlzdCxcbiAgbWQtZ3JpZC10aWxlLFxuICBtZC1ncmlkLXRpbGUtZm9vdGVyLFxuICBtZC1ncmlkLXRpbGUtaGVhZGVyLFxuICBtZC1oaW50LFxuICBtZC1pY29uLFxuICBtZC1saXN0LFxuICBtZC1saXN0LWl0ZW0sXG4gIG1kLW1lbnUsXG4gIG1kLW5hdi1saXN0LFxuICBtZC1vcHRpb24sXG4gIG1kLXBsYWNlaG9sZGVyLFxuICBtZC1wcm9ncmVzcy1iYXIsXG4gIG1kLXBzZXVkby1jaGVja2JveCxcbiAgbWQtcmFkaW8tYnV0dG9uLFxuICBtZC1yYWRpby1ncm91cCxcbiAgbWQtc2VsZWN0LFxuICBtZC1zaWRlbmF2LFxuICBtZC1zaWRlbmF2LWNvbnRhaW5lcixcbiAgbWQtc2xpZGVyLFxuICBtZC1zcGlubmVyLFxuICBtZC10YWIsXG4gIG1kLXRhYi1ncm91cCxcbiAgbWQtdG9vbGJhcmA7XG5cbi8qKiBEaXJlY3RpdmUgdGhhdCBlbmZvcmNlcyB0aGF0IHRoZSBgbWF0LWAgcHJlZml4IGNhbm5vdCBiZSB1c2VkLiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6IE1BVF9FTEVNRU5UU19TRUxFQ1RPUn0pXG5leHBvcnQgY2xhc3MgTWF0UHJlZml4UmVqZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVEVSSUFMX0NPTVBBVElCSUxJVFlfTU9ERSkgaXNDb21wYXRpYmlsaXR5TW9kZTogYm9vbGVhbixcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG5cbiAgICBpZiAoIWlzQ29tcGF0aWJpbGl0eU1vZGUpIHtcbiAgICAgIHRocm93IGdldE1kQ29tcGF0aWJpbGl0eUludmFsaWRQcmVmaXhFcnJvcignbWF0JywgZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm5vZGVOYW1lKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqIERpcmVjdGl2ZSB0aGF0IGVuZm9yY2VzIHRoYXQgdGhlIGBtZC1gIHByZWZpeCBjYW5ub3QgYmUgdXNlZC4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiBNRF9FTEVNRU5UU19TRUxFQ1RPUn0pXG5leHBvcnQgY2xhc3MgTWRQcmVmaXhSZWplY3RvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFURVJJQUxfQ09NUEFUSUJJTElUWV9NT0RFKSBpc0NvbXBhdGliaWxpdHlNb2RlOiBib29sZWFuLFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcblxuICAgIGlmIChpc0NvbXBhdGliaWxpdHlNb2RlKSB7XG4gICAgICB0aHJvdyBnZXRNZENvbXBhdGliaWxpdHlJbnZhbGlkUHJlZml4RXJyb3IoJ21kJywgZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm5vZGVOYW1lKTtcbiAgICB9XG4gIH1cbn1cblxuXG4vKipcbiAqIE1vZHVsZSB0aGF0IGVuZm9yY2VzIHRoZSBkZWZhdWx0IGNvbXBhdGliaWxpdHkgbW9kZSBzZXR0aW5ncy4gV2hlbiB0aGlzIG1vZHVsZSBpcyBsb2FkZWRcbiAqIHdpdGhvdXQgTm9Db25mbGljdFN0eWxlQ29tcGF0aWJpbGl0eU1vZGUgYWxzbyBiZWluZyBpbXBvcnRlZCwgaXQgd2lsbCB0aHJvdyBhbiBlcnJvciBpZlxuICogdGhlcmUgYXJlIGFueSB1c2VzIG9mIHRoZSBgbWF0LWAgcHJlZml4LlxuICovXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtNYXRQcmVmaXhSZWplY3RvciwgTWRQcmVmaXhSZWplY3Rvcl0sXG4gIGV4cG9ydHM6IFtNYXRQcmVmaXhSZWplY3RvciwgTWRQcmVmaXhSZWplY3Rvcl0sXG59KVxuZXhwb3J0IGNsYXNzIENvbXBhdGliaWxpdHlNb2R1bGUge31cblxuXG4vKipcbiAqIE1vZHVsZSB0aGF0IGVuZm9yY2VzIFwibm8tY29uZmxpY3RcIiBjb21wYXRpYmlsaXR5IG1vZGUgc2V0dGluZ3MuIFdoZW4gdGhpcyBtb2R1bGUgaXMgbG9hZGVkLFxuICogaXQgd2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGVyZSBhcmUgYW55IHVzZXMgb2YgdGhlIGBtZC1gIHByZWZpeC5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IE1BVEVSSUFMX0NPTVBBVElCSUxJVFlfTU9ERSwgdXNlVmFsdWU6IHRydWUsXG4gIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBOb0NvbmZsaWN0U3R5bGVDb21wYXRpYmlsaXR5TW9kZSB7fVxuIl19