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
var /**
 * Change event object emitted by Md2Select.
 */
Md2DateChange = /** @class */ (function () {
    function Md2DateChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return Md2DateChange;
}());
/**
 * Change event object emitted by Md2Select.
 */
export { Md2DateChange };
if (false) {
    /** @type {?} */
    Md2DateChange.prototype.source;
    /** @type {?} */
    Md2DateChange.prototype.value;
}
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
export { Md2DatepickerContent };
if (false) {
    /** @type {?} */
    Md2DatepickerContent.prototype.datepicker;
    /** @type {?} */
    Md2DatepickerContent.prototype._calendar;
}
/** @type {?} */
export var MD2_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Md2Datepicker; }),
    multi: true
};
/** @type {?} */
export var MD2_DATEPICKER_VALIDATORS = {
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
        function (filter) {
            this._dateFilter = filter;
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
export { Md2Datepicker };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHTCxhQUFhLEVBQ2IsaUJBQWlCLEVBR2pCLFVBQVUsR0FDWCxNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUd0QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBR3ZDOzs7QUFBQTtJQUNFLHVCQUFtQixNQUFxQixFQUFTLEtBQVc7UUFBekMsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQU07S0FBSzt3QkExQ25FO0lB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QUFFLEVBQ2xDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQzs7O2dCQWhmOUMsU0FBUyxTQUFDO29CQUVULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLDRnRUFBOEI7b0JBRTlCLFNBQVMsRUFBRSxDQUFDLDZCQUE2QixFQUFFLHlCQUF5QixDQUFDO29CQUNyRSxJQUFJLEVBQUU7d0JBQ0osTUFBTSxFQUFFLFlBQVk7d0JBQ3BCLGlDQUFpQyxFQUFFLFVBQVU7d0JBQzdDLCtCQUErQixFQUFFLFFBQVE7d0JBQ3pDLG1CQUFtQixFQUFFLGFBQWE7d0JBQ2xDLHNCQUFzQixFQUFFLHFCQUFxQjt3QkFDN0Msc0JBQXNCLEVBQUUscUJBQXFCO3FCQUM5QztvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3RDOzs7O2dCQXJIQyxVQUFVO2dCQXVCSCxPQUFPO2dCQWJkLE1BQU07Z0JBRk4sZ0JBQWdCO2dCQXdCVCxVQUFVO2dCQUNWLFFBQVE7Z0JBTlIsR0FBRyx1QkFtUVAsUUFBUTs7OzBCQS9KVixLQUFLOzRCQUdMLEtBQUs7MEJBTUwsS0FBSzs4QkFHTCxLQUFLOzJCQUVMLEtBQUs7dUJBQ0wsS0FBSzs4QkFDTCxLQUFLOytCQUNMLEtBQUs7cUJBQ0wsS0FBSzt1QkFFTCxLQUFLO3lCQVFMLEtBQUs7c0JBZUwsS0FBSztzQkFTTCxLQUFLOzZCQVFMLEtBQUs7MkJBTUwsS0FBSzsyQkFLTCxLQUFLO3dCQUtMLEtBQUs7OEJBY0wsS0FBSzt5QkFLTCxLQUFLO3lCQU1MLE1BQU07MEJBR04sTUFBTTt5QkFHTixNQUFNO2tDQUdOLE1BQU07O3dCQWpQVDs7U0EwSGEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudFJlZixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBOZ1pvbmUsXG4gIFNlbGYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWJzdHJhY3RDb250cm9sLFxuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgTkdfVkFMSURBVE9SUyxcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gIFZhbGlkYXRpb25FcnJvcnMsXG4gIFZhbGlkYXRvckZuLFxuICBWYWxpZGF0b3JzLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICcuLi9jb3JlL2NvZXJjaW9uL2Jvb2xlYW4tcHJvcGVydHknO1xuaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gJy4uL2NvcmUvb3ZlcmxheS9vdmVybGF5JztcbmltcG9ydCB7IE92ZXJsYXlSZWYgfSBmcm9tICcuLi9jb3JlL292ZXJsYXkvb3ZlcmxheS1yZWYnO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnLi4vY29yZS9wb3J0YWwvcG9ydGFsJztcbmltcG9ydCB7IE92ZXJsYXlTdGF0ZSB9IGZyb20gJy4uL2NvcmUvb3ZlcmxheS9vdmVybGF5LXN0YXRlJztcbmltcG9ydCB7IERpciB9IGZyb20gJy4uL2NvcmUvcnRsL2Rpcic7XG5pbXBvcnQgeyBQb3NpdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi4vY29yZS9vdmVybGF5L3Bvc2l0aW9uL3Bvc2l0aW9uLXN0cmF0ZWd5JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSAnLi4vY29yZS9rZXlib2FyZC9rZXljb2Rlcyc7XG5pbXBvcnQgeyBNZDJDYWxlbmRhciB9IGZyb20gJy4vY2FsZW5kYXInO1xuaW1wb3J0IHsgRGF0ZUxvY2FsZSB9IGZyb20gJy4vZGF0ZS1sb2NhbGUnO1xuaW1wb3J0IHsgRGF0ZVV0aWwgfSBmcm9tICcuL2RhdGUtdXRpbCc7XG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqIENoYW5nZSBldmVudCBvYmplY3QgZW1pdHRlZCBieSBNZDJTZWxlY3QuICovXG5leHBvcnQgY2xhc3MgTWQyRGF0ZUNoYW5nZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE1kMkRhdGVwaWNrZXIsIHB1YmxpYyB2YWx1ZTogRGF0ZSkgeyB9XG59XG5cbi8qKiBVc2VkIHRvIGdlbmVyYXRlIGEgdW5pcXVlIElEIGZvciBlYWNoIGRhdGVwaWNrZXIgaW5zdGFuY2UuICovXG5sZXQgZGF0ZXBpY2tlclVpZCA9IDA7XG5cblxuLyoqXG4gKiBDb21wb25lbnQgdXNlZCBhcyB0aGUgY29udGVudCBmb3IgdGhlIGRhdGVwaWNrZXIgZGlhbG9nIGFuZCBwb3B1cC4gV2UgdXNlIHRoaXMgaW5zdGVhZCBvZiB1c2luZ1xuICogTWQyQ2FsZW5kYXIgZGlyZWN0bHkgYXMgdGhlIGNvbnRlbnQgc28gd2UgY2FuIGNvbnRyb2wgdGhlIGluaXRpYWwgZm9jdXMuIFRoaXMgYWxzbyBnaXZlcyB1cyBhXG4gKiBwbGFjZSB0byBwdXQgYWRkaXRpb25hbCBmZWF0dXJlcyBvZiB0aGUgcG9wdXAgdGhhdCBhcmUgbm90IHBhcnQgb2YgdGhlIGNhbGVuZGFyIGl0c2VsZiBpbiB0aGVcbiAqIGZ1dHVyZS4gKGUuZy4gY29uZmlybWF0aW9uIGJ1dHRvbnMpLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgXG4gIHNlbGVjdG9yOiAnbWQyLWRhdGVwaWNrZXItY29udGVudCcsXG4gIHRlbXBsYXRlVXJsOiAnZGF0ZXBpY2tlci1jb250ZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZGF0ZXBpY2tlci1jb250ZW50LnNjc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtZDItZGF0ZXBpY2tlci1jb250ZW50JyxcbiAgICAnW2NsYXNzLm1kMi1kYXRlcGlja2VyLWNvbnRlbnQtdG91Y2hdJzogJ2RhdGVwaWNrZXI/LnRvdWNoVWknLFxuICAgICcoa2V5ZG93biknOiAnX2hhbmRsZUtleWRvd24oJGV2ZW50KScsXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNZDJEYXRlcGlja2VyQ29udGVudCB7XG4gIGRhdGVwaWNrZXI6IE1kMkRhdGVwaWNrZXI7XG5cbiAgQFZpZXdDaGlsZChNZDJDYWxlbmRhcikgX2NhbGVuZGFyOiBNZDJDYWxlbmRhcjtcblxuICAvKipcbiAgICogSGFuZGxlcyBrZXlkb3duIGV2ZW50IG9uIGRhdGVwaWNrZXIgY29udGVudC5cbiAgICogQHBhcmFtIGV2ZW50IFRoZSBldmVudC5cbiAgICovXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIEVTQ0FQRTpcbiAgICAgICAgdGhpcy5kYXRlcGlja2VyLmNsb3NlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLyogUmV0dXJuIHNvIHRoYXQgd2UgZG9uJ3QgcHJldmVudERlZmF1bHQgb24ga2V5cyB0aGF0IGFyZSBub3QgZXhwbGljaXRseSBoYW5kbGVkLiAqL1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBNRDJfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWQyRGF0ZXBpY2tlciksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5leHBvcnQgY29uc3QgTUQyX0RBVEVQSUNLRVJfVkFMSURBVE9SUzogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNZDJEYXRlcGlja2VyKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qIENvbXBvbmVudCByZXNwb25zaWJsZSBmb3IgbWFuYWdpbmcgdGhlIGRhdGVwaWNrZXIgcG9wdXAvZGlhbG9nLiAqL1xuQENvbXBvbmVudCh7XG4gIFxuICBzZWxlY3RvcjogJ21kMi1kYXRlcGlja2VyJyxcbiAgdGVtcGxhdGVVcmw6ICdkYXRlcGlja2VyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZGF0ZXBpY2tlci5zY3NzJ10sXG4gIHByb3ZpZGVyczogW01EMl9EQVRFUElDS0VSX1ZBTFVFX0FDQ0VTU09SLCBNRDJfREFURVBJQ0tFUl9WQUxJREFUT1JTXSxcbiAgaG9zdDoge1xuICAgICdyb2xlJzogJ2RhdGVwaWNrZXInLFxuICAgICdbY2xhc3MubWQyLWRhdGVwaWNrZXItZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1kMi1kYXRlcGlja2VyLW9wZW5lZF0nOiAnb3BlbmVkJyxcbiAgICAnW2F0dHIuYXJpYS1sYWJlbF0nOiAncGxhY2Vob2xkZXInLFxuICAgICdbYXR0ci5hcmlhLXJlcXVpcmVkXSc6ICdyZXF1aXJlZC50b1N0cmluZygpJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQudG9TdHJpbmcoKScsXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE1kMkRhdGVwaWNrZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBfb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4geyB9O1xuICBfb25Ub3VjaGVkID0gKCkgPT4geyB9O1xuICBfdmFsaWRhdG9yT25DaGFuZ2UgPSAoKSA9PiB7IH07XG5cbiAgX2lucHV0Rm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgZGF0ZSB0byBvcGVuIHRoZSBjYWxlbmRhciB0byBpbml0aWFsbHkuICovXG4gIEBJbnB1dCgpIHN0YXJ0QXQ6IERhdGU7XG5cbiAgLyoqIFRoZSB2aWV3IHRoYXQgdGhlIGNhbGVuZGFyIHNob3VsZCBzdGFydCBpbi4gKi9cbiAgQElucHV0KCkgc3RhcnRWaWV3OiAnY2xvY2snIHwgJ21vbnRoJyB8ICd5ZWFyJyA9ICdtb250aCc7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGNhbGVuZGFyIFVJIGlzIGluIHRvdWNoIG1vZGUuIEluIHRvdWNoIG1vZGUgdGhlIGNhbGVuZGFyIG9wZW5zIGluIGEgZGlhbG9nIHJhdGhlclxuICAgKiB0aGFuIGEgcG9wdXAgYW5kIGVsZW1lbnRzIGhhdmUgbW9yZSBwYWRkaW5nIHRvIGFsbG93IGZvciBiaWdnZXIgdG91Y2ggdGFyZ2V0cy5cbiAgICovXG4gIEBJbnB1dCgpIHRvdWNoVWkgPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgV2Vlay1udW1iZXIgc2hvdWxkIGJlIGRpc3BsYXllZCAqL1xuICBASW5wdXQoKSBkaXNwbGF5V2VlazogYm9vbGVhbjtcblxuICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgbW9kZTogJ2F1dG8nIHwgJ3BvcnRyYWl0JyB8ICdsYW5kc2NhcGUnID0gJ2F1dG8nO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoKSB0aW1lSW50ZXJ2YWw6IG51bWJlciA9IDE7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgZ2V0IHR5cGUoKSB7IHJldHVybiB0aGlzLl90eXBlOyB9XG4gIHNldCB0eXBlKHZhbHVlOiAnZGF0ZScgfCAndGltZScgfCAnbW9udGgnIHwgJ2RhdGV0aW1lJykge1xuICAgIHRoaXMuX3R5cGUgPSB2YWx1ZSB8fCAnZGF0ZSc7XG4gICAgdGhpcy5faW5wdXRWYWx1ZSA9IHRoaXMuX2Zvcm1hdERhdGUodGhpcy5fdmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3R5cGU6ICdkYXRlJyB8ICd0aW1lJyB8ICdtb250aCcgfCAnZGF0ZXRpbWUnID0gJ2RhdGUnO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBmb3JtYXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1hdCB8fCAodGhpcy50eXBlID09PSAnbW9udGgnID8gJ01NTU0geScgOiB0aGlzLnR5cGUgPT09ICdkYXRlJyA/XG4gICAgICAnZGQvTU0veScgOiB0aGlzLnR5cGUgPT09ICd0aW1lJyA/ICdISDptbScgOiB0aGlzLnR5cGUgPT09ICdkYXRldGltZScgP1xuICAgICAgICAnZGQvTU0veSBISDptbScgOiAnZGQvTU0veScpO1xuICB9XG4gIHNldCBmb3JtYXQodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9mb3JtYXQgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9mb3JtYXQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2lucHV0VmFsdWUgPSB0aGlzLl9mb3JtYXREYXRlKHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfZm9ybWF0OiBzdHJpbmc7XG5cbiAgLyoqIFRoZSBtaW5pbXVtIHZhbGlkIGRhdGUuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtaW4oKTogRGF0ZSB7IHJldHVybiB0aGlzLl9taW5EYXRlOyB9XG4gIHNldCBtaW4odmFsdWU6IERhdGUpIHtcbiAgICB0aGlzLl9taW5EYXRlID0gdmFsdWU7XG4gICAgdGhpcy5fdmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgfVxuICBfbWluRGF0ZTogRGF0ZTtcblxuICAvKiogVGhlIG1heGltdW0gdmFsaWQgZGF0ZS4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG1heCgpOiBEYXRlIHsgcmV0dXJuIHRoaXMuX21heERhdGU7IH1cbiAgc2V0IG1heCh2YWx1ZTogRGF0ZSkge1xuICAgIHRoaXMuX21heERhdGUgPSB2YWx1ZTtcbiAgICB0aGlzLl92YWxpZGF0b3JPbkNoYW5nZSgpO1xuICB9XG4gIF9tYXhEYXRlOiBEYXRlO1xuXG4gIEBJbnB1dCgpIHNldCBkYXRlRmlsdGVyKGZpbHRlcjogKGRhdGU6IERhdGUgfCBudWxsKSA9PiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGF0ZUZpbHRlciA9IGZpbHRlcjtcbiAgICB0aGlzLl92YWxpZGF0b3JPbkNoYW5nZSgpO1xuICB9XG4gIF9kYXRlRmlsdGVyOiAoZGF0ZTogRGF0ZSB8IG51bGwpID0+IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7IH1cbiAgc2V0IHJlcXVpcmVkKHZhbHVlKSB7IHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICBwcml2YXRlIF9yZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZSkgeyB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLl92YWx1ZTsgfVxuICBzZXQgdmFsdWUodmFsdWU6IERhdGUpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMuY29lcmNlRGF0ZVByb3BlcnR5KHZhbHVlKTtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuX3ZhbHVlO1xuICAgIHRoaXMuc3RhcnRBdCA9IHRoaXMuX3ZhbHVlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5faW5wdXRWYWx1ZSA9IHRoaXMuX2Zvcm1hdERhdGUodGhpcy5fdmFsdWUpO1xuICAgIH0pO1xuICB9XG4gIHByaXZhdGUgX3ZhbHVlOiBEYXRlO1xuXG4gIF9pbnB1dFZhbHVlOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICBnZXQgb3Blbk9uRm9jdXMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9vcGVuT25Gb2N1czsgfVxuICBzZXQgb3Blbk9uRm9jdXModmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fb3Blbk9uRm9jdXMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gIHByaXZhdGUgX29wZW5PbkZvY3VzOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBpc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUgJiYgIXRoaXMub3BlbmVkKSB7IHRoaXMub3BlbigpOyB9XG4gIH1cblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3QgaGFzIGJlZW4gb3BlbmVkLiAqL1xuICBAT3V0cHV0KCkgb25PcGVuOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0IGhhcyBiZWVuIGNsb3NlZC4gKi9cbiAgQE91dHB1dCgpIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3RlZCBkYXRlIGhhcyBiZWVuIGNoYW5nZWQgYnkgdGhlIHVzZXIuICovXG4gIEBPdXRwdXQoKSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxNZDJEYXRlQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWQyRGF0ZUNoYW5nZT4oKTtcblxuICAvKiogRW1pdHMgbmV3IHNlbGVjdGVkIGRhdGUgd2hlbiBzZWxlY3RlZCBkYXRlIGNoYW5nZXMuICovXG4gIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KCk7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNhbGVuZGFyIGlzIG9wZW4uICovXG4gIG9wZW5lZCA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXG4gIF9zZWxlY3RlZDogRGF0ZSA9IG51bGw7XG5cbiAgLyoqIEEgcmVmZXJlbmNlIHRvIHRoZSBvdmVybGF5IHdoZW4gdGhlIGNhbGVuZGFyIGlzIG9wZW5lZCBhcyBhIHBvcHVwLiAqL1xuICBwcml2YXRlIF9wb3B1cFJlZjogT3ZlcmxheVJlZjtcblxuICAvKiogQSByZWZlcmVuY2UgdG8gdGhlIG92ZXJsYXkgd2hlbiB0aGUgY2FsZW5kYXIgaXMgb3BlbmVkIGFzIGEgZGlhbG9nLiAqL1xuICBwcml2YXRlIF9kaWFsb2dSZWY6IE92ZXJsYXlSZWY7XG5cbiAgLyoqIEEgcG9ydGFsIGNvbnRhaW5pbmcgdGhlIGNhbGVuZGFyIGZvciB0aGlzIGRhdGVwaWNrZXIuICovXG4gIHByaXZhdGUgX2NhbGVuZGFyUG9ydGFsOiBDb21wb25lbnRQb3J0YWw8TWQyRGF0ZXBpY2tlckNvbnRlbnQ+O1xuXG4gIHByaXZhdGUgX2lucHV0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgbWluIGRhdGUuICovXG4gIHByaXZhdGUgX21pblZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgIHJldHVybiAoIXRoaXMubWluIHx8ICFjb250cm9sLnZhbHVlIHx8XG4gICAgICB0aGlzLl91dGlsLmNvbXBhcmVEYXRlKHRoaXMubWluLCBjb250cm9sLnZhbHVlKSA8PSAwKSA/XG4gICAgICBudWxsIDogeyAnbWQyRGF0ZXBpY2tlck1pbic6IHsgJ21pbic6IHRoaXMubWluLCAnYWN0dWFsJzogY29udHJvbC52YWx1ZSB9IH07XG4gIH1cblxuICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSBtYXggZGF0ZS4gKi9cbiAgcHJpdmF0ZSBfbWF4VmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgcmV0dXJuICghdGhpcy5tYXggfHwgIWNvbnRyb2wudmFsdWUgfHxcbiAgICAgIHRoaXMuX3V0aWwuY29tcGFyZURhdGUodGhpcy5tYXgsIGNvbnRyb2wudmFsdWUpID49IDApID9cbiAgICAgIG51bGwgOiB7ICdtZDJEYXRlcGlja2VyTWF4JzogeyAnbWF4JzogdGhpcy5tYXgsICdhY3R1YWwnOiBjb250cm9sLnZhbHVlIH0gfTtcbiAgfVxuXG4gIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhlIGRhdGUgZmlsdGVyLiAqL1xuICBwcml2YXRlIF9maWx0ZXJWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICByZXR1cm4gIXRoaXMuX2RhdGVGaWx0ZXIgfHwgIWNvbnRyb2wudmFsdWUgfHwgdGhpcy5fZGF0ZUZpbHRlcihjb250cm9sLnZhbHVlKSA/XG4gICAgICBudWxsIDogeyAnbWQyRGF0ZXBpY2tlckZpbHRlcic6IHRydWUgfTtcbiAgfVxuXG4gIC8qKiBUaGUgY29tYmluZWQgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhpcyBpbnB1dC4gKi9cbiAgcHJpdmF0ZSBfdmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9XG4gIFZhbGlkYXRvcnMuY29tcG9zZShbdGhpcy5fbWluVmFsaWRhdG9yLCB0aGlzLl9tYXhWYWxpZGF0b3IsIHRoaXMuX2ZpbHRlclZhbGlkYXRvcl0pO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSxcbiAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgX2xvY2FsZTogRGF0ZUxvY2FsZSxcbiAgICBwcml2YXRlIF91dGlsOiBEYXRlVXRpbCxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcikge1xuICAgIHRoaXMuaWQgPSAodGhpcy5pZCkgPyB0aGlzLmlkIDogYG1kMi1kYXRlcGlja2VyLSR7ZGF0ZXBpY2tlclVpZCsrfWA7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgaWYgKHRoaXMuX3BvcHVwUmVmKSB7XG4gICAgICB0aGlzLl9wb3B1cFJlZi5kaXNwb3NlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9kaWFsb2dSZWYpIHtcbiAgICAgIHRoaXMuX2RpYWxvZ1JlZi5kaXNwb3NlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9pbnB1dFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5faW5wdXRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fdmFsaWRhdG9yT25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsaWRhdG9yID8gdGhpcy5fdmFsaWRhdG9yKGMpIDogbnVsbDtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7IHRoaXMuX29uQ2hhbmdlID0gZm47IH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pOiB2b2lkIHsgdGhpcy5fb25Ub3VjaGVkID0gZm47IH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxuXG4gIF9oYW5kbGVGb2N1cygpIHtcbiAgICB0aGlzLl9pbnB1dEZvY3VzZWQgPSB0cnVlO1xuICAgIGlmICghdGhpcy5vcGVuZWQgJiYgdGhpcy5vcGVuT25Gb2N1cykge1xuICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUJsdXIoZXZlbnQ6IEV2ZW50KSB7XG4gICAgdGhpcy5faW5wdXRGb2N1c2VkID0gZmFsc2U7XG4gICAgaWYgKCF0aGlzLm9wZW5lZCkge1xuICAgICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gICAgfVxuICAgIGxldCBlbDogYW55ID0gZXZlbnQudGFyZ2V0O1xuICAgIGxldCBkYXRlOiBEYXRlID0gdGhpcy5fdXRpbC5wYXJzZURhdGUoZWwudmFsdWUsIHRoaXMuZm9ybWF0KTtcbiAgICBpZiAoIWRhdGUpIHtcbiAgICAgIGRhdGUgPSB0aGlzLl91dGlsLnBhcnNlKGVsLnZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGRhdGUgIT0gbnVsbCAmJiBkYXRlLmdldFRpbWUgJiYgIWlzTmFOKGRhdGUuZ2V0VGltZSgpKSkge1xuXG4gICAgICBsZXQgZDogRGF0ZSA9IG5ldyBEYXRlKHRoaXMudmFsdWUpO1xuICAgICAgaWYgKHRoaXMudHlwZSAhPT0gJ3RpbWUnKSB7XG4gICAgICAgIGQuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnR5cGUgIT09ICdkYXRlJykge1xuICAgICAgICBkLnNldEhvdXJzKGRhdGUuZ2V0SG91cnMoKSwgZGF0ZS5nZXRNaW51dGVzKCkpO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLl91dGlsLmlzU2FtZU1pbnV0ZSh0aGlzLnZhbHVlLCBkKSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5fdXRpbC5jcmVhdGVEYXRlKGQuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICBkLmdldE1vbnRoKCksXG4gICAgICAgICAgZC5nZXREYXRlKCksXG4gICAgICAgICAgZC5nZXRIb3VycygpLFxuICAgICAgICAgIGQuZ2V0TWludXRlcygpLFxuICAgICAgICAgIGQuZ2V0U2Vjb25kcygpKTtcbiAgICAgICAgdGhpcy5fZW1pdENoYW5nZUV2ZW50KCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLl9lbWl0Q2hhbmdlRXZlbnQoKTtcbiAgICAgIH1cbiAgICAgIGVsLnZhbHVlID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNvZXJjZURhdGVQcm9wZXJ0eSh2YWx1ZTogYW55KTogRGF0ZSB7XG4gICAgbGV0IHY6IERhdGUgPSBudWxsO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsICYmIHZhbHVlLmdldFRpbWUgJiYgIWlzTmFOKHZhbHVlLmdldFRpbWUoKSkpIHtcbiAgICAgIHYgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHZhbHVlICYmIHRoaXMudHlwZSA9PT0gJ3RpbWUnKSB7XG4gICAgICAgIGxldCB0ID0gdmFsdWUgKyAnJztcbiAgICAgICAgdiA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHYuc2V0SG91cnMocGFyc2VJbnQodC5zdWJzdHJpbmcoMCwgMikpKTtcbiAgICAgICAgdi5zZXRNaW51dGVzKHBhcnNlSW50KHQuc3Vic3RyaW5nKDMsIDUpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdGltZXN0YW1wID0gRGF0ZS5wYXJzZSh2YWx1ZSk7XG4gICAgICAgIHYgPSBpc05hTih0aW1lc3RhbXApID8gbnVsbCA6IG5ldyBEYXRlKHRpbWVzdGFtcCk7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBkOiBEYXRlID0gdiA/IHRoaXMuX3V0aWwuY3JlYXRlRGF0ZSh2LmdldEZ1bGxZZWFyKCksXG4gICAgICB2LmdldE1vbnRoKCksXG4gICAgICB2LmdldERhdGUoKSxcbiAgICAgIHYuZ2V0SG91cnMoKSxcbiAgICAgIHYuZ2V0TWludXRlcygpLFxuICAgICAgdi5nZXRTZWNvbmRzKCkpIDogbnVsbDtcbiAgICByZXR1cm4gZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBmb3JtYXQgZGF0ZVxuICAgKiBAcGFyYW0gZGF0ZSBEYXRlIE9iamVjdFxuICAgKiBAcmV0dXJuIHN0cmluZyB3aXRoIGZvcm1hdHRlZCBkYXRlXG4gICAqL1xuICBwcml2YXRlIF9mb3JtYXREYXRlKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5mb3JtYXQgfHwgIWRhdGUpIHsgcmV0dXJuICcnOyB9XG5cbiAgICBsZXQgZm9ybWF0ID0gdGhpcy5mb3JtYXQ7XG5cbiAgICAvKiBZZWFycyAqL1xuICAgIGlmIChmb3JtYXQuaW5kZXhPZigneXknKSA+IC0xKSB7XG4gICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgneXknLCAoJzAwJyArIHRoaXMuX3V0aWwuZ2V0WWVhcihkYXRlKSkuc2xpY2UoLTIpKTtcbiAgICB9IGVsc2UgaWYgKGZvcm1hdC5pbmRleE9mKCd5JykgPiAtMSkge1xuICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoJ3knLCAnJyArIHRoaXMuX3V0aWwuZ2V0WWVhcihkYXRlKSk7XG4gICAgfVxuXG4gICAgLyogRGF5cyAqL1xuICAgIGlmIChmb3JtYXQuaW5kZXhPZignZGQnKSA+IC0xKSB7XG4gICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgnZGQnLCAoJzAnICsgdGhpcy5fdXRpbC5nZXREYXRlKGRhdGUpKS5zbGljZSgtMikpO1xuICAgIH0gZWxzZSBpZiAoZm9ybWF0LmluZGV4T2YoJ2QnKSA+IC0xKSB7XG4gICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgnZCcsICcnICsgdGhpcy5fdXRpbC5nZXREYXRlKGRhdGUpKTtcbiAgICB9XG5cbiAgICAvKiBIb3VycyAqL1xuICAgIGlmICgvW2FBXS8udGVzdChmb3JtYXQpKSB7XG4gICAgICAvKiAxMi1ob3VyICovXG4gICAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ0hIJykgPiAtMSkge1xuICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgnSEgnLFxuICAgICAgICAgICgnMCcgKyB0aGlzLl9nZXRIb3VyczEyKHRoaXMuX3V0aWwuZ2V0SG91cnMoZGF0ZSkpKS5zbGljZSgtMikpO1xuICAgICAgfSBlbHNlIGlmIChmb3JtYXQuaW5kZXhPZignSCcpID4gLTEpIHtcbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoJ0gnLFxuICAgICAgICAgICcnICsgdGhpcy5fZ2V0SG91cnMxMih0aGlzLl91dGlsLmdldEhvdXJzKGRhdGUpKSk7XG4gICAgICB9XG4gICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgnQScsICgodGhpcy5fdXRpbC5nZXRIb3VycyhkYXRlKSA8IDEyKSA/ICdBTScgOiAnUE0nKSlcbiAgICAgICAgLnJlcGxhY2UoJ2EnLCAoKHRoaXMuX3V0aWwuZ2V0SG91cnMoZGF0ZSkgPCAxMikgPyAnYW0nIDogJ3BtJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvKiAyNC1ob3VyICovXG4gICAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ0hIJykgPiAtMSkge1xuICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgnSEgnLCAoJzAnICsgdGhpcy5fdXRpbC5nZXRIb3VycyhkYXRlKSkuc2xpY2UoLTIpKTtcbiAgICAgIH0gZWxzZSBpZiAoZm9ybWF0LmluZGV4T2YoJ0gnKSA+IC0xKSB7XG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCdIJywgJycgKyB0aGlzLl91dGlsLmdldEhvdXJzKGRhdGUpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBNaW51dGVzICovXG4gICAgaWYgKGZvcm1hdC5pbmRleE9mKCdtbScpID4gLTEpIHtcbiAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCdtbScsICgnMCcgKyB0aGlzLl91dGlsLmdldE1pbnV0ZXMoZGF0ZSkpLnNsaWNlKC0yKSk7XG4gICAgfSBlbHNlIGlmIChmb3JtYXQuaW5kZXhPZignbScpID4gLTEpIHtcbiAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCdtJywgJycgKyB0aGlzLl91dGlsLmdldE1pbnV0ZXMoZGF0ZSkpO1xuICAgIH1cblxuICAgIC8qIFNlY29uZHMgKi9cbiAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ3NzJykgPiAtMSkge1xuICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoJ3NzJywgKCcwJyArIHRoaXMuX3V0aWwuZ2V0U2Vjb25kcyhkYXRlKSkuc2xpY2UoLTIpKTtcbiAgICB9IGVsc2UgaWYgKGZvcm1hdC5pbmRleE9mKCdzJykgPiAtMSkge1xuICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoJ3MnLCAnJyArIHRoaXMuX3V0aWwuZ2V0U2Vjb25kcyhkYXRlKSk7XG4gICAgfVxuXG4gICAgLyogTW9udGhzICovXG4gICAgaWYgKGZvcm1hdC5pbmRleE9mKCdNTU1NJykgPiAtMSkge1xuICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoJ01NTU0nLFxuICAgICAgICB0aGlzLl9sb2NhbGUuZ2V0TW9udGhOYW1lcygnbG9uZycpW3RoaXMuX3V0aWwuZ2V0TW9udGgoZGF0ZSldKTtcbiAgICB9IGVsc2UgaWYgKGZvcm1hdC5pbmRleE9mKCdNTU0nKSA+IC0xKSB7XG4gICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgnTU1NJyxcbiAgICAgICAgdGhpcy5fbG9jYWxlLmdldE1vbnRoTmFtZXMoJ3Nob3J0JylbdGhpcy5fdXRpbC5nZXRNb250aChkYXRlKV0pO1xuICAgIH0gZWxzZSBpZiAoZm9ybWF0LmluZGV4T2YoJ01NJykgPiAtMSkge1xuICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoJ01NJywgKCcwJyArICh0aGlzLl91dGlsLmdldE1vbnRoKGRhdGUpICsgMSkpLnNsaWNlKC0yKSk7XG4gICAgfSBlbHNlIGlmIChmb3JtYXQuaW5kZXhPZignTScpID4gLTEpIHtcbiAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCdNJywgJycgKyAodGhpcy5fdXRpbC5nZXRNb250aChkYXRlKSArIDEpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm9ybWF0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbiBob3VyIG9mIHRoZSBkYXRlIGluIHRoZSAxMi1ob3VyIGZvcm1hdFxuICAgKiBAcGFyYW0gZGF0ZSBEYXRlIE9iamVjdFxuICAgKiBAcmV0dXJuIGhvdXIgb2YgdGhlIGRhdGUgaW4gdGhlIDEyLWhvdXIgZm9ybWF0XG4gICAqL1xuICBwcml2YXRlIF9nZXRIb3VyczEyKGhvdXJzOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmIChob3VycyA9PSAwKSB7XG4gICAgICBob3VycyA9IDEyO1xuICAgIH0gZWxzZSBpZiAoaG91cnMgPiAxMikge1xuICAgICAgaG91cnMgLT0gMTI7XG4gICAgfVxuICAgIHJldHVybiBob3VycztcbiAgfVxuXG4gIC8qKiBTZWxlY3RzIHRoZSBnaXZlbiBkYXRlIGFuZCBjbG9zZXMgdGhlIGN1cnJlbnRseSBvcGVuIHBvcHVwIG9yIGRpYWxvZy4gKi9cbiAgX3NlbGVjdEFuZENsb3NlKGRhdGU6IERhdGUpOiB2b2lkIHtcbiAgICBsZXQgb2xkVmFsdWUgPSB0aGlzLl9zZWxlY3RlZDtcbiAgICB0aGlzLnZhbHVlID0gZGF0ZTtcbiAgICBpZiAoIXRoaXMuX3V0aWwuc2FtZURhdGVBbmRUaW1lKG9sZFZhbHVlLCB0aGlzLl9zZWxlY3RlZCkpIHtcbiAgICAgIHRoaXMuX2VtaXRDaGFuZ2VFdmVudCgpO1xuICAgIH1cbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICAvKiogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgdXNlciBzZWxlY3RzIGEgZGF0ZS4gKi9cbiAgX2VtaXRDaGFuZ2VFdmVudCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KG5ldyBNZDJEYXRlQ2hhbmdlKHRoaXMsIHRoaXMudmFsdWUpKTtcbiAgfVxuXG4gIC8qKiBPcGVuIHRoZSBjYWxlbmRhci4gKi9cbiAgb3BlbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcGVuZWQpIHsgcmV0dXJuOyB9XG5cbiAgICBpZiAoIXRoaXMuX2NhbGVuZGFyUG9ydGFsKSB7XG4gICAgICB0aGlzLl9jYWxlbmRhclBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoTWQyRGF0ZXBpY2tlckNvbnRlbnQsIHRoaXMuX3ZpZXdDb250YWluZXJSZWYpO1xuICAgIH1cblxuICAgIHRoaXMudG91Y2hVaSA/IHRoaXMuX29wZW5Bc0RpYWxvZygpIDogdGhpcy5fb3BlbkFzUG9wdXAoKTtcbiAgICB0aGlzLm9wZW5lZCA9IHRydWU7XG4gICAgdGhpcy5vbk9wZW4uZW1pdCgpO1xuICB9XG5cbiAgLyoqIENsb3NlIHRoZSBjYWxlbmRhci4gKi9cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm9wZW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fcG9wdXBSZWYgJiYgdGhpcy5fcG9wdXBSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgdGhpcy5fcG9wdXBSZWYuZGV0YWNoKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9kaWFsb2dSZWYgJiYgdGhpcy5fZGlhbG9nUmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgIHRoaXMuX2RpYWxvZ1JlZi5kZXRhY2goKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2NhbGVuZGFyUG9ydGFsICYmIHRoaXMuX2NhbGVuZGFyUG9ydGFsLmlzQXR0YWNoZWQpIHtcbiAgICAgIHRoaXMuX2NhbGVuZGFyUG9ydGFsLmRldGFjaCgpO1xuICAgIH1cbiAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgIHRoaXMub25DbG9zZS5lbWl0KCk7XG4gIH1cblxuICAvKiogT3BlbiB0aGUgY2FsZW5kYXIgYXMgYSBkaWFsb2cuICovXG4gIHByaXZhdGUgX29wZW5Bc0RpYWxvZygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2RpYWxvZ1JlZikge1xuICAgICAgdGhpcy5fY3JlYXRlRGlhbG9nKCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9kaWFsb2dSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgbGV0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPE1kMkRhdGVwaWNrZXJDb250ZW50PiA9XG4gICAgICAgIHRoaXMuX2RpYWxvZ1JlZi5hdHRhY2godGhpcy5fY2FsZW5kYXJQb3J0YWwpO1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmRhdGVwaWNrZXIgPSB0aGlzO1xuICAgIH1cblxuICAgIHRoaXMuX2RpYWxvZ1JlZi5iYWNrZHJvcENsaWNrKCkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gIH1cblxuICAvKiogT3BlbiB0aGUgY2FsZW5kYXIgYXMgYSBwb3B1cC4gKi9cbiAgcHJpdmF0ZSBfb3BlbkFzUG9wdXAoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9wb3B1cFJlZikge1xuICAgICAgdGhpcy5fY3JlYXRlUG9wdXAoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX3BvcHVwUmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgIGxldCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxNZDJEYXRlcGlja2VyQ29udGVudD4gPVxuICAgICAgICB0aGlzLl9wb3B1cFJlZi5hdHRhY2godGhpcy5fY2FsZW5kYXJQb3J0YWwpO1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmRhdGVwaWNrZXIgPSB0aGlzO1xuXG4gICAgICAvKiBVcGRhdGUgdGhlIHBvc2l0aW9uIG9uY2UgdGhlIGNhbGVuZGFyIGhhcyByZW5kZXJlZC4gKi9cbiAgICAgIHRoaXMuX25nWm9uZS5vblN0YWJsZS5waXBlKGZpcnN0KCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9wb3B1cFJlZi51cGRhdGVQb3NpdGlvbigpKTtcbiAgICB9XG5cbiAgICB0aGlzLl9wb3B1cFJlZi5iYWNrZHJvcENsaWNrKCkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gIH1cblxuICAvKiogQ3JlYXRlIHRoZSBkaWFsb2cuICovXG4gIHByaXZhdGUgX2NyZWF0ZURpYWxvZygpOiB2b2lkIHtcbiAgICBjb25zdCBvdmVybGF5U3RhdGUgPSBuZXcgT3ZlcmxheVN0YXRlKCk7XG4gICAgb3ZlcmxheVN0YXRlLnBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLl9vdmVybGF5LnBvc2l0aW9uKCkuZ2xvYmFsKClcbiAgICAgIC5jZW50ZXJIb3Jpem9udGFsbHkoKVxuICAgICAgLmNlbnRlclZlcnRpY2FsbHkoKTtcbiAgICBvdmVybGF5U3RhdGUuaGFzQmFja2Ryb3AgPSB0cnVlO1xuICAgIG92ZXJsYXlTdGF0ZS5iYWNrZHJvcENsYXNzID0gJ2Nkay1vdmVybGF5LWRhcmstYmFja2Ryb3AnO1xuICAgIG92ZXJsYXlTdGF0ZS5kaXJlY3Rpb24gPSB0aGlzLl9kaXIgPyB0aGlzLl9kaXIudmFsdWUgOiAnbHRyJztcbiAgICB0aGlzLl9kaWFsb2dSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZShvdmVybGF5U3RhdGUpO1xuICB9XG5cbiAgLyoqIENyZWF0ZSB0aGUgcG9wdXAuICovXG4gIHByaXZhdGUgX2NyZWF0ZVBvcHVwKCk6IHZvaWQge1xuICAgIGNvbnN0IG92ZXJsYXlTdGF0ZSA9IG5ldyBPdmVybGF5U3RhdGUoKTtcbiAgICBvdmVybGF5U3RhdGUucG9zaXRpb25TdHJhdGVneSA9IHRoaXMuX2NyZWF0ZVBvcHVwUG9zaXRpb25TdHJhdGVneSgpO1xuICAgIG92ZXJsYXlTdGF0ZS5oYXNCYWNrZHJvcCA9IHRydWU7XG4gICAgb3ZlcmxheVN0YXRlLmJhY2tkcm9wQ2xhc3MgPSAnY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnO1xuICAgIG92ZXJsYXlTdGF0ZS5kaXJlY3Rpb24gPSB0aGlzLl9kaXIgPyB0aGlzLl9kaXIudmFsdWUgOiAnbHRyJztcbiAgICBvdmVybGF5U3RhdGUuc2Nyb2xsU3RyYXRlZ3kgPSB0aGlzLl9vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbigpO1xuXG4gICAgdGhpcy5fcG9wdXBSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZShvdmVybGF5U3RhdGUpO1xuICB9XG5cbiAgLyoqIENyZWF0ZSB0aGUgcG9wdXAgUG9zaXRpb25TdHJhdGVneS4gKi9cbiAgcHJpdmF0ZSBfY3JlYXRlUG9wdXBQb3NpdGlvblN0cmF0ZWd5KCk6IFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgIHJldHVybiB0aGlzLl9vdmVybGF5LnBvc2l0aW9uKClcbiAgICAgIC5jb25uZWN0ZWRUbyh0aGlzLl9lbGVtZW50LFxuICAgICAgeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnYm90dG9tJyB9LFxuICAgICAgeyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICd0b3AnIH0pXG4gICAgICAud2l0aEZhbGxiYWNrUG9zaXRpb24oXG4gICAgICB7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICd0b3AnIH0sXG4gICAgICB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2JvdHRvbScgfSlcbiAgICAgIC53aXRoRmFsbGJhY2tQb3NpdGlvbihcbiAgICAgIHsgb3JpZ2luWDogJ2VuZCcsIG9yaWdpblk6ICdib3R0b20nIH0sXG4gICAgICB7IG92ZXJsYXlYOiAnZW5kJywgb3ZlcmxheVk6ICd0b3AnIH0pXG4gICAgICAud2l0aEZhbGxiYWNrUG9zaXRpb24oXG4gICAgICB7IG9yaWdpblg6ICdlbmQnLCBvcmlnaW5ZOiAndG9wJyB9LFxuICAgICAgeyBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAnYm90dG9tJyB9KTtcbiAgfVxufVxuIl19