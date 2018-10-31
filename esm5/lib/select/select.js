/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChildren, ElementRef, EventEmitter, Input, Optional, Output, QueryList, Renderer2, Self, ViewEncapsulation, ViewChild, ChangeDetectorRef, Attribute, } from '@angular/core';
import { Md2Option } from './option';
import { Md2Optgroup } from './optgroup';
import { ENTER, SPACE, UP_ARROW, DOWN_ARROW, HOME, END } from '../core/keyboard/keycodes';
import { FocusKeyManager } from '../core/a11y/focus-key-manager';
import { Dir } from '../core/rtl/dir';
import { merge } from 'rxjs';
import { transformPlaceholder, transformPanel, fadeInContent } from './select-animations';
import { NgControl } from '@angular/forms';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
import { ConnectedOverlayDirective } from '../core/overlay/overlay-directives';
import { ViewportRuler } from '../core/overlay/position/viewport-ruler';
import { SelectionModel } from '../core/selection/selection';
import { getMdSelectDynamicMultipleError, getMdSelectNonArrayValueError } from './select-errors';
import { startWith, filter } from 'rxjs/operators';
/** *
 * The fixed height of every option element (option, group header etc.).
  @type {?} */
export var SELECT_ITEM_HEIGHT = 48;
/** *
 * The max height of the select's overlay panel
  @type {?} */
export var SELECT_PANEL_MAX_HEIGHT = 256;
/** *
 * The max number of options visible at once in the select panel.
  @type {?} */
export var SELECT_MAX_OPTIONS_DISPLAYED = Math.floor(SELECT_PANEL_MAX_HEIGHT / SELECT_ITEM_HEIGHT);
/** *
 * The fixed height of the select's trigger element.
  @type {?} */
export var SELECT_TRIGGER_HEIGHT = 30;
/** *
 * Must adjust for the difference in height between the option and the trigger,
 * so the text will align on the y axis.
  @type {?} */
export var SELECT_ITEM_HEIGHT_ADJUSTMENT = (SELECT_ITEM_HEIGHT - SELECT_TRIGGER_HEIGHT) / 2;
/** *
 * The panel's padding on the x-axis
  @type {?} */
export var SELECT_PANEL_PADDING_X = 16;
/** *
 * The panel's x axis padding if it is indented (e.g. there is an option group).
  @type {?} */
export var SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_PADDING_X * 2;
/** *
 * Distance between the panel edge and the option text in
 * multi-selection mode.
 *
 * (SELECT_PADDING * 1.75) + 20 = 48
 * The padding is multiplied by 1.75 because the checkbox's margin is half the padding, and
 * the browser adds ~4px, because we're using inline elements.
 * The checkbox width is 20px.
  @type {?} */
export var SELECT_MULTIPLE_PANEL_PADDING_X = SELECT_PANEL_PADDING_X * 1.25 + 20;
/** *
 * The panel's padding on the y-axis. This padding indicates there are more
 * options available if you scroll.
  @type {?} */
export var SELECT_PANEL_PADDING_Y = 16;
/** *
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
  @type {?} */
export var SELECT_PANEL_VIEWPORT_PADDING = 8;
/**
 * Change event object that is emitted when the select value has changed.
 */
var /**
 * Change event object that is emitted when the select value has changed.
 */
Md2SelectChange = /** @class */ (function () {
    function Md2SelectChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return Md2SelectChange;
}());
/**
 * Change event object that is emitted when the select value has changed.
 */
export { Md2SelectChange };
if (false) {
    /** @type {?} */
    Md2SelectChange.prototype.source;
    /** @type {?} */
    Md2SelectChange.prototype.value;
}
/** @typedef {?} */
var Md2SelectFloatPlaceholderType;
export { Md2SelectFloatPlaceholderType };
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
            return merge.apply(void 0, tslib_1.__spread(this.options.map(function (option) { return option.onSelectionChange; })));
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
export { Md2Select };
if (false) {
    /**
     * Whether or not the overlay panel is open.
     * @type {?}
     */
    Md2Select.prototype._panelOpen;
    /**
     * Subscriptions to option events.
     * @type {?}
     */
    Md2Select.prototype._optionSubscription;
    /**
     * Subscription to changes in the option list.
     * @type {?}
     */
    Md2Select.prototype._changeSubscription;
    /**
     * Subscription to tab events while overlay is focused.
     * @type {?}
     */
    Md2Select.prototype._tabSubscription;
    /**
     * Whether filling out the select is required in the form.
     * @type {?}
     */
    Md2Select.prototype._required;
    /**
     * Whether the select is disabled.
     * @type {?}
     */
    Md2Select.prototype._disabled;
    /**
     * The scroll position of the overlay panel, calculated to center the selected option.
     * @type {?}
     */
    Md2Select.prototype._scrollTop;
    /**
     * The placeholder displayed in the trigger of the select.
     * @type {?}
     */
    Md2Select.prototype._placeholder;
    /**
     * Whether the component is in multiple selection mode.
     * @type {?}
     */
    Md2Select.prototype._multiple;
    /**
     * Deals with the selection logic.
     * @type {?}
     */
    Md2Select.prototype._selectionModel;
    /**
     * The animation state of the placeholder.
     * @type {?}
     */
    Md2Select.prototype._placeholderState;
    /**
     * Tab index for the element.
     * @type {?}
     */
    Md2Select.prototype._tabIndex;
    /**
     * Theme color for the component.
     * @type {?}
     */
    Md2Select.prototype._color;
    /**
     * The width of the trigger. Must be saved to set the min width of the overlay panel
     * and the width of the selected value.
     * @type {?}
     */
    Md2Select.prototype._triggerWidth;
    /**
     * Manages keyboard events for options in the panel.
     * @type {?}
     */
    Md2Select.prototype._keyManager;
    /**
     * The width of the selected option's value. Must be set programmatically
     * to ensure its overflow is clipped, as it's absolutely positioned.
     * @type {?}
     */
    Md2Select.prototype._selectedValueWidth;
    /**
     * View -> model callback called when value changes
     * @type {?}
     */
    Md2Select.prototype._onChange;
    /**
     * View -> model callback called when select has been touched
     * @type {?}
     */
    Md2Select.prototype._onTouched;
    /**
     * The IDs of child options to be passed to the aria-owns attribute.
     * @type {?}
     */
    Md2Select.prototype._optionIds;
    /**
     * The value of the select panel's transform-origin property.
     * @type {?}
     */
    Md2Select.prototype._transformOrigin;
    /**
     * Whether the panel's animation is done.
     * @type {?}
     */
    Md2Select.prototype._panelDoneAnimating;
    /**
     * The y-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text.
     * when the panel opens. Will change based on the y-position of the selected option.
     * @type {?}
     */
    Md2Select.prototype._offsetY;
    /**
     * This position config ensures that the top "start" corner of the overlay
     * is aligned with with the top "start" of the origin by default (overlapping
     * the trigger completely). If the panel cannot fit below the trigger, it
     * will fall back to a position above the trigger.
     * @type {?}
     */
    Md2Select.prototype._positions;
    /**
     * Trigger that opens the select.
     * @type {?}
     */
    Md2Select.prototype.trigger;
    /**
     * Overlay pane containing the options.
     * @type {?}
     */
    Md2Select.prototype.overlayDir;
    /**
     * All of the defined select options.
     * @type {?}
     */
    Md2Select.prototype.options;
    /**
     * All of the defined groups of options.
     * @type {?}
     */
    Md2Select.prototype.optionGroups;
    /** @type {?} */
    Md2Select.prototype._floatPlaceholder;
    /**
     * Aria label of the select. If not specified, the placeholder will be used as label.
     * @type {?}
     */
    Md2Select.prototype.ariaLabel;
    /**
     * Input that can be used to specify the `aria-labelledby` attribute.
     * @type {?}
     */
    Md2Select.prototype.ariaLabelledby;
    /**
     * Event emitted when the select has been opened.
     * @type {?}
     */
    Md2Select.prototype.onOpen;
    /**
     * Event emitted when the select has been closed.
     * @type {?}
     */
    Md2Select.prototype.onClose;
    /**
     * Event emitted when the selected value has been changed by the user.
     * @type {?}
     */
    Md2Select.prototype.change;
    /** @type {?} */
    Md2Select.prototype._element;
    /** @type {?} */
    Md2Select.prototype._renderer;
    /** @type {?} */
    Md2Select.prototype._viewportRuler;
    /** @type {?} */
    Md2Select.prototype._changeDetectorRef;
    /** @type {?} */
    Md2Select.prototype._dir;
    /** @type {?} */
    Md2Select.prototype._control;
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvc2VsZWN0L3NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxJQUFJLEVBQ0osaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsU0FBUyxHQUVWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQTRCLE1BQU0sVUFBVSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0QyxPQUFPLEVBQWMsS0FBSyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFGLE9BQU8sRUFBd0IsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDMUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxP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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeTZCdEIsb0JBQW9CLEdBQVcsRUFBRSxDQUFTLEVBQUUsR0FBVztJQUNyRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDeEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgU2VsZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFZpZXdDaGlsZCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEF0dHJpYnV0ZSxcbiAgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1kMk9wdGlvbiwgTWQyT3B0aW9uU2VsZWN0aW9uQ2hhbmdlIH0gZnJvbSAnLi9vcHRpb24nO1xuaW1wb3J0IHsgTWQyT3B0Z3JvdXAgfSBmcm9tICcuL29wdGdyb3VwJztcbmltcG9ydCB7IEVOVEVSLCBTUEFDRSwgVVBfQVJST1csIERPV05fQVJST1csIEhPTUUsIEVORCB9IGZyb20gJy4uL2NvcmUva2V5Ym9hcmQva2V5Y29kZXMnO1xuaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyIH0gZnJvbSAnLi4vY29yZS9hMTF5L2ZvY3VzLWtleS1tYW5hZ2VyJztcbmltcG9ydCB7IERpciB9IGZyb20gJy4uL2NvcmUvcnRsL2Rpcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBtZXJnZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0cmFuc2Zvcm1QbGFjZWhvbGRlciwgdHJhbnNmb3JtUGFuZWwsIGZhZGVJbkNvbnRlbnQgfSBmcm9tICcuL3NlbGVjdC1hbmltYXRpb25zJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICcuLi9jb3JlL2NvZXJjaW9uL2Jvb2xlYW4tcHJvcGVydHknO1xuaW1wb3J0IHsgQ29ubmVjdGVkT3ZlcmxheURpcmVjdGl2ZSB9IGZyb20gJy4uL2NvcmUvb3ZlcmxheS9vdmVybGF5LWRpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgVmlld3BvcnRSdWxlciB9IGZyb20gJy4uL2NvcmUvb3ZlcmxheS9wb3NpdGlvbi92aWV3cG9ydC1ydWxlcic7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJy4uL2NvcmUvc2VsZWN0aW9uL3NlbGVjdGlvbic7XG5pbXBvcnQgeyBnZXRNZFNlbGVjdER5bmFtaWNNdWx0aXBsZUVycm9yLCBnZXRNZFNlbGVjdE5vbkFycmF5VmFsdWVFcnJvciB9IGZyb20gJy4vc2VsZWN0LWVycm9ycyc7XG5pbXBvcnQgeyBzdGFydFdpdGgsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBUaGUgZm9sbG93aW5nIHN0eWxlIGNvbnN0YW50cyBhcmUgbmVjZXNzYXJ5IHRvIHNhdmUgaGVyZSBpbiBvcmRlclxuICogdG8gcHJvcGVybHkgY2FsY3VsYXRlIHRoZSBhbGlnbm1lbnQgb2YgdGhlIHNlbGVjdGVkIG9wdGlvbiBvdmVyXG4gKiB0aGUgdHJpZ2dlciBlbGVtZW50LlxuICovXG5cbi8qKiBUaGUgZml4ZWQgaGVpZ2h0IG9mIGV2ZXJ5IG9wdGlvbiBlbGVtZW50IChvcHRpb24sIGdyb3VwIGhlYWRlciBldGMuKS4gKi9cbmV4cG9ydCBjb25zdCBTRUxFQ1RfSVRFTV9IRUlHSFQgPSA0ODtcblxuLyoqIFRoZSBtYXggaGVpZ2h0IG9mIHRoZSBzZWxlY3QncyBvdmVybGF5IHBhbmVsICovXG5leHBvcnQgY29uc3QgU0VMRUNUX1BBTkVMX01BWF9IRUlHSFQgPSAyNTY7XG5cbi8qKiBUaGUgbWF4IG51bWJlciBvZiBvcHRpb25zIHZpc2libGUgYXQgb25jZSBpbiB0aGUgc2VsZWN0IHBhbmVsLiAqL1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9NQVhfT1BUSU9OU19ESVNQTEFZRUQgPVxuICBNYXRoLmZsb29yKFNFTEVDVF9QQU5FTF9NQVhfSEVJR0hUIC8gU0VMRUNUX0lURU1fSEVJR0hUKTtcblxuLyoqIFRoZSBmaXhlZCBoZWlnaHQgb2YgdGhlIHNlbGVjdCdzIHRyaWdnZXIgZWxlbWVudC4gKi9cbmV4cG9ydCBjb25zdCBTRUxFQ1RfVFJJR0dFUl9IRUlHSFQgPSAzMDtcblxuLyoqXG4gKiBNdXN0IGFkanVzdCBmb3IgdGhlIGRpZmZlcmVuY2UgaW4gaGVpZ2h0IGJldHdlZW4gdGhlIG9wdGlvbiBhbmQgdGhlIHRyaWdnZXIsXG4gKiBzbyB0aGUgdGV4dCB3aWxsIGFsaWduIG9uIHRoZSB5IGF4aXMuXG4gKi9cbmV4cG9ydCBjb25zdCBTRUxFQ1RfSVRFTV9IRUlHSFRfQURKVVNUTUVOVCA9IChTRUxFQ1RfSVRFTV9IRUlHSFQgLSBTRUxFQ1RfVFJJR0dFUl9IRUlHSFQpIC8gMjtcblxuLyoqIFRoZSBwYW5lbCdzIHBhZGRpbmcgb24gdGhlIHgtYXhpcyAqL1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9QQU5FTF9QQURESU5HX1ggPSAxNjtcblxuLyoqIFRoZSBwYW5lbCdzIHggYXhpcyBwYWRkaW5nIGlmIGl0IGlzIGluZGVudGVkIChlLmcuIHRoZXJlIGlzIGFuIG9wdGlvbiBncm91cCkuICovXG5leHBvcnQgY29uc3QgU0VMRUNUX1BBTkVMX0lOREVOVF9QQURESU5HX1ggPSBTRUxFQ1RfUEFORUxfUEFERElOR19YICogMjtcblxuLyoqXG4gKiBEaXN0YW5jZSBiZXR3ZWVuIHRoZSBwYW5lbCBlZGdlIGFuZCB0aGUgb3B0aW9uIHRleHQgaW5cbiAqIG11bHRpLXNlbGVjdGlvbiBtb2RlLlxuICpcbiAqIChTRUxFQ1RfUEFERElORyAqIDEuNzUpICsgMjAgPSA0OFxuICogVGhlIHBhZGRpbmcgaXMgbXVsdGlwbGllZCBieSAxLjc1IGJlY2F1c2UgdGhlIGNoZWNrYm94J3MgbWFyZ2luIGlzIGhhbGYgdGhlIHBhZGRpbmcsIGFuZFxuICogdGhlIGJyb3dzZXIgYWRkcyB+NHB4LCBiZWNhdXNlIHdlJ3JlIHVzaW5nIGlubGluZSBlbGVtZW50cy5cbiAqIFRoZSBjaGVja2JveCB3aWR0aCBpcyAyMHB4LlxuICovXG5leHBvcnQgY29uc3QgU0VMRUNUX01VTFRJUExFX1BBTkVMX1BBRERJTkdfWCA9IFNFTEVDVF9QQU5FTF9QQURESU5HX1ggKiAxLjI1ICsgMjA7XG5cbi8qKlxuICogVGhlIHBhbmVsJ3MgcGFkZGluZyBvbiB0aGUgeS1heGlzLiBUaGlzIHBhZGRpbmcgaW5kaWNhdGVzIHRoZXJlIGFyZSBtb3JlXG4gKiBvcHRpb25zIGF2YWlsYWJsZSBpZiB5b3Ugc2Nyb2xsLlxuICovXG5leHBvcnQgY29uc3QgU0VMRUNUX1BBTkVMX1BBRERJTkdfWSA9IDE2O1xuXG4vKipcbiAqIFRoZSBzZWxlY3QgcGFuZWwgd2lsbCBvbmx5IFwiZml0XCIgaW5zaWRlIHRoZSB2aWV3cG9ydCBpZiBpdCBpcyBwb3NpdGlvbmVkIGF0XG4gKiB0aGlzIHZhbHVlIG9yIG1vcmUgYXdheSBmcm9tIHRoZSB2aWV3cG9ydCBib3VuZGFyeS5cbiAqL1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9QQU5FTF9WSUVXUE9SVF9QQURESU5HID0gODtcblxuLyoqIENoYW5nZSBldmVudCBvYmplY3QgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCB2YWx1ZSBoYXMgY2hhbmdlZC4gKi9cbmV4cG9ydCBjbGFzcyBNZDJTZWxlY3RDaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBNZDJTZWxlY3QsIHB1YmxpYyB2YWx1ZTogYW55KSB7IH1cbn1cblxuLyoqIEFsbG93ZWQgdmFsdWVzIGZvciB0aGUgZmxvYXRQbGFjZWhvbGRlciBvcHRpb24uICovXG5leHBvcnQgdHlwZSBNZDJTZWxlY3RGbG9hdFBsYWNlaG9sZGVyVHlwZSA9ICdhbHdheXMnIHwgJ25ldmVyJyB8ICdhdXRvJztcblxuQENvbXBvbmVudCh7XG4gIFxuICBzZWxlY3RvcjogJ21kMi1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJ3NlbGVjdC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3NlbGVjdC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHtcbiAgICAncm9sZSc6ICdsaXN0Ym94JyxcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ3RhYkluZGV4JyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbF0nOiAnX2FyaWFMYWJlbCcsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxsZWRieV0nOiAnYXJpYUxhYmVsbGVkYnknLFxuICAgICdbYXR0ci5hcmlhLXJlcXVpcmVkXSc6ICdyZXF1aXJlZC50b1N0cmluZygpJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQudG9TdHJpbmcoKScsXG4gICAgJ1thdHRyLmFyaWEtaW52YWxpZF0nOiAnX2NvbnRyb2w/LmludmFsaWQgfHwgXCJmYWxzZVwiJyxcbiAgICAnW2F0dHIuYXJpYS1vd25zXSc6ICdfb3B0aW9uSWRzJyxcbiAgICAnW2NsYXNzLm1kMi1zZWxlY3QtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1kMi1zZWxlY3RdJzogJ3RydWUnLFxuICAgICcoa2V5ZG93biknOiAnX2hhbmRsZUNsb3NlZEtleWRvd24oJGV2ZW50KScsXG4gICAgJyhibHVyKSc6ICdfb25CbHVyKCknLFxuICB9LFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJhbnNmb3JtUGxhY2Vob2xkZXIsXG4gICAgdHJhbnNmb3JtUGFuZWwsXG4gICAgZmFkZUluQ29udGVudFxuICBdLFxuICBleHBvcnRBczogJ21kMlNlbGVjdCcsXG59KVxuZXhwb3J0IGNsYXNzIE1kMlNlbGVjdCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSwgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGUgb3ZlcmxheSBwYW5lbCBpcyBvcGVuLiAqL1xuICBwcml2YXRlIF9wYW5lbE9wZW4gPSBmYWxzZTtcblxuICAvKiogU3Vic2NyaXB0aW9ucyB0byBvcHRpb24gZXZlbnRzLiAqL1xuICBwcml2YXRlIF9vcHRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKiogU3Vic2NyaXB0aW9uIHRvIGNoYW5nZXMgaW4gdGhlIG9wdGlvbiBsaXN0LiAqL1xuICBwcml2YXRlIF9jaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKiogU3Vic2NyaXB0aW9uIHRvIHRhYiBldmVudHMgd2hpbGUgb3ZlcmxheSBpcyBmb2N1c2VkLiAqL1xuICBwcml2YXRlIF90YWJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKiogV2hldGhlciBmaWxsaW5nIG91dCB0aGUgc2VsZWN0IGlzIHJlcXVpcmVkIGluIHRoZSBmb3JtLiAgKi9cbiAgcHJpdmF0ZSBfcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgc2VsZWN0IGlzIGRpc2FibGVkLiAgKi9cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogVGhlIHNjcm9sbCBwb3NpdGlvbiBvZiB0aGUgb3ZlcmxheSBwYW5lbCwgY2FsY3VsYXRlZCB0byBjZW50ZXIgdGhlIHNlbGVjdGVkIG9wdGlvbi4gKi9cbiAgcHJpdmF0ZSBfc2Nyb2xsVG9wID0gMDtcblxuICAvKiogVGhlIHBsYWNlaG9sZGVyIGRpc3BsYXllZCBpbiB0aGUgdHJpZ2dlciBvZiB0aGUgc2VsZWN0LiAqL1xuICBwcml2YXRlIF9wbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjb21wb25lbnQgaXMgaW4gbXVsdGlwbGUgc2VsZWN0aW9uIG1vZGUuICovXG4gIHByaXZhdGUgX211bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIERlYWxzIHdpdGggdGhlIHNlbGVjdGlvbiBsb2dpYy4gKi9cbiAgX3NlbGVjdGlvbk1vZGVsOiBTZWxlY3Rpb25Nb2RlbDxNZDJPcHRpb24+O1xuXG4gIC8qKiBUaGUgYW5pbWF0aW9uIHN0YXRlIG9mIHRoZSBwbGFjZWhvbGRlci4gKi9cbiAgcHJpdmF0ZSBfcGxhY2Vob2xkZXJTdGF0ZSA9ICcnO1xuXG4gIC8qKiBUYWIgaW5kZXggZm9yIHRoZSBlbGVtZW50LiAqL1xuICBwcml2YXRlIF90YWJJbmRleDogbnVtYmVyO1xuXG4gIC8qKiBUaGVtZSBjb2xvciBmb3IgdGhlIGNvbXBvbmVudC4gKi9cbiAgcHJpdmF0ZSBfY29sb3I6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHdpZHRoIG9mIHRoZSB0cmlnZ2VyLiBNdXN0IGJlIHNhdmVkIHRvIHNldCB0aGUgbWluIHdpZHRoIG9mIHRoZSBvdmVybGF5IHBhbmVsXG4gICAqIGFuZCB0aGUgd2lkdGggb2YgdGhlIHNlbGVjdGVkIHZhbHVlLlxuICAgKi9cbiAgX3RyaWdnZXJXaWR0aDogbnVtYmVyO1xuXG4gIC8qKiBNYW5hZ2VzIGtleWJvYXJkIGV2ZW50cyBmb3Igb3B0aW9ucyBpbiB0aGUgcGFuZWwuICovXG4gIF9rZXlNYW5hZ2VyOiBGb2N1c0tleU1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgc2VsZWN0ZWQgb3B0aW9uJ3MgdmFsdWUuIE11c3QgYmUgc2V0IHByb2dyYW1tYXRpY2FsbHlcbiAgICogdG8gZW5zdXJlIGl0cyBvdmVyZmxvdyBpcyBjbGlwcGVkLCBhcyBpdCdzIGFic29sdXRlbHkgcG9zaXRpb25lZC5cbiAgICovXG4gIF9zZWxlY3RlZFZhbHVlV2lkdGg6IG51bWJlcjtcblxuICAvKiogVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiB2YWx1ZSBjaGFuZ2VzICovXG4gIF9vbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7IH07XG5cbiAgLyoqIFZpZXcgLT4gbW9kZWwgY2FsbGJhY2sgY2FsbGVkIHdoZW4gc2VsZWN0IGhhcyBiZWVuIHRvdWNoZWQgKi9cbiAgX29uVG91Y2hlZCA9ICgpID0+IHsgfTtcblxuICAvKiogVGhlIElEcyBvZiBjaGlsZCBvcHRpb25zIHRvIGJlIHBhc3NlZCB0byB0aGUgYXJpYS1vd25zIGF0dHJpYnV0ZS4gKi9cbiAgX29wdGlvbklkczogc3RyaW5nID0gJyc7XG5cbiAgLyoqIFRoZSB2YWx1ZSBvZiB0aGUgc2VsZWN0IHBhbmVsJ3MgdHJhbnNmb3JtLW9yaWdpbiBwcm9wZXJ0eS4gKi9cbiAgX3RyYW5zZm9ybU9yaWdpbjogc3RyaW5nID0gJ3RvcCc7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHBhbmVsJ3MgYW5pbWF0aW9uIGlzIGRvbmUuICovXG4gIF9wYW5lbERvbmVBbmltYXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIHktb2Zmc2V0IG9mIHRoZSBvdmVybGF5IHBhbmVsIGluIHJlbGF0aW9uIHRvIHRoZSB0cmlnZ2VyJ3MgdG9wIHN0YXJ0IGNvcm5lci5cbiAgICogVGhpcyBtdXN0IGJlIGFkanVzdGVkIHRvIGFsaWduIHRoZSBzZWxlY3RlZCBvcHRpb24gdGV4dCBvdmVyIHRoZSB0cmlnZ2VyIHRleHQuXG4gICAqIHdoZW4gdGhlIHBhbmVsIG9wZW5zLiBXaWxsIGNoYW5nZSBiYXNlZCBvbiB0aGUgeS1wb3NpdGlvbiBvZiB0aGUgc2VsZWN0ZWQgb3B0aW9uLlxuICAgKi9cbiAgX29mZnNldFkgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGlzIHBvc2l0aW9uIGNvbmZpZyBlbnN1cmVzIHRoYXQgdGhlIHRvcCBcInN0YXJ0XCIgY29ybmVyIG9mIHRoZSBvdmVybGF5XG4gICAqIGlzIGFsaWduZWQgd2l0aCB3aXRoIHRoZSB0b3AgXCJzdGFydFwiIG9mIHRoZSBvcmlnaW4gYnkgZGVmYXVsdCAob3ZlcmxhcHBpbmdcbiAgICogdGhlIHRyaWdnZXIgY29tcGxldGVseSkuIElmIHRoZSBwYW5lbCBjYW5ub3QgZml0IGJlbG93IHRoZSB0cmlnZ2VyLCBpdFxuICAgKiB3aWxsIGZhbGwgYmFjayB0byBhIHBvc2l0aW9uIGFib3ZlIHRoZSB0cmlnZ2VyLlxuICAgKi9cbiAgX3Bvc2l0aW9ucyA9IFtcbiAgICB7XG4gICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgIG92ZXJsYXlZOiAndG9wJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgb3ZlcmxheVk6ICdib3R0b20nLFxuICAgIH0sXG4gIF07XG5cbiAgLyoqIFRyaWdnZXIgdGhhdCBvcGVucyB0aGUgc2VsZWN0LiAqL1xuICBAVmlld0NoaWxkKCd0cmlnZ2VyJykgdHJpZ2dlcjogRWxlbWVudFJlZjtcblxuICAvKiogT3ZlcmxheSBwYW5lIGNvbnRhaW5pbmcgdGhlIG9wdGlvbnMuICovXG4gIEBWaWV3Q2hpbGQoQ29ubmVjdGVkT3ZlcmxheURpcmVjdGl2ZSkgb3ZlcmxheURpcjogQ29ubmVjdGVkT3ZlcmxheURpcmVjdGl2ZTtcblxuICAvKiogQWxsIG9mIHRoZSBkZWZpbmVkIHNlbGVjdCBvcHRpb25zLiAqL1xuICBAQ29udGVudENoaWxkcmVuKE1kMk9wdGlvbiwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBvcHRpb25zOiBRdWVyeUxpc3Q8TWQyT3B0aW9uPjtcblxuICAvKiogQWxsIG9mIHRoZSBkZWZpbmVkIGdyb3VwcyBvZiBvcHRpb25zLiAqL1xuICBAQ29udGVudENoaWxkcmVuKE1kMk9wdGdyb3VwKSBvcHRpb25Hcm91cHM6IFF1ZXJ5TGlzdDxNZDJPcHRncm91cD47XG5cbiAgLyoqIFBsYWNlaG9sZGVyIHRvIGJlIHNob3duIGlmIG5vIHZhbHVlIGhhcyBiZWVuIHNlbGVjdGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgcGxhY2Vob2xkZXIoKSB7IHJldHVybiB0aGlzLl9wbGFjZWhvbGRlcjsgfVxuICBzZXQgcGxhY2Vob2xkZXIodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdmFsdWU7XG5cbiAgICAvLyBNdXN0IHdhaXQgdG8gcmVjb3JkIHRoZSB0cmlnZ2VyIHdpZHRoIHRvIGVuc3VyZSBwbGFjZWhvbGRlciB3aWR0aCBpcyBpbmNsdWRlZC5cbiAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB0aGlzLl9zZXRUcmlnZ2VyV2lkdGgoKSk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgY29tcG9uZW50IGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKSB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBjb21wb25lbnQgaXMgcmVxdWlyZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCByZXF1aXJlZCgpIHsgcmV0dXJuIHRoaXMuX3JlcXVpcmVkOyB9XG4gIHNldCByZXF1aXJlZCh2YWx1ZTogYW55KSB7IHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSB1c2VyIHNob3VsZCBiZSBhbGxvd2VkIHRvIHNlbGVjdCBtdWx0aXBsZSBvcHRpb25zLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9tdWx0aXBsZTsgfVxuICBzZXQgbXVsdGlwbGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZWwpIHtcbiAgICAgIHRocm93IGdldE1kU2VsZWN0RHluYW1pY011bHRpcGxlRXJyb3IoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cblxuICAvKiogV2hldGhlciB0byBmbG9hdCB0aGUgcGxhY2Vob2xkZXIgdGV4dC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGZsb2F0UGxhY2Vob2xkZXIoKTogTWQyU2VsZWN0RmxvYXRQbGFjZWhvbGRlclR5cGUgeyByZXR1cm4gdGhpcy5fZmxvYXRQbGFjZWhvbGRlcjsgfVxuICBzZXQgZmxvYXRQbGFjZWhvbGRlcih2YWx1ZTogTWQyU2VsZWN0RmxvYXRQbGFjZWhvbGRlclR5cGUpIHtcbiAgICB0aGlzLl9mbG9hdFBsYWNlaG9sZGVyID0gdmFsdWUgfHwgJ2F1dG8nO1xuICB9XG4gIHByaXZhdGUgX2Zsb2F0UGxhY2Vob2xkZXI6IE1kMlNlbGVjdEZsb2F0UGxhY2Vob2xkZXJUeXBlID0gJ2F1dG8nO1xuXG4gIC8qKiBUYWIgaW5kZXggZm9yIHRoZSBzZWxlY3QgZWxlbWVudC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHRhYkluZGV4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9kaXNhYmxlZCA/IC0xIDogdGhpcy5fdGFiSW5kZXg7IH1cbiAgc2V0IHRhYkluZGV4KHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5fdGFiSW5kZXggPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvKiogQXJpYSBsYWJlbCBvZiB0aGUgc2VsZWN0LiBJZiBub3Qgc3BlY2lmaWVkLCB0aGUgcGxhY2Vob2xkZXIgd2lsbCBiZSB1c2VkIGFzIGxhYmVsLiAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBhcmlhTGFiZWw6IHN0cmluZyA9ICcnO1xuXG4gIC8qKiBJbnB1dCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNwZWNpZnkgdGhlIGBhcmlhLWxhYmVsbGVkYnlgIGF0dHJpYnV0ZS4gKi9cbiAgQElucHV0KCdhcmlhLWxhYmVsbGVkYnknKSBhcmlhTGFiZWxsZWRieTogc3RyaW5nID0gJyc7XG5cbiAgLyoqIENvbWJpbmVkIHN0cmVhbSBvZiBhbGwgb2YgdGhlIGNoaWxkIG9wdGlvbnMnIGNoYW5nZSBldmVudHMuICovXG4gIGdldCBvcHRpb25TZWxlY3Rpb25DaGFuZ2VzKCk6IE9ic2VydmFibGU8TWQyT3B0aW9uU2VsZWN0aW9uQ2hhbmdlPiB7XG4gICAgcmV0dXJuIG1lcmdlKC4uLnRoaXMub3B0aW9ucy5tYXAob3B0aW9uID0+IG9wdGlvbi5vblNlbGVjdGlvbkNoYW5nZSkpO1xuICB9XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IGhhcyBiZWVuIG9wZW5lZC4gKi9cbiAgQE91dHB1dCgpIG9uT3BlbjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCBoYXMgYmVlbiBjbG9zZWQuICovXG4gIEBPdXRwdXQoKSBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0ZWQgdmFsdWUgaGFzIGJlZW4gY2hhbmdlZCBieSB0aGUgdXNlci4gKi9cbiAgQE91dHB1dCgpIGNoYW5nZTogRXZlbnRFbWl0dGVyPE1kMlNlbGVjdENoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1kMlNlbGVjdENoYW5nZT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgX3ZpZXdwb3J0UnVsZXI6IFZpZXdwb3J0UnVsZXIsIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpciwgQFNlbGYoKSBAT3B0aW9uYWwoKSBwdWJsaWMgX2NvbnRyb2w6IE5nQ29udHJvbCxcbiAgICBAQXR0cmlidXRlKCd0YWJpbmRleCcpIHRhYkluZGV4OiBzdHJpbmcpIHtcblxuICAgIGlmICh0aGlzLl9jb250cm9sKSB7XG4gICAgICB0aGlzLl9jb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgIH1cblxuICAgIHRoaXMuX3RhYkluZGV4ID0gcGFyc2VJbnQodGFiSW5kZXgpIHx8IDA7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbCA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxNZDJPcHRpb24+KHRoaXMubXVsdGlwbGUsIG51bGwsIGZhbHNlKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9pbml0S2V5TWFuYWdlcigpO1xuXG4gICAgdGhpcy5fY2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5vcHRpb25zLmNoYW5nZXMucGlwZShzdGFydFdpdGgobnVsbCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl9yZXNldE9wdGlvbnMoKTtcblxuICAgICAgaWYgKHRoaXMuX2NvbnRyb2wpIHtcbiAgICAgICAgLy8gRGVmZXIgc2V0dGluZyB0aGUgdmFsdWUgaW4gb3JkZXIgdG8gYXZvaWQgdGhlIFwiRXhwcmVzc2lvblxuICAgICAgICAvLyBoYXMgY2hhbmdlZCBhZnRlciBpdCB3YXMgY2hlY2tlZFwiIGVycm9ycyBmcm9tIEFuZ3VsYXIuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHRoaXMuX3NldFNlbGVjdGlvbkJ5VmFsdWUodGhpcy5fY29udHJvbC52YWx1ZSkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZHJvcFN1YnNjcmlwdGlvbnMoKTtcblxuICAgIGlmICh0aGlzLl9jaGFuZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2NoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl90YWJTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX3RhYlN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUb2dnbGVzIHRoZSBvdmVybGF5IHBhbmVsIG9wZW4gb3IgY2xvc2VkLiAqL1xuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5wYW5lbE9wZW4gPyB0aGlzLmNsb3NlKCkgOiB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIC8qKiBPcGVucyB0aGUgb3ZlcmxheSBwYW5lbC4gKi9cbiAgb3BlbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAhdGhpcy5vcHRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fdHJpZ2dlcldpZHRoKSB7XG4gICAgICB0aGlzLl9zZXRUcmlnZ2VyV2lkdGgoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jYWxjdWxhdGVPdmVybGF5UG9zaXRpb24oKTtcbiAgICB0aGlzLl9wbGFjZWhvbGRlclN0YXRlID0gdGhpcy5fZmxvYXRQbGFjZWhvbGRlclN0YXRlKCk7XG4gICAgdGhpcy5fcGFuZWxPcGVuID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKiBDbG9zZXMgdGhlIG92ZXJsYXkgcGFuZWwgYW5kIGZvY3VzZXMgdGhlIGhvc3QgZWxlbWVudC4gKi9cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3BhbmVsT3Blbikge1xuICAgICAgdGhpcy5fcGFuZWxPcGVuID0gZmFsc2U7XG5cbiAgICAgIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlbC5pc0VtcHR5KCkpIHtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJTdGF0ZSA9ICcnO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9mb2N1c0hvc3QoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2VsZWN0J3MgdmFsdWUuIFBhcnQgb2YgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICAgKiByZXF1aXJlZCB0byBpbnRlZ3JhdGUgd2l0aCBBbmd1bGFyJ3MgY29yZSBmb3JtcyBBUEkuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSBOZXcgdmFsdWUgdG8gYmUgd3JpdHRlbiB0byB0aGUgbW9kZWwuXG4gICAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICB0aGlzLl9zZXRTZWxlY3Rpb25CeVZhbHVlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2F2ZXMgYSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBpbnZva2VkIHdoZW4gdGhlIHNlbGVjdCdzIHZhbHVlXG4gICAqIGNoYW5nZXMgZnJvbSB1c2VyIGlucHV0LiBQYXJ0IG9mIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgICogcmVxdWlyZWQgdG8gaW50ZWdyYXRlIHdpdGggQW5ndWxhcidzIGNvcmUgZm9ybXMgQVBJLlxuICAgKlxuICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMuXG4gICAqL1xuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cblxuICAvKipcbiAgICogU2F2ZXMgYSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBpbnZva2VkIHdoZW4gdGhlIHNlbGVjdCBpcyBibHVycmVkXG4gICAqIGJ5IHRoZSB1c2VyLiBQYXJ0IG9mIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2UgcmVxdWlyZWRcbiAgICogdG8gaW50ZWdyYXRlIHdpdGggQW5ndWxhcidzIGNvcmUgZm9ybXMgQVBJLlxuICAgKlxuICAgKiBAcGFyYW0gZm4gQ2FsbGJhY2sgdG8gYmUgdHJpZ2dlcmVkIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiB0b3VjaGVkLlxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICAvKipcbiAgICogRGlzYWJsZXMgdGhlIHNlbGVjdC4gUGFydCBvZiB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlIHJlcXVpcmVkXG4gICAqIHRvIGludGVncmF0ZSB3aXRoIEFuZ3VsYXIncyBjb3JlIGZvcm1zIEFQSS5cbiAgICpcbiAgICogQHBhcmFtIGlzRGlzYWJsZWQgU2V0cyB3aGV0aGVyIHRoZSBjb21wb25lbnQgaXMgZGlzYWJsZWQuXG4gICAqL1xuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGUgb3ZlcmxheSBwYW5lbCBpcyBvcGVuLiAqL1xuICBnZXQgcGFuZWxPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9wYW5lbE9wZW47XG4gIH1cblxuICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBvcHRpb24uICovXG4gIGdldCBzZWxlY3RlZCgpOiBNZDJPcHRpb24gfCBNZDJPcHRpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZCA6IHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdO1xuICB9XG5cbiAgLyoqIFRoZSB2YWx1ZSBkaXNwbGF5ZWQgaW4gdGhlIHRyaWdnZXIuICovXG4gIGdldCB0cmlnZ2VyVmFsdWUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5fbXVsdGlwbGUpIHtcbiAgICAgIGxldCBzZWxlY3RlZE9wdGlvbnMgPSB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5tYXAob3B0aW9uID0+IG9wdGlvbi52aWV3VmFsdWUpO1xuXG4gICAgICBpZiAodGhpcy5faXNSdGwoKSkge1xuICAgICAgICBzZWxlY3RlZE9wdGlvbnMucmV2ZXJzZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBUT0RPKGNyaXNiZXRvKTogZGVsaW1pdGVyIHNob3VsZCBiZSBjb25maWd1cmFibGUgZm9yIHByb3BlciBsb2NhbGl6YXRpb24uXG4gICAgICByZXR1cm4gc2VsZWN0ZWRPcHRpb25zLmpvaW4oJywgJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdLnZpZXdWYWx1ZTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBlbGVtZW50IGlzIGluIFJUTCBtb2RlLiAqL1xuICBfaXNSdGwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RpciA/IHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCcgOiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB3aWR0aCBvZiB0aGUgdHJpZ2dlciBlbGVtZW50LiBUaGlzIGlzIG5lY2Vzc2FyeSB0byBtYXRjaFxuICAgKiB0aGUgb3ZlcmxheSB3aWR0aCB0byB0aGUgdHJpZ2dlciB3aWR0aC5cbiAgICovXG4gIHByaXZhdGUgX3NldFRyaWdnZXJXaWR0aCgpOiB2b2lkIHtcbiAgICB0aGlzLl90cmlnZ2VyV2lkdGggPSB0aGlzLl9nZXRUcmlnZ2VyUmVjdCgpLndpZHRoO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgdGhlIGtleWJvYXJkIGludGVyYWN0aW9ucyBvZiBhIGNsb3NlZCBzZWxlY3QuICovXG4gIF9oYW5kbGVDbG9zZWRLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gRU5URVIgfHwgZXZlbnQua2V5Q29kZSA9PT0gU1BBQ0UpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudHMgdGhlIHBhZ2UgZnJvbSBzY3JvbGxpbmcgZG93biB3aGVuIHByZXNzaW5nIHNwYWNlXG4gICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSBVUF9BUlJPVyB8fCBldmVudC5rZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUFycm93S2V5KGV2ZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogSGFuZGxlcyBrZXlwcmVzc2VzIGluc2lkZSB0aGUgcGFuZWwuICovXG4gIF9oYW5kbGVQYW5lbEtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gSE9NRSB8fCBldmVudC5rZXlDb2RlID09PSBFTkQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5rZXlDb2RlID09PSBIT01FID8gdGhpcy5fa2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKSA6XG4gICAgICAgIHRoaXMuX2tleU1hbmFnZXIuc2V0TGFzdEl0ZW1BY3RpdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fa2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIHRoZSBwYW5lbCBlbGVtZW50IGlzIGZpbmlzaGVkIHRyYW5zZm9ybWluZyBpbiAodGhvdWdoIG5vdCBmYWRpbmcgaW4pLCBpdFxuICAgKiBlbWl0cyBhbiBldmVudCBhbmQgZm9jdXNlcyBhbiBvcHRpb24gaWYgdGhlIHBhbmVsIGlzIG9wZW4uXG4gICAqL1xuICBfb25QYW5lbERvbmUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGFuZWxPcGVuKSB7XG4gICAgICB0aGlzLl9mb2N1c0NvcnJlY3RPcHRpb24oKTtcbiAgICAgIHRoaXMub25PcGVuLmVtaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoKTtcbiAgICAgIHRoaXMuX3BhbmVsRG9uZUFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5vdmVybGF5RGlyLm9mZnNldFggPSAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIHRoZSBwYW5lbCBjb250ZW50IGlzIGRvbmUgZmFkaW5nIGluLCB0aGUgX3BhbmVsRG9uZUFuaW1hdGluZyBwcm9wZXJ0eSBpc1xuICAgKiBzZXQgc28gdGhlIHByb3BlciBjbGFzcyBjYW4gYmUgYWRkZWQgdG8gdGhlIHBhbmVsLlxuICAgKi9cbiAgX29uRmFkZUluRG9uZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9wYW5lbERvbmVBbmltYXRpbmcgPSB0aGlzLnBhbmVsT3BlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyB0aGUgdG91Y2hlZCBjYWxsYmFjayBvbmx5IGlmIHRoZSBwYW5lbCBpcyBjbG9zZWQuIE90aGVyd2lzZSwgdGhlIHRyaWdnZXIgd2lsbFxuICAgKiBcImJsdXJcIiB0byB0aGUgcGFuZWwgd2hlbiBpdCBvcGVucywgY2F1c2luZyBhIGZhbHNlIHBvc2l0aXZlLlxuICAgKi9cbiAgX29uQmx1cigpIHtcbiAgICBpZiAoIXRoaXMucGFuZWxPcGVuKSB7XG4gICAgICB0aGlzLl9vblRvdWNoZWQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGJhY2sgdGhhdCBpcyBpbnZva2VkIHdoZW4gdGhlIG92ZXJsYXkgcGFuZWwgaGFzIGJlZW4gYXR0YWNoZWQuXG4gICAqL1xuICBfb25BdHRhY2hlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jYWxjdWxhdGVPdmVybGF5T2Zmc2V0WCgpO1xuICAgIHRoaXMuX3NldFNjcm9sbFRvcCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNjcm9sbCBwb3NpdGlvbiBvZiB0aGUgc2Nyb2xsIGNvbnRhaW5lci4gVGhpcyBtdXN0IGJlIGNhbGxlZCBhZnRlclxuICAgKiB0aGUgb3ZlcmxheSBwYW5lIGlzIGF0dGFjaGVkIG9yIHRoZSBzY3JvbGwgY29udGFpbmVyIGVsZW1lbnQgd2lsbCBub3QgeWV0IGJlXG4gICAqIHByZXNlbnQgaW4gdGhlIERPTS5cbiAgICovXG4gIHByaXZhdGUgX3NldFNjcm9sbFRvcCgpOiB2b2lkIHtcbiAgICBjb25zdCBzY3JvbGxDb250YWluZXIgPVxuICAgICAgdGhpcy5vdmVybGF5RGlyLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1kMi1zZWxlY3QtcGFuZWwnKTtcbiAgICBzY3JvbGxDb250YWluZXIuc2Nyb2xsVG9wID0gdGhpcy5fc2Nyb2xsVG9wO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNlbGVjdGVkIG9wdGlvbiBiYXNlZCBvbiBhIHZhbHVlLiBJZiBubyBvcHRpb24gY2FuIGJlXG4gICAqIGZvdW5kIHdpdGggdGhlIGRlc2lnbmF0ZWQgdmFsdWUsIHRoZSBzZWxlY3QgdHJpZ2dlciBpcyBjbGVhcmVkLlxuICAgKi9cbiAgcHJpdmF0ZSBfc2V0U2VsZWN0aW9uQnlWYWx1ZSh2YWx1ZTogYW55IHwgYW55W10pOiB2b2lkIHtcbiAgICBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG5cbiAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB2YWx1ZSAmJiAhaXNBcnJheSkge1xuICAgICAgdGhyb3cgZ2V0TWRTZWxlY3ROb25BcnJheVZhbHVlRXJyb3IoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgaWYgKGlzQXJyYXkpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goKGN1cnJlbnRWYWx1ZTogYW55KSA9PiB0aGlzLl9zZWxlY3RWYWx1ZShjdXJyZW50VmFsdWUpKTtcbiAgICAgIHRoaXMuX3NvcnRWYWx1ZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2VsZWN0VmFsdWUodmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMuX3NldFZhbHVlV2lkdGgoKTtcblxuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlbC5pc0VtcHR5KCkpIHtcbiAgICAgIHRoaXMuX3BsYWNlaG9sZGVyU3RhdGUgPSAnJztcbiAgICB9XG5cbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kcyBhbmQgc2VsZWN0cyBhbmQgb3B0aW9uIGJhc2VkIG9uIGl0cyB2YWx1ZS5cbiAgICogQHJldHVybnMgT3B0aW9uIHRoYXQgaGFzIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlLlxuICAgKi9cbiAgcHJpdmF0ZSBfc2VsZWN0VmFsdWUodmFsdWU6IGFueSk6IE1kMk9wdGlvbiB7XG4gICAgbGV0IG9wdGlvbnNBcnJheSA9IHRoaXMub3B0aW9ucy50b0FycmF5KCk7XG4gICAgbGV0IGNvcnJlc3BvbmRpbmdPcHRpb24gPSBvcHRpb25zQXJyYXkuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbHVlICE9IG51bGxcbiAgICAgICYmIG9wdGlvbi52YWx1ZSAhPSB1bmRlZmluZWQgJiYgdGhpcy5lcXVhbHMob3B0aW9uLnZhbHVlLCB2YWx1ZSkpO1xuXG4gICAgaWYgKGNvcnJlc3BvbmRpbmdPcHRpb24pIHtcbiAgICAgIGNvcnJlc3BvbmRpbmdPcHRpb24uc2VsZWN0KCk7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3QoY29ycmVzcG9uZGluZ09wdGlvbik7XG4gICAgICB0aGlzLl9rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0ob3B0aW9uc0FycmF5LmluZGV4T2YoY29ycmVzcG9uZGluZ09wdGlvbikpO1xuICAgIH1cblxuICAgIHJldHVybiBjb3JyZXNwb25kaW5nT3B0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBhcmUgdHdvIHZhcnMgb3Igb2JqZWN0c1xuICAgKiBAcGFyYW0gbzEgY29tcGFyZSBmaXJzdCBvYmplY3RcbiAgICogQHBhcmFtIG8yIGNvbXBhcmUgc2Vjb25kIG9iamVjdFxuICAgKiBAcmV0dXJuIGJvb2xlYW4gY29tcGFyYXRpb24gcmVzdWx0XG4gICAqL1xuICBwcml2YXRlIGVxdWFscyhvMTogYW55LCBvMjogYW55KSB7XG4gICAgaWYgKG8xID09PSBvMikgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIGlmIChvMSA9PT0gbnVsbCB8fCBvMiA9PT0gbnVsbCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAobzEgIT09IG8xICYmIG8yICE9PSBvMikgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIGxldCB0MSA9IHR5cGVvZiBvMSwgdDIgPSB0eXBlb2YgbzIsIGtleTogYW55LCBrZXlTZXQ6IGFueTtcbiAgICBpZiAodDEgPT09IHQyICYmIHQxID09PSAnb2JqZWN0Jykge1xuICAgICAga2V5U2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgIGZvciAoa2V5IGluIG8xKSB7XG4gICAgICAgIGlmICghdGhpcy5lcXVhbHMobzFba2V5XSwgbzJba2V5XSkpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgIGtleVNldFtrZXldID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZvciAoa2V5IGluIG8yKSB7XG4gICAgICAgIGlmICghKGtleSBpbiBrZXlTZXQpICYmIGtleS5jaGFyQXQoMCkgIT09ICckJyAmJiBvMltrZXldKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIHNlbGVjdCB0cmlnZ2VyIGFuZCBkZXNlbGVjdHMgZXZlcnkgb3B0aW9uIGluIHRoZSBsaXN0LlxuICAgKiBAcGFyYW0gc2tpcCBPcHRpb24gdGhhdCBzaG91bGQgbm90IGJlIGRlc2VsZWN0ZWQuXG4gICAqL1xuICBwcml2YXRlIF9jbGVhclNlbGVjdGlvbihza2lwPzogTWQyT3B0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcbiAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgaWYgKG9wdGlvbiAhPT0gc2tpcCkge1xuICAgICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFRyaWdnZXJSZWN0KCk6IENsaWVudFJlY3Qge1xuICAgIHJldHVybiB0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgfVxuXG4gIC8qKiBTZXRzIHVwIGEga2V5IG1hbmFnZXIgdG8gbGlzdGVuIHRvIGtleWJvYXJkIGV2ZW50cyBvbiB0aGUgb3ZlcmxheSBwYW5lbC4gKi9cbiAgcHJpdmF0ZSBfaW5pdEtleU1hbmFnZXIoKSB7XG4gICAgdGhpcy5fa2V5TWFuYWdlciA9IG5ldyBGb2N1c0tleU1hbmFnZXIodGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLl90YWJTdWJzY3JpcHRpb24gPSB0aGlzLl9rZXlNYW5hZ2VyLnRhYk91dC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgfVxuXG4gIC8qKiBEcm9wcyBjdXJyZW50IG9wdGlvbiBzdWJzY3JpcHRpb25zIGFuZCBJRHMgYW5kIHJlc2V0cyBmcm9tIHNjcmF0Y2guICovXG4gIHByaXZhdGUgX3Jlc2V0T3B0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLl9kcm9wU3Vic2NyaXB0aW9ucygpO1xuICAgIHRoaXMuX2xpc3RlblRvT3B0aW9ucygpO1xuICAgIHRoaXMuX3NldE9wdGlvbklkcygpO1xuICAgIHRoaXMuX3NldE9wdGlvbk11bHRpcGxlKCk7XG4gIH1cblxuICAvKiogTGlzdGVucyB0byB1c2VyLWdlbmVyYXRlZCBzZWxlY3Rpb24gZXZlbnRzIG9uIGVhY2ggb3B0aW9uLiAqL1xuICBwcml2YXRlIF9saXN0ZW5Ub09wdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5fb3B0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5vcHRpb25TZWxlY3Rpb25DaGFuZ2VzXG4gICAgICAucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQuaXNVc2VySW5wdXQpKVxuICAgICAgLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgIHRoaXMuX29uU2VsZWN0KGV2ZW50LnNvdXJjZSk7XG4gICAgICAgIHRoaXMuX3NldFZhbHVlV2lkdGgoKTtcblxuICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqIEludm9rZWQgd2hlbiBhbiBvcHRpb24gaXMgY2xpY2tlZC4gKi9cbiAgcHJpdmF0ZSBfb25TZWxlY3Qob3B0aW9uOiBNZDJPcHRpb24pOiB2b2lkIHtcbiAgICBjb25zdCB3YXNTZWxlY3RlZCA9IHRoaXMuX3NlbGVjdGlvbk1vZGVsLmlzU2VsZWN0ZWQob3B0aW9uKTtcblxuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC50b2dnbGUob3B0aW9uKTtcbiAgICAgIHdhc1NlbGVjdGVkID8gb3B0aW9uLmRlc2VsZWN0KCkgOiBvcHRpb24uc2VsZWN0KCk7XG4gICAgICB0aGlzLl9zb3J0VmFsdWVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NsZWFyU2VsZWN0aW9uKG9wdGlvbi52YWx1ZSA9PSBudWxsID8gbnVsbCA6IG9wdGlvbik7XG5cbiAgICAgIGlmIChvcHRpb24udmFsdWUgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9wcm9wYWdhdGVDaGFuZ2VzKG9wdGlvbi52YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3Qob3B0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAod2FzU2VsZWN0ZWQgIT09IHRoaXMuX3NlbGVjdGlvbk1vZGVsLmlzU2VsZWN0ZWQob3B0aW9uKSkge1xuICAgICAgdGhpcy5fcHJvcGFnYXRlQ2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTb3J0cyB0aGUgbW9kZWwgdmFsdWVzLCBlbnN1cmluZyB0aGF0IHRoZXkga2VlcCB0aGUgc2FtZVxuICAgKiBvcmRlciB0aGF0IHRoZXkgaGF2ZSBpbiB0aGUgcGFuZWwuXG4gICAqL1xuICBwcml2YXRlIF9zb3J0VmFsdWVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tdWx0aXBsZSkge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcblxuICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdChvcHRpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogVW5zdWJzY3JpYmVzIGZyb20gYWxsIG9wdGlvbiBzdWJzY3JpcHRpb25zLiAqL1xuICBwcml2YXRlIF9kcm9wU3Vic2NyaXB0aW9ucygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3B0aW9uU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9vcHRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX29wdGlvblN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIEVtaXRzIGNoYW5nZSBldmVudCB0byBzZXQgdGhlIG1vZGVsIHZhbHVlLiAqL1xuICBwcml2YXRlIF9wcm9wYWdhdGVDaGFuZ2VzKGZhbGxiYWNrVmFsdWU/OiBhbnkpOiB2b2lkIHtcbiAgICBsZXQgdmFsdWVUb0VtaXQgPSBudWxsO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5zZWxlY3RlZCkpIHtcbiAgICAgIHZhbHVlVG9FbWl0ID0gdGhpcy5zZWxlY3RlZC5tYXAob3B0aW9uID0+IG9wdGlvbi52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlVG9FbWl0ID0gdGhpcy5zZWxlY3RlZCA/IHRoaXMuc2VsZWN0ZWQudmFsdWUgOiBmYWxsYmFja1ZhbHVlO1xuICAgIH1cblxuICAgIHRoaXMuX29uQ2hhbmdlKHZhbHVlVG9FbWl0KTtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KG5ldyBNZDJTZWxlY3RDaGFuZ2UodGhpcywgdmFsdWVUb0VtaXQpKTtcbiAgfVxuXG4gIC8qKiBSZWNvcmRzIG9wdGlvbiBJRHMgdG8gcGFzcyB0byB0aGUgYXJpYS1vd25zIHByb3BlcnR5LiAqL1xuICBwcml2YXRlIF9zZXRPcHRpb25JZHMoKSB7XG4gICAgdGhpcy5fb3B0aW9uSWRzID0gdGhpcy5vcHRpb25zLm1hcChvcHRpb24gPT4gb3B0aW9uLmlkKS5qb2luKCcgJyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgYG11bHRpcGxlYCBwcm9wZXJ0eSBvbiBlYWNoIG9wdGlvbi4gVGhlIHByb21pc2UgaXMgbmVjZXNzYXJ5XG4gICAqIGluIG9yZGVyIHRvIGF2b2lkIEFuZ3VsYXIgZXJyb3JzIHdoZW4gbW9kaWZ5aW5nIHRoZSBwcm9wZXJ0eSBhZnRlciBpbml0LlxuICAgKi9cbiAgcHJpdmF0ZSBfc2V0T3B0aW9uTXVsdGlwbGUoKSB7XG4gICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2gob3B0aW9uID0+IG9wdGlvbi5tdWx0aXBsZSA9IHRoaXMubXVsdGlwbGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE11c3Qgc2V0IHRoZSB3aWR0aCBvZiB0aGUgc2VsZWN0ZWQgb3B0aW9uJ3MgdmFsdWUgcHJvZ3JhbW1hdGljYWxseVxuICAgKiBiZWNhdXNlIGl0IGlzIGFic29sdXRlbHkgcG9zaXRpb25lZCBhbmQgb3RoZXJ3aXNlIHdpbGwgbm90IGNsaXBcbiAgICogb3ZlcmZsb3cuIFRoZSBzZWxlY3Rpb24gYXJyb3cgaXMgOXB4IHdpZGUsIGFkZCA0cHggb2YgcGFkZGluZyA9IDEzXG4gICAqL1xuICBwcml2YXRlIF9zZXRWYWx1ZVdpZHRoKCkge1xuICAgIHRoaXMuX3NlbGVjdGVkVmFsdWVXaWR0aCA9IHRoaXMuX3RyaWdnZXJXaWR0aCAtIDEzO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzZXMgdGhlIHNlbGVjdGVkIGl0ZW0uIElmIG5vIG9wdGlvbiBpcyBzZWxlY3RlZCwgaXQgd2lsbCBmb2N1c1xuICAgKiB0aGUgZmlyc3QgaXRlbSBpbnN0ZWFkLlxuICAgKi9cbiAgcHJpdmF0ZSBfZm9jdXNDb3JyZWN0T3B0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlbC5pc0VtcHR5KCkpIHtcbiAgICAgIHRoaXMuX2tleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbSh0aGlzLl9nZXRPcHRpb25JbmRleCh0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBob3N0IGVsZW1lbnQgd2hlbiB0aGUgcGFuZWwgY2xvc2VzLiAqL1xuICBwcml2YXRlIF9mb2N1c0hvc3QoKTogdm9pZCB7XG4gICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgaW5kZXggb2YgdGhlIHByb3ZpZGVkIG9wdGlvbiBpbiB0aGUgb3B0aW9uIGxpc3QuICovXG4gIHByaXZhdGUgX2dldE9wdGlvbkluZGV4KG9wdGlvbjogTWQyT3B0aW9uKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJlZHVjZSgocmVzdWx0OiBudW1iZXIsIGN1cnJlbnQ6IE1kMk9wdGlvbiwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gKG9wdGlvbiA9PT0gY3VycmVudCA/IGluZGV4IDogdW5kZWZpbmVkKSA6IHJlc3VsdDtcbiAgICB9LCB1bmRlZmluZWQpO1xuICB9XG5cbiAgLyoqIENhbGN1bGF0ZXMgdGhlIHNjcm9sbCBwb3NpdGlvbiBhbmQgeC0gYW5kIHktb2Zmc2V0cyBvZiB0aGUgb3ZlcmxheSBwYW5lbC4gKi9cbiAgcHJpdmF0ZSBfY2FsY3VsYXRlT3ZlcmxheVBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5fZ2V0SXRlbUNvdW50KCk7XG4gICAgY29uc3QgcGFuZWxIZWlnaHQgPSBNYXRoLm1pbihpdGVtcyAqIFNFTEVDVF9JVEVNX0hFSUdIVCwgU0VMRUNUX1BBTkVMX01BWF9IRUlHSFQpO1xuICAgIGNvbnN0IHNjcm9sbENvbnRhaW5lckhlaWdodCA9IGl0ZW1zICogU0VMRUNUX0lURU1fSEVJR0hUO1xuXG4gICAgLy8gVGhlIGZhcnRoZXN0IHRoZSBwYW5lbCBjYW4gYmUgc2Nyb2xsZWQgYmVmb3JlIGl0IGhpdHMgdGhlIGJvdHRvbVxuICAgIGNvbnN0IG1heFNjcm9sbCA9IHNjcm9sbENvbnRhaW5lckhlaWdodCAtIHBhbmVsSGVpZ2h0O1xuXG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGVsLmhhc1ZhbHVlKCkpIHtcbiAgICAgIGxldCBzZWxlY3RlZEluZGV4ID0gdGhpcy5fZ2V0T3B0aW9uSW5kZXgodGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF0pO1xuXG4gICAgICBzZWxlY3RlZEluZGV4ICs9IHRoaXMuX2dldExhYmVsQ291bnRCZWZvcmVPcHRpb24oc2VsZWN0ZWRJbmRleCk7XG5cbiAgICAgIC8vIFdlIG11c3QgbWFpbnRhaW4gYSBzY3JvbGwgYnVmZmVyIHNvIHRoZSBzZWxlY3RlZCBvcHRpb24gd2lsbCBiZSBzY3JvbGxlZCB0byB0aGVcbiAgICAgIC8vIGNlbnRlciBvZiB0aGUgb3ZlcmxheSBwYW5lbCByYXRoZXIgdGhhbiB0aGUgdG9wLlxuICAgICAgY29uc3Qgc2Nyb2xsQnVmZmVyID0gcGFuZWxIZWlnaHQgLyAyO1xuICAgICAgdGhpcy5fc2Nyb2xsVG9wID0gdGhpcy5fY2FsY3VsYXRlT3ZlcmxheVNjcm9sbChzZWxlY3RlZEluZGV4LCBzY3JvbGxCdWZmZXIsIG1heFNjcm9sbCk7XG4gICAgICB0aGlzLl9vZmZzZXRZID0gdGhpcy5fY2FsY3VsYXRlT3ZlcmxheU9mZnNldFkoc2VsZWN0ZWRJbmRleCwgc2Nyb2xsQnVmZmVyLCBtYXhTY3JvbGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiBubyBvcHRpb24gaXMgc2VsZWN0ZWQsIHRoZSBwYW5lbCBjZW50ZXJzIG9uIHRoZSBmaXJzdCBvcHRpb24uIEluIHRoaXMgY2FzZSxcbiAgICAgIC8vIHdlIG11c3Qgb25seSBhZGp1c3QgZm9yIHRoZSBoZWlnaHQgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBvcHRpb24gZWxlbWVudFxuICAgICAgLy8gYW5kIHRoZSB0cmlnZ2VyIGVsZW1lbnQsIHRoZW4gbXVsdGlwbHkgaXQgYnkgLTEgdG8gZW5zdXJlIHRoZSBwYW5lbCBtb3Zlc1xuICAgICAgLy8gaW4gdGhlIGNvcnJlY3QgZGlyZWN0aW9uIHVwIHRoZSBwYWdlLlxuICAgICAgdGhpcy5fb2Zmc2V0WSA9IChTRUxFQ1RfSVRFTV9IRUlHSFQgLSBTRUxFQ1RfVFJJR0dFUl9IRUlHSFQpIC8gMiAqIC0xO1xuICAgIH1cblxuICAgIHRoaXMuX2NoZWNrT3ZlcmxheVdpdGhpblZpZXdwb3J0KG1heFNjcm9sbCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgc2Nyb2xsIHBvc2l0aW9uIG9mIHRoZSBzZWxlY3QncyBvdmVybGF5IHBhbmVsLlxuICAgKlxuICAgKiBBdHRlbXB0cyB0byBjZW50ZXIgdGhlIHNlbGVjdGVkIG9wdGlvbiBpbiB0aGUgcGFuZWwuIElmIHRoZSBvcHRpb24gaXNcbiAgICogdG9vIGhpZ2ggb3IgdG9vIGxvdyBpbiB0aGUgcGFuZWwgdG8gYmUgc2Nyb2xsZWQgdG8gdGhlIGNlbnRlciwgaXQgY2xhbXBzIHRoZVxuICAgKiBzY3JvbGwgcG9zaXRpb24gdG8gdGhlIG1pbiBvciBtYXggc2Nyb2xsIHBvc2l0aW9ucyByZXNwZWN0aXZlbHkuXG4gICAqL1xuICBfY2FsY3VsYXRlT3ZlcmxheVNjcm9sbChzZWxlY3RlZEluZGV4OiBudW1iZXIsIHNjcm9sbEJ1ZmZlcjogbnVtYmVyLFxuICAgIG1heFNjcm9sbDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBvcHRpb25PZmZzZXRGcm9tU2Nyb2xsVG9wID0gU0VMRUNUX0lURU1fSEVJR0hUICogc2VsZWN0ZWRJbmRleDtcbiAgICBjb25zdCBoYWxmT3B0aW9uSGVpZ2h0ID0gU0VMRUNUX0lURU1fSEVJR0hUIC8gMjtcblxuICAgIC8vIFN0YXJ0cyBhdCB0aGUgb3B0aW9uT2Zmc2V0RnJvbVNjcm9sbFRvcCwgd2hpY2ggc2Nyb2xscyB0aGUgb3B0aW9uIHRvIHRoZSB0b3Agb2YgdGhlXG4gICAgLy8gc2Nyb2xsIGNvbnRhaW5lciwgdGhlbiBzdWJ0cmFjdHMgdGhlIHNjcm9sbCBidWZmZXIgdG8gc2Nyb2xsIHRoZSBvcHRpb24gZG93biB0b1xuICAgIC8vIHRoZSBjZW50ZXIgb2YgdGhlIG92ZXJsYXkgcGFuZWwuIEhhbGYgdGhlIG9wdGlvbiBoZWlnaHQgbXVzdCBiZSByZS1hZGRlZCB0byB0aGVcbiAgICAvLyBzY3JvbGxUb3Agc28gdGhlIG9wdGlvbiBpcyBjZW50ZXJlZCBiYXNlZCBvbiBpdHMgbWlkZGxlLCBub3QgaXRzIHRvcCBlZGdlLlxuICAgIGNvbnN0IG9wdGltYWxTY3JvbGxQb3NpdGlvbiA9IG9wdGlvbk9mZnNldEZyb21TY3JvbGxUb3AgLSBzY3JvbGxCdWZmZXIgKyBoYWxmT3B0aW9uSGVpZ2h0O1xuICAgIHJldHVybiBjbGFtcFZhbHVlKDAsIG9wdGltYWxTY3JvbGxQb3NpdGlvbiwgbWF4U2Nyb2xsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaWd1cmVzIG91dCB0aGUgYXBwcm9wcmlhdGUgYW5pbWF0aW9uIHN0YXRlIGZvciB0aGUgcGxhY2Vob2xkZXIuXG4gICAqL1xuICBfZ2V0UGxhY2Vob2xkZXJBbmltYXRpb25TdGF0ZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmZsb2F0UGxhY2Vob2xkZXIgPT09ICduZXZlcicpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mbG9hdFBsYWNlaG9sZGVyID09PSAnYWx3YXlzJykge1xuICAgICAgcmV0dXJuIHRoaXMuX2Zsb2F0UGxhY2Vob2xkZXJTdGF0ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9wbGFjZWhvbGRlclN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgdGhlIENTUyBgb3BhY2l0eWAgb2YgdGhlIHBsYWNlaG9sZGVyIGVsZW1lbnQuXG4gICAqL1xuICBfZ2V0UGxhY2Vob2xkZXJPcGFjaXR5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmZsb2F0UGxhY2Vob2xkZXIgIT09ICduZXZlcicgfHwgdGhpcy5fc2VsZWN0aW9uTW9kZWwuaXNFbXB0eSgpKSA/XG4gICAgICAnMScgOiAnMCc7XG4gIH1cblxuICAvKiogUmV0dXJucyB0aGUgYXJpYS1sYWJlbCBvZiB0aGUgc2VsZWN0IGNvbXBvbmVudC4gKi9cbiAgZ2V0IF9hcmlhTGFiZWwoKTogc3RyaW5nIHtcbiAgICAvLyBJZiBhbiBhcmlhTGFiZWxsZWRieSB2YWx1ZSBoYXMgYmVlbiBzZXQsIHRoZSBzZWxlY3Qgc2hvdWxkIG5vdCBvdmVyd3JpdGUgdGhlXG4gICAgLy8gYGFyaWEtbGFiZWxsZWRieWAgdmFsdWUgYnkgc2V0dGluZyB0aGUgYXJpYUxhYmVsIHRvIHRoZSBwbGFjZWhvbGRlci5cbiAgICByZXR1cm4gdGhpcy5hcmlhTGFiZWxsZWRieSA/IG51bGwgOiB0aGlzLmFyaWFMYWJlbCB8fCB0aGlzLnBsYWNlaG9sZGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHgtb2Zmc2V0IG9mIHRoZSBvdmVybGF5IHBhbmVsIGluIHJlbGF0aW9uIHRvIHRoZSB0cmlnZ2VyJ3MgdG9wIHN0YXJ0IGNvcm5lci5cbiAgICogVGhpcyBtdXN0IGJlIGFkanVzdGVkIHRvIGFsaWduIHRoZSBzZWxlY3RlZCBvcHRpb24gdGV4dCBvdmVyIHRoZSB0cmlnZ2VyIHRleHQgd2hlblxuICAgKiB0aGUgcGFuZWwgb3BlbnMuIFdpbGwgY2hhbmdlIGJhc2VkIG9uIExUUiBvciBSVEwgdGV4dCBkaXJlY3Rpb24uIE5vdGUgdGhhdCB0aGUgb2Zmc2V0XG4gICAqIGNhbid0IGJlIGNhbGN1bGF0ZWQgdW50aWwgdGhlIHBhbmVsIGhhcyBiZWVuIGF0dGFjaGVkLCBiZWNhdXNlIHdlIG5lZWQgdG8ga25vdyB0aGVcbiAgICogY29udGVudCB3aWR0aCBpbiBvcmRlciB0byBjb25zdHJhaW4gdGhlIHBhbmVsIHdpdGhpbiB0aGUgdmlld3BvcnQuXG4gICAqL1xuICBwcml2YXRlIF9jYWxjdWxhdGVPdmVybGF5T2Zmc2V0WCgpOiB2b2lkIHtcbiAgICBjb25zdCBvdmVybGF5UmVjdCA9IHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHZpZXdwb3J0UmVjdCA9IHRoaXMuX3ZpZXdwb3J0UnVsZXIuZ2V0Vmlld3BvcnRSZWN0KCk7XG4gICAgY29uc3QgaXNSdGwgPSB0aGlzLl9pc1J0bCgpO1xuICAgIGxldCBvZmZzZXRYOiBudW1iZXI7XG5cbiAgICAvLyBBZGp1c3QgdGhlIG9mZnNldCwgZGVwZW5kaW5nIG9uIHRoZSBvcHRpb24gcGFkZGluZy5cbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgb2Zmc2V0WCA9IFNFTEVDVF9NVUxUSVBMRV9QQU5FTF9QQURESU5HX1g7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdO1xuICAgICAgb2Zmc2V0WCA9IHNlbGVjdGVkICYmIHNlbGVjdGVkLmdyb3VwID8gU0VMRUNUX1BBTkVMX0lOREVOVF9QQURESU5HX1ggOiBTRUxFQ1RfUEFORUxfUEFERElOR19YO1xuICAgIH1cblxuICAgIC8vIEludmVydCB0aGUgb2Zmc2V0IGluIExUUi5cbiAgICBpZiAoIWlzUnRsKSB7XG4gICAgICBvZmZzZXRYICo9IC0xO1xuICAgIH1cblxuICAgIC8vIERldGVybWluZSBob3cgbXVjaCB0aGUgc2VsZWN0IG92ZXJmbG93cyBvbiBlYWNoIHNpZGUuXG4gICAgY29uc3QgbGVmdE92ZXJmbG93ID0gMCAtIChvdmVybGF5UmVjdC5sZWZ0ICsgb2Zmc2V0WFxuICAgICAgLSAoaXNSdGwgPyBTRUxFQ1RfUEFORUxfUEFERElOR19YICogMiA6IDApKTtcbiAgICBjb25zdCByaWdodE92ZXJmbG93ID0gb3ZlcmxheVJlY3QucmlnaHQgKyBvZmZzZXRYIC0gdmlld3BvcnRSZWN0LndpZHRoXG4gICAgICArIChpc1J0bCA/IDAgOiBTRUxFQ1RfUEFORUxfUEFERElOR19YICogMik7XG5cbiAgICAvLyBJZiB0aGUgZWxlbWVudCBvdmVyZmxvd3Mgb24gZWl0aGVyIHNpZGUsIHJlZHVjZSB0aGUgb2Zmc2V0IHRvIGFsbG93IGl0IHRvIGZpdC5cbiAgICBpZiAobGVmdE92ZXJmbG93ID4gMCkge1xuICAgICAgb2Zmc2V0WCArPSBsZWZ0T3ZlcmZsb3cgKyBTRUxFQ1RfUEFORUxfVklFV1BPUlRfUEFERElORztcbiAgICB9IGVsc2UgaWYgKHJpZ2h0T3ZlcmZsb3cgPiAwKSB7XG4gICAgICBvZmZzZXRYIC09IHJpZ2h0T3ZlcmZsb3cgKyBTRUxFQ1RfUEFORUxfVklFV1BPUlRfUEFERElORztcbiAgICB9XG5cbiAgICAvLyBTZXQgdGhlIG9mZnNldCBkaXJlY3RseSBpbiBvcmRlciB0byBhdm9pZCBoYXZpbmcgdG8gZ28gdGhyb3VnaCBjaGFuZ2UgZGV0ZWN0aW9uIGFuZFxuICAgIC8vIHBvdGVudGlhbGx5IHRyaWdnZXJpbmcgXCJjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkXCIgZXJyb3JzLlxuICAgIHRoaXMub3ZlcmxheURpci5vZmZzZXRYID0gb2Zmc2V0WDtcbiAgICB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIHktb2Zmc2V0IG9mIHRoZSBzZWxlY3QncyBvdmVybGF5IHBhbmVsIGluIHJlbGF0aW9uIHRvIHRoZVxuICAgKiB0b3Agc3RhcnQgY29ybmVyIG9mIHRoZSB0cmlnZ2VyLiBJdCBoYXMgdG8gYmUgYWRqdXN0ZWQgaW4gb3JkZXIgZm9yIHRoZVxuICAgKiBzZWxlY3RlZCBvcHRpb24gdG8gYmUgYWxpZ25lZCBvdmVyIHRoZSB0cmlnZ2VyIHdoZW4gdGhlIHBhbmVsIG9wZW5zLlxuICAgKi9cbiAgcHJpdmF0ZSBfY2FsY3VsYXRlT3ZlcmxheU9mZnNldFkoc2VsZWN0ZWRJbmRleDogbnVtYmVyLCBzY3JvbGxCdWZmZXI6IG51bWJlcixcbiAgICBtYXhTY3JvbGw6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IG9wdGlvbk9mZnNldEZyb21QYW5lbFRvcDogbnVtYmVyO1xuXG4gICAgaWYgKHRoaXMuX3Njcm9sbFRvcCA9PT0gMCkge1xuICAgICAgb3B0aW9uT2Zmc2V0RnJvbVBhbmVsVG9wID0gc2VsZWN0ZWRJbmRleCAqIFNFTEVDVF9JVEVNX0hFSUdIVDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3Njcm9sbFRvcCA9PT0gbWF4U2Nyb2xsKSB7XG4gICAgICBjb25zdCBmaXJzdERpc3BsYXllZEluZGV4ID0gdGhpcy5fZ2V0SXRlbUNvdW50KCkgLSBTRUxFQ1RfTUFYX09QVElPTlNfRElTUExBWUVEO1xuICAgICAgY29uc3Qgc2VsZWN0ZWREaXNwbGF5SW5kZXggPSBzZWxlY3RlZEluZGV4IC0gZmlyc3REaXNwbGF5ZWRJbmRleDtcblxuICAgICAgLy8gQmVjYXVzZSB0aGUgcGFuZWwgaGVpZ2h0IGlzIGxvbmdlciB0aGFuIHRoZSBoZWlnaHQgb2YgdGhlIG9wdGlvbnMgYWxvbmUsXG4gICAgICAvLyB0aGVyZSBpcyBhbHdheXMgZXh0cmEgcGFkZGluZyBhdCB0aGUgdG9wIG9yIGJvdHRvbSBvZiB0aGUgcGFuZWwuIFdoZW5cbiAgICAgIC8vIHNjcm9sbGVkIHRvIHRoZSB2ZXJ5IGJvdHRvbSwgdGhpcyBwYWRkaW5nIGlzIGF0IHRoZSB0b3Agb2YgdGhlIHBhbmVsIGFuZFxuICAgICAgLy8gbXVzdCBiZSBhZGRlZCB0byB0aGUgb2Zmc2V0LlxuICAgICAgb3B0aW9uT2Zmc2V0RnJvbVBhbmVsVG9wID1cbiAgICAgICAgc2VsZWN0ZWREaXNwbGF5SW5kZXggKiBTRUxFQ1RfSVRFTV9IRUlHSFQgKyBTRUxFQ1RfUEFORUxfUEFERElOR19ZO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiB0aGUgb3B0aW9uIHdhcyBzY3JvbGxlZCB0byB0aGUgbWlkZGxlIG9mIHRoZSBwYW5lbCB1c2luZyBhIHNjcm9sbCBidWZmZXIsXG4gICAgICAvLyBpdHMgb2Zmc2V0IHdpbGwgYmUgdGhlIHNjcm9sbCBidWZmZXIgbWludXMgdGhlIGhhbGYgaGVpZ2h0IHRoYXQgd2FzIGFkZGVkIHRvXG4gICAgICAvLyBjZW50ZXIgaXQuXG4gICAgICBvcHRpb25PZmZzZXRGcm9tUGFuZWxUb3AgPSBzY3JvbGxCdWZmZXIgLSBTRUxFQ1RfSVRFTV9IRUlHSFQgLyAyO1xuICAgIH1cblxuICAgIC8vIFRoZSBmaW5hbCBvZmZzZXQgaXMgdGhlIG9wdGlvbidzIG9mZnNldCBmcm9tIHRoZSB0b3AsIGFkanVzdGVkIGZvciB0aGUgaGVpZ2h0XG4gICAgLy8gZGlmZmVyZW5jZSwgbXVsdGlwbGllZCBieSAtMSB0byBlbnN1cmUgdGhhdCB0aGUgb3ZlcmxheSBtb3ZlcyBpbiB0aGUgY29ycmVjdFxuICAgIC8vIGRpcmVjdGlvbiB1cCB0aGUgcGFnZS5cbiAgICByZXR1cm4gb3B0aW9uT2Zmc2V0RnJvbVBhbmVsVG9wICogLTEgLSBTRUxFQ1RfSVRFTV9IRUlHSFRfQURKVVNUTUVOVDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgdGhhdCB0aGUgYXR0ZW1wdGVkIG92ZXJsYXkgcG9zaXRpb24gd2lsbCBmaXQgd2l0aGluIHRoZSB2aWV3cG9ydC5cbiAgICogSWYgaXQgd2lsbCBub3QgZml0LCB0cmllcyB0byBhZGp1c3QgdGhlIHNjcm9sbCBwb3NpdGlvbiBhbmQgdGhlIGFzc29jaWF0ZWRcbiAgICogeS1vZmZzZXQgc28gdGhlIHBhbmVsIGNhbiBvcGVuIGZ1bGx5IG9uLXNjcmVlbi4gSWYgaXQgc3RpbGwgd29uJ3QgZml0LFxuICAgKiBzZXRzIHRoZSBvZmZzZXQgYmFjayB0byAwIHRvIGFsbG93IHRoZSBmYWxsYmFjayBwb3NpdGlvbiB0byB0YWtlIG92ZXIuXG4gICAqL1xuICBwcml2YXRlIF9jaGVja092ZXJsYXlXaXRoaW5WaWV3cG9ydChtYXhTY3JvbGw6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHZpZXdwb3J0UmVjdCA9IHRoaXMuX3ZpZXdwb3J0UnVsZXIuZ2V0Vmlld3BvcnRSZWN0KCk7XG4gICAgY29uc3QgdHJpZ2dlclJlY3QgPSB0aGlzLl9nZXRUcmlnZ2VyUmVjdCgpO1xuXG4gICAgY29uc3QgdG9wU3BhY2VBdmFpbGFibGUgPSB0cmlnZ2VyUmVjdC50b3AgLSBTRUxFQ1RfUEFORUxfVklFV1BPUlRfUEFERElORztcbiAgICBjb25zdCBib3R0b21TcGFjZUF2YWlsYWJsZSA9XG4gICAgICB2aWV3cG9ydFJlY3QuaGVpZ2h0IC0gdHJpZ2dlclJlY3QuYm90dG9tIC0gU0VMRUNUX1BBTkVMX1ZJRVdQT1JUX1BBRERJTkc7XG5cbiAgICBjb25zdCBwYW5lbEhlaWdodFRvcCA9IE1hdGguYWJzKHRoaXMuX29mZnNldFkpO1xuICAgIGNvbnN0IHRvdGFsUGFuZWxIZWlnaHQgPVxuICAgICAgTWF0aC5taW4odGhpcy5fZ2V0SXRlbUNvdW50KCkgKiBTRUxFQ1RfSVRFTV9IRUlHSFQsIFNFTEVDVF9QQU5FTF9NQVhfSEVJR0hUKTtcbiAgICBjb25zdCBwYW5lbEhlaWdodEJvdHRvbSA9IHRvdGFsUGFuZWxIZWlnaHQgLSBwYW5lbEhlaWdodFRvcCAtIHRyaWdnZXJSZWN0LmhlaWdodDtcblxuICAgIGlmIChwYW5lbEhlaWdodEJvdHRvbSA+IGJvdHRvbVNwYWNlQXZhaWxhYmxlKSB7XG4gICAgICB0aGlzLl9hZGp1c3RQYW5lbFVwKHBhbmVsSGVpZ2h0Qm90dG9tLCBib3R0b21TcGFjZUF2YWlsYWJsZSk7XG4gICAgfSBlbHNlIGlmIChwYW5lbEhlaWdodFRvcCA+IHRvcFNwYWNlQXZhaWxhYmxlKSB7XG4gICAgICB0aGlzLl9hZGp1c3RQYW5lbERvd24ocGFuZWxIZWlnaHRUb3AsIHRvcFNwYWNlQXZhaWxhYmxlLCBtYXhTY3JvbGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90cmFuc2Zvcm1PcmlnaW4gPSB0aGlzLl9nZXRPcmlnaW5CYXNlZE9uT3B0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEFkanVzdHMgdGhlIG92ZXJsYXkgcGFuZWwgdXAgdG8gZml0IGluIHRoZSB2aWV3cG9ydC4gKi9cbiAgcHJpdmF0ZSBfYWRqdXN0UGFuZWxVcChwYW5lbEhlaWdodEJvdHRvbTogbnVtYmVyLCBib3R0b21TcGFjZUF2YWlsYWJsZTogbnVtYmVyKSB7XG4gICAgY29uc3QgZGlzdGFuY2VCZWxvd1ZpZXdwb3J0ID0gcGFuZWxIZWlnaHRCb3R0b20gLSBib3R0b21TcGFjZUF2YWlsYWJsZTtcblxuICAgIC8vIFNjcm9sbHMgdGhlIHBhbmVsIHVwIGJ5IHRoZSBkaXN0YW5jZSBpdCB3YXMgZXh0ZW5kaW5nIHBhc3QgdGhlIGJvdW5kYXJ5LCB0aGVuXG4gICAgLy8gYWRqdXN0cyB0aGUgb2Zmc2V0IGJ5IHRoYXQgYW1vdW50IHRvIG1vdmUgdGhlIHBhbmVsIHVwIGludG8gdGhlIHZpZXdwb3J0LlxuICAgIHRoaXMuX3Njcm9sbFRvcCAtPSBkaXN0YW5jZUJlbG93Vmlld3BvcnQ7XG4gICAgdGhpcy5fb2Zmc2V0WSAtPSBkaXN0YW5jZUJlbG93Vmlld3BvcnQ7XG4gICAgdGhpcy5fdHJhbnNmb3JtT3JpZ2luID0gdGhpcy5fZ2V0T3JpZ2luQmFzZWRPbk9wdGlvbigpO1xuXG4gICAgLy8gSWYgdGhlIHBhbmVsIGlzIHNjcm9sbGVkIHRvIHRoZSB2ZXJ5IHRvcCwgaXQgd29uJ3QgYmUgYWJsZSB0byBmaXQgdGhlIHBhbmVsXG4gICAgLy8gYnkgc2Nyb2xsaW5nLCBzbyBzZXQgdGhlIG9mZnNldCB0byAwIHRvIGFsbG93IHRoZSBmYWxsYmFjayBwb3NpdGlvbiB0byB0YWtlXG4gICAgLy8gZWZmZWN0LlxuICAgIGlmICh0aGlzLl9zY3JvbGxUb3AgPD0gMCkge1xuICAgICAgdGhpcy5fc2Nyb2xsVG9wID0gMDtcbiAgICAgIHRoaXMuX29mZnNldFkgPSAwO1xuICAgICAgdGhpcy5fdHJhbnNmb3JtT3JpZ2luID0gYDUwJSBib3R0b20gMHB4YDtcbiAgICB9XG4gIH1cblxuICAvKiogQWRqdXN0cyB0aGUgb3ZlcmxheSBwYW5lbCBkb3duIHRvIGZpdCBpbiB0aGUgdmlld3BvcnQuICovXG4gIHByaXZhdGUgX2FkanVzdFBhbmVsRG93bihwYW5lbEhlaWdodFRvcDogbnVtYmVyLCB0b3BTcGFjZUF2YWlsYWJsZTogbnVtYmVyLFxuICAgIG1heFNjcm9sbDogbnVtYmVyKSB7XG4gICAgY29uc3QgZGlzdGFuY2VBYm92ZVZpZXdwb3J0ID0gcGFuZWxIZWlnaHRUb3AgLSB0b3BTcGFjZUF2YWlsYWJsZTtcblxuICAgIC8vIFNjcm9sbHMgdGhlIHBhbmVsIGRvd24gYnkgdGhlIGRpc3RhbmNlIGl0IHdhcyBleHRlbmRpbmcgcGFzdCB0aGUgYm91bmRhcnksIHRoZW5cbiAgICAvLyBhZGp1c3RzIHRoZSBvZmZzZXQgYnkgdGhhdCBhbW91bnQgdG8gbW92ZSB0aGUgcGFuZWwgZG93biBpbnRvIHRoZSB2aWV3cG9ydC5cbiAgICB0aGlzLl9zY3JvbGxUb3AgKz0gZGlzdGFuY2VBYm92ZVZpZXdwb3J0O1xuICAgIHRoaXMuX29mZnNldFkgKz0gZGlzdGFuY2VBYm92ZVZpZXdwb3J0O1xuICAgIHRoaXMuX3RyYW5zZm9ybU9yaWdpbiA9IHRoaXMuX2dldE9yaWdpbkJhc2VkT25PcHRpb24oKTtcblxuICAgIC8vIElmIHRoZSBwYW5lbCBpcyBzY3JvbGxlZCB0byB0aGUgdmVyeSBib3R0b20sIGl0IHdvbid0IGJlIGFibGUgdG8gZml0IHRoZVxuICAgIC8vIHBhbmVsIGJ5IHNjcm9sbGluZywgc28gc2V0IHRoZSBvZmZzZXQgdG8gMCB0byBhbGxvdyB0aGUgZmFsbGJhY2sgcG9zaXRpb25cbiAgICAvLyB0byB0YWtlIGVmZmVjdC5cbiAgICBpZiAodGhpcy5fc2Nyb2xsVG9wID49IG1heFNjcm9sbCkge1xuICAgICAgdGhpcy5fc2Nyb2xsVG9wID0gbWF4U2Nyb2xsO1xuICAgICAgdGhpcy5fb2Zmc2V0WSA9IDA7XG4gICAgICB0aGlzLl90cmFuc2Zvcm1PcmlnaW4gPSBgNTAlIHRvcCAwcHhgO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSB0cmFuc2Zvcm0gb3JpZ2luIHBvaW50IGJhc2VkIG9uIHRoZSBzZWxlY3RlZCBvcHRpb24uICovXG4gIHByaXZhdGUgX2dldE9yaWdpbkJhc2VkT25PcHRpb24oKTogc3RyaW5nIHtcbiAgICBjb25zdCBvcmlnaW5ZID1cbiAgICAgIE1hdGguYWJzKHRoaXMuX29mZnNldFkpIC0gU0VMRUNUX0lURU1fSEVJR0hUX0FESlVTVE1FTlQgKyBTRUxFQ1RfSVRFTV9IRUlHSFQgLyAyO1xuICAgIHJldHVybiBgNTAlICR7b3JpZ2luWX1weCAwcHhgO1xuICB9XG5cbiAgLyoqIEZpZ3VyZXMgb3V0IHRoZSBmbG9hdGluZyBwbGFjZWhvbGRlciBzdGF0ZSB2YWx1ZS4gKi9cbiAgcHJpdmF0ZSBfZmxvYXRQbGFjZWhvbGRlclN0YXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2lzUnRsKCkgPyAnZmxvYXRpbmctcnRsJyA6ICdmbG9hdGluZy1sdHInO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgdGhlIHVzZXIgcHJlc3NpbmcgdGhlIGFycm93IGtleXMgb24gYSBjbG9zZWQgc2VsZWN0LiAgKi9cbiAgcHJpdmF0ZSBfaGFuZGxlQXJyb3dLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbXVsdGlwbGUpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJldkFjdGl2ZUl0ZW0gPSB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG5cbiAgICAgIC8vIEN5Y2xlIHRob3VnaCB0aGUgc2VsZWN0IG9wdGlvbnMgZXZlbiB3aGVuIHRoZSBzZWxlY3QgaXMgY2xvc2VkLFxuICAgICAgLy8gbWF0Y2hpbmcgdGhlIGJlaGF2aW9yIG9mIHRoZSBuYXRpdmUgc2VsZWN0IGVsZW1lbnQuXG4gICAgICAvLyBUT0RPKGNyaXNiZXRvKTogbmF0aXZlIHNlbGVjdHMgYWxzbyBjeWNsZSB0aHJvdWdoIHRoZSBvcHRpb25zIHdpdGggbGVmdC9yaWdodCBhcnJvd3MsXG4gICAgICAvLyBob3dldmVyIHRoZSBrZXkgbWFuYWdlciBvbmx5IHN1cHBvcnRzIHVwL2Rvd24gYXQgdGhlIG1vbWVudC5cbiAgICAgIHRoaXMuX2tleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcblxuICAgICAgY29uc3QgY3VycmVudEFjdGl2ZUl0ZW0gPSB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0gYXMgTWQyT3B0aW9uO1xuXG4gICAgICBpZiAoY3VycmVudEFjdGl2ZUl0ZW0gIT09IHByZXZBY3RpdmVJdGVtKSB7XG4gICAgICAgIHRoaXMuX2NsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuX3NldFNlbGVjdGlvbkJ5VmFsdWUoY3VycmVudEFjdGl2ZUl0ZW0udmFsdWUpO1xuICAgICAgICB0aGlzLl9wcm9wYWdhdGVDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIENhbGN1bGF0ZXMgdGhlIGFtb3VudCBvZiBpdGVtcyBpbiB0aGUgc2VsZWN0LiBUaGlzIGluY2x1ZGVzIG9wdGlvbnMgYW5kIGdyb3VwIGxhYmVscy4gKi9cbiAgcHJpdmF0ZSBfZ2V0SXRlbUNvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5sZW5ndGggKyB0aGlzLm9wdGlvbkdyb3Vwcy5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgYW1vdW50IG9mIG9wdGlvbiBncm91cCBsYWJlbHMgdGhhdCBwcmVjZWRlIHRoZSBzcGVjaWZpZWQgb3B0aW9uLlxuICAgKiBVc2VmdWwgd2hlbiBwb3NpdGlvbmluZyB0aGUgcGFuZWwsIGJlY2F1c2UgdGhlIGxhYmVscyB3aWxsIG9mZnNldCB0aGUgaW5kZXggb2YgdGhlXG4gICAqIGN1cnJlbnRseS1zZWxlY3RlZCBvcHRpb24uXG4gICAqL1xuICBwcml2YXRlIF9nZXRMYWJlbENvdW50QmVmb3JlT3B0aW9uKG9wdGlvbkluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLm9wdGlvbkdyb3Vwcy5sZW5ndGgpIHtcbiAgICAgIGxldCBvcHRpb25zID0gdGhpcy5vcHRpb25zLnRvQXJyYXkoKTtcbiAgICAgIGxldCBncm91cHMgPSB0aGlzLm9wdGlvbkdyb3Vwcy50b0FycmF5KCk7XG4gICAgICBsZXQgZ3JvdXBDb3VudGVyID0gMDtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25JbmRleCArIDE7IGkrKykge1xuICAgICAgICBpZiAob3B0aW9uc1tpXS5ncm91cCAmJiBvcHRpb25zW2ldLmdyb3VwID09PSBncm91cHNbZ3JvdXBDb3VudGVyXSkge1xuICAgICAgICAgIGdyb3VwQ291bnRlcisrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBncm91cENvdW50ZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cblxufVxuXG4vKiogQ2xhbXBzIGEgdmFsdWUgbiBiZXR3ZWVuIG1pbiBhbmQgbWF4IHZhbHVlcy4gKi9cbmZ1bmN0aW9uIGNsYW1wVmFsdWUobWluOiBudW1iZXIsIG46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobWluLCBuKSwgbWF4KTtcbn1cbiJdfQ==