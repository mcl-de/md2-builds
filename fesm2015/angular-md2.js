import { NgModule, Directive, Inject, Optional, ElementRef, InjectionToken, isDevMode, HostBinding, Output, Input, EventEmitter, Injectable, NgZone, SkipSelf, Renderer2, Component, ViewEncapsulation, TemplateRef, ComponentFactoryResolver, ViewContainerRef, ApplicationRef, Injector, Pipe, forwardRef, ViewChild, HostListener, Renderer, Self, ContentChildren, ChangeDetectorRef, Attribute, IterableDiffers, ChangeDetectionStrategy } from '@angular/core';
import { DOCUMENT, HammerGestureConfig } from '@angular/platform-browser';
import { Subject, Subscription, merge, fromEvent, of } from 'rxjs';
import { debounceTime, auditTime, first, startWith, filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger, keyframes } from '@angular/animations';
import { NG_VALUE_ACCESSOR, FormsModule, NgControl, NG_VALIDATORS, Validators } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const MATERIAL_COMPATIBILITY_MODE = new InjectionToken('md-compatibility-mode');
/**
 * Returns an exception to be thrown if the consumer has used
 * an invalid Material prefix on a component.
 * \@docs-private
 * @param {?} prefix
 * @param {?} nodeName
 * @return {?}
 */
function getMdCompatibilityInvalidPrefixError(prefix, nodeName) {
    return Error(`The "${prefix}-" prefix cannot be used in ng-material v1 compatibility mode. ` +
        `It was used on an "${nodeName.toLowerCase()}" element.`);
}
/** *
 * Selector that matches all elements that may have style collisions with AngularJS Material.
  @type {?} */
const MAT_ELEMENTS_SELECTOR = `
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
const MD_ELEMENTS_SELECTOR = `
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
class MatPrefixRejector {
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
class MdPrefixRejector {
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
class CompatibilityModule {
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
class NoConflictStyleCompatibilityMode {
}
NoConflictStyleCompatibilityMode.decorators = [
    { type: NgModule, args: [{
                providers: [{
                        provide: MATERIAL_COMPATIBILITY_MODE, useValue: true,
                    }],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Injection token that configures whether the Material sanity checks are enabled.
  @type {?} */
const MATERIAL_SANITY_CHECKS = new InjectionToken('md-sanity-checks');
/**
 * Module that captures anything that should be loaded and/or run for *all* Angular Material
 * components. This includes Bidi, compatibility mode, etc.
 *
 * This module should be imported to each top-level component module (e.g., MdTabsModule).
 */
class MdCommonModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a \@ContentChildren(MdLine) query, then
 * counted by checking the query list's length.
 */
class MdLine {
}
MdLine.decorators = [
    { type: Directive, args: [{
                selector: '[md-line], [mat-line], [mdLine], [matLine]',
                host: { 'class': 'mat-line' }
            },] }
];
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * \@docs-private
 */
class MdLineSetter {
    /**
     * @param {?} _lines
     * @param {?} _renderer
     * @param {?} _element
     */
    constructor(_lines, _renderer, _element) {
        this._lines = _lines;
        this._renderer = _renderer;
        this._element = _element;
        this._setLineClass(this._lines.length);
        this._lines.changes.subscribe(() => {
            this._setLineClass(this._lines.length);
        });
    }
    /**
     * @param {?} count
     * @return {?}
     */
    _setLineClass(count) {
        this._resetClasses();
        if (count === 2 || count === 3) {
            this._setClass(`mat-${count}-line`, true);
        }
        else if (count > 3) {
            this._setClass(`mat-multi-line`, true);
        }
    }
    /**
     * @return {?}
     */
    _resetClasses() {
        this._setClass('mat-2-line', false);
        this._setClass('mat-3-line', false);
        this._setClass('mat-multi-line', false);
    }
    /**
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    _setClass(className, isAdd) {
        if (isAdd) {
            this._renderer.addClass(this._element.nativeElement, className);
        }
        else {
            this._renderer.removeClass(this._element.nativeElement, className);
        }
    }
}
class MdLineModule {
}
MdLineModule.decorators = [
    { type: NgModule, args: [{
                imports: [MdCommonModule],
                exports: [MdLine, MdCommonModule],
                declarations: [MdLine],
            },] }
];

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
class Dir {
    constructor() {
        /**
         * Layout direction of the element.
         */
        this._dir = 'ltr';
        /**
         * Event emitted when the direction changes.
         */
        this.dirChange = new EventEmitter();
    }
    /**
     * \@docs-private
     * @return {?}
     */
    get dir() {
        return this._dir;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set dir(v) {
        /** @type {?} */
        let old = this._dir;
        this._dir = v;
        if (old != this._dir) {
            this.dirChange.emit();
        }
    }
    /**
     * Current layout direction of the element.
     * @return {?}
     */
    get value() { return this.dir; }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) { this.dir = v; }
}
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
class RtlModule {
}
RtlModule.decorators = [
    { type: NgModule, args: [{
                exports: [Dir],
                declarations: [Dir]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Factory that creates a new MutationObserver and allows us to stub it out in unit tests.
 * \@docs-private
 */
class MdMutationObserverFactory {
    /**
     * @param {?} callback
     * @return {?}
     */
    create(callback) {
        return typeof MutationObserver === 'undefined' ? null : new MutationObserver(callback);
    }
}
MdMutationObserverFactory.decorators = [
    { type: Injectable }
];
/**
 * Directive that triggers a callback whenever the content of
 * its associated element has changed.
 */
class ObserveContent {
    /**
     * @param {?} _mutationObserverFactory
     * @param {?} _elementRef
     */
    constructor(_mutationObserverFactory, _elementRef) {
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
    ngAfterContentInit() {
        if (this.debounce > 0) {
            this._debouncer
                .pipe(debounceTime(this.debounce))
                .subscribe(mutations => this.event.emit(mutations));
        }
        else {
            this._debouncer.subscribe(mutations => this.event.emit(mutations));
        }
        this._observer = this._mutationObserverFactory.create((mutations) => {
            this._debouncer.next(mutations);
        });
        if (this._observer) {
            this._observer.observe(this._elementRef.nativeElement, {
                characterData: true,
                childList: true,
                subtree: true
            });
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._observer) {
            this._observer.disconnect();
            this._debouncer.complete();
            this._debouncer = this._observer = null;
        }
    }
}
ObserveContent.decorators = [
    { type: Directive, args: [{
                selector: '[cdkObserveContent]'
            },] }
];
/** @nocollapse */
ObserveContent.ctorParameters = () => [
    { type: MdMutationObserverFactory },
    { type: ElementRef }
];
ObserveContent.propDecorators = {
    event: [{ type: Output, args: ['cdkObserveContent',] }],
    debounce: [{ type: Input }]
};
class ObserveContentModule {
}
ObserveContentModule.decorators = [
    { type: NgModule, args: [{
                exports: [ObserveContent],
                declarations: [ObserveContent],
                providers: [MdMutationObserverFactory]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
const RippleState = {
    FADING_IN: 0, VISIBLE: 1, FADING_OUT: 2, HIDDEN: 3,
};
RippleState[RippleState.FADING_IN] = 'FADING_IN';
RippleState[RippleState.VISIBLE] = 'VISIBLE';
RippleState[RippleState.FADING_OUT] = 'FADING_OUT';
RippleState[RippleState.HIDDEN] = 'HIDDEN';
/**
 * Reference to a previously launched ripple element.
 */
class RippleRef {
    /**
     * @param {?} _renderer
     * @param {?} element
     * @param {?} config
     */
    constructor(_renderer, element, config) {
        this._renderer = _renderer;
        this.element = element;
        this.config = config;
        /**
         * Current state of the ripple reference.
         */
        this.state = RippleState.HIDDEN;
    }
    /**
     * Fades out the ripple element.
     * @return {?}
     */
    fadeOut() {
        this._renderer.fadeOutRipple(this);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Fade-in duration for the ripples. Can be modified with the speedFactor option.
  @type {?} */
const RIPPLE_FADE_IN_DURATION = 450;
/** *
 * Fade-out duration for the ripples in milliseconds. This can't be modified by the speedFactor.
  @type {?} */
const RIPPLE_FADE_OUT_DURATION = 400;
/**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * \@docs-private
 */
class RippleRenderer {
    /**
     * @param {?} elementRef
     * @param {?} _ngZone
     * @param {?} _ruler
     * @param {?} platform
     */
    constructor(elementRef, _ngZone, _ruler, platform) {
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
    /**
     * Fades in a ripple at the given coordinates.
     * @param {?} pageX
     * @param {?} pageY
     * @param {?=} config
     * @return {?}
     */
    fadeInRipple(pageX, pageY, config = {}) {
        /** @type {?} */
        let containerRect = this._containerElement.getBoundingClientRect();
        if (config.centered) {
            pageX = containerRect.left + containerRect.width / 2;
            pageY = containerRect.top + containerRect.height / 2;
        }
        else {
            /** @type {?} */
            let scrollPosition = this._ruler.getViewportScrollPosition();
            pageX -= scrollPosition.left;
            pageY -= scrollPosition.top;
        }
        /** @type {?} */
        let radius = config.radius || distanceToFurthestCorner(pageX, pageY, containerRect);
        /** @type {?} */
        let duration = RIPPLE_FADE_IN_DURATION * (1 / (config.speedFactor || 1));
        /** @type {?} */
        let offsetX = pageX - containerRect.left;
        /** @type {?} */
        let offsetY = pageY - containerRect.top;
        /** @type {?} */
        let ripple = document.createElement('div');
        ripple.classList.add('mat-ripple-element');
        ripple.style.left = `${offsetX - radius}px`;
        ripple.style.top = `${offsetY - radius}px`;
        ripple.style.height = `${radius * 2}px`;
        ripple.style.width = `${radius * 2}px`;
        // If the color is not set, the default CSS color will be used.
        ripple.style.backgroundColor = config.color;
        ripple.style.transitionDuration = `${duration}ms`;
        this._containerElement.appendChild(ripple);
        // By default the browser does not recalculate the styles of dynamically created
        // ripple elements. This is critical because then the `scale` would not animate properly.
        enforceStyleRecalculation(ripple);
        ripple.style.transform = 'scale(1)';
        /** @type {?} */
        let rippleRef = new RippleRef(this, ripple, config);
        rippleRef.state = RippleState.FADING_IN;
        // Add the ripple reference to the list of all active ripples.
        this._activeRipples.add(rippleRef);
        // Wait for the ripple element to be completely faded in.
        // Once it's faded in, the ripple can be hidden immediately if the mouse is released.
        this.runTimeoutOutsideZone(() => {
            rippleRef.state = RippleState.VISIBLE;
            if (!config.persistent && !this._isMousedown) {
                rippleRef.fadeOut();
            }
        }, duration);
        return rippleRef;
    }
    /**
     * Fades out a ripple reference.
     * @param {?} rippleRef
     * @return {?}
     */
    fadeOutRipple(rippleRef) {
        // For ripples that are not active anymore, don't re-un the fade-out animation.
        if (!this._activeRipples.delete(rippleRef)) {
            return;
        }
        /** @type {?} */
        let rippleEl = rippleRef.element;
        rippleEl.style.transitionDuration = `${RIPPLE_FADE_OUT_DURATION}ms`;
        rippleEl.style.opacity = '0';
        rippleRef.state = RippleState.FADING_OUT;
        // Once the ripple faded out, the ripple can be safely removed from the DOM.
        this.runTimeoutOutsideZone(() => {
            rippleRef.state = RippleState.HIDDEN;
            rippleEl.parentNode.removeChild(rippleEl);
        }, RIPPLE_FADE_OUT_DURATION);
    }
    /**
     * Fades out all currently active ripples.
     * @return {?}
     */
    fadeOutAll() {
        this._activeRipples.forEach(ripple => ripple.fadeOut());
    }
    /**
     * Sets the trigger element and registers the mouse events.
     * @param {?} element
     * @return {?}
     */
    setTriggerElement(element) {
        // Remove all previously register event listeners from the trigger element.
        if (this._triggerElement) {
            this._triggerEvents.forEach((fn, type) => this._triggerElement.removeEventListener(type, fn));
        }
        if (element) {
            // If the element is not null, register all event listeners on the trigger element.
            this._ngZone.runOutsideAngular(() => {
                this._triggerEvents.forEach((fn, type) => element.addEventListener(type, fn));
            });
        }
        this._triggerElement = element;
    }
    /**
     * Listener being called on mousedown event.
     * @param {?} event
     * @return {?}
     */
    onMousedown(event) {
        if (!this.rippleDisabled) {
            this._isMousedown = true;
            this.fadeInRipple(event.pageX, event.pageY, this.rippleConfig);
        }
    }
    /**
     * Listener being called on mouseup event.
     * @return {?}
     */
    onMouseup() {
        this._isMousedown = false;
        // Fade-out all ripples that are completely visible and not persistent.
        this._activeRipples.forEach(ripple => {
            if (!ripple.config.persistent && ripple.state === RippleState.VISIBLE) {
                ripple.fadeOut();
            }
        });
    }
    /**
     * Listener being called on mouseleave event.
     * @return {?}
     */
    onMouseLeave() {
        if (this._isMousedown) {
            this.onMouseup();
        }
    }
    /**
     * Runs a timeout outside of the Angular zone to avoid triggering the change detection.
     * @param {?} fn
     * @param {?=} delay
     * @return {?}
     */
    runTimeoutOutsideZone(fn, delay = 0) {
        this._ngZone.runOutsideAngular(() => setTimeout(fn, delay));
    }
}
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
    const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
    /** @type {?} */
    const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return Math.sqrt(distX * distX + distY * distY);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const hasV8BreakIterator = (typeof (Intl) !== 'undefined' && (/** @type {?} */ (Intl)).v8BreakIterator);
/**
 * Service to detect the current platform by comparing the userAgent strings and
 * checking browser-specific global properties.
 * \@docs-private
 */
class Platform {
    constructor() {
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
}
Platform.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Cached result Set of input types support by the current browser.
  @type {?} */
let supportedInputTypes;
/** *
 * Types of <input> that *might* be supported.
  @type {?} */
const candidateInputTypes = [
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
    let featureTestInput = document.createElement('input');
    supportedInputTypes = new Set(candidateInputTypes.filter(value => {
        featureTestInput.setAttribute('type', value);
        return featureTestInput.type === value;
    }));
    return supportedInputTypes;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class PlatformModule {
}
PlatformModule.decorators = [
    { type: NgModule, args: [{
                providers: [Platform]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Time in ms to throttle the scrolling events by default.
  @type {?} */
const DEFAULT_SCROLL_TIME = 20;
/**
 * Service contained all registered Scrollable references and emits an event when any one of the
 * Scrollable references emit a scrolled event.
 */
class ScrollDispatcher {
    /**
     * @param {?} _ngZone
     * @param {?} _platform
     */
    constructor(_ngZone, _platform) {
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
     * @param {?} scrollable Scrollable instance to be registered.
     * @return {?}
     */
    register(scrollable) {
        /** @type {?} */
        const scrollSubscription = scrollable.elementScrolled().subscribe(() => this._notify());
        this.scrollableReferences.set(scrollable, scrollSubscription);
    }
    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     * @param {?} scrollable Scrollable instance to be deregistered.
     * @return {?}
     */
    deregister(scrollable) {
        if (this.scrollableReferences.has(scrollable)) {
            this.scrollableReferences.get(scrollable).unsubscribe();
            this.scrollableReferences.delete(scrollable);
        }
    }
    /**
     * Subscribes to an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     * @param {?=} auditTimeInMs
     * @param {?=} callback
     * @return {?}
     */
    scrolled(auditTimeInMs = DEFAULT_SCROLL_TIME, callback) {
        // Scroll events can only happen on the browser, so do nothing if we're not on the browser.
        if (!this._platform.isBrowser) {
            return Subscription.EMPTY;
        }
        /** @type {?} */
        let observable = auditTimeInMs > 0 ?
            this._scrolled.asObservable().pipe(auditTime(auditTimeInMs)) :
            this._scrolled.asObservable();
        this._scrolledCount++;
        if (!this._globalSubscription) {
            this._globalSubscription = this._ngZone.runOutsideAngular(() => {
                return merge(fromEvent(window.document, 'scroll'), fromEvent(window, 'resize')).subscribe(() => this._notify());
            });
        }
        /** @type {?} */
        let subscription = observable.subscribe(callback);
        subscription.add(() => {
            this._scrolledCount--;
            if (this._globalSubscription && !this.scrollableReferences.size && !this._scrolledCount) {
                this._globalSubscription.unsubscribe();
                this._globalSubscription = null;
            }
        });
        return subscription;
    }
    /**
     * Returns all registered Scrollables that contain the provided element.
     * @param {?} elementRef
     * @return {?}
     */
    getScrollContainers(elementRef) {
        /** @type {?} */
        const scrollingContainers = [];
        this.scrollableReferences.forEach((_subscription, scrollable) => {
            if (this.scrollableContainsElement(scrollable, elementRef)) {
                scrollingContainers.push(scrollable);
            }
        });
        return scrollingContainers;
    }
    /**
     * Returns true if the element is contained within the provided Scrollable.
     * @param {?} scrollable
     * @param {?} elementRef
     * @return {?}
     */
    scrollableContainsElement(scrollable, elementRef) {
        /** @type {?} */
        let element = elementRef.nativeElement;
        /** @type {?} */
        let scrollableElement = scrollable.getElementRef().nativeElement;
        // Traverse through the element parents until we reach null, checking if any of the elements
        // are the scrollable's element.
        do {
            if (element == scrollableElement) {
                return true;
            }
        } while (element = element.parentElement);
    }
    /**
     * Sends a notification that a scroll event has been fired.
     * @return {?}
     */
    _notify() {
        this._scrolled.next();
    }
}
ScrollDispatcher.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ScrollDispatcher.ctorParameters = () => [
    { type: NgZone },
    { type: Platform }
];
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
const SCROLL_DISPATCHER_PROVIDER = {
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
class ViewportRuler {
    /**
     * @param {?} scrollDispatcher
     */
    constructor(scrollDispatcher) {
        // Subscribe to scroll and resize events and update the document rectangle on changes.
        scrollDispatcher.scrolled(null, () => this._cacheViewportGeometry());
    }
    /**
     * Gets a ClientRect for the viewport's bounds.
     * @param {?=} documentRect
     * @return {?}
     */
    getViewportRect(documentRect = this._documentRect) {
        // Cache the document bounding rect so that we don't recompute it for multiple calls.
        if (!documentRect) {
            this._cacheViewportGeometry();
            documentRect = this._documentRect;
        }
        /** @type {?} */
        const scrollPosition = this.getViewportScrollPosition(documentRect);
        /** @type {?} */
        const height = window.innerHeight;
        /** @type {?} */
        const width = window.innerWidth;
        return {
            top: scrollPosition.top,
            left: scrollPosition.left,
            bottom: scrollPosition.top + height,
            right: scrollPosition.left + width,
            height,
            width,
        };
    }
    /**
     * Gets the (top, left) scroll position of the viewport.
     * @param {?=} documentRect
     * @return {?}
     */
    getViewportScrollPosition(documentRect = this._documentRect) {
        // Cache the document bounding rect so that we don't recompute it for multiple calls.
        if (!documentRect) {
            this._cacheViewportGeometry();
            documentRect = this._documentRect;
        }
        /** @type {?} */
        const top = -documentRect.top || document.body.scrollTop || window.scrollY ||
            document.documentElement.scrollTop || 0;
        /** @type {?} */
        const left = -documentRect.left || document.body.scrollLeft || window.scrollX ||
            document.documentElement.scrollLeft || 0;
        return { top, left };
    }
    /**
     * Caches the latest client rectangle of the document element.
     * @return {?}
     */
    _cacheViewportGeometry() {
        this._documentRect = document.documentElement.getBoundingClientRect();
    }
}
ViewportRuler.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ViewportRuler.ctorParameters = () => [
    { type: ScrollDispatcher }
];
/**
 * @param {?} parentRuler
 * @param {?} scrollDispatcher
 * @return {?}
 */
function VIEWPORT_RULER_PROVIDER_FACTORY(parentRuler, scrollDispatcher) {
    return parentRuler || new ViewportRuler(scrollDispatcher);
}
/** @type {?} */
const VIEWPORT_RULER_PROVIDER = {
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
const MD_RIPPLE_GLOBAL_OPTIONS = new InjectionToken('md-ripple-global-options');
class MdRipple {
    /**
     * @param {?} elementRef
     * @param {?} ngZone
     * @param {?} ruler
     * @param {?} platform
     * @param {?} globalOptions
     */
    constructor(elementRef, ngZone, ruler, platform, globalOptions) {
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
    ngOnChanges(changes) {
        if (changes['trigger'] && this.trigger) {
            this._rippleRenderer.setTriggerElement(this.trigger);
        }
        this._updateRippleRenderer();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // Set the trigger element to null to cleanup all listeners.
        this._rippleRenderer.setTriggerElement(null);
    }
    /**
     * Launches a manual ripple at the specified position.
     * @param {?} pageX
     * @param {?} pageY
     * @param {?=} config
     * @return {?}
     */
    launch(pageX, pageY, config = this.rippleConfig) {
        return this._rippleRenderer.fadeInRipple(pageX, pageY, config);
    }
    /**
     * Fades out all currently showing ripple elements.
     * @return {?}
     */
    fadeOutAll() {
        this._rippleRenderer.fadeOutAll();
    }
    /**
     * Ripple configuration from the directive's input values.
     * @return {?}
     */
    get rippleConfig() {
        return {
            centered: this.centered,
            speedFactor: this.speedFactor * (this._globalOptions.baseSpeedFactor || 1),
            radius: this.radius,
            color: this.color
        };
    }
    /**
     * Updates the ripple renderer with the latest ripple configuration.
     * @return {?}
     */
    _updateRippleRenderer() {
        this._rippleRenderer.rippleDisabled = this._globalOptions.disabled || this.disabled;
        this._rippleRenderer.rippleConfig = this.rippleConfig;
    }
}
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
MdRipple.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: ViewportRuler },
    { type: Platform },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MD_RIPPLE_GLOBAL_OPTIONS,] }] }
];
MdRipple.propDecorators = {
    trigger: [{ type: Input, args: ['mdRippleTrigger',] }],
    centered: [{ type: Input, args: ['mdRippleCentered',] }],
    disabled: [{ type: Input, args: ['mdRippleDisabled',] }],
    radius: [{ type: Input, args: ['mdRippleRadius',] }],
    speedFactor: [{ type: Input, args: ['mdRippleSpeedFactor',] }],
    color: [{ type: Input, args: ['mdRippleColor',] }],
    unbounded: [{ type: Input, args: ['mdRippleUnbounded',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Sends an event when the directive's element is scrolled. Registers itself with the
 * ScrollDispatcher service to include itself as part of its collection of scrolling events that it
 * can be listened to through the service.
 */
class Scrollable {
    /**
     * @param {?} _elementRef
     * @param {?} _scroll
     * @param {?} _ngZone
     * @param {?} _renderer
     */
    constructor(_elementRef, _scroll, _ngZone, _renderer) {
        this._elementRef = _elementRef;
        this._scroll = _scroll;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._elementScrolled = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._scrollListener = this._ngZone.runOutsideAngular(() => {
            return this._renderer.listen(this.getElementRef().nativeElement, 'scroll', (event) => {
                this._elementScrolled.next(event);
            });
        });
        this._scroll.register(this);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._scroll.deregister(this);
        if (this._scrollListener) {
            this._scrollListener();
            this._scrollListener = null;
        }
    }
    /**
     * Returns observable that emits when a scroll event is fired on the host element.
     * @return {?}
     */
    elementScrolled() {
        return this._elementScrolled.asObservable();
    }
    /**
     * @return {?}
     */
    getElementRef() {
        return this._elementRef;
    }
}
Scrollable.decorators = [
    { type: Directive, args: [{
                selector: '[cdk-scrollable], [cdkScrollable]'
            },] }
];
/** @nocollapse */
Scrollable.ctorParameters = () => [
    { type: ElementRef },
    { type: ScrollDispatcher },
    { type: NgZone },
    { type: Renderer2 }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Returns an error to be thrown when attempting to attach an already-attached scroll strategy.
 * @return {?}
 */
function getMdScrollStrategyAlreadyAttachedError() {
    return Error(`Scroll strategy has already been attached.`);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
class CloseScrollStrategy {
    /**
     * @param {?} _scrollDispatcher
     */
    constructor(_scrollDispatcher) {
        this._scrollDispatcher = _scrollDispatcher;
        this._scrollSubscription = null;
    }
    /**
     * @param {?} overlayRef
     * @return {?}
     */
    attach(overlayRef) {
        if (this._overlayRef) {
            throw getMdScrollStrategyAlreadyAttachedError();
        }
        this._overlayRef = overlayRef;
    }
    /**
     * @return {?}
     */
    enable() {
        if (!this._scrollSubscription) {
            this._scrollSubscription = this._scrollDispatcher.scrolled(null, () => {
                if (this._overlayRef.hasAttached()) {
                    this._overlayRef.detach();
                }
                this.disable();
            });
        }
    }
    /**
     * @return {?}
     */
    disable() {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
            this._scrollSubscription = null;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Scroll strategy that doesn't do anything.
 */
class NoopScrollStrategy {
    /**
     * @return {?}
     */
    enable() { }
    /**
     * @return {?}
     */
    disable() { }
    /**
     * @return {?}
     */
    attach() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
class BlockScrollStrategy {
    /**
     * @param {?} _viewportRuler
     */
    constructor(_viewportRuler) {
        this._viewportRuler = _viewportRuler;
        this._previousHTMLStyles = { top: '', left: '' };
        this._isEnabled = false;
    }
    /**
     * @return {?}
     */
    attach() { }
    /**
     * @return {?}
     */
    enable() {
        if (this._canBeEnabled()) {
            /** @type {?} */
            const root = document.documentElement;
            this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition();
            // Cache the previous inline styles in case the user had set them.
            this._previousHTMLStyles.left = root.style.left;
            this._previousHTMLStyles.top = root.style.top;
            // Note: we're using the `html` node, instead of the `body`, because the `body` may
            // have the user agent margin, whereas the `html` is guaranteed not to have one.
            root.style.left = `${-this._previousScrollPosition.left}px`;
            root.style.top = `${-this._previousScrollPosition.top}px`;
            root.classList.add('cdk-global-scrollblock');
            this._isEnabled = true;
        }
    }
    /**
     * @return {?}
     */
    disable() {
        if (this._isEnabled) {
            this._isEnabled = false;
            document.documentElement.style.left = this._previousHTMLStyles.left;
            document.documentElement.style.top = this._previousHTMLStyles.top;
            document.documentElement.classList.remove('cdk-global-scrollblock');
            window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top);
        }
    }
    /**
     * @return {?}
     */
    _canBeEnabled() {
        // Since the scroll strategies can't be singletons, we have to use a global CSS class
        // (`cdk-global-scrollblock`) to make sure that we don't try to disable global
        // scrolling multiple times.
        if (document.documentElement.classList.contains('cdk-global-scrollblock') || this._isEnabled) {
            return false;
        }
        /** @type {?} */
        const body = document.body;
        /** @type {?} */
        const viewport = this._viewportRuler.getViewportRect();
        return body.scrollHeight > viewport.height || body.scrollWidth > viewport.width;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Strategy that will update the element position as the user is scrolling.
 */
class RepositionScrollStrategy {
    /**
     * @param {?} _scrollDispatcher
     * @param {?} _config
     */
    constructor(_scrollDispatcher, _config) {
        this._scrollDispatcher = _scrollDispatcher;
        this._config = _config;
        this._scrollSubscription = null;
    }
    /**
     * @param {?} overlayRef
     * @return {?}
     */
    attach(overlayRef) {
        if (this._overlayRef) {
            throw getMdScrollStrategyAlreadyAttachedError();
        }
        this._overlayRef = overlayRef;
    }
    /**
     * @return {?}
     */
    enable() {
        if (!this._scrollSubscription) {
            /** @type {?} */
            let throttle = this._config ? this._config.scrollThrottle : 0;
            this._scrollSubscription = this._scrollDispatcher.scrolled(throttle, () => {
                this._overlayRef.updatePosition();
            });
        }
    }
    /**
     * @return {?}
     */
    disable() {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
            this._scrollSubscription = null;
        }
    }
}

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
class ScrollStrategyOptions {
    /**
     * @param {?} _scrollDispatcher
     * @param {?} _viewportRuler
     */
    constructor(_scrollDispatcher, _viewportRuler) {
        this._scrollDispatcher = _scrollDispatcher;
        this._viewportRuler = _viewportRuler;
        /**
         * Do nothing on scroll.
         */
        this.noop = () => new NoopScrollStrategy();
        /**
         * Close the overlay as soon as the user scrolls.
         */
        this.close = () => new CloseScrollStrategy(this._scrollDispatcher);
        /**
         * Block scrolling.
         */
        this.block = () => new BlockScrollStrategy(this._viewportRuler);
        /**
         * Update the overlay's position on scroll.
         * @param config Configuration to be used inside the scroll strategy.
         * Allows debouncing the reposition calls.
         */
        this.reposition = (config) => new RepositionScrollStrategy(this._scrollDispatcher, config);
    }
}
ScrollStrategyOptions.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ScrollStrategyOptions.ctorParameters = () => [
    { type: ScrollDispatcher },
    { type: ViewportRuler }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ScrollDispatchModule {
}
ScrollDispatchModule.decorators = [
    { type: NgModule, args: [{
                imports: [PlatformModule],
                exports: [Scrollable],
                declarations: [Scrollable],
                providers: [SCROLL_DISPATCHER_PROVIDER, ScrollStrategyOptions],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class MdRippleModule {
}
MdRippleModule.decorators = [
    { type: NgModule, args: [{
                imports: [MdCommonModule, PlatformModule, ScrollDispatchModule],
                exports: [MdRipple, MdCommonModule],
                declarations: [MdRipple],
                providers: [VIEWPORT_RULER_PROVIDER],
            },] }
];

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
    return class extends base {
        /**
         * @param {...?} args
         */
        constructor(...args) {
            super(...args);
            this._color = null;
            // Set the default color that can be specified from the mixin.
            this.color = defaultColor;
        }
        /**
         * @return {?}
         */
        get color() { return this._color; }
        /**
         * @param {?} value
         * @return {?}
         */
        set color(value) {
            /** @type {?} */
            const colorPalette = value || defaultColor;
            if (colorPalette !== this._color) {
                if (this._color) {
                    this._renderer.removeClass(this._elementRef.nativeElement, `mat-${this._color}`);
                }
                if (colorPalette) {
                    this._renderer.addClass(this._elementRef.nativeElement, `mat-${colorPalette}`);
                }
                this._color = colorPalette;
            }
        }
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class MdPseudoCheckboxBase {
    /**
     * @param {?} _renderer
     * @param {?} _elementRef
     */
    constructor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
    }
}
/** @type {?} */
const _MdPseudoCheckboxBase = mixinColor(MdPseudoCheckboxBase, 'accent');
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
class MdPseudoCheckbox extends _MdPseudoCheckboxBase {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class MdSelectionModule {
}
MdSelectionModule.decorators = [
    { type: NgModule, args: [{
                exports: [MdPseudoCheckbox],
                declarations: [MdPseudoCheckbox]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// Due to a bug in the ChromeDriver, Angular keyboard events are not triggered by `sendKeys`
// during E2E tests when using dot notation such as `(keydown.rightArrow)`. To get around this,
// we are temporarily using a single (keydown) handler.
// See: https://github.com/angular/angular/issues/9419
/** @type {?} */
const UP_ARROW = 38;
/** @type {?} */
const DOWN_ARROW = 40;
/** @type {?} */
const RIGHT_ARROW = 39;
/** @type {?} */
const LEFT_ARROW = 37;
/** @type {?} */
const PAGE_UP = 33;
/** @type {?} */
const PAGE_DOWN = 34;
/** @type {?} */
const HOME = 36;
/** @type {?} */
const END = 35;
/** @type {?} */
const ENTER = 13;
/** @type {?} */
const SPACE = 32;
/** @type {?} */
const TAB = 9;
/** @type {?} */
const ESCAPE = 27;
/** @type {?} */
const BACKSPACE = 8;
/** @type {?} */
const DELETE = 46;
/** @type {?} */
const COMMA = 188;

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
    return value != null && `${value}` !== 'false';
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
    return class extends base {
        /**
         * @param {...?} args
         */
        constructor(...args) {
            super(...args);
            this._disabled = false;
        }
        /**
         * @return {?}
         */
        get disabled() { return this._disabled; }
        /**
         * @param {?} value
         * @return {?}
         */
        set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class MdOptgroupBase {
}
/** @type {?} */
const _MdOptgroupMixinBase = mixinDisabled(MdOptgroupBase);
/** @type {?} */
let _uniqueOptgroupIdCounter = 0;
/**
 * Component that is used to group instances of `md-option`.
 */
class MdOptgroup extends _MdOptgroupMixinBase {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
  @type {?} */
let _uniqueIdCounter = 0;
/**
 * Event object emitted by MdOption when selected or deselected.
 */
class MdOptionSelectionChange {
    /**
     * @param {?} source
     * @param {?=} isUserInput
     */
    constructor(source, isUserInput = false) {
        this.source = source;
        this.isUserInput = isUserInput;
    }
}
/**
 * Single option inside of a `<md-select>` element.
 */
class MdOption {
    /**
     * @param {?} _element
     * @param {?} group
     * @param {?} _isCompatibilityMode
     */
    constructor(_element, group, _isCompatibilityMode) {
        this._element = _element;
        this.group = group;
        this._isCompatibilityMode = _isCompatibilityMode;
        this._selected = false;
        this._active = false;
        /**
         * Whether the option is disabled.
         */
        this._disabled = false;
        this._id = `md-option-${_uniqueIdCounter++}`;
        /**
         * Whether the wrapping component is in multiple selection mode.
         */
        this.multiple = false;
        /**
         * Event emitted when the option is selected or deselected.
         */
        this.onSelectionChange = new EventEmitter();
    }
    /**
     * The unique ID of the option.
     * @return {?}
     */
    get id() { return this._id; }
    /**
     * Whether or not the option is currently selected.
     * @return {?}
     */
    get selected() { return this._selected; }
    /**
     * Whether the option is disabled.
     * @return {?}
     */
    get disabled() { return (this.group && this.group.disabled) || this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     * @return {?}
     */
    get active() {
        return this._active;
    }
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     * @return {?}
     */
    get viewValue() {
        // TODO(kara): Add input property alternative for node envs.
        return this._getHostElement().textContent.trim();
    }
    /**
     * Selects the option.
     * @return {?}
     */
    select() {
        this._selected = true;
        this._emitSelectionChangeEvent();
    }
    /**
     * Deselects the option.
     * @return {?}
     */
    deselect() {
        this._selected = false;
        this._emitSelectionChangeEvent();
    }
    /**
     * Sets focus onto this option.
     * @return {?}
     */
    focus() {
        this._getHostElement().focus();
    }
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    setActiveStyles() {
        this._active = true;
    }
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    setInactiveStyles() {
        this._active = false;
    }
    /**
     * Ensures the option is selected when activated from the keyboard.
     * @param {?} event
     * @return {?}
     */
    _handleKeydown(event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this._selectViaInteraction();
        }
    }
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     * @return {?}
     */
    _selectViaInteraction() {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this._emitSelectionChangeEvent(true);
        }
    }
    /**
     * Returns the correct tabindex for the option depending on disabled state.
     * @return {?}
     */
    _getTabIndex() {
        return this.disabled ? '-1' : '0';
    }
    /**
     * Fetches the host DOM element.
     * @return {?}
     */
    _getHostElement() {
        return this._element.nativeElement;
    }
    /**
     * Emits the selection change event.
     * @param {?=} isUserInput
     * @return {?}
     */
    _emitSelectionChangeEvent(isUserInput = false) {
        this.onSelectionChange.emit(new MdOptionSelectionChange(this, isUserInput));
    }
}
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
MdOption.ctorParameters = () => [
    { type: ElementRef },
    { type: MdOptgroup, decorators: [{ type: Optional }] },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [MATERIAL_COMPATIBILITY_MODE,] }] }
];
MdOption.propDecorators = {
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    onSelectionChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class MdOptionModule {
}
MdOptionModule.decorators = [
    { type: NgModule, args: [{
                imports: [MdRippleModule, CommonModule, MdSelectionModule],
                exports: [MdOption, MdOptgroup],
                declarations: [MdOption, MdOptgroup]
            },] }
];

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
class Portal {
    /**
     * Attach this portal to a host.
     * @param {?} host
     * @return {?}
     */
    attach(host) {
        if (host == null) {
            throwNullPortalHostError();
        }
        if (host.hasAttached()) {
            throwPortalAlreadyAttachedError();
        }
        this._attachedHost = host;
        return /** @type {?} */ (host.attach(this));
    }
    /**
     * Detach this portal from its host
     * @return {?}
     */
    detach() {
        /** @type {?} */
        let host = this._attachedHost;
        if (host == null) {
            throwNoPortalAttachedError();
        }
        this._attachedHost = null;
        return host.detach();
    }
    /**
     * Whether this portal is attached to a host.
     * @return {?}
     */
    get isAttached() {
        return this._attachedHost != null;
    }
    /**
     * Sets the PortalHost reference without performing `attach()`. This is used directly by
     * the PortalHost when it is performing an `attach()` or `detach()`.
     * @param {?} host
     * @return {?}
     */
    setAttachedHost(host) {
        this._attachedHost = host;
    }
}
/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 * @template T
 */
class ComponentPortal extends Portal {
    /**
     * @param {?} component
     * @param {?=} viewContainerRef
     * @param {?=} injector
     */
    constructor(component, viewContainerRef = null, injector = null) {
        super();
        this.component = component;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
    }
}
/**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
class TemplatePortal extends Portal {
    /**
     * @param {?} template
     * @param {?} viewContainerRef
     */
    constructor(template, viewContainerRef) {
        super();
        /**
         * Additional locals for the instantiated embedded view.
         * These locals can be seen as "exports" for the template, such as how ngFor has
         * index / event / odd.
         * See https://angular.io/docs/ts/latest/api/core/EmbeddedViewRef-class.html
         */
        this.locals = new Map();
        this.templateRef = template;
        this.viewContainerRef = viewContainerRef;
    }
    /**
     * @return {?}
     */
    get origin() {
        return this.templateRef.elementRef;
    }
    /**
     * @param {?} host
     * @param {?=} locals
     * @return {?}
     */
    attach(host, locals) {
        this.locals = locals == null ? new Map() : locals;
        return super.attach(host);
    }
    /**
     * @return {?}
     */
    detach() {
        this.locals = new Map();
        return super.detach();
    }
}
/**
 * Partial implementation of PortalHost that only deals with attaching either a
 * ComponentPortal or a TemplatePortal.
 * @abstract
 */
class BasePortalHost {
    constructor() {
        /**
         * Whether this host has already been permanently disposed.
         */
        this._isDisposed = false;
    }
    /**
     * Whether this host has an attached portal.
     * @return {?}
     */
    hasAttached() {
        return !!this._attachedPortal;
    }
    /**
     * @param {?} portal
     * @return {?}
     */
    attach(portal) {
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
    }
    /**
     * @return {?}
     */
    detach() {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost(null);
            this._attachedPortal = null;
        }
        this._invokeDisposeFn();
    }
    /**
     * @return {?}
     */
    dispose() {
        if (this.hasAttached()) {
            this.detach();
        }
        this._invokeDisposeFn();
        this._isDisposed = true;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    setDisposeFn(fn) {
        this._disposeFn = fn;
    }
    /**
     * @return {?}
     */
    _invokeDisposeFn() {
        if (this._disposeFn) {
            this._disposeFn();
            this._disposeFn = null;
        }
    }
}

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
class TemplatePortalDirective extends TemplatePortal {
    /**
     * @param {?} templateRef
     * @param {?} viewContainerRef
     */
    constructor(templateRef, viewContainerRef) {
        super(templateRef, viewContainerRef);
    }
}
TemplatePortalDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cdk-portal], [cdkPortal], [portal]',
                exportAs: 'cdkPortal',
            },] }
];
/** @nocollapse */
TemplatePortalDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef }
];
/**
 * Directive version of a PortalHost. Because the directive *is* a PortalHost, portals can be
 * directly attached to it, enabling declarative use.
 *
 * Usage:
 * <ng-template [cdkPortalHost]="greeting"></ng-template>
 */
class PortalHostDirective extends BasePortalHost {
    /**
     * @param {?} _componentFactoryResolver
     * @param {?} _viewContainerRef
     */
    constructor(_componentFactoryResolver, _viewContainerRef) {
        super();
        this._componentFactoryResolver = _componentFactoryResolver;
        this._viewContainerRef = _viewContainerRef;
    }
    /**
     * @deprecated
     * @return {?}
     */
    get _deprecatedPortal() { return this.portal; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _deprecatedPortal(v) { this.portal = v; }
    /**
     * Portal associated with the Portal host.
     * @return {?}
     */
    get portal() {
        return this._portal;
    }
    /**
     * @param {?} portal
     * @return {?}
     */
    set portal(portal) {
        if (this.hasAttached()) {
            super.detach();
        }
        if (portal) {
            super.attach(portal);
        }
        this._portal = portal;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.dispose();
        this._portal = null;
    }
    /**
     * Attach the given ComponentPortal to this PortalHost using the ComponentFactoryResolver.
     *
     * @template T
     * @param {?} portal Portal to be attached to the portal host.
     * @return {?}
     */
    attachComponentPortal(portal) {
        portal.setAttachedHost(this);
        /** @type {?} */
        let viewContainerRef = portal.viewContainerRef != null ?
            portal.viewContainerRef :
            this._viewContainerRef;
        /** @type {?} */
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        /** @type {?} */
        let ref = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, portal.injector || viewContainerRef.parentInjector);
        super.setDisposeFn(() => ref.destroy());
        this._portal = portal;
        return ref;
    }
    /**
     * Attach the given TemplatePortal to this PortlHost as an embedded View.
     * @param {?} portal Portal to be attached.
     * @return {?}
     */
    attachTemplatePortal(portal) {
        portal.setAttachedHost(this);
        this._viewContainerRef.createEmbeddedView(portal.templateRef);
        super.setDisposeFn(() => this._viewContainerRef.clear());
        this._portal = portal;
        // TODO(jelbourn): return locals from view
        return new Map();
    }
}
PortalHostDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cdkPortalHost], [portalHost]',
                inputs: ['portal: cdkPortalHost']
            },] }
];
/** @nocollapse */
PortalHostDirective.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef }
];
PortalHostDirective.propDecorators = {
    _deprecatedPortal: [{ type: Input, args: ['portalHost',] }]
};
class PortalModule {
}
PortalModule.decorators = [
    { type: NgModule, args: [{
                exports: [TemplatePortalDirective, PortalHostDirective],
                declarations: [TemplatePortalDirective, PortalHostDirective],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * OverlayState is a bag of values for either the initial configuration or current state of an
 * overlay.
 */
class OverlayState {
    constructor() {
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
}

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
class DomPortalHost extends BasePortalHost {
    /**
     * @param {?} _hostDomElement
     * @param {?} _componentFactoryResolver
     * @param {?} _appRef
     * @param {?} _defaultInjector
     */
    constructor(_hostDomElement, _componentFactoryResolver, _appRef, _defaultInjector) {
        super();
        this._hostDomElement = _hostDomElement;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._defaultInjector = _defaultInjector;
    }
    /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @template T
     * @param {?} portal Portal to be attached
     * @return {?}
     */
    attachComponentPortal(portal) {
        /** @type {?} */
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        /** @type {?} */
        let componentRef;
        // If the portal specifies a ViewContainerRef, we will use that as the attachment point
        // for the component (in terms of Angular's component tree, not rendering).
        // When the ViewContainerRef is missing, we use the factory to create the component directly
        // and then manually attach the view to the application.
        if (portal.viewContainerRef) {
            componentRef = portal.viewContainerRef.createComponent(componentFactory, portal.viewContainerRef.length, portal.injector || portal.viewContainerRef.parentInjector);
            this.setDisposeFn(() => componentRef.destroy());
        }
        else {
            componentRef = componentFactory.create(portal.injector || this._defaultInjector);
            this._appRef.attachView(componentRef.hostView);
            this.setDisposeFn(() => {
                this._appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            });
        }
        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));
        return componentRef;
    }
    /**
     * Attaches a template portal to the DOM as an embedded view.
     * @param {?} portal Portal to be attached.
     * @return {?}
     */
    attachTemplatePortal(portal) {
        /** @type {?} */
        let viewContainer = portal.viewContainerRef;
        /** @type {?} */
        let viewRef = viewContainer.createEmbeddedView(portal.templateRef);
        viewRef.detectChanges();
        // The method `createEmbeddedView` will add the view as a child of the viewContainer.
        // But for the DomPortalHost the view can be added everywhere in the DOM (e.g Overlay Container)
        // To move the view to the specified host element. We just re-append the existing root nodes.
        viewRef.rootNodes.forEach(rootNode => this._hostDomElement.appendChild(rootNode));
        this.setDisposeFn((() => {
            /** @type {?} */
            let index = viewContainer.indexOf(viewRef);
            if (index !== -1) {
                viewContainer.remove(index);
            }
        }));
        // TODO(jelbourn): Return locals from view.
        return new Map();
    }
    /**
     * Clears out a portal from the DOM.
     * @return {?}
     */
    dispose() {
        super.dispose();
        if (this._hostDomElement.parentNode != null) {
            this._hostDomElement.parentNode.removeChild(this._hostDomElement);
        }
    }
    /**
     * Gets the root HTMLElement for an instantiated component.
     * @param {?} componentRef
     * @return {?}
     */
    _getComponentRootNode(componentRef) {
        return /** @type {?} */ ((/** @type {?} */ (componentRef.hostView)).rootNodes[0]);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
class OverlayRef {
    /**
     * @param {?} _portalHost
     * @param {?} _pane
     * @param {?} _state
     * @param {?} _scrollStrategy
     * @param {?} _ngZone
     */
    constructor(_portalHost, _pane, _state, _scrollStrategy, _ngZone) {
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
    /**
     * The overlay's HTML element
     * @return {?}
     */
    get overlayElement() {
        return this._pane;
    }
    /**
     * Attaches the overlay to a portal instance and adds the backdrop.
     * @param {?} portal Portal instance to which to attach the overlay.
     * @return {?} The portal attachment result.
     */
    attach(portal) {
        /** @type {?} */
        let attachResult = this._portalHost.attach(portal);
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
    }
    /**
     * Detaches an overlay from a portal.
     * @return {?} Resolves when the overlay has been detached.
     */
    detach() {
        this.detachBackdrop();
        // When the overlay is detached, the pane element should disable pointer events.
        // This is necessary because otherwise the pane element will cover the page and disable
        // pointer events therefore. Depends on the position strategy and the applied pane boundaries.
        this._togglePointerEvents(false);
        this._scrollStrategy.disable();
        /** @type {?} */
        let detachmentResult = this._portalHost.detach();
        // Only emit after everything is detached.
        this._detachments.next();
        return detachmentResult;
    }
    /**
     * Cleans up the overlay from the DOM.
     * @return {?}
     */
    dispose() {
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
    }
    /**
     * Checks whether the overlay has been attached.
     * @return {?}
     */
    hasAttached() {
        return this._portalHost.hasAttached();
    }
    /**
     * Returns an observable that emits when the backdrop has been clicked.
     * @return {?}
     */
    backdropClick() {
        return this._backdropClick.asObservable();
    }
    /**
     * Returns an observable that emits when the overlay has been attached.
     * @return {?}
     */
    attachments() {
        return this._attachments.asObservable();
    }
    /**
     * Returns an observable that emits when the overlay has been detached.
     * @return {?}
     */
    detachments() {
        return this._detachments.asObservable();
    }
    /**
     * Gets the current state config of the overlay.
     * @return {?}
     */
    getState() {
        return this._state;
    }
    /**
     * Updates the position of the overlay based on the position strategy.
     * @return {?}
     */
    updatePosition() {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.apply(this._pane);
        }
    }
    /**
     * Updates the text direction of the overlay panel.
     * @return {?}
     */
    updateDirection() {
        this._pane.setAttribute('dir', this._state.direction);
    }
    /**
     * Updates the size of the overlay based on the overlay config.
     * @return {?}
     */
    updateSize() {
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
    }
    /**
     * Toggles the pointer events for the overlay pane element.
     * @param {?} enablePointer
     * @return {?}
     */
    _togglePointerEvents(enablePointer) {
        this._pane.style.pointerEvents = enablePointer ? 'auto' : 'none';
    }
    /**
     * Attaches a backdrop for this overlay.
     * @return {?}
     */
    _attachBackdrop() {
        this._backdropElement = document.createElement('div');
        this._backdropElement.classList.add('cdk-overlay-backdrop');
        this._backdropElement.classList.add(this._state.backdropClass);
        // Insert the backdrop before the pane in the DOM order,
        // in order to handle stacked overlays properly.
        this._pane.parentElement.insertBefore(this._backdropElement, this._pane);
        // Forward backdrop clicks such that the consumer of the overlay can perform whatever
        // action desired when such a click occurs (usually closing the overlay).
        this._backdropElement.addEventListener('click', () => this._backdropClick.next(null));
        // Add class to fade-in the backdrop after one frame.
        requestAnimationFrame(() => {
            if (this._backdropElement) {
                this._backdropElement.classList.add('cdk-overlay-backdrop-showing');
            }
        });
    }
    /**
     * Updates the stacking order of the element, moving it to the top if necessary.
     * This is required in cases where one overlay was detached, while another one,
     * that should be behind it, was destroyed. The next time both of them are opened,
     * the stacking will be wrong, because the detached element's pane will still be
     * in its original DOM position.
     * @return {?}
     */
    _updateStackingOrder() {
        if (this._pane.nextSibling) {
            this._pane.parentNode.appendChild(this._pane);
        }
    }
    /**
     * Detaches the backdrop (if any) associated with the overlay.
     * @return {?}
     */
    detachBackdrop() {
        /** @type {?} */
        let backdropToDetach = this._backdropElement;
        if (backdropToDetach) {
            /** @type {?} */
            let finishDetach = () => {
                // It may not be attached to anything in certain cases (e.g. unit tests).
                if (backdropToDetach && backdropToDetach.parentNode) {
                    backdropToDetach.parentNode.removeChild(backdropToDetach);
                }
                // It is possible that a new portal has been attached to this overlay since we started
                // removing the backdrop. If that is the case, only clear the backdrop reference if it
                // is still the same instance that we started to remove.
                if (this._backdropElement == backdropToDetach) {
                    this._backdropElement = null;
                }
            };
            backdropToDetach.classList.remove('cdk-overlay-backdrop-showing');
            backdropToDetach.classList.remove(this._state.backdropClass);
            backdropToDetach.addEventListener('transitionend', finishDetach);
            // If the backdrop doesn't have a transition, the `transitionend` event won't fire.
            // In this case we make it unclickable and we try to remove it after a delay.
            backdropToDetach.style.pointerEvents = 'none';
            // Run this outside the Angular zone because there's nothing that Angular cares about.
            // If it were to run inside the Angular zone, every test that used Overlay would have to be
            // either async or fakeAsync.
            this._ngZone.runOutsideAngular(() => {
                setTimeout(finishDetach, 500);
            });
        }
    }
}
/**
 * @param {?} value
 * @return {?}
 */
function formatCssUnit(value) {
    return typeof value === 'string' ? /** @type {?} */ (value) : `${value}px`;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * The points of the origin element and the overlay element to connect.
 */
class ConnectionPositionPair {
    /**
     * @param {?} origin
     * @param {?} overlay
     */
    constructor(origin, overlay) {
        this.originX = origin.originX;
        this.originY = origin.originY;
        this.overlayX = overlay.overlayX;
        this.overlayY = overlay.overlayY;
    }
}
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
class ScrollableViewProperties {
}
/**
 * The change event emitted by the strategy when a fallback position is used.
 */
class ConnectedOverlayPositionChange {
    /**
     * @param {?} connectionPair
     * @param {?} scrollableViewProperties
     */
    constructor(connectionPair, scrollableViewProperties) {
        this.connectionPair = connectionPair;
        this.scrollableViewProperties = scrollableViewProperties;
    }
}
/** @nocollapse */
ConnectedOverlayPositionChange.ctorParameters = () => [
    { type: ConnectionPositionPair },
    { type: ScrollableViewProperties, decorators: [{ type: Optional }] }
];

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
class ConnectedPositionStrategy {
    /**
     * @param {?} _connectedTo
     * @param {?} _originPos
     * @param {?} _overlayPos
     * @param {?} _viewportRuler
     */
    constructor(_connectedTo, _originPos, _overlayPos, _viewportRuler) {
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
    /**
     * Whether the we're dealing with an RTL context
     * @return {?}
     */
    get _isRtl() {
        return this._dir === 'rtl';
    }
    /**
     * Emits an event when the connection point changes.
     * @return {?}
     */
    get onPositionChange() {
        return this._onPositionChange.asObservable();
    }
    /**
     * Ordered list of preferred positions, from most to least desirable.
     * @return {?}
     */
    get positions() {
        return this._preferredPositions;
    }
    /**
     * To be used to for any cleanup after the element gets destroyed.
     * @return {?}
     */
    dispose() { }
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin fits on-screen.
     * \@docs-private
     *
     * @param {?} element Element to which to apply the CSS styles.
     * @return {?} Resolves when the styles have been applied.
     */
    apply(element) {
        // Cache the overlay pane element in case re-calculating position is necessary
        this._pane = element;
        /** @type {?} */
        const originRect = this._origin.getBoundingClientRect();
        /** @type {?} */
        const overlayRect = element.getBoundingClientRect();
        /** @type {?} */
        const viewportRect = this._viewportRuler.getViewportRect();
        /** @type {?} */
        let fallbackPoint = null;
        /** @type {?} */
        let fallbackPosition = null;
        // We want to place the overlay in the first of the preferred positions such that the
        // overlay fits on-screen.
        for (let pos of this._preferredPositions) {
            /** @type {?} */
            let originPoint = this._getOriginConnectionPoint(originRect, pos);
            /** @type {?} */
            let overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportRect, pos);
            // If the overlay in the calculated position fits on-screen, put it there and we're done.
            if (overlayPoint.fitsInViewport) {
                this._setElementPosition(element, overlayRect, overlayPoint, pos);
                // Save the last connected position in case the position needs to be re-calculated.
                this._lastConnectedPosition = pos;
                /** @type {?} */
                const scrollableViewProperties = this.getScrollableViewProperties(element);
                /** @type {?} */
                const positionChange = new ConnectedOverlayPositionChange(pos, scrollableViewProperties);
                this._onPositionChange.next(positionChange);
                return Promise.resolve(null);
            }
            else if (!fallbackPoint || fallbackPoint.visibleArea < overlayPoint.visibleArea) {
                fallbackPoint = overlayPoint;
                fallbackPosition = pos;
            }
        }
        // If none of the preferred positions were in the viewport, take the one
        // with the largest visible area.
        this._setElementPosition(element, overlayRect, fallbackPoint, fallbackPosition);
        return Promise.resolve(null);
    }
    /**
     * This re-aligns the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     * @return {?}
     */
    recalculateLastPosition() {
        /** @type {?} */
        const originRect = this._origin.getBoundingClientRect();
        /** @type {?} */
        const overlayRect = this._pane.getBoundingClientRect();
        /** @type {?} */
        const viewportRect = this._viewportRuler.getViewportRect();
        /** @type {?} */
        const lastPosition = this._lastConnectedPosition || this._preferredPositions[0];
        /** @type {?} */
        let originPoint = this._getOriginConnectionPoint(originRect, lastPosition);
        /** @type {?} */
        let overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportRect, lastPosition);
        this._setElementPosition(this._pane, overlayRect, overlayPoint, lastPosition);
    }
    /**
     * Sets the list of Scrollable containers that host the origin element so that
     * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
     * Scrollable must be an ancestor element of the strategy's origin element.
     * @param {?} scrollables
     * @return {?}
     */
    withScrollableContainers(scrollables) {
        this.scrollables = scrollables;
    }
    /**
     * Adds a new preferred fallback position.
     * @param {?} originPos
     * @param {?} overlayPos
     * @return {?}
     */
    withFallbackPosition(originPos, overlayPos) {
        this._preferredPositions.push(new ConnectionPositionPair(originPos, overlayPos));
        return this;
    }
    /**
     * Sets the layout direction so the overlay's position can be adjusted to match.
     * @param {?} dir New layout direction.
     * @return {?}
     */
    withDirection(dir) {
        this._dir = dir;
        return this;
    }
    /**
     * Sets an offset for the overlay's connection point on the x-axis
     * @param {?} offset New offset in the X axis.
     * @return {?}
     */
    withOffsetX(offset) {
        this._offsetX = offset;
        return this;
    }
    /**
     * Sets an offset for the overlay's connection point on the y-axis
     * @param {?} offset New offset in the Y axis.
     * @return {?}
     */
    withOffsetY(offset) {
        this._offsetY = offset;
        return this;
    }
    /**
     * Gets the horizontal (x) "start" dimension based on whether the overlay is in an RTL context.
     * @param {?} rect
     * @return {?}
     */
    _getStartX(rect) {
        return this._isRtl ? rect.right : rect.left;
    }
    /**
     * Gets the horizontal (x) "end" dimension based on whether the overlay is in an RTL context.
     * @param {?} rect
     * @return {?}
     */
    _getEndX(rect) {
        return this._isRtl ? rect.left : rect.right;
    }
    /**
     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
     * @param {?} originRect
     * @param {?} pos
     * @return {?}
     */
    _getOriginConnectionPoint(originRect, pos) {
        /** @type {?} */
        const originStartX = this._getStartX(originRect);
        /** @type {?} */
        const originEndX = this._getEndX(originRect);
        /** @type {?} */
        let x;
        if (pos.originX == 'center') {
            x = originStartX + (originRect.width / 2);
        }
        else {
            x = pos.originX == 'start' ? originStartX : originEndX;
        }
        /** @type {?} */
        let y;
        if (pos.originY == 'center') {
            y = originRect.top + (originRect.height / 2);
        }
        else {
            y = pos.originY == 'top' ? originRect.top : originRect.bottom;
        }
        return { x, y };
    }
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
    _getOverlayPoint(originPoint, overlayRect, viewportRect, pos) {
        /** @type {?} */
        let overlayStartX;
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
        let overlayStartY;
        if (pos.overlayY == 'center') {
            overlayStartY = -overlayRect.height / 2;
        }
        else {
            overlayStartY = pos.overlayY == 'top' ? 0 : -overlayRect.height;
        }
        /** @type {?} */
        let x = originPoint.x + overlayStartX + this._offsetX;
        /** @type {?} */
        let y = originPoint.y + overlayStartY + this._offsetY;
        /** @type {?} */
        let leftOverflow = 0 - x;
        /** @type {?} */
        let rightOverflow = (x + overlayRect.width) - viewportRect.width;
        /** @type {?} */
        let topOverflow = 0 - y;
        /** @type {?} */
        let bottomOverflow = (y + overlayRect.height) - viewportRect.height;
        /** @type {?} */
        let visibleWidth = this._subtractOverflows(overlayRect.width, leftOverflow, rightOverflow);
        /** @type {?} */
        let visibleHeight = this._subtractOverflows(overlayRect.height, topOverflow, bottomOverflow);
        /** @type {?} */
        let visibleArea = visibleWidth * visibleHeight;
        /** @type {?} */
        let fitsInViewport = (overlayRect.width * overlayRect.height) === visibleArea;
        return { x, y, fitsInViewport, visibleArea };
    }
    /**
     * Gets the view properties of the trigger and overlay, including whether they are clipped
     * or completely outside the view of any of the strategy's scrollables.
     * @param {?} overlay
     * @return {?}
     */
    getScrollableViewProperties(overlay) {
        /** @type {?} */
        const originBounds = this._getElementBounds(this._origin);
        /** @type {?} */
        const overlayBounds = this._getElementBounds(overlay);
        /** @type {?} */
        const scrollContainerBounds = this.scrollables.map((scrollable) => {
            return this._getElementBounds(scrollable.getElementRef().nativeElement);
        });
        return {
            isOriginClipped: this.isElementClipped(originBounds, scrollContainerBounds),
            isOriginOutsideView: this.isElementOutsideView(originBounds, scrollContainerBounds),
            isOverlayClipped: this.isElementClipped(overlayBounds, scrollContainerBounds),
            isOverlayOutsideView: this.isElementOutsideView(overlayBounds, scrollContainerBounds),
        };
    }
    /**
     * Whether the element is completely out of the view of any of the containers.
     * @param {?} elementBounds
     * @param {?} containersBounds
     * @return {?}
     */
    isElementOutsideView(elementBounds, containersBounds) {
        return containersBounds.some((containerBounds) => {
            /** @type {?} */
            const outsideAbove = elementBounds.bottom < containerBounds.top;
            /** @type {?} */
            const outsideBelow = elementBounds.top > containerBounds.bottom;
            /** @type {?} */
            const outsideLeft = elementBounds.right < containerBounds.left;
            /** @type {?} */
            const outsideRight = elementBounds.left > containerBounds.right;
            return outsideAbove || outsideBelow || outsideLeft || outsideRight;
        });
    }
    /**
     * Whether the element is clipped by any of the containers.
     * @param {?} elementBounds
     * @param {?} containersBounds
     * @return {?}
     */
    isElementClipped(elementBounds, containersBounds) {
        return containersBounds.some((containerBounds) => {
            /** @type {?} */
            const clippedAbove = elementBounds.top < containerBounds.top;
            /** @type {?} */
            const clippedBelow = elementBounds.bottom > containerBounds.bottom;
            /** @type {?} */
            const clippedLeft = elementBounds.left < containerBounds.left;
            /** @type {?} */
            const clippedRight = elementBounds.right > containerBounds.right;
            return clippedAbove || clippedBelow || clippedLeft || clippedRight;
        });
    }
    /**
     * Physically positions the overlay element to the given coordinate.
     * @param {?} element
     * @param {?} overlayRect
     * @param {?} overlayPoint
     * @param {?} pos
     * @return {?}
     */
    _setElementPosition(element, overlayRect, overlayPoint, pos) {
        /** @type {?} */
        let verticalStyleProperty = pos.overlayY === 'bottom' ? 'bottom' : 'top';
        /** @type {?} */
        let y = verticalStyleProperty === 'top' ?
            overlayPoint.y :
            document.documentElement.clientHeight - (overlayPoint.y + overlayRect.height);
        /** @type {?} */
        let horizontalStyleProperty;
        if (this._dir === 'rtl') {
            horizontalStyleProperty = pos.overlayX === 'end' ? 'left' : 'right';
        }
        else {
            horizontalStyleProperty = pos.overlayX === 'end' ? 'right' : 'left';
        }
        /** @type {?} */
        let x = horizontalStyleProperty === 'left' ?
            overlayPoint.x :
            document.documentElement.clientWidth - (overlayPoint.x + overlayRect.width);
        // Reset any existing styles. This is necessary in case the preferred position has
        // changed since the last `apply`.
        ['top', 'bottom', 'left', 'right'].forEach((p) => element.style[p] = null);
        element.style[verticalStyleProperty] = `${y}px`;
        element.style[horizontalStyleProperty] = `${x}px`;
    }
    /**
     * Returns the bounding positions of the provided element with respect to the viewport.
     * @param {?} element
     * @return {?}
     */
    _getElementBounds(element) {
        /** @type {?} */
        const boundingClientRect = element.getBoundingClientRect();
        return {
            top: boundingClientRect.top,
            right: boundingClientRect.left + boundingClientRect.width,
            bottom: boundingClientRect.top + boundingClientRect.height,
            left: boundingClientRect.left
        };
    }
    /**
     * Subtracts the amount that an element is overflowing on an axis from it's length.
     * @param {?} length
     * @param {...?} overflows
     * @return {?}
     */
    _subtractOverflows(length, ...overflows) {
        return overflows.reduce((currentValue, currentOverflow) => {
            return currentValue - Math.max(currentOverflow, 0);
        }, length);
    }
}

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
class GlobalPositionStrategy {
    constructor() {
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
     * @param {?} value New top offset.
     * @return {?}
     */
    top(value) {
        this._bottomOffset = '';
        this._topOffset = value;
        this._alignItems = 'flex-start';
        return this;
    }
    /**
     * Sets the left position of the overlay. Clears any previously set horizontal position.
     * @param {?} value New left offset.
     * @return {?}
     */
    left(value) {
        this._rightOffset = '';
        this._leftOffset = value;
        this._justifyContent = 'flex-start';
        return this;
    }
    /**
     * Sets the bottom position of the overlay. Clears any previously set vertical position.
     * @param {?} value New bottom offset.
     * @return {?}
     */
    bottom(value) {
        this._topOffset = '';
        this._bottomOffset = value;
        this._alignItems = 'flex-end';
        return this;
    }
    /**
     * Sets the right position of the overlay. Clears any previously set horizontal position.
     * @param {?} value New right offset.
     * @return {?}
     */
    right(value) {
        this._leftOffset = '';
        this._rightOffset = value;
        this._justifyContent = 'flex-end';
        return this;
    }
    /**
     * Sets the overlay width and clears any previously set width.
     * @param {?} value New width for the overlay
     * @return {?}
     */
    width(value) {
        this._width = value;
        // When the width is 100%, we should reset the `left` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.left('0px');
        }
        return this;
    }
    /**
     * Sets the overlay height and clears any previously set height.
     * @param {?} value New height for the overlay
     * @return {?}
     */
    height(value) {
        this._height = value;
        // When the height is 100%, we should reset the `top` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.top('0px');
        }
        return this;
    }
    /**
     * Centers the overlay horizontally with an optional offset.
     * Clears any previously set horizontal position.
     *
     * @param {?=} offset Overlay offset from the horizontal center.
     * @return {?}
     */
    centerHorizontally(offset = '') {
        this.left(offset);
        this._justifyContent = 'center';
        return this;
    }
    /**
     * Centers the overlay vertically with an optional offset.
     * Clears any previously set vertical position.
     *
     * @param {?=} offset Overlay offset from the vertical center.
     * @return {?}
     */
    centerVertically(offset = '') {
        this.top(offset);
        this._alignItems = 'center';
        return this;
    }
    /**
     * Apply the position to the element.
     * \@docs-private
     *
     * @param {?} element Element to which to apply the CSS.
     * @return {?} Resolved when the styles have been applied.
     */
    apply(element) {
        if (!this._wrapper) {
            this._wrapper = document.createElement('div');
            this._wrapper.classList.add('cdk-global-overlay-wrapper');
            element.parentNode.insertBefore(this._wrapper, element);
            this._wrapper.appendChild(element);
        }
        /** @type {?} */
        let styles = element.style;
        /** @type {?} */
        let parentStyles = (/** @type {?} */ (element.parentNode)).style;
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
    }
    /**
     * Removes the wrapper element from the DOM.
     * @return {?}
     */
    dispose() {
        if (this._wrapper && this._wrapper.parentNode) {
            this._wrapper.parentNode.removeChild(this._wrapper);
            this._wrapper = null;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Builder for overlay position strategy.
 */
class OverlayPositionBuilder {
    /**
     * @param {?} _viewportRuler
     */
    constructor(_viewportRuler) {
        this._viewportRuler = _viewportRuler;
    }
    /**
     * Creates a global position strategy.
     * @return {?}
     */
    global() {
        return new GlobalPositionStrategy();
    }
    /**
     * Creates a relative position strategy.
     * @param {?} elementRef
     * @param {?} originPos
     * @param {?} overlayPos
     * @return {?}
     */
    connectedTo(elementRef, originPos, overlayPos) {
        return new ConnectedPositionStrategy(elementRef, originPos, overlayPos, this._viewportRuler);
    }
}
OverlayPositionBuilder.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OverlayPositionBuilder.ctorParameters = () => [
    { type: ViewportRuler }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * The OverlayContainer is the container in which all overlays will load.
 * It should be provided in the root component to ensure it is properly shared.
 */
class OverlayContainer {
    /**
     * Base theme to be applied to all overlay-based components.
     * @return {?}
     */
    get themeClass() { return this._themeClass; }
    /**
     * @param {?} value
     * @return {?}
     */
    set themeClass(value) {
        if (this._containerElement) {
            this._containerElement.classList.remove(this._themeClass);
            if (value) {
                this._containerElement.classList.add(value);
            }
        }
        this._themeClass = value;
    }
    /**
     * This method returns the overlay container element.  It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @return {?} the container element
     */
    getContainerElement() {
        if (!this._containerElement) {
            this._createContainer();
        }
        return this._containerElement;
    }
    /**
     * Create the overlay container element, which is simply a div
     * with the 'cdk-overlay-container' class on the document body.
     * @return {?}
     */
    _createContainer() {
        /** @type {?} */
        let container = document.createElement('div');
        container.classList.add('cdk-overlay-container');
        if (this._themeClass) {
            container.classList.add(this._themeClass);
        }
        document.body.appendChild(container);
        this._containerElement = container;
    }
}
OverlayContainer.decorators = [
    { type: Injectable }
];
/**
 * @param {?} parentContainer
 * @return {?}
 */
function OVERLAY_CONTAINER_PROVIDER_FACTORY(parentContainer) {
    return parentContainer || new OverlayContainer();
}
/** @type {?} */
const OVERLAY_CONTAINER_PROVIDER = {
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
let nextUniqueId = 0;
/** *
 * The default state for newly created overlays.
  @type {?} */
let defaultState = new OverlayState();
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
class Overlay {
    /**
     * @param {?} scrollStrategies
     * @param {?} _overlayContainer
     * @param {?} _componentFactoryResolver
     * @param {?} _positionBuilder
     * @param {?} _appRef
     * @param {?} _injector
     * @param {?} _ngZone
     */
    constructor(scrollStrategies, _overlayContainer, _componentFactoryResolver, _positionBuilder, _appRef, _injector, _ngZone) {
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
     * @param {?=} state State to apply to the overlay.
     * @return {?} Reference to the created overlay.
     */
    create(state$$1 = defaultState) {
        return this._createOverlayRef(this._createPaneElement(), state$$1);
    }
    /**
     * Returns a position builder that can be used, via fluent API,
     * to construct and configure a position strategy.
     * @return {?}
     */
    position() {
        return this._positionBuilder;
    }
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @return {?} Newly-created pane element
     */
    _createPaneElement() {
        /** @type {?} */
        let pane = document.createElement('div');
        pane.id = `cdk-overlay-${nextUniqueId++}`;
        pane.classList.add('cdk-overlay-pane');
        this._overlayContainer.getContainerElement().appendChild(pane);
        return pane;
    }
    /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param {?} pane The DOM element to turn into a portal host.
     * @return {?} A portal host for the given DOM element.
     */
    _createPortalHost(pane) {
        return new DomPortalHost(pane, this._componentFactoryResolver, this._appRef, this._injector);
    }
    /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param {?} pane DOM element for the overlay
     * @param {?} state
     * @return {?}
     */
    _createOverlayRef(pane, state$$1) {
        /** @type {?} */
        let scrollStrategy = state$$1.scrollStrategy || this.scrollStrategies.noop();
        /** @type {?} */
        let portalHost = this._createPortalHost(pane);
        return new OverlayRef(portalHost, pane, state$$1, scrollStrategy, this._ngZone);
    }
}
Overlay.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Overlay.ctorParameters = () => [
    { type: ScrollStrategyOptions },
    { type: OverlayContainer },
    { type: ComponentFactoryResolver },
    { type: OverlayPositionBuilder },
    { type: ApplicationRef },
    { type: Injector },
    { type: NgZone }
];
/** *
 * Providers for Overlay and its related injectables.
  @type {?} */
const OVERLAY_PROVIDERS = [
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
let defaultPositionList = [
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
];
/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
class OverlayOrigin {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
OverlayOrigin.decorators = [
    { type: Directive, args: [{
                selector: '[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]',
                exportAs: 'cdkOverlayOrigin',
            },] }
];
/** @nocollapse */
OverlayOrigin.ctorParameters = () => [
    { type: ElementRef }
];
/**
 * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
 */
class ConnectedOverlayDirective {
    /**
     * @param {?} _overlay
     * @param {?} _renderer
     * @param {?} templateRef
     * @param {?} viewContainerRef
     * @param {?} _dir
     */
    constructor(_overlay, _renderer, templateRef, viewContainerRef, _dir) {
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
    /**
     * The offset in pixels for the overlay connection point on the x-axis
     * @return {?}
     */
    get offsetX() {
        return this._offsetX;
    }
    /**
     * @param {?} offsetX
     * @return {?}
     */
    set offsetX(offsetX) {
        this._offsetX = offsetX;
        if (this._position) {
            this._position.withOffsetX(offsetX);
        }
    }
    /**
     * The offset in pixels for the overlay connection point on the y-axis
     * @return {?}
     */
    get offsetY() {
        return this._offsetY;
    }
    /**
     * @param {?} offsetY
     * @return {?}
     */
    set offsetY(offsetY) {
        this._offsetY = offsetY;
        if (this._position) {
            this._position.withOffsetY(offsetY);
        }
    }
    /**
     * Whether or not the overlay should attach a backdrop.
     * @return {?}
     */
    get hasBackdrop() {
        return this._hasBackdrop;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hasBackdrop(value) {
        this._hasBackdrop = coerceBooleanProperty(value);
    }
    /**
     * The associated overlay reference.
     * @return {?}
     */
    get overlayRef() {
        return this._overlayRef;
    }
    /**
     * The element's layout direction.
     * @return {?}
     */
    get dir() {
        return this._dir ? this._dir.value : 'ltr';
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyOverlay();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['open']) {
            this.open ? this._attachOverlay() : this._detachOverlay();
        }
    }
    /**
     * Creates an overlay
     * @return {?}
     */
    _createOverlay() {
        if (!this.positions || !this.positions.length) {
            this.positions = defaultPositionList;
        }
        this._overlayRef = this._overlay.create(this._buildConfig());
    }
    /**
     * Builds the overlay config based on the directive's inputs
     * @return {?}
     */
    _buildConfig() {
        /** @type {?} */
        let overlayConfig = new OverlayState();
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
    }
    /**
     * Returns the position strategy of the overlay to be set on the overlay config
     * @return {?}
     */
    _createPositionStrategy() {
        /** @type {?} */
        const pos = this.positions[0];
        /** @type {?} */
        const originPoint = { originX: pos.originX, originY: pos.originY };
        /** @type {?} */
        const overlayPoint = { overlayX: pos.overlayX, overlayY: pos.overlayY };
        /** @type {?} */
        const strategy = this._overlay.position()
            .connectedTo(this.origin.elementRef, originPoint, overlayPoint)
            .withOffsetX(this.offsetX)
            .withOffsetY(this.offsetY);
        this._handlePositionChanges(strategy);
        return strategy;
    }
    /**
     * @param {?} strategy
     * @return {?}
     */
    _handlePositionChanges(strategy) {
        for (let i = 1; i < this.positions.length; i++) {
            strategy.withFallbackPosition({ originX: this.positions[i].originX, originY: this.positions[i].originY }, { overlayX: this.positions[i].overlayX, overlayY: this.positions[i].overlayY });
        }
        this._positionSubscription =
            strategy.onPositionChange.subscribe((pos) => this.positionChange.emit(pos));
    }
    /**
     * Attaches the overlay and subscribes to backdrop clicks if backdrop exists
     * @return {?}
     */
    _attachOverlay() {
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
            this._backdropSubscription = this._overlayRef.backdropClick().subscribe(() => {
                this.backdropClick.emit();
            });
        }
    }
    /**
     * Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists
     * @return {?}
     */
    _detachOverlay() {
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
    }
    /**
     * Destroys the overlay created by this directive.
     * @return {?}
     */
    _destroyOverlay() {
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
    }
    /**
     * Sets the event listener that closes the overlay when pressing Escape.
     * @return {?}
     */
    _initEscapeListener() {
        this._escapeListener = this._renderer.listen('document', 'keydown', (event) => {
            if (event.keyCode === ESCAPE) {
                this._detachOverlay();
            }
        });
    }
}
ConnectedOverlayDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]',
                exportAs: 'cdkConnectedOverlay'
            },] }
];
/** @nocollapse */
ConnectedOverlayDirective.ctorParameters = () => [
    { type: Overlay },
    { type: Renderer2 },
    { type: TemplateRef },
    { type: ViewContainerRef },
    { type: Dir, decorators: [{ type: Optional }] }
];
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
class OverlayModule {
}
OverlayModule.decorators = [
    { type: NgModule, args: [{
                imports: [PortalModule, ScrollDispatchModule],
                exports: [ConnectedOverlayDirective, OverlayOrigin, ScrollDispatchModule],
                declarations: [ConnectedOverlayDirective, OverlayOrigin],
                providers: [OVERLAY_PROVIDERS],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Utility for checking the interactivity of an element, such as whether is is focusable or
 * tabbable.
 */
class InteractivityChecker {
    /**
     * @param {?} _platform
     */
    constructor(_platform) {
        this._platform = _platform;
    }
    /**
     * Gets whether an element is disabled.
     *
     * @param {?} element Element to be checked.
     * @return {?} Whether the element is disabled.
     */
    isDisabled(element) {
        // This does not capture some cases, such as a non-form control with a disabled attribute or
        // a form control inside of a disabled form, but should capture the most common cases.
        return element.hasAttribute('disabled');
    }
    /**
     * Gets whether an element is visible for the purposes of interactivity.
     *
     * This will capture states like `display: none` and `visibility: hidden`, but not things like
     * being clipped by an `overflow: hidden` parent or being outside the viewport.
     *
     * @param {?} element
     * @return {?} Whether the element is visible.
     */
    isVisible(element) {
        return hasGeometry(element) && getComputedStyle(element).visibility === 'visible';
    }
    /**
     * Gets whether an element can be reached via Tab key.
     * Assumes that the element has already been checked with isFocusable.
     *
     * @param {?} element Element to be checked.
     * @return {?} Whether the element is tabbable.
     */
    isTabbable(element) {
        // Nothing is tabbable on the the server 😎
        if (!this._platform.isBrowser) {
            return false;
        }
        /** @type {?} */
        let frameElement = /** @type {?} */ (getWindow(element).frameElement);
        if (frameElement) {
            /** @type {?} */
            let frameType = frameElement && frameElement.nodeName.toLowerCase();
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
        let nodeName = element.nodeName.toLowerCase();
        /** @type {?} */
        let tabIndexValue = getTabIndexValue(element);
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
    }
    /**
     * Gets whether an element can be focused by the user.
     *
     * @param {?} element Element to be checked.
     * @return {?} Whether the element is focusable.
     */
    isFocusable(element) {
        // Perform checks in order of left to most expensive.
        // Again, naive approach that does not capture many edge cases and browser quirks.
        return isPotentiallyFocusable(element) && !this.isDisabled(element) && this.isVisible(element);
    }
}
InteractivityChecker.decorators = [
    { type: Injectable }
];
/** @nocollapse */
InteractivityChecker.ctorParameters = () => [
    { type: Platform }
];
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
    let nodeName = element.nodeName.toLowerCase();
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
    let tabIndex = element.getAttribute('tabindex');
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
    const tabIndex = parseInt(element.getAttribute('tabindex'), 10);
    return isNaN(tabIndex) ? -1 : tabIndex;
}
/**
 * Checks whether the specified element is potentially tabbable on iOS
 * @param {?} element
 * @return {?}
 */
function isPotentiallyTabbableIOS(element) {
    /** @type {?} */
    let nodeName = element.nodeName.toLowerCase();
    /** @type {?} */
    let inputType = nodeName === 'input' && (/** @type {?} */ (element)).type;
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
class FocusTrap {
    /**
     * @param {?} _element
     * @param {?} _platform
     * @param {?} _checker
     * @param {?} _ngZone
     * @param {?=} deferAnchors
     */
    constructor(_element, _platform, _checker, _ngZone, deferAnchors = false) {
        this._element = _element;
        this._platform = _platform;
        this._checker = _checker;
        this._ngZone = _ngZone;
        this._enabled = true;
        if (!deferAnchors) {
            this.attachAnchors();
        }
    }
    /**
     * Whether the focus trap is active.
     * @return {?}
     */
    get enabled() { return this._enabled; }
    /**
     * @param {?} val
     * @return {?}
     */
    set enabled(val) {
        this._enabled = val;
        if (this._startAnchor && this._endAnchor) {
            this._startAnchor.tabIndex = this._endAnchor.tabIndex = this._enabled ? 0 : -1;
        }
    }
    /**
     * Destroys the focus trap by cleaning up the anchors.
     * @return {?}
     */
    destroy() {
        if (this._startAnchor && this._startAnchor.parentNode) {
            this._startAnchor.parentNode.removeChild(this._startAnchor);
        }
        if (this._endAnchor && this._endAnchor.parentNode) {
            this._endAnchor.parentNode.removeChild(this._endAnchor);
        }
        this._startAnchor = this._endAnchor = null;
    }
    /**
     * Inserts the anchors into the DOM. This is usually done automatically
     * in the constructor, but can be deferred for cases like directives with `*ngIf`.
     * @return {?}
     */
    attachAnchors() {
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
        this._ngZone.runOutsideAngular(() => {
            this._startAnchor.addEventListener('focus', () => this.focusLastTabbableElement());
            this._endAnchor.addEventListener('focus', () => this.focusFirstTabbableElement());
            this._element.parentNode.insertBefore(this._startAnchor, this._element);
            this._element.parentNode.insertBefore(this._endAnchor, this._element.nextSibling);
        });
    }
    /**
     * Waits for the zone to stabilize, then either focuses the first element that the
     * user specified, or the first tabbable element..
     * @return {?}
     */
    focusInitialElementWhenReady() {
        this._executeOnStable(() => this.focusInitialElement());
    }
    /**
     * Waits for the zone to stabilize, then focuses
     * the first tabbable element within the focus trap region.
     * @return {?}
     */
    focusFirstTabbableElementWhenReady() {
        this._executeOnStable(() => this.focusFirstTabbableElement());
    }
    /**
     * Waits for the zone to stabilize, then focuses
     * the last tabbable element within the focus trap region.
     * @return {?}
     */
    focusLastTabbableElementWhenReady() {
        this._executeOnStable(() => this.focusLastTabbableElement());
    }
    /**
     * Get the specified boundary element of the trapped region.
     * @param {?} bound The boundary to get (start or end of trapped region).
     * @return {?} The boundary element.
     */
    _getRegionBoundary(bound) {
        /** @type {?} */
        let markers = /** @type {?} */ (this._element.querySelectorAll(`[cdk-focus-region-${bound}], ` +
            `[cdk-focus-${bound}]`));
        for (let i = 0; i < markers.length; i++) {
            if (markers[i].hasAttribute(`cdk-focus-${bound}`)) {
                console.warn(`Found use of deprecated attribute 'cdk-focus-${bound}',` +
                    ` use 'cdk-focus-region-${bound}' instead.`, markers[i]);
            }
        }
        if (bound == 'start') {
            return markers.length ? markers[0] : this._getFirstTabbableElement(this._element);
        }
        return markers.length ?
            markers[markers.length - 1] : this._getLastTabbableElement(this._element);
    }
    /**
     * Focuses the element that should be focused when the focus trap is initialized.
     * @return {?}
     */
    focusInitialElement() {
        /** @type {?} */
        let redirectToElement = /** @type {?} */ (this._element.querySelector('[cdk-focus-initial]'));
        if (redirectToElement) {
            redirectToElement.focus();
        }
        else {
            this.focusFirstTabbableElement();
        }
    }
    /**
     * Focuses the first tabbable element within the focus trap region.
     * @return {?}
     */
    focusFirstTabbableElement() {
        /** @type {?} */
        let redirectToElement = this._getRegionBoundary('start');
        if (redirectToElement) {
            redirectToElement.focus();
        }
    }
    /**
     * Focuses the last tabbable element within the focus trap region.
     * @return {?}
     */
    focusLastTabbableElement() {
        /** @type {?} */
        let redirectToElement = this._getRegionBoundary('end');
        if (redirectToElement) {
            redirectToElement.focus();
        }
    }
    /**
     * Get the first tabbable element from a DOM subtree (inclusive).
     * @param {?} root
     * @return {?}
     */
    _getFirstTabbableElement(root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        /** @type {?} */
        let children = root.children || root.childNodes;
        for (let i = 0; i < children.length; i++) {
            /** @type {?} */
            let tabbableChild = children[i].nodeType === Node.ELEMENT_NODE ?
                this._getFirstTabbableElement(/** @type {?} */ (children[i])) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    }
    /**
     * Get the last tabbable element from a DOM subtree (inclusive).
     * @param {?} root
     * @return {?}
     */
    _getLastTabbableElement(root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        /** @type {?} */
        let children = root.children || root.childNodes;
        for (let i = children.length - 1; i >= 0; i--) {
            /** @type {?} */
            let tabbableChild = children[i].nodeType === Node.ELEMENT_NODE ?
                this._getLastTabbableElement(/** @type {?} */ (children[i])) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    }
    /**
     * Creates an anchor element.
     * @return {?}
     */
    _createAnchor() {
        /** @type {?} */
        let anchor = document.createElement('div');
        anchor.tabIndex = this._enabled ? 0 : -1;
        anchor.classList.add('cdk-visually-hidden');
        anchor.classList.add('cdk-focus-trap-anchor');
        return anchor;
    }
    /**
     * Executes a function when the zone is stable.
     * @param {?} fn
     * @return {?}
     */
    _executeOnStable(fn) {
        if (this._ngZone.isStable) {
            fn();
        }
        else {
            this._ngZone.onStable.pipe(first()).subscribe(fn);
        }
    }
}
/**
 * Factory that allows easy instantiation of focus traps.
 */
class FocusTrapFactory {
    /**
     * @param {?} _checker
     * @param {?} _platform
     * @param {?} _ngZone
     */
    constructor(_checker, _platform, _ngZone) {
        this._checker = _checker;
        this._platform = _platform;
        this._ngZone = _ngZone;
    }
    /**
     * @param {?} element
     * @param {?=} deferAnchors
     * @return {?}
     */
    create(element, deferAnchors = false) {
        return new FocusTrap(element, this._platform, this._checker, this._ngZone, deferAnchors);
    }
}
FocusTrapFactory.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FocusTrapFactory.ctorParameters = () => [
    { type: InteractivityChecker },
    { type: Platform },
    { type: NgZone }
];
/**
 * Directive for trapping focus within a region.
 * @deprecated
 */
class FocusTrapDeprecatedDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _focusTrapFactory
     */
    constructor(_elementRef, _focusTrapFactory) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    /**
     * Whether the focus trap is active.
     * @return {?}
     */
    get disabled() { return !this.focusTrap.enabled; }
    /**
     * @param {?} val
     * @return {?}
     */
    set disabled(val) {
        this.focusTrap.enabled = !coerceBooleanProperty(val);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.focusTrap.destroy();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.focusTrap.attachAnchors();
    }
}
FocusTrapDeprecatedDirective.decorators = [
    { type: Directive, args: [{
                selector: 'cdk-focus-trap',
            },] }
];
/** @nocollapse */
FocusTrapDeprecatedDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusTrapFactory }
];
FocusTrapDeprecatedDirective.propDecorators = {
    disabled: [{ type: Input }]
};
/**
 * Directive for trapping focus within a region.
 */
class FocusTrapDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _focusTrapFactory
     */
    constructor(_elementRef, _focusTrapFactory) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    /**
     * Whether the focus trap is active.
     * @return {?}
     */
    get enabled() { return this.focusTrap.enabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set enabled(value) { this.focusTrap.enabled = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.focusTrap.destroy();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.focusTrap.attachAnchors();
    }
}
FocusTrapDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cdkTrapFocus]',
                exportAs: 'cdkTrapFocus',
            },] }
];
/** @nocollapse */
FocusTrapDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusTrapFactory }
];
FocusTrapDirective.propDecorators = {
    enabled: [{ type: Input, args: ['cdkTrapFocus',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const LIVE_ANNOUNCER_ELEMENT_TOKEN = new InjectionToken('liveAnnouncerElement');
class LiveAnnouncer {
    /**
     * @param {?} elementToken
     * @param {?} platform
     */
    constructor(elementToken, platform) {
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
     * @param {?} message Message to be announced to the screenreader
     * @param {?=} politeness The politeness of the announcer element
     * @return {?}
     */
    announce(message, politeness = 'polite') {
        this._liveElement.textContent = '';
        // TODO: ensure changing the politeness works on all environments we support.
        this._liveElement.setAttribute('aria-live', politeness);
        // This 100ms timeout is necessary for some browser + screen-reader combinations:
        // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
        // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
        //   second time without clearing and then using a non-zero delay.
        // (using JAWS 17 at time of this writing).
        setTimeout(() => this._liveElement.textContent = message, 100);
    }
    /**
     * Removes the aria-live element from the DOM.
     * @return {?}
     */
    _removeLiveElement() {
        if (this._liveElement && this._liveElement.parentNode) {
            this._liveElement.parentNode.removeChild(this._liveElement);
        }
    }
    /**
     * @return {?}
     */
    _createLiveElement() {
        /** @type {?} */
        let liveEl = document.createElement('div');
        liveEl.classList.add('cdk-visually-hidden');
        liveEl.setAttribute('aria-atomic', 'true');
        liveEl.setAttribute('aria-live', 'polite');
        document.body.appendChild(liveEl);
        return liveEl;
    }
}
LiveAnnouncer.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LiveAnnouncer.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LIVE_ANNOUNCER_ELEMENT_TOKEN,] }] },
    { type: Platform }
];
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
const LIVE_ANNOUNCER_PROVIDER = {
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
class A11yModule {
}
A11yModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, PlatformModule],
                declarations: [FocusTrapDirective, FocusTrapDeprecatedDirective],
                exports: [FocusTrapDirective, FocusTrapDeprecatedDirective],
                providers: [InteractivityChecker, FocusTrapFactory, LIVE_ANNOUNCER_PROVIDER]
            },] }
];

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
class FullscreenOverlayContainer extends OverlayContainer {
    /**
     * @return {?}
     */
    _createContainer() {
        super._createContainer();
        this._adjustParentForFullscreenChange();
        this._addFullscreenChangeListener(() => this._adjustParentForFullscreenChange());
    }
    /**
     * @return {?}
     */
    _adjustParentForFullscreenChange() {
        if (!this._containerElement) {
            return;
        }
        /** @type {?} */
        let fullscreenElement = this.getFullscreenElement();
        /** @type {?} */
        let parent = fullscreenElement || document.body;
        parent.appendChild(this._containerElement);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    _addFullscreenChangeListener(fn) {
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
    }
    /**
     * When the page is put into fullscreen mode, a specific element is specified.
     * Only that element and its children are visible when in fullscreen mode.
     * @return {?}
     */
    getFullscreenElement() {
        return document.fullscreenElement ||
            document.webkitFullscreenElement ||
            (/** @type {?} */ (document)).mozFullScreenElement ||
            (/** @type {?} */ (document)).msFullscreenElement ||
            null;
    }
}
FullscreenOverlayContainer.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class GestureConfig extends HammerGestureConfig {
    constructor() {
        super();
        this._hammer = typeof window !== 'undefined' ? (/** @type {?} */ (window)).Hammer : null;
        /* List of new event names to add to the gesture support list */
        this.events = this._hammer ? [
            'longpress',
            'slide',
            'slidestart',
            'slideend',
            'slideright',
            'slideleft'
        ] : [];
        if (!this._hammer && isDevMode()) {
            console.warn('Could not find HammerJS. Certain Angular Material ' +
                'components may not work correctly.');
        }
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
     * @param {?} element Element to which to assign the new HammerJS gestures.
     * @return {?} Newly-created HammerJS instance.
     */
    buildHammer(element) {
        /** @type {?} */
        const mc = new this._hammer(element);
        /** @type {?} */
        let pan = new this._hammer.Pan();
        /** @type {?} */
        let swipe = new this._hammer.Swipe();
        /** @type {?} */
        let press = new this._hammer.Press();
        /** @type {?} */
        let slide = this._createRecognizer(pan, { event: 'slide', threshold: 0 }, swipe);
        /** @type {?} */
        let longpress = this._createRecognizer(press, { event: 'longpress', time: 500 });
        // Overwrite the default `pan` event to use the swipe event.
        pan.recognizeWith(swipe);
        // Add customized gestures to Hammer manager
        mc.add([swipe, press, pan, slide, longpress]);
        return /** @type {?} */ (mc);
    }
    /**
     * Creates a new recognizer, without affecting the default recognizers of HammerJS
     * @param {?} base
     * @param {?} options
     * @param {...?} inheritances
     * @return {?}
     */
    _createRecognizer(base, options, ...inheritances) {
        /** @type {?} */
        let recognizer = new (/** @type {?} */ (base.constructor))(options);
        inheritances.push(base);
        inheritances.forEach(item => recognizer.recognizeWith(item));
        return recognizer;
    }
}
GestureConfig.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GestureConfig.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class to be used to power selecting one or more options from a list.
 * \@docs-private
 * @template T
 */
class SelectionModel {
    /**
     * @param {?=} _isMulti
     * @param {?=} initiallySelectedValues
     * @param {?=} _emitChanges
     */
    constructor(_isMulti = false, initiallySelectedValues, _emitChanges = true) {
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
                initiallySelectedValues.forEach(value => this._markSelected(value));
            }
            else {
                this._markSelected(initiallySelectedValues[0]);
            }
            // Clear the array in order to avoid firing the change event for preselected values.
            this._selectedToEmit.length = 0;
        }
    }
    /**
     * Selected value(s).
     * @return {?}
     */
    get selected() {
        if (!this._selected) {
            this._selected = Array.from(this._selection.values());
        }
        return this._selected;
    }
    /**
     * Selects a value or an array of values.
     * @param {?} value
     * @return {?}
     */
    select(value) {
        this._markSelected(value);
        this._emitChangeEvent();
    }
    /**
     * Deselects a value or an array of values.
     * @param {?} value
     * @return {?}
     */
    deselect(value) {
        this._unmarkSelected(value);
        this._emitChangeEvent();
    }
    /**
     * Toggles a value between selected and deselected.
     * @param {?} value
     * @return {?}
     */
    toggle(value) {
        this.isSelected(value) ? this.deselect(value) : this.select(value);
    }
    /**
     * Clears all of the selected values.
     * @return {?}
     */
    clear() {
        this._unmarkAll();
        this._emitChangeEvent();
    }
    /**
     * Determines whether a value is selected.
     * @param {?} value
     * @return {?}
     */
    isSelected(value) {
        return this._selection.has(value);
    }
    /**
     * Determines whether the model does not have a value.
     * @return {?}
     */
    isEmpty() {
        return this._selection.size === 0;
    }
    /**
     * Determines whether the model has a value.
     * @return {?}
     */
    hasValue() {
        return !this.isEmpty();
    }
    /**
     * Sorts the selected values based on a predicate function.
     * @param {?=} predicate
     * @return {?}
     */
    sort(predicate) {
        if (this._isMulti && this.selected) {
            this._selected.sort(predicate);
        }
    }
    /**
     * Emits a change event and clears the records of selected and deselected values.
     * @return {?}
     */
    _emitChangeEvent() {
        if (this._selectedToEmit.length || this._deselectedToEmit.length) {
            /** @type {?} */
            let eventData = new SelectionChange(this._selectedToEmit, this._deselectedToEmit);
            this.onChange.next(eventData);
            this._deselectedToEmit = [];
            this._selectedToEmit = [];
        }
        this._selected = null;
    }
    /**
     * Selects a value.
     * @param {?} value
     * @return {?}
     */
    _markSelected(value) {
        if (!this.isSelected(value)) {
            if (!this._isMulti) {
                this._unmarkAll();
            }
            this._selection.add(value);
            if (this._emitChanges) {
                this._selectedToEmit.push(value);
            }
        }
    }
    /**
     * Deselects a value.
     * @param {?} value
     * @return {?}
     */
    _unmarkSelected(value) {
        if (this.isSelected(value)) {
            this._selection.delete(value);
            if (this._emitChanges) {
                this._deselectedToEmit.push(value);
            }
        }
    }
    /**
     * Clears out the selected values.
     * @return {?}
     */
    _unmarkAll() {
        if (!this.isEmpty()) {
            this._selection.forEach(value => this._unmarkSelected(value));
        }
    }
}
/**
 * Describes an event emitted when the value of a MdSelectionModel has changed.
 * \@docs-private
 * @template T
 */
class SelectionChange {
    /**
     * @param {?=} added
     * @param {?=} removed
     */
    constructor(added, removed) {
        this.added = added;
        this.removed = removed;
    }
}

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
class UniqueSelectionDispatcher {
    constructor() {
        this._listeners = [];
    }
    /**
     * Notify other items that selection for the given name has been set.
     * @param {?} id ID of the item.
     * @param {?} name Name of the item.
     * @return {?}
     */
    notify(id, name) {
        for (let listener of this._listeners) {
            listener(id, name);
        }
    }
    /**
     * Listen for future changes to item selection.
     * @param {?} listener
     * @return {?}
     */
    listen(listener) {
        this._listeners.push(listener);
    }
}
UniqueSelectionDispatcher.decorators = [
    { type: Injectable }
];
/**
 * @param {?} parentDispatcher
 * @return {?}
 */
function UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY(parentDispatcher) {
    return parentDispatcher || new UniqueSelectionDispatcher();
}
/** @type {?} */
const UNIQUE_SELECTION_DISPATCHER_PROVIDER = {
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
const TOUCH_BUFFER_MS = 650;
/**
 * Monitors mouse and keyboard events to determine the cause of focus events.
 */
class FocusOriginMonitor {
    /**
     * @param {?} _ngZone
     * @param {?} _platform
     */
    constructor(_ngZone, _platform) {
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
        this._ngZone.runOutsideAngular(() => this._registerDocumentEvents());
    }
    /**
     * Monitors focus on an element and applies appropriate CSS classes.
     * @param {?} element The element to monitor
     * @param {?} renderer The renderer to use to apply CSS classes to the element.
     * @param {?} checkChildren Whether to count the element as focused when its children are focused.
     * @return {?} An observable that emits when the focus state of the element changes.
     *     When the element is blurred, null will be emitted.
     */
    monitor(element, renderer, checkChildren) {
        // Do nothing if we're not on the browser platform.
        if (!this._platform.isBrowser) {
            return of();
        }
        // Check if we're already monitoring this element.
        if (this._elementInfo.has(element)) {
            /** @type {?} */
            let info = this._elementInfo.get(element);
            info.checkChildren = checkChildren;
            return info.subject.asObservable();
        }
        /** @type {?} */
        let info = {
            unlisten: null,
            checkChildren: checkChildren,
            renderer: renderer,
            subject: new Subject()
        };
        this._elementInfo.set(element, info);
        /** @type {?} */
        let focusListener = (event) => this._onFocus(event, element);
        /** @type {?} */
        let blurListener = (event) => this._onBlur(event, element);
        this._ngZone.runOutsideAngular(() => {
            element.addEventListener('focus', focusListener, true);
            element.addEventListener('blur', blurListener, true);
        });
        // Create an unlisten function for later.
        info.unlisten = () => {
            element.removeEventListener('focus', focusListener, true);
            element.removeEventListener('blur', blurListener, true);
        };
        return info.subject.asObservable();
    }
    /**
     * Stops monitoring an element and removes all focus classes.
     * @param {?} element The element to stop monitoring.
     * @return {?}
     */
    stopMonitoring(element) {
        /** @type {?} */
        let elementInfo = this._elementInfo.get(element);
        if (elementInfo) {
            elementInfo.unlisten();
            elementInfo.subject.complete();
            this._setClasses(element, null);
            this._elementInfo.delete(element);
        }
    }
    /**
     * Focuses the element via the specified focus origin.
     * @param {?} element The element to focus.
     * @param {?} origin The focus origin.
     * @return {?}
     */
    focusVia(element, origin) {
        this._setOriginForCurrentEventQueue(origin);
        element.focus();
    }
    /**
     * Register necessary event listeners on the document and window.
     * @return {?}
     */
    _registerDocumentEvents() {
        // Do nothing if we're not on the browser platform.
        if (!this._platform.isBrowser) {
            return;
        }
        // Note: we listen to events in the capture phase so we can detect them even if the user stops
        // propagation.
        // On keydown record the origin and clear any touch event that may be in progress.
        document.addEventListener('keydown', () => {
            this._lastTouchTarget = null;
            this._setOriginForCurrentEventQueue('keyboard');
        }, true);
        // On mousedown record the origin only if there is not touch target, since a mousedown can
        // happen as a result of a touch event.
        document.addEventListener('mousedown', () => {
            if (!this._lastTouchTarget) {
                this._setOriginForCurrentEventQueue('mouse');
            }
        }, true);
        // When the touchstart event fires the focus event is not yet in the event queue. This means
        // we can't rely on the trick used above (setting timeout of 0ms). Instead we wait 650ms to
        // see if a focus happens.
        document.addEventListener('touchstart', (event) => {
            if (this._touchTimeout != null) {
                clearTimeout(this._touchTimeout);
            }
            this._lastTouchTarget = event.target;
            this._touchTimeout = setTimeout(() => this._lastTouchTarget = null, TOUCH_BUFFER_MS);
        }, true);
        // Make a note of when the window regains focus, so we can restore the origin info for the
        // focused element.
        window.addEventListener('focus', () => {
            this._windowFocused = true;
            setTimeout(() => this._windowFocused = false, 0);
        });
    }
    /**
     * Sets the focus classes on the element based on the given focus origin.
     * @param {?} element The element to update the classes on.
     * @param {?} origin The focus origin.
     * @return {?}
     */
    _setClasses(element, origin) {
        /** @type {?} */
        let renderer = this._elementInfo.get(element).renderer;
        /** @type {?} */
        let toggleClass = (className, shouldSet) => {
            shouldSet ? renderer.addClass(element, className) : renderer.removeClass(element, className);
        };
        toggleClass('cdk-focused', !!origin);
        toggleClass('cdk-touch-focused', origin === 'touch');
        toggleClass('cdk-keyboard-focused', origin === 'keyboard');
        toggleClass('cdk-mouse-focused', origin === 'mouse');
        toggleClass('cdk-program-focused', origin === 'program');
    }
    /**
     * Sets the origin and schedules an async function to clear it at the end of the event queue.
     * @param {?} origin The origin to set.
     * @return {?}
     */
    _setOriginForCurrentEventQueue(origin) {
        this._origin = origin;
        setTimeout(() => this._origin = null, 0);
    }
    /**
     * Checks whether the given focus event was caused by a touchstart event.
     * @param {?} event The focus event to check.
     * @return {?} Whether the event was caused by a touch.
     */
    _wasCausedByTouch(event) {
        /** @type {?} */
        let focusTarget = event.target;
        return this._lastTouchTarget instanceof Node && focusTarget instanceof Node &&
            (focusTarget === this._lastTouchTarget || focusTarget.contains(this._lastTouchTarget));
    }
    /**
     * Handles focus events on a registered element.
     * @param {?} event The focus event.
     * @param {?} element The monitored element.
     * @return {?}
     */
    _onFocus(event, element) {
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
    }
    /**
     * Handles blur events on a registered element.
     * @param {?} event The blur event.
     * @param {?} element The monitored element.
     * @return {?}
     */
    _onBlur(event, element) {
        // If we are counting child-element-focus as focused, make sure that we aren't just blurring in
        // order to focus another child of the monitored element.
        if (this._elementInfo.get(element).checkChildren && event.relatedTarget instanceof Node &&
            element.contains(event.relatedTarget)) {
            return;
        }
        this._setClasses(element, null);
        this._elementInfo.get(element).subject.next(null);
    }
}
FocusOriginMonitor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FocusOriginMonitor.ctorParameters = () => [
    { type: NgZone },
    { type: Platform }
];
/**
 * Directive that determines how a particular element was focused (via keyboard, mouse, touch, or
 * programmatically) and adds corresponding classes to the element.
 *
 * There are two variants of this directive:
 * 1) cdkMonitorElementFocus: does not consider an element to be focused if one of its children is
 *    focused.
 * 2) cdkMonitorSubtreeFocus: considers an element focused if it or any of its children are focused.
 */
class CdkMonitorFocus {
    /**
     * @param {?} _elementRef
     * @param {?} _focusOriginMonitor
     * @param {?} renderer
     */
    constructor(_elementRef, _focusOriginMonitor, renderer) {
        this._elementRef = _elementRef;
        this._focusOriginMonitor = _focusOriginMonitor;
        this.cdkFocusChange = new EventEmitter();
        this._focusOriginMonitor.monitor(this._elementRef.nativeElement, renderer, this._elementRef.nativeElement.hasAttribute('cdkMonitorSubtreeFocus'))
            .subscribe(origin => this.cdkFocusChange.emit(origin));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusOriginMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
}
CdkMonitorFocus.decorators = [
    { type: Directive, args: [{
                selector: '[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]',
            },] }
];
/** @nocollapse */
CdkMonitorFocus.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusOriginMonitor },
    { type: Renderer2 }
];
CdkMonitorFocus.propDecorators = {
    cdkFocusChange: [{ type: Output }]
};
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
const FOCUS_ORIGIN_MONITOR_PROVIDER = {
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
    let value = transformValue.trim();
    element.style.transform = value;
    element.style.webkitTransform = value;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class StyleModule {
}
StyleModule.decorators = [
    { type: NgModule, args: [{
                imports: [PlatformModule],
                declarations: [CdkMonitorFocus],
                exports: [CdkMonitorFocus],
                providers: [FOCUS_ORIGIN_MONITOR_PROVIDER],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * \@docs-private
 */
class AnimationCurves {
}
AnimationCurves.STANDARD_CURVE = 'cubic-bezier(0.4,0.0,0.2,1)';
AnimationCurves.DECELERATION_CURVE = 'cubic-bezier(0.0,0.0,0.2,1)';
AnimationCurves.ACCELERATION_CURVE = 'cubic-bezier(0.4,0.0,1,1)';
AnimationCurves.SHARP_CURVE = 'cubic-bezier(0.4,0.0,0.6,1)';
/**
 * \@docs-private
 */
class AnimationDurations {
}
AnimationDurations.COMPLEX = '375ms';
AnimationDurations.ENTERING = '225ms';
AnimationDurations.EXITING = '195ms';

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
function coerceNumberProperty(value, fallbackValue = 0) {
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
class DateAdapter {
    /**
     * Sets the locale used for all dates.
     * @param {?} locale The new locale.
     * @return {?}
     */
    setLocale(locale) {
        this.locale = locale;
    }
    /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    compareDate(first$$1, second) {
        return this.getYear(first$$1) - this.getYear(second) ||
            this.getMonth(first$$1) - this.getMonth(second) ||
            this.getDate(first$$1) - this.getDate(second);
    }
    /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    sameDate(first$$1, second) {
        return first$$1 && second ? !this.compareDate(first$$1, second) : first$$1 == second;
    }
    /**
     * Clamp the given date between min and max dates.
     * @param {?} date The date to clamp.
     * @param {?=} min The minimum value to allow. If null or omitted no min is enforced.
     * @param {?=} max The maximum value to allow. If null or omitted no max is enforced.
     * @return {?} `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    clampDate(date, min, max) {
        if (min && this.compareDate(date, min) < 0) {
            return min;
        }
        if (max && this.compareDate(date, max) > 0) {
            return max;
        }
        return date;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Whether the browser supports the Intl API.
  @type {?} */
const SUPPORTS_INTL_API = typeof Intl != 'undefined';
/** *
 * The default month names to use if Intl API is not available.
  @type {?} */
const DEFAULT_MONTH_NAMES = {
    'long': [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'
    ],
    'short': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    'narrow': ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
};
const ɵ0 = i => String(i + 1);
/** *
 * The default date names to use if Intl API is not available.
  @type {?} */
const DEFAULT_DATE_NAMES = range(31, ɵ0);
/** *
 * The default day of the week names to use if Intl API is not available.
  @type {?} */
const DEFAULT_DAY_OF_WEEK_NAMES = {
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
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
/**
 * Adapts the native JS Date for use with cdk-based components that work with dates.
 */
class NativeDateAdapter extends DateAdapter {
    /**
     * @param {?} date
     * @return {?}
     */
    getYear(date) {
        return date.getFullYear();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMonth(date) {
        return date.getMonth();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDate(date) {
        return date.getDate();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayOfWeek(date) {
        return date.getDay();
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getMonthNames(style$$1) {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            let dtf = new Intl.DateTimeFormat(this.locale, { month: style$$1 });
            return range(12, i => this._stripDirectionalityCharacters(dtf.format(new Date(2017, i, 1))));
        }
        return DEFAULT_MONTH_NAMES[style$$1];
    }
    /**
     * @return {?}
     */
    getDateNames() {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            let dtf = new Intl.DateTimeFormat(this.locale, { day: 'numeric' });
            return range(31, i => this._stripDirectionalityCharacters(dtf.format(new Date(2017, 0, i + 1))));
        }
        return DEFAULT_DATE_NAMES;
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getDayOfWeekNames(style$$1) {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            let dtf = new Intl.DateTimeFormat(this.locale, { weekday: style$$1 });
            return range(7, i => this._stripDirectionalityCharacters(dtf.format(new Date(2017, 0, i + 1))));
        }
        return DEFAULT_DAY_OF_WEEK_NAMES[style$$1];
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYearName(date) {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            let dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric' });
            return this._stripDirectionalityCharacters(dtf.format(date));
        }
        return String(this.getYear(date));
    }
    /**
     * @return {?}
     */
    getFirstDayOfWeek() {
        // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
        return 0;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getNumDaysInMonth(date) {
        return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
    }
    /**
     * @param {?} date
     * @return {?}
     */
    clone(date) {
        return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date));
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    createDate(year, month, date) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11 || date < 1) {
            return null;
        }
        /** @type {?} */
        let result = this._createDateWithOverflow(year, month, date);
        // Check that the date wasn't above the upper bound for the month, causing the month to
        // overflow.
        if (result.getMonth() != month) {
            return null;
        }
        return result;
    }
    /**
     * @return {?}
     */
    today() {
        return new Date();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    parse(value) {
        /** @type {?} */
        let timestamp = typeof value == 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    }
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    format(date, displayFormat) {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            let dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
            return this._stripDirectionalityCharacters(dtf.format(date));
        }
        return this._stripDirectionalityCharacters(date.toDateString());
    }
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    addCalendarYears(date, years) {
        return this.addCalendarMonths(date, years * 12);
    }
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    addCalendarMonths(date, months) {
        /** @type {?} */
        let newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date));
        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
        // guarantee this.
        if (this.getMonth(newDate) != ((this.getMonth(date) + months) % 12 + 12) % 12) {
            newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0);
        }
        return newDate;
    }
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    addCalendarDays(date, days) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getISODateString(date) {
        return [
            date.getUTCFullYear(),
            this._2digit(date.getUTCMonth() + 1),
            this._2digit(date.getUTCDate())
        ].join('-');
    }
    /**
     * Creates a date but allows the month and date to overflow.
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    _createDateWithOverflow(year, month, date) {
        /** @type {?} */
        let result = new Date(year, month, date);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    }
    /**
     * Pads a number to make it two digits.
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    _2digit(n) {
        return ('00' + n).slice(-2);
    }
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param {?} s The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    _stripDirectionalityCharacters(s) {
        return s.replace(/[\u200e\u200f]/g, '');
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const MD_DATE_FORMATS = new InjectionToken('md-date-formats');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const MD_NATIVE_DATE_FORMATS = {
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
class NativeDateModule {
}
NativeDateModule.decorators = [
    { type: NgModule, args: [{
                providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }],
            },] }
];
const ɵ0$1 = MD_NATIVE_DATE_FORMATS;
class MdNativeDateModule {
}
MdNativeDateModule.decorators = [
    { type: NgModule, args: [{
                imports: [NativeDateModule],
                providers: [{ provide: MD_DATE_FORMATS, useValue: ɵ0$1 }],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * InjectionToken that can be used to specify the global placeholder options.
  @type {?} */
const MD_PLACEHOLDER_GLOBAL_OPTIONS = new InjectionToken('md-placeholder-global-options');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class MdCoreModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Md2Accordion {
    constructor() {
        this.close = new EventEmitter();
        this.open = new EventEmitter();
        this.tabs = [];
    }
    /**
     * @return {?}
     */
    get multiple() { return this._multiple; }
    /**
     * @param {?} value
     * @return {?}
     */
    set multiple(value) { this._multiple = coerceBooleanProperty(value); }
    /**
     * Add or append tab in accordion
     * @param {?} tab object of Md2AccordionTab
     * @return {?}
     */
    addTab(tab) {
        this.tabs.push(tab);
    }
}
Md2Accordion.decorators = [
    { type: Component, args: [{
                selector: 'md2-accordion',
                template: `<ng-content></ng-content>`,
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Md2AccordionHeader {
}
Md2AccordionHeader.decorators = [
    { type: Directive, args: [{ selector: 'md2-accordion-header' },] }
];
class Md2AccordionTab {
    /**
     * @param {?} _accordion
     */
    constructor(_accordion) {
        this._accordion = _accordion;
        this._disabled = false;
        this._active = false;
        this._accordion.addTab(this);
    }
    /**
     * @return {?}
     */
    get active() { return this._active; }
    /**
     * @param {?} value
     * @return {?}
     */
    set active(value) {
        this._active = coerceBooleanProperty(value);
        if (this._active && !this._accordion.multiple) {
            for (let i = 0; i < this._accordion.tabs.length; i++) {
                if (this._accordion.tabs[i] !== this) {
                    this._accordion.tabs[i].active = false;
                }
            }
        }
    }
    /**
     * @return {?}
     */
    get slide() {
        return this.active ? 'down' : 'up';
    }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * Toggle the accordion
     * @param {?} event
     * @return {?} if it is disabled
     */
    _handleClick(event) {
        if (this.disabled) {
            return;
        }
        /** @type {?} */
        let index = this.findTabIndex();
        if (this.active) {
            this.active = !this.active;
            this._accordion.close.emit({ originalEvent: event, index: index });
        }
        else if (!this._accordion.multiple) {
            for (let i = 0; i < this._accordion.tabs.length; i++) {
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
    }
    /**
     * Find index of specific tab of accordion
     * @return {?} index number of this tab
     */
    findTabIndex() {
        /** @type {?} */
        let index = -1;
        for (let i = 0; i < this._accordion.tabs.length; i++) {
            if (this._accordion.tabs[i] === this) {
                index = i;
                break;
            }
        }
        return index;
    }
}
Md2AccordionTab.decorators = [
    { type: Component, args: [{
                selector: 'md2-accordion-tab',
                template: `
    <div class="md2-accordion-header" (click)="_handleClick($event)">
      <span>{{header}}</span>
      <ng-content select="md2-accordion-header"></ng-content>
      <span class="md2-accordion-header-icon"></span>
    </div>
    <div class="md2-accordion-tab-body" [@slide]="slide">
      <div class="md2-accordion-tab-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
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
Md2AccordionTab.ctorParameters = () => [
    { type: Md2Accordion }
];
Md2AccordionTab.propDecorators = {
    header: [{ type: Input }],
    active: [{ type: Input }],
    disabled: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Md2AccordionModule {
}
Md2AccordionModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Md2Accordion, Md2AccordionTab, Md2AccordionHeader],
                declarations: [Md2Accordion, Md2AccordionTab, Md2AccordionHeader],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class HighlightPipe {
    /**
     * Transform function
     * @param {?} value string
     * @param {?} query string filter value
     * @return {?} filtered string with markup
     */
    transform(value, query) {
        if (query.length < 1) {
            return value;
        }
        return query ? value.replace(new RegExp(this._escapeRegexp(query), 'gi'), '<span class="highlight">$&</span>') : value;
    }
    /**
     * filter pipe
     * @param {?} queryToEscape
     * @return {?} queryToEscape with replace string
     */
    _escapeRegexp(queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }
}
HighlightPipe.decorators = [
    { type: Pipe, args: [{ name: 'highlight' },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Item {
    /**
     * @param {?} source
     * @param {?} textKey
     * @param {?} valueKey
     */
    constructor(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
}
/** @type {?} */
let nextId = 0;
/** @type {?} */
const MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Md2Autocomplete),
    multi: true
};
/**
 * Change event object emitted by Md2Autocomplete.
 */
class Md2AutocompleteChange {
}
class Md2Autocomplete {
    /**
     * @param {?} _element
     */
    constructor(_element) {
        this._element = _element;
        this.change = new EventEmitter();
        this.textChange = new EventEmitter();
        this._value = '';
        this._readonly = false;
        this._required = false;
        this._disabled = false;
        this._isInitialized = false;
        this._onChange = () => { };
        this._onTouched = () => { };
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
    ngAfterContentInit() { this._isInitialized = true; }
    /**
     * @return {?}
     */
    get readonly() { return this._readonly; }
    /**
     * @param {?} value
     * @return {?}
     */
    set readonly(value) { this._readonly = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get required() { return this._required; }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) { this._required = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    set items(value) { this._items = value; }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (value !== this._value) {
            this._value = value;
            this._inputValue = '';
            if (value) {
                /** @type {?} */
                let selItm = this._items.find((i) => this.equals(this.valueKey ?
                    i[this.valueKey] : i, value));
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
    }
    /**
     * Compare two vars or objects
     * @param {?} o1 compare first object
     * @param {?} o2 compare second object
     * @return {?} boolean comparation result
     */
    equals(o1, o2) {
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
        let t1 = typeof o1;
        /** @type {?} */
        let t2 = typeof o2;
        /** @type {?} */
        let key;
        /** @type {?} */
        let keySet;
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
    }
    /**
     * @return {?}
     */
    get isMenuVisible() {
        return ((this._inputFocused || this.noBlur) && this._list && this._list.length &&
            !this.selectedItem) && !this.readonly ? true : false;
    }
    /**
     * update scroll of suggestion menu
     * @return {?}
     */
    updateScroll() {
        if (this._focusedOption < 0) {
            return;
        }
        /** @type {?} */
        let menuContainer = this._element.nativeElement.querySelector('.md2-autocomplete-menu');
        if (!menuContainer) {
            return;
        }
        /** @type {?} */
        let choices = menuContainer.querySelectorAll('.md2-option');
        if (choices.length < 1) {
            return;
        }
        /** @type {?} */
        let highlighted = choices[this._focusedOption];
        if (!highlighted) {
            return;
        }
        /** @type {?} */
        let top = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
        /** @type {?} */
        let height = menuContainer.offsetHeight;
        if (top > height) {
            menuContainer.scrollTop += top - height;
        }
        else if (top < highlighted.clientHeight) {
            menuContainer.scrollTop -= highlighted.clientHeight - top;
        }
    }
    /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    _handleKeyup(event) {
        this.textChange.emit(this._inputValue);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleKeydown(event) {
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
                setTimeout(() => {
                    this.updateItems();
                }, 10);
        }
    }
    /**
     * select option
     * @param {?} event
     * @param {?} index of selected item
     * @return {?}
     */
    _selectOption(event, index) {
        event.preventDefault();
        event.stopPropagation();
        this.selectedItem = this._list[index];
        this._inputValue = this._list[index].text;
        this.updateValue();
        this._handleMouseLeave();
    }
    /**
     * clear selected suggestion
     * @return {?}
     */
    _onClear() {
        if (this.disabled) {
            return;
        }
        this._inputValue = '';
        this.selectedItem = null;
        this.updateItems();
        this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
        this.updateValue();
    }
    /**
     * update value
     * @return {?}
     */
    updateValue() {
        this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
        this._emitChangeEvent();
        this.onFocus();
    }
    /**
     * component focus listener
     * @return {?}
     */
    onFocus() {
        if (this.disabled) {
            return;
        }
        this._element.nativeElement.querySelector('input').focus();
    }
    /**
     * input focus listener
     * @return {?}
     */
    _handleFocus() {
        this._inputFocused = true;
        this.updateItems();
        this._focusedOption = 0;
    }
    /**
     * input blur listener
     * @return {?}
     */
    _handleBlur() {
        this._inputFocused = false;
        this._onTouched();
    }
    /**
     * suggestion menu mouse enter listener
     * @return {?}
     */
    _handleMouseEnter() { this.noBlur = true; }
    /**
     * suggestion menu mouse leave listener
     * @return {?}
     */
    _handleMouseLeave() { this.noBlur = false; }
    /**
     * Update suggestion to filter the query
     * @return {?}
     */
    updateItems() {
        if (this._inputValue.length < this.minLength) {
            this._list = [];
        }
        else {
            this._list = this._items.map((i) => new Item(i, this.textKey, this.valueKey)).filter(i => new RegExp(this._inputValue.trim(), 'ig').test(i.text));
            if (this._list.length && this._list[0].text !== this._inputValue) {
                this.selectedItem = null;
            }
        }
    }
    /**
     * @return {?}
     */
    _emitChangeEvent() {
        /** @type {?} */
        let event = new Md2AutocompleteChange();
        event.source = this;
        event.value = this._value;
        this._onChange(event.value);
        this.change.emit(event);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this._value) {
            this._value = value;
            this._inputValue = '';
            if (value) {
                /** @type {?} */
                let selItm = this._items.find((i) => this.equals(this.valueKey ?
                    i[this.valueKey] : i, value));
                this.selectedItem = new Item(selItm, this.textKey, this.valueKey);
                if (this.selectedItem) {
                    this._inputValue = this.selectedItem.text;
                }
            }
            if (!this._inputValue) {
                this._inputValue = '';
            }
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this._onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this._onTouched = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
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
Md2Autocomplete.ctorParameters = () => [
    { type: ElementRef }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Md2AutocompleteModule {
}
Md2AutocompleteModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule],
                exports: [Md2Autocomplete, HighlightPipe],
                declarations: [Md2Autocomplete, HighlightPipe],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Chip {
    /**
     * @param {?} source
     * @param {?} textKey
     * @param {?} valueKey
     */
    constructor(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
}
/** @type {?} */
let nextId$1 = 0;
/** @type {?} */
const MD2_CHIPS_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Md2Chips),
    multi: true
};
/**
 * Change event object emitted by Md2Chips.
 */
class Md2ChipsChange {
}
class Md2Chips {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
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
        this._onChange = () => { };
        this._onTouched = () => { };
        this.chipItemList = [];
        this.inputValue = '';
        this.selectedChip = -1;
        this.inputFocused = false;
        this.autoCompleteFocued = false;
        this._value = '';
        this.isEmptyAutoComplete = true;
    }
    /**
     * @return {?}
     */
    get element() {
        /** @type {?} */
        const elements = { root: this.elementRef.nativeElement, mainDiv: null, template: null };
        elements.mainDiv = elements.root.querySelector('.md2-chips-container');
        elements.template = elements.mainDiv.querySelector('.md2-template');
        return elements;
    }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) { this.setValue(value); }
    /**
     * set value
     * @param {?} value
     * @return {?}
     */
    set setValue(value) {
        if (value !== this._value) {
            this._value = value;
            this.chipItemList = [];
            if (value) {
                if (value && value.length && Array.isArray(value)) {
                    for (let i = 0; i < value.length; i++) {
                        this.chipItemList.push(new Chip(value[i], this.textKey, this.valueKey));
                    }
                }
            }
        }
        this._emitChangeEvent();
    }
    /**
     * @return {?}
     */
    getFocusAutocomplete() {
        this._onTouched();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    changeAutocomplete(value) {
        if (value) {
            this.addNewChip(value.value);
            this.item = null;
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        /** @type {?} */
        let elements = this.element;
        this.splitRegExp = new RegExp(this.pasteSplitPattern);
        if (elements.template) {
            this.templateHtmlString = elements.template.innerHTML;
        }
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    valueupdate(evt) {
        this.isEmptyAutoComplete = evt ? false : true;
    }
    /**
     * input key listener
     * @param {?} event
     * @return {?}
     */
    inputChanged(event) {
        /** @type {?} */
        let key = event.keyCode;
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
    }
    /**
     * @return {?}
     */
    _handleFocus() {
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
    }
    /**
     * @return {?}
     */
    inputBlurred() {
        this.inputFocused = false;
        if (this.inputValue) {
            this.addNewChip(this.inputValue);
        }
        this._onTouched();
    }
    /**
     * @return {?}
     */
    inputFocus() {
        if (this.disabled) {
            return;
        }
        this.inputFocused = true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    inputPaste(event) {
        /** @type {?} */
        let clipboardData = event.clipboardData ||
            (event.originalEvent && event.originalEvent.clipboardData);
        /** @type {?} */
        let pastedString = clipboardData.getData('text/plain').trim();
        this.addNewChip(pastedString);
        setTimeout(() => this._resetInput());
    }
    /**
     * @return {?}
     */
    leftArrowKeyEvents() {
        event.preventDefault();
        if (this.selectedChip) {
            if (this.selectedChip < 0) {
                this.selectedChip = this.chipItemList.length - 1;
            }
            else {
                this.selectedChip = this.selectedChip - 1;
            }
        }
    }
    /**
     * @return {?}
     */
    rightArrowKeyEvents() {
        event.preventDefault();
        if (this.selectedChip != -1) {
            if (this.selectedChip >= this.chipItemList.length) {
                this.selectedChip = 0;
            }
            else {
                this.selectedChip = this.selectedChip + 1;
            }
        }
    }
    /**
     * @param {?} chipString
     * @return {?}
     */
    _isValid(chipString) {
        /** @type {?} */
        let typeString = typeof chipString;
        /** @type {?} */
        let isExist;
        if (typeString === 'string') {
            chipString = chipString.trim();
            isExist = this.chipItemList.filter((chip) => chip.text === chipString);
        }
        else {
            isExist = this.chipItemList.filter((chip) => chip.text === chipString.text);
        }
        if (this.chipItemList.indexOf(chipString) === -1 && (isExist.length ? false : true)) {
            return this.allowedPattern.test(chipString);
        }
    }
    /**
     * add new chip
     * @param {?} chips
     * @return {?}
     */
    addNewChip(chips) {
        /** @type {?} */
        let validInput = this._isValid(chips);
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
    }
    /**
     * remove selected chip
     * @param {?} chipIndexToRemove index of selected chip
     * @return {?}
     */
    removeSelectedChip(chipIndexToRemove) {
        this.chipItemList.splice(chipIndexToRemove, 1);
        this._resetSelected();
        this.updateValue();
    }
    /**
     * @return {?}
     */
    backspaceEvent() {
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
    }
    /**
     * @return {?}
     */
    _resetSelected() {
        this.selectedChip = -1;
    }
    /**
     * @return {?}
     */
    _resetInput() {
        if (this.isAutoComplete) {
            this.chipInputForm.controls['autocomplete'].setValue('');
        }
        else {
            this.chipInputForm.controls['chipInput'].setValue('');
        }
    }
    /**
     * update value
     * @return {?}
     */
    updateValue() {
        this._value = new Array();
        this._value = this.chipItemList.map((chip) => {
            if (this.valueKey) {
                /** @type {?} */
                let c = {};
                c[this.textKey] = chip.text;
                c[this.valueKey] = chip.value;
                return c;
            }
            else {
                return chip.value;
            }
        });
        this._emitChangeEvent();
    }
    /**
     * Emits an event when the user selects a color.
     * @return {?}
     */
    _emitChangeEvent() {
        /** @type {?} */
        let event = new Md2ChipsChange();
        event.source = this;
        event.value = this._value;
        this._onChange(event.value);
        this.change.emit(event);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this._value) {
            this._value = value;
            this.chipItemList = [];
            if (value) {
                if (value && value.length && Array.isArray(value)) {
                    for (let i = 0; i < value.length; i++) {
                        this.chipItemList.push(new Chip(value[i], this.textKey, this.valueKey));
                    }
                }
            }
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this._onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this._onTouched = fn; }
}
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
Md2Chips.ctorParameters = () => [
    { type: ElementRef }
];
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
/** @type {?} */
const MD2_CHIPS_DIRECTIVES = [Md2Chips];
class Md2ChipsModule {
}
Md2ChipsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, Md2AutocompleteModule],
                declarations: MD2_CHIPS_DIRECTIVES,
                exports: MD2_CHIPS_DIRECTIVES
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Md2Collapse {
    constructor() {
        this._collapse = true;
        this._collapsing = false;
        this.collapsed = new EventEmitter();
        this.expanded = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get collapse() { return this._collapse; }
    /**
     * @param {?} value
     * @return {?}
     */
    set collapse(value) {
        this._collapse = value;
        this.toggle();
    }
    /**
     * toggle collapse
     * @return {?}
     */
    toggle() {
        if (this._collapse) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    /**
     * show collapse
     * @return {?}
     */
    show() {
        this._collapsing = true;
        this._collapse = true;
        setTimeout(() => {
            this._collapsing = false;
        }, 4);
        this.expanded.emit();
    }
    /**
     * hide collapse
     * @return {?}
     */
    hide() {
        this._collapsing = true;
        this._collapse = false;
        setTimeout(() => {
            this._collapsing = false;
        }, 4);
        this.collapsed.emit();
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Md2CollapseModule {
}
Md2CollapseModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Md2Collapse],
                declarations: [Md2Collapse],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const COLOR_RGB = /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/;
/** @type {?} */
const COLOR_HSL = /(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/;
class Hsva {
    /**
     * @param {?} h
     * @param {?} s
     * @param {?} v
     * @param {?} a
     */
    constructor(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
}
class Hsla {
    /**
     * @param {?} h
     * @param {?} s
     * @param {?} l
     * @param {?} a
     */
    constructor(h, s, l, a) {
        this.h = h;
        this.s = s;
        this.l = l;
        this.a = a;
    }
}
class Rgba {
    /**
     * @param {?} r
     * @param {?} g
     * @param {?} b
     * @param {?} a
     */
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}
class ColorUtil {
    /**
     * hsla to hsva
     * @param {?} hsla
     * @return {?}
     */
    hsla2hsva(hsla) {
        /** @type {?} */
        let h = Math.min(hsla.h, 1);
        /** @type {?} */
        let s = Math.min(hsla.s, 1);
        /** @type {?} */
        let l = Math.min(hsla.l, 1);
        /** @type {?} */
        let a = Math.min(hsla.a, 1);
        if (l === 0) {
            return { h: h, s: 0, v: 0, a: a };
        }
        else {
            /** @type {?} */
            let v = l + s * (1 - Math.abs(2 * l - 1)) / 2;
            return { h: h, s: 2 * (v - l) / v, v: v, a: a };
        }
    }
    /**
     * hsva to hsla
     * @param {?} hsva
     * @return {?}
     */
    hsva2hsla(hsva) {
        /** @type {?} */
        let h = hsva.h;
        /** @type {?} */
        let s = hsva.s;
        /** @type {?} */
        let v = hsva.v;
        /** @type {?} */
        let a = hsva.a;
        if (v === 0) {
            return new Hsla(h, 0, 0, a);
        }
        else if (s === 0 && v === 1) {
            return new Hsla(h, 1, 1, a);
        }
        else {
            /** @type {?} */
            let l = v * (2 - s) / 2;
            return new Hsla(h, v * s / (1 - Math.abs(2 * l - 1)), l, a);
        }
    }
    /**
     * rgba to hsva
     * @param {?} rgba
     * @return {?}
     */
    rgbaToHsva(rgba) {
        /** @type {?} */
        let r = Math.min(rgba.r, 1);
        /** @type {?} */
        let g = Math.min(rgba.g, 1);
        /** @type {?} */
        let b = Math.min(rgba.b, 1);
        /** @type {?} */
        let a = Math.min(rgba.a, 1);
        /** @type {?} */
        let max = Math.max(r, g, b);
        /** @type {?} */
        let min = Math.min(r, g, b);
        /** @type {?} */
        let h;
        /** @type {?} */
        let s;
        /** @type {?} */
        let v = max;
        /** @type {?} */
        let d = max - min;
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
    }
    /**
     * hsva to rgba
     * @param {?} hsva
     * @return {?}
     */
    hsvaToRgba(hsva) {
        /** @type {?} */
        let h = hsva.h;
        /** @type {?} */
        let s = hsva.s;
        /** @type {?} */
        let v = hsva.v;
        /** @type {?} */
        let a = hsva.a;
        /** @type {?} */
        let r;
        /** @type {?} */
        let g;
        /** @type {?} */
        let b;
        /** @type {?} */
        let i = Math.floor(h * 6);
        /** @type {?} */
        let f = h * 6 - i;
        /** @type {?} */
        let p = v * (1 - s);
        /** @type {?} */
        let q = v * (1 - f * s);
        /** @type {?} */
        let t = v * (1 - (1 - f) * s);
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
    }
    /**
     * string to hsva
     * @param {?} colorString
     * @return {?}
     */
    stringToHsva(colorString) {
        /** @type {?} */
        let stringParsers = [
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
        let hsva = null;
        for (let key in stringParsers) {
            if (stringParsers.hasOwnProperty(key)) {
                /** @type {?} */
                let parser = stringParsers[key];
                /** @type {?} */
                let match = parser.re.exec(colorString);
                /** @type {?} */
                let color = match && parser.parse(match);
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
    }
    /**
     * output formate of color
     * @param {?} hsva
     * @param {?} outputFormat
     * @return {?}
     */
    outputFormat(hsva, outputFormat) {
        if (hsva.a < 1) {
            switch (outputFormat) {
                case 'hsl':
                    /** @type {?} */
                    let hsla = this.hsva2hsla(hsva);
                    /** @type {?} */
                    let hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                    return 'hsla(' + hslaText.h + ',' + hslaText.s + '%,' +
                        hslaText.l + '%,' + hslaText.a + ')';
                default:
                    /** @type {?} */
                    let rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
                    return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b +
                        ',' + Math.round(rgba.a * 100) / 100 + ')';
            }
        }
        else {
            switch (outputFormat) {
                case 'hsl':
                    /** @type {?} */
                    let hsla = this.hsva2hsla(hsva);
                    /** @type {?} */
                    let hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                    return 'hsl(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%)';
                case 'rgb':
                    /** @type {?} */
                    let rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
                    return 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
                default:
                    return this.hexText(this.denormalizeRGBA(this.hsvaToRgba(hsva)));
            }
        }
    }
    /**
     * @param {?} rgba
     * @return {?}
     */
    hexText(rgba) {
        /** @type {?} */
        let mainText = ((1 << 24) | (rgba.r << 16) | (rgba.g << 8) | rgba.b).toString(16);
        /** @type {?} */
        let hexText = '#' + mainText.substr(1);
        return hexText.toLowerCase();
    }
    /**
     * @param {?} rgba
     * @return {?}
     */
    denormalizeRGBA(rgba) {
        return new Rgba(Math.round(rgba.r * 255), Math.round(rgba.g * 255), Math.round(rgba.b * 255), rgba.a);
    }
}
ColorUtil.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SliderPosition {
    /**
     * @param {?} h
     * @param {?} s
     * @param {?} v
     * @param {?} a
     */
    constructor(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
}
class SliderDimension {
    /**
     * @param {?} h
     * @param {?} s
     * @param {?} v
     * @param {?} a
     */
    constructor(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
}
/** @type {?} */
let nextId$2 = 0;
class TextDirective {
    constructor() {
        this.newValue = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeInput(event) {
        event.stopPropagation();
        event.preventDefault();
        /** @type {?} */
        let value = event.target.value;
        if (this.rg === undefined) {
            this.newValue.emit(value);
        }
        else {
            /** @type {?} */
            let numeric = parseFloat(value);
            if (!isNaN(numeric) && numeric >= 0 && numeric <= this.rg) {
                this.newValue.emit({ v: numeric, rg: this.rg });
            }
        }
    }
}
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
class ColorpickerSliderDirective {
    /**
     * @param {?} _element
     */
    constructor(_element) {
        this._element = _element;
        this.change = new EventEmitter();
        this.listenerMove = (event) => { this.move(event); };
        this.listenerStop = () => { this.stop(); };
    }
    /**
     * set cursor position
     * @param {?} event
     * @return {?}
     */
    setCursor(event) {
        /** @type {?} */
        let height = this._getNativeElement().offsetHeight;
        /** @type {?} */
        let width = this._getNativeElement().offsetWidth;
        /** @type {?} */
        let x = Math.max(0, Math.min(this.getX(event), width));
        /** @type {?} */
        let y = Math.max(0, Math.min(this.getY(event), height));
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
    }
    /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    move(event) {
        event.preventDefault();
        this.setCursor(event);
    }
    /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    start(event) {
        this.setCursor(event);
        document.addEventListener('mousemove', this.listenerMove);
        document.addEventListener('touchmove', this.listenerMove);
        document.addEventListener('mouseup', this.listenerStop);
        document.addEventListener('touchend', this.listenerStop);
    }
    /**
     * stop mouse event
     * @return {?}
     */
    stop() {
        document.removeEventListener('mousemove', this.listenerMove);
        document.removeEventListener('touchmove', this.listenerMove);
        document.removeEventListener('mouseup', this.listenerStop);
        document.removeEventListener('touchend', this.listenerStop);
    }
    /**
     * get x
     * @param {?} event
     * @return {?}
     */
    getX(event) {
        /** @type {?} */
        let boundingClientRect = this._getNativeElement().getBoundingClientRect();
        return (event.pageX !== undefined ? event.pageX : event.touches[0].pageX) -
            boundingClientRect.left - window.pageXOffset;
    }
    /**
     * get y
     * @param {?} event
     * @return {?}
     */
    getY(event) {
        /** @type {?} */
        let boundingClientRect = this._getNativeElement().getBoundingClientRect();
        return (event.pageY !== undefined ? event.pageY : event.touches[0].pageY) -
            boundingClientRect.top - window.pageYOffset;
    }
    /**
     * @return {?}
     */
    _getNativeElement() {
        return this._element.nativeElement;
    }
}
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
ColorpickerSliderDirective.ctorParameters = () => [
    { type: ElementRef }
];
ColorpickerSliderDirective.propDecorators = {
    slider: [{ type: Input, args: ['colorpicker-slider',] }],
    pointX: [{ type: Input, args: ['point-x',] }],
    pointY: [{ type: Input, args: ['point-y',] }],
    change: [{ type: Output, args: ['change',] }]
};
/**
 * Change event object emitted by Md2Colorpicker.
 */
class Md2ColorChange {
    /**
     * @param {?} source
     * @param {?} color
     */
    constructor(source, color) {
        this.source = source;
        this.color = color;
    }
}
class Md2Colorpicker {
    /**
     * @param {?} _element
     * @param {?} _overlay
     * @param {?} _viewContainerRef
     * @param {?} _renderer
     * @param {?} _util
     * @param {?} _control
     */
    constructor(_element, _overlay, _viewContainerRef, _renderer, _util, _control) {
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
        this._onChange = () => { };
        this._onTouched = () => { };
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
    /**
     * @return {?}
     */
    get color() { return this._color; }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) { this._color = value; }
    /**
     * Placeholder to be shown if no value has been selected.
     * @return {?}
     */
    get placeholder() { return this._placeholder; }
    /**
     * @param {?} value
     * @return {?}
     */
    set placeholder(value) { this._placeholder = value; }
    /**
     * @return {?}
     */
    get required() { return this._required; }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) { this._required = coerceBooleanProperty(value); }
    /**
     * Whether the component is disabled.
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * @return {?}
     */
    get value() {
        return this._innerValue;
    }
    /**
     * set accessor including call the onchange callback
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this._innerValue) {
            if (v) {
                this.hsva = this._util.stringToHsva(v);
            }
            this._innerValue = v;
        }
    }
    /**
     * @return {?}
     */
    get container() { return this._container; }
    /**
     * @param {?} value
     * @return {?}
     */
    set container(value) {
        if (this._container !== value) {
            this._container = value || 'inline';
            this.destroyPanel();
        }
    }
    /**
     * @return {?}
     */
    get setGradient() {
        return {
            'background-image': 'linear-gradient(to right, transparent, transparent),' +
                'linear-gradient(to left, ' + this.hexText + ', rgba(255, 255, 255, 0))'
        };
    }
    /**
     * @return {?}
     */
    ngOnDestroy() { this.destroyPanel(); }
    /**
     * Whether or not the overlay panel is open.
     * @return {?}
     */
    get panelOpen() {
        return this._panelOpen;
    }
    /**
     * Toggles the overlay panel open or closed.
     * @return {?}
     */
    toggle() {
        this.panelOpen ? this.close() : this.open();
    }
    /**
     * Opens the overlay panel.
     * @return {?}
     */
    open() {
        /** @type {?} */
        let hsva = this._util.stringToHsva(this.color + '');
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
    }
    /**
     * Closes the overlay panel and focuses the host element.
     * @return {?}
     */
    close() {
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
    }
    /**
     * Removes the panel from the DOM.
     * @return {?}
     */
    destroyPanel() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._cleanUpSubscriptions();
        }
    }
    /**
     * @return {?}
     */
    _onBlur() {
        if (!this.panelOpen) {
            this._onTouched();
        }
    }
    /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    changeInput(event) {
        /** @type {?} */
        let value = event.target.value;
        this.colorpickerChange.emit(value);
    }
    /**
     * set saturation,lightness,hue,alpha,RGB value
     * @param {?} val
     * @return {?}
     */
    setSaturation(val) {
        /** @type {?} */
        let hsla = this._util.hsva2hsla(this.hsva);
        hsla.s = val.v / val.rg;
        this.hsva = this._util.hsla2hsva(hsla);
        this.update();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    setLightness(val) {
        /** @type {?} */
        let hsla = this._util.hsva2hsla(this.hsva);
        hsla.l = val.v / val.rg;
        this.hsva = this._util.hsla2hsva(hsla);
        this.update();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    setHue(val) {
        this.hsva.h = val.v / val.rg;
        this.update();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    setAlpha(val) {
        this.hsva.a = val.v / val.rg;
        this.update();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    setR(val) {
        /** @type {?} */
        let rgba = this._util.hsvaToRgba(this.hsva);
        rgba.r = val.v / val.rg;
        this.hsva = this._util.rgbaToHsva(rgba);
        this.update();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    setG(val) {
        /** @type {?} */
        let rgba = this._util.hsvaToRgba(this.hsva);
        rgba.g = val.v / val.rg;
        this.hsva = this._util.rgbaToHsva(rgba);
        this.update();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    setB(val) {
        /** @type {?} */
        let rgba = this._util.hsvaToRgba(this.hsva);
        rgba.b = val.v / val.rg;
        this.hsva = this._util.rgbaToHsva(rgba);
        this.update();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    setSaturationAndBrightness(val) {
        this.hsva.s = val.s / val.pointX;
        this.hsva.v = val.v / val.pointY;
        this.update();
    }
    /**
     * @return {?}
     */
    clickOk() {
        this._isColorpickerVisible = false;
        this.isInputValidColor = false;
        this.color = this._innerValue;
        if (this._innerValue != this._initialColor) {
            this._emitChangeEvent();
        }
        this.close();
    }
    /**
     * deselect recent color and close popup
     * @return {?}
     */
    cancelColor() {
        this._innerValue = this._initialColor;
        this.close();
    }
    /**
     * @param {?} str
     * @return {?}
     */
    isValidColor(str) {
        return str.match(/^#[a-f0-9]{6}$/i) !== null;
    }
    /**
     * set color
     * @param {?} value
     * @return {?}
     */
    setColorFromString(value) {
        if (!this.isValidColor(value)) {
            value = '#000000';
            this.backColor = false;
        }
        /** @type {?} */
        let hsva = this._util.stringToHsva(value);
        if (hsva !== null) {
            this.hsva = hsva;
        }
        this.update();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    formatPolicy(value) {
        this.format = value;
        if (this.format === 0 && this.hsva.a < 1) {
            this.format++;
        }
        return this.format;
    }
    /**
     * update color
     * @return {?}
     */
    update() {
        /** @type {?} */
        let hsla = this._util.hsva2hsla(this.hsva);
        /** @type {?} */
        let rgba = this._util.denormalizeRGBA(this._util.hsvaToRgba(this.hsva));
        /** @type {?} */
        let hueRgba = this._util.denormalizeRGBA(this._util.hsvaToRgba(new Hsva(this.hsva.h, 1, 1, 1)));
        this.alphaColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
        this._hueSliderColor = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';
        this.hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
        this.rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
        if (this.backColor) {
            this.hexText = this._util.hexText(rgba);
        }
        this.backColor = true;
        /** @type {?} */
        let colorCode = Math.round((this.rgbaText.r * 299 + this.rgbaText.g * 587 +
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clearColor(event) {
        event.stopPropagation();
        this.color = '';
        this._emitChangeEvent();
    }
    /**
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    isDescendant(parent, child) {
        /** @type {?} */
        let node = child.parentNode;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }
    /**
     * @return {?}
     */
    checkInputVal() {
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
    }
    /**
     * Emits an event when the user selects a color.
     * @return {?}
     */
    _emitChangeEvent() {
        this._onChange(this.color);
        this.change.emit(new Md2ColorChange(this, this.color));
        this._innerValue = this.color;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._innerValue = value;
        this.color = value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this._onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this._onTouched = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @return {?}
     */
    _subscribeToBackdrop() {
        this._backdropSubscription = this._overlayRef.backdropClick().subscribe(() => {
            this._innerValue = this._initialColor;
            this.close();
        });
    }
    /**
     *  This method creates the overlay from the provided panel's template and saves its
     *  OverlayRef so that it can be attached to the DOM when open is called.
     * @return {?}
     */
    _createOverlay() {
        if (!this._overlayRef) {
            /** @type {?} */
            let config = new OverlayState();
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
    }
    /**
     * Create the popup PositionStrategy.
     * @return {?}
     */
    _createPickerPositionStrategy() {
        return this._overlay.position()
            .connectedTo(this._element, { originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' })
            .withFallbackPosition({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'top' })
            .withFallbackPosition({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'bottom' })
            .withFallbackPosition({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'bottom' });
    }
    /**
     * @return {?}
     */
    _cleanUpSubscriptions() {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
        if (this._positionSubscription) {
            this._positionSubscription.unsubscribe();
        }
    }
}
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
Md2Colorpicker.ctorParameters = () => [
    { type: ElementRef },
    { type: Overlay },
    { type: ViewContainerRef },
    { type: Renderer },
    { type: ColorUtil },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional }] }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Md2ColorpickerModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Md2OptgroupBase {
}
/** @type {?} */
const _Md2OptgroupMixinBase = mixinDisabled(Md2OptgroupBase);
/** @type {?} */
let nextId$3 = 0;
/**
 * Component that is used to group instances of `md2-option`.
 */
class Md2Optgroup extends _Md2OptgroupMixinBase {
    constructor() {
        super(...arguments);
        /**
         * Unique id for the underlying label.
         */
        this._labelId = `md2-optgroup-label-${nextId$3++}`;
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
  @type {?} */
let _uniqueIdCounter$1 = 0;
/**
 * Event object emitted by MdOption when selected or deselected.
 */
class Md2OptionSelectionChange {
    /**
     * @param {?} source
     * @param {?=} isUserInput
     */
    constructor(source, isUserInput = false) {
        this.source = source;
        this.isUserInput = isUserInput;
    }
}
/**
 * Single option inside of a `<md2-select>` element.
 */
class Md2Option {
    /**
     * @param {?} group
     * @param {?} _element
     */
    constructor(group, _element) {
        this.group = group;
        this._element = _element;
        this._selected = false;
        this._active = false;
        /**
         * Whether the option is disabled.
         */
        this._disabled = false;
        this._id = `md2-option-${_uniqueIdCounter$1++}`;
        /**
         * Whether the wrapping component is in multiple selection mode.
         */
        this.multiple = false;
        /**
         * Event emitted when the option is selected or deselected.
         */
        this.onSelectionChange = new EventEmitter();
    }
    /**
     * The unique ID of the option.
     * @return {?}
     */
    get id() { return this._id; }
    /**
     * Whether or not the option is currently selected.
     * @return {?}
     */
    get selected() { return this._selected; }
    /**
     * Whether the option is disabled.
     * @return {?}
     */
    get disabled() { return (this.group && this.group.disabled) || this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     * @return {?}
     */
    get active() {
        return this._active;
    }
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     * @return {?}
     */
    get viewValue() {
        return this._getHostElement().textContent.trim();
    }
    /**
     * Selects the option.
     * @return {?}
     */
    select() {
        this._selected = true;
        this._emitSelectionChangeEvent();
    }
    /**
     * Deselects the option.
     * @return {?}
     */
    deselect() {
        this._selected = false;
        this._emitSelectionChangeEvent();
    }
    /**
     * Sets focus onto this option.
     * @return {?}
     */
    focus() {
        this._getHostElement().focus();
    }
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    setActiveStyles() {
        this._active = true;
    }
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    setInactiveStyles() {
        this._active = false;
    }
    /**
     * Ensures the option is selected when activated from the keyboard.
     * @param {?} event
     * @return {?}
     */
    _handleKeydown(event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this._selectViaInteraction();
        }
    }
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     * @return {?}
     */
    _selectViaInteraction() {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this._emitSelectionChangeEvent(true);
        }
    }
    /**
     * Returns the correct tabindex for the option depending on disabled state.
     * @return {?}
     */
    _getTabIndex() {
        return this.disabled ? '-1' : '0';
    }
    /**
     * Fetches the host DOM element.
     * @return {?}
     */
    _getHostElement() {
        return this._element.nativeElement;
    }
    /**
     * Emits the selection change event.
     * @param {?=} isUserInput
     * @return {?}
     */
    _emitSelectionChangeEvent(isUserInput = false) {
        this.onSelectionChange.emit(new Md2OptionSelectionChange(this, isUserInput));
    }
}
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
Md2Option.ctorParameters = () => [
    { type: Md2Optgroup, decorators: [{ type: Optional }] },
    { type: ElementRef }
];
Md2Option.propDecorators = {
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    onSelectionChange: [{ type: Output }]
};
class Md2OptionModule {
}
Md2OptionModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MdSelectionModule],
                exports: [Md2Option, Md2Optgroup],
                declarations: [Md2Option, Md2Optgroup]
            },] }
];

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
class ListKeyManager {
    /**
     * @param {?} _items
     */
    constructor(_items) {
        this._items = _items;
        this._activeItemIndex = null;
        this._tabOut = new Subject();
        this._wrap = false;
    }
    /**
     * Turns on wrapping mode, which ensures that the active item will wrap to
     * the other end of list when there are no more items in the given direction.
     *
     * @return {?} The ListKeyManager that the method was called on.
     */
    withWrap() {
        this._wrap = true;
        return this;
    }
    /**
     * Sets the active item to the item at the index specified.
     *
     * @param {?} index The index of the item to be set as active.
     * @return {?}
     */
    setActiveItem(index) {
        this._activeItemIndex = index;
        this._activeItem = this._items.toArray()[index];
    }
    /**
     * Sets the active item depending on the key event passed in.
     * @param {?} event Keyboard event to be used for determining which element should be active.
     * @return {?}
     */
    onKeydown(event) {
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
    }
    /**
     * Returns the index of the currently active item.
     * @return {?}
     */
    get activeItemIndex() {
        return this._activeItemIndex;
    }
    /**
     * Returns the currently active item.
     * @return {?}
     */
    get activeItem() {
        return this._activeItem;
    }
    /**
     * Sets the active item to the first enabled item in the list.
     * @return {?}
     */
    setFirstItemActive() {
        this._setActiveItemByIndex(0, 1);
    }
    /**
     * Sets the active item to the last enabled item in the list.
     * @return {?}
     */
    setLastItemActive() {
        this._setActiveItemByIndex(this._items.length - 1, -1);
    }
    /**
     * Sets the active item to the next enabled item in the list.
     * @return {?}
     */
    setNextItemActive() {
        this._activeItemIndex === null ? this.setFirstItemActive() : this._setActiveItemByDelta(1);
    }
    /**
     * Sets the active item to a previous enabled item in the list.
     * @return {?}
     */
    setPreviousItemActive() {
        this._activeItemIndex === null && this._wrap ? this.setLastItemActive()
            : this._setActiveItemByDelta(-1);
    }
    /**
     * Allows setting of the activeItemIndex without any other effects.
     * @param {?} index The new activeItemIndex.
     * @return {?}
     */
    updateActiveItemIndex(index) {
        this._activeItemIndex = index;
    }
    /**
     * Observable that emits any time the TAB key is pressed, so components can react
     * when focus is shifted off of the list.
     * @return {?}
     */
    get tabOut() {
        return this._tabOut.asObservable();
    }
    /**
     * This method sets the active item, given a list of items and the delta between the
     * currently active item and the new active item. It will calculate differently
     * depending on whether wrap mode is turned on.
     * @param {?} delta
     * @param {?=} items
     * @return {?}
     */
    _setActiveItemByDelta(delta, items = this._items.toArray()) {
        this._wrap ? this._setActiveInWrapMode(delta, items)
            : this._setActiveInDefaultMode(delta, items);
    }
    /**
     * Sets the active item properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     * @param {?} delta
     * @param {?} items
     * @return {?}
     */
    _setActiveInWrapMode(delta, items) {
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
    }
    /**
     * Sets the active item properly given the default mode. In other words, it will
     * continue to move down the list until it finds an item that is not disabled. If
     * it encounters either end of the list, it will stop and not wrap.
     * @param {?} delta
     * @param {?} items
     * @return {?}
     */
    _setActiveInDefaultMode(delta, items) {
        this._setActiveItemByIndex(this._activeItemIndex + delta, delta, items);
    }
    /**
     * Sets the active item to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     * @param {?} index
     * @param {?} fallbackDelta
     * @param {?=} items
     * @return {?}
     */
    _setActiveItemByIndex(index, fallbackDelta, items = this._items.toArray()) {
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
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class FocusKeyManager extends ListKeyManager {
    /**
     * @param {?} items
     */
    constructor(items) {
        super(items);
    }
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds focuses the newly active item.
     * @param {?} index
     * @return {?}
     */
    setActiveItem(index) {
        super.setActiveItem(index);
        if (this.activeItem) {
            this.activeItem.focus();
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * This animation shrinks the placeholder text to 75% of its normal size and translates
 * it to either the top left corner (ltr) or top right corner (rtl) of the trigger,
 * depending on the text direction of the application.
  @type {?} */
const transformPlaceholder = trigger('transformPlaceholder', [
    state('floating-ltr', style({
        top: '-22px',
        left: '-2px',
        transform: `scale(0.75)`
    })),
    state('floating-rtl', style({
        top: '-22px',
        left: '2px',
        transform: `scale(0.75)`
    })),
    transition('* => *', animate(`400ms cubic-bezier(0.25, 0.8, 0.25, 1)`))
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
const transformPanel = trigger('transformPanel', [
    state('showing', style({
        opacity: 1,
        minWidth: 'calc(100% + 32px)',
        transform: `scaleY(1)`
    })),
    transition('void => *', [
        style({
            opacity: 0,
            minWidth: '100%',
            transform: `scaleY(0)`
        }),
        animate(`150ms cubic-bezier(0.25, 0.8, 0.25, 1)`)
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
const fadeInContent = trigger('fadeInContent', [
    state('showing', style({ opacity: 1 })),
    transition('void => showing', [
        style({ opacity: 0 }),
        animate(`150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)`)
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
const SELECT_ITEM_HEIGHT = 48;
/** *
 * The max height of the select's overlay panel
  @type {?} */
const SELECT_PANEL_MAX_HEIGHT = 256;
/** *
 * The max number of options visible at once in the select panel.
  @type {?} */
const SELECT_MAX_OPTIONS_DISPLAYED = Math.floor(SELECT_PANEL_MAX_HEIGHT / SELECT_ITEM_HEIGHT);
/** *
 * The fixed height of the select's trigger element.
  @type {?} */
const SELECT_TRIGGER_HEIGHT = 30;
/** *
 * Must adjust for the difference in height between the option and the trigger,
 * so the text will align on the y axis.
  @type {?} */
const SELECT_ITEM_HEIGHT_ADJUSTMENT = (SELECT_ITEM_HEIGHT - SELECT_TRIGGER_HEIGHT) / 2;
/** *
 * The panel's padding on the x-axis
  @type {?} */
const SELECT_PANEL_PADDING_X = 16;
/** *
 * The panel's x axis padding if it is indented (e.g. there is an option group).
  @type {?} */
const SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_PADDING_X * 2;
/** *
 * Distance between the panel edge and the option text in
 * multi-selection mode.
 *
 * (SELECT_PADDING * 1.75) + 20 = 48
 * The padding is multiplied by 1.75 because the checkbox's margin is half the padding, and
 * the browser adds ~4px, because we're using inline elements.
 * The checkbox width is 20px.
  @type {?} */
const SELECT_MULTIPLE_PANEL_PADDING_X = SELECT_PANEL_PADDING_X * 1.25 + 20;
/** *
 * The panel's padding on the y-axis. This padding indicates there are more
 * options available if you scroll.
  @type {?} */
const SELECT_PANEL_PADDING_Y = 16;
/** *
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
  @type {?} */
const SELECT_PANEL_VIEWPORT_PADDING = 8;
/**
 * Change event object that is emitted when the select value has changed.
 */
class Md2SelectChange {
    /**
     * @param {?} source
     * @param {?} value
     */
    constructor(source, value) {
        this.source = source;
        this.value = value;
    }
}
class Md2Select {
    /**
     * @param {?} _element
     * @param {?} _renderer
     * @param {?} _viewportRuler
     * @param {?} _changeDetectorRef
     * @param {?} _dir
     * @param {?} _control
     * @param {?} tabIndex
     */
    constructor(_element, _renderer, _viewportRuler, _changeDetectorRef, _dir, _control, tabIndex) {
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
        this._onChange = () => { };
        /**
         * View -> model callback called when select has been touched
         */
        this._onTouched = () => { };
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
    /**
     * Placeholder to be shown if no value has been selected.
     * @return {?}
     */
    get placeholder() { return this._placeholder; }
    /**
     * @param {?} value
     * @return {?}
     */
    set placeholder(value) {
        this._placeholder = value;
        // Must wait to record the trigger width to ensure placeholder width is included.
        Promise.resolve(null).then(() => this._setTriggerWidth());
    }
    /**
     * Whether the component is disabled.
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * Whether the component is required.
     * @return {?}
     */
    get required() { return this._required; }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) { this._required = coerceBooleanProperty(value); }
    /**
     * Whether the user should be allowed to select multiple options.
     * @return {?}
     */
    get multiple() { return this._multiple; }
    /**
     * @param {?} value
     * @return {?}
     */
    set multiple(value) {
        if (this._selectionModel) {
            throw getMdSelectDynamicMultipleError();
        }
        this._multiple = coerceBooleanProperty(value);
    }
    /**
     * Whether to float the placeholder text.
     * @return {?}
     */
    get floatPlaceholder() { return this._floatPlaceholder; }
    /**
     * @param {?} value
     * @return {?}
     */
    set floatPlaceholder(value) {
        this._floatPlaceholder = value || 'auto';
    }
    /**
     * Tab index for the select element.
     * @return {?}
     */
    get tabIndex() { return this._disabled ? -1 : this._tabIndex; }
    /**
     * @param {?} value
     * @return {?}
     */
    set tabIndex(value) {
        if (typeof value !== 'undefined') {
            this._tabIndex = value;
        }
    }
    /**
     * Combined stream of all of the child options' change events.
     * @return {?}
     */
    get optionSelectionChanges() {
        return merge(...this.options.map(option => option.onSelectionChange));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._selectionModel = new SelectionModel(this.multiple, null, false);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._initKeyManager();
        this._changeSubscription = this.options.changes.pipe(startWith(null)).subscribe(() => {
            this._resetOptions();
            if (this._control) {
                // Defer setting the value in order to avoid the "Expression
                // has changed after it was checked" errors from Angular.
                Promise.resolve(null).then(() => this._setSelectionByValue(this._control.value));
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._dropSubscriptions();
        if (this._changeSubscription) {
            this._changeSubscription.unsubscribe();
        }
        if (this._tabSubscription) {
            this._tabSubscription.unsubscribe();
        }
    }
    /**
     * Toggles the overlay panel open or closed.
     * @return {?}
     */
    toggle() {
        this.panelOpen ? this.close() : this.open();
    }
    /**
     * Opens the overlay panel.
     * @return {?}
     */
    open() {
        if (this.disabled || !this.options.length) {
            return;
        }
        if (!this._triggerWidth) {
            this._setTriggerWidth();
        }
        this._calculateOverlayPosition();
        this._placeholderState = this._floatPlaceholderState();
        this._panelOpen = true;
    }
    /**
     * Closes the overlay panel and focuses the host element.
     * @return {?}
     */
    close() {
        if (this._panelOpen) {
            this._panelOpen = false;
            if (this._selectionModel.isEmpty()) {
                this._placeholderState = '';
            }
            this._focusHost();
        }
    }
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} value New value to be written to the model.
     * @return {?}
     */
    writeValue(value) {
        if (this.options) {
            this._setSelectionByValue(value);
        }
    }
    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the value changes.
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the component has been touched.
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} isDisabled Sets whether the component is disabled.
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * Whether or not the overlay panel is open.
     * @return {?}
     */
    get panelOpen() {
        return this._panelOpen;
    }
    /**
     * The currently selected option.
     * @return {?}
     */
    get selected() {
        return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
    }
    /**
     * The value displayed in the trigger.
     * @return {?}
     */
    get triggerValue() {
        if (this._multiple) {
            /** @type {?} */
            let selectedOptions = this._selectionModel.selected.map(option => option.viewValue);
            if (this._isRtl()) {
                selectedOptions.reverse();
            }
            // TODO(crisbeto): delimiter should be configurable for proper localization.
            return selectedOptions.join(', ');
        }
        return this._selectionModel.selected[0].viewValue;
    }
    /**
     * Whether the element is in RTL mode.
     * @return {?}
     */
    _isRtl() {
        return this._dir ? this._dir.value === 'rtl' : false;
    }
    /**
     * Sets the width of the trigger element. This is necessary to match
     * the overlay width to the trigger width.
     * @return {?}
     */
    _setTriggerWidth() {
        this._triggerWidth = this._getTriggerRect().width;
    }
    /**
     * Handles the keyboard interactions of a closed select.
     * @param {?} event
     * @return {?}
     */
    _handleClosedKeydown(event) {
        if (!this.disabled) {
            if (event.keyCode === ENTER || event.keyCode === SPACE) {
                event.preventDefault(); // prevents the page from scrolling down when pressing space
                this.open();
            }
            else if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
                this._handleArrowKey(event);
            }
        }
    }
    /**
     * Handles keypresses inside the panel.
     * @param {?} event
     * @return {?}
     */
    _handlePanelKeydown(event) {
        if (event.keyCode === HOME || event.keyCode === END) {
            event.preventDefault();
            event.keyCode === HOME ? this._keyManager.setFirstItemActive() :
                this._keyManager.setLastItemActive();
        }
        else {
            this._keyManager.onKeydown(event);
        }
    }
    /**
     * When the panel element is finished transforming in (though not fading in), it
     * emits an event and focuses an option if the panel is open.
     * @return {?}
     */
    _onPanelDone() {
        if (this.panelOpen) {
            this._focusCorrectOption();
            this.onOpen.emit();
        }
        else {
            this.onClose.emit();
            this._panelDoneAnimating = false;
            this.overlayDir.offsetX = 0;
        }
    }
    /**
     * When the panel content is done fading in, the _panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     * @return {?}
     */
    _onFadeInDone() {
        this._panelDoneAnimating = this.panelOpen;
    }
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     * @return {?}
     */
    _onBlur() {
        if (!this.panelOpen) {
            this._onTouched();
        }
    }
    /**
     * Callback that is invoked when the overlay panel has been attached.
     * @return {?}
     */
    _onAttached() {
        this._calculateOverlayOffsetX();
        this._setScrollTop();
    }
    /**
     * Sets the scroll position of the scroll container. This must be called after
     * the overlay pane is attached or the scroll container element will not yet be
     * present in the DOM.
     * @return {?}
     */
    _setScrollTop() {
        /** @type {?} */
        const scrollContainer = this.overlayDir.overlayRef.overlayElement.querySelector('.md2-select-panel');
        scrollContainer.scrollTop = this._scrollTop;
    }
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     * @param {?} value
     * @return {?}
     */
    _setSelectionByValue(value) {
        /** @type {?} */
        const isArray = Array.isArray(value);
        if (this.multiple && value && !isArray) {
            throw getMdSelectNonArrayValueError();
        }
        this._clearSelection();
        if (isArray) {
            value.forEach((currentValue) => this._selectValue(currentValue));
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
    }
    /**
     * Finds and selects and option based on its value.
     * @param {?} value
     * @return {?} Option that has the corresponding value.
     */
    _selectValue(value) {
        /** @type {?} */
        let optionsArray = this.options.toArray();
        /** @type {?} */
        let correspondingOption = optionsArray.find(option => option.value != null
            && option.value != undefined && this.equals(option.value, value));
        if (correspondingOption) {
            correspondingOption.select();
            this._selectionModel.select(correspondingOption);
            this._keyManager.setActiveItem(optionsArray.indexOf(correspondingOption));
        }
        return correspondingOption;
    }
    /**
     * Compare two vars or objects
     * @param {?} o1 compare first object
     * @param {?} o2 compare second object
     * @return {?} boolean comparation result
     */
    equals(o1, o2) {
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
        let t1 = typeof o1;
        /** @type {?} */
        let t2 = typeof o2;
        /** @type {?} */
        let key;
        /** @type {?} */
        let keySet;
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
    }
    /**
     * Clears the select trigger and deselects every option in the list.
     * @param {?=} skip Option that should not be deselected.
     * @return {?}
     */
    _clearSelection(skip) {
        this._selectionModel.clear();
        this.options.forEach(option => {
            if (option !== skip) {
                option.deselect();
            }
        });
    }
    /**
     * @return {?}
     */
    _getTriggerRect() {
        return this.trigger.nativeElement.getBoundingClientRect();
    }
    /**
     * Sets up a key manager to listen to keyboard events on the overlay panel.
     * @return {?}
     */
    _initKeyManager() {
        this._keyManager = new FocusKeyManager(this.options);
        this._tabSubscription = this._keyManager.tabOut.subscribe(() => this.close());
    }
    /**
     * Drops current option subscriptions and IDs and resets from scratch.
     * @return {?}
     */
    _resetOptions() {
        this._dropSubscriptions();
        this._listenToOptions();
        this._setOptionIds();
        this._setOptionMultiple();
    }
    /**
     * Listens to user-generated selection events on each option.
     * @return {?}
     */
    _listenToOptions() {
        this._optionSubscription = this.optionSelectionChanges
            .pipe(filter(event => event.isUserInput))
            .subscribe(event => {
            this._onSelect(event.source);
            this._setValueWidth();
            if (!this.multiple) {
                this.close();
            }
        });
    }
    /**
     * Invoked when an option is clicked.
     * @param {?} option
     * @return {?}
     */
    _onSelect(option) {
        /** @type {?} */
        const wasSelected = this._selectionModel.isSelected(option);
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
    }
    /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     * @return {?}
     */
    _sortValues() {
        if (this._multiple) {
            this._selectionModel.clear();
            this.options.forEach(option => {
                if (option.selected) {
                    this._selectionModel.select(option);
                }
            });
        }
    }
    /**
     * Unsubscribes from all option subscriptions.
     * @return {?}
     */
    _dropSubscriptions() {
        if (this._optionSubscription) {
            this._optionSubscription.unsubscribe();
            this._optionSubscription = null;
        }
    }
    /**
     * Emits change event to set the model value.
     * @param {?=} fallbackValue
     * @return {?}
     */
    _propagateChanges(fallbackValue) {
        /** @type {?} */
        let valueToEmit = null;
        if (Array.isArray(this.selected)) {
            valueToEmit = this.selected.map(option => option.value);
        }
        else {
            valueToEmit = this.selected ? this.selected.value : fallbackValue;
        }
        this._onChange(valueToEmit);
        this.change.emit(new Md2SelectChange(this, valueToEmit));
    }
    /**
     * Records option IDs to pass to the aria-owns property.
     * @return {?}
     */
    _setOptionIds() {
        this._optionIds = this.options.map(option => option.id).join(' ');
    }
    /**
     * Sets the `multiple` property on each option. The promise is necessary
     * in order to avoid Angular errors when modifying the property after init.
     * @return {?}
     */
    _setOptionMultiple() {
        if (this.multiple) {
            Promise.resolve(null).then(() => {
                this.options.forEach(option => option.multiple = this.multiple);
            });
        }
    }
    /**
     * Must set the width of the selected option's value programmatically
     * because it is absolutely positioned and otherwise will not clip
     * overflow. The selection arrow is 9px wide, add 4px of padding = 13
     * @return {?}
     */
    _setValueWidth() {
        this._selectedValueWidth = this._triggerWidth - 13;
    }
    /**
     * Focuses the selected item. If no option is selected, it will focus
     * the first item instead.
     * @return {?}
     */
    _focusCorrectOption() {
        if (this._selectionModel.isEmpty()) {
            this._keyManager.setFirstItemActive();
        }
        else {
            this._keyManager.setActiveItem(this._getOptionIndex(this._selectionModel.selected[0]));
        }
    }
    /**
     * Focuses the host element when the panel closes.
     * @return {?}
     */
    _focusHost() {
        this._element.nativeElement.focus();
    }
    /**
     * Gets the index of the provided option in the option list.
     * @param {?} option
     * @return {?}
     */
    _getOptionIndex(option) {
        return this.options.reduce((result, current, index) => {
            return result === undefined ? (option === current ? index : undefined) : result;
        }, undefined);
    }
    /**
     * Calculates the scroll position and x- and y-offsets of the overlay panel.
     * @return {?}
     */
    _calculateOverlayPosition() {
        /** @type {?} */
        const items = this._getItemCount();
        /** @type {?} */
        const panelHeight = Math.min(items * SELECT_ITEM_HEIGHT, SELECT_PANEL_MAX_HEIGHT);
        /** @type {?} */
        const scrollContainerHeight = items * SELECT_ITEM_HEIGHT;
        /** @type {?} */
        const maxScroll = scrollContainerHeight - panelHeight;
        if (this._selectionModel.hasValue()) {
            /** @type {?} */
            let selectedIndex = this._getOptionIndex(this._selectionModel.selected[0]);
            selectedIndex += this._getLabelCountBeforeOption(selectedIndex);
            /** @type {?} */
            const scrollBuffer = panelHeight / 2;
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
    }
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
    _calculateOverlayScroll(selectedIndex, scrollBuffer, maxScroll) {
        /** @type {?} */
        const optionOffsetFromScrollTop = SELECT_ITEM_HEIGHT * selectedIndex;
        /** @type {?} */
        const halfOptionHeight = SELECT_ITEM_HEIGHT / 2;
        /** @type {?} */
        const optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
        return clampValue(0, optimalScrollPosition, maxScroll);
    }
    /**
     * Figures out the appropriate animation state for the placeholder.
     * @return {?}
     */
    _getPlaceholderAnimationState() {
        if (this.floatPlaceholder === 'never') {
            return '';
        }
        if (this.floatPlaceholder === 'always') {
            return this._floatPlaceholderState();
        }
        return this._placeholderState;
    }
    /**
     * Determines the CSS `opacity` of the placeholder element.
     * @return {?}
     */
    _getPlaceholderOpacity() {
        return (this.floatPlaceholder !== 'never' || this._selectionModel.isEmpty()) ?
            '1' : '0';
    }
    /**
     * Returns the aria-label of the select component.
     * @return {?}
     */
    get _ariaLabel() {
        // If an ariaLabelledby value has been set, the select should not overwrite the
        // `aria-labelledby` value by setting the ariaLabel to the placeholder.
        return this.ariaLabelledby ? null : this.ariaLabel || this.placeholder;
    }
    /**
     * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text when
     * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
     * can't be calculated until the panel has been attached, because we need to know the
     * content width in order to constrain the panel within the viewport.
     * @return {?}
     */
    _calculateOverlayOffsetX() {
        /** @type {?} */
        const overlayRect = this.overlayDir.overlayRef.overlayElement.getBoundingClientRect();
        /** @type {?} */
        const viewportRect = this._viewportRuler.getViewportRect();
        /** @type {?} */
        const isRtl = this._isRtl();
        /** @type {?} */
        let offsetX;
        // Adjust the offset, depending on the option padding.
        if (this.multiple) {
            offsetX = SELECT_MULTIPLE_PANEL_PADDING_X;
        }
        else {
            /** @type {?} */
            let selected = this._selectionModel.selected[0];
            offsetX = selected && selected.group ? SELECT_PANEL_INDENT_PADDING_X : SELECT_PANEL_PADDING_X;
        }
        // Invert the offset in LTR.
        if (!isRtl) {
            offsetX *= -1;
        }
        /** @type {?} */
        const leftOverflow = 0 - (overlayRect.left + offsetX
            - (isRtl ? SELECT_PANEL_PADDING_X * 2 : 0));
        /** @type {?} */
        const rightOverflow = overlayRect.right + offsetX - viewportRect.width
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
    }
    /**
     * Calculates the y-offset of the select's overlay panel in relation to the
     * top start corner of the trigger. It has to be adjusted in order for the
     * selected option to be aligned over the trigger when the panel opens.
     * @param {?} selectedIndex
     * @param {?} scrollBuffer
     * @param {?} maxScroll
     * @return {?}
     */
    _calculateOverlayOffsetY(selectedIndex, scrollBuffer, maxScroll) {
        /** @type {?} */
        let optionOffsetFromPanelTop;
        if (this._scrollTop === 0) {
            optionOffsetFromPanelTop = selectedIndex * SELECT_ITEM_HEIGHT;
        }
        else if (this._scrollTop === maxScroll) {
            /** @type {?} */
            const firstDisplayedIndex = this._getItemCount() - SELECT_MAX_OPTIONS_DISPLAYED;
            /** @type {?} */
            const selectedDisplayIndex = selectedIndex - firstDisplayedIndex;
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
    }
    /**
     * Checks that the attempted overlay position will fit within the viewport.
     * If it will not fit, tries to adjust the scroll position and the associated
     * y-offset so the panel can open fully on-screen. If it still won't fit,
     * sets the offset back to 0 to allow the fallback position to take over.
     * @param {?} maxScroll
     * @return {?}
     */
    _checkOverlayWithinViewport(maxScroll) {
        /** @type {?} */
        const viewportRect = this._viewportRuler.getViewportRect();
        /** @type {?} */
        const triggerRect = this._getTriggerRect();
        /** @type {?} */
        const topSpaceAvailable = triggerRect.top - SELECT_PANEL_VIEWPORT_PADDING;
        /** @type {?} */
        const bottomSpaceAvailable = viewportRect.height - triggerRect.bottom - SELECT_PANEL_VIEWPORT_PADDING;
        /** @type {?} */
        const panelHeightTop = Math.abs(this._offsetY);
        /** @type {?} */
        const totalPanelHeight = Math.min(this._getItemCount() * SELECT_ITEM_HEIGHT, SELECT_PANEL_MAX_HEIGHT);
        /** @type {?} */
        const panelHeightBottom = totalPanelHeight - panelHeightTop - triggerRect.height;
        if (panelHeightBottom > bottomSpaceAvailable) {
            this._adjustPanelUp(panelHeightBottom, bottomSpaceAvailable);
        }
        else if (panelHeightTop > topSpaceAvailable) {
            this._adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll);
        }
        else {
            this._transformOrigin = this._getOriginBasedOnOption();
        }
    }
    /**
     * Adjusts the overlay panel up to fit in the viewport.
     * @param {?} panelHeightBottom
     * @param {?} bottomSpaceAvailable
     * @return {?}
     */
    _adjustPanelUp(panelHeightBottom, bottomSpaceAvailable) {
        /** @type {?} */
        const distanceBelowViewport = panelHeightBottom - bottomSpaceAvailable;
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
            this._transformOrigin = `50% bottom 0px`;
        }
    }
    /**
     * Adjusts the overlay panel down to fit in the viewport.
     * @param {?} panelHeightTop
     * @param {?} topSpaceAvailable
     * @param {?} maxScroll
     * @return {?}
     */
    _adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll) {
        /** @type {?} */
        const distanceAboveViewport = panelHeightTop - topSpaceAvailable;
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
            this._transformOrigin = `50% top 0px`;
            return;
        }
    }
    /**
     * Sets the transform origin point based on the selected option.
     * @return {?}
     */
    _getOriginBasedOnOption() {
        /** @type {?} */
        const originY = Math.abs(this._offsetY) - SELECT_ITEM_HEIGHT_ADJUSTMENT + SELECT_ITEM_HEIGHT / 2;
        return `50% ${originY}px 0px`;
    }
    /**
     * Figures out the floating placeholder state value.
     * @return {?}
     */
    _floatPlaceholderState() {
        return this._isRtl() ? 'floating-rtl' : 'floating-ltr';
    }
    /**
     * Handles the user pressing the arrow keys on a closed select.
     * @param {?} event
     * @return {?}
     */
    _handleArrowKey(event) {
        if (this._multiple) {
            event.preventDefault();
            this.open();
        }
        else {
            /** @type {?} */
            const prevActiveItem = this._keyManager.activeItem;
            // Cycle though the select options even when the select is closed,
            // matching the behavior of the native select element.
            // TODO(crisbeto): native selects also cycle through the options with left/right arrows,
            // however the key manager only supports up/down at the moment.
            this._keyManager.onKeydown(event);
            /** @type {?} */
            const currentActiveItem = /** @type {?} */ (this._keyManager.activeItem);
            if (currentActiveItem !== prevActiveItem) {
                this._clearSelection();
                this._setSelectionByValue(currentActiveItem.value);
                this._propagateChanges();
            }
        }
    }
    /**
     * Calculates the amount of items in the select. This includes options and group labels.
     * @return {?}
     */
    _getItemCount() {
        return this.options.length + this.optionGroups.length;
    }
    /**
     * Calculates the amount of option group labels that precede the specified option.
     * Useful when positioning the panel, because the labels will offset the index of the
     * currently-selected option.
     * @param {?} optionIndex
     * @return {?}
     */
    _getLabelCountBeforeOption(optionIndex) {
        if (this.optionGroups.length) {
            /** @type {?} */
            let options = this.options.toArray();
            /** @type {?} */
            let groups = this.optionGroups.toArray();
            /** @type {?} */
            let groupCounter = 0;
            for (let i = 0; i < optionIndex + 1; i++) {
                if (options[i].group && options[i].group === groups[groupCounter]) {
                    groupCounter++;
                }
            }
            return groupCounter;
        }
        return 0;
    }
}
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
Md2Select.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ViewportRuler },
    { type: ChangeDetectorRef },
    { type: Dir, decorators: [{ type: Optional }] },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional }] },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] }
];
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
class Md2SelectHeader {
}
Md2SelectHeader.decorators = [
    { type: Directive, args: [{
                selector: 'md2-select-header',
                host: {
                    'class': 'md2-select-header',
                }
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Md2SelectModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Md2PaginationChange {
}
class Md2DataTable {
    /**
     * @param {?} differs
     */
    constructor(differs) {
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
    /**
     * @return {?}
     */
    get md2Data() { return this._data; }
    /**
     * @param {?} value
     * @return {?}
     */
    set md2Data(value) {
        if (this._data !== value) {
            this._data = value || [];
            this.recalculatePage();
            this.isDataChanged = true;
        }
    }
    /**
     * @return {?}
     */
    get activePage() { return this._activePage; }
    /**
     * @param {?} value
     * @return {?}
     */
    set activePage(value) {
        if (this._activePage !== value) {
            this._activePage = value;
        }
    }
    /**
     * @return {?}
     */
    get rowsPerPage() { return this._rowsPerPage; }
    /**
     * @param {?} value
     * @return {?}
     */
    set rowsPerPage(value) {
        if (this._rowsPerPage !== value) {
            this._rowsPerPage = value;
            this.setPage(this.activePage, value);
            this.isDataChanged = true;
        }
    }
    /**
     * @return {?}
     */
    get sortBy() { return this._sortBy; }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortBy(value) {
        if (this._sortBy !== value) {
            this._sortBy = value;
            if (value) {
                this.onSortChange.next({ sortBy: this.sortBy, sortOrder: this.sortOrder });
            }
            this.isDataChanged = true;
        }
    }
    /**
     * @return {?}
     */
    get sortOrder() { return this._sortOrder; }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortOrder(value) {
        if (!(value === 'asc' || value === 'desc')) {
            console.warn('sortOrder value must be one of ["asc", "desc"], but is:', value);
            value = 'asc';
        }
        if (this._sortOrder !== value) {
            this._sortOrder = value;
            this.isDataChanged = true;
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        /** @type {?} */
        let changes = this.diff.diff(this.md2Data);
        if (changes) {
            this.recalculatePage();
            this.isDataChanged = true;
        }
        if (this.isDataChanged) {
            this.fillData();
            this.diff.diff(this.md2Data);
            this.isDataChanged = false;
        }
    }
    /**
     * @return {?}
     */
    getSort() {
        return { sortBy: this.sortBy, sortOrder: this.sortOrder };
    }
    /**
     * @param {?} sortBy
     * @param {?} sortOrder
     * @return {?}
     */
    setSort(sortBy, sortOrder) {
        if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
            this.sortBy = sortBy;
            this.sortOrder = sortOrder;
            this.isDataChanged = true;
            this.onSortChange.next({ sortBy: sortBy, sortOrder: sortOrder });
            this.sortByChange.emit(this.sortBy);
            this.sortOrderChange.emit(this.sortOrder);
        }
    }
    /**
     * @return {?}
     */
    getPage() {
        return {
            activePage: this.activePage,
            rowsPerPage: this.rowsPerPage,
            dataLength: this.md2Data.length
        };
    }
    /**
     * @param {?} activePage
     * @param {?} rowsPerPage
     * @return {?}
     */
    setPage(activePage, rowsPerPage) {
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
    }
    /**
     * @param {?} previousRowsPerPage
     * @param {?} currentRowsPerPage
     * @return {?}
     */
    calculateNewActivePage(previousRowsPerPage, currentRowsPerPage) {
        /** @type {?} */
        let firstRowOnPage = (this.activePage - 1) * previousRowsPerPage + 1;
        /** @type {?} */
        let newActivePage = Math.ceil(firstRowOnPage / currentRowsPerPage);
        return newActivePage;
    }
    /**
     * @return {?}
     */
    recalculatePage() {
        /** @type {?} */
        let lastPage = Math.ceil(this.md2Data.length / this.rowsPerPage);
        if (lastPage < this.activePage) {
            this._activePage = lastPage || 1;
            setTimeout(() => {
                this.activePageChange.emit(this.activePage);
            }, 10);
        }
        this.onPageChange.emit({
            activePage: this.activePage,
            rowsPerPage: this.rowsPerPage,
            dataLength: this.md2Data.length
        });
    }
    /**
     * @return {?}
     */
    fillData() {
        /** @type {?} */
        let offset = (this.activePage - 1) * this.rowsPerPage;
        /** @type {?} */
        let data = this.md2Data;
        /** @type {?} */
        let sortInt = this.sortOrder === 'desc' ? -1 : 1;
        if (this.sortBy) {
            data = data.sort((a, b) => {
                /** @type {?} */
                let x = this.caseInsensitiveIteratee(a);
                /** @type {?} */
                let y = this.caseInsensitiveIteratee(b);
                return ((x > y) ? 1 : (y > x) ? -1 : 0) * sortInt;
            });
        }
        this.data = data.slice(offset, offset + this.rowsPerPage);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    caseInsensitiveIteratee(value) {
        if (typeof this.sortBy === 'string' || this.sortBy instanceof String) {
            for (let sortByProperty of this.sortBy.split('.')) {
                value = value[sortByProperty];
            }
        }
        else {
            value = value[this.sortBy + ''];
        }
        if (value && typeof value === 'string' || value instanceof String) {
            return value.toLowerCase();
        }
        return value;
    }
}
Md2DataTable.decorators = [
    { type: Directive, args: [{
                selector: 'table[md2Data]',
                exportAs: 'md2DataTable'
            },] }
];
/** @nocollapse */
Md2DataTable.ctorParameters = () => [
    { type: IterableDiffers }
];
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
class Md2DataTableSortBy {
    /**
     * @param {?} _md2Table
     */
    constructor(_md2Table) {
        this._md2Table = _md2Table;
        this._isAsc = false;
        this._isDesc = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._md2Table.onSortChange.subscribe((event) => {
            this._isAsc = (event.sortBy === this.md2SortBy && event.sortOrder === 'asc');
            this._isDesc = (event.sortBy === this.md2SortBy && event.sortOrder === 'desc');
        });
    }
    /**
     * @return {?}
     */
    _sort() {
        if (this._isAsc) {
            this._md2Table.setSort(this.md2SortBy, 'desc');
        }
        else {
            this._md2Table.setSort(this.md2SortBy, 'asc');
        }
    }
}
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
Md2DataTableSortBy.ctorParameters = () => [
    { type: Md2DataTable }
];
Md2DataTableSortBy.propDecorators = {
    md2SortBy: [{ type: Input }]
};
class Md2Pagination {
    /**
     * @param {?} _dataTable
     */
    constructor(_dataTable) {
        this._dataTable = _dataTable;
        this._activePage = 1;
        this.rowsPerPageSet = [];
        this.paginationLabel = 'Rows per page:';
        this._dataLength = 0;
        this.onPageChangeSubscriber = (event) => {
            this._activePage = event.activePage;
            this._rowsPerPage = event.rowsPerPage;
            this._dataLength = event.dataLength;
            this._lastPage = Math.ceil(this._dataLength / this._rowsPerPage);
        };
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        this.md2Table = this.md2Table || this._dataTable;
        this.onPageChangeSubscriber(this.md2Table.getPage());
        this.md2Table.onPageChange.subscribe(this.onPageChangeSubscriber);
    }
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    _setPage(pageNumber) {
        this.md2Table.setPage(pageNumber, this._rowsPerPage);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _setRows(event) {
        this.md2Table.setPage(this._activePage, parseInt(event.value));
    }
}
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
Md2Pagination.ctorParameters = () => [
    { type: Md2DataTable, decorators: [{ type: Optional }] }
];
Md2Pagination.propDecorators = {
    rowsPerPageSet: [{ type: Input }],
    md2Table: [{ type: Input }],
    paginationLabel: [{ type: Input }]
};
/** @type {?} */
const MD2_DATA_TABLE_DIRECTIVES = [
    Md2DataTable,
    Md2DataTableSortBy,
    Md2Pagination
];
class Md2DataTableModule {
}
Md2DataTableModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, Md2SelectModule],
                exports: MD2_DATA_TABLE_DIRECTIVES,
                declarations: MD2_DATA_TABLE_DIRECTIVES,
            },] }
];

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
const DEFAULT_MONTH_NAMES$1 = {
    'long': [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'
    ],
    'short': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    'narrow': ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
};
const ɵ0$2 = i => String(i + 1);
/** *
 * The default date names to use if Intl API is not available.
  @type {?} */
const DEFAULT_DATE_NAMES$1 = range$1(31, ɵ0$2);
const ɵ1 = i => String(i);
/** *
 * The default hour names to use if Intl API is not available.
  @type {?} */
const DEFAULT_HOUR_NAMES = range$1(24, ɵ1);
const ɵ2 = i => String(i);
/** *
 * The default minute names to use if Intl API is not available.
  @type {?} */
const DEFAULT_MINUTE_NAMES = range$1(60, ɵ2);
/** *
 * The default day of the week names to use if Intl API is not available.
  @type {?} */
const DEFAULT_DAY_OF_WEEK_NAMES$1 = {
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
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
class DateLocale {
    constructor() {
        this.firstDayOfWeek = 0;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayOfWeek(date) {
        return date.getDay();
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getMonthNames(style$$1) {
        if (this.months) {
            return this.months[style$$1];
        }
        return DEFAULT_MONTH_NAMES$1[style$$1];
    }
    /**
     * @return {?}
     */
    getDateNames() {
        if (this.dates) {
            return this.dates;
        }
        return DEFAULT_DATE_NAMES$1;
    }
    /**
     * @return {?}
     */
    getHourNames() {
        if (this.hours) {
            return this.hours;
        }
        return DEFAULT_HOUR_NAMES;
    }
    /**
     * @return {?}
     */
    getMinuteNames() {
        if (this.minutes) {
            return this.minutes;
        }
        return DEFAULT_MINUTE_NAMES;
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getDayOfWeekNames(style$$1) {
        if (this.daysOfWeek) {
            return this.daysOfWeek[style$$1];
        }
        return DEFAULT_DAY_OF_WEEK_NAMES$1[style$$1];
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYearName(date) {
        return String(date.getFullYear());
    }
    /**
     * @return {?}
     */
    getFirstDayOfWeek() {
        // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
        return this.firstDayOfWeek;
    }
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    format(date, displayFormat) {
        return this._stripDirectionalityCharacters(date.toDateString());
    }
    /**
     * @param {?} d
     * @return {?}
     */
    getDateLabel(d) {
        /** @type {?} */
        let day = this.getDayOfWeekNames('short')[d.getDay()];
        /** @type {?} */
        let date = this.getDateNames()[d.getDate() - 1];
        /** @type {?} */
        let month = this.getMonthNames('short')[d.getMonth()];
        return `${day}, ${month} ${date}`;
    }
    /**
     * @param {?} d
     * @return {?}
     */
    getHoursLabel(d) { return `${this.getHourNames()[d.getHours()]}`; }
    /**
     * @param {?} d
     * @return {?}
     */
    getMinutesLabel(d) { return `${this.getMinuteNames()[d.getMinutes()]}`; }
    /**
     * @param {?} d
     * @return {?}
     */
    getMonthLabel(d) {
        return `${this.getMonthNames('long')[d.getMonth()]} ${this.getYearName(d)}`;
    }
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param {?} s The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    _stripDirectionalityCharacters(s) {
        return s.replace(/[\u200e\u200f]/g, '');
    }
}
DateLocale.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DateUtil {
    constructor() {
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
    replace(s, regexp, sub) {
        return (s != null ? '' + s : '').replace(regexp, sub != null ? sub : '');
    }
    /**
     * @param {?} base
     * @param {?} start
     * @return {?}
     */
    startsWith(base, start) {
        return start != null && base.substr(0, start.length) == start;
    }
    /**
     * @param {?} s
     * @param {?} o
     * @return {?}
     */
    isType(s, o) {
        return typeof s == o;
    }
    /**
     * @param {?} f
     * @return {?}
     */
    isFunction(f) {
        return this.isType(f, 'function');
    }
    /**
     * @param {?} v
     * @return {?}
     */
    isList(v) {
        return !!v && v.length != null && !this.isString(v) && !this.isNode(v) && !this.isFunction(v);
    }
    /**
     * @param {?} s
     * @return {?}
     */
    isString(s) {
        return this.isType(s, 'string');
    }
    /**
     * @param {?} f
     * @return {?}
     */
    isObject(f) {
        return !!f && this.isType(f, 'object');
    }
    /**
     * @param {?} n
     * @return {?}
     */
    isNode(n) {
        return n && n['nodeType'];
    }
    /**
     * @param {?} n
     * @return {?}
     */
    isNumber(n) {
        return this.isType(n, 'number');
    }
    /**
     * @param {?} findFunc
     * @return {?}
     */
    getFindFunc(findFunc) {
        return this.isFunction(findFunc) ? findFunc : (obj, index) => {
            if (findFunc === obj) {
                return index;
            }
        };
    }
    /**
     * @param {?} list
     * @param {?} index
     * @param {?} defaultIndex
     * @return {?}
     */
    getFindIndex(list, index, defaultIndex) {
        return index == null ? defaultIndex :
            index < 0 ? Math.max(list.length + index, 0) : Math.min(list.length, index);
    }
    /**
     * @param {?} list
     * @param {?} findFunc
     * @param {?=} startIndex
     * @param {?=} endIndex
     * @return {?}
     */
    find(list, findFunc, startIndex, endIndex) {
        /** @type {?} */
        let f = this.getFindFunc(findFunc);
        /** @type {?} */
        let e = this.getFindIndex(list, endIndex, list.length);
        /** @type {?} */
        let r;
        for (let i = this.getFindIndex(list, startIndex, 0); i < e; i++) {
            if ((r = f.call(list, list[i], i)) != null) {
                return r;
            }
        }
    }
    /**
     * @param {?} date
     * @param {?} fmt
     * @return {?}
     */
    parseDate(date, fmt) {
        /** @type {?} */
        let indexMap = {};
        /** @type {?} */
        let reIndex = 1;
        /** @type {?} */
        let match;
        /** @type {?} */
        let format = this.replace(fmt, /^\?/);
        if (format != fmt && !this.replace(date, /^\s+|\s+$/g)) {
            return null;
        }
        if (match = /^\[([+-])(\d\d)(\d\d)\]\s*(.*)/.exec(format)) {
            format = match[4];
        }
        /** @type {?} */
        let parser = new RegExp(format.replace(/(.)(\1*)(?:\[([^\]]*)\])?/g, (wholeMatch, placeholderChar, placeholderDigits, param) => {
            if (/[dmhkyhs]/i.test(placeholderChar)) {
                indexMap[reIndex++] = placeholderChar;
                /** @type {?} */
                let plen = placeholderDigits.length + 1;
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
                return this.replace(wholeMatch, /[\\\[\]\/{}()*+?.$|^-]/g, '\\$&');
            }
        }));
        if (!(match = parser.exec(date))) {
            return undefined;
        }
        /** @type {?} */
        let ctorArgs = [0, 0, 0, 0, 0, 0, 0];
        for (let i = 1; i < reIndex; i++) {
            /** @type {?} */
            let matchVal = match[i];
            /** @type {?} */
            let indexEntry = indexMap[i];
            if (this.isList(indexEntry)) { // for a, n or N
                /** @type {?} */
                let placeholderChar = indexEntry[0];
                /** @type {?} */
                let mapEntry = this.parseDateMap[placeholderChar];
                /** @type {?} */
                let ctorIndex = mapEntry[0];
                /** @type {?} */
                let valList = indexEntry[1] || mapEntry[1];
                /** @type {?} */
                let listValue = this.find(valList, (v, index) => {
                    if (this.startsWith(matchVal.toLowerCase(), v.toLowerCase())) {
                        return index;
                    }
                });
                if (listValue == null) {
                    return undefined;
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
                let value = parseFloat(matchVal);
                /** @type {?} */
                let mapEntry = this.parseDateMap[indexEntry];
                if (this.isList(mapEntry)) {
                    ctorArgs[mapEntry[0]] += value - mapEntry[1];
                }
                else {
                    ctorArgs[mapEntry] += value;
                }
            }
        }
        /** @type {?} */
        let d = new Date(ctorArgs[0], ctorArgs[1], ctorArgs[2], ctorArgs[3], ctorArgs[4], ctorArgs[5], ctorArgs[6]);
        return d;
    }
    /**
     * @return {?}
     */
    today() {
        return new Date();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    parse(value) {
        /** @type {?} */
        let timestamp = typeof value == 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYear(date) {
        return date.getFullYear();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMonth(date) {
        return date.getMonth();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDate(date) {
        return date.getDate();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getHours(date) {
        return date.getHours();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMinutes(date) {
        return date.getMinutes();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getSeconds(date) {
        return date.getSeconds();
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hours
     * @param {?} minutes
     * @param {?} seconds
     * @return {?}
     */
    createDate(year, month, date, hours, minutes, seconds) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11 || date < 1) {
            return null;
        }
        /** @type {?} */
        let result = this._createDateWithOverflow(year, month, date, hours, minutes, seconds);
        // Check that the date wasn't above the upper bound for the month, causing the month to
        // overflow.
        if (result.getMonth() != month) {
            return null;
        }
        return result;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    clone(date) {
        return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date), this.getSeconds(date));
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getNumDaysInMonth(date) {
        return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0, 0, 0, 0));
    }
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    addCalendarYears(date, years) {
        return this.addCalendarMonths(date, years * 12);
    }
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    addCalendarMonths(date, months) {
        /** @type {?} */
        let newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date), this.getHours(date), this.getMinutes(date), this.getSeconds(date));
        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
        // guarantee this.
        if (this.getMonth(newDate) != ((this.getMonth(date) + months) % 12 + 12) % 12) {
            newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0, this.getHours(newDate), this.getMinutes(newDate), this.getSeconds(newDate));
        }
        return newDate;
    }
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    addCalendarDays(date, days) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days, this.getHours(date), this.getMinutes(date), this.getSeconds(date));
    }
    /**
     * @param {?} date
     * @param {?} hours
     * @return {?}
     */
    addCalendarHours(date, hours) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date) + hours, this.getMinutes(date), this.getSeconds(date));
    }
    /**
     * @param {?} date
     * @param {?} minutes
     * @return {?}
     */
    addCalendarMinutes(date, minutes) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date) + minutes, this.getSeconds(date));
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getISODateString(date) {
        return [
            date.getUTCFullYear(),
            this._2digit(date.getUTCMonth() + 1),
            this._2digit(date.getUTCDate())
        ].join('-');
    }
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
    _createDateWithOverflow(year, month, date, hours, minutes, seconds) {
        /** @type {?} */
        let result = new Date(year, month, date, hours, minutes, seconds);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    }
    /**
     * Pads a number to make it two digits.
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    _2digit(n) {
        return ('00' + n).slice(-2);
    }
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    compareDate(first$$1, second) {
        return this.getYear(first$$1) - this.getYear(second) ||
            this.getMonth(first$$1) - this.getMonth(second) ||
            this.getDate(first$$1) - this.getDate(second);
    }
    /**
     * Gets the first day of the month for the given date's month.
     * @param {?} date
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    getFirstDateOfWeek(date, firstDayOfWeek) {
        /** @type {?} */
        let day = date.getDate() - ((7 + date.getDay() - firstDayOfWeek) % 7);
        return new Date(date.getFullYear(), date.getMonth(), day, date.getHours(), date.getMinutes());
    }
    /**
     * Gets the first day of the month for the given date's month.
     * @param {?} date
     * @return {?}
     */
    getFirstDateOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }
    /**
     * Gets the number of days in the month for the given date's month.
     * @param {?} date
     * @return {?}
     */
    getNumberOfDaysInMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }
    /**
     * Get an arbitrary date in the month after the given date's month.
     * @param {?} date
     * @return {?}
     */
    getDateInNextMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1, date.getHours(), date.getMinutes());
    }
    /**
     * Get an arbitrary date in the month before the given date's month.
     * @param {?} date
     * @return {?}
     */
    getDateInPreviousMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() - 1, 1, date.getHours(), date.getMinutes());
    }
    /**
     * Gets whether two dates have the same year.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    isSameYear(d1, d2) {
        return d1 && d2 && d1.getFullYear() === d2.getFullYear();
    }
    /**
     * Gets whether two dates have the same month and year.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    isSameMonthAndYear(d1, d2) {
        return d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
    }
    /**
     * Gets whether two dates are the same day (not not necesarily the same time).
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    isSameDay(d1, d2) {
        return d1 && d2 && d1.getDate() == d2.getDate() && this.isSameMonthAndYear(d1, d2);
    }
    /**
     * Gets whether two dates are the same hours.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    isSameHour(d1, d2) {
        return d1 && d2 && d1.getHours() == d2.getHours() && this.isSameDay(d1, d2);
    }
    /**
     * Gets whether two dates are the same minutes.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    isSameMinute(d1, d2) {
        return d1 && d2 && d1.getMinutes() == d2.getMinutes() && this.isSameHour(d1, d2);
    }
    /**
     * Gets whether a date is in the month immediately after some date.
     * @param {?} startDate The date from which to compare.
     * @param {?} endDate The date to check.
     * @return {?}
     */
    isInNextMonth(startDate, endDate) {
        /** @type {?} */
        let nextMonth = this.getDateInNextMonth(startDate);
        return this.isSameMonthAndYear(nextMonth, endDate);
    }
    /**
     * Gets whether a date is in the month immediately before some date.
     * @param {?} startDate The date from which to compare.
     * @param {?} endDate The date to check.
     * @return {?}
     */
    isInPreviousMonth(startDate, endDate) {
        /** @type {?} */
        let previousMonth = this.getDateInPreviousMonth(startDate);
        return this.isSameMonthAndYear(endDate, previousMonth);
    }
    /**
     * Gets the midpoint between two dates.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    getDateMidpoint(d1, d2) {
        return this.createDateAtMidnight((d1.getTime() + d2.getTime()) / 2);
    }
    /**
     * Gets the week of the month that a given date occurs in.
     * @param {?} date
     * @return {?} Index of the week of the month (zero-based).
     */
    getWeekOfMonth(date) {
        /** @type {?} */
        let firstDayOfMonth = this.getFirstDateOfMonth(date);
        return Math.floor((firstDayOfMonth.getDay() + date.getDate() - 1) / 7);
    }
    /**
     * Gets the week of the year that a given date occurs in.
     * @param {?} date
     * @return {?} Index of the week according to ISO-8601.
     */
    getWeekOfYear(date) {
        /** @type {?} */
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        /** @type {?} */
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        // Calculate full weeks to nearest Thursday and return weekNo
        return Math.ceil((((+d - +yearStart) / 86400000) + 1) / 7);
    }
    /**
     * Gets a new date incremented by the given number of minutes. Number of minutes can be negative.
     * @param {?} date
     * @param {?} numberOfMinutes
     * @return {?}
     */
    incrementMinutes(date, numberOfMinutes) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + numberOfMinutes);
    }
    /**
     * Gets a new date incremented by the given number of hours. Number of hours can be negative.
     * @param {?} date
     * @param {?} numberOfHours
     * @return {?}
     */
    incrementHours(date, numberOfHours) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + numberOfHours, date.getMinutes());
    }
    /**
     * Gets a new date incremented by the given number of days. Number of days can be negative.
     * @param {?} date
     * @param {?} numberOfDays
     * @return {?}
     */
    incrementDays(date, numberOfDays) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + numberOfDays, date.getHours(), date.getMinutes());
    }
    /**
     * Gets a new date incremented by the given number of months. Number of months can be negative.
     * If the date of the given month does not match the target month, the date will be set to the
     * last day of the month.
     * @param {?} date
     * @param {?} numberOfMonths
     * @return {?}
     */
    incrementMonths(date, numberOfMonths) {
        /** @type {?} */
        let dateInTargetMonth = new Date(date.getFullYear(), date.getMonth() + numberOfMonths, 1, date.getHours(), date.getMinutes());
        /** @type {?} */
        let numberOfDaysInMonth = this.getNumberOfDaysInMonth(dateInTargetMonth);
        if (numberOfDaysInMonth < date.getDate()) {
            dateInTargetMonth.setDate(numberOfDaysInMonth);
        }
        else {
            dateInTargetMonth.setDate(date.getDate());
        }
        return dateInTargetMonth;
    }
    /**
     * Get the integer distance between two months. This *only* considers the month and year
     * portion of the Date instances.
     *
     * @param {?} start
     * @param {?} end
     * @return {?} Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    getMonthDistance(start, end) {
        return (12 * (end.getFullYear() - start.getFullYear())) + (end.getMonth() - start.getMonth());
    }
    /**
     * Gets the last day of the month for the given date.
     * @param {?} date
     * @return {?}
     */
    getLastDateOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), this.getNumberOfDaysInMonth(date), date.getHours(), date.getMinutes());
    }
    /**
     * Checks whether a date is valid.
     * @param {?} date
     * @return {?} Whether the date is a valid Date.
     */
    isValidDate(date) {
        return date != null && date.getTime && !isNaN(date.getTime());
    }
    /**
     * Sets a date's time to midnight.
     * @param {?} date
     * @return {?}
     */
    setDateTimeToMidnight(date) {
        if (this.isValidDate(date)) {
            date.setHours(0, 0, 0, 0);
        }
    }
    /**
     * Creates a date with the time set to midnight.
     * Drop-in replacement for two forms of the Date constructor:
     * 1. No argument for Date representing now.
     * 2. Single-argument value representing number of seconds since Unix Epoch
     * or a Date object.
     * @param {?} value
     * @return {?} New date with time set to midnight.
     */
    createDateAtMidnight(value) {
        /** @type {?} */
        let date;
        if (!value) {
            date = new Date();
        }
        else {
            date = new Date(value);
        }
        this.setDateTimeToMidnight(date);
        return date;
    }
    /**
     * Checks if a date is within a min and max range, ignoring the time component.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {?} date
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    isDateWithinRange(date, minDate, maxDate) {
        /** @type {?} */
        let dateAtMidnight = this.createDateAtMidnight(date);
        /** @type {?} */
        let minDateAtMidnight = this.isValidDate(minDate) ? this.createDateAtMidnight(minDate) : null;
        /** @type {?} */
        let maxDateAtMidnight = this.isValidDate(maxDate) ? this.createDateAtMidnight(maxDate) : null;
        return (!minDateAtMidnight || minDateAtMidnight <= dateAtMidnight) &&
            (!maxDateAtMidnight || maxDateAtMidnight >= dateAtMidnight);
    }
    /**
     * Checks if a date is within a min and max range.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {?} date
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    isFullDateWithinRange(date, minDate, maxDate) {
        minDate = this.isValidDate(minDate) ? minDate : null;
        maxDate = this.isValidDate(maxDate) ? maxDate : null;
        return (!minDate || minDate <= date) &&
            (!maxDate || maxDate >= date);
    }
    /**
     * Gets a new date incremented by the given number of years. Number of years can be negative.
     * See `incrementMonths` for notes on overflow for specific dates.
     * @param {?} date
     * @param {?} numberOfYears
     * @return {?}
     */
    incrementYears(date, numberOfYears) {
        return this.incrementMonths(date, numberOfYears * 12);
    }
    /**
     * Get the integer distance between two years. This *only* considers the year portion of the
     * Date instances.
     *
     * @param {?} start
     * @param {?} end
     * @return {?} Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    getYearDistance(start, end) {
        return end.getFullYear() - start.getFullYear();
    }
    /**
     * Clamps a date between a minimum and a maximum date.
     * @param {?} date Date to be clamped
     * @param {?} minDate Minimum date
     * @param {?} maxDate Maximum date
     * @return {?}
     */
    clampDate(date, minDate, maxDate) {
        /** @type {?} */
        let boundDate = date;
        if (minDate && date < minDate) {
            boundDate = new Date(minDate.getTime());
        }
        if (maxDate && date > maxDate) {
            boundDate = new Date(maxDate.getTime());
        }
        return boundDate;
    }
    /**
     * Extracts and parses the timestamp from a DOM node.
     * @param {?} node Node from which the timestamp will be extracted.
     * @return {?} Time since epoch.
     */
    getTimestampFromNode(node) {
        if (node && node.hasAttribute('data-timestamp')) {
            return Number(node.getAttribute('data-timestamp'));
        }
    }
    /**
     * Checks if a month is within a min and max range, ignoring the date and time components.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {?} date
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    isMonthWithinRange(date, minDate, maxDate) {
        /** @type {?} */
        let month = date.getMonth();
        /** @type {?} */
        let year = date.getFullYear();
        return (!minDate || minDate.getFullYear() < year || minDate.getMonth() <= month) &&
            (!maxDate || maxDate.getFullYear() > year || maxDate.getMonth() >= month);
    }
    /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    compareDateAndTime(first$$1, second) {
        return this.getYear(first$$1) - this.getYear(second) ||
            this.getMonth(first$$1) - this.getMonth(second) ||
            this.getDate(first$$1) - this.getDate(second) ||
            this.getHours(first$$1) - this.getDate(second) ||
            this.getMinutes(first$$1) - this.getDate(second) ||
            this.getSeconds(first$$1) - this.getDate(second);
    }
    /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    sameDate(first$$1, second) {
        return first$$1 && second ? !this.compareDate(first$$1, second) : first$$1 == second;
    }
    /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    sameDateAndTime(first$$1, second) {
        return first$$1 && second ? !this.compareDateAndTime(first$$1, second) : first$$1 == second;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * This animation fades in the background color and text content of the
 * select's options. It is time delayed to occur 100ms after the overlay
 * panel has transformed in.
  @type {?} */
const fadeInContent$1 = trigger('fadeInContent', [
    state('showing', style({ opacity: 1 })),
    transition('void => showing', [
        style({ opacity: 0 }),
        animate(`150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)`)
    ])
]);
/** @type {?} */
const slideCalendar = trigger('slideCalendar', [
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
class Md2Calendar {
    /**
     * @param {?} _elementRef
     * @param {?} _ngZone
     * @param {?} _locale
     * @param {?} _util
     */
    constructor(_elementRef, _ngZone, _locale, _util) {
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
        this._dateFilterForViews = (date) => {
            return !!date &&
                (!this.dateFilter || this.dateFilter(date)) &&
                (!this.minDate || this._util.compareDate(date, this.minDate) >= 0) &&
                (!this.maxDate || this._util.compareDate(date, this.maxDate) <= 0);
        };
        /**
         * Whether the calendar is in month view.
         */
        this._currentView = 'month';
        this._clockView = 'hour';
    }
    /**
     * The current active date. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     * @return {?}
     */
    get _activeDate() { return this._clampedActiveDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set _activeDate(value) {
        /** @type {?} */
        let oldActiveDate = this._clampedActiveDate;
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
    }
    /**
     * The label for the current calendar view.
     * @return {?}
     */
    get _yearLabel() {
        return this._locale.getYearName(this._activeDate);
    }
    /**
     * @return {?}
     */
    get _monthYearLabel() {
        return this._currentView === 'month' ? this._locale.getMonthLabel(this._activeDate) :
            this._locale.getYearName(this._activeDate);
    }
    /**
     * @return {?}
     */
    get _dateLabel() {
        return this._locale.getDateLabel(this._activeDate);
    }
    /**
     * @return {?}
     */
    get _hoursLabel() {
        return ('0' + this._locale.getHoursLabel(this._activeDate)).slice(-2);
    }
    /**
     * @return {?}
     */
    get _minutesLabel() {
        return ('0' + this._locale.getMinutesLabel(this._activeDate)).slice(-2);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
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
    }
    /**
     * Handles date selection in the month view.
     * @param {?} date
     * @return {?}
     */
    _dateSelected(date) {
        if (this.type == 'date') {
            if (!this._util.sameDate(date, this.selected)) {
                this.selectedChange.emit(date);
            }
        }
        else {
            this._activeDate = date;
            this._currentView = 'clock';
        }
    }
    /**
     * Handles month selection in the year view.
     * @param {?} month
     * @return {?}
     */
    _monthSelected(month) {
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
    }
    /**
     * @param {?} date
     * @return {?}
     */
    _timeSelected(date) {
        if (this._clockView !== 'minute') {
            this._activeDate = date;
            this._clockView = 'minute';
        }
        else {
            if (!this._util.sameDateAndTime(date, this.selected)) {
                this.selectedChange.emit(date);
            }
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    _onActiveDateChange(date) {
        this._activeDate = date;
    }
    /**
     * @return {?}
     */
    _yearClicked() {
        this._currentView = 'year';
    }
    /**
     * @return {?}
     */
    _dateClicked() {
        this._currentView = 'month';
    }
    /**
     * @return {?}
     */
    _hoursClicked() {
        this._currentView = 'clock';
        this._clockView = 'hour';
    }
    /**
     * @return {?}
     */
    _minutesClicked() {
        this._currentView = 'clock';
        this._clockView = 'minute';
    }
    /**
     * Handles user clicks on the previous button.
     * @return {?}
     */
    _previousClicked() {
        this._activeDate = this._currentView === 'month' ?
            this._util.addCalendarMonths(this._activeDate, -1) :
            this._util.addCalendarYears(this._activeDate, -1);
    }
    /**
     * Handles user clicks on the next button.
     * @return {?}
     */
    _nextClicked() {
        this._activeDate = this._currentView === 'month' ?
            this._util.addCalendarMonths(this._activeDate, 1) :
            this._util.addCalendarYears(this._activeDate, 1);
    }
    /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    _previousEnabled() {
        if (!this.minDate) {
            return true;
        }
        return !this.minDate || !this._isSameView(this._activeDate, this.minDate);
    }
    /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    _nextEnabled() {
        return !this.maxDate || !this._isSameView(this._activeDate, this.maxDate);
    }
    /**
     * Handles keydown events on the calendar body.
     * @param {?} event
     * @return {?}
     */
    _handleCalendarBodyKeydown(event) {
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
    }
    /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    _isSameView(date1, date2) {
        return this._currentView === 'month' ?
            this._util.getYear(date1) == this._util.getYear(date2) &&
                this._util.getMonth(date1) == this._util.getMonth(date2) :
            this._util.getYear(date1) == this._util.getYear(date2);
    }
    /**
     * Handles keydown events on the calendar body when calendar is in month view.
     * @param {?} event
     * @return {?}
     */
    _handleCalendarBodyKeydownInMonthView(event) {
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
    }
    /**
     * Handles keydown events on the calendar body when calendar is in year view.
     * @param {?} event
     * @return {?}
     */
    _handleCalendarBodyKeydownInYearView(event) {
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
    }
    /**
     * Handles keydown events on the calendar body when calendar is in month view.
     * @param {?} event
     * @return {?}
     */
    _handleCalendarBodyKeydownInClockView(event) {
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
    }
    /**
     * Determine the date for the month that comes before the given month in the same column in the
     * calendar table.
     * @param {?} date
     * @return {?}
     */
    _prevMonthInSameCol(date) {
        /** @type {?} */
        let increment = this._util.getMonth(date) <= 4 ? -5 :
            (this._util.getMonth(date) >= 7 ? -7 : -12);
        return this._util.addCalendarMonths(date, increment);
    }
    /**
     * Determine the date for the month that comes after the given month in the same column in the
     * calendar table.
     * @param {?} date
     * @return {?}
     */
    _nextMonthInSameCol(date) {
        /** @type {?} */
        let increment = this._util.getMonth(date) <= 4 ? 7 :
            (this._util.getMonth(date) >= 7 ? 5 : 12);
        return this._util.addCalendarMonths(date, increment);
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    calendarState(direction) {
        this._calendarState = direction;
    }
    /**
     * @return {?}
     */
    _calendarStateDone() {
        this._calendarState = '';
    }
}
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
Md2Calendar.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: DateLocale },
    { type: DateUtil }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Change event object emitted by Md2Select.
 */
class Md2DateChange {
    /**
     * @param {?} source
     * @param {?} value
     */
    constructor(source, value) {
        this.source = source;
        this.value = value;
    }
}
/** *
 * Used to generate a unique ID for each datepicker instance.
  @type {?} */
let datepickerUid = 0;
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * Md2Calendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * \@docs-private
 */
class Md2DatepickerContent {
    /**
     * Handles keydown event on datepicker content.
     * @param {?} event The event.
     * @return {?}
     */
    _handleKeydown(event) {
        switch (event.keyCode) {
            case ESCAPE:
                this.datepicker.close();
                break;
            default:
                /* Return so that we don't preventDefault on keys that are not explicitly handled. */
                return;
        }
        event.preventDefault();
    }
}
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
/** @type {?} */
const MD2_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Md2Datepicker),
    multi: true
};
/** @type {?} */
const MD2_DATEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => Md2Datepicker),
    multi: true
};
class Md2Datepicker {
    /**
     * @param {?} _element
     * @param {?} _overlay
     * @param {?} _ngZone
     * @param {?} _viewContainerRef
     * @param {?} _locale
     * @param {?} _util
     * @param {?} _dir
     */
    constructor(_element, _overlay, _ngZone, _viewContainerRef, _locale, _util, _dir) {
        this._element = _element;
        this._overlay = _overlay;
        this._ngZone = _ngZone;
        this._viewContainerRef = _viewContainerRef;
        this._locale = _locale;
        this._util = _util;
        this._dir = _dir;
        this._onChange = () => { };
        this._onTouched = () => { };
        this._validatorOnChange = () => { };
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
        this._minValidator = (control) => {
            return (!this.min || !control.value ||
                this._util.compareDate(this.min, control.value) <= 0) ?
                null : { 'md2DatepickerMin': { 'min': this.min, 'actual': control.value } };
        };
        /**
         * The form control validator for the max date.
         */
        this._maxValidator = (control) => {
            return (!this.max || !control.value ||
                this._util.compareDate(this.max, control.value) >= 0) ?
                null : { 'md2DatepickerMax': { 'max': this.max, 'actual': control.value } };
        };
        /**
         * The form control validator for the date filter.
         */
        this._filterValidator = (control) => {
            return !this._dateFilter || !control.value || this._dateFilter(control.value) ?
                null : { 'md2DatepickerFilter': true };
        };
        /**
         * The combined form control validator for this input.
         */
        this._validator = Validators.compose([this._minValidator, this._maxValidator, this._filterValidator]);
        this.id = (this.id) ? this.id : `md2-datepicker-${datepickerUid++}`;
    }
    /**
     * @return {?}
     */
    get type() { return this._type; }
    /**
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        this._type = value || 'date';
        this._inputValue = this._formatDate(this._value);
    }
    /**
     * @return {?}
     */
    get format() {
        return this._format || (this.type === 'month' ? 'MMMM y' : this.type === 'date' ?
            'dd/MM/y' : this.type === 'time' ? 'HH:mm' : this.type === 'datetime' ?
            'dd/MM/y HH:mm' : 'dd/MM/y');
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set format(value) {
        if (this._format !== value) {
            this._format = value;
            this._inputValue = this._formatDate(this._value);
        }
    }
    /**
     * The minimum valid date.
     * @return {?}
     */
    get min() { return this._minDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set min(value) {
        this._minDate = value;
        this._validatorOnChange();
    }
    /**
     * The maximum valid date.
     * @return {?}
     */
    get max() { return this._maxDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set max(value) {
        this._maxDate = value;
        this._validatorOnChange();
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    set dateFilter(filter$$1) {
        this._dateFilter = filter$$1;
        this._validatorOnChange();
    }
    /**
     * @return {?}
     */
    get required() { return this._required; }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) { this._required = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = this.coerceDateProperty(value);
        this._selected = this._value;
        this.startAt = this._value;
        setTimeout(() => {
            this._inputValue = this._formatDate(this._value);
        });
    }
    /**
     * @return {?}
     */
    get openOnFocus() { return this._openOnFocus; }
    /**
     * @param {?} value
     * @return {?}
     */
    set openOnFocus(value) { this._openOnFocus = coerceBooleanProperty(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    set isOpen(value) {
        if (value && !this.opened) {
            this.open();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
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
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnValidatorChange(fn) {
        this._validatorOnChange = fn;
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        return this._validator ? this._validator(c) : null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this._onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this._onTouched = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @return {?}
     */
    _handleFocus() {
        this._inputFocused = true;
        if (!this.opened && this.openOnFocus) {
            this.open();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleBlur(event) {
        this._inputFocused = false;
        if (!this.opened) {
            this._onTouched();
        }
        /** @type {?} */
        let el = event.target;
        /** @type {?} */
        let date = this._util.parseDate(el.value, this.format);
        if (!date) {
            date = this._util.parse(el.value);
        }
        if (date != null && date.getTime && !isNaN(date.getTime())) {
            /** @type {?} */
            let d = new Date(this.value);
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
    }
    /**
     * @param {?} value
     * @return {?}
     */
    coerceDateProperty(value) {
        /** @type {?} */
        let v = null;
        if (value != null && value.getTime && !isNaN(value.getTime())) {
            v = value;
        }
        else {
            if (value && this.type === 'time') {
                /** @type {?} */
                let t = value + '';
                v = new Date();
                v.setHours(parseInt(t.substring(0, 2)));
                v.setMinutes(parseInt(t.substring(3, 5)));
            }
            else {
                /** @type {?} */
                let timestamp = Date.parse(value);
                v = isNaN(timestamp) ? null : new Date(timestamp);
            }
        }
        /** @type {?} */
        let d = v ? this._util.createDate(v.getFullYear(), v.getMonth(), v.getDate(), v.getHours(), v.getMinutes(), v.getSeconds()) : null;
        return d;
    }
    /**
     * format date
     * @param {?} date Date Object
     * @return {?} string with formatted date
     */
    _formatDate(date) {
        if (!this.format || !date) {
            return '';
        }
        /** @type {?} */
        let format = this.format;
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
    }
    /**
     * Get an hour of the date in the 12-hour format
     * @param {?} hours
     * @return {?} hour of the date in the 12-hour format
     */
    _getHours12(hours) {
        if (hours == 0) {
            hours = 12;
        }
        else if (hours > 12) {
            hours -= 12;
        }
        return hours;
    }
    /**
     * Selects the given date and closes the currently open popup or dialog.
     * @param {?} date
     * @return {?}
     */
    _selectAndClose(date) {
        /** @type {?} */
        let oldValue = this._selected;
        this.value = date;
        if (!this._util.sameDateAndTime(oldValue, this._selected)) {
            this._emitChangeEvent();
        }
        this.close();
    }
    /**
     * Emits an event when the user selects a date.
     * @return {?}
     */
    _emitChangeEvent() {
        this._onChange(this.value);
        this.change.emit(new Md2DateChange(this, this.value));
    }
    /**
     * Open the calendar.
     * @return {?}
     */
    open() {
        if (this.opened) {
            return;
        }
        if (!this._calendarPortal) {
            this._calendarPortal = new ComponentPortal(Md2DatepickerContent, this._viewContainerRef);
        }
        this.touchUi ? this._openAsDialog() : this._openAsPopup();
        this.opened = true;
        this.onOpen.emit();
    }
    /**
     * Close the calendar.
     * @return {?}
     */
    close() {
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
    }
    /**
     * Open the calendar as a dialog.
     * @return {?}
     */
    _openAsDialog() {
        if (!this._dialogRef) {
            this._createDialog();
        }
        if (!this._dialogRef.hasAttached()) {
            /** @type {?} */
            let componentRef = this._dialogRef.attach(this._calendarPortal);
            componentRef.instance.datepicker = this;
        }
        this._dialogRef.backdropClick().subscribe(() => this.close());
    }
    /**
     * Open the calendar as a popup.
     * @return {?}
     */
    _openAsPopup() {
        if (!this._popupRef) {
            this._createPopup();
        }
        if (!this._popupRef.hasAttached()) {
            /** @type {?} */
            let componentRef = this._popupRef.attach(this._calendarPortal);
            componentRef.instance.datepicker = this;
            /* Update the position once the calendar has rendered. */
            this._ngZone.onStable.pipe(first()).subscribe(() => this._popupRef.updatePosition());
        }
        this._popupRef.backdropClick().subscribe(() => this.close());
    }
    /**
     * Create the dialog.
     * @return {?}
     */
    _createDialog() {
        /** @type {?} */
        const overlayState = new OverlayState();
        overlayState.positionStrategy = this._overlay.position().global()
            .centerHorizontally()
            .centerVertically();
        overlayState.hasBackdrop = true;
        overlayState.backdropClass = 'cdk-overlay-dark-backdrop';
        overlayState.direction = this._dir ? this._dir.value : 'ltr';
        this._dialogRef = this._overlay.create(overlayState);
    }
    /**
     * Create the popup.
     * @return {?}
     */
    _createPopup() {
        /** @type {?} */
        const overlayState = new OverlayState();
        overlayState.positionStrategy = this._createPopupPositionStrategy();
        overlayState.hasBackdrop = true;
        overlayState.backdropClass = 'cdk-overlay-transparent-backdrop';
        overlayState.direction = this._dir ? this._dir.value : 'ltr';
        overlayState.scrollStrategy = this._overlay.scrollStrategies.reposition();
        this._popupRef = this._overlay.create(overlayState);
    }
    /**
     * Create the popup PositionStrategy.
     * @return {?}
     */
    _createPopupPositionStrategy() {
        return this._overlay.position()
            .connectedTo(this._element, { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
            .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
            .withFallbackPosition({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' })
            .withFallbackPosition({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' });
    }
}
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
Md2Datepicker.ctorParameters = () => [
    { type: ElementRef },
    { type: Overlay },
    { type: NgZone },
    { type: ViewContainerRef },
    { type: DateLocale },
    { type: DateUtil },
    { type: Dir, decorators: [{ type: Optional }] }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @template D
 */
class Md2DatepickerToggle {
    /**
     * @param {?} event
     * @return {?}
     */
    _open(event) {
        if (this.datepicker) {
            this.datepicker.open();
            event.stopPropagation();
        }
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * \@docs-private
 */
class Md2CalendarCell {
    /**
     * @param {?} value
     * @param {?} displayValue
     * @param {?} ariaLabel
     * @param {?} enabled
     * @param {?=} header
     */
    constructor(value, displayValue, ariaLabel, enabled, header) {
        this.value = value;
        this.displayValue = displayValue;
        this.ariaLabel = ariaLabel;
        this.enabled = enabled;
        this.header = header;
    }
}
/**
 * An internal component used to display calendar data in a table.
 * \@docs-private
 */
class Md2CalendarBody {
    constructor() {
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
    _cellClicked(cell) {
        if (!this.allowDisabledSelection && !cell.enabled) {
            return;
        }
        this.selectedValueChange.emit(cell.value);
    }
    /**
     * The number of blank cells to put at the beginning for the first row.
     * @return {?}
     */
    get _firstRowOffset() {
        return this.rows && this.rows.length && this.rows[0].length ?
            this.numCols - this.rows[0].length : 0;
    }
    /**
     * @param {?} rowIndex
     * @param {?} colIndex
     * @return {?}
     */
    _isActiveCell(rowIndex, colIndex) {
        /** @type {?} */
        let cellNumber = rowIndex * this.numCols + colIndex;
        // Account for the fact that the first row may not have as many cells.
        if (rowIndex) {
            cellNumber -= this._firstRowOffset;
        }
        return cellNumber == this.activeCell;
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const DAYS_PER_WEEK = 7;
/**
 * An internal component used to display a single month in the datepicker.
 * \@docs-private
 */
class Md2MonthView {
    /**
     * @param {?} _locale
     * @param {?} _util
     * @param {?} _dateFormats
     */
    constructor(_locale, _util, _dateFormats) {
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
        const firstDayOfWeek = this._locale.getFirstDayOfWeek();
        /** @type {?} */
        const narrowWeekdays = this._locale.getDayOfWeekNames('narrow');
        /** @type {?} */
        const longWeekdays = this._locale.getDayOfWeekNames('long');
        /** @type {?} */
        let weekdays = longWeekdays.map((long, i) => {
            return { long, narrow: narrowWeekdays[i] };
        });
        this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
        this._activeDate = this._util.today();
    }
    /**
     * The date to display in this month view (everything other than the month and year is ignored).
     * @return {?}
     */
    get activeDate() { return this._activeDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set activeDate(value) {
        /** @type {?} */
        let oldActiveDate = this._activeDate;
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
    }
    /**
     * The currently selected date.
     * @return {?}
     */
    get selected() { return this._selected; }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        this._selected = value;
        this._selectedDate = this._getDateInCurrentMonth(this.selected);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._init();
    }
    /**
     * Handles when a new date is selected.
     * @param {?} date
     * @return {?}
     */
    _dateSelected(date) {
        this.selectedChange.emit(this._util.createDate(this._util.getYear(this.activeDate), this._util.getMonth(this.activeDate), date, this._util.getHours(this.activeDate), this._util.getMinutes(this.activeDate), this._util.getSeconds(this.activeDate)));
    }
    /**
     * Initializes this month view.
     * @return {?}
     */
    _init() {
        this._selectedDate = this._getDateInCurrentMonth(this.selected);
        this._todayDate = this._getDateInCurrentMonth(this._util.today());
        /** @type {?} */
        let firstOfMonth = this._util.createDate(this._util.getYear(this.activeDate), this._util.getMonth(this.activeDate), 1, this._util.getHours(this.activeDate), this._util.getMinutes(this.activeDate), this._util.getSeconds(this.activeDate));
        this._firstWeekOffset =
            (DAYS_PER_WEEK + this._locale.getDayOfWeek(firstOfMonth) -
                this._locale.getFirstDayOfWeek()) % DAYS_PER_WEEK;
        this._createWeekCells();
    }
    /**
     * Creates MdCalendarCells for the dates in this month.
     * @return {?}
     */
    _createWeekCells() {
        /** @type {?} */
        let daysInMonth = this._util.getNumDaysInMonth(this.activeDate);
        /** @type {?} */
        let dateNames = this._locale.getDateNames();
        /** @type {?} */
        let oldWeek;
        this._weeks = [];
        for (let i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
            /** @type {?} */
            let date = this._util.createDate(this._util.getYear(this.activeDate), this._util.getMonth(this.activeDate), i + 1, this._util.getHours(this.activeDate), this._util.getMinutes(this.activeDate), this._util.getSeconds(this.activeDate));
            /** @type {?} */
            let enabled = !this.dateFilter ||
                this.dateFilter(date);
            /** @type {?} */
            let ariaLabel = this._locale.format(date, this._dateFormats.display.dateA11yLabel);
            /** @type {?} */
            let newWeek = this._util.getWeekOfYear(date);
            if (oldWeek !== newWeek) {
                this._weeks.push([]);
                oldWeek = newWeek;
                cell = 0;
            }
            this._weeks[this._weeks.length - 1]
                .push(new Md2CalendarCell(i + 1, dateNames[i], ariaLabel, enabled, newWeek.toString()));
        }
    }
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     * @param {?} date
     * @return {?}
     */
    _getDateInCurrentMonth(date) {
        return this._util.isSameMonthAndYear(date, this.activeDate) ?
            this._util.getDate(date) : null;
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    calendarState(direction) {
        this._calendarState = direction;
    }
    /**
     * @return {?}
     */
    _calendarStateDone() {
        this._calendarState = '';
    }
}
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
Md2MonthView.ctorParameters = () => [
    { type: DateLocale },
    { type: DateUtil },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MD_DATE_FORMATS,] }] }
];
Md2MonthView.propDecorators = {
    displayWeek: [{ type: Input }],
    activeDate: [{ type: Input }],
    selected: [{ type: Input }],
    dateFilter: [{ type: Input }],
    selectedChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * An internal component used to display a single year in the datepicker.
 * \@docs-private
 */
class Md2YearView {
    /**
     * @param {?} _locale
     * @param {?} _util
     * @param {?} _dateFormats
     */
    constructor(_locale, _util, _dateFormats) {
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
    /**
     * The date to display in this year view (everything other than the year is ignored).
     * @return {?}
     */
    get activeDate() { return this._activeDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set activeDate(value) {
        /** @type {?} */
        let oldActiveDate = this._activeDate;
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
    }
    /**
     * The currently selected date.
     * @return {?}
     */
    get selected() { return this._selected; }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        this._selected = value;
        this._selectedMonth = this._getMonthInCurrentYear(this.selected);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._init();
    }
    /**
     * Handles when a new month is selected.
     * @param {?} month
     * @return {?}
     */
    _monthSelected(month) {
        this.selectedChange.emit(this._util.createDate(this._util.getYear(this.activeDate), month, this._util.getDate(this.activeDate), this._util.getHours(this.activeDate), this._util.getMinutes(this.activeDate), this._util.getSeconds(this.activeDate)));
    }
    /**
     * Initializes this month view.
     * @return {?}
     */
    _init() {
        this._selectedMonth = this._getMonthInCurrentYear(this.selected);
        this._todayMonth = this._getMonthInCurrentYear(this._util.today());
        this._yearLabel = this._locale.getYearName(this.activeDate);
        /** @type {?} */
        let monthNames = this._locale.getMonthNames('short');
        // First row of months only contains 5 elements so we can fit the year label on the same row.
        this._months = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9, 10, 11]].map(row => row.map(month => this._createCellForMonth(month, monthNames[month])));
    }
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     * @param {?} date
     * @return {?}
     */
    _getMonthInCurrentYear(date) {
        return this._util.isSameYear(date, this.activeDate) ?
            this._util.getMonth(date) : null;
    }
    /**
     * Creates an MdCalendarCell for the given month.
     * @param {?} month
     * @param {?} monthName
     * @return {?}
     */
    _createCellForMonth(month, monthName) {
        /** @type {?} */
        let ariaLabel = this._locale.format(this._util.createDate(this._util.getYear(this.activeDate), month, 1, this._util.getHours(this.activeDate), this._util.getMinutes(this.activeDate), this._util.getSeconds(this.activeDate)), this._dateFormats.display.monthYearA11yLabel);
        return new Md2CalendarCell(month, monthName.toLocaleUpperCase(), ariaLabel, this._isMonthEnabled(month));
    }
    /**
     * Whether the given month is enabled.
     * @param {?} month
     * @return {?}
     */
    _isMonthEnabled(month) {
        if (!this.dateFilter) {
            return true;
        }
        /** @type {?} */
        let firstOfMonth = this._util.createDate(this._util.getYear(this.activeDate), month, 1, this._util.getHours(this.activeDate), this._util.getMinutes(this.activeDate), this._util.getSeconds(this.activeDate));
        // If any date in the month is enabled count the month as enabled.
        for (let date = firstOfMonth; this._util.getMonth(date) == month; date = this._util.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    calendarState(direction) {
        this._calendarState = direction;
    }
    /**
     * @return {?}
     */
    _calendarStateDone() {
        this._calendarState = '';
    }
}
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
Md2YearView.ctorParameters = () => [
    { type: DateLocale },
    { type: DateUtil },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MD_DATE_FORMATS,] }] }
];
Md2YearView.propDecorators = {
    activeDate: [{ type: Input }],
    selected: [{ type: Input }],
    dateFilter: [{ type: Input }],
    selectedChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const CLOCK_RADIUS = 50;
/** @type {?} */
const CLOCK_INNER_RADIUS = 27.5;
/** @type {?} */
const CLOCK_OUTER_RADIUS = 41.25;
/** @type {?} */
const CLOCK_TICK_RADIUS = 7.0833;
/**
 * A clock that is used as part of the datepicker.
 * \@docs-private
 */
class Md2Clock {
    /**
     * @param {?} _element
     * @param {?} _locale
     * @param {?} _util
     */
    constructor(_element, _locale, _util) {
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
        this.mouseMoveListener = (event) => { this._handleMousemove(event); };
        this.mouseUpListener = () => { this._handleMouseup(); };
    }
    /**
     * The date to display in this clock view.
     * @return {?}
     */
    get activeDate() { return this._activeDate; }
    /**
     * @param {?} value
     * @return {?}
     */
    set activeDate(value) {
        /** @type {?} */
        let oldActiveDate = this._activeDate;
        this._activeDate = this._util.clampDate(value, this.min, this.max);
        if (!this._util.isSameMinute(oldActiveDate, this._activeDate)) {
            this._init();
        }
    }
    /**
     * The currently selected date.
     * @return {?}
     */
    get selected() { return this._selected; }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        this._selected = this._util.parse(value);
        if (this._selected) {
            this.activeDate = this._selected;
        }
    }
    /**
     * The minimum selectable date.
     * @return {?}
     */
    get min() { return this._min; }
    /**
     * @param {?} date
     * @return {?}
     */
    set min(date) { this._min = this._util.parse(date); }
    /**
     * The maximum selectable date.
     * @return {?}
     */
    get max() { return this._max; }
    /**
     * @param {?} date
     * @return {?}
     */
    set max(date) { this._max = this._util.parse(date); }
    /**
     * Whether the clock should be started in hour or minute view.
     * @param {?} value
     * @return {?}
     */
    set startView(value) {
        this._hourView = value != 'minute';
    }
    /**
     * @return {?}
     */
    get _hand() {
        this._selectedHour = this._util.getHours(this.activeDate);
        this._selectedMinute = this._util.getMinutes(this.activeDate);
        /** @type {?} */
        let deg = 0;
        /** @type {?} */
        let radius = CLOCK_OUTER_RADIUS;
        if (this._hourView) {
            /** @type {?} */
            let outer = this.activeDate.getHours() > 0 && this.activeDate.getHours() < 13;
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
            'transform': `rotate(${deg}deg)`,
            'height': `${radius}%`,
            'margin-top': `${50 - radius}%`
        };
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.activeDate = this._activeDate || this._util.today();
        this._init();
    }
    /**
     * Handles mousedown events on the clock body.
     * @param {?} event
     * @return {?}
     */
    _handleMousedown(event) {
        this.setTime(event);
        document.addEventListener('mousemove', this.mouseMoveListener);
        document.addEventListener('touchmove', this.mouseMoveListener);
        document.addEventListener('mouseup', this.mouseUpListener);
        document.addEventListener('touchend', this.mouseUpListener);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleMousemove(event) {
        event.preventDefault();
        this.setTime(event);
    }
    /**
     * @return {?}
     */
    _handleMouseup() {
        document.removeEventListener('mousemove', this.mouseMoveListener);
        document.removeEventListener('touchmove', this.mouseMoveListener);
        document.removeEventListener('mouseup', this.mouseUpListener);
        document.removeEventListener('touchend', this.mouseUpListener);
        this.selectedChange.emit(this.activeDate);
    }
    /**
     * Initializes this clock view.
     * @return {?}
     */
    _init() {
        this._hours.length = 0;
        this._minutes.length = 0;
        /** @type {?} */
        let hourNames = this._locale.getHourNames();
        /** @type {?} */
        let minuteNames = this._locale.getMinuteNames();
        if (this.twelvehour) {
            for (let i = 1; i < (hourNames.length / 2) + 1; i++) {
                /** @type {?} */
                let radian = i / 6 * Math.PI;
                /** @type {?} */
                let radius = CLOCK_OUTER_RADIUS;
                /** @type {?} */
                let date = new Date(this.activeDate.getTime());
                date.setHours(i + 1, 0, 0, 0);
                /** @type {?} */
                let enabled = this._util.isFullDateWithinRange(date, this.min, this.max);
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
            for (let i = 0; i < hourNames.length; i++) {
                /** @type {?} */
                let radian = i / 6 * Math.PI;
                /** @type {?} */
                let outer = i > 0 && i < 13;
                /** @type {?} */
                let radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
                /** @type {?} */
                let date = new Date(this.activeDate.getTime());
                date.setHours(i + 1, 0, 0, 0);
                /** @type {?} */
                let enabled = this._util.isFullDateWithinRange(date, this.min, this.max);
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
        for (let i = 0; i < minuteNames.length; i += 5) {
            /** @type {?} */
            let radian = i / 30 * Math.PI;
            /** @type {?} */
            let date = new Date(this.activeDate.getTime());
            date.setMinutes(i, 0, 0);
            /** @type {?} */
            let enabled = this._util.isFullDateWithinRange(date, this.min, this.max);
            this._minutes.push({
                value: i,
                displayValue: i === 0 ? '00' : minuteNames[i],
                enabled: enabled,
                top: CLOCK_RADIUS - Math.cos(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS,
                left: CLOCK_RADIUS + Math.sin(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS,
            });
        }
    }
    /**
     * Set Time
     * @param {?} event
     * @return {?}
     */
    setTime(event) {
        /** @type {?} */
        let trigger$$1 = this._element.nativeElement;
        /** @type {?} */
        let triggerRect = trigger$$1.getBoundingClientRect();
        /** @type {?} */
        let width = trigger$$1.offsetWidth;
        /** @type {?} */
        let height = trigger$$1.offsetHeight;
        /** @type {?} */
        let pageX = event.pageX !== undefined ? event.pageX : event.touches[0].pageX;
        /** @type {?} */
        let pageY = event.pageY !== undefined ? event.pageY : event.touches[0].pageY;
        /** @type {?} */
        let x = (width / 2) - (pageX - triggerRect.left - window.pageXOffset);
        /** @type {?} */
        let y = (height / 2) - (pageY - triggerRect.top - window.pageYOffset);
        /** @type {?} */
        let radian = Math.atan2(-x, y);
        /** @type {?} */
        let unit = Math.PI / (this._hourView ? 6 : (this.interval ? (30 / this.interval) : 30));
        /** @type {?} */
        let z = Math.sqrt(x * x + y * y);
        /** @type {?} */
        let outer = this._hourView && z > ((width * (CLOCK_OUTER_RADIUS / 100)) +
            (width * (CLOCK_INNER_RADIUS / 100))) / 2;
        /** @type {?} */
        let value = 0;
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        value = Math.round(radian / unit);
        radian = value * unit;
        /** @type {?} */
        let date = new Date(this.activeDate.getTime());
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
    }
}
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
Md2Clock.ctorParameters = () => [
    { type: ElementRef },
    { type: DateLocale },
    { type: DateUtil }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Md2DatepickerModule {
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
function extendObject(dest, ...sources) {
    if (dest == null) {
        throw TypeError('Cannot convert undefined or null to object');
    }
    for (let source of sources) {
        if (source != null) {
            for (let key in source) {
                if (source.hasOwnProperty(key)) {
                    dest[key] = source[key];
                }
            }
        }
    }
    return dest;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Md2DialogConfig {
    constructor() {
        this.role = 'dialog';
        this.disableClose = false;
    }
}
class Md2DialogPortal extends TemplatePortalDirective {
    /**
     * @param {?} templateRef
     * @param {?} viewContainerRef
     */
    constructor(templateRef, viewContainerRef) {
        super(templateRef, viewContainerRef);
    }
}
Md2DialogPortal.decorators = [
    { type: Directive, args: [{ selector: '[md2DialogPortal]' },] }
];
/** @nocollapse */
Md2DialogPortal.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef }
];
/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
class Md2DialogTitle {
}
Md2DialogTitle.decorators = [
    { type: Directive, args: [{ selector: 'md2-dialog-title' },] }
];
/**
 * Scrollable content container of a dialog.
 */
class Md2DialogContent {
}
Md2DialogContent.decorators = [
    { type: Directive, args: [{ selector: 'md2-dialog-content' },] }
];
/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
class Md2DialogActions {
}
Md2DialogActions.decorators = [
    { type: Directive, args: [{ selector: 'md2-dialog-footer, md2-dialog-actions' },] }
];
class Md2Dialog {
    /**
     * @param {?} _overlay
     * @param {?} _parentDialog
     */
    constructor(_overlay, _parentDialog) {
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
    ngOnDestroy() { this.destroyPanel(); }
    /**
     * @return {?}
     */
    get _openDialogs() {
        return this._parentDialog ? this._parentDialog._openDialogs : this._openDialogsAtThisLevel;
    }
    /**
     * Open the dialog
     * @param {?=} config
     * @return {?}
     */
    open(config) {
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
    }
    /**
     * Close the dialog
     * @return {?}
     */
    close() {
        this._visibility = 'hidden';
        this._panelOpen = false;
        if (this._overlayRef) {
            this._overlayRef.detach();
            if (this._backdropSubscription) {
                this._backdropSubscription.unsubscribe();
            }
        }
        /** @type {?} */
        let index = this._openDialogs.indexOf(this);
        if (index > -1) {
            this._openDialogs.splice(index, 1);
            // no open dialogs are left, call next on afterAllClosed Subject
            if (!this._openDialogs.length) {
                document.removeEventListener('keydown', this._boundKeydown);
            }
        }
        return Promise.resolve(this);
    }
    /**
     * Removes the panel from the DOM.
     * @return {?}
     */
    destroyPanel() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._cleanUpSubscriptions();
        }
    }
    /**
     * @return {?}
     */
    _onPanelDone() {
        if (this._panelOpen) {
            this.onOpen.emit(this);
        }
        else {
            this.onClose.emit(this);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleKeydown(event) {
        /** @type {?} */
        let topDialog = this._openDialogs[this._openDialogs.length - 1];
        if (event.keyCode === ESCAPE && topDialog &&
            !topDialog.config.disableClose) {
            topDialog.close();
        }
    }
    /**
     * @return {?}
     */
    _subscribeToBackdrop() {
        if (!this.config.disableClose) {
            this._backdropSubscription = this._overlayRef.backdropClick().pipe(first()).subscribe(() => this.close());
        }
    }
    /**
     * @return {?}
     */
    _createOverlay() {
        if (!this._overlayRef) {
            /** @type {?} */
            let config = new OverlayState();
            config.positionStrategy = this._overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically();
            config.hasBackdrop = true;
            this._overlayRef = this._overlay.create(config);
        }
    }
    /**
     * @return {?}
     */
    _cleanUpSubscriptions() {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
    }
}
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
Md2Dialog.ctorParameters = () => [
    { type: Overlay },
    { type: Md2Dialog, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
Md2Dialog.propDecorators = {
    onOpen: [{ type: Output }],
    onClose: [{ type: Output }],
    _portal: [{ type: ViewChild, args: [Md2DialogPortal,] }],
    dialogTitle: [{ type: Input, args: ['title',] }]
};
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
class Md2DialogModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Md2MenuContent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Md2MenuItem {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Md2MenuTrigger {
    /**
     * @param {?} _element
     * @param {?} _renderer
     */
    constructor(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._handleClick = this._renderer.listenGlobal('document', 'click', (event) => {
            if (!this._hasChildMenu(event)) {
                this._closeMenu();
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._handleClick = null;
    }
    /**
     * @return {?}
     */
    _toggleMenu() {
        if (this._hasClass(this._getParentElement(), 'open')) {
            this._closeMenu();
        }
        else {
            this._openMenu();
        }
    }
    /**
     * @return {?}
     */
    _openMenu() {
        this._getParentElement().classList.add('open');
        /** @type {?} */
        let siblingElements = this._getSiblingElements(this._getParentElement());
        siblingElements.forEach((el) => {
            el.classList.remove('open');
            this._closeChildrenMenu(el);
        });
    }
    /**
     * @return {?}
     */
    _closeMenu() {
        this._getParentElement().classList.remove('open');
        this._closeChildrenMenu(this._getParentElement());
    }
    /**
     * @param {?} element
     * @return {?}
     */
    _closeChildrenMenu(element) {
        [].forEach.call(element.querySelectorAll('.open'), (el) => {
            el.classList.remove('open');
        });
    }
    /**
     * @return {?}
     */
    _getHostElement() {
        return this._element.nativeElement;
    }
    /**
     * @return {?}
     */
    _getParentElement() {
        return this._element.nativeElement.parentNode;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    _getSiblingElements(element) {
        /** @type {?} */
        let siblingElements = [];
        /** @type {?} */
        let el = element.parentNode.firstChild;
        for (; el; el = el.nextSibling) {
            if (el.nodeType == 1 && el !== element) {
                siblingElements.push(el);
            }
        }
        return siblingElements;
    }
    /**
     * @param {?} element
     * @param {?} target
     * @return {?}
     */
    _getClosestElement(element, target) {
        if (element.hasAttribute(target)) {
            return element;
        }
        /** @type {?} */
        let parentEl;
        while (element) {
            parentEl = element.parentElement;
            if (parentEl && parentEl.hasAttribute(target)) {
                return parentEl;
            }
            element = parentEl;
        }
        return null;
    }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    _hasClass(element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _hasChildMenu(event) {
        /** @type {?} */
        let el = this._getClosestElement(event.target, 'md2-menu-trigger');
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
    }
}
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
Md2MenuTrigger.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Md2Menu {
}
Md2Menu.decorators = [
    { type: Component, args: [{
                selector: '[md2-menu]',
                template: '<ng-content></ng-content>',
                encapsulation: ViewEncapsulation.None,
                styles: ["[md2-menu]{position:relative;display:inline-block}[md2-menu-content]{position:absolute;top:0;left:0;display:inline-block;background:#fff;list-style:none;min-width:112px;max-width:280px;max-height:calc(100vh + 48px);padding:8px 0;margin:0;z-index:1001;border-radius:2px;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:left top;transform-origin:left top;transition:.2s linear;box-shadow:0 2px 6px 1px rgba(0,0,0,.34)}[md2-menu-item] [md2-menu-content]{left:100%;margin:-8px 0}[md2-menu-content][x-position=before]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top}[md2-menu-item] [md2-menu-content][x-position=before]{right:100%}[md2-menu-content][y-position=above]{top:auto;bottom:0;-webkit-transform-origin:left bottom;transform-origin:left bottom}[md2-menu-content][y-position=above][x-position=before]{-webkit-transform-origin:right bottom;transform-origin:right bottom}.open>[md2-menu-content]{-webkit-transform:scale(1);transform:scale(1)}[md2-menu-item]{position:relative;width:100%;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0;border:none;white-space:nowrap;text-overflow:ellipsis;display:flex;flex-direction:row;align-items:center;height:36px;padding:0 16px;font-size:16px;text-align:start;text-decoration:none;background:0 0;color:rgba(0,0,0,.87);box-sizing:border-box}[md2-menu-item][disabled]{color:rgba(0,0,0,.38)}[md2-menu-item].open,[md2-menu-item]:focus:not([disabled]),[md2-menu-item]:hover:not([disabled]){background:rgba(0,0,0,.04);text-decoration:none}[md2-menu-item]>[md2-menu-trigger]{display:block;height:36px;width:calc(100% + 32px);margin:0 -16px;padding:0 16px;font:inherit;color:inherit;text-align:left;background:0 0;outline:0;border:0;cursor:pointer;box-shadow:none}.md-overlay-container{position:fixed;pointer-events:none;top:0;left:0;height:100%;width:100%;z-index:1000}.md-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.md-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.md-overlay-transparent-backdrop{background:0 0}.md-overlay-backdrop.md-overlay-backdrop-showing{opacity:.48}"]
            }] }
];
class Md2MenuModule {
}
Md2MenuModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Md2Menu, Md2MenuContent, Md2MenuItem, Md2MenuTrigger],
                declarations: [Md2Menu, Md2MenuContent, Md2MenuItem, Md2MenuTrigger],
            },] }
];

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
class Md2TabChange {
    /**
     * @param {?} tab
     * @param {?} index
     */
    constructor(tab, index) {
        this.tab = tab;
        this.index = index;
    }
}
class Md2Transclude {
    /**
     * @param {?} viewRef
     */
    constructor(viewRef) {
        this.viewRef = viewRef;
    }
    /**
     * @return {?}
     */
    get md2Transclude() { return this._md2Transclude; }
    /**
     * @param {?} templateRef
     * @return {?}
     */
    set md2Transclude(templateRef) {
        this._md2Transclude = templateRef;
        if (templateRef) {
            this.viewRef.createEmbeddedView(templateRef);
        }
    }
}
Md2Transclude.decorators = [
    { type: Directive, args: [{ selector: '[md2Transclude]' },] }
];
/** @nocollapse */
Md2Transclude.ctorParameters = () => [
    { type: ViewContainerRef }
];
Md2Transclude.propDecorators = {
    md2Transclude: [{ type: Input }]
};
class Md2Tab {
}
Md2Tab.decorators = [
    { type: Component, args: [{
                selector: 'md2-tab',
                template: `<ng-content></ng-content>`,
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
class Md2TabLabel {
    /**
     * @param {?} templateRef
     * @param {?} tab
     */
    constructor(templateRef, tab) {
        this.templateRef = templateRef;
        tab.labelRef = templateRef;
    }
}
Md2TabLabel.decorators = [
    { type: Directive, args: [{ selector: '[md2-tab-label]' },] }
];
/** @nocollapse */
Md2TabLabel.ctorParameters = () => [
    { type: TemplateRef },
    { type: Md2Tab }
];
class Md2Tabs {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
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
    /**
     * @return {?}
     */
    get selectedIndex() { return this._selectedIndex; }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectedIndex(value) {
        if (typeof value === 'string') {
            value = parseInt(value);
        }
        if (value !== this._selectedIndex) {
            this._selectedIndex = value;
            this.adjustOffset(value);
            this._updateInkBar();
            if (this.tabs) {
                /** @type {?} */
                const tabs = this.tabs.toArray();
                if (!tabs[value].disabled) {
                    tabs.forEach(tab => tab.active = false);
                    tabs[value].active = true;
                }
            }
            if (this._isInitialized) {
                this._emitChangeEvent();
                this.selectedIndexChange.emit(value);
            }
        }
    }
    /**
     * @return {?}
     */
    get focusIndex() { return this._focusIndex; }
    /**
     * @param {?} value
     * @return {?}
     */
    set focusIndex(value) {
        this._focusIndex = value;
        this.adjustOffset(value);
    }
    /**
     * @return {?}
     */
    get element() {
        /** @type {?} */
        const elements = {
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
    }
    /**
     * After Content Init
     * @return {?}
     */
    ngAfterContentInit() {
        setTimeout(() => {
            this.updatePagination();
        }, 0);
        setTimeout(() => {
            /** @type {?} */
            const tabs = this.tabs.toArray();
            if (this.selectedIndex) {
                if (this.selectedIndex >= tabs.length) {
                    this.selectedIndex = 0;
                }
                tabs.forEach(tab => tab.active = false);
                tabs[this.selectedIndex].active = true;
                this.adjustOffset(this.selectedIndex);
            }
            else {
                /** @type {?} */
                let index = tabs.findIndex((t) => t.active);
                if (index < 0) {
                    tabs[0].active = true;
                }
                else {
                    this.selectedIndex = index;
                }
            }
            this._updateInkBar();
        }, 0);
        this._isInitialized = true;
    }
    /**
     * Calculates the styles from the selected tab for the ink-bar.
     * @return {?}
     */
    _updateInkBar() {
        /** @type {?} */
        let elements = this.element;
        if (!elements.tabs[this.selectedIndex]) {
            return;
        }
        /** @type {?} */
        let tab = elements.tabs[this.selectedIndex];
        this._inkBarLeft = tab.offsetLeft + 'px';
        this._inkBarWidth = tab.offsetWidth + 'px';
    }
    /**
     * Emits an event when the user selects an option.
     * @return {?}
     */
    _emitChangeEvent() {
        /** @type {?} */
        let index = this._selectedIndex;
        this.change.emit(new Md2TabChange(this.tabs.toArray()[index], index));
    }
    /**
     * Focus next Tab
     * @return {?}
     */
    focusNextTab() { this.incrementIndex(1); }
    /**
     * Focus previous Tab
     * @return {?}
     */
    focusPreviousTab() { this.incrementIndex(-1); }
    /**
     * Mouse Wheel scroll
     * @param {?} event
     * @return {?}
     */
    scroll(event) {
        if (!this._shouldPaginate) {
            return;
        }
        event.preventDefault();
        this._offsetLeft = this.fixOffset(this._offsetLeft - event.wheelDelta);
    }
    /**
     * Next Page
     * @return {?}
     */
    nextPage() {
        /** @type {?} */
        let elements = this.element;
        /** @type {?} */
        let viewportWidth = elements.canvas.clientWidth;
        /** @type {?} */
        let totalWidth = viewportWidth + this._offsetLeft;
        /** @type {?} */
        let i;
        /** @type {?} */
        let tab;
        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth > totalWidth) {
                break;
            }
        }
        this._offsetLeft = this.fixOffset(tab.offsetLeft);
    }
    /**
     * Previous Page
     * @return {?}
     */
    previousPage() {
        /** @type {?} */
        let i;
        /** @type {?} */
        let tab;
        /** @type {?} */
        let elements = this.element;
        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth >= this._offsetLeft) {
                break;
            }
        }
        this._offsetLeft = this.fixOffset(tab.offsetLeft +
            tab.offsetWidth - elements.canvas.clientWidth);
    }
    /**
     * On Window Resize
     * @return {?}
     */
    onWindowResize() {
        this._offsetLeft = this.fixOffset(this._offsetLeft);
        this.updatePagination();
    }
    /**
     * Can page Back
     * @return {?}
     */
    canPageBack() { return this._offsetLeft > 0; }
    /**
     * Can page Previous
     * @return {?}
     */
    canPageForward() {
        /** @type {?} */
        let elements = this.element;
        /** @type {?} */
        let lastTab = elements.tabs[elements.tabs.length - 1];
        return lastTab && lastTab.offsetLeft + lastTab.offsetWidth > elements.canvas.clientWidth +
            this._offsetLeft;
    }
    /**
     * Update Pagination
     * @return {?}
     */
    updatePagination() {
        /** @type {?} */
        let canvasWidth = this.element.root.clientWidth;
        /** @type {?} */
        let tabs = this.element.tabs ? this.element.tabs : [];
        for (let i = 0; i < tabs.length; i++) {
            canvasWidth -= tabs[i].offsetWidth;
        }
        this._shouldPaginate = canvasWidth < 0;
    }
    /**
     * Increment Focus Tab
     * @param {?} inc
     * @return {?}
     */
    incrementIndex(inc) {
        /** @type {?} */
        let newIndex;
        /** @type {?} */
        let index = this.focusIndex;
        for (newIndex = index + inc; this.tabs.toArray()[newIndex] && this.tabs.toArray()[newIndex].disabled; newIndex += inc) { }
        if (this.tabs.toArray()[newIndex]) {
            this.focusIndex = newIndex;
        }
    }
    /**
     * Adjust Offset of Tab
     * @param {?} index
     * @return {?}
     */
    adjustOffset(index) {
        /** @type {?} */
        let elements = this.element;
        if (!elements.tabs[index]) {
            return;
        }
        /** @type {?} */
        let tab = elements.tabs[index];
        /** @type {?} */
        let left = tab.offsetLeft;
        /** @type {?} */
        let right = tab.offsetWidth + left;
        this._offsetLeft = Math.max(this._offsetLeft, this.fixOffset(right - elements.canvas.clientWidth + 32 * 2));
        this._offsetLeft = Math.min(this._offsetLeft, this.fixOffset(left));
    }
    /**
     * Fix Offset of Tab
     * @param {?} value
     * @return {?} value
     */
    fixOffset(value) {
        /** @type {?} */
        let elements = this.element;
        if (!elements.tabs.length || !this._shouldPaginate) {
            return 0;
        }
        /** @type {?} */
        let lastTab = elements.tabs[elements.tabs.length - 1];
        /** @type {?} */
        let totalWidth = lastTab.offsetLeft + lastTab.offsetWidth;
        value = Math.min(totalWidth - elements.canvas.clientWidth, value);
        value = Math.max(0, value);
        return value;
    }
}
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
Md2Tabs.ctorParameters = () => [
    { type: ElementRef }
];
Md2Tabs.propDecorators = {
    tabs: [{ type: ContentChildren, args: [Md2Tab,] }],
    class: [{ type: Input }],
    selectedIndex: [{ type: Input }],
    change: [{ type: Output }],
    selectedIndexChange: [{ type: Output }]
};
/** @type {?} */
const MD2_TABS_DIRECTIVES = [Md2TabLabel, Md2Tabs, Md2Tab];
class Md2TabsModule {
}
Md2TabsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: MD2_TABS_DIRECTIVES,
                declarations: [Md2Transclude, Md2TabLabel, Md2Tabs, Md2Tab],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const noop = () => { };
/** @type {?} */
let nextId$4 = 0;
class Tag {
    /**
     * @param {?} source
     * @param {?} textKey
     * @param {?} valueKey
     */
    constructor(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
}
/** @type {?} */
const MD2_TAGS_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Md2Tags),
    multi: true
};
class Md2Tags {
    /**
     * @param {?} _element
     */
    constructor(_element) {
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
    ngAfterContentInit() { this._isInitialized = true; }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    set tags(value) { this._tags = value; }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) { this.setValue(value); }
    /**
     * setup value
     * @param {?} value
     * @return {?}
     */
    setValue(value) {
        if (value !== this._value) {
            this._value = value;
            this._items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    /** @type {?} */
                    let selItm = this._tags.find((t) => this.equals(this.valueKey ?
                        t[this.valueKey] : t, value[i]));
                    if (selItm) {
                        this._items.push(new Tag(selItm, this.textKey, this.valueKey));
                    }
                }
            }
            if (this._isInitialized) {
                this._onChangeCallback(value);
                this.change.emit(this._value);
            }
        }
    }
    /**
     * Compare two vars or objects
     * @param {?} o1 compare first object
     * @param {?} o2 compare second object
     * @return {?} boolean comparation result
     */
    equals(o1, o2) {
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
        let t1 = typeof o1;
        /** @type {?} */
        let t2 = typeof o2;
        /** @type {?} */
        let key;
        /** @type {?} */
        let keySet;
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
    }
    /**
     * @return {?}
     */
    get isMenuVisible() {
        return ((this._inputFocused || this.noBlur) && this._inputValue &&
            this._list && this._list.length) ? true : false;
    }
    /**
     * update scroll of tags suggestion menu
     * @return {?}
     */
    updateScroll() {
        if (this._focusedTag < 0) {
            return;
        }
        /** @type {?} */
        let menuContainer = this._element.nativeElement.querySelector('.md2-tags-menu');
        if (!menuContainer) {
            return;
        }
        /** @type {?} */
        let choices = menuContainer.querySelectorAll('.md2-option');
        if (choices.length < 1) {
            return;
        }
        /** @type {?} */
        let highlighted = choices[this._focusedTag];
        if (!highlighted) {
            return;
        }
        /** @type {?} */
        let top = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
        /** @type {?} */
        let height = menuContainer.offsetHeight;
        if (top > height) {
            menuContainer.scrollTop += top - height;
        }
        else if (top < highlighted.clientHeight) {
            menuContainer.scrollTop -= highlighted.clientHeight - top;
        }
    }
    /**
     * input key listener
     * @param {?} event
     * @return {?}
     */
    _handleInputKeydown(event) {
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
        setTimeout(() => {
            this.filterMatches();
        }, 10);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleKeydown(event) {
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
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeAndSelectAdjacentTag(index) {
        /** @type {?} */
        let selIndex = this.getAdjacentTagIndex(index);
        this.removeTag(index);
        this.selectAndFocusTagSafe(selIndex);
    }
    /**
     * @return {?}
     */
    resetselectedTag() {
        this._selectedTag = -1;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getAdjacentTagIndex(index) {
        /** @type {?} */
        let len = this._items.length - 1;
        return (len === 0) ? -1 :
            (index === len) ? index - 1 : index;
    }
    /**
     * add tag
     * @param {?} event
     * @param {?} index index of the specific tag
     * @return {?}
     */
    _addTag(event, index) {
        event.preventDefault();
        event.stopPropagation();
        this._items.push(this._list[index]);
        this._inputValue = '';
        this.updateValue();
    }
    /**
     * @param {?} index
     * @return {?}
     */
    _removeTagAndFocusInput(index) {
        this.removeTag(index);
        this._handleFocus();
    }
    /**
     * remove tag
     * @param {?} index
     * @return {?}
     */
    removeTag(index) {
        this._items.splice(index, 1);
        this.updateValue();
    }
    /**
     * update value
     * @return {?}
     */
    updateValue() {
        this._value = new Array();
        for (let i = 0; i < this._items.length; i++) {
            this._value.push(this._items[i].value);
        }
        this._onChangeCallback(this._value);
        this.change.emit(this._value);
    }
    /**
     * select tag
     * @param {?} index of select tag
     * @return {?}
     */
    _selectTag(index) {
        if (index >= -1 && index <= this._items.length) {
            this._selectedTag = index;
        }
    }
    /**
     * @return {?}
     */
    _handleFocus() {
        this._element.nativeElement.querySelector('input').focus();
        this.resetselectedTag();
    }
    /**
     * @return {?}
     */
    _onInputFocus() {
        this._inputFocused = true;
        this.resetselectedTag();
    }
    /**
     * @return {?}
     */
    _onInputBlur() {
        this._inputFocused = false;
    }
    /**
     * @return {?}
     */
    _listEnter() { this.noBlur = true; }
    /**
     * @return {?}
     */
    _listLeave() { this.noBlur = false; }
    /**
     * update suggestion menu with filter
     * @return {?}
     */
    filterMatches() {
        /** @type {?} */
        let tempList = this._tags.map((tag) => new Tag(tag, this.textKey, this.valueKey));
        this._list = tempList.filter((t) => (new RegExp(this._inputValue, 'ig').test(t.text) &&
            !this._items.find((i) => t.text === i.text)));
        if (this._list.length > 0) {
            this._focusedTag = 0;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this._value) {
            this._value = value;
            this._items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    /** @type {?} */
                    let selItm = this._tags.find((t) => this.equals(this.valueKey ?
                        t[this.valueKey] : t, value[i]));
                    if (selItm) {
                        this._items.push(new Tag(selItm, this.textKey, this.valueKey));
                    }
                }
            }
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this._onChangeCallback = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this._onTouchedCallback = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
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
Md2Tags.ctorParameters = () => [
    { type: ElementRef }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Md2TagsModule {
}
Md2TagsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, Md2AutocompleteModule],
                exports: [Md2Tags],
                declarations: [Md2Tags],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Toast {
    /**
     * @param {?} message
     */
    constructor(message) {
        this.message = message;
    }
}
class Md2ToastConfig {
    constructor() {
        this.duration = 3000;
        this.viewContainerRef = null;
    }
}
class Md2Toast {
    /**
     * @param {?} _overlay
     * @param {?} _config
     */
    constructor(_overlay, _config) {
        this._overlay = _overlay;
        this._config = _config;
        this.index = 0;
    }
    /**
     * toast message
     * @param {?} message
     * @param {?=} duration
     * @return {?}
     */
    toast(message, duration) {
        this.show(message, duration);
    }
    /**
     * show toast
     * @param {?} message
     * @param {?=} duration
     * @return {?}
     */
    show(message, duration) {
        if (!message || !message.trim()) {
            return;
        }
        if (duration) {
            this._config.duration = duration;
        }
        /** @type {?} */
        let toast;
        toast = new Toast(message);
        if (toast) {
            if (!this._toastInstance) {
                this._createToast();
            }
            this._setToastMessage(toast);
        }
    }
    /**
     * Create the toast to display
     * @return {?}
     */
    _createToast() {
        this._createOverlay();
        /** @type {?} */
        let portal = new ComponentPortal(Md2ToastComponent, this._config.viewContainerRef);
        this._toastInstance = this._overlayRef.attach(portal).instance;
    }
    /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    _createOverlay() {
        if (!this._overlayRef) {
            /** @type {?} */
            let config = new OverlayState();
            config.positionStrategy = this._overlay.position()
                .global()
                .top('0').right('0');
            this._overlayRef = this._overlay.create(config);
        }
    }
    /**
     * Disposes the current toast and the overlay it is attached to
     * @return {?}
     */
    _disposeToast() {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._toastInstance = null;
    }
    /**
     * Updates the toast message and repositions the overlay according to the new message length
     * @param {?} toast
     * @return {?}
     */
    _setToastMessage(toast) {
        toast.id = ++this.index;
        this._toastInstance.addToast(toast);
        setTimeout(() => {
            this.clearToast(toast.id);
        }, this._config.duration);
    }
    /**
     * clear specific toast
     * @param {?} toastId
     * @return {?}
     */
    clearToast(toastId) {
        if (this._toastInstance) {
            this._toastInstance.removeToast(toastId);
            setTimeout(() => {
                if (!this._toastInstance.hasToast()) {
                    this._disposeToast();
                }
            }, 250);
        }
    }
    /**
     * clear all toasts
     * @return {?}
     */
    clearAllToasts() {
        if (this._toastInstance) {
            this._toastInstance.removeAllToasts();
            setTimeout(() => {
                if (!this._toastInstance.hasToast()) {
                    this._disposeToast();
                }
            }, 250);
        }
    }
}
Md2Toast.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Md2Toast.ctorParameters = () => [
    { type: Overlay },
    { type: Md2ToastConfig }
];
class Md2ToastComponent {
    constructor() {
        this.toasts = [];
        this.maxShown = 5;
    }
    /**
     * add toast
     * @param {?} toast toast object with all parameters
     * @return {?}
     */
    addToast(toast) {
        setTimeout(() => {
            toast.isVisible = true;
        }, 1);
        this.toasts.push(toast);
        if (this.toasts.length > this.maxShown) {
            this.toasts[0].isVisible = false;
            setTimeout(() => {
                this.toasts.splice(0, (this.toasts.length - this.maxShown));
            }, 250);
        }
    }
    /**
     * remove toast
     * @param {?} toastId number of toast id
     * @return {?}
     */
    removeToast(toastId) {
        this.toasts.forEach((t) => { if (t.id === toastId) {
            t.isVisible = false;
        } });
        setTimeout(() => {
            this.toasts = this.toasts.filter((toast) => { return toast.id !== toastId; });
        }, 250);
    }
    /**
     * remove all toasts
     * @return {?}
     */
    removeAllToasts() {
        this.toasts.forEach((t) => { t.isVisible = false; });
        setTimeout(() => {
            this.toasts = [];
        }, 250);
    }
    /**
     * check has any toast
     * @return {?} boolean
     */
    hasToast() { return this.toasts.length > 0; }
}
Md2ToastComponent.decorators = [
    { type: Component, args: [{
                selector: 'md2-toast',
                template: "<div *ngFor=\"let toast of toasts\"\n     class=\"md2-toast\"\n     [class.in]=\"toast.isVisible\"\n     (click)=\"removeToast(toast.id)\"\n     [innerHTML]=\"toast.message\">\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                styles: ["md2-toast{display:block;box-sizing:border-box;cursor:default;overflow:hidden;min-width:304px;max-width:100%;padding:8px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.md2-toast{position:relative;padding:14px 24px;margin-bottom:5px;display:block;margin-top:-53px;opacity:0;background-color:#323232;color:#fafafa;box-shadow:0 2px 5px 0 rgba(0,0,0,.26);border-radius:2px;font-size:14px;overflow:hidden;word-wrap:break-word;transition:250ms linear}.md2-toast.in{margin-top:0;opacity:1}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;text-transform:none;width:1px}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}"]
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Md2ToastModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Time in ms to delay before changing the tooltip visibility to hidden
  @type {?} */
const TOUCHEND_HIDE_DELAY = 1500;
/** *
 * Time in ms to throttle repositioning after scroll events.
  @type {?} */
const SCROLL_THROTTLE_MS = 20;
/**
 * Throws an error if the user supplied an invalid tooltip position.
 * @param {?} position
 * @return {?}
 */
function throwMd2TooltipInvalidPositionError(position) {
    throw new Error(`Tooltip position "${position}" is invalid.`);
}
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.google.com/components/tooltips.html
 */
class Md2Tooltip {
    /**
     * @param {?} _overlay
     * @param {?} _elementRef
     * @param {?} _scrollDispatcher
     * @param {?} _viewContainerRef
     * @param {?} _ngZone
     * @param {?} _renderer
     * @param {?} _platform
     * @param {?} _dir
     */
    constructor(_overlay, _elementRef, _scrollDispatcher, _viewContainerRef, _ngZone, _renderer, _platform, _dir) {
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
            _renderer.listen(_elementRef.nativeElement, 'mouseenter', () => this.show());
            _renderer.listen(_elementRef.nativeElement, 'mouseleave', () => this.hide());
        }
    }
    /**
     * Allows the user to define the position of the tooltip relative to the parent element
     * @return {?}
     */
    get position() { return this._position; }
    /**
     * @param {?} value
     * @return {?}
     */
    set position(value) {
        if (value !== this._position) {
            this._position = value;
            // TODO(andrewjs): When the overlay's position can be dynamically changed, do not destroy
            // the tooltip.
            if (this._tooltipInstance) {
                this._disposeTooltip();
            }
        }
    }
    /**
     * Disables the display of the tooltip.
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        // If tooltip is disabled, hide immediately.
        if (this._disabled) {
            this.hide(0);
        }
    }
    /**
     * The message to be displayed in the tooltip
     * @return {?}
     */
    get message() { return this._message; }
    /**
     * @param {?} value
     * @return {?}
     */
    set message(value) {
        this._message = value;
        if (this._tooltipInstance) {
            this._setTooltipMessage(this._message);
        }
    }
    /**
     * Dispose the tooltip when destroyed.
     * @return {?}
     */
    ngOnDestroy() {
        if (this._tooltipInstance) {
            this._disposeTooltip();
        }
    }
    /**
     * Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input
     * @param {?=} delay
     * @return {?}
     */
    show(delay = this.showDelay) {
        if (this.disabled || !this._message || !this._message.trim()) {
            return;
        }
        if (!this._tooltipInstance) {
            this._createTooltip();
        }
        this._setTooltipMessage(this._message);
        this._tooltipInstance.show(this._position, delay);
    }
    /**
     * Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input
     * @param {?=} delay
     * @return {?}
     */
    hide(delay = this.hideDelay) {
        if (this._tooltipInstance) {
            this._tooltipInstance.hide(delay);
        }
    }
    /**
     * Shows/hides the tooltip
     * @return {?}
     */
    toggle() {
        this._isTooltipVisible() ? this.hide() : this.show();
    }
    /**
     * Returns true if the tooltip is currently visible to the user
     * @return {?}
     */
    _isTooltipVisible() {
        return !!this._tooltipInstance && this._tooltipInstance.isVisible();
    }
    /**
     * Create the tooltip to display
     * @return {?}
     */
    _createTooltip() {
        this._createOverlay();
        /** @type {?} */
        let portal = new ComponentPortal(Md2TooltipComponent, this._viewContainerRef);
        this._tooltipInstance = this._overlayRef.attach(portal).instance;
        // Dispose the overlay when finished the shown tooltip.
        this._tooltipInstance.afterHidden().subscribe(() => {
            // Check first if the tooltip has already been removed through this components destroy.
            if (this._tooltipInstance) {
                this._disposeTooltip();
            }
        });
    }
    /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    _createOverlay() {
        /** @type {?} */
        let origin = this._getOrigin();
        /** @type {?} */
        let position = this._getOverlayPosition();
        /** @type {?} */
        let strategy = this._overlay.position().connectedTo(this._elementRef, origin, position);
        strategy.withScrollableContainers(this._scrollDispatcher.getScrollContainers(this._elementRef));
        strategy.onPositionChange.subscribe((change) => {
            if (change.scrollableViewProperties.isOverlayClipped &&
                this._tooltipInstance && this._tooltipInstance.isVisible()) {
                this.hide(0);
            }
        });
        /** @type {?} */
        let config = new OverlayState();
        config.direction = this._dir ? this._dir.value : 'ltr';
        config.positionStrategy = strategy;
        config.scrollStrategy = this._overlay.scrollStrategies.reposition({
            scrollThrottle: SCROLL_THROTTLE_MS
        });
        this._overlayRef = this._overlay.create(config);
    }
    /**
     * Disposes the current tooltip and the overlay it is attached to
     * @return {?}
     */
    _disposeTooltip() {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._tooltipInstance = null;
    }
    /**
     * Returns the origin position based on the user's position preference
     * @return {?}
     */
    _getOrigin() {
        if (this.position == 'above' || this.position == 'below') {
            return { originX: 'center', originY: this.position == 'above' ? 'top' : 'bottom' };
        }
        /** @type {?} */
        const isDirectionLtr = !this._dir || this._dir.value == 'ltr';
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
    }
    /**
     * Returns the overlay position based on the user's preference
     * @return {?}
     */
    _getOverlayPosition() {
        if (this.position == 'above') {
            return { overlayX: 'center', overlayY: 'bottom' };
        }
        if (this.position == 'below') {
            return { overlayX: 'center', overlayY: 'top' };
        }
        /** @type {?} */
        const isLtr = !this._dir || this._dir.value == 'ltr';
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
    }
    /**
     * Updates the tooltip message and repositions the overlay according to the new message length
     * @param {?} message
     * @return {?}
     */
    _setTooltipMessage(message) {
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        this._tooltipInstance.message = message;
        this._tooltipInstance._markForCheck();
        this._ngZone.onMicrotaskEmpty.pipe(first()).subscribe(() => {
            if (this._tooltipInstance) {
                this._overlayRef.updatePosition();
            }
        });
    }
}
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
Md2Tooltip.ctorParameters = () => [
    { type: Overlay },
    { type: ElementRef },
    { type: ScrollDispatcher },
    { type: ViewContainerRef },
    { type: NgZone },
    { type: Renderer2 },
    { type: Platform },
    { type: Dir, decorators: [{ type: Optional }] }
];
Md2Tooltip.propDecorators = {
    position: [{ type: Input, args: ['tooltip-position',] }],
    disabled: [{ type: Input, args: ['tooltipDisabled',] }],
    showDelay: [{ type: Input, args: ['tooltip-delay',] }],
    hideDelay: [{ type: Input, args: ['tooltip-hide-delay',] }],
    message: [{ type: Input, args: ['tooltip',] }]
};
/**
 * Internal component that wraps the tooltip's content.
 * \@docs-private
 */
class Md2TooltipComponent {
    /**
     * @param {?} _dir
     * @param {?} _changeDetectorRef
     */
    constructor(_dir, _changeDetectorRef) {
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
     * @param {?} position Position of the tooltip.
     * @param {?} delay Amount of milliseconds to the delay showing the tooltip.
     * @return {?}
     */
    show(position, delay) {
        // Cancel the delayed hide if it is scheduled
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
        // Body interactions should cancel the tooltip if there is a delay in showing.
        this._closeOnInteraction = true;
        this._setTransformOrigin(position);
        this._showTimeoutId = setTimeout(() => {
            this._visibility = 'visible';
            // If this was set to true immediately, then a body click that triggers show() would
            // trigger interaction and close the tooltip right after it was displayed.
            this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this._markForCheck();
            setTimeout(() => this._closeOnInteraction = true, 0);
        }, delay);
    }
    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param {?} delay Amount of milliseconds to delay showing the tooltip.
     * @return {?}
     */
    hide(delay) {
        // Cancel the delayed show if it is scheduled
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
        }
        this._hideTimeoutId = setTimeout(() => {
            this._visibility = 'hidden';
            this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this._markForCheck();
        }, delay);
    }
    /**
     * Returns an observable that notifies when the tooltip has been hidden from view
     * @return {?}
     */
    afterHidden() {
        return this._onHide.asObservable();
    }
    /**
     * Whether the tooltip is being displayed
     * @return {?}
     */
    isVisible() {
        return this._visibility === 'visible';
    }
    /**
     * Sets the tooltip transform origin according to the tooltip position
     * @param {?} value
     * @return {?}
     */
    _setTransformOrigin(value) {
        /** @type {?} */
        const isLtr = !this._dir || this._dir.value == 'ltr';
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
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _afterVisibilityAnimation(e) {
        if (e.toState === 'hidden' && !this.isVisible()) {
            this._onHide.next();
        }
    }
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.google.com/components/tooltips.html#tooltips-interaction
     * @return {?}
     */
    _handleBodyInteraction() {
        if (this._closeOnInteraction) {
            this.hide(0);
        }
    }
    /**
     * Marks that the tooltip needs to be checked in the next change detection run.
     * Mainly used for rendering the initial text before positioning a tooltip, which
     * can be problematic in components with OnPush change detection.
     * @return {?}
     */
    _markForCheck() {
        this._changeDetectorRef.markForCheck();
    }
}
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
Md2TooltipComponent.ctorParameters = () => [
    { type: Dir, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Md2TooltipModule {
}
Md2TooltipModule.decorators = [
    { type: NgModule, args: [{
                imports: [OverlayModule, MdCommonModule, PlatformModule],
                exports: [Md2Tooltip, Md2TooltipComponent, MdCommonModule],
                declarations: [Md2Tooltip, Md2TooltipComponent],
                entryComponents: [Md2TooltipComponent],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const MD2_MODULES = [
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
class Md2Module {
}
Md2Module.decorators = [
    { type: NgModule, args: [{
                imports: MD2_MODULES,
                exports: MD2_MODULES,
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { Dir, RtlModule, ObserveContentModule, ObserveContent, Portal, BasePortalHost, ComponentPortal, TemplatePortal, PortalHostDirective, TemplatePortalDirective, PortalModule, DomPortalHost, GestureConfig, LiveAnnouncer, LIVE_ANNOUNCER_ELEMENT_TOKEN, LIVE_ANNOUNCER_PROVIDER, InteractivityChecker, isFakeMousedownFromScreenReader, A11yModule, UniqueSelectionDispatcher, UNIQUE_SELECTION_DISPATCHER_PROVIDER, MdLineModule, MdLine, MdLineSetter, coerceBooleanProperty, coerceNumberProperty, CompatibilityModule, NoConflictStyleCompatibilityMode, MdCommonModule, MATERIAL_SANITY_CHECKS, MD_PLACEHOLDER_GLOBAL_OPTIONS, MdCoreModule, MdOptionModule, MdOptionSelectionChange, MdOption, MdOptgroupBase, _MdOptgroupMixinBase, MdOptgroup, PlatformModule, Platform, getSupportedInputTypes, Overlay, OVERLAY_PROVIDERS, OverlayContainer, FullscreenOverlayContainer, OverlayRef, OverlayState, ConnectedOverlayDirective, OverlayOrigin, OverlayModule, ViewportRuler, GlobalPositionStrategy, ConnectedPositionStrategy, ConnectionPositionPair, ScrollableViewProperties, ConnectedOverlayPositionChange, Scrollable, ScrollDispatcher, ScrollStrategyOptions, RepositionScrollStrategy, CloseScrollStrategy, NoopScrollStrategy, BlockScrollStrategy, ScrollDispatchModule, MdRipple, MD_RIPPLE_GLOBAL_OPTIONS, RippleRef, RippleState, RIPPLE_FADE_IN_DURATION, RIPPLE_FADE_OUT_DURATION, MdRippleModule, SelectionModel, SelectionChange, FocusTrap, FocusTrapFactory, FocusTrapDeprecatedDirective, FocusTrapDirective, StyleModule, FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY, TOUCH_BUFFER_MS, FocusOriginMonitor, CdkMonitorFocus, FOCUS_ORIGIN_MONITOR_PROVIDER, applyCssTransform, UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW, PAGE_UP, PAGE_DOWN, HOME, END, ENTER, SPACE, TAB, ESCAPE, BACKSPACE, DELETE, COMMA, getMdCompatibilityInvalidPrefixError, MATERIAL_COMPATIBILITY_MODE, MAT_ELEMENTS_SELECTOR, MD_ELEMENTS_SELECTOR, MatPrefixRejector, MdPrefixRejector, AnimationCurves, AnimationDurations, MdSelectionModule, MdPseudoCheckboxBase, _MdPseudoCheckboxBase, MdPseudoCheckbox, NativeDateModule, MdNativeDateModule, DateAdapter, MD_DATE_FORMATS, NativeDateAdapter, MD_NATIVE_DATE_FORMATS, Md2AccordionModule, Md2Accordion, Md2AccordionHeader, Md2AccordionTab, Md2AutocompleteModule, Item, MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR, Md2AutocompleteChange, Md2Autocomplete, HighlightPipe, Chip, MD2_CHIPS_CONTROL_VALUE_ACCESSOR, Md2ChipsChange, Md2Chips, MD2_CHIPS_DIRECTIVES, Md2ChipsModule, Md2CollapseModule, Md2Collapse, Md2ColorpickerModule, SliderPosition, SliderDimension, TextDirective, ColorpickerSliderDirective, Md2ColorChange, Md2Colorpicker, COLOR_RGB, COLOR_HSL, Hsva, Hsla, Rgba, ColorUtil, Md2PaginationChange, Md2DataTable, Md2DataTableSortBy, Md2Pagination, MD2_DATA_TABLE_DIRECTIVES, Md2DataTableModule, Md2DatepickerModule, Md2DateChange, Md2DatepickerContent, MD2_DATEPICKER_VALUE_ACCESSOR, MD2_DATEPICKER_VALIDATORS, Md2Datepicker, Md2MonthView, Md2YearView, Md2CalendarCell, Md2CalendarBody, CLOCK_RADIUS, CLOCK_INNER_RADIUS, CLOCK_OUTER_RADIUS, CLOCK_TICK_RADIUS, Md2Clock, DateLocale, DateUtil, Md2DialogModule, Md2DialogConfig, Md2DialogPortal, Md2DialogTitle, Md2DialogContent, Md2DialogActions, Md2Dialog, Md2MenuContent, Md2MenuItem, Md2MenuTrigger, Md2Menu, Md2MenuModule, Md2SelectModule, fadeInContent, transformPanel, transformPlaceholder, SELECT_ITEM_HEIGHT, SELECT_PANEL_MAX_HEIGHT, SELECT_MAX_OPTIONS_DISPLAYED, SELECT_TRIGGER_HEIGHT, SELECT_ITEM_HEIGHT_ADJUSTMENT, SELECT_PANEL_PADDING_X, SELECT_PANEL_INDENT_PADDING_X, SELECT_MULTIPLE_PANEL_PADDING_X, SELECT_PANEL_PADDING_Y, SELECT_PANEL_VIEWPORT_PADDING, Md2SelectChange, Md2Select, Md2SelectHeader, Md2OptionSelectionChange, Md2Option, Md2OptionModule, Md2OptgroupBase, _Md2OptgroupMixinBase, Md2Optgroup, Md2TabChange, Md2Transclude, Md2Tab, Md2TabLabel, Md2Tabs, MD2_TABS_DIRECTIVES, Md2TabsModule, Md2TagsModule, Tag, MD2_TAGS_CONTROL_VALUE_ACCESSOR, Md2Tags, Md2ToastModule, Toast, Md2ToastConfig, Md2Toast, Md2ToastComponent, Md2TooltipModule, throwMd2TooltipInvalidPositionError, TOUCHEND_HIDE_DELAY, SCROLL_THROTTLE_MS, Md2Tooltip, Md2TooltipComponent, Md2Module, LIVE_ANNOUNCER_PROVIDER_FACTORY as ɵi, mixinColor as ɵl, mixinDisabled as ɵm, UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY as ɵj, MdMutationObserverFactory as ɵa, OVERLAY_CONTAINER_PROVIDER as ɵc, OVERLAY_CONTAINER_PROVIDER_FACTORY as ɵb, OverlayPositionBuilder as ɵk, VIEWPORT_RULER_PROVIDER as ɵe, VIEWPORT_RULER_PROVIDER_FACTORY as ɵd, SCROLL_DISPATCHER_PROVIDER as ɵg, SCROLL_DISPATCHER_PROVIDER_FACTORY as ɵf, RippleRenderer as ɵh, Md2Calendar as ɵo, slideCalendar as ɵp, Md2DatepickerToggle as ɵn };
