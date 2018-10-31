/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export const SELECT_ITEM_HEIGHT = 48;
/** *
 * The max height of the select's overlay panel
  @type {?} */
export const SELECT_PANEL_MAX_HEIGHT = 256;
/** *
 * The max number of options visible at once in the select panel.
  @type {?} */
export const SELECT_MAX_OPTIONS_DISPLAYED = Math.floor(SELECT_PANEL_MAX_HEIGHT / SELECT_ITEM_HEIGHT);
/** *
 * The fixed height of the select's trigger element.
  @type {?} */
export const SELECT_TRIGGER_HEIGHT = 30;
/** *
 * Must adjust for the difference in height between the option and the trigger,
 * so the text will align on the y axis.
  @type {?} */
export const SELECT_ITEM_HEIGHT_ADJUSTMENT = (SELECT_ITEM_HEIGHT - SELECT_TRIGGER_HEIGHT) / 2;
/** *
 * The panel's padding on the x-axis
  @type {?} */
export const SELECT_PANEL_PADDING_X = 16;
/** *
 * The panel's x axis padding if it is indented (e.g. there is an option group).
  @type {?} */
export const SELECT_PANEL_INDENT_PADDING_X = SELECT_PANEL_PADDING_X * 2;
/** *
 * Distance between the panel edge and the option text in
 * multi-selection mode.
 *
 * (SELECT_PADDING * 1.75) + 20 = 48
 * The padding is multiplied by 1.75 because the checkbox's margin is half the padding, and
 * the browser adds ~4px, because we're using inline elements.
 * The checkbox width is 20px.
  @type {?} */
export const SELECT_MULTIPLE_PANEL_PADDING_X = SELECT_PANEL_PADDING_X * 1.25 + 20;
/** *
 * The panel's padding on the y-axis. This padding indicates there are more
 * options available if you scroll.
  @type {?} */
export const SELECT_PANEL_PADDING_Y = 16;
/** *
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
  @type {?} */
export const SELECT_PANEL_VIEWPORT_PADDING = 8;
/**
 * Change event object that is emitted when the select value has changed.
 */
export class Md2SelectChange {
    /**
     * @param {?} source
     * @param {?} value
     */
    constructor(source, value) {
        this.source = source;
        this.value = value;
    }
}
if (false) {
    /** @type {?} */
    Md2SelectChange.prototype.source;
    /** @type {?} */
    Md2SelectChange.prototype.value;
}
/** @typedef {?} */
var Md2SelectFloatPlaceholderType;
export { Md2SelectFloatPlaceholderType };
export class Md2Select {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvc2VsZWN0L3NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULElBQUksRUFDSixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGlCQUFpQixFQUNqQixTQUFTLEdBRVYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBNEIsTUFBTSxVQUFVLENBQUM7QUFDL0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6QyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RDLE9BQU8sRUFBYyxLQUFLLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUYsT0FBTyxFQUF3QixTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9B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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdXZCVCxvQkFBb0IsR0FBVyxFQUFFLENBQVMsRUFBRSxHQUFXO0lBQ3JELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztDQUN4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBTZWxmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVmlld0NoaWxkLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQXR0cmlidXRlLFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWQyT3B0aW9uLCBNZDJPcHRpb25TZWxlY3Rpb25DaGFuZ2UgfSBmcm9tICcuL29wdGlvbic7XG5pbXBvcnQgeyBNZDJPcHRncm91cCB9IGZyb20gJy4vb3B0Z3JvdXAnO1xuaW1wb3J0IHsgRU5URVIsIFNQQUNFLCBVUF9BUlJPVywgRE9XTl9BUlJPVywgSE9NRSwgRU5EIH0gZnJvbSAnLi4vY29yZS9rZXlib2FyZC9rZXljb2Rlcyc7XG5pbXBvcnQgeyBGb2N1c0tleU1hbmFnZXIgfSBmcm9tICcuLi9jb3JlL2ExMXkvZm9jdXMta2V5LW1hbmFnZXInO1xuaW1wb3J0IHsgRGlyIH0gZnJvbSAnLi4vY29yZS9ydGwvZGlyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG1lcmdlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRyYW5zZm9ybVBsYWNlaG9sZGVyLCB0cmFuc2Zvcm1QYW5lbCwgZmFkZUluQ29udGVudCB9IGZyb20gJy4vc2VsZWN0LWFuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJy4uL2NvcmUvY29lcmNpb24vYm9vbGVhbi1wcm9wZXJ0eSc7XG5pbXBvcnQgeyBDb25uZWN0ZWRPdmVybGF5RGlyZWN0aXZlIH0gZnJvbSAnLi4vY29yZS9vdmVybGF5L292ZXJsYXktZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBWaWV3cG9ydFJ1bGVyIH0gZnJvbSAnLi4vY29yZS9vdmVybGF5L3Bvc2l0aW9uL3ZpZXdwb3J0LXJ1bGVyJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnLi4vY29yZS9zZWxlY3Rpb24vc2VsZWN0aW9uJztcbmltcG9ydCB7IGdldE1kU2VsZWN0RHluYW1pY011bHRpcGxlRXJyb3IsIGdldE1kU2VsZWN0Tm9uQXJyYXlWYWx1ZUVycm9yIH0gZnJvbSAnLi9zZWxlY3QtZXJyb3JzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIFRoZSBmb2xsb3dpbmcgc3R5bGUgY29uc3RhbnRzIGFyZSBuZWNlc3NhcnkgdG8gc2F2ZSBoZXJlIGluIG9yZGVyXG4gKiB0byBwcm9wZXJseSBjYWxjdWxhdGUgdGhlIGFsaWdubWVudCBvZiB0aGUgc2VsZWN0ZWQgb3B0aW9uIG92ZXJcbiAqIHRoZSB0cmlnZ2VyIGVsZW1lbnQuXG4gKi9cblxuLyoqIFRoZSBmaXhlZCBoZWlnaHQgb2YgZXZlcnkgb3B0aW9uIGVsZW1lbnQgKG9wdGlvbiwgZ3JvdXAgaGVhZGVyIGV0Yy4pLiAqL1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9JVEVNX0hFSUdIVCA9IDQ4O1xuXG4vKiogVGhlIG1heCBoZWlnaHQgb2YgdGhlIHNlbGVjdCdzIG92ZXJsYXkgcGFuZWwgKi9cbmV4cG9ydCBjb25zdCBTRUxFQ1RfUEFORUxfTUFYX0hFSUdIVCA9IDI1NjtcblxuLyoqIFRoZSBtYXggbnVtYmVyIG9mIG9wdGlvbnMgdmlzaWJsZSBhdCBvbmNlIGluIHRoZSBzZWxlY3QgcGFuZWwuICovXG5leHBvcnQgY29uc3QgU0VMRUNUX01BWF9PUFRJT05TX0RJU1BMQVlFRCA9XG4gIE1hdGguZmxvb3IoU0VMRUNUX1BBTkVMX01BWF9IRUlHSFQgLyBTRUxFQ1RfSVRFTV9IRUlHSFQpO1xuXG4vKiogVGhlIGZpeGVkIGhlaWdodCBvZiB0aGUgc2VsZWN0J3MgdHJpZ2dlciBlbGVtZW50LiAqL1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9UUklHR0VSX0hFSUdIVCA9IDMwO1xuXG4vKipcbiAqIE11c3QgYWRqdXN0IGZvciB0aGUgZGlmZmVyZW5jZSBpbiBoZWlnaHQgYmV0d2VlbiB0aGUgb3B0aW9uIGFuZCB0aGUgdHJpZ2dlcixcbiAqIHNvIHRoZSB0ZXh0IHdpbGwgYWxpZ24gb24gdGhlIHkgYXhpcy5cbiAqL1xuZXhwb3J0IGNvbnN0IFNFTEVDVF9JVEVNX0hFSUdIVF9BREpVU1RNRU5UID0gKFNFTEVDVF9JVEVNX0hFSUdIVCAtIFNFTEVDVF9UUklHR0VSX0hFSUdIVCkgLyAyO1xuXG4vKiogVGhlIHBhbmVsJ3MgcGFkZGluZyBvbiB0aGUgeC1heGlzICovXG5leHBvcnQgY29uc3QgU0VMRUNUX1BBTkVMX1BBRERJTkdfWCA9IDE2O1xuXG4vKiogVGhlIHBhbmVsJ3MgeCBheGlzIHBhZGRpbmcgaWYgaXQgaXMgaW5kZW50ZWQgKGUuZy4gdGhlcmUgaXMgYW4gb3B0aW9uIGdyb3VwKS4gKi9cbmV4cG9ydCBjb25zdCBTRUxFQ1RfUEFORUxfSU5ERU5UX1BBRERJTkdfWCA9IFNFTEVDVF9QQU5FTF9QQURESU5HX1ggKiAyO1xuXG4vKipcbiAqIERpc3RhbmNlIGJldHdlZW4gdGhlIHBhbmVsIGVkZ2UgYW5kIHRoZSBvcHRpb24gdGV4dCBpblxuICogbXVsdGktc2VsZWN0aW9uIG1vZGUuXG4gKlxuICogKFNFTEVDVF9QQURESU5HICogMS43NSkgKyAyMCA9IDQ4XG4gKiBUaGUgcGFkZGluZyBpcyBtdWx0aXBsaWVkIGJ5IDEuNzUgYmVjYXVzZSB0aGUgY2hlY2tib3gncyBtYXJnaW4gaXMgaGFsZiB0aGUgcGFkZGluZywgYW5kXG4gKiB0aGUgYnJvd3NlciBhZGRzIH40cHgsIGJlY2F1c2Ugd2UncmUgdXNpbmcgaW5saW5lIGVsZW1lbnRzLlxuICogVGhlIGNoZWNrYm94IHdpZHRoIGlzIDIwcHguXG4gKi9cbmV4cG9ydCBjb25zdCBTRUxFQ1RfTVVMVElQTEVfUEFORUxfUEFERElOR19YID0gU0VMRUNUX1BBTkVMX1BBRERJTkdfWCAqIDEuMjUgKyAyMDtcblxuLyoqXG4gKiBUaGUgcGFuZWwncyBwYWRkaW5nIG9uIHRoZSB5LWF4aXMuIFRoaXMgcGFkZGluZyBpbmRpY2F0ZXMgdGhlcmUgYXJlIG1vcmVcbiAqIG9wdGlvbnMgYXZhaWxhYmxlIGlmIHlvdSBzY3JvbGwuXG4gKi9cbmV4cG9ydCBjb25zdCBTRUxFQ1RfUEFORUxfUEFERElOR19ZID0gMTY7XG5cbi8qKlxuICogVGhlIHNlbGVjdCBwYW5lbCB3aWxsIG9ubHkgXCJmaXRcIiBpbnNpZGUgdGhlIHZpZXdwb3J0IGlmIGl0IGlzIHBvc2l0aW9uZWQgYXRcbiAqIHRoaXMgdmFsdWUgb3IgbW9yZSBhd2F5IGZyb20gdGhlIHZpZXdwb3J0IGJvdW5kYXJ5LlxuICovXG5leHBvcnQgY29uc3QgU0VMRUNUX1BBTkVMX1ZJRVdQT1JUX1BBRERJTkcgPSA4O1xuXG4vKiogQ2hhbmdlIGV2ZW50IG9iamVjdCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IHZhbHVlIGhhcyBjaGFuZ2VkLiAqL1xuZXhwb3J0IGNsYXNzIE1kMlNlbGVjdENoYW5nZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1kMlNlbGVjdCwgcHVibGljIHZhbHVlOiBhbnkpIHsgfVxufVxuXG4vKiogQWxsb3dlZCB2YWx1ZXMgZm9yIHRoZSBmbG9hdFBsYWNlaG9sZGVyIG9wdGlvbi4gKi9cbmV4cG9ydCB0eXBlIE1kMlNlbGVjdEZsb2F0UGxhY2Vob2xkZXJUeXBlID0gJ2Fsd2F5cycgfCAnbmV2ZXInIHwgJ2F1dG8nO1xuXG5AQ29tcG9uZW50KHtcbiAgXG4gIHNlbGVjdG9yOiAnbWQyLXNlbGVjdCcsXG4gIHRlbXBsYXRlVXJsOiAnc2VsZWN0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnc2VsZWN0LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDoge1xuICAgICdyb2xlJzogJ2xpc3Rib3gnLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAndGFiSW5kZXgnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsXSc6ICdfYXJpYUxhYmVsJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdhcmlhTGFiZWxsZWRieScsXG4gICAgJ1thdHRyLmFyaWEtcmVxdWlyZWRdJzogJ3JlcXVpcmVkLnRvU3RyaW5nKCknLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgICAnW2F0dHIuYXJpYS1pbnZhbGlkXSc6ICdfY29udHJvbD8uaW52YWxpZCB8fCBcImZhbHNlXCInLFxuICAgICdbYXR0ci5hcmlhLW93bnNdJzogJ19vcHRpb25JZHMnLFxuICAgICdbY2xhc3MubWQyLXNlbGVjdC1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MubWQyLXNlbGVjdF0nOiAndHJ1ZScsXG4gICAgJyhrZXlkb3duKSc6ICdfaGFuZGxlQ2xvc2VkS2V5ZG93bigkZXZlbnQpJyxcbiAgICAnKGJsdXIpJzogJ19vbkJsdXIoKScsXG4gIH0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmFuc2Zvcm1QbGFjZWhvbGRlcixcbiAgICB0cmFuc2Zvcm1QYW5lbCxcbiAgICBmYWRlSW5Db250ZW50XG4gIF0sXG4gIGV4cG9ydEFzOiAnbWQyU2VsZWN0Jyxcbn0pXG5leHBvcnQgY2xhc3MgTWQyU2VsZWN0IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95LCBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoZSBvdmVybGF5IHBhbmVsIGlzIG9wZW4uICovXG4gIHByaXZhdGUgX3BhbmVsT3BlbiA9IGZhbHNlO1xuXG4gIC8qKiBTdWJzY3JpcHRpb25zIHRvIG9wdGlvbiBldmVudHMuICovXG4gIHByaXZhdGUgX29wdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKiBTdWJzY3JpcHRpb24gdG8gY2hhbmdlcyBpbiB0aGUgb3B0aW9uIGxpc3QuICovXG4gIHByaXZhdGUgX2NoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKiBTdWJzY3JpcHRpb24gdG8gdGFiIGV2ZW50cyB3aGlsZSBvdmVybGF5IGlzIGZvY3VzZWQuICovXG4gIHByaXZhdGUgX3RhYlN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKiBXaGV0aGVyIGZpbGxpbmcgb3V0IHRoZSBzZWxlY3QgaXMgcmVxdWlyZWQgaW4gdGhlIGZvcm0uICAqL1xuICBwcml2YXRlIF9yZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzZWxlY3QgaXMgZGlzYWJsZWQuICAqL1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgc2Nyb2xsIHBvc2l0aW9uIG9mIHRoZSBvdmVybGF5IHBhbmVsLCBjYWxjdWxhdGVkIHRvIGNlbnRlciB0aGUgc2VsZWN0ZWQgb3B0aW9uLiAqL1xuICBwcml2YXRlIF9zY3JvbGxUb3AgPSAwO1xuXG4gIC8qKiBUaGUgcGxhY2Vob2xkZXIgZGlzcGxheWVkIGluIHRoZSB0cmlnZ2VyIG9mIHRoZSBzZWxlY3QuICovXG4gIHByaXZhdGUgX3BsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNvbXBvbmVudCBpcyBpbiBtdWx0aXBsZSBzZWxlY3Rpb24gbW9kZS4gKi9cbiAgcHJpdmF0ZSBfbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogRGVhbHMgd2l0aCB0aGUgc2VsZWN0aW9uIGxvZ2ljLiAqL1xuICBfc2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsPE1kMk9wdGlvbj47XG5cbiAgLyoqIFRoZSBhbmltYXRpb24gc3RhdGUgb2YgdGhlIHBsYWNlaG9sZGVyLiAqL1xuICBwcml2YXRlIF9wbGFjZWhvbGRlclN0YXRlID0gJyc7XG5cbiAgLyoqIFRhYiBpbmRleCBmb3IgdGhlIGVsZW1lbnQuICovXG4gIHByaXZhdGUgX3RhYkluZGV4OiBudW1iZXI7XG5cbiAgLyoqIFRoZW1lIGNvbG9yIGZvciB0aGUgY29tcG9uZW50LiAqL1xuICBwcml2YXRlIF9jb2xvcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIHRyaWdnZXIuIE11c3QgYmUgc2F2ZWQgdG8gc2V0IHRoZSBtaW4gd2lkdGggb2YgdGhlIG92ZXJsYXkgcGFuZWxcbiAgICogYW5kIHRoZSB3aWR0aCBvZiB0aGUgc2VsZWN0ZWQgdmFsdWUuXG4gICAqL1xuICBfdHJpZ2dlcldpZHRoOiBudW1iZXI7XG5cbiAgLyoqIE1hbmFnZXMga2V5Ym9hcmQgZXZlbnRzIGZvciBvcHRpb25zIGluIHRoZSBwYW5lbC4gKi9cbiAgX2tleU1hbmFnZXI6IEZvY3VzS2V5TWFuYWdlcjtcblxuICAvKipcbiAgICogVGhlIHdpZHRoIG9mIHRoZSBzZWxlY3RlZCBvcHRpb24ncyB2YWx1ZS4gTXVzdCBiZSBzZXQgcHJvZ3JhbW1hdGljYWxseVxuICAgKiB0byBlbnN1cmUgaXRzIG92ZXJmbG93IGlzIGNsaXBwZWQsIGFzIGl0J3MgYWJzb2x1dGVseSBwb3NpdGlvbmVkLlxuICAgKi9cbiAgX3NlbGVjdGVkVmFsdWVXaWR0aDogbnVtYmVyO1xuXG4gIC8qKiBWaWV3IC0+IG1vZGVsIGNhbGxiYWNrIGNhbGxlZCB3aGVuIHZhbHVlIGNoYW5nZXMgKi9cbiAgX29uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHsgfTtcblxuICAvKiogVmlldyAtPiBtb2RlbCBjYWxsYmFjayBjYWxsZWQgd2hlbiBzZWxlY3QgaGFzIGJlZW4gdG91Y2hlZCAqL1xuICBfb25Ub3VjaGVkID0gKCkgPT4geyB9O1xuXG4gIC8qKiBUaGUgSURzIG9mIGNoaWxkIG9wdGlvbnMgdG8gYmUgcGFzc2VkIHRvIHRoZSBhcmlhLW93bnMgYXR0cmlidXRlLiAqL1xuICBfb3B0aW9uSWRzOiBzdHJpbmcgPSAnJztcblxuICAvKiogVGhlIHZhbHVlIG9mIHRoZSBzZWxlY3QgcGFuZWwncyB0cmFuc2Zvcm0tb3JpZ2luIHByb3BlcnR5LiAqL1xuICBfdHJhbnNmb3JtT3JpZ2luOiBzdHJpbmcgPSAndG9wJztcblxuICAvKiogV2hldGhlciB0aGUgcGFuZWwncyBhbmltYXRpb24gaXMgZG9uZS4gKi9cbiAgX3BhbmVsRG9uZUFuaW1hdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUgeS1vZmZzZXQgb2YgdGhlIG92ZXJsYXkgcGFuZWwgaW4gcmVsYXRpb24gdG8gdGhlIHRyaWdnZXIncyB0b3Agc3RhcnQgY29ybmVyLlxuICAgKiBUaGlzIG11c3QgYmUgYWRqdXN0ZWQgdG8gYWxpZ24gdGhlIHNlbGVjdGVkIG9wdGlvbiB0ZXh0IG92ZXIgdGhlIHRyaWdnZXIgdGV4dC5cbiAgICogd2hlbiB0aGUgcGFuZWwgb3BlbnMuIFdpbGwgY2hhbmdlIGJhc2VkIG9uIHRoZSB5LXBvc2l0aW9uIG9mIHRoZSBzZWxlY3RlZCBvcHRpb24uXG4gICAqL1xuICBfb2Zmc2V0WSA9IDA7XG5cbiAgLyoqXG4gICAqIFRoaXMgcG9zaXRpb24gY29uZmlnIGVuc3VyZXMgdGhhdCB0aGUgdG9wIFwic3RhcnRcIiBjb3JuZXIgb2YgdGhlIG92ZXJsYXlcbiAgICogaXMgYWxpZ25lZCB3aXRoIHdpdGggdGhlIHRvcCBcInN0YXJ0XCIgb2YgdGhlIG9yaWdpbiBieSBkZWZhdWx0IChvdmVybGFwcGluZ1xuICAgKiB0aGUgdHJpZ2dlciBjb21wbGV0ZWx5KS4gSWYgdGhlIHBhbmVsIGNhbm5vdCBmaXQgYmVsb3cgdGhlIHRyaWdnZXIsIGl0XG4gICAqIHdpbGwgZmFsbCBiYWNrIHRvIGEgcG9zaXRpb24gYWJvdmUgdGhlIHRyaWdnZXIuXG4gICAqL1xuICBfcG9zaXRpb25zID0gW1xuICAgIHtcbiAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgb3ZlcmxheVk6ICd0b3AnLFxuICAgIH0sXG4gICAge1xuICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICBvdmVybGF5WTogJ2JvdHRvbScsXG4gICAgfSxcbiAgXTtcblxuICAvKiogVHJpZ2dlciB0aGF0IG9wZW5zIHRoZSBzZWxlY3QuICovXG4gIEBWaWV3Q2hpbGQoJ3RyaWdnZXInKSB0cmlnZ2VyOiBFbGVtZW50UmVmO1xuXG4gIC8qKiBPdmVybGF5IHBhbmUgY29udGFpbmluZyB0aGUgb3B0aW9ucy4gKi9cbiAgQFZpZXdDaGlsZChDb25uZWN0ZWRPdmVybGF5RGlyZWN0aXZlKSBvdmVybGF5RGlyOiBDb25uZWN0ZWRPdmVybGF5RGlyZWN0aXZlO1xuXG4gIC8qKiBBbGwgb2YgdGhlIGRlZmluZWQgc2VsZWN0IG9wdGlvbnMuICovXG4gIEBDb250ZW50Q2hpbGRyZW4oTWQyT3B0aW9uLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIG9wdGlvbnM6IFF1ZXJ5TGlzdDxNZDJPcHRpb24+O1xuXG4gIC8qKiBBbGwgb2YgdGhlIGRlZmluZWQgZ3JvdXBzIG9mIG9wdGlvbnMuICovXG4gIEBDb250ZW50Q2hpbGRyZW4oTWQyT3B0Z3JvdXApIG9wdGlvbkdyb3VwczogUXVlcnlMaXN0PE1kMk9wdGdyb3VwPjtcblxuICAvKiogUGxhY2Vob2xkZXIgdG8gYmUgc2hvd24gaWYgbm8gdmFsdWUgaGFzIGJlZW4gc2VsZWN0ZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBwbGFjZWhvbGRlcigpIHsgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVyOyB9XG4gIHNldCBwbGFjZWhvbGRlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fcGxhY2Vob2xkZXIgPSB2YWx1ZTtcblxuICAgIC8vIE11c3Qgd2FpdCB0byByZWNvcmQgdGhlIHRyaWdnZXIgd2lkdGggdG8gZW5zdXJlIHBsYWNlaG9sZGVyIHdpZHRoIGlzIGluY2x1ZGVkLlxuICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHRoaXMuX3NldFRyaWdnZXJXaWR0aCgpKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBjb21wb25lbnQgaXMgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNvbXBvbmVudCBpcyByZXF1aXJlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHJlcXVpcmVkKCkgeyByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7IH1cbiAgc2V0IHJlcXVpcmVkKHZhbHVlOiBhbnkpIHsgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHVzZXIgc2hvdWxkIGJlIGFsbG93ZWQgdG8gc2VsZWN0IG11bHRpcGxlIG9wdGlvbnMuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX211bHRpcGxlOyB9XG4gIHNldCBtdWx0aXBsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlbCkge1xuICAgICAgdGhyb3cgZ2V0TWRTZWxlY3REeW5hbWljTXVsdGlwbGVFcnJvcigpO1xuICAgIH1cblxuICAgIHRoaXMuX211bHRpcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRvIGZsb2F0IHRoZSBwbGFjZWhvbGRlciB0ZXh0LiAqL1xuICBASW5wdXQoKVxuICBnZXQgZmxvYXRQbGFjZWhvbGRlcigpOiBNZDJTZWxlY3RGbG9hdFBsYWNlaG9sZGVyVHlwZSB7IHJldHVybiB0aGlzLl9mbG9hdFBsYWNlaG9sZGVyOyB9XG4gIHNldCBmbG9hdFBsYWNlaG9sZGVyKHZhbHVlOiBNZDJTZWxlY3RGbG9hdFBsYWNlaG9sZGVyVHlwZSkge1xuICAgIHRoaXMuX2Zsb2F0UGxhY2Vob2xkZXIgPSB2YWx1ZSB8fCAnYXV0byc7XG4gIH1cbiAgcHJpdmF0ZSBfZmxvYXRQbGFjZWhvbGRlcjogTWQyU2VsZWN0RmxvYXRQbGFjZWhvbGRlclR5cGUgPSAnYXV0byc7XG5cbiAgLyoqIFRhYiBpbmRleCBmb3IgdGhlIHNlbGVjdCBlbGVtZW50LiAqL1xuICBASW5wdXQoKVxuICBnZXQgdGFiSW5kZXgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkID8gLTEgOiB0aGlzLl90YWJJbmRleDsgfVxuICBzZXQgdGFiSW5kZXgodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLl90YWJJbmRleCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBBcmlhIGxhYmVsIG9mIHRoZSBzZWxlY3QuIElmIG5vdCBzcGVjaWZpZWQsIHRoZSBwbGFjZWhvbGRlciB3aWxsIGJlIHVzZWQgYXMgbGFiZWwuICovXG4gIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nID0gJyc7XG5cbiAgLyoqIElucHV0IHRoYXQgY2FuIGJlIHVzZWQgdG8gc3BlY2lmeSB0aGUgYGFyaWEtbGFiZWxsZWRieWAgYXR0cmlidXRlLiAqL1xuICBASW5wdXQoJ2FyaWEtbGFiZWxsZWRieScpIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmcgPSAnJztcblxuICAvKiogQ29tYmluZWQgc3RyZWFtIG9mIGFsbCBvZiB0aGUgY2hpbGQgb3B0aW9ucycgY2hhbmdlIGV2ZW50cy4gKi9cbiAgZ2V0IG9wdGlvblNlbGVjdGlvbkNoYW5nZXMoKTogT2JzZXJ2YWJsZTxNZDJPcHRpb25TZWxlY3Rpb25DaGFuZ2U+IHtcbiAgICByZXR1cm4gbWVyZ2UoLi4udGhpcy5vcHRpb25zLm1hcChvcHRpb24gPT4gb3B0aW9uLm9uU2VsZWN0aW9uQ2hhbmdlKSk7XG4gIH1cblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgaGFzIGJlZW4gb3BlbmVkLiAqL1xuICBAT3V0cHV0KCkgb25PcGVuOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IGhhcyBiZWVuIGNsb3NlZC4gKi9cbiAgQE91dHB1dCgpIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3RlZCB2YWx1ZSBoYXMgYmVlbiBjaGFuZ2VkIGJ5IHRoZSB1c2VyLiAqL1xuICBAT3V0cHV0KCkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8TWQyU2VsZWN0Q2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWQyU2VsZWN0Q2hhbmdlPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlciwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RpcjogRGlyLCBAU2VsZigpIEBPcHRpb25hbCgpIHB1YmxpYyBfY29udHJvbDogTmdDb250cm9sLFxuICAgIEBBdHRyaWJ1dGUoJ3RhYmluZGV4JykgdGFiSW5kZXg6IHN0cmluZykge1xuXG4gICAgaWYgKHRoaXMuX2NvbnRyb2wpIHtcbiAgICAgIHRoaXMuX2NvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgfVxuXG4gICAgdGhpcy5fdGFiSW5kZXggPSBwYXJzZUludCh0YWJJbmRleCkgfHwgMDtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsPE1kMk9wdGlvbj4odGhpcy5tdWx0aXBsZSwgbnVsbCwgZmFsc2UpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2luaXRLZXlNYW5hZ2VyKCk7XG5cbiAgICB0aGlzLl9jaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLm9wdGlvbnMuY2hhbmdlcy5waXBlKHN0YXJ0V2l0aChudWxsKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX3Jlc2V0T3B0aW9ucygpO1xuXG4gICAgICBpZiAodGhpcy5fY29udHJvbCkge1xuICAgICAgICAvLyBEZWZlciBzZXR0aW5nIHRoZSB2YWx1ZSBpbiBvcmRlciB0byBhdm9pZCB0aGUgXCJFeHByZXNzaW9uXG4gICAgICAgIC8vIGhhcyBjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkXCIgZXJyb3JzIGZyb20gQW5ndWxhci5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4gdGhpcy5fc2V0U2VsZWN0aW9uQnlWYWx1ZSh0aGlzLl9jb250cm9sLnZhbHVlKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kcm9wU3Vic2NyaXB0aW9ucygpO1xuXG4gICAgaWYgKHRoaXMuX2NoYW5nZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fY2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3RhYlN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fdGFiU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRvZ2dsZXMgdGhlIG92ZXJsYXkgcGFuZWwgb3BlbiBvciBjbG9zZWQuICovXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLnBhbmVsT3BlbiA/IHRoaXMuY2xvc2UoKSA6IHRoaXMub3BlbigpO1xuICB9XG5cbiAgLyoqIE9wZW5zIHRoZSBvdmVybGF5IHBhbmVsLiAqL1xuICBvcGVuKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICF0aGlzLm9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl90cmlnZ2VyV2lkdGgpIHtcbiAgICAgIHRoaXMuX3NldFRyaWdnZXJXaWR0aCgpO1xuICAgIH1cblxuICAgIHRoaXMuX2NhbGN1bGF0ZU92ZXJsYXlQb3NpdGlvbigpO1xuICAgIHRoaXMuX3BsYWNlaG9sZGVyU3RhdGUgPSB0aGlzLl9mbG9hdFBsYWNlaG9sZGVyU3RhdGUoKTtcbiAgICB0aGlzLl9wYW5lbE9wZW4gPSB0cnVlO1xuICB9XG5cbiAgLyoqIENsb3NlcyB0aGUgb3ZlcmxheSBwYW5lbCBhbmQgZm9jdXNlcyB0aGUgaG9zdCBlbGVtZW50LiAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcGFuZWxPcGVuKSB7XG4gICAgICB0aGlzLl9wYW5lbE9wZW4gPSBmYWxzZTtcblxuICAgICAgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGVsLmlzRW1wdHkoKSkge1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlclN0YXRlID0gJyc7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2ZvY3VzSG9zdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzZWxlY3QncyB2YWx1ZS4gUGFydCBvZiB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gICAqIHJlcXVpcmVkIHRvIGludGVncmF0ZSB3aXRoIEFuZ3VsYXIncyBjb3JlIGZvcm1zIEFQSS5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlIE5ldyB2YWx1ZSB0byBiZSB3cml0dGVuIHRvIHRoZSBtb2RlbC5cbiAgICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgIHRoaXMuX3NldFNlbGVjdGlvbkJ5VmFsdWUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlcyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2hlbiB0aGUgc2VsZWN0J3MgdmFsdWVcbiAgICogY2hhbmdlcyBmcm9tIHVzZXIgaW5wdXQuIFBhcnQgb2YgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICAgKiByZXF1aXJlZCB0byBpbnRlZ3JhdGUgd2l0aCBBbmd1bGFyJ3MgY29yZSBmb3JtcyBBUEkuXG4gICAqXG4gICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGUgdmFsdWUgY2hhbmdlcy5cbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlcyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2hlbiB0aGUgc2VsZWN0IGlzIGJsdXJyZWRcbiAgICogYnkgdGhlIHVzZXIuIFBhcnQgb2YgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZSByZXF1aXJlZFxuICAgKiB0byBpbnRlZ3JhdGUgd2l0aCBBbmd1bGFyJ3MgY29yZSBmb3JtcyBBUEkuXG4gICAqXG4gICAqIEBwYXJhbSBmbiBDYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIHRvdWNoZWQuXG4gICAqL1xuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNhYmxlcyB0aGUgc2VsZWN0LiBQYXJ0IG9mIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2UgcmVxdWlyZWRcbiAgICogdG8gaW50ZWdyYXRlIHdpdGggQW5ndWxhcidzIGNvcmUgZm9ybXMgQVBJLlxuICAgKlxuICAgKiBAcGFyYW0gaXNEaXNhYmxlZCBTZXRzIHdoZXRoZXIgdGhlIGNvbXBvbmVudCBpcyBkaXNhYmxlZC5cbiAgICovXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoZSBvdmVybGF5IHBhbmVsIGlzIG9wZW4uICovXG4gIGdldCBwYW5lbE9wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3BhbmVsT3BlbjtcbiAgfVxuXG4gIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIG9wdGlvbi4gKi9cbiAgZ2V0IHNlbGVjdGVkKCk6IE1kMk9wdGlvbiB8IE1kMk9wdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBsZSA/IHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkIDogdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF07XG4gIH1cblxuICAvKiogVGhlIHZhbHVlIGRpc3BsYXllZCBpbiB0aGUgdHJpZ2dlci4gKi9cbiAgZ2V0IHRyaWdnZXJWYWx1ZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLl9tdWx0aXBsZSkge1xuICAgICAgbGV0IHNlbGVjdGVkT3B0aW9ucyA9IHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkLm1hcChvcHRpb24gPT4gb3B0aW9uLnZpZXdWYWx1ZSk7XG5cbiAgICAgIGlmICh0aGlzLl9pc1J0bCgpKSB7XG4gICAgICAgIHNlbGVjdGVkT3B0aW9ucy5yZXZlcnNlKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE8oY3Jpc2JldG8pOiBkZWxpbWl0ZXIgc2hvdWxkIGJlIGNvbmZpZ3VyYWJsZSBmb3IgcHJvcGVyIGxvY2FsaXphdGlvbi5cbiAgICAgIHJldHVybiBzZWxlY3RlZE9wdGlvbnMuam9pbignLCAnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF0udmlld1ZhbHVlO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGVsZW1lbnQgaXMgaW4gUlRMIG1vZGUuICovXG4gIF9pc1J0bCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyID8gdGhpcy5fZGlyLnZhbHVlID09PSAncnRsJyA6IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHdpZHRoIG9mIHRoZSB0cmlnZ2VyIGVsZW1lbnQuIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIG1hdGNoXG4gICAqIHRoZSBvdmVybGF5IHdpZHRoIHRvIHRoZSB0cmlnZ2VyIHdpZHRoLlxuICAgKi9cbiAgcHJpdmF0ZSBfc2V0VHJpZ2dlcldpZHRoKCk6IHZvaWQge1xuICAgIHRoaXMuX3RyaWdnZXJXaWR0aCA9IHRoaXMuX2dldFRyaWdnZXJSZWN0KCkud2lkdGg7XG4gIH1cblxuICAvKiogSGFuZGxlcyB0aGUga2V5Ym9hcmQgaW50ZXJhY3Rpb25zIG9mIGEgY2xvc2VkIHNlbGVjdC4gKi9cbiAgX2hhbmRsZUNsb3NlZEtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFTlRFUiB8fCBldmVudC5rZXlDb2RlID09PSBTUEFDRSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50cyB0aGUgcGFnZSBmcm9tIHNjcm9sbGluZyBkb3duIHdoZW4gcHJlc3Npbmcgc3BhY2VcbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IFVQX0FSUk9XIHx8IGV2ZW50LmtleUNvZGUgPT09IERPV05fQVJST1cpIHtcbiAgICAgICAgdGhpcy5faGFuZGxlQXJyb3dLZXkoZXZlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGtleXByZXNzZXMgaW5zaWRlIHRoZSBwYW5lbC4gKi9cbiAgX2hhbmRsZVBhbmVsS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSBIT01FIHx8IGV2ZW50LmtleUNvZGUgPT09IEVORCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LmtleUNvZGUgPT09IEhPTUUgPyB0aGlzLl9rZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpIDpcbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRMYXN0SXRlbUFjdGl2ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhlIHBhbmVsIGVsZW1lbnQgaXMgZmluaXNoZWQgdHJhbnNmb3JtaW5nIGluICh0aG91Z2ggbm90IGZhZGluZyBpbiksIGl0XG4gICAqIGVtaXRzIGFuIGV2ZW50IGFuZCBmb2N1c2VzIGFuIG9wdGlvbiBpZiB0aGUgcGFuZWwgaXMgb3Blbi5cbiAgICovXG4gIF9vblBhbmVsRG9uZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgIHRoaXMuX2ZvY3VzQ29ycmVjdE9wdGlvbigpO1xuICAgICAgdGhpcy5vbk9wZW4uZW1pdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uQ2xvc2UuZW1pdCgpO1xuICAgICAgdGhpcy5fcGFuZWxEb25lQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLm92ZXJsYXlEaXIub2Zmc2V0WCA9IDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhlIHBhbmVsIGNvbnRlbnQgaXMgZG9uZSBmYWRpbmcgaW4sIHRoZSBfcGFuZWxEb25lQW5pbWF0aW5nIHByb3BlcnR5IGlzXG4gICAqIHNldCBzbyB0aGUgcHJvcGVyIGNsYXNzIGNhbiBiZSBhZGRlZCB0byB0aGUgcGFuZWwuXG4gICAqL1xuICBfb25GYWRlSW5Eb25lKCk6IHZvaWQge1xuICAgIHRoaXMuX3BhbmVsRG9uZUFuaW1hdGluZyA9IHRoaXMucGFuZWxPcGVuO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIHRoZSB0b3VjaGVkIGNhbGxiYWNrIG9ubHkgaWYgdGhlIHBhbmVsIGlzIGNsb3NlZC4gT3RoZXJ3aXNlLCB0aGUgdHJpZ2dlciB3aWxsXG4gICAqIFwiYmx1clwiIHRvIHRoZSBwYW5lbCB3aGVuIGl0IG9wZW5zLCBjYXVzaW5nIGEgZmFsc2UgcG9zaXRpdmUuXG4gICAqL1xuICBfb25CbHVyKCkge1xuICAgIGlmICghdGhpcy5wYW5lbE9wZW4pIHtcbiAgICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayB0aGF0IGlzIGludm9rZWQgd2hlbiB0aGUgb3ZlcmxheSBwYW5lbCBoYXMgYmVlbiBhdHRhY2hlZC5cbiAgICovXG4gIF9vbkF0dGFjaGVkKCk6IHZvaWQge1xuICAgIHRoaXMuX2NhbGN1bGF0ZU92ZXJsYXlPZmZzZXRYKCk7XG4gICAgdGhpcy5fc2V0U2Nyb2xsVG9wKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2Nyb2xsIHBvc2l0aW9uIG9mIHRoZSBzY3JvbGwgY29udGFpbmVyLiBUaGlzIG11c3QgYmUgY2FsbGVkIGFmdGVyXG4gICAqIHRoZSBvdmVybGF5IHBhbmUgaXMgYXR0YWNoZWQgb3IgdGhlIHNjcm9sbCBjb250YWluZXIgZWxlbWVudCB3aWxsIG5vdCB5ZXQgYmVcbiAgICogcHJlc2VudCBpbiB0aGUgRE9NLlxuICAgKi9cbiAgcHJpdmF0ZSBfc2V0U2Nyb2xsVG9wKCk6IHZvaWQge1xuICAgIGNvbnN0IHNjcm9sbENvbnRhaW5lciA9XG4gICAgICB0aGlzLm92ZXJsYXlEaXIub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWQyLXNlbGVjdC1wYW5lbCcpO1xuICAgIHNjcm9sbENvbnRhaW5lci5zY3JvbGxUb3AgPSB0aGlzLl9zY3JvbGxUb3A7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2VsZWN0ZWQgb3B0aW9uIGJhc2VkIG9uIGEgdmFsdWUuIElmIG5vIG9wdGlvbiBjYW4gYmVcbiAgICogZm91bmQgd2l0aCB0aGUgZGVzaWduYXRlZCB2YWx1ZSwgdGhlIHNlbGVjdCB0cmlnZ2VyIGlzIGNsZWFyZWQuXG4gICAqL1xuICBwcml2YXRlIF9zZXRTZWxlY3Rpb25CeVZhbHVlKHZhbHVlOiBhbnkgfCBhbnlbXSk6IHZvaWQge1xuICAgIGNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KHZhbHVlKTtcblxuICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHZhbHVlICYmICFpc0FycmF5KSB7XG4gICAgICB0aHJvdyBnZXRNZFNlbGVjdE5vbkFycmF5VmFsdWVFcnJvcigpO1xuICAgIH1cblxuICAgIHRoaXMuX2NsZWFyU2VsZWN0aW9uKCk7XG5cbiAgICBpZiAoaXNBcnJheSkge1xuICAgICAgdmFsdWUuZm9yRWFjaCgoY3VycmVudFZhbHVlOiBhbnkpID0+IHRoaXMuX3NlbGVjdFZhbHVlKGN1cnJlbnRWYWx1ZSkpO1xuICAgICAgdGhpcy5fc29ydFZhbHVlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZWxlY3RWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fc2V0VmFsdWVXaWR0aCgpO1xuXG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGVsLmlzRW1wdHkoKSkge1xuICAgICAgdGhpcy5fcGxhY2Vob2xkZXJTdGF0ZSA9ICcnO1xuICAgIH1cblxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIGFuZCBzZWxlY3RzIGFuZCBvcHRpb24gYmFzZWQgb24gaXRzIHZhbHVlLlxuICAgKiBAcmV0dXJucyBPcHRpb24gdGhhdCBoYXMgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUuXG4gICAqL1xuICBwcml2YXRlIF9zZWxlY3RWYWx1ZSh2YWx1ZTogYW55KTogTWQyT3B0aW9uIHtcbiAgICBsZXQgb3B0aW9uc0FycmF5ID0gdGhpcy5vcHRpb25zLnRvQXJyYXkoKTtcbiAgICBsZXQgY29ycmVzcG9uZGluZ09wdGlvbiA9IG9wdGlvbnNBcnJheS5maW5kKG9wdGlvbiA9PiBvcHRpb24udmFsdWUgIT0gbnVsbFxuICAgICAgJiYgb3B0aW9uLnZhbHVlICE9IHVuZGVmaW5lZCAmJiB0aGlzLmVxdWFscyhvcHRpb24udmFsdWUsIHZhbHVlKSk7XG5cbiAgICBpZiAoY29ycmVzcG9uZGluZ09wdGlvbikge1xuICAgICAgY29ycmVzcG9uZGluZ09wdGlvbi5zZWxlY3QoKTtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdChjb3JyZXNwb25kaW5nT3B0aW9uKTtcbiAgICAgIHRoaXMuX2tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShvcHRpb25zQXJyYXkuaW5kZXhPZihjb3JyZXNwb25kaW5nT3B0aW9uKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvcnJlc3BvbmRpbmdPcHRpb247XG4gIH1cblxuICAvKipcbiAgICogQ29tcGFyZSB0d28gdmFycyBvciBvYmplY3RzXG4gICAqIEBwYXJhbSBvMSBjb21wYXJlIGZpcnN0IG9iamVjdFxuICAgKiBAcGFyYW0gbzIgY29tcGFyZSBzZWNvbmQgb2JqZWN0XG4gICAqIEByZXR1cm4gYm9vbGVhbiBjb21wYXJhdGlvbiByZXN1bHRcbiAgICovXG4gIHByaXZhdGUgZXF1YWxzKG8xOiBhbnksIG8yOiBhbnkpIHtcbiAgICBpZiAobzEgPT09IG8yKSB7IHJldHVybiB0cnVlOyB9XG4gICAgaWYgKG8xID09PSBudWxsIHx8IG8yID09PSBudWxsKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmIChvMSAhPT0gbzEgJiYgbzIgIT09IG8yKSB7IHJldHVybiB0cnVlOyB9XG4gICAgbGV0IHQxID0gdHlwZW9mIG8xLCB0MiA9IHR5cGVvZiBvMiwga2V5OiBhbnksIGtleVNldDogYW55O1xuICAgIGlmICh0MSA9PT0gdDIgJiYgdDEgPT09ICdvYmplY3QnKSB7XG4gICAgICBrZXlTZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgZm9yIChrZXkgaW4gbzEpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVxdWFscyhvMVtrZXldLCBvMltrZXldKSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAga2V5U2V0W2tleV0gPSB0cnVlO1xuICAgICAgfVxuICAgICAgZm9yIChrZXkgaW4gbzIpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIGtleVNldCkgJiYga2V5LmNoYXJBdCgwKSAhPT0gJyQnICYmIG8yW2tleV0pIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgc2VsZWN0IHRyaWdnZXIgYW5kIGRlc2VsZWN0cyBldmVyeSBvcHRpb24gaW4gdGhlIGxpc3QuXG4gICAqIEBwYXJhbSBza2lwIE9wdGlvbiB0aGF0IHNob3VsZCBub3QgYmUgZGVzZWxlY3RlZC5cbiAgICovXG4gIHByaXZhdGUgX2NsZWFyU2VsZWN0aW9uKHNraXA/OiBNZDJPcHRpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICBpZiAob3B0aW9uICE9PSBza2lwKSB7XG4gICAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0VHJpZ2dlclJlY3QoKTogQ2xpZW50UmVjdCB7XG4gICAgcmV0dXJuIHRoaXMudHJpZ2dlci5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9XG5cbiAgLyoqIFNldHMgdXAgYSBrZXkgbWFuYWdlciB0byBsaXN0ZW4gdG8ga2V5Ym9hcmQgZXZlbnRzIG9uIHRoZSBvdmVybGF5IHBhbmVsLiAqL1xuICBwcml2YXRlIF9pbml0S2V5TWFuYWdlcigpIHtcbiAgICB0aGlzLl9rZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuX3RhYlN1YnNjcmlwdGlvbiA9IHRoaXMuX2tleU1hbmFnZXIudGFiT3V0LnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xuICB9XG5cbiAgLyoqIERyb3BzIGN1cnJlbnQgb3B0aW9uIHN1YnNjcmlwdGlvbnMgYW5kIElEcyBhbmQgcmVzZXRzIGZyb20gc2NyYXRjaC4gKi9cbiAgcHJpdmF0ZSBfcmVzZXRPcHRpb25zKCk6IHZvaWQge1xuICAgIHRoaXMuX2Ryb3BTdWJzY3JpcHRpb25zKCk7XG4gICAgdGhpcy5fbGlzdGVuVG9PcHRpb25zKCk7XG4gICAgdGhpcy5fc2V0T3B0aW9uSWRzKCk7XG4gICAgdGhpcy5fc2V0T3B0aW9uTXVsdGlwbGUoKTtcbiAgfVxuXG4gIC8qKiBMaXN0ZW5zIHRvIHVzZXItZ2VuZXJhdGVkIHNlbGVjdGlvbiBldmVudHMgb24gZWFjaCBvcHRpb24uICovXG4gIHByaXZhdGUgX2xpc3RlblRvT3B0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLl9vcHRpb25TdWJzY3JpcHRpb24gPSB0aGlzLm9wdGlvblNlbGVjdGlvbkNoYW5nZXNcbiAgICAgIC5waXBlKGZpbHRlcihldmVudCA9PiBldmVudC5pc1VzZXJJbnB1dCkpXG4gICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5fb25TZWxlY3QoZXZlbnQuc291cmNlKTtcbiAgICAgICAgdGhpcy5fc2V0VmFsdWVXaWR0aCgpO1xuXG4gICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvKiogSW52b2tlZCB3aGVuIGFuIG9wdGlvbiBpcyBjbGlja2VkLiAqL1xuICBwcml2YXRlIF9vblNlbGVjdChvcHRpb246IE1kMk9wdGlvbik6IHZvaWQge1xuICAgIGNvbnN0IHdhc1NlbGVjdGVkID0gdGhpcy5fc2VsZWN0aW9uTW9kZWwuaXNTZWxlY3RlZChvcHRpb24pO1xuXG4gICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnRvZ2dsZShvcHRpb24pO1xuICAgICAgd2FzU2VsZWN0ZWQgPyBvcHRpb24uZGVzZWxlY3QoKSA6IG9wdGlvbi5zZWxlY3QoKTtcbiAgICAgIHRoaXMuX3NvcnRWYWx1ZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY2xlYXJTZWxlY3Rpb24ob3B0aW9uLnZhbHVlID09IG51bGwgPyBudWxsIDogb3B0aW9uKTtcblxuICAgICAgaWYgKG9wdGlvbi52YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3Byb3BhZ2F0ZUNoYW5nZXMob3B0aW9uLnZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdChvcHRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh3YXNTZWxlY3RlZCAhPT0gdGhpcy5fc2VsZWN0aW9uTW9kZWwuaXNTZWxlY3RlZChvcHRpb24pKSB7XG4gICAgICB0aGlzLl9wcm9wYWdhdGVDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNvcnRzIHRoZSBtb2RlbCB2YWx1ZXMsIGVuc3VyaW5nIHRoYXQgdGhleSBrZWVwIHRoZSBzYW1lXG4gICAqIG9yZGVyIHRoYXQgdGhleSBoYXZlIGluIHRoZSBwYW5lbC5cbiAgICovXG4gIHByaXZhdGUgX3NvcnRWYWx1ZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX211bHRpcGxlKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuXG4gICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0KG9wdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBVbnN1YnNjcmliZXMgZnJvbSBhbGwgb3B0aW9uIHN1YnNjcmlwdGlvbnMuICovXG4gIHByaXZhdGUgX2Ryb3BTdWJzY3JpcHRpb25zKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vcHRpb25TdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX29wdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fb3B0aW9uU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKiogRW1pdHMgY2hhbmdlIGV2ZW50IHRvIHNldCB0aGUgbW9kZWwgdmFsdWUuICovXG4gIHByaXZhdGUgX3Byb3BhZ2F0ZUNoYW5nZXMoZmFsbGJhY2tWYWx1ZT86IGFueSk6IHZvaWQge1xuICAgIGxldCB2YWx1ZVRvRW1pdCA9IG51bGw7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnNlbGVjdGVkKSkge1xuICAgICAgdmFsdWVUb0VtaXQgPSB0aGlzLnNlbGVjdGVkLm1hcChvcHRpb24gPT4gb3B0aW9uLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWVUb0VtaXQgPSB0aGlzLnNlbGVjdGVkID8gdGhpcy5zZWxlY3RlZC52YWx1ZSA6IGZhbGxiYWNrVmFsdWU7XG4gICAgfVxuXG4gICAgdGhpcy5fb25DaGFuZ2UodmFsdWVUb0VtaXQpO1xuICAgIHRoaXMuY2hhbmdlLmVtaXQobmV3IE1kMlNlbGVjdENoYW5nZSh0aGlzLCB2YWx1ZVRvRW1pdCkpO1xuICB9XG5cbiAgLyoqIFJlY29yZHMgb3B0aW9uIElEcyB0byBwYXNzIHRvIHRoZSBhcmlhLW93bnMgcHJvcGVydHkuICovXG4gIHByaXZhdGUgX3NldE9wdGlvbklkcygpIHtcbiAgICB0aGlzLl9vcHRpb25JZHMgPSB0aGlzLm9wdGlvbnMubWFwKG9wdGlvbiA9PiBvcHRpb24uaWQpLmpvaW4oJyAnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBgbXVsdGlwbGVgIHByb3BlcnR5IG9uIGVhY2ggb3B0aW9uLiBUaGUgcHJvbWlzZSBpcyBuZWNlc3NhcnlcbiAgICogaW4gb3JkZXIgdG8gYXZvaWQgQW5ndWxhciBlcnJvcnMgd2hlbiBtb2RpZnlpbmcgdGhlIHByb3BlcnR5IGFmdGVyIGluaXQuXG4gICAqL1xuICBwcml2YXRlIF9zZXRPcHRpb25NdWx0aXBsZSgpIHtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4gb3B0aW9uLm11bHRpcGxlID0gdGhpcy5tdWx0aXBsZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTXVzdCBzZXQgdGhlIHdpZHRoIG9mIHRoZSBzZWxlY3RlZCBvcHRpb24ncyB2YWx1ZSBwcm9ncmFtbWF0aWNhbGx5XG4gICAqIGJlY2F1c2UgaXQgaXMgYWJzb2x1dGVseSBwb3NpdGlvbmVkIGFuZCBvdGhlcndpc2Ugd2lsbCBub3QgY2xpcFxuICAgKiBvdmVyZmxvdy4gVGhlIHNlbGVjdGlvbiBhcnJvdyBpcyA5cHggd2lkZSwgYWRkIDRweCBvZiBwYWRkaW5nID0gMTNcbiAgICovXG4gIHByaXZhdGUgX3NldFZhbHVlV2lkdGgoKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWRWYWx1ZVdpZHRoID0gdGhpcy5fdHJpZ2dlcldpZHRoIC0gMTM7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyB0aGUgc2VsZWN0ZWQgaXRlbS4gSWYgbm8gb3B0aW9uIGlzIHNlbGVjdGVkLCBpdCB3aWxsIGZvY3VzXG4gICAqIHRoZSBmaXJzdCBpdGVtIGluc3RlYWQuXG4gICAqL1xuICBwcml2YXRlIF9mb2N1c0NvcnJlY3RPcHRpb24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGVsLmlzRW1wdHkoKSkge1xuICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKHRoaXMuX2dldE9wdGlvbkluZGV4KHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIGhvc3QgZWxlbWVudCB3aGVuIHRoZSBwYW5lbCBjbG9zZXMuICovXG4gIHByaXZhdGUgX2ZvY3VzSG9zdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBpbmRleCBvZiB0aGUgcHJvdmlkZWQgb3B0aW9uIGluIHRoZSBvcHRpb24gbGlzdC4gKi9cbiAgcHJpdmF0ZSBfZ2V0T3B0aW9uSW5kZXgob3B0aW9uOiBNZDJPcHRpb24pOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmVkdWNlKChyZXN1bHQ6IG51bWJlciwgY3VycmVudDogTWQyT3B0aW9uLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICByZXR1cm4gcmVzdWx0ID09PSB1bmRlZmluZWQgPyAob3B0aW9uID09PSBjdXJyZW50ID8gaW5kZXggOiB1bmRlZmluZWQpIDogcmVzdWx0O1xuICAgIH0sIHVuZGVmaW5lZCk7XG4gIH1cblxuICAvKiogQ2FsY3VsYXRlcyB0aGUgc2Nyb2xsIHBvc2l0aW9uIGFuZCB4LSBhbmQgeS1vZmZzZXRzIG9mIHRoZSBvdmVybGF5IHBhbmVsLiAqL1xuICBwcml2YXRlIF9jYWxjdWxhdGVPdmVybGF5UG9zaXRpb24oKTogdm9pZCB7XG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLl9nZXRJdGVtQ291bnQoKTtcbiAgICBjb25zdCBwYW5lbEhlaWdodCA9IE1hdGgubWluKGl0ZW1zICogU0VMRUNUX0lURU1fSEVJR0hULCBTRUxFQ1RfUEFORUxfTUFYX0hFSUdIVCk7XG4gICAgY29uc3Qgc2Nyb2xsQ29udGFpbmVySGVpZ2h0ID0gaXRlbXMgKiBTRUxFQ1RfSVRFTV9IRUlHSFQ7XG5cbiAgICAvLyBUaGUgZmFydGhlc3QgdGhlIHBhbmVsIGNhbiBiZSBzY3JvbGxlZCBiZWZvcmUgaXQgaGl0cyB0aGUgYm90dG9tXG4gICAgY29uc3QgbWF4U2Nyb2xsID0gc2Nyb2xsQ29udGFpbmVySGVpZ2h0IC0gcGFuZWxIZWlnaHQ7XG5cbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZWwuaGFzVmFsdWUoKSkge1xuICAgICAgbGV0IHNlbGVjdGVkSW5kZXggPSB0aGlzLl9nZXRPcHRpb25JbmRleCh0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXSk7XG5cbiAgICAgIHNlbGVjdGVkSW5kZXggKz0gdGhpcy5fZ2V0TGFiZWxDb3VudEJlZm9yZU9wdGlvbihzZWxlY3RlZEluZGV4KTtcblxuICAgICAgLy8gV2UgbXVzdCBtYWludGFpbiBhIHNjcm9sbCBidWZmZXIgc28gdGhlIHNlbGVjdGVkIG9wdGlvbiB3aWxsIGJlIHNjcm9sbGVkIHRvIHRoZVxuICAgICAgLy8gY2VudGVyIG9mIHRoZSBvdmVybGF5IHBhbmVsIHJhdGhlciB0aGFuIHRoZSB0b3AuXG4gICAgICBjb25zdCBzY3JvbGxCdWZmZXIgPSBwYW5lbEhlaWdodCAvIDI7XG4gICAgICB0aGlzLl9zY3JvbGxUb3AgPSB0aGlzLl9jYWxjdWxhdGVPdmVybGF5U2Nyb2xsKHNlbGVjdGVkSW5kZXgsIHNjcm9sbEJ1ZmZlciwgbWF4U2Nyb2xsKTtcbiAgICAgIHRoaXMuX29mZnNldFkgPSB0aGlzLl9jYWxjdWxhdGVPdmVybGF5T2Zmc2V0WShzZWxlY3RlZEluZGV4LCBzY3JvbGxCdWZmZXIsIG1heFNjcm9sbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIG5vIG9wdGlvbiBpcyBzZWxlY3RlZCwgdGhlIHBhbmVsIGNlbnRlcnMgb24gdGhlIGZpcnN0IG9wdGlvbi4gSW4gdGhpcyBjYXNlLFxuICAgICAgLy8gd2UgbXVzdCBvbmx5IGFkanVzdCBmb3IgdGhlIGhlaWdodCBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIG9wdGlvbiBlbGVtZW50XG4gICAgICAvLyBhbmQgdGhlIHRyaWdnZXIgZWxlbWVudCwgdGhlbiBtdWx0aXBseSBpdCBieSAtMSB0byBlbnN1cmUgdGhlIHBhbmVsIG1vdmVzXG4gICAgICAvLyBpbiB0aGUgY29ycmVjdCBkaXJlY3Rpb24gdXAgdGhlIHBhZ2UuXG4gICAgICB0aGlzLl9vZmZzZXRZID0gKFNFTEVDVF9JVEVNX0hFSUdIVCAtIFNFTEVDVF9UUklHR0VSX0hFSUdIVCkgLyAyICogLTE7XG4gICAgfVxuXG4gICAgdGhpcy5fY2hlY2tPdmVybGF5V2l0aGluVmlld3BvcnQobWF4U2Nyb2xsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBzY3JvbGwgcG9zaXRpb24gb2YgdGhlIHNlbGVjdCdzIG92ZXJsYXkgcGFuZWwuXG4gICAqXG4gICAqIEF0dGVtcHRzIHRvIGNlbnRlciB0aGUgc2VsZWN0ZWQgb3B0aW9uIGluIHRoZSBwYW5lbC4gSWYgdGhlIG9wdGlvbiBpc1xuICAgKiB0b28gaGlnaCBvciB0b28gbG93IGluIHRoZSBwYW5lbCB0byBiZSBzY3JvbGxlZCB0byB0aGUgY2VudGVyLCBpdCBjbGFtcHMgdGhlXG4gICAqIHNjcm9sbCBwb3NpdGlvbiB0byB0aGUgbWluIG9yIG1heCBzY3JvbGwgcG9zaXRpb25zIHJlc3BlY3RpdmVseS5cbiAgICovXG4gIF9jYWxjdWxhdGVPdmVybGF5U2Nyb2xsKHNlbGVjdGVkSW5kZXg6IG51bWJlciwgc2Nyb2xsQnVmZmVyOiBudW1iZXIsXG4gICAgbWF4U2Nyb2xsOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IG9wdGlvbk9mZnNldEZyb21TY3JvbGxUb3AgPSBTRUxFQ1RfSVRFTV9IRUlHSFQgKiBzZWxlY3RlZEluZGV4O1xuICAgIGNvbnN0IGhhbGZPcHRpb25IZWlnaHQgPSBTRUxFQ1RfSVRFTV9IRUlHSFQgLyAyO1xuXG4gICAgLy8gU3RhcnRzIGF0IHRoZSBvcHRpb25PZmZzZXRGcm9tU2Nyb2xsVG9wLCB3aGljaCBzY3JvbGxzIHRoZSBvcHRpb24gdG8gdGhlIHRvcCBvZiB0aGVcbiAgICAvLyBzY3JvbGwgY29udGFpbmVyLCB0aGVuIHN1YnRyYWN0cyB0aGUgc2Nyb2xsIGJ1ZmZlciB0byBzY3JvbGwgdGhlIG9wdGlvbiBkb3duIHRvXG4gICAgLy8gdGhlIGNlbnRlciBvZiB0aGUgb3ZlcmxheSBwYW5lbC4gSGFsZiB0aGUgb3B0aW9uIGhlaWdodCBtdXN0IGJlIHJlLWFkZGVkIHRvIHRoZVxuICAgIC8vIHNjcm9sbFRvcCBzbyB0aGUgb3B0aW9uIGlzIGNlbnRlcmVkIGJhc2VkIG9uIGl0cyBtaWRkbGUsIG5vdCBpdHMgdG9wIGVkZ2UuXG4gICAgY29uc3Qgb3B0aW1hbFNjcm9sbFBvc2l0aW9uID0gb3B0aW9uT2Zmc2V0RnJvbVNjcm9sbFRvcCAtIHNjcm9sbEJ1ZmZlciArIGhhbGZPcHRpb25IZWlnaHQ7XG4gICAgcmV0dXJuIGNsYW1wVmFsdWUoMCwgb3B0aW1hbFNjcm9sbFBvc2l0aW9uLCBtYXhTY3JvbGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpZ3VyZXMgb3V0IHRoZSBhcHByb3ByaWF0ZSBhbmltYXRpb24gc3RhdGUgZm9yIHRoZSBwbGFjZWhvbGRlci5cbiAgICovXG4gIF9nZXRQbGFjZWhvbGRlckFuaW1hdGlvblN0YXRlKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuZmxvYXRQbGFjZWhvbGRlciA9PT0gJ25ldmVyJykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZsb2F0UGxhY2Vob2xkZXIgPT09ICdhbHdheXMnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZmxvYXRQbGFjZWhvbGRlclN0YXRlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVyU3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB0aGUgQ1NTIGBvcGFjaXR5YCBvZiB0aGUgcGxhY2Vob2xkZXIgZWxlbWVudC5cbiAgICovXG4gIF9nZXRQbGFjZWhvbGRlck9wYWNpdHkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMuZmxvYXRQbGFjZWhvbGRlciAhPT0gJ25ldmVyJyB8fCB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5pc0VtcHR5KCkpID9cbiAgICAgICcxJyA6ICcwJztcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRoZSBhcmlhLWxhYmVsIG9mIHRoZSBzZWxlY3QgY29tcG9uZW50LiAqL1xuICBnZXQgX2FyaWFMYWJlbCgpOiBzdHJpbmcge1xuICAgIC8vIElmIGFuIGFyaWFMYWJlbGxlZGJ5IHZhbHVlIGhhcyBiZWVuIHNldCwgdGhlIHNlbGVjdCBzaG91bGQgbm90IG92ZXJ3cml0ZSB0aGVcbiAgICAvLyBgYXJpYS1sYWJlbGxlZGJ5YCB2YWx1ZSBieSBzZXR0aW5nIHRoZSBhcmlhTGFiZWwgdG8gdGhlIHBsYWNlaG9sZGVyLlxuICAgIHJldHVybiB0aGlzLmFyaWFMYWJlbGxlZGJ5ID8gbnVsbCA6IHRoaXMuYXJpYUxhYmVsIHx8IHRoaXMucGxhY2Vob2xkZXI7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgeC1vZmZzZXQgb2YgdGhlIG92ZXJsYXkgcGFuZWwgaW4gcmVsYXRpb24gdG8gdGhlIHRyaWdnZXIncyB0b3Agc3RhcnQgY29ybmVyLlxuICAgKiBUaGlzIG11c3QgYmUgYWRqdXN0ZWQgdG8gYWxpZ24gdGhlIHNlbGVjdGVkIG9wdGlvbiB0ZXh0IG92ZXIgdGhlIHRyaWdnZXIgdGV4dCB3aGVuXG4gICAqIHRoZSBwYW5lbCBvcGVucy4gV2lsbCBjaGFuZ2UgYmFzZWQgb24gTFRSIG9yIFJUTCB0ZXh0IGRpcmVjdGlvbi4gTm90ZSB0aGF0IHRoZSBvZmZzZXRcbiAgICogY2FuJ3QgYmUgY2FsY3VsYXRlZCB1bnRpbCB0aGUgcGFuZWwgaGFzIGJlZW4gYXR0YWNoZWQsIGJlY2F1c2Ugd2UgbmVlZCB0byBrbm93IHRoZVxuICAgKiBjb250ZW50IHdpZHRoIGluIG9yZGVyIHRvIGNvbnN0cmFpbiB0aGUgcGFuZWwgd2l0aGluIHRoZSB2aWV3cG9ydC5cbiAgICovXG4gIHByaXZhdGUgX2NhbGN1bGF0ZU92ZXJsYXlPZmZzZXRYKCk6IHZvaWQge1xuICAgIGNvbnN0IG92ZXJsYXlSZWN0ID0gdGhpcy5vdmVybGF5RGlyLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgdmlld3BvcnRSZWN0ID0gdGhpcy5fdmlld3BvcnRSdWxlci5nZXRWaWV3cG9ydFJlY3QoKTtcbiAgICBjb25zdCBpc1J0bCA9IHRoaXMuX2lzUnRsKCk7XG4gICAgbGV0IG9mZnNldFg6IG51bWJlcjtcblxuICAgIC8vIEFkanVzdCB0aGUgb2Zmc2V0LCBkZXBlbmRpbmcgb24gdGhlIG9wdGlvbiBwYWRkaW5nLlxuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICBvZmZzZXRYID0gU0VMRUNUX01VTFRJUExFX1BBTkVMX1BBRERJTkdfWDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF07XG4gICAgICBvZmZzZXRYID0gc2VsZWN0ZWQgJiYgc2VsZWN0ZWQuZ3JvdXAgPyBTRUxFQ1RfUEFORUxfSU5ERU5UX1BBRERJTkdfWCA6IFNFTEVDVF9QQU5FTF9QQURESU5HX1g7XG4gICAgfVxuXG4gICAgLy8gSW52ZXJ0IHRoZSBvZmZzZXQgaW4gTFRSLlxuICAgIGlmICghaXNSdGwpIHtcbiAgICAgIG9mZnNldFggKj0gLTE7XG4gICAgfVxuXG4gICAgLy8gRGV0ZXJtaW5lIGhvdyBtdWNoIHRoZSBzZWxlY3Qgb3ZlcmZsb3dzIG9uIGVhY2ggc2lkZS5cbiAgICBjb25zdCBsZWZ0T3ZlcmZsb3cgPSAwIC0gKG92ZXJsYXlSZWN0LmxlZnQgKyBvZmZzZXRYXG4gICAgICAtIChpc1J0bCA/IFNFTEVDVF9QQU5FTF9QQURESU5HX1ggKiAyIDogMCkpO1xuICAgIGNvbnN0IHJpZ2h0T3ZlcmZsb3cgPSBvdmVybGF5UmVjdC5yaWdodCArIG9mZnNldFggLSB2aWV3cG9ydFJlY3Qud2lkdGhcbiAgICAgICsgKGlzUnRsID8gMCA6IFNFTEVDVF9QQU5FTF9QQURESU5HX1ggKiAyKTtcblxuICAgIC8vIElmIHRoZSBlbGVtZW50IG92ZXJmbG93cyBvbiBlaXRoZXIgc2lkZSwgcmVkdWNlIHRoZSBvZmZzZXQgdG8gYWxsb3cgaXQgdG8gZml0LlxuICAgIGlmIChsZWZ0T3ZlcmZsb3cgPiAwKSB7XG4gICAgICBvZmZzZXRYICs9IGxlZnRPdmVyZmxvdyArIFNFTEVDVF9QQU5FTF9WSUVXUE9SVF9QQURESU5HO1xuICAgIH0gZWxzZSBpZiAocmlnaHRPdmVyZmxvdyA+IDApIHtcbiAgICAgIG9mZnNldFggLT0gcmlnaHRPdmVyZmxvdyArIFNFTEVDVF9QQU5FTF9WSUVXUE9SVF9QQURESU5HO1xuICAgIH1cblxuICAgIC8vIFNldCB0aGUgb2Zmc2V0IGRpcmVjdGx5IGluIG9yZGVyIHRvIGF2b2lkIGhhdmluZyB0byBnbyB0aHJvdWdoIGNoYW5nZSBkZXRlY3Rpb24gYW5kXG4gICAgLy8gcG90ZW50aWFsbHkgdHJpZ2dlcmluZyBcImNoYW5nZWQgYWZ0ZXIgaXQgd2FzIGNoZWNrZWRcIiBlcnJvcnMuXG4gICAgdGhpcy5vdmVybGF5RGlyLm9mZnNldFggPSBvZmZzZXRYO1xuICAgIHRoaXMub3ZlcmxheURpci5vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgeS1vZmZzZXQgb2YgdGhlIHNlbGVjdCdzIG92ZXJsYXkgcGFuZWwgaW4gcmVsYXRpb24gdG8gdGhlXG4gICAqIHRvcCBzdGFydCBjb3JuZXIgb2YgdGhlIHRyaWdnZXIuIEl0IGhhcyB0byBiZSBhZGp1c3RlZCBpbiBvcmRlciBmb3IgdGhlXG4gICAqIHNlbGVjdGVkIG9wdGlvbiB0byBiZSBhbGlnbmVkIG92ZXIgdGhlIHRyaWdnZXIgd2hlbiB0aGUgcGFuZWwgb3BlbnMuXG4gICAqL1xuICBwcml2YXRlIF9jYWxjdWxhdGVPdmVybGF5T2Zmc2V0WShzZWxlY3RlZEluZGV4OiBudW1iZXIsIHNjcm9sbEJ1ZmZlcjogbnVtYmVyLFxuICAgIG1heFNjcm9sbDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBsZXQgb3B0aW9uT2Zmc2V0RnJvbVBhbmVsVG9wOiBudW1iZXI7XG5cbiAgICBpZiAodGhpcy5fc2Nyb2xsVG9wID09PSAwKSB7XG4gICAgICBvcHRpb25PZmZzZXRGcm9tUGFuZWxUb3AgPSBzZWxlY3RlZEluZGV4ICogU0VMRUNUX0lURU1fSEVJR0hUO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2Nyb2xsVG9wID09PSBtYXhTY3JvbGwpIHtcbiAgICAgIGNvbnN0IGZpcnN0RGlzcGxheWVkSW5kZXggPSB0aGlzLl9nZXRJdGVtQ291bnQoKSAtIFNFTEVDVF9NQVhfT1BUSU9OU19ESVNQTEFZRUQ7XG4gICAgICBjb25zdCBzZWxlY3RlZERpc3BsYXlJbmRleCA9IHNlbGVjdGVkSW5kZXggLSBmaXJzdERpc3BsYXllZEluZGV4O1xuXG4gICAgICAvLyBCZWNhdXNlIHRoZSBwYW5lbCBoZWlnaHQgaXMgbG9uZ2VyIHRoYW4gdGhlIGhlaWdodCBvZiB0aGUgb3B0aW9ucyBhbG9uZSxcbiAgICAgIC8vIHRoZXJlIGlzIGFsd2F5cyBleHRyYSBwYWRkaW5nIGF0IHRoZSB0b3Agb3IgYm90dG9tIG9mIHRoZSBwYW5lbC4gV2hlblxuICAgICAgLy8gc2Nyb2xsZWQgdG8gdGhlIHZlcnkgYm90dG9tLCB0aGlzIHBhZGRpbmcgaXMgYXQgdGhlIHRvcCBvZiB0aGUgcGFuZWwgYW5kXG4gICAgICAvLyBtdXN0IGJlIGFkZGVkIHRvIHRoZSBvZmZzZXQuXG4gICAgICBvcHRpb25PZmZzZXRGcm9tUGFuZWxUb3AgPVxuICAgICAgICBzZWxlY3RlZERpc3BsYXlJbmRleCAqIFNFTEVDVF9JVEVNX0hFSUdIVCArIFNFTEVDVF9QQU5FTF9QQURESU5HX1k7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHRoZSBvcHRpb24gd2FzIHNjcm9sbGVkIHRvIHRoZSBtaWRkbGUgb2YgdGhlIHBhbmVsIHVzaW5nIGEgc2Nyb2xsIGJ1ZmZlcixcbiAgICAgIC8vIGl0cyBvZmZzZXQgd2lsbCBiZSB0aGUgc2Nyb2xsIGJ1ZmZlciBtaW51cyB0aGUgaGFsZiBoZWlnaHQgdGhhdCB3YXMgYWRkZWQgdG9cbiAgICAgIC8vIGNlbnRlciBpdC5cbiAgICAgIG9wdGlvbk9mZnNldEZyb21QYW5lbFRvcCA9IHNjcm9sbEJ1ZmZlciAtIFNFTEVDVF9JVEVNX0hFSUdIVCAvIDI7XG4gICAgfVxuXG4gICAgLy8gVGhlIGZpbmFsIG9mZnNldCBpcyB0aGUgb3B0aW9uJ3Mgb2Zmc2V0IGZyb20gdGhlIHRvcCwgYWRqdXN0ZWQgZm9yIHRoZSBoZWlnaHRcbiAgICAvLyBkaWZmZXJlbmNlLCBtdWx0aXBsaWVkIGJ5IC0xIHRvIGVuc3VyZSB0aGF0IHRoZSBvdmVybGF5IG1vdmVzIGluIHRoZSBjb3JyZWN0XG4gICAgLy8gZGlyZWN0aW9uIHVwIHRoZSBwYWdlLlxuICAgIHJldHVybiBvcHRpb25PZmZzZXRGcm9tUGFuZWxUb3AgKiAtMSAtIFNFTEVDVF9JVEVNX0hFSUdIVF9BREpVU1RNRU5UO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0aGF0IHRoZSBhdHRlbXB0ZWQgb3ZlcmxheSBwb3NpdGlvbiB3aWxsIGZpdCB3aXRoaW4gdGhlIHZpZXdwb3J0LlxuICAgKiBJZiBpdCB3aWxsIG5vdCBmaXQsIHRyaWVzIHRvIGFkanVzdCB0aGUgc2Nyb2xsIHBvc2l0aW9uIGFuZCB0aGUgYXNzb2NpYXRlZFxuICAgKiB5LW9mZnNldCBzbyB0aGUgcGFuZWwgY2FuIG9wZW4gZnVsbHkgb24tc2NyZWVuLiBJZiBpdCBzdGlsbCB3b24ndCBmaXQsXG4gICAqIHNldHMgdGhlIG9mZnNldCBiYWNrIHRvIDAgdG8gYWxsb3cgdGhlIGZhbGxiYWNrIHBvc2l0aW9uIHRvIHRha2Ugb3Zlci5cbiAgICovXG4gIHByaXZhdGUgX2NoZWNrT3ZlcmxheVdpdGhpblZpZXdwb3J0KG1heFNjcm9sbDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3Qgdmlld3BvcnRSZWN0ID0gdGhpcy5fdmlld3BvcnRSdWxlci5nZXRWaWV3cG9ydFJlY3QoKTtcbiAgICBjb25zdCB0cmlnZ2VyUmVjdCA9IHRoaXMuX2dldFRyaWdnZXJSZWN0KCk7XG5cbiAgICBjb25zdCB0b3BTcGFjZUF2YWlsYWJsZSA9IHRyaWdnZXJSZWN0LnRvcCAtIFNFTEVDVF9QQU5FTF9WSUVXUE9SVF9QQURESU5HO1xuICAgIGNvbnN0IGJvdHRvbVNwYWNlQXZhaWxhYmxlID1cbiAgICAgIHZpZXdwb3J0UmVjdC5oZWlnaHQgLSB0cmlnZ2VyUmVjdC5ib3R0b20gLSBTRUxFQ1RfUEFORUxfVklFV1BPUlRfUEFERElORztcblxuICAgIGNvbnN0IHBhbmVsSGVpZ2h0VG9wID0gTWF0aC5hYnModGhpcy5fb2Zmc2V0WSk7XG4gICAgY29uc3QgdG90YWxQYW5lbEhlaWdodCA9XG4gICAgICBNYXRoLm1pbih0aGlzLl9nZXRJdGVtQ291bnQoKSAqIFNFTEVDVF9JVEVNX0hFSUdIVCwgU0VMRUNUX1BBTkVMX01BWF9IRUlHSFQpO1xuICAgIGNvbnN0IHBhbmVsSGVpZ2h0Qm90dG9tID0gdG90YWxQYW5lbEhlaWdodCAtIHBhbmVsSGVpZ2h0VG9wIC0gdHJpZ2dlclJlY3QuaGVpZ2h0O1xuXG4gICAgaWYgKHBhbmVsSGVpZ2h0Qm90dG9tID4gYm90dG9tU3BhY2VBdmFpbGFibGUpIHtcbiAgICAgIHRoaXMuX2FkanVzdFBhbmVsVXAocGFuZWxIZWlnaHRCb3R0b20sIGJvdHRvbVNwYWNlQXZhaWxhYmxlKTtcbiAgICB9IGVsc2UgaWYgKHBhbmVsSGVpZ2h0VG9wID4gdG9wU3BhY2VBdmFpbGFibGUpIHtcbiAgICAgIHRoaXMuX2FkanVzdFBhbmVsRG93bihwYW5lbEhlaWdodFRvcCwgdG9wU3BhY2VBdmFpbGFibGUsIG1heFNjcm9sbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3RyYW5zZm9ybU9yaWdpbiA9IHRoaXMuX2dldE9yaWdpbkJhc2VkT25PcHRpb24oKTtcbiAgICB9XG4gIH1cblxuICAvKiogQWRqdXN0cyB0aGUgb3ZlcmxheSBwYW5lbCB1cCB0byBmaXQgaW4gdGhlIHZpZXdwb3J0LiAqL1xuICBwcml2YXRlIF9hZGp1c3RQYW5lbFVwKHBhbmVsSGVpZ2h0Qm90dG9tOiBudW1iZXIsIGJvdHRvbVNwYWNlQXZhaWxhYmxlOiBudW1iZXIpIHtcbiAgICBjb25zdCBkaXN0YW5jZUJlbG93Vmlld3BvcnQgPSBwYW5lbEhlaWdodEJvdHRvbSAtIGJvdHRvbVNwYWNlQXZhaWxhYmxlO1xuXG4gICAgLy8gU2Nyb2xscyB0aGUgcGFuZWwgdXAgYnkgdGhlIGRpc3RhbmNlIGl0IHdhcyBleHRlbmRpbmcgcGFzdCB0aGUgYm91bmRhcnksIHRoZW5cbiAgICAvLyBhZGp1c3RzIHRoZSBvZmZzZXQgYnkgdGhhdCBhbW91bnQgdG8gbW92ZSB0aGUgcGFuZWwgdXAgaW50byB0aGUgdmlld3BvcnQuXG4gICAgdGhpcy5fc2Nyb2xsVG9wIC09IGRpc3RhbmNlQmVsb3dWaWV3cG9ydDtcbiAgICB0aGlzLl9vZmZzZXRZIC09IGRpc3RhbmNlQmVsb3dWaWV3cG9ydDtcbiAgICB0aGlzLl90cmFuc2Zvcm1PcmlnaW4gPSB0aGlzLl9nZXRPcmlnaW5CYXNlZE9uT3B0aW9uKCk7XG5cbiAgICAvLyBJZiB0aGUgcGFuZWwgaXMgc2Nyb2xsZWQgdG8gdGhlIHZlcnkgdG9wLCBpdCB3b24ndCBiZSBhYmxlIHRvIGZpdCB0aGUgcGFuZWxcbiAgICAvLyBieSBzY3JvbGxpbmcsIHNvIHNldCB0aGUgb2Zmc2V0IHRvIDAgdG8gYWxsb3cgdGhlIGZhbGxiYWNrIHBvc2l0aW9uIHRvIHRha2VcbiAgICAvLyBlZmZlY3QuXG4gICAgaWYgKHRoaXMuX3Njcm9sbFRvcCA8PSAwKSB7XG4gICAgICB0aGlzLl9zY3JvbGxUb3AgPSAwO1xuICAgICAgdGhpcy5fb2Zmc2V0WSA9IDA7XG4gICAgICB0aGlzLl90cmFuc2Zvcm1PcmlnaW4gPSBgNTAlIGJvdHRvbSAwcHhgO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBBZGp1c3RzIHRoZSBvdmVybGF5IHBhbmVsIGRvd24gdG8gZml0IGluIHRoZSB2aWV3cG9ydC4gKi9cbiAgcHJpdmF0ZSBfYWRqdXN0UGFuZWxEb3duKHBhbmVsSGVpZ2h0VG9wOiBudW1iZXIsIHRvcFNwYWNlQXZhaWxhYmxlOiBudW1iZXIsXG4gICAgbWF4U2Nyb2xsOiBudW1iZXIpIHtcbiAgICBjb25zdCBkaXN0YW5jZUFib3ZlVmlld3BvcnQgPSBwYW5lbEhlaWdodFRvcCAtIHRvcFNwYWNlQXZhaWxhYmxlO1xuXG4gICAgLy8gU2Nyb2xscyB0aGUgcGFuZWwgZG93biBieSB0aGUgZGlzdGFuY2UgaXQgd2FzIGV4dGVuZGluZyBwYXN0IHRoZSBib3VuZGFyeSwgdGhlblxuICAgIC8vIGFkanVzdHMgdGhlIG9mZnNldCBieSB0aGF0IGFtb3VudCB0byBtb3ZlIHRoZSBwYW5lbCBkb3duIGludG8gdGhlIHZpZXdwb3J0LlxuICAgIHRoaXMuX3Njcm9sbFRvcCArPSBkaXN0YW5jZUFib3ZlVmlld3BvcnQ7XG4gICAgdGhpcy5fb2Zmc2V0WSArPSBkaXN0YW5jZUFib3ZlVmlld3BvcnQ7XG4gICAgdGhpcy5fdHJhbnNmb3JtT3JpZ2luID0gdGhpcy5fZ2V0T3JpZ2luQmFzZWRPbk9wdGlvbigpO1xuXG4gICAgLy8gSWYgdGhlIHBhbmVsIGlzIHNjcm9sbGVkIHRvIHRoZSB2ZXJ5IGJvdHRvbSwgaXQgd29uJ3QgYmUgYWJsZSB0byBmaXQgdGhlXG4gICAgLy8gcGFuZWwgYnkgc2Nyb2xsaW5nLCBzbyBzZXQgdGhlIG9mZnNldCB0byAwIHRvIGFsbG93IHRoZSBmYWxsYmFjayBwb3NpdGlvblxuICAgIC8vIHRvIHRha2UgZWZmZWN0LlxuICAgIGlmICh0aGlzLl9zY3JvbGxUb3AgPj0gbWF4U2Nyb2xsKSB7XG4gICAgICB0aGlzLl9zY3JvbGxUb3AgPSBtYXhTY3JvbGw7XG4gICAgICB0aGlzLl9vZmZzZXRZID0gMDtcbiAgICAgIHRoaXMuX3RyYW5zZm9ybU9yaWdpbiA9IGA1MCUgdG9wIDBweGA7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgLyoqIFNldHMgdGhlIHRyYW5zZm9ybSBvcmlnaW4gcG9pbnQgYmFzZWQgb24gdGhlIHNlbGVjdGVkIG9wdGlvbi4gKi9cbiAgcHJpdmF0ZSBfZ2V0T3JpZ2luQmFzZWRPbk9wdGlvbigpOiBzdHJpbmcge1xuICAgIGNvbnN0IG9yaWdpblkgPVxuICAgICAgTWF0aC5hYnModGhpcy5fb2Zmc2V0WSkgLSBTRUxFQ1RfSVRFTV9IRUlHSFRfQURKVVNUTUVOVCArIFNFTEVDVF9JVEVNX0hFSUdIVCAvIDI7XG4gICAgcmV0dXJuIGA1MCUgJHtvcmlnaW5ZfXB4IDBweGA7XG4gIH1cblxuICAvKiogRmlndXJlcyBvdXQgdGhlIGZsb2F0aW5nIHBsYWNlaG9sZGVyIHN0YXRlIHZhbHVlLiAqL1xuICBwcml2YXRlIF9mbG9hdFBsYWNlaG9sZGVyU3RhdGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5faXNSdGwoKSA/ICdmbG9hdGluZy1ydGwnIDogJ2Zsb2F0aW5nLWx0cic7XG4gIH1cblxuICAvKiogSGFuZGxlcyB0aGUgdXNlciBwcmVzc2luZyB0aGUgYXJyb3cga2V5cyBvbiBhIGNsb3NlZCBzZWxlY3QuICAqL1xuICBwcml2YXRlIF9oYW5kbGVBcnJvd0tleShldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tdWx0aXBsZSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcmV2QWN0aXZlSXRlbSA9IHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbTtcblxuICAgICAgLy8gQ3ljbGUgdGhvdWdoIHRoZSBzZWxlY3Qgb3B0aW9ucyBldmVuIHdoZW4gdGhlIHNlbGVjdCBpcyBjbG9zZWQsXG4gICAgICAvLyBtYXRjaGluZyB0aGUgYmVoYXZpb3Igb2YgdGhlIG5hdGl2ZSBzZWxlY3QgZWxlbWVudC5cbiAgICAgIC8vIFRPRE8oY3Jpc2JldG8pOiBuYXRpdmUgc2VsZWN0cyBhbHNvIGN5Y2xlIHRocm91Z2ggdGhlIG9wdGlvbnMgd2l0aCBsZWZ0L3JpZ2h0IGFycm93cyxcbiAgICAgIC8vIGhvd2V2ZXIgdGhlIGtleSBtYW5hZ2VyIG9ubHkgc3VwcG9ydHMgdXAvZG93biBhdCB0aGUgbW9tZW50LlxuICAgICAgdGhpcy5fa2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuXG4gICAgICBjb25zdCBjdXJyZW50QWN0aXZlSXRlbSA9IHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbSBhcyBNZDJPcHRpb247XG5cbiAgICAgIGlmIChjdXJyZW50QWN0aXZlSXRlbSAhPT0gcHJldkFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5fc2V0U2VsZWN0aW9uQnlWYWx1ZShjdXJyZW50QWN0aXZlSXRlbS52YWx1ZSk7XG4gICAgICAgIHRoaXMuX3Byb3BhZ2F0ZUNoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogQ2FsY3VsYXRlcyB0aGUgYW1vdW50IG9mIGl0ZW1zIGluIHRoZSBzZWxlY3QuIFRoaXMgaW5jbHVkZXMgb3B0aW9ucyBhbmQgZ3JvdXAgbGFiZWxzLiAqL1xuICBwcml2YXRlIF9nZXRJdGVtQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmxlbmd0aCArIHRoaXMub3B0aW9uR3JvdXBzLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBhbW91bnQgb2Ygb3B0aW9uIGdyb3VwIGxhYmVscyB0aGF0IHByZWNlZGUgdGhlIHNwZWNpZmllZCBvcHRpb24uXG4gICAqIFVzZWZ1bCB3aGVuIHBvc2l0aW9uaW5nIHRoZSBwYW5lbCwgYmVjYXVzZSB0aGUgbGFiZWxzIHdpbGwgb2Zmc2V0IHRoZSBpbmRleCBvZiB0aGVcbiAgICogY3VycmVudGx5LXNlbGVjdGVkIG9wdGlvbi5cbiAgICovXG4gIHByaXZhdGUgX2dldExhYmVsQ291bnRCZWZvcmVPcHRpb24ob3B0aW9uSW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHRoaXMub3B0aW9uR3JvdXBzLmxlbmd0aCkge1xuICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMudG9BcnJheSgpO1xuICAgICAgbGV0IGdyb3VwcyA9IHRoaXMub3B0aW9uR3JvdXBzLnRvQXJyYXkoKTtcbiAgICAgIGxldCBncm91cENvdW50ZXIgPSAwO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbkluZGV4ICsgMTsgaSsrKSB7XG4gICAgICAgIGlmIChvcHRpb25zW2ldLmdyb3VwICYmIG9wdGlvbnNbaV0uZ3JvdXAgPT09IGdyb3Vwc1tncm91cENvdW50ZXJdKSB7XG4gICAgICAgICAgZ3JvdXBDb3VudGVyKys7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGdyb3VwQ291bnRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxuXG59XG5cbi8qKiBDbGFtcHMgYSB2YWx1ZSBuIGJldHdlZW4gbWluIGFuZCBtYXggdmFsdWVzLiAqL1xuZnVuY3Rpb24gY2xhbXBWYWx1ZShtaW46IG51bWJlciwgbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChtaW4sIG4pLCBtYXgpO1xufVxuIl19