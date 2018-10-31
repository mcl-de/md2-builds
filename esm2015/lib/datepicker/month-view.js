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
const DAYS_PER_WEEK = 7;
/**
 * An internal component used to display a single month in the datepicker.
 * \@docs-private
 */
export class Md2MonthView {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2RhdGVwaWNrZXIvbW9udGgtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFpQixNQUFNLCtCQUErQixDQUFDO0FBQy9FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFHeEQsTUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDOzs7OztBQWV4QixNQUFNOzs7Ozs7SUEyREosWUFBb0IsT0FBbUIsRUFBUyxLQUFlLEVBQ2hCLFlBQTJCO1FBRHRELFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFVO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFlOzs7OzhCQXZCL0MsSUFBSSxZQUFZLEVBQVE7UUF3QmpELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3RCLE1BQU0sS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDaEM7O1FBRUQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDOztRQUN4RCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDOztRQUNoRSxNQUFNLFlBQVksR0FBRyxJQUFJLENB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QyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs7Ozs7O0lBRzVCLGFBQWEsQ0FBQyxTQUFpQjtRQUNyQyxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQzs7Ozs7SUFHbEMsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0tBQzFCOzs7WUEvSkYsU0FBUyxTQUFDO2dCQUVULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLCtyQkFBOEI7Z0JBQzlCLFVBQVUsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDM0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7O1lBckJRLFVBQVU7WUFDVixRQUFROzRDQWlGWixRQUFRLFlBQUksTUFBTSxTQUFDLGVBQWU7OzswQkExRHBDLEtBQUs7eUJBS0wsS0FBSzt1QkFrQkwsS0FBSzt5QkFTTCxLQUFLOzZCQUdMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZUxvY2FsZSB9IGZyb20gJy4vZGF0ZS1sb2NhbGUnO1xuaW1wb3J0IHsgRGF0ZVV0aWwgfSBmcm9tICcuL2RhdGUtdXRpbCc7XG5pbXBvcnQgeyBNZDJDYWxlbmRhckNlbGwgfSBmcm9tICcuL2NhbGVuZGFyLWJvZHknO1xuaW1wb3J0IHsgTURfREFURV9GT1JNQVRTLCBNZERhdGVGb3JtYXRzIH0gZnJvbSAnLi4vY29yZS9kYXRldGltZS9kYXRlLWZvcm1hdHMnO1xuaW1wb3J0IHsgc2xpZGVDYWxlbmRhciB9IGZyb20gJy4vZGF0ZXBpY2tlci1hbmltYXRpb25zJztcblxuXG5jb25zdCBEQVlTX1BFUl9XRUVLID0gNztcblxuXG4vKipcbiAqIEFuIGludGVybmFsIGNvbXBvbmVudCB1c2VkIHRvIGRpc3BsYXkgYSBzaW5nbGUgbW9udGggaW4gdGhlIGRhdGVwaWNrZXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBcbiAgc2VsZWN0b3I6ICdtZDItbW9udGgtdmlldycsXG4gIHRlbXBsYXRlVXJsOiAnbW9udGgtdmlldy5odG1sJyxcbiAgYW5pbWF0aW9uczogW3NsaWRlQ2FsZW5kYXJdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWQyTW9udGhWaWV3IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIC8qKiBXaGV0aGVyIHRoZSBXZWVrLW51bWJlciBzaG91bGQgYmUgZGlzcGxheWVkICovXG4gIEBJbnB1dCgpIGRpc3BsYXlXZWVrOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF0ZSB0byBkaXNwbGF5IGluIHRoaXMgbW9udGggdmlldyAoZXZlcnl0aGluZyBvdGhlciB0aGFuIHRoZSBtb250aCBhbmQgeWVhciBpcyBpZ25vcmVkKS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBhY3RpdmVEYXRlKCk6IERhdGUgeyByZXR1cm4gdGhpcy5fYWN0aXZlRGF0ZTsgfVxuICBzZXQgYWN0aXZlRGF0ZSh2YWx1ZTogRGF0ZSkge1xuICAgIGxldCBvbGRBY3RpdmVEYXRlID0gdGhpcy5fYWN0aXZlRGF0ZTtcbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gdmFsdWUgfHwgdGhpcy5fdXRpbC50b2RheSgpO1xuICAgIGlmIChvbGRBY3RpdmVEYXRlICYmIHRoaXMuX2FjdGl2ZURhdGUgJiZcbiAgICAgICF0aGlzLl91dGlsLmlzU2FtZU1vbnRoQW5kWWVhcihvbGRBY3RpdmVEYXRlLCB0aGlzLl9hY3RpdmVEYXRlKSkge1xuICAgICAgdGhpcy5faW5pdCgpO1xuICAgICAgaWYgKHRoaXMuX3V0aWwuaXNJbk5leHRNb250aChvbGRBY3RpdmVEYXRlLCB0aGlzLl9hY3RpdmVEYXRlKSkge1xuICAgICAgICB0aGlzLmNhbGVuZGFyU3RhdGUoJ3JpZ2h0Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNhbGVuZGFyU3RhdGUoJ2xlZnQnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfYWN0aXZlRGF0ZTogRGF0ZTtcblxuICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0ZWQoKTogRGF0ZSB7IHJldHVybiB0aGlzLl9zZWxlY3RlZDsgfVxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IERhdGUpIHtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHZhbHVlO1xuICAgIHRoaXMuX3NlbGVjdGVkRGF0ZSA9IHRoaXMuX2dldERhdGVJbkN1cnJlbnRNb250aCh0aGlzLnNlbGVjdGVkKTtcbiAgfVxuICBwcml2YXRlIF9zZWxlY3RlZDogRGF0ZTtcblxuICAvKiogQSBmdW5jdGlvbiB1c2VkIHRvIGZpbHRlciB3aGljaCBkYXRlcyBhcmUgc2VsZWN0YWJsZS4gKi9cbiAgQElucHV0KCkgZGF0ZUZpbHRlcjogKGRhdGU6IERhdGUpID0+IGJvb2xlYW47XG5cbiAgLyoqIEVtaXRzIHdoZW4gYSBuZXcgZGF0ZSBpcyBzZWxlY3RlZC4gKi9cbiAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPigpO1xuXG4gIC8qKiBHcmlkIG9mIGNhbGVuZGFyIGNlbGxzIHJlcHJlc2VudGluZyB0aGUgZGF0ZXMgb2YgdGhlIG1vbnRoLiAqL1xuICBfd2Vla3M6IE1kMkNhbGVuZGFyQ2VsbFtdW107XG5cbiAgLyoqIFRoZSBudW1iZXIgb2YgYmxhbmsgY2VsbHMgaW4gdGhlIGZpcnN0IHJvdyBiZWZvcmUgdGhlIDFzdCBvZiB0aGUgbW9udGguICovXG4gIF9maXJzdFdlZWtPZmZzZXQ6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGRhdGUgb2YgdGhlIG1vbnRoIHRoYXQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBEYXRlIGZhbGxzIG9uLlxuICAgKiBOdWxsIGlmIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgRGF0ZSBpcyBpbiBhbm90aGVyIG1vbnRoLlxuICAgKi9cbiAgX3NlbGVjdGVkRGF0ZTogbnVtYmVyO1xuXG4gIC8qKiBUaGUgZGF0ZSBvZiB0aGUgbW9udGggdGhhdCB0b2RheSBmYWxscyBvbi4gTnVsbCBpZiB0b2RheSBpcyBpbiBhbm90aGVyIG1vbnRoLiAqL1xuICBfdG9kYXlEYXRlOiBudW1iZXI7XG5cbiAgLyoqIFRoZSBuYW1lcyBvZiB0aGUgd2Vla2RheXMuICovXG4gIF93ZWVrZGF5czogeyBsb25nOiBzdHJpbmcsIG5hcnJvdzogc3RyaW5nIH1bXTtcblxuICBfY2FsZW5kYXJTdGF0ZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xvY2FsZTogRGF0ZUxvY2FsZSwgcHVibGljIF91dGlsOiBEYXRlVXRpbCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1EX0RBVEVfRk9STUFUUykgcHJpdmF0ZSBfZGF0ZUZvcm1hdHM6IE1kRGF0ZUZvcm1hdHMpIHtcbiAgICBpZiAoIXRoaXMuX2RhdGVGb3JtYXRzKSB7XG4gICAgICB0aHJvdyBFcnJvcignTURfREFURV9GT1JNQVRTJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3REYXlPZldlZWsgPSB0aGlzLl9sb2NhbGUuZ2V0Rmlyc3REYXlPZldlZWsoKTtcbiAgICBjb25zdCBuYXJyb3dXZWVrZGF5cyA9IHRoaXMuX2xvY2FsZS5nZXREYXlPZldlZWtOYW1lcygnbmFycm93Jyk7XG4gICAgY29uc3QgbG9uZ1dlZWtkYXlzID0gdGhpcy5fbG9jYWxlLmdldERheU9mV2Vla05hbWVzKCdsb25nJyk7XG5cbiAgICAvLyBSb3RhdGUgdGhlIGxhYmVscyBmb3IgZGF5cyBvZiB0aGUgd2VlayBiYXNlZCBvbiB0aGUgY29uZmlndXJlZCBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXG4gICAgbGV0IHdlZWtkYXlzID0gbG9uZ1dlZWtkYXlzLm1hcCgobG9uZywgaSkgPT4ge1xuICAgICAgcmV0dXJuIHsgbG9uZywgbmFycm93OiBuYXJyb3dXZWVrZGF5c1tpXSB9O1xuICAgIH0pO1xuICAgIHRoaXMuX3dlZWtkYXlzID0gd2Vla2RheXMuc2xpY2UoZmlyc3REYXlPZldlZWspLmNvbmNhdCh3ZWVrZGF5cy5zbGljZSgwLCBmaXJzdERheU9mV2VlaykpO1xuXG4gICAgdGhpcy5fYWN0aXZlRGF0ZSA9IHRoaXMuX3V0aWwudG9kYXkoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbml0KCk7XG4gIH1cblxuICAvKiogSGFuZGxlcyB3aGVuIGEgbmV3IGRhdGUgaXMgc2VsZWN0ZWQuICovXG4gIF9kYXRlU2VsZWN0ZWQoZGF0ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuX3V0aWwuY3JlYXRlRGF0ZShcbiAgICAgIHRoaXMuX3V0aWwuZ2V0WWVhcih0aGlzLmFjdGl2ZURhdGUpLCB0aGlzLl91dGlsLmdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSksXG4gICAgICBkYXRlLCB0aGlzLl91dGlsLmdldEhvdXJzKHRoaXMuYWN0aXZlRGF0ZSksXG4gICAgICB0aGlzLl91dGlsLmdldE1pbnV0ZXModGhpcy5hY3RpdmVEYXRlKSxcbiAgICAgIHRoaXMuX3V0aWwuZ2V0U2Vjb25kcyh0aGlzLmFjdGl2ZURhdGUpKSk7XG4gIH1cblxuICAvKiogSW5pdGlhbGl6ZXMgdGhpcyBtb250aCB2aWV3LiAqL1xuICBwcml2YXRlIF9pbml0KCkge1xuICAgIHRoaXMuX3NlbGVjdGVkRGF0ZSA9IHRoaXMuX2dldERhdGVJbkN1cnJlbnRNb250aCh0aGlzLnNlbGVjdGVkKTtcbiAgICB0aGlzLl90b2RheURhdGUgPSB0aGlzLl9nZXREYXRlSW5DdXJyZW50TW9udGgodGhpcy5fdXRpbC50b2RheSgpKTtcblxuICAgIGxldCBmaXJzdE9mTW9udGggPSB0aGlzLl91dGlsLmNyZWF0ZURhdGUodGhpcy5fdXRpbC5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSksXG4gICAgICB0aGlzLl91dGlsLmdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSksIDEsXG4gICAgICB0aGlzLl91dGlsLmdldEhvdXJzKHRoaXMuYWN0aXZlRGF0ZSksXG4gICAgICB0aGlzLl91dGlsLmdldE1pbnV0ZXModGhpcy5hY3RpdmVEYXRlKSxcbiAgICAgIHRoaXMuX3V0aWwuZ2V0U2Vjb25kcyh0aGlzLmFjdGl2ZURhdGUpKTtcbiAgICB0aGlzLl9maXJzdFdlZWtPZmZzZXQgPVxuICAgICAgKERBWVNfUEVSX1dFRUsgKyB0aGlzLl9sb2NhbGUuZ2V0RGF5T2ZXZWVrKGZpcnN0T2ZNb250aCkgLVxuICAgICAgICB0aGlzLl9sb2NhbGUuZ2V0Rmlyc3REYXlPZldlZWsoKSkgJSBEQVlTX1BFUl9XRUVLO1xuXG4gICAgdGhpcy5fY3JlYXRlV2Vla0NlbGxzKCk7XG4gIH1cblxuICAvKiogQ3JlYXRlcyBNZENhbGVuZGFyQ2VsbHMgZm9yIHRoZSBkYXRlcyBpbiB0aGlzIG1vbnRoLiAqL1xuICBwcml2YXRlIF9jcmVhdGVXZWVrQ2VsbHMoKSB7XG4gICAgbGV0IGRheXNJbk1vbnRoID0gdGhpcy5fdXRpbC5nZXROdW1EYXlzSW5Nb250aCh0aGlzLmFjdGl2ZURhdGUpO1xuICAgIGxldCBkYXRlTmFtZXMgPSB0aGlzLl9sb2NhbGUuZ2V0RGF0ZU5hbWVzKCk7XG4gICAgbGV0IG9sZFdlZWs7XG4gICAgdGhpcy5fd2Vla3MgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBjZWxsID0gdGhpcy5fZmlyc3RXZWVrT2Zmc2V0OyBpIDwgZGF5c0luTW9udGg7IGkrKyAsIGNlbGwrKykge1xuICAgICAgbGV0IGRhdGUgPSB0aGlzLl91dGlsLmNyZWF0ZURhdGUoXG4gICAgICAgIHRoaXMuX3V0aWwuZ2V0WWVhcih0aGlzLmFjdGl2ZURhdGUpLFxuICAgICAgICB0aGlzLl91dGlsLmdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSksIGkgKyAxLFxuICAgICAgICB0aGlzLl91dGlsLmdldEhvdXJzKHRoaXMuYWN0aXZlRGF0ZSksXG4gICAgICAgIHRoaXMuX3V0aWwuZ2V0TWludXRlcyh0aGlzLmFjdGl2ZURhdGUpLFxuICAgICAgICB0aGlzLl91dGlsLmdldFNlY29uZHModGhpcy5hY3RpdmVEYXRlKSk7XG4gICAgICBsZXQgZW5hYmxlZCA9ICF0aGlzLmRhdGVGaWx0ZXIgfHxcbiAgICAgICAgdGhpcy5kYXRlRmlsdGVyKGRhdGUpO1xuICAgICAgbGV0IGFyaWFMYWJlbCA9IHRoaXMuX2xvY2FsZS5mb3JtYXQoZGF0ZSwgdGhpcy5fZGF0ZUZvcm1hdHMuZGlzcGxheS5kYXRlQTExeUxhYmVsKTtcbiAgICAgIGxldCBuZXdXZWVrID0gdGhpcy5fdXRpbC5nZXRXZWVrT2ZZZWFyKGRhdGUpO1xuICAgICAgaWYgKG9sZFdlZWsgIT09IG5ld1dlZWspIHtcbiAgICAgICAgdGhpcy5fd2Vla3MucHVzaChbXSk7XG4gICAgICAgIG9sZFdlZWsgPSBuZXdXZWVrO1xuICAgICAgICBjZWxsID0gMDtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3dlZWtzW3RoaXMuX3dlZWtzLmxlbmd0aCAtIDFdXG4gICAgICAgIC5wdXNoKG5ldyBNZDJDYWxlbmRhckNlbGwoaSArIDEsIGRhdGVOYW1lc1tpXSwgYXJpYUxhYmVsLCBlbmFibGVkLCBuZXdXZWVrLnRvU3RyaW5nKCkpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZGF0ZSBpbiB0aGlzIG1vbnRoIHRoYXQgdGhlIGdpdmVuIERhdGUgZmFsbHMgb24uXG4gICAqIFJldHVybnMgbnVsbCBpZiB0aGUgZ2l2ZW4gRGF0ZSBpcyBpbiBhbm90aGVyIG1vbnRoLlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0RGF0ZUluQ3VycmVudE1vbnRoKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl91dGlsLmlzU2FtZU1vbnRoQW5kWWVhcihkYXRlLCB0aGlzLmFjdGl2ZURhdGUpID9cbiAgICAgIHRoaXMuX3V0aWwuZ2V0RGF0ZShkYXRlKSA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGNhbGVuZGFyU3RhdGUoZGlyZWN0aW9uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9jYWxlbmRhclN0YXRlID0gZGlyZWN0aW9uO1xuICB9XG5cbiAgX2NhbGVuZGFyU3RhdGVEb25lKCkge1xuICAgIHRoaXMuX2NhbGVuZGFyU3RhdGUgPSAnJztcbiAgfVxuXG59XG4iXX0=