/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule, Directive, EventEmitter, TemplateRef, ViewContainerRef, Optional, Input, Output, ElementRef, Renderer2, } from '@angular/core';
import { Overlay, OVERLAY_PROVIDERS } from './overlay';
import { TemplatePortal } from '../portal/portal';
import { OverlayState } from './overlay-state';
import { ConnectionPositionPair } from './position/connected-position';
import { PortalModule } from '../portal/portal-directives';
import { Dir } from '../rtl/dir';
import { coerceBooleanProperty } from '../coercion/boolean-property';
import { ESCAPE } from '../keyboard/keycodes';
import { ScrollDispatchModule } from './scroll/index';
/** *
 * Default set of positions for the overlay. Follows the behavior of a dropdown.
  @type {?} */
var defaultPositionList = [
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
];
/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
var OverlayOrigin = /** @class */ (function () {
    function OverlayOrigin(elementRef) {
        this.elementRef = elementRef;
    }
    OverlayOrigin.decorators = [
        { type: Directive, args: [{
                    selector: '[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]',
                    exportAs: 'cdkOverlayOrigin',
                },] }
    ];
    /** @nocollapse */
    OverlayOrigin.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return OverlayOrigin;
}());
export { OverlayOrigin };
if (false) {
    /** @type {?} */
    OverlayOrigin.prototype.elementRef;
}
/**
 * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
 */
var ConnectedOverlayDirective = /** @class */ (function () {
    // TODO(jelbourn): inputs for size, scroll behavior, animation, etc.
    function ConnectedOverlayDirective(_overlay, _renderer, templateRef, viewContainerRef, _dir) {
        this._overlay = _overlay;
        this._renderer = _renderer;
        this._dir = _dir;
        this._hasBackdrop = false;
        this._offsetX = 0;
        this._offsetY = 0;
        /**
         * Strategy to be used when handling scroll events while the overlay is open.
         */
        this.scrollStrategy = this._overlay.scrollStrategies.reposition();
        /**
         * Whether the overlay is open.
         */
        this.open = false;
        /**
         * Event emitted when the backdrop is clicked.
         */
        this.backdropClick = new EventEmitter();
        /**
         * Event emitted when the position has changed.
         */
        this.positionChange = new EventEmitter();
        /**
         * Event emitted when the overlay has been attached.
         */
        this.attach = new EventEmitter();
        /**
         * Event emitted when the overlay has been detached.
         */
        this.detach = new EventEmitter();
        this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
    }
    Object.defineProperty(ConnectedOverlayDirective.prototype, "offsetX", {
        /** The offset in pixels for the overlay connection point on the x-axis */
        get: /**
         * The offset in pixels for the overlay connection point on the x-axis
         * @return {?}
         */
        function () {
            return this._offsetX;
        },
        set: /**
         * @param {?} offsetX
         * @return {?}
         */
        function (offsetX) {
            this._offsetX = offsetX;
            if (this._position) {
                this._position.withOffsetX(offsetX);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "offsetY", {
        /** The offset in pixels for the overlay connection point on the y-axis */
        get: /**
         * The offset in pixels for the overlay connection point on the y-axis
         * @return {?}
         */
        function () {
            return this._offsetY;
        },
        set: /**
         * @param {?} offsetY
         * @return {?}
         */
        function (offsetY) {
            this._offsetY = offsetY;
            if (this._position) {
                this._position.withOffsetY(offsetY);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "hasBackdrop", {
        /** Whether or not the overlay should attach a backdrop. */
        get: /**
         * Whether or not the overlay should attach a backdrop.
         * @return {?}
         */
        function () {
            return this._hasBackdrop;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._hasBackdrop = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "overlayRef", {
        /** The associated overlay reference. */
        get: /**
         * The associated overlay reference.
         * @return {?}
         */
        function () {
            return this._overlayRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "dir", {
        /** The element's layout direction. */
        get: /**
         * The element's layout direction.
         * @return {?}
         */
        function () {
            return this._dir ? this._dir.value : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ConnectedOverlayDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroyOverlay();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ConnectedOverlayDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['open']) {
            this.open ? this._attachOverlay() : this._detachOverlay();
        }
    };
    /**
     * Creates an overlay
     * @return {?}
     */
    ConnectedOverlayDirective.prototype._createOverlay = /**
     * Creates an overlay
     * @return {?}
     */
    function () {
        if (!this.positions || !this.positions.length) {
            this.positions = defaultPositionList;
        }
        this._overlayRef = this._overlay.create(this._buildConfig());
    };
    /**
     * Builds the overlay config based on the directive's inputs
     * @return {?}
     */
    ConnectedOverlayDirective.prototype._buildConfig = /**
     * Builds the overlay config based on the directive's inputs
     * @return {?}
     */
    function () {
        /** @type {?} */
        var overlayConfig = new OverlayState();
        if (this.width || this.width === 0) {
            overlayConfig.width = this.width;
        }
        if (this.height || this.height === 0) {
            overlayConfig.height = this.height;
        }
        if (this.minWidth || this.minWidth === 0) {
            overlayConfig.minWidth = this.minWidth;
        }
        if (this.minHeight || this.minHeight === 0) {
            overlayConfig.minHeight = this.minHeight;
        }
        overlayConfig.hasBackdrop = this.hasBackdrop;
        if (this.backdropClass) {
            overlayConfig.backdropClass = this.backdropClass;
        }
        this._position = /** @type {?} */ (this._createPositionStrategy());
        overlayConfig.positionStrategy = this._position;
        overlayConfig.scrollStrategy = this.scrollStrategy;
        return overlayConfig;
    };
    /**
     * Returns the position strategy of the overlay to be set on the overlay config
     * @return {?}
     */
    ConnectedOverlayDirective.prototype._createPositionStrategy = /**
     * Returns the position strategy of the overlay to be set on the overlay config
     * @return {?}
     */
    function () {
        /** @type {?} */
        var pos = this.positions[0];
        /** @type {?} */
        var originPoint = { originX: pos.originX, originY: pos.originY };
        /** @type {?} */
        var overlayPoint = { overlayX: pos.overlayX, overlayY: pos.overlayY };
        /** @type {?} */
        var strategy = this._overlay.position()
            .connectedTo(this.origin.elementRef, originPoint, overlayPoint)
            .withOffsetX(this.offsetX)
            .withOffsetY(this.offsetY);
        this._handlePositionChanges(strategy);
        return strategy;
    };
    /**
     * @param {?} strategy
     * @return {?}
     */
    ConnectedOverlayDirective.prototype._handlePositionChanges = /**
     * @param {?} strategy
     * @return {?}
     */
    function (strategy) {
        var _this = this;
        for (var i = 1; i < this.positions.length; i++) {
            strategy.withFallbackPosition({ originX: this.positions[i].originX, originY: this.positions[i].originY }, { overlayX: this.positions[i].overlayX, overlayY: this.positions[i].overlayY });
        }
        this._positionSubscription =
            strategy.onPositionChange.subscribe(function (pos) { return _this.positionChange.emit(pos); });
    };
    /**
     * Attaches the overlay and subscribes to backdrop clicks if backdrop exists
     * @return {?}
     */
    ConnectedOverlayDirective.prototype._attachOverlay = /**
     * Attaches the overlay and subscribes to backdrop clicks if backdrop exists
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this._overlayRef) {
            this._createOverlay();
        }
        this._position.withDirection(this.dir);
        this._overlayRef.getState().direction = this.dir;
        this._initEscapeListener();
        if (!this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._templatePortal);
            this.attach.emit();
        }
        if (this.hasBackdrop) {
            this._backdropSubscription = this._overlayRef.backdropClick().subscribe(function () {
                _this.backdropClick.emit();
            });
        }
    };
    /**
     * Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists
     * @return {?}
     */
    ConnectedOverlayDirective.prototype._detachOverlay = /**
     * Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists
     * @return {?}
     */
    function () {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this.detach.emit();
        }
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
            this._backdropSubscription = null;
        }
        if (this._escapeListener) {
            this._escapeListener();
        }
    };
    /**
     * Destroys the overlay created by this directive.
     * @return {?}
     */
    ConnectedOverlayDirective.prototype._destroyOverlay = /**
     * Destroys the overlay created by this directive.
     * @return {?}
     */
    function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
        if (this._positionSubscription) {
            this._positionSubscription.unsubscribe();
        }
        if (this._escapeListener) {
            this._escapeListener();
        }
    };
    /**
     * Sets the event listener that closes the overlay when pressing Escape.
     * @return {?}
     */
    ConnectedOverlayDirective.prototype._initEscapeListener = /**
     * Sets the event listener that closes the overlay when pressing Escape.
     * @return {?}
     */
    function () {
        var _this = this;
        this._escapeListener = this._renderer.listen('document', 'keydown', function (event) {
            if (event.keyCode === ESCAPE) {
                _this._detachOverlay();
            }
        });
    };
    ConnectedOverlayDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]',
                    exportAs: 'cdkConnectedOverlay'
                },] }
    ];
    /** @nocollapse */
    ConnectedOverlayDirective.ctorParameters = function () { return [
        { type: Overlay },
        { type: Renderer2 },
        { type: TemplateRef },
        { type: ViewContainerRef },
        { type: Dir, decorators: [{ type: Optional }] }
    ]; };
    ConnectedOverlayDirective.propDecorators = {
        origin: [{ type: Input }],
        positions: [{ type: Input }],
        offsetX: [{ type: Input }],
        offsetY: [{ type: Input }],
        width: [{ type: Input }],
        height: [{ type: Input }],
        minWidth: [{ type: Input }],
        minHeight: [{ type: Input }],
        backdropClass: [{ type: Input }],
        scrollStrategy: [{ type: Input }],
        open: [{ type: Input }],
        hasBackdrop: [{ type: Input }],
        backdropClick: [{ type: Output }],
        positionChange: [{ type: Output }],
        attach: [{ type: Output }],
        detach: [{ type: Output }]
    };
    return ConnectedOverlayDirective;
}());
export { ConnectedOverlayDirective };
if (false) {
    /** @type {?} */
    ConnectedOverlayDirective.prototype._overlayRef;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._templatePortal;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._hasBackdrop;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._backdropSubscription;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._positionSubscription;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._offsetX;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._offsetY;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._position;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._escapeListener;
    /**
     * Origin for the connected overlay.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.origin;
    /**
     * Registered connected position pairs.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.positions;
    /**
     * The width of the overlay panel.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.width;
    /**
     * The height of the overlay panel.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.height;
    /**
     * The min width of the overlay panel.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.minWidth;
    /**
     * The min height of the overlay panel.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.minHeight;
    /**
     * The custom class to be set on the backdrop element.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.backdropClass;
    /**
     * Strategy to be used when handling scroll events while the overlay is open.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.scrollStrategy;
    /**
     * Whether the overlay is open.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.open;
    /**
     * Event emitted when the backdrop is clicked.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.backdropClick;
    /**
     * Event emitted when the position has changed.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.positionChange;
    /**
     * Event emitted when the overlay has been attached.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.attach;
    /**
     * Event emitted when the overlay has been detached.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.detach;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._overlay;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._renderer;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._dir;
}
var OverlayModule = /** @class */ (function () {
    function OverlayModule() {
    }
    OverlayModule.decorators = [
        { type: NgModule, args: [{
                    imports: [PortalModule, ScrollDispatchModule],
                    exports: [ConnectedOverlayDirective, OverlayOrigin, ScrollDispatchModule],
                    declarations: [ConnectedOverlayDirective, OverlayOrigin],
                    providers: [OVERLAY_PROVIDERS],
                },] }
    ];
    return OverlayModule;
}());
export { OverlayModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9vdmVybGF5L292ZXJsYXktZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFFBQVEsRUFDUixTQUFTLEVBQ1QsWUFBWSxFQUNaLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsUUFBUSxFQUNSLEtBQUssRUFFTCxNQUFNLEVBQ04sVUFBVSxFQUNWLFNBQVMsR0FHWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBRXJELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUNILHNCQUFzQixFQUV6QixNQUFNLCtCQUErQixDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUV6RCxPQUFPLEVBQUMsR0FBRyxFQUFrQixNQUFNLFlBQVksQ0FBQztBQUdoRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFNUMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJcEQsSUFBSSxtQkFBbUIsR0FBRztJQUN4QixJQUFJLHNCQUFzQixDQUN0QixFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBQyxFQUNyQyxFQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDO0lBQ3pDLElBQUksc0JBQXNCLENBQ3RCLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVB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Z0JBb0JaLEdBQUcsdUJBc0lKLFFBQVE7Ozt5QkFqRlosS0FBSzs0QkFHTCxLQUFLOzBCQUdMLEtBQUs7MEJBYUwsS0FBSzt3QkFhTCxLQUFLO3lCQUdMLEtBQUs7MkJBR0wsS0FBSzs0QkFHTCxLQUFLO2dDQUdMLEtBQUs7aUNBR0wsS0FBSzt1QkFHTCxLQUFLOzhCQUdMLEtBQUs7Z0NBVUwsTUFBTTtpQ0FHTixNQUFNO3lCQUdOLE1BQU07eUJBR04sTUFBTTs7b0NBdEpUOztTQWtFYSx5QkFBeUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkFnUXJDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLENBQUM7b0JBQzdDLE9BQU8sRUFBRSxDQUFDLHlCQUF5QixFQUFFLGFBQWEsRUFBRSxvQkFBb0IsQ0FBQztvQkFDekUsWUFBWSxFQUFFLENBQUMseUJBQXlCLEVBQUUsYUFBYSxDQUFDO29CQUN4RCxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztpQkFDL0I7O3dCQXZVRDs7U0F3VWEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgTmdNb2R1bGUsXG4gICAgRGlyZWN0aXZlLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIE9wdGlvbmFsLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgRWxlbWVudFJlZixcbiAgICBSZW5kZXJlcjIsXG4gICAgT25DaGFuZ2VzLFxuICAgIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPdmVybGF5LCBPVkVSTEFZX1BST1ZJREVSU30gZnJvbSAnLi9vdmVybGF5JztcbmltcG9ydCB7T3ZlcmxheVJlZn0gZnJvbSAnLi9vdmVybGF5LXJlZic7XG5pbXBvcnQge1RlbXBsYXRlUG9ydGFsfSBmcm9tICcuLi9wb3J0YWwvcG9ydGFsJztcbmltcG9ydCB7T3ZlcmxheVN0YXRlfSBmcm9tICcuL292ZXJsYXktc3RhdGUnO1xuaW1wb3J0IHtcbiAgICBDb25uZWN0aW9uUG9zaXRpb25QYWlyLFxuICAgIENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZVxufSBmcm9tICcuL3Bvc2l0aW9uL2Nvbm5lY3RlZC1wb3NpdGlvbic7XG5pbXBvcnQge1BvcnRhbE1vZHVsZX0gZnJvbSAnLi4vcG9ydGFsL3BvcnRhbC1kaXJlY3RpdmVzJztcbmltcG9ydCB7Q29ubmVjdGVkUG9zaXRpb25TdHJhdGVneX0gZnJvbSAnLi9wb3NpdGlvbi9jb25uZWN0ZWQtcG9zaXRpb24tc3RyYXRlZ3knO1xuaW1wb3J0IHtEaXIsIExheW91dERpcmVjdGlvbn0gZnJvbSAnLi4vcnRsL2Rpcic7XG5pbXBvcnQge1Njcm9sbGFibGV9IGZyb20gJy4vc2Nyb2xsL3Njcm9sbGFibGUnO1xuaW1wb3J0IHtTY3JvbGxTdHJhdGVneX0gZnJvbSAnLi9zY3JvbGwvc2Nyb2xsLXN0cmF0ZWd5JztcbmltcG9ydCB7Y29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICcuLi9jb2VyY2lvbi9ib29sZWFuLXByb3BlcnR5JztcbmltcG9ydCB7RVNDQVBFfSBmcm9tICcuLi9rZXlib2FyZC9rZXljb2Rlcyc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1Njcm9sbERpc3BhdGNoTW9kdWxlfSBmcm9tICcuL3Njcm9sbC9pbmRleCc7XG5cblxuLyoqIERlZmF1bHQgc2V0IG9mIHBvc2l0aW9ucyBmb3IgdGhlIG92ZXJsYXkuIEZvbGxvd3MgdGhlIGJlaGF2aW9yIG9mIGEgZHJvcGRvd24uICovXG5sZXQgZGVmYXVsdFBvc2l0aW9uTGlzdCA9IFtcbiAgbmV3IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIoXG4gICAgICB7b3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ2JvdHRvbSd9LFxuICAgICAge292ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ3RvcCd9KSxcbiAgbmV3IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIoXG4gICAgICB7b3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ3RvcCd9LFxuICAgICAge292ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2JvdHRvbSd9KSxcbl07XG5cblxuLyoqXG4gKiBEaXJlY3RpdmUgYXBwbGllZCB0byBhbiBlbGVtZW50IHRvIG1ha2UgaXQgdXNhYmxlIGFzIGFuIG9yaWdpbiBmb3IgYW4gT3ZlcmxheSB1c2luZyBhXG4gKiBDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2RrLW92ZXJsYXktb3JpZ2luXSwgW292ZXJsYXktb3JpZ2luXSwgW2Nka092ZXJsYXlPcmlnaW5dJyxcbiAgZXhwb3J0QXM6ICdjZGtPdmVybGF5T3JpZ2luJyxcbn0pXG5leHBvcnQgY2xhc3MgT3ZlcmxheU9yaWdpbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cbn1cblxuXG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGZhY2lsaXRhdGUgZGVjbGFyYXRpdmUgY3JlYXRpb24gb2YgYW4gT3ZlcmxheSB1c2luZyBhIENvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjZGstY29ubmVjdGVkLW92ZXJsYXldLCBbY29ubmVjdGVkLW92ZXJsYXldLCBbY2RrQ29ubmVjdGVkT3ZlcmxheV0nLFxuICBleHBvcnRBczogJ2Nka0Nvbm5lY3RlZE92ZXJsYXknXG59KVxuZXhwb3J0IGNsYXNzIENvbm5lY3RlZE92ZXJsYXlEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIHByaXZhdGUgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWY7XG4gIHByaXZhdGUgX3RlbXBsYXRlUG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDtcbiAgcHJpdmF0ZSBfaGFzQmFja2Ryb3AgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfYmFja2Ryb3BTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfcG9zaXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfb2Zmc2V0WDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfb2Zmc2V0WTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfcG9zaXRpb246IENvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3k7XG4gIHByaXZhdGUgX2VzY2FwZUxpc3RlbmVyOiBGdW5jdGlvbjtcblxuICAvKiogT3JpZ2luIGZvciB0aGUgY29ubmVjdGVkIG92ZXJsYXkuICovXG4gIEBJbnB1dCgpIG9yaWdpbjogT3ZlcmxheU9yaWdpbjtcblxuICAvKiogUmVnaXN0ZXJlZCBjb25uZWN0ZWQgcG9zaXRpb24gcGFpcnMuICovXG4gIEBJbnB1dCgpIHBvc2l0aW9uczogQ29ubmVjdGlvblBvc2l0aW9uUGFpcltdO1xuXG4gIC8qKiBUaGUgb2Zmc2V0IGluIHBpeGVscyBmb3IgdGhlIG92ZXJsYXkgY29ubmVjdGlvbiBwb2ludCBvbiB0aGUgeC1heGlzICovXG4gIEBJbnB1dCgpXG4gIGdldCBvZmZzZXRYKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX29mZnNldFg7XG4gIH1cblxuICBzZXQgb2Zmc2V0WChvZmZzZXRYOiBudW1iZXIpIHtcbiAgICB0aGlzLl9vZmZzZXRYID0gb2Zmc2V0WDtcbiAgICBpZiAodGhpcy5fcG9zaXRpb24pIHtcbiAgICAgIHRoaXMuX3Bvc2l0aW9uLndpdGhPZmZzZXRYKG9mZnNldFgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUaGUgb2Zmc2V0IGluIHBpeGVscyBmb3IgdGhlIG92ZXJsYXkgY29ubmVjdGlvbiBwb2ludCBvbiB0aGUgeS1heGlzICovXG4gIEBJbnB1dCgpXG4gIGdldCBvZmZzZXRZKCkge1xuICAgIHJldHVybiB0aGlzLl9vZmZzZXRZO1xuICB9XG5cbiAgc2V0IG9mZnNldFkob2Zmc2V0WTogbnVtYmVyKSB7XG4gICAgdGhpcy5fb2Zmc2V0WSA9IG9mZnNldFk7XG4gICAgaWYgKHRoaXMuX3Bvc2l0aW9uKSB7XG4gICAgICB0aGlzLl9wb3NpdGlvbi53aXRoT2Zmc2V0WShvZmZzZXRZKTtcbiAgICB9XG4gIH1cblxuICAvKiogVGhlIHdpZHRoIG9mIHRoZSBvdmVybGF5IHBhbmVsLiAqL1xuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyIHwgc3RyaW5nO1xuXG4gIC8qKiBUaGUgaGVpZ2h0IG9mIHRoZSBvdmVybGF5IHBhbmVsLiAqL1xuICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlciB8IHN0cmluZztcblxuICAvKiogVGhlIG1pbiB3aWR0aCBvZiB0aGUgb3ZlcmxheSBwYW5lbC4gKi9cbiAgQElucHV0KCkgbWluV2lkdGg6IG51bWJlciB8IHN0cmluZztcblxuICAvKiogVGhlIG1pbiBoZWlnaHQgb2YgdGhlIG92ZXJsYXkgcGFuZWwuICovXG4gIEBJbnB1dCgpIG1pbkhlaWdodDogbnVtYmVyIHwgc3RyaW5nO1xuXG4gIC8qKiBUaGUgY3VzdG9tIGNsYXNzIHRvIGJlIHNldCBvbiB0aGUgYmFja2Ryb3AgZWxlbWVudC4gKi9cbiAgQElucHV0KCkgYmFja2Ryb3BDbGFzczogc3RyaW5nO1xuXG4gIC8qKiBTdHJhdGVneSB0byBiZSB1c2VkIHdoZW4gaGFuZGxpbmcgc2Nyb2xsIGV2ZW50cyB3aGlsZSB0aGUgb3ZlcmxheSBpcyBvcGVuLiAqL1xuICBASW5wdXQoKSBzY3JvbGxTdHJhdGVneTogU2Nyb2xsU3RyYXRlZ3kgPSB0aGlzLl9vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbigpO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBvdmVybGF5IGlzIG9wZW4uICovXG4gIEBJbnB1dCgpIG9wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciBvciBub3QgdGhlIG92ZXJsYXkgc2hvdWxkIGF0dGFjaCBhIGJhY2tkcm9wLiAqL1xuICBASW5wdXQoKVxuICBnZXQgaGFzQmFja2Ryb3AoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0JhY2tkcm9wO1xuICB9XG5cbiAgc2V0IGhhc0JhY2tkcm9wKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9oYXNCYWNrZHJvcCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBiYWNrZHJvcCBpcyBjbGlja2VkLiAqL1xuICBAT3V0cHV0KCkgYmFja2Ryb3BDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwb3NpdGlvbiBoYXMgY2hhbmdlZC4gKi9cbiAgQE91dHB1dCgpIHBvc2l0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2U+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgb3ZlcmxheSBoYXMgYmVlbiBhdHRhY2hlZC4gKi9cbiAgQE91dHB1dCgpIGF0dGFjaCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBvdmVybGF5IGhhcyBiZWVuIGRldGFjaGVkLiAqL1xuICBAT3V0cHV0KCkgZGV0YWNoID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8vIFRPRE8oamVsYm91cm4pOiBpbnB1dHMgZm9yIHNpemUsIHNjcm9sbCBiZWhhdmlvciwgYW5pbWF0aW9uLCBldGMuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RpcjogRGlyKSB7XG4gICAgdGhpcy5fdGVtcGxhdGVQb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwodGVtcGxhdGVSZWYsIHZpZXdDb250YWluZXJSZWYpO1xuICB9XG5cbiAgLyoqIFRoZSBhc3NvY2lhdGVkIG92ZXJsYXkgcmVmZXJlbmNlLiAqL1xuICBnZXQgb3ZlcmxheVJlZigpOiBPdmVybGF5UmVmIHtcbiAgICByZXR1cm4gdGhpcy5fb3ZlcmxheVJlZjtcbiAgfVxuXG4gIC8qKiBUaGUgZWxlbWVudCdzIGxheW91dCBkaXJlY3Rpb24uICovXG4gIGdldCBkaXIoKTogTGF5b3V0RGlyZWN0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyID8gdGhpcy5fZGlyLnZhbHVlIDogJ2x0cic7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kZXN0cm95T3ZlcmxheSgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWydvcGVuJ10pIHtcbiAgICAgIHRoaXMub3BlbiA/IHRoaXMuX2F0dGFjaE92ZXJsYXkoKSA6IHRoaXMuX2RldGFjaE92ZXJsYXkoKTtcbiAgICB9XG4gIH1cblxuICAvKiogQ3JlYXRlcyBhbiBvdmVybGF5ICovXG4gIHByaXZhdGUgX2NyZWF0ZU92ZXJsYXkoKSB7XG4gICAgaWYgKCF0aGlzLnBvc2l0aW9ucyB8fCAhdGhpcy5wb3NpdGlvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnBvc2l0aW9ucyA9IGRlZmF1bHRQb3NpdGlvbkxpc3Q7XG4gICAgfVxuXG4gICAgdGhpcy5fb3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKHRoaXMuX2J1aWxkQ29uZmlnKCkpO1xuICB9XG5cbiAgLyoqIEJ1aWxkcyB0aGUgb3ZlcmxheSBjb25maWcgYmFzZWQgb24gdGhlIGRpcmVjdGl2ZSdzIGlucHV0cyAqL1xuICBwcml2YXRlIF9idWlsZENvbmZpZygpOiBPdmVybGF5U3RhdGUge1xuICAgIGxldCBvdmVybGF5Q29uZmlnID0gbmV3IE92ZXJsYXlTdGF0ZSgpO1xuXG4gICAgaWYgKHRoaXMud2lkdGggfHwgdGhpcy53aWR0aCA9PT0gMCkge1xuICAgICAgb3ZlcmxheUNvbmZpZy53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVpZ2h0IHx8IHRoaXMuaGVpZ2h0ID09PSAwKSB7XG4gICAgICBvdmVybGF5Q29uZmlnLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1pbldpZHRoIHx8IHRoaXMubWluV2lkdGggPT09IDApIHtcbiAgICAgIG92ZXJsYXlDb25maWcubWluV2lkdGggPSB0aGlzLm1pbldpZHRoO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1pbkhlaWdodCB8fCB0aGlzLm1pbkhlaWdodCA9PT0gMCkge1xuICAgICAgb3ZlcmxheUNvbmZpZy5taW5IZWlnaHQgPSB0aGlzLm1pbkhlaWdodDtcbiAgICB9XG5cbiAgICBvdmVybGF5Q29uZmlnLmhhc0JhY2tkcm9wID0gdGhpcy5oYXNCYWNrZHJvcDtcblxuICAgIGlmICh0aGlzLmJhY2tkcm9wQ2xhc3MpIHtcbiAgICAgIG92ZXJsYXlDb25maWcuYmFja2Ryb3BDbGFzcyA9IHRoaXMuYmFja2Ryb3BDbGFzcztcbiAgICB9XG5cbiAgICB0aGlzLl9wb3NpdGlvbiA9IHRoaXMuX2NyZWF0ZVBvc2l0aW9uU3RyYXRlZ3koKSBhcyBDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5O1xuICAgIG92ZXJsYXlDb25maWcucG9zaXRpb25TdHJhdGVneSA9IHRoaXMuX3Bvc2l0aW9uO1xuICAgIG92ZXJsYXlDb25maWcuc2Nyb2xsU3RyYXRlZ3kgPSB0aGlzLnNjcm9sbFN0cmF0ZWd5O1xuXG4gICAgcmV0dXJuIG92ZXJsYXlDb25maWc7XG4gIH1cblxuICAvKiogUmV0dXJucyB0aGUgcG9zaXRpb24gc3RyYXRlZ3kgb2YgdGhlIG92ZXJsYXkgdG8gYmUgc2V0IG9uIHRoZSBvdmVybGF5IGNvbmZpZyAqL1xuICBwcml2YXRlIF9jcmVhdGVQb3NpdGlvblN0cmF0ZWd5KCk6IENvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgIGNvbnN0IHBvcyA9IHRoaXMucG9zaXRpb25zWzBdO1xuICAgIGNvbnN0IG9yaWdpblBvaW50ID0ge29yaWdpblg6IHBvcy5vcmlnaW5YLCBvcmlnaW5ZOiBwb3Mub3JpZ2luWX07XG4gICAgY29uc3Qgb3ZlcmxheVBvaW50ID0ge292ZXJsYXlYOiBwb3Mub3ZlcmxheVgsIG92ZXJsYXlZOiBwb3Mub3ZlcmxheVl9O1xuXG4gICAgY29uc3Qgc3RyYXRlZ3kgPSB0aGlzLl9vdmVybGF5LnBvc2l0aW9uKClcbiAgICAgIC5jb25uZWN0ZWRUbyh0aGlzLm9yaWdpbi5lbGVtZW50UmVmLCBvcmlnaW5Qb2ludCwgb3ZlcmxheVBvaW50KVxuICAgICAgLndpdGhPZmZzZXRYKHRoaXMub2Zmc2V0WClcbiAgICAgIC53aXRoT2Zmc2V0WSh0aGlzLm9mZnNldFkpO1xuXG4gICAgdGhpcy5faGFuZGxlUG9zaXRpb25DaGFuZ2VzKHN0cmF0ZWd5KTtcblxuICAgIHJldHVybiBzdHJhdGVneTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVBvc2l0aW9uQ2hhbmdlcyhzdHJhdGVneTogQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5wb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHN0cmF0ZWd5LndpdGhGYWxsYmFja1Bvc2l0aW9uKFxuICAgICAgICAgIHtvcmlnaW5YOiB0aGlzLnBvc2l0aW9uc1tpXS5vcmlnaW5YLCBvcmlnaW5ZOiB0aGlzLnBvc2l0aW9uc1tpXS5vcmlnaW5ZfSxcbiAgICAgICAgICB7b3ZlcmxheVg6IHRoaXMucG9zaXRpb25zW2ldLm92ZXJsYXlYLCBvdmVybGF5WTogdGhpcy5wb3NpdGlvbnNbaV0ub3ZlcmxheVl9XG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuX3Bvc2l0aW9uU3Vic2NyaXB0aW9uID1cbiAgICAgICAgc3RyYXRlZ3kub25Qb3NpdGlvbkNoYW5nZS5zdWJzY3JpYmUoKHBvczogYW55KSA9PiB0aGlzLnBvc2l0aW9uQ2hhbmdlLmVtaXQocG9zKSk7XG4gIH1cblxuICAvKiogQXR0YWNoZXMgdGhlIG92ZXJsYXkgYW5kIHN1YnNjcmliZXMgdG8gYmFja2Ryb3AgY2xpY2tzIGlmIGJhY2tkcm9wIGV4aXN0cyAqL1xuICBwcml2YXRlIF9hdHRhY2hPdmVybGF5KCkge1xuICAgIGlmICghdGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5fY3JlYXRlT3ZlcmxheSgpO1xuICAgIH1cblxuICAgIHRoaXMuX3Bvc2l0aW9uLndpdGhEaXJlY3Rpb24odGhpcy5kaXIpO1xuICAgIHRoaXMuX292ZXJsYXlSZWYuZ2V0U3RhdGUoKS5kaXJlY3Rpb24gPSB0aGlzLmRpcjtcbiAgICB0aGlzLl9pbml0RXNjYXBlTGlzdGVuZXIoKTtcblxuICAgIGlmICghdGhpcy5fb3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmLmF0dGFjaCh0aGlzLl90ZW1wbGF0ZVBvcnRhbCk7XG4gICAgICB0aGlzLmF0dGFjaC5lbWl0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGFzQmFja2Ryb3ApIHtcbiAgICAgIHRoaXMuX2JhY2tkcm9wU3Vic2NyaXB0aW9uID0gdGhpcy5fb3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5iYWNrZHJvcENsaWNrLmVtaXQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBEZXRhY2hlcyB0aGUgb3ZlcmxheSBhbmQgdW5zdWJzY3JpYmVzIHRvIGJhY2tkcm9wIGNsaWNrcyBpZiBiYWNrZHJvcCBleGlzdHMgKi9cbiAgcHJpdmF0ZSBfZGV0YWNoT3ZlcmxheSgpIHtcbiAgICBpZiAodGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgIHRoaXMuZGV0YWNoLmVtaXQoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fYmFja2Ryb3BTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2JhY2tkcm9wU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9iYWNrZHJvcFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2VzY2FwZUxpc3RlbmVyKSB7XG4gICAgICB0aGlzLl9lc2NhcGVMaXN0ZW5lcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBEZXN0cm95cyB0aGUgb3ZlcmxheSBjcmVhdGVkIGJ5IHRoaXMgZGlyZWN0aXZlLiAqL1xuICBwcml2YXRlIF9kZXN0cm95T3ZlcmxheSgpIHtcbiAgICBpZiAodGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2JhY2tkcm9wU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9iYWNrZHJvcFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wb3NpdGlvblN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fcG9zaXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXNjYXBlTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMuX2VzY2FwZUxpc3RlbmVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFNldHMgdGhlIGV2ZW50IGxpc3RlbmVyIHRoYXQgY2xvc2VzIHRoZSBvdmVybGF5IHdoZW4gcHJlc3NpbmcgRXNjYXBlLiAqL1xuICBwcml2YXRlIF9pbml0RXNjYXBlTGlzdGVuZXIoKSB7XG4gICAgdGhpcy5fZXNjYXBlTGlzdGVuZXIgPSB0aGlzLl9yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2tleWRvd24nLCAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFU0NBUEUpIHtcbiAgICAgICAgdGhpcy5fZGV0YWNoT3ZlcmxheSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1BvcnRhbE1vZHVsZSwgU2Nyb2xsRGlzcGF0Y2hNb2R1bGVdLFxuICBleHBvcnRzOiBbQ29ubmVjdGVkT3ZlcmxheURpcmVjdGl2ZSwgT3ZlcmxheU9yaWdpbiwgU2Nyb2xsRGlzcGF0Y2hNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtDb25uZWN0ZWRPdmVybGF5RGlyZWN0aXZlLCBPdmVybGF5T3JpZ2luXSxcbiAgcHJvdmlkZXJzOiBbT1ZFUkxBWV9QUk9WSURFUlNdLFxufSlcbmV4cG9ydCBjbGFzcyBPdmVybGF5TW9kdWxlIHt9XG4iXX0=