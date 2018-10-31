/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule, Directive, Inject, Optional, ElementRef, InjectionToken } from '@angular/core';
/** @type {?} */
export var MATERIAL_COMPATIBILITY_MODE = new InjectionToken('md-compatibility-mode');
/**
 * Returns an exception to be thrown if the consumer has used
 * an invalid Material prefix on a component.
 * \@docs-private
 * @param {?} prefix
 * @param {?} nodeName
 * @return {?}
 */
export function getMdCompatibilityInvalidPrefixError(prefix, nodeName) {
    return Error("The \"" + prefix + "-\" prefix cannot be used in ng-material v1 compatibility mode. " +
        ("It was used on an \"" + nodeName.toLowerCase() + "\" element."));
}
/** *
 * Selector that matches all elements that may have style collisions with AngularJS Material.
  @type {?} */
export var MAT_ELEMENTS_SELECTOR = "\n  [mat-button],\n  [mat-fab],\n  [mat-icon-button],\n  [mat-mini-fab],\n  [mat-raised-button],\n  [matCardSubtitle],\n  [matCardTitle],\n  [matDialogActions],\n  [matDialogClose],\n  [matDialogContent],\n  [matDialogTitle],\n  [matLine],\n  [matTabLabel],\n  [matTabLink],\n  [matTabNav],\n  [matTooltip],\n  mat-autocomplete,\n  mat-button-toggle,\n  mat-button-toggle,\n  mat-button-toggle-group,\n  mat-card,\n  mat-card-actions,\n  mat-card-content,\n  mat-card-footer,\n  mat-card-header,\n  mat-card-subtitle,\n  mat-card-title,\n  mat-card-title-group,\n  mat-checkbox,\n  mat-chip,\n  mat-dialog-actions,\n  mat-dialog-container,\n  mat-dialog-content,\n  mat-divider,\n  mat-error,\n  mat-grid-list,\n  mat-grid-tile,\n  mat-grid-tile-footer,\n  mat-grid-tile-header,\n  mat-hint,\n  mat-icon,\n  mat-list,\n  mat-list-item,\n  mat-menu,\n  mat-nav-list,\n  mat-option,\n  mat-placeholder,\n  mat-progress-bar,\n  mat-pseudo-checkbox,\n  mat-radio-button,\n  mat-radio-group,\n  mat-select,\n  mat-sidenav,\n  mat-sidenav-container,\n  mat-slider,\n  mat-spinner,\n  mat-tab,\n  mat-tab-group,\n  mat-toolbar";
/** *
 * Selector that matches all elements that may have style collisions with AngularJS Material.
  @type {?} */
export var MD_ELEMENTS_SELECTOR = "\n  [md-button],\n  [md-fab],\n  [md-icon-button],\n  [md-mini-fab],\n  [md-raised-button],\n  [mdCardSubtitle],\n  [mdCardTitle],\n  [mdDialogActions],\n  [mdDialogClose],\n  [mdDialogContent],\n  [mdDialogTitle],\n  [mdLine],\n  [mdTabLabel],\n  [mdTabLink],\n  [mdTabNav],\n  [mdTooltip],\n  md-autocomplete,\n  md-button-toggle,\n  md-button-toggle,\n  md-button-toggle-group,\n  md-card,\n  md-card-actions,\n  md-card-content,\n  md-card-footer,\n  md-card-header,\n  md-card-subtitle,\n  md-card-title,\n  md-card-title-group,\n  md-checkbox,\n  md-chip,\n  md-dialog-actions,\n  md-dialog-container,\n  md-dialog-content,\n  md-divider,\n  md-error,\n  md-grid-list,\n  md-grid-tile,\n  md-grid-tile-footer,\n  md-grid-tile-header,\n  md-hint,\n  md-icon,\n  md-list,\n  md-list-item,\n  md-menu,\n  md-nav-list,\n  md-option,\n  md-placeholder,\n  md-progress-bar,\n  md-pseudo-checkbox,\n  md-radio-button,\n  md-radio-group,\n  md-select,\n  md-sidenav,\n  md-sidenav-container,\n  md-slider,\n  md-spinner,\n  md-tab,\n  md-tab-group,\n  md-toolbar";
/**
 * Directive that enforces that the `mat-` prefix cannot be used.
 */
var MatPrefixRejector = /** @class */ (function () {
    function MatPrefixRejector(isCompatibilityMode, elementRef) {
        if (!isCompatibilityMode) {
            throw getMdCompatibilityInvalidPrefixError('mat', elementRef.nativeElement.nodeName);
        }
    }
    MatPrefixRejector.decorators = [
        { type: Directive, args: [{ selector: MAT_ELEMENTS_SELECTOR },] }
    ];
    /** @nocollapse */
    MatPrefixRejector.ctorParameters = function () { return [
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [MATERIAL_COMPATIBILITY_MODE,] }] },
        { type: ElementRef }
    ]; };
    return MatPrefixRejector;
}());
export { MatPrefixRejector };
/**
 * Directive that enforces that the `md-` prefix cannot be used.
 */
var MdPrefixRejector = /** @class */ (function () {
    function MdPrefixRejector(isCompatibilityMode, elementRef) {
        if (isCompatibilityMode) {
            throw getMdCompatibilityInvalidPrefixError('md', elementRef.nativeElement.nodeName);
        }
    }
    MdPrefixRejector.decorators = [
        { type: Directive, args: [{ selector: MD_ELEMENTS_SELECTOR },] }
    ];
    /** @nocollapse */
    MdPrefixRejector.ctorParameters = function () { return [
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [MATERIAL_COMPATIBILITY_MODE,] }] },
        { type: ElementRef }
    ]; };
    return MdPrefixRejector;
}());
export { MdPrefixRejector };
/**
 * Module that enforces the default compatibility mode settings. When this module is loaded
 * without NoConflictStyleCompatibilityMode also being imported, it will throw an error if
 * there are any uses of the `mat-` prefix.
 */
var CompatibilityModule = /** @class */ (function () {
    function CompatibilityModule() {
    }
    CompatibilityModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [MatPrefixRejector, MdPrefixRejector],
                    exports: [MatPrefixRejector, MdPrefixRejector],
                },] }
    ];
    return CompatibilityModule;
}());
export { CompatibilityModule };
/**
 * Module that enforces "no-conflict" compatibility mode settings. When this module is loaded,
 * it will throw an error if there are any uses of the `md-` prefix.
 */
var NoConflictStyleCompatibilityMode = /** @class */ (function () {
    function NoConflictStyleCompatibilityMode() {
    }
    NoConflictStyleCompatibilityMode.decorators = [
        { type: NgModule, args: [{
                    providers: [{
                            provide: MATERIAL_COMPATIBILITY_MODE, useValue: true,
                        }],
                },] }
    ];
    return NoConflictStyleCompatibilityMode;
}());
export { NoConflictStyleCompatibilityMode };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGF0aWJpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2NvcmUvY29tcGF0aWJpbGl0eS9jb21wYXRpYmlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRWhHLFdBQWEsMkJBQTJCLEdBQUcsSUFBSSxjQUFjLENBQVUsdUJBQXVCLENBQUMsQ0FBQzs7Ozs7Ozs7O0FBT2hHLE1BQU0sK0NBQStDLE1BQWMsRUFBRSxRQUFnQjtJQUNuRixPQUFPLEtBQUssQ0FBQyxXQUFRLE1BQU0scUVBQWlFO1NBQzNFLHlCQUFzQixRQUFRLENBQUMsV0FBVyxFQUFFLGdCQUFZLENBQUEsQ0FBQyxDQUFDO0NBQzVFOzs7O0FBR0QsV0FBYSxxQkFBcUIsR0FBRyxpbUNBMkR2QixDQUFDOzs7O0FBR2YsV0FBYSxvQkFBb0IsR0FBRyxzaUNBMkR2QixDQUFDOzs7OztJQUtaLDJCQUNtRCxtQkFBNEIsRUFDN0UsVUFBc0I7UUFFdEIsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQ3hCLE1BQU0sb0NBQW9DLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdEY7S0FDRjs7Z0JBVEYsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLHFCQUFxQixFQUFDOzs7OzhDQUd2QyxRQUFRLFlBQUksTUFBTSxTQUFDLDJCQUEyQjtnQkE5SUosVUFBVTs7NEJBQXpEOztTQTRJYSxpQkFBaUI7Ozs7O0lBYzVCLDBCQUNtRCxtQkFBNEIsRUFDN0UsVUFBc0I7UUFFdEIsSUFBSSxtQkFBbUIsRUFBRTtZQUN2QixNQUFNLG9DQUFvQyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JGO0tBQ0Y7O2dCQVRGLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxvQkFBb0IsRUFBQzs7Ozs4Q0FHdEMsUUFBUSxZQUFJLE1BQU0sU0FBQywyQkFBMkI7Z0JBM0pKLFVBQVU7OzJCQUF6RDs7U0F5SmEsZ0JBQWdCOzs7Ozs7Ozs7O2dCQWlCNUIsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFFLGdCQUFnQixDQUFDO29CQUNuRCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQztpQkFDL0M7OzhCQTdLRDs7U0E4S2EsbUJBQW1COzs7Ozs7Ozs7Z0JBTy9CLFFBQVEsU0FBQztvQkFDUixTQUFTLEVBQUUsQ0FBQzs0QkFDVixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsUUFBUSxFQUFFLElBQUk7eUJBQ3JELENBQUM7aUJBQ0g7OzJDQXpMRDs7U0EwTGEsZ0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSwgRGlyZWN0aXZlLCBJbmplY3QsIE9wdGlvbmFsLCBFbGVtZW50UmVmLCBJbmplY3Rpb25Ub2tlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjb25zdCBNQVRFUklBTF9DT01QQVRJQklMSVRZX01PREUgPSBuZXcgSW5qZWN0aW9uVG9rZW48Ym9vbGVhbj4oJ21kLWNvbXBhdGliaWxpdHktbW9kZScpO1xuXG4vKipcbiAqIFJldHVybnMgYW4gZXhjZXB0aW9uIHRvIGJlIHRocm93biBpZiB0aGUgY29uc3VtZXIgaGFzIHVzZWRcbiAqIGFuIGludmFsaWQgTWF0ZXJpYWwgcHJlZml4IG9uIGEgY29tcG9uZW50LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWRDb21wYXRpYmlsaXR5SW52YWxpZFByZWZpeEVycm9yKHByZWZpeDogc3RyaW5nLCBub2RlTmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBFcnJvcihgVGhlIFwiJHtwcmVmaXh9LVwiIHByZWZpeCBjYW5ub3QgYmUgdXNlZCBpbiBuZy1tYXRlcmlhbCB2MSBjb21wYXRpYmlsaXR5IG1vZGUuIGAgK1xuICAgICAgICAgICAgICAgICAgIGBJdCB3YXMgdXNlZCBvbiBhbiBcIiR7bm9kZU5hbWUudG9Mb3dlckNhc2UoKX1cIiBlbGVtZW50LmApO1xufVxuXG4vKiogU2VsZWN0b3IgdGhhdCBtYXRjaGVzIGFsbCBlbGVtZW50cyB0aGF0IG1heSBoYXZlIHN0eWxlIGNvbGxpc2lvbnMgd2l0aCBBbmd1bGFySlMgTWF0ZXJpYWwuICovXG5leHBvcnQgY29uc3QgTUFUX0VMRU1FTlRTX1NFTEVDVE9SID0gYFxuICBbbWF0LWJ1dHRvbl0sXG4gIFttYXQtZmFiXSxcbiAgW21hdC1pY29uLWJ1dHRvbl0sXG4gIFttYXQtbWluaS1mYWJdLFxuICBbbWF0LXJhaXNlZC1idXR0b25dLFxuICBbbWF0Q2FyZFN1YnRpdGxlXSxcbiAgW21hdENhcmRUaXRsZV0sXG4gIFttYXREaWFsb2dBY3Rpb25zXSxcbiAgW21hdERpYWxvZ0Nsb3NlXSxcbiAgW21hdERpYWxvZ0NvbnRlbnRdLFxuICBbbWF0RGlhbG9nVGl0bGVdLFxuICBbbWF0TGluZV0sXG4gIFttYXRUYWJMYWJlbF0sXG4gIFttYXRUYWJMaW5rXSxcbiAgW21hdFRhYk5hdl0sXG4gIFttYXRUb29sdGlwXSxcbiAgbWF0LWF1dG9jb21wbGV0ZSxcbiAgbWF0LWJ1dHRvbi10b2dnbGUsXG4gIG1hdC1idXR0b24tdG9nZ2xlLFxuICBtYXQtYnV0dG9uLXRvZ2dsZS1ncm91cCxcbiAgbWF0LWNhcmQsXG4gIG1hdC1jYXJkLWFjdGlvbnMsXG4gIG1hdC1jYXJkLWNvbnRlbnQsXG4gIG1hdC1jYXJkLWZvb3RlcixcbiAgbWF0LWNhcmQtaGVhZGVyLFxuICBtYXQtY2FyZC1zdWJ0aXRsZSxcbiAgbWF0LWNhcmQtdGl0bGUsXG4gIG1hdC1jYXJkLXRpdGxlLWdyb3VwLFxuICBtYXQtY2hlY2tib3gsXG4gIG1hdC1jaGlwLFxuICBtYXQtZGlhbG9nLWFjdGlvbnMsXG4gIG1hdC1kaWFsb2ctY29udGFpbmVyLFxuICBtYXQtZGlhbG9nLWNvbnRlbnQsXG4gIG1hdC1kaXZpZGVyLFxuICBtYXQtZXJyb3IsXG4gIG1hdC1ncmlkLWxpc3QsXG4gIG1hdC1ncmlkLXRpbGUsXG4gIG1hdC1ncmlkLXRpbGUtZm9vdGVyLFxuICBtYXQtZ3JpZC10aWxlLWhlYWRlcixcbiAgbWF0LWhpbnQsXG4gIG1hdC1pY29uLFxuICBtYXQtbGlzdCxcbiAgbWF0LWxpc3QtaXRlbSxcbiAgbWF0LW1lbnUsXG4gIG1hdC1uYXYtbGlzdCxcbiAgbWF0LW9wdGlvbixcbiAgbWF0LXBsYWNlaG9sZGVyLFxuICBtYXQtcHJvZ3Jlc3MtYmFyLFxuICBtYXQtcHNldWRvLWNoZWNrYm94LFxuICBtYXQtcmFkaW8tYnV0dG9uLFxuICBtYXQtcmFkaW8tZ3JvdXAsXG4gIG1hdC1zZWxlY3QsXG4gIG1hdC1zaWRlbmF2LFxuICBtYXQtc2lkZW5hdi1jb250YWluZXIsXG4gIG1hdC1zbGlkZXIsXG4gIG1hdC1zcGlubmVyLFxuICBtYXQtdGFiLFxuICBtYXQtdGFiLWdyb3VwLFxuICBtYXQtdG9vbGJhcmA7XG5cbi8qKiBTZWxlY3RvciB0aGF0IG1hdGNoZXMgYWxsIGVsZW1lbnRzIHRoYXQgbWF5IGhhdmUgc3R5bGUgY29sbGlzaW9ucyB3aXRoIEFuZ3VsYXJKUyBNYXRlcmlhbC4gKi9cbmV4cG9ydCBjb25zdCBNRF9FTEVNRU5UU19TRUxFQ1RPUiA9IGBcbiAgW21kLWJ1dHRvbl0sXG4gIFttZC1mYWJdLFxuICBbbWQtaWNvbi1idXR0b25dLFxuICBbbWQtbWluaS1mYWJdLFxuICBbbWQtcmFpc2VkLWJ1dHRvbl0sXG4gIFttZENhcmRTdWJ0aXRsZV0sXG4gIFttZENhcmRUaXRsZV0sXG4gIFttZERpYWxvZ0FjdGlvbnNdLFxuICBbbWREaWFsb2dDbG9zZV0sXG4gIFttZERpYWxvZ0NvbnRlbnRdLFxuICBbbWREaWFsb2dUaXRsZV0sXG4gIFttZExpbmVdLFxuICBbbWRUYWJMYWJlbF0sXG4gIFttZFRhYkxpbmtdLFxuICBbbWRUYWJOYXZdLFxuICBbbWRUb29sdGlwXSxcbiAgbWQtYXV0b2NvbXBsZXRlLFxuICBtZC1idXR0b24tdG9nZ2xlLFxuICBtZC1idXR0b24tdG9nZ2xlLFxuICBtZC1idXR0b24tdG9nZ2xlLWdyb3VwLFxuICBtZC1jYXJkLFxuICBtZC1jYXJkLWFjdGlvbnMsXG4gIG1kLWNhcmQtY29udGVudCxcbiAgbWQtY2FyZC1mb290ZXIsXG4gIG1kLWNhcmQtaGVhZGVyLFxuICBtZC1jYXJkLXN1YnRpdGxlLFxuICBtZC1jYXJkLXRpdGxlLFxuICBtZC1jYXJkLXRpdGxlLWdyb3VwLFxuICBtZC1jaGVja2JveCxcbiAgbWQtY2hpcCxcbiAgbWQtZGlhbG9nLWFjdGlvbnMsXG4gIG1kLWRpYWxvZy1jb250YWluZXIsXG4gIG1kLWRpYWxvZy1jb250ZW50LFxuICBtZC1kaXZpZGVyLFxuICBtZC1lcnJvcixcbiAgbWQtZ3JpZC1saXN0LFxuICBtZC1ncmlkLXRpbGUsXG4gIG1kLWdyaWQtdGlsZS1mb290ZXIsXG4gIG1kLWdyaWQtdGlsZS1oZWFkZXIsXG4gIG1kLWhpbnQsXG4gIG1kLWljb24sXG4gIG1kLWxpc3QsXG4gIG1kLWxpc3QtaXRlbSxcbiAgbWQtbWVudSxcbiAgbWQtbmF2LWxpc3QsXG4gIG1kLW9wdGlvbixcbiAgbWQtcGxhY2Vob2xkZXIsXG4gIG1kLXByb2dyZXNzLWJhcixcbiAgbWQtcHNldWRvLWNoZWNrYm94LFxuICBtZC1yYWRpby1idXR0b24sXG4gIG1kLXJhZGlvLWdyb3VwLFxuICBtZC1zZWxlY3QsXG4gIG1kLXNpZGVuYXYsXG4gIG1kLXNpZGVuYXYtY29udGFpbmVyLFxuICBtZC1zbGlkZXIsXG4gIG1kLXNwaW5uZXIsXG4gIG1kLXRhYixcbiAgbWQtdGFiLWdyb3VwLFxuICBtZC10b29sYmFyYDtcblxuLyoqIERpcmVjdGl2ZSB0aGF0IGVuZm9yY2VzIHRoYXQgdGhlIGBtYXQtYCBwcmVmaXggY2Fubm90IGJlIHVzZWQuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogTUFUX0VMRU1FTlRTX1NFTEVDVE9SfSlcbmV4cG9ydCBjbGFzcyBNYXRQcmVmaXhSZWplY3RvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFURVJJQUxfQ09NUEFUSUJJTElUWV9NT0RFKSBpc0NvbXBhdGliaWxpdHlNb2RlOiBib29sZWFuLFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcblxuICAgIGlmICghaXNDb21wYXRpYmlsaXR5TW9kZSkge1xuICAgICAgdGhyb3cgZ2V0TWRDb21wYXRpYmlsaXR5SW52YWxpZFByZWZpeEVycm9yKCdtYXQnLCBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQubm9kZU5hbWUpO1xuICAgIH1cbiAgfVxufVxuXG4vKiogRGlyZWN0aXZlIHRoYXQgZW5mb3JjZXMgdGhhdCB0aGUgYG1kLWAgcHJlZml4IGNhbm5vdCBiZSB1c2VkLiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6IE1EX0VMRU1FTlRTX1NFTEVDVE9SfSlcbmV4cG9ydCBjbGFzcyBNZFByZWZpeFJlamVjdG9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRFUklBTF9DT01QQVRJQklMSVRZX01PREUpIGlzQ29tcGF0aWJpbGl0eU1vZGU6IGJvb2xlYW4sXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuXG4gICAgaWYgKGlzQ29tcGF0aWJpbGl0eU1vZGUpIHtcbiAgICAgIHRocm93IGdldE1kQ29tcGF0aWJpbGl0eUludmFsaWRQcmVmaXhFcnJvcignbWQnLCBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQubm9kZU5hbWUpO1xuICAgIH1cbiAgfVxufVxuXG5cbi8qKlxuICogTW9kdWxlIHRoYXQgZW5mb3JjZXMgdGhlIGRlZmF1bHQgY29tcGF0aWJpbGl0eSBtb2RlIHNldHRpbmdzLiBXaGVuIHRoaXMgbW9kdWxlIGlzIGxvYWRlZFxuICogd2l0aG91dCBOb0NvbmZsaWN0U3R5bGVDb21wYXRpYmlsaXR5TW9kZSBhbHNvIGJlaW5nIGltcG9ydGVkLCBpdCB3aWxsIHRocm93IGFuIGVycm9yIGlmXG4gKiB0aGVyZSBhcmUgYW55IHVzZXMgb2YgdGhlIGBtYXQtYCBwcmVmaXguXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW01hdFByZWZpeFJlamVjdG9yLCBNZFByZWZpeFJlamVjdG9yXSxcbiAgZXhwb3J0czogW01hdFByZWZpeFJlamVjdG9yLCBNZFByZWZpeFJlamVjdG9yXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tcGF0aWJpbGl0eU1vZHVsZSB7fVxuXG5cbi8qKlxuICogTW9kdWxlIHRoYXQgZW5mb3JjZXMgXCJuby1jb25mbGljdFwiIGNvbXBhdGliaWxpdHkgbW9kZSBzZXR0aW5ncy4gV2hlbiB0aGlzIG1vZHVsZSBpcyBsb2FkZWQsXG4gKiBpdCB3aWxsIHRocm93IGFuIGVycm9yIGlmIHRoZXJlIGFyZSBhbnkgdXNlcyBvZiB0aGUgYG1kLWAgcHJlZml4LlxuICovXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFt7XG4gICAgcHJvdmlkZTogTUFURVJJQUxfQ09NUEFUSUJJTElUWV9NT0RFLCB1c2VWYWx1ZTogdHJ1ZSxcbiAgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE5vQ29uZmxpY3RTdHlsZUNvbXBhdGliaWxpdHlNb2RlIHt9XG4iXX0=