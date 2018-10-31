/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { 
// ChangeDetectionStrategy,
Component, ElementRef, EventEmitter, Input, Output, } from '@angular/core';
import { DateUtil } from './date-util';
import { DateLocale } from './date-locale';
/** @type {?} */
export var CLOCK_RADIUS = 50;
/** @type {?} */
export var CLOCK_INNER_RADIUS = 27.5;
/** @type {?} */
export var CLOCK_OUTER_RADIUS = 41.25;
/** @type {?} */
export var CLOCK_TICK_RADIUS = 7.0833;
/** @typedef {?} */
var ClockView;
export { ClockView };
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
        var trigger = this._element.nativeElement;
        /** @type {?} */
        var triggerRect = trigger.getBoundingClientRect();
        /** @type {?} */
        var width = trigger.offsetWidth;
        /** @type {?} */
        var height = trigger.offsetHeight;
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
export { Md2Clock };
if (false) {
    /** @type {?} */
    Md2Clock.prototype._activeDate;
    /** @type {?} */
    Md2Clock.prototype._selected;
    /** @type {?} */
    Md2Clock.prototype._min;
    /** @type {?} */
    Md2Clock.prototype._max;
    /**
     * A function used to filter which dates are selectable.
     * @type {?}
     */
    Md2Clock.prototype.dateFilter;
    /** @type {?} */
    Md2Clock.prototype.interval;
    /** @type {?} */
    Md2Clock.prototype.twelvehour;
    /**
     * Emits when the currently selected date changes.
     * @type {?}
     */
    Md2Clock.prototype.selectedChange;
    /** @type {?} */
    Md2Clock.prototype.activeDateChange;
    /**
     * Hours and Minutes representing the clock view.
     * @type {?}
     */
    Md2Clock.prototype._hours;
    /** @type {?} */
    Md2Clock.prototype._minutes;
    /**
     * Whether the clock is in hour view.
     * @type {?}
     */
    Md2Clock.prototype._hourView;
    /** @type {?} */
    Md2Clock.prototype._selectedHour;
    /** @type {?} */
    Md2Clock.prototype._selectedMinute;
    /** @type {?} */
    Md2Clock.prototype.mouseMoveListener;
    /** @type {?} */
    Md2Clock.prototype.mouseUpListener;
    /** @type {?} */
    Md2Clock.prototype._element;
    /** @type {?} */
    Md2Clock.prototype._locale;
    /** @type {?} */
    Md2Clock.prototype._util;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvY2suanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9kYXRlcGlja2VyL2Nsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPO0FBRUwsMkJBQTJCO0FBQzNCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQyxXQUFhLFlBQVksR0FBRyxFQUFFLENBQUM7O0FBQy9CLFdBQWEsa0JBQWtCLEdBQUcsSUFBSSxDQUFDOztBQUN2QyxXQUFhLGtCQUFrQixHQUFHLEtBQUssQ0FBQzs7QUFDeEMsV0FBYSxpQkFBaUIsR0FBRyxNQUFNLENBQUM7Ozs7Ozs7OztJQTZHdEMsa0JBQW9CLFFBQW9CLEVBQzlCLFNBQTZCLEtBQWU7UUFEdEQsaUJBSUM7UUFKbUIsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUM5QixZQUFPLEdBQVAsT0FBTztRQUFzQixVQUFLLEdBQUwsS0FBSyxDQUFVO3dCQTdDMUIsQ0FBQzswQkFFRSxLQUFLOzs7OzhCQUdULElBQUksWUFBWSxFQUFRO2dDQUV0QixJQUFJLFlBQVksRUFBUTs7OztzQkFHN0IsRUFBRTt3QkFDQSxFQUFFOzs7O3lCQUdQLElBQUk7UUFnQ3ZCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxVQUFDLEtBQVUsSUFBTyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzNFLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBUSxLQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxDQUFDO0tBQ3pEO0lBekZELHNCQUNJLGdDQUFVO1FBSmQ7O1dBRUc7Ozs7O1FBQ0gsY0FDeUIsT0FBTyxJQUFJLENBQUMs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QUM7OztnQkF0Ty9DLFNBQVMsU0FBQztvQkFFVCxRQUFRLEVBQUUsV0FBVztvQkFDckIseTlCQUF5QjtvQkFFekIsSUFBSSxFQUFFO3dCQUNKLE1BQU0sRUFBRSxPQUFPO3dCQUNmLGFBQWEsRUFBRSwwQkFBMEI7cUJBQzFDOztpQkFHRjs7OztnQkEvQkMsVUFBVTtnQkFPSCxVQUFVO2dCQURWLFFBQVE7Ozs2QkE4QmQsS0FBSzsyQkFZTCxLQUFLO3NCQVNMLEtBQUs7c0JBTUwsS0FBSzs0QkFNTCxLQUFLOzZCQU1MLEtBQUs7MkJBRUwsS0FBSzs2QkFFTCxLQUFLO2lDQUdMLE1BQU07bUNBRU4sTUFBTTs7bUJBeEZUOztTQW9DYSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgLy8gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICAvLyBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVVdGlsIH0gZnJvbSAnLi9kYXRlLXV0aWwnO1xuaW1wb3J0IHsgRGF0ZUxvY2FsZSB9IGZyb20gJy4vZGF0ZS1sb2NhbGUnO1xuXG5leHBvcnQgY29uc3QgQ0xPQ0tfUkFESVVTID0gNTA7XG5leHBvcnQgY29uc3QgQ0xPQ0tfSU5ORVJfUkFESVVTID0gMjcuNTtcbmV4cG9ydCBjb25zdCBDTE9DS19PVVRFUl9SQURJVVMgPSA0MS4yNTtcbmV4cG9ydCBjb25zdCBDTE9DS19USUNLX1JBRElVUyA9IDcuMDgzMztcblxuZXhwb3J0IHR5cGUgQ2xvY2tWaWV3ID0gJ2hvdXInIHwgJ21pbnV0ZSc7XG5cbi8qKlxuICogQSBjbG9jayB0aGF0IGlzIHVzZWQgYXMgcGFydCBvZiB0aGUgZGF0ZXBpY2tlci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gIFxuICBzZWxlY3RvcjogJ21kMi1jbG9jaycsXG4gIHRlbXBsYXRlVXJsOiAnY2xvY2suaHRtbCcsXG4gIHN0eWxlVXJsczogWydjbG9jay5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAncm9sZSc6ICdjbG9jaycsXG4gICAgJyhtb3VzZWRvd24pJzogJ19oYW5kbGVNb3VzZWRvd24oJGV2ZW50KScsXG4gIH0sXG4gIC8vIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIC8vIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNZDJDbG9jayBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAvKipcbiAgICogVGhlIGRhdGUgdG8gZGlzcGxheSBpbiB0aGlzIGNsb2NrIHZpZXcuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgYWN0aXZlRGF0ZSgpOiBEYXRlIHsgcmV0dXJuIHRoaXMuX2FjdGl2ZURhdGU7IH1cbiAgc2V0IGFjdGl2ZURhdGUodmFsdWU6IERhdGUpIHtcbiAgICBsZXQgb2xkQWN0aXZlRGF0ZSA9IHRoaXMuX2FjdGl2ZURhdGU7XG4gICAgdGhpcy5fYWN0aXZlRGF0ZSA9IHRoaXMuX3V0aWwuY2xhbXBEYXRlKHZhbHVlLCB0aGlzLm1pbiwgdGhpcy5tYXgpO1xuICAgIGlmICghdGhpcy5fdXRpbC5pc1NhbWVNaW51dGUob2xkQWN0aXZlRGF0ZSwgdGhpcy5fYWN0aXZlRGF0ZSkpIHtcbiAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfYWN0aXZlRGF0ZTogRGF0ZTtcblxuICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0ZWQoKTogRGF0ZSB7IHJldHVybiB0aGlzLl9zZWxlY3RlZDsgfVxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IERhdGUpIHtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuX3V0aWwucGFyc2UodmFsdWUpO1xuICAgIGlmICh0aGlzLl9zZWxlY3RlZCkgeyB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLl9zZWxlY3RlZDsgfVxuICB9XG4gIHByaXZhdGUgX3NlbGVjdGVkOiBEYXRlO1xuXG4gIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtaW4oKTogRGF0ZSB7IHJldHVybiB0aGlzLl9taW47IH1cbiAgc2V0IG1pbihkYXRlOiBEYXRlKSB7IHRoaXMuX21pbiA9IHRoaXMuX3V0aWwucGFyc2UoZGF0ZSk7IH1cbiAgcHJpdmF0ZSBfbWluOiBEYXRlO1xuXG4gIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtYXgoKTogRGF0ZSB7IHJldHVybiB0aGlzLl9tYXg7IH1cbiAgc2V0IG1heChkYXRlOiBEYXRlKSB7IHRoaXMuX21heCA9IHRoaXMuX3V0aWwucGFyc2UoZGF0ZSk7IH1cbiAgcHJpdmF0ZSBfbWF4OiBEYXRlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjbG9jayBzaG91bGQgYmUgc3RhcnRlZCBpbiBob3VyIG9yIG1pbnV0ZSB2aWV3LiAqL1xuICBASW5wdXQoKVxuICBzZXQgc3RhcnRWaWV3KHZhbHVlOiBDbG9ja1ZpZXcpIHtcbiAgICB0aGlzLl9ob3VyVmlldyA9IHZhbHVlICE9ICdtaW51dGUnO1xuICB9XG5cbiAgLyoqIEEgZnVuY3Rpb24gdXNlZCB0byBmaWx0ZXIgd2hpY2ggZGF0ZXMgYXJlIHNlbGVjdGFibGUuICovXG4gIEBJbnB1dCgpIGRhdGVGaWx0ZXI6IChkYXRlOiBEYXRlKSA9PiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGludGVydmFsOiBudW1iZXIgPSAxO1xuXG4gIEBJbnB1dCgpIHR3ZWx2ZWhvdXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogRW1pdHMgd2hlbiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUgY2hhbmdlcy4gKi9cbiAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPigpO1xuXG4gIEBPdXRwdXQoKSBhY3RpdmVEYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPigpO1xuXG4gIC8qKiBIb3VycyBhbmQgTWludXRlcyByZXByZXNlbnRpbmcgdGhlIGNsb2NrIHZpZXcuICovXG4gIF9ob3VyczogQXJyYXk8T2JqZWN0PiA9IFtdO1xuICBfbWludXRlczogQXJyYXk8T2JqZWN0PiA9IFtdO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjbG9jayBpcyBpbiBob3VyIHZpZXcuICovXG4gIF9ob3VyVmlldzogYm9vbGVhbiA9IHRydWU7XG5cbiAgX3NlbGVjdGVkSG91cjogbnVtYmVyO1xuICBfc2VsZWN0ZWRNaW51dGU6IG51bWJlcjtcblxuICBnZXQgX2hhbmQoKTogYW55IHtcbiAgICB0aGlzLl9zZWxlY3RlZEhvdXIgPSB0aGlzLl91dGlsLmdldEhvdXJzKHRoaXMuYWN0aXZlRGF0ZSk7XG4gICAgdGhpcy5fc2VsZWN0ZWRNaW51dGUgPSB0aGlzLl91dGlsLmdldE1pbnV0ZXModGhpcy5hY3RpdmVEYXRlKTtcbiAgICBsZXQgZGVnID0gMDtcbiAgICBsZXQgcmFkaXVzID0gQ0xPQ0tfT1VURVJfUkFESVVTO1xuICAgIGlmICh0aGlzLl9ob3VyVmlldykge1xuICAgICAgbGV0IG91dGVyID0gdGhpcy5hY3RpdmVEYXRlLmdldEhvdXJzKCkgPiAwICYmIHRoaXMuYWN0aXZlRGF0ZS5nZXRIb3VycygpIDwgMTM7XG4gICAgICByYWRpdXMgPSBvdXRlciA/IENMT0NLX09VVEVSX1JBRElVUyA6IENMT0NLX0lOTkVSX1JBRElVUztcbiAgICAgIGlmICh0aGlzLnR3ZWx2ZWhvdXIpIHtcbiAgICAgICAgcmFkaXVzID0gQ0xPQ0tfT1VURVJfUkFESVVTO1xuICAgICAgfVxuICAgICAgZGVnID0gTWF0aC5yb3VuZCh0aGlzLmFjdGl2ZURhdGUuZ2V0SG91cnMoKSAqICgzNjAgLyAoMjQgLyAyKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWcgPSBNYXRoLnJvdW5kKHRoaXMuYWN0aXZlRGF0ZS5nZXRNaW51dGVzKCkgKiAoMzYwIC8gNjApKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICd0cmFuc2Zvcm0nOiBgcm90YXRlKCR7ZGVnfWRlZylgLFxuICAgICAgJ2hlaWdodCc6IGAke3JhZGl1c30lYCxcbiAgICAgICdtYXJnaW4tdG9wJzogYCR7NTAgLSByYWRpdXN9JWBcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBtb3VzZU1vdmVMaXN0ZW5lcjogYW55O1xuICBwcml2YXRlIG1vdXNlVXBMaXN0ZW5lcjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfbG9jYWxlOiBEYXRlTG9jYWxlLCBwcml2YXRlIF91dGlsOiBEYXRlVXRpbCkge1xuICAgIHRoaXMubW91c2VNb3ZlTGlzdGVuZXIgPSAoZXZlbnQ6IGFueSkgPT4geyB0aGlzLl9oYW5kbGVNb3VzZW1vdmUoZXZlbnQpOyB9O1xuICAgIHRoaXMubW91c2VVcExpc3RlbmVyID0gKCkgPT4geyB0aGlzLl9oYW5kbGVNb3VzZXVwKCk7IH07XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5fYWN0aXZlRGF0ZSB8fCB0aGlzLl91dGlsLnRvZGF5KCk7XG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgbW91c2Vkb3duIGV2ZW50cyBvbiB0aGUgY2xvY2sgYm9keS4gKi9cbiAgX2hhbmRsZU1vdXNlZG93bihldmVudDogYW55KSB7XG4gICAgdGhpcy5zZXRUaW1lKGV2ZW50KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUxpc3RlbmVyKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm1vdXNlTW92ZUxpc3RlbmVyKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwTGlzdGVuZXIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5tb3VzZVVwTGlzdGVuZXIpO1xuICB9XG5cbiAgX2hhbmRsZU1vdXNlbW92ZShldmVudDogYW55KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnNldFRpbWUoZXZlbnQpO1xuICB9XG5cbiAgX2hhbmRsZU1vdXNldXAoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lcik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lcik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcExpc3RlbmVyKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMubW91c2VVcExpc3RlbmVyKTtcbiAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5hY3RpdmVEYXRlKTtcbiAgfVxuXG4gIC8qKiBJbml0aWFsaXplcyB0aGlzIGNsb2NrIHZpZXcuICovXG4gIHByaXZhdGUgX2luaXQoKSB7XG4gICAgdGhpcy5faG91cnMubGVuZ3RoID0gMDtcbiAgICB0aGlzLl9taW51dGVzLmxlbmd0aCA9IDA7XG5cbiAgICBsZXQgaG91ck5hbWVzID0gdGhpcy5fbG9jYWxlLmdldEhvdXJOYW1lcygpO1xuICAgIGxldCBtaW51dGVOYW1lcyA9IHRoaXMuX2xvY2FsZS5nZXRNaW51dGVOYW1lcygpO1xuXG4gICAgaWYgKHRoaXMudHdlbHZlaG91cikge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAoaG91ck5hbWVzLmxlbmd0aCAvIDIpICsgMTsgaSsrKSB7XG4gICAgICAgIGxldCByYWRpYW4gPSBpIC8gNiAqIE1hdGguUEk7XG4gICAgICAgIGxldCByYWRpdXMgPSBDTE9DS19PVVRFUl9SQURJVVM7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUodGhpcy5hY3RpdmVEYXRlLmdldFRpbWUoKSk7XG4gICAgICAgIGRhdGUuc2V0SG91cnMoaSArIDEsIDAsIDAsIDApO1xuICAgICAgICBsZXQgZW5hYmxlZCA9IHRoaXMuX3V0aWwuaXNGdWxsRGF0ZVdpdGhpblJhbmdlKGRhdGUsIHRoaXMubWluLCB0aGlzLm1heCk7XG4gICAgICAgIHRoaXMuX2hvdXJzLnB1c2goe1xuICAgICAgICAgIHZhbHVlOiBpLFxuICAgICAgICAgIGRpc3BsYXlWYWx1ZTogaSA9PT0gMCA/ICcwMCcgOiBob3VyTmFtZXNbaV0sXG4gICAgICAgICAgZW5hYmxlZDogZW5hYmxlZCxcbiAgICAgICAgICB0b3A6IENMT0NLX1JBRElVUyAtIE1hdGguY29zKHJhZGlhbikgKiByYWRpdXMgLSBDTE9DS19USUNLX1JBRElVUyxcbiAgICAgICAgICBsZWZ0OiBDTE9DS19SQURJVVMgKyBNYXRoLnNpbihyYWRpYW4pICogcmFkaXVzIC0gQ0xPQ0tfVElDS19SQURJVVMsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhvdXJOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgcmFkaWFuID0gaSAvIDYgKiBNYXRoLlBJO1xuICAgICAgICBsZXQgb3V0ZXIgPSBpID4gMCAmJiBpIDwgMTMsXG4gICAgICAgICAgcmFkaXVzID0gb3V0ZXIgPyBDTE9DS19PVVRFUl9SQURJVVMgOiBDTE9DS19JTk5FUl9SQURJVVM7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUodGhpcy5hY3RpdmVEYXRlLmdldFRpbWUoKSk7XG4gICAgICAgIGRhdGUuc2V0SG91cnMoaSArIDEsIDAsIDAsIDApO1xuICAgICAgICBsZXQgZW5hYmxlZCA9IHRoaXMuX3V0aWwuaXNGdWxsRGF0ZVdpdGhpblJhbmdlKGRhdGUsIHRoaXMubWluLCB0aGlzLm1heCk7XG4gICAgICAgIHRoaXMuX2hvdXJzLnB1c2goe1xuICAgICAgICAgIHZhbHVlOiBpLFxuICAgICAgICAgIGRpc3BsYXlWYWx1ZTogaSA9PT0gMCA/ICcwMCcgOiBob3VyTmFtZXNbaV0sXG4gICAgICAgICAgZW5hYmxlZDogZW5hYmxlZCxcbiAgICAgICAgICB0b3A6IENMT0NLX1JBRElVUyAtIE1hdGguY29zKHJhZGlhbikgKiByYWRpdXMgLSBDTE9DS19USUNLX1JBRElVUyxcbiAgICAgICAgICBsZWZ0OiBDTE9DS19SQURJVVMgKyBNYXRoLnNpbihyYWRpYW4pICogcmFkaXVzIC0gQ0xPQ0tfVElDS19SQURJVVMsXG4gICAgICAgICAgZm9udFNpemU6IGkgPiAwICYmIGkgPCAxMyA/ICcnIDogJzgwJSdcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtaW51dGVOYW1lcy5sZW5ndGg7IGkgKz0gNSkge1xuICAgICAgbGV0IHJhZGlhbiA9IGkgLyAzMCAqIE1hdGguUEk7XG4gICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHRoaXMuYWN0aXZlRGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgZGF0ZS5zZXRNaW51dGVzKGksIDAsIDApO1xuICAgICAgbGV0IGVuYWJsZWQgPSB0aGlzLl91dGlsLmlzRnVsbERhdGVXaXRoaW5SYW5nZShkYXRlLCB0aGlzLm1pbiwgdGhpcy5tYXgpO1xuICAgICAgdGhpcy5fbWludXRlcy5wdXNoKHtcbiAgICAgICAgdmFsdWU6IGksXG4gICAgICAgIGRpc3BsYXlWYWx1ZTogaSA9PT0gMCA/ICcwMCcgOiBtaW51dGVOYW1lc1tpXSxcbiAgICAgICAgZW5hYmxlZDogZW5hYmxlZCxcbiAgICAgICAgdG9wOiBDTE9DS19SQURJVVMgLSBNYXRoLmNvcyhyYWRpYW4pICogQ0xPQ0tfT1VURVJfUkFESVVTIC0gQ0xPQ0tfVElDS19SQURJVVMsXG4gICAgICAgIGxlZnQ6IENMT0NLX1JBRElVUyArIE1hdGguc2luKHJhZGlhbikgKiBDTE9DS19PVVRFUl9SQURJVVMgLSBDTE9DS19USUNLX1JBRElVUyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgVGltZVxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIHByaXZhdGUgc2V0VGltZShldmVudDogYW55KSB7XG4gICAgbGV0IHRyaWdnZXIgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgbGV0IHRyaWdnZXJSZWN0ID0gdHJpZ2dlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgd2lkdGggPSB0cmlnZ2VyLm9mZnNldFdpZHRoO1xuICAgIGxldCBoZWlnaHQgPSB0cmlnZ2VyLm9mZnNldEhlaWdodDtcbiAgICBsZXQgcGFnZVggPSBldmVudC5wYWdlWCAhPT0gdW5kZWZpbmVkID8gZXZlbnQucGFnZVggOiBldmVudC50b3VjaGVzWzBdLnBhZ2VYO1xuICAgIGxldCBwYWdlWSA9IGV2ZW50LnBhZ2VZICE9PSB1bmRlZmluZWQgPyBldmVudC5wYWdlWSA6IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVk7XG4gICAgbGV0IHggPSAod2lkdGggLyAyKSAtIChwYWdlWCAtIHRyaWdnZXJSZWN0LmxlZnQgLSB3aW5kb3cucGFnZVhPZmZzZXQpO1xuICAgIGxldCB5ID0gKGhlaWdodCAvIDIpIC0gKHBhZ2VZIC0gdHJpZ2dlclJlY3QudG9wIC0gd2luZG93LnBhZ2VZT2Zmc2V0KTtcbiAgICBsZXQgcmFkaWFuID0gTWF0aC5hdGFuMigteCwgeSk7XG4gICAgbGV0IHVuaXQgPSBNYXRoLlBJIC8gKHRoaXMuX2hvdXJWaWV3ID8gNiA6ICh0aGlzLmludGVydmFsID8gKDMwIC8gdGhpcy5pbnRlcnZhbCkgOiAzMCkpO1xuICAgIGxldCB6ID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xuICAgIGxldCBvdXRlciA9IHRoaXMuX2hvdXJWaWV3ICYmIHogPiAoKHdpZHRoICogKENMT0NLX09VVEVSX1JBRElVUyAvIDEwMCkpICtcbiAgICAgICh3aWR0aCAqIChDTE9DS19JTk5FUl9SQURJVVMgLyAxMDApKSkgLyAyO1xuICAgIGxldCB2YWx1ZSA9IDA7XG5cbiAgICBpZiAocmFkaWFuIDwgMCkgeyByYWRpYW4gPSBNYXRoLlBJICogMiArIHJhZGlhbjsgfVxuICAgIHZhbHVlID0gTWF0aC5yb3VuZChyYWRpYW4gLyB1bml0KTtcbiAgICByYWRpYW4gPSB2YWx1ZSAqIHVuaXQ7XG5cbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHRoaXMuYWN0aXZlRGF0ZS5nZXRUaW1lKCkpO1xuICAgIGlmICh0aGlzLl9ob3VyVmlldykge1xuICAgICAgaWYgKHRoaXMudHdlbHZlaG91cikge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlID09PSAwID8gMTIgOiB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gMTIpIHsgdmFsdWUgPSAwOyB9XG4gICAgICAgIHZhbHVlID0gb3V0ZXIgPyAodmFsdWUgPT09IDAgPyAxMiA6IHZhbHVlKSA6IHZhbHVlID09PSAwID8gMCA6IHZhbHVlICsgMTI7XG4gICAgICB9XG4gICAgICBkYXRlLnNldEhvdXJzKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHsgdmFsdWUgKj0gdGhpcy5pbnRlcnZhbDsgfVxuICAgICAgaWYgKHZhbHVlID09PSA2MCkgeyB2YWx1ZSA9IDA7IH1cbiAgICAgIGRhdGUuc2V0TWludXRlcyh2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX3V0aWwuY2xhbXBEYXRlKGRhdGUsIHRoaXMubWluLCB0aGlzLm1heCk7XG4gICAgdGhpcy5hY3RpdmVEYXRlQ2hhbmdlLmVtaXQodGhpcy5hY3RpdmVEYXRlKTtcbiAgfVxuXG59XG4iXX0=