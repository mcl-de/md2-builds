/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { throwNullPortalHostError, throwPortalAlreadyAttachedError, throwNoPortalAttachedError, throwNullPortalError, throwPortalHostAlreadyDisposedError, throwUnknownPortalTypeError } from './portal-errors';
/**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalHost`.
 * @abstract
 * @template T
 */
var /**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalHost`.
 * @abstract
 * @template T
 */
Portal = /** @class */ (function () {
    function Portal() {
    }
    /** Attach this portal to a host. */
    /**
     * Attach this portal to a host.
     * @param {?} host
     * @return {?}
     */
    Portal.prototype.attach = /**
     * Attach this portal to a host.
     * @param {?} host
     * @return {?}
     */
    function (host) {
        if (host == null) {
            throwNullPortalHostError();
        }
        if (host.hasAttached()) {
            throwPortalAlreadyAttachedError();
        }
        this._attachedHost = host;
        return /** @type {?} */ (host.attach(this));
    };
    /** Detach this portal from its host */
    /**
     * Detach this portal from its host
     * @return {?}
     */
    Portal.prototype.detach = /**
     * Detach this portal from its host
     * @return {?}
     */
    function () {
        /** @type {?} */
        var host = this._attachedHost;
        if (host == null) {
            throwNoPortalAttachedError();
        }
        this._attachedHost = null;
        return host.detach();
    };
    Object.defineProperty(Portal.prototype, "isAttached", {
        /** Whether this portal is attached to a host. */
        get: /**
         * Whether this portal is attached to a host.
         * @return {?}
         */
        function () {
            return this._attachedHost != null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the PortalHost reference without performing `attach()`. This is used directly by
     * the PortalHost when it is performing an `attach()` or `detach()`.
     */
    /**
     * Sets the PortalHost reference without performing `attach()`. This is used directly by
     * the PortalHost when it is performing an `attach()` or `detach()`.
     * @param {?} host
     * @return {?}
     */
    Portal.prototype.setAttachedHost = /**
     * Sets the PortalHost reference without performing `attach()`. This is used directly by
     * the PortalHost when it is performing an `attach()` or `detach()`.
     * @param {?} host
     * @return {?}
     */
    function (host) {
        this._attachedHost = host;
    };
    return Portal;
}());
/**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalHost`.
 * @abstract
 * @template T
 */
export { Portal };
if (false) {
    /** @type {?} */
    Portal.prototype._attachedHost;
}
/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 * @template T
 */
var /**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 * @template T
 */
ComponentPortal = /** @class */ (function (_super) {
    tslib_1.__extends(ComponentPortal, _super);
    function ComponentPortal(component, viewContainerRef, injector) {
        if (viewContainerRef === void 0) { viewContainerRef = null; }
        if (injector === void 0) { injector = null; }
        var _this = _super.call(this) || this;
        _this.component = component;
        _this.viewContainerRef = viewContainerRef;
        _this.injector = injector;
        return _this;
    }
    return ComponentPortal;
}(Portal));
/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 * @template T
 */
export { ComponentPortal };
if (false) {
    /**
     * The type of the component that will be instantiated for attachment.
     * @type {?}
     */
    ComponentPortal.prototype.component;
    /**
     * [Optional] Where the attached component should live in Angular's *logical* component tree.
     * This is different from where the component *renders*, which is determined by the PortalHost.
     * The origin is necessary when the host is outside of the Angular application context.
     * @type {?}
     */
    ComponentPortal.prototype.viewContainerRef;
    /**
     * [Optional] Injector used for the instantiation of the component.
     * @type {?}
     */
    ComponentPortal.prototype.injector;
}
/**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
var /**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
TemplatePortal = /** @class */ (function (_super) {
    tslib_1.__extends(TemplatePortal, _super);
    function TemplatePortal(template, viewContainerRef) {
        var _this = _super.call(this) || this;
        /**
         * Additional locals for the instantiated embedded view.
         * These locals can be seen as "exports" for the template, such as how ngFor has
         * index / event / odd.
         * See https://angular.io/docs/ts/latest/api/core/EmbeddedViewRef-class.html
         */
        _this.locals = new Map();
        _this.templateRef = template;
        _this.viewContainerRef = viewContainerRef;
        return _this;
    }
    Object.defineProperty(TemplatePortal.prototype, "origin", {
        get: /**
         * @return {?}
         */
        function () {
            return this.templateRef.elementRef;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} host
     * @param {?=} locals
     * @return {?}
     */
    TemplatePortal.prototype.attach = /**
     * @param {?} host
     * @param {?=} locals
     * @return {?}
     */
    function (host, locals) {
        this.locals = locals == null ? new Map() : locals;
        return _super.prototype.attach.call(this, host);
    };
    /**
     * @return {?}
     */
    TemplatePortal.prototype.detach = /**
     * @return {?}
     */
    function () {
        this.locals = new Map();
        return _super.prototype.detach.call(this);
    };
    return TemplatePortal;
}(Portal));
/**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
export { TemplatePortal };
if (false) {
    /**
     * The embedded template that will be used to instantiate an embedded View in the host.
     * @type {?}
     */
    TemplatePortal.prototype.templateRef;
    /**
     * Reference to the ViewContainer into which the template will be stamped out.
     * @type {?}
     */
    TemplatePortal.prototype.viewContainerRef;
    /**
     * Additional locals for the instantiated embedded view.
     * These locals can be seen as "exports" for the template, such as how ngFor has
     * index / event / odd.
     * See https://angular.io/docs/ts/latest/api/core/EmbeddedViewRef-class.html
     * @type {?}
     */
    TemplatePortal.prototype.locals;
}
/**
 * A `PortalHost` is an space that can contain a single `Portal`.
 * @record
 */
export function PortalHost() { }
/** @type {?} */
PortalHost.prototype.attach;
/** @type {?} */
PortalHost.prototype.detach;
/** @type {?} */
PortalHost.prototype.dispose;
/** @type {?} */
PortalHost.prototype.hasAttached;
/**
 * Partial implementation of PortalHost that only deals with attaching either a
 * ComponentPortal or a TemplatePortal.
 * @abstract
 */
var /**
 * Partial implementation of PortalHost that only deals with attaching either a
 * ComponentPortal or a TemplatePortal.
 * @abstract
 */
BasePortalHost = /** @class */ (function () {
    function BasePortalHost() {
        /**
         * Whether this host has already been permanently disposed.
         */
        this._isDisposed = false;
    }
    /** Whether this host has an attached portal. */
    /**
     * Whether this host has an attached portal.
     * @return {?}
     */
    BasePortalHost.prototype.hasAttached = /**
     * Whether this host has an attached portal.
     * @return {?}
     */
    function () {
        return !!this._attachedPortal;
    };
    /**
     * @param {?} portal
     * @return {?}
     */
    BasePortalHost.prototype.attach = /**
     * @param {?} portal
     * @return {?}
     */
    function (portal) {
        if (!portal) {
            throwNullPortalError();
        }
        if (this.hasAttached()) {
            throwPortalAlreadyAttachedError();
        }
        if (this._isDisposed) {
            throwPortalHostAlreadyDisposedError();
        }
        if (portal instanceof ComponentPortal) {
            this._attachedPortal = portal;
            return this.attachComponentPortal(portal);
        }
        else if (portal instanceof TemplatePortal) {
            this._attachedPortal = portal;
            return this.attachTemplatePortal(portal);
        }
        throwUnknownPortalTypeError();
    };
    /**
     * @return {?}
     */
    BasePortalHost.prototype.detach = /**
     * @return {?}
     */
    function () {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost(null);
            this._attachedPortal = null;
        }
        this._invokeDisposeFn();
    };
    /**
     * @return {?}
     */
    BasePortalHost.prototype.dispose = /**
     * @return {?}
     */
    function () {
        if (this.hasAttached()) {
            this.detach();
        }
        this._invokeDisposeFn();
        this._isDisposed = true;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    BasePortalHost.prototype.setDisposeFn = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._disposeFn = fn;
    };
    /**
     * @return {?}
     */
    BasePortalHost.prototype._invokeDisposeFn = /**
     * @return {?}
     */
    function () {
        if (this._disposeFn) {
            this._disposeFn();
            this._disposeFn = null;
        }
    };
    return BasePortalHost;
}());
/**
 * Partial implementation of PortalHost that only deals with attaching either a
 * ComponentPortal or a TemplatePortal.
 * @abstract
 */
export { BasePortalHost };
if (false) {
    /**
     * The portal currently attached to the host.
     * @type {?}
     */
    BasePortalHost.prototype._attachedPortal;
    /**
     * A function that will permanently dispose this host.
     * @type {?}
     */
    BasePortalHost.prototype._disposeFn;
    /**
     * Whether this host has already been permanently disposed.
     * @type {?}
     */
    BasePortalHost.prototype._isDisposed;
    /**
     * @abstract
     * @template T
     * @param {?} portal
     * @return {?}
     */
    BasePortalHost.prototype.attachComponentPortal = function (portal) { };
    /**
     * @abstract
     * @param {?} portal
     * @return {?}
     */
    BasePortalHost.prototype.attachTemplatePortal = function (portal) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGFsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9wb3J0YWwvcG9ydGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBT0EsT0FBTyxFQUNILHdCQUF3QixFQUN4QiwrQkFBK0IsRUFDL0IsMEJBQTBCLEVBQzFCLG9CQUFvQixFQUNwQixtQ0FBbUMsRUFDbkMsMkJBQTJCLEVBQzlCLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7QUFTekI7Ozs7OztBQUFBOzs7SUFHRSxvQ0FBb0M7Ozs7OztJQUNwQyx1QkFBTTs7Ozs7SUFBTixVQUFPLElBQWdCO1FBQ3JCLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNoQix3QkFBd0IsRUFBRSxDQUFDO1NBQzVCO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDdEIsK0JBQStCLEVBQUUsQ0FBQztTQUNuQztRQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLHlCQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUM7S0FDOUI7SUFFRCx1Q0FBdUM7Ozs7O0lBQ3ZDLHVCQUFNOzs7O0lBQU47O1FBQ0UsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDaEIsMEJBQTBCLEVBQUUsQ0FBQztTQUM5QjtRQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3RCO0lBR0Qsc0JBQUksOEJBQVU7UUFEZCxpREFBaUQ7Ozs7O1FBQ2pEO1lBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQztTQUNuQzs7O09BQUE7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSCxnQ0FBZTs7Ozs7O0lBQWYsVUFBZ0IsSUFBZ0I7UUFDOUIsSUFBSSxDQUFD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QWdCLEVBQUUsQ0FBQztLQUN6Qjs7OztJQUVELGdDQUFPOzs7SUFBUDtRQUNFLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7S0FDekI7Ozs7O0lBRUQscUNBQVk7Ozs7SUFBWixVQUFhLEVBQWM7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7S0FDdEI7Ozs7SUFFTyx5Q0FBZ0I7Ozs7UUFDdEIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztTQUN4Qjs7eUJBOU5MO0lBZ09DLENBQUE7Ozs7OztBQXZFRCwwQkF1RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgRWxlbWVudFJlZixcbiAgICBDb21wb25lbnRSZWYsXG4gICAgSW5qZWN0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIHRocm93TnVsbFBvcnRhbEhvc3RFcnJvcixcbiAgICB0aHJvd1BvcnRhbEFscmVhZHlBdHRhY2hlZEVycm9yLFxuICAgIHRocm93Tm9Qb3J0YWxBdHRhY2hlZEVycm9yLFxuICAgIHRocm93TnVsbFBvcnRhbEVycm9yLFxuICAgIHRocm93UG9ydGFsSG9zdEFscmVhZHlEaXNwb3NlZEVycm9yLFxuICAgIHRocm93VW5rbm93blBvcnRhbFR5cGVFcnJvclxufSBmcm9tICcuL3BvcnRhbC1lcnJvcnMnO1xuaW1wb3J0IHtDb21wb25lbnRUeXBlfSBmcm9tICcuLi9vdmVybGF5L2dlbmVyaWMtY29tcG9uZW50LXR5cGUnO1xuXG5cblxuLyoqXG4gKiBBIGBQb3J0YWxgIGlzIHNvbWV0aGluZyB0aGF0IHlvdSB3YW50IHRvIHJlbmRlciBzb21ld2hlcmUgZWxzZS5cbiAqIEl0IGNhbiBiZSBhdHRhY2ggdG8gLyBkZXRhY2hlZCBmcm9tIGEgYFBvcnRhbEhvc3RgLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUG9ydGFsPFQ+IHtcbiAgcHJpdmF0ZSBfYXR0YWNoZWRIb3N0OiBQb3J0YWxIb3N0O1xuXG4gIC8qKiBBdHRhY2ggdGhpcyBwb3J0YWwgdG8gYSBob3N0LiAqL1xuICBhdHRhY2goaG9zdDogUG9ydGFsSG9zdCk6IFQge1xuICAgIGlmIChob3N0ID09IG51bGwpIHtcbiAgICAgIHRocm93TnVsbFBvcnRhbEhvc3RFcnJvcigpO1xuICAgIH1cblxuICAgIGlmIChob3N0Lmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgIHRocm93UG9ydGFsQWxyZWFkeUF0dGFjaGVkRXJyb3IoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRhY2hlZEhvc3QgPSBob3N0O1xuICAgIHJldHVybiA8VD4gaG9zdC5hdHRhY2godGhpcyk7XG4gIH1cblxuICAvKiogRGV0YWNoIHRoaXMgcG9ydGFsIGZyb20gaXRzIGhvc3QgKi9cbiAgZGV0YWNoKCk6IHZvaWQge1xuICAgIGxldCBob3N0ID0gdGhpcy5fYXR0YWNoZWRIb3N0O1xuICAgIGlmIChob3N0ID09IG51bGwpIHtcbiAgICAgIHRocm93Tm9Qb3J0YWxBdHRhY2hlZEVycm9yKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fYXR0YWNoZWRIb3N0ID0gbnVsbDtcbiAgICByZXR1cm4gaG9zdC5kZXRhY2goKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoaXMgcG9ydGFsIGlzIGF0dGFjaGVkIHRvIGEgaG9zdC4gKi9cbiAgZ2V0IGlzQXR0YWNoZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dGFjaGVkSG9zdCAhPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIFBvcnRhbEhvc3QgcmVmZXJlbmNlIHdpdGhvdXQgcGVyZm9ybWluZyBgYXR0YWNoKClgLiBUaGlzIGlzIHVzZWQgZGlyZWN0bHkgYnlcbiAgICogdGhlIFBvcnRhbEhvc3Qgd2hlbiBpdCBpcyBwZXJmb3JtaW5nIGFuIGBhdHRhY2goKWAgb3IgYGRldGFjaCgpYC5cbiAgICovXG4gIHNldEF0dGFjaGVkSG9zdChob3N0OiBQb3J0YWxIb3N0KSB7XG4gICAgdGhpcy5fYXR0YWNoZWRIb3N0ID0gaG9zdDtcbiAgfVxufVxuXG5cbi8qKlxuICogQSBgQ29tcG9uZW50UG9ydGFsYCBpcyBhIHBvcnRhbCB0aGF0IGluc3RhbnRpYXRlcyBzb21lIENvbXBvbmVudCB1cG9uIGF0dGFjaG1lbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21wb25lbnRQb3J0YWw8VD4gZXh0ZW5kcyBQb3J0YWw8Q29tcG9uZW50UmVmPFQ+PiB7XG4gIC8qKiBUaGUgdHlwZSBvZiB0aGUgY29tcG9uZW50IHRoYXQgd2lsbCBiZSBpbnN0YW50aWF0ZWQgZm9yIGF0dGFjaG1lbnQuICovXG4gIGNvbXBvbmVudDogQ29tcG9uZW50VHlwZTxUPjtcblxuICAvKipcbiAgICogW09wdGlvbmFsXSBXaGVyZSB0aGUgYXR0YWNoZWQgY29tcG9uZW50IHNob3VsZCBsaXZlIGluIEFuZ3VsYXIncyAqbG9naWNhbCogY29tcG9uZW50IHRyZWUuXG4gICAqIFRoaXMgaXMgZGlmZmVyZW50IGZyb20gd2hlcmUgdGhlIGNvbXBvbmVudCAqcmVuZGVycyosIHdoaWNoIGlzIGRldGVybWluZWQgYnkgdGhlIFBvcnRhbEhvc3QuXG4gICAqIFRoZSBvcmlnaW4gaXMgbmVjZXNzYXJ5IHdoZW4gdGhlIGhvc3QgaXMgb3V0c2lkZSBvZiB0aGUgQW5ndWxhciBhcHBsaWNhdGlvbiBjb250ZXh0LlxuICAgKi9cbiAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZjtcblxuICAvKiogW09wdGlvbmFsXSBJbmplY3RvciB1c2VkIGZvciB0aGUgaW5zdGFudGlhdGlvbiBvZiB0aGUgY29tcG9uZW50LiAqL1xuICBpbmplY3RvcjogSW5qZWN0b3I7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBjb21wb25lbnQ6IENvbXBvbmVudFR5cGU8VD4sXG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmID0gbnVsbCxcbiAgICAgIGluamVjdG9yOiBJbmplY3RvciA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xuICAgIHRoaXMudmlld0NvbnRhaW5lclJlZiA9IHZpZXdDb250YWluZXJSZWY7XG4gICAgdGhpcy5pbmplY3RvciA9IGluamVjdG9yO1xuICB9XG59XG5cblxuLyoqXG4gKiBBIGBUZW1wbGF0ZVBvcnRhbGAgaXMgYSBwb3J0YWwgdGhhdCByZXByZXNlbnRzIHNvbWUgZW1iZWRkZWQgdGVtcGxhdGUgKFRlbXBsYXRlUmVmKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFRlbXBsYXRlUG9ydGFsIGV4dGVuZHMgUG9ydGFsPE1hcDxzdHJpbmcsIGFueT4+IHtcbiAgLyoqIFRoZSBlbWJlZGRlZCB0ZW1wbGF0ZSB0aGF0IHdpbGwgYmUgdXNlZCB0byBpbnN0YW50aWF0ZSBhbiBlbWJlZGRlZCBWaWV3IGluIHRoZSBob3N0LiAqL1xuICB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBWaWV3Q29udGFpbmVyIGludG8gd2hpY2ggdGhlIHRlbXBsYXRlIHdpbGwgYmUgc3RhbXBlZCBvdXQuICovXG4gIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgLyoqXG4gICAqIEFkZGl0aW9uYWwgbG9jYWxzIGZvciB0aGUgaW5zdGFudGlhdGVkIGVtYmVkZGVkIHZpZXcuXG4gICAqIFRoZXNlIGxvY2FscyBjYW4gYmUgc2VlbiBhcyBcImV4cG9ydHNcIiBmb3IgdGhlIHRlbXBsYXRlLCBzdWNoIGFzIGhvdyBuZ0ZvciBoYXNcbiAgICogaW5kZXggLyBldmVudCAvIG9kZC5cbiAgICogU2VlIGh0dHBzOi8vYW5ndWxhci5pby9kb2NzL3RzL2xhdGVzdC9hcGkvY29yZS9FbWJlZGRlZFZpZXdSZWYtY2xhc3MuaHRtbFxuICAgKi9cbiAgbG9jYWxzOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcblxuICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Piwgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy50ZW1wbGF0ZVJlZiA9IHRlbXBsYXRlO1xuICAgIHRoaXMudmlld0NvbnRhaW5lclJlZiA9IHZpZXdDb250YWluZXJSZWY7XG4gIH1cblxuICBnZXQgb3JpZ2luKCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLnRlbXBsYXRlUmVmLmVsZW1lbnRSZWY7XG4gIH1cblxuICBhdHRhY2goaG9zdDogUG9ydGFsSG9zdCwgbG9jYWxzPzogTWFwPHN0cmluZywgYW55Pik6IE1hcDxzdHJpbmcsIGFueT4ge1xuICAgIHRoaXMubG9jYWxzID0gbG9jYWxzID09IG51bGwgPyBuZXcgTWFwPHN0cmluZywgYW55PigpIDogbG9jYWxzO1xuICAgIHJldHVybiBzdXBlci5hdHRhY2goaG9zdCk7XG4gIH1cblxuICBkZXRhY2goKTogdm9pZCB7XG4gICAgdGhpcy5sb2NhbHMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgIHJldHVybiBzdXBlci5kZXRhY2goKTtcbiAgfVxufVxuXG5cbi8qKlxuICogQSBgUG9ydGFsSG9zdGAgaXMgYW4gc3BhY2UgdGhhdCBjYW4gY29udGFpbiBhIHNpbmdsZSBgUG9ydGFsYC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQb3J0YWxIb3N0IHtcbiAgYXR0YWNoKHBvcnRhbDogUG9ydGFsPGFueT4pOiBhbnk7XG5cbiAgZGV0YWNoKCk6IGFueTtcblxuICBkaXNwb3NlKCk6IHZvaWQ7XG5cbiAgaGFzQXR0YWNoZWQoKTogYm9vbGVhbjtcbn1cblxuXG4vKipcbiAqIFBhcnRpYWwgaW1wbGVtZW50YXRpb24gb2YgUG9ydGFsSG9zdCB0aGF0IG9ubHkgZGVhbHMgd2l0aCBhdHRhY2hpbmcgZWl0aGVyIGFcbiAqIENvbXBvbmVudFBvcnRhbCBvciBhIFRlbXBsYXRlUG9ydGFsLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVBvcnRhbEhvc3QgaW1wbGVtZW50cyBQb3J0YWxIb3N0IHtcbiAgLyoqIFRoZSBwb3J0YWwgY3VycmVudGx5IGF0dGFjaGVkIHRvIHRoZSBob3N0LiAqL1xuICBwcml2YXRlIF9hdHRhY2hlZFBvcnRhbDogUG9ydGFsPGFueT47XG5cbiAgLyoqIEEgZnVuY3Rpb24gdGhhdCB3aWxsIHBlcm1hbmVudGx5IGRpc3Bvc2UgdGhpcyBob3N0LiAqL1xuICBwcml2YXRlIF9kaXNwb3NlRm46ICgpID0+IHZvaWQ7XG5cbiAgLyoqIFdoZXRoZXIgdGhpcyBob3N0IGhhcyBhbHJlYWR5IGJlZW4gcGVybWFuZW50bHkgZGlzcG9zZWQuICovXG4gIHByaXZhdGUgX2lzRGlzcG9zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGlzIGhvc3QgaGFzIGFuIGF0dGFjaGVkIHBvcnRhbC4gKi9cbiAgaGFzQXR0YWNoZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5fYXR0YWNoZWRQb3J0YWw7XG4gIH1cblxuICBhdHRhY2gocG9ydGFsOiBQb3J0YWw8YW55Pik6IGFueSB7XG4gICAgaWYgKCFwb3J0YWwpIHtcbiAgICAgIHRocm93TnVsbFBvcnRhbEVycm9yKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgdGhyb3dQb3J0YWxBbHJlYWR5QXR0YWNoZWRFcnJvcigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9pc0Rpc3Bvc2VkKSB7XG4gICAgICB0aHJvd1BvcnRhbEhvc3RBbHJlYWR5RGlzcG9zZWRFcnJvcigpO1xuICAgIH1cblxuICAgIGlmIChwb3J0YWwgaW5zdGFuY2VvZiBDb21wb25lbnRQb3J0YWwpIHtcbiAgICAgIHRoaXMuX2F0dGFjaGVkUG9ydGFsID0gcG9ydGFsO1xuICAgICAgcmV0dXJuIHRoaXMuYXR0YWNoQ29tcG9uZW50UG9ydGFsKHBvcnRhbCk7XG4gICAgfSBlbHNlIGlmIChwb3J0YWwgaW5zdGFuY2VvZiBUZW1wbGF0ZVBvcnRhbCkge1xuICAgICAgdGhpcy5fYXR0YWNoZWRQb3J0YWwgPSBwb3J0YWw7XG4gICAgICByZXR1cm4gdGhpcy5hdHRhY2hUZW1wbGF0ZVBvcnRhbChwb3J0YWwpO1xuICAgIH1cblxuICAgIHRocm93VW5rbm93blBvcnRhbFR5cGVFcnJvcigpO1xuICB9XG5cbiAgYWJzdHJhY3QgYXR0YWNoQ29tcG9uZW50UG9ydGFsPFQ+KHBvcnRhbDogQ29tcG9uZW50UG9ydGFsPFQ+KTogQ29tcG9uZW50UmVmPFQ+O1xuXG4gIGFic3RyYWN0IGF0dGFjaFRlbXBsYXRlUG9ydGFsKHBvcnRhbDogVGVtcGxhdGVQb3J0YWwpOiBNYXA8c3RyaW5nLCBhbnk+O1xuXG4gIGRldGFjaCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fYXR0YWNoZWRQb3J0YWwpIHtcbiAgICAgIHRoaXMuX2F0dGFjaGVkUG9ydGFsLnNldEF0dGFjaGVkSG9zdChudWxsKTtcbiAgICAgIHRoaXMuX2F0dGFjaGVkUG9ydGFsID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLl9pbnZva2VEaXNwb3NlRm4oKTtcbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgaWYgKHRoaXMuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICB9XG5cbiAgICB0aGlzLl9pbnZva2VEaXNwb3NlRm4oKTtcbiAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgfVxuXG4gIHNldERpc3Bvc2VGbihmbjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuX2Rpc3Bvc2VGbiA9IGZuO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW52b2tlRGlzcG9zZUZuKCkge1xuICAgIGlmICh0aGlzLl9kaXNwb3NlRm4pIHtcbiAgICAgIHRoaXMuX2Rpc3Bvc2VGbigpO1xuICAgICAgdGhpcy5fZGlzcG9zZUZuID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==