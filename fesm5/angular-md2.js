import { NgModule, Directive, Inject, Optional, ElementRef, InjectionToken, isDevMode, HostBinding, Output, Input, EventEmitter, Injectable, NgZone, SkipSelf, Renderer2, Component, ViewEncapsulation, TemplateRef, ComponentFactoryResolver, ViewContainerRef, ApplicationRef, Injector, Pipe, forwardRef, ViewChild, HostListener, Renderer, Self, ContentChildren, ChangeDetectorRef, Attribute, IterableDiffers, ChangeDetectionStrategy } from '@angular/core';
import { DOCUMENT, HammerGestureConfig } from '@angular/platform-browser';
import { Subject, Subscription, merge, fromEvent, of } from 'rxjs';
import { debounceTime, auditTime, first, startWith, filter } from 'rxjs/operators';
import { __extends, __spread, __values } from 'tslib';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger, keyframes } from '@angular/animations';
import { NG_VALUE_ACCESSOR, FormsModule, NgControl, NG_VALIDATORS, Validators } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var MATERIAL_COMPATIBILITY_MODE = new InjectionToken('md-compatibility-mode');
/**
 * Returns an exception to be thrown if the consumer has used
 * an invalid Material prefix on a component.
 * \@docs-private
 * @param {?} prefix
 * @param {?} nodeName
 * @return {?}
 */
function getMdCompatibilityInvalidPrefixError(prefix, nodeName) {
    return Error("The \"" + prefix + "-\" prefix cannot be used in ng-material v1 compatibility mode. " +
        ("It was used on an \"" + nodeName.toLowerCase() + "\" element."));
}
/** *
 * Selector that matches all elements that may have style collisions with AngularJS Material.
  @type {?} */
var MAT_ELEMENTS_SELECTOR = "\n  [mat-button],\n  [mat-fab],\n  [mat-icon-button],\n  [mat-mini-fab],\n  [mat-raised-button],\n  [matCardSubtitle],\n  [matCardTitle],\n  [matDialogActions],\n  [matDialogClose],\n  [matDialogContent],\n  [matDialogTitle],\n  [matLine],\n  [matTabLabel],\n  [matTabLink],\n  [matTabNav],\n  [matTooltip],\n  mat-autocomplete,\n  mat-button-toggle,\n  mat-button-toggle,\n  mat-button-toggle-group,\n  mat-card,\n  mat-card-actions,\n  mat-card-content,\n  mat-card-footer,\n  mat-card-header,\n  mat-card-subtitle,\n  mat-card-title,\n  mat-card-title-group,\n  mat-checkbox,\n  mat-chip,\n  mat-dialog-actions,\n  mat-dialog-container,\n  mat-dialog-content,\n  mat-divider,\n  mat-error,\n  mat-grid-list,\n  mat-grid-tile,\n  mat-grid-tile-footer,\n  mat-grid-tile-header,\n  mat-hint,\n  mat-icon,\n  mat-list,\n  mat-list-item,\n  mat-menu,\n  mat-nav-list,\n  mat-option,\n  mat-placeholder,\n  mat-progress-bar,\n  mat-pseudo-checkbox,\n  mat-radio-button,\n  mat-radio-group,\n  mat-select,\n  mat-sidenav,\n  mat-sidenav-container,\n  mat-slider,\n  mat-spinner,\n  mat-tab,\n  mat-tab-group,\n  mat-toolbar";
/** *
 * Selector that matches all elements that may have style collisions with AngularJS Material.
  @type {?} */
var MD_ELEMENTS_SELECTOR = "\n  [md-button],\n  [md-fab],\n  [md-icon-button],\n  [md-mini-fab],\n  [md-raised-button],\n  [mdCardSubtitle],\n  [mdCardTitle],\n  [mdDialogActions],\n  [mdDialogClose],\n  [mdDialogContent],\n  [mdDialogTitle],\n  [mdLine],\n  [mdTabLabel],\n  [mdTabLink],\n  [mdTabNav],\n  [mdTooltip],\n  md-autocomplete,\n  md-button-toggle,\n  md-button-toggle,\n  md-button-toggle-group,\n  md-card,\n  md-card-actions,\n  md-card-content,\n  md-card-footer,\n  md-card-header,\n  md-card-subtitle,\n  md-card-title,\n  md-card-title-group,\n  md-checkbox,\n  md-chip,\n  md-dialog-actions,\n  md-dialog-container,\n  md-dialog-content,\n  md-divider,\n  md-error,\n  md-grid-list,\n  md-grid-tile,\n  md-grid-tile-footer,\n  md-grid-tile-header,\n  md-hint,\n  md-icon,\n  md-list,\n  md-list-item,\n  md-menu,\n  md-nav-list,\n  md-option,\n  md-placeholder,\n  md-progress-bar,\n  md-pseudo-checkbox,\n  md-radio-button,\n  md-radio-group,\n  md-select,\n  md-sidenav,\n  md-sidenav-container,\n  md-slider,\n  md-spinner,\n  md-tab,\n  md-tab-group,\n  md-toolbar";
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Injection token that configures whether the Material sanity checks are enabled.
  @type {?} */
var MATERIAL_SANITY_CHECKS = new InjectionToken('md-sanity-checks');
/**
 * Module that captures anything that should be loaded and/or run for *all* Angular Material
 * components. This includes Bidi, compatibility mode, etc.
 *
 * This module should be imported to each top-level component module (e.g., MdTabsModule).
 */
var MdCommonModule = /** @class */ (function () {
    function MdCommonModule(_document, _sanityChecksEnabled) {
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
    MdCommonModule.prototype._checkDoctype = /**
     * @return {?}
     */
    function () {
        if (!this._document.doctype) {
            console.warn('Current document does not have a doctype. This may cause ' +
                'some Angular Material components not to behave as expected.');
        }
    };
    /**
     * @return {?}
     */
    MdCommonModule.prototype._checkTheme = /**
     * @return {?}
     */
    function () {
        if (typeof getComputedStyle === 'function') {
            /** @type {?} */
            var testElement = this._document.createElement('div');
            testElement.classList.add('mat-theme-loaded-marker');
            this._document.body.appendChild(testElement);
            if (getComputedStyle(testElement).display !== 'none') {
                console.warn('Could not find Angular Material core theme. Most Material ' +
                    'components may not work as expected. For more info refer ' +
                    'to the theming guide: https://material.angular.io/guide/theming');
            }
            this._document.body.removeChild(testElement);
        }
    };
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
    MdCommonModule.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [MATERIAL_SANITY_CHECKS,] }] }
    ]; };
    return MdCommonModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a \@ContentChildren(MdLine) query, then
 * counted by checking the query list's length.
 */
var MdLine = /** @class */ (function () {
    function MdLine() {
    }
    MdLine.decorators = [
        { type: Directive, args: [{
                    selector: '[md-line], [mat-line], [mdLine], [matLine]',
                    host: { 'class': 'mat-line' }
                },] }
    ];
    return MdLine;
}());
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * \@docs-private
 */
var  /**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * \@docs-private
 */
MdLineSetter = /** @class */ (function () {
    function MdLineSetter(_lines, _renderer, _element) {
        var _this = this;
        this._lines = _lines;
        this._renderer = _renderer;
        this._element = _element;
        this._setLineClass(this._lines.length);
        this._lines.changes.subscribe(function () {
            _this._setLineClass(_this._lines.length);
        });
    }
    /**
     * @param {?} count
     * @return {?}
     */
    MdLineSetter.prototype._setLineClass = /**
     * @param {?} count
     * @return {?}
     */
    function (count) {
        this._resetClasses();
        if (count === 2 || count === 3) {
            this._setClass("mat-" + count + "-line", true);
        }
        else if (count > 3) {
            this._setClass("mat-multi-line", true);
        }
    };
    /**
     * @return {?}
     */
    MdLineSetter.prototype._resetClasses = /**
     * @return {?}
     */
    function () {
        this._setClass('mat-2-line', false);
        this._setClass('mat-3-line', false);
        this._setClass('mat-multi-line', false);
    };
    /**
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    MdLineSetter.prototype._setClass = /**
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    function (className, isAdd) {
        if (isAdd) {
            this._renderer.addClass(this._element.nativeElement, className);
        }
        else {
            this._renderer.removeClass(this._element.nativeElement, className);
        }
    };
    return MdLineSetter;
}());
var MdLineModule = /** @class */ (function () {
    function MdLineModule() {
    }
    MdLineModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MdCommonModule],
                    exports: [MdLine, MdCommonModule],
                    declarations: [MdLine],
                },] }
    ];
    return MdLineModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Directive to listen for changes of direction of part of the DOM.
 *
 * Applications should use this directive instead of the native attribute so that Material
 * components can listen on changes of direction.
 */
var Dir = /** @class */ (function () {
    function Dir() {
        /**
         * Layout direction of the element.
         */
        this._dir = 'ltr';
        /**
         * Event emitted when the direction changes.
         */
        this.dirChange = new EventEmitter();
    }
    Object.defineProperty(Dir.prototype, "dir", {
        /** @docs-private */
        get: /**
         * \@docs-private
         * @return {?}
         */
        function () {
            return this._dir;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            /** @type {?} */
            var old = this._dir;
            this._dir = v;
            if (old != this._dir) {
                this.dirChange.emit();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dir.prototype, "value", {
        /** Current layout direction of the element. */
        get: /**
         * Current layout direction of the element.
         * @return {?}
         */
        function () { return this.dir; },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) { this.dir = v; },
        enumerable: true,
        configurable: true
    });
    Dir.decorators = [
        { type: Directive, args: [{
                    selector: '[dir]',
                    // TODO(hansl): maybe `$implicit` isn't the best option here, but for now that's the best we got.
                    exportAs: '$implicit'
                },] }
    ];
    Dir.propDecorators = {
        _dir: [{ type: Input, args: ['dir',] }],
        dirChange: [{ type: Output }],
        dir: [{ type: HostBinding, args: ['attr.dir',] }]
    };
    return Dir;
}());
var RtlModule = /** @class */ (function () {
    function RtlModule() {
    }
    RtlModule.decorators = [
        { type: NgModule, args: [{
                    exports: [Dir],
                    declarations: [Dir]
                },] }
    ];
    return RtlModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Factory that creates a new MutationObserver and allows us to stub it out in unit tests.
 * \@docs-private
 */
var MdMutationObserverFactory = /** @class */ (function () {
    function MdMutationObserverFactory() {
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    MdMutationObserverFactory.prototype.create = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        return typeof MutationObserver === 'undefined' ? null : new MutationObserver(callback);
    };
    MdMutationObserverFactory.decorators = [
        { type: Injectable }
    ];
    return MdMutationObserverFactory;
}());
/**
 * Directive that triggers a callback whenever the content of
 * its associated element has changed.
 */
var ObserveContent = /** @class */ (function () {
    function ObserveContent(_mutationObserverFactory, _elementRef) {
        this._mutationObserverFactory = _mutationObserverFactory;
        this._elementRef = _elementRef;
        /**
         * Event emitted for each change in the element's content.
         */
        this.event = new EventEmitter();
        /**
         * Used for debouncing the emitted values to the observeContent event.
         */
        this._debouncer = new Subject();
    }
    /**
     * @return {?}
     */
    ObserveContent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.debounce > 0) {
            this._debouncer
                .pipe(debounceTime(this.debounce))
                .subscribe(function (mutations) { return _this.event.emit(mutations); });
        }
        else {
            this._debouncer.subscribe(function (mutations) { return _this.event.emit(mutations); });
        }
        this._observer = this._mutationObserverFactory.create(function (mutations) {
            _this._debouncer.next(mutations);
        });
        if (this._observer) {
            this._observer.observe(this._elementRef.nativeElement, {
                characterData: true,
                childList: true,
                subtree: true
            });
        }
    };
    /**
     * @return {?}
     */
    ObserveContent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._observer) {
            this._observer.disconnect();
            this._debouncer.complete();
            this._debouncer = this._observer = null;
        }
    };
    ObserveContent.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkObserveContent]'
                },] }
    ];
    /** @nocollapse */
    ObserveContent.ctorParameters = function () { return [
        { type: MdMutationObserverFactory },
        { type: ElementRef }
    ]; };
    ObserveContent.propDecorators = {
        event: [{ type: Output, args: ['cdkObserveContent',] }],
        debounce: [{ type: Input }]
    };
    return ObserveContent;
}());
var ObserveContentModule = /** @class */ (function () {
    function ObserveContentModule() {
    }
    ObserveContentModule.decorators = [
        { type: NgModule, args: [{
                    exports: [ObserveContent],
                    declarations: [ObserveContent],
                    providers: [MdMutationObserverFactory]
                },] }
    ];
    return ObserveContentModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
var RippleState = {
    FADING_IN: 0, VISIBLE: 1, FADING_OUT: 2, HIDDEN: 3,
};
RippleState[RippleState.FADING_IN] = 'FADING_IN';
RippleState[RippleState.VISIBLE] = 'VISIBLE';
RippleState[RippleState.FADING_OUT] = 'FADING_OUT';
RippleState[RippleState.HIDDEN] = 'HIDDEN';
/**
 * Reference to a previously launched ripple element.
 */
var  /**
 * Reference to a previously launched ripple element.
 */
RippleRef = /** @class */ (function () {
    function RippleRef(_renderer, element, config) {
        this._renderer = _renderer;
        this.element = element;
        this.config = config;
        /**
         * Current state of the ripple reference.
         */
        this.state = RippleState.HIDDEN;
    }
    /** Fades out the ripple element. */
    /**
     * Fades out the ripple element.
     * @return {?}
     */
    RippleRef.prototype.fadeOut = /**
     * Fades out the ripple element.
     * @return {?}
     */
    function () {
        this._renderer.fadeOutRipple(this);
    };
    return RippleRef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Fade-in duration for the ripples. Can be modified with the speedFactor option.
  @type {?} */
var RIPPLE_FADE_IN_DURATION = 450;
/** *
 * Fade-out duration for the ripples in milliseconds. This can't be modified by the speedFactor.
  @type {?} */
var RIPPLE_FADE_OUT_DURATION = 400;
/**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * \@docs-private
 */
var  /**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * \@docs-private
 */
RippleRenderer = /** @class */ (function () {
    function RippleRenderer(elementRef, _ngZone, _ruler, platform) {
        this._ngZone = _ngZone;
        this._ruler = _ruler;
        /**
         * Whether the mouse is currently down or not.
         */
        this._isMousedown = false;
        /**
         * Events to be registered on the trigger element.
         */
        this._triggerEvents = new Map();
        /**
         * Set of currently active ripple references.
         */
        this._activeRipples = new Set();
        /**
         * Ripple config for all ripples created by events.
         */
        this.rippleConfig = {};
        /**
         * Whether mouse ripples should be created or not.
         */
        this.rippleDisabled = false;
        // Only do anything if we're on the browser.
        if (platform.isBrowser) {
            this._containerElement = elementRef.nativeElement;
            // Specify events which need to be registered on the trigger.
            this._triggerEvents.set('mousedown', this.onMousedown.bind(this));
            this._triggerEvents.set('mouseup', this.onMouseup.bind(this));
            this._triggerEvents.set('mouseleave', this.onMouseLeave.bind(this));
            // By default use the host element as trigger element.
            this.setTriggerElement(this._containerElement);
        }
    }
    /** Fades in a ripple at the given coordinates. */
    /**
     * Fades in a ripple at the given coordinates.
     * @param {?} pageX
     * @param {?} pageY
     * @param {?=} config
     * @return {?}
     */
    RippleRenderer.prototype.fadeInRipple = /**
     * Fades in a ripple at the given coordinates.
     * @param {?} pageX
     * @param {?} pageY
     * @param {?=} config
     * @return {?}
     */
    function (pageX, pageY, config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        /** @type {?} */
        var containerRect = this._containerElement.getBoundingClientRect();
        if (config.centered) {
            pageX = containerRect.left + containerRect.width / 2;
            pageY = containerRect.top + containerRect.height / 2;
        }
        else {
            /** @type {?} */
            var scrollPosition = this._ruler.getViewportScrollPosition();
            pageX -= scrollPosition.left;
            pageY -= scrollPosition.top;
        }
        /** @type {?} */
        var radius = config.radius || distanceToFurthestCorner(pageX, pageY, containerRect);
        /** @type {?} */
        var duration = RIPPLE_FADE_IN_DURATION * (1 / (config.speedFactor || 1));
        /** @type {?} */
        var offsetX = pageX - containerRect.left;
        /** @type {?} */
        var offsetY = pageY - containerRect.top;
        /** @type {?} */
        var ripple = document.createElement('div');
        ripple.classList.add('mat-ripple-element');
        ripple.style.left = offsetX - radius + "px";
        ripple.style.top = offsetY - radius + "px";
        ripple.style.height = radius * 2 + "px";
        ripple.style.width = radius * 2 + "px";
        // If the color is not set, the default CSS color will be used.
        ripple.style.backgroundColor = config.color;
        ripple.style.transitionDuration = duration + "ms";
        this._containerElement.appendChild(ripple);
        // By default the browser does not recalculate the styles of dynamically created
        // ripple elements. This is critical because then the `scale` would not animate properly.
        enforceStyleRecalculation(ripple);
        ripple.style.transform = 'scale(1)';
        /** @type {?} */
        var rippleRef = new RippleRef(this, ripple, config);
        rippleRef.state = RippleState.FADING_IN;
        // Add the ripple reference to the list of all active ripples.
        this._activeRipples.add(rippleRef);
        // Wait for the ripple element to be completely faded in.
        // Once it's faded in, the ripple can be hidden immediately if the mouse is released.
        this.runTimeoutOutsideZone(function () {
            rippleRef.state = RippleState.VISIBLE;
            if (!config.persistent && !_this._isMousedown) {
                rippleRef.fadeOut();
            }
        }, duration);
        return rippleRef;
    };
    /** Fades out a ripple reference. */
    /**
     * Fades out a ripple reference.
     * @param {?} rippleRef
     * @return {?}
     */
    RippleRenderer.prototype.fadeOutRipple = /**
     * Fades out a ripple reference.
     * @param {?} rippleRef
     * @return {?}
     */
    function (rippleRef) {
        // For ripples that are not active anymore, don't re-un the fade-out animation.
        if (!this._activeRipples.delete(rippleRef)) {
            return;
        }
        /** @type {?} */
        var rippleEl = rippleRef.element;
        rippleEl.style.transitionDuration = RIPPLE_FADE_OUT_DURATION + "ms";
        rippleEl.style.opacity = '0';
        rippleRef.state = RippleState.FADING_OUT;
        // Once the ripple faded out, the ripple can be safely removed from the DOM.
        this.runTimeoutOutsideZone(function () {
            rippleRef.state = RippleState.HIDDEN;
            rippleEl.parentNode.removeChild(rippleEl);
        }, RIPPLE_FADE_OUT_DURATION);
    };
    /** Fades out all currently active ripples. */
    /**
     * Fades out all currently active ripples.
     * @return {?}
     */
    RippleRenderer.prototype.fadeOutAll = /**
     * Fades out all currently active ripples.
     * @return {?}
     */
    function () {
        this._activeRipples.forEach(function (ripple) { return ripple.fadeOut(); });
    };
    /** Sets the trigger element and registers the mouse events. */
    /**
     * Sets the trigger element and registers the mouse events.
     * @param {?} element
     * @return {?}
     */
    RippleRenderer.prototype.setTriggerElement = /**
     * Sets the trigger element and registers the mouse events.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var _this = this;
        // Remove all previously register event listeners from the trigger element.
        if (this._triggerElement) {
            this._triggerEvents.forEach(function (fn, type) { return _this._triggerElement.removeEventListener(type, fn); });
        }
        if (element) {
            // If the element is not null, register all event listeners on the trigger element.
            this._ngZone.runOutsideAngular(function () {
                _this._triggerEvents.forEach(function (fn, type) { return element.addEventListener(type, fn); });
            });
        }
        this._triggerElement = element;
    };
    /**
     * Listener being called on mousedown event.
     * @param {?} event
     * @return {?}
     */
    RippleRenderer.prototype.onMousedown = /**
     * Listener being called on mousedown event.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.rippleDisabled) {
            this._isMousedown = true;
            this.fadeInRipple(event.pageX, event.pageY, this.rippleConfig);
        }
    };
    /**
     * Listener being called on mouseup event.
     * @return {?}
     */
    RippleRenderer.prototype.onMouseup = /**
     * Listener being called on mouseup event.
     * @return {?}
     */
    function () {
        this._isMousedown = false;
        // Fade-out all ripples that are completely visible and not persistent.
        this._activeRipples.forEach(function (ripple) {
            if (!ripple.config.persistent && ripple.state === RippleState.VISIBLE) {
                ripple.fadeOut();
            }
        });
    };
    /**
     * Listener being called on mouseleave event.
     * @return {?}
     */
    RippleRenderer.prototype.onMouseLeave = /**
     * Listener being called on mouseleave event.
     * @return {?}
     */
    function () {
        if (this._isMousedown) {
            this.onMouseup();
        }
    };
    /**
     * Runs a timeout outside of the Angular zone to avoid triggering the change detection.
     * @param {?} fn
     * @param {?=} delay
     * @return {?}
     */
    RippleRenderer.prototype.runTimeoutOutsideZone = /**
     * Runs a timeout outside of the Angular zone to avoid triggering the change detection.
     * @param {?} fn
     * @param {?=} delay
     * @return {?}
     */
    function (fn, delay) {
        if (delay === void 0) { delay = 0; }
        this._ngZone.runOutsideAngular(function () { return setTimeout(fn, delay); });
    };
    return RippleRenderer;
}());
/**
 * Enforces a style recalculation of a DOM element by computing its styles.
 * @param {?} element
 * @return {?}
 */
function enforceStyleRecalculation(element) {
    // Enforce a style recalculation by calling `getComputedStyle` and accessing any property.
    // Calling `getPropertyValue` is important to let optimizers know that this is not a noop.
    // See: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
    window.getComputedStyle(element).getPropertyValue('opacity');
}
/**
 * Returns the distance from the point (x, y) to the furthest corner of a rectangle.
 * @param {?} x
 * @param {?} y
 * @param {?} rect
 * @return {?}
 */
function distanceToFurthestCorner(x, y, rect) {
    /** @type {?} */
    var distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
    /** @type {?} */
    var distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return Math.sqrt(distX * distX + distY * distY);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var hasV8BreakIterator = (typeof (Intl) !== 'undefined' && (/** @type {?} */ (Intl)).v8BreakIterator);
/**
 * Service to detect the current platform by comparing the userAgent strings and
 * checking browser-specific global properties.
 * \@docs-private
 */
var Platform = /** @class */ (function () {
    function Platform() {
        this.isBrowser = typeof document === 'object' && !!document;
        /**
         * Layout Engines
         */
        this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
        this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
        // EdgeHTML and Trident mock Blink specific things and need to be excluded from this check.
        this.BLINK = this.isBrowser &&
            (!!((/** @type {?} */ (window)).chrome || hasV8BreakIterator) && !!CSS && !this.EDGE && !this.TRIDENT);
        // Webkit is part of the userAgent in EdgeHTML, Blink and Trident. Therefore we need to
        // ensure that Webkit runs standalone and is not used as another engine's base.
        this.WEBKIT = this.isBrowser &&
            /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT;
        /**
         * Browsers and Platform Types
         */
        this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !(/** @type {?} */ (window)).MSStream;
        // It's difficult to detect the plain Gecko engine, because most of the browsers identify
        // them self as Gecko-like browsers and modify the userAgent's according to that.
        // Since we only cover one explicit Firefox case, we can simply check for Firefox
        // instead of having an unstable check for Gecko.
        this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
        // Trident on mobile adds the android platform to the userAgent to trick detections.
        this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;
        // Safari browsers will include the Safari keyword in their userAgent. Some browsers may fake
        // this and just place the Safari keyword in the userAgent. To be more safe about Safari every
        // Safari browser should also use Webkit as its layout engine.
        this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
    }
    Platform.decorators = [
        { type: Injectable }
    ];
    return Platform;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Cached result Set of input types support by the current browser.
  @type {?} */
var supportedInputTypes;
/** *
 * Types of <input> that *might* be supported.
  @type {?} */
var candidateInputTypes = [
    'color',
    'button',
    'checkbox',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
];
/**
 * @return {?} The input types supported by this browser.
 */
function getSupportedInputTypes() {
    // Result is cached.
    if (supportedInputTypes) {
        return supportedInputTypes;
    }
    // We can't check if an input type is not supported until we're on the browser, so say that
    // everything is supported when not on the browser. We don't use `Platform` here since it's
    // just a helper function and can't inject it.
    if (typeof document !== 'object' || !document) {
        supportedInputTypes = new Set(candidateInputTypes);
        return supportedInputTypes;
    }
    /** @type {?} */
    var featureTestInput = document.createElement('input');
    supportedInputTypes = new Set(candidateInputTypes.filter(function (value) {
        featureTestInput.setAttribute('type', value);
        return featureTestInput.type === value;
    }));
    return supportedInputTypes;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PlatformModule = /** @class */ (function () {
    function PlatformModule() {
    }
    PlatformModule.decorators = [
        { type: NgModule, args: [{
                    providers: [Platform]
                },] }
    ];
    return PlatformModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Time in ms to throttle the scrolling events by default.
  @type {?} */
var DEFAULT_SCROLL_TIME = 20;
/**
 * Service contained all registered Scrollable references and emits an event when any one of the
 * Scrollable references emit a scrolled event.
 */
var ScrollDispatcher = /** @class */ (function () {
    function ScrollDispatcher(_ngZone, _platform) {
        this._ngZone = _ngZone;
        this._platform = _platform;
        /**
         * Subject for notifying that a registered scrollable reference element has been scrolled.
         */
        this._scrolled = new Subject();
        /**
         * Keeps track of the global `scroll` and `resize` subscriptions.
         */
        this._globalSubscription = null;
        /**
         * Keeps track of the amount of subscriptions to `scrolled`. Used for cleaning up afterwards.
         */
        this._scrolledCount = 0;
        /**
         * Map of all the scrollable references that are registered with the service and their
         * scroll event subscriptions.
         */
        this.scrollableReferences = new Map();
    }
    /**
     * Registers a Scrollable with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event in its scrolled observable.
     * @param scrollable Scrollable instance to be registered.
     */
    /**
     * Registers a Scrollable with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event in its scrolled observable.
     * @param {?} scrollable Scrollable instance to be registered.
     * @return {?}
     */
    ScrollDispatcher.prototype.register = /**
     * Registers a Scrollable with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event in its scrolled observable.
     * @param {?} scrollable Scrollable instance to be registered.
     * @return {?}
     */
    function (scrollable) {
        var _this = this;
        /** @type {?} */
        var scrollSubscription = scrollable.elementScrolled().subscribe(function () { return _this._notify(); });
        this.scrollableReferences.set(scrollable, scrollSubscription);
    };
    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     * @param scrollable Scrollable instance to be deregistered.
     */
    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     * @param {?} scrollable Scrollable instance to be deregistered.
     * @return {?}
     */
    ScrollDispatcher.prototype.deregister = /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     * @param {?} scrollable Scrollable instance to be deregistered.
     * @return {?}
     */
    function (scrollable) {
        if (this.scrollableReferences.has(scrollable)) {
            this.scrollableReferences.get(scrollable).unsubscribe();
            this.scrollableReferences.delete(scrollable);
        }
    };
    /**
     * Subscribes to an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     */
    /**
     * Subscribes to an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     * @param {?=} auditTimeInMs
     * @param {?=} callback
     * @return {?}
     */
    ScrollDispatcher.prototype.scrolled = /**
     * Subscribes to an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     * @param {?=} auditTimeInMs
     * @param {?=} callback
     * @return {?}
     */
    function (auditTimeInMs, callback) {
        var _this = this;
        if (auditTimeInMs === void 0) { auditTimeInMs = DEFAULT_SCROLL_TIME; }
        // Scroll events can only happen on the browser, so do nothing if we're not on the browser.
        if (!this._platform.isBrowser) {
            return Subscription.EMPTY;
        }
        /** @type {?} */
        var observable = auditTimeInMs > 0 ?
            this._scrolled.asObservable().pipe(auditTime(auditTimeInMs)) :
            this._scrolled.asObservable();
        this._scrolledCount++;
        if (!this._globalSubscription) {
            this._globalSubscription = this._ngZone.runOutsideAngular(function () {
                return merge(fromEvent(window.document, 'scroll'), fromEvent(window, 'resize')).subscribe(function () { return _this._notify(); });
            });
        }
        /** @type {?} */
        var subscription = observable.subscribe(callback);
        subscription.add(function () {
            _this._scrolledCount--;
            if (_this._globalSubscription && !_this.scrollableReferences.size && !_this._scrolledCount) {
                _this._globalSubscription.unsubscribe();
                _this._globalSubscription = null;
            }
        });
        return subscription;
    };
    /** Returns all registered Scrollables that contain the provided element. */
    /**
     * Returns all registered Scrollables that contain the provided element.
     * @param {?} elementRef
     * @return {?}
     */
    ScrollDispatcher.prototype.getScrollContainers = /**
     * Returns all registered Scrollables that contain the provided element.
     * @param {?} elementRef
     * @return {?}
     */
    function (elementRef) {
        var _this = this;
        /** @type {?} */
        var scrollingContainers = [];
        this.scrollableReferences.forEach(function (_subscription, scrollable) {
            if (_this.scrollableContainsElement(scrollable, elementRef)) {
                scrollingContainers.push(scrollable);
            }
        });
        return scrollingContainers;
    };
    /** Returns true if the element is contained within the provided Scrollable. */
    /**
     * Returns true if the element is contained within the provided Scrollable.
     * @param {?} scrollable
     * @param {?} elementRef
     * @return {?}
     */
    ScrollDispatcher.prototype.scrollableContainsElement = /**
     * Returns true if the element is contained within the provided Scrollable.
     * @param {?} scrollable
     * @param {?} elementRef
     * @return {?}
     */
    function (scrollable, elementRef) {
        /** @type {?} */
        var element = elementRef.nativeElement;
        /** @type {?} */
        var scrollableElement = scrollable.getElementRef().nativeElement;
        // Traverse through the element parents until we reach null, checking if any of the elements
        // are the scrollable's element.
        do {
            if (element == scrollableElement) {
                return true;
            }
        } while (element = element.parentElement);
    };
    /** Sends a notification that a scroll event has been fired. */
    /**
     * Sends a notification that a scroll event has been fired.
     * @return {?}
     */
    ScrollDispatcher.prototype._notify = /**
     * Sends a notification that a scroll event has been fired.
     * @return {?}
     */
    function () {
        this._scrolled.next();
    };
    ScrollDispatcher.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ScrollDispatcher.ctorParameters = function () { return [
        { type: NgZone },
        { type: Platform }
    ]; };
    return ScrollDispatcher;
}());
/**
 * @param {?} parentDispatcher
 * @param {?} ngZone
 * @param {?} platform
 * @return {?}
 */
function SCROLL_DISPATCHER_PROVIDER_FACTORY(parentDispatcher, ngZone, platform) {
    return parentDispatcher || new ScrollDispatcher(ngZone, platform);
}
/** @type {?} */
var SCROLL_DISPATCHER_PROVIDER = {
    // If there is already a ScrollDispatcher available, use that. Otherwise, provide a new one.
    provide: ScrollDispatcher,
    deps: [[new Optional(), new SkipSelf(), ScrollDispatcher], NgZone, Platform],
    useFactory: SCROLL_DISPATCHER_PROVIDER_FACTORY
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Simple utility for getting the bounds of the browser viewport.
 * \@docs-private
 */
var ViewportRuler = /** @class */ (function () {
    function ViewportRuler(scrollDispatcher) {
        var _this = this;
        // Subscribe to scroll and resize events and update the document rectangle on changes.
        scrollDispatcher.scrolled(null, function () { return _this._cacheViewportGeometry(); });
    }
    /** Gets a ClientRect for the viewport's bounds. */
    /**
     * Gets a ClientRect for the viewport's bounds.
     * @param {?=} documentRect
     * @return {?}
     */
    ViewportRuler.prototype.getViewportRect = /**
     * Gets a ClientRect for the viewport's bounds.
     * @param {?=} documentRect
     * @return {?}
     */
    function (documentRect) {
        if (documentRect === void 0) { documentRect = this._documentRect; }
        // Cache the document bounding rect so that we don't recompute it for multiple calls.
        if (!documentRect) {
            this._cacheViewportGeometry();
            documentRect = this._documentRect;
        }
        /** @type {?} */
        var scrollPosition = this.getViewportScrollPosition(documentRect);
        /** @type {?} */
        var height = window.innerHeight;
        /** @type {?} */
        var width = window.innerWidth;
        return {
            top: scrollPosition.top,
            left: scrollPosition.left,
            bottom: scrollPosition.top + height,
            right: scrollPosition.left + width,
            height: height,
            width: width,
        };
    };
    /**
     * Gets the (top, left) scroll position of the viewport.
     * @param documentRect
     */
    /**
     * Gets the (top, left) scroll position of the viewport.
     * @param {?=} documentRect
     * @return {?}
     */
    ViewportRuler.prototype.getViewportScrollPosition = /**
     * Gets the (top, left) scroll position of the viewport.
     * @param {?=} documentRect
     * @return {?}
     */
    function (documentRect) {
        if (documentRect === void 0) { documentRect = this._documentRect; }
        // Cache the document bounding rect so that we don't recompute it for multiple calls.
        if (!documentRect) {
            this._cacheViewportGeometry();
            documentRect = this._documentRect;
        }
        /** @type {?} */
        var top = -documentRect.top || document.body.scrollTop || window.scrollY ||
            document.documentElement.scrollTop || 0;
        /** @type {?} */
        var left = -documentRect.left || document.body.scrollLeft || window.scrollX ||
            document.documentElement.scrollLeft || 0;
        return { top: top, left: left };
    };
    /** Caches the latest client rectangle of the document element. */
    /**
     * Caches the latest client rectangle of the document element.
     * @return {?}
     */
    ViewportRuler.prototype._cacheViewportGeometry = /**
     * Caches the latest client rectangle of the document element.
     * @return {?}
     */
    function () {
        this._documentRect = document.documentElement.getBoundingClientRect();
    };
    ViewportRuler.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ViewportRuler.ctorParameters = function () { return [
        { type: ScrollDispatcher }
    ]; };
    return ViewportRuler;
}());
/**
 * @param {?} parentRuler
 * @param {?} scrollDispatcher
 * @return {?}
 */
function VIEWPORT_RULER_PROVIDER_FACTORY(parentRuler, scrollDispatcher) {
    return parentRuler || new ViewportRuler(scrollDispatcher);
}
/** @type {?} */
var VIEWPORT_RULER_PROVIDER = {
    // If there is already a ViewportRuler available, use that. Otherwise, provide a new one.
    provide: ViewportRuler,
    deps: [[new Optional(), new SkipSelf(), ViewportRuler], ScrollDispatcher],
    useFactory: VIEWPORT_RULER_PROVIDER_FACTORY
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Injection token that can be used to specify the global ripple options.
  @type {?} */
var MD_RIPPLE_GLOBAL_OPTIONS = new InjectionToken('md-ripple-global-options');
var MdRipple = /** @class */ (function () {
    function MdRipple(elementRef, ngZone, ruler, platform, globalOptions) {
        /**
         * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
         * will be the distance from the center of the ripple to the furthest corner of the host element's
         * bounding rectangle.
         */
        this.radius = 0;
        /**
         * If set, the normal duration of ripple animations is divided by this value. For example,
         * setting it to 0.5 will cause the animations to take twice as long.
         * A changed speedFactor will not modify the fade-out duration of the ripples.
         */
        this.speedFactor = 1;
        this._rippleRenderer = new RippleRenderer(elementRef, ngZone, ruler, platform);
        this._globalOptions = globalOptions ? globalOptions : {};
        this._updateRippleRenderer();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    MdRipple.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['trigger'] && this.trigger) {
            this._rippleRenderer.setTriggerElement(this.trigger);
        }
        this._updateRippleRenderer();
    };
    /**
     * @return {?}
     */
    MdRipple.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        // Set the trigger element to null to cleanup all listeners.
        this._rippleRenderer.setTriggerElement(null);
    };
    /** Launches a manual ripple at the specified position. */
    /**
     * Launches a manual ripple at the specified position.
     * @param {?} pageX
     * @param {?} pageY
     * @param {?=} config
     * @return {?}
     */
    MdRipple.prototype.launch = /**
     * Launches a manual ripple at the specified position.
     * @param {?} pageX
     * @param {?} pageY
     * @param {?=} config
     * @return {?}
     */
    function (pageX, pageY, config) {
        if (config === void 0) { config = this.rippleConfig; }
        return this._rippleRenderer.fadeInRipple(pageX, pageY, config);
    };
    /** Fades out all currently showing ripple elements. */
    /**
     * Fades out all currently showing ripple elements.
     * @return {?}
     */
    MdRipple.prototype.fadeOutAll = /**
     * Fades out all currently showing ripple elements.
     * @return {?}
     */
    function () {
        this._rippleRenderer.fadeOutAll();
    };
    Object.defineProperty(MdRipple.prototype, "rippleConfig", {
        /** Ripple configuration from the directive's input values. */
        get: /**
         * Ripple configuration from the directive's input values.
         * @return {?}
         */
        function () {
            return {
                centered: this.centered,
                speedFactor: this.speedFactor * (this._globalOptions.baseSpeedFactor || 1),
                radius: this.radius,
                color: this.color
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates the ripple renderer with the latest ripple configuration.
     * @return {?}
     */
    MdRipple.prototype._updateRippleRenderer = /**
     * Updates the ripple renderer with the latest ripple configuration.
     * @return {?}
     */
    function () {
        this._rippleRenderer.rippleDisabled = this._globalOptions.disabled || this.disabled;
        this._rippleRenderer.rippleConfig = this.rippleConfig;
    };
    MdRipple.decorators = [
        { type: Directive, args: [{
                    selector: '[md-ripple], [mat-ripple], [mdRipple], [matRipple]',
                    exportAs: 'mdRipple',
                    host: {
                        'class': 'mat-ripple',
                        '[class.mat-ripple-unbounded]': 'unbounded'
                    }
                },] }
    ];
    /** @nocollapse */
    MdRipple.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: ViewportRuler },
        { type: Platform },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MD_RIPPLE_GLOBAL_OPTIONS,] }] }
    ]; };
    MdRipple.propDecorators = {
        trigger: [{ type: Input, args: ['mdRippleTrigger',] }],
        centered: [{ type: Input, args: ['mdRippleCentered',] }],
        disabled: [{ type: Input, args: ['mdRippleDisabled',] }],
        radius: [{ type: Input, args: ['mdRippleRadius',] }],
        speedFactor: [{ type: Input, args: ['mdRippleSpeedFactor',] }],
        color: [{ type: Input, args: ['mdRippleColor',] }],
        unbounded: [{ type: Input, args: ['mdRippleUnbounded',] }]
    };
    return MdRipple;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Sends an event when the directive's element is scrolled. Registers itself with the
 * ScrollDispatcher service to include itself as part of its collection of scrolling events that it
 * can be listened to through the service.
 */
var Scrollable = /** @class */ (function () {
    function Scrollable(_elementRef, _scroll, _ngZone, _renderer) {
        this._elementRef = _elementRef;
        this._scroll = _scroll;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._elementScrolled = new Subject();
    }
    /**
     * @return {?}
     */
    Scrollable.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._scrollListener = this._ngZone.runOutsideAngular(function () {
            return _this._renderer.listen(_this.getElementRef().nativeElement, 'scroll', function (event) {
                _this._elementScrolled.next(event);
            });
        });
        this._scroll.register(this);
    };
    /**
     * @return {?}
     */
    Scrollable.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._scroll.deregister(this);
        if (this._scrollListener) {
            this._scrollListener();
            this._scrollListener = null;
        }
    };
    /**
     * Returns observable that emits when a scroll event is fired on the host element.
     */
    /**
     * Returns observable that emits when a scroll event is fired on the host element.
     * @return {?}
     */
    Scrollable.prototype.elementScrolled = /**
     * Returns observable that emits when a scroll event is fired on the host element.
     * @return {?}
     */
    function () {
        return this._elementScrolled.asObservable();
    };
    /**
     * @return {?}
     */
    Scrollable.prototype.getElementRef = /**
     * @return {?}
     */
    function () {
        return this._elementRef;
    };
    Scrollable.decorators = [
        { type: Directive, args: [{
                    selector: '[cdk-scrollable], [cdkScrollable]'
                },] }
    ];
    /** @nocollapse */
    Scrollable.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ScrollDispatcher },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
    return Scrollable;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Returns an error to be thrown when attempting to attach an already-attached scroll strategy.
 * @return {?}
 */
function getMdScrollStrategyAlreadyAttachedError() {
    return Error("Scroll strategy has already been attached.");
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
var  /**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
CloseScrollStrategy = /** @class */ (function () {
    function CloseScrollStrategy(_scrollDispatcher) {
        this._scrollDispatcher = _scrollDispatcher;
        this._scrollSubscription = null;
    }
    /**
     * @param {?} overlayRef
     * @return {?}
     */
    CloseScrollStrategy.prototype.attach = /**
     * @param {?} overlayRef
     * @return {?}
     */
    function (overlayRef) {
        if (this._overlayRef) {
            throw getMdScrollStrategyAlreadyAttachedError();
        }
        this._overlayRef = overlayRef;
    };
    /**
     * @return {?}
     */
    CloseScrollStrategy.prototype.enable = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this._scrollSubscription) {
            this._scrollSubscription = this._scrollDispatcher.scrolled(null, function () {
                if (_this._overlayRef.hasAttached()) {
                    _this._overlayRef.detach();
                }
                _this.disable();
            });
        }
    };
    /**
     * @return {?}
     */
    CloseScrollStrategy.prototype.disable = /**
     * @return {?}
     */
    function () {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
            this._scrollSubscription = null;
        }
    };
    return CloseScrollStrategy;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Scroll strategy that doesn't do anything.
 */
var  /**
 * Scroll strategy that doesn't do anything.
 */
NoopScrollStrategy = /** @class */ (function () {
    function NoopScrollStrategy() {
    }
    /**
     * @return {?}
     */
    NoopScrollStrategy.prototype.enable = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    NoopScrollStrategy.prototype.disable = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    NoopScrollStrategy.prototype.attach = /**
     * @return {?}
     */
    function () { };
    return NoopScrollStrategy;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
var  /**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
BlockScrollStrategy = /** @class */ (function () {
    function BlockScrollStrategy(_viewportRuler) {
        this._viewportRuler = _viewportRuler;
        this._previousHTMLStyles = { top: '', left: '' };
        this._isEnabled = false;
    }
    /**
     * @return {?}
     */
    BlockScrollStrategy.prototype.attach = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    BlockScrollStrategy.prototype.enable = /**
     * @return {?}
     */
    function () {
        if (this._canBeEnabled()) {
            /** @type {?} */
            var root = document.documentElement;
            this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition();
            // Cache the previous inline styles in case the user had set them.
            this._previousHTMLStyles.left = root.style.left;
            this._previousHTMLStyles.top = root.style.top;
            // Note: we're using the `html` node, instead of the `body`, because the `body` may
            // have the user agent margin, whereas the `html` is guaranteed not to have one.
            root.style.left = -this._previousScrollPosition.left + "px";
            root.style.top = -this._previousScrollPosition.top + "px";
            root.classList.add('cdk-global-scrollblock');
            this._isEnabled = true;
        }
    };
    /**
     * @return {?}
     */
    BlockScrollStrategy.prototype.disable = /**
     * @return {?}
     */
    function () {
        if (this._isEnabled) {
            this._isEnabled = false;
            document.documentElement.style.left = this._previousHTMLStyles.left;
            document.documentElement.style.top = this._previousHTMLStyles.top;
            document.documentElement.classList.remove('cdk-global-scrollblock');
            window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top);
        }
    };
    /**
     * @return {?}
     */
    BlockScrollStrategy.prototype._canBeEnabled = /**
     * @return {?}
     */
    function () {
        // Since the scroll strategies can't be singletons, we have to use a global CSS class
        // (`cdk-global-scrollblock`) to make sure that we don't try to disable global
        // scrolling multiple times.
        if (document.documentElement.classList.contains('cdk-global-scrollblock') || this._isEnabled) {
            return false;
        }
        /** @type {?} */
        var body = document.body;
        /** @type {?} */
        var viewport = this._viewportRuler.getViewportRect();
        return body.scrollHeight > viewport.height || body.scrollWidth > viewport.width;
    };
    return BlockScrollStrategy;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Strategy that will update the element position as the user is scrolling.
 */
var  /**
 * Strategy that will update the element position as the user is scrolling.
 */
RepositionScrollStrategy = /** @class */ (function () {
    function RepositionScrollStrategy(_scrollDispatcher, _config) {
        this._scrollDispatcher = _scrollDispatcher;
        this._config = _config;
        this._scrollSubscription = null;
    }
    /**
     * @param {?} overlayRef
     * @return {?}
     */
    RepositionScrollStrategy.prototype.attach = /**
     * @param {?} overlayRef
     * @return {?}
     */
    function (overlayRef) {
        if (this._overlayRef) {
            throw getMdScrollStrategyAlreadyAttachedError();
        }
        this._overlayRef = overlayRef;
    };
    /**
     * @return {?}
     */
    RepositionScrollStrategy.prototype.enable = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this._scrollSubscription) {
            /** @type {?} */
            var throttle = this._config ? this._config.scrollThrottle : 0;
            this._scrollSubscription = this._scrollDispatcher.scrolled(throttle, function () {
                _this._overlayRef.updatePosition();
            });
        }
    };
    /**
     * @return {?}
     */
    RepositionScrollStrategy.prototype.disable = /**
     * @return {?}
     */
    function () {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
            this._scrollSubscription = null;
        }
    };
    return RepositionScrollStrategy;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Options for how an overlay will handle scrolling.
 *
 * Users can provide a custom value for `ScrollStrategyOptions` to replace the default
 * behaviors. This class primarily acts as a factory for ScrollStrategy instances.
 */
var ScrollStrategyOptions = /** @class */ (function () {
    function ScrollStrategyOptions(_scrollDispatcher, _viewportRuler) {
        var _this = this;
        this._scrollDispatcher = _scrollDispatcher;
        this._viewportRuler = _viewportRuler;
        /**
         * Do nothing on scroll.
         */
        this.noop = function () { return new NoopScrollStrategy(); };
        /**
         * Close the overlay as soon as the user scrolls.
         */
        this.close = function () { return new CloseScrollStrategy(_this._scrollDispatcher); };
        /**
         * Block scrolling.
         */
        this.block = function () { return new BlockScrollStrategy(_this._viewportRuler); };
        /**
         * Update the overlay's position on scroll.
         * @param config Configuration to be used inside the scroll strategy.
         * Allows debouncing the reposition calls.
         */
        this.reposition = function (config) {
            return new RepositionScrollStrategy(_this._scrollDispatcher, config);
        };
    }
    ScrollStrategyOptions.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ScrollStrategyOptions.ctorParameters = function () { return [
        { type: ScrollDispatcher },
        { type: ViewportRuler }
    ]; };
    return ScrollStrategyOptions;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ScrollDispatchModule = /** @class */ (function () {
    function ScrollDispatchModule() {
    }
    ScrollDispatchModule.decorators = [
        { type: NgModule, args: [{
                    imports: [PlatformModule],
                    exports: [Scrollable],
                    declarations: [Scrollable],
                    providers: [SCROLL_DISPATCHER_PROVIDER, ScrollStrategyOptions],
                },] }
    ];
    return ScrollDispatchModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MdRippleModule = /** @class */ (function () {
    function MdRippleModule() {
    }
    MdRippleModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MdCommonModule, PlatformModule, ScrollDispatchModule],
                    exports: [MdRipple, MdCommonModule],
                    declarations: [MdRipple],
                    providers: [VIEWPORT_RULER_PROVIDER],
                },] }
    ];
    return MdRippleModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Mixin to augment a directive with a `color` property.
 * @template T
 * @param {?} base
 * @param {?=} defaultColor
 * @return {?}
 */
function mixinColor(base, defaultColor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spread(args)) || this;
            _this._color = null;
            // Set the default color that can be specified from the mixin.
            // Set the default color that can be specified from the mixin.
            _this.color = defaultColor;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "color", {
            get: /**
             * @return {?}
             */
            function () { return this._color; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var colorPalette = value || defaultColor;
                if (colorPalette !== this._color) {
                    if (this._color) {
                        this._renderer.removeClass(this._elementRef.nativeElement, "mat-" + this._color);
                    }
                    if (colorPalette) {
                        this._renderer.addClass(this._elementRef.nativeElement, "mat-" + colorPalette);
                    }
                    this._color = colorPalette;
                }
            },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }(base));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MdPseudoCheckboxBase = /** @class */ (function () {
    function MdPseudoCheckboxBase(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
    }
    return MdPseudoCheckboxBase;
}());
/** @type {?} */
var _MdPseudoCheckboxBase = mixinColor(MdPseudoCheckboxBase, 'accent');
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
    __extends(MdPseudoCheckbox, _super);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MdSelectionModule = /** @class */ (function () {
    function MdSelectionModule() {
    }
    MdSelectionModule.decorators = [
        { type: NgModule, args: [{
                    exports: [MdPseudoCheckbox],
                    declarations: [MdPseudoCheckbox]
                },] }
    ];
    return MdSelectionModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// Due to a bug in the ChromeDriver, Angular keyboard events are not triggered by `sendKeys`
// during E2E tests when using dot notation such as `(keydown.rightArrow)`. To get around this,
// we are temporarily using a single (keydown) handler.
// See: https://github.com/angular/angular/issues/9419
/** @type {?} */
var UP_ARROW = 38;
/** @type {?} */
var DOWN_ARROW = 40;
/** @type {?} */
var RIGHT_ARROW = 39;
/** @type {?} */
var LEFT_ARROW = 37;
/** @type {?} */
var PAGE_UP = 33;
/** @type {?} */
var PAGE_DOWN = 34;
/** @type {?} */
var HOME = 36;
/** @type {?} */
var END = 35;
/** @type {?} */
var ENTER = 13;
/** @type {?} */
var SPACE = 32;
/** @type {?} */
var TAB = 9;
/** @type {?} */
var ESCAPE = 27;
/** @type {?} */
var BACKSPACE = 8;
/** @type {?} */
var DELETE = 46;
/** @type {?} */
var COMMA = 188;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Coerces a data-bound value (typically a string) to a boolean.
 * @param {?} value
 * @return {?}
 */
function coerceBooleanProperty(value) {
    return value != null && "" + value !== 'false';
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Mixin to augment a directive with a `disabled` property.
 * @template T
 * @param {?} base
 * @return {?}
 */
function mixinDisabled(base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spread(args)) || this;
            _this._disabled = false;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () { return this._disabled; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._disabled = coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }(base));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MdOptgroupBase = /** @class */ (function () {
    function MdOptgroupBase() {
    }
    return MdOptgroupBase;
}());
/** @type {?} */
var _MdOptgroupMixinBase = mixinDisabled(MdOptgroupBase);
/** @type {?} */
var _uniqueOptgroupIdCounter = 0;
/**
 * Component that is used to group instances of `md-option`.
 */
var MdOptgroup = /** @class */ (function (_super) {
    __extends(MdOptgroup, _super);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
  @type {?} */
var _uniqueIdCounter = 0;
/**
 * Event object emitted by MdOption when selected or deselected.
 */
var  /**
 * Event object emitted by MdOption when selected or deselected.
 */
MdOptionSelectionChange = /** @class */ (function () {
    function MdOptionSelectionChange(source, isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.source = source;
        this.isUserInput = isUserInput;
    }
    return MdOptionSelectionChange;
}());
/**
 * Single option inside of a `<md-select>` element.
 */
var MdOption = /** @class */ (function () {
    function MdOption(_element, group, _isCompatibilityMode) {
        this._element = _element;
        this.group = group;
        this._isCompatibilityMode = _isCompatibilityMode;
        this._selected = false;
        this._active = false;
        /**
         * Whether the option is disabled.
         */
        this._disabled = false;
        this._id = "md-option-" + _uniqueIdCounter++;
        /**
         * Whether the wrapping component is in multiple selection mode.
         */
        this.multiple = false;
        /**
         * Event emitted when the option is selected or deselected.
         */
        this.onSelectionChange = new EventEmitter();
    }
    Object.defineProperty(MdOption.prototype, "id", {
        /** The unique ID of the option. */
        get: /**
         * The unique ID of the option.
         * @return {?}
         */
        function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "selected", {
        /** Whether or not the option is currently selected. */
        get: /**
         * Whether or not the option is currently selected.
         * @return {?}
         */
        function () { return this._selected; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "disabled", {
        /** Whether the option is disabled. */
        get: /**
         * Whether the option is disabled.
         * @return {?}
         */
        function () { return (this.group && this.group.disabled) || this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "active", {
        /**
         * Whether or not the option is currently active and ready to be selected.
         * An active option displays styles as if it is focused, but the
         * focus is actually retained somewhere else. This comes in handy
         * for components like autocomplete where focus must remain on the input.
         */
        get: /**
         * Whether or not the option is currently active and ready to be selected.
         * An active option displays styles as if it is focused, but the
         * focus is actually retained somewhere else. This comes in handy
         * for components like autocomplete where focus must remain on the input.
         * @return {?}
         */
        function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "viewValue", {
        /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
         */
        get: /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
         * @return {?}
         */
        function () {
            // TODO(kara): Add input property alternative for node envs.
            return this._getHostElement().textContent.trim();
        },
        enumerable: true,
        configurable: true
    });
    /** Selects the option. */
    /**
     * Selects the option.
     * @return {?}
     */
    MdOption.prototype.select = /**
     * Selects the option.
     * @return {?}
     */
    function () {
        this._selected = true;
        this._emitSelectionChangeEvent();
    };
    /** Deselects the option. */
    /**
     * Deselects the option.
     * @return {?}
     */
    MdOption.prototype.deselect = /**
     * Deselects the option.
     * @return {?}
     */
    function () {
        this._selected = false;
        this._emitSelectionChangeEvent();
    };
    /** Sets focus onto this option. */
    /**
     * Sets focus onto this option.
     * @return {?}
     */
    MdOption.prototype.focus = /**
     * Sets focus onto this option.
     * @return {?}
     */
    function () {
        this._getHostElement().focus();
    };
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    MdOption.prototype.setActiveStyles = /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    function () {
        this._active = true;
    };
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    MdOption.prototype.setInactiveStyles = /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    function () {
        this._active = false;
    };
    /** Ensures the option is selected when activated from the keyboard. */
    /**
     * Ensures the option is selected when activated from the keyboard.
     * @param {?} event
     * @return {?}
     */
    MdOption.prototype._handleKeydown = /**
     * Ensures the option is selected when activated from the keyboard.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this._selectViaInteraction();
        }
    };
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     */
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     * @return {?}
     */
    MdOption.prototype._selectViaInteraction = /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this._emitSelectionChangeEvent(true);
        }
    };
    /** Returns the correct tabindex for the option depending on disabled state. */
    /**
     * Returns the correct tabindex for the option depending on disabled state.
     * @return {?}
     */
    MdOption.prototype._getTabIndex = /**
     * Returns the correct tabindex for the option depending on disabled state.
     * @return {?}
     */
    function () {
        return this.disabled ? '-1' : '0';
    };
    /** Fetches the host DOM element. */
    /**
     * Fetches the host DOM element.
     * @return {?}
     */
    MdOption.prototype._getHostElement = /**
     * Fetches the host DOM element.
     * @return {?}
     */
    function () {
        return this._element.nativeElement;
    };
    /**
     * Emits the selection change event.
     * @param {?=} isUserInput
     * @return {?}
     */
    MdOption.prototype._emitSelectionChangeEvent = /**
     * Emits the selection change event.
     * @param {?=} isUserInput
     * @return {?}
     */
    function (isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.onSelectionChange.emit(new MdOptionSelectionChange(this, isUserInput));
    };
    MdOption.decorators = [
        { type: Component, args: [{
                    selector: 'md-option, mat-option',
                    host: {
                        'role': 'option',
                        '[attr.tabindex]': '_getTabIndex()',
                        '[class.mat-selected]': 'selected',
                        '[class.mat-option-multiple]': 'multiple',
                        '[class.mat-active]': 'active',
                        '[id]': 'id',
                        '[attr.aria-selected]': 'selected.toString()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[class.mat-option-disabled]': 'disabled',
                        '(click)': '_selectViaInteraction()',
                        '(keydown)': '_handleKeydown($event)',
                        '[class.mat-option]': 'true',
                    },
                    template: "<span [ngSwitch]=\"_isCompatibilityMode\" *ngIf=\"multiple\">\n  <mat-pseudo-checkbox class=\"mat-option-pseudo-checkbox\" *ngSwitchCase=\"true\"\n      [state]=\"selected ? 'checked' : ''\" color=\"primary\"></mat-pseudo-checkbox>\n  <md-pseudo-checkbox class=\"mat-option-pseudo-checkbox\" *ngSwitchDefault\n      [state]=\"selected ? 'checked' : ''\" color=\"primary\"></md-pseudo-checkbox>\n</span>\n\n<ng-content></ng-content>\n<div class=\"mat-option-ripple\" *ngIf=\"!disabled\" md-ripple [mdRippleTrigger]=\"_getHostElement()\">\n</div>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    MdOption.ctorParameters = function () { return [
        { type: ElementRef },
        { type: MdOptgroup, decorators: [{ type: Optional }] },
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [MATERIAL_COMPATIBILITY_MODE,] }] }
    ]; };
    MdOption.propDecorators = {
        value: [{ type: Input }],
        disabled: [{ type: Input }],
        onSelectionChange: [{ type: Output }]
    };
    return MdOption;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MdOptionModule = /** @class */ (function () {
    function MdOptionModule() {
    }
    MdOptionModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MdRippleModule, CommonModule, MdSelectionModule],
                    exports: [MdOption, MdOptgroup],
                    declarations: [MdOption, MdOptgroup]
                },] }
    ];
    return MdOptionModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Throws an exception when attempting to attach a null portal to a host.
 * \@docs-private
 * @return {?}
 */
function throwNullPortalError() {
    throw Error('Must provide a portal to attach');
}
/**
 * Throws an exception when attempting to attach a portal to a host that is already attached.
 * \@docs-private
 * @return {?}
 */
function throwPortalAlreadyAttachedError() {
    throw Error('Host already has a portal attached');
}
/**
 * Throws an exception when attempting to attach a portal to an already-disposed host.
 * \@docs-private
 * @return {?}
 */
function throwPortalHostAlreadyDisposedError() {
    throw Error('This PortalHost has already been disposed');
}
/**
 * Throws an exception when attempting to attach an unknown portal type.
 * \@docs-private
 * @return {?}
 */
function throwUnknownPortalTypeError() {
    throw Error('Attempting to attach an unknown Portal type. BasePortalHost accepts either' +
        'a ComponentPortal or a TemplatePortal.');
}
/**
 * Throws an exception when attempting to attach a portal to a null host.
 * \@docs-private
 * @return {?}
 */
function throwNullPortalHostError() {
    throw Error('Attempting to attach a portal to a null PortalHost');
}
/**
 * Throws an exception when attempting to detach a portal that is not attached.
 * \@docs-privatew
 * @return {?}
 */
function throwNoPortalAttachedError() {
    throw Error('Attempting to detach a portal that is not attached to a host');
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalHost`.
 * @abstract
 * @template T
 */
var  /**
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
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 * @template T
 */
var  /**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 * @template T
 */
ComponentPortal = /** @class */ (function (_super) {
    __extends(ComponentPortal, _super);
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
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
var  /**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
TemplatePortal = /** @class */ (function (_super) {
    __extends(TemplatePortal, _super);
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
 * Partial implementation of PortalHost that only deals with attaching either a
 * ComponentPortal or a TemplatePortal.
 * @abstract
 */
var  /**
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
    __extends(TemplatePortalDirective, _super);
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
/**
 * Directive version of a PortalHost. Because the directive *is* a PortalHost, portals can be
 * directly attached to it, enabling declarative use.
 *
 * Usage:
 * <ng-template [cdkPortalHost]="greeting"></ng-template>
 */
var PortalHostDirective = /** @class */ (function (_super) {
    __extends(PortalHostDirective, _super);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * OverlayState is a bag of values for either the initial configuration or current state of an
 * overlay.
 */
var  /**
 * OverlayState is a bag of values for either the initial configuration or current state of an
 * overlay.
 */
OverlayState = /** @class */ (function () {
    function OverlayState() {
        /**
         * Custom class to add to the overlay pane.
         */
        this.panelClass = '';
        /**
         * Whether the overlay has a backdrop.
         */
        this.hasBackdrop = false;
        /**
         * Custom class to add to the backdrop
         */
        this.backdropClass = 'cdk-overlay-dark-backdrop';
        /**
         * The direction of the text in the overlay panel.
         */
        this.direction = 'ltr';
    }
    return OverlayState;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 *
 * This is the only part of the portal core that directly touches the DOM.
 */
var  /**
 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 *
 * This is the only part of the portal core that directly touches the DOM.
 */
DomPortalHost = /** @class */ (function (_super) {
    __extends(DomPortalHost, _super);
    function DomPortalHost(_hostDomElement, _componentFactoryResolver, _appRef, _defaultInjector) {
        var _this = _super.call(this) || this;
        _this._hostDomElement = _hostDomElement;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._appRef = _appRef;
        _this._defaultInjector = _defaultInjector;
        return _this;
    }
    /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @param portal Portal to be attached
     */
    /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @template T
     * @param {?} portal Portal to be attached
     * @return {?}
     */
    DomPortalHost.prototype.attachComponentPortal = /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @template T
     * @param {?} portal Portal to be attached
     * @return {?}
     */
    function (portal) {
        var _this = this;
        /** @type {?} */
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        /** @type {?} */
        var componentRef;
        // If the portal specifies a ViewContainerRef, we will use that as the attachment point
        // for the component (in terms of Angular's component tree, not rendering).
        // When the ViewContainerRef is missing, we use the factory to create the component directly
        // and then manually attach the view to the application.
        if (portal.viewContainerRef) {
            componentRef = portal.viewContainerRef.createComponent(componentFactory, portal.viewContainerRef.length, portal.injector || portal.viewContainerRef.parentInjector);
            this.setDisposeFn(function () { return componentRef.destroy(); });
        }
        else {
            componentRef = componentFactory.create(portal.injector || this._defaultInjector);
            this._appRef.attachView(componentRef.hostView);
            this.setDisposeFn(function () {
                _this._appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            });
        }
        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));
        return componentRef;
    };
    /**
     * Attaches a template portal to the DOM as an embedded view.
     * @param portal Portal to be attached.
     */
    /**
     * Attaches a template portal to the DOM as an embedded view.
     * @param {?} portal Portal to be attached.
     * @return {?}
     */
    DomPortalHost.prototype.attachTemplatePortal = /**
     * Attaches a template portal to the DOM as an embedded view.
     * @param {?} portal Portal to be attached.
     * @return {?}
     */
    function (portal) {
        var _this = this;
        /** @type {?} */
        var viewContainer = portal.viewContainerRef;
        /** @type {?} */
        var viewRef = viewContainer.createEmbeddedView(portal.templateRef);
        viewRef.detectChanges();
        // The method `createEmbeddedView` will add the view as a child of the viewContainer.
        // But for the DomPortalHost the view can be added everywhere in the DOM (e.g Overlay Container)
        // To move the view to the specified host element. We just re-append the existing root nodes.
        viewRef.rootNodes.forEach(function (rootNode) { return _this._hostDomElement.appendChild(rootNode); });
        this.setDisposeFn((function () {
            /** @type {?} */
            var index = viewContainer.indexOf(viewRef);
            if (index !== -1) {
                viewContainer.remove(index);
            }
        }));
        // TODO(jelbourn): Return locals from view.
        return new Map();
    };
    /**
     * Clears out a portal from the DOM.
     */
    /**
     * Clears out a portal from the DOM.
     * @return {?}
     */
    DomPortalHost.prototype.dispose = /**
     * Clears out a portal from the DOM.
     * @return {?}
     */
    function () {
        _super.prototype.dispose.call(this);
        if (this._hostDomElement.parentNode != null) {
            this._hostDomElement.parentNode.removeChild(this._hostDomElement);
        }
    };
    /**
     * Gets the root HTMLElement for an instantiated component.
     * @param {?} componentRef
     * @return {?}
     */
    DomPortalHost.prototype._getComponentRootNode = /**
     * Gets the root HTMLElement for an instantiated component.
     * @param {?} componentRef
     * @return {?}
     */
    function (componentRef) {
        return /** @type {?} */ ((/** @type {?} */ (componentRef.hostView)).rootNodes[0]);
    };
    return DomPortalHost;
}(BasePortalHost));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
var  /**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
OverlayRef = /** @class */ (function () {
    function OverlayRef(_portalHost, _pane, _state, _scrollStrategy, _ngZone) {
        this._portalHost = _portalHost;
        this._pane = _pane;
        this._state = _state;
        this._scrollStrategy = _scrollStrategy;
        this._ngZone = _ngZone;
        this._backdropElement = null;
        this._backdropClick = new Subject();
        this._attachments = new Subject();
        this._detachments = new Subject();
        _scrollStrategy.attach(this);
    }
    Object.defineProperty(OverlayRef.prototype, "overlayElement", {
        /** The overlay's HTML element */
        get: /**
         * The overlay's HTML element
         * @return {?}
         */
        function () {
            return this._pane;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Attaches the overlay to a portal instance and adds the backdrop.
     * @param portal Portal instance to which to attach the overlay.
     * @returns The portal attachment result.
     */
    /**
     * Attaches the overlay to a portal instance and adds the backdrop.
     * @param {?} portal Portal instance to which to attach the overlay.
     * @return {?} The portal attachment result.
     */
    OverlayRef.prototype.attach = /**
     * Attaches the overlay to a portal instance and adds the backdrop.
     * @param {?} portal Portal instance to which to attach the overlay.
     * @return {?} The portal attachment result.
     */
    function (portal) {
        /** @type {?} */
        var attachResult = this._portalHost.attach(portal);
        // Update the pane element with the given state configuration.
        this._updateStackingOrder();
        this.updateSize();
        this.updateDirection();
        this.updatePosition();
        this._scrollStrategy.enable();
        // Enable pointer events for the overlay pane element.
        this._togglePointerEvents(true);
        if (this._state.hasBackdrop) {
            this._attachBackdrop();
        }
        if (this._state.panelClass) {
            this._pane.classList.add(this._state.panelClass);
        }
        // Only emit the `attachments` event once all other setup is done.
        this._attachments.next();
        return attachResult;
    };
    /**
     * Detaches an overlay from a portal.
     * @returns Resolves when the overlay has been detached.
     */
    /**
     * Detaches an overlay from a portal.
     * @return {?} Resolves when the overlay has been detached.
     */
    OverlayRef.prototype.detach = /**
     * Detaches an overlay from a portal.
     * @return {?} Resolves when the overlay has been detached.
     */
    function () {
        this.detachBackdrop();
        // When the overlay is detached, the pane element should disable pointer events.
        // This is necessary because otherwise the pane element will cover the page and disable
        // pointer events therefore. Depends on the position strategy and the applied pane boundaries.
        this._togglePointerEvents(false);
        this._scrollStrategy.disable();
        /** @type {?} */
        var detachmentResult = this._portalHost.detach();
        // Only emit after everything is detached.
        this._detachments.next();
        return detachmentResult;
    };
    /**
     * Cleans up the overlay from the DOM.
     */
    /**
     * Cleans up the overlay from the DOM.
     * @return {?}
     */
    OverlayRef.prototype.dispose = /**
     * Cleans up the overlay from the DOM.
     * @return {?}
     */
    function () {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.dispose();
        }
        if (this._scrollStrategy) {
            this._scrollStrategy.disable();
            this._scrollStrategy = null;
        }
        this.detachBackdrop();
        this._portalHost.dispose();
        this._attachments.complete();
        this._backdropClick.complete();
        this._detachments.next();
        this._detachments.complete();
    };
    /**
     * Checks whether the overlay has been attached.
     */
    /**
     * Checks whether the overlay has been attached.
     * @return {?}
     */
    OverlayRef.prototype.hasAttached = /**
     * Checks whether the overlay has been attached.
     * @return {?}
     */
    function () {
        return this._portalHost.hasAttached();
    };
    /**
     * Returns an observable that emits when the backdrop has been clicked.
     */
    /**
     * Returns an observable that emits when the backdrop has been clicked.
     * @return {?}
     */
    OverlayRef.prototype.backdropClick = /**
     * Returns an observable that emits when the backdrop has been clicked.
     * @return {?}
     */
    function () {
        return this._backdropClick.asObservable();
    };
    /** Returns an observable that emits when the overlay has been attached. */
    /**
     * Returns an observable that emits when the overlay has been attached.
     * @return {?}
     */
    OverlayRef.prototype.attachments = /**
     * Returns an observable that emits when the overlay has been attached.
     * @return {?}
     */
    function () {
        return this._attachments.asObservable();
    };
    /** Returns an observable that emits when the overlay has been detached. */
    /**
     * Returns an observable that emits when the overlay has been detached.
     * @return {?}
     */
    OverlayRef.prototype.detachments = /**
     * Returns an observable that emits when the overlay has been detached.
     * @return {?}
     */
    function () {
        return this._detachments.asObservable();
    };
    /**
     * Gets the current state config of the overlay.
     */
    /**
     * Gets the current state config of the overlay.
     * @return {?}
     */
    OverlayRef.prototype.getState = /**
     * Gets the current state config of the overlay.
     * @return {?}
     */
    function () {
        return this._state;
    };
    /** Updates the position of the overlay based on the position strategy. */
    /**
     * Updates the position of the overlay based on the position strategy.
     * @return {?}
     */
    OverlayRef.prototype.updatePosition = /**
     * Updates the position of the overlay based on the position strategy.
     * @return {?}
     */
    function () {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.apply(this._pane);
        }
    };
    /**
     * Updates the text direction of the overlay panel.
     * @return {?}
     */
    OverlayRef.prototype.updateDirection = /**
     * Updates the text direction of the overlay panel.
     * @return {?}
     */
    function () {
        this._pane.setAttribute('dir', this._state.direction);
    };
    /** Updates the size of the overlay based on the overlay config. */
    /**
     * Updates the size of the overlay based on the overlay config.
     * @return {?}
     */
    OverlayRef.prototype.updateSize = /**
     * Updates the size of the overlay based on the overlay config.
     * @return {?}
     */
    function () {
        if (this._state.width || this._state.width === 0) {
            this._pane.style.width = formatCssUnit(this._state.width);
        }
        if (this._state.height || this._state.height === 0) {
            this._pane.style.height = formatCssUnit(this._state.height);
        }
        if (this._state.minWidth || this._state.minWidth === 0) {
            this._pane.style.minWidth = formatCssUnit(this._state.minWidth);
        }
        if (this._state.minHeight || this._state.minHeight === 0) {
            this._pane.style.minHeight = formatCssUnit(this._state.minHeight);
        }
    };
    /**
     * Toggles the pointer events for the overlay pane element.
     * @param {?} enablePointer
     * @return {?}
     */
    OverlayRef.prototype._togglePointerEvents = /**
     * Toggles the pointer events for the overlay pane element.
     * @param {?} enablePointer
     * @return {?}
     */
    function (enablePointer) {
        this._pane.style.pointerEvents = enablePointer ? 'auto' : 'none';
    };
    /**
     * Attaches a backdrop for this overlay.
     * @return {?}
     */
    OverlayRef.prototype._attachBackdrop = /**
     * Attaches a backdrop for this overlay.
     * @return {?}
     */
    function () {
        var _this = this;
        this._backdropElement = document.createElement('div');
        this._backdropElement.classList.add('cdk-overlay-backdrop');
        this._backdropElement.classList.add(this._state.backdropClass);
        // Insert the backdrop before the pane in the DOM order,
        // in order to handle stacked overlays properly.
        this._pane.parentElement.insertBefore(this._backdropElement, this._pane);
        // Forward backdrop clicks such that the consumer of the overlay can perform whatever
        // action desired when such a click occurs (usually closing the overlay).
        this._backdropElement.addEventListener('click', function () { return _this._backdropClick.next(null); });
        // Add class to fade-in the backdrop after one frame.
        requestAnimationFrame(function () {
            if (_this._backdropElement) {
                _this._backdropElement.classList.add('cdk-overlay-backdrop-showing');
            }
        });
    };
    /**
     * Updates the stacking order of the element, moving it to the top if necessary.
     * This is required in cases where one overlay was detached, while another one,
     * that should be behind it, was destroyed. The next time both of them are opened,
     * the stacking will be wrong, because the detached element's pane will still be
     * in its original DOM position.
     * @return {?}
     */
    OverlayRef.prototype._updateStackingOrder = /**
     * Updates the stacking order of the element, moving it to the top if necessary.
     * This is required in cases where one overlay was detached, while another one,
     * that should be behind it, was destroyed. The next time both of them are opened,
     * the stacking will be wrong, because the detached element's pane will still be
     * in its original DOM position.
     * @return {?}
     */
    function () {
        if (this._pane.nextSibling) {
            this._pane.parentNode.appendChild(this._pane);
        }
    };
    /** Detaches the backdrop (if any) associated with the overlay. */
    /**
     * Detaches the backdrop (if any) associated with the overlay.
     * @return {?}
     */
    OverlayRef.prototype.detachBackdrop = /**
     * Detaches the backdrop (if any) associated with the overlay.
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var backdropToDetach = this._backdropElement;
        if (backdropToDetach) {
            /** @type {?} */
            var finishDetach_1 = function () {
                // It may not be attached to anything in certain cases (e.g. unit tests).
                if (backdropToDetach && backdropToDetach.parentNode) {
                    backdropToDetach.parentNode.removeChild(backdropToDetach);
                }
                // It is possible that a new portal has been attached to this overlay since we started
                // removing the backdrop. If that is the case, only clear the backdrop reference if it
                // is still the same instance that we started to remove.
                if (_this._backdropElement == backdropToDetach) {
                    _this._backdropElement = null;
                }
            };
            backdropToDetach.classList.remove('cdk-overlay-backdrop-showing');
            backdropToDetach.classList.remove(this._state.backdropClass);
            backdropToDetach.addEventListener('transitionend', finishDetach_1);
            // If the backdrop doesn't have a transition, the `transitionend` event won't fire.
            // In this case we make it unclickable and we try to remove it after a delay.
            backdropToDetach.style.pointerEvents = 'none';
            // Run this outside the Angular zone because there's nothing that Angular cares about.
            // If it were to run inside the Angular zone, every test that used Overlay would have to be
            // either async or fakeAsync.
            this._ngZone.runOutsideAngular(function () {
                setTimeout(finishDetach_1, 500);
            });
        }
    };
    return OverlayRef;
}());
/**
 * @param {?} value
 * @return {?}
 */
function formatCssUnit(value) {
    return typeof value === 'string' ? /** @type {?} */ (value) : value + "px";
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * The points of the origin element and the overlay element to connect.
 */
var  /**
 * The points of the origin element and the overlay element to connect.
 */
ConnectionPositionPair = /** @class */ (function () {
    function ConnectionPositionPair(origin, overlay) {
        this.originX = origin.originX;
        this.originY = origin.originY;
        this.overlayX = overlay.overlayX;
        this.overlayY = overlay.overlayY;
    }
    return ConnectionPositionPair;
}());
/**
 * Set of properties regarding the position of the origin and overlay relative to the viewport
 * with respect to the containing Scrollable elements.
 *
 * The overlay and origin are clipped if any part of their bounding client rectangle exceeds the
 * bounds of any one of the strategy's Scrollable's bounding client rectangle.
 *
 * The overlay and origin are outside view if there is no overlap between their bounding client
 * rectangle and any one of the strategy's Scrollable's bounding client rectangle.
 *
 *       -----------                    -----------
 *       | outside |                    | clipped |
 *       |  view   |              --------------------------
 *       |         |              |     |         |        |
 *       ----------               |     -----------        |
 *  --------------------------    |                        |
 *  |                        |    |      Scrollable        |
 *  |                        |    |                        |
 *  |                        |     --------------------------
 *  |      Scrollable        |
 *  |                        |
 *  --------------------------
 */
var  /**
 * Set of properties regarding the position of the origin and overlay relative to the viewport
 * with respect to the containing Scrollable elements.
 *
 * The overlay and origin are clipped if any part of their bounding client rectangle exceeds the
 * bounds of any one of the strategy's Scrollable's bounding client rectangle.
 *
 * The overlay and origin are outside view if there is no overlap between their bounding client
 * rectangle and any one of the strategy's Scrollable's bounding client rectangle.
 *
 *       -----------                    -----------
 *       | outside |                    | clipped |
 *       |  view   |              --------------------------
 *       |         |              |     |         |        |
 *       ----------               |     -----------        |
 *  --------------------------    |                        |
 *  |                        |    |      Scrollable        |
 *  |                        |    |                        |
 *  |                        |     --------------------------
 *  |      Scrollable        |
 *  |                        |
 *  --------------------------
 */
ScrollableViewProperties = /** @class */ (function () {
    function ScrollableViewProperties() {
    }
    return ScrollableViewProperties;
}());
/**
 * The change event emitted by the strategy when a fallback position is used.
 */
var ConnectedOverlayPositionChange = /** @class */ (function () {
    function ConnectedOverlayPositionChange(connectionPair, scrollableViewProperties) {
        this.connectionPair = connectionPair;
        this.scrollableViewProperties = scrollableViewProperties;
    }
    /** @nocollapse */
    ConnectedOverlayPositionChange.ctorParameters = function () { return [
        { type: ConnectionPositionPair },
        { type: ScrollableViewProperties, decorators: [{ type: Optional }] }
    ]; };
    return ConnectedOverlayPositionChange;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
var  /**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
ConnectedPositionStrategy = /** @class */ (function () {
    function ConnectedPositionStrategy(_connectedTo, _originPos, _overlayPos, _viewportRuler) {
        this._connectedTo = _connectedTo;
        this._originPos = _originPos;
        this._overlayPos = _overlayPos;
        this._viewportRuler = _viewportRuler;
        this._dir = 'ltr';
        /**
         * The offset in pixels for the overlay connection point on the x-axis
         */
        this._offsetX = 0;
        /**
         * The offset in pixels for the overlay connection point on the y-axis
         */
        this._offsetY = 0;
        /**
         * The Scrollable containers used to check scrollable view properties on position change.
         */
        this.scrollables = [];
        /**
         * Ordered list of preferred positions, from most to least desirable.
         */
        this._preferredPositions = [];
        this._onPositionChange = new Subject();
        this._origin = this._connectedTo.nativeElement;
        this.withFallbackPosition(_originPos, _overlayPos);
    }
    Object.defineProperty(ConnectedPositionStrategy.prototype, "_isRtl", {
        /** Whether the we're dealing with an RTL context */
        get: /**
         * Whether the we're dealing with an RTL context
         * @return {?}
         */
        function () {
            return this._dir === 'rtl';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedPositionStrategy.prototype, "onPositionChange", {
        /** Emits an event when the connection point changes. */
        get: /**
         * Emits an event when the connection point changes.
         * @return {?}
         */
        function () {
            return this._onPositionChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedPositionStrategy.prototype, "positions", {
        /** Ordered list of preferred positions, from most to least desirable. */
        get: /**
         * Ordered list of preferred positions, from most to least desirable.
         * @return {?}
         */
        function () {
            return this._preferredPositions;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * To be used to for any cleanup after the element gets destroyed.
     */
    /**
     * To be used to for any cleanup after the element gets destroyed.
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.dispose = /**
     * To be used to for any cleanup after the element gets destroyed.
     * @return {?}
     */
    function () { };
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin fits on-screen.
     * @docs-private
     *
     * @param element Element to which to apply the CSS styles.
     * @returns Resolves when the styles have been applied.
     */
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin fits on-screen.
     * \@docs-private
     *
     * @param {?} element Element to which to apply the CSS styles.
     * @return {?} Resolves when the styles have been applied.
     */
    ConnectedPositionStrategy.prototype.apply = /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin fits on-screen.
     * \@docs-private
     *
     * @param {?} element Element to which to apply the CSS styles.
     * @return {?} Resolves when the styles have been applied.
     */
    function (element) {
        var e_1, _a;
        // Cache the overlay pane element in case re-calculating position is necessary
        this._pane = element;
        /** @type {?} */
        var originRect = this._origin.getBoundingClientRect();
        /** @type {?} */
        var overlayRect = element.getBoundingClientRect();
        /** @type {?} */
        var viewportRect = this._viewportRuler.getViewportRect();
        /** @type {?} */
        var fallbackPoint = null;
        /** @type {?} */
        var fallbackPosition = null;
        try {
            // We want to place the overlay in the first of the preferred positions such that the
            // overlay fits on-screen.
            for (var _b = __values(this._preferredPositions), _c = _b.next(); !_c.done; _c = _b.next()) {
                var pos = _c.value;
                /** @type {?} */
                var originPoint = this._getOriginConnectionPoint(originRect, pos);
                /** @type {?} */
                var overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportRect, pos);
                // If the overlay in the calculated position fits on-screen, put it there and we're done.
                if (overlayPoint.fitsInViewport) {
                    this._setElementPosition(element, overlayRect, overlayPoint, pos);
                    // Save the last connected position in case the position needs to be re-calculated.
                    this._lastConnectedPosition = pos;
                    /** @type {?} */
                    var scrollableViewProperties = this.getScrollableViewProperties(element);
                    /** @type {?} */
                    var positionChange = new ConnectedOverlayPositionChange(pos, scrollableViewProperties);
                    this._onPositionChange.next(positionChange);
                    return Promise.resolve(null);
                }
                else if (!fallbackPoint || fallbackPoint.visibleArea < overlayPoint.visibleArea) {
                    fallbackPoint = overlayPoint;
                    fallbackPosition = pos;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // If none of the preferred positions were in the viewport, take the one
        // with the largest visible area.
        this._setElementPosition(element, overlayRect, fallbackPoint, fallbackPosition);
        return Promise.resolve(null);
    };
    /**
     * This re-aligns the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     */
    /**
     * This re-aligns the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.recalculateLastPosition = /**
     * This re-aligns the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var originRect = this._origin.getBoundingClientRect();
        /** @type {?} */
        var overlayRect = this._pane.getBoundingClientRect();
        /** @type {?} */
        var viewportRect = this._viewportRuler.getViewportRect();
        /** @type {?} */
        var lastPosition = this._lastConnectedPosition || this._preferredPositions[0];
        /** @type {?} */
        var originPoint = this._getOriginConnectionPoint(originRect, lastPosition);
        /** @type {?} */
        var overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportRect, lastPosition);
        this._setElementPosition(this._pane, overlayRect, overlayPoint, lastPosition);
    };
    /**
     * Sets the list of Scrollable containers that host the origin element so that
     * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
     * Scrollable must be an ancestor element of the strategy's origin element.
     */
    /**
     * Sets the list of Scrollable containers that host the origin element so that
     * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
     * Scrollable must be an ancestor element of the strategy's origin element.
     * @param {?} scrollables
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.withScrollableContainers = /**
     * Sets the list of Scrollable containers that host the origin element so that
     * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
     * Scrollable must be an ancestor element of the strategy's origin element.
     * @param {?} scrollables
     * @return {?}
     */
    function (scrollables) {
        this.scrollables = scrollables;
    };
    /**
     * Adds a new preferred fallback position.
     * @param originPos
     * @param overlayPos
     */
    /**
     * Adds a new preferred fallback position.
     * @param {?} originPos
     * @param {?} overlayPos
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.withFallbackPosition = /**
     * Adds a new preferred fallback position.
     * @param {?} originPos
     * @param {?} overlayPos
     * @return {?}
     */
    function (originPos, overlayPos) {
        this._preferredPositions.push(new ConnectionPositionPair(originPos, overlayPos));
        return this;
    };
    /**
     * Sets the layout direction so the overlay's position can be adjusted to match.
     * @param dir New layout direction.
     */
    /**
     * Sets the layout direction so the overlay's position can be adjusted to match.
     * @param {?} dir New layout direction.
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.withDirection = /**
     * Sets the layout direction so the overlay's position can be adjusted to match.
     * @param {?} dir New layout direction.
     * @return {?}
     */
    function (dir) {
        this._dir = dir;
        return this;
    };
    /**
     * Sets an offset for the overlay's connection point on the x-axis
     * @param offset New offset in the X axis.
     */
    /**
     * Sets an offset for the overlay's connection point on the x-axis
     * @param {?} offset New offset in the X axis.
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.withOffsetX = /**
     * Sets an offset for the overlay's connection point on the x-axis
     * @param {?} offset New offset in the X axis.
     * @return {?}
     */
    function (offset) {
        this._offsetX = offset;
        return this;
    };
    /**
     * Sets an offset for the overlay's connection point on the y-axis
     * @param  offset New offset in the Y axis.
     */
    /**
     * Sets an offset for the overlay's connection point on the y-axis
     * @param {?} offset New offset in the Y axis.
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.withOffsetY = /**
     * Sets an offset for the overlay's connection point on the y-axis
     * @param {?} offset New offset in the Y axis.
     * @return {?}
     */
    function (offset) {
        this._offsetY = offset;
        return this;
    };
    /**
     * Gets the horizontal (x) "start" dimension based on whether the overlay is in an RTL context.
     * @param {?} rect
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._getStartX = /**
     * Gets the horizontal (x) "start" dimension based on whether the overlay is in an RTL context.
     * @param {?} rect
     * @return {?}
     */
    function (rect) {
        return this._isRtl ? rect.right : rect.left;
    };
    /**
     * Gets the horizontal (x) "end" dimension based on whether the overlay is in an RTL context.
     * @param {?} rect
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._getEndX = /**
     * Gets the horizontal (x) "end" dimension based on whether the overlay is in an RTL context.
     * @param {?} rect
     * @return {?}
     */
    function (rect) {
        return this._isRtl ? rect.left : rect.right;
    };
    /**
     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
     * @param {?} originRect
     * @param {?} pos
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._getOriginConnectionPoint = /**
     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
     * @param {?} originRect
     * @param {?} pos
     * @return {?}
     */
    function (originRect, pos) {
        /** @type {?} */
        var originStartX = this._getStartX(originRect);
        /** @type {?} */
        var originEndX = this._getEndX(originRect);
        /** @type {?} */
        var x;
        if (pos.originX == 'center') {
            x = originStartX + (originRect.width / 2);
        }
        else {
            x = pos.originX == 'start' ? originStartX : originEndX;
        }
        /** @type {?} */
        var y;
        if (pos.originY == 'center') {
            y = originRect.top + (originRect.height / 2);
        }
        else {
            y = pos.originY == 'top' ? originRect.top : originRect.bottom;
        }
        return { x: x, y: y };
    };
    /**
     * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
     * origin point to which the overlay should be connected, as well as how much of the element
     * would be inside the viewport at that position.
     * @param {?} originPoint
     * @param {?} overlayRect
     * @param {?} viewportRect
     * @param {?} pos
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._getOverlayPoint = /**
     * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
     * origin point to which the overlay should be connected, as well as how much of the element
     * would be inside the viewport at that position.
     * @param {?} originPoint
     * @param {?} overlayRect
     * @param {?} viewportRect
     * @param {?} pos
     * @return {?}
     */
    function (originPoint, overlayRect, viewportRect, pos) {
        /** @type {?} */
        var overlayStartX;
        if (pos.overlayX == 'center') {
            overlayStartX = -overlayRect.width / 2;
        }
        else if (pos.overlayX === 'start') {
            overlayStartX = this._isRtl ? -overlayRect.width : 0;
        }
        else {
            overlayStartX = this._isRtl ? 0 : -overlayRect.width;
        }
        /** @type {?} */
        var overlayStartY;
        if (pos.overlayY == 'center') {
            overlayStartY = -overlayRect.height / 2;
        }
        else {
            overlayStartY = pos.overlayY == 'top' ? 0 : -overlayRect.height;
        }
        /** @type {?} */
        var x = originPoint.x + overlayStartX + this._offsetX;
        /** @type {?} */
        var y = originPoint.y + overlayStartY + this._offsetY;
        /** @type {?} */
        var leftOverflow = 0 - x;
        /** @type {?} */
        var rightOverflow = (x + overlayRect.width) - viewportRect.width;
        /** @type {?} */
        var topOverflow = 0 - y;
        /** @type {?} */
        var bottomOverflow = (y + overlayRect.height) - viewportRect.height;
        /** @type {?} */
        var visibleWidth = this._subtractOverflows(overlayRect.width, leftOverflow, rightOverflow);
        /** @type {?} */
        var visibleHeight = this._subtractOverflows(overlayRect.height, topOverflow, bottomOverflow);
        /** @type {?} */
        var visibleArea = visibleWidth * visibleHeight;
        /** @type {?} */
        var fitsInViewport = (overlayRect.width * overlayRect.height) === visibleArea;
        return { x: x, y: y, fitsInViewport: fitsInViewport, visibleArea: visibleArea };
    };
    /**
     * Gets the view properties of the trigger and overlay, including whether they are clipped
     * or completely outside the view of any of the strategy's scrollables.
     * @param {?} overlay
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.getScrollableViewProperties = /**
     * Gets the view properties of the trigger and overlay, including whether they are clipped
     * or completely outside the view of any of the strategy's scrollables.
     * @param {?} overlay
     * @return {?}
     */
    function (overlay) {
        var _this = this;
        /** @type {?} */
        var originBounds = this._getElementBounds(this._origin);
        /** @type {?} */
        var overlayBounds = this._getElementBounds(overlay);
        /** @type {?} */
        var scrollContainerBounds = this.scrollables.map(function (scrollable) {
            return _this._getElementBounds(scrollable.getElementRef().nativeElement);
        });
        return {
            isOriginClipped: this.isElementClipped(originBounds, scrollContainerBounds),
            isOriginOutsideView: this.isElementOutsideView(originBounds, scrollContainerBounds),
            isOverlayClipped: this.isElementClipped(overlayBounds, scrollContainerBounds),
            isOverlayOutsideView: this.isElementOutsideView(overlayBounds, scrollContainerBounds),
        };
    };
    /**
     * Whether the element is completely out of the view of any of the containers.
     * @param {?} elementBounds
     * @param {?} containersBounds
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.isElementOutsideView = /**
     * Whether the element is completely out of the view of any of the containers.
     * @param {?} elementBounds
     * @param {?} containersBounds
     * @return {?}
     */
    function (elementBounds, containersBounds) {
        return containersBounds.some(function (containerBounds) {
            /** @type {?} */
            var outsideAbove = elementBounds.bottom < containerBounds.top;
            /** @type {?} */
            var outsideBelow = elementBounds.top > containerBounds.bottom;
            /** @type {?} */
            var outsideLeft = elementBounds.right < containerBounds.left;
            /** @type {?} */
            var outsideRight = elementBounds.left > containerBounds.right;
            return outsideAbove || outsideBelow || outsideLeft || outsideRight;
        });
    };
    /**
     * Whether the element is clipped by any of the containers.
     * @param {?} elementBounds
     * @param {?} containersBounds
     * @return {?}
     */
    ConnectedPositionStrategy.prototype.isElementClipped = /**
     * Whether the element is clipped by any of the containers.
     * @param {?} elementBounds
     * @param {?} containersBounds
     * @return {?}
     */
    function (elementBounds, containersBounds) {
        return containersBounds.some(function (containerBounds) {
            /** @type {?} */
            var clippedAbove = elementBounds.top < containerBounds.top;
            /** @type {?} */
            var clippedBelow = elementBounds.bottom > containerBounds.bottom;
            /** @type {?} */
            var clippedLeft = elementBounds.left < containerBounds.left;
            /** @type {?} */
            var clippedRight = elementBounds.right > containerBounds.right;
            return clippedAbove || clippedBelow || clippedLeft || clippedRight;
        });
    };
    /**
     * Physically positions the overlay element to the given coordinate.
     * @param {?} element
     * @param {?} overlayRect
     * @param {?} overlayPoint
     * @param {?} pos
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._setElementPosition = /**
     * Physically positions the overlay element to the given coordinate.
     * @param {?} element
     * @param {?} overlayRect
     * @param {?} overlayPoint
     * @param {?} pos
     * @return {?}
     */
    function (element, overlayRect, overlayPoint, pos) {
        /** @type {?} */
        var verticalStyleProperty = pos.overlayY === 'bottom' ? 'bottom' : 'top';
        /** @type {?} */
        var y = verticalStyleProperty === 'top' ?
            overlayPoint.y :
            document.documentElement.clientHeight - (overlayPoint.y + overlayRect.height);
        /** @type {?} */
        var horizontalStyleProperty;
        if (this._dir === 'rtl') {
            horizontalStyleProperty = pos.overlayX === 'end' ? 'left' : 'right';
        }
        else {
            horizontalStyleProperty = pos.overlayX === 'end' ? 'right' : 'left';
        }
        /** @type {?} */
        var x = horizontalStyleProperty === 'left' ?
            overlayPoint.x :
            document.documentElement.clientWidth - (overlayPoint.x + overlayRect.width);
        // Reset any existing styles. This is necessary in case the preferred position has
        // changed since the last `apply`.
        ['top', 'bottom', 'left', 'right'].forEach(function (p) { return element.style[p] = null; });
        element.style[verticalStyleProperty] = y + "px";
        element.style[horizontalStyleProperty] = x + "px";
    };
    /**
     * Returns the bounding positions of the provided element with respect to the viewport.
     * @param {?} element
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._getElementBounds = /**
     * Returns the bounding positions of the provided element with respect to the viewport.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var boundingClientRect = element.getBoundingClientRect();
        return {
            top: boundingClientRect.top,
            right: boundingClientRect.left + boundingClientRect.width,
            bottom: boundingClientRect.top + boundingClientRect.height,
            left: boundingClientRect.left
        };
    };
    /**
     * Subtracts the amount that an element is overflowing on an axis from it's length.
     * @param {?} length
     * @param {...?} overflows
     * @return {?}
     */
    ConnectedPositionStrategy.prototype._subtractOverflows = /**
     * Subtracts the amount that an element is overflowing on an axis from it's length.
     * @param {?} length
     * @param {...?} overflows
     * @return {?}
     */
    function (length) {
        var overflows = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            overflows[_i - 1] = arguments[_i];
        }
        return overflows.reduce(function (currentValue, currentOverflow) {
            return currentValue - Math.max(currentOverflow, 0);
        }, length);
    };
    return ConnectedPositionStrategy;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport. We use flexbox, instead of
 * transforms, in order to avoid issues with subpixel rendering which can cause the
 * element to become blurry.
 */
var  /**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport. We use flexbox, instead of
 * transforms, in order to avoid issues with subpixel rendering which can cause the
 * element to become blurry.
 */
GlobalPositionStrategy = /** @class */ (function () {
    function GlobalPositionStrategy() {
        this._cssPosition = 'static';
        this._topOffset = '';
        this._bottomOffset = '';
        this._leftOffset = '';
        this._rightOffset = '';
        this._alignItems = '';
        this._justifyContent = '';
        this._width = '';
        this._height = '';
    }
    /**
     * Sets the top position of the overlay. Clears any previously set vertical position.
     * @param value New top offset.
     */
    /**
     * Sets the top position of the overlay. Clears any previously set vertical position.
     * @param {?} value New top offset.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.top = /**
     * Sets the top position of the overlay. Clears any previously set vertical position.
     * @param {?} value New top offset.
     * @return {?}
     */
    function (value) {
        this._bottomOffset = '';
        this._topOffset = value;
        this._alignItems = 'flex-start';
        return this;
    };
    /**
     * Sets the left position of the overlay. Clears any previously set horizontal position.
     * @param value New left offset.
     */
    /**
     * Sets the left position of the overlay. Clears any previously set horizontal position.
     * @param {?} value New left offset.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.left = /**
     * Sets the left position of the overlay. Clears any previously set horizontal position.
     * @param {?} value New left offset.
     * @return {?}
     */
    function (value) {
        this._rightOffset = '';
        this._leftOffset = value;
        this._justifyContent = 'flex-start';
        return this;
    };
    /**
     * Sets the bottom position of the overlay. Clears any previously set vertical position.
     * @param value New bottom offset.
     */
    /**
     * Sets the bottom position of the overlay. Clears any previously set vertical position.
     * @param {?} value New bottom offset.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.bottom = /**
     * Sets the bottom position of the overlay. Clears any previously set vertical position.
     * @param {?} value New bottom offset.
     * @return {?}
     */
    function (value) {
        this._topOffset = '';
        this._bottomOffset = value;
        this._alignItems = 'flex-end';
        return this;
    };
    /**
     * Sets the right position of the overlay. Clears any previously set horizontal position.
     * @param value New right offset.
     */
    /**
     * Sets the right position of the overlay. Clears any previously set horizontal position.
     * @param {?} value New right offset.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.right = /**
     * Sets the right position of the overlay. Clears any previously set horizontal position.
     * @param {?} value New right offset.
     * @return {?}
     */
    function (value) {
        this._leftOffset = '';
        this._rightOffset = value;
        this._justifyContent = 'flex-end';
        return this;
    };
    /**
     * Sets the overlay width and clears any previously set width.
     * @param value New width for the overlay
     */
    /**
     * Sets the overlay width and clears any previously set width.
     * @param {?} value New width for the overlay
     * @return {?}
     */
    GlobalPositionStrategy.prototype.width = /**
     * Sets the overlay width and clears any previously set width.
     * @param {?} value New width for the overlay
     * @return {?}
     */
    function (value) {
        this._width = value;
        // When the width is 100%, we should reset the `left` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.left('0px');
        }
        return this;
    };
    /**
     * Sets the overlay height and clears any previously set height.
     * @param value New height for the overlay
     */
    /**
     * Sets the overlay height and clears any previously set height.
     * @param {?} value New height for the overlay
     * @return {?}
     */
    GlobalPositionStrategy.prototype.height = /**
     * Sets the overlay height and clears any previously set height.
     * @param {?} value New height for the overlay
     * @return {?}
     */
    function (value) {
        this._height = value;
        // When the height is 100%, we should reset the `top` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.top('0px');
        }
        return this;
    };
    /**
     * Centers the overlay horizontally with an optional offset.
     * Clears any previously set horizontal position.
     *
     * @param offset Overlay offset from the horizontal center.
     */
    /**
     * Centers the overlay horizontally with an optional offset.
     * Clears any previously set horizontal position.
     *
     * @param {?=} offset Overlay offset from the horizontal center.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.centerHorizontally = /**
     * Centers the overlay horizontally with an optional offset.
     * Clears any previously set horizontal position.
     *
     * @param {?=} offset Overlay offset from the horizontal center.
     * @return {?}
     */
    function (offset) {
        if (offset === void 0) { offset = ''; }
        this.left(offset);
        this._justifyContent = 'center';
        return this;
    };
    /**
     * Centers the overlay vertically with an optional offset.
     * Clears any previously set vertical position.
     *
     * @param offset Overlay offset from the vertical center.
     */
    /**
     * Centers the overlay vertically with an optional offset.
     * Clears any previously set vertical position.
     *
     * @param {?=} offset Overlay offset from the vertical center.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.centerVertically = /**
     * Centers the overlay vertically with an optional offset.
     * Clears any previously set vertical position.
     *
     * @param {?=} offset Overlay offset from the vertical center.
     * @return {?}
     */
    function (offset) {
        if (offset === void 0) { offset = ''; }
        this.top(offset);
        this._alignItems = 'center';
        return this;
    };
    /**
     * Apply the position to the element.
     * @docs-private
     *
     * @param element Element to which to apply the CSS.
     * @returns Resolved when the styles have been applied.
     */
    /**
     * Apply the position to the element.
     * \@docs-private
     *
     * @param {?} element Element to which to apply the CSS.
     * @return {?} Resolved when the styles have been applied.
     */
    GlobalPositionStrategy.prototype.apply = /**
     * Apply the position to the element.
     * \@docs-private
     *
     * @param {?} element Element to which to apply the CSS.
     * @return {?} Resolved when the styles have been applied.
     */
    function (element) {
        if (!this._wrapper) {
            this._wrapper = document.createElement('div');
            this._wrapper.classList.add('cdk-global-overlay-wrapper');
            element.parentNode.insertBefore(this._wrapper, element);
            this._wrapper.appendChild(element);
        }
        /** @type {?} */
        var styles = element.style;
        /** @type {?} */
        var parentStyles = (/** @type {?} */ (element.parentNode)).style;
        styles.position = this._cssPosition;
        styles.marginTop = this._topOffset;
        styles.marginLeft = this._leftOffset;
        styles.marginBottom = this._bottomOffset;
        styles.marginRight = this._rightOffset;
        styles.width = this._width;
        styles.height = this._height;
        parentStyles.justifyContent = this._justifyContent;
        parentStyles.alignItems = this._alignItems;
        return Promise.resolve(null);
    };
    /**
     * Removes the wrapper element from the DOM.
     */
    /**
     * Removes the wrapper element from the DOM.
     * @return {?}
     */
    GlobalPositionStrategy.prototype.dispose = /**
     * Removes the wrapper element from the DOM.
     * @return {?}
     */
    function () {
        if (this._wrapper && this._wrapper.parentNode) {
            this._wrapper.parentNode.removeChild(this._wrapper);
            this._wrapper = null;
        }
    };
    return GlobalPositionStrategy;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Builder for overlay position strategy.
 */
var OverlayPositionBuilder = /** @class */ (function () {
    function OverlayPositionBuilder(_viewportRuler) {
        this._viewportRuler = _viewportRuler;
    }
    /**
     * Creates a global position strategy.
     */
    /**
     * Creates a global position strategy.
     * @return {?}
     */
    OverlayPositionBuilder.prototype.global = /**
     * Creates a global position strategy.
     * @return {?}
     */
    function () {
        return new GlobalPositionStrategy();
    };
    /**
     * Creates a relative position strategy.
     * @param elementRef
     * @param originPos
     * @param overlayPos
     */
    /**
     * Creates a relative position strategy.
     * @param {?} elementRef
     * @param {?} originPos
     * @param {?} overlayPos
     * @return {?}
     */
    OverlayPositionBuilder.prototype.connectedTo = /**
     * Creates a relative position strategy.
     * @param {?} elementRef
     * @param {?} originPos
     * @param {?} overlayPos
     * @return {?}
     */
    function (elementRef, originPos, overlayPos) {
        return new ConnectedPositionStrategy(elementRef, originPos, overlayPos, this._viewportRuler);
    };
    OverlayPositionBuilder.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    OverlayPositionBuilder.ctorParameters = function () { return [
        { type: ViewportRuler }
    ]; };
    return OverlayPositionBuilder;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * The OverlayContainer is the container in which all overlays will load.
 * It should be provided in the root component to ensure it is properly shared.
 */
var OverlayContainer = /** @class */ (function () {
    function OverlayContainer() {
    }
    Object.defineProperty(OverlayContainer.prototype, "themeClass", {
        /**
         * Base theme to be applied to all overlay-based components.
         */
        get: /**
         * Base theme to be applied to all overlay-based components.
         * @return {?}
         */
        function () { return this._themeClass; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._containerElement) {
                this._containerElement.classList.remove(this._themeClass);
                if (value) {
                    this._containerElement.classList.add(value);
                }
            }
            this._themeClass = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This method returns the overlay container element.  It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @returns the container element
     */
    /**
     * This method returns the overlay container element.  It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @return {?} the container element
     */
    OverlayContainer.prototype.getContainerElement = /**
     * This method returns the overlay container element.  It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @return {?} the container element
     */
    function () {
        if (!this._containerElement) {
            this._createContainer();
        }
        return this._containerElement;
    };
    /**
     * Create the overlay container element, which is simply a div
     * with the 'cdk-overlay-container' class on the document body.
     */
    /**
     * Create the overlay container element, which is simply a div
     * with the 'cdk-overlay-container' class on the document body.
     * @return {?}
     */
    OverlayContainer.prototype._createContainer = /**
     * Create the overlay container element, which is simply a div
     * with the 'cdk-overlay-container' class on the document body.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var container = document.createElement('div');
        container.classList.add('cdk-overlay-container');
        if (this._themeClass) {
            container.classList.add(this._themeClass);
        }
        document.body.appendChild(container);
        this._containerElement = container;
    };
    OverlayContainer.decorators = [
        { type: Injectable }
    ];
    return OverlayContainer;
}());
/**
 * @param {?} parentContainer
 * @return {?}
 */
function OVERLAY_CONTAINER_PROVIDER_FACTORY(parentContainer) {
    return parentContainer || new OverlayContainer();
}
/** @type {?} */
var OVERLAY_CONTAINER_PROVIDER = {
    // If there is already an OverlayContainer available, use that. Otherwise, provide a new one.
    provide: OverlayContainer,
    deps: [[new Optional(), new SkipSelf(), OverlayContainer]],
    useFactory: OVERLAY_CONTAINER_PROVIDER_FACTORY
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Next overlay unique ID.
  @type {?} */
var nextUniqueId = 0;
/** *
 * The default state for newly created overlays.
  @type {?} */
var defaultState = new OverlayState();
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
var Overlay = /** @class */ (function () {
    function Overlay(scrollStrategies, _overlayContainer, _componentFactoryResolver, _positionBuilder, _appRef, _injector, _ngZone) {
        this.scrollStrategies = scrollStrategies;
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._positionBuilder = _positionBuilder;
        this._appRef = _appRef;
        this._injector = _injector;
        this._ngZone = _ngZone;
    }
    /**
     * Creates an overlay.
     * @param state State to apply to the overlay.
     * @returns Reference to the created overlay.
     */
    /**
     * Creates an overlay.
     * @param {?=} state State to apply to the overlay.
     * @return {?} Reference to the created overlay.
     */
    Overlay.prototype.create = /**
     * Creates an overlay.
     * @param {?=} state State to apply to the overlay.
     * @return {?} Reference to the created overlay.
     */
    function (state$$1) {
        if (state$$1 === void 0) { state$$1 = defaultState; }
        return this._createOverlayRef(this._createPaneElement(), state$$1);
    };
    /**
     * Returns a position builder that can be used, via fluent API,
     * to construct and configure a position strategy.
     */
    /**
     * Returns a position builder that can be used, via fluent API,
     * to construct and configure a position strategy.
     * @return {?}
     */
    Overlay.prototype.position = /**
     * Returns a position builder that can be used, via fluent API,
     * to construct and configure a position strategy.
     * @return {?}
     */
    function () {
        return this._positionBuilder;
    };
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @return {?} Newly-created pane element
     */
    Overlay.prototype._createPaneElement = /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @return {?} Newly-created pane element
     */
    function () {
        /** @type {?} */
        var pane = document.createElement('div');
        pane.id = "cdk-overlay-" + nextUniqueId++;
        pane.classList.add('cdk-overlay-pane');
        this._overlayContainer.getContainerElement().appendChild(pane);
        return pane;
    };
    /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param {?} pane The DOM element to turn into a portal host.
     * @return {?} A portal host for the given DOM element.
     */
    Overlay.prototype._createPortalHost = /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param {?} pane The DOM element to turn into a portal host.
     * @return {?} A portal host for the given DOM element.
     */
    function (pane) {
        return new DomPortalHost(pane, this._componentFactoryResolver, this._appRef, this._injector);
    };
    /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param {?} pane DOM element for the overlay
     * @param {?} state
     * @return {?}
     */
    Overlay.prototype._createOverlayRef = /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param {?} pane DOM element for the overlay
     * @param {?} state
     * @return {?}
     */
    function (pane, state$$1) {
        /** @type {?} */
        var scrollStrategy = state$$1.scrollStrategy || this.scrollStrategies.noop();
        /** @type {?} */
        var portalHost = this._createPortalHost(pane);
        return new OverlayRef(portalHost, pane, state$$1, scrollStrategy, this._ngZone);
    };
    Overlay.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Overlay.ctorParameters = function () { return [
        { type: ScrollStrategyOptions },
        { type: OverlayContainer },
        { type: ComponentFactoryResolver },
        { type: OverlayPositionBuilder },
        { type: ApplicationRef },
        { type: Injector },
        { type: NgZone }
    ]; };
    return Overlay;
}());
/** *
 * Providers for Overlay and its related injectables.
  @type {?} */
var OVERLAY_PROVIDERS = [
    Overlay,
    OverlayPositionBuilder,
    VIEWPORT_RULER_PROVIDER,
    OVERLAY_CONTAINER_PROVIDER,
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Utility for checking the interactivity of an element, such as whether is is focusable or
 * tabbable.
 */
var InteractivityChecker = /** @class */ (function () {
    function InteractivityChecker(_platform) {
        this._platform = _platform;
    }
    /**
     * Gets whether an element is disabled.
     *
     * @param element Element to be checked.
     * @returns Whether the element is disabled.
     */
    /**
     * Gets whether an element is disabled.
     *
     * @param {?} element Element to be checked.
     * @return {?} Whether the element is disabled.
     */
    InteractivityChecker.prototype.isDisabled = /**
     * Gets whether an element is disabled.
     *
     * @param {?} element Element to be checked.
     * @return {?} Whether the element is disabled.
     */
    function (element) {
        // This does not capture some cases, such as a non-form control with a disabled attribute or
        // a form control inside of a disabled form, but should capture the most common cases.
        return element.hasAttribute('disabled');
    };
    /**
     * Gets whether an element is visible for the purposes of interactivity.
     *
     * This will capture states like `display: none` and `visibility: hidden`, but not things like
     * being clipped by an `overflow: hidden` parent or being outside the viewport.
     *
     * @returns Whether the element is visible.
     */
    /**
     * Gets whether an element is visible for the purposes of interactivity.
     *
     * This will capture states like `display: none` and `visibility: hidden`, but not things like
     * being clipped by an `overflow: hidden` parent or being outside the viewport.
     *
     * @param {?} element
     * @return {?} Whether the element is visible.
     */
    InteractivityChecker.prototype.isVisible = /**
     * Gets whether an element is visible for the purposes of interactivity.
     *
     * This will capture states like `display: none` and `visibility: hidden`, but not things like
     * being clipped by an `overflow: hidden` parent or being outside the viewport.
     *
     * @param {?} element
     * @return {?} Whether the element is visible.
     */
    function (element) {
        return hasGeometry(element) && getComputedStyle(element).visibility === 'visible';
    };
    /**
     * Gets whether an element can be reached via Tab key.
     * Assumes that the element has already been checked with isFocusable.
     *
     * @param element Element to be checked.
     * @returns Whether the element is tabbable.
     */
    /**
     * Gets whether an element can be reached via Tab key.
     * Assumes that the element has already been checked with isFocusable.
     *
     * @param {?} element Element to be checked.
     * @return {?} Whether the element is tabbable.
     */
    InteractivityChecker.prototype.isTabbable = /**
     * Gets whether an element can be reached via Tab key.
     * Assumes that the element has already been checked with isFocusable.
     *
     * @param {?} element Element to be checked.
     * @return {?} Whether the element is tabbable.
     */
    function (element) {
        // Nothing is tabbable on the the server 😎
        if (!this._platform.isBrowser) {
            return false;
        }
        /** @type {?} */
        var frameElement = /** @type {?} */ (getWindow(element).frameElement);
        if (frameElement) {
            /** @type {?} */
            var frameType = frameElement && frameElement.nodeName.toLowerCase();
            // Frame elements inherit their tabindex onto all child elements.
            if (getTabIndexValue(frameElement) === -1) {
                return false;
            }
            // Webkit and Blink consider anything inside of an <object> element as non-tabbable.
            if ((this._platform.BLINK || this._platform.WEBKIT) && frameType === 'object') {
                return false;
            }
            // Webkit and Blink disable tabbing to an element inside of an invisible frame.
            if ((this._platform.BLINK || this._platform.WEBKIT) && !this.isVisible(frameElement)) {
                return false;
            }
        }
        /** @type {?} */
        var nodeName = element.nodeName.toLowerCase();
        /** @type {?} */
        var tabIndexValue = getTabIndexValue(element);
        if (element.hasAttribute('contenteditable')) {
            return tabIndexValue !== -1;
        }
        if (nodeName === 'iframe') {
            // The frames may be tabbable depending on content, but it's not possibly to reliably
            // investigate the content of the frames.
            return false;
        }
        if (nodeName === 'audio') {
            if (!element.hasAttribute('controls')) {
                // By default an <audio> element without the controls enabled is not tabbable.
                return false;
            }
            else if (this._platform.BLINK) {
                // In Blink <audio controls> elements are always tabbable.
                return true;
            }
        }
        if (nodeName === 'video') {
            if (!element.hasAttribute('controls') && this._platform.TRIDENT) {
                // In Trident a <video> element without the controls enabled is not tabbable.
                return false;
            }
            else if (this._platform.BLINK || this._platform.FIREFOX) {
                // In Chrome and Firefox <video controls> elements are always tabbable.
                return true;
            }
        }
        if (nodeName === 'object' && (this._platform.BLINK || this._platform.WEBKIT)) {
            // In all Blink and WebKit based browsers <object> elements are never tabbable.
            return false;
        }
        // In iOS the browser only considers some specific elements as tabbable.
        if (this._platform.WEBKIT && this._platform.IOS && !isPotentiallyTabbableIOS(element)) {
            return false;
        }
        return element.tabIndex >= 0;
    };
    /**
     * Gets whether an element can be focused by the user.
     *
     * @param element Element to be checked.
     * @returns Whether the element is focusable.
     */
    /**
     * Gets whether an element can be focused by the user.
     *
     * @param {?} element Element to be checked.
     * @return {?} Whether the element is focusable.
     */
    InteractivityChecker.prototype.isFocusable = /**
     * Gets whether an element can be focused by the user.
     *
     * @param {?} element Element to be checked.
     * @return {?} Whether the element is focusable.
     */
    function (element) {
        // Perform checks in order of left to most expensive.
        // Again, naive approach that does not capture many edge cases and browser quirks.
        return isPotentiallyFocusable(element) && !this.isDisabled(element) && this.isVisible(element);
    };
    InteractivityChecker.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    InteractivityChecker.ctorParameters = function () { return [
        { type: Platform }
    ]; };
    return InteractivityChecker;
}());
/**
 * Checks whether the specified element has any geometry / rectangles.
 * @param {?} element
 * @return {?}
 */
function hasGeometry(element) {
    // Use logic from jQuery to check for an invisible element.
    // See https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js#L12
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}
/**
 * Gets whether an element's
 * @param {?} element
 * @return {?}
 */
function isNativeFormElement(element) {
    /** @type {?} */
    var nodeName = element.nodeName.toLowerCase();
    return nodeName === 'input' ||
        nodeName === 'select' ||
        nodeName === 'button' ||
        nodeName === 'textarea';
}
/**
 * Gets whether an element is an <input type="hidden">.
 * @param {?} element
 * @return {?}
 */
function isHiddenInput(element) {
    return isInputElement(element) && element.type == 'hidden';
}
/**
 * Gets whether an element is an anchor that has an href attribute.
 * @param {?} element
 * @return {?}
 */
function isAnchorWithHref(element) {
    return isAnchorElement(element) && element.hasAttribute('href');
}
/**
 * Gets whether an element is an input element.
 * @param {?} element
 * @return {?}
 */
function isInputElement(element) {
    return element.nodeName.toLowerCase() == 'input';
}
/**
 * Gets whether an element is an anchor element.
 * @param {?} element
 * @return {?}
 */
function isAnchorElement(element) {
    return element.nodeName.toLowerCase() == 'a';
}
/**
 * Gets whether an element has a valid tabindex.
 * @param {?} element
 * @return {?}
 */
function hasValidTabIndex(element) {
    if (!element.hasAttribute('tabindex') || element.tabIndex === undefined) {
        return false;
    }
    /** @type {?} */
    var tabIndex = element.getAttribute('tabindex');
    // IE11 parses tabindex="" as the value "-32768"
    if (tabIndex == '-32768') {
        return false;
    }
    return !!(tabIndex && !isNaN(parseInt(tabIndex, 10)));
}
/**
 * Returns the parsed tabindex from the element attributes instead of returning the
 * evaluated tabindex from the browsers defaults.
 * @param {?} element
 * @return {?}
 */
function getTabIndexValue(element) {
    if (!hasValidTabIndex(element)) {
        return null;
    }
    /** @type {?} */
    var tabIndex = parseInt(element.getAttribute('tabindex'), 10);
    return isNaN(tabIndex) ? -1 : tabIndex;
}
/**
 * Checks whether the specified element is potentially tabbable on iOS
 * @param {?} element
 * @return {?}
 */
function isPotentiallyTabbableIOS(element) {
    /** @type {?} */
    var nodeName = element.nodeName.toLowerCase();
    /** @type {?} */
    var inputType = nodeName === 'input' && (/** @type {?} */ (element)).type;
    return inputType === 'text'
        || inputType === 'password'
        || nodeName === 'select'
        || nodeName === 'textarea';
}
/**
 * Gets whether an element is potentially focusable without taking current visible/disabled state
 * into account.
 * @param {?} element
 * @return {?}
 */
function isPotentiallyFocusable(element) {
    // Inputs are potentially focusable *unless* they're type="hidden".
    if (isHiddenInput(element)) {
        return false;
    }
    return isNativeFormElement(element) ||
        isAnchorWithHref(element) ||
        element.hasAttribute('contenteditable') ||
        hasValidTabIndex(element);
}
/**
 * Gets the parent window of a DOM node with regards of being inside of an iframe.
 * @param {?} node
 * @return {?}
 */
function getWindow(node) {
    return node.ownerDocument.defaultView || window;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class that allows for trapping focus within a DOM element.
 *
 * NOTE: This class currently uses a very simple (naive) approach to focus trapping.
 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
 * Things like tabIndex > 0, flex `order`, and shadow roots can cause to two to misalign.
 * This will be replaced with a more intelligent solution before the library is considered stable.
 */
var  /**
 * Class that allows for trapping focus within a DOM element.
 *
 * NOTE: This class currently uses a very simple (naive) approach to focus trapping.
 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
 * Things like tabIndex > 0, flex `order`, and shadow roots can cause to two to misalign.
 * This will be replaced with a more intelligent solution before the library is considered stable.
 */
FocusTrap = /** @class */ (function () {
    function FocusTrap(_element, _platform, _checker, _ngZone, deferAnchors) {
        if (deferAnchors === void 0) { deferAnchors = false; }
        this._element = _element;
        this._platform = _platform;
        this._checker = _checker;
        this._ngZone = _ngZone;
        this._enabled = true;
        if (!deferAnchors) {
            this.attachAnchors();
        }
    }
    Object.defineProperty(FocusTrap.prototype, "enabled", {
        /** Whether the focus trap is active. */
        get: /**
         * Whether the focus trap is active.
         * @return {?}
         */
        function () { return this._enabled; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._enabled = val;
            if (this._startAnchor && this._endAnchor) {
                this._startAnchor.tabIndex = this._endAnchor.tabIndex = this._enabled ? 0 : -1;
            }
        },
        enumerable: true,
        configurable: true
    });
    /** Destroys the focus trap by cleaning up the anchors. */
    /**
     * Destroys the focus trap by cleaning up the anchors.
     * @return {?}
     */
    FocusTrap.prototype.destroy = /**
     * Destroys the focus trap by cleaning up the anchors.
     * @return {?}
     */
    function () {
        if (this._startAnchor && this._startAnchor.parentNode) {
            this._startAnchor.parentNode.removeChild(this._startAnchor);
        }
        if (this._endAnchor && this._endAnchor.parentNode) {
            this._endAnchor.parentNode.removeChild(this._endAnchor);
        }
        this._startAnchor = this._endAnchor = null;
    };
    /**
     * Inserts the anchors into the DOM. This is usually done automatically
     * in the constructor, but can be deferred for cases like directives with `*ngIf`.
     */
    /**
     * Inserts the anchors into the DOM. This is usually done automatically
     * in the constructor, but can be deferred for cases like directives with `*ngIf`.
     * @return {?}
     */
    FocusTrap.prototype.attachAnchors = /**
     * Inserts the anchors into the DOM. This is usually done automatically
     * in the constructor, but can be deferred for cases like directives with `*ngIf`.
     * @return {?}
     */
    function () {
        var _this = this;
        // If we're not on the browser, there can be no focus to trap.
        if (!this._platform.isBrowser) {
            return;
        }
        if (!this._startAnchor) {
            this._startAnchor = this._createAnchor();
        }
        if (!this._endAnchor) {
            this._endAnchor = this._createAnchor();
        }
        this._ngZone.runOutsideAngular(function () {
            _this._startAnchor.addEventListener('focus', function () { return _this.focusLastTabbableElement(); });
            _this._endAnchor.addEventListener('focus', function () { return _this.focusFirstTabbableElement(); });
            _this._element.parentNode.insertBefore(_this._startAnchor, _this._element);
            _this._element.parentNode.insertBefore(_this._endAnchor, _this._element.nextSibling);
        });
    };
    /**
     * Waits for the zone to stabilize, then either focuses the first element that the
     * user specified, or the first tabbable element..
     */
    /**
     * Waits for the zone to stabilize, then either focuses the first element that the
     * user specified, or the first tabbable element..
     * @return {?}
     */
    FocusTrap.prototype.focusInitialElementWhenReady = /**
     * Waits for the zone to stabilize, then either focuses the first element that the
     * user specified, or the first tabbable element..
     * @return {?}
     */
    function () {
        var _this = this;
        this._executeOnStable(function () { return _this.focusInitialElement(); });
    };
    /**
     * Waits for the zone to stabilize, then focuses
     * the first tabbable element within the focus trap region.
     */
    /**
     * Waits for the zone to stabilize, then focuses
     * the first tabbable element within the focus trap region.
     * @return {?}
     */
    FocusTrap.prototype.focusFirstTabbableElementWhenReady = /**
     * Waits for the zone to stabilize, then focuses
     * the first tabbable element within the focus trap region.
     * @return {?}
     */
    function () {
        var _this = this;
        this._executeOnStable(function () { return _this.focusFirstTabbableElement(); });
    };
    /**
     * Waits for the zone to stabilize, then focuses
     * the last tabbable element within the focus trap region.
     */
    /**
     * Waits for the zone to stabilize, then focuses
     * the last tabbable element within the focus trap region.
     * @return {?}
     */
    FocusTrap.prototype.focusLastTabbableElementWhenReady = /**
     * Waits for the zone to stabilize, then focuses
     * the last tabbable element within the focus trap region.
     * @return {?}
     */
    function () {
        var _this = this;
        this._executeOnStable(function () { return _this.focusLastTabbableElement(); });
    };
    /**
     * Get the specified boundary element of the trapped region.
     * @param {?} bound The boundary to get (start or end of trapped region).
     * @return {?} The boundary element.
     */
    FocusTrap.prototype._getRegionBoundary = /**
     * Get the specified boundary element of the trapped region.
     * @param {?} bound The boundary to get (start or end of trapped region).
     * @return {?} The boundary element.
     */
    function (bound) {
        /** @type {?} */
        var markers = /** @type {?} */ (this._element.querySelectorAll("[cdk-focus-region-" + bound + "], " +
            ("[cdk-focus-" + bound + "]")));
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].hasAttribute("cdk-focus-" + bound)) {
                console.warn("Found use of deprecated attribute 'cdk-focus-" + bound + "'," +
                    (" use 'cdk-focus-region-" + bound + "' instead."), markers[i]);
            }
        }
        if (bound == 'start') {
            return markers.length ? markers[0] : this._getFirstTabbableElement(this._element);
        }
        return markers.length ?
            markers[markers.length - 1] : this._getLastTabbableElement(this._element);
    };
    /** Focuses the element that should be focused when the focus trap is initialized. */
    /**
     * Focuses the element that should be focused when the focus trap is initialized.
     * @return {?}
     */
    FocusTrap.prototype.focusInitialElement = /**
     * Focuses the element that should be focused when the focus trap is initialized.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var redirectToElement = /** @type {?} */ (this._element.querySelector('[cdk-focus-initial]'));
        if (redirectToElement) {
            redirectToElement.focus();
        }
        else {
            this.focusFirstTabbableElement();
        }
    };
    /** Focuses the first tabbable element within the focus trap region. */
    /**
     * Focuses the first tabbable element within the focus trap region.
     * @return {?}
     */
    FocusTrap.prototype.focusFirstTabbableElement = /**
     * Focuses the first tabbable element within the focus trap region.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var redirectToElement = this._getRegionBoundary('start');
        if (redirectToElement) {
            redirectToElement.focus();
        }
    };
    /** Focuses the last tabbable element within the focus trap region. */
    /**
     * Focuses the last tabbable element within the focus trap region.
     * @return {?}
     */
    FocusTrap.prototype.focusLastTabbableElement = /**
     * Focuses the last tabbable element within the focus trap region.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var redirectToElement = this._getRegionBoundary('end');
        if (redirectToElement) {
            redirectToElement.focus();
        }
    };
    /**
     * Get the first tabbable element from a DOM subtree (inclusive).
     * @param {?} root
     * @return {?}
     */
    FocusTrap.prototype._getFirstTabbableElement = /**
     * Get the first tabbable element from a DOM subtree (inclusive).
     * @param {?} root
     * @return {?}
     */
    function (root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        /** @type {?} */
        var children = root.children || root.childNodes;
        for (var i = 0; i < children.length; i++) {
            /** @type {?} */
            var tabbableChild = children[i].nodeType === Node.ELEMENT_NODE ?
                this._getFirstTabbableElement(/** @type {?} */ (children[i])) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    };
    /**
     * Get the last tabbable element from a DOM subtree (inclusive).
     * @param {?} root
     * @return {?}
     */
    FocusTrap.prototype._getLastTabbableElement = /**
     * Get the last tabbable element from a DOM subtree (inclusive).
     * @param {?} root
     * @return {?}
     */
    function (root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        /** @type {?} */
        var children = root.children || root.childNodes;
        for (var i = children.length - 1; i >= 0; i--) {
            /** @type {?} */
            var tabbableChild = children[i].nodeType === Node.ELEMENT_NODE ?
                this._getLastTabbableElement(/** @type {?} */ (children[i])) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    };
    /**
     * Creates an anchor element.
     * @return {?}
     */
    FocusTrap.prototype._createAnchor = /**
     * Creates an anchor element.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var anchor = document.createElement('div');
        anchor.tabIndex = this._enabled ? 0 : -1;
        anchor.classList.add('cdk-visually-hidden');
        anchor.classList.add('cdk-focus-trap-anchor');
        return anchor;
    };
    /**
     * Executes a function when the zone is stable.
     * @param {?} fn
     * @return {?}
     */
    FocusTrap.prototype._executeOnStable = /**
     * Executes a function when the zone is stable.
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        if (this._ngZone.isStable) {
            fn();
        }
        else {
            this._ngZone.onStable.pipe(first()).subscribe(fn);
        }
    };
    return FocusTrap;
}());
/**
 * Factory that allows easy instantiation of focus traps.
 */
var FocusTrapFactory = /** @class */ (function () {
    function FocusTrapFactory(_checker, _platform, _ngZone) {
        this._checker = _checker;
        this._platform = _platform;
        this._ngZone = _ngZone;
    }
    /**
     * @param {?} element
     * @param {?=} deferAnchors
     * @return {?}
     */
    FocusTrapFactory.prototype.create = /**
     * @param {?} element
     * @param {?=} deferAnchors
     * @return {?}
     */
    function (element, deferAnchors) {
        if (deferAnchors === void 0) { deferAnchors = false; }
        return new FocusTrap(element, this._platform, this._checker, this._ngZone, deferAnchors);
    };
    FocusTrapFactory.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FocusTrapFactory.ctorParameters = function () { return [
        { type: InteractivityChecker },
        { type: Platform },
        { type: NgZone }
    ]; };
    return FocusTrapFactory;
}());
/**
 * Directive for trapping focus within a region.
 * @deprecated
 */
var FocusTrapDeprecatedDirective = /** @class */ (function () {
    function FocusTrapDeprecatedDirective(_elementRef, _focusTrapFactory) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    Object.defineProperty(FocusTrapDeprecatedDirective.prototype, "disabled", {
        /** Whether the focus trap is active. */
        get: /**
         * Whether the focus trap is active.
         * @return {?}
         */
        function () { return !this.focusTrap.enabled; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.focusTrap.enabled = !coerceBooleanProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FocusTrapDeprecatedDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.focusTrap.destroy();
    };
    /**
     * @return {?}
     */
    FocusTrapDeprecatedDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.focusTrap.attachAnchors();
    };
    FocusTrapDeprecatedDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'cdk-focus-trap',
                },] }
    ];
    /** @nocollapse */
    FocusTrapDeprecatedDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusTrapFactory }
    ]; };
    FocusTrapDeprecatedDirective.propDecorators = {
        disabled: [{ type: Input }]
    };
    return FocusTrapDeprecatedDirective;
}());
/**
 * Directive for trapping focus within a region.
 */
var FocusTrapDirective = /** @class */ (function () {
    function FocusTrapDirective(_elementRef, _focusTrapFactory) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    Object.defineProperty(FocusTrapDirective.prototype, "enabled", {
        /** Whether the focus trap is active. */
        get: /**
         * Whether the focus trap is active.
         * @return {?}
         */
        function () { return this.focusTrap.enabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.focusTrap.enabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FocusTrapDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.focusTrap.destroy();
    };
    /**
     * @return {?}
     */
    FocusTrapDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.focusTrap.attachAnchors();
    };
    FocusTrapDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkTrapFocus]',
                    exportAs: 'cdkTrapFocus',
                },] }
    ];
    /** @nocollapse */
    FocusTrapDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusTrapFactory }
    ]; };
    FocusTrapDirective.propDecorators = {
        enabled: [{ type: Input, args: ['cdkTrapFocus',] }]
    };
    return FocusTrapDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var LIVE_ANNOUNCER_ELEMENT_TOKEN = new InjectionToken('liveAnnouncerElement');
var LiveAnnouncer = /** @class */ (function () {
    function LiveAnnouncer(elementToken, platform) {
        // Only do anything if we're on the browser platform.
        if (platform.isBrowser) {
            // We inject the live element as `any` because the constructor signature cannot reference
            // browser globals (HTMLElement) on non-browser environments, since having a class decorator
            // causes TypeScript to preserve the constructor signature types.
            this._liveElement = elementToken || this._createLiveElement();
        }
    }
    /**
     * Announces a message to screenreaders.
     * @param message Message to be announced to the screenreader
     * @param politeness The politeness of the announcer element
     */
    /**
     * Announces a message to screenreaders.
     * @param {?} message Message to be announced to the screenreader
     * @param {?=} politeness The politeness of the announcer element
     * @return {?}
     */
    LiveAnnouncer.prototype.announce = /**
     * Announces a message to screenreaders.
     * @param {?} message Message to be announced to the screenreader
     * @param {?=} politeness The politeness of the announcer element
     * @return {?}
     */
    function (message, politeness) {
        var _this = this;
        if (politeness === void 0) { politeness = 'polite'; }
        this._liveElement.textContent = '';
        // TODO: ensure changing the politeness works on all environments we support.
        this._liveElement.setAttribute('aria-live', politeness);
        // This 100ms timeout is necessary for some browser + screen-reader combinations:
        // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
        // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
        //   second time without clearing and then using a non-zero delay.
        // (using JAWS 17 at time of this writing).
        setTimeout(function () { return _this._liveElement.textContent = message; }, 100);
    };
    /** Removes the aria-live element from the DOM. */
    /**
     * Removes the aria-live element from the DOM.
     * @return {?}
     */
    LiveAnnouncer.prototype._removeLiveElement = /**
     * Removes the aria-live element from the DOM.
     * @return {?}
     */
    function () {
        if (this._liveElement && this._liveElement.parentNode) {
            this._liveElement.parentNode.removeChild(this._liveElement);
        }
    };
    /**
     * @return {?}
     */
    LiveAnnouncer.prototype._createLiveElement = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var liveEl = document.createElement('div');
        liveEl.classList.add('cdk-visually-hidden');
        liveEl.setAttribute('aria-atomic', 'true');
        liveEl.setAttribute('aria-live', 'polite');
        document.body.appendChild(liveEl);
        return liveEl;
    };
    LiveAnnouncer.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LiveAnnouncer.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LIVE_ANNOUNCER_ELEMENT_TOKEN,] }] },
        { type: Platform }
    ]; };
    return LiveAnnouncer;
}());
/**
 * @param {?} parentDispatcher
 * @param {?} liveElement
 * @param {?} platform
 * @return {?}
 */
function LIVE_ANNOUNCER_PROVIDER_FACTORY(parentDispatcher, liveElement, platform) {
    return parentDispatcher || new LiveAnnouncer(liveElement, platform);
}
/** @type {?} */
var LIVE_ANNOUNCER_PROVIDER = {
    // If there is already a LiveAnnouncer available, use that. Otherwise, provide a new one.
    provide: LiveAnnouncer,
    deps: [
        [new Optional(), new SkipSelf(), LiveAnnouncer],
        [new Optional(), new Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN)],
        Platform,
    ],
    useFactory: LIVE_ANNOUNCER_PROVIDER_FACTORY
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var A11yModule = /** @class */ (function () {
    function A11yModule() {
    }
    A11yModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, PlatformModule],
                    declarations: [FocusTrapDirective, FocusTrapDeprecatedDirective],
                    exports: [FocusTrapDirective, FocusTrapDeprecatedDirective],
                    providers: [InteractivityChecker, FocusTrapFactory, LIVE_ANNOUNCER_PROVIDER]
                },] }
    ];
    return A11yModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * The FullscreenOverlayContainer is the alternative to OverlayContainer
 * that supports correct displaying of overlay elements in Fullscreen mode
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
 * It should be provided in the root component that way:
 * providers: [
 *   {provide: OverlayContainer, useClass: FullscreenOverlayContainer}
 * ],
 */
var FullscreenOverlayContainer = /** @class */ (function (_super) {
    __extends(FullscreenOverlayContainer, _super);
    function FullscreenOverlayContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    FullscreenOverlayContainer.prototype._createContainer = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype._createContainer.call(this);
        this._adjustParentForFullscreenChange();
        this._addFullscreenChangeListener(function () { return _this._adjustParentForFullscreenChange(); });
    };
    /**
     * @return {?}
     */
    FullscreenOverlayContainer.prototype._adjustParentForFullscreenChange = /**
     * @return {?}
     */
    function () {
        if (!this._containerElement) {
            return;
        }
        /** @type {?} */
        var fullscreenElement = this.getFullscreenElement();
        /** @type {?} */
        var parent = fullscreenElement || document.body;
        parent.appendChild(this._containerElement);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    FullscreenOverlayContainer.prototype._addFullscreenChangeListener = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        if (document.fullscreenEnabled) {
            document.addEventListener('fullscreenchange', fn);
        }
        else if (document.webkitFullscreenEnabled) {
            document.addEventListener('webkitfullscreenchange', fn);
        }
        else if ((/** @type {?} */ (document)).mozFullScreenEnabled) {
            document.addEventListener('mozfullscreenchange', fn);
        }
        else if ((/** @type {?} */ (document)).msFullscreenEnabled) {
            document.addEventListener('MSFullscreenChange', fn);
        }
    };
    /**
     * When the page is put into fullscreen mode, a specific element is specified.
     * Only that element and its children are visible when in fullscreen mode.
    */
    /**
     * When the page is put into fullscreen mode, a specific element is specified.
     * Only that element and its children are visible when in fullscreen mode.
     * @return {?}
     */
    FullscreenOverlayContainer.prototype.getFullscreenElement = /**
     * When the page is put into fullscreen mode, a specific element is specified.
     * Only that element and its children are visible when in fullscreen mode.
     * @return {?}
     */
    function () {
        return document.fullscreenElement ||
            document.webkitFullscreenElement ||
            (/** @type {?} */ (document)).mozFullScreenElement ||
            (/** @type {?} */ (document)).msFullscreenElement ||
            null;
    };
    FullscreenOverlayContainer.decorators = [
        { type: Injectable }
    ];
    return FullscreenOverlayContainer;
}(OverlayContainer));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GestureConfig = /** @class */ (function (_super) {
    __extends(GestureConfig, _super);
    function GestureConfig() {
        var _this = _super.call(this) || this;
        _this._hammer = typeof window !== 'undefined' ? (/** @type {?} */ (window)).Hammer : null;
        /* List of new event names to add to the gesture support list */
        _this.events = _this._hammer ? [
            'longpress',
            'slide',
            'slidestart',
            'slideend',
            'slideright',
            'slideleft'
        ] : [];
        if (!_this._hammer && isDevMode()) {
            console.warn('Could not find HammerJS. Certain Angular Material ' +
                'components may not work correctly.');
        }
        return _this;
    }
    /**
     * Builds Hammer instance manually to add custom recognizers that match the Material Design spec.
     *
     * Our gesture names come from the Material Design gestures spec:
     * https://www.google.com/design/spec/patterns/gestures.html#gestures-touch-mechanics
     *
     * More information on default recognizers can be found in Hammer docs:
     * http://hammerjs.github.io/recognizer-pan/
     * http://hammerjs.github.io/recognizer-press/
     *
     * @param element Element to which to assign the new HammerJS gestures.
     * @returns Newly-created HammerJS instance.
     */
    /**
     * Builds Hammer instance manually to add custom recognizers that match the Material Design spec.
     *
     * Our gesture names come from the Material Design gestures spec:
     * https://www.google.com/design/spec/patterns/gestures.html#gestures-touch-mechanics
     *
     * More information on default recognizers can be found in Hammer docs:
     * http://hammerjs.github.io/recognizer-pan/
     * http://hammerjs.github.io/recognizer-press/
     *
     * @param {?} element Element to which to assign the new HammerJS gestures.
     * @return {?} Newly-created HammerJS instance.
     */
    GestureConfig.prototype.buildHammer = /**
     * Builds Hammer instance manually to add custom recognizers that match the Material Design spec.
     *
     * Our gesture names come from the Material Design gestures spec:
     * https://www.google.com/design/spec/patterns/gestures.html#gestures-touch-mechanics
     *
     * More information on default recognizers can be found in Hammer docs:
     * http://hammerjs.github.io/recognizer-pan/
     * http://hammerjs.github.io/recognizer-press/
     *
     * @param {?} element Element to which to assign the new HammerJS gestures.
     * @return {?} Newly-created HammerJS instance.
     */
    function (element) {
        /** @type {?} */
        var mc = new this._hammer(element);
        /** @type {?} */
        var pan = new this._hammer.Pan();
        /** @type {?} */
        var swipe = new this._hammer.Swipe();
        /** @type {?} */
        var press = new this._hammer.Press();
        /** @type {?} */
        var slide = this._createRecognizer(pan, { event: 'slide', threshold: 0 }, swipe);
        /** @type {?} */
        var longpress = this._createRecognizer(press, { event: 'longpress', time: 500 });
        // Overwrite the default `pan` event to use the swipe event.
        pan.recognizeWith(swipe);
        // Add customized gestures to Hammer manager
        mc.add([swipe, press, pan, slide, longpress]);
        return /** @type {?} */ (mc);
    };
    /**
     * Creates a new recognizer, without affecting the default recognizers of HammerJS
     * @param {?} base
     * @param {?} options
     * @param {...?} inheritances
     * @return {?}
     */
    GestureConfig.prototype._createRecognizer = /**
     * Creates a new recognizer, without affecting the default recognizers of HammerJS
     * @param {?} base
     * @param {?} options
     * @param {...?} inheritances
     * @return {?}
     */
    function (base, options) {
        var inheritances = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            inheritances[_i - 2] = arguments[_i];
        }
        /** @type {?} */
        var recognizer = new (/** @type {?} */ (base.constructor))(options);
        inheritances.push(base);
        inheritances.forEach(function (item) { return recognizer.recognizeWith(item); });
        return recognizer;
    };
    GestureConfig.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GestureConfig.ctorParameters = function () { return []; };
    return GestureConfig;
}(HammerGestureConfig));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class to be used to power selecting one or more options from a list.
 * \@docs-private
 * @template T
 */
var  /**
 * Class to be used to power selecting one or more options from a list.
 * \@docs-private
 * @template T
 */
SelectionModel = /** @class */ (function () {
    function SelectionModel(_isMulti, initiallySelectedValues, _emitChanges) {
        if (_isMulti === void 0) { _isMulti = false; }
        if (_emitChanges === void 0) { _emitChanges = true; }
        var _this = this;
        this._isMulti = _isMulti;
        this._emitChanges = _emitChanges;
        /**
         * Currently-selected values.
         */
        this._selection = new Set();
        /**
         * Keeps track of the deselected options that haven't been emitted by the change event.
         */
        this._deselectedToEmit = [];
        /**
         * Keeps track of the selected option that haven't been emitted by the change event.
         */
        this._selectedToEmit = [];
        /**
         * Event emitted when the value has changed.
         */
        this.onChange = this._emitChanges ? new Subject() : null;
        if (initiallySelectedValues) {
            if (_isMulti) {
                initiallySelectedValues.forEach(function (value) { return _this._markSelected(value); });
            }
            else {
                this._markSelected(initiallySelectedValues[0]);
            }
            // Clear the array in order to avoid firing the change event for preselected values.
            this._selectedToEmit.length = 0;
        }
    }
    Object.defineProperty(SelectionModel.prototype, "selected", {
        /** Selected value(s). */
        get: /**
         * Selected value(s).
         * @return {?}
         */
        function () {
            if (!this._selected) {
                this._selected = Array.from(this._selection.values());
            }
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Selects a value or an array of values.
     */
    /**
     * Selects a value or an array of values.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype.select = /**
     * Selects a value or an array of values.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._markSelected(value);
        this._emitChangeEvent();
    };
    /**
     * Deselects a value or an array of values.
     */
    /**
     * Deselects a value or an array of values.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype.deselect = /**
     * Deselects a value or an array of values.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._unmarkSelected(value);
        this._emitChangeEvent();
    };
    /**
     * Toggles a value between selected and deselected.
     */
    /**
     * Toggles a value between selected and deselected.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype.toggle = /**
     * Toggles a value between selected and deselected.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.isSelected(value) ? this.deselect(value) : this.select(value);
    };
    /**
     * Clears all of the selected values.
     */
    /**
     * Clears all of the selected values.
     * @return {?}
     */
    SelectionModel.prototype.clear = /**
     * Clears all of the selected values.
     * @return {?}
     */
    function () {
        this._unmarkAll();
        this._emitChangeEvent();
    };
    /**
     * Determines whether a value is selected.
     */
    /**
     * Determines whether a value is selected.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype.isSelected = /**
     * Determines whether a value is selected.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this._selection.has(value);
    };
    /**
     * Determines whether the model does not have a value.
     */
    /**
     * Determines whether the model does not have a value.
     * @return {?}
     */
    SelectionModel.prototype.isEmpty = /**
     * Determines whether the model does not have a value.
     * @return {?}
     */
    function () {
        return this._selection.size === 0;
    };
    /**
     * Determines whether the model has a value.
     */
    /**
     * Determines whether the model has a value.
     * @return {?}
     */
    SelectionModel.prototype.hasValue = /**
     * Determines whether the model has a value.
     * @return {?}
     */
    function () {
        return !this.isEmpty();
    };
    /**
     * Sorts the selected values based on a predicate function.
     */
    /**
     * Sorts the selected values based on a predicate function.
     * @param {?=} predicate
     * @return {?}
     */
    SelectionModel.prototype.sort = /**
     * Sorts the selected values based on a predicate function.
     * @param {?=} predicate
     * @return {?}
     */
    function (predicate) {
        if (this._isMulti && this.selected) {
            this._selected.sort(predicate);
        }
    };
    /**
     * Emits a change event and clears the records of selected and deselected values.
     * @return {?}
     */
    SelectionModel.prototype._emitChangeEvent = /**
     * Emits a change event and clears the records of selected and deselected values.
     * @return {?}
     */
    function () {
        if (this._selectedToEmit.length || this._deselectedToEmit.length) {
            /** @type {?} */
            var eventData = new SelectionChange(this._selectedToEmit, this._deselectedToEmit);
            this.onChange.next(eventData);
            this._deselectedToEmit = [];
            this._selectedToEmit = [];
        }
        this._selected = null;
    };
    /**
     * Selects a value.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype._markSelected = /**
     * Selects a value.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.isSelected(value)) {
            if (!this._isMulti) {
                this._unmarkAll();
            }
            this._selection.add(value);
            if (this._emitChanges) {
                this._selectedToEmit.push(value);
            }
        }
    };
    /**
     * Deselects a value.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype._unmarkSelected = /**
     * Deselects a value.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.isSelected(value)) {
            this._selection.delete(value);
            if (this._emitChanges) {
                this._deselectedToEmit.push(value);
            }
        }
    };
    /**
     * Clears out the selected values.
     * @return {?}
     */
    SelectionModel.prototype._unmarkAll = /**
     * Clears out the selected values.
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.isEmpty()) {
            this._selection.forEach(function (value) { return _this._unmarkSelected(value); });
        }
    };
    return SelectionModel;
}());
/**
 * Describes an event emitted when the value of a MdSelectionModel has changed.
 * \@docs-private
 * @template T
 */
var  /**
 * Describes an event emitted when the value of a MdSelectionModel has changed.
 * \@docs-private
 * @template T
 */
SelectionChange = /** @class */ (function () {
    function SelectionChange(added, removed) {
        this.added = added;
        this.removed = removed;
    }
    return SelectionChange;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Screenreaders will often fire fake mousedown events when a focusable element
 * is activated using the keyboard. We can typically distinguish between these faked
 * mousedown events and real mousedown events using the "buttons" property. While
 * real mousedowns will indicate the mouse button that was pressed (e.g. "1" for
 * the left mouse button), faked mousedowns will usually set the property value to 0.
 * @param {?} event
 * @return {?}
 */
function isFakeMousedownFromScreenReader(event) {
    return event.buttons === 0;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class to coordinate unique selection based on name.
 * Intended to be consumed as an Angular service.
 * This service is needed because native radio change events are only fired on the item currently
 * being selected, and we still need to uncheck the previous selection.
 *
 * This service does not *store* any IDs and names because they may change at any time, so it is
 * less error-prone if they are simply passed through when the events occur.
 */
var UniqueSelectionDispatcher = /** @class */ (function () {
    function UniqueSelectionDispatcher() {
        this._listeners = [];
    }
    /**
     * Notify other items that selection for the given name has been set.
     * @param id ID of the item.
     * @param name Name of the item.
     */
    /**
     * Notify other items that selection for the given name has been set.
     * @param {?} id ID of the item.
     * @param {?} name Name of the item.
     * @return {?}
     */
    UniqueSelectionDispatcher.prototype.notify = /**
     * Notify other items that selection for the given name has been set.
     * @param {?} id ID of the item.
     * @param {?} name Name of the item.
     * @return {?}
     */
    function (id, name) {
        var e_1, _a;
        try {
            for (var _b = __values(this._listeners), _c = _b.next(); !_c.done; _c = _b.next()) {
                var listener = _c.value;
                listener(id, name);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /** Listen for future changes to item selection. */
    /**
     * Listen for future changes to item selection.
     * @param {?} listener
     * @return {?}
     */
    UniqueSelectionDispatcher.prototype.listen = /**
     * Listen for future changes to item selection.
     * @param {?} listener
     * @return {?}
     */
    function (listener) {
        this._listeners.push(listener);
    };
    UniqueSelectionDispatcher.decorators = [
        { type: Injectable }
    ];
    return UniqueSelectionDispatcher;
}());
/**
 * @param {?} parentDispatcher
 * @return {?}
 */
function UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY(parentDispatcher) {
    return parentDispatcher || new UniqueSelectionDispatcher();
}
/** @type {?} */
var UNIQUE_SELECTION_DISPATCHER_PROVIDER = {
    // If there is already a dispatcher available, use that. Otherwise, provide a new one.
    provide: UniqueSelectionDispatcher,
    deps: [[new Optional(), new SkipSelf(), UniqueSelectionDispatcher]],
    useFactory: UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var TOUCH_BUFFER_MS = 650;
/**
 * Monitors mouse and keyboard events to determine the cause of focus events.
 */
var FocusOriginMonitor = /** @class */ (function () {
    function FocusOriginMonitor(_ngZone, _platform) {
        var _this = this;
        this._ngZone = _ngZone;
        this._platform = _platform;
        /**
         * The focus origin that the next focus event is a result of.
         */
        this._origin = null;
        /**
         * Whether the window has just been focused.
         */
        this._windowFocused = false;
        /**
         * Weak map of elements being monitored to their info.
         */
        this._elementInfo = new WeakMap();
        this._ngZone.runOutsideAngular(function () { return _this._registerDocumentEvents(); });
    }
    /**
     * Monitors focus on an element and applies appropriate CSS classes.
     * @param element The element to monitor
     * @param renderer The renderer to use to apply CSS classes to the element.
     * @param checkChildren Whether to count the element as focused when its children are focused.
     * @returns An observable that emits when the focus state of the element changes.
     *     When the element is blurred, null will be emitted.
     */
    /**
     * Monitors focus on an element and applies appropriate CSS classes.
     * @param {?} element The element to monitor
     * @param {?} renderer The renderer to use to apply CSS classes to the element.
     * @param {?} checkChildren Whether to count the element as focused when its children are focused.
     * @return {?} An observable that emits when the focus state of the element changes.
     *     When the element is blurred, null will be emitted.
     */
    FocusOriginMonitor.prototype.monitor = /**
     * Monitors focus on an element and applies appropriate CSS classes.
     * @param {?} element The element to monitor
     * @param {?} renderer The renderer to use to apply CSS classes to the element.
     * @param {?} checkChildren Whether to count the element as focused when its children are focused.
     * @return {?} An observable that emits when the focus state of the element changes.
     *     When the element is blurred, null will be emitted.
     */
    function (element, renderer, checkChildren) {
        var _this = this;
        // Do nothing if we're not on the browser platform.
        if (!this._platform.isBrowser) {
            return of();
        }
        // Check if we're already monitoring this element.
        if (this._elementInfo.has(element)) {
            /** @type {?} */
            var info_1 = this._elementInfo.get(element);
            info_1.checkChildren = checkChildren;
            return info_1.subject.asObservable();
        }
        /** @type {?} */
        var info = {
            unlisten: null,
            checkChildren: checkChildren,
            renderer: renderer,
            subject: new Subject()
        };
        this._elementInfo.set(element, info);
        /** @type {?} */
        var focusListener = function (event) { return _this._onFocus(event, element); };
        /** @type {?} */
        var blurListener = function (event) { return _this._onBlur(event, element); };
        this._ngZone.runOutsideAngular(function () {
            element.addEventListener('focus', focusListener, true);
            element.addEventListener('blur', blurListener, true);
        });
        // Create an unlisten function for later.
        info.unlisten = function () {
            element.removeEventListener('focus', focusListener, true);
            element.removeEventListener('blur', blurListener, true);
        };
        return info.subject.asObservable();
    };
    /**
     * Stops monitoring an element and removes all focus classes.
     * @param element The element to stop monitoring.
     */
    /**
     * Stops monitoring an element and removes all focus classes.
     * @param {?} element The element to stop monitoring.
     * @return {?}
     */
    FocusOriginMonitor.prototype.stopMonitoring = /**
     * Stops monitoring an element and removes all focus classes.
     * @param {?} element The element to stop monitoring.
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var elementInfo = this._elementInfo.get(element);
        if (elementInfo) {
            elementInfo.unlisten();
            elementInfo.subject.complete();
            this._setClasses(element, null);
            this._elementInfo.delete(element);
        }
    };
    /**
     * Focuses the element via the specified focus origin.
     * @param element The element to focus.
     * @param origin The focus origin.
     */
    /**
     * Focuses the element via the specified focus origin.
     * @param {?} element The element to focus.
     * @param {?} origin The focus origin.
     * @return {?}
     */
    FocusOriginMonitor.prototype.focusVia = /**
     * Focuses the element via the specified focus origin.
     * @param {?} element The element to focus.
     * @param {?} origin The focus origin.
     * @return {?}
     */
    function (element, origin) {
        this._setOriginForCurrentEventQueue(origin);
        element.focus();
    };
    /**
     * Register necessary event listeners on the document and window.
     * @return {?}
     */
    FocusOriginMonitor.prototype._registerDocumentEvents = /**
     * Register necessary event listeners on the document and window.
     * @return {?}
     */
    function () {
        var _this = this;
        // Do nothing if we're not on the browser platform.
        if (!this._platform.isBrowser) {
            return;
        }
        // Note: we listen to events in the capture phase so we can detect them even if the user stops
        // propagation.
        // On keydown record the origin and clear any touch event that may be in progress.
        document.addEventListener('keydown', function () {
            _this._lastTouchTarget = null;
            _this._setOriginForCurrentEventQueue('keyboard');
        }, true);
        // On mousedown record the origin only if there is not touch target, since a mousedown can
        // happen as a result of a touch event.
        document.addEventListener('mousedown', function () {
            if (!_this._lastTouchTarget) {
                _this._setOriginForCurrentEventQueue('mouse');
            }
        }, true);
        // When the touchstart event fires the focus event is not yet in the event queue. This means
        // we can't rely on the trick used above (setting timeout of 0ms). Instead we wait 650ms to
        // see if a focus happens.
        document.addEventListener('touchstart', function (event) {
            if (_this._touchTimeout != null) {
                clearTimeout(_this._touchTimeout);
            }
            _this._lastTouchTarget = event.target;
            _this._touchTimeout = setTimeout(function () { return _this._lastTouchTarget = null; }, TOUCH_BUFFER_MS);
        }, true);
        // Make a note of when the window regains focus, so we can restore the origin info for the
        // focused element.
        window.addEventListener('focus', function () {
            _this._windowFocused = true;
            setTimeout(function () { return _this._windowFocused = false; }, 0);
        });
    };
    /**
     * Sets the focus classes on the element based on the given focus origin.
     * @param {?} element The element to update the classes on.
     * @param {?} origin The focus origin.
     * @return {?}
     */
    FocusOriginMonitor.prototype._setClasses = /**
     * Sets the focus classes on the element based on the given focus origin.
     * @param {?} element The element to update the classes on.
     * @param {?} origin The focus origin.
     * @return {?}
     */
    function (element, origin) {
        /** @type {?} */
        var renderer = this._elementInfo.get(element).renderer;
        /** @type {?} */
        var toggleClass = function (className, shouldSet) {
            shouldSet ? renderer.addClass(element, className) : renderer.removeClass(element, className);
        };
        toggleClass('cdk-focused', !!origin);
        toggleClass('cdk-touch-focused', origin === 'touch');
        toggleClass('cdk-keyboard-focused', origin === 'keyboard');
        toggleClass('cdk-mouse-focused', origin === 'mouse');
        toggleClass('cdk-program-focused', origin === 'program');
    };
    /**
     * Sets the origin and schedules an async function to clear it at the end of the event queue.
     * @param {?} origin The origin to set.
     * @return {?}
     */
    FocusOriginMonitor.prototype._setOriginForCurrentEventQueue = /**
     * Sets the origin and schedules an async function to clear it at the end of the event queue.
     * @param {?} origin The origin to set.
     * @return {?}
     */
    function (origin) {
        var _this = this;
        this._origin = origin;
        setTimeout(function () { return _this._origin = null; }, 0);
    };
    /**
     * Checks whether the given focus event was caused by a touchstart event.
     * @param {?} event The focus event to check.
     * @return {?} Whether the event was caused by a touch.
     */
    FocusOriginMonitor.prototype._wasCausedByTouch = /**
     * Checks whether the given focus event was caused by a touchstart event.
     * @param {?} event The focus event to check.
     * @return {?} Whether the event was caused by a touch.
     */
    function (event) {
        /** @type {?} */
        var focusTarget = event.target;
        return this._lastTouchTarget instanceof Node && focusTarget instanceof Node &&
            (focusTarget === this._lastTouchTarget || focusTarget.contains(this._lastTouchTarget));
    };
    /**
     * Handles focus events on a registered element.
     * @param {?} event The focus event.
     * @param {?} element The monitored element.
     * @return {?}
     */
    FocusOriginMonitor.prototype._onFocus = /**
     * Handles focus events on a registered element.
     * @param {?} event The focus event.
     * @param {?} element The monitored element.
     * @return {?}
     */
    function (event, element) {
        // NOTE(mmalerba): We currently set the classes based on the focus origin of the most recent
        // focus event affecting the monitored element. If we want to use the origin of the first event
        // instead we should check for the cdk-focused class here and return if the element already has
        // it. (This only matters for elements that have includesChildren = true).
        // If we are not counting child-element-focus as focused, make sure that the event target is the
        // monitored element itself.
        if (!this._elementInfo.get(element).checkChildren && element !== event.target) {
            return;
        }
        // If we couldn't detect a cause for the focus event, it's due to one of three reasons:
        // 1) The window has just regained focus, in which case we want to restore the focused state of
        //    the element from before the window blurred.
        // 2) It was caused by a touch event, in which case we mark the origin as 'touch'.
        // 3) The element was programmatically focused, in which case we should mark the origin as
        //    'program'.
        if (!this._origin) {
            if (this._windowFocused && this._lastFocusOrigin) {
                this._origin = this._lastFocusOrigin;
            }
            else if (this._wasCausedByTouch(event)) {
                this._origin = 'touch';
            }
            else {
                this._origin = 'program';
            }
        }
        this._setClasses(element, this._origin);
        this._elementInfo.get(element).subject.next(this._origin);
        this._lastFocusOrigin = this._origin;
        this._origin = null;
    };
    /**
     * Handles blur events on a registered element.
     * @param {?} event The blur event.
     * @param {?} element The monitored element.
     * @return {?}
     */
    FocusOriginMonitor.prototype._onBlur = /**
     * Handles blur events on a registered element.
     * @param {?} event The blur event.
     * @param {?} element The monitored element.
     * @return {?}
     */
    function (event, element) {
        // If we are counting child-element-focus as focused, make sure that we aren't just blurring in
        // order to focus another child of the monitored element.
        if (this._elementInfo.get(element).checkChildren && event.relatedTarget instanceof Node &&
            element.contains(event.relatedTarget)) {
            return;
        }
        this._setClasses(element, null);
        this._elementInfo.get(element).subject.next(null);
    };
    FocusOriginMonitor.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FocusOriginMonitor.ctorParameters = function () { return [
        { type: NgZone },
        { type: Platform }
    ]; };
    return FocusOriginMonitor;
}());
/**
 * Directive that determines how a particular element was focused (via keyboard, mouse, touch, or
 * programmatically) and adds corresponding classes to the element.
 *
 * There are two variants of this directive:
 * 1) cdkMonitorElementFocus: does not consider an element to be focused if one of its children is
 *    focused.
 * 2) cdkMonitorSubtreeFocus: considers an element focused if it or any of its children are focused.
 */
var CdkMonitorFocus = /** @class */ (function () {
    function CdkMonitorFocus(_elementRef, _focusOriginMonitor, renderer) {
        var _this = this;
        this._elementRef = _elementRef;
        this._focusOriginMonitor = _focusOriginMonitor;
        this.cdkFocusChange = new EventEmitter();
        this._focusOriginMonitor.monitor(this._elementRef.nativeElement, renderer, this._elementRef.nativeElement.hasAttribute('cdkMonitorSubtreeFocus'))
            .subscribe(function (origin) { return _this.cdkFocusChange.emit(origin); });
    }
    /**
     * @return {?}
     */
    CdkMonitorFocus.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._focusOriginMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    CdkMonitorFocus.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]',
                },] }
    ];
    /** @nocollapse */
    CdkMonitorFocus.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusOriginMonitor },
        { type: Renderer2 }
    ]; };
    CdkMonitorFocus.propDecorators = {
        cdkFocusChange: [{ type: Output }]
    };
    return CdkMonitorFocus;
}());
/**
 * @param {?} parentDispatcher
 * @param {?} ngZone
 * @param {?} platform
 * @return {?}
 */
function FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY(parentDispatcher, ngZone, platform) {
    return parentDispatcher || new FocusOriginMonitor(ngZone, platform);
}
/** @type {?} */
var FOCUS_ORIGIN_MONITOR_PROVIDER = {
    // If there is already a FocusOriginMonitor available, use that. Otherwise, provide a new one.
    provide: FocusOriginMonitor,
    deps: [[new Optional(), new SkipSelf(), FocusOriginMonitor], NgZone, Platform],
    useFactory: FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Applies a CSS transform to an element, including browser-prefixed properties.
 * @param {?} element
 * @param {?} transformValue
 * @return {?}
 */
function applyCssTransform(element, transformValue) {
    /** @type {?} */
    var value = transformValue.trim();
    element.style.transform = value;
    element.style.webkitTransform = value;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var StyleModule = /** @class */ (function () {
    function StyleModule() {
    }
    StyleModule.decorators = [
        { type: NgModule, args: [{
                    imports: [PlatformModule],
                    declarations: [CdkMonitorFocus],
                    exports: [CdkMonitorFocus],
                    providers: [FOCUS_ORIGIN_MONITOR_PROVIDER],
                },] }
    ];
    return StyleModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * \@docs-private
 */
var AnimationCurves = /** @class */ (function () {
    function AnimationCurves() {
    }
    AnimationCurves.STANDARD_CURVE = 'cubic-bezier(0.4,0.0,0.2,1)';
    AnimationCurves.DECELERATION_CURVE = 'cubic-bezier(0.0,0.0,0.2,1)';
    AnimationCurves.ACCELERATION_CURVE = 'cubic-bezier(0.4,0.0,1,1)';
    AnimationCurves.SHARP_CURVE = 'cubic-bezier(0.4,0.0,0.6,1)';
    return AnimationCurves;
}());
/**
 * \@docs-private
 */
var AnimationDurations = /** @class */ (function () {
    function AnimationDurations() {
    }
    AnimationDurations.COMPLEX = '375ms';
    AnimationDurations.ENTERING = '225ms';
    AnimationDurations.EXITING = '195ms';
    return AnimationDurations;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Coerces a data-bound value (typically a string) to a number.
 * @param {?} value
 * @param {?=} fallbackValue
 * @return {?}
 */
function coerceNumberProperty(value, fallbackValue) {
    if (fallbackValue === void 0) { fallbackValue = 0; }
    // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
    // and other non-number values as NaN, where Number just uses 0) but it considers the string
    // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
    return isNaN(parseFloat(/** @type {?} */ (value))) || isNaN(Number(value)) ? fallbackValue : Number(value);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
 * @abstract
 * @template D
 */
var  /**
 * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
 * @abstract
 * @template D
 */
DateAdapter = /** @class */ (function () {
    function DateAdapter() {
    }
    /**
     * Sets the locale used for all dates.
     * @param locale The new locale.
     */
    /**
     * Sets the locale used for all dates.
     * @param {?} locale The new locale.
     * @return {?}
     */
    DateAdapter.prototype.setLocale = /**
     * Sets the locale used for all dates.
     * @param {?} locale The new locale.
     * @return {?}
     */
    function (locale) {
        this.locale = locale;
    };
    /**
     * Compares two dates.
     * @param first The first date to compare.
     * @param second The second date to compare.
     * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    DateAdapter.prototype.compareDate = /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    function (first$$1, second) {
        return this.getYear(first$$1) - this.getYear(second) ||
            this.getMonth(first$$1) - this.getMonth(second) ||
            this.getDate(first$$1) - this.getDate(second);
    };
    /**
     * Checks if two dates are equal.
     * @param first The first date to check.
     * @param second The second date to check.
     * @returns Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    DateAdapter.prototype.sameDate = /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    function (first$$1, second) {
        return first$$1 && second ? !this.compareDate(first$$1, second) : first$$1 == second;
    };
    /**
     * Clamp the given date between min and max dates.
     * @param date The date to clamp.
     * @param min The minimum value to allow. If null or omitted no min is enforced.
     * @param max The maximum value to allow. If null or omitted no max is enforced.
     * @returns `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    /**
     * Clamp the given date between min and max dates.
     * @param {?} date The date to clamp.
     * @param {?=} min The minimum value to allow. If null or omitted no min is enforced.
     * @param {?=} max The maximum value to allow. If null or omitted no max is enforced.
     * @return {?} `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    DateAdapter.prototype.clampDate = /**
     * Clamp the given date between min and max dates.
     * @param {?} date The date to clamp.
     * @param {?=} min The minimum value to allow. If null or omitted no min is enforced.
     * @param {?=} max The maximum value to allow. If null or omitted no max is enforced.
     * @return {?} `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    function (date, min, max) {
        if (min && this.compareDate(date, min) < 0) {
            return min;
        }
        if (max && this.compareDate(date, max) > 0) {
            return max;
        }
        return date;
    };
    return DateAdapter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Whether the browser supports the Intl API.
  @type {?} */
var SUPPORTS_INTL_API = typeof Intl != 'undefined';
/** *
 * The default month names to use if Intl API is not available.
  @type {?} */
var DEFAULT_MONTH_NAMES = {
    'long': [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'
    ],
    'short': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    'narrow': ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
};
var ɵ0 = function (i) { return String(i + 1); };
/** *
 * The default date names to use if Intl API is not available.
  @type {?} */
var DEFAULT_DATE_NAMES = range(31, ɵ0);
/** *
 * The default day of the week names to use if Intl API is not available.
  @type {?} */
var DEFAULT_DAY_OF_WEEK_NAMES = {
    'long': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    'short': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'narrow': ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};
/**
 * Creates an array and fills it with values.
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    /** @type {?} */
    var valuesArray = Array(length);
    for (var i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
/**
 * Adapts the native JS Date for use with cdk-based components that work with dates.
 */
var  /**
 * Adapts the native JS Date for use with cdk-based components that work with dates.
 */
NativeDateAdapter = /** @class */ (function (_super) {
    __extends(NativeDateAdapter, _super);
    function NativeDateAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getYear = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getFullYear();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getMonth();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getDate();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getDayOfWeek = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getDay();
    };
    /**
     * @param {?} style
     * @return {?}
     */
    NativeDateAdapter.prototype.getMonthNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style$$1) {
        var _this = this;
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf_1 = new Intl.DateTimeFormat(this.locale, { month: style$$1 });
            return range(12, function (i) { return _this._stripDirectionalityCharacters(dtf_1.format(new Date(2017, i, 1))); });
        }
        return DEFAULT_MONTH_NAMES[style$$1];
    };
    /**
     * @return {?}
     */
    NativeDateAdapter.prototype.getDateNames = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf_2 = new Intl.DateTimeFormat(this.locale, { day: 'numeric' });
            return range(31, function (i) { return _this._stripDirectionalityCharacters(dtf_2.format(new Date(2017, 0, i + 1))); });
        }
        return DEFAULT_DATE_NAMES;
    };
    /**
     * @param {?} style
     * @return {?}
     */
    NativeDateAdapter.prototype.getDayOfWeekNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style$$1) {
        var _this = this;
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf_3 = new Intl.DateTimeFormat(this.locale, { weekday: style$$1 });
            return range(7, function (i) { return _this._stripDirectionalityCharacters(dtf_3.format(new Date(2017, 0, i + 1))); });
        }
        return DEFAULT_DAY_OF_WEEK_NAMES[style$$1];
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getYearName = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric' });
            return this._stripDirectionalityCharacters(dtf.format(date));
        }
        return String(this.getYear(date));
    };
    /**
     * @return {?}
     */
    NativeDateAdapter.prototype.getFirstDayOfWeek = /**
     * @return {?}
     */
    function () {
        // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
        return 0;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getNumDaysInMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.clone = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date));
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.createDate = /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    function (year, month, date) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11 || date < 1) {
            return null;
        }
        /** @type {?} */
        var result = this._createDateWithOverflow(year, month, date);
        // Check that the date wasn't above the upper bound for the month, causing the month to
        // overflow.
        if (result.getMonth() != month) {
            return null;
        }
        return result;
    };
    /**
     * @return {?}
     */
    NativeDateAdapter.prototype.today = /**
     * @return {?}
     */
    function () {
        return new Date();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NativeDateAdapter.prototype.parse = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var timestamp = typeof value == 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    };
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    NativeDateAdapter.prototype.format = /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    function (date, displayFormat) {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
            return this._stripDirectionalityCharacters(dtf.format(date));
        }
        return this._stripDirectionalityCharacters(date.toDateString());
    };
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    NativeDateAdapter.prototype.addCalendarYears = /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    function (date, years) {
        return this.addCalendarMonths(date, years * 12);
    };
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    NativeDateAdapter.prototype.addCalendarMonths = /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    function (date, months) {
        /** @type {?} */
        var newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date));
        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
        // guarantee this.
        if (this.getMonth(newDate) != ((this.getMonth(date) + months) % 12 + 12) % 12) {
            newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0);
        }
        return newDate;
    };
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    NativeDateAdapter.prototype.addCalendarDays = /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    function (date, days) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype.getISODateString = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return [
            date.getUTCFullYear(),
            this._2digit(date.getUTCMonth() + 1),
            this._2digit(date.getUTCDate())
        ].join('-');
    };
    /**
     * Creates a date but allows the month and date to overflow.
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    NativeDateAdapter.prototype._createDateWithOverflow = /**
     * Creates a date but allows the month and date to overflow.
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    function (year, month, date) {
        /** @type {?} */
        var result = new Date(year, month, date);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    };
    /**
     * Pads a number to make it two digits.
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    NativeDateAdapter.prototype._2digit = /**
     * Pads a number to make it two digits.
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    function (n) {
        return ('00' + n).slice(-2);
    };
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param {?} s The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    NativeDateAdapter.prototype._stripDirectionalityCharacters = /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param {?} s The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    function (s) {
        return s.replace(/[\u200e\u200f]/g, '');
    };
    return NativeDateAdapter;
}(DateAdapter));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var MD_DATE_FORMATS = new InjectionToken('md-date-formats');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var MD_NATIVE_DATE_FORMATS = {
    parse: {
        dateInput: null,
    },
    display: {
        dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NativeDateModule = /** @class */ (function () {
    function NativeDateModule() {
    }
    NativeDateModule.decorators = [
        { type: NgModule, args: [{
                    providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }],
                },] }
    ];
    return NativeDateModule;
}());
var ɵ0$1 = MD_NATIVE_DATE_FORMATS;
var MdNativeDateModule = /** @class */ (function () {
    function MdNativeDateModule() {
    }
    MdNativeDateModule.decorators = [
        { type: NgModule, args: [{
                    imports: [NativeDateModule],
                    providers: [{ provide: MD_DATE_FORMATS, useValue: ɵ0$1 }],
                },] }
    ];
    return MdNativeDateModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * InjectionToken that can be used to specify the global placeholder options.
  @type {?} */
var MD_PLACEHOLDER_GLOBAL_OPTIONS = new InjectionToken('md-placeholder-global-options');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MdCoreModule = /** @class */ (function () {
    function MdCoreModule() {
    }
    MdCoreModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        MdLineModule,
                        RtlModule,
                        MdRippleModule,
                        ObserveContentModule,
                        PortalModule,
                        OverlayModule,
                        A11yModule,
                        MdOptionModule,
                        MdSelectionModule,
                    ],
                    exports: [
                        MdLineModule,
                        RtlModule,
                        MdRippleModule,
                        ObserveContentModule,
                        PortalModule,
                        OverlayModule,
                        A11yModule,
                        MdOptionModule,
                        MdSelectionModule,
                    ],
                },] }
    ];
    return MdCoreModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2Accordion = /** @class */ (function () {
    function Md2Accordion() {
        this.close = new EventEmitter();
        this.open = new EventEmitter();
        this.tabs = [];
    }
    Object.defineProperty(Md2Accordion.prototype, "multiple", {
        get: /**
         * @return {?}
         */
        function () { return this._multiple; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._multiple = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * Add or append tab in accordion
     * @param tab object of Md2AccordionTab
     */
    /**
     * Add or append tab in accordion
     * @param {?} tab object of Md2AccordionTab
     * @return {?}
     */
    Md2Accordion.prototype.addTab = /**
     * Add or append tab in accordion
     * @param {?} tab object of Md2AccordionTab
     * @return {?}
     */
    function (tab) {
        this.tabs.push(tab);
    };
    Md2Accordion.decorators = [
        { type: Component, args: [{
                    selector: 'md2-accordion',
                    template: "<ng-content></ng-content>",
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'md2Accordion',
                    styles: ["md2-accordion{display:block}md2-accordion-tab{position:relative;display:block;outline:0;box-sizing:border-box}md2-accordion-tab[hidden]{display:none}.md2-accordion-header{position:relative;display:block;padding-right:30px;font-weight:500;line-height:40px;text-align:left;color:rgba(0,0,0,.87);cursor:pointer;white-space:nowrap;border-bottom:1px solid rgba(0,0,0,.12);border-radius:0;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}md2-accordion-tab.md2-accordion-tab-active>.md2-accordion-header{border-color:#106cc8;box-shadow:0 1px 0 #106cc8}md2-accordion-tab.md2-accordion-tab-disabled>.md2-accordion-header{pointer-events:none;color:rgba(0,0,0,.26);background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;background-position:0 bottom;border-color:transparent;box-shadow:none;cursor:default}.md2-accordion-header-icon{position:absolute;top:12px;right:8px;width:8px;height:8px;overflow:hidden;display:inline-block;border-width:0 2px 2px 0;border-style:solid;border-color:currentColor;opacity:.64;-webkit-transform:rotate(45deg);transform:rotate(45deg);transition:.3s ease-in-out}md2-accordion-tab.md2-accordion-tab-active>.md2-accordion-header>.md2-accordion-header-icon{-webkit-transform:rotate(225deg);transform:rotate(225deg);top:16px}.md2-accordion-tab-body{position:relative;overflow:hidden}md2-accordion-tab.md2-accordion-tab-active .md2-accordion-tab-body{overflow:visible}.md2-accordion-tab-content{position:relative;padding:20px 0;border-bottom:1px solid rgba(0,0,0,.12)}"]
                }] }
    ];
    Md2Accordion.propDecorators = {
        multiple: [{ type: Input }],
        close: [{ type: Output }],
        open: [{ type: Output }]
    };
    return Md2Accordion;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2AccordionHeader = /** @class */ (function () {
    function Md2AccordionHeader() {
    }
    Md2AccordionHeader.decorators = [
        { type: Directive, args: [{ selector: 'md2-accordion-header' },] }
    ];
    return Md2AccordionHeader;
}());
var Md2AccordionTab = /** @class */ (function () {
    function Md2AccordionTab(_accordion) {
        this._accordion = _accordion;
        this._disabled = false;
        this._active = false;
        this._accordion.addTab(this);
    }
    Object.defineProperty(Md2AccordionTab.prototype, "active", {
        get: /**
         * @return {?}
         */
        function () { return this._active; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._active = coerceBooleanProperty(value);
            if (this._active && !this._accordion.multiple) {
                for (var i = 0; i < this._accordion.tabs.length; i++) {
                    if (this._accordion.tabs[i] !== this) {
                        this._accordion.tabs[i].active = false;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2AccordionTab.prototype, "slide", {
        get: /**
         * @return {?}
         */
        function () {
            return this.active ? 'down' : 'up';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2AccordionTab.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * Toggle the accordion
     * @param event
     * @return if it is disabled
     */
    /**
     * Toggle the accordion
     * @param {?} event
     * @return {?} if it is disabled
     */
    Md2AccordionTab.prototype._handleClick = /**
     * Toggle the accordion
     * @param {?} event
     * @return {?} if it is disabled
     */
    function (event) {
        if (this.disabled) {
            return;
        }
        /** @type {?} */
        var index = this.findTabIndex();
        if (this.active) {
            this.active = !this.active;
            this._accordion.close.emit({ originalEvent: event, index: index });
        }
        else if (!this._accordion.multiple) {
            for (var i = 0; i < this._accordion.tabs.length; i++) {
                this._accordion.tabs[i].active = false;
            }
            this._active = true;
            this._accordion.open.emit({ originalEvent: event, index: index });
        }
        else {
            this._active = true;
            this._accordion.open.emit({ originalEvent: event, index: index });
        }
        event.preventDefault();
    };
    /**
     * Find index of specific tab of accordion
     * @return index number of this tab
     */
    /**
     * Find index of specific tab of accordion
     * @return {?} index number of this tab
     */
    Md2AccordionTab.prototype.findTabIndex = /**
     * Find index of specific tab of accordion
     * @return {?} index number of this tab
     */
    function () {
        /** @type {?} */
        var index = -1;
        for (var i = 0; i < this._accordion.tabs.length; i++) {
            if (this._accordion.tabs[i] === this) {
                index = i;
                break;
            }
        }
        return index;
    };
    Md2AccordionTab.decorators = [
        { type: Component, args: [{
                    selector: 'md2-accordion-tab',
                    template: "\n    <div class=\"md2-accordion-header\" (click)=\"_handleClick($event)\">\n      <span>{{header}}</span>\n      <ng-content select=\"md2-accordion-header\"></ng-content>\n      <span class=\"md2-accordion-header-icon\"></span>\n    </div>\n    <div class=\"md2-accordion-tab-body\" [@slide]=\"slide\">\n      <div class=\"md2-accordion-tab-content\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
                    animations: [
                        trigger('slide', [
                            state('up', style({ height: 0 })),
                            state('down', style({ height: '*' })),
                            transition('down => up', [
                                style({ height: '*' }),
                                animate(300, style({ height: 0 }))
                            ]),
                            transition('up => down', [
                                style({ height: 0 }),
                                animate(300, style({
                                    height: '*'
                                }))
                            ])
                        ])
                    ],
                    host: {
                        'role': 'accordion-tab',
                        '[class.md2-accordion-tab-active]': 'active',
                        '[class.md2-accordion-tab-disabled]': 'disabled'
                    },
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'md2AccordionTab',
                    styles: ["md2-accordion{display:block}md2-accordion-tab{position:relative;display:block;outline:0;box-sizing:border-box}md2-accordion-tab[hidden]{display:none}.md2-accordion-header{position:relative;display:block;padding-right:30px;font-weight:500;line-height:40px;text-align:left;color:rgba(0,0,0,.87);cursor:pointer;white-space:nowrap;border-bottom:1px solid rgba(0,0,0,.12);border-radius:0;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}md2-accordion-tab.md2-accordion-tab-active>.md2-accordion-header{border-color:#106cc8;box-shadow:0 1px 0 #106cc8}md2-accordion-tab.md2-accordion-tab-disabled>.md2-accordion-header{pointer-events:none;color:rgba(0,0,0,.26);background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;background-position:0 bottom;border-color:transparent;box-shadow:none;cursor:default}.md2-accordion-header-icon{position:absolute;top:12px;right:8px;width:8px;height:8px;overflow:hidden;display:inline-block;border-width:0 2px 2px 0;border-style:solid;border-color:currentColor;opacity:.64;-webkit-transform:rotate(45deg);transform:rotate(45deg);transition:.3s ease-in-out}md2-accordion-tab.md2-accordion-tab-active>.md2-accordion-header>.md2-accordion-header-icon{-webkit-transform:rotate(225deg);transform:rotate(225deg);top:16px}.md2-accordion-tab-body{position:relative;overflow:hidden}md2-accordion-tab.md2-accordion-tab-active .md2-accordion-tab-body{overflow:visible}.md2-accordion-tab-content{position:relative;padding:20px 0;border-bottom:1px solid rgba(0,0,0,.12)}"]
                }] }
    ];
    /** @nocollapse */
    Md2AccordionTab.ctorParameters = function () { return [
        { type: Md2Accordion }
    ]; };
    Md2AccordionTab.propDecorators = {
        header: [{ type: Input }],
        active: [{ type: Input }],
        disabled: [{ type: Input }]
    };
    return Md2AccordionTab;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2AccordionModule = /** @class */ (function () {
    function Md2AccordionModule() {
    }
    Md2AccordionModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [Md2Accordion, Md2AccordionTab, Md2AccordionHeader],
                    declarations: [Md2Accordion, Md2AccordionTab, Md2AccordionHeader],
                },] }
    ];
    return Md2AccordionModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var HighlightPipe = /** @class */ (function () {
    function HighlightPipe() {
    }
    /**
     * Transform function
     * @param value string
     * @param query string filter value
     * @return filtered string with markup
     */
    /**
     * Transform function
     * @param {?} value string
     * @param {?} query string filter value
     * @return {?} filtered string with markup
     */
    HighlightPipe.prototype.transform = /**
     * Transform function
     * @param {?} value string
     * @param {?} query string filter value
     * @return {?} filtered string with markup
     */
    function (value, query) {
        if (query.length < 1) {
            return value;
        }
        return query ? value.replace(new RegExp(this._escapeRegexp(query), 'gi'), '<span class="highlight">$&</span>') : value;
    };
    /**
     * filter pipe
     * @param {?} queryToEscape
     * @return {?} queryToEscape with replace string
     */
    HighlightPipe.prototype._escapeRegexp = /**
     * filter pipe
     * @param {?} queryToEscape
     * @return {?} queryToEscape with replace string
     */
    function (queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    };
    HighlightPipe.decorators = [
        { type: Pipe, args: [{ name: 'highlight' },] }
    ];
    return HighlightPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Item = /** @class */ (function () {
    function Item(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
    return Item;
}());
/** @type {?} */
var nextId = 0;
/** @type {?} */
var MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Md2Autocomplete; }),
    multi: true
};
/**
 * Change event object emitted by Md2Autocomplete.
 */
var  /**
 * Change event object emitted by Md2Autocomplete.
 */
Md2AutocompleteChange = /** @class */ (function () {
    function Md2AutocompleteChange() {
    }
    return Md2AutocompleteChange;
}());
var Md2Autocomplete = /** @class */ (function () {
    function Md2Autocomplete(_element) {
        this._element = _element;
        this.change = new EventEmitter();
        this.textChange = new EventEmitter();
        this._value = '';
        this._readonly = false;
        this._required = false;
        this._disabled = false;
        this._isInitialized = false;
        this._onChange = function () { };
        this._onTouched = function () { };
        this._items = [];
        this._list = [];
        this.selectedItem = null;
        this.noBlur = false;
        this._focusedOption = 0;
        this._inputValue = '';
        this._inputFocused = false;
        this.id = 'md2-autocomplete-' + (++nextId);
        this.tabindex = 0;
        this.placeholder = '';
        this.textKey = 'text';
        this.valueKey = null;
        this.minLength = 1;
    }
    /**
     * @return {?}
     */
    Md2Autocomplete.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () { this._isInitialized = true; };
    Object.defineProperty(Md2Autocomplete.prototype, "readonly", {
        get: /**
         * @return {?}
         */
        function () { return this._readonly; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._readonly = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "required", {
        get: /**
         * @return {?}
         */
        function () { return this._required; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "items", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._items = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () { return this._value; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (value !== this._value) {
                this._value = value;
                this._inputValue = '';
                if (value) {
                    /** @type {?} */
                    var selItm = this._items.find(function (i) { return _this.equals(_this.valueKey ?
                        i[_this.valueKey] : i, value); });
                    this.selectedItem = new Item(selItm, this.textKey, this.valueKey);
                    if (this.selectedItem) {
                        this._inputValue = this.selectedItem.text;
                    }
                }
                if (!this._inputValue) {
                    this._inputValue = '';
                }
                if (this._isInitialized) {
                    this._emitChangeEvent();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Compare two vars or objects
     * @param {?} o1 compare first object
     * @param {?} o2 compare second object
     * @return {?} boolean comparation result
     */
    Md2Autocomplete.prototype.equals = /**
     * Compare two vars or objects
     * @param {?} o1 compare first object
     * @param {?} o2 compare second object
     * @return {?} boolean comparation result
     */
    function (o1, o2) {
        if (o1 === o2) {
            return true;
        }
        if (o1 === null || o2 === null) {
            return false;
        }
        if (o1 !== o1 && o2 !== o2) {
            return true;
        }
        /** @type {?} */
        var t1 = typeof o1;
        /** @type {?} */
        var t2 = typeof o2;
        /** @type {?} */
        var key;
        /** @type {?} */
        var keySet;
        if (t1 === t2 && t1 === 'object') {
            keySet = Object.create(null);
            for (key in o1) {
                if (!this.equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && key.charAt(0) !== '$' && o2[key]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    Object.defineProperty(Md2Autocomplete.prototype, "isMenuVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return ((this._inputFocused || this.noBlur) && this._list && this._list.length &&
                !this.selectedItem) && !this.readonly ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * update scroll of suggestion menu
     * @return {?}
     */
    Md2Autocomplete.prototype.updateScroll = /**
     * update scroll of suggestion menu
     * @return {?}
     */
    function () {
        if (this._focusedOption < 0) {
            return;
        }
        /** @type {?} */
        var menuContainer = this._element.nativeElement.querySelector('.md2-autocomplete-menu');
        if (!menuContainer) {
            return;
        }
        /** @type {?} */
        var choices = menuContainer.querySelectorAll('.md2-option');
        if (choices.length < 1) {
            return;
        }
        /** @type {?} */
        var highlighted = choices[this._focusedOption];
        if (!highlighted) {
            return;
        }
        /** @type {?} */
        var top = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
        /** @type {?} */
        var height = menuContainer.offsetHeight;
        if (top > height) {
            menuContainer.scrollTop += top - height;
        }
        else if (top < highlighted.clientHeight) {
            menuContainer.scrollTop -= highlighted.clientHeight - top;
        }
    };
    /**
     * input event listner
     * @param event
     */
    /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    Md2Autocomplete.prototype._handleKeyup = /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.textChange.emit(this._inputValue);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Md2Autocomplete.prototype._handleKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (this.disabled) {
            return;
        }
        switch (event.keyCode) {
            case TAB:
                this._handleMouseLeave();
                break;
            case ESCAPE:
                event.stopPropagation();
                event.preventDefault();
                if (this._inputValue) {
                    this._onClear();
                }
                break;
            case ENTER:
                event.preventDefault();
                event.stopPropagation();
                if (this.isMenuVisible) {
                    this._selectOption(event, this._focusedOption);
                }
                break;
            case DOWN_ARROW:
                event.preventDefault();
                event.stopPropagation();
                if (this.isMenuVisible) {
                    this._focusedOption = (this._focusedOption === this._list.length - 1) ? 0 :
                        Math.min(this._focusedOption + 1, this._list.length - 1);
                    this.updateScroll();
                }
                break;
            case UP_ARROW:
                event.preventDefault();
                event.stopPropagation();
                if (this.isMenuVisible) {
                    this._focusedOption = (this._focusedOption === 0) ? this._list.length - 1 :
                        Math.max(0, this._focusedOption - 1);
                    this.updateScroll();
                }
                break;
            default:
                setTimeout(function () {
                    _this.updateItems();
                }, 10);
        }
    };
    /**
     * select option
     * @param event
     * @param index of selected item
     */
    /**
     * select option
     * @param {?} event
     * @param {?} index of selected item
     * @return {?}
     */
    Md2Autocomplete.prototype._selectOption = /**
     * select option
     * @param {?} event
     * @param {?} index of selected item
     * @return {?}
     */
    function (event, index) {
        event.preventDefault();
        event.stopPropagation();
        this.selectedItem = this._list[index];
        this._inputValue = this._list[index].text;
        this.updateValue();
        this._handleMouseLeave();
    };
    /**
     * clear selected suggestion
     */
    /**
     * clear selected suggestion
     * @return {?}
     */
    Md2Autocomplete.prototype._onClear = /**
     * clear selected suggestion
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        this._inputValue = '';
        this.selectedItem = null;
        this.updateItems();
        this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
        this.updateValue();
    };
    /**
     * update value
     * @return {?}
     */
    Md2Autocomplete.prototype.updateValue = /**
     * update value
     * @return {?}
     */
    function () {
        this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
        this._emitChangeEvent();
        this.onFocus();
    };
    /**
     * component focus listener
     * @return {?}
     */
    Md2Autocomplete.prototype.onFocus = /**
     * component focus listener
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        this._element.nativeElement.querySelector('input').focus();
    };
    /**
     * input focus listener
     */
    /**
     * input focus listener
     * @return {?}
     */
    Md2Autocomplete.prototype._handleFocus = /**
     * input focus listener
     * @return {?}
     */
    function () {
        this._inputFocused = true;
        this.updateItems();
        this._focusedOption = 0;
    };
    /**
     * input blur listener
     */
    /**
     * input blur listener
     * @return {?}
     */
    Md2Autocomplete.prototype._handleBlur = /**
     * input blur listener
     * @return {?}
     */
    function () {
        this._inputFocused = false;
        this._onTouched();
    };
    /**
     * suggestion menu mouse enter listener
     */
    /**
     * suggestion menu mouse enter listener
     * @return {?}
     */
    Md2Autocomplete.prototype._handleMouseEnter = /**
     * suggestion menu mouse enter listener
     * @return {?}
     */
    function () { this.noBlur = true; };
    /**
     * suggestion menu mouse leave listener
     */
    /**
     * suggestion menu mouse leave listener
     * @return {?}
     */
    Md2Autocomplete.prototype._handleMouseLeave = /**
     * suggestion menu mouse leave listener
     * @return {?}
     */
    function () { this.noBlur = false; };
    /**
     * Update suggestion to filter the query
     * @return {?}
     */
    Md2Autocomplete.prototype.updateItems = /**
     * Update suggestion to filter the query
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._inputValue.length < this.minLength) {
            this._list = [];
        }
        else {
            this._list = this._items.map(function (i) { return new Item(i, _this.textKey, _this.valueKey); }).filter(function (i) { return new RegExp(_this._inputValue.trim(), 'ig').test(i.text); });
            if (this._list.length && this._list[0].text !== this._inputValue) {
                this.selectedItem = null;
            }
        }
    };
    /**
     * @return {?}
     */
    Md2Autocomplete.prototype._emitChangeEvent = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var event = new Md2AutocompleteChange();
        event.source = this;
        event.value = this._value;
        this._onChange(event.value);
        this.change.emit(event);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Md2Autocomplete.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (value !== this._value) {
            this._value = value;
            this._inputValue = '';
            if (value) {
                /** @type {?} */
                var selItm = this._items.find(function (i) { return _this.equals(_this.valueKey ?
                    i[_this.valueKey] : i, value); });
                this.selectedItem = new Item(selItm, this.textKey, this.valueKey);
                if (this.selectedItem) {
                    this._inputValue = this.selectedItem.text;
                }
            }
            if (!this._inputValue) {
                this._inputValue = '';
            }
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    Md2Autocomplete.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    Md2Autocomplete.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    Md2Autocomplete.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    Md2Autocomplete.decorators = [
        { type: Component, args: [{
                    selector: 'md2-autocomplete',
                    template: "<div class=\"md2-autocomplete-trigger\" [class.is-focused]=\"_inputFocused || isMenuVisible\">\n  <input [(ngModel)]=\"_inputValue\" type=\"text\" autocomplete=\"off\" [readonly]=\"readonly\" [tabindex]=\"disabled ? -1 : tabindex\" [disabled]=\"disabled\" class=\"md2-autocomplete-input\" (focus)=\"_handleFocus()\" (blur)=\"_handleBlur()\" (keydown)=\"_handleKeydown($event)\" (keyup)=\"_handleKeyup($event)\" (change)=\"$event.stopPropagation()\" />\n  <span class=\"md2-autocomplete-placeholder\" [class.has-value]=\"_inputValue\"> {{ placeholder }} </span>\n  <svg *ngIf=\"_inputValue && !required && !disabled\" (click)=\"_onClear()\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n    <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n  </svg>\n</div>\n<ul *ngIf=\"isMenuVisible\" class=\"md2-autocomplete-menu\" (mouseenter)=\"_handleMouseEnter()\" (mouseleave)=\"_handleMouseLeave()\">\n  <li class=\"md2-option\" *ngFor=\"let l of _list; let i = index;\" [class.focus]=\"_focusedOption === i\" (click)=\"_selectOption($event, i)\">\n    <div class=\"md2-text\" [innerHtml]=\"l.text | highlight:_inputValue\"></div>\n  </li>\n</ul>\n",
                    providers: [MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
                    host: {
                        'role': 'autocomplete',
                        '[id]': 'id',
                        '[attr.aria-label]': 'placeholder',
                        '[attr.aria-required]': 'required.toString()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[class.md2-autocomplete-disabled]': 'disabled',
                    },
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'md2Autocomplete',
                    styles: ["md2-autocomplete{position:relative;display:block;margin:18px 0;outline:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-backface-visibility:hidden;backface-visibility:hidden}md2-autocomplete.md2-autocomplete-disabled{pointer-events:none;cursor:default}.md2-autocomplete-trigger{position:relative;display:block;width:100%;padding:2px 2px 1px;border-bottom:1px solid rgba(0,0,0,.12);box-sizing:border-box;min-width:64px;min-height:26px;cursor:pointer}.md2-autocomplete-trigger.is-focused{padding-bottom:0;border-bottom:2px solid #106cc8}md2-autocomplete.ng-invalid.ng-touched:not(.md2-autocomplete-disabled) .md2-autocomplete-trigger{color:#f44336;border-bottom-color:#f44336}md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-trigger{color:rgba(0,0,0,.38);border-color:transparent;background-image:linear-gradient(to right,rgba(0,0,0,.38) 0,rgba(0,0,0,.38) 33%,transparent 0);background-position:bottom -1px left 0;background-size:4px 1px;background-repeat:repeat-x;cursor:default}md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-trigger.is-focused{padding-bottom:1px;border-bottom:1px solid transparent}.md2-autocomplete-input{width:100%;height:26px;font-size:15px;outline:0;background:0 0;border:0;box-sizing:border-box}md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-input{color:rgba(0,0,0,.38)}.md2-autocomplete-placeholder{position:absolute;right:26px;bottom:100%;left:0;max-width:100%;padding-left:3px;padding-right:0;line-height:1.4;color:rgba(0,0,0,.38);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;pointer-events:none;z-index:1;-webkit-transform:translate3d(0,26px,0) scale(1);transform:translate3d(0,26px,0) scale(1);transition:transform .4s cubic-bezier(.25,.8,.25,1);transition:transform .4s cubic-bezier(.25,.8,.25,1),-webkit-transform .4s cubic-bezier(.25,.8,.25,1);-webkit-transform-origin:left top;transform-origin:left top}[aria-required=true] .md2-autocomplete-placeholder::after{content:'*'}.md2-autocomplete-trigger.is-focused .md2-autocomplete-placeholder{color:#106cc8}.md2-autocomplete-trigger.is-focused .md2-autocomplete-placeholder,md2-autocomplete .md2-autocomplete-placeholder.has-value{-webkit-transform:translate3d(0,6px,0) scale(.75);transform:translate3d(0,6px,0) scale(.75)}.md2-autocomplete-trigger svg{position:absolute;right:0;top:0;display:block;height:100%;background:#fff;fill:currentColor;color:rgba(0,0,0,.54)}.md2-autocomplete-menu{position:absolute;left:0;top:100%;display:block;z-index:10;width:100%;margin:0;padding:8px 0;box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);max-height:256px;min-height:48px;overflow-y:auto;background:#fff}.md2-autocomplete-menu .md2-option{position:relative;display:block;color:#212121;cursor:pointer;width:auto;padding:0 16px;height:48px;line-height:48px;transition:background 150ms linear}.md2-autocomplete-menu .md2-option.focus,.md2-autocomplete-menu .md2-option:hover{background:#ededed}.md2-autocomplete-menu .md2-option .md2-text{width:auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:16px}.md2-autocomplete-menu .highlight{color:#737373}"]
                }] }
    ];
    /** @nocollapse */
    Md2Autocomplete.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    Md2Autocomplete.propDecorators = {
        change: [{ type: Output }],
        textChange: [{ type: Output }],
        id: [{ type: Input }],
        tabindex: [{ type: Input }],
        placeholder: [{ type: Input }],
        textKey: [{ type: Input, args: ['item-text',] }],
        valueKey: [{ type: Input, args: ['item-value',] }],
        minLength: [{ type: Input, args: ['min-length',] }],
        readonly: [{ type: Input }],
        required: [{ type: Input }],
        disabled: [{ type: Input }],
        items: [{ type: Input }],
        value: [{ type: Input }]
    };
    return Md2Autocomplete;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2AutocompleteModule = /** @class */ (function () {
    function Md2AutocompleteModule() {
    }
    Md2AutocompleteModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule],
                    exports: [Md2Autocomplete, HighlightPipe],
                    declarations: [Md2Autocomplete, HighlightPipe],
                },] }
    ];
    return Md2AutocompleteModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Chip = /** @class */ (function () {
    function Chip(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
    return Chip;
}());
/** @type {?} */
var nextId$1 = 0;
/** @type {?} */
var MD2_CHIPS_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Md2Chips; }),
    multi: true
};
/**
 * Change event object emitted by Md2Chips.
 */
var  /**
 * Change event object emitted by Md2Chips.
 */
Md2ChipsChange = /** @class */ (function () {
    function Md2ChipsChange() {
    }
    return Md2ChipsChange;
}());
var Md2Chips = /** @class */ (function () {
    function Md2Chips(elementRef) {
        this.elementRef = elementRef;
        this.tabindex = 0;
        this.addOnComma = true;
        this.addOnEnter = true;
        this.addOnPaste = true;
        this.addOnSpace = false;
        this.allowedPattern = /.+/;
        this.pasteSplitPattern = ',';
        this.placeholder = '';
        this.isAutoComplete = false;
        this.isRemovable = true;
        this.disabled = false;
        this.minChips = 0;
        this.maxChips = 10000;
        this.type = 'text';
        this.id = 'md2-chips-' + (++nextId$1);
        this.autocompleteItemText = 'text';
        this.autocompleteItemValue = 'value';
        this.textKey = 'text';
        this.valueKey = null;
        this.change = new EventEmitter();
        this._onChange = function () { };
        this._onTouched = function () { };
        this.chipItemList = [];
        this.inputValue = '';
        this.selectedChip = -1;
        this.inputFocused = false;
        this.autoCompleteFocued = false;
        this._value = '';
        this.isEmptyAutoComplete = true;
    }
    Object.defineProperty(Md2Chips.prototype, "element", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var elements = { root: this.elementRef.nativeElement, mainDiv: null, template: null };
            elements.mainDiv = elements.root.querySelector('.md2-chips-container');
            elements.template = elements.mainDiv.querySelector('.md2-template');
            return elements;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Chips.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () { return this._value; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.setValue(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Chips.prototype, "setValue", {
        /**
         * set value
         * @param value
         */
        set: /**
         * set value
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._value) {
                this._value = value;
                this.chipItemList = [];
                if (value) {
                    if (value && value.length && Array.isArray(value)) {
                        for (var i = 0; i < value.length; i++) {
                            this.chipItemList.push(new Chip(value[i], this.textKey, this.valueKey));
                        }
                    }
                }
            }
            this._emitChangeEvent();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Md2Chips.prototype.getFocusAutocomplete = /**
     * @return {?}
     */
    function () {
        this._onTouched();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Md2Chips.prototype.changeAutocomplete = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value) {
            this.addNewChip(value.value);
            this.item = null;
        }
    };
    /**
     * @return {?}
     */
    Md2Chips.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var elements = this.element;
        this.splitRegExp = new RegExp(this.pasteSplitPattern);
        if (elements.template) {
            this.templateHtmlString = elements.template.innerHTML;
        }
    };
    // check autocomplete input is empty or not
    /**
     * @param {?} evt
     * @return {?}
     */
    Md2Chips.prototype.valueupdate = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        this.isEmptyAutoComplete = evt ? false : true;
    };
    /**
     * input key listener
     * @param event
     */
    /**
     * input key listener
     * @param {?} event
     * @return {?}
     */
    Md2Chips.prototype.inputChanged = /**
     * input key listener
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var key = event.keyCode;
        switch (key) {
            // back space
            case BACKSPACE:
                this.backspaceEvent();
                break;
            // delete
            case DELETE:
                this.backspaceEvent();
                break;
            // left arrow
            case LEFT_ARROW:
                if (this.isAutoComplete && this.isEmptyAutoComplete) {
                    this.leftArrowKeyEvents();
                }
                else if (!this.isAutoComplete && !this.inputValue) {
                    this.leftArrowKeyEvents();
                }
                break;
            // right arrow
            case RIGHT_ARROW:
                if (this.isAutoComplete && this.isEmptyAutoComplete) {
                    this.rightArrowKeyEvents();
                }
                else if (!this.isAutoComplete && !this.inputValue) {
                    this.rightArrowKeyEvents();
                }
                break;
            // enter
            case ENTER:
                if (this.addOnEnter) {
                    this.addNewChip(this.inputValue);
                    event.preventDefault();
                }
                break;
            // comma
            case COMMA:
                if (this.addOnComma) {
                    this.addNewChip(this.inputValue);
                    event.preventDefault();
                }
                break;
            // space
            case SPACE:
                if (this.addOnSpace) {
                    this.addNewChip(this.inputValue);
                    event.preventDefault();
                }
                break;
            default:
                break;
        }
    };
    /**
     * @return {?}
     */
    Md2Chips.prototype._handleFocus = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        if (!this.isAutoComplete) {
            this.elementRef.nativeElement.querySelector('input.chip-input').focus();
        }
        else {
            this.autoCompleteFocued = true;
            this._onTouched();
        }
        this._resetSelected();
    };
    /**
     * @return {?}
     */
    Md2Chips.prototype.inputBlurred = /**
     * @return {?}
     */
    function () {
        this.inputFocused = false;
        if (this.inputValue) {
            this.addNewChip(this.inputValue);
        }
        this._onTouched();
    };
    /**
     * @return {?}
     */
    Md2Chips.prototype.inputFocus = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        this.inputFocused = true;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Md2Chips.prototype.inputPaste = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var clipboardData = event.clipboardData ||
            (event.originalEvent && event.originalEvent.clipboardData);
        /** @type {?} */
        var pastedString = clipboardData.getData('text/plain').trim();
        this.addNewChip(pastedString);
        setTimeout(function () { return _this._resetInput(); });
    };
    /**
     * @return {?}
     */
    Md2Chips.prototype.leftArrowKeyEvents = /**
     * @return {?}
     */
    function () {
        event.preventDefault();
        if (this.selectedChip) {
            if (this.selectedChip < 0) {
                this.selectedChip = this.chipItemList.length - 1;
            }
            else {
                this.selectedChip = this.selectedChip - 1;
            }
        }
    };
    /**
     * @return {?}
     */
    Md2Chips.prototype.rightArrowKeyEvents = /**
     * @return {?}
     */
    function () {
        event.preventDefault();
        if (this.selectedChip != -1) {
            if (this.selectedChip >= this.chipItemList.length) {
                this.selectedChip = 0;
            }
            else {
                this.selectedChip = this.selectedChip + 1;
            }
        }
    };
    /**
     * @param {?} chipString
     * @return {?}
     */
    Md2Chips.prototype._isValid = /**
     * @param {?} chipString
     * @return {?}
     */
    function (chipString) {
        /** @type {?} */
        var typeString = typeof chipString;
        /** @type {?} */
        var isExist;
        if (typeString === 'string') {
            chipString = chipString.trim();
            isExist = this.chipItemList.filter(function (chip) { return chip.text === chipString; });
        }
        else {
            isExist = this.chipItemList.filter(function (chip) { return chip.text === chipString.text; });
        }
        if (this.chipItemList.indexOf(chipString) === -1 && (isExist.length ? false : true)) {
            return this.allowedPattern.test(chipString);
        }
    };
    /**
     * add new chip
     * @param {?} chips
     * @return {?}
     */
    Md2Chips.prototype.addNewChip = /**
     * add new chip
     * @param {?} chips
     * @return {?}
     */
    function (chips) {
        /** @type {?} */
        var validInput = this._isValid(chips);
        if (validInput) {
            if (this.maxChips && this.maxChips < this.chipItemList.length - 1) {
                return;
            }
            else {
                this.chipItemList.push(new Chip(chips, this.autocompleteItemText, this.autocompleteItemValue));
                this.item = null;
            }
        }
        this._resetSelected();
        this._resetInput();
        this.updateValue();
    };
    /**
   * remove selected chip
   * @param chipIndexToRemove index of selected chip
   */
    /**
     * remove selected chip
     * @param {?} chipIndexToRemove index of selected chip
     * @return {?}
     */
    Md2Chips.prototype.removeSelectedChip = /**
     * remove selected chip
     * @param {?} chipIndexToRemove index of selected chip
     * @return {?}
     */
    function (chipIndexToRemove) {
        this.chipItemList.splice(chipIndexToRemove, 1);
        this._resetSelected();
        this.updateValue();
    };
    /**
     * @return {?}
     */
    Md2Chips.prototype.backspaceEvent = /**
     * @return {?}
     */
    function () {
        if (!this.inputValue.length && this.chipItemList.length &&
            this.isRemovable && this.isEmptyAutoComplete) {
            if (this.selectedChip != -1) {
                this.removeSelectedChip(this.selectedChip);
                this.selectedChip = this.chipItemList.length - 1;
            }
            else {
                this.selectedChip = this.chipItemList.length - 1;
            }
        }
    };
    /**
     * @return {?}
     */
    Md2Chips.prototype._resetSelected = /**
     * @return {?}
     */
    function () {
        this.selectedChip = -1;
    };
    /**
     * @return {?}
     */
    Md2Chips.prototype._resetInput = /**
     * @return {?}
     */
    function () {
        if (this.isAutoComplete) {
            this.chipInputForm.controls['autocomplete'].setValue('');
        }
        else {
            this.chipInputForm.controls['chipInput'].setValue('');
        }
    };
    /**
     * update value
     * @return {?}
     */
    Md2Chips.prototype.updateValue = /**
     * update value
     * @return {?}
     */
    function () {
        var _this = this;
        this._value = new Array();
        this._value = this.chipItemList.map(function (chip) {
            if (_this.valueKey) {
                /** @type {?} */
                var c = {};
                c[_this.textKey] = chip.text;
                c[_this.valueKey] = chip.value;
                return c;
            }
            else {
                return chip.value;
            }
        });
        this._emitChangeEvent();
    };
    /** Emits an event when the user selects a color. */
    /**
     * Emits an event when the user selects a color.
     * @return {?}
     */
    Md2Chips.prototype._emitChangeEvent = /**
     * Emits an event when the user selects a color.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var event = new Md2ChipsChange();
        event.source = this;
        event.value = this._value;
        this._onChange(event.value);
        this.change.emit(event);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Md2Chips.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== this._value) {
            this._value = value;
            this.chipItemList = [];
            if (value) {
                if (value && value.length && Array.isArray(value)) {
                    for (var i = 0; i < value.length; i++) {
                        this.chipItemList.push(new Chip(value[i], this.textKey, this.valueKey));
                    }
                }
            }
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    Md2Chips.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    Md2Chips.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onTouched = fn; };
    Md2Chips.decorators = [
        { type: Component, args: [{
                    selector: 'md2-chips',
                    template: "<div class=\"md2-chips-container\" [class.md2-chip-disabled]=\"disabled\" [class.md2-chip-remove]=\"!isRemovable\">\n  <span *ngFor=\"let chip of chipItemList; let i = index\" class=\"md2-chip\" [class.active]=\"selectedChip === i\">\n    <span>{{chip.text}}</span>\n    <span [innerHTML]=\"templateHtmlString\"></span>\n    <svg (click)=\"removeSelectedChip(i)\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" *ngIf=\"isRemovable\">\n      <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n    </svg>\n  </span>\n  <ng-content select=\".md2-template\"></ng-content>\n  <form #chipInputForm=\"ngForm\" class=\"chip-input-form\">\n    <input *ngIf=\"!isAutoComplete\" class=\"chip-input\" [disabled]=\"disabled\" [type]=\"type\" [(ngModel)]=\"inputValue\" name=\"chipInput\" [placeholder]=\"placeholder\" (paste)=\"inputPaste($event)\" (keydown)=\"inputChanged($event)\" (blur)=\"inputBlurred()\" (focus)=\"inputFocus()\" />\n    <div *ngIf=\"isAutoComplete\">\n      <md2-autocomplete name=\"autocomplete\"\n                        [placeholder]=\"placeholder\"\n                        [disabled]=\"disabled\"\n                        [(ngModel)]=\"item\"\n                        [items]=\"autocompleteDataList\"\n                        [item-text]=\"autocompleteItemText\"\n                        (textChange)=\"valueupdate($event)\"\n                        (change)=\"changeAutocomplete($event)\"\n                        (keydown)=\"inputChanged($event)\"\n                        (click)=\"getFocusAutocomplete()\">\n      </md2-autocomplete>\n    </div>\n  </form>\n</div>\n<div class=\"chip-error\" *ngIf=\"this.chipItemList.length<this.minChips\">Minimum {{minChips}} chip required.</div>\n<div class=\"chip-error\" *ngIf=\"this.chipItemList.length>=this.maxChips\">You are able to add Maximum {{maxChips}} chip.</div>\n",
                    providers: [MD2_CHIPS_CONTROL_VALUE_ACCESSOR],
                    host: {
                        'role': 'chips',
                        '[id]': 'id',
                        '[tabindex]': 'disabled ? -1 : tabindex',
                        '[class.chip-input-focus]': 'inputFocused || selectedChip >= 0',
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: [".template-content{display:inline}md2-chips{outline:0}md2-chips .md2-chips-container{display:block;box-shadow:0 1px #ccc;padding:5px 0;margin-bottom:10px;min-height:50px;box-sizing:border-box;clear:both}md2-chips .md2-chips-container::after{clear:both;content:'';display:table}md2-chips.chip-input-focus .md2-chips-container{box-shadow:0 2px #0d8bff}md2-chips .md2-chip-disabled{cursor:default}md2-chips md2-autocomplete{margin:0}md2-chips .md2-autocomplete-wrap{border-bottom:0!important}.md2-chip-remove .md2-chip{padding:0 12px}.md2-chip{font-size:14px;position:relative;cursor:default;border-radius:16px;display:block;height:32px;line-height:32px;margin:8px 8px 0 0;padding:0 28px 0 12px;float:left;box-sizing:border-box;max-width:100%;background:#e0e0e0;color:#424242;white-space:nowrap;overflow:hidden;-ms-text-overflow:ellipsis;text-overflow:ellipsis}.md2-chip.active{color:#fff;background:#0d8bff}.md2-chip.active svg{color:rgba(255,255,255,.87)}.md2-chip svg{position:absolute;top:4px;right:4px;cursor:pointer;display:inline-block;overflow:hidden;fill:currentColor;color:rgba(0,0,0,.54)}.md2-template{display:none}.chip-input-disabled{pointer-events:none;cursor:default}.chip-input-form{display:inline-block;height:32px;margin:8px 8px 0 0}.chip-remove{cursor:pointer;display:inline-block;padding:0 3px;color:#616161;font-size:30px;vertical-align:top;line-height:21px;font-family:serif}.chip-input{display:inline-block;width:auto;border:0;outline:0;height:32px;line-height:32px;font-size:16px;background:0 0}.chip-error{font-size:13px;color:#fd0f0f}.md2-chips-container .chip-input-form .md2-autocomplete-wrap{border-bottom:0}.md2-chips-container .md2-autocomplete-wrap .md2-autocomplete-placeholder.has-value,.md2-chips-container .md2-autocomplete-wrap svg,.md2-chips-container .md2-autocomplete-wrap.is-focused .md2-autocomplete-placeholder{display:none}.md2-chips-container .md2-autocomplete-wrap .md2-autocomplete-input{height:32px;font-size:16px}"]
                }] }
    ];
    /** @nocollapse */
    Md2Chips.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    Md2Chips.propDecorators = {
        tabindex: [{ type: Input }],
        addOnComma: [{ type: Input }],
        addOnEnter: [{ type: Input }],
        addOnPaste: [{ type: Input }],
        addOnSpace: [{ type: Input }],
        allowedPattern: [{ type: Input }],
        ngModel: [{ type: Input }],
        pasteSplitPattern: [{ type: Input }],
        placeholder: [{ type: Input }],
        autocompleteDataList: [{ type: Input }],
        isAutoComplete: [{ type: Input }],
        isRemovable: [{ type: Input }],
        disabled: [{ type: Input }],
        minChips: [{ type: Input }],
        maxChips: [{ type: Input }],
        type: [{ type: Input }],
        id: [{ type: Input }],
        autocompleteItemText: [{ type: Input, args: ['autocomplete-item-text',] }],
        autocompleteItemValue: [{ type: Input, args: ['autocomplete-item-value',] }],
        textKey: [{ type: Input, args: ['item-text',] }],
        valueKey: [{ type: Input, args: ['item-value',] }],
        change: [{ type: Output }],
        chipInputForm: [{ type: ViewChild, args: ['chipInputForm',] }],
        value: [{ type: Input }],
        _handleFocus: [{ type: HostListener, args: ['focus',] }]
    };
    return Md2Chips;
}());
/** @type {?} */
var MD2_CHIPS_DIRECTIVES = [Md2Chips];
var Md2ChipsModule = /** @class */ (function () {
    function Md2ChipsModule() {
    }
    Md2ChipsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule, Md2AutocompleteModule],
                    declarations: MD2_CHIPS_DIRECTIVES,
                    exports: MD2_CHIPS_DIRECTIVES
                },] }
    ];
    return Md2ChipsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2Collapse = /** @class */ (function () {
    function Md2Collapse() {
        this._collapse = true;
        this._collapsing = false;
        this.collapsed = new EventEmitter();
        this.expanded = new EventEmitter();
    }
    Object.defineProperty(Md2Collapse.prototype, "collapse", {
        get: /**
         * @return {?}
         */
        function () { return this._collapse; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._collapse = value;
            this.toggle();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * toggle collapse
     */
    /**
     * toggle collapse
     * @return {?}
     */
    Md2Collapse.prototype.toggle = /**
     * toggle collapse
     * @return {?}
     */
    function () {
        if (this._collapse) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    /**
    * show collapse
    */
    /**
     * show collapse
     * @return {?}
     */
    Md2Collapse.prototype.show = /**
     * show collapse
     * @return {?}
     */
    function () {
        var _this = this;
        this._collapsing = true;
        this._collapse = true;
        setTimeout(function () {
            _this._collapsing = false;
        }, 4);
        this.expanded.emit();
    };
    /**
     * hide collapse
     */
    /**
     * hide collapse
     * @return {?}
     */
    Md2Collapse.prototype.hide = /**
     * hide collapse
     * @return {?}
     */
    function () {
        var _this = this;
        this._collapsing = true;
        this._collapse = false;
        setTimeout(function () {
            _this._collapsing = false;
        }, 4);
        this.collapsed.emit();
    };
    Md2Collapse.decorators = [
        { type: Directive, args: [{
                    selector: '[collapse]',
                    host: {
                        'role': 'collapse',
                        '[class.in]': '_collapse',
                        '[class.collapse]': 'true',
                        '[class.collapsing]': '_collapsing',
                        '[attr.aria-expanded]': '_collapse',
                        '[attr.aria-hidden]': '!_collapse'
                    },
                    exportAs: 'md2Collapse'
                },] }
    ];
    Md2Collapse.propDecorators = {
        collapsed: [{ type: Output }],
        expanded: [{ type: Output }],
        collapse: [{ type: Input }]
    };
    return Md2Collapse;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2CollapseModule = /** @class */ (function () {
    function Md2CollapseModule() {
    }
    Md2CollapseModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [Md2Collapse],
                    declarations: [Md2Collapse],
                },] }
    ];
    return Md2CollapseModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var COLOR_RGB = /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/;
/** @type {?} */
var COLOR_HSL = /(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/;
var Hsva = /** @class */ (function () {
    function Hsva(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
    return Hsva;
}());
var Hsla = /** @class */ (function () {
    function Hsla(h, s, l, a) {
        this.h = h;
        this.s = s;
        this.l = l;
        this.a = a;
    }
    return Hsla;
}());
var Rgba = /** @class */ (function () {
    function Rgba(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    return Rgba;
}());
var ColorUtil = /** @class */ (function () {
    function ColorUtil() {
    }
    /**
  * hsla to hsva
  * @param hsla
  */
    /**
     * hsla to hsva
     * @param {?} hsla
     * @return {?}
     */
    ColorUtil.prototype.hsla2hsva = /**
     * hsla to hsva
     * @param {?} hsla
     * @return {?}
     */
    function (hsla) {
        /** @type {?} */
        var h = Math.min(hsla.h, 1);
        /** @type {?} */
        var s = Math.min(hsla.s, 1);
        /** @type {?} */
        var l = Math.min(hsla.l, 1);
        /** @type {?} */
        var a = Math.min(hsla.a, 1);
        if (l === 0) {
            return { h: h, s: 0, v: 0, a: a };
        }
        else {
            /** @type {?} */
            var v = l + s * (1 - Math.abs(2 * l - 1)) / 2;
            return { h: h, s: 2 * (v - l) / v, v: v, a: a };
        }
    };
    /**
    * hsva to hsla
    * @param hsva
    */
    /**
     * hsva to hsla
     * @param {?} hsva
     * @return {?}
     */
    ColorUtil.prototype.hsva2hsla = /**
     * hsva to hsla
     * @param {?} hsva
     * @return {?}
     */
    function (hsva) {
        /** @type {?} */
        var h = hsva.h;
        /** @type {?} */
        var s = hsva.s;
        /** @type {?} */
        var v = hsva.v;
        /** @type {?} */
        var a = hsva.a;
        if (v === 0) {
            return new Hsla(h, 0, 0, a);
        }
        else if (s === 0 && v === 1) {
            return new Hsla(h, 1, 1, a);
        }
        else {
            /** @type {?} */
            var l = v * (2 - s) / 2;
            return new Hsla(h, v * s / (1 - Math.abs(2 * l - 1)), l, a);
        }
    };
    /**
     * rgba to hsva
     * @param rgba
     */
    /**
     * rgba to hsva
     * @param {?} rgba
     * @return {?}
     */
    ColorUtil.prototype.rgbaToHsva = /**
     * rgba to hsva
     * @param {?} rgba
     * @return {?}
     */
    function (rgba) {
        /** @type {?} */
        var r = Math.min(rgba.r, 1);
        /** @type {?} */
        var g = Math.min(rgba.g, 1);
        /** @type {?} */
        var b = Math.min(rgba.b, 1);
        /** @type {?} */
        var a = Math.min(rgba.a, 1);
        /** @type {?} */
        var max = Math.max(r, g, b);
        /** @type {?} */
        var min = Math.min(r, g, b);
        /** @type {?} */
        var h;
        /** @type {?} */
        var s;
        /** @type {?} */
        var v = max;
        /** @type {?} */
        var d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max === min) {
            h = 0;
        }
        else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return new Hsva(h, s, v, a);
    };
    /**
     * hsva to rgba
     * @param hsva
     */
    /**
     * hsva to rgba
     * @param {?} hsva
     * @return {?}
     */
    ColorUtil.prototype.hsvaToRgba = /**
     * hsva to rgba
     * @param {?} hsva
     * @return {?}
     */
    function (hsva) {
        /** @type {?} */
        var h = hsva.h;
        /** @type {?} */
        var s = hsva.s;
        /** @type {?} */
        var v = hsva.v;
        /** @type {?} */
        var a = hsva.a;
        /** @type {?} */
        var r;
        /** @type {?} */
        var g;
        /** @type {?} */
        var b;
        /** @type {?} */
        var i = Math.floor(h * 6);
        /** @type {?} */
        var f = h * 6 - i;
        /** @type {?} */
        var p = v * (1 - s);
        /** @type {?} */
        var q = v * (1 - f * s);
        /** @type {?} */
        var t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
        }
        return new Rgba(r, g, b, a);
    };
    /**
     * string to hsva
     * @param colorString
     */
    /**
     * string to hsva
     * @param {?} colorString
     * @return {?}
     */
    ColorUtil.prototype.stringToHsva = /**
     * string to hsva
     * @param {?} colorString
     * @return {?}
     */
    function (colorString) {
        /** @type {?} */
        var stringParsers = [
            {
                re: COLOR_RGB,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[2]) / 255, parseInt(execResult[3]) / 255, parseInt(execResult[4]) / 255, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            },
            {
                re: COLOR_HSL,
                parse: function (execResult) {
                    return new Hsla(parseInt(execResult[2]) / 360, parseInt(execResult[3]) / 100, parseInt(execResult[4]) / 100, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            },
            {
                re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[1], 16) / 255, parseInt(execResult[2], 16) / 255, parseInt(execResult[3], 16) / 255, 1);
                }
            },
            {
                re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[1] + execResult[1], 16) / 255, parseInt(execResult[2] + execResult[2], 16) / 255, parseInt(execResult[3] + execResult[3], 16) / 255, 1);
                }
            }
        ];
        colorString = colorString.toLowerCase();
        /** @type {?} */
        var hsva = null;
        for (var key in stringParsers) {
            if (stringParsers.hasOwnProperty(key)) {
                /** @type {?} */
                var parser = stringParsers[key];
                /** @type {?} */
                var match = parser.re.exec(colorString);
                /** @type {?} */
                var color = match && parser.parse(match);
                if (color) {
                    if (color instanceof Rgba) {
                        hsva = this.rgbaToHsva(color);
                    }
                    else if (color instanceof Hsla) {
                        hsva = this.hsla2hsva(color);
                    }
                    return hsva;
                }
            }
        }
        return hsva;
    };
    /**
     * output formate of color
     * @param hsva
     * @param outputFormat
     */
    /**
     * output formate of color
     * @param {?} hsva
     * @param {?} outputFormat
     * @return {?}
     */
    ColorUtil.prototype.outputFormat = /**
     * output formate of color
     * @param {?} hsva
     * @param {?} outputFormat
     * @return {?}
     */
    function (hsva, outputFormat) {
        if (hsva.a < 1) {
            switch (outputFormat) {
                case 'hsl':
                    /** @type {?} */
                    var hsla = this.hsva2hsla(hsva);
                    /** @type {?} */
                    var hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                    return 'hsla(' + hslaText.h + ',' + hslaText.s + '%,' +
                        hslaText.l + '%,' + hslaText.a + ')';
                default:
                    /** @type {?} */
                    var rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
                    return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b +
                        ',' + Math.round(rgba.a * 100) / 100 + ')';
            }
        }
        else {
            switch (outputFormat) {
                case 'hsl':
                    /** @type {?} */
                    var hsla = this.hsva2hsla(hsva);
                    /** @type {?} */
                    var hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                    return 'hsl(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%)';
                case 'rgb':
                    /** @type {?} */
                    var rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
                    return 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
                default:
                    return this.hexText(this.denormalizeRGBA(this.hsvaToRgba(hsva)));
            }
        }
    };
    /**
     * @param {?} rgba
     * @return {?}
     */
    ColorUtil.prototype.hexText = /**
     * @param {?} rgba
     * @return {?}
     */
    function (rgba) {
        /** @type {?} */
        var mainText = ((1 << 24) | (rgba.r << 16) | (rgba.g << 8) | rgba.b).toString(16);
        /** @type {?} */
        var hexText = '#' + mainText.substr(1);
        return hexText.toLowerCase();
    };
    /**
     * @param {?} rgba
     * @return {?}
     */
    ColorUtil.prototype.denormalizeRGBA = /**
     * @param {?} rgba
     * @return {?}
     */
    function (rgba) {
        return new Rgba(Math.round(rgba.r * 255), Math.round(rgba.g * 255), Math.round(rgba.b * 255), rgba.a);
    };
    ColorUtil.decorators = [
        { type: Injectable }
    ];
    return ColorUtil;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SliderPosition = /** @class */ (function () {
    function SliderPosition(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
    return SliderPosition;
}());
var SliderDimension = /** @class */ (function () {
    function SliderDimension(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
    return SliderDimension;
}());
/** @type {?} */
var nextId$2 = 0;
var TextDirective = /** @class */ (function () {
    function TextDirective() {
        this.newValue = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    TextDirective.prototype.changeInput = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        event.preventDefault();
        /** @type {?} */
        var value = event.target.value;
        if (this.rg === undefined) {
            this.newValue.emit(value);
        }
        else {
            /** @type {?} */
            var numeric = parseFloat(value);
            if (!isNaN(numeric) && numeric >= 0 && numeric <= this.rg) {
                this.newValue.emit({ v: numeric, rg: this.rg });
            }
        }
    };
    TextDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[text]',
                    host: {
                        '(input)': 'changeInput($event)'
                    }
                },] }
    ];
    TextDirective.propDecorators = {
        newValue: [{ type: Output, args: ['newValue',] }],
        text: [{ type: Input, args: ['text',] }],
        rg: [{ type: Input, args: ['rg',] }]
    };
    return TextDirective;
}());
var ColorpickerSliderDirective = /** @class */ (function () {
    function ColorpickerSliderDirective(_element) {
        var _this = this;
        this._element = _element;
        this.change = new EventEmitter();
        this.listenerMove = function (event) { _this.move(event); };
        this.listenerStop = function () { _this.stop(); };
    }
    /**
     * set cursor position
     * @param event
     */
    /**
     * set cursor position
     * @param {?} event
     * @return {?}
     */
    ColorpickerSliderDirective.prototype.setCursor = /**
     * set cursor position
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var height = this._getNativeElement().offsetHeight;
        /** @type {?} */
        var width = this._getNativeElement().offsetWidth;
        /** @type {?} */
        var x = Math.max(0, Math.min(this.getX(event), width));
        /** @type {?} */
        var y = Math.max(0, Math.min(this.getY(event), height));
        if (this.pointX !== undefined && this.pointY !== undefined) {
            this.change.emit({
                s: x / width, v: (1 - y / height),
                pointX: this.pointX, pointY: this.pointY
            });
        }
        else if (this.pointX === undefined && this.pointY !== undefined) {
            this.change.emit({ v: y / height, rg: this.pointY });
        }
        else {
            this.change.emit({ v: x / width, rg: this.pointX });
        }
    };
    /**
     * input event listner
     * @param event
     */
    /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    ColorpickerSliderDirective.prototype.move = /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.setCursor(event);
    };
    /**
     * input event listner
     * @param event
     */
    /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    ColorpickerSliderDirective.prototype.start = /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.setCursor(event);
        document.addEventListener('mousemove', this.listenerMove);
        document.addEventListener('touchmove', this.listenerMove);
        document.addEventListener('mouseup', this.listenerStop);
        document.addEventListener('touchend', this.listenerStop);
    };
    /**
     * stop mouse event
     */
    /**
     * stop mouse event
     * @return {?}
     */
    ColorpickerSliderDirective.prototype.stop = /**
     * stop mouse event
     * @return {?}
     */
    function () {
        document.removeEventListener('mousemove', this.listenerMove);
        document.removeEventListener('touchmove', this.listenerMove);
        document.removeEventListener('mouseup', this.listenerStop);
        document.removeEventListener('touchend', this.listenerStop);
    };
    /**
     * get x
     * @param event
     */
    /**
     * get x
     * @param {?} event
     * @return {?}
     */
    ColorpickerSliderDirective.prototype.getX = /**
     * get x
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var boundingClientRect = this._getNativeElement().getBoundingClientRect();
        return (event.pageX !== undefined ? event.pageX : event.touches[0].pageX) -
            boundingClientRect.left - window.pageXOffset;
    };
    /**
     * get y
     * @param event
     */
    /**
     * get y
     * @param {?} event
     * @return {?}
     */
    ColorpickerSliderDirective.prototype.getY = /**
     * get y
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var boundingClientRect = this._getNativeElement().getBoundingClientRect();
        return (event.pageY !== undefined ? event.pageY : event.touches[0].pageY) -
            boundingClientRect.top - window.pageYOffset;
    };
    /**
     * @return {?}
     */
    ColorpickerSliderDirective.prototype._getNativeElement = /**
     * @return {?}
     */
    function () {
        return this._element.nativeElement;
    };
    ColorpickerSliderDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[colorpicker-slider]',
                    host: {
                        '(mousedown)': 'start($event)',
                        '(touchstart)': 'start($event)'
                    }
                },] }
    ];
    /** @nocollapse */
    ColorpickerSliderDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ColorpickerSliderDirective.propDecorators = {
        slider: [{ type: Input, args: ['colorpicker-slider',] }],
        pointX: [{ type: Input, args: ['point-x',] }],
        pointY: [{ type: Input, args: ['point-y',] }],
        change: [{ type: Output, args: ['change',] }]
    };
    return ColorpickerSliderDirective;
}());
/**
 * Change event object emitted by Md2Colorpicker.
 */
var  /**
 * Change event object emitted by Md2Colorpicker.
 */
Md2ColorChange = /** @class */ (function () {
    function Md2ColorChange(source, color) {
        this.source = source;
        this.color = color;
    }
    return Md2ColorChange;
}());
var Md2Colorpicker = /** @class */ (function () {
    function Md2Colorpicker(_element, _overlay, _viewContainerRef, _renderer, _util, _control) {
        this._element = _element;
        this._overlay = _overlay;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._util = _util;
        this._control = _control;
        this._innerValue = '';
        this.backColor = true;
        this._defalutColor = '#000000';
        /**
         * Whether or not the overlay panel is open.
         */
        this._panelOpen = false;
        this._color = null;
        /**
         * Whether filling out the select is required in the form.
         */
        this._required = false;
        /**
         * Whether the select is disabled.
         */
        this._disabled = false;
        this.isInputFocus = false;
        this._container = 'inline';
        this.isInputValidColor = false;
        this._onChange = function () { };
        this._onTouched = function () { };
        this.cFormat = 'hex';
        this.colorpickerChange = new EventEmitter();
        /**
         * Event emitted when the selected date has been changed by the user.
         */
        this.change = new EventEmitter();
        this.tabindex = 0;
        this.id = 'md2-colorpicker-' + (++nextId$2);
        /**
         * Event emitted when the select has been opened.
         */
        this.onOpen = new EventEmitter();
        /**
         * Event emitted when the select has been closed.
         */
        this.onClose = new EventEmitter();
        this._created = false;
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }
    Object.defineProperty(Md2Colorpicker.prototype, "color", {
        get: /**
         * @return {?}
         */
        function () { return this._color; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._color = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "placeholder", {
        /** Placeholder to be shown if no value has been selected. */
        get: /**
         * Placeholder to be shown if no value has been selected.
         * @return {?}
         */
        function () { return this._placeholder; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._placeholder = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "required", {
        get: /**
         * @return {?}
         */
        function () { return this._required; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "disabled", {
        /** Whether the component is disabled. */
        get: /**
         * Whether the component is disabled.
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._innerValue;
        },
        /**
        * set accessor including call the onchange callback
        */
        set: /**
         * set accessor including call the onchange callback
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this._innerValue) {
                if (v) {
                    this.hsva = this._util.stringToHsva(v);
                }
                this._innerValue = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "container", {
        get: /**
         * @return {?}
         */
        function () { return this._container; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._container !== value) {
                this._container = value || 'inline';
                this.destroyPanel();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "setGradient", {
        get: /**
         * @return {?}
         */
        function () {
            return {
                'background-image': 'linear-gradient(to right, transparent, transparent),' +
                    'linear-gradient(to left, ' + this.hexText + ', rgba(255, 255, 255, 0))'
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Md2Colorpicker.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () { this.destroyPanel(); };
    Object.defineProperty(Md2Colorpicker.prototype, "panelOpen", {
        /** Whether or not the overlay panel is open. */
        get: /**
         * Whether or not the overlay panel is open.
         * @return {?}
         */
        function () {
            return this._panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    /** Toggles the overlay panel open or closed. */
    /**
     * Toggles the overlay panel open or closed.
     * @return {?}
     */
    Md2Colorpicker.prototype.toggle = /**
     * Toggles the overlay panel open or closed.
     * @return {?}
     */
    function () {
        this.panelOpen ? this.close() : this.open();
    };
    /** Opens the overlay panel. */
    /**
     * Opens the overlay panel.
     * @return {?}
     */
    Md2Colorpicker.prototype.open = /**
     * Opens the overlay panel.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var hsva = this._util.stringToHsva(this.color + '');
        this.isInputFocus = true;
        if (hsva) {
            this.hsva = hsva;
        }
        else {
            this.hsva = this._util.stringToHsva(this._defalutColor);
        }
        this.sliderDim = new SliderDimension(245, 250, 130, 245);
        this.slider = new SliderPosition(0, 0, 0, 0);
        if (this.cFormat === 'rgb') {
            this.format = 1;
        }
        else if (this.cFormat === 'hsl') {
            this.format = 2;
        }
        else {
            this.format = 0;
        }
        this.update();
        if (this.disabled) {
            return;
        }
        if (!this._isColorpickerVisible) {
            this._initialColor = this.color;
            this.update();
            this._isColorpickerVisible = true;
        }
        else {
            this._isColorpickerVisible = false;
        }
        this._createOverlay();
        if (!this._portal) {
            this._portal = new TemplatePortal(this._templatePortal, this._viewContainerRef);
        }
        this._overlayRef.attach(this._portal);
        this._subscribeToBackdrop();
        this._panelOpen = true;
        this.onOpen.emit();
    };
    /** Closes the overlay panel and focuses the host element. */
    /**
     * Closes the overlay panel and focuses the host element.
     * @return {?}
     */
    Md2Colorpicker.prototype.close = /**
     * Closes the overlay panel and focuses the host element.
     * @return {?}
     */
    function () {
        this._panelOpen = false;
        this.isInputFocus = false;
        if (this._overlayRef) {
            this._overlayRef.detach();
            this._backdropSubscription.unsubscribe();
        }
        this._isColorpickerVisible = false;
        if (this._innerValue) {
            this.setColorFromString(this._innerValue);
        }
    };
    /** Removes the panel from the DOM. */
    /**
     * Removes the panel from the DOM.
     * @return {?}
     */
    Md2Colorpicker.prototype.destroyPanel = /**
     * Removes the panel from the DOM.
     * @return {?}
     */
    function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._cleanUpSubscriptions();
        }
    };
    /**
     * @return {?}
     */
    Md2Colorpicker.prototype._onBlur = /**
     * @return {?}
     */
    function () {
        if (!this.panelOpen) {
            this._onTouched();
        }
    };
    /**
      * input event listner
      * @param event
      */
    /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    Md2Colorpicker.prototype.changeInput = /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var value = event.target.value;
        this.colorpickerChange.emit(value);
    };
    /**
    * set saturation,lightness,hue,alpha,RGB value
    * @param val
    * @param rg
    */
    /**
     * set saturation,lightness,hue,alpha,RGB value
     * @param {?} val
     * @return {?}
     */
    Md2Colorpicker.prototype.setSaturation = /**
     * set saturation,lightness,hue,alpha,RGB value
     * @param {?} val
     * @return {?}
     */
    function (val) {
        /** @type {?} */
        var hsla = this._util.hsva2hsla(this.hsva);
        hsla.s = val.v / val.rg;
        this.hsva = this._util.hsla2hsva(hsla);
        this.update();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    Md2Colorpicker.prototype.setLightness = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        /** @type {?} */
        var hsla = this._util.hsva2hsla(this.hsva);
        hsla.l = val.v / val.rg;
        this.hsva = this._util.hsla2hsva(hsla);
        this.update();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    Md2Colorpicker.prototype.setHue = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.hsva.h = val.v / val.rg;
        this.update();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    Md2Colorpicker.prototype.setAlpha = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.hsva.a = val.v / val.rg;
        this.update();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    Md2Colorpicker.prototype.setR = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        /** @type {?} */
        var rgba = this._util.hsvaToRgba(this.hsva);
        rgba.r = val.v / val.rg;
        this.hsva = this._util.rgbaToHsva(rgba);
        this.update();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    Md2Colorpicker.prototype.setG = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        /** @type {?} */
        var rgba = this._util.hsvaToRgba(this.hsva);
        rgba.g = val.v / val.rg;
        this.hsva = this._util.rgbaToHsva(rgba);
        this.update();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    Md2Colorpicker.prototype.setB = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        /** @type {?} */
        var rgba = this._util.hsvaToRgba(this.hsva);
        rgba.b = val.v / val.rg;
        this.hsva = this._util.rgbaToHsva(rgba);
        this.update();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    Md2Colorpicker.prototype.setSaturationAndBrightness = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.hsva.s = val.s / val.pointX;
        this.hsva.v = val.v / val.pointY;
        this.update();
    };
    /**
     * @return {?}
     */
    Md2Colorpicker.prototype.clickOk = /**
     * @return {?}
     */
    function () {
        this._isColorpickerVisible = false;
        this.isInputValidColor = false;
        this.color = this._innerValue;
        if (this._innerValue != this._initialColor) {
            this._emitChangeEvent();
        }
        this.close();
    };
    /**
    * deselect recent color and close popup
    */
    /**
     * deselect recent color and close popup
     * @return {?}
     */
    Md2Colorpicker.prototype.cancelColor = /**
     * deselect recent color and close popup
     * @return {?}
     */
    function () {
        this._innerValue = this._initialColor;
        this.close();
    };
    /**
     * @param {?} str
     * @return {?}
     */
    Md2Colorpicker.prototype.isValidColor = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str.match(/^#[a-f0-9]{6}$/i) !== null;
    };
    /**
       * set color
       * @param value
       */
    /**
     * set color
     * @param {?} value
     * @return {?}
     */
    Md2Colorpicker.prototype.setColorFromString = /**
     * set color
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.isValidColor(value)) {
            value = '#000000';
            this.backColor = false;
        }
        /** @type {?} */
        var hsva = this._util.stringToHsva(value);
        if (hsva !== null) {
            this.hsva = hsva;
        }
        this.update();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Md2Colorpicker.prototype.formatPolicy = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.format = value;
        if (this.format === 0 && this.hsva.a < 1) {
            this.format++;
        }
        return this.format;
    };
    /**
     * update color
     */
    /**
     * update color
     * @return {?}
     */
    Md2Colorpicker.prototype.update = /**
     * update color
     * @return {?}
     */
    function () {
        /** @type {?} */
        var hsla = this._util.hsva2hsla(this.hsva);
        /** @type {?} */
        var rgba = this._util.denormalizeRGBA(this._util.hsvaToRgba(this.hsva));
        /** @type {?} */
        var hueRgba = this._util.denormalizeRGBA(this._util.hsvaToRgba(new Hsva(this.hsva.h, 1, 1, 1)));
        this.alphaColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
        this._hueSliderColor = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';
        this.hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
        this.rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
        if (this.backColor) {
            this.hexText = this._util.hexText(rgba);
        }
        this.backColor = true;
        /** @type {?} */
        var colorCode = Math.round((this.rgbaText.r * 299 + this.rgbaText.g * 587 +
            this.rgbaText.b * 114) / 1000);
        if (colorCode >= 128 || this.hsva.a < 0.35) {
            this.fontColor = 'black';
            this._isDark = true;
        }
        else {
            this.fontColor = 'white';
            this._isDark = false;
        }
        if (this.format === 0 && this.hsva.a < 1) {
            this.format++;
        }
        this.outputColor = this._util.outputFormat(this.hsva, this.cFormat);
        this.slider = new SliderPosition((this.hsva.h) * this.sliderDim.h, this.hsva.s * this.sliderDim.s - 7, (1 - this.hsva.v) * this.sliderDim.v - 7, this.hsva.a * this.sliderDim.a);
        this._innerValue = this.outputColor;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Md2Colorpicker.prototype.clearColor = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        this.color = '';
        this._emitChangeEvent();
    };
    /**
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    Md2Colorpicker.prototype.isDescendant = /**
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    function (parent, child) {
        /** @type {?} */
        var node = child.parentNode;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };
    /**
     * @return {?}
     */
    Md2Colorpicker.prototype.checkInputVal = /**
     * @return {?}
     */
    function () {
        this.hsva = this._util.stringToHsva(this.color + '');
        this.isInputFocus = false;
        if (this.hsva) {
            if (this._innerValue !== this.color) {
                this._emitChangeEvent();
            }
            this.isInputValidColor = false;
        }
        else {
            this.isInputValidColor = true;
        }
        this._onTouched();
    };
    /** Emits an event when the user selects a color. */
    /**
     * Emits an event when the user selects a color.
     * @return {?}
     */
    Md2Colorpicker.prototype._emitChangeEvent = /**
     * Emits an event when the user selects a color.
     * @return {?}
     */
    function () {
        this._onChange(this.color);
        this.change.emit(new Md2ColorChange(this, this.color));
        this._innerValue = this.color;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Md2Colorpicker.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._innerValue = value;
        this.color = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    Md2Colorpicker.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    Md2Colorpicker.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    Md2Colorpicker.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @return {?}
     */
    Md2Colorpicker.prototype._subscribeToBackdrop = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._backdropSubscription = this._overlayRef.backdropClick().subscribe(function () {
            _this._innerValue = _this._initialColor;
            _this.close();
        });
    };
    /**
     *  This method creates the overlay from the provided panel's template and saves its
     *  OverlayRef so that it can be attached to the DOM when open is called.
     * @return {?}
     */
    Md2Colorpicker.prototype._createOverlay = /**
     *  This method creates the overlay from the provided panel's template and saves its
     *  OverlayRef so that it can be attached to the DOM when open is called.
     * @return {?}
     */
    function () {
        if (!this._overlayRef) {
            /** @type {?} */
            var config = new OverlayState();
            if (this.container === 'inline') {
                config.positionStrategy = this._createPickerPositionStrategy();
                config.hasBackdrop = true;
                config.backdropClass = 'cdk-overlay-transparent-backdrop';
                config.scrollStrategy = this._overlay.scrollStrategies.reposition();
            }
            else {
                config.positionStrategy = this._overlay.position()
                    .global()
                    .centerHorizontally()
                    .centerVertically();
                config.hasBackdrop = true;
            }
            this._overlayRef = this._overlay.create(config);
        }
    };
    /**
     * Create the popup PositionStrategy.
     * @return {?}
     */
    Md2Colorpicker.prototype._createPickerPositionStrategy = /**
     * Create the popup PositionStrategy.
     * @return {?}
     */
    function () {
        return this._overlay.position()
            .connectedTo(this._element, { originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' })
            .withFallbackPosition({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'top' })
            .withFallbackPosition({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'bottom' })
            .withFallbackPosition({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'bottom' });
    };
    /**
     * @return {?}
     */
    Md2Colorpicker.prototype._cleanUpSubscriptions = /**
     * @return {?}
     */
    function () {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
        if (this._positionSubscription) {
            this._positionSubscription.unsubscribe();
        }
    };
    Md2Colorpicker.decorators = [
        { type: Component, args: [{
                    selector: 'md2-colorpicker',
                    template: "\n<div class=\"md2-colorpicker-trigger\">\n  <div class=\"color-picker-selector\" [class.color-error]=\"isInputValidColor && required\">\n    <div class=\"md2-colorpicker-preview\" (click)=\"toggle()\">\n      <div class=\"color-fill\" [style.background-color]=\"color\"> </div>\n    </div>\n    <div class=\"md2-colorpicker-input\" [class.input-focused]=\"isInputFocus\">\n      <span class=\"md2-colorpicker-placeholder\" [class.has-value]=\"color\">{{ placeholder }}</span>\n      <input class=\"md2-colorpicker-value\" autocomplete=\"off\" value=\"color\" [tabindex]=\"tabindex\" [disabled]=\"disabled\" [(ngModel)]=\"color\" (focus)=\"isInputFocus=true\" (blur)=\"checkInputVal()\" />\n      <span *ngIf=\"color && !required && !disabled\" class=\"color-clear\" (click)=\"clearColor($event)\">\n        <svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\">\n          <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n        </svg>\n      </span>\n    </div>\n  </div>\n</div>\n<ng-template #portal>\n  <div class=\"md2-colorpicker-panel\" tabindex=\"0\" [attr.container]=\"container\">\n    <div class=\"md2-colorpicker-content\">\n      <div class=\"md2-colorpicker-wrapper\">\n        <div class=\"md2-color-picker\">\n          <div class=\"selected-color\">\n            <div class=\"selected-color-bg\" [style.background]=\"outputColor\">\n              <div class=\"color-input\">\n                <div [hidden]=\"format!=2\" class=\"hsla-text\">\n                  <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"360\" [rg]=\"360\" (newValue)=\"setHue($event)\" [value]=\"hslaText.h\" />\n                  <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"100\" [rg]=\"100\" (newValue)=\"setSaturation($event)\" [value]=\"hslaText.s\" />\n                  <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"100\" [rg]=\"100\" (newValue)=\"setLightness($event)\" [value]=\"hslaText.l\" />\n                  <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]+([\\.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\" [rg]=\"1\" (newValue)=\"setAlpha($event)\" [value]=\"hslaText.a\" />\n                </div>\n                <div [hidden]=\"format!=1\" class=\"rgba-text\">\n                  <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setR($event)\" [value]=\"rgbaText.r\" />\n                  <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setG($event)\" [value]=\"rgbaText.g\" />\n                  <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setB($event)\" [value]=\"rgbaText.b\" />\n                  <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]+([\\.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\" [rg]=\"1\" (newValue)=\"setAlpha($event)\" [value]=\"rgbaText.a\" />\n                </div>\n                <div [hidden]=\"format!=0\" class=\"hex-text\">\n                  <input [text] (newValue)=\"setColorFromString($event)\" [style.color]=\"fontColor\" [value]=\"hexText\" />\n                </div>\n              </div>\n              <div class=\"color-bar\" [class.dark]=\"_isDark\">\n                <div [style.color]=\"fontColor\" class=\"clearfix\">\n                  <div class=\"type-policy\" [class.active]=\"format==0\" (click)=\"formatPolicy(0)\">HEX</div>\n                  <div class=\"type-policy\" [class.active]=\"format==1\" (click)=\"formatPolicy(1)\">RGBA</div>\n                  <div class=\"type-policy\" [class.active]=\"format==2\" (click)=\"formatPolicy(2)\">HSLA</div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"input-color-content\">\n            <div [colorpicker-slider] [style.background-color]=\"_hueSliderColor\" [point-x]=\"1\" [point-y]=\"1\" (change)=\"setSaturationAndBrightness($event)\" class=\"saturation-lightness\">\n              <div [style.left.px]=\"slider.s\" [style.top.px]=\"slider.v\" class=\"cursor\"></div>\n            </div>\n            <div [colorpicker-slider] [point-x]=\"1\" (change)=\"setHue($event)\" class=\"hue\">\n              <div [style.left.px]=\"slider.h\" class=\"color-picker-marker\"></div>\n            </div>\n            <div [colorpicker-slider] [point-x]=\"1\" (change)=\"setAlpha($event)\" class=\"alpha\">\n              <div class=\"alpha-main\" [ngStyle]=\"setGradient\">\n                <div [style.left.px]=\"slider.a\" class=\"color-picker-marker\"></div>\n              </div>\n\n            </div>\n          </div>\n          <div class=\"md2-color-picker-actions\">\n            <div class=\"md2-button\" (click)=\"cancelColor()\">Cancel</div>\n            <div class=\"md2-button\" (click)=\"clickOk()\">Ok</div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-template>\n",
                    host: {
                        'role': 'colorpicker',
                        '[id]': 'id',
                        '[class.md2-colorpicker-disabled]': 'disabled',
                        '[attr.aria-label]': 'placeholder',
                        '[attr.aria-required]': 'required.toString()',
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: [".md2-colorpicker-wrapper{border-radius:3px;background-color:#fff;z-index:10;box-shadow:0 2px 6px rgba(0,0,0,.4);overflow:hidden}.md2-colorpicker-panel{outline:0;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.md2-colorpicker-panel[container=dialog]{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.md2-colorpicker-disabled{pointer-events:none;cursor:default}.md2-colorpicker-disabled .color-picker-selector .md2-colorpicker-value{color:rgba(0,0,0,.38);border-color:transparent;background-image:linear-gradient(to right,rgba(0,0,0,.38) 0,rgba(0,0,0,.38) 33%,transparent 0);background-position:bottom -1px left 0;background-size:4px 1px;background-repeat:repeat-x}.md2-colorpicker-input{color:rgba(0,0,0,.38);border-bottom:1px solid rgba(0,0,0,.12);display:flex;justify-content:space-between;align-items:center;height:30px;min-width:180px;line-height:22px;position:relative;box-sizing:border-box}[aria-disabled=true] .md2-colorpicker-input{background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;border-color:transparent;background-position:0 bottom;cursor:default}md2-colorpicker:focus:not(.md2-colorpicker-disabled) .md2-colorpicker-input{color:#106cc8;border-color:#106cc8}md2-colorpicker.ng-invalid.ng-touched:not(.md2-colorpicker-disabled) .md2-colorpicker-input{color:#f44336;border-color:#f44336}.input-focused{color:#106cc8;border-color:#106cc8}.inline-control{width:150px;margin-right:16px;padding:16px 0}.md2-colorpicker-placeholder{position:absolute;right:18px;bottom:100%;left:0;padding:0 2px;-webkit-transform:translate3d(0,26px,0) scale(1);transform:translate3d(0,26px,0) scale(1);-webkit-transform-origin:left top;transform-origin:left top;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;transition:150ms cubic-bezier(.25,.8,.25,1)}[aria-required=true] .md2-colorpicker-placeholder::after{content:'*'}.md2-colorpicker-input.input-focused .md2-colorpicker-placeholder{color:#106cc8}.md2-colorpicker-input.input-focused .md2-colorpicker-placeholder,md2-colorpicker .md2-colorpicker-placeholder.has-value{-webkit-transform:translate3d(0,6px,0) scale(.75);transform:translate3d(0,6px,0) scale(.75)}.color-error .md2-colorpicker-input,.color-error .md2-colorpicker-placeholder{color:#f44336!important;border-color:#f44336}.color-error .color-fill{background-color:transparent!important}.color-picker-selector{display:block;padding:18px 0 4px 46px;white-space:nowrap}.color-picker-selector .md2-colorpicker-preview{position:absolute;top:19px;left:6px;content:'';width:24px;height:24px;overflow:hidden;background-color:#fff;background:linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd),linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd);background-size:8px 8px;background-position:0 0,4px 4px;border:2px solid #fafafa;display:block;fill:#5a5a5a;cursor:pointer;border-radius:50%;vertical-align:middle;box-shadow:0 1px 1px 0 rgba(0,0,0,.2),0 1px 1px 1px rgba(0,0,0,.14),0 1px 1px 1px rgba(0,0,0,.12)}.color-picker-selector .md2-colorpicker-preview .color-fill{width:100%;height:100%}.color-picker-selector .md2-colorpicker-value{font-size:15px;background:0 0;border:0;outline:0;position:relative;display:block;min-width:160px;height:30px;padding:2px 2px 1px;margin:0;line-height:26px;color:rgba(0,0,0,.87);vertical-align:middle;box-sizing:border-box}md2-colorpicker{position:relative;display:block;outline:0}.md2-color-picker{position:relative;display:block;width:266px;outline:0}.md2-color-picker *{box-sizing:border-box}.md2-color-picker .input-color-content{position:relative;padding:8px}.md2-color-picker i{cursor:default;position:relative}.md2-color-picker input{font-size:16px;height:50px;outline:0}.md2-color-picker div.cursor-sv{cursor:default;position:relative;border-radius:50%;width:15px;height:15px;border:1px solid #ddd}.md2-color-picker div.cursor{cursor:crosshair;position:relative;border-radius:50%;width:13px;height:13px;box-shadow:0 0 2px 0 rgba(0,0,0,.5),inset 0 0 2px 0 rgba(0,0,0,.5);border:2px solid #fff}.md2-color-picker div.color-picker-marker{cursor:crosshair;position:relative;border:2px solid #fff;box-shadow:0 0 2px 0 rgba(0,0,0,.5);height:100%;width:5px;border-bottom:0;border-top:0}.md2-color-picker .saturation-lightness{width:100%;height:130px;border-radius:2px;overflow:hidden;background-image:linear-gradient(to top,#000,rgba(0,0,0,0)),linear-gradient(to right,#fff,rgba(255,255,255,0))}.md2-color-picker .saturation-lightness:hover{cursor:crosshair}.md2-color-picker .hue{position:relative;width:100%;height:30px;margin:8px 0;border-radius:2px;background:linear-gradient(to right,red,#ff0,#0f0,#0ff,#00f,#f0f,red)}.md2-color-picker .alpha{position:relative;width:100%;height:30px;border-radius:2px;background:linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd),linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd);background-size:8px 8px;background-position:0 0,4px 4px}.md2-color-picker .alpha .alpha-main{position:absolute;height:100%;opacity:1;background-image:linear-gradient(to left,transparent,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));width:100%}.md2-color-picker .selected-color{position:relative;width:100%;height:75px;background-color:#fff;background:linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd),linear-gradient(45deg,#ddd 25%,transparent 0,transparent 75%,#ddd 0,#ddd);background-size:8px 8px;background-position:0 0,4px 4px}.md2-color-picker .selected-color .selected-color-bg{position:absolute;height:100%;opacity:1;width:100%}.md2-color-picker .selected-color .color-bar{position:absolute;width:100%;bottom:0}.md2-color-picker .selected-color .color-input{position:relative}.color-clear{color:rgba(0,0,0,.4);cursor:pointer}.color-clear svg{vertical-align:bottom;fill:#686868}.clearfix::after,.clearfix::before{content:' ';display:table}.clearfix::after{clear:both}.hex-text{width:100%}.hex-text input{width:100%;border:0;padding:4px;text-align:center;background:0 0}.hex-text div{text-align:center;float:left;clear:left;width:160px;margin-top:4px}.hsla-text,.rgba-text{text-align:center}.hsla-text input,.rgba-text input{width:50px;border:0;padding:4px 0;background:0 0;text-align:center}.hsla-text div,.rgba-text div{text-align:center;display:block}.hsla-text label,.rgba-text label{text-align:center;display:inline-block;font-size:15px}.md2-color-picker-actions{text-align:right}.md2-color-picker-actions .md2-button{display:inline-block;min-width:64px;margin:4px 8px 8px 0;padding:0 12px;font-size:14px;color:#106cc8;line-height:36px;text-align:center;text-transform:uppercase;border-radius:2px;cursor:pointer;box-sizing:border-box;transition:450ms cubic-bezier(.23,1,.32,1)}.md2-color-picker-actions .md2-button:hover{background:#ebebeb}.hsla-text div:nth-child(5),.rgba-text div:nth-child(5){clear:left}.type-policy{width:33.333333%;text-align:center;font-size:14px;display:inline-block;float:left;padding:4px 8px 3px;border-bottom:2px solid transparent;cursor:pointer;background:rgba(255,255,255,.25)}.dark .type-policy{background:rgba(0,0,0,.25)}.type-policy.active{border-color:rgba(255,255,255,.5);background:0 0}.dark .type-policy.active{border-color:rgba(0,0,0,.5)}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.6)}"]
                }] }
    ];
    /** @nocollapse */
    Md2Colorpicker.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Overlay },
        { type: ViewContainerRef },
        { type: Renderer },
        { type: ColorUtil },
        { type: NgControl, decorators: [{ type: Self }, { type: Optional }] }
    ]; };
    Md2Colorpicker.propDecorators = {
        color: [{ type: Input }],
        placeholder: [{ type: Input }],
        required: [{ type: Input }],
        disabled: [{ type: Input }],
        cFormat: [{ type: Input, args: ['format',] }],
        colorpickerChange: [{ type: Output, args: ['colorpickerChange',] }],
        change: [{ type: Output }],
        tabindex: [{ type: Input }],
        id: [{ type: Input }],
        container: [{ type: Input }],
        onOpen: [{ type: Output }],
        onClose: [{ type: Output }],
        _templatePortal: [{ type: ViewChild, args: ['portal',] }]
    };
    return Md2Colorpicker;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2ColorpickerModule = /** @class */ (function () {
    function Md2ColorpickerModule() {
    }
    Md2ColorpickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        OverlayModule,
                        PortalModule,
                        StyleModule,
                        A11yModule,
                    ],
                    exports: [
                        Md2Colorpicker,
                        ColorpickerSliderDirective,
                        TextDirective
                    ],
                    declarations: [
                        Md2Colorpicker,
                        ColorpickerSliderDirective,
                        TextDirective
                    ],
                    providers: [ColorUtil]
                },] }
    ];
    return Md2ColorpickerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2OptgroupBase = /** @class */ (function () {
    function Md2OptgroupBase() {
    }
    return Md2OptgroupBase;
}());
/** @type {?} */
var _Md2OptgroupMixinBase = mixinDisabled(Md2OptgroupBase);
/** @type {?} */
var nextId$3 = 0;
/**
 * Component that is used to group instances of `md2-option`.
 */
var Md2Optgroup = /** @class */ (function (_super) {
    __extends(Md2Optgroup, _super);
    function Md2Optgroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Unique id for the underlying label.
         */
        _this._labelId = "md2-optgroup-label-" + nextId$3++;
        return _this;
    }
    Md2Optgroup.decorators = [
        { type: Component, args: [{
                    selector: 'md2-optgroup',
                    template: "<label class=\"md2-optgroup-label\" [id]=\"_labelId\">{{ label }}</label>\n<ng-content select=\"md2-option\"></ng-content>\n",
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['disabled'],
                    host: {
                        'class': 'md2-optgroup',
                        'role': 'group',
                        '[class.md2-optgroup-disabled]': 'disabled',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-labelledby]': '_labelId',
                    },
                    styles: [".md2-optgroup-label{color:rgba(0,0,0,.54);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default;font-weight:700;font-size:14px}.md2-optgroup-disabled .md2-optgroup-label{color:rgba(0,0,0,.38)}"]
                }] }
    ];
    Md2Optgroup.propDecorators = {
        label: [{ type: Input }]
    };
    return Md2Optgroup;
}(_Md2OptgroupMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
  @type {?} */
var _uniqueIdCounter$1 = 0;
/**
 * Event object emitted by MdOption when selected or deselected.
 */
var  /**
 * Event object emitted by MdOption when selected or deselected.
 */
Md2OptionSelectionChange = /** @class */ (function () {
    function Md2OptionSelectionChange(source, isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.source = source;
        this.isUserInput = isUserInput;
    }
    return Md2OptionSelectionChange;
}());
/**
 * Single option inside of a `<md2-select>` element.
 */
var Md2Option = /** @class */ (function () {
    function Md2Option(group, _element) {
        this.group = group;
        this._element = _element;
        this._selected = false;
        this._active = false;
        /**
         * Whether the option is disabled.
         */
        this._disabled = false;
        this._id = "md2-option-" + _uniqueIdCounter$1++;
        /**
         * Whether the wrapping component is in multiple selection mode.
         */
        this.multiple = false;
        /**
         * Event emitted when the option is selected or deselected.
         */
        this.onSelectionChange = new EventEmitter();
    }
    Object.defineProperty(Md2Option.prototype, "id", {
        /** The unique ID of the option. */
        get: /**
         * The unique ID of the option.
         * @return {?}
         */
        function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Option.prototype, "selected", {
        /** Whether or not the option is currently selected. */
        get: /**
         * Whether or not the option is currently selected.
         * @return {?}
         */
        function () { return this._selected; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Option.prototype, "disabled", {
        /** Whether the option is disabled. */
        get: /**
         * Whether the option is disabled.
         * @return {?}
         */
        function () { return (this.group && this.group.disabled) || this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Option.prototype, "active", {
        /**
         * Whether or not the option is currently active and ready to be selected.
         * An active option displays styles as if it is focused, but the
         * focus is actually retained somewhere else. This comes in handy
         * for components like autocomplete where focus must remain on the input.
         */
        get: /**
         * Whether or not the option is currently active and ready to be selected.
         * An active option displays styles as if it is focused, but the
         * focus is actually retained somewhere else. This comes in handy
         * for components like autocomplete where focus must remain on the input.
         * @return {?}
         */
        function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Option.prototype, "viewValue", {
        /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
         */
        get: /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
         * @return {?}
         */
        function () {
            return this._getHostElement().textContent.trim();
        },
        enumerable: true,
        configurable: true
    });
    /** Selects the option. */
    /**
     * Selects the option.
     * @return {?}
     */
    Md2Option.prototype.select = /**
     * Selects the option.
     * @return {?}
     */
    function () {
        this._selected = true;
        this._emitSelectionChangeEvent();
    };
    /** Deselects the option. */
    /**
     * Deselects the option.
     * @return {?}
     */
    Md2Option.prototype.deselect = /**
     * Deselects the option.
     * @return {?}
     */
    function () {
        this._selected = false;
        this._emitSelectionChangeEvent();
    };
    /** Sets focus onto this option. */
    /**
     * Sets focus onto this option.
     * @return {?}
     */
    Md2Option.prototype.focus = /**
     * Sets focus onto this option.
     * @return {?}
     */
    function () {
        this._getHostElement().focus();
    };
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    Md2Option.prototype.setActiveStyles = /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    function () {
        this._active = true;
    };
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    Md2Option.prototype.setInactiveStyles = /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    function () {
        this._active = false;
    };
    /** Ensures the option is selected when activated from the keyboard. */
    /**
     * Ensures the option is selected when activated from the keyboard.
     * @param {?} event
     * @return {?}
     */
    Md2Option.prototype._handleKeydown = /**
     * Ensures the option is selected when activated from the keyboard.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this._selectViaInteraction();
        }
    };
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     */
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     * @return {?}
     */
    Md2Option.prototype._selectViaInteraction = /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this._emitSelectionChangeEvent(true);
        }
    };
    /** Returns the correct tabindex for the option depending on disabled state. */
    /**
     * Returns the correct tabindex for the option depending on disabled state.
     * @return {?}
     */
    Md2Option.prototype._getTabIndex = /**
     * Returns the correct tabindex for the option depending on disabled state.
     * @return {?}
     */
    function () {
        return this.disabled ? '-1' : '0';
    };
    /** Fetches the host DOM element. */
    /**
     * Fetches the host DOM element.
     * @return {?}
     */
    Md2Option.prototype._getHostElement = /**
     * Fetches the host DOM element.
     * @return {?}
     */
    function () {
        return this._element.nativeElement;
    };
    /**
     * Emits the selection change event.
     * @param {?=} isUserInput
     * @return {?}
     */
    Md2Option.prototype._emitSelectionChangeEvent = /**
     * Emits the selection change event.
     * @param {?=} isUserInput
     * @return {?}
     */
    function (isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.onSelectionChange.emit(new Md2OptionSelectionChange(this, isUserInput));
    };
    Md2Option.decorators = [
        { type: Component, args: [{
                    selector: 'md2-option',
                    host: {
                        'role': 'option',
                        '[attr.tabindex]': '_getTabIndex()',
                        '[class.md2-selected]': 'selected',
                        '[class.md2-option-multiple]': 'multiple',
                        '[class.md2-active]': 'active',
                        '[id]': 'id',
                        '[attr.aria-selected]': 'selected.toString()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[class.md2-option-disabled]': 'disabled',
                        '(click)': '_selectViaInteraction()',
                        '(keydown)': '_handleKeydown($event)',
                        '[class.md2-option]': 'true',
                    },
                    template: '<ng-content></ng-content>',
                    encapsulation: ViewEncapsulation.None,
                    styles: [".md2-option{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;position:relative;font-family:inherit;cursor:pointer;outline:0}.md2-option[disabled]{cursor:default}[dir=rtl] .md2-option{text-align:right}.md2-option .mat-icon{margin-right:16px}[dir=rtl] .md2-option .mat-icon{margin-left:16px;margin-right:0}.md2-option[aria-disabled=true]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.md2-option:focus:not(.md2-option-disabled),.md2-option:hover:not(.md2-option-disabled){background:rgba(0,0,0,.04)}.md2-option.md2-selected{color:#106cc8}.md2-option.md2-selected:not(.md2-option-multiple){background:rgba(0,0,0,.04)}.md2-option.md2-active{background:rgba(0,0,0,.04);color:#106cc8}.md2-option.md2-option-disabled{color:rgba(0,0,0,.38)}.md2-option.md2-option-multiple{padding-left:40px}.md2-option.md2-option-multiple::after{content:'';position:absolute;top:50%;left:12px;display:block;width:16px;height:16px;margin-top:-8px;border:2px solid;border-radius:2px;box-sizing:border-box;transition:240ms}.md2-option.md2-option-multiple.md2-selected::after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);height:8px;border-width:0 0 2px 2px}.md2-optgroup .md2-option:not(.md2-option-multiple){padding-left:32px}"]
                }] }
    ];
    /** @nocollapse */
    Md2Option.ctorParameters = function () { return [
        { type: Md2Optgroup, decorators: [{ type: Optional }] },
        { type: ElementRef }
    ]; };
    Md2Option.propDecorators = {
        value: [{ type: Input }],
        disabled: [{ type: Input }],
        onSelectionChange: [{ type: Output }]
    };
    return Md2Option;
}());
var Md2OptionModule = /** @class */ (function () {
    function Md2OptionModule() {
    }
    Md2OptionModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MdSelectionModule],
                    exports: [Md2Option, Md2Optgroup],
                    declarations: [Md2Option, Md2Optgroup]
                },] }
    ];
    return Md2OptionModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 * @template T
 */
var 
// unsupported: template constraints.
/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 * @template T
 */
ListKeyManager = /** @class */ (function () {
    function ListKeyManager(_items) {
        this._items = _items;
        this._activeItemIndex = null;
        this._tabOut = new Subject();
        this._wrap = false;
    }
    /**
     * Turns on wrapping mode, which ensures that the active item will wrap to
     * the other end of list when there are no more items in the given direction.
     *
     * @returns The ListKeyManager that the method was called on.
     */
    /**
     * Turns on wrapping mode, which ensures that the active item will wrap to
     * the other end of list when there are no more items in the given direction.
     *
     * @return {?} The ListKeyManager that the method was called on.
     */
    ListKeyManager.prototype.withWrap = /**
     * Turns on wrapping mode, which ensures that the active item will wrap to
     * the other end of list when there are no more items in the given direction.
     *
     * @return {?} The ListKeyManager that the method was called on.
     */
    function () {
        this._wrap = true;
        return this;
    };
    /**
     * Sets the active item to the item at the index specified.
     *
     * @param index The index of the item to be set as active.
     */
    /**
     * Sets the active item to the item at the index specified.
     *
     * @param {?} index The index of the item to be set as active.
     * @return {?}
     */
    ListKeyManager.prototype.setActiveItem = /**
     * Sets the active item to the item at the index specified.
     *
     * @param {?} index The index of the item to be set as active.
     * @return {?}
     */
    function (index) {
        this._activeItemIndex = index;
        this._activeItem = this._items.toArray()[index];
    };
    /**
     * Sets the active item depending on the key event passed in.
     * @param event Keyboard event to be used for determining which element should be active.
     */
    /**
     * Sets the active item depending on the key event passed in.
     * @param {?} event Keyboard event to be used for determining which element should be active.
     * @return {?}
     */
    ListKeyManager.prototype.onKeydown = /**
     * Sets the active item depending on the key event passed in.
     * @param {?} event Keyboard event to be used for determining which element should be active.
     * @return {?}
     */
    function (event) {
        switch (event.keyCode) {
            case DOWN_ARROW:
                this.setNextItemActive();
                break;
            case UP_ARROW:
                this.setPreviousItemActive();
                break;
            case TAB:
                // Note that we shouldn't prevent the default action on tab.
                this._tabOut.next(null);
                return;
            default:
                return;
        }
        event.preventDefault();
    };
    Object.defineProperty(ListKeyManager.prototype, "activeItemIndex", {
        /** Returns the index of the currently active item. */
        get: /**
         * Returns the index of the currently active item.
         * @return {?}
         */
        function () {
            return this._activeItemIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListKeyManager.prototype, "activeItem", {
        /** Returns the currently active item. */
        get: /**
         * Returns the currently active item.
         * @return {?}
         */
        function () {
            return this._activeItem;
        },
        enumerable: true,
        configurable: true
    });
    /** Sets the active item to the first enabled item in the list. */
    /**
     * Sets the active item to the first enabled item in the list.
     * @return {?}
     */
    ListKeyManager.prototype.setFirstItemActive = /**
     * Sets the active item to the first enabled item in the list.
     * @return {?}
     */
    function () {
        this._setActiveItemByIndex(0, 1);
    };
    /** Sets the active item to the last enabled item in the list. */
    /**
     * Sets the active item to the last enabled item in the list.
     * @return {?}
     */
    ListKeyManager.prototype.setLastItemActive = /**
     * Sets the active item to the last enabled item in the list.
     * @return {?}
     */
    function () {
        this._setActiveItemByIndex(this._items.length - 1, -1);
    };
    /** Sets the active item to the next enabled item in the list. */
    /**
     * Sets the active item to the next enabled item in the list.
     * @return {?}
     */
    ListKeyManager.prototype.setNextItemActive = /**
     * Sets the active item to the next enabled item in the list.
     * @return {?}
     */
    function () {
        this._activeItemIndex === null ? this.setFirstItemActive() : this._setActiveItemByDelta(1);
    };
    /** Sets the active item to a previous enabled item in the list. */
    /**
     * Sets the active item to a previous enabled item in the list.
     * @return {?}
     */
    ListKeyManager.prototype.setPreviousItemActive = /**
     * Sets the active item to a previous enabled item in the list.
     * @return {?}
     */
    function () {
        this._activeItemIndex === null && this._wrap ? this.setLastItemActive()
            : this._setActiveItemByDelta(-1);
    };
    /**
     * Allows setting of the activeItemIndex without any other effects.
     * @param index The new activeItemIndex.
     */
    /**
     * Allows setting of the activeItemIndex without any other effects.
     * @param {?} index The new activeItemIndex.
     * @return {?}
     */
    ListKeyManager.prototype.updateActiveItemIndex = /**
     * Allows setting of the activeItemIndex without any other effects.
     * @param {?} index The new activeItemIndex.
     * @return {?}
     */
    function (index) {
        this._activeItemIndex = index;
    };
    Object.defineProperty(ListKeyManager.prototype, "tabOut", {
        /**
         * Observable that emits any time the TAB key is pressed, so components can react
         * when focus is shifted off of the list.
         */
        get: /**
         * Observable that emits any time the TAB key is pressed, so components can react
         * when focus is shifted off of the list.
         * @return {?}
         */
        function () {
            return this._tabOut.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This method sets the active item, given a list of items and the delta between the
     * currently active item and the new active item. It will calculate differently
     * depending on whether wrap mode is turned on.
     * @param {?} delta
     * @param {?=} items
     * @return {?}
     */
    ListKeyManager.prototype._setActiveItemByDelta = /**
     * This method sets the active item, given a list of items and the delta between the
     * currently active item and the new active item. It will calculate differently
     * depending on whether wrap mode is turned on.
     * @param {?} delta
     * @param {?=} items
     * @return {?}
     */
    function (delta, items) {
        if (items === void 0) { items = this._items.toArray(); }
        this._wrap ? this._setActiveInWrapMode(delta, items)
            : this._setActiveInDefaultMode(delta, items);
    };
    /**
     * Sets the active item properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     * @param {?} delta
     * @param {?} items
     * @return {?}
     */
    ListKeyManager.prototype._setActiveInWrapMode = /**
     * Sets the active item properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     * @param {?} delta
     * @param {?} items
     * @return {?}
     */
    function (delta, items) {
        // when active item would leave menu, wrap to beginning or end
        this._activeItemIndex =
            (this._activeItemIndex + delta + items.length) % items.length;
        // skip all disabled menu items recursively until an enabled one is reached
        if (items[this._activeItemIndex].disabled) {
            this._setActiveInWrapMode(delta, items);
        }
        else {
            this.setActiveItem(this._activeItemIndex);
        }
    };
    /**
     * Sets the active item properly given the default mode. In other words, it will
     * continue to move down the list until it finds an item that is not disabled. If
     * it encounters either end of the list, it will stop and not wrap.
     * @param {?} delta
     * @param {?} items
     * @return {?}
     */
    ListKeyManager.prototype._setActiveInDefaultMode = /**
     * Sets the active item properly given the default mode. In other words, it will
     * continue to move down the list until it finds an item that is not disabled. If
     * it encounters either end of the list, it will stop and not wrap.
     * @param {?} delta
     * @param {?} items
     * @return {?}
     */
    function (delta, items) {
        this._setActiveItemByIndex(this._activeItemIndex + delta, delta, items);
    };
    /**
     * Sets the active item to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     * @param {?} index
     * @param {?} fallbackDelta
     * @param {?=} items
     * @return {?}
     */
    ListKeyManager.prototype._setActiveItemByIndex = /**
     * Sets the active item to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     * @param {?} index
     * @param {?} fallbackDelta
     * @param {?=} items
     * @return {?}
     */
    function (index, fallbackDelta, items) {
        if (items === void 0) { items = this._items.toArray(); }
        if (!items[index]) {
            return;
        }
        while (items[index].disabled) {
            index += fallbackDelta;
            if (!items[index]) {
                return;
            }
        }
        this.setActiveItem(index);
    };
    return ListKeyManager;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var FocusKeyManager = /** @class */ (function (_super) {
    __extends(FocusKeyManager, _super);
    function FocusKeyManager(items) {
        return _super.call(this, items) || this;
    }
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds focuses the newly active item.
     */
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds focuses the newly active item.
     * @param {?} index
     * @return {?}
     */
    FocusKeyManager.prototype.setActiveItem = /**
     * This method sets the active item to the item at the specified index.
     * It also adds focuses the newly active item.
     * @param {?} index
     * @return {?}
     */
    function (index) {
        _super.prototype.setActiveItem.call(this, index);
        if (this.activeItem) {
            this.activeItem.focus();
        }
    };
    return FocusKeyManager;
}(ListKeyManager));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * This animation shrinks the placeholder text to 75% of its normal size and translates
 * it to either the top left corner (ltr) or top right corner (rtl) of the trigger,
 * depending on the text direction of the application.
  @type {?} */
var transformPlaceholder = trigger('transformPlaceholder', [
    state('floating-ltr', style({
        top: '-22px',
        left: '-2px',
        transform: "scale(0.75)"
    })),
    state('floating-rtl', style({
        top: '-22px',
        left: '2px',
        transform: "scale(0.75)"
    })),
    transition('* => *', animate("400ms cubic-bezier(0.25, 0.8, 0.25, 1)"))
]);
/** *
 * This animation transforms the select's overlay panel on and off the page.
 *
 * When the panel is attached to the DOM, it expands its width 32px, scales it up to
 * 100% on the Y axis, fades in its border, and translates slightly up and to the
 * side to ensure the option text correctly overlaps the trigger text.
 *
 * When the panel is removed from the DOM, it simply fades out linearly.
  @type {?} */
var transformPanel = trigger('transformPanel', [
    state('showing', style({
        opacity: 1,
        minWidth: 'calc(100% + 32px)',
        transform: "scaleY(1)"
    })),
    transition('void => *', [
        style({
            opacity: 0,
            minWidth: '100%',
            transform: "scaleY(0)"
        }),
        animate("150ms cubic-bezier(0.25, 0.8, 0.25, 1)")
    ]),
    transition('* => void', [
        animate('250ms 100ms linear', style({ opacity: 0 }))
    ])
]);
/** *
 * This animation fades in the background color and text content of the
 * select's options. It is time delayed to occur 100ms after the overlay
 * panel has transformed in.
  @type {?} */
var fadeInContent = trigger('fadeInContent', [
    state('showing', style({ opacity: 1 })),
    transition('void => showing', [
        style({ opacity: 0 }),
        animate("150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)")
    ])
]);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Returns an exception to be thrown when attempting to change a s
 * elect's `multiple` option after initialization.
 * \@docs-private
 * @return {?}
 */
function getMdSelectDynamicMultipleError() {
    return new Error('Cannot change `multiple` mode of select after initialization.');
}
/**
 * Returns an exception to be thrown when attempting to assign a non-array value to a select
 * in `multiple` mode. Note that `undefined` and `null` are still valid values to allow for
 * resetting the value.
 * \@docs-private
 * @return {?}
 */
function getMdSelectNonArrayValueError() {
    return new Error('Cannot assign truthy non-array value to select in `multiple` mode.');
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * The fixed height of every option element (option, group header etc.).
  @type {?} */
var SELECT_ITEM_HEIGHT = 48;
/** *
 * The max height of the select's overlay panel
  @type {?} */
var SELECT_PANEL_MAX_HEIGHT = 256;
/** *
 * The max number of options visible at once in the select panel.
  @type {?} */
var SELECT_MAX_OPTIONS_DISPLAYED = Math.floor(SELECT_PANEL_MAX_HEIGHT / SELECT_ITEM_HEIGHT);
/** *
 * The fixed height of the select's trigger element.
  @type {?} */
var SELECT_TRIGGER_HEIGHT = 30;
/** *
 * Must adjust for the difference in height between the option and the trigger,
 * so the text will align on the y axis.
  @type {?} */
var SELECT_ITEM_HEIGHT_ADJUSTMENT = (SELECT_ITEM_HEIGHT - SELECT_TRIGGER_HEIGHT) / 2;
/** *
 * The panel's padding on the x-axis
  @type {?} */
var SELECT_PANEL_PADDING_X = 16;
/** *
 * The panel's x axis padding if it is indented (e.g. there is an option group).
  @type {?} */
var SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_PADDING_X * 2;
/** *
 * Distance between the panel edge and the option text in
 * multi-selection mode.
 *
 * (SELECT_PADDING * 1.75) + 20 = 48
 * The padding is multiplied by 1.75 because the checkbox's margin is half the padding, and
 * the browser adds ~4px, because we're using inline elements.
 * The checkbox width is 20px.
  @type {?} */
var SELECT_MULTIPLE_PANEL_PADDING_X = SELECT_PANEL_PADDING_X * 1.25 + 20;
/** *
 * The panel's padding on the y-axis. This padding indicates there are more
 * options available if you scroll.
  @type {?} */
var SELECT_PANEL_PADDING_Y = 16;
/** *
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
  @type {?} */
var SELECT_PANEL_VIEWPORT_PADDING = 8;
/**
 * Change event object that is emitted when the select value has changed.
 */
var  /**
 * Change event object that is emitted when the select value has changed.
 */
Md2SelectChange = /** @class */ (function () {
    function Md2SelectChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return Md2SelectChange;
}());
var Md2Select = /** @class */ (function () {
    function Md2Select(_element, _renderer, _viewportRuler, _changeDetectorRef, _dir, _control, tabIndex) {
        this._element = _element;
        this._renderer = _renderer;
        this._viewportRuler = _viewportRuler;
        this._changeDetectorRef = _changeDetectorRef;
        this._dir = _dir;
        this._control = _control;
        /**
         * Whether or not the overlay panel is open.
         */
        this._panelOpen = false;
        /**
         * Whether filling out the select is required in the form.
         */
        this._required = false;
        /**
         * Whether the select is disabled.
         */
        this._disabled = false;
        /**
         * The scroll position of the overlay panel, calculated to center the selected option.
         */
        this._scrollTop = 0;
        /**
         * Whether the component is in multiple selection mode.
         */
        this._multiple = false;
        /**
         * The animation state of the placeholder.
         */
        this._placeholderState = '';
        /**
         * View -> model callback called when value changes
         */
        this._onChange = function () { };
        /**
         * View -> model callback called when select has been touched
         */
        this._onTouched = function () { };
        /**
         * The IDs of child options to be passed to the aria-owns attribute.
         */
        this._optionIds = '';
        /**
         * The value of the select panel's transform-origin property.
         */
        this._transformOrigin = 'top';
        /**
         * Whether the panel's animation is done.
         */
        this._panelDoneAnimating = false;
        /**
         * The y-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text.
         * when the panel opens. Will change based on the y-position of the selected option.
         */
        this._offsetY = 0;
        /**
         * This position config ensures that the top "start" corner of the overlay
         * is aligned with with the top "start" of the origin by default (overlapping
         * the trigger completely). If the panel cannot fit below the trigger, it
         * will fall back to a position above the trigger.
         */
        this._positions = [
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
            },
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'bottom',
            },
        ];
        this._floatPlaceholder = 'auto';
        /**
         * Aria label of the select. If not specified, the placeholder will be used as label.
         */
        this.ariaLabel = '';
        /**
         * Input that can be used to specify the `aria-labelledby` attribute.
         */
        this.ariaLabelledby = '';
        /**
         * Event emitted when the select has been opened.
         */
        this.onOpen = new EventEmitter();
        /**
         * Event emitted when the select has been closed.
         */
        this.onClose = new EventEmitter();
        /**
         * Event emitted when the selected value has been changed by the user.
         */
        this.change = new EventEmitter();
        if (this._control) {
            this._control.valueAccessor = this;
        }
        this._tabIndex = parseInt(tabIndex) || 0;
    }
    Object.defineProperty(Md2Select.prototype, "placeholder", {
        /** Placeholder to be shown if no value has been selected. */
        get: /**
         * Placeholder to be shown if no value has been selected.
         * @return {?}
         */
        function () { return this._placeholder; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this._placeholder = value;
            // Must wait to record the trigger width to ensure placeholder width is included.
            Promise.resolve(null).then(function () { return _this._setTriggerWidth(); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "disabled", {
        /** Whether the component is disabled. */
        get: /**
         * Whether the component is disabled.
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "required", {
        /** Whether the component is required. */
        get: /**
         * Whether the component is required.
         * @return {?}
         */
        function () { return this._required; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "multiple", {
        /** Whether the user should be allowed to select multiple options. */
        get: /**
         * Whether the user should be allowed to select multiple options.
         * @return {?}
         */
        function () { return this._multiple; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._selectionModel) {
                throw getMdSelectDynamicMultipleError();
            }
            this._multiple = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "floatPlaceholder", {
        /** Whether to float the placeholder text. */
        get: /**
         * Whether to float the placeholder text.
         * @return {?}
         */
        function () { return this._floatPlaceholder; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._floatPlaceholder = value || 'auto';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "tabIndex", {
        /** Tab index for the select element. */
        get: /**
         * Tab index for the select element.
         * @return {?}
         */
        function () { return this._disabled ? -1 : this._tabIndex; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value !== 'undefined') {
                this._tabIndex = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "optionSelectionChanges", {
        /** Combined stream of all of the child options' change events. */
        get: /**
         * Combined stream of all of the child options' change events.
         * @return {?}
         */
        function () {
            return merge.apply(void 0, __spread(this.options.map(function (option) { return option.onSelectionChange; })));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Md2Select.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._selectionModel = new SelectionModel(this.multiple, null, false);
    };
    /**
     * @return {?}
     */
    Md2Select.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._initKeyManager();
        this._changeSubscription = this.options.changes.pipe(startWith(null)).subscribe(function () {
            _this._resetOptions();
            if (_this._control) {
                // Defer setting the value in order to avoid the "Expression
                // has changed after it was checked" errors from Angular.
                Promise.resolve(null).then(function () { return _this._setSelectionByValue(_this._control.value); });
            }
        });
    };
    /**
     * @return {?}
     */
    Md2Select.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._dropSubscriptions();
        if (this._changeSubscription) {
            this._changeSubscription.unsubscribe();
        }
        if (this._tabSubscription) {
            this._tabSubscription.unsubscribe();
        }
    };
    /** Toggles the overlay panel open or closed. */
    /**
     * Toggles the overlay panel open or closed.
     * @return {?}
     */
    Md2Select.prototype.toggle = /**
     * Toggles the overlay panel open or closed.
     * @return {?}
     */
    function () {
        this.panelOpen ? this.close() : this.open();
    };
    /** Opens the overlay panel. */
    /**
     * Opens the overlay panel.
     * @return {?}
     */
    Md2Select.prototype.open = /**
     * Opens the overlay panel.
     * @return {?}
     */
    function () {
        if (this.disabled || !this.options.length) {
            return;
        }
        if (!this._triggerWidth) {
            this._setTriggerWidth();
        }
        this._calculateOverlayPosition();
        this._placeholderState = this._floatPlaceholderState();
        this._panelOpen = true;
    };
    /** Closes the overlay panel and focuses the host element. */
    /**
     * Closes the overlay panel and focuses the host element.
     * @return {?}
     */
    Md2Select.prototype.close = /**
     * Closes the overlay panel and focuses the host element.
     * @return {?}
     */
    function () {
        if (this._panelOpen) {
            this._panelOpen = false;
            if (this._selectionModel.isEmpty()) {
                this._placeholderState = '';
            }
            this._focusHost();
        }
    };
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param value New value to be written to the model.
     */
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} value New value to be written to the model.
     * @return {?}
     */
    Md2Select.prototype.writeValue = /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} value New value to be written to the model.
     * @return {?}
     */
    function (value) {
        if (this.options) {
            this._setSelectionByValue(value);
        }
    };
    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the value changes.
     */
    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the value changes.
     * @return {?}
     */
    Md2Select.prototype.registerOnChange = /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the value changes.
     * @return {?}
     */
    function (fn) {
        this._onChange = fn;
    };
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the component has been touched.
     */
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the component has been touched.
     * @return {?}
     */
    Md2Select.prototype.registerOnTouched = /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the component has been touched.
     * @return {?}
     */
    function (fn) {
        this._onTouched = fn;
    };
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param isDisabled Sets whether the component is disabled.
     */
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} isDisabled Sets whether the component is disabled.
     * @return {?}
     */
    Md2Select.prototype.setDisabledState = /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} isDisabled Sets whether the component is disabled.
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    Object.defineProperty(Md2Select.prototype, "panelOpen", {
        /** Whether or not the overlay panel is open. */
        get: /**
         * Whether or not the overlay panel is open.
         * @return {?}
         */
        function () {
            return this._panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "selected", {
        /** The currently selected option. */
        get: /**
         * The currently selected option.
         * @return {?}
         */
        function () {
            return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "triggerValue", {
        /** The value displayed in the trigger. */
        get: /**
         * The value displayed in the trigger.
         * @return {?}
         */
        function () {
            if (this._multiple) {
                /** @type {?} */
                var selectedOptions = this._selectionModel.selected.map(function (option) { return option.viewValue; });
                if (this._isRtl()) {
                    selectedOptions.reverse();
                }
                // TODO(crisbeto): delimiter should be configurable for proper localization.
                return selectedOptions.join(', ');
            }
            return this._selectionModel.selected[0].viewValue;
        },
        enumerable: true,
        configurable: true
    });
    /** Whether the element is in RTL mode. */
    /**
     * Whether the element is in RTL mode.
     * @return {?}
     */
    Md2Select.prototype._isRtl = /**
     * Whether the element is in RTL mode.
     * @return {?}
     */
    function () {
        return this._dir ? this._dir.value === 'rtl' : false;
    };
    /**
     * Sets the width of the trigger element. This is necessary to match
     * the overlay width to the trigger width.
     * @return {?}
     */
    Md2Select.prototype._setTriggerWidth = /**
     * Sets the width of the trigger element. This is necessary to match
     * the overlay width to the trigger width.
     * @return {?}
     */
    function () {
        this._triggerWidth = this._getTriggerRect().width;
    };
    /** Handles the keyboard interactions of a closed select. */
    /**
     * Handles the keyboard interactions of a closed select.
     * @param {?} event
     * @return {?}
     */
    Md2Select.prototype._handleClosedKeydown = /**
     * Handles the keyboard interactions of a closed select.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.disabled) {
            if (event.keyCode === ENTER || event.keyCode === SPACE) {
                event.preventDefault(); // prevents the page from scrolling down when pressing space
                this.open();
            }
            else if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
                this._handleArrowKey(event);
            }
        }
    };
    /** Handles keypresses inside the panel. */
    /**
     * Handles keypresses inside the panel.
     * @param {?} event
     * @return {?}
     */
    Md2Select.prototype._handlePanelKeydown = /**
     * Handles keypresses inside the panel.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.keyCode === HOME || event.keyCode === END) {
            event.preventDefault();
            event.keyCode === HOME ? this._keyManager.setFirstItemActive() :
                this._keyManager.setLastItemActive();
        }
        else {
            this._keyManager.onKeydown(event);
        }
    };
    /**
     * When the panel element is finished transforming in (though not fading in), it
     * emits an event and focuses an option if the panel is open.
     */
    /**
     * When the panel element is finished transforming in (though not fading in), it
     * emits an event and focuses an option if the panel is open.
     * @return {?}
     */
    Md2Select.prototype._onPanelDone = /**
     * When the panel element is finished transforming in (though not fading in), it
     * emits an event and focuses an option if the panel is open.
     * @return {?}
     */
    function () {
        if (this.panelOpen) {
            this._focusCorrectOption();
            this.onOpen.emit();
        }
        else {
            this.onClose.emit();
            this._panelDoneAnimating = false;
            this.overlayDir.offsetX = 0;
        }
    };
    /**
     * When the panel content is done fading in, the _panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     */
    /**
     * When the panel content is done fading in, the _panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     * @return {?}
     */
    Md2Select.prototype._onFadeInDone = /**
     * When the panel content is done fading in, the _panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     * @return {?}
     */
    function () {
        this._panelDoneAnimating = this.panelOpen;
    };
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     */
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     * @return {?}
     */
    Md2Select.prototype._onBlur = /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     * @return {?}
     */
    function () {
        if (!this.panelOpen) {
            this._onTouched();
        }
    };
    /**
     * Callback that is invoked when the overlay panel has been attached.
     */
    /**
     * Callback that is invoked when the overlay panel has been attached.
     * @return {?}
     */
    Md2Select.prototype._onAttached = /**
     * Callback that is invoked when the overlay panel has been attached.
     * @return {?}
     */
    function () {
        this._calculateOverlayOffsetX();
        this._setScrollTop();
    };
    /**
     * Sets the scroll position of the scroll container. This must be called after
     * the overlay pane is attached or the scroll container element will not yet be
     * present in the DOM.
     * @return {?}
     */
    Md2Select.prototype._setScrollTop = /**
     * Sets the scroll position of the scroll container. This must be called after
     * the overlay pane is attached or the scroll container element will not yet be
     * present in the DOM.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var scrollContainer = this.overlayDir.overlayRef.overlayElement.querySelector('.md2-select-panel');
        scrollContainer.scrollTop = this._scrollTop;
    };
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     * @param {?} value
     * @return {?}
     */
    Md2Select.prototype._setSelectionByValue = /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        /** @type {?} */
        var isArray = Array.isArray(value);
        if (this.multiple && value && !isArray) {
            throw getMdSelectNonArrayValueError();
        }
        this._clearSelection();
        if (isArray) {
            value.forEach(function (currentValue) { return _this._selectValue(currentValue); });
            this._sortValues();
        }
        else {
            this._selectValue(value);
        }
        this._setValueWidth();
        if (this._selectionModel.isEmpty()) {
            this._placeholderState = '';
        }
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Finds and selects and option based on its value.
     * @param {?} value
     * @return {?} Option that has the corresponding value.
     */
    Md2Select.prototype._selectValue = /**
     * Finds and selects and option based on its value.
     * @param {?} value
     * @return {?} Option that has the corresponding value.
     */
    function (value) {
        var _this = this;
        /** @type {?} */
        var optionsArray = this.options.toArray();
        /** @type {?} */
        var correspondingOption = optionsArray.find(function (option) { return option.value != null
            && option.value != undefined && _this.equals(option.value, value); });
        if (correspondingOption) {
            correspondingOption.select();
            this._selectionModel.select(correspondingOption);
            this._keyManager.setActiveItem(optionsArray.indexOf(correspondingOption));
        }
        return correspondingOption;
    };
    /**
     * Compare two vars or objects
     * @param {?} o1 compare first object
     * @param {?} o2 compare second object
     * @return {?} boolean comparation result
     */
    Md2Select.prototype.equals = /**
     * Compare two vars or objects
     * @param {?} o1 compare first object
     * @param {?} o2 compare second object
     * @return {?} boolean comparation result
     */
    function (o1, o2) {
        if (o1 === o2) {
            return true;
        }
        if (o1 === null || o2 === null) {
            return false;
        }
        if (o1 !== o1 && o2 !== o2) {
            return true;
        }
        /** @type {?} */
        var t1 = typeof o1;
        /** @type {?} */
        var t2 = typeof o2;
        /** @type {?} */
        var key;
        /** @type {?} */
        var keySet;
        if (t1 === t2 && t1 === 'object') {
            keySet = Object.create(null);
            for (key in o1) {
                if (!this.equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && key.charAt(0) !== '$' && o2[key]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    /**
     * Clears the select trigger and deselects every option in the list.
     * @param {?=} skip Option that should not be deselected.
     * @return {?}
     */
    Md2Select.prototype._clearSelection = /**
     * Clears the select trigger and deselects every option in the list.
     * @param {?=} skip Option that should not be deselected.
     * @return {?}
     */
    function (skip) {
        this._selectionModel.clear();
        this.options.forEach(function (option) {
            if (option !== skip) {
                option.deselect();
            }
        });
    };
    /**
     * @return {?}
     */
    Md2Select.prototype._getTriggerRect = /**
     * @return {?}
     */
    function () {
        return this.trigger.nativeElement.getBoundingClientRect();
    };
    /**
     * Sets up a key manager to listen to keyboard events on the overlay panel.
     * @return {?}
     */
    Md2Select.prototype._initKeyManager = /**
     * Sets up a key manager to listen to keyboard events on the overlay panel.
     * @return {?}
     */
    function () {
        var _this = this;
        this._keyManager = new FocusKeyManager(this.options);
        this._tabSubscription = this._keyManager.tabOut.subscribe(function () { return _this.close(); });
    };
    /**
     * Drops current option subscriptions and IDs and resets from scratch.
     * @return {?}
     */
    Md2Select.prototype._resetOptions = /**
     * Drops current option subscriptions and IDs and resets from scratch.
     * @return {?}
     */
    function () {
        this._dropSubscriptions();
        this._listenToOptions();
        this._setOptionIds();
        this._setOptionMultiple();
    };
    /**
     * Listens to user-generated selection events on each option.
     * @return {?}
     */
    Md2Select.prototype._listenToOptions = /**
     * Listens to user-generated selection events on each option.
     * @return {?}
     */
    function () {
        var _this = this;
        this._optionSubscription = this.optionSelectionChanges
            .pipe(filter(function (event) { return event.isUserInput; }))
            .subscribe(function (event) {
            _this._onSelect(event.source);
            _this._setValueWidth();
            if (!_this.multiple) {
                _this.close();
            }
        });
    };
    /**
     * Invoked when an option is clicked.
     * @param {?} option
     * @return {?}
     */
    Md2Select.prototype._onSelect = /**
     * Invoked when an option is clicked.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        /** @type {?} */
        var wasSelected = this._selectionModel.isSelected(option);
        if (this.multiple) {
            this._selectionModel.toggle(option);
            wasSelected ? option.deselect() : option.select();
            this._sortValues();
        }
        else {
            this._clearSelection(option.value == null ? null : option);
            if (option.value == null) {
                this._propagateChanges(option.value);
            }
            else {
                this._selectionModel.select(option);
            }
        }
        if (wasSelected !== this._selectionModel.isSelected(option)) {
            this._propagateChanges();
        }
    };
    /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     * @return {?}
     */
    Md2Select.prototype._sortValues = /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._multiple) {
            this._selectionModel.clear();
            this.options.forEach(function (option) {
                if (option.selected) {
                    _this._selectionModel.select(option);
                }
            });
        }
    };
    /**
     * Unsubscribes from all option subscriptions.
     * @return {?}
     */
    Md2Select.prototype._dropSubscriptions = /**
     * Unsubscribes from all option subscriptions.
     * @return {?}
     */
    function () {
        if (this._optionSubscription) {
            this._optionSubscription.unsubscribe();
            this._optionSubscription = null;
        }
    };
    /**
     * Emits change event to set the model value.
     * @param {?=} fallbackValue
     * @return {?}
     */
    Md2Select.prototype._propagateChanges = /**
     * Emits change event to set the model value.
     * @param {?=} fallbackValue
     * @return {?}
     */
    function (fallbackValue) {
        /** @type {?} */
        var valueToEmit = null;
        if (Array.isArray(this.selected)) {
            valueToEmit = this.selected.map(function (option) { return option.value; });
        }
        else {
            valueToEmit = this.selected ? this.selected.value : fallbackValue;
        }
        this._onChange(valueToEmit);
        this.change.emit(new Md2SelectChange(this, valueToEmit));
    };
    /**
     * Records option IDs to pass to the aria-owns property.
     * @return {?}
     */
    Md2Select.prototype._setOptionIds = /**
     * Records option IDs to pass to the aria-owns property.
     * @return {?}
     */
    function () {
        this._optionIds = this.options.map(function (option) { return option.id; }).join(' ');
    };
    /**
     * Sets the `multiple` property on each option. The promise is necessary
     * in order to avoid Angular errors when modifying the property after init.
     * @return {?}
     */
    Md2Select.prototype._setOptionMultiple = /**
     * Sets the `multiple` property on each option. The promise is necessary
     * in order to avoid Angular errors when modifying the property after init.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.multiple) {
            Promise.resolve(null).then(function () {
                _this.options.forEach(function (option) { return option.multiple = _this.multiple; });
            });
        }
    };
    /**
     * Must set the width of the selected option's value programmatically
     * because it is absolutely positioned and otherwise will not clip
     * overflow. The selection arrow is 9px wide, add 4px of padding = 13
     * @return {?}
     */
    Md2Select.prototype._setValueWidth = /**
     * Must set the width of the selected option's value programmatically
     * because it is absolutely positioned and otherwise will not clip
     * overflow. The selection arrow is 9px wide, add 4px of padding = 13
     * @return {?}
     */
    function () {
        this._selectedValueWidth = this._triggerWidth - 13;
    };
    /**
     * Focuses the selected item. If no option is selected, it will focus
     * the first item instead.
     * @return {?}
     */
    Md2Select.prototype._focusCorrectOption = /**
     * Focuses the selected item. If no option is selected, it will focus
     * the first item instead.
     * @return {?}
     */
    function () {
        if (this._selectionModel.isEmpty()) {
            this._keyManager.setFirstItemActive();
        }
        else {
            this._keyManager.setActiveItem(this._getOptionIndex(this._selectionModel.selected[0]));
        }
    };
    /**
     * Focuses the host element when the panel closes.
     * @return {?}
     */
    Md2Select.prototype._focusHost = /**
     * Focuses the host element when the panel closes.
     * @return {?}
     */
    function () {
        this._element.nativeElement.focus();
    };
    /**
     * Gets the index of the provided option in the option list.
     * @param {?} option
     * @return {?}
     */
    Md2Select.prototype._getOptionIndex = /**
     * Gets the index of the provided option in the option list.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        return this.options.reduce(function (result, current, index) {
            return result === undefined ? (option === current ? index : undefined) : result;
        }, undefined);
    };
    /**
     * Calculates the scroll position and x- and y-offsets of the overlay panel.
     * @return {?}
     */
    Md2Select.prototype._calculateOverlayPosition = /**
     * Calculates the scroll position and x- and y-offsets of the overlay panel.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var items = this._getItemCount();
        /** @type {?} */
        var panelHeight = Math.min(items * SELECT_ITEM_HEIGHT, SELECT_PANEL_MAX_HEIGHT);
        /** @type {?} */
        var scrollContainerHeight = items * SELECT_ITEM_HEIGHT;
        /** @type {?} */
        var maxScroll = scrollContainerHeight - panelHeight;
        if (this._selectionModel.hasValue()) {
            /** @type {?} */
            var selectedIndex = this._getOptionIndex(this._selectionModel.selected[0]);
            selectedIndex += this._getLabelCountBeforeOption(selectedIndex);
            /** @type {?} */
            var scrollBuffer = panelHeight / 2;
            this._scrollTop = this._calculateOverlayScroll(selectedIndex, scrollBuffer, maxScroll);
            this._offsetY = this._calculateOverlayOffsetY(selectedIndex, scrollBuffer, maxScroll);
        }
        else {
            // If no option is selected, the panel centers on the first option. In this case,
            // we must only adjust for the height difference between the option element
            // and the trigger element, then multiply it by -1 to ensure the panel moves
            // in the correct direction up the page.
            this._offsetY = (SELECT_ITEM_HEIGHT - SELECT_TRIGGER_HEIGHT) / 2 * -1;
        }
        this._checkOverlayWithinViewport(maxScroll);
    };
    /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     */
    /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     * @param {?} selectedIndex
     * @param {?} scrollBuffer
     * @param {?} maxScroll
     * @return {?}
     */
    Md2Select.prototype._calculateOverlayScroll = /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     * @param {?} selectedIndex
     * @param {?} scrollBuffer
     * @param {?} maxScroll
     * @return {?}
     */
    function (selectedIndex, scrollBuffer, maxScroll) {
        /** @type {?} */
        var optionOffsetFromScrollTop = SELECT_ITEM_HEIGHT * selectedIndex;
        /** @type {?} */
        var halfOptionHeight = SELECT_ITEM_HEIGHT / 2;
        /** @type {?} */
        var optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
        return clampValue(0, optimalScrollPosition, maxScroll);
    };
    /**
     * Figures out the appropriate animation state for the placeholder.
     */
    /**
     * Figures out the appropriate animation state for the placeholder.
     * @return {?}
     */
    Md2Select.prototype._getPlaceholderAnimationState = /**
     * Figures out the appropriate animation state for the placeholder.
     * @return {?}
     */
    function () {
        if (this.floatPlaceholder === 'never') {
            return '';
        }
        if (this.floatPlaceholder === 'always') {
            return this._floatPlaceholderState();
        }
        return this._placeholderState;
    };
    /**
     * Determines the CSS `opacity` of the placeholder element.
     */
    /**
     * Determines the CSS `opacity` of the placeholder element.
     * @return {?}
     */
    Md2Select.prototype._getPlaceholderOpacity = /**
     * Determines the CSS `opacity` of the placeholder element.
     * @return {?}
     */
    function () {
        return (this.floatPlaceholder !== 'never' || this._selectionModel.isEmpty()) ?
            '1' : '0';
    };
    Object.defineProperty(Md2Select.prototype, "_ariaLabel", {
        /** Returns the aria-label of the select component. */
        get: /**
         * Returns the aria-label of the select component.
         * @return {?}
         */
        function () {
            // If an ariaLabelledby value has been set, the select should not overwrite the
            // `aria-labelledby` value by setting the ariaLabel to the placeholder.
            return this.ariaLabelledby ? null : this.ariaLabel || this.placeholder;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text when
     * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
     * can't be calculated until the panel has been attached, because we need to know the
     * content width in order to constrain the panel within the viewport.
     * @return {?}
     */
    Md2Select.prototype._calculateOverlayOffsetX = /**
     * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text when
     * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
     * can't be calculated until the panel has been attached, because we need to know the
     * content width in order to constrain the panel within the viewport.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var overlayRect = this.overlayDir.overlayRef.overlayElement.getBoundingClientRect();
        /** @type {?} */
        var viewportRect = this._viewportRuler.getViewportRect();
        /** @type {?} */
        var isRtl = this._isRtl();
        /** @type {?} */
        var offsetX;
        // Adjust the offset, depending on the option padding.
        if (this.multiple) {
            offsetX = SELECT_MULTIPLE_PANEL_PADDING_X;
        }
        else {
            /** @type {?} */
            var selected = this._selectionModel.selected[0];
            offsetX = selected && selected.group ? SELECT_PANEL_INDENT_PADDING_X : SELECT_PANEL_PADDING_X;
        }
        // Invert the offset in LTR.
        if (!isRtl) {
            offsetX *= -1;
        }
        /** @type {?} */
        var leftOverflow = 0 - (overlayRect.left + offsetX
            - (isRtl ? SELECT_PANEL_PADDING_X * 2 : 0));
        /** @type {?} */
        var rightOverflow = overlayRect.right + offsetX - viewportRect.width
            + (isRtl ? 0 : SELECT_PANEL_PADDING_X * 2);
        // If the element overflows on either side, reduce the offset to allow it to fit.
        if (leftOverflow > 0) {
            offsetX += leftOverflow + SELECT_PANEL_VIEWPORT_PADDING;
        }
        else if (rightOverflow > 0) {
            offsetX -= rightOverflow + SELECT_PANEL_VIEWPORT_PADDING;
        }
        // Set the offset directly in order to avoid having to go through change detection and
        // potentially triggering "changed after it was checked" errors.
        this.overlayDir.offsetX = offsetX;
        this.overlayDir.overlayRef.updatePosition();
    };
    /**
     * Calculates the y-offset of the select's overlay panel in relation to the
     * top start corner of the trigger. It has to be adjusted in order for the
     * selected option to be aligned over the trigger when the panel opens.
     * @param {?} selectedIndex
     * @param {?} scrollBuffer
     * @param {?} maxScroll
     * @return {?}
     */
    Md2Select.prototype._calculateOverlayOffsetY = /**
     * Calculates the y-offset of the select's overlay panel in relation to the
     * top start corner of the trigger. It has to be adjusted in order for the
     * selected option to be aligned over the trigger when the panel opens.
     * @param {?} selectedIndex
     * @param {?} scrollBuffer
     * @param {?} maxScroll
     * @return {?}
     */
    function (selectedIndex, scrollBuffer, maxScroll) {
        /** @type {?} */
        var optionOffsetFromPanelTop;
        if (this._scrollTop === 0) {
            optionOffsetFromPanelTop = selectedIndex * SELECT_ITEM_HEIGHT;
        }
        else if (this._scrollTop === maxScroll) {
            /** @type {?} */
            var firstDisplayedIndex = this._getItemCount() - SELECT_MAX_OPTIONS_DISPLAYED;
            /** @type {?} */
            var selectedDisplayIndex = selectedIndex - firstDisplayedIndex;
            // Because the panel height is longer than the height of the options alone,
            // there is always extra padding at the top or bottom of the panel. When
            // scrolled to the very bottom, this padding is at the top of the panel and
            // must be added to the offset.
            optionOffsetFromPanelTop =
                selectedDisplayIndex * SELECT_ITEM_HEIGHT + SELECT_PANEL_PADDING_Y;
        }
        else {
            // If the option was scrolled to the middle of the panel using a scroll buffer,
            // its offset will be the scroll buffer minus the half height that was added to
            // center it.
            optionOffsetFromPanelTop = scrollBuffer - SELECT_ITEM_HEIGHT / 2;
        }
        // The final offset is the option's offset from the top, adjusted for the height
        // difference, multiplied by -1 to ensure that the overlay moves in the correct
        // direction up the page.
        return optionOffsetFromPanelTop * -1 - SELECT_ITEM_HEIGHT_ADJUSTMENT;
    };
    /**
     * Checks that the attempted overlay position will fit within the viewport.
     * If it will not fit, tries to adjust the scroll position and the associated
     * y-offset so the panel can open fully on-screen. If it still won't fit,
     * sets the offset back to 0 to allow the fallback position to take over.
     * @param {?} maxScroll
     * @return {?}
     */
    Md2Select.prototype._checkOverlayWithinViewport = /**
     * Checks that the attempted overlay position will fit within the viewport.
     * If it will not fit, tries to adjust the scroll position and the associated
     * y-offset so the panel can open fully on-screen. If it still won't fit,
     * sets the offset back to 0 to allow the fallback position to take over.
     * @param {?} maxScroll
     * @return {?}
     */
    function (maxScroll) {
        /** @type {?} */
        var viewportRect = this._viewportRuler.getViewportRect();
        /** @type {?} */
        var triggerRect = this._getTriggerRect();
        /** @type {?} */
        var topSpaceAvailable = triggerRect.top - SELECT_PANEL_VIEWPORT_PADDING;
        /** @type {?} */
        var bottomSpaceAvailable = viewportRect.height - triggerRect.bottom - SELECT_PANEL_VIEWPORT_PADDING;
        /** @type {?} */
        var panelHeightTop = Math.abs(this._offsetY);
        /** @type {?} */
        var totalPanelHeight = Math.min(this._getItemCount() * SELECT_ITEM_HEIGHT, SELECT_PANEL_MAX_HEIGHT);
        /** @type {?} */
        var panelHeightBottom = totalPanelHeight - panelHeightTop - triggerRect.height;
        if (panelHeightBottom > bottomSpaceAvailable) {
            this._adjustPanelUp(panelHeightBottom, bottomSpaceAvailable);
        }
        else if (panelHeightTop > topSpaceAvailable) {
            this._adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll);
        }
        else {
            this._transformOrigin = this._getOriginBasedOnOption();
        }
    };
    /**
     * Adjusts the overlay panel up to fit in the viewport.
     * @param {?} panelHeightBottom
     * @param {?} bottomSpaceAvailable
     * @return {?}
     */
    Md2Select.prototype._adjustPanelUp = /**
     * Adjusts the overlay panel up to fit in the viewport.
     * @param {?} panelHeightBottom
     * @param {?} bottomSpaceAvailable
     * @return {?}
     */
    function (panelHeightBottom, bottomSpaceAvailable) {
        /** @type {?} */
        var distanceBelowViewport = panelHeightBottom - bottomSpaceAvailable;
        // Scrolls the panel up by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel up into the viewport.
        this._scrollTop -= distanceBelowViewport;
        this._offsetY -= distanceBelowViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very top, it won't be able to fit the panel
        // by scrolling, so set the offset to 0 to allow the fallback position to take
        // effect.
        if (this._scrollTop <= 0) {
            this._scrollTop = 0;
            this._offsetY = 0;
            this._transformOrigin = "50% bottom 0px";
        }
    };
    /**
     * Adjusts the overlay panel down to fit in the viewport.
     * @param {?} panelHeightTop
     * @param {?} topSpaceAvailable
     * @param {?} maxScroll
     * @return {?}
     */
    Md2Select.prototype._adjustPanelDown = /**
     * Adjusts the overlay panel down to fit in the viewport.
     * @param {?} panelHeightTop
     * @param {?} topSpaceAvailable
     * @param {?} maxScroll
     * @return {?}
     */
    function (panelHeightTop, topSpaceAvailable, maxScroll) {
        /** @type {?} */
        var distanceAboveViewport = panelHeightTop - topSpaceAvailable;
        // Scrolls the panel down by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel down into the viewport.
        this._scrollTop += distanceAboveViewport;
        this._offsetY += distanceAboveViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very bottom, it won't be able to fit the
        // panel by scrolling, so set the offset to 0 to allow the fallback position
        // to take effect.
        if (this._scrollTop >= maxScroll) {
            this._scrollTop = maxScroll;
            this._offsetY = 0;
            this._transformOrigin = "50% top 0px";
            return;
        }
    };
    /**
     * Sets the transform origin point based on the selected option.
     * @return {?}
     */
    Md2Select.prototype._getOriginBasedOnOption = /**
     * Sets the transform origin point based on the selected option.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var originY = Math.abs(this._offsetY) - SELECT_ITEM_HEIGHT_ADJUSTMENT + SELECT_ITEM_HEIGHT / 2;
        return "50% " + originY + "px 0px";
    };
    /**
     * Figures out the floating placeholder state value.
     * @return {?}
     */
    Md2Select.prototype._floatPlaceholderState = /**
     * Figures out the floating placeholder state value.
     * @return {?}
     */
    function () {
        return this._isRtl() ? 'floating-rtl' : 'floating-ltr';
    };
    /**
     * Handles the user pressing the arrow keys on a closed select.
     * @param {?} event
     * @return {?}
     */
    Md2Select.prototype._handleArrowKey = /**
     * Handles the user pressing the arrow keys on a closed select.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._multiple) {
            event.preventDefault();
            this.open();
        }
        else {
            /** @type {?} */
            var prevActiveItem = this._keyManager.activeItem;
            // Cycle though the select options even when the select is closed,
            // matching the behavior of the native select element.
            // TODO(crisbeto): native selects also cycle through the options with left/right arrows,
            // however the key manager only supports up/down at the moment.
            this._keyManager.onKeydown(event);
            /** @type {?} */
            var currentActiveItem = /** @type {?} */ (this._keyManager.activeItem);
            if (currentActiveItem !== prevActiveItem) {
                this._clearSelection();
                this._setSelectionByValue(currentActiveItem.value);
                this._propagateChanges();
            }
        }
    };
    /**
     * Calculates the amount of items in the select. This includes options and group labels.
     * @return {?}
     */
    Md2Select.prototype._getItemCount = /**
     * Calculates the amount of items in the select. This includes options and group labels.
     * @return {?}
     */
    function () {
        return this.options.length + this.optionGroups.length;
    };
    /**
     * Calculates the amount of option group labels that precede the specified option.
     * Useful when positioning the panel, because the labels will offset the index of the
     * currently-selected option.
     * @param {?} optionIndex
     * @return {?}
     */
    Md2Select.prototype._getLabelCountBeforeOption = /**
     * Calculates the amount of option group labels that precede the specified option.
     * Useful when positioning the panel, because the labels will offset the index of the
     * currently-selected option.
     * @param {?} optionIndex
     * @return {?}
     */
    function (optionIndex) {
        if (this.optionGroups.length) {
            /** @type {?} */
            var options = this.options.toArray();
            /** @type {?} */
            var groups = this.optionGroups.toArray();
            /** @type {?} */
            var groupCounter = 0;
            for (var i = 0; i < optionIndex + 1; i++) {
                if (options[i].group && options[i].group === groups[groupCounter]) {
                    groupCounter++;
                }
            }
            return groupCounter;
        }
        return 0;
    };
    Md2Select.decorators = [
        { type: Component, args: [{
                    selector: 'md2-select',
                    template: "<div class=\"md2-select-trigger\" cdk-overlay-origin (click)=\"toggle()\" #origin=\"cdkOverlayOrigin\" #trigger>\n  <span class=\"md2-select-placeholder\"\n        [class.md2-floating-placeholder]=\"_selectionModel.hasValue()\"\n        [@transformPlaceholder]=\"_getPlaceholderAnimationState()\"\n        [style.opacity]=\"_getPlaceholderOpacity()\"\n        [style.width.px]=\"_selectedValueWidth\">{{ placeholder }}</span>\n  <span class=\"md2-select-value\" *ngIf=\"_selectionModel.hasValue()\">\n    <span class=\"md2-select-value-text\">{{ triggerValue }}</span>\n  </span>\n  <span class=\"md2-select-arrow\"></span>\n  <span class=\"md2-select-underline\"></span>\n</div>\n<ng-template cdk-connected-overlay [origin]=\"origin\" [open]=\"panelOpen\" hasBackdrop (backdropClick)=\"close()\"\n             backdropClass=\"cdk-overlay-transparent-backdrop\" [positions]=\"_positions\" [minWidth]=\"_triggerWidth\"\n             [offsetY]=\"_offsetY\" (attach)=\"_onAttached()\" (detach)=\"close()\">\n  <div class=\"md2-select-panel\" [@transformPanel]=\"'showing'\" (@transformPanel.done)=\"_onPanelDone()\"\n       (keydown)=\"_keyManager.onKeydown($event)\" [style.transformOrigin]=\"_transformOrigin\"\n       [class.md2-select-panel-done-animating]=\"_panelDoneAnimating\">\n    <div class=\"md2-select-content\" [@fadeInContent]=\"'showing'\" (@fadeInContent.done)=\"_onFadeInDone()\">\n      <ng-content select=\"md2-select-header\"></ng-content>\n      <ng-content></ng-content>\n    </div>\n  </div>\n</ng-template>\n",
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        'role': 'listbox',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.aria-label]': '_ariaLabel',
                        '[attr.aria-labelledby]': 'ariaLabelledby',
                        '[attr.aria-required]': 'required.toString()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-invalid]': '_control?.invalid || "false"',
                        '[attr.aria-owns]': '_optionIds',
                        '[class.md2-select-disabled]': 'disabled',
                        '[class.md2-select]': 'true',
                        '(keydown)': '_handleClosedKeydown($event)',
                        '(blur)': '_onBlur()',
                    },
                    animations: [
                        transformPlaceholder,
                        transformPanel,
                        fadeInContent
                    ],
                    exportAs: 'md2Select',
                    styles: [".md2-select{display:inline-block;outline:0}.md2-select-trigger{color:rgba(0,0,0,.38);display:flex;align-items:center;height:30px;min-width:112px;cursor:pointer;position:relative;box-sizing:border-box;font-size:16px}[aria-disabled=true] .md2-select-trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.md2-select:focus:not(.md2-select-disabled) .md2-select-trigger{color:#106cc8}.md2-select.ng-invalid.ng-touched:not(.md2-select-disabled) .md2-select-trigger{color:#f44336}.md2-select-underline{position:absolute;bottom:0;left:0;right:0;height:1px;background-color:rgba(0,0,0,.12)}[aria-disabled=true] .md2-select-underline{background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;background-color:transparent;background-position:0 bottom}.md2-select:focus:not(.md2-select-disabled) .md2-select-underline{background-color:#106cc8}.md2-select.ng-invalid.ng-touched:not(.md2-select-disabled) .md2-select-underline{background-color:#f44336}.md2-select-placeholder{position:relative;padding:0 2px;-webkit-transform-origin:left top;transform-origin:left top;flex-grow:1}.md2-select-placeholder.md2-floating-placeholder{top:-22px;left:-2px;text-align:left;-webkit-transform:scale(.75);transform:scale(.75)}[dir=rtl] .md2-select-placeholder{-webkit-transform-origin:right top;transform-origin:right top}[dir=rtl] .md2-select-placeholder.md2-floating-placeholder{left:2px;text-align:right}[aria-required=true] .md2-select-placeholder::after{content:'*'}.md2-select-value{position:absolute;max-width:calc(100% - 18px);flex-grow:1;top:0;left:0;bottom:0;display:flex;align-items:center;color:rgba(0,0,0,.87)}[dir=rtl] .md2-select-value{left:auto;right:0}.md2-select-disabled .md2-select-value{color:rgba(0,0,0,.38)}.md2-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:30px}.md2-select-arrow{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;margin:0 4px}.md2-select-panel{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;padding-top:0;padding-bottom:0;max-height:256px;min-width:100%}@media screen and (-ms-high-contrast:active){.md2-select-panel{outline:solid 1px}}.md2-select-content,.md2-select-panel-done-animating{background:#fff}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-transparent-backdrop{background:0 0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}"]
                }] }
    ];
    /** @nocollapse */
    Md2Select.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ViewportRuler },
        { type: ChangeDetectorRef },
        { type: Dir, decorators: [{ type: Optional }] },
        { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] }
    ]; };
    Md2Select.propDecorators = {
        trigger: [{ type: ViewChild, args: ['trigger',] }],
        overlayDir: [{ type: ViewChild, args: [ConnectedOverlayDirective,] }],
        options: [{ type: ContentChildren, args: [Md2Option, { descendants: true },] }],
        optionGroups: [{ type: ContentChildren, args: [Md2Optgroup,] }],
        placeholder: [{ type: Input }],
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        multiple: [{ type: Input }],
        floatPlaceholder: [{ type: Input }],
        tabIndex: [{ type: Input }],
        ariaLabel: [{ type: Input, args: ['aria-label',] }],
        ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
        onOpen: [{ type: Output }],
        onClose: [{ type: Output }],
        change: [{ type: Output }]
    };
    return Md2Select;
}());
/**
 * Clamps a value n between min and max values.
 * @param {?} min
 * @param {?} n
 * @param {?} max
 * @return {?}
 */
function clampValue(min, n, max) {
    return Math.min(Math.max(min, n), max);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Fixed header that will be rendered above a select's options.
 */
var Md2SelectHeader = /** @class */ (function () {
    function Md2SelectHeader() {
    }
    Md2SelectHeader.decorators = [
        { type: Directive, args: [{
                    selector: 'md2-select-header',
                    host: {
                        'class': 'md2-select-header',
                    }
                },] }
    ];
    return Md2SelectHeader;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2SelectModule = /** @class */ (function () {
    function Md2SelectModule() {
    }
    Md2SelectModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        Md2OptionModule,
                        MdCommonModule,
                    ],
                    exports: [Md2Select, Md2SelectHeader, Md2OptionModule, MdCommonModule],
                    declarations: [Md2Select, Md2SelectHeader],
                },] }
    ];
    return Md2SelectModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2PaginationChange = /** @class */ (function () {
    function Md2PaginationChange() {
    }
    return Md2PaginationChange;
}());
var Md2DataTable = /** @class */ (function () {
    function Md2DataTable(differs) {
        this.differs = differs;
        this.isDataChanged = false;
        this._data = [];
        this._activePage = 1;
        this._rowsPerPage = 1000;
        this._sortBy = '';
        this._sortOrder = 'asc';
        this.activePageChange = new EventEmitter();
        this.rowsPerPageChange = new EventEmitter();
        this.sortByChange = new EventEmitter();
        this.sortOrderChange = new EventEmitter();
        this.onSortChange = new EventEmitter();
        this.onPageChange = new EventEmitter();
        this.diff = differs.find([]).create(null);
    }
    Object.defineProperty(Md2DataTable.prototype, "md2Data", {
        get: /**
         * @return {?}
         */
        function () { return this._data; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._data !== value) {
                this._data = value || [];
                this.recalculatePage();
                this.isDataChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DataTable.prototype, "activePage", {
        get: /**
         * @return {?}
         */
        function () { return this._activePage; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._activePage !== value) {
                this._activePage = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DataTable.prototype, "rowsPerPage", {
        get: /**
         * @return {?}
         */
        function () { return this._rowsPerPage; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._rowsPerPage !== value) {
                this._rowsPerPage = value;
                this.setPage(this.activePage, value);
                this.isDataChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DataTable.prototype, "sortBy", {
        get: /**
         * @return {?}
         */
        function () { return this._sortBy; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._sortBy !== value) {
                this._sortBy = value;
                if (value) {
                    this.onSortChange.next({ sortBy: this.sortBy, sortOrder: this.sortOrder });
                }
                this.isDataChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DataTable.prototype, "sortOrder", {
        get: /**
         * @return {?}
         */
        function () { return this._sortOrder; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!(value === 'asc' || value === 'desc')) {
                console.warn('sortOrder value must be one of ["asc", "desc"], but is:', value);
                value = 'asc';
            }
            if (this._sortOrder !== value) {
                this._sortOrder = value;
                this.isDataChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Md2DataTable.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var changes = this.diff.diff(this.md2Data);
        if (changes) {
            this.recalculatePage();
            this.isDataChanged = true;
        }
        if (this.isDataChanged) {
            this.fillData();
            this.diff.diff(this.md2Data);
            this.isDataChanged = false;
        }
    };
    /**
     * @return {?}
     */
    Md2DataTable.prototype.getSort = /**
     * @return {?}
     */
    function () {
        return { sortBy: this.sortBy, sortOrder: this.sortOrder };
    };
    /**
     * @param {?} sortBy
     * @param {?} sortOrder
     * @return {?}
     */
    Md2DataTable.prototype.setSort = /**
     * @param {?} sortBy
     * @param {?} sortOrder
     * @return {?}
     */
    function (sortBy, sortOrder) {
        if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
            this.sortBy = sortBy;
            this.sortOrder = sortOrder;
            this.isDataChanged = true;
            this.onSortChange.next({ sortBy: sortBy, sortOrder: sortOrder });
            this.sortByChange.emit(this.sortBy);
            this.sortOrderChange.emit(this.sortOrder);
        }
    };
    /**
     * @return {?}
     */
    Md2DataTable.prototype.getPage = /**
     * @return {?}
     */
    function () {
        return {
            activePage: this.activePage,
            rowsPerPage: this.rowsPerPage,
            dataLength: this.md2Data.length
        };
    };
    /**
     * @param {?} activePage
     * @param {?} rowsPerPage
     * @return {?}
     */
    Md2DataTable.prototype.setPage = /**
     * @param {?} activePage
     * @param {?} rowsPerPage
     * @return {?}
     */
    function (activePage, rowsPerPage) {
        if (this.rowsPerPage !== rowsPerPage || this.activePage !== activePage) {
            this.activePage = this.activePage !== activePage ?
                activePage : this.calculateNewActivePage(this.rowsPerPage, rowsPerPage);
            if (this.rowsPerPage !== rowsPerPage) {
                this._rowsPerPage = rowsPerPage;
                this.rowsPerPageChange.emit(this.rowsPerPage);
            }
            this.isDataChanged = true;
            this.onPageChange.emit({
                activePage: this.activePage,
                rowsPerPage: this.rowsPerPage,
                dataLength: this.md2Data ? this.md2Data.length : 0
            });
            this.activePageChange.emit(this.activePage);
        }
    };
    /**
     * @param {?} previousRowsPerPage
     * @param {?} currentRowsPerPage
     * @return {?}
     */
    Md2DataTable.prototype.calculateNewActivePage = /**
     * @param {?} previousRowsPerPage
     * @param {?} currentRowsPerPage
     * @return {?}
     */
    function (previousRowsPerPage, currentRowsPerPage) {
        /** @type {?} */
        var firstRowOnPage = (this.activePage - 1) * previousRowsPerPage + 1;
        /** @type {?} */
        var newActivePage = Math.ceil(firstRowOnPage / currentRowsPerPage);
        return newActivePage;
    };
    /**
     * @return {?}
     */
    Md2DataTable.prototype.recalculatePage = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var lastPage = Math.ceil(this.md2Data.length / this.rowsPerPage);
        if (lastPage < this.activePage) {
            this._activePage = lastPage || 1;
            setTimeout(function () {
                _this.activePageChange.emit(_this.activePage);
            }, 10);
        }
        this.onPageChange.emit({
            activePage: this.activePage,
            rowsPerPage: this.rowsPerPage,
            dataLength: this.md2Data.length
        });
    };
    /**
     * @return {?}
     */
    Md2DataTable.prototype.fillData = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var offset = (this.activePage - 1) * this.rowsPerPage;
        /** @type {?} */
        var data = this.md2Data;
        /** @type {?} */
        var sortInt = this.sortOrder === 'desc' ? -1 : 1;
        if (this.sortBy) {
            data = data.sort(function (a, b) {
                /** @type {?} */
                var x = _this.caseInsensitiveIteratee(a);
                /** @type {?} */
                var y = _this.caseInsensitiveIteratee(b);
                return ((x > y) ? 1 : (y > x) ? -1 : 0) * sortInt;
            });
        }
        this.data = data.slice(offset, offset + this.rowsPerPage);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Md2DataTable.prototype.caseInsensitiveIteratee = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var e_1, _a;
        if (typeof this.sortBy === 'string' || this.sortBy instanceof String) {
            try {
                for (var _b = __values(this.sortBy.split('.')), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var sortByProperty = _c.value;
                    value = value[sortByProperty];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            value = value[this.sortBy + ''];
        }
        if (value && typeof value === 'string' || value instanceof String) {
            return value.toLowerCase();
        }
        return value;
    };
    Md2DataTable.decorators = [
        { type: Directive, args: [{
                    selector: 'table[md2Data]',
                    exportAs: 'md2DataTable'
                },] }
    ];
    /** @nocollapse */
    Md2DataTable.ctorParameters = function () { return [
        { type: IterableDiffers }
    ]; };
    Md2DataTable.propDecorators = {
        md2Data: [{ type: Input }],
        activePage: [{ type: Input }],
        rowsPerPage: [{ type: Input }],
        sortBy: [{ type: Input }],
        sortOrder: [{ type: Input }],
        activePageChange: [{ type: Output }],
        rowsPerPageChange: [{ type: Output }],
        sortByChange: [{ type: Output }],
        sortOrderChange: [{ type: Output }]
    };
    return Md2DataTable;
}());
var Md2DataTableSortBy = /** @class */ (function () {
    function Md2DataTableSortBy(_md2Table) {
        this._md2Table = _md2Table;
        this._isAsc = false;
        this._isDesc = false;
    }
    /**
     * @return {?}
     */
    Md2DataTableSortBy.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._md2Table.onSortChange.subscribe(function (event) {
            _this._isAsc = (event.sortBy === _this.md2SortBy && event.sortOrder === 'asc');
            _this._isDesc = (event.sortBy === _this.md2SortBy && event.sortOrder === 'desc');
        });
    };
    /**
     * @return {?}
     */
    Md2DataTableSortBy.prototype._sort = /**
     * @return {?}
     */
    function () {
        if (this._isAsc) {
            this._md2Table.setSort(this.md2SortBy, 'desc');
        }
        else {
            this._md2Table.setSort(this.md2SortBy, 'asc');
        }
    };
    Md2DataTableSortBy.decorators = [
        { type: Component, args: [{
                    selector: '[md2SortBy]',
                    template: "<ng-content></ng-content>\n&nbsp;\n<svg *ngIf=\"!_isDesc\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\">\n  <path d=\"M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z\" />\n</svg>\n<svg *ngIf=\"_isDesc\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\">\n  <path d=\"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z\" />\n</svg>\n",
                    host: {
                        '[class.md2-sort-active]': '_isAsc || _isDesc',
                        '(click)': '_sort()'
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: ["[md2SortBy]{line-height:24px;color:rgba(0,0,0,.54);white-space:nowrap;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[md2SortBy] svg{display:inline-block;vertical-align:middle;fill:currentColor;opacity:0}[md2SortBy]:hover:not(.md2-sort-active) svg{color:rgba(0,0,0,.26);opacity:1}[md2SortBy].md2-sort-active{color:rgba(0,0,0,.87)}[md2SortBy].md2-sort-active svg{opacity:1}md2-pagination{display:block;color:rgba(0,0,0,.54);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}md2-pagination::after,md2-pagination::before{display:table;content:''}md2-pagination::after{clear:both}md2-pagination .md2-pagination{display:inline-block;margin:8px 0;padding:0}md2-pagination .md2-pagination li{position:relative;display:inline-block;width:36px;vertical-align:top;text-align:center;line-height:36px;border-radius:100px;cursor:pointer;box-sizing:border-box}md2-pagination .md2-pagination li:hover:not(.disabled):not(.active){background:rgba(0,0,0,.12)}md2-pagination .md2-pagination li.disabled{pointer-events:none;background:0 0;cursor:default;opacity:.48}md2-pagination .md2-pagination li.active{background:#106cc8;color:#fff;cursor:default}md2-pagination .md2-pagination li svg{fill:currentColor;margin-bottom:-7px}md2-pagination .md2-rows-select{display:inline-block;margin:8px 0;padding:0;float:right;color:rgba(0,0,0,.54);line-height:36px}md2-pagination .md2-rows-select label{vertical-align:sub;margin-right:10px}md2-pagination .md2-rows-select md2-select{display:inline-block;border:0;outline:0}md2-pagination .md2-rows-select .md2-select-trigger{border-width:0;min-width:40px}"]
                }] }
    ];
    /** @nocollapse */
    Md2DataTableSortBy.ctorParameters = function () { return [
        { type: Md2DataTable }
    ]; };
    Md2DataTableSortBy.propDecorators = {
        md2SortBy: [{ type: Input }]
    };
    return Md2DataTableSortBy;
}());
var Md2Pagination = /** @class */ (function () {
    function Md2Pagination(_dataTable) {
        var _this = this;
        this._dataTable = _dataTable;
        this._activePage = 1;
        this.rowsPerPageSet = [];
        this.paginationLabel = 'Rows per page:';
        this._dataLength = 0;
        this.onPageChangeSubscriber = function (event) {
            _this._activePage = event.activePage;
            _this._rowsPerPage = event.rowsPerPage;
            _this._dataLength = event.dataLength;
            _this._lastPage = Math.ceil(_this._dataLength / _this._rowsPerPage);
        };
    }
    /**
     * @return {?}
     */
    Md2Pagination.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        this.md2Table = this.md2Table || this._dataTable;
        this.onPageChangeSubscriber(this.md2Table.getPage());
        this.md2Table.onPageChange.subscribe(this.onPageChangeSubscriber);
    };
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    Md2Pagination.prototype._setPage = /**
     * @param {?} pageNumber
     * @return {?}
     */
    function (pageNumber) {
        this.md2Table.setPage(pageNumber, this._rowsPerPage);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Md2Pagination.prototype._setRows = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.md2Table.setPage(this._activePage, parseInt(event.value));
    };
    Md2Pagination.decorators = [
        { type: Component, args: [{
                    selector: 'md2-pagination',
                    template: "<ul class=\"md2-pagination\" *ngIf=\"_dataLength > _rowsPerPage\">\n  <li [class.disabled]=\"_activePage <= 1\" (click)=\"_setPage(_activePage - 1)\">\n    <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n      <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\" />\n    </svg>\n  </li>\n  <li *ngIf=\"_activePage > 4 && _activePage + 1 > _lastPage\" (click)=\"_setPage(_activePage - 4)\">\n    {{_activePage-4}}\n  </li>\n  <li *ngIf=\"_activePage > 3 && _activePage + 2 > _lastPage\" (click)=\"_setPage(_activePage - 3)\">\n    {{_activePage-3}}\n  </li>\n  <li *ngIf=\"_activePage > 2\" (click)=\"_setPage(_activePage - 2)\">\n    {{_activePage-2}}\n  </li>\n  <li *ngIf=\"_activePage > 1\" (click)=\"_setPage(_activePage - 1)\">\n    {{_activePage-1}}\n  </li>\n  <li class=\"active\">{{_activePage}}</li>\n  <li *ngIf=\"_activePage + 1 <= _lastPage\" (click)=\"_setPage(_activePage + 1)\">\n    {{_activePage+1}}\n  </li>\n  <li *ngIf=\"_activePage + 2 <= _lastPage\" (click)=\"_setPage(_activePage + 2)\">\n    {{_activePage+2}}\n  </li>\n  <li *ngIf=\"_activePage + 3 <= _lastPage && _activePage < 3\" (click)=\"_setPage(_activePage + 3)\">\n    {{_activePage+3}}\n  </li>\n  <li *ngIf=\"_activePage + 4 <= _lastPage && _activePage < 2\" (click)=\"_setPage(_activePage + 4)\">\n    {{_activePage+4}}\n  </li>\n  <li [class.disabled]=\"_activePage >= _lastPage\" (click)=\"_setPage(_activePage + 1)\">\n    <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n      <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\" />\n    </svg>\n  </li>\n</ul>\n<div class=\"md2-rows-select\" *ngIf=\"rowsPerPageSet.length && _dataLength > 0\">\n  <label>{{paginationLabel}}</label>\n  <md2-select [(ngModel)]=\"_rowsPerPage\" (change)=\"_setRows($event)\">\n    <md2-option *ngFor=\"let row of rowsPerPageSet\" [value]=\"row\">{{row}}</md2-option>\n  </md2-select>\n</div>\n",
                    exportAs: 'md2Pagination',
                    encapsulation: ViewEncapsulation.None,
                    styles: ["[md2SortBy]{line-height:24px;color:rgba(0,0,0,.54);white-space:nowrap;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[md2SortBy] svg{display:inline-block;vertical-align:middle;fill:currentColor;opacity:0}[md2SortBy]:hover:not(.md2-sort-active) svg{color:rgba(0,0,0,.26);opacity:1}[md2SortBy].md2-sort-active{color:rgba(0,0,0,.87)}[md2SortBy].md2-sort-active svg{opacity:1}md2-pagination{display:block;color:rgba(0,0,0,.54);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}md2-pagination::after,md2-pagination::before{display:table;content:''}md2-pagination::after{clear:both}md2-pagination .md2-pagination{display:inline-block;margin:8px 0;padding:0}md2-pagination .md2-pagination li{position:relative;display:inline-block;width:36px;vertical-align:top;text-align:center;line-height:36px;border-radius:100px;cursor:pointer;box-sizing:border-box}md2-pagination .md2-pagination li:hover:not(.disabled):not(.active){background:rgba(0,0,0,.12)}md2-pagination .md2-pagination li.disabled{pointer-events:none;background:0 0;cursor:default;opacity:.48}md2-pagination .md2-pagination li.active{background:#106cc8;color:#fff;cursor:default}md2-pagination .md2-pagination li svg{fill:currentColor;margin-bottom:-7px}md2-pagination .md2-rows-select{display:inline-block;margin:8px 0;padding:0;float:right;color:rgba(0,0,0,.54);line-height:36px}md2-pagination .md2-rows-select label{vertical-align:sub;margin-right:10px}md2-pagination .md2-rows-select md2-select{display:inline-block;border:0;outline:0}md2-pagination .md2-rows-select .md2-select-trigger{border-width:0;min-width:40px}"]
                }] }
    ];
    /** @nocollapse */
    Md2Pagination.ctorParameters = function () { return [
        { type: Md2DataTable, decorators: [{ type: Optional }] }
    ]; };
    Md2Pagination.propDecorators = {
        rowsPerPageSet: [{ type: Input }],
        md2Table: [{ type: Input }],
        paginationLabel: [{ type: Input }]
    };
    return Md2Pagination;
}());
/** @type {?} */
var MD2_DATA_TABLE_DIRECTIVES = [
    Md2DataTable,
    Md2DataTableSortBy,
    Md2Pagination
];
var Md2DataTableModule = /** @class */ (function () {
    function Md2DataTableModule() {
    }
    Md2DataTableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule, Md2SelectModule],
                    exports: MD2_DATA_TABLE_DIRECTIVES,
                    declarations: MD2_DATA_TABLE_DIRECTIVES,
                },] }
    ];
    return Md2DataTableModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * The default month names to use if Intl API is not available.
  @type {?} */
var DEFAULT_MONTH_NAMES$1 = {
    'long': [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'
    ],
    'short': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    'narrow': ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
};
var ɵ0$2 = function (i) { return String(i + 1); };
/** *
 * The default date names to use if Intl API is not available.
  @type {?} */
var DEFAULT_DATE_NAMES$1 = range$1(31, ɵ0$2);
var ɵ1 = function (i) { return String(i); };
/** *
 * The default hour names to use if Intl API is not available.
  @type {?} */
var DEFAULT_HOUR_NAMES = range$1(24, ɵ1);
var ɵ2 = function (i) { return String(i); };
/** *
 * The default minute names to use if Intl API is not available.
  @type {?} */
var DEFAULT_MINUTE_NAMES = range$1(60, ɵ2);
/** *
 * The default day of the week names to use if Intl API is not available.
  @type {?} */
var DEFAULT_DAY_OF_WEEK_NAMES$1 = {
    'long': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    'short': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'narrow': ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};
/**
 * Creates an array and fills it with values.
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range$1(length, valueFunction) {
    /** @type {?} */
    var valuesArray = Array(length);
    for (var i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
var DateLocale = /** @class */ (function () {
    function DateLocale() {
        this.firstDayOfWeek = 0;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    DateLocale.prototype.getDayOfWeek = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getDay();
    };
    /**
     * @param {?} style
     * @return {?}
     */
    DateLocale.prototype.getMonthNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style$$1) {
        if (this.months) {
            return this.months[style$$1];
        }
        return DEFAULT_MONTH_NAMES$1[style$$1];
    };
    /**
     * @return {?}
     */
    DateLocale.prototype.getDateNames = /**
     * @return {?}
     */
    function () {
        if (this.dates) {
            return this.dates;
        }
        return DEFAULT_DATE_NAMES$1;
    };
    /**
     * @return {?}
     */
    DateLocale.prototype.getHourNames = /**
     * @return {?}
     */
    function () {
        if (this.hours) {
            return this.hours;
        }
        return DEFAULT_HOUR_NAMES;
    };
    /**
     * @return {?}
     */
    DateLocale.prototype.getMinuteNames = /**
     * @return {?}
     */
    function () {
        if (this.minutes) {
            return this.minutes;
        }
        return DEFAULT_MINUTE_NAMES;
    };
    /**
     * @param {?} style
     * @return {?}
     */
    DateLocale.prototype.getDayOfWeekNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style$$1) {
        if (this.daysOfWeek) {
            return this.daysOfWeek[style$$1];
        }
        return DEFAULT_DAY_OF_WEEK_NAMES$1[style$$1];
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateLocale.prototype.getYearName = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return String(date.getFullYear());
    };
    /**
     * @return {?}
     */
    DateLocale.prototype.getFirstDayOfWeek = /**
     * @return {?}
     */
    function () {
        // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
        return this.firstDayOfWeek;
    };
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    DateLocale.prototype.format = /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    function (date, displayFormat) {
        return this._stripDirectionalityCharacters(date.toDateString());
    };
    /**
     * @param {?} d
     * @return {?}
     */
    DateLocale.prototype.getDateLabel = /**
     * @param {?} d
     * @return {?}
     */
    function (d) {
        /** @type {?} */
        var day = this.getDayOfWeekNames('short')[d.getDay()];
        /** @type {?} */
        var date = this.getDateNames()[d.getDate() - 1];
        /** @type {?} */
        var month = this.getMonthNames('short')[d.getMonth()];
        return day + ", " + month + " " + date;
    };
    /**
     * @param {?} d
     * @return {?}
     */
    DateLocale.prototype.getHoursLabel = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return "" + this.getHourNames()[d.getHours()]; };
    /**
     * @param {?} d
     * @return {?}
     */
    DateLocale.prototype.getMinutesLabel = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return "" + this.getMinuteNames()[d.getMinutes()]; };
    /**
     * @param {?} d
     * @return {?}
     */
    DateLocale.prototype.getMonthLabel = /**
     * @param {?} d
     * @return {?}
     */
    function (d) {
        return this.getMonthNames('long')[d.getMonth()] + " " + this.getYearName(d);
    };
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param {?} s The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    DateLocale.prototype._stripDirectionalityCharacters = /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param {?} s The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    function (s) {
        return s.replace(/[\u200e\u200f]/g, '');
    };
    DateLocale.decorators = [
        { type: Injectable }
    ];
    return DateLocale;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DateUtil = /** @class */ (function () {
    function DateUtil() {
        this._locale = new DateLocale();
        this.parseDateMap = {
            'y': 0,
            // placeholder -> ctorIndex
            'Y': [0, -2000],
            'M': [1, 1],
            // placeholder -> [ctorIndex, offset|value array]
            'n': [1, this._locale.getMonthNames('short')],
            'N': [1, this._locale.getMonthNames('long')],
            'd': 2,
            'm': 4,
            'H': 3,
            'h': 3,
            'K': [3, 1],
            'k': [3, 1],
            's': 5,
            'S': 6,
            'a': [3, ['am', 'pm']],
            'A': [3, ['AM', 'PM']]
        };
    }
    /**
     * @param {?} s
     * @param {?} regexp
     * @param {?=} sub
     * @return {?}
     */
    DateUtil.prototype.replace = /**
     * @param {?} s
     * @param {?} regexp
     * @param {?=} sub
     * @return {?}
     */
    function (s, regexp, sub) {
        return (s != null ? '' + s : '').replace(regexp, sub != null ? sub : '');
    };
    /**
     * @param {?} base
     * @param {?} start
     * @return {?}
     */
    DateUtil.prototype.startsWith = /**
     * @param {?} base
     * @param {?} start
     * @return {?}
     */
    function (base, start) {
        return start != null && base.substr(0, start.length) == start;
    };
    /**
     * @param {?} s
     * @param {?} o
     * @return {?}
     */
    DateUtil.prototype.isType = /**
     * @param {?} s
     * @param {?} o
     * @return {?}
     */
    function (s, o) {
        return typeof s == o;
    };
    /**
     * @param {?} f
     * @return {?}
     */
    DateUtil.prototype.isFunction = /**
     * @param {?} f
     * @return {?}
     */
    function (f) {
        return this.isType(f, 'function');
    };
    /**
     * @param {?} v
     * @return {?}
     */
    DateUtil.prototype.isList = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        return !!v && v.length != null && !this.isString(v) && !this.isNode(v) && !this.isFunction(v);
    };
    /**
     * @param {?} s
     * @return {?}
     */
    DateUtil.prototype.isString = /**
     * @param {?} s
     * @return {?}
     */
    function (s) {
        return this.isType(s, 'string');
    };
    /**
     * @param {?} f
     * @return {?}
     */
    DateUtil.prototype.isObject = /**
     * @param {?} f
     * @return {?}
     */
    function (f) {
        return !!f && this.isType(f, 'object');
    };
    /**
     * @param {?} n
     * @return {?}
     */
    DateUtil.prototype.isNode = /**
     * @param {?} n
     * @return {?}
     */
    function (n) {
        return n && n['nodeType'];
    };
    /**
     * @param {?} n
     * @return {?}
     */
    DateUtil.prototype.isNumber = /**
     * @param {?} n
     * @return {?}
     */
    function (n) {
        return this.isType(n, 'number');
    };
    /**
     * @param {?} findFunc
     * @return {?}
     */
    DateUtil.prototype.getFindFunc = /**
     * @param {?} findFunc
     * @return {?}
     */
    function (findFunc) {
        return this.isFunction(findFunc) ? findFunc : function (obj, index) {
            if (findFunc === obj) {
                return index;
            }
        };
    };
    /**
     * @param {?} list
     * @param {?} index
     * @param {?} defaultIndex
     * @return {?}
     */
    DateUtil.prototype.getFindIndex = /**
     * @param {?} list
     * @param {?} index
     * @param {?} defaultIndex
     * @return {?}
     */
    function (list, index, defaultIndex) {
        return index == null ? defaultIndex :
            index < 0 ? Math.max(list.length + index, 0) : Math.min(list.length, index);
    };
    /**
     * @param {?} list
     * @param {?} findFunc
     * @param {?=} startIndex
     * @param {?=} endIndex
     * @return {?}
     */
    DateUtil.prototype.find = /**
     * @param {?} list
     * @param {?} findFunc
     * @param {?=} startIndex
     * @param {?=} endIndex
     * @return {?}
     */
    function (list, findFunc, startIndex, endIndex) {
        /** @type {?} */
        var f = this.getFindFunc(findFunc);
        /** @type {?} */
        var e = this.getFindIndex(list, endIndex, list.length);
        /** @type {?} */
        var r;
        for (var i = this.getFindIndex(list, startIndex, 0); i < e; i++) {
            if ((r = f.call(list, list[i], i)) != null) {
                return r;
            }
        }
    };
    /**
     * @param {?} date
     * @param {?} fmt
     * @return {?}
     */
    DateUtil.prototype.parseDate = /**
     * @param {?} date
     * @param {?} fmt
     * @return {?}
     */
    function (date, fmt) {
        var _this = this;
        /** @type {?} */
        var indexMap = {};
        /** @type {?} */
        var reIndex = 1;
        /** @type {?} */
        var match;
        /** @type {?} */
        var format = this.replace(fmt, /^\?/);
        if (format != fmt && !this.replace(date, /^\s+|\s+$/g)) {
            return null;
        }
        if (match = /^\[([+-])(\d\d)(\d\d)\]\s*(.*)/.exec(format)) {
            format = match[4];
        }
        /** @type {?} */
        var parser = new RegExp(format.replace(/(.)(\1*)(?:\[([^\]]*)\])?/g, function (wholeMatch, placeholderChar, placeholderDigits, param) {
            if (/[dmhkyhs]/i.test(placeholderChar)) {
                indexMap[reIndex++] = placeholderChar;
                /** @type {?} */
                var plen = placeholderDigits.length + 1;
                return '(\\d' + (plen < 2 ? '+' : ('{1,' + plen + '}')) + ')';
            }
            else if (placeholderChar == 'z') {
                reIndex += 3;
                return '([+-])(\\d\\d)(\\d\\d)';
            }
            else if (/[NnaA]/.test(placeholderChar)) {
                indexMap[reIndex++] = [placeholderChar, param && param.split(',')];
                return '([a-zA-Z\\u0080-\\u1fff]+)';
            }
            else if (/w/i.test(placeholderChar)) {
                return '[a-zA-Z\\u0080-\\u1fff]+';
            }
            else if (/\s/.test(placeholderChar)) {
                return '\\s+';
            }
            else {
                return _this.replace(wholeMatch, /[\\\[\]\/{}()*+?.$|^-]/g, '\\$&');
            }
        }));
        if (!(match = parser.exec(date))) {
            return undefined;
        }
        /** @type {?} */
        var ctorArgs = [0, 0, 0, 0, 0, 0, 0];
        var _loop_1 = function (i) {
            /** @type {?} */
            var matchVal = match[i];
            /** @type {?} */
            var indexEntry = indexMap[i];
            if (this_1.isList(indexEntry)) { // for a, n or N
                /** @type {?} */
                var placeholderChar = indexEntry[0];
                /** @type {?} */
                var mapEntry = this_1.parseDateMap[placeholderChar];
                /** @type {?} */
                var ctorIndex = mapEntry[0];
                /** @type {?} */
                var valList = indexEntry[1] || mapEntry[1];
                /** @type {?} */
                var listValue = this_1.find(valList, function (v, index) {
                    if (_this.startsWith(matchVal.toLowerCase(), v.toLowerCase())) {
                        return index;
                    }
                });
                if (listValue == null) {
                    return { value: undefined };
                }
                if (placeholderChar == 'a' || placeholderChar == 'A') {
                    ctorArgs[ctorIndex] += listValue * 12;
                }
                else {
                    ctorArgs[ctorIndex] = listValue;
                }
            }
            else if (indexEntry) { // for numeric values (yHmMs)
                /** @type {?} */
                var value = parseFloat(matchVal);
                /** @type {?} */
                var mapEntry = this_1.parseDateMap[indexEntry];
                if (this_1.isList(mapEntry)) {
                    ctorArgs[mapEntry[0]] += value - mapEntry[1];
                }
                else {
                    ctorArgs[mapEntry] += value;
                }
            }
        };
        var this_1 = this;
        for (var i = 1; i < reIndex; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        /** @type {?} */
        var d = new Date(ctorArgs[0], ctorArgs[1], ctorArgs[2], ctorArgs[3], ctorArgs[4], ctorArgs[5], ctorArgs[6]);
        return d;
    };
    /**
     * @return {?}
     */
    DateUtil.prototype.today = /**
     * @return {?}
     */
    function () {
        return new Date();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DateUtil.prototype.parse = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var timestamp = typeof value == 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getYear = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getFullYear();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getMonth();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getDate();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getHours = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getHours();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getMinutes = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getMinutes();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getSeconds = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getSeconds();
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hours
     * @param {?} minutes
     * @param {?} seconds
     * @return {?}
     */
    DateUtil.prototype.createDate = /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hours
     * @param {?} minutes
     * @param {?} seconds
     * @return {?}
     */
    function (year, month, date, hours, minutes, seconds) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11 || date < 1) {
            return null;
        }
        /** @type {?} */
        var result = this._createDateWithOverflow(year, month, date, hours, minutes, seconds);
        // Check that the date wasn't above the upper bound for the month, causing the month to
        // overflow.
        if (result.getMonth() != month) {
            return null;
        }
        return result;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.clone = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date), this.getSeconds(date));
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getNumDaysInMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0, 0, 0, 0));
    };
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    DateUtil.prototype.addCalendarYears = /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    function (date, years) {
        return this.addCalendarMonths(date, years * 12);
    };
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    DateUtil.prototype.addCalendarMonths = /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    function (date, months) {
        /** @type {?} */
        var newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date), this.getHours(date), this.getMinutes(date), this.getSeconds(date));
        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
        // guarantee this.
        if (this.getMonth(newDate) != ((this.getMonth(date) + months) % 12 + 12) % 12) {
            newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0, this.getHours(newDate), this.getMinutes(newDate), this.getSeconds(newDate));
        }
        return newDate;
    };
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    DateUtil.prototype.addCalendarDays = /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    function (date, days) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days, this.getHours(date), this.getMinutes(date), this.getSeconds(date));
    };
    /**
     * @param {?} date
     * @param {?} hours
     * @return {?}
     */
    DateUtil.prototype.addCalendarHours = /**
     * @param {?} date
     * @param {?} hours
     * @return {?}
     */
    function (date, hours) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date) + hours, this.getMinutes(date), this.getSeconds(date));
    };
    /**
     * @param {?} date
     * @param {?} minutes
     * @return {?}
     */
    DateUtil.prototype.addCalendarMinutes = /**
     * @param {?} date
     * @param {?} minutes
     * @return {?}
     */
    function (date, minutes) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date) + minutes, this.getSeconds(date));
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getISODateString = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return [
            date.getUTCFullYear(),
            this._2digit(date.getUTCMonth() + 1),
            this._2digit(date.getUTCDate())
        ].join('-');
    };
    /**
     * Creates a date but allows the month and date to overflow.
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hours
     * @param {?} minutes
     * @param {?} seconds
     * @return {?}
     */
    DateUtil.prototype._createDateWithOverflow = /**
     * Creates a date but allows the month and date to overflow.
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hours
     * @param {?} minutes
     * @param {?} seconds
     * @return {?}
     */
    function (year, month, date, hours, minutes, seconds) {
        /** @type {?} */
        var result = new Date(year, month, date, hours, minutes, seconds);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    };
    /**
     * Pads a number to make it two digits.
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    DateUtil.prototype._2digit = /**
     * Pads a number to make it two digits.
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    function (n) {
        return ('00' + n).slice(-2);
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DateUtil.prototype.compareDate = /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    function (first$$1, second) {
        return this.getYear(first$$1) - this.getYear(second) ||
            this.getMonth(first$$1) - this.getMonth(second) ||
            this.getDate(first$$1) - this.getDate(second);
    };
    /**
     * Gets the first day of the month for the given date's month.
     */
    /**
     * Gets the first day of the month for the given date's month.
     * @param {?} date
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    DateUtil.prototype.getFirstDateOfWeek = /**
     * Gets the first day of the month for the given date's month.
     * @param {?} date
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    function (date, firstDayOfWeek) {
        /** @type {?} */
        var day = date.getDate() - ((7 + date.getDay() - firstDayOfWeek) % 7);
        return new Date(date.getFullYear(), date.getMonth(), day, date.getHours(), date.getMinutes());
    };
    /**
     * Gets the first day of the month for the given date's month.
     */
    /**
     * Gets the first day of the month for the given date's month.
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getFirstDateOfMonth = /**
     * Gets the first day of the month for the given date's month.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    };
    /**
     * Gets the number of days in the month for the given date's month.
     */
    /**
     * Gets the number of days in the month for the given date's month.
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getNumberOfDaysInMonth = /**
     * Gets the number of days in the month for the given date's month.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };
    /**
     * Get an arbitrary date in the month after the given date's month.
     */
    /**
     * Get an arbitrary date in the month after the given date's month.
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getDateInNextMonth = /**
     * Get an arbitrary date in the month after the given date's month.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1, date.getHours(), date.getMinutes());
    };
    /**
     * Get an arbitrary date in the month before the given date's month.
     */
    /**
     * Get an arbitrary date in the month before the given date's month.
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getDateInPreviousMonth = /**
     * Get an arbitrary date in the month before the given date's month.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return new Date(date.getFullYear(), date.getMonth() - 1, 1, date.getHours(), date.getMinutes());
    };
    /**
     * Gets whether two dates have the same year.
     */
    /**
     * Gets whether two dates have the same year.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    DateUtil.prototype.isSameYear = /**
     * Gets whether two dates have the same year.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    function (d1, d2) {
        return d1 && d2 && d1.getFullYear() === d2.getFullYear();
    };
    /**
     * Gets whether two dates have the same month and year.
     */
    /**
     * Gets whether two dates have the same month and year.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    DateUtil.prototype.isSameMonthAndYear = /**
     * Gets whether two dates have the same month and year.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    function (d1, d2) {
        return d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
    };
    /**
     * Gets whether two dates are the same day (not not necesarily the same time).
     */
    /**
     * Gets whether two dates are the same day (not not necesarily the same time).
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    DateUtil.prototype.isSameDay = /**
     * Gets whether two dates are the same day (not not necesarily the same time).
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    function (d1, d2) {
        return d1 && d2 && d1.getDate() == d2.getDate() && this.isSameMonthAndYear(d1, d2);
    };
    /**
     * Gets whether two dates are the same hours.
     */
    /**
     * Gets whether two dates are the same hours.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    DateUtil.prototype.isSameHour = /**
     * Gets whether two dates are the same hours.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    function (d1, d2) {
        return d1 && d2 && d1.getHours() == d2.getHours() && this.isSameDay(d1, d2);
    };
    /**
     * Gets whether two dates are the same minutes.
     */
    /**
     * Gets whether two dates are the same minutes.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    DateUtil.prototype.isSameMinute = /**
     * Gets whether two dates are the same minutes.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    function (d1, d2) {
        return d1 && d2 && d1.getMinutes() == d2.getMinutes() && this.isSameHour(d1, d2);
    };
    /**
     * Gets whether a date is in the month immediately after some date.
     * @param startDate The date from which to compare.
     * @param endDate The date to check.
     * @returns
     */
    /**
     * Gets whether a date is in the month immediately after some date.
     * @param {?} startDate The date from which to compare.
     * @param {?} endDate The date to check.
     * @return {?}
     */
    DateUtil.prototype.isInNextMonth = /**
     * Gets whether a date is in the month immediately after some date.
     * @param {?} startDate The date from which to compare.
     * @param {?} endDate The date to check.
     * @return {?}
     */
    function (startDate, endDate) {
        /** @type {?} */
        var nextMonth = this.getDateInNextMonth(startDate);
        return this.isSameMonthAndYear(nextMonth, endDate);
    };
    /**
     * Gets whether a date is in the month immediately before some date.
     * @param startDate The date from which to compare.
     * @param endDate The date to check.
     * @returns
     */
    /**
     * Gets whether a date is in the month immediately before some date.
     * @param {?} startDate The date from which to compare.
     * @param {?} endDate The date to check.
     * @return {?}
     */
    DateUtil.prototype.isInPreviousMonth = /**
     * Gets whether a date is in the month immediately before some date.
     * @param {?} startDate The date from which to compare.
     * @param {?} endDate The date to check.
     * @return {?}
     */
    function (startDate, endDate) {
        /** @type {?} */
        var previousMonth = this.getDateInPreviousMonth(startDate);
        return this.isSameMonthAndYear(endDate, previousMonth);
    };
    /**
     * Gets the midpoint between two dates.
     * @param d1
     * @param d2
     * @returns
     */
    /**
     * Gets the midpoint between two dates.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    DateUtil.prototype.getDateMidpoint = /**
     * Gets the midpoint between two dates.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    function (d1, d2) {
        return this.createDateAtMidnight((d1.getTime() + d2.getTime()) / 2);
    };
    /**
     * Gets the week of the month that a given date occurs in.
     * @param date
     * @returns Index of the week of the month (zero-based).
     */
    /**
     * Gets the week of the month that a given date occurs in.
     * @param {?} date
     * @return {?} Index of the week of the month (zero-based).
     */
    DateUtil.prototype.getWeekOfMonth = /**
     * Gets the week of the month that a given date occurs in.
     * @param {?} date
     * @return {?} Index of the week of the month (zero-based).
     */
    function (date) {
        /** @type {?} */
        var firstDayOfMonth = this.getFirstDateOfMonth(date);
        return Math.floor((firstDayOfMonth.getDay() + date.getDate() - 1) / 7);
    };
    /**
     * Gets the week of the year that a given date occurs in.
     * @param date
     * @returns Index of the week according to ISO-8601.
     */
    /**
     * Gets the week of the year that a given date occurs in.
     * @param {?} date
     * @return {?} Index of the week according to ISO-8601.
     */
    DateUtil.prototype.getWeekOfYear = /**
     * Gets the week of the year that a given date occurs in.
     * @param {?} date
     * @return {?} Index of the week according to ISO-8601.
     */
    function (date) {
        /** @type {?} */
        var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        /** @type {?} */
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        // Calculate full weeks to nearest Thursday and return weekNo
        return Math.ceil((((+d - +yearStart) / 86400000) + 1) / 7);
    };
    /**
     * Gets a new date incremented by the given number of minutes. Number of minutes can be negative.
     * @param date
     * @param numberOfMinutes
     * @returns
     */
    /**
     * Gets a new date incremented by the given number of minutes. Number of minutes can be negative.
     * @param {?} date
     * @param {?} numberOfMinutes
     * @return {?}
     */
    DateUtil.prototype.incrementMinutes = /**
     * Gets a new date incremented by the given number of minutes. Number of minutes can be negative.
     * @param {?} date
     * @param {?} numberOfMinutes
     * @return {?}
     */
    function (date, numberOfMinutes) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + numberOfMinutes);
    };
    /**
     * Gets a new date incremented by the given number of hours. Number of hours can be negative.
     * @param date
     * @param numberOfHours
     * @returns
     */
    /**
     * Gets a new date incremented by the given number of hours. Number of hours can be negative.
     * @param {?} date
     * @param {?} numberOfHours
     * @return {?}
     */
    DateUtil.prototype.incrementHours = /**
     * Gets a new date incremented by the given number of hours. Number of hours can be negative.
     * @param {?} date
     * @param {?} numberOfHours
     * @return {?}
     */
    function (date, numberOfHours) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + numberOfHours, date.getMinutes());
    };
    /**
     * Gets a new date incremented by the given number of days. Number of days can be negative.
     * @param date
     * @param numberOfDays
     * @returns
     */
    /**
     * Gets a new date incremented by the given number of days. Number of days can be negative.
     * @param {?} date
     * @param {?} numberOfDays
     * @return {?}
     */
    DateUtil.prototype.incrementDays = /**
     * Gets a new date incremented by the given number of days. Number of days can be negative.
     * @param {?} date
     * @param {?} numberOfDays
     * @return {?}
     */
    function (date, numberOfDays) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + numberOfDays, date.getHours(), date.getMinutes());
    };
    /**
     * Gets a new date incremented by the given number of months. Number of months can be negative.
     * If the date of the given month does not match the target month, the date will be set to the
     * last day of the month.
     * @param date
     * @param numberOfMonths
     * @returns
     */
    /**
     * Gets a new date incremented by the given number of months. Number of months can be negative.
     * If the date of the given month does not match the target month, the date will be set to the
     * last day of the month.
     * @param {?} date
     * @param {?} numberOfMonths
     * @return {?}
     */
    DateUtil.prototype.incrementMonths = /**
     * Gets a new date incremented by the given number of months. Number of months can be negative.
     * If the date of the given month does not match the target month, the date will be set to the
     * last day of the month.
     * @param {?} date
     * @param {?} numberOfMonths
     * @return {?}
     */
    function (date, numberOfMonths) {
        /** @type {?} */
        var dateInTargetMonth = new Date(date.getFullYear(), date.getMonth() + numberOfMonths, 1, date.getHours(), date.getMinutes());
        /** @type {?} */
        var numberOfDaysInMonth = this.getNumberOfDaysInMonth(dateInTargetMonth);
        if (numberOfDaysInMonth < date.getDate()) {
            dateInTargetMonth.setDate(numberOfDaysInMonth);
        }
        else {
            dateInTargetMonth.setDate(date.getDate());
        }
        return dateInTargetMonth;
    };
    /**
     * Get the integer distance between two months. This *only* considers the month and year
     * portion of the Date instances.
     *
     * @param start
     * @param end
     * @returns Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    /**
     * Get the integer distance between two months. This *only* considers the month and year
     * portion of the Date instances.
     *
     * @param {?} start
     * @param {?} end
     * @return {?} Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    DateUtil.prototype.getMonthDistance = /**
     * Get the integer distance between two months. This *only* considers the month and year
     * portion of the Date instances.
     *
     * @param {?} start
     * @param {?} end
     * @return {?} Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    function (start, end) {
        return (12 * (end.getFullYear() - start.getFullYear())) + (end.getMonth() - start.getMonth());
    };
    /**
     * Gets the last day of the month for the given date.
     * @param date
     * @returns
     */
    /**
     * Gets the last day of the month for the given date.
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getLastDateOfMonth = /**
     * Gets the last day of the month for the given date.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return new Date(date.getFullYear(), date.getMonth(), this.getNumberOfDaysInMonth(date), date.getHours(), date.getMinutes());
    };
    /**
     * Checks whether a date is valid.
     * @param date
     * @return  Whether the date is a valid Date.
     */
    /**
     * Checks whether a date is valid.
     * @param {?} date
     * @return {?} Whether the date is a valid Date.
     */
    DateUtil.prototype.isValidDate = /**
     * Checks whether a date is valid.
     * @param {?} date
     * @return {?} Whether the date is a valid Date.
     */
    function (date) {
        return date != null && date.getTime && !isNaN(date.getTime());
    };
    /**
     * Sets a date's time to midnight.
     * @param date
     */
    /**
     * Sets a date's time to midnight.
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.setDateTimeToMidnight = /**
     * Sets a date's time to midnight.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (this.isValidDate(date)) {
            date.setHours(0, 0, 0, 0);
        }
    };
    /**
     * Creates a date with the time set to midnight.
     * Drop-in replacement for two forms of the Date constructor:
     * 1. No argument for Date representing now.
     * 2. Single-argument value representing number of seconds since Unix Epoch
     * or a Date object.
     * @param value
     * @return New date with time set to midnight.
     */
    /**
     * Creates a date with the time set to midnight.
     * Drop-in replacement for two forms of the Date constructor:
     * 1. No argument for Date representing now.
     * 2. Single-argument value representing number of seconds since Unix Epoch
     * or a Date object.
     * @param {?} value
     * @return {?} New date with time set to midnight.
     */
    DateUtil.prototype.createDateAtMidnight = /**
     * Creates a date with the time set to midnight.
     * Drop-in replacement for two forms of the Date constructor:
     * 1. No argument for Date representing now.
     * 2. Single-argument value representing number of seconds since Unix Epoch
     * or a Date object.
     * @param {?} value
     * @return {?} New date with time set to midnight.
     */
    function (value) {
        /** @type {?} */
        var date;
        if (!value) {
            date = new Date();
        }
        else {
            date = new Date(value);
        }
        this.setDateTimeToMidnight(date);
        return date;
    };
    /**
     * Checks if a date is within a min and max range, ignoring the time component.
     * If minDate or maxDate are not dates, they are ignored.
     * @param date
     * @param minDate
     * @param maxDate
     */
    /**
     * Checks if a date is within a min and max range, ignoring the time component.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {?} date
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    DateUtil.prototype.isDateWithinRange = /**
     * Checks if a date is within a min and max range, ignoring the time component.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {?} date
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    function (date, minDate, maxDate) {
        /** @type {?} */
        var dateAtMidnight = this.createDateAtMidnight(date);
        /** @type {?} */
        var minDateAtMidnight = this.isValidDate(minDate) ? this.createDateAtMidnight(minDate) : null;
        /** @type {?} */
        var maxDateAtMidnight = this.isValidDate(maxDate) ? this.createDateAtMidnight(maxDate) : null;
        return (!minDateAtMidnight || minDateAtMidnight <= dateAtMidnight) &&
            (!maxDateAtMidnight || maxDateAtMidnight >= dateAtMidnight);
    };
    /**
     * Checks if a date is within a min and max range.
     * If minDate or maxDate are not dates, they are ignored.
     * @param date
     * @param minDate
     * @param maxDate
     */
    /**
     * Checks if a date is within a min and max range.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {?} date
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    DateUtil.prototype.isFullDateWithinRange = /**
     * Checks if a date is within a min and max range.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {?} date
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    function (date, minDate, maxDate) {
        minDate = this.isValidDate(minDate) ? minDate : null;
        maxDate = this.isValidDate(maxDate) ? maxDate : null;
        return (!minDate || minDate <= date) &&
            (!maxDate || maxDate >= date);
    };
    /**
     * Gets a new date incremented by the given number of years. Number of years can be negative.
     * See `incrementMonths` for notes on overflow for specific dates.
     * @param date
     * @param numberOfYears
     * @returns
     */
    /**
     * Gets a new date incremented by the given number of years. Number of years can be negative.
     * See `incrementMonths` for notes on overflow for specific dates.
     * @param {?} date
     * @param {?} numberOfYears
     * @return {?}
     */
    DateUtil.prototype.incrementYears = /**
     * Gets a new date incremented by the given number of years. Number of years can be negative.
     * See `incrementMonths` for notes on overflow for specific dates.
     * @param {?} date
     * @param {?} numberOfYears
     * @return {?}
     */
    function (date, numberOfYears) {
        return this.incrementMonths(date, numberOfYears * 12);
    };
    /**
     * Get the integer distance between two years. This *only* considers the year portion of the
     * Date instances.
     *
     * @param start
     * @param end
     * @returns Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    /**
     * Get the integer distance between two years. This *only* considers the year portion of the
     * Date instances.
     *
     * @param {?} start
     * @param {?} end
     * @return {?} Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    DateUtil.prototype.getYearDistance = /**
     * Get the integer distance between two years. This *only* considers the year portion of the
     * Date instances.
     *
     * @param {?} start
     * @param {?} end
     * @return {?} Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    function (start, end) {
        return end.getFullYear() - start.getFullYear();
    };
    /**
     * Clamps a date between a minimum and a maximum date.
     * @param date Date to be clamped
     * @param minDate Minimum date
     * @param maxDate Maximum date
     * @return
     */
    /**
     * Clamps a date between a minimum and a maximum date.
     * @param {?} date Date to be clamped
     * @param {?} minDate Minimum date
     * @param {?} maxDate Maximum date
     * @return {?}
     */
    DateUtil.prototype.clampDate = /**
     * Clamps a date between a minimum and a maximum date.
     * @param {?} date Date to be clamped
     * @param {?} minDate Minimum date
     * @param {?} maxDate Maximum date
     * @return {?}
     */
    function (date, minDate, maxDate) {
        /** @type {?} */
        var boundDate = date;
        if (minDate && date < minDate) {
            boundDate = new Date(minDate.getTime());
        }
        if (maxDate && date > maxDate) {
            boundDate = new Date(maxDate.getTime());
        }
        return boundDate;
    };
    /**
     * Extracts and parses the timestamp from a DOM node.
     * @param node Node from which the timestamp will be extracted.
     * @return Time since epoch.
     */
    /**
     * Extracts and parses the timestamp from a DOM node.
     * @param {?} node Node from which the timestamp will be extracted.
     * @return {?} Time since epoch.
     */
    DateUtil.prototype.getTimestampFromNode = /**
     * Extracts and parses the timestamp from a DOM node.
     * @param {?} node Node from which the timestamp will be extracted.
     * @return {?} Time since epoch.
     */
    function (node) {
        if (node && node.hasAttribute('data-timestamp')) {
            return Number(node.getAttribute('data-timestamp'));
        }
    };
    /**
     * Checks if a month is within a min and max range, ignoring the date and time components.
     * If minDate or maxDate are not dates, they are ignored.
     * @param date
     * @param minDate
     * @param maxDate
     */
    /**
     * Checks if a month is within a min and max range, ignoring the date and time components.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {?} date
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    DateUtil.prototype.isMonthWithinRange = /**
     * Checks if a month is within a min and max range, ignoring the date and time components.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {?} date
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    function (date, minDate, maxDate) {
        /** @type {?} */
        var month = date.getMonth();
        /** @type {?} */
        var year = date.getFullYear();
        return (!minDate || minDate.getFullYear() < year || minDate.getMonth() <= month) &&
            (!maxDate || maxDate.getFullYear() > year || maxDate.getMonth() >= month);
    };
    /**
     * Compares two dates.
     * @param first The first date to compare.
     * @param second The second date to compare.
     * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    DateUtil.prototype.compareDateAndTime = /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    function (first$$1, second) {
        return this.getYear(first$$1) - this.getYear(second) ||
            this.getMonth(first$$1) - this.getMonth(second) ||
            this.getDate(first$$1) - this.getDate(second) ||
            this.getHours(first$$1) - this.getDate(second) ||
            this.getMinutes(first$$1) - this.getDate(second) ||
            this.getSeconds(first$$1) - this.getDate(second);
    };
    /**
     * Checks if two dates are equal.
     * @param first The first date to check.
     * @param second The second date to check.
     * @returns Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    DateUtil.prototype.sameDate = /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    function (first$$1, second) {
        return first$$1 && second ? !this.compareDate(first$$1, second) : first$$1 == second;
    };
    /**
     * Checks if two dates are equal.
     * @param first The first date to check.
     * @param second The second date to check.
     * @returns Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    DateUtil.prototype.sameDateAndTime = /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    function (first$$1, second) {
        return first$$1 && second ? !this.compareDateAndTime(first$$1, second) : first$$1 == second;
    };
    return DateUtil;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * This animation fades in the background color and text content of the
 * select's options. It is time delayed to occur 100ms after the overlay
 * panel has transformed in.
  @type {?} */
var fadeInContent$1 = trigger('fadeInContent', [
    state('showing', style({ opacity: 1 })),
    transition('void => showing', [
        style({ opacity: 0 }),
        animate("150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)")
    ])
]);
/** @type {?} */
var slideCalendar = trigger('slideCalendar', [
    transition('* => left', [
        animate(180, keyframes([
            style({ transform: 'translateX(100%)', offset: 0.5 }),
            style({ transform: 'translateX(-100%)', offset: 0.51 }),
            style({ transform: 'translateX(0)', offset: 1 })
        ]))
    ]),
    transition('* => right', [
        animate(180, keyframes([
            style({ transform: 'translateX(-100%)', offset: 0.5 }),
            style({ transform: 'translateX(100%)', offset: 0.51 }),
            style({ transform: 'translateX(0)', offset: 1 })
        ]))
    ])
]);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A calendar that is used as part of the datepicker.
 * \@docs-private
 */
var Md2Calendar = /** @class */ (function () {
    function Md2Calendar(_elementRef, _ngZone, _locale, _util) {
        var _this = this;
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._locale = _locale;
        this._util = _util;
        this.type = 'date';
        /**
         * Whether the calendar should be started in month or year view.
         */
        this.startView = 'month';
        this.timeInterval = 1;
        /**
         * Emits when the currently selected date changes.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Date filter for the month and year views.
         */
        this._dateFilterForViews = function (date) {
            return !!date &&
                (!_this.dateFilter || _this.dateFilter(date)) &&
                (!_this.minDate || _this._util.compareDate(date, _this.minDate) >= 0) &&
                (!_this.maxDate || _this._util.compareDate(date, _this.maxDate) <= 0);
        };
        /**
         * Whether the calendar is in month view.
         */
        this._currentView = 'month';
        this._clockView = 'hour';
    }
    Object.defineProperty(Md2Calendar.prototype, "_activeDate", {
        /**
         * The current active date. This determines which time period is shown and which date is
         * highlighted when using keyboard navigation.
         */
        get: /**
         * The current active date. This determines which time period is shown and which date is
         * highlighted when using keyboard navigation.
         * @return {?}
         */
        function () { return this._clampedActiveDate; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var oldActiveDate = this._clampedActiveDate;
            this._clampedActiveDate = this._util.clampDate(value, this.minDate, this.maxDate);
            if (oldActiveDate && this._clampedActiveDate && this._currentView === 'month' &&
                !this._util.isSameMonthAndYear(oldActiveDate, this._clampedActiveDate)) {
                if (this._util.isInNextMonth(oldActiveDate, this._clampedActiveDate)) {
                    this.calendarState('right');
                }
                else {
                    this.calendarState('left');
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "_yearLabel", {
        /** The label for the current calendar view. */
        get: /**
         * The label for the current calendar view.
         * @return {?}
         */
        function () {
            return this._locale.getYearName(this._activeDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "_monthYearLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentView === 'month' ? this._locale.getMonthLabel(this._activeDate) :
                this._locale.getYearName(this._activeDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "_dateLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this._locale.getDateLabel(this._activeDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "_hoursLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return ('0' + this._locale.getHoursLabel(this._activeDate)).slice(-2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Calendar.prototype, "_minutesLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return ('0' + this._locale.getMinutesLabel(this._activeDate)).slice(-2);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Md2Calendar.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._activeDate = this.startAt || this._util.today();
        this._elementRef.nativeElement.focus();
        if (this.type === 'month') {
            this._currentView = 'year';
        }
        else if (this.type === 'time') {
            this._currentView = 'clock';
        }
        else {
            this._currentView = this.startView || 'month';
        }
    };
    /** Handles date selection in the month view. */
    /**
     * Handles date selection in the month view.
     * @param {?} date
     * @return {?}
     */
    Md2Calendar.prototype._dateSelected = /**
     * Handles date selection in the month view.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (this.type == 'date') {
            if (!this._util.sameDate(date, this.selected)) {
                this.selectedChange.emit(date);
            }
        }
        else {
            this._activeDate = date;
            this._currentView = 'clock';
        }
    };
    /** Handles month selection in the year view. */
    /**
     * Handles month selection in the year view.
     * @param {?} month
     * @return {?}
     */
    Md2Calendar.prototype._monthSelected = /**
     * Handles month selection in the year view.
     * @param {?} month
     * @return {?}
     */
    function (month) {
        if (this.type == 'month') {
            if (!this._util.isSameMonthAndYear(month, this.selected)) {
                this.selectedChange.emit(this._util.getFirstDateOfMonth(month));
            }
        }
        else {
            this._activeDate = month;
            this._currentView = 'month';
            this._clockView = 'hour';
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    Md2Calendar.prototype._timeSelected = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (this._clockView !== 'minute') {
            this._activeDate = date;
            this._clockView = 'minute';
        }
        else {
            if (!this._util.sameDateAndTime(date, this.selected)) {
                this.selectedChange.emit(date);
            }
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    Md2Calendar.prototype._onActiveDateChange = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this._activeDate = date;
    };
    /**
     * @return {?}
     */
    Md2Calendar.prototype._yearClicked = /**
     * @return {?}
     */
    function () {
        this._currentView = 'year';
    };
    /**
     * @return {?}
     */
    Md2Calendar.prototype._dateClicked = /**
     * @return {?}
     */
    function () {
        this._currentView = 'month';
    };
    /**
     * @return {?}
     */
    Md2Calendar.prototype._hoursClicked = /**
     * @return {?}
     */
    function () {
        this._currentView = 'clock';
        this._clockView = 'hour';
    };
    /**
     * @return {?}
     */
    Md2Calendar.prototype._minutesClicked = /**
     * @return {?}
     */
    function () {
        this._currentView = 'clock';
        this._clockView = 'minute';
    };
    /** Handles user clicks on the previous button. */
    /**
     * Handles user clicks on the previous button.
     * @return {?}
     */
    Md2Calendar.prototype._previousClicked = /**
     * Handles user clicks on the previous button.
     * @return {?}
     */
    function () {
        this._activeDate = this._currentView === 'month' ?
            this._util.addCalendarMonths(this._activeDate, -1) :
            this._util.addCalendarYears(this._activeDate, -1);
    };
    /** Handles user clicks on the next button. */
    /**
     * Handles user clicks on the next button.
     * @return {?}
     */
    Md2Calendar.prototype._nextClicked = /**
     * Handles user clicks on the next button.
     * @return {?}
     */
    function () {
        this._activeDate = this._currentView === 'month' ?
            this._util.addCalendarMonths(this._activeDate, 1) :
            this._util.addCalendarYears(this._activeDate, 1);
    };
    /** Whether the previous period button is enabled. */
    /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    Md2Calendar.prototype._previousEnabled = /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    function () {
        if (!this.minDate) {
            return true;
        }
        return !this.minDate || !this._isSameView(this._activeDate, this.minDate);
    };
    /** Whether the next period button is enabled. */
    /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    Md2Calendar.prototype._nextEnabled = /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    function () {
        return !this.maxDate || !this._isSameView(this._activeDate, this.maxDate);
    };
    /** Handles keydown events on the calendar body. */
    /**
     * Handles keydown events on the calendar body.
     * @param {?} event
     * @return {?}
     */
    Md2Calendar.prototype._handleCalendarBodyKeydown = /**
     * Handles keydown events on the calendar body.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        if (this._currentView === 'month') {
            this._handleCalendarBodyKeydownInMonthView(event);
        }
        else if (this._currentView === 'year') {
            this._handleCalendarBodyKeydownInYearView(event);
        }
        else {
            this._handleCalendarBodyKeydownInClockView(event);
        }
    };
    /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    Md2Calendar.prototype._isSameView = /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    function (date1, date2) {
        return this._currentView === 'month' ?
            this._util.getYear(date1) == this._util.getYear(date2) &&
                this._util.getMonth(date1) == this._util.getMonth(date2) :
            this._util.getYear(date1) == this._util.getYear(date2);
    };
    /**
     * Handles keydown events on the calendar body when calendar is in month view.
     * @param {?} event
     * @return {?}
     */
    Md2Calendar.prototype._handleCalendarBodyKeydownInMonthView = /**
     * Handles keydown events on the calendar body when calendar is in month view.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        switch (event.keyCode) {
            case LEFT_ARROW:
                this._activeDate = this._util.addCalendarDays(this._activeDate, -1);
                break;
            case RIGHT_ARROW:
                this._activeDate = this._util.addCalendarDays(this._activeDate, 1);
                break;
            case UP_ARROW:
                this._activeDate = this._util.addCalendarDays(this._activeDate, -7);
                break;
            case DOWN_ARROW:
                this._activeDate = this._util.addCalendarDays(this._activeDate, 7);
                break;
            case HOME:
                this._activeDate = this._util.addCalendarDays(this._activeDate, 1 - this._util.getDate(this._activeDate));
                break;
            case END:
                this._activeDate = this._util.addCalendarDays(this._activeDate, (this._util.getNumDaysInMonth(this._activeDate) -
                    this._util.getDate(this._activeDate)));
                break;
            case PAGE_UP:
                this._activeDate = event.altKey ?
                    this._util.addCalendarYears(this._activeDate, -1) :
                    this._util.addCalendarMonths(this._activeDate, -1);
                break;
            case PAGE_DOWN:
                this._activeDate = event.altKey ?
                    this._util.addCalendarYears(this._activeDate, 1) :
                    this._util.addCalendarMonths(this._activeDate, 1);
                break;
            case ENTER:
                if (this._dateFilterForViews(this._activeDate)) {
                    this._dateSelected(this._activeDate);
                    // Prevent unexpected default actions such as form submission.
                    event.preventDefault();
                }
                return;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /**
     * Handles keydown events on the calendar body when calendar is in year view.
     * @param {?} event
     * @return {?}
     */
    Md2Calendar.prototype._handleCalendarBodyKeydownInYearView = /**
     * Handles keydown events on the calendar body when calendar is in year view.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        switch (event.keyCode) {
            case LEFT_ARROW:
                this._activeDate = this._util.addCalendarMonths(this._activeDate, -1);
                break;
            case RIGHT_ARROW:
                this._activeDate = this._util.addCalendarMonths(this._activeDate, 1);
                break;
            case UP_ARROW:
                this._activeDate = this._prevMonthInSameCol(this._activeDate);
                break;
            case DOWN_ARROW:
                this._activeDate = this._nextMonthInSameCol(this._activeDate);
                break;
            case HOME:
                this._activeDate = this._util.addCalendarMonths(this._activeDate, -this._util.getMonth(this._activeDate));
                break;
            case END:
                this._activeDate = this._util.addCalendarMonths(this._activeDate, 11 - this._util.getMonth(this._activeDate));
                break;
            case PAGE_UP:
                this._activeDate =
                    this._util.addCalendarYears(this._activeDate, event.altKey ? -10 : -1);
                break;
            case PAGE_DOWN:
                this._activeDate =
                    this._util.addCalendarYears(this._activeDate, event.altKey ? 10 : 1);
                break;
            case ENTER:
                this._monthSelected(this._activeDate);
                break;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /**
     * Handles keydown events on the calendar body when calendar is in month view.
     * @param {?} event
     * @return {?}
     */
    Md2Calendar.prototype._handleCalendarBodyKeydownInClockView = /**
     * Handles keydown events on the calendar body when calendar is in month view.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        switch (event.keyCode) {
            case UP_ARROW:
                this._activeDate = this._clockView == 'hour' ?
                    this._util.addCalendarHours(this._activeDate, 1) :
                    this._util.addCalendarMinutes(this._activeDate, 1);
                break;
            case DOWN_ARROW:
                this._activeDate = this._clockView == 'hour' ?
                    this._util.addCalendarHours(this._activeDate, -1) :
                    this._util.addCalendarMinutes(this._activeDate, -1);
                break;
            case ENTER:
                this._timeSelected(this._activeDate);
                return;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /**
     * Determine the date for the month that comes before the given month in the same column in the
     * calendar table.
     * @param {?} date
     * @return {?}
     */
    Md2Calendar.prototype._prevMonthInSameCol = /**
     * Determine the date for the month that comes before the given month in the same column in the
     * calendar table.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var increment = this._util.getMonth(date) <= 4 ? -5 :
            (this._util.getMonth(date) >= 7 ? -7 : -12);
        return this._util.addCalendarMonths(date, increment);
    };
    /**
     * Determine the date for the month that comes after the given month in the same column in the
     * calendar table.
     * @param {?} date
     * @return {?}
     */
    Md2Calendar.prototype._nextMonthInSameCol = /**
     * Determine the date for the month that comes after the given month in the same column in the
     * calendar table.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var increment = this._util.getMonth(date) <= 4 ? 7 :
            (this._util.getMonth(date) >= 7 ? 5 : 12);
        return this._util.addCalendarMonths(date, increment);
    };
    /**
     * @param {?} direction
     * @return {?}
     */
    Md2Calendar.prototype.calendarState = /**
     * @param {?} direction
     * @return {?}
     */
    function (direction) {
        this._calendarState = direction;
    };
    /**
     * @return {?}
     */
    Md2Calendar.prototype._calendarStateDone = /**
     * @return {?}
     */
    function () {
        this._calendarState = '';
    };
    Md2Calendar.decorators = [
        { type: Component, args: [{
                    selector: 'md2-calendar',
                    template: "<div class=\"md2-calendar-header\">\n  <div *ngIf=\"type!=='time'\"\n       class=\"md2-calendar-header-year\"\n       [class.active]=\"_currentView == 'year'\"\n       (click)=\"_yearClicked()\">{{ _yearLabel }}</div>\n  <div class=\"md2-calendar-header-date-time\">\n    <span *ngIf=\"type!=='time'\"\n          class=\"md2-calendar-header-date\"\n          [class.active]=\"_currentView == 'month'\"\n          (click)=\"_dateClicked()\">{{ _dateLabel }}</span>\n    <span *ngIf=\"type!=='date'\"\n          class=\"md2-calendar-header-time\"\n          [class.active]=\"_currentView == 'clock'\">\n      <span class=\"md2-calendar-header-hours\"\n            [class.active]=\"_clockView == 'hour'\"\n            (click)=\"_hoursClicked()\">{{ _hoursLabel }}</span>:<span class=\"md2-calendar-header-minutes\"\n                                                                     [class.active]=\"_clockView == 'minute'\"\n                                                                     (click)=\"_minutesClicked()\">{{ _minutesLabel }}</span>\n    </span>\n  </div>\n</div>\n<div class=\"md2-calendar-content\" [ngSwitch]=\"_currentView\">\n  <div class=\"md2-month-content\" *ngIf=\"_currentView === 'month' || _currentView === 'year'\">\n    <div class=\"md2-calendar-controls\">\n      <div class=\"md2-calendar-previous-button\"\n           [class.disabled]=\"!_previousEnabled()\" (click)=\"_previousClicked()\"\n           aria-label=\"Previous month\">\n        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n          <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"></path>\n        </svg>\n      </div>\n      <div class=\"md2-calendar-period-button\" [@slideCalendar]=\"_calendarState\" (@slideCalendar.done)=\"_calendarStateDone()\">\n        <strong>{{ _monthYearLabel }}</strong>\n      </div>\n      <div class=\"md2-calendar-next-button\"\n           [class.disabled]=\"!_nextEnabled()\" (click)=\"_nextClicked()\"\n           aria-label=\"Next month\">\n        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n          <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path>\n        </svg>\n      </div>\n    </div>\n  </div>\n  <md2-month-view *ngSwitchCase=\"'month'\"\n                  [activeDate]=\"_activeDate\"\n                  [selected]=\"selected\"\n                  [displayWeek]=\"displayWeek\"\n                  [dateFilter]=\"_dateFilterForViews\"\n                  (selectedChange)=\"_dateSelected($event)\">\n  </md2-month-view>\n  <md2-year-view *ngSwitchCase=\"'year'\"\n                 [activeDate]=\"_activeDate\"\n                 [selected]=\"selected\"\n                 [dateFilter]=\"_dateFilterForViews\"\n                 (selectedChange)=\"_monthSelected($event)\">\n  </md2-year-view>\n  <md2-clock *ngSwitchDefault\n             [startView]=\"_clockView\"\n             [interval]=\"timeInterval\"\n             [min]=\"minDate\"\n             [max]=\"maxDate\"\n             [selected]=\"_activeDate\"\n             (activeDateChange)=\"_onActiveDateChange($event)\"\n             (selectedChange)=\"_timeSelected($event)\"></md2-clock>\n</div>\n",
                    host: {
                        '[class.md2-calendar]': 'true',
                        'tabindex': '0',
                        '(keydown)': '_handleCalendarBodyKeydown($event)',
                    },
                    animations: [slideCalendar],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".md2-calendar{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:block;outline:0}.md2-calendar[mode=landscape]{display:flex}.md2-calendar-header{padding:16px;font-size:14px;background-color:#106cc8;color:#fff;box-sizing:border-box}[mode=landscape] .md2-calendar-header{width:150px;min-width:150px}.md2-calendar-header-date-time,.md2-calendar-header-year{width:100%;font-weight:500;white-space:nowrap}.md2-calendar-header-date-time{font-size:30px;line-height:34px}[mode=landscape] .md2-calendar-header-date-time{white-space:normal;word-wrap:break-word}.md2-calendar-header-date:not(.active),.md2-calendar-header-hours:not(.active),.md2-calendar-header-minutes:not(.active),.md2-calendar-header-year:not(.active){cursor:pointer;opacity:.6}.md2-calendar-header-time{padding-left:8px}.md2-calendar-header-time:not(.active){opacity:.6}.md2-calendar-header-time:not(.active) .md2-calendar-header-hours,.md2-calendar-header-time:not(.active) .md2-calendar-header-minutes{cursor:pointer;opacity:1}[mode=landscape] .md2-calendar-header-time{display:block;padding-left:0}.md2-calendar-content{width:100%;padding:0 8px 8px;outline:0;box-sizing:border-box;overflow:hidden}[mode=landscape] .md2-calendar-content{padding-top:8px}.md2-calendar-controls{display:flex;justify-content:space-between}.md2-calendar-period-button{display:inline-block;height:48px;padding:12px;outline:0;border:0;background:0 0;box-sizing:border-box}.md2-calendar-next-button,.md2-calendar-previous-button{display:inline-block;width:48px;height:48px;padding:12px;outline:0;border:0;cursor:pointer;background:0 0;box-sizing:border-box}.md2-calendar-next-button.disabled,.md2-calendar-previous-button.disabled{color:rgba(0,0,0,.38);pointer-events:none}.md2-calendar-next-button svg,.md2-calendar-previous-button svg{fill:currentColor;vertical-align:top}.md2-calendar-table{border-spacing:0;border-collapse:collapse;width:100%}.md2-calendar-table-header{color:rgba(0,0,0,.38)}.md2-calendar-table-header th{text-align:center;font-size:11px;padding:0 0 8px}@media (min-width:480px){.md2-calendar[mode=auto]{display:flex}.md2-calendar[mode=auto] .md2-calendar-header{width:150px;min-width:150px}.md2-calendar[mode=auto] .md2-calendar-header-date-time{white-space:normal;word-wrap:break-word}.md2-calendar[mode=auto] .md2-calendar-header-time{display:block;padding-left:0}.md2-calendar[mode=auto] .md2-calendar-content{padding-top:8px}}"]
                }] }
    ];
    /** @nocollapse */
    Md2Calendar.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: DateLocale },
        { type: DateUtil }
    ]; };
    Md2Calendar.propDecorators = {
        displayWeek: [{ type: Input }],
        type: [{ type: Input }],
        startAt: [{ type: Input }],
        startView: [{ type: Input }],
        selected: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        timeInterval: [{ type: Input }],
        dateFilter: [{ type: Input }],
        selectedChange: [{ type: Output }]
    };
    return Md2Calendar;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Change event object emitted by Md2Select.
 */
var  /**
 * Change event object emitted by Md2Select.
 */
Md2DateChange = /** @class */ (function () {
    function Md2DateChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return Md2DateChange;
}());
/** *
 * Used to generate a unique ID for each datepicker instance.
  @type {?} */
var datepickerUid = 0;
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * Md2Calendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * \@docs-private
 */
var Md2DatepickerContent = /** @class */ (function () {
    function Md2DatepickerContent() {
    }
    /**
     * Handles keydown event on datepicker content.
     * @param event The event.
     */
    /**
     * Handles keydown event on datepicker content.
     * @param {?} event The event.
     * @return {?}
     */
    Md2DatepickerContent.prototype._handleKeydown = /**
     * Handles keydown event on datepicker content.
     * @param {?} event The event.
     * @return {?}
     */
    function (event) {
        switch (event.keyCode) {
            case ESCAPE:
                this.datepicker.close();
                break;
            default:
                /* Return so that we don't preventDefault on keys that are not explicitly handled. */
                return;
        }
        event.preventDefault();
    };
    Md2DatepickerContent.decorators = [
        { type: Component, args: [{
                    selector: 'md2-datepicker-content',
                    template: "<md2-calendar cdkTrapFocus\n              [id]=\"datepicker.id\"\n              [attr.mode]=\"datepicker.mode\"\n              [startAt]=\"datepicker.startAt\"\n              [startView]=\"datepicker.startView\"\n              [type]=\"datepicker.type\"\n              [timeInterval]=\"datepicker.timeInterval\"\n              [minDate]=\"datepicker._minDate\"\n              [maxDate]=\"datepicker._maxDate\"\n              [dateFilter]=\"datepicker._dateFilter\"\n              [selected]=\"datepicker._selected\"\n              [displayWeek]=\"datepicker.displayWeek\"\n              (selectedChange)=\"datepicker._selectAndClose($event)\">\n</md2-calendar>\n",
                    host: {
                        'class': 'md2-datepicker-content',
                        '[class.md2-datepicker-content-touch]': 'datepicker?.touchUi',
                        '(keydown)': '_handleKeydown($event)',
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".md2-datepicker-content{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);display:block;background-color:#fff;border-radius:2px;overflow:hidden}.md2-calendar{width:296px;height:405px}.md2-calendar[mode=landscape]{width:446px;height:328px}@media (min-width:480px){.md2-calendar[mode=auto]{width:446px;height:328px}}.md2-datepicker-content-touch{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);display:block;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.6)}"]
                }] }
    ];
    Md2DatepickerContent.propDecorators = {
        _calendar: [{ type: ViewChild, args: [Md2Calendar,] }]
    };
    return Md2DatepickerContent;
}());
/** @type {?} */
var MD2_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Md2Datepicker; }),
    multi: true
};
/** @type {?} */
var MD2_DATEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return Md2Datepicker; }),
    multi: true
};
var Md2Datepicker = /** @class */ (function () {
    function Md2Datepicker(_element, _overlay, _ngZone, _viewContainerRef, _locale, _util, _dir) {
        var _this = this;
        this._element = _element;
        this._overlay = _overlay;
        this._ngZone = _ngZone;
        this._viewContainerRef = _viewContainerRef;
        this._locale = _locale;
        this._util = _util;
        this._dir = _dir;
        this._onChange = function () { };
        this._onTouched = function () { };
        this._validatorOnChange = function () { };
        this._inputFocused = false;
        /**
         * The view that the calendar should start in.
         */
        this.startView = 'month';
        /**
         * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
         * than a popup and elements have more padding to allow for bigger touch targets.
         */
        this.touchUi = false;
        this.tabindex = 0;
        this.mode = 'auto';
        this.timeInterval = 1;
        this._type = 'date';
        this._required = false;
        this._disabled = false;
        this._inputValue = '';
        /**
         * Event emitted when the select has been opened.
         */
        this.onOpen = new EventEmitter();
        /**
         * Event emitted when the select has been closed.
         */
        this.onClose = new EventEmitter();
        /**
         * Event emitted when the selected date has been changed by the user.
         */
        this.change = new EventEmitter();
        /**
         * Emits new selected date when selected date changes.
         */
        this.selectedChanged = new EventEmitter();
        /**
         * Whether the calendar is open.
         */
        this.opened = false;
        /**
         * The currently selected date.
         */
        this._selected = null;
        /**
         * The form control validator for the min date.
         */
        this._minValidator = function (control) {
            return (!_this.min || !control.value ||
                _this._util.compareDate(_this.min, control.value) <= 0) ?
                null : { 'md2DatepickerMin': { 'min': _this.min, 'actual': control.value } };
        };
        /**
         * The form control validator for the max date.
         */
        this._maxValidator = function (control) {
            return (!_this.max || !control.value ||
                _this._util.compareDate(_this.max, control.value) >= 0) ?
                null : { 'md2DatepickerMax': { 'max': _this.max, 'actual': control.value } };
        };
        /**
         * The form control validator for the date filter.
         */
        this._filterValidator = function (control) {
            return !_this._dateFilter || !control.value || _this._dateFilter(control.value) ?
                null : { 'md2DatepickerFilter': true };
        };
        /**
         * The combined form control validator for this input.
         */
        this._validator = Validators.compose([this._minValidator, this._maxValidator, this._filterValidator]);
        this.id = (this.id) ? this.id : "md2-datepicker-" + datepickerUid++;
    }
    Object.defineProperty(Md2Datepicker.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () { return this._type; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._type = value || 'date';
            this._inputValue = this._formatDate(this._value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "format", {
        get: /**
         * @return {?}
         */
        function () {
            return this._format || (this.type === 'month' ? 'MMMM y' : this.type === 'date' ?
                'dd/MM/y' : this.type === 'time' ? 'HH:mm' : this.type === 'datetime' ?
                'dd/MM/y HH:mm' : 'dd/MM/y');
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._format !== value) {
                this._format = value;
                this._inputValue = this._formatDate(this._value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "min", {
        /** The minimum valid date. */
        get: /**
         * The minimum valid date.
         * @return {?}
         */
        function () { return this._minDate; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._minDate = value;
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "max", {
        /** The maximum valid date. */
        get: /**
         * The maximum valid date.
         * @return {?}
         */
        function () { return this._maxDate; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._maxDate = value;
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "dateFilter", {
        set: /**
         * @param {?} filter
         * @return {?}
         */
        function (filter$$1) {
            this._dateFilter = filter$$1;
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "required", {
        get: /**
         * @return {?}
         */
        function () { return this._required; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () { return this._value; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this._value = this.coerceDateProperty(value);
            this._selected = this._value;
            this.startAt = this._value;
            setTimeout(function () {
                _this._inputValue = _this._formatDate(_this._value);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "openOnFocus", {
        get: /**
         * @return {?}
         */
        function () { return this._openOnFocus; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._openOnFocus = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "isOpen", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value && !this.opened) {
                this.open();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Md2Datepicker.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.close();
        if (this._popupRef) {
            this._popupRef.dispose();
        }
        if (this._dialogRef) {
            this._dialogRef.dispose();
        }
        if (this._inputSubscription) {
            this._inputSubscription.unsubscribe();
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    Md2Datepicker.prototype.registerOnValidatorChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._validatorOnChange = fn;
    };
    /**
     * @param {?} c
     * @return {?}
     */
    Md2Datepicker.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        return this._validator ? this._validator(c) : null;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Md2Datepicker.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    Md2Datepicker.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    Md2Datepicker.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    Md2Datepicker.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @return {?}
     */
    Md2Datepicker.prototype._handleFocus = /**
     * @return {?}
     */
    function () {
        this._inputFocused = true;
        if (!this.opened && this.openOnFocus) {
            this.open();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Md2Datepicker.prototype._handleBlur = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._inputFocused = false;
        if (!this.opened) {
            this._onTouched();
        }
        /** @type {?} */
        var el = event.target;
        /** @type {?} */
        var date = this._util.parseDate(el.value, this.format);
        if (!date) {
            date = this._util.parse(el.value);
        }
        if (date != null && date.getTime && !isNaN(date.getTime())) {
            /** @type {?} */
            var d = new Date(this.value);
            if (this.type !== 'time') {
                d.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
            }
            if (this.type !== 'date') {
                d.setHours(date.getHours(), date.getMinutes());
            }
            if (!this._util.isSameMinute(this.value, d)) {
                this.value = this._util.createDate(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds());
                this._emitChangeEvent();
            }
        }
        else {
            if (this.value) {
                this.value = null;
                this._emitChangeEvent();
            }
            el.value = null;
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Md2Datepicker.prototype.coerceDateProperty = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var v = null;
        if (value != null && value.getTime && !isNaN(value.getTime())) {
            v = value;
        }
        else {
            if (value && this.type === 'time') {
                /** @type {?} */
                var t = value + '';
                v = new Date();
                v.setHours(parseInt(t.substring(0, 2)));
                v.setMinutes(parseInt(t.substring(3, 5)));
            }
            else {
                /** @type {?} */
                var timestamp = Date.parse(value);
                v = isNaN(timestamp) ? null : new Date(timestamp);
            }
        }
        /** @type {?} */
        var d = v ? this._util.createDate(v.getFullYear(), v.getMonth(), v.getDate(), v.getHours(), v.getMinutes(), v.getSeconds()) : null;
        return d;
    };
    /**
     * format date
     * @param {?} date Date Object
     * @return {?} string with formatted date
     */
    Md2Datepicker.prototype._formatDate = /**
     * format date
     * @param {?} date Date Object
     * @return {?} string with formatted date
     */
    function (date) {
        if (!this.format || !date) {
            return '';
        }
        /** @type {?} */
        var format = this.format;
        /* Years */
        if (format.indexOf('yy') > -1) {
            format = format.replace('yy', ('00' + this._util.getYear(date)).slice(-2));
        }
        else if (format.indexOf('y') > -1) {
            format = format.replace('y', '' + this._util.getYear(date));
        }
        /* Days */
        if (format.indexOf('dd') > -1) {
            format = format.replace('dd', ('0' + this._util.getDate(date)).slice(-2));
        }
        else if (format.indexOf('d') > -1) {
            format = format.replace('d', '' + this._util.getDate(date));
        }
        /* Hours */
        if (/[aA]/.test(format)) {
            /* 12-hour */
            if (format.indexOf('HH') > -1) {
                format = format.replace('HH', ('0' + this._getHours12(this._util.getHours(date))).slice(-2));
            }
            else if (format.indexOf('H') > -1) {
                format = format.replace('H', '' + this._getHours12(this._util.getHours(date)));
            }
            format = format.replace('A', ((this._util.getHours(date) < 12) ? 'AM' : 'PM'))
                .replace('a', ((this._util.getHours(date) < 12) ? 'am' : 'pm'));
        }
        else {
            /* 24-hour */
            if (format.indexOf('HH') > -1) {
                format = format.replace('HH', ('0' + this._util.getHours(date)).slice(-2));
            }
            else if (format.indexOf('H') > -1) {
                format = format.replace('H', '' + this._util.getHours(date));
            }
        }
        /* Minutes */
        if (format.indexOf('mm') > -1) {
            format = format.replace('mm', ('0' + this._util.getMinutes(date)).slice(-2));
        }
        else if (format.indexOf('m') > -1) {
            format = format.replace('m', '' + this._util.getMinutes(date));
        }
        /* Seconds */
        if (format.indexOf('ss') > -1) {
            format = format.replace('ss', ('0' + this._util.getSeconds(date)).slice(-2));
        }
        else if (format.indexOf('s') > -1) {
            format = format.replace('s', '' + this._util.getSeconds(date));
        }
        /* Months */
        if (format.indexOf('MMMM') > -1) {
            format = format.replace('MMMM', this._locale.getMonthNames('long')[this._util.getMonth(date)]);
        }
        else if (format.indexOf('MMM') > -1) {
            format = format.replace('MMM', this._locale.getMonthNames('short')[this._util.getMonth(date)]);
        }
        else if (format.indexOf('MM') > -1) {
            format = format.replace('MM', ('0' + (this._util.getMonth(date) + 1)).slice(-2));
        }
        else if (format.indexOf('M') > -1) {
            format = format.replace('M', '' + (this._util.getMonth(date) + 1));
        }
        return format;
    };
    /**
     * Get an hour of the date in the 12-hour format
     * @param {?} hours
     * @return {?} hour of the date in the 12-hour format
     */
    Md2Datepicker.prototype._getHours12 = /**
     * Get an hour of the date in the 12-hour format
     * @param {?} hours
     * @return {?} hour of the date in the 12-hour format
     */
    function (hours) {
        if (hours == 0) {
            hours = 12;
        }
        else if (hours > 12) {
            hours -= 12;
        }
        return hours;
    };
    /** Selects the given date and closes the currently open popup or dialog. */
    /**
     * Selects the given date and closes the currently open popup or dialog.
     * @param {?} date
     * @return {?}
     */
    Md2Datepicker.prototype._selectAndClose = /**
     * Selects the given date and closes the currently open popup or dialog.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var oldValue = this._selected;
        this.value = date;
        if (!this._util.sameDateAndTime(oldValue, this._selected)) {
            this._emitChangeEvent();
        }
        this.close();
    };
    /** Emits an event when the user selects a date. */
    /**
     * Emits an event when the user selects a date.
     * @return {?}
     */
    Md2Datepicker.prototype._emitChangeEvent = /**
     * Emits an event when the user selects a date.
     * @return {?}
     */
    function () {
        this._onChange(this.value);
        this.change.emit(new Md2DateChange(this, this.value));
    };
    /** Open the calendar. */
    /**
     * Open the calendar.
     * @return {?}
     */
    Md2Datepicker.prototype.open = /**
     * Open the calendar.
     * @return {?}
     */
    function () {
        if (this.opened) {
            return;
        }
        if (!this._calendarPortal) {
            this._calendarPortal = new ComponentPortal(Md2DatepickerContent, this._viewContainerRef);
        }
        this.touchUi ? this._openAsDialog() : this._openAsPopup();
        this.opened = true;
        this.onOpen.emit();
    };
    /** Close the calendar. */
    /**
     * Close the calendar.
     * @return {?}
     */
    Md2Datepicker.prototype.close = /**
     * Close the calendar.
     * @return {?}
     */
    function () {
        if (!this.opened) {
            return;
        }
        if (this._popupRef && this._popupRef.hasAttached()) {
            this._popupRef.detach();
        }
        if (this._dialogRef && this._dialogRef.hasAttached()) {
            this._dialogRef.detach();
        }
        if (this._calendarPortal && this._calendarPortal.isAttached) {
            this._calendarPortal.detach();
        }
        this.opened = false;
        this.onClose.emit();
    };
    /**
     * Open the calendar as a dialog.
     * @return {?}
     */
    Md2Datepicker.prototype._openAsDialog = /**
     * Open the calendar as a dialog.
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this._dialogRef) {
            this._createDialog();
        }
        if (!this._dialogRef.hasAttached()) {
            /** @type {?} */
            var componentRef = this._dialogRef.attach(this._calendarPortal);
            componentRef.instance.datepicker = this;
        }
        this._dialogRef.backdropClick().subscribe(function () { return _this.close(); });
    };
    /**
     * Open the calendar as a popup.
     * @return {?}
     */
    Md2Datepicker.prototype._openAsPopup = /**
     * Open the calendar as a popup.
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this._popupRef) {
            this._createPopup();
        }
        if (!this._popupRef.hasAttached()) {
            /** @type {?} */
            var componentRef = this._popupRef.attach(this._calendarPortal);
            componentRef.instance.datepicker = this;
            /* Update the position once the calendar has rendered. */
            this._ngZone.onStable.pipe(first()).subscribe(function () { return _this._popupRef.updatePosition(); });
        }
        this._popupRef.backdropClick().subscribe(function () { return _this.close(); });
    };
    /**
     * Create the dialog.
     * @return {?}
     */
    Md2Datepicker.prototype._createDialog = /**
     * Create the dialog.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var overlayState = new OverlayState();
        overlayState.positionStrategy = this._overlay.position().global()
            .centerHorizontally()
            .centerVertically();
        overlayState.hasBackdrop = true;
        overlayState.backdropClass = 'cdk-overlay-dark-backdrop';
        overlayState.direction = this._dir ? this._dir.value : 'ltr';
        this._dialogRef = this._overlay.create(overlayState);
    };
    /**
     * Create the popup.
     * @return {?}
     */
    Md2Datepicker.prototype._createPopup = /**
     * Create the popup.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var overlayState = new OverlayState();
        overlayState.positionStrategy = this._createPopupPositionStrategy();
        overlayState.hasBackdrop = true;
        overlayState.backdropClass = 'cdk-overlay-transparent-backdrop';
        overlayState.direction = this._dir ? this._dir.value : 'ltr';
        overlayState.scrollStrategy = this._overlay.scrollStrategies.reposition();
        this._popupRef = this._overlay.create(overlayState);
    };
    /**
     * Create the popup PositionStrategy.
     * @return {?}
     */
    Md2Datepicker.prototype._createPopupPositionStrategy = /**
     * Create the popup PositionStrategy.
     * @return {?}
     */
    function () {
        return this._overlay.position()
            .connectedTo(this._element, { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
            .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
            .withFallbackPosition({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' })
            .withFallbackPosition({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' });
    };
    Md2Datepicker.decorators = [
        { type: Component, args: [{
                    selector: 'md2-datepicker',
                    template: "<div class=\"md2-datepicker-trigger\">\n  <button type=\"button\"\n          class=\"md2-datepicker-button\"\n          tabindex=\"-1\"\n          (click)=\"open()\"\n          [ngSwitch]=\"type\">\n    <svg *ngSwitchCase=\"'time'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n      <path d=\"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z\"></path>\n    </svg>\n    <svg *ngSwitchCase=\"'datetime'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n      <path d=\"M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z\"></path>\n    </svg>\n    <svg *ngSwitchDefault width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n      <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"></path>\n    </svg>\n  </button>\n  <div class=\"md2-datepicker-input\" [class.md2-datepicker-input-focused]=\"_inputFocused\">\n    <span class=\"md2-datepicker-placeholder\" [class.md2-floating-placeholder]=\"value || _inputFocused\">{{ placeholder }}</span>\n    <input #input\n           type=\"text\"\n           class=\"md2-datepicker-value\"\n           [tabindex]=\"tabindex\"\n           [disabled]=\"disabled\"\n           autocomplete=\"off\"\n           [value]=\"_inputValue\"\n           (change)=\"$event.stopPropagation()\"\n           (click)=\"_handleFocus()\"\n           (focus)=\"_handleFocus()\"\n           (blur)=\"_handleBlur($event)\" />\n    <span class=\"md2-datepicker-arrow\" (click)=\"open()\"></span>\n  </div>\n</div>\n",
                    providers: [MD2_DATEPICKER_VALUE_ACCESSOR, MD2_DATEPICKER_VALIDATORS],
                    host: {
                        'role': 'datepicker',
                        '[class.md2-datepicker-disabled]': 'disabled',
                        '[class.md2-datepicker-opened]': 'opened',
                        '[attr.aria-label]': 'placeholder',
                        '[attr.aria-required]': 'required.toString()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: ["md2-datepicker{position:relative;display:inline-block;min-width:175px;outline:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}md2-datepicker.md2-datepicker-disabled{pointer-events:none;cursor:default}.md2-datepicker-trigger{display:block;padding:18px 0 4px 46px;white-space:nowrap}.md2-datepicker-button{position:absolute;top:13px;left:0;display:inline-block;height:40px;width:40px;padding:8px;line-height:24px;color:rgba(0,0,0,.54);fill:currentColor;border:0;border-radius:50%;outline:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;box-sizing:border-box;background:0 0;vertical-align:middle;align-items:center;text-align:center}.md2-datepicker-button:focus{background-color:rgba(158,158,158,.2)}.md2-datepicker-disabled .md2-datepicker-button{color:rgba(0,0,0,.38)}.md2-datepicker-input{color:rgba(0,0,0,.38);border-bottom:1px solid rgba(0,0,0,.12);display:flex;justify-content:space-between;align-items:center;height:30px;min-width:168px;line-height:22px;position:relative;padding-right:20px;box-sizing:border-box}[aria-disabled=true] .md2-datepicker-input{background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;border-color:transparent;background-position:0 bottom;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.md2-datepicker-input.md2-datepicker-input-focused{color:#106cc8;border-color:#106cc8}md2-datepicker.ng-invalid.ng-touched:not(.md2-datepicker-disabled) .md2-datepicker-input{color:#f44336;border-color:#f44336}.md2-datepicker-placeholder{position:absolute;right:18px;bottom:100%;left:0;padding:0 2px;-webkit-transform:translate3d(0,26px,0) scale(1);transform:translate3d(0,26px,0) scale(1);-webkit-transform-origin:left top;transform-origin:left top;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;transition:150ms cubic-bezier(.25,.8,.25,1)}.md2-datepicker-placeholder.md2-floating-placeholder{left:-2px;text-align:left;-webkit-transform:translate3d(0,6px,0) scale(.75);transform:translate3d(0,6px,0) scale(.75)}[dir=rtl] .md2-datepicker-placeholder{right:0;left:18px;-webkit-transform-origin:right top;transform-origin:right top}[dir=rtl] .md2-datepicker-placeholder.md2-floating-placeholder{right:-2px;text-align:right}[aria-required=true] .md2-datepicker-placeholder::after{content:'*'}.md2-datepicker-value{position:relative;width:100%;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;color:rgba(0,0,0,.87);border:0;outline:0;background:0 0}.md2-datepicker-disabled .md2-datepicker-value{color:rgba(0,0,0,.38)}[dir=rtl] .md2-datepicker-value{left:auto;right:0}.md2-datepicker-arrow{position:absolute;right:0;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;margin:0 4px;color:rgba(0,0,0,.38)}.md2-datepicker-input-focused .md2-datepicker-arrow{color:#106cc8}md2-datepicker.ng-invalid.ng-touched:not(.md2-datepicker-disabled) .md2-datepicker-arrow{color:#f44336}.md2-calendar-years{position:absolute;top:10px;right:100%;bottom:10px;display:block;width:100%;line-height:40px;background:#fff;overflow-x:hidden;overflow-y:auto;transition:.3s}.md2-calendar-years.active{right:0}.md2-calendar-years .md2-calendar-years-content{display:flex;flex-direction:column;justify-content:center;min-height:100%}.md2-calendar-year{position:relative;display:block;margin:0 auto;padding:0;font-size:17px;font-weight:400;text-align:center;cursor:pointer}.md2-calendar-year.selected{color:#106cc8;font-size:26px;font-weight:500}.md2-datepicker-actions{text-align:right}.md2-datepicker-actions .md2-button{display:inline-block;min-width:64px;margin:4px 8px 8px 0;padding:0 12px;font-size:14px;color:#106cc8;line-height:36px;text-align:center;text-transform:uppercase;border-radius:2px;cursor:pointer;box-sizing:border-box;transition:450ms cubic-bezier(.23,1,.32,1)}.md2-datepicker-actions .md2-button:hover{background:#ebebeb}"]
                }] }
    ];
    /** @nocollapse */
    Md2Datepicker.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Overlay },
        { type: NgZone },
        { type: ViewContainerRef },
        { type: DateLocale },
        { type: DateUtil },
        { type: Dir, decorators: [{ type: Optional }] }
    ]; };
    Md2Datepicker.propDecorators = {
        startAt: [{ type: Input }],
        startView: [{ type: Input }],
        touchUi: [{ type: Input }],
        displayWeek: [{ type: Input }],
        tabindex: [{ type: Input }],
        mode: [{ type: Input }],
        placeholder: [{ type: Input }],
        timeInterval: [{ type: Input }],
        id: [{ type: Input }],
        type: [{ type: Input }],
        format: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        dateFilter: [{ type: Input }],
        required: [{ type: Input }],
        disabled: [{ type: Input }],
        value: [{ type: Input }],
        openOnFocus: [{ type: Input }],
        isOpen: [{ type: Input }],
        onOpen: [{ type: Output }],
        onClose: [{ type: Output }],
        change: [{ type: Output }],
        selectedChanged: [{ type: Output }]
    };
    return Md2Datepicker;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template D
 */
var Md2DatepickerToggle = /** @class */ (function () {
    function Md2DatepickerToggle() {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    Md2DatepickerToggle.prototype._open = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.datepicker) {
            this.datepicker.open();
            event.stopPropagation();
        }
    };
    Md2DatepickerToggle.decorators = [
        { type: Component, args: [{
                    selector: 'button[md2DatepickerToggle]',
                    template: '',
                    host: {
                        'type': 'button',
                        'class': 'md2-datepicker-toggle',
                        'aria-label': 'Open calendar',
                        '(click)': '_open($event)',
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".md2-datepicker-toggle{display:inline-block;background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE5IDNoLTFWMWgtMnYySDhWMUg2djJINWMtMS4xMSAwLTEuOTkuOS0xLjk5IDJMMyAxOWMwIDEuMS44OSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMlY1YzAtMS4xLS45LTItMi0yem0wIDE2SDVWOGgxNHYxMXpNNyAxMGg1djVIN3oiLz48L3N2Zz4=) 0 0/contain no-repeat;height:24px;width:24px;border:none;outline:0;vertical-align:middle}.md2-datepicker-toggle:not([disabled]){cursor:pointer}"]
                }] }
    ];
    Md2DatepickerToggle.propDecorators = {
        datepicker: [{ type: Input, args: ['md2DatepickerToggle',] }]
    };
    return Md2DatepickerToggle;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * \@docs-private
 */
var  /**
 * An internal class that represents the data corresponding to a single calendar cell.
 * \@docs-private
 */
Md2CalendarCell = /** @class */ (function () {
    function Md2CalendarCell(value, displayValue, ariaLabel, enabled, header) {
        this.value = value;
        this.displayValue = displayValue;
        this.ariaLabel = ariaLabel;
        this.enabled = enabled;
        this.header = header;
    }
    return Md2CalendarCell;
}());
/**
 * An internal component used to display calendar data in a table.
 * \@docs-private
 */
var Md2CalendarBody = /** @class */ (function () {
    function Md2CalendarBody() {
        /**
         * The number of columns in the table.
         */
        this.numCols = 7;
        /**
         * Whether to allow selection of disabled cells.
         */
        this.allowDisabledSelection = false;
        /**
         * The cell number of the active cell in the table.
         */
        this.activeCell = 0;
        /**
         * Emits when a new value is selected.
         */
        this.selectedValueChange = new EventEmitter();
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    Md2CalendarBody.prototype._cellClicked = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        if (!this.allowDisabledSelection && !cell.enabled) {
            return;
        }
        this.selectedValueChange.emit(cell.value);
    };
    Object.defineProperty(Md2CalendarBody.prototype, "_firstRowOffset", {
        /** The number of blank cells to put at the beginning for the first row. */
        get: /**
         * The number of blank cells to put at the beginning for the first row.
         * @return {?}
         */
        function () {
            return this.rows && this.rows.length && this.rows[0].length ?
                this.numCols - this.rows[0].length : 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} rowIndex
     * @param {?} colIndex
     * @return {?}
     */
    Md2CalendarBody.prototype._isActiveCell = /**
     * @param {?} rowIndex
     * @param {?} colIndex
     * @return {?}
     */
    function (rowIndex, colIndex) {
        /** @type {?} */
        var cellNumber = rowIndex * this.numCols + colIndex;
        // Account for the fact that the first row may not have as many cells.
        if (rowIndex) {
            cellNumber -= this._firstRowOffset;
        }
        return cellNumber == this.activeCell;
    };
    Md2CalendarBody.decorators = [
        { type: Component, args: [{
                    selector: '[md2-calendar-body]',
                    template: "<!--\n  If there's not enough space in the first row, create a separate label row. We mark this row as\n  aria-hidden because we don't want it to be read out as one of the weeks in the month.\n-->\n<tr *ngIf=\"_firstRowOffset < labelMinRequiredCells\" aria-hidden=\"true\">\n  <td class=\"md2-calendar-body-label\" [attr.colspan]=\"numCols\" >{{label}}</td>\n</tr>\n\n<!-- Create the first row separately so we can include a special spacer cell. -->\n<tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\n  <!--\n    We mark this cell as aria-hidden so it doesn't get read out as one of the days in the week.\n  -->\n  <th *ngIf=\"displayWeek\"\n      scope=\"row\"\n      class=\"md2-calendar-table-header\"\n      aria-hidden=\"true\">\n    {{row[0].header}}\n  </th>\n  <td *ngIf=\"rowIndex === 0 && _firstRowOffset\"\n      aria-hidden=\"true\"\n      class=\"md2-calendar-body-label\"\n      [attr.colspan]=\"_firstRowOffset\">\n    {{_firstRowOffset >= labelMinRequiredCells ? label : ''}}\n  </td>\n  <td *ngFor=\"let item of row; let colIndex = index\"\n      role=\"gridcell\"\n      class=\"md2-calendar-body-cell\"\n      [class.md2-calendar-body-disabled]=\"!item.enabled\"\n      [class.md2-calendar-body-active]=\"_isActiveCell(rowIndex, colIndex)\"\n      [attr.aria-label]=\"item.ariaLabel\"\n      [attr.aria-disabled]=\"!item.enabled || null\"\n      (click)=\"_cellClicked(item)\">\n    <div class=\"md2-calendar-body-cell-content\"\n         [class.md2-calendar-body-selected]=\"selectedValue === item.value\"\n         [class.md2-calendar-body-today]=\"todayValue === item.value\">\n      {{item.displayValue}}\n    </div>\n  </td>\n</tr>\n",
                    host: {
                        'class': 'md2-calendar-body',
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".md2-calendar-body{font-size:13px;min-width:224px}.md2-calendar-body-label{padding:7.14286% 0 7.14286% 7.14286%;height:0;line-height:0;color:rgba(0,0,0,.54);-webkit-transform:translateX(-6px);transform:translateX(-6px);text-align:left}.md2-calendar-body-cell{position:relative;width:14.28571%;height:0;line-height:0;padding:7.14286% 0;text-align:center;outline:0;cursor:pointer}.md2-calendar-body-disabled{cursor:default;pointer-events:none}.md2-calendar-body-cell-content{position:absolute;top:5%;left:5%;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:90%;height:90%;color:rgba(0,0,0,.87);border-radius:50%;border:1px solid transparent}.md2-calendar-body-disabled>.md2-calendar-body-cell-content:not(.md2-calendar-body-selected){color:rgba(0,0,0,.38)}.md2-calendar:focus .md2-calendar-body-active>.md2-calendar-body-cell-content:not(.md2-calendar-body-selected),:not(.md2-calendar-body-disabled):hover>.md2-calendar-body-cell-content:not(.md2-calendar-body-selected){background-color:rgba(0,0,0,.12)}.md2-calendar-body-selected{background-color:#106cc8;color:#fff}.md2-calendar-body-disabled>.md2-calendar-body-selected{background-color:rgba(16,108,200,.4)}.md2-calendar-body-today:not(.md2-calendar-body-selected){border-color:#106cc8}.md2-calendar-body-today.md2-calendar-body-selected{box-shadow:inset 0 0 0 1px md2-color(#106cc8,default-contrast)}.md2-calendar-body-disabled>.md2-calendar-body-today:not(.md2-calendar-body-selected){border-color:rgba(0,0,0,.18)}[dir=rtl] .md2-calendar-body-label{padding:0 7.14286% 0 0;-webkit-transform:translateX(6px);transform:translateX(6px);text-align:right}"]
                }] }
    ];
    Md2CalendarBody.propDecorators = {
        label: [{ type: Input }],
        rows: [{ type: Input }],
        todayValue: [{ type: Input }],
        selectedValue: [{ type: Input }],
        labelMinRequiredCells: [{ type: Input }],
        numCols: [{ type: Input }],
        allowDisabledSelection: [{ type: Input }],
        activeCell: [{ type: Input }],
        displayWeek: [{ type: Input }],
        selectedValueChange: [{ type: Output }]
    };
    return Md2CalendarBody;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var DAYS_PER_WEEK = 7;
/**
 * An internal component used to display a single month in the datepicker.
 * \@docs-private
 */
var Md2MonthView = /** @class */ (function () {
    function Md2MonthView(_locale, _util, _dateFormats) {
        this._locale = _locale;
        this._util = _util;
        this._dateFormats = _dateFormats;
        /**
         * Emits when a new date is selected.
         */
        this.selectedChange = new EventEmitter();
        if (!this._dateFormats) {
            throw Error('MD_DATE_FORMATS');
        }
        /** @type {?} */
        var firstDayOfWeek = this._locale.getFirstDayOfWeek();
        /** @type {?} */
        var narrowWeekdays = this._locale.getDayOfWeekNames('narrow');
        /** @type {?} */
        var longWeekdays = this._locale.getDayOfWeekNames('long');
        /** @type {?} */
        var weekdays = longWeekdays.map(function (long, i) {
            return { long: long, narrow: narrowWeekdays[i] };
        });
        this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
        this._activeDate = this._util.today();
    }
    Object.defineProperty(Md2MonthView.prototype, "activeDate", {
        /**
         * The date to display in this month view (everything other than the month and year is ignored).
         */
        get: /**
         * The date to display in this month view (everything other than the month and year is ignored).
         * @return {?}
         */
        function () { return this._activeDate; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var oldActiveDate = this._activeDate;
            this._activeDate = value || this._util.today();
            if (oldActiveDate && this._activeDate &&
                !this._util.isSameMonthAndYear(oldActiveDate, this._activeDate)) {
                this._init();
                if (this._util.isInNextMonth(oldActiveDate, this._activeDate)) {
                    this.calendarState('right');
                }
                else {
                    this.calendarState('left');
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2MonthView.prototype, "selected", {
        /** The currently selected date. */
        get: /**
         * The currently selected date.
         * @return {?}
         */
        function () { return this._selected; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selected = value;
            this._selectedDate = this._getDateInCurrentMonth(this.selected);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Md2MonthView.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._init();
    };
    /** Handles when a new date is selected. */
    /**
     * Handles when a new date is selected.
     * @param {?} date
     * @return {?}
     */
    Md2MonthView.prototype._dateSelected = /**
     * Handles when a new date is selected.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.selectedChange.emit(this._util.createDate(this._util.getYear(this.activeDate), this._util.getMonth(this.activeDate), date, this._util.getHours(this.activeDate), this._util.getMinutes(this.activeDate), this._util.getSeconds(this.activeDate)));
    };
    /**
     * Initializes this month view.
     * @return {?}
     */
    Md2MonthView.prototype._init = /**
     * Initializes this month view.
     * @return {?}
     */
    function () {
        this._selectedDate = this._getDateInCurrentMonth(this.selected);
        this._todayDate = this._getDateInCurrentMonth(this._util.today());
        /** @type {?} */
        var firstOfMonth = this._util.createDate(this._util.getYear(this.activeDate), this._util.getMonth(this.activeDate), 1, this._util.getHours(this.activeDate), this._util.getMinutes(this.activeDate), this._util.getSeconds(this.activeDate));
        this._firstWeekOffset =
            (DAYS_PER_WEEK + this._locale.getDayOfWeek(firstOfMonth) -
                this._locale.getFirstDayOfWeek()) % DAYS_PER_WEEK;
        this._createWeekCells();
    };
    /**
     * Creates MdCalendarCells for the dates in this month.
     * @return {?}
     */
    Md2MonthView.prototype._createWeekCells = /**
     * Creates MdCalendarCells for the dates in this month.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var daysInMonth = this._util.getNumDaysInMonth(this.activeDate);
        /** @type {?} */
        var dateNames = this._locale.getDateNames();
        /** @type {?} */
        var oldWeek;
        this._weeks = [];
        for (var i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
            /** @type {?} */
            var date = this._util.createDate(this._util.getYear(this.activeDate), this._util.getMonth(this.activeDate), i + 1, this._util.getHours(this.activeDate), this._util.getMinutes(this.activeDate), this._util.getSeconds(this.activeDate));
            /** @type {?} */
            var enabled = !this.dateFilter ||
                this.dateFilter(date);
            /** @type {?} */
            var ariaLabel = this._locale.format(date, this._dateFormats.display.dateA11yLabel);
            /** @type {?} */
            var newWeek = this._util.getWeekOfYear(date);
            if (oldWeek !== newWeek) {
                this._weeks.push([]);
                oldWeek = newWeek;
                cell = 0;
            }
            this._weeks[this._weeks.length - 1]
                .push(new Md2CalendarCell(i + 1, dateNames[i], ariaLabel, enabled, newWeek.toString()));
        }
    };
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     * @param {?} date
     * @return {?}
     */
    Md2MonthView.prototype._getDateInCurrentMonth = /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this._util.isSameMonthAndYear(date, this.activeDate) ?
            this._util.getDate(date) : null;
    };
    /**
     * @param {?} direction
     * @return {?}
     */
    Md2MonthView.prototype.calendarState = /**
     * @param {?} direction
     * @return {?}
     */
    function (direction) {
        this._calendarState = direction;
    };
    /**
     * @return {?}
     */
    Md2MonthView.prototype._calendarStateDone = /**
     * @return {?}
     */
    function () {
        this._calendarState = '';
    };
    Md2MonthView.decorators = [
        { type: Component, args: [{
                    selector: 'md2-month-view',
                    template: "<table class=\"md2-calendar-table\">\n  <thead class=\"md2-calendar-table-header\">\n    <tr>\n      <th *ngIf=\"displayWeek\">#</th>\n      <th *ngFor=\"let day of _weekdays\" [attr.aria-label]=\"day.long\">{{day.narrow}}</th>\n    </tr>\n  </thead>\n  <tbody [@slideCalendar]=\"_calendarState\"\n         (@slideCalendar.done)=\"_calendarStateDone()\"\n         md2-calendar-body\n         role=\"grid\"\n         [rows]=\"_weeks\"\n         [todayValue]=\"_todayDate\"\n         [selectedValue]=\"_selectedDate\"\n         [displayWeek]=\"displayWeek\"\n         [activeCell]=\"_util.getDate(activeDate) - 1\"\n         (selectedValueChange)=\"_dateSelected($event)\"></tbody>\n</table>\n",
                    animations: [slideCalendar],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    Md2MonthView.ctorParameters = function () { return [
        { type: DateLocale },
        { type: DateUtil },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MD_DATE_FORMATS,] }] }
    ]; };
    Md2MonthView.propDecorators = {
        displayWeek: [{ type: Input }],
        activeDate: [{ type: Input }],
        selected: [{ type: Input }],
        dateFilter: [{ type: Input }],
        selectedChange: [{ type: Output }]
    };
    return Md2MonthView;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * An internal component used to display a single year in the datepicker.
 * \@docs-private
 */
var Md2YearView = /** @class */ (function () {
    function Md2YearView(_locale, _util, _dateFormats) {
        this._locale = _locale;
        this._util = _util;
        this._dateFormats = _dateFormats;
        /**
         * Emits when a new month is selected.
         */
        this.selectedChange = new EventEmitter();
        if (!this._dateFormats) {
            throw Error('MD_DATE_FORMATS');
        }
        this._activeDate = this._util.today();
    }
    Object.defineProperty(Md2YearView.prototype, "activeDate", {
        /** The date to display in this year view (everything other than the year is ignored). */
        get: /**
         * The date to display in this year view (everything other than the year is ignored).
         * @return {?}
         */
        function () { return this._activeDate; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var oldActiveDate = this._activeDate;
            this._activeDate = value || this._util.today();
            if (oldActiveDate && this._activeDate &&
                !this._util.isSameYear(oldActiveDate, this._activeDate)) {
                this._init();
                // if (oldActiveDate < this._activeDate) {
                //  this.calendarState('right');
                // } else {
                //  this.calendarState('left');
                // }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2YearView.prototype, "selected", {
        /** The currently selected date. */
        get: /**
         * The currently selected date.
         * @return {?}
         */
        function () { return this._selected; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selected = value;
            this._selectedMonth = this._getMonthInCurrentYear(this.selected);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Md2YearView.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._init();
    };
    /** Handles when a new month is selected. */
    /**
     * Handles when a new month is selected.
     * @param {?} month
     * @return {?}
     */
    Md2YearView.prototype._monthSelected = /**
     * Handles when a new month is selected.
     * @param {?} month
     * @return {?}
     */
    function (month) {
        this.selectedChange.emit(this._util.createDate(this._util.getYear(this.activeDate), month, this._util.getDate(this.activeDate), this._util.getHours(this.activeDate), this._util.getMinutes(this.activeDate), this._util.getSeconds(this.activeDate)));
    };
    /**
     * Initializes this month view.
     * @return {?}
     */
    Md2YearView.prototype._init = /**
     * Initializes this month view.
     * @return {?}
     */
    function () {
        var _this = this;
        this._selectedMonth = this._getMonthInCurrentYear(this.selected);
        this._todayMonth = this._getMonthInCurrentYear(this._util.today());
        this._yearLabel = this._locale.getYearName(this.activeDate);
        /** @type {?} */
        var monthNames = this._locale.getMonthNames('short');
        // First row of months only contains 5 elements so we can fit the year label on the same row.
        this._months = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9, 10, 11]].map(function (row) { return row.map(function (month) { return _this._createCellForMonth(month, monthNames[month]); }); });
    };
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     * @param {?} date
     * @return {?}
     */
    Md2YearView.prototype._getMonthInCurrentYear = /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this._util.isSameYear(date, this.activeDate) ?
            this._util.getMonth(date) : null;
    };
    /**
     * Creates an MdCalendarCell for the given month.
     * @param {?} month
     * @param {?} monthName
     * @return {?}
     */
    Md2YearView.prototype._createCellForMonth = /**
     * Creates an MdCalendarCell for the given month.
     * @param {?} month
     * @param {?} monthName
     * @return {?}
     */
    function (month, monthName) {
        /** @type {?} */
        var ariaLabel = this._locale.format(this._util.createDate(this._util.getYear(this.activeDate), month, 1, this._util.getHours(this.activeDate), this._util.getMinutes(this.activeDate), this._util.getSeconds(this.activeDate)), this._dateFormats.display.monthYearA11yLabel);
        return new Md2CalendarCell(month, monthName.toLocaleUpperCase(), ariaLabel, this._isMonthEnabled(month));
    };
    /**
     * Whether the given month is enabled.
     * @param {?} month
     * @return {?}
     */
    Md2YearView.prototype._isMonthEnabled = /**
     * Whether the given month is enabled.
     * @param {?} month
     * @return {?}
     */
    function (month) {
        if (!this.dateFilter) {
            return true;
        }
        /** @type {?} */
        var firstOfMonth = this._util.createDate(this._util.getYear(this.activeDate), month, 1, this._util.getHours(this.activeDate), this._util.getMinutes(this.activeDate), this._util.getSeconds(this.activeDate));
        // If any date in the month is enabled count the month as enabled.
        for (var date = firstOfMonth; this._util.getMonth(date) == month; date = this._util.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    };
    /**
     * @param {?} direction
     * @return {?}
     */
    Md2YearView.prototype.calendarState = /**
     * @param {?} direction
     * @return {?}
     */
    function (direction) {
        this._calendarState = direction;
    };
    /**
     * @return {?}
     */
    Md2YearView.prototype._calendarStateDone = /**
     * @return {?}
     */
    function () {
        this._calendarState = '';
    };
    Md2YearView.decorators = [
        { type: Component, args: [{
                    selector: 'md2-year-view',
                    template: "<table class=\"md2-calendar-table\">\n  <thead class=\"md2-calendar-table-header\"></thead>\n  <tbody [@slideCalendar]=\"_calendarState\"\n         (@slideCalendar.done)=\"_calendarStateDone()\"\n         md2-calendar-body\n         role=\"grid\"\n         allowDisabledSelection=\"true\"\n         [label]=\"_yearLabel\"\n         [rows]=\"_months\"\n         [todayValue]=\"_todayMonth\"\n         [selectedValue]=\"_selectedMonth\"\n         [labelMinRequiredCells]=\"2\"\n         [activeCell]=\"_util.getMonth(activeDate)\"\n         (selectedValueChange)=\"_monthSelected($event)\"></tbody>\n</table>\n",
                    animations: [slideCalendar],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    Md2YearView.ctorParameters = function () { return [
        { type: DateLocale },
        { type: DateUtil },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MD_DATE_FORMATS,] }] }
    ]; };
    Md2YearView.propDecorators = {
        activeDate: [{ type: Input }],
        selected: [{ type: Input }],
        dateFilter: [{ type: Input }],
        selectedChange: [{ type: Output }]
    };
    return Md2YearView;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var CLOCK_RADIUS = 50;
/** @type {?} */
var CLOCK_INNER_RADIUS = 27.5;
/** @type {?} */
var CLOCK_OUTER_RADIUS = 41.25;
/** @type {?} */
var CLOCK_TICK_RADIUS = 7.0833;
/**
 * A clock that is used as part of the datepicker.
 * \@docs-private
 */
var Md2Clock = /** @class */ (function () {
    function Md2Clock(_element, _locale, _util) {
        var _this = this;
        this._element = _element;
        this._locale = _locale;
        this._util = _util;
        this.interval = 1;
        this.twelvehour = false;
        /**
         * Emits when the currently selected date changes.
         */
        this.selectedChange = new EventEmitter();
        this.activeDateChange = new EventEmitter();
        /**
         * Hours and Minutes representing the clock view.
         */
        this._hours = [];
        this._minutes = [];
        /**
         * Whether the clock is in hour view.
         */
        this._hourView = true;
        this.mouseMoveListener = function (event) { _this._handleMousemove(event); };
        this.mouseUpListener = function () { _this._handleMouseup(); };
    }
    Object.defineProperty(Md2Clock.prototype, "activeDate", {
        /**
         * The date to display in this clock view.
         */
        get: /**
         * The date to display in this clock view.
         * @return {?}
         */
        function () { return this._activeDate; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var oldActiveDate = this._activeDate;
            this._activeDate = this._util.clampDate(value, this.min, this.max);
            if (!this._util.isSameMinute(oldActiveDate, this._activeDate)) {
                this._init();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Clock.prototype, "selected", {
        /** The currently selected date. */
        get: /**
         * The currently selected date.
         * @return {?}
         */
        function () { return this._selected; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selected = this._util.parse(value);
            if (this._selected) {
                this.activeDate = this._selected;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Clock.prototype, "min", {
        /** The minimum selectable date. */
        get: /**
         * The minimum selectable date.
         * @return {?}
         */
        function () { return this._min; },
        set: /**
         * @param {?} date
         * @return {?}
         */
        function (date) { this._min = this._util.parse(date); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Clock.prototype, "max", {
        /** The maximum selectable date. */
        get: /**
         * The maximum selectable date.
         * @return {?}
         */
        function () { return this._max; },
        set: /**
         * @param {?} date
         * @return {?}
         */
        function (date) { this._max = this._util.parse(date); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Clock.prototype, "startView", {
        /** Whether the clock should be started in hour or minute view. */
        set: /**
         * Whether the clock should be started in hour or minute view.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._hourView = value != 'minute';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Clock.prototype, "_hand", {
        get: /**
         * @return {?}
         */
        function () {
            this._selectedHour = this._util.getHours(this.activeDate);
            this._selectedMinute = this._util.getMinutes(this.activeDate);
            /** @type {?} */
            var deg = 0;
            /** @type {?} */
            var radius = CLOCK_OUTER_RADIUS;
            if (this._hourView) {
                /** @type {?} */
                var outer = this.activeDate.getHours() > 0 && this.activeDate.getHours() < 13;
                radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
                if (this.twelvehour) {
                    radius = CLOCK_OUTER_RADIUS;
                }
                deg = Math.round(this.activeDate.getHours() * (360 / (24 / 2)));
            }
            else {
                deg = Math.round(this.activeDate.getMinutes() * (360 / 60));
            }
            return {
                'transform': "rotate(" + deg + "deg)",
                'height': radius + "%",
                'margin-top': 50 - radius + "%"
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Md2Clock.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.activeDate = this._activeDate || this._util.today();
        this._init();
    };
    /** Handles mousedown events on the clock body. */
    /**
     * Handles mousedown events on the clock body.
     * @param {?} event
     * @return {?}
     */
    Md2Clock.prototype._handleMousedown = /**
     * Handles mousedown events on the clock body.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.setTime(event);
        document.addEventListener('mousemove', this.mouseMoveListener);
        document.addEventListener('touchmove', this.mouseMoveListener);
        document.addEventListener('mouseup', this.mouseUpListener);
        document.addEventListener('touchend', this.mouseUpListener);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Md2Clock.prototype._handleMousemove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.setTime(event);
    };
    /**
     * @return {?}
     */
    Md2Clock.prototype._handleMouseup = /**
     * @return {?}
     */
    function () {
        document.removeEventListener('mousemove', this.mouseMoveListener);
        document.removeEventListener('touchmove', this.mouseMoveListener);
        document.removeEventListener('mouseup', this.mouseUpListener);
        document.removeEventListener('touchend', this.mouseUpListener);
        this.selectedChange.emit(this.activeDate);
    };
    /**
     * Initializes this clock view.
     * @return {?}
     */
    Md2Clock.prototype._init = /**
     * Initializes this clock view.
     * @return {?}
     */
    function () {
        this._hours.length = 0;
        this._minutes.length = 0;
        /** @type {?} */
        var hourNames = this._locale.getHourNames();
        /** @type {?} */
        var minuteNames = this._locale.getMinuteNames();
        if (this.twelvehour) {
            for (var i = 1; i < (hourNames.length / 2) + 1; i++) {
                /** @type {?} */
                var radian = i / 6 * Math.PI;
                /** @type {?} */
                var radius = CLOCK_OUTER_RADIUS;
                /** @type {?} */
                var date = new Date(this.activeDate.getTime());
                date.setHours(i + 1, 0, 0, 0);
                /** @type {?} */
                var enabled = this._util.isFullDateWithinRange(date, this.min, this.max);
                this._hours.push({
                    value: i,
                    displayValue: i === 0 ? '00' : hourNames[i],
                    enabled: enabled,
                    top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
                    left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS,
                });
            }
        }
        else {
            for (var i = 0; i < hourNames.length; i++) {
                /** @type {?} */
                var radian = i / 6 * Math.PI;
                /** @type {?} */
                var outer = i > 0 && i < 13;
                /** @type {?} */
                var radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
                /** @type {?} */
                var date = new Date(this.activeDate.getTime());
                date.setHours(i + 1, 0, 0, 0);
                /** @type {?} */
                var enabled = this._util.isFullDateWithinRange(date, this.min, this.max);
                this._hours.push({
                    value: i,
                    displayValue: i === 0 ? '00' : hourNames[i],
                    enabled: enabled,
                    top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
                    left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS,
                    fontSize: i > 0 && i < 13 ? '' : '80%'
                });
            }
        }
        for (var i = 0; i < minuteNames.length; i += 5) {
            /** @type {?} */
            var radian = i / 30 * Math.PI;
            /** @type {?} */
            var date = new Date(this.activeDate.getTime());
            date.setMinutes(i, 0, 0);
            /** @type {?} */
            var enabled = this._util.isFullDateWithinRange(date, this.min, this.max);
            this._minutes.push({
                value: i,
                displayValue: i === 0 ? '00' : minuteNames[i],
                enabled: enabled,
                top: CLOCK_RADIUS - Math.cos(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS,
                left: CLOCK_RADIUS + Math.sin(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS,
            });
        }
    };
    /**
     * Set Time
     * @param {?} event
     * @return {?}
     */
    Md2Clock.prototype.setTime = /**
     * Set Time
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var trigger$$1 = this._element.nativeElement;
        /** @type {?} */
        var triggerRect = trigger$$1.getBoundingClientRect();
        /** @type {?} */
        var width = trigger$$1.offsetWidth;
        /** @type {?} */
        var height = trigger$$1.offsetHeight;
        /** @type {?} */
        var pageX = event.pageX !== undefined ? event.pageX : event.touches[0].pageX;
        /** @type {?} */
        var pageY = event.pageY !== undefined ? event.pageY : event.touches[0].pageY;
        /** @type {?} */
        var x = (width / 2) - (pageX - triggerRect.left - window.pageXOffset);
        /** @type {?} */
        var y = (height / 2) - (pageY - triggerRect.top - window.pageYOffset);
        /** @type {?} */
        var radian = Math.atan2(-x, y);
        /** @type {?} */
        var unit = Math.PI / (this._hourView ? 6 : (this.interval ? (30 / this.interval) : 30));
        /** @type {?} */
        var z = Math.sqrt(x * x + y * y);
        /** @type {?} */
        var outer = this._hourView && z > ((width * (CLOCK_OUTER_RADIUS / 100)) +
            (width * (CLOCK_INNER_RADIUS / 100))) / 2;
        /** @type {?} */
        var value = 0;
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        value = Math.round(radian / unit);
        radian = value * unit;
        /** @type {?} */
        var date = new Date(this.activeDate.getTime());
        if (this._hourView) {
            if (this.twelvehour) {
                value = value === 0 ? 12 : value;
            }
            else {
                if (value === 12) {
                    value = 0;
                }
                value = outer ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
            }
            date.setHours(value);
        }
        else {
            if (this.interval) {
                value *= this.interval;
            }
            if (value === 60) {
                value = 0;
            }
            date.setMinutes(value);
        }
        this.activeDate = this._util.clampDate(date, this.min, this.max);
        this.activeDateChange.emit(this.activeDate);
    };
    Md2Clock.decorators = [
        { type: Component, args: [{
                    selector: 'md2-clock',
                    template: "<div class=\"md2-clock\">\n  <div class=\"md2-clock-center\"></div>\n  <div class=\"md2-clock-hand\" [ngStyle]=\"_hand\"></div>\n  <div class=\"md2-clock-hours\" [class.active]=\"_hourView\">\n    <div *ngFor=\"let item of _hours\"\n         class=\"md2-clock-cell\"\n         [class.md2-clock-cell-selected]=\"_selectedHour == item.value\"\n         [class.md2-clock-cell-disabled]=\"!item.enabled\"\n         [style.top]=\"item.top+'%'\"\n         [style.left]=\"item.left+'%'\"\n         [style.fontSize]=\"item.fontSize\">{{ item.displayValue }}</div>\n  </div>\n  <div class=\"md2-clock-minutes\" [class.active]=\"!_hourView\">\n    <div *ngFor=\"let item of _minutes\"\n         class=\"md2-clock-cell\"\n         [class.md2-clock-cell-selected]=\"_selectedMinute == item.value\"\n         [class.md2-clock-cell-disabled]=\"!item.enabled\"\n         [style.top]=\"item.top+'%'\"\n         [style.left]=\"item.left+'%'\">{{ item.displayValue }}</div>\n  </div>\n</div>",
                    host: {
                        'role': 'clock',
                        '(mousedown)': '_handleMousedown($event)',
                    },
                    styles: [":host{position:relative;display:block;min-width:224px;margin:8px;font-size:14px;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.md2-clock{position:relative;width:100%;height:0;padding-top:100%;background-color:#e0e0e0;border-radius:50%}.md2-clock-center{position:absolute;top:50%;left:50%;width:2%;height:2%;margin:-1%;border-radius:50%;background-color:#106cc8}.md2-clock-hand{position:absolute;top:0;right:0;bottom:0;left:0;width:1px;margin:0 auto;background-color:#106cc8;-webkit-transform-origin:bottom;transform-origin:bottom}.md2-clock-hand::before{content:'';position:absolute;top:-4px;left:-4px;width:8px;height:8px;border-radius:50%;background-color:#106cc8}.md2-clock-hours,.md2-clock-minutes{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;visibility:hidden;transition:350ms;-webkit-transform:scale(1.2);transform:scale(1.2)}.md2-clock-hours.active,.md2-clock-minutes.active{opacity:1;visibility:visible;-webkit-transform:scale(1);transform:scale(1)}.md2-clock-minutes{-webkit-transform:scale(.8);transform:scale(.8)}.md2-clock-cell{position:absolute;display:flex;width:14.1666%;height:14.1666%;color:rgba(0,0,0,.87);justify-content:center;box-sizing:border-box;border-radius:50%;align-items:center;cursor:pointer}.md2-clock-cell:not(.md2-clock-cell-selected):not(.md2-clock-cell-disabled):hover{background-color:rgba(0,0,0,.1)}.md2-clock-cell.md2-clock-cell-disabled{color:rgba(0,0,0,.38);pointer-events:none}.md2-clock-cell.md2-clock-cell-selected{color:#fff;background-color:#1279e0}"]
                }] }
    ];
    /** @nocollapse */
    Md2Clock.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DateLocale },
        { type: DateUtil }
    ]; };
    Md2Clock.propDecorators = {
        activeDate: [{ type: Input }],
        selected: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        startView: [{ type: Input }],
        dateFilter: [{ type: Input }],
        interval: [{ type: Input }],
        twelvehour: [{ type: Input }],
        selectedChange: [{ type: Output }],
        activeDateChange: [{ type: Output }]
    };
    return Md2Clock;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2DatepickerModule = /** @class */ (function () {
    function Md2DatepickerModule() {
    }
    Md2DatepickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        PortalModule,
                        StyleModule,
                        A11yModule,
                    ],
                    exports: [
                        Md2Datepicker,
                        Md2DatepickerToggle,
                        Md2Calendar,
                        Md2CalendarBody,
                        Md2Calendar,
                        Md2MonthView,
                        Md2YearView,
                        Md2CalendarBody,
                        Md2Clock,
                    ],
                    declarations: [
                        Md2Datepicker,
                        Md2DatepickerContent,
                        Md2DatepickerToggle,
                        Md2Calendar,
                        Md2MonthView,
                        Md2YearView,
                        Md2CalendarBody,
                        Md2Clock,
                    ],
                    providers: [DateLocale, DateUtil],
                    entryComponents: [
                        Md2DatepickerContent
                    ]
                },] }
    ];
    return Md2DatepickerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Extends an object with the *enumerable* and *own* properties of one or more source objects,
 * similar to Object.assign.
 *
 * @param {?} dest The object which will have properties copied to it.
 * @param {...?} sources The source objects from which properties will be copied.
 * @return {?}
 */
function extendObject(dest) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    var e_1, _a;
    if (dest == null) {
        throw TypeError('Cannot convert undefined or null to object');
    }
    try {
        for (var sources_1 = __values(sources), sources_1_1 = sources_1.next(); !sources_1_1.done; sources_1_1 = sources_1.next()) {
            var source = sources_1_1.value;
            if (source != null) {
                for (var key in source) {
                    if (source.hasOwnProperty(key)) {
                        dest[key] = source[key];
                    }
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (sources_1_1 && !sources_1_1.done && (_a = sources_1.return)) _a.call(sources_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return dest;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2DialogConfig = /** @class */ (function () {
    function Md2DialogConfig() {
        this.role = 'dialog';
        this.disableClose = false;
    }
    return Md2DialogConfig;
}());
var Md2DialogPortal = /** @class */ (function (_super) {
    __extends(Md2DialogPortal, _super);
    function Md2DialogPortal(templateRef, viewContainerRef) {
        return _super.call(this, templateRef, viewContainerRef) || this;
    }
    Md2DialogPortal.decorators = [
        { type: Directive, args: [{ selector: '[md2DialogPortal]' },] }
    ];
    /** @nocollapse */
    Md2DialogPortal.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: ViewContainerRef }
    ]; };
    return Md2DialogPortal;
}(TemplatePortalDirective));
/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
var Md2DialogTitle = /** @class */ (function () {
    function Md2DialogTitle() {
    }
    Md2DialogTitle.decorators = [
        { type: Directive, args: [{ selector: 'md2-dialog-title' },] }
    ];
    return Md2DialogTitle;
}());
/**
 * Scrollable content container of a dialog.
 */
var Md2DialogContent = /** @class */ (function () {
    function Md2DialogContent() {
    }
    Md2DialogContent.decorators = [
        { type: Directive, args: [{ selector: 'md2-dialog-content' },] }
    ];
    return Md2DialogContent;
}());
/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
var Md2DialogActions = /** @class */ (function () {
    function Md2DialogActions() {
    }
    Md2DialogActions.decorators = [
        { type: Directive, args: [{ selector: 'md2-dialog-footer, md2-dialog-actions' },] }
    ];
    return Md2DialogActions;
}());
var Md2Dialog = /** @class */ (function () {
    function Md2Dialog(_overlay, _parentDialog) {
        this._overlay = _overlay;
        this._parentDialog = _parentDialog;
        this._openDialogsAtThisLevel = [];
        this._boundKeydown = this._handleKeydown.bind(this);
        this._panelOpen = false;
        this._overlayRef = null;
        /**
         * Property watched by the animation framework to show or hide the dialog
         */
        this._visibility = 'initial';
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
    }
    /**
     * @return {?}
     */
    Md2Dialog.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () { this.destroyPanel(); };
    Object.defineProperty(Md2Dialog.prototype, "_openDialogs", {
        get: /**
         * @return {?}
         */
        function () {
            return this._parentDialog ? this._parentDialog._openDialogs : this._openDialogsAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    /** Open the dialog */
    /**
     * Open the dialog
     * @param {?=} config
     * @return {?}
     */
    Md2Dialog.prototype.open = /**
     * Open the dialog
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        this.config = _applyConfigDefaults(config);
        if (this._panelOpen) {
            return Promise.resolve(this);
        }
        this._createOverlay();
        this._overlayRef.attach(this._portal);
        this._subscribeToBackdrop();
        if (!this._openDialogs.length && !this._parentDialog) {
            document.addEventListener('keydown', this._boundKeydown);
        }
        this._openDialogs.push(this);
        this._panelOpen = true;
        this._visibility = 'visible';
        return Promise.resolve(this);
    };
    /** Close the dialog */
    /**
     * Close the dialog
     * @return {?}
     */
    Md2Dialog.prototype.close = /**
     * Close the dialog
     * @return {?}
     */
    function () {
        this._visibility = 'hidden';
        this._panelOpen = false;
        if (this._overlayRef) {
            this._overlayRef.detach();
            if (this._backdropSubscription) {
                this._backdropSubscription.unsubscribe();
            }
        }
        /** @type {?} */
        var index = this._openDialogs.indexOf(this);
        if (index > -1) {
            this._openDialogs.splice(index, 1);
            // no open dialogs are left, call next on afterAllClosed Subject
            if (!this._openDialogs.length) {
                document.removeEventListener('keydown', this._boundKeydown);
            }
        }
        return Promise.resolve(this);
    };
    /** Removes the panel from the DOM. */
    /**
     * Removes the panel from the DOM.
     * @return {?}
     */
    Md2Dialog.prototype.destroyPanel = /**
     * Removes the panel from the DOM.
     * @return {?}
     */
    function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._cleanUpSubscriptions();
        }
    };
    /**
     * @return {?}
     */
    Md2Dialog.prototype._onPanelDone = /**
     * @return {?}
     */
    function () {
        if (this._panelOpen) {
            this.onOpen.emit(this);
        }
        else {
            this.onClose.emit(this);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Md2Dialog.prototype._handleKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var topDialog = this._openDialogs[this._openDialogs.length - 1];
        if (event.keyCode === ESCAPE && topDialog &&
            !topDialog.config.disableClose) {
            topDialog.close();
        }
    };
    /**
     * @return {?}
     */
    Md2Dialog.prototype._subscribeToBackdrop = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.config.disableClose) {
            this._backdropSubscription = this._overlayRef.backdropClick().pipe(first()).subscribe(function () {
                return _this.close();
            });
        }
    };
    /**
     * @return {?}
     */
    Md2Dialog.prototype._createOverlay = /**
     * @return {?}
     */
    function () {
        if (!this._overlayRef) {
            /** @type {?} */
            var config = new OverlayState();
            config.positionStrategy = this._overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically();
            config.hasBackdrop = true;
            this._overlayRef = this._overlay.create(config);
        }
    };
    /**
     * @return {?}
     */
    Md2Dialog.prototype._cleanUpSubscriptions = /**
     * @return {?}
     */
    function () {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
    };
    Md2Dialog.decorators = [
        { type: Component, args: [{
                    selector: 'md2-dialog',
                    template: "<ng-template md2DialogPortal>\n  <div class=\"md2-dialog-panel\" [attr.role]=\"config?.role\">\n    <!--[@state]=\"_visibility\" (@state.done)=\"_onPanelDone()\"-->\n    <div class=\"md2-dialog-content\">\n      <div class=\"md2-dialog-header\">\n        <button *ngIf=\"!config.disableClose\" type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"close()\">&times;</button>\n        <h2 *ngIf=\"dialogTitle\" class=\"md2-dialog-title\" id=\"myDialogLabel\" [innerHtml]=\"dialogTitle\"></h2>\n        <ng-content select=\"md2-dialog-title\"></ng-content>\n      </div>\n      <div class=\"md2-dialog-body\">\n        <ng-content select=\"md2-dialog-content\"></ng-content>\n        <ng-content></ng-content>\n      </div>\n      <ng-content select=\"md2-dialog-footer\"></ng-content>\n      <ng-content select=\"md2-dialog-actions\"></ng-content>\n    </div>\n  </div>\n</ng-template>\n",
                    host: {
                        'tabindex': '0',
                        '[attr.role]': 'config?.role',
                    },
                    animations: [
                        trigger('state', [
                            state('void', style({ transform: 'scale(0.3)' })),
                            state('initial', style({ transform: 'scale(0.3)' })),
                            state('visible', style({ transform: 'scale(1)' })),
                            state('hidden', style({ transform: 'scale(0.3)' })),
                            transition('* => visible', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
                            transition('* => hidden', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
                        ])
                    ],
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'md2Dialog',
                    styles: [".md2-dialog-panel{position:relative;max-width:90vw;width:600px;border-radius:3px;background-color:#fff;overflow:hidden;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.md2-dialog-header{background:#2196f3;color:#fff;font-size:25px;line-height:1.1;font-weight:500;padding:0 48px 0 16px;border-bottom:1px solid #e5e5e5;word-wrap:break-word}.md2-dialog-header .close{position:absolute;top:21px;right:16px;display:inline-block;width:18px;height:18px;overflow:hidden;-webkit-appearance:none;padding:0;cursor:pointer;background:0 0;border:0;outline:0;opacity:.8;font-size:0;z-index:1;box-shadow:none;margin:0}.md2-dialog-header .close::after,.md2-dialog-header .close::before{content:'';position:absolute;top:50%;left:0;width:100%;height:2px;margin-top:-1px;background:#ccc;border-radius:2px}.md2-dialog-header .close::before{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.md2-dialog-header .close::after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.md2-dialog-header .close:hover{opacity:1}.md2-dialog-header .md2-dialog-title,.md2-dialog-header md2-dialog-title{display:block;margin:0;padding:16px 0;font-size:25px;font-weight:500}.md2-dialog-header dialog-header{line-height:33px}.md2-dialog-body{position:relative;max-height:65vh;padding:16px;overflow-y:auto}.md2-dialog-footer,md2-dialog-footer{display:block;padding:16px;text-align:right;border-top:1px solid rgba(0,0,0,.12)}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.6)}"]
                }] }
    ];
    /** @nocollapse */
    Md2Dialog.ctorParameters = function () { return [
        { type: Overlay },
        { type: Md2Dialog, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    Md2Dialog.propDecorators = {
        onOpen: [{ type: Output }],
        onClose: [{ type: Output }],
        _portal: [{ type: ViewChild, args: [Md2DialogPortal,] }],
        dialogTitle: [{ type: Input, args: ['title',] }]
    };
    return Md2Dialog;
}());
/**
 * Applies default options to the dialog config.
 * @param {?} dialogConfig Config to be modified.
 * @return {?} The new configuration object.
 */
function _applyConfigDefaults(dialogConfig) {
    return extendObject(new Md2DialogConfig(), dialogConfig);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2DialogModule = /** @class */ (function () {
    function Md2DialogModule() {
    }
    Md2DialogModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, OverlayModule, MdCommonModule, PlatformModule],
                    exports: [
                        Md2Dialog,
                        Md2DialogTitle,
                        Md2DialogContent,
                        Md2DialogActions,
                        Md2DialogPortal
                    ],
                    declarations: [
                        Md2Dialog,
                        Md2DialogTitle,
                        Md2DialogContent,
                        Md2DialogActions,
                        Md2DialogPortal
                    ]
                },] }
    ];
    return Md2DialogModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2MenuContent = /** @class */ (function () {
    function Md2MenuContent() {
    }
    Md2MenuContent.decorators = [
        { type: Component, args: [{
                    selector: '[md2-menu-content]',
                    host: { 'role': 'menu' },
                    template: '<ng-content></ng-content>',
                    encapsulation: ViewEncapsulation.None,
                    styles: ["[md2-menu]{position:relative;display:inline-block}[md2-menu-content]{position:absolute;top:0;left:0;display:inline-block;background:#fff;list-style:none;min-width:112px;max-width:280px;max-height:calc(100vh + 48px);padding:8px 0;margin:0;z-index:1001;border-radius:2px;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:left top;transform-origin:left top;transition:.2s linear;box-shadow:0 2px 6px 1px rgba(0,0,0,.34)}[md2-menu-item] [md2-menu-content]{left:100%;margin:-8px 0}[md2-menu-content][x-position=before]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top}[md2-menu-item] [md2-menu-content][x-position=before]{right:100%}[md2-menu-content][y-position=above]{top:auto;bottom:0;-webkit-transform-origin:left bottom;transform-origin:left bottom}[md2-menu-content][y-position=above][x-position=before]{-webkit-transform-origin:right bottom;transform-origin:right bottom}.open>[md2-menu-content]{-webkit-transform:scale(1);transform:scale(1)}[md2-menu-item]{position:relative;width:100%;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0;border:none;white-space:nowrap;text-overflow:ellipsis;display:flex;flex-direction:row;align-items:center;height:36px;padding:0 16px;font-size:16px;text-align:start;text-decoration:none;background:0 0;color:rgba(0,0,0,.87);box-sizing:border-box}[md2-menu-item][disabled]{color:rgba(0,0,0,.38)}[md2-menu-item].open,[md2-menu-item]:focus:not([disabled]),[md2-menu-item]:hover:not([disabled]){background:rgba(0,0,0,.04);text-decoration:none}[md2-menu-item]>[md2-menu-trigger]{display:block;height:36px;width:calc(100% + 32px);margin:0 -16px;padding:0 16px;font:inherit;color:inherit;text-align:left;background:0 0;outline:0;border:0;cursor:pointer;box-shadow:none}.md-overlay-container{position:fixed;pointer-events:none;top:0;left:0;height:100%;width:100%;z-index:1000}.md-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.md-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.md-overlay-transparent-backdrop{background:0 0}.md-overlay-backdrop.md-overlay-backdrop-showing{opacity:.48}"]
                }] }
    ];
    return Md2MenuContent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2MenuItem = /** @class */ (function () {
    function Md2MenuItem() {
    }
    Md2MenuItem.decorators = [
        { type: Component, args: [{
                    selector: '[md2-menu-item]',
                    host: {
                        'role': 'menuitem'
                    },
                    template: '<ng-content></ng-content>'
                }] }
    ];
    return Md2MenuItem;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2MenuTrigger = /** @class */ (function () {
    function Md2MenuTrigger(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
    }
    /**
     * @return {?}
     */
    Md2MenuTrigger.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._handleClick = this._renderer.listenGlobal('document', 'click', function (event) {
            if (!_this._hasChildMenu(event)) {
                _this._closeMenu();
            }
        });
    };
    /**
     * @return {?}
     */
    Md2MenuTrigger.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._handleClick = null;
    };
    /**
     * @return {?}
     */
    Md2MenuTrigger.prototype._toggleMenu = /**
     * @return {?}
     */
    function () {
        if (this._hasClass(this._getParentElement(), 'open')) {
            this._closeMenu();
        }
        else {
            this._openMenu();
        }
    };
    /**
     * @return {?}
     */
    Md2MenuTrigger.prototype._openMenu = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._getParentElement().classList.add('open');
        /** @type {?} */
        var siblingElements = this._getSiblingElements(this._getParentElement());
        siblingElements.forEach(function (el) {
            el.classList.remove('open');
            _this._closeChildrenMenu(el);
        });
    };
    /**
     * @return {?}
     */
    Md2MenuTrigger.prototype._closeMenu = /**
     * @return {?}
     */
    function () {
        this._getParentElement().classList.remove('open');
        this._closeChildrenMenu(this._getParentElement());
    };
    /**
     * @param {?} element
     * @return {?}
     */
    Md2MenuTrigger.prototype._closeChildrenMenu = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        [].forEach.call(element.querySelectorAll('.open'), function (el) {
            el.classList.remove('open');
        });
    };
    /**
     * @return {?}
     */
    Md2MenuTrigger.prototype._getHostElement = /**
     * @return {?}
     */
    function () {
        return this._element.nativeElement;
    };
    /**
     * @return {?}
     */
    Md2MenuTrigger.prototype._getParentElement = /**
     * @return {?}
     */
    function () {
        return this._element.nativeElement.parentNode;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    Md2MenuTrigger.prototype._getSiblingElements = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var siblingElements = [];
        /** @type {?} */
        var el = element.parentNode.firstChild;
        for (; el; el = el.nextSibling) {
            if (el.nodeType == 1 && el !== element) {
                siblingElements.push(el);
            }
        }
        return siblingElements;
    };
    /**
     * @param {?} element
     * @param {?} target
     * @return {?}
     */
    Md2MenuTrigger.prototype._getClosestElement = /**
     * @param {?} element
     * @param {?} target
     * @return {?}
     */
    function (element, target) {
        if (element.hasAttribute(target)) {
            return element;
        }
        /** @type {?} */
        var parentEl;
        while (element) {
            parentEl = element.parentElement;
            if (parentEl && parentEl.hasAttribute(target)) {
                return parentEl;
            }
            element = parentEl;
        }
        return null;
    };
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    Md2MenuTrigger.prototype._hasClass = /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    function (element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Md2MenuTrigger.prototype._hasChildMenu = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var el = this._getClosestElement(event.target, 'md2-menu-trigger');
        if (el && el === this._getHostElement()) {
            return true;
        }
        else if (this._getParentElement().contains(event.target)) {
            el = this._getClosestElement(event.target, 'md2-menu-item');
            if (el && el.querySelectorAll('[md2-menu-content]').length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    Md2MenuTrigger.decorators = [
        { type: Directive, args: [{
                    selector: '[md2-menu-trigger]',
                    host: {
                        'aria-haspopup': 'true',
                        '(click)': '_toggleMenu()',
                    },
                    exportAs: 'md2MenuTrigger'
                },] }
    ];
    /** @nocollapse */
    Md2MenuTrigger.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer }
    ]; };
    return Md2MenuTrigger;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2Menu = /** @class */ (function () {
    function Md2Menu() {
    }
    Md2Menu.decorators = [
        { type: Component, args: [{
                    selector: '[md2-menu]',
                    template: '<ng-content></ng-content>',
                    encapsulation: ViewEncapsulation.None,
                    styles: ["[md2-menu]{position:relative;display:inline-block}[md2-menu-content]{position:absolute;top:0;left:0;display:inline-block;background:#fff;list-style:none;min-width:112px;max-width:280px;max-height:calc(100vh + 48px);padding:8px 0;margin:0;z-index:1001;border-radius:2px;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:left top;transform-origin:left top;transition:.2s linear;box-shadow:0 2px 6px 1px rgba(0,0,0,.34)}[md2-menu-item] [md2-menu-content]{left:100%;margin:-8px 0}[md2-menu-content][x-position=before]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top}[md2-menu-item] [md2-menu-content][x-position=before]{right:100%}[md2-menu-content][y-position=above]{top:auto;bottom:0;-webkit-transform-origin:left bottom;transform-origin:left bottom}[md2-menu-content][y-position=above][x-position=before]{-webkit-transform-origin:right bottom;transform-origin:right bottom}.open>[md2-menu-content]{-webkit-transform:scale(1);transform:scale(1)}[md2-menu-item]{position:relative;width:100%;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0;border:none;white-space:nowrap;text-overflow:ellipsis;display:flex;flex-direction:row;align-items:center;height:36px;padding:0 16px;font-size:16px;text-align:start;text-decoration:none;background:0 0;color:rgba(0,0,0,.87);box-sizing:border-box}[md2-menu-item][disabled]{color:rgba(0,0,0,.38)}[md2-menu-item].open,[md2-menu-item]:focus:not([disabled]),[md2-menu-item]:hover:not([disabled]){background:rgba(0,0,0,.04);text-decoration:none}[md2-menu-item]>[md2-menu-trigger]{display:block;height:36px;width:calc(100% + 32px);margin:0 -16px;padding:0 16px;font:inherit;color:inherit;text-align:left;background:0 0;outline:0;border:0;cursor:pointer;box-shadow:none}.md-overlay-container{position:fixed;pointer-events:none;top:0;left:0;height:100%;width:100%;z-index:1000}.md-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.md-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.md-overlay-transparent-backdrop{background:0 0}.md-overlay-backdrop.md-overlay-backdrop-showing{opacity:.48}"]
                }] }
    ];
    return Md2Menu;
}());
var Md2MenuModule = /** @class */ (function () {
    function Md2MenuModule() {
    }
    Md2MenuModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [Md2Menu, Md2MenuContent, Md2MenuItem, Md2MenuTrigger],
                    declarations: [Md2Menu, Md2MenuContent, Md2MenuItem, Md2MenuTrigger],
                },] }
    ];
    return Md2MenuModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Change event object that is emitted when the tab has changed.
 */
var  /**
 * Change event object that is emitted when the tab has changed.
 */
Md2TabChange = /** @class */ (function () {
    function Md2TabChange(tab, index) {
        this.tab = tab;
        this.index = index;
    }
    return Md2TabChange;
}());
var Md2Transclude = /** @class */ (function () {
    function Md2Transclude(viewRef) {
        this.viewRef = viewRef;
    }
    Object.defineProperty(Md2Transclude.prototype, "md2Transclude", {
        get: /**
         * @return {?}
         */
        function () { return this._md2Transclude; },
        set: /**
         * @param {?} templateRef
         * @return {?}
         */
        function (templateRef) {
            this._md2Transclude = templateRef;
            if (templateRef) {
                this.viewRef.createEmbeddedView(templateRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    Md2Transclude.decorators = [
        { type: Directive, args: [{ selector: '[md2Transclude]' },] }
    ];
    /** @nocollapse */
    Md2Transclude.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    Md2Transclude.propDecorators = {
        md2Transclude: [{ type: Input }]
    };
    return Md2Transclude;
}());
var Md2Tab = /** @class */ (function () {
    function Md2Tab() {
    }
    Md2Tab.decorators = [
        { type: Component, args: [{
                    selector: 'md2-tab',
                    template: "<ng-content></ng-content>",
                    host: {
                        '[class]': 'class',
                        '[class.active]': 'active'
                    }
                }] }
    ];
    Md2Tab.propDecorators = {
        label: [{ type: Input }],
        active: [{ type: Input }],
        disabled: [{ type: Input }],
        class: [{ type: Input }]
    };
    return Md2Tab;
}());
var Md2TabLabel = /** @class */ (function () {
    function Md2TabLabel(templateRef, tab) {
        this.templateRef = templateRef;
        tab.labelRef = templateRef;
    }
    Md2TabLabel.decorators = [
        { type: Directive, args: [{ selector: '[md2-tab-label]' },] }
    ];
    /** @nocollapse */
    Md2TabLabel.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: Md2Tab }
    ]; };
    return Md2TabLabel;
}());
var Md2Tabs = /** @class */ (function () {
    function Md2Tabs(elementRef) {
        this.elementRef = elementRef;
        this._isInitialized = false;
        this._focusIndex = 0;
        this._selectedIndex = 0;
        this._shouldPaginate = false;
        this._offsetLeft = 0;
        this._inkBarLeft = '0';
        this._inkBarWidth = '0';
        this.change = new EventEmitter();
        this.selectedIndexChange = new EventEmitter();
    }
    Object.defineProperty(Md2Tabs.prototype, "selectedIndex", {
        get: /**
         * @return {?}
         */
        function () { return this._selectedIndex; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'string') {
                value = parseInt(value);
            }
            if (value !== this._selectedIndex) {
                this._selectedIndex = value;
                this.adjustOffset(value);
                this._updateInkBar();
                if (this.tabs) {
                    /** @type {?} */
                    var tabs = this.tabs.toArray();
                    if (!tabs[value].disabled) {
                        tabs.forEach(function (tab) { return tab.active = false; });
                        tabs[value].active = true;
                    }
                }
                if (this._isInitialized) {
                    this._emitChangeEvent();
                    this.selectedIndexChange.emit(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tabs.prototype, "focusIndex", {
        get: /**
         * @return {?}
         */
        function () { return this._focusIndex; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._focusIndex = value;
            this.adjustOffset(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tabs.prototype, "element", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var elements = {
                root: this.elementRef.nativeElement,
                wrapper: null,
                canvas: null,
                paging: null,
                tabs: null
            };
            elements.wrapper = elements.root.querySelector('.md2-tabs-header-wrapper');
            elements.canvas = elements.wrapper.querySelector('.md2-tabs-canvas');
            elements.paging = elements.canvas.querySelector('.md2-tabs-header');
            elements.tabs = elements.paging.querySelectorAll('.md2-tab-label');
            return elements;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After Content Init
     */
    /**
     * After Content Init
     * @return {?}
     */
    Md2Tabs.prototype.ngAfterContentInit = /**
     * After Content Init
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this.updatePagination();
        }, 0);
        setTimeout(function () {
            /** @type {?} */
            var tabs = _this.tabs.toArray();
            if (_this.selectedIndex) {
                if (_this.selectedIndex >= tabs.length) {
                    _this.selectedIndex = 0;
                }
                tabs.forEach(function (tab) { return tab.active = false; });
                tabs[_this.selectedIndex].active = true;
                _this.adjustOffset(_this.selectedIndex);
            }
            else {
                /** @type {?} */
                var index = tabs.findIndex(function (t) { return t.active; });
                if (index < 0) {
                    tabs[0].active = true;
                }
                else {
                    _this.selectedIndex = index;
                }
            }
            _this._updateInkBar();
        }, 0);
        this._isInitialized = true;
    };
    /**
     * Calculates the styles from the selected tab for the ink-bar.
     * @return {?}
     */
    Md2Tabs.prototype._updateInkBar = /**
     * Calculates the styles from the selected tab for the ink-bar.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var elements = this.element;
        if (!elements.tabs[this.selectedIndex]) {
            return;
        }
        /** @type {?} */
        var tab = elements.tabs[this.selectedIndex];
        this._inkBarLeft = tab.offsetLeft + 'px';
        this._inkBarWidth = tab.offsetWidth + 'px';
    };
    /** Emits an event when the user selects an option. */
    /**
     * Emits an event when the user selects an option.
     * @return {?}
     */
    Md2Tabs.prototype._emitChangeEvent = /**
     * Emits an event when the user selects an option.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var index = this._selectedIndex;
        this.change.emit(new Md2TabChange(this.tabs.toArray()[index], index));
    };
    /**
     * Focus next Tab
     */
    /**
     * Focus next Tab
     * @return {?}
     */
    Md2Tabs.prototype.focusNextTab = /**
     * Focus next Tab
     * @return {?}
     */
    function () { this.incrementIndex(1); };
    /**
     * Focus previous Tab
     */
    /**
     * Focus previous Tab
     * @return {?}
     */
    Md2Tabs.prototype.focusPreviousTab = /**
     * Focus previous Tab
     * @return {?}
     */
    function () { this.incrementIndex(-1); };
    /**
     * Mouse Wheel scroll
     * @param event
     */
    /**
     * Mouse Wheel scroll
     * @param {?} event
     * @return {?}
     */
    Md2Tabs.prototype.scroll = /**
     * Mouse Wheel scroll
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this._shouldPaginate) {
            return;
        }
        event.preventDefault();
        this._offsetLeft = this.fixOffset(this._offsetLeft - event.wheelDelta);
    };
    /**
     * Next Page
     */
    /**
     * Next Page
     * @return {?}
     */
    Md2Tabs.prototype.nextPage = /**
     * Next Page
     * @return {?}
     */
    function () {
        /** @type {?} */
        var elements = this.element;
        /** @type {?} */
        var viewportWidth = elements.canvas.clientWidth;
        /** @type {?} */
        var totalWidth = viewportWidth + this._offsetLeft;
        /** @type {?} */
        var i;
        /** @type {?} */
        var tab;
        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth > totalWidth) {
                break;
            }
        }
        this._offsetLeft = this.fixOffset(tab.offsetLeft);
    };
    /**
     * Previous Page
     */
    /**
     * Previous Page
     * @return {?}
     */
    Md2Tabs.prototype.previousPage = /**
     * Previous Page
     * @return {?}
     */
    function () {
        /** @type {?} */
        var i;
        /** @type {?} */
        var tab;
        /** @type {?} */
        var elements = this.element;
        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth >= this._offsetLeft) {
                break;
            }
        }
        this._offsetLeft = this.fixOffset(tab.offsetLeft +
            tab.offsetWidth - elements.canvas.clientWidth);
    };
    /**
     * On Window Resize
     * @param event
     */
    /**
     * On Window Resize
     * @return {?}
     */
    Md2Tabs.prototype.onWindowResize = /**
     * On Window Resize
     * @return {?}
     */
    function () {
        this._offsetLeft = this.fixOffset(this._offsetLeft);
        this.updatePagination();
    };
    /**
     * Can page Back
     */
    /**
     * Can page Back
     * @return {?}
     */
    Md2Tabs.prototype.canPageBack = /**
     * Can page Back
     * @return {?}
     */
    function () { return this._offsetLeft > 0; };
    /**
     * Can page Previous
     */
    /**
     * Can page Previous
     * @return {?}
     */
    Md2Tabs.prototype.canPageForward = /**
     * Can page Previous
     * @return {?}
     */
    function () {
        /** @type {?} */
        var elements = this.element;
        /** @type {?} */
        var lastTab = elements.tabs[elements.tabs.length - 1];
        return lastTab && lastTab.offsetLeft + lastTab.offsetWidth > elements.canvas.clientWidth +
            this._offsetLeft;
    };
    /**
     * Update Pagination
     */
    /**
     * Update Pagination
     * @return {?}
     */
    Md2Tabs.prototype.updatePagination = /**
     * Update Pagination
     * @return {?}
     */
    function () {
        /** @type {?} */
        var canvasWidth = this.element.root.clientWidth;
        /** @type {?} */
        var tabs = this.element.tabs ? this.element.tabs : [];
        for (var i = 0; i < tabs.length; i++) {
            canvasWidth -= tabs[i].offsetWidth;
        }
        this._shouldPaginate = canvasWidth < 0;
    };
    /**
     * Increment Focus Tab
     * @param inc
     */
    /**
     * Increment Focus Tab
     * @param {?} inc
     * @return {?}
     */
    Md2Tabs.prototype.incrementIndex = /**
     * Increment Focus Tab
     * @param {?} inc
     * @return {?}
     */
    function (inc) {
        /** @type {?} */
        var newIndex;
        /** @type {?} */
        var index = this.focusIndex;
        for (newIndex = index + inc; this.tabs.toArray()[newIndex] && this.tabs.toArray()[newIndex].disabled; newIndex += inc) { }
        if (this.tabs.toArray()[newIndex]) {
            this.focusIndex = newIndex;
        }
    };
    /**
     * Adjust Offset of Tab
     * @param index
     */
    /**
     * Adjust Offset of Tab
     * @param {?} index
     * @return {?}
     */
    Md2Tabs.prototype.adjustOffset = /**
     * Adjust Offset of Tab
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var elements = this.element;
        if (!elements.tabs[index]) {
            return;
        }
        /** @type {?} */
        var tab = elements.tabs[index];
        /** @type {?} */
        var left = tab.offsetLeft;
        /** @type {?} */
        var right = tab.offsetWidth + left;
        this._offsetLeft = Math.max(this._offsetLeft, this.fixOffset(right - elements.canvas.clientWidth + 32 * 2));
        this._offsetLeft = Math.min(this._offsetLeft, this.fixOffset(left));
    };
    /**
     * Fix Offset of Tab
     * @param value
     * @return value
     */
    /**
     * Fix Offset of Tab
     * @param {?} value
     * @return {?} value
     */
    Md2Tabs.prototype.fixOffset = /**
     * Fix Offset of Tab
     * @param {?} value
     * @return {?} value
     */
    function (value) {
        /** @type {?} */
        var elements = this.element;
        if (!elements.tabs.length || !this._shouldPaginate) {
            return 0;
        }
        /** @type {?} */
        var lastTab = elements.tabs[elements.tabs.length - 1];
        /** @type {?} */
        var totalWidth = lastTab.offsetLeft + lastTab.offsetWidth;
        value = Math.min(totalWidth - elements.canvas.clientWidth, value);
        value = Math.max(0, value);
        return value;
    };
    Md2Tabs.decorators = [
        { type: Component, args: [{
                    selector: 'md2-tabs',
                    template: "<div class=\"md2-tabs-header-wrapper\">\n  <div role=\"button\" class=\"md2-prev-button\" [class.disabled]=\"!canPageBack()\" *ngIf=\"_shouldPaginate\" (click)=\"previousPage()\">\n    <em class=\"prev-icon\">Prev</em>\n  </div>\n  <div role=\"button\" class=\"md2-next-button\" [class.disabled]=\"!canPageForward()\" *ngIf=\"_shouldPaginate\" (click)=\"nextPage()\">\n    <em class=\"next-icon\">Next</em>\n  </div>\n  <div class=\"md2-tabs-canvas\" [class.md2-paginated]=\"_shouldPaginate\" role=\"tablist\" tabindex=\"0\" (keydown.arrowRight)=\"focusNextTab()\" (keydown.arrowLeft)=\"focusPreviousTab()\" (keydown.enter)=\"selectedIndex = focusIndex\" (mousewheel)=\"scroll($event)\">\n    <div class=\"md2-tabs-header\" [style.marginLeft.px]=\"-_offsetLeft\">\n      <div class=\"md2-tab-label\" role=\"tab\" *ngFor=\"let tab of tabs; let i = index\" [class.focus]=\"focusIndex === i\" [class.active]=\"selectedIndex === i\" [class.disabled]=\"tab.disabled\" (click)=\"focusIndex = selectedIndex = i\">\n        <span [md2Transclude]=\"tab.labelRef\">{{tab.label}}</span>\n      </div>\n      <div class=\"md2-tab-ink-bar\" [style.left]=\"_inkBarLeft\" [style.width]=\"_inkBarWidth\"></div>\n    </div>\n  </div>\n</div>\n<div class=\"md2-tabs-body-wrapper\">\n  <ng-content></ng-content>\n</div>\n",
                    host: {
                        '[class]': 'class',
                        '(window:resize)': 'onWindowResize()'
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: ["md2-tabs{position:relative;overflow:hidden;display:block;margin:0;border:1px solid #e1e1e1;border-radius:2px}.md2-tabs-header-wrapper{position:relative;display:block;height:48px;background:#fff;border-width:0 0 1px;border-style:solid;border-color:rgba(0,0,0,.12);margin:0;padding:0;list-style:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.md2-tabs-header-wrapper::after{content:'';display:table;clear:both}.md2-next-button,.md2-prev-button{position:absolute;top:0;height:100%;width:32px;padding:8px 0;z-index:2;cursor:pointer}.md2-next-button.disabled,.md2-prev-button.disabled{opacity:.25;cursor:default}.md2-prev-button{left:0}.md2-next-button{right:0}.md2-next-button .next-icon,.md2-prev-button .prev-icon{display:block;width:12px;height:12px;font-size:0;border-width:0 0 2px 2px;border-style:solid;border-color:#757575;border-radius:1px;-webkit-transform:rotate(45deg);transform:rotate(45deg);margin:10px}.md2-next-button .next-icon{border-width:2px 2px 0 0}.md2-tabs-canvas{position:relative;height:100%;overflow:hidden;display:block;outline:0}.md2-tabs-canvas.md2-paginated{margin:0 32px}.md2-tabs-header{position:relative;display:inline-block;height:100%;white-space:nowrap;transition:.5s cubic-bezier(.35,0,.25,1)}.md2-tab-label{position:relative;height:100%;color:rgba(0,0,0,.54);font-size:14px;text-align:center;line-height:24px;padding:12px 24px;transition:background-color 350ms cubic-bezier(.35,0,.25,1);cursor:pointer;white-space:nowrap;text-transform:uppercase;display:inline-block;font-weight:500;box-sizing:border-box;overflow:hidden;-ms-text-overflow:ellipsis;text-overflow:ellipsis}.md2-tab-label.active{color:#106cc8}.md2-tabs-canvas:focus .md2-tab-label.focus{background:rgba(0,0,0,.05)}.md2-tab-label.disabled{color:rgba(0,0,0,.26);pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none;opacity:.5;cursor:default}.md2-tab-ink-bar{position:absolute;bottom:0;height:2px;background:#ff5252;transition:250ms cubic-bezier(.35,0,.25,1)}.md2-tabs-body-wrapper{position:relative;min-height:0;display:block;clear:both}md2-tab{padding:16px;display:none;position:relative}md2-tab.active{display:block;position:relative}"]
                }] }
    ];
    /** @nocollapse */
    Md2Tabs.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    Md2Tabs.propDecorators = {
        tabs: [{ type: ContentChildren, args: [Md2Tab,] }],
        class: [{ type: Input }],
        selectedIndex: [{ type: Input }],
        change: [{ type: Output }],
        selectedIndexChange: [{ type: Output }]
    };
    return Md2Tabs;
}());
/** @type {?} */
var MD2_TABS_DIRECTIVES = [Md2TabLabel, Md2Tabs, Md2Tab];
var Md2TabsModule = /** @class */ (function () {
    function Md2TabsModule() {
    }
    Md2TabsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: MD2_TABS_DIRECTIVES,
                    declarations: [Md2Transclude, Md2TabLabel, Md2Tabs, Md2Tab],
                },] }
    ];
    return Md2TabsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var noop = function () { };
/** @type {?} */
var nextId$4 = 0;
var Tag = /** @class */ (function () {
    function Tag(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
    return Tag;
}());
/** @type {?} */
var MD2_TAGS_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Md2Tags; }),
    multi: true
};
var Md2Tags = /** @class */ (function () {
    function Md2Tags(_element) {
        this._element = _element;
        this.change = new EventEmitter();
        this._value = '';
        this._disabled = false;
        this._isInitialized = false;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this._tags = [];
        this._list = [];
        this._items = [];
        this._focusedTag = 0;
        this._selectedTag = -1;
        this._inputValue = '';
        this._inputFocused = false;
        this.noBlur = true;
        this.id = 'md2-tags-' + (++nextId$4);
        this.tabindex = 0;
        this.placeholder = '';
        this.textKey = 'text';
        this.valueKey = null;
        this.selectAndFocusTagSafe = function (index) {
            if (!this._items.length) {
                this._selectTag(-1);
                this._handleFocus();
                return;
            }
            if (index === this._items.length) {
                return this._handleFocus();
            }
            index = Math.max(index, 0);
            index = Math.min(index, this._items.length - 1);
            this._selectTag(index);
        };
    }
    /**
     * @return {?}
     */
    Md2Tags.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () { this._isInitialized = true; };
    Object.defineProperty(Md2Tags.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tags.prototype, "tags", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._tags = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tags.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () { return this._value; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.setValue(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * setup value
     * @param {?} value
     * @return {?}
     */
    Md2Tags.prototype.setValue = /**
     * setup value
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (value !== this._value) {
            this._value = value;
            this._items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                var _loop_1 = function (i) {
                    /** @type {?} */
                    var selItm = this_1._tags.find(function (t) { return _this.equals(_this.valueKey ?
                        t[_this.valueKey] : t, value[i]); });
                    if (selItm) {
                        this_1._items.push(new Tag(selItm, this_1.textKey, this_1.valueKey));
                    }
                };
                var this_1 = this;
                for (var i = 0; i < value.length; i++) {
                    _loop_1(i);
                }
            }
            if (this._isInitialized) {
                this._onChangeCallback(value);
                this.change.emit(this._value);
            }
        }
    };
    /**
     * Compare two vars or objects
     * @param {?} o1 compare first object
     * @param {?} o2 compare second object
     * @return {?} boolean comparation result
     */
    Md2Tags.prototype.equals = /**
     * Compare two vars or objects
     * @param {?} o1 compare first object
     * @param {?} o2 compare second object
     * @return {?} boolean comparation result
     */
    function (o1, o2) {
        if (o1 === o2) {
            return true;
        }
        if (o1 === null || o2 === null) {
            return false;
        }
        if (o1 !== o1 && o2 !== o2) {
            return true;
        }
        /** @type {?} */
        var t1 = typeof o1;
        /** @type {?} */
        var t2 = typeof o2;
        /** @type {?} */
        var key;
        /** @type {?} */
        var keySet;
        if (t1 === t2 && t1 === 'object') {
            keySet = Object.create(null);
            for (key in o1) {
                if (!this.equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && key.charAt(0) !== '$' && o2[key]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    Object.defineProperty(Md2Tags.prototype, "isMenuVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return ((this._inputFocused || this.noBlur) && this._inputValue &&
                this._list && this._list.length) ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * update scroll of tags suggestion menu
     * @return {?}
     */
    Md2Tags.prototype.updateScroll = /**
     * update scroll of tags suggestion menu
     * @return {?}
     */
    function () {
        if (this._focusedTag < 0) {
            return;
        }
        /** @type {?} */
        var menuContainer = this._element.nativeElement.querySelector('.md2-tags-menu');
        if (!menuContainer) {
            return;
        }
        /** @type {?} */
        var choices = menuContainer.querySelectorAll('.md2-option');
        if (choices.length < 1) {
            return;
        }
        /** @type {?} */
        var highlighted = choices[this._focusedTag];
        if (!highlighted) {
            return;
        }
        /** @type {?} */
        var top = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
        /** @type {?} */
        var height = menuContainer.offsetHeight;
        if (top > height) {
            menuContainer.scrollTop += top - height;
        }
        else if (top < highlighted.clientHeight) {
            menuContainer.scrollTop -= highlighted.clientHeight - top;
        }
    };
    /**
     * input key listener
     * @param event
     */
    /**
     * input key listener
     * @param {?} event
     * @return {?}
     */
    Md2Tags.prototype._handleInputKeydown = /**
     * input key listener
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // Backspace
        if (event.keyCode === 8 && !this._inputValue) {
            event.preventDefault();
            event.stopPropagation();
            if (this._items.length && this._selectedTag < 0) {
                this.selectAndFocusTagSafe(this._items.length - 1);
            }
            if (this._items.length && this._selectedTag > -1) {
                this.removeAndSelectAdjacentTag(this._selectedTag);
            }
            return;
        }
        // Del Key
        if (event.keyCode === 46 && !this._inputValue) {
            return;
        }
        // Left / Right Arrow
        if ((event.keyCode === 37 || event.keyCode === 39) && !this._inputValue) {
            return;
        }
        // Down Arrow
        if (event.keyCode === 40) {
            if (!this.isMenuVisible) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            this._focusedTag = (this._focusedTag === this._list.length - 1) ?
                0 : Math.min(this._focusedTag + 1, this._list.length - 1);
            this.updateScroll();
            return;
        }
        // Up Arrow
        if (event.keyCode === 38) {
            if (!this.isMenuVisible) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            this._focusedTag = (this._focusedTag === 0) ?
                this._list.length - 1 : Math.max(0, this._focusedTag - 1);
            this.updateScroll();
            return;
        }
        // Tab Key
        if (event.keyCode === 9) {
            return;
        }
        // Enter / Space
        if (event.keyCode === 13 || event.keyCode === 32) {
            if (!this._inputValue || !this.isMenuVisible) {
                event.preventDefault();
                return;
            }
            event.preventDefault();
            this._addTag(event, this._focusedTag);
            return;
        }
        // Escape Key
        if (event.keyCode === 27) {
            event.stopPropagation();
            event.preventDefault();
            if (this._inputValue) {
                this._inputValue = '';
            }
            if (this._selectedTag >= 0) {
                this._handleFocus();
            }
            return;
        }
        // reset selected tag
        if (this._selectedTag >= 0) {
            this.resetselectedTag();
        }
        // filter
        setTimeout(function () {
            _this.filterMatches();
        }, 10);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Md2Tags.prototype._handleKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled || this._inputValue) {
            return;
        }
        switch (event.keyCode) {
            case BACKSPACE:
            case DELETE:
                if (this._selectedTag < 0) {
                    return;
                }
                event.preventDefault();
                this.removeAndSelectAdjacentTag(this._selectedTag);
                break;
            case TAB:
            case ESCAPE:
                if (this._selectedTag < 0) {
                    return;
                }
                event.preventDefault();
                this._handleFocus();
                break;
            case LEFT_ARROW:
                event.preventDefault();
                if (this._selectedTag < 0) {
                    this._selectedTag = this._items.length;
                }
                if (this._items.length) {
                    this.selectAndFocusTagSafe(this._selectedTag - 1);
                }
                break;
            case RIGHT_ARROW:
                event.preventDefault();
                if (this._selectedTag >= this._items.length) {
                    this._selectedTag = -1;
                }
                this.selectAndFocusTagSafe(this._selectedTag + 1);
                break;
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Md2Tags.prototype.removeAndSelectAdjacentTag = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var selIndex = this.getAdjacentTagIndex(index);
        this.removeTag(index);
        this.selectAndFocusTagSafe(selIndex);
    };
    /**
     * @return {?}
     */
    Md2Tags.prototype.resetselectedTag = /**
     * @return {?}
     */
    function () {
        this._selectedTag = -1;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Md2Tags.prototype.getAdjacentTagIndex = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var len = this._items.length - 1;
        return (len === 0) ? -1 :
            (index === len) ? index - 1 : index;
    };
    /**
     * add tag
     * @param event
     * @param index index of the specific tag
     */
    /**
     * add tag
     * @param {?} event
     * @param {?} index index of the specific tag
     * @return {?}
     */
    Md2Tags.prototype._addTag = /**
     * add tag
     * @param {?} event
     * @param {?} index index of the specific tag
     * @return {?}
     */
    function (event, index) {
        event.preventDefault();
        event.stopPropagation();
        this._items.push(this._list[index]);
        this._inputValue = '';
        this.updateValue();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Md2Tags.prototype._removeTagAndFocusInput = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.removeTag(index);
        this._handleFocus();
    };
    /**
     * remove tag
     * @param {?} index
     * @return {?}
     */
    Md2Tags.prototype.removeTag = /**
     * remove tag
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this._items.splice(index, 1);
        this.updateValue();
    };
    /**
     * update value
     * @return {?}
     */
    Md2Tags.prototype.updateValue = /**
     * update value
     * @return {?}
     */
    function () {
        this._value = new Array();
        for (var i = 0; i < this._items.length; i++) {
            this._value.push(this._items[i].value);
        }
        this._onChangeCallback(this._value);
        this.change.emit(this._value);
    };
    /**
     * select tag
     * @param index of select tag
     */
    /**
     * select tag
     * @param {?} index of select tag
     * @return {?}
     */
    Md2Tags.prototype._selectTag = /**
     * select tag
     * @param {?} index of select tag
     * @return {?}
     */
    function (index) {
        if (index >= -1 && index <= this._items.length) {
            this._selectedTag = index;
        }
    };
    /**
     * @return {?}
     */
    Md2Tags.prototype._handleFocus = /**
     * @return {?}
     */
    function () {
        this._element.nativeElement.querySelector('input').focus();
        this.resetselectedTag();
    };
    /**
     * @return {?}
     */
    Md2Tags.prototype._onInputFocus = /**
     * @return {?}
     */
    function () {
        this._inputFocused = true;
        this.resetselectedTag();
    };
    /**
     * @return {?}
     */
    Md2Tags.prototype._onInputBlur = /**
     * @return {?}
     */
    function () {
        this._inputFocused = false;
    };
    /**
     * @return {?}
     */
    Md2Tags.prototype._listEnter = /**
     * @return {?}
     */
    function () { this.noBlur = true; };
    /**
     * @return {?}
     */
    Md2Tags.prototype._listLeave = /**
     * @return {?}
     */
    function () { this.noBlur = false; };
    /**
     * update suggestion menu with filter
     * @return {?}
     */
    Md2Tags.prototype.filterMatches = /**
     * update suggestion menu with filter
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var tempList = this._tags.map(function (tag) { return new Tag(tag, _this.textKey, _this.valueKey); });
        this._list = tempList.filter(function (t) {
            return (new RegExp(_this._inputValue, 'ig').test(t.text) &&
                !_this._items.find(function (i) { return t.text === i.text; }));
        });
        if (this._list.length > 0) {
            this._focusedTag = 0;
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Md2Tags.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (value !== this._value) {
            this._value = value;
            this._items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                var _loop_2 = function (i) {
                    /** @type {?} */
                    var selItm = this_2._tags.find(function (t) { return _this.equals(_this.valueKey ?
                        t[_this.valueKey] : t, value[i]); });
                    if (selItm) {
                        this_2._items.push(new Tag(selItm, this_2.textKey, this_2.valueKey));
                    }
                };
                var this_2 = this;
                for (var i = 0; i < value.length; i++) {
                    _loop_2(i);
                }
            }
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    Md2Tags.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChangeCallback = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    Md2Tags.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onTouchedCallback = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    Md2Tags.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    Md2Tags.decorators = [
        { type: Component, args: [{
                    selector: 'md2-tags',
                    template: "<div class=\"md2-tags-container\">\n  <span *ngFor=\"let t of _items; let i = index;\" class=\"md2-tag\" [class.active]=\"_selectedTag === i\" (click)=\"_selectTag(i)\">\n    <span class=\"md2-tag-text\">{{t.text}}</span>\n    <svg (click)=\"_removeTagAndFocusInput(i)\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n      <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n    </svg>\n  </span>\n  <div class=\"md2-tag-add\">\n    <input [(ngModel)]=\"_inputValue\" type=\"text\" tabs=\"false\" autocomplete=\"off\" tabindex=\"-1\" [disabled]=\"disabled\" class=\"md2-tags-input\" [placeholder]=\"placeholder\" (focus)=\"_onInputFocus()\" (blur)=\"_onInputBlur()\" (keydown)=\"_handleInputKeydown($event)\" (change)=\"$event.stopPropagation()\" />\n    <ul *ngIf=\"isMenuVisible\" class=\"md2-tags-menu\" (mouseenter)=\"_listEnter()\" (mouseleave)=\"_listLeave()\">\n      <li class=\"md2-tag-option\" *ngFor=\"let l of _list; let i = index;\" [class.focused]=\"_focusedTag === i\" (click)=\"_addTag($event, i)\">\n        <span class=\"md2-tag-option-text\" [innerHtml]=\"l.text | highlight:_inputValue\"></span>\n      </li>\n    </ul>\n  </div>\n</div>\n",
                    host: {
                        'role': 'tags',
                        '[id]': 'id',
                        '[class.focus]': '_inputFocused || _selectedTag >= 0',
                        '[class.md2-tags-disabled]': 'disabled',
                        '[tabindex]': 'disabled ? -1 : tabindex',
                        '[attr.aria-disabled]': 'disabled'
                    },
                    providers: [MD2_TAGS_CONTROL_VALUE_ACCESSOR],
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'md2Tags',
                    styles: [":host{outline:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-backface-visibility:hidden;backface-visibility:hidden}.md2-tags-container{position:relative;display:block;max-width:100%;padding:2px 2px 4px;border-bottom:1px solid rgba(0,0,0,.12);box-sizing:content-box;min-width:64px;min-height:26px;cursor:text}.md2-tags-container::after,.md2-tags-container::before{display:table;content:' '}.md2-tags-container::after{clear:both}.focus .md2-tags-container{padding-bottom:3px;border-bottom:2px solid #106cc8}.md2-tags-disabled .md2-tags-container{color:rgba(0,0,0,.38);cursor:default}.md2-tags-disabled.focus .md2-tags-container{padding-bottom:4px;border-bottom:1px solid rgba(0,0,0,.38)}.md2-tag{position:relative;cursor:default;border-radius:16px;display:block;height:32px;line-height:32px;margin:4px 4px 0 0;padding:0 26px 0 12px;float:left;box-sizing:border-box;max-width:100%;background:#e0e0e0;color:#424242;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.md2-tag.active{background:#106cc8;color:rgba(255,255,255,.87)}.md2-tag.active svg{color:rgba(255,255,255,.87)}.md2-tag svg{position:absolute;top:4px;right:2px;cursor:pointer;display:inline-block;overflow:hidden;fill:currentColor;color:rgba(0,0,0,.54)}.md2-tag-add{position:relative;display:inline-block;margin-left:4px}input{border:0;outline:0;margin-top:6px;height:30px;line-height:30px;padding:0;color:rgba(0,0,0,.87);background:0 0}.md2-tags-placeholder{color:rgba(0,0,0,.38)}.md2-tags-menu{position:absolute;left:0;top:100%;display:block;z-index:10;flex-direction:column;width:100%;margin:6px 0 0;padding:8px 0;box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);max-height:256px;min-height:48px;overflow-y:auto;-webkit-transform:scale(1);transform:scale(1);background:#fff;-webkit-backface-visibility:hidden;backface-visibility:hidden}.md2-tags-menu .md2-tag-option{cursor:pointer;position:relative;display:block;color:#212121;align-items:center;width:auto;transition:background 150ms linear;padding:12px 16px;line-height:24px;box-sizing:border-box;word-wrap:break-word}.md2-tags-menu .md2-tag-option.focused,.md2-tags-menu .md2-tag-option:hover{background:#eee}.md2-tags-menu .md2-tag-option .md2-tag-option-text{width:auto;font-size:16px}.highlight{color:#757575}"]
                }] }
    ];
    /** @nocollapse */
    Md2Tags.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    Md2Tags.propDecorators = {
        change: [{ type: Output }],
        id: [{ type: Input }],
        tabindex: [{ type: Input }],
        placeholder: [{ type: Input }],
        textKey: [{ type: Input, args: ['md2-tag-text',] }],
        valueKey: [{ type: Input, args: ['md2-tag-value',] }],
        disabled: [{ type: Input }],
        tags: [{ type: Input, args: ['md2-tags',] }],
        value: [{ type: Input }],
        _handleKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        _handleFocus: [{ type: HostListener, args: ['focus',] }]
    };
    return Md2Tags;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2TagsModule = /** @class */ (function () {
    function Md2TagsModule() {
    }
    Md2TagsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule, Md2AutocompleteModule],
                    exports: [Md2Tags],
                    declarations: [Md2Tags],
                },] }
    ];
    return Md2TagsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Toast = /** @class */ (function () {
    function Toast(message) {
        this.message = message;
    }
    return Toast;
}());
var Md2ToastConfig = /** @class */ (function () {
    function Md2ToastConfig() {
        this.duration = 3000;
        this.viewContainerRef = null;
    }
    return Md2ToastConfig;
}());
var Md2Toast = /** @class */ (function () {
    function Md2Toast(_overlay, _config) {
        this._overlay = _overlay;
        this._config = _config;
        this.index = 0;
    }
    /**
     * toast message
     * @param toast string or object with message and other properties of toast
     */
    /**
     * toast message
     * @param {?} message
     * @param {?=} duration
     * @return {?}
     */
    Md2Toast.prototype.toast = /**
     * toast message
     * @param {?} message
     * @param {?=} duration
     * @return {?}
     */
    function (message, duration) {
        this.show(message, duration);
    };
    /**
     * show toast
     * @param toastObj string or object with message and other properties of toast
     */
    /**
     * show toast
     * @param {?} message
     * @param {?=} duration
     * @return {?}
     */
    Md2Toast.prototype.show = /**
     * show toast
     * @param {?} message
     * @param {?=} duration
     * @return {?}
     */
    function (message, duration) {
        if (!message || !message.trim()) {
            return;
        }
        if (duration) {
            this._config.duration = duration;
        }
        /** @type {?} */
        var toast;
        toast = new Toast(message);
        if (toast) {
            if (!this._toastInstance) {
                this._createToast();
            }
            this._setToastMessage(toast);
        }
    };
    /**
     * Create the toast to display
     * @return {?}
     */
    Md2Toast.prototype._createToast = /**
     * Create the toast to display
     * @return {?}
     */
    function () {
        this._createOverlay();
        /** @type {?} */
        var portal = new ComponentPortal(Md2ToastComponent, this._config.viewContainerRef);
        this._toastInstance = this._overlayRef.attach(portal).instance;
    };
    /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    Md2Toast.prototype._createOverlay = /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    function () {
        if (!this._overlayRef) {
            /** @type {?} */
            var config = new OverlayState();
            config.positionStrategy = this._overlay.position()
                .global()
                .top('0').right('0');
            this._overlayRef = this._overlay.create(config);
        }
    };
    /**
     * Disposes the current toast and the overlay it is attached to
     * @return {?}
     */
    Md2Toast.prototype._disposeToast = /**
     * Disposes the current toast and the overlay it is attached to
     * @return {?}
     */
    function () {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._toastInstance = null;
    };
    /**
     * Updates the toast message and repositions the overlay according to the new message length
     * @param {?} toast
     * @return {?}
     */
    Md2Toast.prototype._setToastMessage = /**
     * Updates the toast message and repositions the overlay according to the new message length
     * @param {?} toast
     * @return {?}
     */
    function (toast) {
        var _this = this;
        toast.id = ++this.index;
        this._toastInstance.addToast(toast);
        setTimeout(function () {
            _this.clearToast(toast.id);
        }, this._config.duration);
    };
    /**
     * clear specific toast
     * @param {?} toastId
     * @return {?}
     */
    Md2Toast.prototype.clearToast = /**
     * clear specific toast
     * @param {?} toastId
     * @return {?}
     */
    function (toastId) {
        var _this = this;
        if (this._toastInstance) {
            this._toastInstance.removeToast(toastId);
            setTimeout(function () {
                if (!_this._toastInstance.hasToast()) {
                    _this._disposeToast();
                }
            }, 250);
        }
    };
    /**
     * clear all toasts
     */
    /**
     * clear all toasts
     * @return {?}
     */
    Md2Toast.prototype.clearAllToasts = /**
     * clear all toasts
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._toastInstance) {
            this._toastInstance.removeAllToasts();
            setTimeout(function () {
                if (!_this._toastInstance.hasToast()) {
                    _this._disposeToast();
                }
            }, 250);
        }
    };
    Md2Toast.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Md2Toast.ctorParameters = function () { return [
        { type: Overlay },
        { type: Md2ToastConfig }
    ]; };
    return Md2Toast;
}());
var Md2ToastComponent = /** @class */ (function () {
    function Md2ToastComponent() {
        this.toasts = [];
        this.maxShown = 5;
    }
    /**
     * add toast
     * @param toast toast object with all parameters
     */
    /**
     * add toast
     * @param {?} toast toast object with all parameters
     * @return {?}
     */
    Md2ToastComponent.prototype.addToast = /**
     * add toast
     * @param {?} toast toast object with all parameters
     * @return {?}
     */
    function (toast) {
        var _this = this;
        setTimeout(function () {
            toast.isVisible = true;
        }, 1);
        this.toasts.push(toast);
        if (this.toasts.length > this.maxShown) {
            this.toasts[0].isVisible = false;
            setTimeout(function () {
                _this.toasts.splice(0, (_this.toasts.length - _this.maxShown));
            }, 250);
        }
    };
    /**
     * remove toast
     * @param toastId number of toast id
     */
    /**
     * remove toast
     * @param {?} toastId number of toast id
     * @return {?}
     */
    Md2ToastComponent.prototype.removeToast = /**
     * remove toast
     * @param {?} toastId number of toast id
     * @return {?}
     */
    function (toastId) {
        var _this = this;
        this.toasts.forEach(function (t) { if (t.id === toastId) {
            t.isVisible = false;
        } });
        setTimeout(function () {
            _this.toasts = _this.toasts.filter(function (toast) { return toast.id !== toastId; });
        }, 250);
    };
    /**
     * remove all toasts
     * @param toastId number of toast id
     */
    /**
     * remove all toasts
     * @return {?}
     */
    Md2ToastComponent.prototype.removeAllToasts = /**
     * remove all toasts
     * @return {?}
     */
    function () {
        var _this = this;
        this.toasts.forEach(function (t) { t.isVisible = false; });
        setTimeout(function () {
            _this.toasts = [];
        }, 250);
    };
    /**
     * check has any toast
     * @return boolean
     */
    /**
     * check has any toast
     * @return {?} boolean
     */
    Md2ToastComponent.prototype.hasToast = /**
     * check has any toast
     * @return {?} boolean
     */
    function () { return this.toasts.length > 0; };
    Md2ToastComponent.decorators = [
        { type: Component, args: [{
                    selector: 'md2-toast',
                    template: "<div *ngFor=\"let toast of toasts\"\n     class=\"md2-toast\"\n     [class.in]=\"toast.isVisible\"\n     (click)=\"removeToast(toast.id)\"\n     [innerHTML]=\"toast.message\">\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["md2-toast{display:block;box-sizing:border-box;cursor:default;overflow:hidden;min-width:304px;max-width:100%;padding:8px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.md2-toast{position:relative;padding:14px 24px;margin-bottom:5px;display:block;margin-top:-53px;opacity:0;background-color:#323232;color:#fafafa;box-shadow:0 2px 5px 0 rgba(0,0,0,.26);border-radius:2px;font-size:14px;overflow:hidden;word-wrap:break-word;transition:250ms linear}.md2-toast.in{margin-top:0;opacity:1}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;text-transform:none;width:1px}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}"]
                }] }
    ];
    return Md2ToastComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2ToastModule = /** @class */ (function () {
    function Md2ToastModule() {
    }
    Md2ToastModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        MdCommonModule,
                        PlatformModule
                    ],
                    exports: [Md2ToastComponent, MdCommonModule],
                    declarations: [Md2ToastComponent],
                    entryComponents: [Md2ToastComponent],
                    providers: [Md2Toast, Md2ToastConfig],
                },] }
    ];
    return Md2ToastModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Time in ms to delay before changing the tooltip visibility to hidden
  @type {?} */
var TOUCHEND_HIDE_DELAY = 1500;
/** *
 * Time in ms to throttle repositioning after scroll events.
  @type {?} */
var SCROLL_THROTTLE_MS = 20;
/**
 * Throws an error if the user supplied an invalid tooltip position.
 * @param {?} position
 * @return {?}
 */
function throwMd2TooltipInvalidPositionError(position) {
    throw new Error("Tooltip position \"" + position + "\" is invalid.");
}
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.google.com/components/tooltips.html
 */
var Md2Tooltip = /** @class */ (function () {
    function Md2Tooltip(_overlay, _elementRef, _scrollDispatcher, _viewContainerRef, _ngZone, _renderer, _platform, _dir) {
        var _this = this;
        this._overlay = _overlay;
        this._elementRef = _elementRef;
        this._scrollDispatcher = _scrollDispatcher;
        this._viewContainerRef = _viewContainerRef;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._platform = _platform;
        this._dir = _dir;
        this._position = 'below';
        this._disabled = false;
        /**
         * The default delay in ms before showing the tooltip after show is called
         */
        this.showDelay = 0;
        /**
         * The default delay in ms before hiding the tooltip after hide is called
         */
        this.hideDelay = 0;
        // The mouse events shouldn't be bound on iOS devices, because
        // they can prevent the first tap from firing its click event.
        if (!_platform.IOS) {
            _renderer.listen(_elementRef.nativeElement, 'mouseenter', function () { return _this.show(); });
            _renderer.listen(_elementRef.nativeElement, 'mouseleave', function () { return _this.hide(); });
        }
    }
    Object.defineProperty(Md2Tooltip.prototype, "position", {
        /** Allows the user to define the position of the tooltip relative to the parent element */
        get: /**
         * Allows the user to define the position of the tooltip relative to the parent element
         * @return {?}
         */
        function () { return this._position; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._position) {
                this._position = value;
                // TODO(andrewjs): When the overlay's position can be dynamically changed, do not destroy
                // the tooltip.
                if (this._tooltipInstance) {
                    this._disposeTooltip();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tooltip.prototype, "disabled", {
        /** Disables the display of the tooltip. */
        get: /**
         * Disables the display of the tooltip.
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
            // If tooltip is disabled, hide immediately.
            if (this._disabled) {
                this.hide(0);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tooltip.prototype, "message", {
        /** The message to be displayed in the tooltip */
        get: /**
         * The message to be displayed in the tooltip
         * @return {?}
         */
        function () { return this._message; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._message = value;
            if (this._tooltipInstance) {
                this._setTooltipMessage(this._message);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose the tooltip when destroyed.
     */
    /**
     * Dispose the tooltip when destroyed.
     * @return {?}
     */
    Md2Tooltip.prototype.ngOnDestroy = /**
     * Dispose the tooltip when destroyed.
     * @return {?}
     */
    function () {
        if (this._tooltipInstance) {
            this._disposeTooltip();
        }
    };
    /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input */
    /**
     * Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input
     * @param {?=} delay
     * @return {?}
     */
    Md2Tooltip.prototype.show = /**
     * Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input
     * @param {?=} delay
     * @return {?}
     */
    function (delay) {
        if (delay === void 0) { delay = this.showDelay; }
        if (this.disabled || !this._message || !this._message.trim()) {
            return;
        }
        if (!this._tooltipInstance) {
            this._createTooltip();
        }
        this._setTooltipMessage(this._message);
        this._tooltipInstance.show(this._position, delay);
    };
    /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input */
    /**
     * Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input
     * @param {?=} delay
     * @return {?}
     */
    Md2Tooltip.prototype.hide = /**
     * Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input
     * @param {?=} delay
     * @return {?}
     */
    function (delay) {
        if (delay === void 0) { delay = this.hideDelay; }
        if (this._tooltipInstance) {
            this._tooltipInstance.hide(delay);
        }
    };
    /** Shows/hides the tooltip */
    /**
     * Shows/hides the tooltip
     * @return {?}
     */
    Md2Tooltip.prototype.toggle = /**
     * Shows/hides the tooltip
     * @return {?}
     */
    function () {
        this._isTooltipVisible() ? this.hide() : this.show();
    };
    /** Returns true if the tooltip is currently visible to the user */
    /**
     * Returns true if the tooltip is currently visible to the user
     * @return {?}
     */
    Md2Tooltip.prototype._isTooltipVisible = /**
     * Returns true if the tooltip is currently visible to the user
     * @return {?}
     */
    function () {
        return !!this._tooltipInstance && this._tooltipInstance.isVisible();
    };
    /**
     * Create the tooltip to display
     * @return {?}
     */
    Md2Tooltip.prototype._createTooltip = /**
     * Create the tooltip to display
     * @return {?}
     */
    function () {
        var _this = this;
        this._createOverlay();
        /** @type {?} */
        var portal = new ComponentPortal(Md2TooltipComponent, this._viewContainerRef);
        this._tooltipInstance = this._overlayRef.attach(portal).instance;
        // Dispose the overlay when finished the shown tooltip.
        this._tooltipInstance.afterHidden().subscribe(function () {
            // Check first if the tooltip has already been removed through this components destroy.
            if (_this._tooltipInstance) {
                _this._disposeTooltip();
            }
        });
    };
    /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    Md2Tooltip.prototype._createOverlay = /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var origin = this._getOrigin();
        /** @type {?} */
        var position = this._getOverlayPosition();
        /** @type {?} */
        var strategy = this._overlay.position().connectedTo(this._elementRef, origin, position);
        strategy.withScrollableContainers(this._scrollDispatcher.getScrollContainers(this._elementRef));
        strategy.onPositionChange.subscribe(function (change) {
            if (change.scrollableViewProperties.isOverlayClipped &&
                _this._tooltipInstance && _this._tooltipInstance.isVisible()) {
                _this.hide(0);
            }
        });
        /** @type {?} */
        var config = new OverlayState();
        config.direction = this._dir ? this._dir.value : 'ltr';
        config.positionStrategy = strategy;
        config.scrollStrategy = this._overlay.scrollStrategies.reposition({
            scrollThrottle: SCROLL_THROTTLE_MS
        });
        this._overlayRef = this._overlay.create(config);
    };
    /**
     * Disposes the current tooltip and the overlay it is attached to
     * @return {?}
     */
    Md2Tooltip.prototype._disposeTooltip = /**
     * Disposes the current tooltip and the overlay it is attached to
     * @return {?}
     */
    function () {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._tooltipInstance = null;
    };
    /** Returns the origin position based on the user's position preference */
    /**
     * Returns the origin position based on the user's position preference
     * @return {?}
     */
    Md2Tooltip.prototype._getOrigin = /**
     * Returns the origin position based on the user's position preference
     * @return {?}
     */
    function () {
        if (this.position == 'above' || this.position == 'below') {
            return { originX: 'center', originY: this.position == 'above' ? 'top' : 'bottom' };
        }
        /** @type {?} */
        var isDirectionLtr = !this._dir || this._dir.value == 'ltr';
        if (this.position == 'left' ||
            this.position == 'before' && isDirectionLtr ||
            this.position == 'after' && !isDirectionLtr) {
            return { originX: 'start', originY: 'center' };
        }
        if (this.position == 'right' ||
            this.position == 'after' && isDirectionLtr ||
            this.position == 'before' && !isDirectionLtr) {
            return { originX: 'end', originY: 'center' };
        }
        throwMd2TooltipInvalidPositionError(this.position);
    };
    /** Returns the overlay position based on the user's preference */
    /**
     * Returns the overlay position based on the user's preference
     * @return {?}
     */
    Md2Tooltip.prototype._getOverlayPosition = /**
     * Returns the overlay position based on the user's preference
     * @return {?}
     */
    function () {
        if (this.position == 'above') {
            return { overlayX: 'center', overlayY: 'bottom' };
        }
        if (this.position == 'below') {
            return { overlayX: 'center', overlayY: 'top' };
        }
        /** @type {?} */
        var isLtr = !this._dir || this._dir.value == 'ltr';
        if (this.position == 'left' ||
            this.position == 'before' && isLtr ||
            this.position == 'after' && !isLtr) {
            return { overlayX: 'end', overlayY: 'center' };
        }
        if (this.position == 'right' ||
            this.position == 'after' && isLtr ||
            this.position == 'before' && !isLtr) {
            return { overlayX: 'start', overlayY: 'center' };
        }
        throwMd2TooltipInvalidPositionError(this.position);
    };
    /**
     * Updates the tooltip message and repositions the overlay according to the new message length
     * @param {?} message
     * @return {?}
     */
    Md2Tooltip.prototype._setTooltipMessage = /**
     * Updates the tooltip message and repositions the overlay according to the new message length
     * @param {?} message
     * @return {?}
     */
    function (message) {
        var _this = this;
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        this._tooltipInstance.message = message;
        this._tooltipInstance._markForCheck();
        this._ngZone.onMicrotaskEmpty.pipe(first()).subscribe(function () {
            if (_this._tooltipInstance) {
                _this._overlayRef.updatePosition();
            }
        });
    };
    Md2Tooltip.decorators = [
        { type: Directive, args: [{
                    selector: '[tooltip]',
                    host: {
                        '(longpress)': 'show()',
                        '(touchend)': 'hide(' + TOUCHEND_HIDE_DELAY + ')',
                    },
                    exportAs: 'md2Tooltip',
                },] }
    ];
    /** @nocollapse */
    Md2Tooltip.ctorParameters = function () { return [
        { type: Overlay },
        { type: ElementRef },
        { type: ScrollDispatcher },
        { type: ViewContainerRef },
        { type: NgZone },
        { type: Renderer2 },
        { type: Platform },
        { type: Dir, decorators: [{ type: Optional }] }
    ]; };
    Md2Tooltip.propDecorators = {
        position: [{ type: Input, args: ['tooltip-position',] }],
        disabled: [{ type: Input, args: ['tooltipDisabled',] }],
        showDelay: [{ type: Input, args: ['tooltip-delay',] }],
        hideDelay: [{ type: Input, args: ['tooltip-hide-delay',] }],
        message: [{ type: Input, args: ['tooltip',] }]
    };
    return Md2Tooltip;
}());
/**
 * Internal component that wraps the tooltip's content.
 * \@docs-private
 */
var Md2TooltipComponent = /** @class */ (function () {
    function Md2TooltipComponent(_dir, _changeDetectorRef) {
        this._dir = _dir;
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * Property watched by the animation framework to show or hide the tooltip
         */
        this._visibility = 'initial';
        /**
         * Whether interactions on the page should close the tooltip
         */
        this._closeOnInteraction = false;
        /**
         * The transform origin used in the animation for showing and hiding the tooltip
         */
        this._transformOrigin = 'bottom';
        /**
         * Subject for notifying that the tooltip has been hidden from the view
         */
        this._onHide = new Subject();
    }
    /**
     * Shows the tooltip with an animation originating from the provided origin
     * @param position Position of the tooltip.
     * @param delay Amount of milliseconds to the delay showing the tooltip.
     */
    /**
     * Shows the tooltip with an animation originating from the provided origin
     * @param {?} position Position of the tooltip.
     * @param {?} delay Amount of milliseconds to the delay showing the tooltip.
     * @return {?}
     */
    Md2TooltipComponent.prototype.show = /**
     * Shows the tooltip with an animation originating from the provided origin
     * @param {?} position Position of the tooltip.
     * @param {?} delay Amount of milliseconds to the delay showing the tooltip.
     * @return {?}
     */
    function (position, delay) {
        var _this = this;
        // Cancel the delayed hide if it is scheduled
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
        // Body interactions should cancel the tooltip if there is a delay in showing.
        this._closeOnInteraction = true;
        this._setTransformOrigin(position);
        this._showTimeoutId = setTimeout(function () {
            _this._visibility = 'visible';
            // If this was set to true immediately, then a body click that triggers show() would
            // trigger interaction and close the tooltip right after it was displayed.
            // If this was set to true immediately, then a body click that triggers show() would
            // trigger interaction and close the tooltip right after it was displayed.
            _this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            _this._markForCheck();
            setTimeout(function () { return _this._closeOnInteraction = true; }, 0);
        }, delay);
    };
    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param delay Amount of milliseconds to delay showing the tooltip.
     */
    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param {?} delay Amount of milliseconds to delay showing the tooltip.
     * @return {?}
     */
    Md2TooltipComponent.prototype.hide = /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param {?} delay Amount of milliseconds to delay showing the tooltip.
     * @return {?}
     */
    function (delay) {
        var _this = this;
        // Cancel the delayed show if it is scheduled
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
        }
        this._hideTimeoutId = setTimeout(function () {
            _this._visibility = 'hidden';
            _this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            _this._markForCheck();
        }, delay);
    };
    /**
     * Returns an observable that notifies when the tooltip has been hidden from view
     */
    /**
     * Returns an observable that notifies when the tooltip has been hidden from view
     * @return {?}
     */
    Md2TooltipComponent.prototype.afterHidden = /**
     * Returns an observable that notifies when the tooltip has been hidden from view
     * @return {?}
     */
    function () {
        return this._onHide.asObservable();
    };
    /**
     * Whether the tooltip is being displayed
     */
    /**
     * Whether the tooltip is being displayed
     * @return {?}
     */
    Md2TooltipComponent.prototype.isVisible = /**
     * Whether the tooltip is being displayed
     * @return {?}
     */
    function () {
        return this._visibility === 'visible';
    };
    /** Sets the tooltip transform origin according to the tooltip position */
    /**
     * Sets the tooltip transform origin according to the tooltip position
     * @param {?} value
     * @return {?}
     */
    Md2TooltipComponent.prototype._setTransformOrigin = /**
     * Sets the tooltip transform origin according to the tooltip position
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var isLtr = !this._dir || this._dir.value == 'ltr';
        switch (value) {
            case 'before':
                this._transformOrigin = isLtr ? 'right' : 'left';
                break;
            case 'after':
                this._transformOrigin = isLtr ? 'left' : 'right';
                break;
            case 'left':
                this._transformOrigin = 'right';
                break;
            case 'right':
                this._transformOrigin = 'left';
                break;
            case 'above':
                this._transformOrigin = 'bottom';
                break;
            case 'below':
                this._transformOrigin = 'top';
                break;
            default: throwMd2TooltipInvalidPositionError(value);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    Md2TooltipComponent.prototype._afterVisibilityAnimation = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (e.toState === 'hidden' && !this.isVisible()) {
            this._onHide.next();
        }
    };
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.google.com/components/tooltips.html#tooltips-interaction
     */
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.google.com/components/tooltips.html#tooltips-interaction
     * @return {?}
     */
    Md2TooltipComponent.prototype._handleBodyInteraction = /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.google.com/components/tooltips.html#tooltips-interaction
     * @return {?}
     */
    function () {
        if (this._closeOnInteraction) {
            this.hide(0);
        }
    };
    /**
     * Marks that the tooltip needs to be checked in the next change detection run.
     * Mainly used for rendering the initial text before positioning a tooltip, which
     * can be problematic in components with OnPush change detection.
     */
    /**
     * Marks that the tooltip needs to be checked in the next change detection run.
     * Mainly used for rendering the initial text before positioning a tooltip, which
     * can be problematic in components with OnPush change detection.
     * @return {?}
     */
    Md2TooltipComponent.prototype._markForCheck = /**
     * Marks that the tooltip needs to be checked in the next change detection run.
     * Mainly used for rendering the initial text before positioning a tooltip, which
     * can be problematic in components with OnPush change detection.
     * @return {?}
     */
    function () {
        this._changeDetectorRef.markForCheck();
    };
    Md2TooltipComponent.decorators = [
        { type: Component, args: [{
                    selector: 'md2-tooltip',
                    template: "<div class=\"md2-tooltip\"\n     [style.transform-origin]=\"_transformOrigin\"\n     [@state]=\"_visibility\"\n     (@state.done)=\"_afterVisibilityAnimation($event)\"\n     [innerHTML]=\"message\">\n</div>",
                    animations: [
                        trigger('state', [
                            state('void', style({ transform: 'scale(0)' })),
                            state('initial', style({ transform: 'scale(0)' })),
                            state('visible', style({ transform: 'scale(1)' })),
                            state('hidden', style({ transform: 'scale(0)' })),
                            transition('* => visible', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
                            transition('* => hidden', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
                        ])
                    ],
                    host: {
                        '[style.zoom]': '_visibility === "visible" ? 1 : null',
                        '(body:click)': 'this._handleBodyInteraction()'
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: ["md2-tooltip{pointer-events:none}.md2-tooltip{color:#fff;padding:6px 8px;border-radius:2px;font-size:10px;margin:14px;max-width:250px;background:rgba(97,97,97,.9);word-wrap:break-word}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}"]
                }] }
    ];
    /** @nocollapse */
    Md2TooltipComponent.ctorParameters = function () { return [
        { type: Dir, decorators: [{ type: Optional }] },
        { type: ChangeDetectorRef }
    ]; };
    return Md2TooltipComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Md2TooltipModule = /** @class */ (function () {
    function Md2TooltipModule() {
    }
    Md2TooltipModule.decorators = [
        { type: NgModule, args: [{
                    imports: [OverlayModule, MdCommonModule, PlatformModule],
                    exports: [Md2Tooltip, Md2TooltipComponent, MdCommonModule],
                    declarations: [Md2Tooltip, Md2TooltipComponent],
                    entryComponents: [Md2TooltipComponent],
                },] }
    ];
    return Md2TooltipModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var MD2_MODULES = [
    Md2AccordionModule,
    Md2AutocompleteModule,
    Md2ChipsModule,
    Md2CollapseModule,
    Md2ColorpickerModule,
    Md2DataTableModule,
    Md2DatepickerModule,
    Md2DialogModule,
    Md2MenuModule,
    MdRippleModule,
    Md2SelectModule,
    Md2TabsModule,
    Md2TagsModule,
    Md2ToastModule,
    Md2TooltipModule,
    OverlayModule,
    PortalModule,
    RtlModule,
    StyleModule,
    A11yModule,
    PlatformModule,
    CompatibilityModule,
    MdNativeDateModule,
];
var Md2Module = /** @class */ (function () {
    function Md2Module() {
    }
    Md2Module.decorators = [
        { type: NgModule, args: [{
                    imports: MD2_MODULES,
                    exports: MD2_MODULES,
                },] }
    ];
    return Md2Module;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { Dir, RtlModule, ObserveContentModule, ObserveContent, Portal, BasePortalHost, ComponentPortal, TemplatePortal, PortalHostDirective, TemplatePortalDirective, PortalModule, DomPortalHost, GestureConfig, LiveAnnouncer, LIVE_ANNOUNCER_ELEMENT_TOKEN, LIVE_ANNOUNCER_PROVIDER, InteractivityChecker, isFakeMousedownFromScreenReader, A11yModule, UniqueSelectionDispatcher, UNIQUE_SELECTION_DISPATCHER_PROVIDER, MdLineModule, MdLine, MdLineSetter, coerceBooleanProperty, coerceNumberProperty, CompatibilityModule, NoConflictStyleCompatibilityMode, MdCommonModule, MATERIAL_SANITY_CHECKS, MD_PLACEHOLDER_GLOBAL_OPTIONS, MdCoreModule, MdOptionModule, MdOptionSelectionChange, MdOption, MdOptgroupBase, _MdOptgroupMixinBase, MdOptgroup, PlatformModule, Platform, getSupportedInputTypes, Overlay, OVERLAY_PROVIDERS, OverlayContainer, FullscreenOverlayContainer, OverlayRef, OverlayState, ConnectedOverlayDirective, OverlayOrigin, OverlayModule, ViewportRuler, GlobalPositionStrategy, ConnectedPositionStrategy, ConnectionPositionPair, ScrollableViewProperties, ConnectedOverlayPositionChange, Scrollable, ScrollDispatcher, ScrollStrategyOptions, RepositionScrollStrategy, CloseScrollStrategy, NoopScrollStrategy, BlockScrollStrategy, ScrollDispatchModule, MdRipple, MD_RIPPLE_GLOBAL_OPTIONS, RippleRef, RippleState, RIPPLE_FADE_IN_DURATION, RIPPLE_FADE_OUT_DURATION, MdRippleModule, SelectionModel, SelectionChange, FocusTrap, FocusTrapFactory, FocusTrapDeprecatedDirective, FocusTrapDirective, StyleModule, FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY, TOUCH_BUFFER_MS, FocusOriginMonitor, CdkMonitorFocus, FOCUS_ORIGIN_MONITOR_PROVIDER, applyCssTransform, UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW, PAGE_UP, PAGE_DOWN, HOME, END, ENTER, SPACE, TAB, ESCAPE, BACKSPACE, DELETE, COMMA, getMdCompatibilityInvalidPrefixError, MATERIAL_COMPATIBILITY_MODE, MAT_ELEMENTS_SELECTOR, MD_ELEMENTS_SELECTOR, MatPrefixRejector, MdPrefixRejector, AnimationCurves, AnimationDurations, MdSelectionModule, MdPseudoCheckboxBase, _MdPseudoCheckboxBase, MdPseudoCheckbox, NativeDateModule, MdNativeDateModule, DateAdapter, MD_DATE_FORMATS, NativeDateAdapter, MD_NATIVE_DATE_FORMATS, Md2AccordionModule, Md2Accordion, Md2AccordionHeader, Md2AccordionTab, Md2AutocompleteModule, Item, MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR, Md2AutocompleteChange, Md2Autocomplete, HighlightPipe, Chip, MD2_CHIPS_CONTROL_VALUE_ACCESSOR, Md2ChipsChange, Md2Chips, MD2_CHIPS_DIRECTIVES, Md2ChipsModule, Md2CollapseModule, Md2Collapse, Md2ColorpickerModule, SliderPosition, SliderDimension, TextDirective, ColorpickerSliderDirective, Md2ColorChange, Md2Colorpicker, COLOR_RGB, COLOR_HSL, Hsva, Hsla, Rgba, ColorUtil, Md2PaginationChange, Md2DataTable, Md2DataTableSortBy, Md2Pagination, MD2_DATA_TABLE_DIRECTIVES, Md2DataTableModule, Md2DatepickerModule, Md2DateChange, Md2DatepickerContent, MD2_DATEPICKER_VALUE_ACCESSOR, MD2_DATEPICKER_VALIDATORS, Md2Datepicker, Md2MonthView, Md2YearView, Md2CalendarCell, Md2CalendarBody, CLOCK_RADIUS, CLOCK_INNER_RADIUS, CLOCK_OUTER_RADIUS, CLOCK_TICK_RADIUS, Md2Clock, DateLocale, DateUtil, Md2DialogModule, Md2DialogConfig, Md2DialogPortal, Md2DialogTitle, Md2DialogContent, Md2DialogActions, Md2Dialog, Md2MenuContent, Md2MenuItem, Md2MenuTrigger, Md2Menu, Md2MenuModule, Md2SelectModule, fadeInContent, transformPanel, transformPlaceholder, SELECT_ITEM_HEIGHT, SELECT_PANEL_MAX_HEIGHT, SELECT_MAX_OPTIONS_DISPLAYED, SELECT_TRIGGER_HEIGHT, SELECT_ITEM_HEIGHT_ADJUSTMENT, SELECT_PANEL_PADDING_X, SELECT_PANEL_INDENT_PADDING_X, SELECT_MULTIPLE_PANEL_PADDING_X, SELECT_PANEL_PADDING_Y, SELECT_PANEL_VIEWPORT_PADDING, Md2SelectChange, Md2Select, Md2SelectHeader, Md2OptionSelectionChange, Md2Option, Md2OptionModule, Md2OptgroupBase, _Md2OptgroupMixinBase, Md2Optgroup, Md2TabChange, Md2Transclude, Md2Tab, Md2TabLabel, Md2Tabs, MD2_TABS_DIRECTIVES, Md2TabsModule, Md2TagsModule, Tag, MD2_TAGS_CONTROL_VALUE_ACCESSOR, Md2Tags, Md2ToastModule, Toast, Md2ToastConfig, Md2Toast, Md2ToastComponent, Md2TooltipModule, throwMd2TooltipInvalidPositionError, TOUCHEND_HIDE_DELAY, SCROLL_THROTTLE_MS, Md2Tooltip, Md2TooltipComponent, Md2Module, LIVE_ANNOUNCER_PROVIDER_FACTORY as ɵi, mixinColor as ɵl, mixinDisabled as ɵm, UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY as ɵj, MdMutationObserverFactory as ɵa, OVERLAY_CONTAINER_PROVIDER as ɵc, OVERLAY_CONTAINER_PROVIDER_FACTORY as ɵb, OverlayPositionBuilder as ɵk, VIEWPORT_RULER_PROVIDER as ɵe, VIEWPORT_RULER_PROVIDER_FACTORY as ɵd, SCROLL_DISPATCHER_PROVIDER as ɵg, SCROLL_DISPATCHER_PROVIDER_FACTORY as ɵf, RippleRenderer as ɵh, Md2Calendar as ɵo, slideCalendar as ɵp, Md2DatepickerToggle as ɵn };
