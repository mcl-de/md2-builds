/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
import { Md2CalendarCell } from './calendar-body';
import { MD_DATE_FORMATS } from '../core/datetime/date-formats';
import { slideCalendar } from './datepicker-animations';
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
export { Md2MonthView };
if (false) {
    /**
     * Whether the Week-number should be displayed
     * @type {?}
     */
    Md2MonthView.prototype.displayWeek;
    /** @type {?} */
    Md2MonthView.prototype._activeDate;
    /** @type {?} */
    Md2MonthView.prototype._selected;
    /**
     * A function used to filter which dates are selectable.
     * @type {?}
     */
    Md2MonthView.prototype.dateFilter;
    /**
     * Emits when a new date is selected.
     * @type {?}
     */
    Md2MonthView.prototype.selectedChange;
    /**
     * Grid of calendar cells representing the dates of the month.
     * @type {?}
     */
    Md2MonthView.prototype._weeks;
    /**
     * The number of blank cells in the first row before the 1st of the month.
     * @type {?}
     */
    Md2MonthView.prototype._firstWeekOffset;
    /**
     * The date of the month that the currently selected Date falls on.
     * Null if the currently selected Date is in another month.
     * @type {?}
     */
    Md2MonthView.prototype._selectedDate;
    /**
     * The date of the month that today falls on. Null if today is in another month.
     * @type {?}
     */
    Md2MonthView.prototype._todayDate;
    /**
     * The names of the weekdays.
     * @type {?}
     */
    Md2MonthView.prototype._weekdays;
    /** @type {?} */
    Md2MonthView.prototype._calendarState;
    /** @type {?} */
    Md2MonthView.prototype._locale;
    /** @type {?} */
    Md2MonthView.prototype._util;
    /** @type {?} */
    Md2MonthView.prototype._dateFormats;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2RhdGVwaWNrZXIvbW9udGgtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFpQixNQUFNLCtCQUErQixDQUFDO0FBQy9FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFHeEQsSUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7SUEwRXRCLHNCQUFvQixPQUFtQixFQUFTLEtBQWUsRUFDaEIsWUFBMkI7UUFEdEQsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQVU7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQWU7Ozs7OEJBdkIvQyxJQUFJLFlBQVksRUFBUTtRQXdCakQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsTUFBTSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUNoQzs7UUFFRCxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7O1FBQ3hELElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7O1FBQ2hFLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMs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O1NBQzNGOzs7Ozs7OztJQU9LLDZDQUFzQjs7Ozs7O2NBQUMsSUFBVTtRQUN2QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Ozs7OztJQUc1QixvQ0FBYTs7OztjQUFDLFNBQWlCO1FBQ3JDLElBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDOzs7OztJQUdsQyx5Q0FBa0I7OztJQUFsQjtRQUNFLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0tBQzFCOztnQkEvSkYsU0FBUyxTQUFDO29CQUVULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLCtyQkFBOEI7b0JBQzlCLFVBQVUsRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDM0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7OztnQkFyQlEsVUFBVTtnQkFDVixRQUFRO2dEQWlGWixRQUFRLFlBQUksTUFBTSxTQUFDLGVBQWU7Ozs4QkExRHBDLEtBQUs7NkJBS0wsS0FBSzsyQkFrQkwsS0FBSzs2QkFTTCxLQUFLO2lDQUdMLE1BQU07O3VCQXRFVDs7U0FpQ2EsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlTG9jYWxlIH0gZnJvbSAnLi9kYXRlLWxvY2FsZSc7XG5pbXBvcnQgeyBEYXRlVXRpbCB9IGZyb20gJy4vZGF0ZS11dGlsJztcbmltcG9ydCB7IE1kMkNhbGVuZGFyQ2VsbCB9IGZyb20gJy4vY2FsZW5kYXItYm9keSc7XG5pbXBvcnQgeyBNRF9EQVRFX0ZPUk1BVFMsIE1kRGF0ZUZvcm1hdHMgfSBmcm9tICcuLi9jb3JlL2RhdGV0aW1lL2RhdGUtZm9ybWF0cyc7XG5pbXBvcnQgeyBzbGlkZUNhbGVuZGFyIH0gZnJvbSAnLi9kYXRlcGlja2VyLWFuaW1hdGlvbnMnO1xuXG5cbmNvbnN0IERBWVNfUEVSX1dFRUsgPSA3O1xuXG5cbi8qKlxuICogQW4gaW50ZXJuYWwgY29tcG9uZW50IHVzZWQgdG8gZGlzcGxheSBhIHNpbmdsZSBtb250aCBpbiB0aGUgZGF0ZXBpY2tlci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gIFxuICBzZWxlY3RvcjogJ21kMi1tb250aC12aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICdtb250aC12aWV3Lmh0bWwnLFxuICBhbmltYXRpb25zOiBbc2xpZGVDYWxlbmRhcl0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNZDJNb250aFZpZXcgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgLyoqIFdoZXRoZXIgdGhlIFdlZWstbnVtYmVyIHNob3VsZCBiZSBkaXNwbGF5ZWQgKi9cbiAgQElucHV0KCkgZGlzcGxheVdlZWs6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBkYXRlIHRvIGRpc3BsYXkgaW4gdGhpcyBtb250aCB2aWV3IChldmVyeXRoaW5nIG90aGVyIHRoYW4gdGhlIG1vbnRoIGFuZCB5ZWFyIGlzIGlnbm9yZWQpLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGFjdGl2ZURhdGUoKTogRGF0ZSB7IHJldHVybiB0aGlzLl9hY3RpdmVEYXRlOyB9XG4gIHNldCBhY3RpdmVEYXRlKHZhbHVlOiBEYXRlKSB7XG4gICAgbGV0IG9sZEFjdGl2ZURhdGUgPSB0aGlzLl9hY3RpdmVEYXRlO1xuICAgIHRoaXMuX2FjdGl2ZURhdGUgPSB2YWx1ZSB8fCB0aGlzLl91dGlsLnRvZGF5KCk7XG4gICAgaWYgKG9sZEFjdGl2ZURhdGUgJiYgdGhpcy5fYWN0aXZlRGF0ZSAmJlxuICAgICAgIXRoaXMuX3V0aWwuaXNTYW1lTW9udGhBbmRZZWFyKG9sZEFjdGl2ZURhdGUsIHRoaXMuX2FjdGl2ZURhdGUpKSB7XG4gICAgICB0aGlzLl9pbml0KCk7XG4gICAgICBpZiAodGhpcy5fdXRpbC5pc0luTmV4dE1vbnRoKG9sZEFjdGl2ZURhdGUsIHRoaXMuX2FjdGl2ZURhdGUpKSB7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJTdGF0ZSgncmlnaHQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJTdGF0ZSgnbGVmdCcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBwcml2YXRlIF9hY3RpdmVEYXRlOiBEYXRlO1xuXG4gIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RlZCgpOiBEYXRlIHsgcmV0dXJuIHRoaXMuX3NlbGVjdGVkOyB9XG4gIHNldCBzZWxlY3RlZCh2YWx1ZTogRGF0ZSkge1xuICAgIHRoaXMuX3NlbGVjdGVkID0gdmFsdWU7XG4gICAgdGhpcy5fc2VsZWN0ZWREYXRlID0gdGhpcy5fZ2V0RGF0ZUluQ3VycmVudE1vbnRoKHRoaXMuc2VsZWN0ZWQpO1xuICB9XG4gIHByaXZhdGUgX3NlbGVjdGVkOiBEYXRlO1xuXG4gIC8qKiBBIGZ1bmN0aW9uIHVzZWQgdG8gZmlsdGVyIHdoaWNoIGRhdGVzIGFyZSBzZWxlY3RhYmxlLiAqL1xuICBASW5wdXQoKSBkYXRlRmlsdGVyOiAoZGF0ZTogRGF0ZSkgPT4gYm9vbGVhbjtcblxuICAvKiogRW1pdHMgd2hlbiBhIG5ldyBkYXRlIGlzIHNlbGVjdGVkLiAqL1xuICBAT3V0cHV0KCkgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KCk7XG5cbiAgLyoqIEdyaWQgb2YgY2FsZW5kYXIgY2VsbHMgcmVwcmVzZW50aW5nIHRoZSBkYXRlcyBvZiB0aGUgbW9udGguICovXG4gIF93ZWVrczogTWQyQ2FsZW5kYXJDZWxsW11bXTtcblxuICAvKiogVGhlIG51bWJlciBvZiBibGFuayBjZWxscyBpbiB0aGUgZmlyc3Qgcm93IGJlZm9yZSB0aGUgMXN0IG9mIHRoZSBtb250aC4gKi9cbiAgX2ZpcnN0V2Vla09mZnNldDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF0ZSBvZiB0aGUgbW9udGggdGhhdCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIERhdGUgZmFsbHMgb24uXG4gICAqIE51bGwgaWYgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBEYXRlIGlzIGluIGFub3RoZXIgbW9udGguXG4gICAqL1xuICBfc2VsZWN0ZWREYXRlOiBudW1iZXI7XG5cbiAgLyoqIFRoZSBkYXRlIG9mIHRoZSBtb250aCB0aGF0IHRvZGF5IGZhbGxzIG9uLiBOdWxsIGlmIHRvZGF5IGlzIGluIGFub3RoZXIgbW9udGguICovXG4gIF90b2RheURhdGU6IG51bWJlcjtcblxuICAvKiogVGhlIG5hbWVzIG9mIHRoZSB3ZWVrZGF5cy4gKi9cbiAgX3dlZWtkYXlzOiB7IGxvbmc6IHN0cmluZywgbmFycm93OiBzdHJpbmcgfVtdO1xuXG4gIF9jYWxlbmRhclN0YXRlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbG9jYWxlOiBEYXRlTG9jYWxlLCBwdWJsaWMgX3V0aWw6IERhdGVVdGlsLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTURfREFURV9GT1JNQVRTKSBwcml2YXRlIF9kYXRlRm9ybWF0czogTWREYXRlRm9ybWF0cykge1xuICAgIGlmICghdGhpcy5fZGF0ZUZvcm1hdHMpIHtcbiAgICAgIHRocm93IEVycm9yKCdNRF9EQVRFX0ZPUk1BVFMnKTtcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdERheU9mV2VlayA9IHRoaXMuX2xvY2FsZS5nZXRGaXJzdERheU9mV2VlaygpO1xuICAgIGNvbnN0IG5hcnJvd1dlZWtkYXlzID0gdGhpcy5fbG9jYWxlLmdldERheU9mV2Vla05hbWVzKCduYXJyb3cnKTtcbiAgICBjb25zdCBsb25nV2Vla2RheXMgPSB0aGlzLl9sb2NhbGUuZ2V0RGF5T2ZXZWVrTmFtZXMoJ2xvbmcnKTtcblxuICAgIC8vIFJvdGF0ZSB0aGUgbGFiZWxzIGZvciBkYXlzIG9mIHRoZSB3ZWVrIGJhc2VkIG9uIHRoZSBjb25maWd1cmVkIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cbiAgICBsZXQgd2Vla2RheXMgPSBsb25nV2Vla2RheXMubWFwKChsb25nLCBpKSA9PiB7XG4gICAgICByZXR1cm4geyBsb25nLCBuYXJyb3c6IG5hcnJvd1dlZWtkYXlzW2ldIH07XG4gICAgfSk7XG4gICAgdGhpcy5fd2Vla2RheXMgPSB3ZWVrZGF5cy5zbGljZShmaXJzdERheU9mV2VlaykuY29uY2F0KHdlZWtkYXlzLnNsaWNlKDAsIGZpcnN0RGF5T2ZXZWVrKSk7XG5cbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gdGhpcy5fdXRpbC50b2RheSgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2luaXQoKTtcbiAgfVxuXG4gIC8qKiBIYW5kbGVzIHdoZW4gYSBuZXcgZGF0ZSBpcyBzZWxlY3RlZC4gKi9cbiAgX2RhdGVTZWxlY3RlZChkYXRlOiBudW1iZXIpIHtcbiAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5fdXRpbC5jcmVhdGVEYXRlKFxuICAgICAgdGhpcy5fdXRpbC5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSksIHRoaXMuX3V0aWwuZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKSxcbiAgICAgIGRhdGUsIHRoaXMuX3V0aWwuZ2V0SG91cnModGhpcy5hY3RpdmVEYXRlKSxcbiAgICAgIHRoaXMuX3V0aWwuZ2V0TWludXRlcyh0aGlzLmFjdGl2ZURhdGUpLFxuICAgICAgdGhpcy5fdXRpbC5nZXRTZWNvbmRzKHRoaXMuYWN0aXZlRGF0ZSkpKTtcbiAgfVxuXG4gIC8qKiBJbml0aWFsaXplcyB0aGlzIG1vbnRoIHZpZXcuICovXG4gIHByaXZhdGUgX2luaXQoKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWREYXRlID0gdGhpcy5fZ2V0RGF0ZUluQ3VycmVudE1vbnRoKHRoaXMuc2VsZWN0ZWQpO1xuICAgIHRoaXMuX3RvZGF5RGF0ZSA9IHRoaXMuX2dldERhdGVJbkN1cnJlbnRNb250aCh0aGlzLl91dGlsLnRvZGF5KCkpO1xuXG4gICAgbGV0IGZpcnN0T2ZNb250aCA9IHRoaXMuX3V0aWwuY3JlYXRlRGF0ZSh0aGlzLl91dGlsLmdldFllYXIodGhpcy5hY3RpdmVEYXRlKSxcbiAgICAgIHRoaXMuX3V0aWwuZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKSwgMSxcbiAgICAgIHRoaXMuX3V0aWwuZ2V0SG91cnModGhpcy5hY3RpdmVEYXRlKSxcbiAgICAgIHRoaXMuX3V0aWwuZ2V0TWludXRlcyh0aGlzLmFjdGl2ZURhdGUpLFxuICAgICAgdGhpcy5fdXRpbC5nZXRTZWNvbmRzKHRoaXMuYWN0aXZlRGF0ZSkpO1xuICAgIHRoaXMuX2ZpcnN0V2Vla09mZnNldCA9XG4gICAgICAoREFZU19QRVJfV0VFSyArIHRoaXMuX2xvY2FsZS5nZXREYXlPZldlZWsoZmlyc3RPZk1vbnRoKSAtXG4gICAgICAgIHRoaXMuX2xvY2FsZS5nZXRGaXJzdERheU9mV2VlaygpKSAlIERBWVNfUEVSX1dFRUs7XG5cbiAgICB0aGlzLl9jcmVhdGVXZWVrQ2VsbHMoKTtcbiAgfVxuXG4gIC8qKiBDcmVhdGVzIE1kQ2FsZW5kYXJDZWxscyBmb3IgdGhlIGRhdGVzIGluIHRoaXMgbW9udGguICovXG4gIHByaXZhdGUgX2NyZWF0ZVdlZWtDZWxscygpIHtcbiAgICBsZXQgZGF5c0luTW9udGggPSB0aGlzLl91dGlsLmdldE51bURheXNJbk1vbnRoKHRoaXMuYWN0aXZlRGF0ZSk7XG4gICAgbGV0IGRhdGVOYW1lcyA9IHRoaXMuX2xvY2FsZS5nZXREYXRlTmFtZXMoKTtcbiAgICBsZXQgb2xkV2VlaztcbiAgICB0aGlzLl93ZWVrcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGNlbGwgPSB0aGlzLl9maXJzdFdlZWtPZmZzZXQ7IGkgPCBkYXlzSW5Nb250aDsgaSsrICwgY2VsbCsrKSB7XG4gICAgICBsZXQgZGF0ZSA9IHRoaXMuX3V0aWwuY3JlYXRlRGF0ZShcbiAgICAgICAgdGhpcy5fdXRpbC5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSksXG4gICAgICAgIHRoaXMuX3V0aWwuZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKSwgaSArIDEsXG4gICAgICAgIHRoaXMuX3V0aWwuZ2V0SG91cnModGhpcy5hY3RpdmVEYXRlKSxcbiAgICAgICAgdGhpcy5fdXRpbC5nZXRNaW51dGVzKHRoaXMuYWN0aXZlRGF0ZSksXG4gICAgICAgIHRoaXMuX3V0aWwuZ2V0U2Vjb25kcyh0aGlzLmFjdGl2ZURhdGUpKTtcbiAgICAgIGxldCBlbmFibGVkID0gIXRoaXMuZGF0ZUZpbHRlciB8fFxuICAgICAgICB0aGlzLmRhdGVGaWx0ZXIoZGF0ZSk7XG4gICAgICBsZXQgYXJpYUxhYmVsID0gdGhpcy5fbG9jYWxlLmZvcm1hdChkYXRlLCB0aGlzLl9kYXRlRm9ybWF0cy5kaXNwbGF5LmRhdGVBMTF5TGFiZWwpO1xuICAgICAgbGV0IG5ld1dlZWsgPSB0aGlzLl91dGlsLmdldFdlZWtPZlllYXIoZGF0ZSk7XG4gICAgICBpZiAob2xkV2VlayAhPT0gbmV3V2Vlaykge1xuICAgICAgICB0aGlzLl93ZWVrcy5wdXNoKFtdKTtcbiAgICAgICAgb2xkV2VlayA9IG5ld1dlZWs7XG4gICAgICAgIGNlbGwgPSAwO1xuICAgICAgfVxuICAgICAgdGhpcy5fd2Vla3NbdGhpcy5fd2Vla3MubGVuZ3RoIC0gMV1cbiAgICAgICAgLnB1c2gobmV3IE1kMkNhbGVuZGFyQ2VsbChpICsgMSwgZGF0ZU5hbWVzW2ldLCBhcmlhTGFiZWwsIGVuYWJsZWQsIG5ld1dlZWsudG9TdHJpbmcoKSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBkYXRlIGluIHRoaXMgbW9udGggdGhhdCB0aGUgZ2l2ZW4gRGF0ZSBmYWxscyBvbi5cbiAgICogUmV0dXJucyBudWxsIGlmIHRoZSBnaXZlbiBEYXRlIGlzIGluIGFub3RoZXIgbW9udGguXG4gICAqL1xuICBwcml2YXRlIF9nZXREYXRlSW5DdXJyZW50TW9udGgoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3V0aWwuaXNTYW1lTW9udGhBbmRZZWFyKGRhdGUsIHRoaXMuYWN0aXZlRGF0ZSkgP1xuICAgICAgdGhpcy5fdXRpbC5nZXREYXRlKGRhdGUpIDogbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgY2FsZW5kYXJTdGF0ZShkaXJlY3Rpb246IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2NhbGVuZGFyU3RhdGUgPSBkaXJlY3Rpb247XG4gIH1cblxuICBfY2FsZW5kYXJTdGF0ZURvbmUoKSB7XG4gICAgdGhpcy5fY2FsZW5kYXJTdGF0ZSA9ICcnO1xuICB9XG5cbn1cbiJdfQ==