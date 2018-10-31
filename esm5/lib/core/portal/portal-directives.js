/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgModule, Directive, TemplateRef, ComponentFactoryResolver, ViewContainerRef, Input, } from '@angular/core';
import { TemplatePortal, BasePortalHost } from './portal';
/**
 * Directive version of a `TemplatePortal`. Because the directive *is* a TemplatePortal,
 * the directive instance itself can be attached to a host, enabling declarative use of portals.
 *
 * Usage:
 * <ng-template portal #greeting>
 *   <p> Hello {{name}} </p>
 * </ng-template>
 */
var TemplatePortalDirective = /** @class */ (function (_super) {
    tslib_1.__extends(TemplatePortalDirective, _super);
    function TemplatePortalDirective(templateRef, viewContainerRef) {
        return _super.call(this, templateRef, viewContainerRef) || this;
    }
    TemplatePortalDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[cdk-portal], [cdkPortal], [portal]',
                    exportAs: 'cdkPortal',
                },] }
    ];
    /** @nocollapse */
    TemplatePortalDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: ViewContainerRef }
    ]; };
    return TemplatePortalDirective;
}(TemplatePortal));
export { TemplatePortalDirective };
/**
 * Directive version of a PortalHost. Because the directive *is* a PortalHost, portals can be
 * directly attached to it, enabling declarative use.
 *
 * Usage:
 * <ng-template [cdkPortalHost]="greeting"></ng-template>
 */
var PortalHostDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PortalHostDirective, _super);
    function PortalHostDirective(_componentFactoryResolver, _viewContainerRef) {
        var _this = _super.call(this) || this;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._viewContainerRef = _viewContainerRef;
        return _this;
    }
    Object.defineProperty(PortalHostDirective.prototype, "_deprecatedPortal", {
        /** @deprecated */
        get: /**
         * @deprecated
         * @return {?}
         */
        function () { return this.portal; },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) { this.portal = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortalHostDirective.prototype, "portal", {
        /** Portal associated with the Portal host. */
        get: /**
         * Portal associated with the Portal host.
         * @return {?}
         */
        function () {
            return this._portal;
        },
        set: /**
         * @param {?} portal
         * @return {?}
         */
        function (portal) {
            if (this.hasAttached()) {
                _super.prototype.detach.call(this);
            }
            if (portal) {
                _super.prototype.attach.call(this, portal);
            }
            this._portal = portal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PortalHostDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.dispose.call(this);
        this._portal = null;
    };
    /**
     * Attach the given ComponentPortal to this PortalHost using the ComponentFactoryResolver.
     *
     * @param portal Portal to be attached to the portal host.
     */
    /**
     * Attach the given ComponentPortal to this PortalHost using the ComponentFactoryResolver.
     *
     * @template T
     * @param {?} portal Portal to be attached to the portal host.
     * @return {?}
     */
    PortalHostDirective.prototype.attachComponentPortal = /**
     * Attach the given ComponentPortal to this PortalHost using the ComponentFactoryResolver.
     *
     * @template T
     * @param {?} portal Portal to be attached to the portal host.
     * @return {?}
     */
    function (portal) {
        portal.setAttachedHost(this);
        /** @type {?} */
        var viewContainerRef = portal.viewContainerRef != null ?
            portal.viewContainerRef :
            this._viewContainerRef;
        /** @type {?} */
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        /** @type {?} */
        var ref = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, portal.injector || viewContainerRef.parentInjector);
        _super.prototype.setDisposeFn.call(this, function () { return ref.destroy(); });
        this._portal = portal;
        return ref;
    };
    /**
     * Attach the given TemplatePortal to this PortlHost as an embedded View.
     * @param portal Portal to be attached.
     */
    /**
     * Attach the given TemplatePortal to this PortlHost as an embedded View.
     * @param {?} portal Portal to be attached.
     * @return {?}
     */
    PortalHostDirective.prototype.attachTemplatePortal = /**
     * Attach the given TemplatePortal to this PortlHost as an embedded View.
     * @param {?} portal Portal to be attached.
     * @return {?}
     */
    function (portal) {
        var _this = this;
        portal.setAttachedHost(this);
        this._viewContainerRef.createEmbeddedView(portal.templateRef);
        _super.prototype.setDisposeFn.call(this, function () { return _this._viewContainerRef.clear(); });
        this._portal = portal;
        // TODO(jelbourn): return locals from view
        return new Map();
    };
    PortalHostDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkPortalHost], [portalHost]',
                    inputs: ['portal: cdkPortalHost']
                },] }
    ];
    /** @nocollapse */
    PortalHostDirective.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ViewContainerRef }
    ]; };
    PortalHostDirective.propDecorators = {
        _deprecatedPortal: [{ type: Input, args: ['portalHost',] }]
    };
    return PortalHostDirective;
}(BasePortalHost));
export { PortalHostDirective };
if (false) {
    /**
     * The attached portal.
     * @type {?}
     */
    PortalHostDirective.prototype._portal;
    /** @type {?} */
    PortalHostDirective.prototype._componentFactoryResolver;
    /** @type {?} */
    PortalHostDirective.prototype._viewContainerRef;
}
var PortalModule = /** @class */ (function () {
    function PortalModule() {
    }
    PortalModule.decorators = [
        { type: NgModule, args: [{
                    exports: [TemplatePortalDirective, PortalHostDirective],
                    declarations: [TemplatePortalDirective, PortalHostDirective],
                },] }
    ];
    return PortalModule;
}());
export { PortalModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGFsLWRpcmVjdGl2ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL3BvcnRhbC9wb3J0YWwtZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDSCxRQUFRLEVBRVIsU0FBUyxFQUNULFdBQVcsRUFDWCx3QkFBd0IsRUFDeEIsZ0JBQWdCLEVBRWhCLEtBQUssR0FDUixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQVMsY0FBYyxFQUFtQixjQUFjLEVBQUMsTUFBTSxVQUFVLENBQUM7Ozs7Ozs7Ozs7O0lBZ0JwQyxtREFBYztJQUN6RCxpQ0FBWSxXQUE2QixFQUFFLGdCQUFrQztlQUMzRSxrQkFBTSxXQUFXLEVBQUUsZ0JBQWdCLENBQUM7S0FDckM7O2dCQVBGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUNBQXFDO29CQUMvQyxRQUFRLEVBQUUsV0FBVztpQkFDdEI7Ozs7Z0JBckJHLFdBQVc7Z0JBRVgsZ0JBQWdCOztrQ0FOcEI7RUEwQjZDLGNBQWM7U0FBOUMsdUJBQXVCOzs7Ozs7Ozs7SUFrQkssK0NBQWM7SUFJckQsNkJBQ1ksMkJBQ0E7UUFGWixZQUdFLGlCQUFPLFNBQ1I7UUFIVywrQkFBeUIsR0FBekIseUJBQXlCO1FBQ3pCLHVCQUFpQixHQUFqQixpQkFBaUI7O0tBRTVCO0lBR0Qsc0JBQ0ksa0RBQWlCO1FBRnJCLGtCQUFrQjs7Ozs7UUFDbEIsY0FDMEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Ozs7O1FBQy9DLFVBQXNCLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFOzs7T0FERTtJQUkvQyxzQkFBSSx1Q0FBTTtRQURWLDhDQUE4Qzs7Ozs7UUFDOUM7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDckI7Ozs7O1FBRUQsVUFBVyxNQUFtQjtZQUM1QixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDdEIsaUJBQU0sTUFBTSxXQUFFLENBQUM7YUFDaEI7WUFFRCxJQUFJLE1BQU0sRUFBRTtnQkFDVixpQkFBTSxNQUFNLFlBQUMsTUFBTSxDQUFDLENBQUM7YUFDdEI7WUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztTQUN2Qjs7O09BWkE7Ozs7SUFjRCx5Q0FBVzs7O0lBQVg7UUFDRSxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztLQUNyQjtJQUVEOzs7O09BSUc7Ozs7Ozs7O0lBQ0gsbURBQXFCOzs7Ozs7O0lBQXJCLFVBQXlCLE1BQTBCO1FBQ2pELE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBSTdCLElBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQzs7UUFFM0IsSUFBSSxnQkFBZ0IsR0FDaEIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7UUFDN0UsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsZUFBZSxDQUN0QyxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQ3pDLE1BQU0sQ0FBQyxRQUFRLElBQUksZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFeEQsaUJBQU0sWUFBWSxZQUFDLGNBQU0sT0FBQSxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQWIsQ0FBYSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFFdEIsT0FBTyxHQUFHLENBQUM7S0FDWjtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsa0RBQW9COzs7OztJQUFwQixVQUFxQixNQUFzQjtRQUEzQyxpQkFVQztRQVRDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5RCxpQkFBTSxZQUFZLFlBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBOUIsQ0FBOEIsQ0FBQyxDQUFDO1FBRXpELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDOztRQUd0QixPQUFPLElBQUksR0FBRyxFQUFlLENBQUM7S0FDL0I7O2dCQWpGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLCtCQUErQjtvQkFDekMsTUFBTSxFQUFFLENBQUMsdUJBQXVCLENBQUM7aUJBQ2xDOzs7O2dCQXRDRyx3QkFBd0I7Z0JBQ3hCLGdCQUFnQjs7O29DQWlEakIsS0FBSyxTQUFDLFlBQVk7OzhCQXZEckI7RUE0Q3lDLGNBQWM7U0FBMUMsbUJBQW1COzs7Ozs7Ozs7Ozs7Ozs7O2dCQWlGL0IsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLHVCQUF1QixFQUFFLG1CQUFtQixDQUFDO29CQUN2RCxZQUFZLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxtQkFBbUIsQ0FBQztpQkFDN0Q7O3VCQWhJRDs7U0FpSWEsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgTmdNb2R1bGUsXG4gICAgQ29tcG9uZW50UmVmLFxuICAgIERpcmVjdGl2ZSxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBPbkRlc3Ryb3ksXG4gICAgSW5wdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtQb3J0YWwsIFRlbXBsYXRlUG9ydGFsLCBDb21wb25lbnRQb3J0YWwsIEJhc2VQb3J0YWxIb3N0fSBmcm9tICcuL3BvcnRhbCc7XG5cblxuLyoqXG4gKiBEaXJlY3RpdmUgdmVyc2lvbiBvZiBhIGBUZW1wbGF0ZVBvcnRhbGAuIEJlY2F1c2UgdGhlIGRpcmVjdGl2ZSAqaXMqIGEgVGVtcGxhdGVQb3J0YWwsXG4gKiB0aGUgZGlyZWN0aXZlIGluc3RhbmNlIGl0c2VsZiBjYW4gYmUgYXR0YWNoZWQgdG8gYSBob3N0LCBlbmFibGluZyBkZWNsYXJhdGl2ZSB1c2Ugb2YgcG9ydGFscy5cbiAqXG4gKiBVc2FnZTpcbiAqIDxuZy10ZW1wbGF0ZSBwb3J0YWwgI2dyZWV0aW5nPlxuICogICA8cD4gSGVsbG8ge3tuYW1lfX0gPC9wPlxuICogPC9uZy10ZW1wbGF0ZT5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Nkay1wb3J0YWxdLCBbY2RrUG9ydGFsXSwgW3BvcnRhbF0nLFxuICBleHBvcnRBczogJ2Nka1BvcnRhbCcsXG59KVxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlUG9ydGFsRGlyZWN0aXZlIGV4dGVuZHMgVGVtcGxhdGVQb3J0YWwge1xuICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Piwgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIHN1cGVyKHRlbXBsYXRlUmVmLCB2aWV3Q29udGFpbmVyUmVmKTtcbiAgfVxufVxuXG5cbi8qKlxuICogRGlyZWN0aXZlIHZlcnNpb24gb2YgYSBQb3J0YWxIb3N0LiBCZWNhdXNlIHRoZSBkaXJlY3RpdmUgKmlzKiBhIFBvcnRhbEhvc3QsIHBvcnRhbHMgY2FuIGJlXG4gKiBkaXJlY3RseSBhdHRhY2hlZCB0byBpdCwgZW5hYmxpbmcgZGVjbGFyYXRpdmUgdXNlLlxuICpcbiAqIFVzYWdlOlxuICogPG5nLXRlbXBsYXRlIFtjZGtQb3J0YWxIb3N0XT1cImdyZWV0aW5nXCI+PC9uZy10ZW1wbGF0ZT5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Nka1BvcnRhbEhvc3RdLCBbcG9ydGFsSG9zdF0nLFxuICBpbnB1dHM6IFsncG9ydGFsOiBjZGtQb3J0YWxIb3N0J11cbn0pXG5leHBvcnQgY2xhc3MgUG9ydGFsSG9zdERpcmVjdGl2ZSBleHRlbmRzIEJhc2VQb3J0YWxIb3N0IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqIFRoZSBhdHRhY2hlZCBwb3J0YWwuICovXG4gIHByaXZhdGUgX3BvcnRhbDogUG9ydGFsPGFueT47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkICovXG4gIEBJbnB1dCgncG9ydGFsSG9zdCcpXG4gIGdldCBfZGVwcmVjYXRlZFBvcnRhbCgpIHsgcmV0dXJuIHRoaXMucG9ydGFsOyB9XG4gIHNldCBfZGVwcmVjYXRlZFBvcnRhbCh2KSB7IHRoaXMucG9ydGFsID0gdjsgfVxuXG4gIC8qKiBQb3J0YWwgYXNzb2NpYXRlZCB3aXRoIHRoZSBQb3J0YWwgaG9zdC4gKi9cbiAgZ2V0IHBvcnRhbCgpOiBQb3J0YWw8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX3BvcnRhbDtcbiAgfVxuXG4gIHNldCBwb3J0YWwocG9ydGFsOiBQb3J0YWw8YW55Pikge1xuICAgIGlmICh0aGlzLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgIHN1cGVyLmRldGFjaCgpO1xuICAgIH1cblxuICAgIGlmIChwb3J0YWwpIHtcbiAgICAgIHN1cGVyLmF0dGFjaChwb3J0YWwpO1xuICAgIH1cblxuICAgIHRoaXMuX3BvcnRhbCA9IHBvcnRhbDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB0aGlzLl9wb3J0YWwgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCB0aGUgZ2l2ZW4gQ29tcG9uZW50UG9ydGFsIHRvIHRoaXMgUG9ydGFsSG9zdCB1c2luZyB0aGUgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLlxuICAgKlxuICAgKiBAcGFyYW0gcG9ydGFsIFBvcnRhbCB0byBiZSBhdHRhY2hlZCB0byB0aGUgcG9ydGFsIGhvc3QuXG4gICAqL1xuICBhdHRhY2hDb21wb25lbnRQb3J0YWw8VD4ocG9ydGFsOiBDb21wb25lbnRQb3J0YWw8VD4pOiBDb21wb25lbnRSZWY8VD4ge1xuICAgIHBvcnRhbC5zZXRBdHRhY2hlZEhvc3QodGhpcyk7XG5cbiAgICAvLyBJZiB0aGUgcG9ydGFsIHNwZWNpZmllcyBhbiBvcmlnaW4sIHVzZSB0aGF0IGFzIHRoZSBsb2dpY2FsIGxvY2F0aW9uIG9mIHRoZSBjb21wb25lbnRcbiAgICAvLyBpbiB0aGUgYXBwbGljYXRpb24gdHJlZS4gT3RoZXJ3aXNlIHVzZSB0aGUgbG9jYXRpb24gb2YgdGhpcyBQb3J0YWxIb3N0LlxuICAgIGxldCB2aWV3Q29udGFpbmVyUmVmID0gcG9ydGFsLnZpZXdDb250YWluZXJSZWYgIT0gbnVsbCA/XG4gICAgICAgIHBvcnRhbC52aWV3Q29udGFpbmVyUmVmIDpcbiAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZjtcblxuICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID1cbiAgICAgICAgdGhpcy5fY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHBvcnRhbC5jb21wb25lbnQpO1xuICAgIGxldCByZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgICAgY29tcG9uZW50RmFjdG9yeSwgdmlld0NvbnRhaW5lclJlZi5sZW5ndGgsXG4gICAgICAgIHBvcnRhbC5pbmplY3RvciB8fCB2aWV3Q29udGFpbmVyUmVmLnBhcmVudEluamVjdG9yKTtcblxuICAgIHN1cGVyLnNldERpc3Bvc2VGbigoKSA9PiByZWYuZGVzdHJveSgpKTtcbiAgICB0aGlzLl9wb3J0YWwgPSBwb3J0YWw7XG5cbiAgICByZXR1cm4gcmVmO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCB0aGUgZ2l2ZW4gVGVtcGxhdGVQb3J0YWwgdG8gdGhpcyBQb3J0bEhvc3QgYXMgYW4gZW1iZWRkZWQgVmlldy5cbiAgICogQHBhcmFtIHBvcnRhbCBQb3J0YWwgdG8gYmUgYXR0YWNoZWQuXG4gICAqL1xuICBhdHRhY2hUZW1wbGF0ZVBvcnRhbChwb3J0YWw6IFRlbXBsYXRlUG9ydGFsKTogTWFwPHN0cmluZywgYW55PiB7XG4gICAgcG9ydGFsLnNldEF0dGFjaGVkSG9zdCh0aGlzKTtcblxuICAgIHRoaXMuX3ZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHBvcnRhbC50ZW1wbGF0ZVJlZik7XG4gICAgc3VwZXIuc2V0RGlzcG9zZUZuKCgpID0+IHRoaXMuX3ZpZXdDb250YWluZXJSZWYuY2xlYXIoKSk7XG5cbiAgICB0aGlzLl9wb3J0YWwgPSBwb3J0YWw7XG5cbiAgICAvLyBUT0RPKGplbGJvdXJuKTogcmV0dXJuIGxvY2FscyBmcm9tIHZpZXdcbiAgICByZXR1cm4gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgfVxufVxuXG5cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtUZW1wbGF0ZVBvcnRhbERpcmVjdGl2ZSwgUG9ydGFsSG9zdERpcmVjdGl2ZV0sXG4gIGRlY2xhcmF0aW9uczogW1RlbXBsYXRlUG9ydGFsRGlyZWN0aXZlLCBQb3J0YWxIb3N0RGlyZWN0aXZlXSxcbn0pXG5leHBvcnQgY2xhc3MgUG9ydGFsTW9kdWxlIHt9XG4iXX0=