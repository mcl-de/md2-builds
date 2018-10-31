/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, ViewChild, ViewContainerRef, ViewEncapsulation, NgZone, } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators, } from '@angular/forms';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
import { Overlay } from '../core/overlay/overlay';
import { ComponentPortal } from '../core/portal/portal';
import { OverlayState } from '../core/overlay/overlay-state';
import { Dir } from '../core/rtl/dir';
import { ESCAPE } from '../core/keyboard/keycodes';
import { Md2Calendar } from './calendar';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
import { first } from 'rxjs/operators';
/**
 * Change event object emitted by Md2Select.
 */
export class Md2DateChange {
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
    Md2DateChange.prototype.source;
    /** @type {?} */
    Md2DateChange.prototype.value;
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
export class Md2DatepickerContent {
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
if (false) {
    /** @type {?} */
    Md2DatepickerContent.prototype.datepicker;
    /** @type {?} */
    Md2DatepickerContent.prototype._calendar;
}
/** @type {?} */
export const MD2_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Md2Datepicker),
    multi: true
};
/** @type {?} */
export const MD2_DATEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => Md2Datepicker),
    multi: true
};
export class Md2Datepicker {
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
    set dateFilter(filter) {
        this._dateFilter = filter;
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
if (false) {
    /** @type {?} */
    Md2Datepicker.prototype._onChange;
    /** @type {?} */
    Md2Datepicker.prototype._onTouched;
    /** @type {?} */
    Md2Datepicker.prototype._validatorOnChange;
    /** @type {?} */
    Md2Datepicker.prototype._inputFocused;
    /**
     * The date to open the calendar to initially.
     * @type {?}
     */
    Md2Datepicker.prototype.startAt;
    /**
     * The view that the calendar should start in.
     * @type {?}
     */
    Md2Datepicker.prototype.startView;
    /**
     * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
     * than a popup and elements have more padding to allow for bigger touch targets.
     * @type {?}
     */
    Md2Datepicker.prototype.touchUi;
    /**
     * Whether the Week-number should be displayed
     * @type {?}
     */
    Md2Datepicker.prototype.displayWeek;
    /** @type {?} */
    Md2Datepicker.prototype.tabindex;
    /** @type {?} */
    Md2Datepicker.prototype.mode;
    /** @type {?} */
    Md2Datepicker.prototype.placeholder;
    /** @type {?} */
    Md2Datepicker.prototype.timeInterval;
    /** @type {?} */
    Md2Datepicker.prototype.id;
    /** @type {?} */
    Md2Datepicker.prototype._type;
    /** @type {?} */
    Md2Datepicker.prototype._format;
    /** @type {?} */
    Md2Datepicker.prototype._minDate;
    /** @type {?} */
    Md2Datepicker.prototype._maxDate;
    /** @type {?} */
    Md2Datepicker.prototype._dateFilter;
    /** @type {?} */
    Md2Datepicker.prototype._required;
    /** @type {?} */
    Md2Datepicker.prototype._disabled;
    /** @type {?} */
    Md2Datepicker.prototype._value;
    /** @type {?} */
    Md2Datepicker.prototype._inputValue;
    /** @type {?} */
    Md2Datepicker.prototype._openOnFocus;
    /**
     * Event emitted when the select has been opened.
     * @type {?}
     */
    Md2Datepicker.prototype.onOpen;
    /**
     * Event emitted when the select has been closed.
     * @type {?}
     */
    Md2Datepicker.prototype.onClose;
    /**
     * Event emitted when the selected date has been changed by the user.
     * @type {?}
     */
    Md2Datepicker.prototype.change;
    /**
     * Emits new selected date when selected date changes.
     * @type {?}
     */
    Md2Datepicker.prototype.selectedChanged;
    /**
     * Whether the calendar is open.
     * @type {?}
     */
    Md2Datepicker.prototype.opened;
    /**
     * The currently selected date.
     * @type {?}
     */
    Md2Datepicker.prototype._selected;
    /**
     * A reference to the overlay when the calendar is opened as a popup.
     * @type {?}
     */
    Md2Datepicker.prototype._popupRef;
    /**
     * A reference to the overlay when the calendar is opened as a dialog.
     * @type {?}
     */
    Md2Datepicker.prototype._dialogRef;
    /**
     * A portal containing the calendar for this datepicker.
     * @type {?}
     */
    Md2Datepicker.prototype._calendarPortal;
    /** @type {?} */
    Md2Datepicker.prototype._inputSubscription;
    /**
     * The form control validator for the min date.
     * @type {?}
     */
    Md2Datepicker.prototype._minValidator;
    /**
     * The form control validator for the max date.
     * @type {?}
     */
    Md2Datepicker.prototype._maxValidator;
    /**
     * The form control validator for the date filter.
     * @type {?}
     */
    Md2Datepicker.prototype._filterValidator;
    /**
     * The combined form control validator for this input.
     * @type {?}
     */
    Md2Datepicker.prototype._validator;
    /** @type {?} */
    Md2Datepicker.prototype._element;
    /** @type {?} */
    Md2Datepicker.prototype._overlay;
    /** @type {?} */
    Md2Datepicker.prototype._ngZone;
    /** @type {?} */
    Md2Datepicker.prototype._viewContainerRef;
    /** @type {?} */
    Md2Datepicker.prototype._locale;
    /** @type {?} */
    Md2Datepicker.prototype._util;
    /** @type {?} */
    Md2Datepicker.prototype._dir;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHTCxhQUFhLEVBQ2IsaUJBQWlCLEVBR2pCLFVBQVUsR0FDWCxNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUd0QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBR3ZDLE1BQU07Ozs7O0lBQ0osWUFBbUIsTUFBcUIsRUFBUyxLQUFXO1FBQXpDLFdBQU0sR0FBTixNQUFNLENBQWU7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFNO0tBQUs7Q0FDbEU7Ozs7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RCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7Ozs7WUFySEMsVUFBVTtZQXVCSCxPQUFPO1lBYmQsTUFBTTtZQUZOLGdCQUFnQjtZQXdCVCxVQUFVO1lBQ1YsUUFBUTtZQU5SLEdBQUcsdUJBbVFQLFFBQVE7OztzQkEvSlYsS0FBSzt3QkFHTCxLQUFLO3NCQU1MLEtBQUs7MEJBR0wsS0FBSzt1QkFFTCxLQUFLO21CQUNMLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxLQUFLO2lCQUNMLEtBQUs7bUJBRUwsS0FBSztxQkFRTCxLQUFLO2tCQWVMLEtBQUs7a0JBU0wsS0FBSzt5QkFRTCxLQUFLO3VCQU1MLEtBQUs7dUJBS0wsS0FBSztvQkFLTCxLQUFLOzBCQWNMLEtBQUs7cUJBS0wsS0FBSztxQkFNTCxNQUFNO3NCQUdOLE1BQU07cUJBR04sTUFBTTs4QkFHTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50UmVmLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE5nWm9uZSxcbiAgU2VsZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBYnN0cmFjdENvbnRyb2wsXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBOR19WQUxJREFUT1JTLFxuICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgVmFsaWRhdGlvbkVycm9ycyxcbiAgVmFsaWRhdG9yRm4sXG4gIFZhbGlkYXRvcnMsXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJy4uL2NvcmUvY29lcmNpb24vYm9vbGVhbi1wcm9wZXJ0eSc7XG5pbXBvcnQgeyBPdmVybGF5IH0gZnJvbSAnLi4vY29yZS9vdmVybGF5L292ZXJsYXknO1xuaW1wb3J0IHsgT3ZlcmxheVJlZiB9IGZyb20gJy4uL2NvcmUvb3ZlcmxheS9vdmVybGF5LXJlZic7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICcuLi9jb3JlL3BvcnRhbC9wb3J0YWwnO1xuaW1wb3J0IHsgT3ZlcmxheVN0YXRlIH0gZnJvbSAnLi4vY29yZS9vdmVybGF5L292ZXJsYXktc3RhdGUnO1xuaW1wb3J0IHsgRGlyIH0gZnJvbSAnLi4vY29yZS9ydGwvZGlyJztcbmltcG9ydCB7IFBvc2l0aW9uU3RyYXRlZ3kgfSBmcm9tICcuLi9jb3JlL292ZXJsYXkvcG9zaXRpb24vcG9zaXRpb24tc3RyYXRlZ3knO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBFU0NBUEUgfSBmcm9tICcuLi9jb3JlL2tleWJvYXJkL2tleWNvZGVzJztcbmltcG9ydCB7IE1kMkNhbGVuZGFyIH0gZnJvbSAnLi9jYWxlbmRhcic7XG5pbXBvcnQgeyBEYXRlTG9jYWxlIH0gZnJvbSAnLi9kYXRlLWxvY2FsZSc7XG5pbXBvcnQgeyBEYXRlVXRpbCB9IGZyb20gJy4vZGF0ZS11dGlsJztcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKiogQ2hhbmdlIGV2ZW50IG9iamVjdCBlbWl0dGVkIGJ5IE1kMlNlbGVjdC4gKi9cbmV4cG9ydCBjbGFzcyBNZDJEYXRlQ2hhbmdlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogTWQyRGF0ZXBpY2tlciwgcHVibGljIHZhbHVlOiBEYXRlKSB7IH1cbn1cblxuLyoqIFVzZWQgdG8gZ2VuZXJhdGUgYSB1bmlxdWUgSUQgZm9yIGVhY2ggZGF0ZXBpY2tlciBpbnN0YW5jZS4gKi9cbmxldCBkYXRlcGlja2VyVWlkID0gMDtcblxuXG4vKipcbiAqIENvbXBvbmVudCB1c2VkIGFzIHRoZSBjb250ZW50IGZvciB0aGUgZGF0ZXBpY2tlciBkaWFsb2cgYW5kIHBvcHVwLiBXZSB1c2UgdGhpcyBpbnN0ZWFkIG9mIHVzaW5nXG4gKiBNZDJDYWxlbmRhciBkaXJlY3RseSBhcyB0aGUgY29udGVudCBzbyB3ZSBjYW4gY29udHJvbCB0aGUgaW5pdGlhbCBmb2N1cy4gVGhpcyBhbHNvIGdpdmVzIHVzIGFcbiAqIHBsYWNlIHRvIHB1dCBhZGRpdGlvbmFsIGZlYXR1cmVzIG9mIHRoZSBwb3B1cCB0aGF0IGFyZSBub3QgcGFydCBvZiB0aGUgY2FsZW5kYXIgaXRzZWxmIGluIHRoZVxuICogZnV0dXJlLiAoZS5nLiBjb25maXJtYXRpb24gYnV0dG9ucykuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBcbiAgc2VsZWN0b3I6ICdtZDItZGF0ZXBpY2tlci1jb250ZW50JyxcbiAgdGVtcGxhdGVVcmw6ICdkYXRlcGlja2VyLWNvbnRlbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydkYXRlcGlja2VyLWNvbnRlbnQuc2NzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21kMi1kYXRlcGlja2VyLWNvbnRlbnQnLFxuICAgICdbY2xhc3MubWQyLWRhdGVwaWNrZXItY29udGVudC10b3VjaF0nOiAnZGF0ZXBpY2tlcj8udG91Y2hVaScsXG4gICAgJyhrZXlkb3duKSc6ICdfaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kMkRhdGVwaWNrZXJDb250ZW50IHtcbiAgZGF0ZXBpY2tlcjogTWQyRGF0ZXBpY2tlcjtcblxuICBAVmlld0NoaWxkKE1kMkNhbGVuZGFyKSBfY2FsZW5kYXI6IE1kMkNhbGVuZGFyO1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGtleWRvd24gZXZlbnQgb24gZGF0ZXBpY2tlciBjb250ZW50LlxuICAgKiBAcGFyYW0gZXZlbnQgVGhlIGV2ZW50LlxuICAgKi9cbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgRVNDQVBFOlxuICAgICAgICB0aGlzLmRhdGVwaWNrZXIuY2xvc2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvKiBSZXR1cm4gc28gdGhhdCB3ZSBkb24ndCBwcmV2ZW50RGVmYXVsdCBvbiBrZXlzIHRoYXQgYXJlIG5vdCBleHBsaWNpdGx5IGhhbmRsZWQuICovXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IE1EMl9EQVRFUElDS0VSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNZDJEYXRlcGlja2VyKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbmV4cG9ydCBjb25zdCBNRDJfREFURVBJQ0tFUl9WQUxJREFUT1JTOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1kMkRhdGVwaWNrZXIpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyogQ29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciBtYW5hZ2luZyB0aGUgZGF0ZXBpY2tlciBwb3B1cC9kaWFsb2cuICovXG5AQ29tcG9uZW50KHtcbiAgXG4gIHNlbGVjdG9yOiAnbWQyLWRhdGVwaWNrZXInLFxuICB0ZW1wbGF0ZVVybDogJ2RhdGVwaWNrZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydkYXRlcGlja2VyLnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbTUQyX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IsIE1EMl9EQVRFUElDS0VSX1ZBTElEQVRPUlNdLFxuICBob3N0OiB7XG4gICAgJ3JvbGUnOiAnZGF0ZXBpY2tlcicsXG4gICAgJ1tjbGFzcy5tZDItZGF0ZXBpY2tlci1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MubWQyLWRhdGVwaWNrZXItb3BlbmVkXSc6ICdvcGVuZWQnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsXSc6ICdwbGFjZWhvbGRlcicsXG4gICAgJ1thdHRyLmFyaWEtcmVxdWlyZWRdJzogJ3JlcXVpcmVkLnRvU3RyaW5nKCknLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWQyRGF0ZXBpY2tlciBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIF9vbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7IH07XG4gIF9vblRvdWNoZWQgPSAoKSA9PiB7IH07XG4gIF92YWxpZGF0b3JPbkNoYW5nZSA9ICgpID0+IHsgfTtcblxuICBfaW5wdXRGb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFRoZSBkYXRlIHRvIG9wZW4gdGhlIGNhbGVuZGFyIHRvIGluaXRpYWxseS4gKi9cbiAgQElucHV0KCkgc3RhcnRBdDogRGF0ZTtcblxuICAvKiogVGhlIHZpZXcgdGhhdCB0aGUgY2FsZW5kYXIgc2hvdWxkIHN0YXJ0IGluLiAqL1xuICBASW5wdXQoKSBzdGFydFZpZXc6ICdjbG9jaycgfCAnbW9udGgnIHwgJ3llYXInID0gJ21vbnRoJztcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgY2FsZW5kYXIgVUkgaXMgaW4gdG91Y2ggbW9kZS4gSW4gdG91Y2ggbW9kZSB0aGUgY2FsZW5kYXIgb3BlbnMgaW4gYSBkaWFsb2cgcmF0aGVyXG4gICAqIHRoYW4gYSBwb3B1cCBhbmQgZWxlbWVudHMgaGF2ZSBtb3JlIHBhZGRpbmcgdG8gYWxsb3cgZm9yIGJpZ2dlciB0b3VjaCB0YXJnZXRzLlxuICAgKi9cbiAgQElucHV0KCkgdG91Y2hVaSA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBXZWVrLW51bWJlciBzaG91bGQgYmUgZGlzcGxheWVkICovXG4gIEBJbnB1dCgpIGRpc3BsYXlXZWVrOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBtb2RlOiAnYXV0bycgfCAncG9ydHJhaXQnIHwgJ2xhbmRzY2FwZScgPSAnYXV0byc7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRpbWVJbnRlcnZhbDogbnVtYmVyID0gMTtcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBnZXQgdHlwZSgpIHsgcmV0dXJuIHRoaXMuX3R5cGU7IH1cbiAgc2V0IHR5cGUodmFsdWU6ICdkYXRlJyB8ICd0aW1lJyB8ICdtb250aCcgfCAnZGF0ZXRpbWUnKSB7XG4gICAgdGhpcy5fdHlwZSA9IHZhbHVlIHx8ICdkYXRlJztcbiAgICB0aGlzLl9pbnB1dFZhbHVlID0gdGhpcy5fZm9ybWF0RGF0ZSh0aGlzLl92YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfdHlwZTogJ2RhdGUnIHwgJ3RpbWUnIHwgJ21vbnRoJyB8ICdkYXRldGltZScgPSAnZGF0ZSc7XG5cbiAgQElucHV0KClcbiAgZ2V0IGZvcm1hdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZm9ybWF0IHx8ICh0aGlzLnR5cGUgPT09ICdtb250aCcgPyAnTU1NTSB5JyA6IHRoaXMudHlwZSA9PT0gJ2RhdGUnID9cbiAgICAgICdkZC9NTS95JyA6IHRoaXMudHlwZSA9PT0gJ3RpbWUnID8gJ0hIOm1tJyA6IHRoaXMudHlwZSA9PT0gJ2RhdGV0aW1lJyA/XG4gICAgICAgICdkZC9NTS95IEhIOm1tJyA6ICdkZC9NTS95Jyk7XG4gIH1cbiAgc2V0IGZvcm1hdCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2Zvcm1hdCAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2Zvcm1hdCA9IHZhbHVlO1xuICAgICAgdGhpcy5faW5wdXRWYWx1ZSA9IHRoaXMuX2Zvcm1hdERhdGUodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9mb3JtYXQ6IHN0cmluZztcblxuICAvKiogVGhlIG1pbmltdW0gdmFsaWQgZGF0ZS4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG1pbigpOiBEYXRlIHsgcmV0dXJuIHRoaXMuX21pbkRhdGU7IH1cbiAgc2V0IG1pbih2YWx1ZTogRGF0ZSkge1xuICAgIHRoaXMuX21pbkRhdGUgPSB2YWx1ZTtcbiAgICB0aGlzLl92YWxpZGF0b3JPbkNoYW5nZSgpO1xuICB9XG4gIF9taW5EYXRlOiBEYXRlO1xuXG4gIC8qKiBUaGUgbWF4aW11bSB2YWxpZCBkYXRlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbWF4KCk6IERhdGUgeyByZXR1cm4gdGhpcy5fbWF4RGF0ZTsgfVxuICBzZXQgbWF4KHZhbHVlOiBEYXRlKSB7XG4gICAgdGhpcy5fbWF4RGF0ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3ZhbGlkYXRvck9uQ2hhbmdlKCk7XG4gIH1cbiAgX21heERhdGU6IERhdGU7XG5cbiAgQElucHV0KCkgc2V0IGRhdGVGaWx0ZXIoZmlsdGVyOiAoZGF0ZTogRGF0ZSB8IG51bGwpID0+IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kYXRlRmlsdGVyID0gZmlsdGVyO1xuICAgIHRoaXMuX3ZhbGlkYXRvck9uQ2hhbmdlKCk7XG4gIH1cbiAgX2RhdGVGaWx0ZXI6IChkYXRlOiBEYXRlIHwgbnVsbCkgPT4gYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9yZXF1aXJlZDsgfVxuICBzZXQgcmVxdWlyZWQodmFsdWUpIHsgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gIHByaXZhdGUgX3JlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlKSB7IHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9XG4gIHNldCB2YWx1ZSh2YWx1ZTogRGF0ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5jb2VyY2VEYXRlUHJvcGVydHkodmFsdWUpO1xuICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5fdmFsdWU7XG4gICAgdGhpcy5zdGFydEF0ID0gdGhpcy5fdmFsdWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9pbnB1dFZhbHVlID0gdGhpcy5fZm9ybWF0RGF0ZSh0aGlzLl92YWx1ZSk7XG4gICAgfSk7XG4gIH1cbiAgcHJpdmF0ZSBfdmFsdWU6IERhdGU7XG5cbiAgX2lucHV0VmFsdWU6IHN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBvcGVuT25Gb2N1cygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX29wZW5PbkZvY3VzOyB9XG4gIHNldCBvcGVuT25Gb2N1cyh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9vcGVuT25Gb2N1cyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgcHJpdmF0ZSBfb3Blbk9uRm9jdXM6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgc2V0IGlzT3Blbih2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSAmJiAhdGhpcy5vcGVuZWQpIHsgdGhpcy5vcGVuKCk7IH1cbiAgfVxuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdCBoYXMgYmVlbiBvcGVuZWQuICovXG4gIEBPdXRwdXQoKSBvbk9wZW46IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgaGFzIGJlZW4gY2xvc2VkLiAqL1xuICBAT3V0cHV0KCkgb25DbG9zZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdGVkIGRhdGUgaGFzIGJlZW4gY2hhbmdlZCBieSB0aGUgdXNlci4gKi9cbiAgQE91dHB1dCgpIGNoYW5nZTogRXZlbnRFbWl0dGVyPE1kMkRhdGVDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxNZDJEYXRlQ2hhbmdlPigpO1xuXG4gIC8qKiBFbWl0cyBuZXcgc2VsZWN0ZWQgZGF0ZSB3aGVuIHNlbGVjdGVkIGRhdGUgY2hhbmdlcy4gKi9cbiAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oKTtcblxuICAvKiogV2hldGhlciB0aGUgY2FsZW5kYXIgaXMgb3Blbi4gKi9cbiAgb3BlbmVkID0gZmFsc2U7XG5cbiAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZS4gKi9cbiAgX3NlbGVjdGVkOiBEYXRlID0gbnVsbDtcblxuICAvKiogQSByZWZlcmVuY2UgdG8gdGhlIG92ZXJsYXkgd2hlbiB0aGUgY2FsZW5kYXIgaXMgb3BlbmVkIGFzIGEgcG9wdXAuICovXG4gIHByaXZhdGUgX3BvcHVwUmVmOiBPdmVybGF5UmVmO1xuXG4gIC8qKiBBIHJlZmVyZW5jZSB0byB0aGUgb3ZlcmxheSB3aGVuIHRoZSBjYWxlbmRhciBpcyBvcGVuZWQgYXMgYSBkaWFsb2cuICovXG4gIHByaXZhdGUgX2RpYWxvZ1JlZjogT3ZlcmxheVJlZjtcblxuICAvKiogQSBwb3J0YWwgY29udGFpbmluZyB0aGUgY2FsZW5kYXIgZm9yIHRoaXMgZGF0ZXBpY2tlci4gKi9cbiAgcHJpdmF0ZSBfY2FsZW5kYXJQb3J0YWw6IENvbXBvbmVudFBvcnRhbDxNZDJEYXRlcGlja2VyQ29udGVudD47XG5cbiAgcHJpdmF0ZSBfaW5wdXRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSBtaW4gZGF0ZS4gKi9cbiAgcHJpdmF0ZSBfbWluVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgcmV0dXJuICghdGhpcy5taW4gfHwgIWNvbnRyb2wudmFsdWUgfHxcbiAgICAgIHRoaXMuX3V0aWwuY29tcGFyZURhdGUodGhpcy5taW4sIGNvbnRyb2wudmFsdWUpIDw9IDApID9cbiAgICAgIG51bGwgOiB7ICdtZDJEYXRlcGlja2VyTWluJzogeyAnbWluJzogdGhpcy5taW4sICdhY3R1YWwnOiBjb250cm9sLnZhbHVlIH0gfTtcbiAgfVxuXG4gIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhlIG1heCBkYXRlLiAqL1xuICBwcml2YXRlIF9tYXhWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICByZXR1cm4gKCF0aGlzLm1heCB8fCAhY29udHJvbC52YWx1ZSB8fFxuICAgICAgdGhpcy5fdXRpbC5jb21wYXJlRGF0ZSh0aGlzLm1heCwgY29udHJvbC52YWx1ZSkgPj0gMCkgP1xuICAgICAgbnVsbCA6IHsgJ21kMkRhdGVwaWNrZXJNYXgnOiB7ICdtYXgnOiB0aGlzLm1heCwgJ2FjdHVhbCc6IGNvbnRyb2wudmFsdWUgfSB9O1xuICB9XG5cbiAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgZGF0ZSBmaWx0ZXIuICovXG4gIHByaXZhdGUgX2ZpbHRlclZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgIHJldHVybiAhdGhpcy5fZGF0ZUZpbHRlciB8fCAhY29udHJvbC52YWx1ZSB8fCB0aGlzLl9kYXRlRmlsdGVyKGNvbnRyb2wudmFsdWUpID9cbiAgICAgIG51bGwgOiB7ICdtZDJEYXRlcGlja2VyRmlsdGVyJzogdHJ1ZSB9O1xuICB9XG5cbiAgLyoqIFRoZSBjb21iaW5lZCBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGlzIGlucHV0LiAqL1xuICBwcml2YXRlIF92YWxpZGF0b3I6IFZhbGlkYXRvckZuID1cbiAgVmFsaWRhdG9ycy5jb21wb3NlKFt0aGlzLl9taW5WYWxpZGF0b3IsIHRoaXMuX21heFZhbGlkYXRvciwgdGhpcy5fZmlsdGVyVmFsaWRhdG9yXSk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBfbG9jYWxlOiBEYXRlTG9jYWxlLFxuICAgIHByaXZhdGUgX3V0aWw6IERhdGVVdGlsLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RpcjogRGlyKSB7XG4gICAgdGhpcy5pZCA9ICh0aGlzLmlkKSA/IHRoaXMuaWQgOiBgbWQyLWRhdGVwaWNrZXItJHtkYXRlcGlja2VyVWlkKyt9YDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgICBpZiAodGhpcy5fcG9wdXBSZWYpIHtcbiAgICAgIHRoaXMuX3BvcHVwUmVmLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2RpYWxvZ1JlZikge1xuICAgICAgdGhpcy5fZGlhbG9nUmVmLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2lucHV0U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9pbnB1dFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2UoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl92YWxpZGF0b3JPbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl92YWxpZGF0b3IgPyB0aGlzLl92YWxpZGF0b3IoYykgOiBudWxsO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5fb25DaGFuZ2UgPSBmbjsgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQgeyB0aGlzLl9vblRvdWNoZWQgPSBmbjsgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgX2hhbmRsZUZvY3VzKCkge1xuICAgIHRoaXMuX2lucHV0Rm9jdXNlZCA9IHRydWU7XG4gICAgaWYgKCF0aGlzLm9wZW5lZCAmJiB0aGlzLm9wZW5PbkZvY3VzKSB7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlQmx1cihldmVudDogRXZlbnQpIHtcbiAgICB0aGlzLl9pbnB1dEZvY3VzZWQgPSBmYWxzZTtcbiAgICBpZiAoIXRoaXMub3BlbmVkKSB7XG4gICAgICB0aGlzLl9vblRvdWNoZWQoKTtcbiAgICB9XG4gICAgbGV0IGVsOiBhbnkgPSBldmVudC50YXJnZXQ7XG4gICAgbGV0IGRhdGU6IERhdGUgPSB0aGlzLl91dGlsLnBhcnNlRGF0ZShlbC52YWx1ZSwgdGhpcy5mb3JtYXQpO1xuICAgIGlmICghZGF0ZSkge1xuICAgICAgZGF0ZSA9IHRoaXMuX3V0aWwucGFyc2UoZWwudmFsdWUpO1xuICAgIH1cbiAgICBpZiAoZGF0ZSAhPSBudWxsICYmIGRhdGUuZ2V0VGltZSAmJiAhaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSB7XG5cbiAgICAgIGxldCBkOiBEYXRlID0gbmV3IERhdGUodGhpcy52YWx1ZSk7XG4gICAgICBpZiAodGhpcy50eXBlICE9PSAndGltZScpIHtcbiAgICAgICAgZC5zZXRGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudHlwZSAhPT0gJ2RhdGUnKSB7XG4gICAgICAgIGQuc2V0SG91cnMoZGF0ZS5nZXRIb3VycygpLCBkYXRlLmdldE1pbnV0ZXMoKSk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuX3V0aWwuaXNTYW1lTWludXRlKHRoaXMudmFsdWUsIGQpKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLl91dGlsLmNyZWF0ZURhdGUoZC5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgIGQuZ2V0TW9udGgoKSxcbiAgICAgICAgICBkLmdldERhdGUoKSxcbiAgICAgICAgICBkLmdldEhvdXJzKCksXG4gICAgICAgICAgZC5nZXRNaW51dGVzKCksXG4gICAgICAgICAgZC5nZXRTZWNvbmRzKCkpO1xuICAgICAgICB0aGlzLl9lbWl0Q2hhbmdlRXZlbnQoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2VtaXRDaGFuZ2VFdmVudCgpO1xuICAgICAgfVxuICAgICAgZWwudmFsdWUgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY29lcmNlRGF0ZVByb3BlcnR5KHZhbHVlOiBhbnkpOiBEYXRlIHtcbiAgICBsZXQgdjogRGF0ZSA9IG51bGw7XG4gICAgaWYgKHZhbHVlICE9IG51bGwgJiYgdmFsdWUuZ2V0VGltZSAmJiAhaXNOYU4odmFsdWUuZ2V0VGltZSgpKSkge1xuICAgICAgdiA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodmFsdWUgJiYgdGhpcy50eXBlID09PSAndGltZScpIHtcbiAgICAgICAgbGV0IHQgPSB2YWx1ZSArICcnO1xuICAgICAgICB2ID0gbmV3IERhdGUoKTtcbiAgICAgICAgdi5zZXRIb3VycyhwYXJzZUludCh0LnN1YnN0cmluZygwLCAyKSkpO1xuICAgICAgICB2LnNldE1pbnV0ZXMocGFyc2VJbnQodC5zdWJzdHJpbmcoMywgNSkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB0aW1lc3RhbXAgPSBEYXRlLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgdiA9IGlzTmFOKHRpbWVzdGFtcCkgPyBudWxsIDogbmV3IERhdGUodGltZXN0YW1wKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IGQ6IERhdGUgPSB2ID8gdGhpcy5fdXRpbC5jcmVhdGVEYXRlKHYuZ2V0RnVsbFllYXIoKSxcbiAgICAgIHYuZ2V0TW9udGgoKSxcbiAgICAgIHYuZ2V0RGF0ZSgpLFxuICAgICAgdi5nZXRIb3VycygpLFxuICAgICAgdi5nZXRNaW51dGVzKCksXG4gICAgICB2LmdldFNlY29uZHMoKSkgOiBudWxsO1xuICAgIHJldHVybiBkO1xuICB9XG5cbiAgLyoqXG4gICAqIGZvcm1hdCBkYXRlXG4gICAqIEBwYXJhbSBkYXRlIERhdGUgT2JqZWN0XG4gICAqIEByZXR1cm4gc3RyaW5nIHdpdGggZm9ybWF0dGVkIGRhdGVcbiAgICovXG4gIHByaXZhdGUgX2Zvcm1hdERhdGUoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLmZvcm1hdCB8fCAhZGF0ZSkgeyByZXR1cm4gJyc7IH1cblxuICAgIGxldCBmb3JtYXQgPSB0aGlzLmZvcm1hdDtcblxuICAgIC8qIFllYXJzICovXG4gICAgaWYgKGZvcm1hdC5pbmRleE9mKCd5eScpID4gLTEpIHtcbiAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCd5eScsICgnMDAnICsgdGhpcy5fdXRpbC5nZXRZZWFyKGRhdGUpKS5zbGljZSgtMikpO1xuICAgIH0gZWxzZSBpZiAoZm9ybWF0LmluZGV4T2YoJ3knKSA+IC0xKSB7XG4gICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgneScsICcnICsgdGhpcy5fdXRpbC5nZXRZZWFyKGRhdGUpKTtcbiAgICB9XG5cbiAgICAvKiBEYXlzICovXG4gICAgaWYgKGZvcm1hdC5pbmRleE9mKCdkZCcpID4gLTEpIHtcbiAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCdkZCcsICgnMCcgKyB0aGlzLl91dGlsLmdldERhdGUoZGF0ZSkpLnNsaWNlKC0yKSk7XG4gICAgfSBlbHNlIGlmIChmb3JtYXQuaW5kZXhPZignZCcpID4gLTEpIHtcbiAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCdkJywgJycgKyB0aGlzLl91dGlsLmdldERhdGUoZGF0ZSkpO1xuICAgIH1cblxuICAgIC8qIEhvdXJzICovXG4gICAgaWYgKC9bYUFdLy50ZXN0KGZvcm1hdCkpIHtcbiAgICAgIC8qIDEyLWhvdXIgKi9cbiAgICAgIGlmIChmb3JtYXQuaW5kZXhPZignSEgnKSA+IC0xKSB7XG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCdISCcsXG4gICAgICAgICAgKCcwJyArIHRoaXMuX2dldEhvdXJzMTIodGhpcy5fdXRpbC5nZXRIb3VycyhkYXRlKSkpLnNsaWNlKC0yKSk7XG4gICAgICB9IGVsc2UgaWYgKGZvcm1hdC5pbmRleE9mKCdIJykgPiAtMSkge1xuICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgnSCcsXG4gICAgICAgICAgJycgKyB0aGlzLl9nZXRIb3VyczEyKHRoaXMuX3V0aWwuZ2V0SG91cnMoZGF0ZSkpKTtcbiAgICAgIH1cbiAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCdBJywgKCh0aGlzLl91dGlsLmdldEhvdXJzKGRhdGUpIDwgMTIpID8gJ0FNJyA6ICdQTScpKVxuICAgICAgICAucmVwbGFjZSgnYScsICgodGhpcy5fdXRpbC5nZXRIb3VycyhkYXRlKSA8IDEyKSA/ICdhbScgOiAncG0nKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8qIDI0LWhvdXIgKi9cbiAgICAgIGlmIChmb3JtYXQuaW5kZXhPZignSEgnKSA+IC0xKSB7XG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCdISCcsICgnMCcgKyB0aGlzLl91dGlsLmdldEhvdXJzKGRhdGUpKS5zbGljZSgtMikpO1xuICAgICAgfSBlbHNlIGlmIChmb3JtYXQuaW5kZXhPZignSCcpID4gLTEpIHtcbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoJ0gnLCAnJyArIHRoaXMuX3V0aWwuZ2V0SG91cnMoZGF0ZSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qIE1pbnV0ZXMgKi9cbiAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ21tJykgPiAtMSkge1xuICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoJ21tJywgKCcwJyArIHRoaXMuX3V0aWwuZ2V0TWludXRlcyhkYXRlKSkuc2xpY2UoLTIpKTtcbiAgICB9IGVsc2UgaWYgKGZvcm1hdC5pbmRleE9mKCdtJykgPiAtMSkge1xuICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoJ20nLCAnJyArIHRoaXMuX3V0aWwuZ2V0TWludXRlcyhkYXRlKSk7XG4gICAgfVxuXG4gICAgLyogU2Vjb25kcyAqL1xuICAgIGlmIChmb3JtYXQuaW5kZXhPZignc3MnKSA+IC0xKSB7XG4gICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgnc3MnLCAoJzAnICsgdGhpcy5fdXRpbC5nZXRTZWNvbmRzKGRhdGUpKS5zbGljZSgtMikpO1xuICAgIH0gZWxzZSBpZiAoZm9ybWF0LmluZGV4T2YoJ3MnKSA+IC0xKSB7XG4gICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgncycsICcnICsgdGhpcy5fdXRpbC5nZXRTZWNvbmRzKGRhdGUpKTtcbiAgICB9XG5cbiAgICAvKiBNb250aHMgKi9cbiAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ01NTU0nKSA+IC0xKSB7XG4gICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgnTU1NTScsXG4gICAgICAgIHRoaXMuX2xvY2FsZS5nZXRNb250aE5hbWVzKCdsb25nJylbdGhpcy5fdXRpbC5nZXRNb250aChkYXRlKV0pO1xuICAgIH0gZWxzZSBpZiAoZm9ybWF0LmluZGV4T2YoJ01NTScpID4gLTEpIHtcbiAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCdNTU0nLFxuICAgICAgICB0aGlzLl9sb2NhbGUuZ2V0TW9udGhOYW1lcygnc2hvcnQnKVt0aGlzLl91dGlsLmdldE1vbnRoKGRhdGUpXSk7XG4gICAgfSBlbHNlIGlmIChmb3JtYXQuaW5kZXhPZignTU0nKSA+IC0xKSB7XG4gICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgnTU0nLCAoJzAnICsgKHRoaXMuX3V0aWwuZ2V0TW9udGgoZGF0ZSkgKyAxKSkuc2xpY2UoLTIpKTtcbiAgICB9IGVsc2UgaWYgKGZvcm1hdC5pbmRleE9mKCdNJykgPiAtMSkge1xuICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoJ00nLCAnJyArICh0aGlzLl91dGlsLmdldE1vbnRoKGRhdGUpICsgMSkpO1xuICAgIH1cblxuICAgIHJldHVybiBmb3JtYXQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuIGhvdXIgb2YgdGhlIGRhdGUgaW4gdGhlIDEyLWhvdXIgZm9ybWF0XG4gICAqIEBwYXJhbSBkYXRlIERhdGUgT2JqZWN0XG4gICAqIEByZXR1cm4gaG91ciBvZiB0aGUgZGF0ZSBpbiB0aGUgMTItaG91ciBmb3JtYXRcbiAgICovXG4gIHByaXZhdGUgX2dldEhvdXJzMTIoaG91cnM6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKGhvdXJzID09IDApIHtcbiAgICAgIGhvdXJzID0gMTI7XG4gICAgfSBlbHNlIGlmIChob3VycyA+IDEyKSB7XG4gICAgICBob3VycyAtPSAxMjtcbiAgICB9XG4gICAgcmV0dXJuIGhvdXJzO1xuICB9XG5cbiAgLyoqIFNlbGVjdHMgdGhlIGdpdmVuIGRhdGUgYW5kIGNsb3NlcyB0aGUgY3VycmVudGx5IG9wZW4gcG9wdXAgb3IgZGlhbG9nLiAqL1xuICBfc2VsZWN0QW5kQ2xvc2UoZGF0ZTogRGF0ZSk6IHZvaWQge1xuICAgIGxldCBvbGRWYWx1ZSA9IHRoaXMuX3NlbGVjdGVkO1xuICAgIHRoaXMudmFsdWUgPSBkYXRlO1xuICAgIGlmICghdGhpcy5fdXRpbC5zYW1lRGF0ZUFuZFRpbWUob2xkVmFsdWUsIHRoaXMuX3NlbGVjdGVkKSkge1xuICAgICAgdGhpcy5fZW1pdENoYW5nZUV2ZW50KCk7XG4gICAgfVxuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIC8qKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSB1c2VyIHNlbGVjdHMgYSBkYXRlLiAqL1xuICBfZW1pdENoYW5nZUV2ZW50KCk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgIHRoaXMuY2hhbmdlLmVtaXQobmV3IE1kMkRhdGVDaGFuZ2UodGhpcywgdGhpcy52YWx1ZSkpO1xuICB9XG5cbiAgLyoqIE9wZW4gdGhlIGNhbGVuZGFyLiAqL1xuICBvcGVuKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wZW5lZCkgeyByZXR1cm47IH1cblxuICAgIGlmICghdGhpcy5fY2FsZW5kYXJQb3J0YWwpIHtcbiAgICAgIHRoaXMuX2NhbGVuZGFyUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChNZDJEYXRlcGlja2VyQ29udGVudCwgdGhpcy5fdmlld0NvbnRhaW5lclJlZik7XG4gICAgfVxuXG4gICAgdGhpcy50b3VjaFVpID8gdGhpcy5fb3BlbkFzRGlhbG9nKCkgOiB0aGlzLl9vcGVuQXNQb3B1cCgpO1xuICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcbiAgICB0aGlzLm9uT3Blbi5lbWl0KCk7XG4gIH1cblxuICAvKiogQ2xvc2UgdGhlIGNhbGVuZGFyLiAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMub3BlbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9wb3B1cFJlZiAmJiB0aGlzLl9wb3B1cFJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICB0aGlzLl9wb3B1cFJlZi5kZXRhY2goKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2RpYWxvZ1JlZiAmJiB0aGlzLl9kaWFsb2dSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgdGhpcy5fZGlhbG9nUmVmLmRldGFjaCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fY2FsZW5kYXJQb3J0YWwgJiYgdGhpcy5fY2FsZW5kYXJQb3J0YWwuaXNBdHRhY2hlZCkge1xuICAgICAgdGhpcy5fY2FsZW5kYXJQb3J0YWwuZGV0YWNoKCk7XG4gICAgfVxuICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG4gICAgdGhpcy5vbkNsb3NlLmVtaXQoKTtcbiAgfVxuXG4gIC8qKiBPcGVuIHRoZSBjYWxlbmRhciBhcyBhIGRpYWxvZy4gKi9cbiAgcHJpdmF0ZSBfb3BlbkFzRGlhbG9nKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZGlhbG9nUmVmKSB7XG4gICAgICB0aGlzLl9jcmVhdGVEaWFsb2coKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2RpYWxvZ1JlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICBsZXQgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8TWQyRGF0ZXBpY2tlckNvbnRlbnQ+ID1cbiAgICAgICAgdGhpcy5fZGlhbG9nUmVmLmF0dGFjaCh0aGlzLl9jYWxlbmRhclBvcnRhbCk7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UuZGF0ZXBpY2tlciA9IHRoaXM7XG4gICAgfVxuXG4gICAgdGhpcy5fZGlhbG9nUmVmLmJhY2tkcm9wQ2xpY2soKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgfVxuXG4gIC8qKiBPcGVuIHRoZSBjYWxlbmRhciBhcyBhIHBvcHVwLiAqL1xuICBwcml2YXRlIF9vcGVuQXNQb3B1cCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3BvcHVwUmVmKSB7XG4gICAgICB0aGlzLl9jcmVhdGVQb3B1cCgpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fcG9wdXBSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgbGV0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPE1kMkRhdGVwaWNrZXJDb250ZW50PiA9XG4gICAgICAgIHRoaXMuX3BvcHVwUmVmLmF0dGFjaCh0aGlzLl9jYWxlbmRhclBvcnRhbCk7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UuZGF0ZXBpY2tlciA9IHRoaXM7XG5cbiAgICAgIC8qIFVwZGF0ZSB0aGUgcG9zaXRpb24gb25jZSB0aGUgY2FsZW5kYXIgaGFzIHJlbmRlcmVkLiAqL1xuICAgICAgdGhpcy5fbmdab25lLm9uU3RhYmxlLnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3BvcHVwUmVmLnVwZGF0ZVBvc2l0aW9uKCkpO1xuICAgIH1cblxuICAgIHRoaXMuX3BvcHVwUmVmLmJhY2tkcm9wQ2xpY2soKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgfVxuXG4gIC8qKiBDcmVhdGUgdGhlIGRpYWxvZy4gKi9cbiAgcHJpdmF0ZSBfY3JlYXRlRGlhbG9nKCk6IHZvaWQge1xuICAgIGNvbnN0IG92ZXJsYXlTdGF0ZSA9IG5ldyBPdmVybGF5U3RhdGUoKTtcbiAgICBvdmVybGF5U3RhdGUucG9zaXRpb25TdHJhdGVneSA9IHRoaXMuX292ZXJsYXkucG9zaXRpb24oKS5nbG9iYWwoKVxuICAgICAgLmNlbnRlckhvcml6b250YWxseSgpXG4gICAgICAuY2VudGVyVmVydGljYWxseSgpO1xuICAgIG92ZXJsYXlTdGF0ZS5oYXNCYWNrZHJvcCA9IHRydWU7XG4gICAgb3ZlcmxheVN0YXRlLmJhY2tkcm9wQ2xhc3MgPSAnY2RrLW92ZXJsYXktZGFyay1iYWNrZHJvcCc7XG4gICAgb3ZlcmxheVN0YXRlLmRpcmVjdGlvbiA9IHRoaXMuX2RpciA/IHRoaXMuX2Rpci52YWx1ZSA6ICdsdHInO1xuICAgIHRoaXMuX2RpYWxvZ1JlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKG92ZXJsYXlTdGF0ZSk7XG4gIH1cblxuICAvKiogQ3JlYXRlIHRoZSBwb3B1cC4gKi9cbiAgcHJpdmF0ZSBfY3JlYXRlUG9wdXAoKTogdm9pZCB7XG4gICAgY29uc3Qgb3ZlcmxheVN0YXRlID0gbmV3IE92ZXJsYXlTdGF0ZSgpO1xuICAgIG92ZXJsYXlTdGF0ZS5wb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5fY3JlYXRlUG9wdXBQb3NpdGlvblN0cmF0ZWd5KCk7XG4gICAgb3ZlcmxheVN0YXRlLmhhc0JhY2tkcm9wID0gdHJ1ZTtcbiAgICBvdmVybGF5U3RhdGUuYmFja2Ryb3BDbGFzcyA9ICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCc7XG4gICAgb3ZlcmxheVN0YXRlLmRpcmVjdGlvbiA9IHRoaXMuX2RpciA/IHRoaXMuX2Rpci52YWx1ZSA6ICdsdHInO1xuICAgIG92ZXJsYXlTdGF0ZS5zY3JvbGxTdHJhdGVneSA9IHRoaXMuX292ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKCk7XG5cbiAgICB0aGlzLl9wb3B1cFJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKG92ZXJsYXlTdGF0ZSk7XG4gIH1cblxuICAvKiogQ3JlYXRlIHRoZSBwb3B1cCBQb3NpdGlvblN0cmF0ZWd5LiAqL1xuICBwcml2YXRlIF9jcmVhdGVQb3B1cFBvc2l0aW9uU3RyYXRlZ3koKTogUG9zaXRpb25TdHJhdGVneSB7XG4gICAgcmV0dXJuIHRoaXMuX292ZXJsYXkucG9zaXRpb24oKVxuICAgICAgLmNvbm5lY3RlZFRvKHRoaXMuX2VsZW1lbnQsXG4gICAgICB7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdib3R0b20nIH0sXG4gICAgICB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ3RvcCcgfSlcbiAgICAgIC53aXRoRmFsbGJhY2tQb3NpdGlvbihcbiAgICAgIHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ3RvcCcgfSxcbiAgICAgIHsgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAnYm90dG9tJyB9KVxuICAgICAgLndpdGhGYWxsYmFja1Bvc2l0aW9uKFxuICAgICAgeyBvcmlnaW5YOiAnZW5kJywgb3JpZ2luWTogJ2JvdHRvbScgfSxcbiAgICAgIHsgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ3RvcCcgfSlcbiAgICAgIC53aXRoRmFsbGJhY2tQb3NpdGlvbihcbiAgICAgIHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICd0b3AnIH0sXG4gICAgICB7IG92ZXJsYXlYOiAnZW5kJywgb3ZlcmxheVk6ICdib3R0b20nIH0pO1xuICB9XG59XG4iXX0=